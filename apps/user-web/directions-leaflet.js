"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * public/directions-leaflet.js
 * Sử dụng Nominatim (Geocoding - Đổi chữ thành Tọa độ) 
 * và OSRM (Routing - Vẽ đường) hoàn toàn miễn phí.
 */

var originInput = document.getElementById('origin-input');
var destInput = document.getElementById('dest-input');
var searchBtn = document.getElementById('search-btn');
var statusMsg = document.getElementById('status-message');
var routeSummary = document.getElementById('route-summary');
var summaryTime = document.getElementById('summary-time');
var summaryDistance = document.getElementById('summary-distance');
var askAiBtn = document.getElementById('ask-ai-btn');
var aiAdviceBox = document.getElementById('ai-advice-box');
var modeBtns = document.querySelectorAll('.mode-btn');
var map, routeLayer, originMarker, destMarker;
var currentMode = 'driving'; // Mặc định là driving
var currentRouteData = null;

// ITINERARY VARIABLES
var itiWaypoints = [];
var itiIndex = 0;
var isNavigatingIti = false;
var userLat = null;
var userLon = null;
var currentTargetCoordsObj = null;
var itiSection = document.getElementById('iti-section');
var itiProgress = document.getElementById('iti-progress');
var itiNext = document.getElementById('iti-next');
var startItiBtn = document.getElementById('start-iti-btn');
var skipItiBtn = document.getElementById('skip-iti-btn');

// Khởi tạo bản đồ 
function initMap() {
  map = L.map('map').setView([16.047079, 108.206230], 6); // Set view ở giữa VN

  // Thêm TileLayer (Giao diện bản đồ) từ OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);
}

// Bắt sự kiện chọn phương tiện
modeBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    // Đổi UI Nút
    modeBtns.forEach(function (b) {
      return b.classList.remove('active');
    });
    btn.classList.add('active');

    // Lưu mode hiện tại (OSRM profile thường là driving, walking, cycling)
    currentMode = btn.dataset.mode;

    // Nếu đã có input, tự động tìm lại đường
    if (originInput.value && destInput.value && currentRouteData) {
      calculateRoute();
    } else if (itiSection.style.display !== 'none' && isNavigatingIti) {
      runItineraryPoint(); // Nếu chọn xe lúc đang đi Itinerary thì tự update lại đường
    }
  });
});

