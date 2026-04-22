"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('aiPlannerForm');
  var btn = document.getElementById('generateBtn');
  var placeholder = document.getElementById('resultPlaceholder');
  var loader = document.getElementById('aiLoader');
  var resultContainer = document.getElementById('timelineResult');
  var refineBox = document.getElementById('refineBox');
  var refineForm = document.getElementById('refineForm');
  var refineInput = document.getElementById('refineInput');
  var refineBtn = document.getElementById('refineBtn');
  var timelineContent = document.getElementById('timelineContent');
  var versionTabs = document.getElementById('versionTabs');
  var btnSaveTrip = document.getElementById('btnSaveTrip');
  var btnStartNav = document.getElementById('btnStartNav');
  var saveTripStatus = document.getElementById('saveTripStatus');

  // Lưu trữ Lịch sử phiên bản
  var planHistory = [];
  var currentPlanIndex = -1;
  var currentItineraryId = null;

  // ---- Chế độ Xem Lịch Trình (từ My Trips) ----
  var urlParams = new URLSearchParams(window.location.search);
  var viewModeHeader = document.getElementById('viewModeHeader');
  if (urlParams.get('view') === 'true') {
    var stored = sessionStorage.getItem('wander_view_trip');
    if (stored) {
      try {
        var plan = JSON.parse(stored);
        // sessionStorage.removeItem('wander_view_trip'); // Keep it during the session in case of refresh
        planHistory.push(plan);
        currentPlanIndex = 0;

        // Hiện header chế độ xem và ẩn form tạo mới
        viewModeHeader.style.display = 'flex';
        form.closest('.planner-form-card').style.display = 'none';
        renderVersionTabs();
        renderItinerary(plan, plan.destination || '', '');
        resultContainer.style.display = 'block';
        refineBox.style.display = 'block';
        placeholder.style.display = 'none';
        resetSaveButton();
        // Ẩn nút Lưu vì user đã lưu rồi mới xem 
        btnSaveTrip.style.display = 'none';
      } catch (e) {
        console.error('Lỗi parse session trip:', e);
      }
    }
  }

  // Set default trip date to today
  var tripDateInput = document.getElementById('tripDate');
  var todayStr = new Date().toISOString().split('T')[0];
  tripDateInput.setAttribute('min', todayStr);
  tripDateInput.value = todayStr;
  form.addEventListener('submit', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {
      var destination, days, budget, companion, interests, tripDate, token, res, data, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            e.preventDefault();
            destination = document.getElementById('dest').value;
            days = document.getElementById('days').value;
            budget = document.getElementById('budget').value;
            companion = document.getElementById('companion').value;
            interests = document.getElementById('interests').value;
            tripDate = document.getElementById('tripDate').value; // ♥ Lấy ngày khởi hành
            btn.disabled = true;
            btn.innerText = 'Đang xử lý...';
            placeholder.style.display = 'none';
            resultContainer.style.display = 'none';
            refineBox.style.display = 'none';
            loader.style.display = 'flex';
            _context.p = 1;
            token = localStorage.getItem('wander_token');
            _context.n = 2;
            return fetch('/api/planner/generate', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token || ''
              },
              body: JSON.stringify({
                destination: destination,
                days: days,
                budget: budget,
                companion: companion,
                interests: interests,
                tripDate: tripDate
              })
            });
          case 2:
            res = _context.v;
            _context.n = 3;
            return res.json();
          case 3:
            data = _context.v;
            if (data.success && data.plan) {
              currentItineraryId = data.itineraryId;
              planHistory.push(data.plan);
              currentPlanIndex = planHistory.length - 1;
              renderVersionTabs();
              renderItinerary(data.plan, destination, days, tripDate); // ♥ truyền thêm tripDate
              resultContainer.style.display = 'block';
              refineBox.style.display = 'block';
              resetSaveButton();
              // ♥ Lưu tripDate vào localStorage để nhắc nhở sau này
              if (tripDate) {
                saveTripReminder(destination, tripDate);
              }
            } else {
              alert(data.message || 'Có lỗi xảy ra khi tạo lịch trình.');
              if (planHistory.length === 0) placeholder.style.display = 'flex';else resultContainer.style.display = 'block';
            }
            _context.n = 5;
            break;
          case 4:
            _context.p = 4;
            _t = _context.v;
            console.error(_t);
            alert('Không thể kết nối tới máy chủ AI. Vui lòng thử lại sau.');
            if (planHistory.length === 0) placeholder.style.display = 'flex';else resultContainer.style.display = 'block';
          case 5:
            _context.p = 5;
            btn.disabled = false;
            btn.innerText = '⏳ Tạo Lịch Trình Ngay';
            loader.style.display = 'none';
            return _context.f(5);
          case 6:
            return _context.a(2);
        }
      }, _callee, null, [[1, 4, 5, 6]]);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());

  // Chức năng Sửa lại lịch trình (Refine)
  refineForm.addEventListener('submit', /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(e) {
      var currentPlanJson, userFeedback, destination, days, token, res, data, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            e.preventDefault();
            if (!(currentPlanIndex < 0)) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2);
          case 1:
            currentPlanJson = planHistory[currentPlanIndex];
            userFeedback = refineInput.value;
            destination = document.getElementById('dest').value;
            days = document.getElementById('days').value;
            refineBtn.disabled = true;
            refineBtn.innerText = 'Đang sửa...';
            resultContainer.style.display = 'none';
            refineBox.style.display = 'none';
            loader.style.display = 'flex';
            _context2.p = 2;
            token = localStorage.getItem('wander_token');
            _context2.n = 3;
            return fetch('/api/planner/refine', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token || ''
              },
              body: JSON.stringify({
                oldPlanJson: currentPlanJson,
                userFeedback: userFeedback,
                itineraryId: currentItineraryId
              })
            });
          case 3:
            res = _context2.v;
            _context2.n = 4;
            return res.json();
          case 4:
            data = _context2.v;
            if (data.success && data.plan) {
              planHistory.push(data.plan);
              currentPlanIndex = planHistory.length - 1;
              if (data.itineraryId) currentItineraryId = data.itineraryId;
              renderVersionTabs();
              renderItinerary(data.plan, destination, days, document.getElementById('tripDate').value);
              resultContainer.style.display = 'block';
              refineBox.style.display = 'block';
              refineInput.value = '';
              resetSaveButton();
            } else {
              alert(data.message || 'Có lỗi xảy ra, thử lại sau nhé.');
              resultContainer.style.display = 'block';
              refineBox.style.display = 'block';
            }
            _context2.n = 6;
            break;
          case 5:
            _context2.p = 5;
            _t2 = _context2.v;
            console.error(_t2);
            alert('Lỗi mạng, kiểm tra lại.');
            resultContainer.style.display = 'block';
            refineBox.style.display = 'block';
          case 6:
            _context2.p = 6;
            refineBtn.disabled = false;
            refineBtn.innerText = 'Sửa lại';
            loader.style.display = 'none';
            return _context2.f(6);
          case 7:
            return _context2.a(2);
        }
      }, _callee2, null, [[2, 5, 6, 7]]);
    }));
    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());

  // Lưu Vĩnh Viễn Lịch Trình Này
  btnSaveTrip.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    var token, res, data, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          token = localStorage.getItem('wander_token');
          if (token) {
            _context3.n = 1;
            break;
          }
          alert("Bạn cần Đăng Nhập để lưu lịch trình vào hồ sơ cá nhân!");
          window.location.href = '/index.html#login'; // Redirect to home/login
          return _context3.a(2);
        case 1:
          if (currentItineraryId) {
            _context3.n = 2;
            break;
          }
          alert("Lỗi: Không tìm thấy ID lịch trình. Vui lòng tạo lại.");
          return _context3.a(2);
        case 2:
          btnSaveTrip.disabled = true;
          saveTripStatus.style.display = 'block';
          saveTripStatus.innerText = 'Đang lưu vào hồ sơ...';
          _context3.p = 3;
          _context3.n = 4;
          return fetch('/api/planner/save', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token
            },
            body: JSON.stringify({
              itineraryId: currentItineraryId
            })
          });
        case 4:
          res = _context3.v;
          _context3.n = 5;
          return res.json();
        case 5:
          data = _context3.v;
          if (data.success) {
            saveTripStatus.innerText = '✅ Đã lưu thành công! Hãy xem tại mục "Chuyến đi của tôi" trên menu.';
            saveTripStatus.style.color = '#10b981';
            btnSaveTrip.innerText = 'Đã Lưu Lịch Trình';
          } else {
            saveTripStatus.innerText = '❌ ' + (data.message || 'Lưu thất bại.');
            saveTripStatus.style.color = '#f43f5e';
            btnSaveTrip.disabled = false;
          }
          _context3.n = 7;
          break;
        case 6:
          _context3.p = 6;
          _t3 = _context3.v;
          console.error(_t3);
          saveTripStatus.innerText = '❌ Lỗi kết nối mạng.';
          saveTripStatus.style.color = '#f43f5e';
          btnSaveTrip.disabled = false;
        case 7:
          return _context3.a(2);
      }
    }, _callee3, null, [[3, 6]]);
  })));

  // Chuyển Ngay Sang Màn Hình Chỉ Đường (Navigator)
  if (btnStartNav) {
    btnStartNav.addEventListener('click', function () {
      var _document$getElementB;
      if (currentPlanIndex < 0 || !planHistory[currentPlanIndex]) {
        alert("Lỗi: Không tìm thấy nội dung lịch trình.");
        return;
      }
      var dest = document.getElementById('dest').value || ((_document$getElementB = document.getElementById('plan-title')) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.innerText) || "Điểm đến";
      var planJson = planHistory[currentPlanIndex];
      sessionStorage.setItem('wander_active_itinerary', JSON.stringify(planJson));
      sessionStorage.setItem('wander_active_dest', dest);
      window.location.href = 'navigator.html';
    });
  }
  function resetSaveButton() {
    btnSaveTrip.disabled = false;
    btnSaveTrip.innerText = '♥️ Lưu Lịch Trình Này';
    saveTripStatus.style.display = 'none';
  }

  // ♥ Hàm lưu reminder vào localStorage và xin quyền thông báo
  function saveTripReminder(destination, tripDate) {
    // Lưu vào localStorage
    var reminders = JSON.parse(localStorage.getItem('wander_reminders') || '[]');
    var exists = reminders.find(function (r) {
      return r.tripDate === tripDate && r.destination === destination;
    });
    if (!exists) {
      reminders.push({
        destination: destination,
        tripDate: tripDate
      });
      localStorage.setItem('wander_reminders', JSON.stringify(reminders));
    }
    // Xin quyền thông báo
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }

  // ♥ Kiểm tra nhắc nhở khi load trang
  function checkTripReminders() {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    var reminders = JSON.parse(localStorage.getItem('wander_reminders') || '[]');
    var today = new Date().toISOString().split('T')[0];
    reminders.forEach(function (r) {
      if (r.tripDate === today) {
        new Notification('🧳 WanderViệt — Hôm nay là ngày đi!', {
          body: "H\xF4m nay b\u1EA1n c\xF3 chuy\u1EBFn \u0111i \u0111\u1EBFn ".concat(r.destination, ". Ch\xFAc b\u1EA1n l\xEAn \u0111\u01B0\u1EDDng vui v\u1EBB! \uD83C\uDF1F"),
          icon: '/favicon.ico'
        });
      }
    });
  }
  checkTripReminders();
  function renderVersionTabs() {
    versionTabs.innerHTML = '';
    planHistory.forEach(function (_, idx) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'planner-btn';
      btn.style.padding = '0.4rem 1rem';
      btn.style.width = 'auto';
      btn.style.fontSize = '0.9rem';
      btn.style.borderRadius = '2rem';
      if (idx === currentPlanIndex) {
        btn.style.background = 'var(--color-primary)';
        btn.innerText = idx === 0 ? 'Bản Gốc' : "B\u1EA3n S\u1EEDa ".concat(idx);
      } else {
        btn.style.background = '#e2e8f0';
        btn.style.color = '#475569';
        btn.innerText = idx === 0 ? 'Bản Gốc' : "B\u1EA3n S\u1EEDa ".concat(idx);
      }
      btn.addEventListener('click', function () {
        currentPlanIndex = idx;
        var dest = document.getElementById('dest').value;
        var d = document.getElementById('days').value;
        renderVersionTabs();
        renderItinerary(planHistory[idx], dest, d);
        resetSaveButton();
      });
      versionTabs.appendChild(btn);
    });
  }

  // ♥ Helper: format ngày VN (VD: Thứ Bảy, 05/04/2026)
  function formatDayVN(dateStr) {
    var days = ['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    var d = new Date(dateStr + 'T00:00:00');
    var dayName = days[d.getDay()];
    var dd = String(d.getDate()).padStart(2, '0');
    var mm = String(d.getMonth() + 1).padStart(2, '0');
    return "".concat(dayName, ", ").concat(dd, "/").concat(mm, "/").concat(d.getFullYear());
  }
  function renderItinerary(plan, destination, days) {
    var tripDate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    if (!plan || !plan.itinerary) return;
    var html = "\n      <div class=\"timeline-header\" style=\"margin-top: 1rem;\">\n        <h2 style=\"font-size: 1.8rem; color: #0f172a; margin-bottom: 0.5rem; line-height: 1.3;\">\n          L\u1ECBch tr\xECnh: ".concat(destination, " (").concat(days, " Ng\xE0y)\n        </h2>\n        <p class=\"timeline-summary\">").concat(plan.tripSummary, "</p>\n        <div class=\"timeline-meta\">\n          <div class=\"meta-card\">\n            <div class=\"meta-icon-wrapper\" style=\"background: #ecfdf5; color: #10b981;\">\uD83D\uDCB0</div>\n            <div class=\"meta-content\">\n              <p>D\u1EF1 ki\u1EBFn Chi ph\xED</p>\n              <h4>").concat(plan.estimatedCost, "</h4>\n            </div>\n          </div>\n          <div class=\"meta-card\">\n            <div class=\"meta-icon-wrapper\" style=\"background: #f0f9ff; color: #0284c7;\">\uD83C\uDFE8</div>\n            <div class=\"meta-content\">\n              <p>\u0110\u1EC1 xu\u1EA5t L\u01B0u tr\xFA</p>\n              <h4>").concat(plan.suggestedHotel, "</h4>\n            </div>\n          </div>\n        </div>\n      </div>\n    ");
    plan.itinerary.forEach(function (dayData, idx) {
      // ♥ Tính ngày thực tế nếu có tripDate
      var realDateLabel = '';
      if (tripDate) {
        var d = new Date(tripDate + 'T00:00:00');
        d.setDate(d.getDate() + idx);
        var dateStr = d.toISOString().split('T')[0];
        realDateLabel = " \u2014 ".concat(formatDayVN(dateStr));
      }
      html += "\n        <div class=\"timeline-day\">\n          <div class=\"day-badge\">Ng\xE0y ".concat(dayData.day.toString().replace(/\s*\(.*\)/, '')).concat(realDateLabel, "</div>\n          <div class=\"day-activities\">\n      ");
      (dayData.activities || []).forEach(function (act) {
        html += "\n            <div class=\"activity-card\">\n              <div class=\"activity-time\">".concat(act.time, "</div>\n              <h3 class=\"activity-title\" style=\"margin-top: 0.25rem;\">").concat(act.task, "</h3>\n              <p style=\"color: #475569; margin-bottom: 0.5rem; font-size: 0.95rem;\">").concat(act.location, "</p>\n              <div class=\"activity-details\" style=\"border-top: 1px dashed #cbd5e1; padding-top: 0.5rem;\">\n                <span style=\"font-size:0.85rem; color:#94a3b8\">Chi ph\xED d\u1EF1 ki\u1EBFn</span>\n                <span class=\"activity-cost\">").concat(act.cost, "</span>\n              </div>\n            </div>\n        ");
      });
      html += "\n          </div>\n        </div>\n      ";
    });
    timelineContent.innerHTML = html;
  }
});
