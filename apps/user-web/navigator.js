"use strict";

function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * navigator.js
 * Cung cấp chức năng GPS độ chính xác cao, tính toán khoảng cách/bearing đến đích, AR Compass
 */

// Cấu hình
var CONFIG = {
  gpsOptions: {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 10000
  },
  defaultZoom: 18,
  cmThreshold: 5 // m (dưới mức này hiện cm)
};

// Trạng thái cục bộ
var State = {
  map: null,
  userMarker: null,
  targetMarker: null,
  routeLine: null,
  watchId: null,
  userLoc: null,
  // {lat, lng, acc, speed, heading}
  targetLoc: null,
  // {lat, lng}
  compassHeading: 0,
  deviceCalibrated: false,
  routeMode: 'foot',
  // Mặc định đi bộ
  isNavigating: false,
  autoPan: true,
  voiceEnabled: true,
  reachedDest: false,
  waypoints: [],
  currentWaypointIndex: 0
};

// Elements DOM
var els = {
  map: document.getElementById('nav-map'),
  dtg: document.getElementById('dtg-value'),
  dtgVal: document.getElementById('dtg-value'),
  // alias dùng trong fetchOSRMRoute
  acc: document.getElementById('acc-value'),
  bearing: document.getElementById('bearing-value'),
  statusText: document.getElementById('status-text'),
  compassArrow: document.getElementById('compass-arrow'),
  targetInput: document.getElementById('target-input'),
  setTargetBtn: document.getElementById('set-target-btn'),
  calibrateBtn: document.getElementById('calibrate-btn'),
  chips: document.querySelectorAll('.chip'),
  transportModeRbs: document.querySelectorAll('input[name="route-mode"]'),
  eta: document.getElementById('eta-value'),
  etaVal: document.getElementById('eta-value'),
  // alias dùng trong fetchOSRMRoute
  speed: document.getElementById('speed-value'),
  startBtn: document.getElementById('start-nav-btn'),
  recenterBtn: document.getElementById('recenter-btn'),
  voiceBtn: document.getElementById('voice-btn'),
  voiceIcon: document.getElementById('voice-icon'),
  autocomplete: document.getElementById('autocomplete-list'),
  itiBanner: document.getElementById('itinerary-banner'),
  itiProgress: document.getElementById('itinerary-progress'),
  itiCurrentTarget: document.getElementById('itinerary-current-target'),
  itiNextTarget: document.getElementById('itinerary-next-target'),
  itiSkipBtn: document.getElementById('itinerary-skip-btn'),
  gpsOverlay: document.getElementById('gps-loading-overlay'),
  voiceOverlay: document.getElementById('voice-overlay'),
  liveCaption: document.getElementById('live-caption')
};

// =================== TIỆN ÍCH TOÁN HỌC ===================
var MathU = {
  toRad: function toRad(dec) {
    return dec * Math.PI / 180;
  },
  toDeg: function toDeg(rad) {
    return rad * 180 / Math.PI;
  },
  // Haversine siêu chính xác
  calcDistance: function calcDistance(lat1, lon1, lat2, lon2) {
    var R = 6371e3; // Đơn vị: mét
    var φ1 = MathU.toRad(lat1);
    var φ2 = MathU.toRad(lat2);
    var Δφ = MathU.toRad(lat2 - lat1);
    var Δλ = MathU.toRad(lon2 - lon1);
    var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  },
  // Góc phương vị (Bearing) tới đích
  calcBearing: function calcBearing(lat1, lon1, lat2, lon2) {
    var φ1 = MathU.toRad(lat1);
    var φ2 = MathU.toRad(lat2);
    var Δλ = MathU.toRad(lon2 - lon1);
    var y = Math.sin(Δλ) * Math.cos(φ2);
    var x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    var θ = Math.atan2(y, x);
    return (MathU.toDeg(θ) + 360) % 360; // 0-359
  }
};

// =================== INIT BẢN ĐỒ ===================
function initMap() {
  State.map = L.map('nav-map', {
    zoomControl: false,
    attributionControl: true // Bật attribution để đúng license
  }).setView([21.0285, 105.8542], CONFIG.defaultZoom);

  // Layer 1: OSM Standard - Chi tiết đường phố + Nhãn tiếng Việt (từ mã Thùy gửi!)
  var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  // Layer 2: CartoDB Voyager - Nhẹ, sáng sủa (dùng làm phương án dự phòng)
  var cartoLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://carto.com">CARTO</a>'
  });

  // OSM làm mặc định (nhiều chi tiết hơn, nhãn tiếng Việt)
  osmLayer.addTo(State.map);

  // Thanh đổi layer (góc trên phải bản đồ)
  L.control.layers({
    '🗺️ Chi tiết (OSM)': osmLayer,
    '🧭 Sáng sủa (Carto)': cartoLayer
  }, {}, {
    position: 'topright',
    collapsed: true
  }).addTo(State.map);

  // Thanh tỷ lệ
  L.control.scale({
    imperial: false,
    metric: true,
    position: 'bottomleft'
  }).addTo(State.map);

  // Nút zoom
  L.control.zoom({
    position: 'bottomright'
  }).addTo(State.map);
  State.userMarker = L.divIcon({
    className: 'user-marker-wrap',
    html: '<div class="user-marker"></div>',
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });

  // Chặn Auto-pan khi user tự vuốt bản đồ
  State.map.on('dragstart', function () {
    if (State.isNavigating) {
      State.autoPan = false;
      els.recenterBtn.hidden = false;
    }
  });
}

// =================== VOICE AI GUIDE (TRỢ LÝ GIỌNG NÓI) ===================
function initVoiceGuide() {
  if (!window.voiceGuide) return;

  // Cấu hình callback khi nhận được văn bản
  window.voiceGuide.onResultCallback = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(text) {
      var res, data, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            console.log('[Navigator AI]:', text);
            if (els.statusText) els.statusText.textContent = "\uD83C\uDFA4 B\u1EA1n: \"".concat(text, "\"");

            // Gửi lên server AI với đầy đủ ngữ cảnh
            _context.p = 1;
            _context.n = 2;
            return fetch('/api/chat', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                message: text,
                deviceId: localStorage.getItem('wander_device_id'),
                coords: State.userLoc,
                itinerary: State.waypoints,
                chatHistory: []
              })
            });
          case 2:
            res = _context.v;
            _context.n = 3;
            return res.json();
          case 3:
            data = _context.v;
            if (data.success && data.answer) {
              window.voiceGuide.speak(data.answer);
            } else {
              window.voiceGuide.speak("Xin lỗi, tớ chưa xử lý được câu hỏi này.");
            }
            _context.n = 5;
            break;
          case 4:
            _context.p = 4;
            _t = _context.v;
            console.error('Lỗi gọi AI:', _t);
            window.voiceGuide.speak("Có lỗi kết nối với máy chủ AI rồi.");
          case 5:
            return _context.a(2);
        }
      }, _callee, null, [[1, 4]]);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();

  // Cập nhật UI theo trạng thái
  window.voiceGuide.onStatusChange = function (status, error) {
    // Navigator giờ dùng chung Voice Overlay toàn cục từ voice-helper.js
    // nên không cần logic cập nhật statusText riêng ở đây nữa.
    if (status === 'error') {
      els.statusText.textContent = 'Lỗi giọng nói!';
      els.statusText.className = "status-msg error";
    }
  };

  // Nút bấm kích hoạt Mic (Manual)
  els.voiceBtn.addEventListener('click', function () {
    if (window.voiceGuide.isListening) {
      window.voiceGuide.stop();
    } else {
      window.voiceGuide.start();
    }
  });
}

