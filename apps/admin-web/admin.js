(function () {
  "use strict";

  // ===== ADMIN LOGIN OVERLAY MANAGEMENT =====
  const loginOverlay  = document.getElementById('admin-login-overlay');
  const loginForm     = document.getElementById('admin-login-form');
  const loginMsg      = document.getElementById('admin-login-msg');
  const errorBox      = document.getElementById('admin-error');
  const contentBox    = document.getElementById('admin-content');
  const usersTbody    = document.getElementById('users-tbody');
  const placesTbody   = document.getElementById('places-tbody');

  // === PORTAL ISOLATION: Admin uses a SEPARATE token key ===
  // This prevents cross-contamination with the Traveler portal (wander_token)
  const ADMIN_TOKEN_KEY = 'wander_admin_token';
  let token = localStorage.getItem(ADMIN_TOKEN_KEY);
  let usersData = [];
  let placesData = [];
  let feedbacksData = [];
  let itinerariesData = [];
  let knowledgeData = [];
  let currentAdmin = { role: null };

  // --- Bootstrap: decide login vs dashboard ---
  if (token) {
    initAdmin();
  } else {
    showLoginOverlay();
  }

  function showLoginOverlay() {
    if (loginOverlay) loginOverlay.style.display = 'flex';
  }

  function hideLoginOverlay() {
    if (loginOverlay) {
      loginOverlay.style.transition = 'opacity 0.4s ease';
      loginOverlay.style.opacity = '0';
      setTimeout(() => { loginOverlay.style.display = 'none'; }, 400);
    }
  }

  // Handle login form submit
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email    = document.getElementById('admin-login-email').value.trim().toLowerCase();
      const password = document.getElementById('admin-login-password').value;
      const btn      = document.getElementById('admin-login-btn');

      btn.textContent = 'Đang xác thực...';
      btn.disabled    = true;
      loginMsg.textContent = '';

      try {
        const res  = await fetch('/api/auth/admin/login', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ email, password })
        });
        const json = await res.json();

        if (!json.success) {
          loginMsg.textContent = json.message || 'Email hoặc mật khẩu không đúng.';
          btn.textContent = 'Đăng nhập Quản trị';
          btn.disabled = false;
          return;
        }

        if (json.user.role !== 'admin' && json.user.role !== 'superadmin') {
          loginMsg.textContent = '⛔ Tài khoản này không có quyền Admin.';
          btn.textContent = 'Đăng nhập Quản trị';
          btn.disabled = false;
          return;
        }

        // Lưu vào key riêng của Admin — KHÔNG dùng wander_token chung
        token = json.token;
        localStorage.setItem(ADMIN_TOKEN_KEY, token);

        btn.textContent = '✔ Thành công!';
        btn.style.background = 'linear-gradient(135deg,#4ade80,#22c55e)';
        setTimeout(() => {
          hideLoginOverlay();
          initAdmin();
        }, 600);

      } catch (err) {
        loginMsg.textContent = 'Lỗi kết nối máy chủ. Hãy kiểm tra backend đang chạy.';
        btn.textContent = 'Đăng nhập Quản trị';
        btn.disabled = false;
      }
    });
  }

  // Logout button — only removes ADMIN token, preserves traveler session
  function setupLogout() {
    document.querySelectorAll('[data-admin-logout]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Bạn có chắc chắn muốn đăng xuất khỏi hệ thống quản trị không?')) {
          localStorage.removeItem(ADMIN_TOKEN_KEY);
          token = null;
          // Reload page to show login overlay
          window.location.reload();
        }
      });
    });
  }

  async function apiFetch(url, options = {}, timeout = 10000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    
    options.headers = options.headers || {};
    options.headers['x-auth-token'] = token;
    if (options.body && !(options.body instanceof FormData)) {
      options.headers['Content-Type'] = 'application/json';
    }
    options.signal = controller.signal;

    try {
      const res = await fetch(url, options);
      clearTimeout(id);
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem(ADMIN_TOKEN_KEY);
          token = null;
          if (contentBox) contentBox.classList.add('is-hidden');
          showLoginOverlay();
          throw new Error('Unauthorized');
        }
        throw new Error(`API error: ${res.status}`);
      }
      return res.json();
    } catch (err) {
      clearTimeout(id);
      throw err;
    }
  }

  async function initAdmin() {
    // Show a small indicator if needed, but the main thing is not to hang
    console.log('Initializing Admin Portal...');
    try {
      // 1. Validate session first
      const meRes = await apiFetch('/api/auth/admin/me');
      
      if (!meRes.success || !meRes.user || !['admin', 'superadmin'].includes(meRes.user.role)) {
        localStorage.removeItem(ADMIN_TOKEN_KEY);
        token = null;
        showLoginOverlay();
        if (loginMsg) loginMsg.textContent = '⛔ Tài khoản không có quyền quản trị.';
        return;
      }

      currentAdmin = meRes.user;

      // Update top nav admin info
      const navName = document.getElementById('admin-name-head');
      const navAvatar = document.getElementById('admin-avatar-head');
      const sidebarName = document.getElementById('sidebar-admin-name');
      const sidebarEmail = document.getElementById('sidebar-admin-email');
      if (navName) navName.textContent = currentAdmin.displayName || currentAdmin.name || 'Admin';
      if (navAvatar && currentAdmin.avatar) navAvatar.src = currentAdmin.avatar;
      if (sidebarName) sidebarName.textContent = currentAdmin.displayName || currentAdmin.name || 'Super Admin';
      if (sidebarEmail) sidebarEmail.textContent = currentAdmin.email || 'admin@wanderviet.com';

      // === SHOW the dashboard (fixes blank screen bug caused by [hidden] !important CSS) ===
      hideLoginOverlay();
      if (contentBox) {
        contentBox.classList.remove('is-hidden');
      }
      if (errorBox) {
        errorBox.setAttribute('hidden', '');
      }

      // === ACTIVATE default Overview panel ===
      document.querySelectorAll('.admin-panel').forEach(p => {
        p.removeAttribute('hidden');
        p.classList.add('is-hidden');
      });
      // Show overview by default
      const overviewPanel = document.getElementById('panel-overview');
      if (overviewPanel) overviewPanel.classList.remove('is-hidden');
      // Mark overview tab as active
      document.querySelectorAll('[data-admin-tab]').forEach(b => b.classList.remove('is-active'));
      const overviewBtn = document.querySelector('[data-admin-tab="overview"]');
      if (overviewBtn) overviewBtn.classList.add('is-active');

      setupTabSwitching();
      setupLogout();
      setupBroadcastForm();
      setupAdminCreationForm();
      initThemeCustomizer();

      // Load overview data in background
      loadSystemStats().catch(err => console.warn('Stats load failed:', err));
      loadRealtimeLogs();
      
    } catch (e) {
      console.error('Admin bootstrap error:', e);
      if (e.message !== 'Unauthorized') {
        // Only show error if it's not a simple auth issue
        if (errorBox) {
          errorBox.removeAttribute('hidden');
          errorBox.textContent = "Lỗi khởi động hệ thống quản trị. Vui lòng kiểm tra kết nối API.";
        }
      }
    }
  }

  function setupTabSwitching() {
    const TAB_TITLES = {
      overview: 'Tổng quan hệ thống',
      moderation: 'Duyệt nội dung',
      users: 'Quản lý người dùng',
      notifications: 'Gửi thông báo',
      logs: 'Nhật ký hệ thống',
      places: 'Kho địa điểm',
      admins: 'Quản lý Admin',
      feedbacks: 'Phản hồi người dùng',
      itineraries: 'Lịch trình AI'
    };
    document.querySelectorAll('[data-admin-tab]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const tab = btn.dataset.adminTab;
        // Hide ALL panels (overview-shell is now inside panel-overview so it hides too)
        document.querySelectorAll('.admin-panel').forEach(p => p.classList.add('is-hidden'));
        document.querySelectorAll('.sidebar-btn').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        const panel = document.getElementById('panel-' + tab);
        if (panel) {
          panel.classList.remove('is-hidden');
          // Add/update panel page title for non-overview tabs
          if (tab !== 'overview') {
            let titleEl = panel.querySelector('.panel-page-title');
            if (!titleEl) {
              titleEl = document.createElement('div');
              titleEl.className = 'panel-page-title';
              panel.insertBefore(titleEl, panel.firstChild);
            }
            titleEl.innerHTML = `<h1 class="main-title">${TAB_TITLES[tab] || tab}</h1>`;
          }
          
          switch (tab) {
            case 'overview': await loadSystemStats(); break;
            case 'users': await loadUsers(); break;
            case 'places': await loadPlaces(); break;
            case 'feedbacks': await loadFeedbacks(); break;
            case 'itineraries': await loadItineraries(); break;
            case 'knowledge': await initKnowledge(); break;
            case 'logs': await loadLogs('all'); break;
            case 'moderation': await loadModeration(); break;
          }
        }
      });
    });
  }

  async function initKnowledge() {
    try {
      const json = await apiFetch('/api/admin/knowledge');
      if (json.success) {
        knowledgeData = json.data;
        // Render logic here
      }
    } catch (e) { console.error(e); }
  }

  async function loadSystemStats() {
    try {
      const json = await apiFetch('/api/admin/stats');
      if (json.success && json.data) {
        const d = json.data;
        if (document.getElementById('stat-total-users')) document.getElementById('stat-total-users').textContent = (d.totalUsers || 0).toLocaleString();
        if (document.getElementById('stat-total-biz')) document.getElementById('stat-total-biz').textContent = (d.businessCount || 0).toLocaleString();
        if (document.getElementById('stat-daily-interactions')) document.getElementById('stat-daily-interactions').textContent = (d.dailyInteractions || 0).toLocaleString();
        if (document.getElementById('stat-total-iti')) document.getElementById('stat-total-iti').textContent = (d.itineraryCount || 0).toLocaleString();
      }
    } catch (e) {}
  }

  // --- Users ---
  async function loadUsers() {
    usersTbody.innerHTML = '<tr><td colspan="6" style="text-align:center">Đang tải...</td></tr>';
    const json = await apiFetch('/api/admin/users');
    if (json.success) {
      usersData = json.data;
      renderUsers(usersData);
    }
  }

  function renderUsers(users) {
    usersTbody.innerHTML = '';
    users.forEach((u) => {
      const tr = document.createElement('tr');
      const date = new Date(u.createdAt).toLocaleDateString('vi-VN');
      const roleLabel = u.isSuperAdmin ? 'Super Admin' : (u.isAdmin ? 'Admin' : (u.isBusiness ? 'Doanh nghiệp' : 'Người dùng'));
      const canEdit = currentAdmin.isSuperAdmin || (!u.isAdmin && !u.isSuperAdmin);
      tr.innerHTML = `
        <td>
          <div style="font-weight:600; color:white">${u.displayName || u.name || 'Người dùng'}</div>
          <div style="font-size:0.75rem; color:var(--admin-text-muted)">ID: ${u._id}</div>
        </td>
        <td style="font-family:monospace; font-size:0.85rem">${u.email}</td>
        <td><span class="role-badge" data-role="${u.role}">${roleLabel}</span></td>
        <td>
          <div style="display:flex; gap:0.5rem">
            <button class="btn-detail-toggle" data-toggle-user="${u._id}">Xem chi tiết</button>
            ${canEdit ? `<button class="btn-icon" data-edit-user="${u._id}">✏️</button>` : ''}
          </div>
        </td>
      `;
      usersTbody.appendChild(tr);

      const detailTr = document.createElement('tr');
      detailTr.className = 'detail-row';
      detailTr.id = `detail-user-${u._id}`;
      detailTr.innerHTML = `
        <td colspan="4">
          <div class="detail-content">
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:2rem">
              <div>
                <p><strong>Số điện thoại:</strong> ${u.phone || 'N/A'}</p>
                <p><strong>Ngày gia nhập:</strong> ${new Date(u.createdAt).toLocaleString('vi-VN')}</p>
                <p><strong>Ghi chú:</strong> ${u.notes || '...'}</p>
              </div>
              <div style="text-align:right">
                <p><strong>Trạng thái:</strong> ${u.status || 'Active'}</p>
                <div style="margin-top:0.5rem">
                   <img src="${u.avatar || ''}" style="width:50px; height:50px; border-radius:8px; border:1px solid var(--admin-border); visibility: ${u.avatar ? 'visible' : 'hidden'}" />
                </div>
              </div>
            </div>
          </div>
        </td>
      `;
      usersTbody.appendChild(detailTr);
    });

    if (usersTbody && usersTbody.dataset.boundClick !== '1') {
      usersTbody.dataset.boundClick = '1';
      usersTbody.addEventListener('click', (e) => {
        const toggleBtn = e.target.closest('[data-toggle-user]');
        if (toggleBtn) {
          const id = toggleBtn.dataset.toggleUser;
          const d = document.getElementById(`detail-user-${id}`);
          d.classList.toggle('is-open');
          toggleBtn.textContent = d.classList.contains('is-open') ? 'Thu gọn' : 'Xem chi tiết';
          return;
        }
        const editBtn = e.target.closest('[data-edit-user]');
        if (editBtn) {
          const user = usersData.find(x => x._id === editBtn.dataset.editUser);
          if (user) openUserModal(user);
        }
      });
    }
  }

  async function loadRealtimeLogs() {
    const logsTbody = document.getElementById('logs-tbody');
    if (!logsTbody) return;
    logsTbody.innerHTML = '<tr><td colspan="4" style="text-align:center">Đang tải lịch sử...</td></tr>';
    try {
      const json = await apiFetch('/api/admin/logs');
      if (json.success) renderLogs(json.data);
    } catch (e) {}
  }

  function renderLogs(logs) {
    const logsTbody = document.getElementById('logs-tbody');
    logsTbody.innerHTML = '';
    logs.forEach(log => {
      const tr = document.createElement('tr');
      const time = new Date(log.timestamp).toLocaleString('vi-VN');
      tr.innerHTML = `
        <td style="font-size:0.8rem">${time}</td>
        <td>
          <div style="font-weight:600">${log.userName || 'Hệ thống'}</div>
          <div style="font-size:0.7rem; color:var(--admin-text-muted)">${log.userRole || ''}</div>
        </td>
        <td style="font-weight:700; color:var(--admin-primary)">${log.action}</td>
        <td><button class="btn-detail-toggle" data-toggle-log="${log._id}">Chi tiết</button></td>
      `;
      logsTbody.appendChild(tr);

      const dTr = document.createElement('tr');
      dTr.className = 'detail-row';
      dTr.id = `detail-log-${log._id}`;
      dTr.innerHTML = `
        <td colspan="4">
          <div class="detail-content">
            <strong>Mô tả:</strong> ${log.details || 'Không có mô tả'}<br>
            <strong>ID Đối tượng:</strong> ${log.targetId || 'N/A'}<br>
            <strong>ID User:</strong> ${log.userId || 'N/A'}
          </div>
        </td>
      `;
      logsTbody.appendChild(dTr);
    });

    if (logsTbody && logsTbody.dataset.boundClick !== '1') {
      logsTbody.dataset.boundClick = '1';
      logsTbody.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-toggle-log]');
        if (btn) {
          const id = btn.dataset.toggleLog;
          document.getElementById(`detail-log-${id}`).classList.toggle('is-open');
          btn.textContent = document.getElementById(`detail-log-${id}`).classList.contains('is-open') ? 'Đóng' : 'Chi tiết';
        }
      });
    }
  }

  document.getElementById('user-search').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    const filtered = usersData.filter(u =>
      (u.name && u.name.toLowerCase().includes(q)) ||
      (u.email && u.email.toLowerCase().includes(q)) ||
      (u.displayName && u.displayName.toLowerCase().includes(q))
    );
    renderUsers(filtered);
  });

  // --- User Modal ---
  const userModal = document.getElementById('modal-user-form');
  const userForm = document.getElementById('user-form');
  const btnDeleteUser = document.getElementById('btn-delete-user');
  const userFormStatus = document.getElementById('user-form-status');

  let _originalIsAdmin = false; // lưu trạng thái isAdmin ban đầu

  function openUserModal(user) {
    userForm.reset();
    userFormStatus.textContent = '';
    userFormStatus.className = '';

    userForm.elements['id'].value = user._id;
    userForm.elements['name'].value = user.name || '';
    userForm.elements['displayName'].value = user.displayName || '';
    userForm.elements['email'].value = user.email || '';
    userForm.elements['phone'].value = user.phone || '';
    userForm.elements['avatar'].value = user.avatar || '';
    userForm.elements['notes'].value = user.notes || '';
    document.getElementById('chk-is-admin').checked = !!user.isAdmin;
    _originalIsAdmin = !!user.isAdmin; // ghi nhớ trạng thái gốc

    // Chỉ Super Admin mới thấy/sửa được checkbox quyền Admin
    const adminToggleField = document.getElementById('chk-is-admin').closest('.field');
    if (adminToggleField) {
      adminToggleField.style.display = currentAdmin.isSuperAdmin ? 'flex' : 'none';
    }

    // Nút xóa user: Chỉ hiện nếu Super Admin hoặc target không phải là Admin
    btnDeleteUser.style.display = (currentAdmin.isSuperAdmin || (!user.isAdmin && !user.isSuperAdmin)) ? 'block' : 'none';

    document.getElementById('admin-modal-backdrop').hidden = false;
    userModal.hidden = false;
    // Tiny delay to allow display:flex to apply before animation starts
    requestAnimationFrame(() => {
      userModal.classList.add('is-open');
    });
  }

  userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = userForm.elements['id'].value;
    const newIsAdmin = document.getElementById('chk-is-admin').checked;
    const userName = userForm.elements['displayName'].value || userForm.elements['name'].value || 'người dùng này';

    // Xác nhận nếu quyền Admin thay đổi
    if (newIsAdmin !== _originalIsAdmin) {
      const action = newIsAdmin
        ? `Bạn có chắc muốn cấp quyền Admin cho "${userName}" không?`
        : `Bạn có chắc muốn thu hồi quyền Admin của "${userName}" không?`;
      if (!confirm(action)) return;
    }

    const body = {
      name: userForm.elements['name'].value,
      displayName: userForm.elements['displayName'].value,
      email: userForm.elements['email'].value,
      phone: userForm.elements['phone'].value,
      avatar: userForm.elements['avatar'].value,
      notes: userForm.elements['notes'].value,
      isAdmin: newIsAdmin
    };

    userFormStatus.textContent = 'Đang lưu...';
    userFormStatus.style.color = 'var(--text-muted)';

    try {
      const res = await apiFetch(`/api/admin/users/${id}`, { method: 'PUT', body: JSON.stringify(body) });
      if (res.success) {
        userFormStatus.textContent = 'Đã lưu thành công!';
        userFormStatus.style.color = '#4ade80';
        await loadUsers();
        updateStats();
        setTimeout(() => closeAllModals(), 1000);
      } else {
        userFormStatus.textContent = res.message || 'Lỗi lưu thông tin';
        userFormStatus.style.color = '#f87171';
      }
    } catch (err) {
      userFormStatus.textContent = 'Lỗi kết nối máy chủ';
      userFormStatus.style.color = '#f87171';
    }
  });

  btnDeleteUser.addEventListener('click', async () => {
    const id = userForm.elements['id'].value;
    const userName = userForm.elements['displayName'].value || userForm.elements['name'].value || 'tài khoản này';
    if (!confirm(`Bạn có chắc muốn XÓA tài khoản "${userName}" không?\nHành động này không thể hoàn tác!`)) return;

    try {
      const res = await apiFetch(`/api/admin/users/${id}`, { method: 'DELETE' });
      if (res.success) {
        alert('Đã xóa tài khoản');
        closeAllModals();
        await loadUsers();
        updateStats();
      } else {
        alert(res.message || 'Không thể xóa tài khoản');
      }
    } catch (err) {
      alert('Lỗi kết nối máy chủ');
    }
  });


  // --- Places ---
  async function loadPlaces() {
    placesTbody.innerHTML = '<tr><td colspan="6" style="text-align:center">Đang tải...</td></tr>';
    const json = await apiFetch('/api/admin/places');
    if (json.success) {
      placesData = json.data;
      renderPlaces(placesData);
    }
  }

  function renderPlaces(places) {
    placesTbody.innerHTML = '';
    if (places.length === 0) {
      placesTbody.innerHTML = '<tr><td colspan="6" style="text-align:center">Chưa có điểm đến nào</td></tr>';
      return;
    }
    places.forEach(p => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><img src="${p.image || 'https://via.placeholder.com/60'}" alt="" style="width:60px;height:40px;border-radius:4px" /></td>
        <td><strong>${p.name}</strong> ${p.top ? '<span style="color:#f59e0b">★</span>' : ''}<br><small style="color:var(--text-muted)">ID: ${p.id}</small></td>
        <td>${p.region || '—'}</td>
        <td>Mức: ${p.budget || '—'}</td>
        <td><small>${p.lat || '-'}, ${p.lng || '-'}</small></td>
        <td>
          <button class="btn btn--small btn--primary" data-edit-place="${p.id}">Sửa</button>
        </td>
      `;
      placesTbody.appendChild(tr);
    });

    document.querySelectorAll('[data-edit-place]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-edit-place');
        const place = placesData.find(x => x.id === id);
        if (place) openPlaceModal(place);
      });
    });
  }

  document.getElementById('place-search').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    const filtered = placesData.filter(p =>
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.region && p.region.toLowerCase().includes(q)) ||
      (p.tags && p.tags.join(' ').toLowerCase().includes(q))
    );
    renderPlaces(filtered);
  });

  // --- Place Modal ---
  const placeModal = document.getElementById('modal-place-form');
  const placeForm = document.getElementById('place-form');
  const btnAddPlace = document.getElementById('btn-add-place');
  const btnDeletePlace = document.getElementById('btn-delete-place');
  const placeFormStatus = document.getElementById('place-form-status');

  btnAddPlace.addEventListener('click', () => {
    openPlaceModal();
  });

  function openPlaceModal(place = null) {
    placeForm.reset();
    placeFormStatus.textContent = '';
    placeFormStatus.className = '';
    document.getElementById('place-modal-title').textContent = place ? 'Sửa Điểm Đến' : 'Thêm Mới Điểm Đến';
    btnDeletePlace.hidden = !place;

    if (place) {
      placeForm.elements['id'].value = place.id || '';
      placeForm.elements['name'].value = place.name || '';
      placeForm.elements['region'].value = place.region || '';
      placeForm.elements['image'].value = (place.image && !place.image.startsWith('/')) ? place.image : ''; 
      placeForm.elements['budget'].value = place.budget || 2;
      placeForm.elements['pace'].value = place.pace || 'vua';
      placeForm.elements['lat'].value = place.lat || '';
      placeForm.elements['lng'].value = place.lng || '';
      placeForm.elements['tags'].value = (place.tags || []).join(', ');
      placeForm.elements['meta'].value = place.meta || '';
      placeForm.elements['text'].value = place.text || '';
      placeForm.elements['sourceName'].value = place.sourceName || '';
      placeForm.elements['sourceUrl'].value = place.sourceUrl || '';
      placeForm.elements['transportTips'].value = place.transportTips || '';
      document.getElementById('chk-top').checked = !!place.top;
      document.getElementById('chk-verified').checked = !!place.verified;

      // Handle displaying images
      let imagesArr = place.images && place.images.length > 0 ? place.images : (place.image ? [place.image] : []);
      renderDropzonePreview(imagesArr.map(url => ({ url })));
    } else {
      placeForm.elements['id'].value = '';
      renderDropzonePreview([]);
    }

    document.getElementById('admin-modal-backdrop').hidden = false;
    placeModal.hidden = false;
    requestAnimationFrame(() => {
      placeModal.classList.add('is-open');
    });
  }

  placeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = placeForm.elements['id'].value;

    const formData = new FormData(placeForm);
    const tags = placeForm.elements['tags'].value.split(',').map(tag => tag.trim()).filter(tag => tag);
    formData.set('tags', tags.join(','));
    formData.set('top', document.getElementById('chk-top').checked);
    formData.set('verified', document.getElementById('chk-verified').checked);

    // Sync retained URL array to FormData
    let retainedImages = currentDropzoneFiles.filter(f => f.url && !f.file).map(f => f.url);
    formData.set('images', JSON.stringify(retainedImages));
    // Important: we remove the 'imageFile' if we've handled them through dropzone `currentDropzoneFiles`
    formData.delete('imageFile');
    currentDropzoneFiles.filter(f => f.file).forEach(f => {
      formData.append('imageFile', f.file);
    });

    const submitBtn = placeForm.querySelector('button[type="submit"]');
    if (window.WanderUI && window.WanderUI.setButtonLoading) window.WanderUI.setButtonLoading(submitBtn, true);
    placeFormStatus.textContent = 'Đang lưu...';
    placeFormStatus.style.color = 'var(--text-muted)';

    try {
      let url = '/api/admin/places';
      let method = 'POST';
      if (id) {
        url += '/' + id;
        method = 'PUT';
      }

      const res = await apiFetch(url, { 
        method: method, 
        body: formData,
        isFormData: true 
      });

      if (res.success) {
        placeFormStatus.textContent = 'Đã lưu thành công!';
        placeFormStatus.style.color = '#4ade80';
        await loadPlaces();
        updateStats();
        setTimeout(() => closeAllModals(), 1000);
      } else {
        placeFormStatus.textContent = res.message || 'Lỗi lưu thông tin';
        placeFormStatus.style.color = '#f87171';
      }
    } catch (err) {
      placeFormStatus.textContent = 'Lỗi kết nối máy chủ';
      placeFormStatus.style.color = '#f87171';
    } finally {
      const submitBtn = placeForm.querySelector('button[type="submit"]');
      if (window.WanderUI && window.WanderUI.setButtonLoading) window.WanderUI.setButtonLoading(submitBtn, false);
    }
  });

  btnDeletePlace.addEventListener('click', async () => {
    const id = placeForm.elements['id'].value;
    if (!id || !confirm('Hành động này không thể hoàn tác. Bạn có chắc muốn xóa điểm này?')) return;

    try {
      const res = await apiFetch(`/api/admin/places/${id}`, { method: 'DELETE' });
      if (res.success) {
        alert('Đã xóa thành công');
        closeAllModals();
        await loadPlaces();
        updateStats();
      } else {
        alert(res.message || 'Không thể xóa');
      }
    } catch (err) {
      alert('Lỗi kết nối máy chủ');
    }
  });

  // --- Utils ---
  function closeAllModals() {
    if (userModal) userModal.classList.remove('is-open');
    if (placeModal) placeModal.classList.remove('is-open');
    setTimeout(() => {
      if (userModal && !userModal.classList.contains('is-open')) userModal.hidden = true;
      if (placeModal && !placeModal.classList.contains('is-open')) placeModal.hidden = true;
      document.getElementById('admin-modal-backdrop').hidden = true;
    }, 350);
  }

  // --- Dropzone Logic ---
  let currentDropzoneFiles = []; // {url: string, file?: File, preview?: string}
  const placeDropzone = document.getElementById('place-dropzone');
  const placeDropzonePreview = document.getElementById('place-dropzone-preview');
  const placeImageInput = document.getElementById('place-image-input');
  
  function renderDropzonePreview(files) {
    currentDropzoneFiles = files || [];
    if (!placeDropzonePreview) return;
    placeDropzonePreview.innerHTML = '';
    currentDropzoneFiles.forEach((f, idx) => {
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'position:relative; width:80px; height:80px; border-radius:var(--radius-sm); overflow:hidden; border:1px solid var(--border);';
      const img = document.createElement('img');
      img.src = f.preview || f.url || '';
      img.style.cssText = 'width:100%; height:100%; object-fit:cover;';
      const btn = document.createElement('button');
      btn.innerHTML = '&times;';
      btn.style.cssText = 'position:absolute; top:4px; right:4px; background:rgba(0,0,0,0.5); color:#fff; border:none; border-radius:50%; width:20px; height:20px; line-height:1; cursor:pointer; font-size:12px; display:flex; align-items:center; justify-content:center;';
      btn.onclick = (e) => {
        e.preventDefault();
        currentDropzoneFiles.splice(idx, 1);
        renderDropzonePreview(currentDropzoneFiles);
      };
      wrapper.appendChild(img);
      wrapper.appendChild(btn);
      placeDropzonePreview.appendChild(wrapper);
    });
  }

  if (placeDropzone && placeImageInput) {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evName => {
      placeDropzone.addEventListener(evName, e => e.preventDefault());
      placeDropzone.addEventListener(evName, e => e.stopPropagation());
    });
    
    placeDropzone.addEventListener('dragover', () => placeDropzone.style.borderColor = 'var(--primary)');
    placeDropzone.addEventListener('dragleave', () => placeDropzone.style.borderColor = '');
    placeDropzone.addEventListener('drop', (e) => {
      placeDropzone.style.borderColor = '';
      if (e.dataTransfer && e.dataTransfer.files) handleDropzoneFiles(e.dataTransfer.files);
    });
    placeImageInput.addEventListener('change', (e) => {
      if (e.target.files) handleDropzoneFiles(e.target.files);
    });
  }

  function handleDropzoneFiles(fileList) {
    Array.from(fileList).forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`Ảnh ${file.name} vượt quá dung lượng 5MB`);
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        currentDropzoneFiles.push({ file: file, preview: e.target.result });
        renderDropzonePreview(currentDropzoneFiles);
      };
      reader.readAsDataURL(file);
    });
    if (placeImageInput) placeImageInput.value = '';
  }


  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });
  document.getElementById('admin-modal-backdrop').addEventListener('click', closeAllModals);

  // --- Feedbacks ---
  async function loadFeedbacks() {
    const fnTable = document.getElementById('feedbacks-tbody');
    if (!fnTable) return;
    
    fnTable.innerHTML = '<tr><td colspan="5" style="text-align:center">Đang tải...</td></tr>';
    try {
      const json = await apiFetch('/api/admin/feedbacks');
      if (json.success) {
        feedbacksData = json.data;
        renderFeedbacks(feedbacksData);
      }
    } catch (err) {
      fnTable.innerHTML = '<tr><td colspan="5" style="text-align:center;color:red">Lỗi tải dữ liệu</td></tr>';
    }
  }

  function renderFeedbacks(feedbacks) {
    const fnTable = document.getElementById('feedbacks-tbody');
    if (!fnTable) return;

    fnTable.innerHTML = '';
    if (feedbacks.length === 0) {
      fnTable.innerHTML = '<tr><td colspan="5" style="text-align:center">Chưa có phản hồi nào</td></tr>';
      return;
    }

    feedbacks.forEach(fb => {
      const tr = document.createElement('tr');
      const date = new Date(fb.createdAt);
      const timeStr = `${date.toLocaleDateString('vi-VN')} ${date.toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}`;
      
      tr.innerHTML = `
        <td><small style="color:var(--text-muted)">${timeStr}</small></td>
        <td><strong>${fb.name}</strong></td>
        <td><a href="mailto:${fb.email}" style="color:var(--text-muted); text-decoration:underline;">${fb.email}</a></td>
        <td style="white-space:normal; line-height:1.4">${(fb.message || '').replace(/\n/g, '<br>')}</td>
        <td>
          <button class="btn btn--ghost btn--small delete-fb-btn" data-id="${fb._id}" style="color:#f87171;border-color:rgba(248,113,113,0.4)">Xóa</button>
        </td>
      `;
      fnTable.appendChild(tr);
    });

    document.querySelectorAll('.delete-fb-btn').forEach(btn => {
      btn.addEventListener('click', async function() {
        const id = this.getAttribute('data-id');
        if (confirm('Bạn có chắc chắn muốn xóa phản hồi này vĩnh viễn không?')) {
          try {
            const res = await apiFetch('/api/admin/feedbacks/' + id, { method: 'DELETE' });
            if (res.success) {
              await loadFeedbacks();
              updateStats();
            } else {
              alert('Lỗi: ' + res.message);
            }
          } catch (e) {
            alert('Lỗi kết nối máy chủ');
          }
        }
      });
    });
  }

  const fbSearchInput = document.getElementById('feedback-search');
  if (fbSearchInput) {
    fbSearchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const filtered = feedbacksData.filter(fb => {
        const text = ((fb.name || '') + ' ' + (fb.email || '') + ' ' + (fb.message || '')).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return text.includes(q);
      });
      renderFeedbacks(filtered);
    });
  }

  // --- Itineraries ---
  async function loadItineraries() {
    const tbody = document.getElementById('itineraries-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center">Đang tải...</td></tr>';
    try {
      const json = await apiFetch('/api/admin/itineraries');
      if (json.success) {
        itinerariesData = json.data;
        renderItineraries(itinerariesData);
      }
    } catch (err) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:red">Lỗi tải dữ liệu</td></tr>';
    }
  }

  function renderItineraries(itineraries) {
    const tbody = document.getElementById('itineraries-tbody');
    if (!tbody) return;

    tbody.innerHTML = '';
    if (itineraries.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center">Chưa có lịch trình AI nào được tạo</td></tr>';
      return;
    }

    itineraries.forEach(it => {
      const tr = document.createElement('tr');
      const date = new Date(it.createdAt);
      const timeStr = `${date.toLocaleDateString('vi-VN')} ${date.toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}`;
      
      tr.innerHTML = `
        <td><small style="color:var(--text-muted)">${timeStr}</small></td>
        <td><strong>${it.destination}</strong></td>
        <td>${it.days} Ngày</td>
        <td>${it.budget || '—'}</td>
        <td style="display:flex; gap: 0.5rem">
          <button class="btn btn--ghost btn--small view-itin-btn" title="Xem JSON" data-id="${it._id}" style="border-color:var(--color-primary); color:var(--color-primary)">Xem</button>
          <button class="btn btn--ghost btn--small delete-itin-btn" data-id="${it._id}" style="color:#f87171;border-color:rgba(248,113,113,0.4)">Xóa</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    document.querySelectorAll('.delete-itin-btn').forEach(btn => {
      btn.addEventListener('click', async function() {
        const id = this.getAttribute('data-id');
        if (confirm('Bạn có chắc chắn muốn xóa lịch trình này khỏi hệ thống không?')) {
          try {
            const res = await apiFetch('/api/admin/itineraries/' + id, { method: 'DELETE' });
            if (res.success) {
              await loadItineraries();
              updateStats();
            } else {
              alert('Lỗi: ' + res.message);
            }
          } catch (e) {
            alert('Lỗi kết nối máy chủ');
          }
        }
      });
    });

    document.querySelectorAll('.view-itin-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        const it = itinerariesData.find(x => x._id === id);
        if (it) {
           alert("JSON Data:\\n" + JSON.stringify(it.planJson, null, 2));
           // In future we can render it in a proper modal, for now alert is fast
        }
      });
    });
  }

  const itinSearchInput = document.getElementById('itinerary-search');
  if (itinSearchInput) {
    itinSearchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const filtered = itinerariesData.filter(it => {
        const text = ((it.destination || '') + ' ' + (it.budget || '')).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return text.includes(q);
      });
      renderItineraries(filtered);
    });
  }

  // --- Logs (Real Data) ---
  const logsTbody = document.getElementById('logs-tbody');
  const miniLogsContainer = document.getElementById('admin-mini-logs');
  let logsData = [];

  async function loadLogs(filter = 'all') {
    try {
      const json = await apiFetch('/api/admin/logs');
      if (json.success) {
        logsData = json.data;
      }
    } catch (err) {
      console.warn('Failed to load real logs:', err);
    }
    // 1. Fill main table if present
    if(logsTbody) {
      logsTbody.innerHTML = '';
      const filtered = filter === 'all' ? logsData : logsData.filter(l => l.role === filter);
      if(filtered.length === 0) {
        logsTbody.innerHTML = '<tr><td colspan="4" style="text-align:center">Không có lịch sử</td></tr>';
      } else {
        filtered.forEach(l => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td><small style="color:var(--text-muted)">${new Date(l.timestamp).toLocaleTimeString('vi-VN')} - ${new Date(l.timestamp).toLocaleDateString('vi-VN')}</small></td>
            <td><strong>${l.userName || 'System'}</strong></td>
            <td><span style="color:var(--admin-accent)">${l.action}</span></td>
            <td><span class="dest-pill" style="font-size:0.7rem">${l.userRole || 'Visitor'}</span></td>
          `;
          logsTbody.appendChild(tr);
        });
      }
    }

    // 2. Fill mini logs in Overview
    if (miniLogsContainer) {
      miniLogsContainer.innerHTML = '';
      logsData.slice(0, 5).forEach(l => {
        const item = document.createElement('div');
        item.className = 'log-item-minimal';
        const ago = Math.floor((Date.now() - new Date(l.timestamp)) / 60000);
        const timeStr = ago < 1 ? 'Vừa xong' : (ago < 60 ? `${ago} phút trước` : `${Math.floor(ago/60)} giờ trước`);
        
        // Dynamic icon based on action
        let icon = '📝';
        if (l.action.includes('CREATED')) icon = '✨';
        if (l.action.includes('UPDATED')) icon = '🔄';
        if (l.action.includes('LOGIN')) icon = '🔑';

        item.innerHTML = `
          <div class="log-icon-min">${icon}</div>
          <div class="log-text-min"><strong>${(l.userName || 'Admin').split('@')[0]}</strong> ${l.details || l.action}</div>
          <div class="log-time-min">${timeStr}</div>
        `;
        miniLogsContainer.appendChild(item);
      });
    }
  }


  document.querySelectorAll('[data-log-filter]').forEach(btn => {
    btn.addEventListener('click', function() {
      loadLogs(this.getAttribute('data-log-filter'));
    });
  });

  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const savedTheme = localStorage.getItem('admin_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const nextTheme = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('admin_theme', nextTheme);
    });
  }

  // --- Moderation ---
  let moderationData = [];
  async function loadModeration() {
    const tbody = document.getElementById('moderation-tbody');
    if (!tbody) return;
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center">Đang tải hàng chờ...</td></tr>';
    
    try {
      const json = await apiFetch('/api/admin/places'); // Admin sees all, filter for partner/pending
      if (json.success) {
        moderationData = json.data.filter(p => p.source === 'partner' || p.status === 'pending');
        renderModeration(moderationData);
        
        // Update badge count
        const pendingCount = moderationData.filter(p => p.status === 'pending').length;
        const badge = document.getElementById('badge-pending-count');
        if (badge) {
          badge.textContent = pendingCount;
          badge.hidden = pendingCount === 0;
        }
      }
    } catch (err) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#f87171">Lỗi tải dữ liệu</td></tr>';
    }
  }

  function renderModeration(data) {
    const tbody = document.getElementById('moderation-tbody');
    tbody.innerHTML = '';
    if (data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--text-muted)">Hàng chờ trống. Chưa có yêu cầu duyệt nào.</td></tr>';
      return;
    }

    data.forEach(p => {
      const tr = document.createElement('tr');
      const statusClass = p.status === 'approved' ? 'stat-pill--ok' : (p.status === 'pending' ? 'stat-pill--warn' : 'stat-pill--err');
      const statusText = p.status === 'approved' ? 'Đã duyệt' : (p.status === 'pending' ? 'Chờ duyệt' : 'Bị từ chối');
      
      tr.innerHTML = `
        <td>
          <div style="display:flex; gap:0.75rem; align-items:center">
            <img src="${p.image || 'https://via.placeholder.com/60'}" style="width:50px; height:35px; border-radius:4px" />
            <div>
              <div style="font-weight:600">${p.name}</div>
              <div style="font-size:0.75rem; color:var(--text-muted)">${p.region}</div>
            </div>
          </div>
        </td>
        <td><small>${p.ownerId || 'System'}</small></td>
        <td>${new Date(p.createdAt).toLocaleDateString('vi-VN')}</td>
        <td><span class="stat-pill ${statusClass}">${statusText}</span></td>
        <td>
          <div style="display:flex; gap:0.5rem">
            ${p.status === 'pending' ? `
              <button class="btn btn--small btn--primary" data-mod-approve="${p.id}">Duyệt</button>
              <button class="btn btn--small btn--outline btn--danger" data-mod-reject="${p.id}">Từ chối</button>
            ` : `
              <button class="btn btn--small btn--ghost" data-edit-place="${p.id}">Xem lại</button>
            `}
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Event listeners
    tbody.querySelectorAll('[data-mod-approve]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-mod-approve');
        if (!confirm('Xác nhận phê duyệt nội dung này hiển thị lên hệ thống?')) return;
        await moderatePlace(id, 'approved');
      });
    });

    tbody.querySelectorAll('[data-mod-reject]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-mod-reject');
        const reason = prompt('Lý do từ chối:');
        if (reason === null) return;
        await moderatePlace(id, 'rejected', reason);
      });
    });
  }

  async function moderatePlace(id, status, reason = '') {
    try {
      const res = await apiFetch(`/api/admin/places/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status, rejectionReason: reason })
      });
      if (res.success) {
        if (window.WanderUI) window.WanderUI.showToast(`Đã ${status === 'approved' ? 'phê duyệt' : 'từ chối'} thành công`, 'success');
        await loadModeration();
        await loadPlaces();
        updateStats();
      }
    } catch (err) {
      console.error('Moderation error:', err);
      alert('Lỗi cập nhật trạng thái: ' + (err.message || 'Lỗi không xác định'));
    }
  }

  // (loadLogs is defined above at line ~927 - do not duplicate)

  // Polling for updates
  setInterval(() => {
    updateStats();
    loadRealtimeLogs();
  }, 30000);

  function setupBroadcastForm() {
    const form = document.getElementById('broadcast-form');
    if (form && form.dataset.initialized === 'true') return;
    const status = document.getElementById('broadcast-status') || document.createElement('p');
    if (!form) return;
    form.dataset.initialized = 'true';
    
    if (!document.getElementById('broadcast-status')) {
      status.id = 'broadcast-status';
      status.style.fontSize = '0.85rem';
      status.style.marginTop = '1rem';
      form.appendChild(status);
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const body = {
        title: fd.get('title'),
        message: fd.get('message'),
        recipientType: fd.get('recipientType'), // Match the select name in terminal UI
        type: fd.get('type')
      };

      const btn = document.getElementById('btn-send-broadcast');
      if (window.WanderUI) window.WanderUI.setButtonLoading(btn, true);
      status.textContent = '>> EXECUTING_PUSH...';
      status.style.color = '#94a3b8';

      try {
        const res = await apiFetch('/api/notifications/broadcast', {
          method: 'POST',
          body: JSON.stringify(body)
        });
        if (res.success) {
          status.textContent = '>> SUCCESS: Broadcast delivered to network.';
          status.style.color = '#4ade80';
          form.reset();
          setTimeout(() => { status.textContent = ''; }, 3000);
          loadRealtimeLogs();
        } else {
          status.textContent = '>> ERROR: ' + (res.message || 'Transmission failed');
          status.style.color = '#f87171';
        }
      } catch (err) {
        status.textContent = '>> FATAL: Connection lost';
        status.style.color = '#f87171';
      } finally {
        if (window.WanderUI) window.WanderUI.setButtonLoading(btn, false);
      }
    });
  }

  function setupAdminCreationForm() {
    const form = document.getElementById('admin-create-form');
    const status = document.getElementById('admin-create-status');
    const submitBtn = document.getElementById('btn-create-admin');
    if (!form || !status || !submitBtn) return;
    if (form.dataset.initialized === '1') return;
    form.dataset.initialized = '1';

    if (currentAdmin.role !== 'superadmin') {
      form.style.opacity = '0.55';
      form.querySelectorAll('input,button').forEach(el => el.disabled = true);
      status.textContent = 'Bạn không có quyền tạo admin mới.';
      return;
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const body = {
        name: String(fd.get('name') || '').trim(),
        email: String(fd.get('email') || '').trim().toLowerCase(),
        password: String(fd.get('password') || '')
      };
      if (!body.name || !body.email || !body.password) return;
      if (window.WanderUI) window.WanderUI.setButtonLoading(submitBtn, true);
      status.textContent = 'Đang tạo tài khoản admin...';
      try {
        const json = await apiFetch('/api/auth/admin/create', {
          method: 'POST',
          body: JSON.stringify(body)
        });
        if (json.success) {
          status.style.color = '#4ade80';
          status.textContent = `Đã tạo admin mới: ${body.email}`;
          form.reset();
          if (window.WanderUI) window.WanderUI.showToast('Tạo admin thành công', 'success');
        } else {
          status.style.color = '#f87171';
          status.textContent = json.message || 'Không thể tạo admin';
        }
      } catch (err) {
        status.style.color = '#f87171';
        status.textContent = err.message || 'Lỗi tạo tài khoản admin';
      } finally {
        if (window.WanderUI) window.WanderUI.setButtonLoading(submitBtn, false);
      }
    });
  }

  function updateStats() {
    return loadSystemStats();
  }

  // --- Theme Customizer ---
  function initThemeCustomizer() {
    const STORAGE_KEY = 'admin_bg_preset';
    const presets = {
      default: 'radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.05) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.05) 0%, transparent 50%), var(--admin-bg)',
      midnight: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
      forest: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)',
      slate: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      purple: 'linear-gradient(135deg, #2e1065 0%, #0f172a 100%)'
    };

    const applyPreset = (name) => {
      const gradient = presets[name];
      let styleTag = document.getElementById('admin-bg-override');
      if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = 'admin-bg-override';
        document.head.appendChild(styleTag);
      }
      styleTag.textContent = `
        .admin-body::before { background: ${gradient} !important; }
        .admin-body { background: ${gradient.includes('var') ? 'var(--admin-bg)' : gradient.split(',').pop().trim()} !important; }
      `;
      localStorage.setItem(STORAGE_KEY, name);
      document.querySelectorAll('.bg-preset-btn').forEach(btn => {
        btn.classList.toggle('is-active', btn.dataset.preset === name);
        btn.style.boxShadow = btn.dataset.preset === name ? '0 0 15px var(--admin-primary)' : 'none';
      });
    };

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && presets[saved]) applyPreset(saved);

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.bg-preset-btn');
      if (btn) applyPreset(btn.dataset.preset);
    });
  }

  // --- KNOWLEDGE MANAGEMENT ---
  async function initKnowledge() {
    const tbody = document.getElementById('knowledge-tbody');
    if (!tbody) return;

    try {
      const res = await fetch('/api/knowledge', {
        headers: { 'x-auth-token': token }
      });
      const json = await res.json();
      if (json.success) {
        knowledgeData = json.data;
        renderKnowledgeTable();
      }
    } catch (err) {
      console.error(err);
      tbody.innerHTML = '<tr><td colspan="4">Lỗi tải dữ liệu AI.</td></tr>';
    }
  }

  function renderKnowledgeTable() {
    const tbody = document.getElementById('knowledge-tbody');
    if (!tbody) return;

    if (knowledgeData.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;padding:2rem">Chưa có dữ liệu tri thức. Hãy nạp dữ liệu mẫu hoặc thêm mới!</td></tr>';
      return;
    }

    tbody.innerHTML = knowledgeData.map(item => `
      <tr>
        <td style="font-weight:500">${item.question}</td>
        <td style="max-width:300px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${item.answer}">${item.answer}</td>
        <td>${(item.tags || []).join(', ')}</td>
        <td>
          <button class="btn btn--danger btn--small" onclick="deleteKnowledge('${item._id}')">Xóa</button>
        </td>
      </tr>
    `).join('');
  }

  window.deleteKnowledge = async function(id) {
    if (!confirm('Bạn có chắc muốn xóa kiến thức này không?')) return;
    try {
      const res = await fetch(`/api/knowledge/${id}`, {
        method: 'DELETE',
        headers: { 'x-auth-token': token }
      });
      const json = await res.json();
      if (json.success) {
        knowledgeData = knowledgeData.filter(i => i._id !== id);
        renderKnowledgeTable();
      }
    } catch (e) { alert('Lỗi xóa dữ liệu'); }
  };

  document.getElementById('btn-seed-knowledge')?.addEventListener('click', async () => {
    if (!confirm('Hành động này sẽ nạp hàng loạt dữ liệu du lịch mẫu vào AI. Bạn có muốn tiếp tục?')) return;
    const btn = document.getElementById('btn-seed-knowledge');
    btn.disabled = true;
    btn.innerText = '♻️ Đang nạp...';
    try {
      const res = await fetch('/api/knowledge/seed', {
        method: 'POST',
        headers: { 'x-auth-token': token }
      });
      const json = await res.json();
      if (json.success) {
        alert('Nạp dữ liệu thành công!');
        initKnowledge();
      }
    } catch (e) { alert('Lỗi nạp dữ liệu'); }
    btn.disabled = false;
    btn.innerText = '♻️ Nạp dữ liệu mẫu';
  });

  document.getElementById('btn-add-knowledge')?.addEventListener('click', async () => {
    const q = prompt('Nhập câu hỏi hoặc từ khóa:');
    if (!q) return;
    const a = prompt('Nhập câu trả lời AI:');
    if (!a) return;
    const t = prompt('Nhập tags (cách nhau bởi dấu phẩy):', q.toLowerCase());
    
    try {
      const res = await fetch('/api/knowledge', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-auth-token': token 
        },
        body: JSON.stringify({ question: q, answer: a, tags: t.split(',').map(s => s.trim()) })
      });
      const json = await res.json();
      if (json.success) {
        knowledgeData.unshift(json.data);
        renderKnowledgeTable();
      }
    } catch (e) { alert('Lỗi thêm dữ liệu'); }
  });

})();


