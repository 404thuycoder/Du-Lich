"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * public/directions-gmap.js
 * Code dành cho Google Maps API.
 * Yêu cầu phải có thẻ <script> gọi Google Maps API kèm API KEY trong HTML.
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
var map;
var directionsService;
var directionsRenderer;
var currentMode = 'DRIVING'; // Chế độ mặc định của Google Maps
var currentRouteData = null;

// Hàm này được gọi bởi callback của Google Maps script
window.initMap = function () {
  // Tránh lỗi nếu chưa có đối tượng google
  if (typeof google === 'undefined') {
    statusMsg.innerText = "LỖI: Chưa kết nối API Key Google Maps. Hãy thêm <script src='https://maps.googleapis.com/...&key=[YOUR_KEY]'> trong HTML.";
    return;
  }

  // Khởi tạo map ở chính giữa Việt Nam
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 16.047079,
      lng: 108.206230
    },
    zoom: 6,
    mapTypeControl: false
  });

  // Khởi tạo tool vẽ đường
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  // Mở rộng: Có thể tích hợp Autocomplete nếu muốn (không bắt buộc)
  new google.maps.places.Autocomplete(originInput);
  new google.maps.places.Autocomplete(destInput);
};

// Đổi phương tiện di chuyển
modeBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    modeBtns.forEach(function (b) {
      return b.classList.remove('active');
    });
    btn.classList.add('active');
    currentMode = btn.dataset.mode;
    if (originInput.value && destInput.value) {
      calculateAndDisplayRoute();
    }
  });
});
searchBtn.addEventListener('click', calculateAndDisplayRoute);
function calculateAndDisplayRoute() {
  var originStr = originInput.value.trim();
  var destStr = destInput.value.trim();
  if (!originStr || !destStr) {
    statusMsg.innerText = "Vui lòng nhập Điểm đi và Điểm đến!";
    return;
  }
  if (typeof google === 'undefined') {
    statusMsg.innerText = "LỖI: Chưa có Google Maps API. Hãy cấu hình API Key.";
    return;
  }
  statusMsg.innerText = "Đang tìm đường đi...";
  routeSummary.classList.remove('active');
  aiAdviceBox.classList.remove('active');
  directionsService.route({
    origin: originStr,
    destination: destStr,
    travelMode: google.maps.TravelMode[currentMode] // DRIVING, WALKING, v.v.
  }, function (response, status) {
    if (status === "OK" && response) {
      statusMsg.innerText = ""; // Xóa lỗi

      // Vẽ đường lên map
      directionsRenderer.setDirections(response);

      // Trích xuất thống kê
      var route = response.routes[0].legs[0];
      currentRouteData = {
        origin: route.start_address,
        destination: route.end_address,
        distance: route.distance.text,
        duration: route.duration.text,
        mode: currentMode
      };

      // Gắn vào UI
      summaryDistance.innerText = currentRouteData.distance;
      summaryTime.innerText = currentRouteData.duration;
      routeSummary.classList.add('active');
    } else {
      statusMsg.innerText = "Google Maps không thể tìm được đường: " + status;
    }
  });
}

// Thay thế hàm speak cũ bằng hệ thống VoiceGuide mới
function speakText(text) {
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
          if (window.voiceGuide) window.voiceGuide.speak(data.advice);
          document.getElementById('stop-voice-btn').addEventListener('click', function () {
            if (window.voiceGuide) window.voiceGuide.stop();
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
        askAiBtn.innerHTML = '✨ Trợ lý AI Khuyên Dùng';
        askAiBtn.disabled = false;
      case 7:
        return _context.a(2);
    }
  }, _callee, null, [[2, 5]]);
})));

// Tự động điền lộ trình nếu có query truyền vào từ My Trips
window.addEventListener('DOMContentLoaded', function () {
  var urlParams = new URLSearchParams(window.location.search);
  var destQuery = urlParams.get('dest');
  if (destQuery) {
    destInput.value = destQuery;
    statusMsg.innerHTML = 'Đang bắt đầu chuyến đi... <br/><button class="btn-inline-link" onclick="stopGeoAndManual()">Hoặc nhập thủ công ngay</button>';
    window.stopGeoAndManual = function () {
      statusMsg.innerText = "Mời bạn nhập điểm đi thủ công bên dưới:";
      originInput.focus();
    };

    // Đợi 1 chút để Google Maps script có thể tải xong (hoặc xử lý thử lại)
    setTimeout(function () {
      if ("geolocation" in navigator) {
        var isFirstTime = true;
        var userMarkerParams = null; // Marker cho Google Maps

        navigator.geolocation.watchPosition(function (position) {
          var lat = position.coords.latitude;
          var lon = position.coords.longitude;
          if (isFirstTime) {
            isFirstTime = false;
            if (typeof google !== 'undefined') {
              var geocoder = new google.maps.Geocoder();
              geocoder.geocode({
                location: {
                  lat: lat,
                  lng: lon
                }
              }, function (results, status) {
                if (status === "OK" && results[0]) {
                  originInput.value = results[0].formatted_address;
                } else {
                  originInput.value = "".concat(lat, ", ").concat(lon);
                }
                calculateAndDisplayRoute();
              });
            } else {
              originInput.value = "".concat(lat, ", ").concat(lon);
              calculateAndDisplayRoute();
            }
          } else {
            // Cập nhật vị trí liên tục trên Google Maps nếu muốn (demo)
            // Ví dụ có thể dùng map.panTo hoặc tạo marker
            if (typeof google !== 'undefined' && map) {
              if (!userMarkerParams) {
                userMarkerParams = new google.maps.Marker({
                  position: {
                    lat: lat,
                    lng: lon
                  },
                  map: map,
                  title: "Vị trí của bạn"
                });
              } else {
                userMarkerParams.setPosition(new google.maps.LatLng(lat, lon));
              }
            }
          }
        }, function (error) {
          statusMsg.innerText = "Vui lòng nhập Điểm đi (Từ chối định vị).";
          originInput.focus();
        }, {
          enableHighAccuracy: true,
          maximumAge: 0
        });
      } else {
        originInput.focus();
      }
    }, 1000);
  }
});