// Giữ lại hàm speak cũ để các phần khác trong navigator.js không bị lỗi
function speakMsg(text) {
  if (window.voiceGuide) {
    window.voiceGuide.speak(text);
  }
}

// =================== XỬ LÝ LA BÀN ===================
function initCompass() {
  if (window.DeviceOrientationEvent) {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      // iOS 13+ yêu cầu xin quyền
      els.calibrateBtn.addEventListener('click', function () {
        DeviceOrientationEvent.requestPermission().then(function (permissionState) {
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation, true);
            els.statusText.textContent = "Đã bật La bàn";
            els.statusText.className = "status-msg success";
            State.deviceCalibrated = true;
          } else {
            els.statusText.textContent = "Bị từ chối quyền La bàn";
            els.statusText.className = "status-msg error";
          }
        }).catch(console.error);
      });
      els.statusText.textContent = "Chạm biểu tượng 🧭 trên góc phải để bật la bàn";
    } else {
      // Android / iOS cũ
      window.addEventListener('deviceorientation', handleOrientation, true);
      State.deviceCalibrated = true;
    }
  } else {
    els.statusText.textContent = "Thiết bị không hỗ trợ La bàn hardware.";
  }
}
function handleOrientation(event) {
  var alpha = event.alpha;
  var webkitCompassHeading = event.webkitCompassHeading;
  var heading = 0;
  if (webkitCompassHeading) {
    // iOS
    heading = webkitCompassHeading;
  } else if (alpha !== null) {
    // Android, alpha ngược với la bàn
    heading = 360 - alpha;
  }
  State.compassHeading = heading;
  updateArrowRotation();
}
function updateArrowRotation() {
  if (!State.userLoc || !State.targetLoc) return;
  var bearing = MathU.calcBearing(State.userLoc.lat, State.userLoc.lng, State.targetLoc.lat, State.targetLoc.lng);

  // Mũi tên chỉ về đích = Góc tới đích - Hướng máy hiện tại
  var rotation = bearing - State.compassHeading;
  if (els.compassArrow) {
    els.compassArrow.style.transform = "rotate(".concat(rotation, "deg)");
  }
  if (els.bearing) {
    els.bearing.innerHTML = "".concat(Math.round(bearing), "<span class=\"stat-unit\">\xB0</span>");
  }
}

// =================== XỬ LÝ GPS VÀ HIỂN THỊ ===================
function startGPS() {
  if (!("geolocation" in navigator)) {
    els.statusText.textContent = "Trình duyệt không hỗ trợ GPS.";
    els.statusText.className = "status-msg error";
    hideGpsOverlay();
    return;
  }

  // Hiển thị loading overlay GPS
  showGpsOverlay();
  State.watchId = navigator.geolocation.watchPosition(function (pos) {
    var crd = pos.coords;
    State.userLoc = {
      lat: crd.latitude,
      lng: crd.longitude,
      acc: crd.accuracy,
      speed: crd.speed
    };

    // Cập nhật marker
    if (!State.userMarkerObj) {
      // Ẩn loading overlay ngay khi bắt được GPS lần đầu
      hideGpsOverlay();
      State.userMarkerObj = L.marker([crd.latitude, crd.longitude], {
        icon: State.userMarker
      }).addTo(State.map);
      State.map.setView([crd.latitude, crd.longitude], CONFIG.defaultZoom);
      if (!els.statusText.textContent.includes('Không tìm thấy')) {
        els.statusText.textContent = "\u2705 \u0110\xE3 kh\xF3a GPS (\xB1".concat(Math.round(crd.accuracy), "m)");
        els.statusText.className = "status-msg success";
      }

      // NẾU CÓ LỊCH TRÌNH CHỜ SẴN -> Bắt đầu parse (Giờ mới có GPS để tính khoảng cách)
      if (State.pendingItinerary) {
        parseItinerary(State.pendingItinerary.plan, State.pendingItinerary.destName);
        State.pendingItinerary = null;
      }

      // Tự động tìm đường nếu chưa có đường mà đã có đích
      if (State.targetLoc && !State.routeLine) {
        fetchOSRMRoute();
      }
    } else {
      State.userMarkerObj.setLatLng([crd.latitude, crd.longitude]);
      if (State.autoPan) {
        // Nếu đang dẫn đường, đảm bảo zoom luôn đủ lớn để nhìn rõ ngã rẽ
        if (State.isNavigating && State.map.getZoom() < CONFIG.defaultZoom) {
          State.map.setView([crd.latitude, crd.longitude], CONFIG.defaultZoom);
        } else {
          State.map.panTo([crd.latitude, crd.longitude]);
        }
      }
    }

    // Xử lý km/h
    var currentSpeed = crd.speed || 0;
    els.speed.innerHTML = "".concat(Math.round(currentSpeed * 3.6), "<span class=\"stat-unit\">km/h</span>");
    calculateNav();
  }, function (err) {
    console.warn('GPS Error:', err);
    hideGpsOverlay();
    if (err.code === 1) {
      // 1 = PERMISSION_DENIED
      els.statusText.innerHTML = "\u26A0\uFE0F B\u1ECB t\u1EEB ch\u1ED1i GPS. <button id=\"demo-btn\" class=\"btn btn--primary\" style=\"padding: 4px 8px; margin-left:8px; font-size:12px; border-radius:8px;\">\uD83C\uDFAE Ch\u1EA1y Demo</button>";
      els.statusText.className = "status-msg error";
      document.getElementById('demo-btn').addEventListener('click', function () {
        stopGPS();
        startDemoGPS();
      });
    } else if (err.code === 3) {
      // TIMEOUT
      els.statusText.textContent = "\u23F1 GPS ch\u1EADm ph\u1EA3n h\u1ED3i. \u0110ang th\u1EED l\u1EA1i...";
      els.statusText.className = "status-msg error";
    } else {
      els.statusText.textContent = "L\u1ED7i GPS: ".concat(err.message);
      els.statusText.className = "status-msg error";
    }
  }, CONFIG.gpsOptions);
}
function showGpsOverlay() {
  if (els.gpsOverlay) els.gpsOverlay.style.display = 'flex';
}
function hideGpsOverlay() {
  if (els.gpsOverlay) {
    els.gpsOverlay.style.animation = 'fadeOut 0.4s ease forwards';
    setTimeout(function () {
      if (els.gpsOverlay) els.gpsOverlay.style.display = 'none';
    }, 400);
  }
}

