const express = require('express');
const router = express.Router();
const User = require('../models/User');
const BusinessAccount = require('../models/BusinessAccount');
const Place = require('../models/Place');
const Feedback = require('../models/Feedback');
const { adminTokenAuth } = require('./auth');
const upload = require('../middlewares/upload');
const SystemLog = require('../models/SystemLog');
const logAction = require('../utils/logger');
const Itinerary = require('../models/Itinerary');

// ─────────────────────────────────────────────
//  MIDDLEWARES PHÂN QUYỀN
// ─────────────────────────────────────────────

// adminAuth: Cho qua bất kỳ ai có isAdmin (bao gồm cả Super Admin)
const adminAuth = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'superadmin')) {
    req.adminUser = req.user; // For backwards compatibility in this file
    next();
  } else {
    res.status(403).json({ success: false, message: 'Từ chối quyền truy cập. Cần quyền quản trị viên.' });
  }
};

// superAdminAuth: Chỉ cho qua Super Admin
const superAdminAuth = (req, res, next) => {
  if (req.user && req.user.role === 'superadmin') {
    req.adminUser = req.user; // For backwards compatibility
    next();
  } else {
    res.status(403).json({ success: false, message: 'Chỉ Super Admin mới có quyền thực hiện thao tác này.' });
  }
};

// ─────────────────────────────────────────────
//  API: Lấy thông tin cấp quyền của admin hiện tại
// ─────────────────────────────────────────────
router.get('/me/role', adminTokenAuth, adminAuth, async (req, res) => {
  res.json({
    success: true,
    isSuperAdmin: req.user.role === 'superadmin',
    isAdmin: ['admin', 'superadmin'].includes(req.user.role)
  });
});

