const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const SystemLog = require('../models/SystemLog');

const LOG_FILE = path.join(__dirname, '../audit.log');

/**
 * Logs an action to audit.log and MongoDB
 * @param {string} userEmail 
 * @param {string} role 
 * @param {string} action 
 * @param {object} details 
 * @param {string} ip
 * @param {string} userAgent
 */
const logAction = async (userEmail, role, action, details = {}, ip = '', userAgent = '') => {
  const timestamp = new Date();
  
  // 1. Log to File
  const entry = {
    timestamp: timestamp.toISOString(),
    user: userEmail,
    role,
    action,
    details,
    ip,
    userAgent
  };
  const logLine = JSON.stringify(entry) + '\n';
  fs.appendFile(LOG_FILE, logLine, (err) => {
    if (err) console.error('Failed to write audit log:', err);
  });

  // 2. Log to MongoDB
  try {
    const log = new SystemLog({
      action,
      details: typeof details === 'object' ? JSON.stringify(details) : String(details),
      userName: userEmail,
      userRole: role,
      ip,
      userAgent,
      timestamp
    });
    await log.save();
  } catch (err) {
    console.error('Failed to save SystemLog to DB:', err);
  }
};

module.exports = logAction;