// =================== DEMO GPS (MÔ PHỎNG) ===================
function startDemoGPS() {
  els.statusText.textContent = "Đang chạy chế độ Demo (Giả lập)...";
  els.statusText.className = "status-msg success";

  // Tọa độ giả lập ban đầu (Hà Nội, gần rùa Hồ Gươm)
  var demoLat = 21.0278;
  var demoLng = 105.8523;
  State.watchId = setInterval(function () {
    // Mỗi 1 giây di chuyển nhẹ về hướng Đông Bắc
    demoLat += 0.00001;
    demoLng += 0.00001;
    var currentSpeed = 5; // ~18km/h
    State.userLoc = {
      lat: demoLat,
      lng: demoLng,
      acc: 5,
      speed: currentSpeed
    };
    els.speed.innerHTML = "".concat(Math.round(currentSpeed * 3.6), "<span class=\"stat-unit\">km/h</span>");
    if (!State.userMarkerObj) {
      State.userMarkerObj = L.marker([demoLat, demoLng], {
        icon: State.userMarker
      }).addTo(State.map);
      State.map.setView([demoLat, demoLng], CONFIG.defaultZoom);
    } else {
      State.userMarkerObj.setLatLng([demoLat, demoLng]);
      if (State.autoPan) {
        State.map.panTo([demoLat, demoLng]);
      }
    }
    calculateNav();
  }, 1000);
}
function stopGPS() {
  if (State.watchId) {
    navigator.geolocation.clearWatch(State.watchId);
    clearInterval(State.watchId); // Clear luôn cả demo nếu đang chạy
  }
}

// Tính toán khoảng cách và gọi render
function calculateNav() {
  if (!State.userLoc || !State.targetLoc) return;
  var distMeters = MathU.calcDistance(State.userLoc.lat, State.userLoc.lng, State.targetLoc.lat, State.targetLoc.lng);

  // Format thông minh hiển thị mm/cm/m/km
  if (distMeters < 1) {
    // Dưới 1 mét
    var cm = Math.round(distMeters * 100);
    els.dtg.innerHTML = "".concat(cm, "<span class=\"stat-unit\">cm</span>");
    els.dtg.style.color = "var(--success)";
    if (cm < 10 && !State.reachedDest) {
      els.statusText.textContent = "🎉 BẠN ĐÃ ĐẾN ĐÍCH!";
      speakMsg("Bạn đã đến đích. Hoàn thành lộ trình hiện tại.");
      State.reachedDest = true;
      if (State.waypoints && State.waypoints.length > 0) {
        State.isNavigating = false;
        var navStats = document.getElementById('nav-stats');
        if (navStats) navStats.style.setProperty('display', 'none', 'important');
        var previewBox = document.getElementById('preview-box');
        if (previewBox) previewBox.style.setProperty('display', 'flex', 'important');
        els.startBtn.hidden = true;
        var nextBtn = document.getElementById('next-waypoint-btn');
        if (nextBtn) nextBtn.hidden = false;
      }
    }
  } else if (distMeters < 1000) {
    // Dưới 1km đo bằng mét
    els.dtg.innerHTML = "".concat(Math.round(distMeters), "<span class=\"stat-unit\">m</span>");
    els.dtg.style.color = "var(--text-main)";

    // Auto advance if within 30m
    if (distMeters < 40 && !State.reachedDest) {
      els.statusText.textContent = "🎉 GẦN ĐẾN ĐÍCH!";
      speakMsg("Bạn sắp tới đích.");
      State.reachedDest = true;
      if (State.waypoints && State.waypoints.length > 0) {
        State.isNavigating = false;
        var _navStats = document.getElementById('nav-stats');
        if (_navStats) _navStats.style.setProperty('display', 'none', 'important');
        var _previewBox = document.getElementById('preview-box');
        if (_previewBox) _previewBox.style.setProperty('display', 'flex', 'important');
        els.startBtn.hidden = true;
        var _nextBtn = document.getElementById('next-waypoint-btn');
        if (_nextBtn) _nextBtn.hidden = false;
      }
    }
  } else {
    els.dtg.innerHTML = "".concat((distMeters / 1000).toFixed(1), "<span class=\"stat-unit\">km</span>");
    els.dtg.style.color = "white";
  }

  // Tự động vẽ lại đường nếu bác tài chạy lệch (Reroute)
  if (State.isNavigating) {
    var now = Date.now();
    if (!State.lastRouteTime || now - State.lastRouteTime > 20000) {
      State.lastRouteTime = now;
      // Gọi fetchOSRMRoute(false) để ko bị spam đọcTTS (TTS pass false parameter nếu có hàm)
      fetchOSRMRoute(false);
    }

    // TURN BY TURN LOGIC (Đọc ngã rẽ)
    if (State.routeSteps && State.routeSteps.length > 0) {
      // OSRM steps contain location [lng, lat]
      var nextStep = State.routeSteps[Math.min(1, State.routeSteps.length - 1)];
      if (State.routeSteps.length > 1) {
        var stepDist = MathU.calcDistance(State.userLoc.lat, State.userLoc.lng, nextStep.maneuver.location[1], nextStep.maneuver.location[0]);
        var tbtBanner = document.getElementById('tbt-banner');
        if (tbtBanner) tbtBanner.hidden = false;
        var modifierStr = "Đi thẳng";
        var iconStr = "⬆️";
        if (nextStep.maneuver.modifier) {
          if (nextStep.maneuver.modifier.includes('left')) {
            modifierStr = "Rẽ trái";
            iconStr = "⬅️";
          } else if (nextStep.maneuver.modifier.includes('right')) {
            modifierStr = "Rẽ phải";
            iconStr = "➡️";
          } else if (nextStep.maneuver.modifier.includes('uturn')) {
            modifierStr = "Quay đầu";
            iconStr = "↩️";
          }
        }
        var roadName = nextStep.name ? "v\xE0o ".concat(nextStep.name) : "";
        var fullInst = "".concat(modifierStr, " ").concat(roadName).trim();
        document.getElementById('tbt-dist').textContent = stepDist < 1000 ? "".concat(Math.round(stepDist), " m") : "".concat((stepDist / 1000).toFixed(1), " km");
        document.getElementById('tbt-text').textContent = fullInst;
        document.getElementById('tbt-icon').textContent = iconStr;

        // Đọc khi cách ngã rẽ dưới 50m và chưa đọc
        if (stepDist < 50 && State.lastSpokenStep !== nextStep.maneuver.location[0]) {
          State.lastSpokenStep = nextStep.maneuver.location[0];
          speakMsg("S\u1EAFp t\u1EDBi, ".concat(modifierStr, " ").concat(roadName));
        }
      } else {
        var _tbtBanner = document.getElementById('tbt-banner');
        if (_tbtBanner) _tbtBanner.hidden = true;
      }
    }
  }

  // Tính toán Thời gian đến ETA (Dựa trên Speed hoặc mặc định cấu hình)
  var speedMs = State.userLoc && State.userLoc.speed ? State.userLoc.speed : 0;
  if (speedMs < 0.5) {
    if (State.routeMode === 'foot') speedMs = 1.38; // 5km/h
    else if (State.routeMode === 'bike') speedMs = 4.16; // 15km/h
    else if (State.routeMode === 'motorcycle') speedMs = 11.11; // 40km/h
    else if (State.routeMode === 'airplane') speedMs = 222.2; // 800km/h
    else speedMs = 13.88; // car: 50km/h
  }
  var etaMins = Math.ceil(distMeters / speedMs / 60);
  if (etaMins > 60) {
    els.eta.innerHTML = "".concat(Math.floor(etaMins / 60), "h").concat(etaMins % 60, "<span class=\"stat-unit\">p</span>");
  } else {
    els.eta.innerHTML = "".concat(etaMins, "<span class=\"stat-unit\">ph\xFAt</span>");
  }

  // Cập nhật la bàn
  updateArrowRotation();
}

