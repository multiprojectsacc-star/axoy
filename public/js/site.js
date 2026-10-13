/* Zachowanie strony: nawigacja, kalkulator opłacalności z wykresem zwrotu, formularz. */
(function () {
  "use strict";

  /* ---------- Nagłówek i menu ---------- */
  var header = document.querySelector(".site-header");
  var nav = document.getElementById("nav");
  var menuButton = document.querySelector(".menu-btn");

  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function setMenu(open) {
    if (!nav || !menuButton) return;
    nav.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
  }
  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      setMenu(!nav.classList.contains("is-open"));
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setMenu(false);
        menuButton.focus();
      }
    });
  }

  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- Kalkulator opłacalności ----------
   * Te same założenia i wzory co w lib/roi.ts w aplikacji. */
  var LIMITS = { monthlyHours: 1000, hourlyCost: 500, timeReduction: 100, projectCost: 200000, monthlyMaintenance: 20000 };
  var DEFAULTS = { monthlyHours: 80, hourlyCost: 100, timeReduction: 40, projectCost: 12000, monthlyMaintenance: 500 };

  function sanitize(value, maximum) {
    var parsed =
      typeof value === "number" ? value : typeof value === "string" && value.trim() ? Number(value.trim().replace(",", ".")) : 0;
    if (!isFinite(parsed)) return 0;
    return Math.round(Math.min(maximum, Math.max(0, parsed)) * 100) / 100;
  }

  function calculate(values) {
    var inputs = {};
    Object.keys(LIMITS).forEach(function (field) {
      inputs[field] = sanitize(values[field], LIMITS[field]);
    });
    var hours = (inputs.monthlyHours * inputs.timeReduction) / 100;
    var value = hours * inputs.hourlyCost;
    var net = value - inputs.monthlyMaintenance;
    return {
      inputs: inputs,
      monthlyHoursReleased: hours,
      monthlyTimeValue: value,
      monthlyNetValue: net,
      paybackMonths: net > 0 ? inputs.projectCost / net : null,
      firstYearRoi: inputs.projectCost > 0 ? ((12 * net - inputs.projectCost) / inputs.projectCost) * 100 : null
    };
  }

  var numberFormat = new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 1 });
  var moneyFormat = new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 0 });
  var compactFormat = new Intl.NumberFormat("pl-PL", { notation: "compact", maximumFractionDigits: 1 });
  function money(v) {
    return moneyFormat.format(Math.round(v)).replace("-", "−") + " zł";
  }

  var calc = document.querySelector(".calc");
  if (calc) {
    var fields = {
      monthlyHours: calc.querySelector("#roi-hours"),
      hourlyCost: calc.querySelector("#roi-rate"),
      projectCost: calc.querySelector("#roi-cost"),
      monthlyMaintenance: calc.querySelector("#roi-upkeep"),
      timeReduction: calc.querySelector("#roi-cut")
    };
    var cutOut = calc.querySelector("#roi-cut-out");
    var out = {
      hours: calc.querySelector('[data-out="hours"]'),
      value: calc.querySelector('[data-out="value"]'),
      net: calc.querySelector('[data-out="net"]'),
      payback: calc.querySelector('[data-out="payback"]'),
      roi: calc.querySelector('[data-out="roi"]')
    };
    var chartHost = calc.querySelector("[data-chart]");
    var chart = createPaybackChart(chartHost);

    function read() {
      var values = {};
      Object.keys(fields).forEach(function (k) {
        values[k] = fields[k].value;
      });
      return values;
    }

    function render() {
      var r = calculate(read());
      var cut = r.inputs.timeReduction;
      cutOut.textContent = numberFormat.format(cut) + "%";
      fields.timeReduction.style.setProperty("--progress", cut + "%");
      fields.timeReduction.setAttribute("aria-valuetext", numberFormat.format(cut) + " procent");
      out.hours.textContent = numberFormat.format(r.monthlyHoursReleased);
      out.value.textContent = money(r.monthlyTimeValue);
      out.net.textContent = money(r.monthlyNetValue);
      out.net.classList.toggle("is-negative", r.monthlyNetValue < 0);
      out.payback.textContent = "";
      if (r.paybackMonths === null) {
        out.payback.textContent = "brak zwrotu w tym scenariuszu";
        out.payback.classList.add("is-none");
      } else {
        out.payback.classList.remove("is-none");
        out.payback.append(numberFormat.format(r.paybackMonths) + " ");
        var small = document.createElement("small");
        small.textContent = "mies.";
        out.payback.append(small);
      }
      out.roi.textContent = r.firstYearRoi === null ? "nie dotyczy" : numberFormat.format(r.firstYearRoi).replace("-", "−") + "%";
      out.roi.classList.toggle("is-none", r.firstYearRoi === null);
      chart.update(r);
    }

    Object.keys(fields).forEach(function (k) {
      var input = fields[k];
      input.addEventListener("input", render);
      if (input.type === "number") {
        input.addEventListener("blur", function () {
          input.value = String(sanitize(input.value, LIMITS[k]));
          render();
        });
      }
    });
    calc.querySelector("[data-roi-reset]").addEventListener("click", function () {
      Object.keys(DEFAULTS).forEach(function (k) {
        fields[k].value = String(DEFAULTS[k]);
      });
      render();
    });
    render();
  }

  /* ---------- Wykres zwrotu (SVG) ---------- */
  function createPaybackChart(host) {
    var NS = "http://www.w3.org/2000/svg";
    var MONTHS = 24;
    var state = null;
    var hover = null;

    host.setAttribute("tabindex", "0");
    host.setAttribute("role", "img");
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("aria-hidden", "true");
    host.appendChild(svg);
    var tip = document.createElement("div");
    tip.className = "chart-tip";
    tip.hidden = true;
    var tipValue = document.createElement("strong");
    var tipLabel = document.createElement("span");
    tip.appendChild(tipValue);
    tip.appendChild(tipLabel);
    host.appendChild(tip);

    function el(name, attrs, parent) {
      var node = document.createElementNS(NS, name);
      Object.keys(attrs).forEach(function (k) {
        node.setAttribute(k, attrs[k]);
      });
      (parent || svg).appendChild(node);
      return node;
    }

    function niceStep(range, count) {
      var raw = range / count;
      var pow = Math.pow(10, Math.floor(Math.log10(raw || 1)));
      var n = raw / pow;
      var nice = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
      return nice * pow;
    }

    function draw() {
      if (!state) return;
      var width = Math.max(260, host.clientWidth);
      var height = width < 480 ? 190 : 220;
      var pad = { l: 56, r: 18, t: 22, b: 30 };
      svg.setAttribute("viewBox", "0 0 " + width + " " + height);
      svg.setAttribute("width", width);
      svg.setAttribute("height", height);
      while (svg.firstChild) svg.removeChild(svg.firstChild);

      var cost = state.inputs.projectCost;
      var net = state.monthlyNetValue;
      var values = [];
      for (var m = 0; m <= MONTHS; m++) values.push(-cost + m * net);
      var lo = Math.min(0, values[0], values[MONTHS]);
      var hi = Math.max(0, values[0], values[MONTHS]);
      if (hi - lo < 1) hi = lo + 1000;
      var step = niceStep(hi - lo, 4);
      lo = Math.floor(lo / step) * step;
      hi = Math.ceil(hi / step) * step;

      var plotW = width - pad.l - pad.r;
      var plotH = height - pad.t - pad.b;
      function x(month) {
        return pad.l + (month / MONTHS) * plotW;
      }
      function y(v) {
        return pad.t + (1 - (v - lo) / (hi - lo)) * plotH;
      }
      var zeroY = y(0);

      // siatka i oś wartości
      var grid = el("g", { class: "chart-grid" });
      for (var v = lo; v <= hi + 1e-6; v += step) {
        el("line", { x1: pad.l, x2: width - pad.r, y1: y(v), y2: y(v), class: Math.abs(v) < 1e-6 ? "zero" : "" }, grid);
        var t = el("text", { x: pad.l - 10, y: y(v) + 4, class: "chart-tick", "text-anchor": "end" }, grid);
        t.textContent = Math.abs(v) < 1e-6 ? "0 zł" : compactFormat.format(v).replace("-", "−");
      }
      (width < 420 ? [0, 12, 24] : [0, 6, 12, 18, 24]).forEach(function (month) {
        var tx = el("text", { x: x(month), y: height - 8, class: "chart-tick", "text-anchor": month === 0 ? "start" : month === MONTHS ? "end" : "middle" }, grid);
        tx.textContent = month === 0 ? "start" : month === MONTHS ? month + " mies." : String(month);
      });

      // obszary: poniżej zera (jeszcze się nie zwróciło) i powyżej (zysk)
      var defs = el("defs", {});
      var id = "c" + Math.random().toString(36).slice(2, 8);
      var clipLow = el("clipPath", { id: id + "lo" }, defs);
      el("rect", { x: 0, y: zeroY, width: width, height: Math.max(0, height - zeroY) }, clipLow);
      var clipHigh = el("clipPath", { id: id + "hi" }, defs);
      el("rect", { x: 0, y: 0, width: width, height: Math.max(0, zeroY) }, clipHigh);

      var linePath = "";
      values.forEach(function (val, i) {
        linePath += (i ? "L" : "M") + x(i).toFixed(1) + " " + y(val).toFixed(1);
      });
      var areaPath = linePath + "L" + x(MONTHS).toFixed(1) + " " + zeroY.toFixed(1) + "L" + x(0).toFixed(1) + " " + zeroY.toFixed(1) + "Z";
      el("path", { d: areaPath, class: "chart-area chart-area--jam", "clip-path": "url(#" + id + "lo)" });
      el("path", { d: areaPath, class: "chart-area chart-area--flow", "clip-path": "url(#" + id + "hi)" });
      el("path", { d: linePath, class: "chart-line chart-line--jam", "clip-path": "url(#" + id + "lo)" });
      el("path", { d: linePath, class: "chart-line chart-line--flow", "clip-path": "url(#" + id + "hi)" });

      // punkt zwrotu i wartość końcowa
      var end = values[MONTHS];
      var summary;
      if (state.paybackMonths !== null && state.paybackMonths <= MONTHS) {
        var px = x(state.paybackMonths);
        el("circle", { cx: px, cy: zeroY, r: 5, class: "chart-mark" });
        var label = el("text", { x: px, y: zeroY - 12, class: "chart-label", "text-anchor": px > width - 120 ? "end" : px < pad.l + 60 ? "start" : "middle" });
        label.textContent = "zwrot po " + numberFormat.format(state.paybackMonths) + " mies.";
        summary = "Wdrożenie zwraca się po " + numberFormat.format(state.paybackMonths) + " miesiącach.";
      } else if (state.paybackMonths !== null) {
        summary = "Wdrożenie zwraca się po " + numberFormat.format(state.paybackMonths) + " miesiącach, czyli później niż w pokazanych 24 miesiącach.";
      } else {
        summary = "W tym scenariuszu wdrożenie się nie zwraca.";
      }
      el("circle", { cx: x(MONTHS), cy: y(end), r: 4, class: end >= 0 ? "chart-end chart-end--flow" : "chart-end chart-end--jam" });
      var endLabel = el("text", { x: x(MONTHS) - 8, y: y(end) + (end >= 0 ? -10 : 18), class: "chart-label", "text-anchor": "end" });
      endLabel.textContent = money(end);

      host.setAttribute(
        "aria-label",
        "Wykres wyniku narastająco: od " + money(values[0]) + " na starcie do " + money(end) + " po 24 miesiącach. " + summary + " Strzałkami w lewo i w prawo sprawdzisz wynik w kolejnych miesiącach."
      );

      // warstwa kursora
      var cursor = el("g", { class: "chart-cursor" });
      cursor.style.display = "none";
      var cursorLine = el("line", { y1: pad.t, y2: height - pad.b }, cursor);
      var cursorDot = el("circle", { r: 4.5 }, cursor);

      function show(month) {
        hover = month;
        var val = values[month];
        cursor.style.display = "";
        cursorLine.setAttribute("x1", x(month));
        cursorLine.setAttribute("x2", x(month));
        cursorDot.setAttribute("cx", x(month));
        cursorDot.setAttribute("cy", y(val));
        cursorDot.setAttribute("class", val >= 0 ? "is-flow" : "is-jam");
        tipValue.textContent = money(val);
        tipLabel.textContent = month === 0 ? "na starcie, po opłaceniu wdrożenia" : "po " + month + " " + (month === 1 ? "miesiącu" : "miesiącach");
        tip.hidden = false;
        var left = x(month);
        tip.style.left = Math.min(width - 8, Math.max(8, left)) + "px";
        tip.style.top = Math.max(0, y(val) - 14) + "px";
        tip.classList.toggle("chart-tip--left", left > width * 0.7);
        tip.classList.toggle("chart-tip--right", left < width * 0.3);
      }
      function hide() {
        hover = null;
        cursor.style.display = "none";
        tip.hidden = true;
      }
      host.onpointermove = function (event) {
        var rect = svg.getBoundingClientRect();
        var month = Math.round(((event.clientX - rect.left - pad.l) / plotW) * MONTHS);
        show(Math.min(MONTHS, Math.max(0, month)));
      };
      host.onpointerleave = hide;
      host.onblur = hide;
      host.onfocus = function () {
        show(hover === null ? 12 : hover);
      };
      host.onkeydown = function (event) {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Home" && event.key !== "End") return;
        event.preventDefault();
        var current = hover === null ? 12 : hover;
        if (event.key === "ArrowLeft") current -= 1;
        if (event.key === "ArrowRight") current += 1;
        if (event.key === "Home") current = 0;
        if (event.key === "End") current = MONTHS;
        show(Math.min(MONTHS, Math.max(0, current)));
      };
      if (hover !== null) show(hover);
    }

    if ("ResizeObserver" in window) new ResizeObserver(draw).observe(host);
    return {
      update: function (next) {
        state = next;
        draw();
      }
    };
  }

  /* ---------- Schemat dopływu klientów: animacja ----------
   * Każdy kanał ma własny tor do „Twojej firmy”, tory nie nachodzą na siebie.
   * Kropki płyną z kanałów do firmy, z firmy wychodzą zielone kropki i jedna po drugiej
   * układają się w siatkę nowych klientów. Tor axoy niesie żółtą kropkę „doładowania”,
   * a wokół niego co jakiś czas przeskakują łuki elektryczne. */
  var inflow = document.querySelector(".inflow");
  if (inflow) {
    var SVG_NS = "http://www.w3.org/2000/svg";
    var layer = document.createElementNS(SVG_NS, "svg");
    layer.setAttribute("class", "inflow-lines");
    layer.setAttribute("aria-hidden", "true");
    inflow.insertBefore(layer, inflow.firstChild);
    var gPaths = document.createElementNS(SVG_NS, "g");
    var gArcs = document.createElementNS(SVG_NS, "g");
    var gDots = document.createElementNS(SVG_NS, "g");
    layer.appendChild(gPaths);
    layer.appendChild(gArcs);
    layer.appendChild(gDots);

    var firmEl = inflow.querySelector(".inflow-firm");
    var clientDots = Array.prototype.slice.call(inflow.querySelectorAll(".inflow-dots i"));
    var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var rounded = function (points, radius) {
      var d = "M" + points[0][0].toFixed(1) + " " + points[0][1].toFixed(1);
      for (var i = 1; i < points.length - 1; i++) {
        var a = points[i - 1], c = points[i], b = points[i + 1];
        var inLen = Math.hypot(c[0] - a[0], c[1] - a[1]);
        var outLen = Math.hypot(b[0] - c[0], b[1] - c[1]);
        var r = Math.min(radius, inLen / 2, outLen / 2);
        if (r < 0.5) {
          d += "L" + c[0].toFixed(1) + " " + c[1].toFixed(1);
          continue;
        }
        var e = [c[0] + ((a[0] - c[0]) * r) / inLen, c[1] + ((a[1] - c[1]) * r) / inLen];
        var x = [c[0] + ((b[0] - c[0]) * r) / outLen, c[1] + ((b[1] - c[1]) * r) / outLen];
        d += "L" + e[0].toFixed(1) + " " + e[1].toFixed(1) + "Q" + c[0].toFixed(1) + " " + c[1].toFixed(1) + " " + x[0].toFixed(1) + " " + x[1].toFixed(1);
      }
      var last = points[points.length - 1];
      return d + "L" + last[0].toFixed(1) + " " + last[1].toFixed(1);
    };

    var svgEl = function (name, attrs, parent) {
      var node = document.createElementNS(SVG_NS, name);
      Object.keys(attrs).forEach(function (k) {
        node.setAttribute(k, attrs[k]);
      });
      parent.appendChild(node);
      return node;
    };
    var empty = function (node) {
      while (node.firstChild) node.removeChild(node.firstChild);
    };

    var inRoutes = [];
    var outRoute = null;
    var boostRoute = null;
    var pulses = [];
    var nextSpawn = [];
    var outQueue = [];
    var bursts = [];
    var nextBurst = 0;
    var arcsRedraw = 0;
    var arrivals = 0;
    var lit = 0;
    var resetAt = 0;
    var running = false;
    var raf = 0;
    var SPEED = 0.11; // px na ms

    // Tory bez nakładania: wejścia rozłożone na krawędzi firmy w tej samej kolejności co kanały;
    // kanał najdalej od środka skręca najbliżej firmy, kolejne coraz wcześniej.
    var layoutRoutes = function (pills, firm, dots, horizontal) {
      var n = pills.length;
      var defs = [];
      var lanes = {};
      if (horizontal) {
        var rightMost = Math.max.apply(null, pills.map(function (p) { return p.r; }));
        var top = firm.t + (firm.b - firm.t) * 0.12;
        var bottom = firm.b - (firm.b - firm.t) * 0.12;
        var entry = pills.map(function (p, i) { return n > 1 ? top + ((bottom - top) * i) / (n - 1) : firm.cy; });
        var down = [], up = [];
        pills.forEach(function (p, i) {
          var dy = entry[i] - p.cy;
          if (dy > 1.5) down.push(i);
          else if (dy < -1.5) up.push(i);
        });
        up.reverse();
        var gap = firm.l - rightMost;
        var count = Math.max(down.length, up.length, 1);
        var step = Math.min(16, (gap * 0.6) / count);
        var near = firm.l - Math.max(14, gap * 0.18);
        down.forEach(function (i, k) { lanes[i] = near - k * step; });
        up.forEach(function (i, k) { lanes[i] = near - k * step; });
        pills.forEach(function (p, i) {
          defs.push(lanes[i] === undefined
            ? [[p.r, p.cy], [firm.l, p.cy]]
            : [[p.r, p.cy], [lanes[i], p.cy], [lanes[i], entry[i]], [firm.l, entry[i]]]);
        });
        defs.push([[firm.r, firm.cy], [dots.l - 14, firm.cy]]);
      } else {
        var order = pills.map(function (p, i) { return i; }).sort(function (a, b) { return pills[a].cx - pills[b].cx; });
        var left = firm.l + (firm.r - firm.l) * 0.16;
        var right = firm.r - (firm.r - firm.l) * 0.16;
        var entryX = {};
        order.forEach(function (i, k) { entryX[i] = n > 1 ? left + ((right - left) * k) / (n - 1) : firm.cx; });
        var toRight = [], toLeft = [];
        order.forEach(function (i) {
          var dx = entryX[i] - pills[i].cx;
          if (dx > 1.5) toRight.push(i);
          else if (dx < -1.5) toLeft.push(i);
        });
        toLeft.reverse();
        var lowest = Math.max.apply(null, pills.map(function (p) { return p.b; }));
        var gapV = firm.t - lowest;
        var countV = Math.max(toRight.length, toLeft.length, 1);
        var stepV = Math.min(8, (gapV * 0.6) / countV);
        var nearV = firm.t - Math.max(8, gapV * 0.2);
        toRight.forEach(function (i, k) { lanes[i] = nearV - k * stepV; });
        toLeft.forEach(function (i, k) { lanes[i] = nearV - k * stepV; });
        pills.forEach(function (p, i) {
          defs.push(lanes[i] === undefined
            ? [[p.cx, p.b], [p.cx, firm.t]]
            : [[p.cx, p.b], [p.cx, lanes[i]], [entryX[i], lanes[i]], [entryX[i], firm.t]]);
        });
        defs.push([[firm.cx, firm.b], [firm.cx, dots.t - 12]]);
      }
      return defs;
    };

    var clearMotion = function () {
      empty(gDots);
      empty(gArcs);
      pulses = [];
      nextSpawn = [];
      outQueue = [];
      bursts = [];
      nextBurst = 0;
    };

    var drawStill = function () {
      // bez ruchu: po jednej kropce na każdym torze, wszyscy klienci widoczni
      inRoutes.forEach(function (route, i) {
        if (!route.len) return;
        var pt = route.el.getPointAtLength(route.len * (route.kind === "boost" ? 0.55 : 0.32 + (i % 3) * 0.1));
        svgEl("circle", { cx: pt.x.toFixed(1), cy: pt.y.toFixed(1), r: route.kind === "boost" ? 5 : 3.2, class: "pulse pulse--" + route.kind }, gDots);
      });
      if (outRoute && outRoute.len) {
        var pt = outRoute.el.getPointAtLength(outRoute.len * 0.5);
        svgEl("circle", { cx: pt.x.toFixed(1), cy: pt.y.toFixed(1), r: 4, class: "pulse pulse--out" }, gDots);
      }
    };

    var drawInflow = function () {
      var box = inflow.getBoundingClientRect();
      if (!box.width) return;
      layer.setAttribute("viewBox", "0 0 " + box.width + " " + box.height);
      empty(gPaths);
      clearMotion();
      var rel = function (node) {
        var r = node.getBoundingClientRect();
        return { l: r.left - box.left, r: r.right - box.left, t: r.top - box.top, b: r.bottom - box.top, cx: r.left - box.left + r.width / 2, cy: r.top - box.top + r.height / 2 };
      };
      var items = Array.prototype.slice.call(inflow.querySelectorAll(".inflow-channels li"));
      var pills = items.map(rel);
      var firm = rel(firmEl);
      var dots = rel(inflow.querySelector(".inflow-dots"));
      var rightMost = Math.max.apply(null, pills.map(function (p) { return p.r; }));
      var defs = layoutRoutes(pills, firm, dots, firm.l > rightMost + 8);
      inRoutes = [];
      outRoute = null;
      boostRoute = null;
      defs.forEach(function (pts, i) {
        var kind = i === defs.length - 1 ? "out" : items[i].classList.contains("inflow-axoy") ? "boost" : "in";
        var path = svgEl("path", { d: rounded(pts, 12), class: "route route--" + kind }, gPaths);
        var route = { el: path, len: path.getTotalLength ? path.getTotalLength() : 0, kind: kind };
        if (kind === "out") outRoute = route;
        else inRoutes.push(route);
        if (kind === "boost") boostRoute = route;
      });
      if (calm) drawStill();
    };

    var spawn = function (route, now) {
      var el = svgEl("circle", { r: route.kind === "boost" ? 5 : route.kind === "out" ? 4 : 3.2, class: "pulse pulse--" + route.kind, cx: -20, cy: -20 }, gDots);
      pulses.push({ route: route, start: now, el: el, dist: 0 });
    };

    var flashTimers = {};
    var flash = function (cls, ms) {
      firmEl.classList.add(cls);
      clearTimeout(flashTimers[cls]);
      flashTimers[cls] = setTimeout(function () { firmEl.classList.remove(cls); }, ms);
    };

    var arrive = function (kind, now) {
      if (kind === "out") {
        if (lit < clientDots.length) {
          clientDots[lit].classList.add("is-on");
          lit++;
          if (lit === clientDots.length) resetAt = now + 2200;
        }
        return;
      }
      if (kind === "boost") {
        flash("is-boost", 700);
        outQueue.push(now + 80, now + 380, now + 680);
      } else {
        flash("is-hit", 260);
        arrivals++;
        if (arrivals % 2 === 0) outQueue.push(now + 140);
      }
    };

    var drawArc = function (route, s, span, cls) {
      var a = Math.max(0, s - span / 2);
      var b = Math.min(route.len, s + span / 2);
      if (b - a < 8) return;
      var steps = 7;
      var pts = [];
      for (var j = 0; j <= steps; j++) {
        var d = a + ((b - a) * j) / steps;
        var p = route.el.getPointAtLength(d);
        var q = route.el.getPointAtLength(Math.min(route.len, d + 1.5));
        var tx = q.x - p.x, ty = q.y - p.y;
        var tl = Math.hypot(tx, ty) || 1;
        var amp = j === 0 || j === steps ? 1.5 : 9;
        var off = (Math.random() * 2 - 1) * amp;
        pts.push((p.x - (ty / tl) * off).toFixed(1) + "," + (p.y + (tx / tl) * off).toFixed(1));
      }
      var line = pts.join(" ");
      svgEl("polyline", { points: line, class: "arc-glow" }, gArcs);
      svgEl("polyline", { points: line, class: cls || "arc" }, gArcs);
    };

    var updateArcs = function (now) {
      if (!boostRoute || !boostRoute.len) return;
      if (!nextBurst) nextBurst = now + 700;
      if (now >= nextBurst) {
        bursts.push({ until: now + 260 + Math.random() * 260, s: boostRoute.len * (0.1 + Math.random() * 0.8), span: 40 + Math.random() * 40 });
        nextBurst = now + 900 + Math.random() * 1800;
      }
      if (now < arcsRedraw) return;
      arcsRedraw = now + 55;
      empty(gArcs);
      bursts = bursts.filter(function (b) { return b.until > now; });
      bursts.forEach(function (b) {
        drawArc(boostRoute, b.s, b.span);
        drawArc(boostRoute, b.s + (Math.random() * 2 - 1) * 8, b.span * 0.65, "arc arc--thin");
      });
      // iskry wokół żółtej kropki w drodze
      for (var k = 0; k < pulses.length; k++) {
        if (pulses[k].route === boostRoute && pulses[k].dist > 6 && Math.random() < 0.75) {
          drawArc(boostRoute, pulses[k].dist, 20, "arc arc--thin");
        }
      }
    };

    var frame = function (now) {
      if (!running) {
        raf = 0;
        return;
      }
      inRoutes.forEach(function (route, i) {
        if (!route.len) return;
        if (nextSpawn[i] === undefined) nextSpawn[i] = now + 250 + i * 380;
        if (now >= nextSpawn[i]) {
          spawn(route, now);
          nextSpawn[i] = now + (route.kind === "boost" ? 5200 + Math.random() * 2600 : 2600 + Math.random() * 2600);
        }
      });
      while (outQueue.length && outQueue[0] <= now) {
        outQueue.shift();
        if (outRoute && outRoute.len && !resetAt) spawn(outRoute, now);
      }
      for (var k = pulses.length - 1; k >= 0; k--) {
        var p = pulses[k];
        var dist = (now - p.start) * SPEED * (p.route.kind === "boost" ? 0.9 : 1);
        if (dist >= p.route.len) {
          if (p.el.parentNode) p.el.parentNode.removeChild(p.el);
          pulses.splice(k, 1);
          arrive(p.route.kind, now);
          continue;
        }
        p.dist = dist;
        var pt = p.route.el.getPointAtLength(dist);
        p.el.setAttribute("cx", pt.x.toFixed(1));
        p.el.setAttribute("cy", pt.y.toFixed(1));
      }
      updateArcs(now);
      if (resetAt && now >= resetAt) {
        clientDots.forEach(function (d) { d.classList.remove("is-on"); });
        lit = 0;
        resetAt = 0;
      }
      raf = requestAnimationFrame(frame);
    };

    var start = function () {
      if (running || calm) return;
      clearMotion();
      running = true;
      raf = requestAnimationFrame(frame);
    };
    var stop = function () {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    if (!calm) inflow.classList.add("is-live");
    var inView = true;
    if ("IntersectionObserver" in window) {
      inView = false;
      new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting;
        if (inView && !document.hidden) start();
        else stop();
      }, { threshold: 0.15 }).observe(inflow);
    }
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop();
      else if (inView) start();
    });

    if ("ResizeObserver" in window) new ResizeObserver(drawInflow).observe(inflow);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawInflow);
    drawInflow();
    if (inView) start();
  }

  /* ---------- Pięć etapów: punkty zapalają się przy przewijaniu ----------
   * Linia postępu schodzi w dół razem z przewijaniem (do 62% wysokości ekranu). Gdy dojdzie
   * do punktu, punkt dostaje swój kolor. Postęp tylko rośnie, więc kolory zostają; gdy cała
   * sekcja znów jest pod ekranem (użytkownik wrócił nad nią), postęp wraca do zera.
   * Przy szybkim skoku linia dogania cel z ograniczoną prędkością, więc punkty i tak
   * zapalają się po kolei. */
  var stepsList = document.querySelector(".steps");
  if (stepsList) {
    var stepItems = Array.prototype.slice.call(stepsList.querySelectorAll(".step"));
    var stepsSection = stepsList.closest("section") || stepsList;
    var stepsCalm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var stepsTarget = 0; // dokąd ma dojść linia (px od góry listy)
    var stepsShown = 0; // dokąd już doszła
    var stepsRaf = 0;
    var stepsLast = 0;
    var stepsTick = 0;
    stepsList.classList.add("is-scrolly");

    var paintSteps = function () {
      var listTop = stepsList.getBoundingClientRect().top;
      stepItems.forEach(function (item) {
        var box = item.getBoundingClientRect();
        var top = box.top - listTop;
        item.classList.toggle("is-lit", stepsShown >= top + 20);
        var start = top + 44;
        var end = top + box.height - 4;
        var fill = Math.max(0, Math.min(1, (stepsShown - start) / Math.max(1, end - start)));
        item.style.setProperty("--fill", fill.toFixed(3));
      });
    };

    var stepsFrame = function (now) {
      var dt = stepsLast ? Math.min(64, now - stepsLast) : 16;
      stepsLast = now;
      stepsShown = Math.min(stepsTarget, stepsShown + (900 * dt) / 1000);
      paintSteps();
      if (stepsShown < stepsTarget) {
        stepsRaf = requestAnimationFrame(stepsFrame);
      } else {
        stepsRaf = 0;
        stepsLast = 0;
      }
    };

    var checkSteps = function () {
      var vh = window.innerHeight;
      if (stepsSection.getBoundingClientRect().top >= vh) {
        if (stepsTarget || stepsShown) {
          stepsTarget = 0;
          stepsShown = 0;
          if (stepsRaf) cancelAnimationFrame(stepsRaf);
          stepsRaf = 0;
          stepsLast = 0;
          paintSteps();
        }
        return;
      }
      var reach = vh * 0.62 - stepsList.getBoundingClientRect().top;
      if (reach <= stepsTarget) return;
      stepsTarget = reach;
      if (stepsCalm) {
        stepsShown = stepsTarget;
        paintSteps();
      } else if (!stepsRaf) {
        stepsRaf = requestAnimationFrame(stepsFrame);
      }
    };

    var onStepsScroll = function () {
      if (stepsTick) return;
      stepsTick = requestAnimationFrame(function () {
        stepsTick = 0;
        checkSteps();
      });
    };
    window.addEventListener("scroll", onStepsScroll, { passive: true });
    window.addEventListener("resize", onStepsScroll);
    paintSteps();
    checkSteps();
  }

  /* ---------- Zakres usług: ruch na schematach ----------
   * Tory z atrybutem data-flow niosą kropki:
   *   slow – szara kropka powoli przedziera się przez dzisiejszy proces i stoi w zatorze,
   *   go   – zielone kropki płyną nową trasą do celu,
   *   in   – fioletowy ruch z kanałów do firmy; każde dotarcie wypuszcza zielonego klienta,
   *   out  – zielony klient płynie z firmy i zapala kolejną kropkę w siatce klientów.
   * Linie nowych tras rysują się, gdy karta pojawia się na ekranie. Najechanie na kartę
   * przyspiesza ruch. Bez ruchu (prefers-reduced-motion) zostaje spokojny rysunek. */
  var servicesSection = document.querySelector("[data-services]");
  var servicesCalm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (servicesSection && !servicesCalm) {
    var SVGNS = "http://www.w3.org/2000/svg";
    var arts = [];
    var servicesRaf = 0;
    var servicesLast = 0;

    var nearestLength = function (path, len, x, y) {
      var best = 0;
      var bestDist = Infinity;
      for (var s = 0; s <= len; s += 2) {
        var p = path.getPointAtLength(s);
        var dist = (p.x - x) * (p.x - x) + (p.y - y) * (p.y - y);
        if (dist < bestDist) {
          bestDist = dist;
          best = s;
        }
      }
      return best;
    };

    var makeDot = function (art, kind) {
      if (!art.layer) {
        art.layer = document.createElementNS(SVGNS, "g");
        art.layer.setAttribute("class", "dots");
        art.svg.appendChild(art.layer);
      }
      var dot = document.createElementNS(SVGNS, "circle");
      dot.setAttribute("r", kind === "in" ? 3.2 : kind === "out" ? 3.6 : 3.4);
      dot.setAttribute("class", "dot dot--" + kind);
      dot.setAttribute("cx", "-20");
      dot.setAttribute("cy", "-20");
      dot.style.opacity = "0";
      art.layer.appendChild(dot);
      return dot;
    };

    var placeDot = function (dot, flow, dist, alpha) {
      var pt = flow.path.getPointAtLength(dist);
      dot.setAttribute("cx", pt.x.toFixed(1));
      dot.setAttribute("cy", pt.y.toFixed(1));
      dot.style.opacity = String(alpha * Math.max(0, Math.min(1, dist / 10, (flow.len - dist) / 10)));
    };

    var flashEl = function (el, ms) {
      el.classList.add("is-hit");
      clearTimeout(el.axoyHit);
      el.axoyHit = setTimeout(function () {
        el.classList.remove("is-hit");
      }, ms);
    };

    var arrive = function (art, flow, now) {
      if (flow.hit) flashEl(flow.hit, flow.kind === "go" ? 320 : 280);
      if (flow.emit && !art.resetAt) {
        var target = art.flows.filter(function (f) { return f.kind === flow.emit; })[0];
        if (target) target.dots.push({ el: makeDot(art, target.kind), pos: 0 });
      }
      if (flow.kind === "out" && art.clients.length && art.lit < art.clients.length) {
        art.clients[art.lit].classList.add("is-on");
        art.lit++;
        if (art.lit === art.clients.length) art.resetAt = now + 2200;
      }
    };

    var stepArt = function (art, dt, now) {
      art.speed += ((art.hover ? 2.1 : 1) - art.speed) * Math.min(1, dt / 260);
      if (now >= art.showAt && art.alpha < 1) art.alpha = Math.min(1, art.alpha + dt / 500);
      if (art.resetAt && now >= art.resetAt) {
        art.clients.forEach(function (c) { c.classList.remove("is-on"); });
        art.lit = 0;
        art.resetAt = 0;
      }
      art.flows.forEach(function (flow) {
        var step = (dt * flow.speed * art.speed) / 1000;
        if (flow.spawn) {
          for (var k = flow.dots.length - 1; k >= 0; k--) {
            var item = flow.dots[k];
            item.pos += step;
            if (item.pos >= flow.len) {
              if (item.el.parentNode) item.el.parentNode.removeChild(item.el);
              flow.dots.splice(k, 1);
              arrive(art, flow, now);
              continue;
            }
            placeDot(item.el, flow, item.pos, art.alpha);
          }
          return;
        }
        if (flow.waitUntil && now < flow.waitUntil) step = 0;
        else flow.waitUntil = 0;
        var prev = flow.pos;
        var next = prev + step;
        // postój w zatorze (tylko pierwsza kropka toru)
        if (flow.stopAt >= 0 && prev < flow.stopAt && next >= flow.stopAt) {
          next = flow.stopAt;
          flow.waitUntil = now + flow.wait / art.speed;
        }
        var gap = flow.len / flow.dots.length;
        flow.dots.forEach(function (dot, i) {
          var before = (prev + i * gap) % flow.len;
          var after = (next + i * gap) % flow.len;
          if (step > 0 && after < before) arrive(art, flow, now);
          placeDot(dot, flow, after, art.alpha);
        });
        flow.pos = next % flow.len;
      });
    };

    var servicesTick = function (now) {
      var dt = servicesLast ? Math.min(64, now - servicesLast) : 16;
      servicesLast = now;
      var any = false;
      arts.forEach(function (art) {
        if (!art.visible) return;
        any = true;
        stepArt(art, dt, now);
      });
      if (any && !document.hidden) {
        servicesRaf = requestAnimationFrame(servicesTick);
      } else {
        servicesRaf = 0;
        servicesLast = 0;
      }
    };
    var servicesWake = function () {
      if (servicesRaf || document.hidden) return;
      servicesLast = 0;
      servicesRaf = requestAnimationFrame(servicesTick);
    };

    var drawIn = function (art) {
      Array.prototype.forEach.call(art.svg.querySelectorAll(".new, .out"), function (path, i) {
        var delay = 120 + i * 140;
        path.getBoundingClientRect();
        path.style.transition = "stroke-dashoffset 1.1s cubic-bezier(0.3, 0.7, 0.2, 1) " + delay + "ms";
        path.style.strokeDashoffset = "0";
        setTimeout(function () {
          path.style.transition = "";
          path.style.strokeDasharray = "";
          path.style.strokeDashoffset = "";
        }, delay + 1200);
      });
      art.showAt = performance.now() + 750;
    };

    Array.prototype.forEach.call(servicesSection.querySelectorAll(".service"), function (card) {
      var box = card.querySelector(".service-art");
      var svg = box && box.querySelector("svg");
      var first = svg && svg.querySelector("path[data-flow]");
      if (!first || typeof first.getTotalLength !== "function") return;
      var art = { card: card, box: box, svg: svg, flows: [], clients: [], lit: 0, resetAt: 0, speed: 1, hover: false, visible: false, started: false, alpha: 0, showAt: Infinity, layer: null };
      Array.prototype.forEach.call(svg.querySelectorAll("[data-flow]"), function (path) {
        var len = path.getTotalLength();
        var flow = {
          path: path,
          len: len,
          kind: path.getAttribute("data-flow"),
          speed: parseFloat(path.getAttribute("data-speed")) || 60,
          spawn: path.getAttribute("data-mode") === "spawn",
          hit: path.getAttribute("data-hit") ? svg.querySelector(path.getAttribute("data-hit")) : null,
          emit: path.getAttribute("data-emit"),
          pos: (parseFloat(path.getAttribute("data-phase")) || 0) * len,
          wait: parseFloat(path.getAttribute("data-wait")) || 0,
          waitUntil: 0,
          stopAt: -1,
          dots: []
        };
        var stop = path.getAttribute("data-stop");
        if (stop) {
          var xy = stop.split(/[\s,]+/).map(parseFloat);
          flow.stopAt = nearestLength(path, len, xy[0], xy[1]);
        }
        var clients = path.getAttribute("data-clients");
        if (clients) art.clients = Array.prototype.slice.call(svg.querySelectorAll(clients));
        if (!flow.spawn) {
          var count = parseInt(path.getAttribute("data-count"), 10) || 1;
          for (var i = 0; i < count; i++) flow.dots.push(makeDot(art, flow.kind));
        }
        art.flows.push(flow);
      });
      // nowe trasy chowają się do chwili, gdy karta pojawi się na ekranie
      Array.prototype.forEach.call(svg.querySelectorAll(".new, .out"), function (path) {
        var len = path.getTotalLength();
        path.style.strokeDasharray = len + " " + len;
        path.style.strokeDashoffset = String(len);
      });
      box.classList.add("is-live");
      var setHover = function (on) {
        return function () {
          art.hover = on;
        };
      };
      card.addEventListener("pointerenter", setHover(true));
      card.addEventListener("pointerleave", setHover(false));
      card.addEventListener("focusin", setHover(true));
      card.addEventListener("focusout", setHover(false));
      arts.push(art);
    });

    var showArt = function (art, visible) {
      art.visible = visible;
      if (visible && !art.started) {
        art.started = true;
        drawIn(art);
      }
      if (visible) servicesWake();
    };
    if ("IntersectionObserver" in window) {
      var artObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          arts.forEach(function (art) {
            if (art.box === entry.target) showArt(art, entry.isIntersecting);
          });
        });
      }, { threshold: 0.2 });
      arts.forEach(function (art) { artObserver.observe(art.box); });
    } else {
      arts.forEach(function (art) { showArt(art, true); });
    }
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) servicesWake();
    });
  }

  /* ---------- Formularz kontaktowy ---------- */
  var form = document.querySelector(".contact-form");
  if (form) {
    var topics = Array.prototype.slice.call(form.querySelectorAll(".topic"));
    var errorBox = form.querySelector("[data-form-error]");
    var submit = form.querySelector("[data-submit]");
    var success = document.querySelector("[data-form-success]");
    var successText = success.querySelector("[data-success-text]");
    var sending = false;
    // Plik otwarty z dysku albo podgląd projektu: nie ma dokąd wysłać zgłoszenia.
    var preview = window.location.protocol === "file:" || form.hasAttribute("data-preview");

    topics.forEach(function (button) {
      button.addEventListener("click", function () {
        var on = button.getAttribute("aria-pressed") !== "true";
        button.setAttribute("aria-pressed", String(on));
      });
    });

    function showError(message) {
      errorBox.textContent = message;
      errorBox.hidden = false;
    }

    function showSuccess(text) {
      successText.textContent = text;
      form.hidden = true;
      success.hidden = false;
      success.focus();
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (sending) return;
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      errorBox.hidden = true;
      var data = new FormData(form);
      var payload = {
        name: data.get("name"),
        email: data.get("email"),
        company: data.get("company"),
        challenge: data.get("challenge"),
        services: topics
          .filter(function (b) {
            return b.getAttribute("aria-pressed") === "true";
          })
          .map(function (b) {
            return b.dataset.topic;
          }),
        consent: data.get("consent") === "on",
        website: data.get("website")
      };

      if (preview) {
        showSuccess("To podgląd projektu, więc wiadomość nigdzie nie została wysłana. Po przeniesieniu strony do aplikacji formularz zapisze zgłoszenie tak jak dotąd.");
        return;
      }

      sending = true;
      submit.disabled = true;
      submit.textContent = "Wysyłam wiadomość…";
      var controller = "AbortController" in window ? new AbortController() : null;
      var timer = controller
        ? setTimeout(function () {
            controller.abort();
          }, 20000)
        : 0;
      fetch(form.dataset.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller ? controller.signal : undefined
      })
        .then(function (response) {
          return response
            .json()
            .catch(function () {
              return {};
            })
            .then(function (result) {
              if (!response.ok || !result.ok) throw new Error(result.error || "Nie udało się zapisać wiadomości. Spróbuj ponownie za chwilę.");
            });
        })
        .then(function () {
          showSuccess("Zapisaliśmy Twoje zapytanie. Odpowiemy na podany adres e-mail.");
        })
        .catch(function (cause) {
          var network = !cause || cause.name === "AbortError" || cause.name === "TypeError";
          showError(network ? "Nie udało się połączyć z serwerem. Twoja wiadomość nadal jest w formularzu, spróbuj wysłać ją ponownie." : cause.message);
        })
        .then(function () {
          clearTimeout(timer);
          sending = false;
          submit.disabled = false;
          submit.textContent = "Wyślij wiadomość";
        });
    });

    success.querySelector("[data-form-again]").addEventListener("click", function () {
      form.reset();
      topics.forEach(function (b) {
        b.setAttribute("aria-pressed", "false");
      });
      success.hidden = true;
      form.hidden = false;
      form.querySelector("input, textarea").focus();
    });
  }
})();