// ─────────────────────────────────────────────
//  API: Lấy thống kê tổng quan (Real Data)
// ─────────────────────────────────────────────
router.get('/stats', adminTokenAuth, adminAuth, async (req, res) => {
  try {
    const [userCount, bizCount, adminCount, placeCount, feedbackCount, itineraryCount] = await Promise.all([
      User.countDocuments({ role: 'user' }),
      BusinessAccount.countDocuments(),
      User.countDocuments({ role: { $in: ['admin', 'superadmin'] } }),
      Place.countDocuments(),
      Feedback.countDocuments(),
      Itinerary.countDocuments()
    ]);

    res.json({
      success: true,
      data: {
        totalUsers: userCount + bizCount + adminCount,
        businessCount: bizCount,
        adminCount: adminCount,
        placeCount: placeCount,
        feedbackCount: feedbackCount,
        itineraryCount: itineraryCount,
        // Simulation of engagement based on real data
        dailyInteractions: Math.floor((userCount * 2.5) + (itineraryCount * 5))
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─────────────────────────────────────────────
//  API: Lấy lịch sử hoạt động hệ thống
// ─────────────────────────────────────────────
router.get('/logs', adminTokenAuth, adminAuth, async (req, res) => {
  try {
    const logs = await SystemLog.find().sort({ timestamp: -1 }).limit(100);
    res.json({ success: true, data: logs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Lỗi tải log' });
  }
});

// Lấy danh sách tất cả người dùng + doanh nghiệp (cả hai cấp đều xem được)
router.get('/users', adminTokenAuth, adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password').lean();
    const normalizedUsers = users.map((u) => ({
      ...u,
      isSuperAdmin: u.role === 'superadmin',
      isAdmin: u.role === 'admin' || u.role === 'superadmin',
      isBusiness: u.role === 'business'
    }));

    // Gộp thêm tài khoản doanh nghiệp từ BusinessAccount collection
    const bizAccounts = await BusinessAccount.find().select('-password').lean();
    const normalizedBiz = bizAccounts.map((b) => ({
      ...b,
      role: 'business',
      isSuperAdmin: false,
      isAdmin: false,
      isBusiness: true,
      _source: 'BusinessAccount' // Đánh dấu nguồn để phân biệt
    }));

    const allUsers = [...normalizedUsers, ...normalizedBiz];
    res.json({ success: true, data: allUsers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Chỉnh sửa thông tin người dùng
router.put('/users/:id', adminTokenAuth, adminAuth, async (req, res) => {
  try {
    const executor = req.adminUser; // Admin đang thực hiện
    const target = await User.findById(req.params.id);
    if (!target) return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });

    // ── Bảo vệ Super Admin: không ai được tác động vào Super Admin (kể cả Super Admin khác)
    if (target.role === 'superadmin' && target._id.toString() !== executor.id) {
      return res.status(403).json({ success: false, message: 'Tài khoản Super Admin được bảo vệ. Không thể chỉnh sửa.' });
    }

    // ── Sub-Admin bị giới hạn
    if (executor.role !== 'superadmin') {
      // Sub-Admin không thể tác động vào admin khác (kể cả Sub-Admin ngang cấp)
      if (target.role === 'admin' || target.role === 'superadmin') {
        return res.status(403).json({ success: false, message: 'Bạn không có quyền chỉnh sửa tài khoản Quản trị viên.' });
      }
      // Sub-Admin không được thay đổi quyền admin
      if (req.body.role === 'admin' || req.body.role === 'superadmin') {
        return res.status(403).json({ success: false, message: 'Chỉ Super Admin mới có thể thay đổi quyền quản trị.' });
      }
    }

    const { name, displayName, email, phone, avatar, isAdmin, isSuperAdmin, notes } = req.body;

    if (name !== undefined) target.name = name;
    if (displayName !== undefined) target.displayName = displayName;
    if (email !== undefined) target.email = email.toLowerCase();
    if (phone !== undefined) target.phone = phone;
    if (avatar !== undefined) target.avatar = avatar;
    if (notes !== undefined) target.notes = notes;

    // Chỉ Super Admin mới được thay đổi các field quyền
    if (executor.role === 'superadmin') {
      if (isSuperAdmin === true) {
        target.role = 'superadmin';
      } else if (isAdmin !== undefined) {
        target.role = isAdmin ? 'admin' : (target.role === 'business' ? 'business' : 'user');
      }
    }

    await target.save();
    const result = target.toObject();
    delete result.password;
    
    await logAction('USER_UPDATED', `Cập nhật thông tin người dùng ${target.email}`, req);
    
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Xóa tài khoản người dùng
router.delete('/users/:id', adminTokenAuth, adminAuth, async (req, res) => {
  try {
    const executor = req.adminUser;

    // Không được tự xóa chính mình
    if (req.params.id === executor.id.toString()) {
      return res.status(400).json({ success: false, message: 'Không thể tự xóa tài khoản của chính mình' });
    }

    const target = await User.findById(req.params.id);
    if (!target) return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });

    // Super Admin không thể bị xóa bởi bất kỳ ai
    if (target.role === 'superadmin') {
      return res.status(403).json({ success: false, message: 'Tài khoản Super Admin được bảo vệ. Không thể xóa.' });
    }

    // Sub-Admin không thể xóa admin khác (kể cả Sub-Admin ngang cấp)
    if (executor.role !== 'superadmin' && ['admin', 'superadmin'].includes(target.role)) {
      return res.status(403).json({ success: false, message: 'Bạn không có quyền xóa tài khoản Quản trị viên.' });
    }

    await User.findByIdAndDelete(req.params.id);
    await logAction('USER_DELETED', `Xóa người dùng ${target.email}`, req);
    res.json({ success: true, message: 'Đã xóa tài khoản thành công' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Cập nhật quyền nhanh (bật/tắt admin) — CHỈ Super Admin
router.put('/users/:id/role', adminTokenAuth, superAdminAuth, async (req, res) => {
  try {
    const { isAdmin } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
    if (user.role === 'superadmin') {
      return res.status(403).json({ success: false, message: 'Tài khoản Super Admin được bảo vệ.' });
    }
    user.role = isAdmin ? 'admin' : (user.role === 'business' ? 'business' : 'user');
    await user.save();
    await logAction('ROLE_UPDATED', `Cập nhật quyền của ${user.email} -> isAdmin: ${isAdmin}`, req);
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─────────────────────────────────────────────
//  QUẢN LÝ ĐIỂM ĐẾN (PLACES) — CHỈ SUPER ADMIN
// ─────────────────────────────────────────────

// Lấy danh sách điểm đến
router.get('/places', adminTokenAuth, superAdminAuth, async (req, res) => {
  try {
    const places = await Place.find();
    res.json({ success: true, data: places });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Thêm điểm đến mới
router.post('/places', adminTokenAuth, superAdminAuth, upload.array('imageFile', 10), async (req, res) => {
  try {
    let imagesArr = [];
    
    // 1. Files uploaded
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        imagesArr.push('/uploads/' + file.filename);
      });
    }
    
    // 2. URLs passed as text
    if (req.body.image) {
      imagesArr.push(req.body.image);
    }
    if (req.body.images) {
      let parsedImages = req.body.images;
      if (typeof parsedImages === 'string') {
        try { parsedImages = JSON.parse(parsedImages); } catch (e) { parsedImages = [parsedImages]; }
      }
      if (Array.isArray(parsedImages)) {
        imagesArr = imagesArr.concat(parsedImages);
      }
    }
    
    // Dedup images
    imagesArr = [...new Set(imagesArr)];

    const place = new Place({
      ...req.body,
      image: imagesArr[0] || '', // Fallback for backwards compatibility
      images: imagesArr,
      tags: typeof req.body.tags === 'string' ? req.body.tags.split(',').map(t => t.trim()) : req.body.tags,
      top: req.body.top === 'true',
      verified: req.body.verified === 'true'
    });
    if (!place.id) {
      place.id = 'p-' + Date.now();
    }
    await place.save();
    await logAction('PLACE_CREATED', `Tạo điểm đến: ${place.name}`, req);
    res.json({ success: true, data: place });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Chỉnh sửa điểm đến (Cho phép cả Admin thường duyệt/sửa)
router.put('/places/:id', adminTokenAuth, adminAuth, upload.array('imageFile', 10), async (req, res) => {
  try {
    const place = await Place.findOne({ id: req.params.id });
    if (!place) return res.status(404).json({ success: false, message: 'Không tìm thấy thông tin' });

    let imagesArr = place.images && place.images.length > 0 ? [...place.images] : (place.image ? [place.image] : []);

    // Handling new file uploads
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        imagesArr.push('/uploads/' + file.filename);
      });
    } 
    
    // If the frontend sends an explicit list of images to retain (for sorting/deleting)
    // they usually send it via req.body.images
    if (req.body.images !== undefined) {
      let parsedImages = req.body.images;
      if (typeof parsedImages === 'string') {
        try { parsedImages = JSON.parse(parsedImages); } catch (e) { parsedImages = [parsedImages]; }
      }
      if (Array.isArray(parsedImages)) {
        // Assume this is the new absolute state of images array + new files
        imagesArr = parsedImages;
        if (req.files && req.files.length > 0) {
           req.files.forEach(file => imagesArr.push('/uploads/' + file.filename));
        }
      }
    } else if (req.body.image !== undefined && !req.files) {
      // Legacy support for single image update
      imagesArr = [req.body.image];
    }
    
    // Dedup images
    imagesArr = [...new Set(imagesArr.filter(i => Boolean(i)))];

    const updates = {
      ...req.body,
      image: imagesArr[0] || '',
      images: imagesArr,
      tags: typeof req.body.tags === 'string' ? req.body.tags.split(',').map(t => t.trim()) : req.body.tags
    };
    if (req.body.top !== undefined) updates.top = req.body.top === 'true';
    if (req.body.verified !== undefined) updates.verified = req.body.verified === 'true';

    Object.assign(place, updates);
    await place.save();
    await logAction('PLACE_UPDATED', `Cập nhật điểm đến: ${place.name}`, req);
    res.json({ success: true, data: place });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Xóa điểm đến
router.delete('/places/:id', adminTokenAuth, superAdminAuth, async (req, res) => {
  try {
    const place = await Place.findOneAndDelete({ id: req.params.id });
    if (!place) return res.status(404).json({ success: false, message: 'Không tìm thấy thông tin' });
    await logAction('PLACE_DELETED', `Xóa điểm đến: ${place.name}`, req);
    res.json({ success: true, message: 'Đã xóa thành công' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─────────────────────────────────────────────
//  QUẢN LÝ PHẢN HỒI — Cả hai cấp
// ─────────────────────────────────────────────

// Lấy danh sách phản hồi
router.get('/feedbacks', adminTokenAuth, adminAuth, async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json({ success: true, data: feedbacks });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Xóa phản hồi
router.delete('/feedbacks/:id', adminTokenAuth, adminAuth, async (req, res) => {
  try {
    const fb = await Feedback.findByIdAndDelete(req.params.id);
    if (!fb) return res.status(404).json({ success: false, message: 'Không tìm thấy phản hồi' });
    await logAction('FEEDBACK_DELETED', `Xóa phản hồi từ ${fb.email}`, req);
    res.json({ success: true, message: 'Đã xóa phản hồi' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─────────────────────────────────────────────
//  QUẢN LÝ LỊCH TRÌNH AI — Cả hai cấp
// ─────────────────────────────────────────────

// Lấy danh sách lịch trình AI
router.get('/itineraries', adminTokenAuth, adminAuth, async (req, res) => {
  try {
    const itineraries = await Itinerary.find().sort({ createdAt: -1 });
    res.json({ success: true, data: itineraries });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Xóa lịch trình
router.delete('/itineraries/:id', adminTokenAuth, adminAuth, async (req, res) => {
  try {
    const it = await Itinerary.findByIdAndDelete(req.params.id);
    if (!it) return res.status(404).json({ success: false, message: 'Không tìm thấy lịch trình' });
    await logAction('ITINERARY_DELETED', `Xóa lịch trình ID: ${it._id}`, req);
    res.json({ success: true, message: 'Đã xóa lịch trình' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─────────────────────────────────────────────
//  SYSTEM LOGS — Super Admin only
// ─────────────────────────────────────────────
router.get('/logs', adminTokenAuth, adminAuth, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const logs = await SystemLog.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    res.json({ success: true, data: logs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Xóa log
router.delete('/logs/:id', adminTokenAuth, superAdminAuth, async (req, res) => {
  try {
    await SystemLog.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Đã xóa log' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Phê duyệt tài khoản doanh nghiệp
router.put('/users/:id/approve', adminTokenAuth, adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
    
    if (user.role !== 'business') {
      return res.status(400).json({ success: false, message: 'Tài khoản không phải là đối tác doanh nghiệp.' });
    }
    
    user.status = 'active';
    await user.save();
    
    await logAction('BUSINESS_APPROVED', `Phê duyệt đối tác: ${user.email}`, req);
    
    res.json({ success: true, message: 'Đã phê duyệt đối tác thành công.', data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