// Bắt sự kiện bấm nút "Tìm đường đi"
searchBtn.addEventListener('click', calculateRoute);
function calculateRoute() {
  return _calculateRoute.apply(this, arguments);
} // Hàm Geocode (chuyển chữ thành Tọa độ) qua OpenStreetMap Nominatim
function _calculateRoute() {
  _calculateRoute = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
    var originQuery, destQuery, coordsOrigin, coordsDest, osrmUrl, routeRes, routeData, _t3;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          originQuery = originInput.value.trim();
          destQuery = destInput.value.trim();
          if (!(!originQuery || !destQuery)) {
            _context4.n = 1;
            break;
          }
          statusMsg.innerText = "Vui lòng nhập đủ Điểm đi và Điểm đến!";
          return _context4.a(2);
        case 1:
          statusMsg.innerText = "Đang tìm vị trí...";
          routeSummary.classList.remove('active');
          aiAdviceBox.classList.remove('active');
          _context4.p = 2;
          _context4.n = 3;
          return geocode(originQuery);
        case 3:
          coordsOrigin = _context4.v;
          _context4.n = 4;
          return geocode(destQuery);
        case 4:
          coordsDest = _context4.v;
          if (!(!coordsOrigin || !coordsDest)) {
            _context4.n = 5;
            break;
          }
          statusMsg.innerText = "Không tìm thấy địa điểm. Thử nhập rõ ràng hơn (VD: Hà Nội, Việt Nam).";
          return _context4.a(2);
        case 5:
          statusMsg.innerText = "Đang vẽ đường...";

          // 2. Gọi OSRM Routing API (Route Machine)
          // Profile của OSRM: route/v1/{profile}/{coordinates}
          // profile: driving, walking, cycling (leaflet OSRM server demo hỗ trợ driving, walking)
          osrmUrl = "https://router.project-osrm.org/route/v1/".concat(currentMode, "/").concat(coordsOrigin.lon, ",").concat(coordsOrigin.lat, ";").concat(coordsDest.lon, ",").concat(coordsDest.lat, "?overview=full&geometries=geojson");
          _context4.n = 6;
          return fetch(osrmUrl);
        case 6:
          routeRes = _context4.v;
          _context4.n = 7;
          return routeRes.json();
        case 7:
          routeData = _context4.v;
          if (!(routeData.code !== 'Ok' || !routeData.routes || routeData.routes.length === 0)) {
            _context4.n = 8;
            break;
          }
          statusMsg.innerText = "Không thể tìm thấy đường đi bộ/đường xe trên bản đồ.";
          return _context4.a(2);
        case 8:
          // 3. Hiển thị lên Bản đồ
          statusMsg.innerText = "";
          drawRouteOnMap(routeData.routes[0], coordsOrigin, coordsDest);

          // Lưu lại thông tin gọn để gửi cho AI
          currentRouteData = {
            origin: originQuery,
            destination: destQuery,
            distance: (routeData.routes[0].distance / 1000).toFixed(1) + ' km',
            duration: formatDuration(routeData.routes[0].duration),
            mode: currentMode
          };

          // Hiển thị tóm tắt UI
          summaryDistance.innerText = currentRouteData.distance;
          summaryTime.innerText = currentRouteData.duration;
          routeSummary.classList.add('active');
          _context4.n = 10;
          break;
        case 9:
          _context4.p = 9;
          _t3 = _context4.v;
          console.error("Calculate Route Error:", _t3);
          statusMsg.innerHTML = "<strong>\u274C L\u1ED7i m\xE1y ch\u1EE7:</strong> ".concat(_t3.message, ". (Server OSRM ho\u1EB7c OSM c\xF3 th\u1EC3 \u0111ang b\u1ECB qu\xE1 t\u1EA3i, h\xE3y th\u1EED l\u1EA1i URL kh\xE1c ho\u1EB7c d\xF9ng GMap).");
        case 10:
          return _context4.a(2);
      }
    }, _callee4, null, [[2, 9]]);
  }));
  return _calculateRoute.apply(this, arguments);
}
function geocode(_x) {
  return _geocode.apply(this, arguments);
} // Hàm vẽ Polyline lên bản đồ
function _geocode() {
  _geocode = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(q) {
    var url, res, data;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          url = "https://nominatim.openstreetmap.org/search?format=json&q=".concat(encodeURIComponent(q + ', Vietnam'), "&limit=1");
          _context5.n = 1;
          return fetch(url);
        case 1:
          res = _context5.v;
          _context5.n = 2;
          return res.json();
        case 2:
          data = _context5.v;
          if (!(data && data.length > 0)) {
            _context5.n = 3;
            break;
          }
          return _context5.a(2, {
            lat: parseFloat(data[0].lat),
            lon: parseFloat(data[0].lon),
            name: data[0].display_name
          });
        case 3:
          return _context5.a(2, null);
      }
    }, _callee5);
  }));
  return _geocode.apply(this, arguments);
}
function drawRouteOnMap(route, start, end) {
  // Xóa layer cũ
  if (routeLayer) map.removeLayer(routeLayer);
  if (originMarker) map.removeLayer(originMarker);
  if (destMarker) map.removeLayer(destMarker);

  // Tạo line xanh
  routeLayer = L.geoJSON(route.geometry, {
    style: {
      color: '#2563eb',
      weight: 5,
      opacity: 0.8
    }
  }).addTo(map);

  // Marker
  originMarker = L.marker([start.lat, start.lon]).addTo(map).bindPopup("Vị trí của bạn");
  destMarker = L.marker([end.lat, end.lon]).addTo(map).bindPopup("Điểm Đến");

  // Zoom bản đồ vừa với đường vẽ
  map.fitBounds(routeLayer.getBounds(), {
    padding: [50, 50]
  });
}

