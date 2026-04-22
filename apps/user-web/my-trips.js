"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
document.addEventListener('DOMContentLoaded', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
  var token, unauthorizedMsg, tripsContainer, tripsList, res, data, renderTrips, initVoiceGuide, _t2;
  return _regenerator().w(function (_context2) {
    while (1) switch (_context2.p = _context2.n) {
      case 0:
        initVoiceGuide = function _initVoiceGuide() {
          if (!window.voiceGuide) return;
          var voiceBtn = document.getElementById('voice-btn');
          var voiceIcon = document.getElementById('voice-icon');
          var voiceIndicator = document.getElementById('voice-indicator');
          var voiceStatusText = document.getElementById('voice-status-text');
          var voiceChatPreview = document.getElementById('status-text');
          window.voiceGuide.onResultCallback = /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(text) {
              var _res, _data, _t;
              return _regenerator().w(function (_context) {
                while (1) switch (_context.p = _context.n) {
                  case 0:
                    if (voiceChatPreview) voiceChatPreview.textContent = "\uD83C\uDFA4: \"".concat(text, "\"");

                    // Hiển thị trạng thái đang suy nghĩ
                    if (voiceStatusText) voiceStatusText.textContent = 'Đang suy nghĩ...';
                    if (voiceIndicator) voiceIndicator.classList.add('active');
                    _context.p = 1;
                    _context.n = 2;
                    return fetch('/api/chat', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        message: text,
                        chatHistory: []
                      })
                    });
                  case 2:
                    _res = _context.v;
                    _context.n = 3;
                    return _res.json();
                  case 3:
                    _data = _context.v;
                    if (_data.success) {
                      window.voiceGuide.speak(_data.answer);
                    } else {
                      window.voiceGuide.speak("Tớ chưa nghe rõ, bạn nói lại được không?");
                    }
                    _context.n = 5;
                    break;
                  case 4:
                    _context.p = 4;
                    _t = _context.v;
                    window.voiceGuide.speak("Lỗi kết nối rồi bạn ơi.");
                  case 5:
                    return _context.a(2);
                }
              }, _callee, null, [[1, 4]]);
            }));
            return function (_x) {
              return _ref2.apply(this, arguments);
            };
          }();
          window.voiceGuide.onStatusChange = function (status) {
            voiceIndicator.classList.remove('listening', 'speaking');
            voiceIndicator.classList.add('active');
            if (status === 'listening') {
              voiceIndicator.classList.add('listening');
              voiceStatusText.textContent = 'Đang nghe...';
              voiceIcon.textContent = '🎤';
            } else if (status === 'speaking') {
              voiceIndicator.classList.add('speaking');
              voiceStatusText.textContent = 'Đang trả lời...';
              voiceIcon.textContent = '🤖';
            } else if (status === 'idle') {
              setTimeout(function () {
                if (!window.voiceGuide.isListening) {
                  voiceIndicator.classList.remove('active');
                  voiceIcon.textContent = '🔊';
                }
              }, 3000);
            }
          };
          voiceBtn.addEventListener('click', function () {
            if (window.voiceGuide.isListening) {
              window.voiceGuide.stop();
            } else {
              window.voiceGuide.start();
            }
          });
        };
        renderTrips = function _renderTrips(trips) {
          tripsList.innerHTML = '';
          trips.forEach(function (it) {
            var dbDate = new Date(it.createdAt);
            var dpDateString = dbDate.toLocaleDateString('vi-VN');
            var card = document.createElement('div');
            card.style.background = '#fff';
            card.style.borderRadius = '1rem';
            card.style.padding = '1.5rem';
            card.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
            card.style.display = 'flex';
            card.style.flexDirection = 'column';
            card.style.gap = '1rem';

            // ♥ Tính toán label ngày khởi hành
            var jsonStr = JSON.stringify(it.planJson);
            var tripDateLabel = '';
            var tripDateBadge = '';
            if (it.tripDate) {
              var tripD = new Date(it.tripDate);
              var tripDateStr = tripD.toLocaleDateString('vi-VN', {
                weekday: 'long',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              });
              var today = new Date();
              today.setHours(0, 0, 0, 0);
              var tripDay = new Date(it.tripDate);
              tripDay.setHours(0, 0, 0, 0);
              var diffDays = Math.round((tripDay - today) / (1000 * 60 * 60 * 24));
              if (diffDays === 0) {
                tripDateBadge = "<span style=\"background:#10b981;color:#fff;padding:0.2rem 0.75rem;border-radius:2rem;font-size:0.8rem;font-weight:700;\">\uD83D\uDD14 H\xD4M NAY!</span>";
              } else if (diffDays > 0 && diffDays <= 7) {
                tripDateBadge = "<span style=\"background:#f59e0b;color:#fff;padding:0.2rem 0.75rem;border-radius:2rem;font-size:0.8rem;font-weight:700;\">\u23F3 C\xF2n ".concat(diffDays, " ng\xE0y</span>");
              } else if (diffDays < 0) {
                tripDateBadge = "<span style=\"background:#94a3b8;color:#fff;padding:0.2rem 0.75rem;border-radius:2rem;font-size:0.8rem;font-weight:700;\">\u2705 \u0110\xE3 \u0111i</span>";
              } else {
                tripDateBadge = "<span style=\"background:#6366f1;color:#fff;padding:0.2rem 0.75rem;border-radius:2rem;font-size:0.8rem;font-weight:700;\">\uD83D\uDCC5 C\xF2n ".concat(diffDays, " ng\xE0y</span>");
              }
              tripDateLabel = "\u2022 \uD83D\uDEEB Kh\u1EDFi h\xE0nh: ".concat(tripDateStr);
            }
            var inner = "\n        <div style=\"display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem;\">\n          <div>\n            <div style=\"display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.25rem; flex-wrap: wrap;\">\n              <h2 style=\"font-size: 1.5rem; color: #0f172a; margin: 0;\">".concat(it.destination || 'Điểm đến', "</h2>\n              ").concat(tripDateBadge, "\n            </div>\n            <p style=\"color: #64748b; font-size: 0.95rem;\">\uD83D\uDD52 X\u1EBFp l\u1ECBch: ").concat(it.days, " Ng\xE0y \u2022 \uD83D\uDCB0 ").concat(it.budget, " ").concat(tripDateLabel, " \u2022 \uD83D\uDCC5 L\u01B0u ng\xE0y ").concat(dpDateString, "</p>\n          </div>\n          <div style=\"display: flex; gap: 0.5rem;\">\n            <button class=\"view-detail-btn btn\" style=\"padding: 0.5rem 1.25rem; font-size: 0.9rem; background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; cursor: pointer; border-radius: 8px;\" data-json='").concat(jsonStr.replace(/'/g, "&#39;"), "'>\n              Xem L\u1ECBch Tr\xECnh\n            </button>\n            <button class=\"start-trip-btn btn btn--primary\" style=\"padding: 0.5rem 1.25rem; font-size: 0.9rem; border-radius: 8px; cursor: pointer;\" data-dest=\"").concat(it.destination, "\" data-json='").concat(jsonStr.replace(/'/g, "&#39;"), "'>\n              \uD83D\uDEF5 L\xEAn \u0110\u01B0\u1EDDng Ngay\n            </button>\n          </div>\n        </div>\n      ");
            card.innerHTML = inner;
            tripsList.appendChild(card);
          });
          document.querySelectorAll('.view-detail-btn').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
              var jsonText = e.target.getAttribute('data-json');
              if (jsonText) {
                try {
                  var obj = JSON.parse(jsonText);
                  // In future, redirect to a dedicated render page. For now, we pop up a simple UI or print to console.
                  // We can use session storage to pass it to planner.html or a new display.html
                  sessionStorage.setItem('wander_view_trip', jsonText);
                  window.location.href = 'planner.html?view=true';
                } catch (err) {
                  alert('Dữ liệu JSON lỗi!');
                }
              }
            });
          });
          document.querySelectorAll('.start-trip-btn').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
              var dest = e.target.getAttribute('data-dest');
              var jsonText = e.target.getAttribute('data-json');
              if (jsonText) {
                sessionStorage.setItem('wander_active_itinerary', jsonText);
                sessionStorage.setItem('wander_active_dest', dest);
                window.location.href = 'navigator.html';
              } else if (dest) {
                window.location.href = "navigator.html?dest=".concat(encodeURIComponent(dest));
              }
            });
          });
        };
        token = localStorage.getItem('wander_token');
        unauthorizedMsg = document.getElementById('unauthorizedMsg');
        tripsContainer = document.getElementById('tripsContainer');
        tripsList = document.getElementById('tripsList');
        if (token) {
          _context2.n = 1;
          break;
        }
        unauthorizedMsg.style.display = 'block';
        return _context2.a(2);
      case 1:
        tripsContainer.style.display = 'block';
        _context2.p = 2;
        _context2.n = 3;
        return fetch('/api/planner/my-trips', {
          headers: {
            'x-auth-token': token
          }
        });
      case 3:
        res = _context2.v;
        if (!(res.status === 401 || res.status === 403)) {
          _context2.n = 4;
          break;
        }
        unauthorizedMsg.style.display = 'block';
        tripsContainer.style.display = 'none';
        return _context2.a(2);
      case 4:
        if (res.ok) {
          _context2.n = 5;
          break;
        }
        tripsList.innerHTML = "<p style=\"color: red; text-align: center;\">L\u1ED7i t\u1EEB m\xE1y ch\u1EE7: HTTP ".concat(res.status, ". Vui l\xF2ng th\u1EED l\u1EA1i.</p>");
        return _context2.a(2);
      case 5:
        _context2.n = 6;
        return res.json();
      case 6:
        data = _context2.v;
        if (data.success) {
          if (data.data.length === 0) {
            tripsList.innerHTML = "\n          <div style=\"background: #fff; padding: 2.5rem; border-radius: 1rem; text-align: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);\">\n            <p style=\"font-size: 1.2rem; color: #475569; margin-bottom: 1rem;\">B\u1EA1n ch\u01B0a l\u01B0u l\u1ECBch tr\xECnh n\xE0o c\u1EA3.</p>\n            <a href=\"planner.html\" class=\"planner-btn\" style=\"text-decoration: none; display: inline-block;\">\u2728 Tr\u1EA3i nghi\u1EC7m AI Planner ngay</a>\n          </div>\n        ";
          } else {
            renderTrips(data.data);
          }
        } else {
          tripsList.innerHTML = "<p style=\"color: red; text-align: center;\">L\u1ED7i t\u1EA3i d\u1EEF li\u1EC7u: ".concat(data.message, "</p>");
        }
        _context2.n = 8;
        break;
      case 7:
        _context2.p = 7;
        _t2 = _context2.v;
        console.error('My-trips fetch error:', _t2);
        tripsList.innerHTML = "<p style=\"color: red; text-align: center;\">L\u1ED7i k\u1EBFt n\u1ED1i t\u1EDBi m\xE1y ch\u1EE7: ".concat(_t2.message, "</p>");
      case 8:
        initVoiceGuide();
      case 9:
        return _context2.a(2);
    }
  }, _callee2, null, [[2, 7]]);
})));