// Bắt sự kiện chọn đích
function setTarget(lat, lng) {
  State.targetLoc = {
    lat: parseFloat(lat),
    lng: parseFloat(lng)
  };
  State.reachedDest = false; // Reset cờ đến đích

  if (!State.targetMarkerObj) {
    // Sử dụng icon tùy chỉnh cho điểm đến
    var targetIcon = L.divIcon({
      className: 'target-marker-wrap',
      html: '<div class="target-marker-outer"><div class="target-marker-inner"></div></div>',
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });
    State.targetMarkerObj = L.marker([lat, lng], {
      icon: targetIcon
    }).addTo(State.map);
  } else {
    State.targetMarkerObj.setLatLng([lat, lng]);
  }

  // Tự động tìm đường ngay khi có đích (nếu đã khoá được GPS)
  if (State.userLoc) {
    fetchOSRMRoute();
  }
  if (State.userLoc) {
    State.map.fitBounds([[State.userLoc.lat, State.userLoc.lng], [State.targetLoc.lat, State.targetLoc.lng]], {
      padding: [50, 50]
    });
  }
}

// ==== HỆ THỐNG ITINERARY (LỊCH TRÌNH CHUYẾN ĐI) ====
function parseItinerary(_x2, _x3) {
  return _parseItinerary.apply(this, arguments);
}
function _parseItinerary() {
  _parseItinerary = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(plan, destName) {
    var searchWrap, quickTargets, navStats, previewBox, points, crRes, crData, cxLat, cxLng, distToCity, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          els.itiBanner.hidden = false;

          // Hide manual search UI to clean up screen
          searchWrap = document.getElementById('search-wrap');
          if (searchWrap) searchWrap.style.setProperty('display', 'none', 'important');
          quickTargets = document.getElementById('quick-targets-row');
          if (quickTargets) quickTargets.style.setProperty('display', 'none', 'important');
          navStats = document.getElementById('nav-stats');
          if (navStats) navStats.style.setProperty('display', 'none', 'important');
          previewBox = document.getElementById('preview-box');
          if (previewBox) previewBox.style.setProperty('display', 'flex', 'important');
          els.itiProgress.textContent = "🧭 Đang nạp lịch trình AI...";
          points = [];
          if (plan && plan.itinerary) {
            plan.itinerary.forEach(function (day) {
              if (day.activities) {
                day.activities.forEach(function (act) {
                  if (act.location && act.location.trim() !== '' && !act.location.includes('Tuỳ chọn')) {
                    points.push("Ng\xE0y ".concat(day.day.split(' ')[0], ": ").concat(act.location.trim()));
                  }
                });
              }
            });
          }
          if (!(points.length === 0)) {
            _context3.n = 1;
            break;
          }
          els.itiProgress.textContent = "🧭 Không có điểm đến cụ thể";
          return _context3.a(2);
        case 1:
          if (!(destName && State.userLoc)) {
            _context3.n = 6;
            break;
          }
          els.itiProgress.textContent = "\uD83E\uDDED \u0110ang \u0111\u1ECBnh v\u1ECB v\xF9ng \u0111i\u1EC1u h\u01B0\u1EDBng...";
          _context3.p = 2;
          _context3.n = 3;
          return fetch("https://nominatim.openstreetmap.org/search?format=json&q=".concat(encodeURIComponent(destName + ', Vietnam'), "&limit=1"));
        case 3:
          crRes = _context3.v;
          _context3.n = 4;
          return crRes.json();
        case 4:
          crData = _context3.v;
          if (crData && crData.length > 0) {
            cxLat = parseFloat(crData[0].lat);
            cxLng = parseFloat(crData[0].lon);
            distToCity = MathU.calcDistance(State.userLoc.lat, State.userLoc.lng, cxLat, cxLng); // Nếu người dùng cách đích lớn hơn 60km -> Đang ở ngoài tỉnh/thành phố đó
            if (distToCity > 60000) {
              points.unshift("Th\xE0nh ph\u1ED1 ".concat(destName));
              console.log("User is ".concat(distToCity / 1000, "km away. Added City-First waypoint."));
            } else {
              console.log("User is already in or near the destination city. Proceeding with local itinerary.");
            }
          }
          _context3.n = 6;
          break;
        case 5:
          _context3.p = 5;
          _t3 = _context3.v;
          console.error("City-first geocode check failed", _t3);
        case 6:
          State.waypoints = points;
          State.currentWaypointIndex = 0;
          els.itiSkipBtn.hidden = false;
          startCurrentWaypoint();
        case 7:
          return _context3.a(2);
      }
    }, _callee3, null, [[2, 5]]);
  }));
  return _parseItinerary.apply(this, arguments);
}
function startCurrentWaypoint() {
  return _startCurrentWaypoint.apply(this, arguments);
}
function _startCurrentWaypoint() {
  _startCurrentWaypoint = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
    var wp, destName, nextWp, query, fullQuery, res, data, fbRes, fbData, _t4;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          if (!(State.currentWaypointIndex >= State.waypoints.length)) {
            _context4.n = 1;
            break;
          }
          els.itiProgress.textContent = "✅ Hoàn tất hành trình!";
          els.itiCurrentTarget.textContent = "Tuyệt vời, bạn đã đi hết điểm đến!";
          els.itiNextTarget.textContent = "";
          els.itiSkipBtn.hidden = true;
          return _context4.a(2);
        case 1:
          wp = State.waypoints[State.currentWaypointIndex]; // Lấy destName từ storage để dùng trong fallback
          destName = sessionStorage.getItem('wander_active_dest') || '';
          els.itiProgress.textContent = "\uD83E\uDDED \u0110i\u1EC3m ".concat(State.currentWaypointIndex + 1, "/").concat(State.waypoints.length);
          els.itiCurrentTarget.textContent = "\u0110ang t\u1EDBi: ".concat(wp.split(': ')[1] || wp);
          if (State.currentWaypointIndex + 1 < State.waypoints.length) {
            nextWp = State.waypoints[State.currentWaypointIndex + 1];
            els.itiNextTarget.textContent = "Tiếp: " + (nextWp.split(': ')[1] || nextWp);
          } else {
            els.itiNextTarget.textContent = "🏁 Điểm cuối cùng!";
          }
          els.targetInput.value = wp.split(': ')[1] || wp;
          query = els.targetInput.value;
          if (query.includes('&')) query = query.split('&')[0].trim();
          if (query.includes('-')) query = query.split('-')[0].trim();
          _context4.p = 2;
          els.statusText.textContent = "\uD83D\uDD0D \u0110ang t\xECm v\u1ECB tr\xED: ".concat(query, "...");
          els.statusText.className = "status-msg";

          // Thêm destName vào query để chính xác hơn
          fullQuery = query;
          if (destName && !query.toLowerCase().includes(destName.toLowerCase())) {
            fullQuery = "".concat(query, ", ").concat(destName);
          }
          _context4.n = 3;
          return fetch("https://nominatim.openstreetmap.org/search?format=json&q=".concat(encodeURIComponent(fullQuery + ', Vietnam'), "&limit=1"));
        case 3:
          res = _context4.v;
          _context4.n = 4;
          return res.json();
        case 4:
          data = _context4.v;
          if (!(!data || data.length === 0)) {
            _context4.n = 7;
            break;
          }
          if (!destName) {
            _context4.n = 7;
            break;
          }
          _context4.n = 5;
          return fetch("https://nominatim.openstreetmap.org/search?format=json&q=".concat(encodeURIComponent(destName + ', Vietnam'), "&limit=1"));
        case 5:
          fbRes = _context4.v;
          _context4.n = 6;
          return fbRes.json();
        case 6:
          fbData = _context4.v;
          if (fbData && fbData.length > 0) {
            data = fbData;
            speakMsg("Kh\xF4ng t\xECm \u0111\u01B0\u1EE3c to\u1EA1 \u0111\u1ED9 ch\xEDnh x\xE1c, b\u1EA3n \u0111\u1ED3 s\u1EBD d\u1EABn t\u1EA1m t\u1EDBi trung t\xE2m ".concat(destName, "."));
            els.statusText.textContent = "D\u1EABn t\u1EA1m t\u1EDBi trung t\xE2m ".concat(destName, ".");
          }
        case 7:
          if (data && data.length > 0) {
            setTarget(parseFloat(data[0].lat), parseFloat(data[0].lon));
            // Thông báo ngắn gọn, không yêu cầu bấm thêm
            speakMsg("\u0110\xE3 t\xECm th\u1EA5y ".concat(query, ". Ch\u1ECDn ph\u01B0\u01A1ng ti\u1EC7n v\xE0 nh\u1EA5n B\u1EAFt \u0110\u1EA7u."));
            els.statusText.textContent = "\u2705 T\xECm th\u1EA5y: ".concat(query);
            els.statusText.className = "status-msg success";
          } else {
            els.statusText.textContent = "\u274C Kh\xF4ng t\xECm \u0111\u01B0\u1EE3c: ".concat(query, ". \u1EA4n B\u1ECE QUA ho\u1EB7c t\xECm th\u1EE7 c\xF4ng.");
            els.statusText.className = "status-msg error";
            speakMsg("Kh\xF4ng t\xECm \u0111\u01B0\u1EE3c v\u1ECB tr\xED. H\xE3y b\u1ECF qua \u0111i\u1EC3m n\xE0y.");
            els.setTargetBtn.hidden = false;
          }
          _context4.n = 9;
          break;
        case 8:
          _context4.p = 8;
          _t4 = _context4.v;
          console.error(_t4);
          els.statusText.textContent = "L\u1ED7i k\u1EBFt n\u1ED1i b\u1EA3n \u0111\u1ED3. Vui l\xF2ng th\u1EED l\u1EA1i.";
          els.statusText.className = "status-msg error";
        case 9:
          return _context4.a(2);
      }
    }, _callee4, null, [[2, 8]]);
  }));
  return _startCurrentWaypoint.apply(this, arguments);
}
function advanceWaypoint() {
  State.currentWaypointIndex++;
  startCurrentWaypoint();
}