// Cập nhật vị trí marker người dùng khi đang di chuyển (real-time)
function updateOriginMarker(lat, lon) {
  if (originMarker) {
    originMarker.setLatLng([lat, lon]);
    // Nếu muốn bản đồ bám theo người dùng thì uncomment dòng dưới:
    // map.panTo([lat, lon]);
  }
}

// Convert giây của OSRM sang Định dạng phút, giờ
function formatDuration(seconds) {
  if (seconds < 60) return "Dưới 1 phút";
  var mins = Math.floor(seconds / 60);
  if (mins < 60) return "".concat(mins, " ph\xFAt");
  var hours = Math.floor(mins / 60);
  var reMins = mins % 60;
  return "".concat(hours, " gi\u1EDD ").concat(reMins, " ph\xFAt");
}

// ======================== TÍCH HỢP AI GEMINI & GIỌNG NÓI ========================
// Giữ lại hàm speak cũ nhưng chuyển sang hệ thống VoiceGuide mới
function speakMsg(text) {
  if (window.voiceGuide) {
    window.voiceGuide.speak(text);
  }
}
askAiBtn.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
  var res, data, _t;
  return _regenerator().w(function (_context) {
    while (1) switch (_context.p = _context.n) {
      case 0:
        if (currentRouteData) {
          _context.n = 1;
          break;
        }
        return _context.a(2);
      case 1:
        // Hiệu ứng Loading
        askAiBtn.innerHTML = '<span class="loading-spinner"></span> Đang phân tích...';
        askAiBtn.disabled = true;
        aiAdviceBox.classList.remove('active');
        _context.p = 2;
        _context.n = 3;
        return fetch('/api/directions/ai-advice', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(currentRouteData)
        });
      case 3:
        res = _context.v;
        _context.n = 4;
        return res.json();
      case 4:
        data = _context.v;
        if (data.success) {
          aiAdviceBox.innerHTML = "<strong>\uD83D\uDCA1 L\u1EDDi khuy\xEAn:</strong><br/>".concat(data.advice, "\n      <div style=\"margin-top: 10px;\">\n        <button id=\"stop-voice-btn\" class=\"btn btn--ghost btn--small\">\uD83D\uDED1 D\u1EEBng \u0111\u1ECDc</button>\n      </div>");
          // AI Giọng nói tự động đọc lời khuyên
          speakText(data.advice);

          // Xử lý nứt dừng đọc
          document.getElementById('stop-voice-btn').addEventListener('click', function () {
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
          });
        } else {
          aiAdviceBox.innerHTML = "\u274C L\u1ED7i: ".concat(data.message);
        }
        aiAdviceBox.classList.add('active');
        _context.n = 6;
        break;
      case 5:
        _context.p = 5;
        _t = _context.v;
        aiAdviceBox.innerHTML = "❌ Không thể kết nối với server AI.";
        aiAdviceBox.classList.add('active');
      case 6:
        // Khôi phục nút
        askAiBtn.innerHTML = '✨ Trợ lý AI Khuyên Dùng';
        askAiBtn.disabled = false;
      case 7:
        return _context.a(2);
    }
  }, _callee, null, [[2, 5]]);
})));

// Chạy khởi tạo map khi tải trang
initMap();

