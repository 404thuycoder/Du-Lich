const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./auth');
const User = require('../models/User');
const Knowledge = require('../models/Knowledge');
const Conversation = require('../models/Conversation');
const chatbotDb = require('../models/dbChatbot');
const fs = require('fs');
const path = require('path');

// Khởi tạo Groq (Bộ não AI siêu tốc)
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Middleware xác thực tùy chọn
const optionalAuth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded.user;
    } catch (e) { }
  }
  next();
};

router.post('/', optionalAuth, async (req, res) => {
  try {
    const { message, coords, itinerary, activeTrip, deviceId, role } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, answer: 'Vui lòng nhập câu hỏi.' });
    }

    // Định danh người dùng/phiên
    const sessionKey = req.user ? req.user.id : (deviceId || 'anonymous_guest');

    // --- QUICK RESPONSE ---
    const lowerMsg = message.toLowerCase().trim().replace(/[?.,!]$/, "");
    const quickGreetings = ['alo', 'chào', 'hi', 'hello', 'ơi', 'ê', 'hey', 'ê hả'];
    if (quickGreetings.includes(lowerMsg)) {
      return res.json({
        success: true,
        answer: "Chào bạn! Mình là Trợ lý du lịch WanderViệt đây. Bạn cần mình tư vấn địa điểm nào hay có thắc mắc gì về chuyến đi không?",
        source: 'quick-response'
      });
    }

    // 1. Phân tích Lịch sử hội thoại từ SERVER (Trí nhớ máy chủ)
    let chatHistory = [];
    if (chatbotDb.readyState === 1) {
      try {
        const recentLogs = await Conversation.find({ userId: sessionKey })
          .sort({ timestamp: -1 })
          .limit(8); // Lấy 8 câu gần nhất cho Groq (vì nó xử lý rất nhanh context lớn)

        if (recentLogs.length > 0) {
          // Format cho Groq messages array
          chatHistory = recentLogs.reverse().map(log => ({
            role: log.role === 'user' ? 'user' : 'assistant',
            content: log.text
          }));
        }
      } catch (err) {
        console.warn("⚠️ Lỗi truy xuất lịch sử:", err.message);
      }
    }

    // 2. Xử lý ngữ cảnh hành trình & vị trí
    let tripContext = "Khách đang khám phá tự do.";
    if (itinerary && itinerary.length > 0) {
      const stops = itinerary.map(s => s.name || s).join(' -> ');
      tripContext = `Khách đang đi theo chuyến: "${activeTrip || 'Hành trình thông minh'}". Lộ trình dự kiến: ${stops}.`;
    }

    let locationContext = "Chưa xác định rõ vị trí GPS.";
    if (coords && coords.lat && coords.lng) {
      try {
        const content = fs.readFileSync(path.join(__dirname, '../apps/user-web/places-data.js'), 'utf-8');
        const extractJson = content.substring(content.indexOf('['), content.lastIndexOf(']') + 1);
        const placesData = eval(extractJson);
        const nearest = placesData.find(p => {
          const d = Math.sqrt(Math.pow(p.lat - coords.lat, 2) + Math.pow(p.lng - coords.lng, 2));
          return d < 0.5;
        });
        if (nearest) locationContext = `Vị trí hiện tại: ${nearest.name} (${nearest.region}). Đặc tả: ${nearest.text}.`;
      } catch (e) { }
    }

    // --- START SMART CACHE (TRÍ NHỚ PHẢN XẠ) ---
    // Kiểm tra câu hỏi có trong Database chưa để tiết kiệm API và tăng tốc độ
    if (chatbotDb.readyState === 1 && message.length > 2) {
      try {
        // A. Ưu tiên tìm trong bảng Knowledge (Kiến thức Admin soạn)
        const knowledgeMatch = await Knowledge.findOne({
          $or: [
            { question: lowerMsg },
            { question: message.trim() }
          ]
        });

        if (knowledgeMatch) {
          console.log("➡️ [SmartCache] Khớp kiến thức Admin:", knowledgeMatch.question);
          return res.json({
            success: true,
            answer: knowledgeMatch.answer,
            source: 'smart-cache-knowledge'
          });
        }

        // B. Tìm trong lịch sử hội thoại toàn cầu (Global Conversation Cache)
        // Lưu ý: Chỉ cache các câu hỏi "chung chung", không chứa từ khóa cá nhân/ngữ cảnh
        const contextKeywords = ['đây', 'bây giờ', 'tối nay', 'hiện tại', 'này', 'mình', 'tôi', 'em'];
        const isContextSensitive = contextKeywords.some(k => lowerMsg.includes(k));

        if (!isContextSensitive && lowerMsg.length > 10) {
          // Tìm câu trả lời gần nhất cho câu hỏi y hệt này
          const prevQuestion = await Conversation.findOne({
            role: 'user',
            text: { $regex: new RegExp(`^${message.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') }
          }).sort({ timestamp: -1 });

          if (prevQuestion) {
            // Lấy câu trả lời NGAY SAU câu hỏi đó của chính user đó (hoặc bất kỳ ai)
            const prevAnswer = await Conversation.findOne({
              role: 'model',
              timestamp: { $gt: prevQuestion.timestamp }
            }).sort({ timestamp: 1 });

            if (prevAnswer && prevAnswer.text) {
              console.log("➡️ [SmartCache] Khớp lịch sử cộng đồng:", message);
              return res.json({
                success: true,
                answer: prevAnswer.text,
                source: 'smart-cache-history'
              });
            }
          }
        }
      } catch (cacheErr) {
        console.error("⚠️ SmartCache Error:", cacheErr.message);
      }
    }
    // --- END SMART CACHE ---

    // 3. Khởi tạo System Prompt chuyên biệt theo vai trò
    let systemPrompt = "";
    const userRole = role || (req.user ? req.user.role : 'user');

    if (userRole === 'admin' || userRole === 'superadmin') {
      systemPrompt = `
BẠN LÀ: Trợ lý Quản trị hệ thống WanderViệt.
NHIỆM VỤ: Hỗ trợ Admin kiểm tra logs, giải thích các quy trình kiểm duyệt, thống kê và quản lý toàn hệ thống.
PHONG CÁCH: Chuyên nghiệp, chính xác, tập trung vào dữ liệu và bảo mật.
`;
    } else if (userRole === 'business') {
      systemPrompt = `
BẠN LÀ: Chuyên gia hỗ trợ Đối tác Doanh nghiệp WanderViệt.
NHIỆM VỤ: Hỗ trợ doanh nghiệp tối ưu hóa dịch vụ, giải thích các chỉ số kinh doanh, hỗ trợ đăng bài và thu hút khách du lịch.
PHONG CÁCH: Gợi mở, thúc đẩy kinh doanh, hỗ trợ đối tác thành công.
`;
    } else {
      systemPrompt = `
BẠN LÀ: Hướng dẫn viên du lịch thân thiện của WanderViệt.
NHIỆM VỤ: Tư đoán địa điểm, lên lịch trình, chia sẻ mẹo du lịch và văn hóa địa phương.
PHONG CÁCH: Vui vẻ, hào hứng, xưng "mình" gọi "bạn". Giới hạn trả lời dưới 60 từ.
`;
    }

    // Thêm ngữ cảnh thời gian thực
    systemPrompt += `
NGỮ CẢNH THỜI GIAN THỰC:
- VỊ TRÍ & LỘ TRÌNH: ${locationContext} | ${tripContext}
- VAI TRÒ NGƯỜI DÙNG: ${userRole}
`;

    try {
      // 4. Gọi Groq API (Llama 3.3 70B Versatile)
      const completion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          ...chatHistory,
          { role: "user", content: message }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 150
      });

      const aiAnswer = completion.choices[0]?.message?.content || "Mình chưa nghe rõ, bạn nói lại nhé!";

      // 5. LƯU TRÍ NHỚ (Ghi vào DB Server)
      if (chatbotDb.readyState === 1 && aiAnswer) {
        try {
          await new Conversation({ userId: sessionKey, role: 'user', text: message }).save();
          await new Conversation({ userId: sessionKey, role: 'model', text: aiAnswer }).save();
        } catch (saveErr) {
          console.error("Lỗi lưu trí nhớ:", saveErr.message);
        }
      }

      res.json({ success: true, answer: aiAnswer, source: 'groq-llama3-expert-v5' });

    } catch (groqError) {
      console.error('❌ Groq API Error Detail:', groqError);
      if (groqError.response && groqError.response.data) {
        console.error('Groq Response Data:', JSON.stringify(groqError.response.data));
      }
      res.status(500).json({ success: false, answer: "Bộ não AI siêu tốc đang bảo trì, vui lòng thử lại sau!" });
    }
  } catch (error) {
    console.error('Critical Chat Error:', error);
    res.status(500).json({ success: false, answer: 'Lỗi hệ thống.' });
  }
});

module.exports = router;