// =================== FETCH OSRM ROUTE ===================
function fetchOSRMRoute() {
  return _fetchOSRMRoute.apply(this, arguments);
} // end fetchOSRMRoute
function _fetchOSRMRoute() {
  _fetchOSRMRoute = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
    var speakResult,
      tbtBanner,
      distMeters,
      distKm,
      timeMins,
      previewEta,
      previewDist,
      previewBox,
      navStats,
      profileMap,
      profile,
      callOSRM,
      _callOSRM,
      VN_CORRIDOR,
      straightDist,
      startPt,
      endPt,
      minLat,
      maxLat,
      anchors,
      maxAnchors,
      step,
      closest,
      minDist,
      anchorStr,
      waypointWithAnchors,
      waypointDirect,
      data,
      geojson,
      _distKm,
      _timeMins,
      _previewEta,
      _previewDist,
      vehicleName,
      _previewBox2,
      _navStats2,
      _distKm2,
      _previewEta2,
      _previewDist2,
      _args6 = arguments,
      _t5,
      _t6;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          _callOSRM = function _callOSRM3() {
            _callOSRM = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(waypointStr) {
              var url, res, data;
              return _regenerator().w(function (_context5) {
                while (1) switch (_context5.n) {
                  case 0:
                    url = "https://router.project-osrm.org/route/v1/".concat(profile, "/").concat(waypointStr, "?overview=full&geometries=geojson&steps=true");
                    _context5.n = 1;
                    return fetch(url, {
                      signal: AbortSignal.timeout(8000)
                    });
                  case 1:
                    res = _context5.v;
                    _context5.n = 2;
                    return res.json();
                  case 2:
                    data = _context5.v;
                    return _context5.a(2, data);
                }
              }, _callee5);
            }));
            return _callOSRM.apply(this, arguments);
          };
          callOSRM = function _callOSRM2(_x5) {
            return _callOSRM.apply(this, arguments);
          };
          speakResult = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : true;
          if (!(!State.userLoc || !State.targetLoc)) {
            _context6.n = 1;
            break;
          }
          return _context6.a(2);
        case 1:
          els.statusText.textContent = "Đang tìm đường bám theo đường bộ...";
          if (!(State.routeMode === 'airplane')) {
            _context6.n = 2;
            break;
          }
          if (State.routeLine) State.map.removeLayer(State.routeLine);

          // Vẽ đường chim bay (Nét đứt)
          State.routeLine = L.polyline([[State.userLoc.lat, State.userLoc.lng], [State.targetLoc.lat, State.targetLoc.lng]], {
            color: '#3b82f6',
            weight: 4,
            dashArray: '10, 10',
            opacity: 0.8
          }).addTo(State.map);

          // Xóa bước TBT
          State.routeSteps = null;
          tbtBanner = document.getElementById('tbt-banner');
          if (tbtBanner) tbtBanner.hidden = true;
          distMeters = MathU.calcDistance(State.userLoc.lat, State.userLoc.lng, State.targetLoc.lat, State.targetLoc.lng);
          distKm = distMeters / 1000;
          timeMins = Math.round(distKm / 800 * 60); // Tốc độ máy bay 800km/h
          els.dtgVal.innerHTML = "".concat(distKm.toFixed(1), "<span class=\"stat-unit\">km</span>");
          els.etaVal.innerHTML = "".concat(timeMins > 60 ? Math.floor(timeMins / 60) + 'g ' + timeMins % 60 + 'p' : timeMins, "<span class=\"stat-unit\">ph\xFAt</span>");
          previewEta = document.getElementById('preview-eta');
          previewDist = document.getElementById('preview-dist');
          if (previewEta) previewEta.textContent = timeMins > 60 ? "".concat(Math.floor(timeMins / 60), " gi\u1EDD ").concat(timeMins % 60, " ph\xFAt") : "".concat(timeMins, " ph\xFAt");
          if (previewDist) previewDist.textContent = "".concat(distKm.toFixed(1), " km");
          if (speakResult) {
            els.statusText.textContent = "\u0110\xE3 v\u1EBD \u0111\u01B0\u1EDDng bay th\u1EB3ng!";
            speakMsg(els.statusText.textContent);
          }

          // Hiển thị preview box
          previewBox = document.getElementById('preview-box');
          if (previewBox) previewBox.style.setProperty('display', 'flex', 'important');
          navStats = document.getElementById('nav-stats');
          if (navStats) navStats.style.setProperty('display', 'none', 'important');
          els.startBtn.hidden = false;

          // Fit map bounds chỉ khi chưa bắt đầu dẫn đường
          if (!State.isNavigating) {
            State.map.fitBounds(State.routeLine.getBounds(), {
              padding: [80, 80]
            });
          }
          return _context6.a(2);
        case 2:
          profileMap = {
            'foot': 'walking',
            'bike': 'cycling',
            'motorcycle': 'driving',
            'car': 'driving'
          };
          profile = profileMap[State.routeMode] || 'driving'; // Hàm gọi OSRM và vẽ đường
          // ==== GIỮ ĐƯỜNG TRONG LÃNH THỔ VIỆT NAM (DỌC ĐƯỜNG BIỂN) ====
          // Danh sách các điểm "neo" chiến lược dọc QL1A để ép OSRM không đi xuyên biên giới.
          // Được sắp xếp từ Bắc vào Nam.
          VN_CORRIDOR = [{
            lat: 21.03,
            lng: 105.84,
            name: 'Hà Nội'
          }, {
            lat: 20.45,
            lng: 105.94,
            name: 'Ninh Bình'
          }, {
            lat: 19.81,
            lng: 105.78,
            name: 'Thanh Hoá'
          }, {
            lat: 18.67,
            lng: 105.68,
            name: 'Vinh'
          }, {
            lat: 18.34,
            lng: 105.90,
            name: 'Hà Tĩnh'
          }, {
            lat: 17.46,
            lng: 106.62,
            name: 'Đồng Hới'
          }, {
            lat: 16.89,
            lng: 107.14,
            name: 'Quảng Trị'
          }, {
            lat: 16.46,
            lng: 107.59,
            name: 'Huế'
          }, {
            lat: 16.05,
            lng: 108.20,
            name: 'Đà Nẵng'
          }, {
            lat: 15.08,
            lng: 108.79,
            name: 'Quảng Ngãi'
          }, {
            lat: 13.77,
            lng: 109.22,
            name: 'Quy Nhơn'
          }, {
            lat: 13.09,
            lng: 109.31,
            name: 'Tuy Hoà'
          }, {
            lat: 12.24,
            lng: 109.19,
            name: 'Nha Trang'
          }, {
            lat: 11.57,
            lng: 108.99,
            name: 'Phan Rang'
          }, {
            lat: 10.94,
            lng: 108.09,
            name: 'Phan Thiết'
          }, {
            lat: 10.78,
            lng: 106.66,
            name: 'TP. HCM'
          }, {
            lat: 10.26,
            lng: 105.96,
            name: 'Vĩnh Long'
          }, {
            lat: 10.04,
            lng: 105.79,
            name: 'Cần Thơ'
          }, {
            lat: 9.18,
            lng: 105.15,
            name: 'Cà Mau'
          }];
          straightDist = MathU.calcDistance(State.userLoc.lat, State.userLoc.lng, State.targetLoc.lat, State.targetLoc.lng);
          startPt = "".concat(State.userLoc.lng, ",").concat(State.userLoc.lat);
          endPt = "".concat(State.targetLoc.lng, ",").concat(State.targetLoc.lat); // THUẬT TOÁN CHỌN ĐIỂM NEO THÔNG MINH:
          // Lấy danh sách điểm neo nằm giữa vĩ độ của điểm đầu và điểm cuối
          minLat = Math.min(State.userLoc.lat, State.targetLoc.lat);
          maxLat = Math.max(State.userLoc.lat, State.targetLoc.lat); // Lọc các điểm neo nằm trong dải vĩ độ hành trình (lùi vào 0.05 độ để tránh trùng điểm đầu/cuối)
          anchors = VN_CORRIDOR.filter(function (pt) {
            return pt.lat > minLat + 0.05 && pt.lat < maxLat - 0.05;
          }); // Sắp xếp theo hướng di chuyển (Bắc -> Nam hoặc ngược lại)
          if (State.userLoc.lat > State.targetLoc.lat) {
            anchors.sort(function (a, b) {
              return b.lat - a.lat;
            }); // Xuôi Nam -> Bắc
          } else {
            anchors.sort(function (a, b) {
              return a.lat - b.lat;
            }); // Xuôi Bắc -> Nam
          }

          // Với hành trình xuyên Việt (> 500km), lấy tối đa 10 điểm neo để "ghim" đường cực chắc
          maxAnchors = straightDist > 500000 ? 10 : 5;
          if (anchors.length > maxAnchors) {
            step = Math.floor(anchors.length / maxAnchors);
            anchors = anchors.filter(function (_, i) {
              return i % step === 0;
            }).slice(0, maxAnchors);
          }

          // Nếu hành trình ngắn (< 100km) và không có điểm neo nào ở giữa, lấy 1 điểm gần nhất
          if (anchors.length === 0 && straightDist > 30000) {
            // Chỉ thêm neo cho chặng trên 30km
            closest = VN_CORRIDOR[0];
            minDist = Infinity;
            VN_CORRIDOR.forEach(function (pt) {
              var d = MathU.calcDistance((State.userLoc.lat + State.targetLoc.lat) / 2, (State.userLoc.lng + State.targetLoc.lng) / 2, pt.lat, pt.lng);
              if (d < minDist) {
                minDist = d;
                closest = pt;
              }
            });
            // Chỉ thêm nếu điểm neo này không quá xa (tránh bẻ lái quá gắt cho chặng ngắn)
            if (minDist < 30000) anchors = [closest];
          }

          // Xây dựng chuỗi waypoint
          anchorStr = anchors.map(function (a) {
            return "".concat(a.lng, ",").concat(a.lat);
          }).join(';');
          waypointWithAnchors = anchors.length > 0 ? "".concat(startPt, ";").concat(anchorStr, ";").concat(endPt) : "".concat(startPt, ";").concat(endPt);
          waypointDirect = "".concat(startPt, ";").concat(endPt);
          data = null; // --- Lần thử 1: Với các điểm neo (chỉ chạy nếu có anchors) ---
          if (!(anchors.length > 0)) {
            _context6.n = 6;
            break;
          }
          _context6.p = 3;
          _context6.n = 4;
          return callOSRM(waypointWithAnchors);
        case 4:
          data = _context6.v;
          if (!data || data.code !== 'Ok') data = null;
          _context6.n = 6;
          break;
        case 5:
          _context6.p = 5;
          _t5 = _context6.v;
          console.warn('OSRM attempt 1 (anchored) failed:', _t5.message);
          data = null;
        case 6:
          if (data) {
            _context6.n = 10;
            break;
          }
          _context6.p = 7;
          _context6.n = 8;
          return callOSRM(waypointDirect);
        case 8:
          data = _context6.v;
          if (!data || data.code !== 'Ok') data = null;
          _context6.n = 10;
          break;
        case 9:
          _context6.p = 9;
          _t6 = _context6.v;
          console.warn('OSRM attempt 2 (direct) failed:', _t6.message);
          data = null;
        case 10:
          // --- XỬ LÝ KẾT QUẢ ---
          if (data && data.routes && data.routes.length > 0) {
            State.routeSteps = [];
            if (data.routes[0].legs) {
              data.routes[0].legs.forEach(function (leg) {
                var _State$routeSteps;
                if (leg.steps) (_State$routeSteps = State.routeSteps).push.apply(_State$routeSteps, _toConsumableArray(leg.steps));
              });
            }
            geojson = data.routes[0].geometry;
            if (State.routeLine) State.map.removeLayer(State.routeLine);
            State.routeLine = L.geoJSON(geojson, {
              style: {
                color: '#2563eb',
                weight: 6,
                opacity: 0.85
              }
            }).addTo(State.map);

            // Cập nhật stats
            _distKm = (data.routes[0].distance / 1000).toFixed(1);
            _timeMins = Math.round(data.routes[0].duration / 60);
            els.dtgVal.innerHTML = "".concat(_distKm, "<span class=\"stat-unit\">km</span>");
            els.etaVal.innerHTML = "".concat(_timeMins > 60 ? Math.floor(_timeMins / 60) + 'g ' + _timeMins % 60 + 'p' : _timeMins, "<span class=\"stat-unit\">ph\xFAt</span>");
            _previewEta = document.getElementById('preview-eta');
            _previewDist = document.getElementById('preview-dist');
            if (_previewEta) _previewEta.textContent = _timeMins > 60 ? "".concat(Math.floor(_timeMins / 60), " gi\u1EDD ").concat(_timeMins % 60, " ph\xFAt") : "".concat(_timeMins, " ph\xFAt");
            if (_previewDist) _previewDist.textContent = "".concat(_distKm, " km");
            vehicleName = State.routeMode === 'car' ? 'Ô tô' : State.routeMode === 'motorcycle' ? 'Xe máy' : 'Đi bộ';
            if (speakResult) {
              els.statusText.textContent = "\u2705 \u0110\xE3 v\u1EBD tuy\u1EBFn \u0111\u01B0\u1EDDng ".concat(vehicleName, " - ").concat(_distKm, "km!");
              speakMsg("\u0110\xE3 t\xECm th\u1EA5y \u0111\u01B0\u1EDDng, kho\u1EA3ng ".concat(_distKm, " km"));
            }

            // Hiển thị preview box
            _previewBox2 = document.getElementById('preview-box');
            if (_previewBox2) _previewBox2.style.setProperty('display', 'flex', 'important');
            _navStats2 = document.getElementById('nav-stats');
            if (_navStats2) _navStats2.style.setProperty('display', 'none', 'important');
            els.startBtn.hidden = false;
            els.startBtn.style.setProperty('display', 'block', 'important');

            // Fit map bounds chỉ khi chưa bắt đầu dẫn đường (Preview mode)
            if (!State.isNavigating) {
              State.map.fitBounds(State.routeLine.getBounds(), {
                padding: [60, 60]
              });
              els.recenterBtn.hidden = false; // Hiện nút định tâm để user có thể bấm lại nếu lỡ lướt đi
            }
          } else {
            // --- Lần thử 3 (FALLBACK): Vẽ đường thẳng ---
            if (State.routeLine) State.map.removeLayer(State.routeLine);
            State.routeLine = L.polyline([[State.userLoc.lat, State.userLoc.lng], [State.targetLoc.lat, State.targetLoc.lng]], {
              color: '#f59e0b',
              weight: 4,
              dashArray: '8, 8',
              opacity: 0.7
            }).addTo(State.map);
            _distKm2 = (straightDist / 1000).toFixed(1);
            _previewEta2 = document.getElementById('preview-eta');
            _previewDist2 = document.getElementById('preview-dist');
            if (_previewEta2) _previewEta2.textContent = "~".concat(Math.round(straightDist / 50000 * 60), " ph\xFAt");
            if (_previewDist2) _previewDist2.textContent = "".concat(_distKm2, " km");
            if (speakResult) els.statusText.textContent = "\u26A0\uFE0F Kh\xF4ng t\xECm \u0111\u01B0\u1EE3c \u0111\u01B0\u1EDDng b\u1ED9. \u0110ang hi\u1EC3n th\u1ECB \u0111\u01B0\u1EDDng th\u1EB3ng ".concat(_distKm2, "km.");
            els.startBtn.hidden = false;
          }
        case 11:
          return _context6.a(2);
      }
    }, _callee6, null, [[7, 9], [3, 5]]);
  }));
  return _fetchOSRMRoute.apply(this, arguments);
}
function startNavigation() {
  if (State.isNavigating) return;
  State.isNavigating = true;
  State.autoPan = true;
  els.startBtn.hidden = true;
  if (!State.waypoints || State.waypoints.length === 0) {
    document.getElementById('target-selector').hidden = true; // Ẩn chọn địa điểm để max map
  }
  els.statusText.textContent = "Đang dẫn đường...";
  speakMsg("Bắt đầu dẫn đường. Hãy chú ý an toàn!");
  State.map.setZoom(CONFIG.defaultZoom); // Phóng xuống địa điểm
  calculateNav();
}

