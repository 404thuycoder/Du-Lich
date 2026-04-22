const mongoose = require('mongoose');
const chatbotDb = require('./dbChatbot'); 

const ConversationSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true }, // Có thể là mongoId hoặc deviceId
  role: { type: String, enum: ['user', 'model'], required: true },
  text: { type: String, required: true, index: true },
  timestamp: { type: Date, default: Date.now }
});

// Lưu trữ tối đa 100 tin nhắn gần nhất mỗi người dùng để tối ưu DB (Optional logic)
const Conversation = chatbotDb.model('Conversation', ConversationSchema);

module.exports = Conversation;
