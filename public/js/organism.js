/*
 * Organizm firmy — animacja w hero.
 *
 * Bez podpisów i bez interakcji. Historia opowiedziana samym kolorem:
 *   1. praca płynie (białe kropki na fioletowych torach),
 *   2. w jednym miejscu pojawia się czerwona kropka: zator,
 *   3. czerwień rozlewa się po sieci, wszystko zwalnia,
 *   4. zmiana: tor przechodzi na nową trasę albo miejsce zatoru zamienia się
 *      w sprawny „mechanizm”, który przepuszcza pracę od razu,
 *   5. od miejsca zmiany rozchodzi się zielona fala, wszystko świeci na zielono
 *      i płynie szybciej,
 *   6. zieleń gaśnie, sieć znowu jest biała i spokojna.
 *
 * Zator za każdym razem pojawia się w innym miejscu. Animacja zatrzymuje się
 * poza ekranem i na ukrytej karcie, a przy ograniczeniu ruchu rysuje jedną klatkę.
 */
(function () {
  "use strict";

  var root = document.querySelector("[data-organism]");
  if (!root) return;
  var canvas = root.querySelector("canvas");
  var ctx = canvas.getContext("2d");
  var stateItems = Array.prototype.slice.call(root.querySelectorAll("[data-state]"));
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  var debug = /[?&]debug\b/.test(window.location.search);

  /* ---------- Kolory ----------
   * Paleta pochodzi z CSS (zmienne --org-*, składowe RGB), więc ta sama
   * animacja działa na ciemnym i jasnym tle. Wartości domyślne to wersja ciemna. */
  var css = window.getComputedStyle(root);
  function readColor(name, fallback) {
    var parts = css.getPropertyValue(name).trim().split(/[\s,]+/).map(Number);
    return parts.length >= 3 && parts.slice(0, 3).every(isFinite) ? parts.slice(0, 3) : fallback;
  }
  var WHITE = readColor("--org-dot", [244, 240, 251]); // spokojna praca
  var RED = readColor("--org-red", [255, 60, 92]);
  var GREEN = readColor("--org-green", [62, 228, 150]);
  var VIOLET = readColor("--org-violet", [167, 123, 255]);
  var LINE = readColor("--org-line", [146, 112, 214]);
  var LINE_DIM = readColor("--org-line-dim", [100, 80, 152]);
  var BG_RGB = readColor("--org-bg", [11, 8, 18]);
  var MOOD = readColor("--org-mood", [118, 54, 214]);
  var STATION = readColor("--org-station", [178, 150, 232]);
  var HEAD = readColor("--org-head", [244, 240, 251]);
  var BG = "rgb(" + BG_RGB.join(",") + ")";
  // Jasne tło: mocniejsze linie, delikatniejsze poświaty.
  var LIGHT = (0.2126 * BG_RGB[0] + 0.7152 * BG_RGB[1] + 0.0722 * BG_RGB[2]) / 255 > 0.5;
  var LINE_A = LIGHT ? 0.85 : 0.62;
  var LINE_DIM_A = LIGHT ? 0.85 : 0.5;
  var HALO = LIGHT ? 0.7 : 1;

  /* ---------- Siatka i tory (współrzędne całkowite) ---------- */
  var COLS = 18;
  var ROWS = 14;
  var PAD = 0.8;

  // Główne tory: praca płynąca przez firmę od lewej do prawej.
  var MAIN = [
    { points: [[0, 2], [4, 2], [4, 6], [12, 6], [12, 3], [18, 3]], count: 8 },
    { points: [[0, 9], [9, 9], [9, 4], [15, 4], [15, 7], [18, 7]], count: 8 },
    { points: [[0, 12], [4, 12], [4, 10], [14, 10], [14, 12], [18, 12]], count: 8 },
    { points: [[0, 13], [7, 13], [7, 11], [16, 11], [16, 13], [18, 13]], count: 7 }
  ];

  // Tory drugoplanowe: reszta organizmu.
  var THIN = [
    [[0, 0], [6, 0], [6, 1], [15, 1], [15, 0], [18, 0]],
    [[0, 4], [2, 4], [2, 7], [6, 7], [6, 9]],
    [[6, 3], [8, 3], [8, 6]],
    [[10, 8], [16, 8], [16, 9], [18, 9]],
    [[0, 11], [2, 11], [2, 13]],
    [[5, 14], [5, 13]],
    [[10, 14], [10, 12], [12, 12], [12, 11]],
    [[17, 14], [17, 12]],
    [[13, 1], [13, 2], [17, 2], [17, 5], [18, 5]],
    [[0, 6], [1, 6], [1, 9]],
    [[11, 6], [11, 8]],
    [[7, 9], [7, 10]]
  ];

  // Scenariusze: miejsce zatoru i sposób udrożnienia.
  var SCENARIOS = [
    {
      kind: "reroute",
      at: [9, 6],
      alt: {
        0: [[0, 2], [4, 2], [4, 2], [12, 2], [12, 3], [18, 3]],
        1: [[0, 9], [11, 9], [11, 4], [15, 4], [15, 7], [18, 7]]
      }
    },
    { kind: "engine", at: [12, 10] },
    {
      kind: "reroute",
      at: [14, 11],
      alt: {
        2: [[0, 12], [4, 12], [4, 10], [16, 10], [16, 12], [18, 12]],
        3: [[0, 13], [7, 13], [7, 13], [16, 13], [16, 13], [18, 13]]
      }
    }
  ];

  /* ---------- Oś czasu jednego cyklu (sekundy) ---------- */
  var T = {
    clot: 2.2, // pojawia się czerwona kropka
    spread: 2.8, // czerwień zaczyna się rozlewać
    fix: 7.2, // zmiana
    preview: 0.9, // rysowanie nowej trasy
    morph: 1.2, // przejście toru
    green: 9.2, // zielona fala
    hold: 12.9, // wszystko zielone
    white: 14.6, // znowu biało
    back: 14.4, // tor wraca na miejsce (spokojnie, na biało)
    end: 16.2
  };
  var SPREAD_SPEED = 4.6; // jednostek siatki na sekundę
  var GREEN_SPEED = 10;

  /* ---------- Narzędzia ---------- */
  function clamp(v, a, b) {
    return v < a ? a : v > b ? b : v;
  }
  function smooth(a, b, v) {
    var t = clamp((v - a) / (b - a), 0, 1);
    return t * t * (3 - 2 * t);
  }
  function mix(a, b, t) {
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  }
  function rgba(c, a) {
    return "rgba(" + Math.round(c[0]) + "," + Math.round(c[1]) + "," + Math.round(c[2]) + "," + a.toFixed(3) + ")";
  }
  function same(p, q) {
    return Math.abs(p[0] - q[0]) < 1e-6 && Math.abs(p[1] - q[1]) < 1e-6;
  }
  function key(x, y) {
    return x + "," + y;
  }

  /* Gęste próbkowanie toru z zaokrąglonymi narożnikami. */
  var RADIUS = 0.42;
  var STEP = 0.18;
  function dense(points) {
    var pts = [];
    points.forEach(function (p) {
      if (!pts.length || !same(pts[pts.length - 1], p)) pts.push(p);
    });
    var prims = [];
    var cursor = pts[0];
    for (var i = 1; i < pts.length - 1; i++) {
      var a = pts[i - 1], c = pts[i], b = pts[i + 1];
      var inLen = Math.hypot(c[0] - a[0], c[1] - a[1]);
      var outLen = Math.hypot(b[0] - c[0], b[1] - c[1]);
      var r = Math.min(RADIUS, inLen / 2, outLen / 2);
      var e = [c[0] + ((a[0] - c[0]) * r) / inLen, c[1] + ((a[1] - c[1]) * r) / inLen];
      var x = [c[0] + ((b[0] - c[0]) * r) / outLen, c[1] + ((b[1] - c[1]) * r) / outLen];
      prims.push({ line: [cursor, e] });
      prims.push({ quad: [e, c, x] });
      cursor = x;
    }
    prims.push({ line: [cursor, pts[pts.length - 1]] });

    var out = [pts[0]];
    prims.forEach(function (pr) {
      if (pr.line) {
        var p = pr.line[0], q = pr.line[1];
        var len = Math.hypot(q[0] - p[0], q[1] - p[1]);
        var n = Math.max(1, Math.ceil(len / STEP));
        for (var s = 1; s <= n; s++) out.push([p[0] + ((q[0] - p[0]) * s) / n, p[1] + ((q[1] - p[1]) * s) / n]);
      } else {
        var e0 = pr.quad[0], c0 = pr.quad[1], x0 = pr.quad[2];
        for (var k = 1; k <= 5; k++) {
          var t = k / 5, u = 1 - t;
          out.push([u * u * e0[0] + 2 * u * t * c0[0] + t * t * x0[0], u * u * e0[1] + 2 * u * t * c0[1] + t * t * x0[1]]);
        }
      }
    });
    var len = [0];
    for (var j = 1; j < out.length; j++) len.push(len[j - 1] + Math.hypot(out[j][0] - out[j - 1][0], out[j][1] - out[j - 1][1]));
    return { pts: out, len: len, total: len[len.length - 1] || 1 };
  }

  function pointAt(geo, f) {
    var d = clamp(f, 0, 1) * geo.total;
    var lo = 1, hi = geo.len.length - 1;
    while (lo < hi) {
      var mid = (lo + hi) >> 1;
      if (geo.len[mid] < d) lo = mid + 1;
      else hi = mid;
    }
    var p = geo.pts[lo - 1], q = geo.pts[lo];
    var seg = geo.len[lo] - geo.len[lo - 1];
    var t = seg ? (d - geo.len[lo - 1]) / seg : 0;
    return [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t];
  }

  function lerpPoints(a, b, t) {
    return a.map(function (p, i) {
      return [p[0] + (b[i][0] - p[0]) * t, p[1] + (b[i][1] - p[1]) * t];
    });
  }

  /* Graf siatki: punkty całkowite połączone odcinkami torów. */
  function buildGraph(routeList) {
    var adj = {};
    function link(a, b) {
      (adj[a] = adj[a] || []).push(b);
      (adj[b] = adj[b] || []).push(a);
    }
    routeList.forEach(function (points) {
      for (var i = 1; i < points.length; i++) {
        var p = points[i - 1], q = points[i];
        var dx = Math.sign(q[0] - p[0]), dy = Math.sign(q[1] - p[1]);
        var x = p[0], y = p[1];
        while (x !== q[0] || y !== q[1]) {
          var nx = x + dx, ny = y + dy;
          link(key(x, y), key(nx, ny));
          x = nx;
          y = ny;
        }
      }
    });
    return adj;
  }

  function distancesFrom(adj, start) {
    var dist = {};
    var queue = [key(start[0], start[1])];
    dist[queue[0]] = 0;
    while (queue.length) {
      var cur = queue.shift();
      (adj[cur] || []).forEach(function (n) {
        if (dist[n] === undefined) {
          dist[n] = dist[cur] + 1;
          queue.push(n);
        }
      });
    }
    return dist;
  }

  /* ---------- Stan ---------- */
  var routes = [];
  var particles = [];
  var junctions = [];
  var graph = null;
  var clock = { t: 0, cycle: 0, total: 0, intro: 0 };
  var view = { w: 0, h: 0, dpr: 1, scale: 1, ox: 0, oy: 0 };
  var running = false, inView = true, frame = 0, last = 0, shownState = -1, frozen = false;
  var BINS = 240;

  function scenario() {
    return SCENARIOS[clock.cycle % SCENARIOS.length];
  }

  function setup() {
    var all = MAIN.map(function (m) {
      return m.points;
    }).concat(THIN);
    graph = buildGraph(all);
    routes = all.map(function (points, i) {
      var main = i < MAIN.length;
      var g = dense(points);
      return { main: main, base: points, baseGeo: g, points: points, geo: g, alt: null, morph: 0, dist: null, gate: -1, preview: null };
    });

    // Węzły: punkty, w których spotykają się co najmniej dwa tory.
    var count = {};
    all.forEach(function (points, ri) {
      var seen = {};
      var g = buildGraph([points]);
      Object.keys(g).forEach(function (k) {
        if (!seen[k]) {
          seen[k] = true;
          (count[k] = count[k] || []).push(ri);
        }
      });
    });
    junctions = Object.keys(count)
      .filter(function (k) {
        return count[k].length >= 2;
      })
      .map(function (k) {
        var xy = k.split(",").map(Number);
        return { at: xy, routes: count[k] };
      });

    particles = [];
    routes.forEach(function (route, index) {
      var n = route.main ? MAIN[index].count : route.geo.total >= 8 ? 2 : route.geo.total >= 3 ? 1 : 0;
      for (var k = 0; k < n; k++) {
        particles.push({
          route: index,
          p: (k / n + index * 0.161 + 0.07) % 1,
          v: route.main ? 2.35 + (k % 3) * 0.1 : 1.0 + (index % 4) * 0.12,
          blocked: false,
          wait: 0,
          rec: 0
        });
      }
    });
    applyScenario();
  }

  function applyScenario() {
    var sc = scenario();
    var dist = distancesFrom(graph, sc.at);
    junctions.forEach(function (j) {
      var d = dist[key(j.at[0], j.at[1])];
      j.d = d === undefined ? 99 : d;
    });
    routes.forEach(function (route, index) {
      route.alt = sc.alt && sc.alt[index] ? sc.alt[index] : null;
      route.morph = 0;
      route.points = route.base;
      route.geo = route.baseGeo;
      // Odległość (po torach) od zatoru dla kolejnych fragmentów toru.
      var bins = new Float32Array(BINS + 1);
      for (var b = 0; b <= BINS; b++) {
        var p = pointAt(route.geo, b / BINS);
        var gx = Math.round(p[0]), gy = Math.round(p[1]);
        var d = dist[key(gx, gy)];
        bins[b] = d === undefined ? 99 : d + Math.hypot(p[0] - gx, p[1] - gy);
      }
      route.dist = bins;
      // Czy tor przechodzi przez zator (wtedy zadania stają w kolejce)?
      route.gate = -1;
      var best = Infinity;
      for (var s = 0; s < route.geo.pts.length; s++) {
        var q = route.geo.pts[s];
        var dd = Math.hypot(q[0] - sc.at[0], q[1] - sc.at[1]);
        if (dd < best) {
          best = dd;
          route.gate = route.geo.len[s] / route.geo.total;
        }
      }
      if (best > 0.05) route.gate = -1;
      if (sc.kind === "reroute" && !route.alt) route.gate = -1;
      // Fragment nowej trasy, który różni się od starej.
      route.preview = null;
      if (route.alt) {
        var first = -1, lastIdx = -1;
        for (var i = 0; i < route.base.length; i++) {
          if (!same(route.base[i], route.alt[i])) {
            if (first < 0) first = i;
            lastIdx = i;
          }
        }
        if (first >= 0) route.preview = dense(route.alt.slice(Math.max(0, first - 1), Math.min(route.alt.length, lastIdx + 2)));
      }
    });
  }

  /* ---------- Pola koloru: czerwień zatoru i zielona fala ---------- */
  function fields(d, t, sc) {
    var red = 0, green = 0;
    if (t >= T.clot) {
      var near = smooth(T.clot, T.clot + 0.5, t) * (1 - smooth(0.4, 1.8, d));
      var front = Math.max(0, (t - T.spread) * SPREAD_SPEED);
      var falloff = 1 - 0.45 * smooth(3, 18, d);
      red = Math.max(near, smooth(-0.6, 1.6, front - d) * falloff);
    }
    if (t >= T.green) {
      var gFront = (t - T.green) * GREEN_SPEED;
      var passed = smooth(-0.6, 1.4, gFront - d);
      red *= 1 - passed;
      green = passed * (1 - smooth(T.hold, T.white, t));
    }
    // Na końcu cyklu wszystko jest już spokojne.
    if (t >= T.white) red = 0;
    if (sc.kind === "engine" && t >= T.fix) {
      // Czerwień jest „wciągana” do mechanizmu, zanim ruszy zielona fala.
      var pull = smooth(T.fix, T.green, t);
      red *= 1 - pull * smooth(0, 6, d) * 0.35;
    }
    return [red, green];
  }

  function distAt(route, f) {
    var x = clamp(f, 0, 1) * BINS;
    var i = Math.floor(x);
    var t = x - i;
    var a = route.dist[i], b = route.dist[Math.min(BINS, i + 1)];
    return a + (b - a) * t;
  }

  /* ---------- Widok ---------- */
  function resize() {
    var rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    view.w = rect.width;
    view.h = rect.height;
    view.dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(view.w * view.dpr);
    canvas.height = Math.round(view.h * view.dpr);
    view.scale = Math.min(view.w / (COLS + PAD * 2), view.h / (ROWS + PAD * 2));
    view.ox = (view.w - COLS * view.scale) / 2;
    view.oy = (view.h - ROWS * view.scale) / 2;
    draw();
  }

  /* ---------- Stan opisowy (cztery słowa) ---------- */
  function stateOf(t) {
    if (t < T.clot) return 0;
    if (t < T.fix) return 1;
    if (t < T.green + 0.5) return 2;
    return 3;
  }
  function showState(s) {
    if (s === shownState) return;
    shownState = s;
    stateItems.forEach(function (item, i) {
      item.classList.toggle("is-on", i === s);
    });
  }

  /* ---------- Symulacja ---------- */
  function step(dt) {
    clock.t += dt;
    clock.total += dt;
    clock.intro += dt;
    if (clock.t >= T.end) {
      clock.t -= T.end;
      clock.cycle += 1;
      applyScenario();
    }
    var t = clock.t;
    var sc = scenario();

    var m = 0;
    if (sc.kind === "reroute") {
      m = smooth(T.fix + T.preview, T.fix + T.preview + T.morph, t);
      if (t >= T.back) m = 1 - smooth(T.back, T.end - 0.15, t);
    }
    routes.forEach(function (route) {
      if (!route.alt) return;
      if (Math.abs(route.morph - m) > 1e-4) {
        route.morph = m;
        route.points = m <= 0 ? route.base : m >= 1 ? route.alt : lerpPoints(route.base, route.alt, m);
        route.geo = m <= 0 ? route.baseGeo : dense(route.points);
      }
    });

    // Zator trzyma zadania, dopóki tor przez niego przechodzi albo mechanizm jeszcze nie ruszył.
    var clotHolds =
      t >= T.clot &&
      (sc.kind === "reroute" ? m < 0.45 && t < T.back : t < T.fix + 1.0);
    var clotGrip = smooth(T.clot, T.clot + 0.6, t);

    particles.forEach(function (pt) {
      var route = routes[pt.route];
      var f = fields(distAt(route, pt.p), t, sc);
      var speed = (1 - 0.8 * f[0]) * (1 + 0.5 * f[1]);
      var move = (pt.v * speed * dt) / route.geo.total;
      var blocked = false;
      if (route.gate >= 0 && clotHolds) {
        var ahead = route.gate - pt.p;
        var win = 5 / route.geo.total;
        if (ahead > 0 && ahead < win) {
          move *= 1 - clotGrip * smooth(win, 0.25 / route.geo.total, ahead) * 0.99;
          blocked = ahead < win * 0.9;
        }
      }
      pt.p += move;
      if (pt.p >= 1) pt.p -= 1;
      // Zielone „uwolnienie” tylko wtedy, gdy kolejkę rozładowała zmiana.
      if (pt.blocked && !blocked && !clotHolds) pt.rec = 1.6;
      else pt.rec = Math.max(0, pt.rec - dt);
      pt.wait = blocked ? pt.wait + dt : 0;
      pt.blocked = blocked;
    });

    // Kolejka przed zatorem: zadania nie przenikają się.
    if (clotHolds && clotGrip > 0.3) {
      routes.forEach(function (route, index) {
        if (route.gate < 0) return;
        var spacing = 0.34 / route.geo.total;
        var ahead = route.gate - 0.3 / route.geo.total;
        particles
          .filter(function (pt) {
            return pt.route === index && pt.p <= route.gate && route.gate - pt.p < 6 / route.geo.total;
          })
          .sort(function (a, b) {
            return b.p - a.p;
          })
          .forEach(function (pt) {
            pt.p = Math.min(pt.p, ahead);
            ahead = pt.p - spacing;
          });
      });
    }

    showState(stateOf(t));
  }

  /* ---------- Rysowanie ---------- */
  function strokeRange(geo, from, to) {
    ctx.beginPath();
    ctx.moveTo(geo.pts[from][0], geo.pts[from][1]);
    for (var i = from + 1; i <= to; i++) ctx.lineTo(geo.pts[i][0], geo.pts[i][1]);
    ctx.stroke();
  }

  function strokePartial(geo, length) {
    ctx.beginPath();
    ctx.moveTo(geo.pts[0][0], geo.pts[0][1]);
    for (var i = 1; i < geo.pts.length; i++) {
      if (geo.len[i] >= length) {
        var seg = geo.len[i] - geo.len[i - 1];
        var t = seg ? (length - geo.len[i - 1]) / seg : 0;
        ctx.lineTo(geo.pts[i - 1][0] + (geo.pts[i][0] - geo.pts[i - 1][0]) * t, geo.pts[i - 1][1] + (geo.pts[i][1] - geo.pts[i - 1][1]) * t);
        break;
      }
      ctx.lineTo(geo.pts[i][0], geo.pts[i][1]);
    }
    ctx.stroke();
  }

  function draw() {
    if (!view.w || !routes.length) return;
    var t = clock.t;
    var sc = scenario();
    var px = 1 / view.scale;
    var intro = reduce.matches ? 1 : smooth(0, 1.4, clock.intro);

    ctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0);
    ctx.clearRect(0, 0, view.w, view.h);
    ctx.setTransform(view.dpr * view.scale, 0, 0, view.dpr * view.scale, view.dpr * view.ox, view.dpr * view.oy);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Nastrój całej sieci: fiolet, przy zatorze czerwień, po zmianie zieleń.
    var moodRed = smooth(T.clot, T.fix, t) * (1 - smooth(T.green, T.green + 1.5, t));
    var moodGreen = smooth(T.green, T.green + 1.2, t) * (1 - smooth(T.hold, T.white, t));
    var mood = mix(mix(MOOD, RED, moodRed * 0.75), GREEN, moodGreen * 0.7);
    var cx = sc.at[0], cy = sc.at[1];
    var glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 13);
    glow.addColorStop(0, rgba(mood, (0.16 + moodRed * 0.06 + moodGreen * 0.06) * (LIGHT ? 0.55 : 1)));
    glow.addColorStop(1, rgba(mood, 0));
    ctx.fillStyle = glow;
    ctx.fillRect(-PAD, -PAD, COLS + PAD * 2, ROWS + PAD * 2);

    if (debug) {
      ctx.strokeStyle = "rgba(255,255,255,0.07)";
      ctx.lineWidth = px;
      for (var gx = 0; gx <= COLS; gx++) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, ROWS);
        ctx.stroke();
      }
      for (var gy = 0; gy <= ROWS; gy++) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(COLS, gy);
        ctx.stroke();
      }
    }

    // Ślad starej trasy po zmianie.
    routes.forEach(function (route) {
      if (!route.alt || route.morph <= 0.02) return;
      ctx.save();
      ctx.setLineDash([2.5 * px, 5 * px]);
      ctx.strokeStyle = rgba(LINE_DIM, 0.55 * Math.min(1, route.morph * 1.5) * (1 - smooth(T.white, T.end, t)));
      ctx.lineWidth = px;
      strokeRange(route.baseGeo, 0, route.baseGeo.pts.length - 1);
      ctx.restore();
    });

    // Tory: najpierw spokojna linia, potem nałożony kolor (czerwień / zieleń).
    [false, true].forEach(function (mainPass) {
      routes.forEach(function (route) {
        if (route.main !== mainPass) return;
        var geo = route.geo;
        var width = (route.main ? 1.6 : 1) * px;
        ctx.strokeStyle = rgba(route.main ? LINE : LINE_DIM, route.main ? LINE_A : LINE_DIM_A);
        ctx.lineWidth = width;
        if (intro < 1) strokePartial(geo, geo.total * intro);
        else strokeRange(geo, 0, geo.pts.length - 1);

        // Kolor: przebiegi o podobnym natężeniu rysowane razem.
        var runStart = 0, runKey = null, runCol = null, runA = 0;
        function flush(endIdx) {
          if (runKey === null || runA < 0.04 || endIdx <= runStart) return;
          ctx.strokeStyle = rgba(runCol, runA);
          ctx.lineWidth = width * (route.main ? 1.5 : 1.4);
          strokeRange(geo, runStart, endIdx);
        }
        for (var i = 0; i < geo.pts.length; i++) {
          var f = fields(distAt(route, geo.len[i] / geo.total), t, sc);
          var isGreen = f[1] > f[0];
          var amount = isGreen ? f[1] : f[0];
          var level = Math.round(amount * 6);
          var k = (isGreen ? "g" : "r") + level;
          if (k !== runKey) {
            flush(i);
            runStart = Math.max(0, i - 1);
            runKey = k;
            runCol = isGreen ? GREEN : RED;
            runA = (level / 6) * (route.main ? 0.95 : 0.75);
          }
        }
        flush(geo.pts.length - 1);
      });
    });

    // Zmiana — nowa trasa rysuje się świetlistą linią.
    if (sc.kind === "reroute" && t >= T.fix && t < T.green + 1.5) {
      var draw1 = smooth(T.fix, T.fix + T.preview, t);
      var fade1 = 1 - smooth(T.fix + T.preview + T.morph * 0.6, T.green + 1.2, t);
      routes.forEach(function (route) {
        if (!route.preview) return;
        var g = route.preview;
        ctx.save();
        ctx.shadowBlur = 16 * view.dpr;
        ctx.shadowColor = rgba(VIOLET, 0.9 * fade1);
        ctx.strokeStyle = rgba(VIOLET, 0.95 * fade1);
        ctx.lineWidth = 2.2 * px;
        strokePartial(g, g.total * draw1);
        ctx.restore();
        if (draw1 > 0 && draw1 < 1) {
          var head = pointAt(g, draw1);
          ctx.beginPath();
          ctx.arc(head[0], head[1], 4.5 * px, 0, Math.PI * 2);
          ctx.fillStyle = rgba(HEAD, 0.95);
          ctx.fill();
        }
      });
    }

    // Węzły.
    junctions.forEach(function (j) {
      var visible = 1;
      j.routes.forEach(function (ri) {
        if (routes[ri].alt) visible = Math.min(visible, 1 - routes[ri].morph * 0.85);
      });
      var f = fields(j.d, t, sc);
      var col = f[1] > f[0] ? mix(STATION, GREEN, f[1]) : mix(STATION, RED, f[0]);
      ctx.beginPath();
      ctx.arc(j.at[0], j.at[1], 3.4 * px, 0, Math.PI * 2);
      ctx.fillStyle = BG;
      ctx.fill();
      ctx.strokeStyle = rgba(col, 0.75 * visible * intro);
      ctx.lineWidth = px;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(j.at[0], j.at[1], 1.1 * px, 0, Math.PI * 2);
      ctx.fillStyle = rgba(col, 0.8 * visible * intro);
      ctx.fill();
    });

    drawClot(t, sc, px);

    // Zadania.
    [false, true].forEach(function (mainPass) {
      particles.forEach(function (pt) {
        var route = routes[pt.route];
        if (route.main !== mainPass) return;
        var pos = pointAt(route.geo, pt.p);
        var f = fields(distAt(route, pt.p), t, sc);
        var red = Math.max(f[0], pt.blocked ? smooth(0, 0.35, pt.wait) : 0);
        var green = Math.max(f[1], pt.rec > 0 ? Math.min(1, pt.rec / 0.8) : 0);
        var col = mix(mix(WHITE, RED, red), GREEN, green);
        var emph = Math.max(red, green);
        var edge = smooth(0, 0.03, pt.p) * (1 - smooth(0.97, 1, pt.p));
        var alpha = (route.main ? 0.96 : 0.62) * edge * intro;
        if (alpha < 0.02) return;
        var tail = pointAt(route.geo, Math.max(0, pt.p - 0.5 / route.geo.total));
        ctx.beginPath();
        ctx.moveTo(tail[0], tail[1]);
        ctx.lineTo(pos[0], pos[1]);
        ctx.strokeStyle = rgba(col, alpha * 0.3);
        ctx.lineWidth = 1.8 * px;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(pos[0], pos[1], (6 + emph * 4) * px, 0, Math.PI * 2);
        ctx.fillStyle = rgba(col, alpha * (0.06 + emph * 0.1) * HALO);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(pos[0], pos[1], ((route.main ? 2.2 : 1.6) + emph * 0.9) * px, 0, Math.PI * 2);
        ctx.fillStyle = rgba(col, alpha);
        ctx.fill();
      });
    });

    // Miękkie, eliptyczne wygaszenie krawędzi: sieć wtapia się w tło strony.
    ctx.setTransform(view.dpr, 0, 0, view.dpr, 0, 0);
    ctx.save();
    ctx.translate(view.w / 2, view.h / 2);
    ctx.scale(view.w / 2, view.h / 2);
    var vignette = ctx.createRadialGradient(0, 0, 0.6, 0, 0, 1.12);
    vignette.addColorStop(0, rgba(BG_RGB, 0));
    vignette.addColorStop(0.55, rgba(BG_RGB, 0.55));
    vignette.addColorStop(1, rgba(BG_RGB, 1));
    ctx.fillStyle = vignette;
    ctx.fillRect(-1.3, -1.3, 2.6, 2.6);
    ctx.restore();
  }

  function drawClot(t, sc, px) {
    if (t < T.clot) return;
    var at = sc.at;
    var appear = smooth(T.clot, T.clot + 0.45, t);
    var pop = appear < 1 ? 1 + Math.sin(appear * Math.PI) * 0.35 : 1;
    var pulse = 0.85 + Math.sin(clock.total * 3.2) * 0.15;
    var alive;
    if (sc.kind === "reroute") alive = 1 - smooth(T.fix + T.preview + T.morph * 0.3, T.green + 0.6, t);
    else alive = 1 - smooth(T.fix, T.fix + 0.9, t);

    // sygnał pojawienia się
    var ping = clamp((t - T.clot) / 1.1, 0, 1);
    if (ping > 0 && ping < 1) {
      ctx.beginPath();
      ctx.arc(at[0], at[1], (6 + ping * 30) * px, 0, Math.PI * 2);
      ctx.strokeStyle = rgba(RED, 0.6 * (1 - ping));
      ctx.lineWidth = 1.5 * px;
      ctx.stroke();
    }

    if (alive > 0.01) {
      var halo = ctx.createRadialGradient(at[0], at[1], 0, at[0], at[1], 38 * px);
      halo.addColorStop(0, rgba(RED, 0.34 * alive * pulse * HALO));
      halo.addColorStop(1, rgba(RED, 0));
      ctx.fillStyle = halo;
      ctx.fillRect(at[0] - 38 * px, at[1] - 38 * px, 76 * px, 76 * px);
      ctx.beginPath();
      ctx.arc(at[0], at[1], (10 + pulse * 2) * px, 0, Math.PI * 2);
      ctx.strokeStyle = rgba(RED, 0.5 * alive * appear);
      ctx.lineWidth = px;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(at[0], at[1], 5.5 * pop * appear * px, 0, Math.PI * 2);
      ctx.fillStyle = rgba(RED, alive);
      ctx.fill();
    }

    // Mechanizm: zator zamienia się w sprawny węzeł, który przepuszcza pracę.
    if (sc.kind === "engine" && t >= T.fix) {
      var form = smooth(T.fix + 0.15, T.fix + 1.0, t);
      var gone = smooth(T.white, T.end - 0.2, t);
      var flash = smooth(T.green - 0.25, T.green, t) * (1 - smooth(T.green, T.green + 0.9, t));
      var greenness = smooth(T.green, T.green + 0.6, t) * (1 - smooth(T.hold, T.white, t));
      var col = mix(VIOLET, GREEN, greenness);
      var a = form * (1 - gone);
      var r = (6 + form * 8) * px;
      // fala przy narodzinach mechanizmu
      var wave = clamp((t - T.fix - 0.3) / 1.1, 0, 1);
      if (wave > 0 && wave < 1) {
        ctx.beginPath();
        ctx.arc(at[0], at[1], (10 + wave * 40) * px, 0, Math.PI * 2);
        ctx.strokeStyle = rgba(VIOLET, 0.7 * (1 - wave));
        ctx.lineWidth = 1.5 * px;
        ctx.stroke();
      }
      var halo2 = ctx.createRadialGradient(at[0], at[1], 0, at[0], at[1], 44 * px);
      halo2.addColorStop(0, rgba(col, (0.3 + flash * 0.3) * a * HALO));
      halo2.addColorStop(1, rgba(col, 0));
      ctx.fillStyle = halo2;
      ctx.fillRect(at[0] - 44 * px, at[1] - 44 * px, 88 * px, 88 * px);
      ctx.save();
      ctx.shadowBlur = (12 + flash * 24) * view.dpr;
      ctx.shadowColor = rgba(col, 0.95 * a);
      ctx.strokeStyle = rgba(col, a);
      ctx.lineWidth = 2.2 * px;
      var rot = clock.total * 2.6;
      for (var s = 0; s < 3; s++) {
        ctx.beginPath();
        ctx.arc(at[0], at[1], r, rot + (s * Math.PI * 2) / 3, rot + (s * Math.PI * 2) / 3 + 1.3);
        ctx.stroke();
      }
      ctx.restore();
      ctx.save();
      ctx.setLineDash([2 * px, 4 * px]);
      ctx.lineDashOffset = -clock.total * 6 * px;
      ctx.beginPath();
      ctx.arc(at[0], at[1], r + 7 * px + flash * 8 * px, 0, Math.PI * 2);
      ctx.strokeStyle = rgba(col, 0.45 * a + flash * 0.4);
      ctx.lineWidth = px;
      ctx.stroke();
      ctx.restore();
      ctx.beginPath();
      ctx.arc(at[0], at[1], 2.6 * px, 0, Math.PI * 2);
      ctx.fillStyle = rgba(HEAD, a);
      ctx.fill();
    }
  }

  /* ---------- Pętla ---------- */
  function loop(now) {
    frame = 0;
    if (!running) return;
    var dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    step(dt);
    draw();
    frame = window.requestAnimationFrame(loop);
  }

  function sync() {
    var go = inView && !document.hidden && !reduce.matches && !frozen;
    if (go && !running) {
      running = true;
      last = performance.now();
      frame = window.requestAnimationFrame(loop);
    } else if (!go && running) {
      running = false;
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    }
    root.classList.toggle("is-still", reduce.matches);
    if (reduce.matches) still();
  }

  // Jedna klatka przy ograniczeniu ruchu: zielona fala w połowie drogi przez czerwoną sieć.
  function still() {
    clock.cycle = 0;
    clock.intro = 10;
    clock.t = 0;
    applyScenario();
    for (var s = 0; s < T.green + 1.1; s += 1 / 30) step(1 / 30);
    stateItems.forEach(function (item) {
      item.classList.remove("is-on");
    });
    shownState = -1;
    draw();
  }

  document.addEventListener("visibilitychange", sync);
  if (reduce.addEventListener) reduce.addEventListener("change", sync);
  if ("ResizeObserver" in window) new ResizeObserver(resize).observe(canvas);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      function (entries) {
        inView = entries[0].isIntersecting;
        sync();
      },
      { threshold: 0.05 }
    ).observe(canvas);
  }

  // Hak do sprawdzania klatek (zrzuty ekranu w testach).
  root.simulateTo = function (seconds) {
    frozen = true;
    sync();
    clock.t = 0;
    clock.cycle = 0;
    clock.total = 0;
    clock.intro = 10;
    setup();
    for (var s = 0; s < seconds; s += 1 / 60) step(1 / 60);
    draw();
    return { t: clock.t, cycle: clock.cycle, state: shownState };
  };

  setup();
  resize();
  sync();
})();