// =================== INIT APP ===================
document.addEventListener('DOMContentLoaded', function () {
  initMap();
  initCompass();
  startGPS();
  var itJson = sessionStorage.getItem('wander_active_itinerary');
  var destName = sessionStorage.getItem('wander_active_dest') || '';
  if (itJson && itJson !== 'undefined') {
    try {
      var plan = JSON.parse(itJson);
      State.pendingItinerary = {
        plan: plan,
        destName: destName
      };
      // parseItinerary is entirely deferred until startGPS() gets userLoc!
    } catch (e) {
      console.error(e);
    }
  } else {
    // Check if dest is in URL
    var urlParams = new URLSearchParams(window.location.search);
    var destQuery = urlParams.get('dest');
    if (destQuery) {
      els.targetInput.value = destQuery;
      var evt = new Event('input');
      els.targetInput.dispatchEvent(evt);
    }
  }
  els.itiSkipBtn.addEventListener('click', function () {
    advanceWaypoint();
  });
  els.startBtn.addEventListener('click', function () {
    State.isNavigating = true;
    State.autoPan = true;
    State.reachedDest = false;
    els.startBtn.hidden = true;
    document.getElementById('target-selector').hidden = true;
    var navStats = document.getElementById('nav-stats');
    if (navStats) navStats.style.setProperty('display', 'flex', 'important');
    var previewBox = document.getElementById('preview-box');
    if (previewBox) previewBox.style.setProperty('display', 'none', 'important');

    // Hiện nút "Đã đến" để người dùng có thể tự bấm
    var arrivedBtn = document.getElementById('arrived-btn');
    if (arrivedBtn) arrivedBtn.hidden = false;

    // Ẩn nút tiếp tục nếu đang hiện
    var nextBtn = document.getElementById('next-waypoint-btn');
    if (nextBtn) nextBtn.hidden = true;
    els.statusText.textContent = "Đang dẫn đường...";
    speakMsg("Bắt đầu dẫn đường. Hãy chú ý an toàn!");
    State.map.setZoom(CONFIG.defaultZoom);
    calculateNav();
  });
  var nextBtn = document.getElementById('next-waypoint-btn');
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      nextBtn.hidden = true;
      var arrivedBtn = document.getElementById('arrived-btn');
      if (arrivedBtn) arrivedBtn.hidden = true;
      advanceWaypoint();
    });
  }

  // Nút "Đã đến nơi" - Người dùng tự bấm khi đã đến điểm
  var arrivedBtn = document.getElementById('arrived-btn');
  if (arrivedBtn) {
    arrivedBtn.addEventListener('click', function () {
      arrivedBtn.hidden = true;
      State.isNavigating = false;
      State.reachedDest = true;
      speakMsg("Bạn đã đến nơi! Chuyển sang điểm tiếp theo.");

      // Ẩn stats, hiện preview + nút tiếp tục
      var navStats = document.getElementById('nav-stats');
      if (navStats) navStats.style.setProperty('display', 'none', 'important');
      var previewBox = document.getElementById('preview-box');
      if (previewBox) previewBox.style.setProperty('display', 'flex', 'important');
      if (State.waypoints && State.currentWaypointIndex < State.waypoints.length - 1) {
        // Còn điểm tiếp theo - hiện nút Tiếp Tục
        var next = document.getElementById('next-waypoint-btn');
        if (next) next.hidden = false;
      } else {
        // Đã xong hành trình
        els.itiProgress.textContent = "✅ Hoàn thành hành trình!";
        els.itiCurrentTarget.textContent = "Bạn đã đi hết tất cả điểm đến!";
        els.itiNextTarget.textContent = "";
        speakMsg("Chúc mừng! Bạn đã hoàn thành toàn bộ hành trình.");
      }
    });
  }
  els.recenterBtn.addEventListener('click', function () {
    els.recenterBtn.hidden = true;
    if (State.isNavigating) {
      State.autoPan = true;
      if (State.userLoc) {
        State.map.setView([State.userLoc.lat, State.userLoc.lng], CONFIG.defaultZoom);
      }
    } else {
      // Nếu chưa dẫn đường, định tâm về toàn bộ lộ trình
      if (State.routeLine) {
        State.map.fitBounds(State.routeLine.getBounds(), {
          padding: [60, 60]
        });
      } else if (State.userLoc) {
        State.map.setView([State.userLoc.lat, State.userLoc.lng], CONFIG.defaultZoom);
      }
    }
  });
  els.voiceBtn.addEventListener('click', function () {
    State.voiceEnabled = !State.voiceEnabled;
    els.voiceIcon.textContent = State.voiceEnabled ? '🔊' : '🔇';
    if (State.voiceEnabled) speakMsg("Đã bật trợ lý giọng nói");else window.speechSynthesis.cancel();
  });

  // TÌM KIẾM ĐỊA CHỈ (AUTOCOMPLETE NOMINATIM OSM)
  var searchTimeout = null;
  els.targetInput.addEventListener('input', function (e) {
    els.setTargetBtn.hidden = false; // Luôn hiện nút "Đi" khi người dùng sửa
    clearTimeout(searchTimeout);
    var query = e.target.value.trim();
    if (query.length < 3) {
      els.autocomplete.hidden = true;
      return;
    }
    searchTimeout = setTimeout(function () {
      fetchNominatim(query);
    }, 600);
  });
  function fetchNominatim(_x4) {
    return _fetchNominatim.apply(this, arguments);
  } // Ẩn Autocomplete khi click ra ngoài
  function _fetchNominatim() {
    _fetchNominatim = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(query) {
      var res, data, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.p = 0;
            _context2.n = 1;
            return fetch("https://nominatim.openstreetmap.org/search?format=json&q=".concat(encodeURIComponent(query), "&countrycodes=vn&limit=5"));
          case 1:
            res = _context2.v;
            _context2.n = 2;
            return res.json();
          case 2:
            data = _context2.v;
            els.autocomplete.innerHTML = '';
            if (data && data.length > 0) {
              data.forEach(function (item) {
                var li = document.createElement('li');
                li.className = 'autocomplete-item';
                li.textContent = item.display_name;
                li.addEventListener('click', function () {
                  els.targetInput.value = item.display_name.split(',')[0];
                  els.autocomplete.hidden = true;
                  setTarget(item.lat, item.lon);
                });
                els.autocomplete.appendChild(li);
              });
              els.autocomplete.hidden = false;
            } else {
              els.autocomplete.hidden = true;
            }
            _context2.n = 4;
            break;
          case 3:
            _context2.p = 3;
            _t2 = _context2.v;
            console.warn('Geocoding error', _t2);
          case 4:
            return _context2.a(2);
        }
      }, _callee2, null, [[0, 3]]);
    }));
    return _fetchNominatim.apply(this, arguments);
  }
  document.addEventListener('click', function (e) {
    if (!els.targetInput.contains(e.target) && !els.autocomplete.contains(e.target)) {
      els.autocomplete.hidden = true;
    }
  });
  els.setTargetBtn.addEventListener('click', function () {
    var val = els.targetInput.value.trim();
    if (val) {
      var parts = val.split(',');
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        setTarget(parts[0], parts[1]);
      } else {
        alert("Sai định dạng. Vui lòng nhập: Vĩ độ, Kinh độ (Vd: 21.0, 105.8)");
      }
    }
  });
  els.chips.forEach(function (chip) {
    chip.addEventListener('click', function (e) {
      els.targetInput.value = "".concat(e.target.dataset.lat, ", ").concat(e.target.dataset.lng);
      setTarget(e.target.dataset.lat, e.target.dataset.lng);
    });
  });
  els.transportModeRbs.forEach(function (rb) {
    rb.addEventListener('change', function (e) {
      State.routeMode = e.target.value;
      if (State.targetLoc && State.userLoc) {
        fetchOSRMRoute();
      }
    });
  });

  // Khởi tạo Trợ lý Hướng dẫn viên giọng nói
  initVoiceGuide();
});