// Tự động điền lộ trình nếu có query truyền vào từ My Trips
window.addEventListener('DOMContentLoaded', function () {
  var urlParams = new URLSearchParams(window.location.search);
  var destQuery = urlParams.get('dest');
  var itJson = sessionStorage.getItem('wander_active_itinerary');
  if (itJson && itJson !== 'undefined') {
    // Chế độ Lịch Trình (Itinerary)
    document.querySelector('.input-section').style.display = 'none';
    itiSection.style.display = 'block';
    try {
      var plan = JSON.parse(itJson);
      plan.itinerary.forEach(function (day) {
        if (day.activities) {
          day.activities.forEach(function (act) {
            if (act.location && act.location.trim() !== '' && !act.location.includes('Tuỳ chọn')) {
              var loc = act.location;
              if (loc.includes('&')) loc = loc.split('&')[0];
              if (loc.includes('-')) loc = loc.split('-')[0];
              itiWaypoints.push("Ng\xE0y ".concat(day.day.split(' ')[0], ": ").concat(loc.trim()));
            }
          });
        }
      });
      itiProgress.innerText = "H\xE0nh tr\xECnh: 0/".concat(itiWaypoints.length, " \u0111i\u1EC3m");
      startLiveTrackingItinerary();
    } catch (e) {
      console.error(e);
    }
  } else if (destQuery) {
    // Chế độ Mặc Định (1 điểm đến)
    destInput.value = destQuery;
    statusMsg.innerHTML = 'Đang lấy vị trí hiện tại của bạn... <br/><button class="btn-inline-link" onclick="stopGeoAndManual()">Hoặc nhập thủ công ngay</button>';

    // Định nghĩa hàm global để dùng trong onclick
    window.stopGeoAndManual = function () {
      statusMsg.innerText = "Mời bạn nhập điểm đi thủ công bên dưới:";
      originInput.focus();
      // Ta không thể dừng hẳn watchPosition dễ dàng nếu không lưu ID, 
      // nhưng việc focus và đổi text sẽ giúp người dùng biết họ có thể nhập.
    };

    // Tự động định vị và CẬP NHẬT LIÊN TỤC (Real-time tracking)
    if ("geolocation" in navigator) {
      var isFirstTime = true;

      // Dùng watchPosition thay vì getCurrentPosition để live tracking
      navigator.geolocation.watchPosition(/*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(position) {
          var lat, lon, res, data, _t2;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.p = _context2.n) {
              case 0:
                lat = position.coords.latitude;
                lon = position.coords.longitude;
                if (!isFirstTime) {
                  _context2.n = 6;
                  break;
                }
                isFirstTime = false;
                _context2.p = 1;
                _context2.n = 2;
                return fetch("https://nominatim.openstreetmap.org/reverse?format=json&lat=".concat(lat, "&lon=").concat(lon));
              case 2:
                res = _context2.v;
                _context2.n = 3;
                return res.json();
              case 3:
                data = _context2.v;
                if (data && data.display_name) {
                  originInput.value = data.display_name;
                  calculateRoute();
                } else {
                  originInput.value = "".concat(lat, ", ").concat(lon);
                  calculateRoute();
                }
                _context2.n = 5;
                break;
              case 4:
                _context2.p = 4;
                _t2 = _context2.v;
                originInput.value = "".concat(lat, ", ").concat(lon);
                calculateRoute();
              case 5:
                _context2.n = 7;
                break;
              case 6:
                // Từ lần thứ 2 trở đi, người dùng đang di chuyển thì tự động chạy marker
                updateOriginMarker(lat, lon);

                // Thỉnh thoảng vẽ lại đường đi nếu muốn (ở đây tạm giữ đường cũ, chỉ di chuyển marker)
                // Bật cái này nếu muốn route tự update nhưng sẽ gọi API OSRM nhiều
                // currentRouteData.origin = `${lat}, ${lon}`;
                // calculateRoute(true); 
              case 7:
                return _context2.a(2);
            }
          }, _callee2, null, [[1, 4]]);
        }));
        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      }(), function (error) {
        statusMsg.innerText = "Vui lòng nhập Điểm đi (Không thể lấy vị trí tự động).";
        originInput.focus();
      }, {
        enableHighAccuracy: true,
        maximumAge: 0
      });
    } else {
      originInput.focus();
    }
  }
});

// ======================== ITINERARY DỰA TRÊN LEAFLET ========================

function startLiveTrackingItinerary() {
  if ("geolocation" in navigator) {
    navigator.geolocation.watchPosition(function (position) {
      userLat = position.coords.latitude;
      userLon = position.coords.longitude;
      updateOriginMarker(userLat, userLon);
      if (!isNavigatingIti && userLat && startItiBtn.innerText !== "Đang dẫn đường...") {
        itiNext.innerText = "Đã khoá được vị trí GPS. Chọn phương tiện và nhấn BẮT ĐẦU.";
      }

      // Tự động kiểm tra đến đích nếu đang chạy hành trình
      if (isNavigatingIti && currentTargetCoordsObj) {
        var distM = map.distance([userLat, userLon], [currentTargetCoordsObj.lat, currentTargetCoordsObj.lon]);
        if (distM < 50) {
          // Dưới 50m là tới
          speakText("Bạn đã đến điểm thành công. Sắp tiếp tục điểm tiếp theo.");
          startItiBtn.innerText = "Đã đến đích!";
          isNavigatingIti = false;
          setTimeout(function () {
            advanceItinerary();
          }, 4000);
        }
      }
    }, function (error) {
      itiNext.innerText = "Vui lòng cấp quyền Định vị GPS để bắt đầu hành trình!";
      document.getElementById('iti-manual-start').style.display = 'block';
    }, {
      enableHighAccuracy: true
    });

    // Nếu sau 5 giây vẫn chưa có GPS, hiện nhập manual cho chắc
    setTimeout(function () {
      if (!userLat && itiSection.style.display !== 'none') {
        document.getElementById('iti-manual-start').style.display = 'block';
      }
    }, 5000);
  } else {
    document.getElementById('iti-manual-start').style.display = 'block';
  }
}

// Xử lý điểm bắt đầu thủ công cho Itinerary
var itiApplyBtn = document.getElementById('iti-apply-origin-btn');
var itiManualInput = document.getElementById('iti-origin-input');
if (itiApplyBtn && itiManualInput) {
  itiApplyBtn.addEventListener('click', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    var addr, coords;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          addr = itiManualInput.value.trim();
          if (addr) {
            _context3.n = 1;
            break;
          }
          return _context3.a(2);
        case 1:
          itiApplyBtn.disabled = true;
          itiApplyBtn.innerText = "...";
          itiNext.innerText = "Đang tìm địa chỉ xuất phát của bạn...";
          _context3.n = 2;
          return geocode(addr);
        case 2:
          coords = _context3.v;
          if (coords) {
            userLat = coords.lat;
            userLon = coords.lon;
            updateOriginMarker(userLat, userLon);
            itiNext.innerText = "Đã định vị thủ công. Nhấn BẮT ĐẦU để dẫn đường.";
            speakText("Đã nhận điểm xuất phát thủ công.");
          } else {
            itiNext.innerText = "❌ Không tìm thấy địa chỉ của bạn. Thử lại!";
          }
          itiApplyBtn.disabled = false;
          itiApplyBtn.innerText = "Dùng";
        case 3:
          return _context3.a(2);
      }
    }, _callee3);
  })));
}
if (startItiBtn) {
  startItiBtn.addEventListener('click', function () {
    if (itiIndex >= itiWaypoints.length) return;
    if (!userLat || !userLon) {
      alert("Đang chờ bắt vị trí GPS...");
      return;
    }
    isNavigatingIti = true;
    startItiBtn.innerText = "Đang dẫn đường...";
    runItineraryPoint();
  });
}
if (skipItiBtn) skipItiBtn.addEventListener('click', function () {
  return advanceItinerary();
});
function runItineraryPoint() {
  return _runItineraryPoint.apply(this, arguments);
}
function _runItineraryPoint() {
  _runItineraryPoint = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
    var fullStr, currentWP, coordsDest, osrmUrl, routeRes, routeData, _t4;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          if (!(itiIndex >= itiWaypoints.length)) {
            _context6.n = 1;
            break;
          }
          return _context6.a(2);
        case 1:
          fullStr = itiWaypoints[itiIndex];
          currentWP = fullStr.split(': ')[1] || fullStr;
          itiProgress.innerText = "H\xE0nh tr\xECnh: \u0110i\u1EC3m ".concat(itiIndex + 1, "/").concat(itiWaypoints.length);
          itiNext.innerText = "\u0110ang d\u1EABn t\u1EDBi: ".concat(currentWP);
          skipItiBtn.style.display = 'inline-block';
          isNavigatingIti = true;
          startItiBtn.innerText = "Đang dẫn đường...";
          _context6.n = 2;
          return geocode(currentWP);
        case 2:
          coordsDest = _context6.v;
          if (coordsDest) {
            _context6.n = 3;
            break;
          }
          itiNext.innerText = "\u274C Kh\xF4ng t\xECm th\u1EA5y to\u1EA1 \u0111\u1ED9 cho b\u1EA3n \u0111\u1ED3: ".concat(currentWP, ". Vui l\xF2ng b\u1EA5m B\u1ECF Qua.");
          speakText("L\u1ED7i v\u1ECB tr\xED. H\xE3y b\u1ECF qua \u0111i\u1EC3m n\xE0y.");
          statusMsg.innerText = "";
          return _context6.a(2);
        case 3:
          currentTargetCoordsObj = coordsDest;
          statusMsg.innerText = "\u0110ang v\u1EBD b\u1EA3n \u0111\u1ED3 d\u1EABn \u0111\u01B0\u1EDDng...";
          osrmUrl = "https://router.project-osrm.org/route/v1/".concat(currentMode, "/").concat(userLon, ",").concat(userLat, ";").concat(coordsDest.lon, ",").concat(coordsDest.lat, "?overview=full&geometries=geojson");
          _context6.p = 4;
          _context6.n = 5;
          return fetch(osrmUrl);
        case 5:
          routeRes = _context6.v;
          _context6.n = 6;
          return routeRes.json();
        case 6:
          routeData = _context6.v;
          if (routeData.code === 'Ok' && routeData.routes && routeData.routes.length > 0) {
            drawRouteOnMap(routeData.routes[0], {
              lat: userLat,
              lon: userLon
            }, coordsDest);
            speakText("B\u1EAFt \u0111\u1EA7u ch\u1EA1y chuy\u1EBFn \u0111i t\u1EDBi: ".concat(currentWP));
            summaryDistance.innerText = (routeData.routes[0].distance / 1000).toFixed(1) + ' km';
            summaryTime.innerText = formatDuration(routeData.routes[0].duration);
            routeSummary.classList.add('active');
            statusMsg.innerText = "\u0110\xE3 v\u1EBD tuy\u1EBFn \u0111\u01B0\u1EDDng cho ph\u01B0\u01A1ng ti\u1EC7n!";
          } else {
            itiNext.innerText = "OSRM: B\u1ECB l\u1ED7i \u0111\u1EE9t g\xE3y \u0111\u01B0\u1EDDng \u0111i b\u1ED9/xe cho \u0111i\u1EC3m n\xE0y.";
          }
          _context6.n = 8;
          break;
        case 7:
          _context6.p = 7;
          _t4 = _context6.v;
          itiNext.innerText = "OSRM L\u1ED7i m\xE1y ch\u1EE7 \u0111\u01B0\u1EDDng \u0111i.";
        case 8:
          return _context6.a(2);
      }
    }, _callee6, null, [[4, 7]]);
  }));
  return _runItineraryPoint.apply(this, arguments);
}
function advanceItinerary() {
  itiIndex++;
  if (itiIndex >= itiWaypoints.length) {
    itiProgress.innerText = "\u2705 Ho\xE0n th\xE0nh 100% l\u1ECBch tr\xECnh!";
    itiNext.innerText = "Tuyệt vời, bạn đã đi hết điểm đến.";
    startItiBtn.style.display = 'none';
    skipItiBtn.style.display = 'none';
    isNavigatingIti = false;
    speakText("Bạn đã du ngoạn tới tất cả địa điểm trong lịch trình. Cảm tạ bạn đã sử dụng.");
  } else {
    runItineraryPoint();
  }
}
