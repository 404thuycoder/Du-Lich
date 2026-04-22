const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '../audit.log');

/**
 * Logs an action to audit.log
 * @param {string} userEmail 
 * @param {string} role 
 * @param {string} action 
 * @param {object} details 
 */
const logAction = (userEmail, role, action, details = {}) => {
  const timestamp = new Date().toISOString();
  const entry = {
    timestamp,
    user: userEmail,
    role,
    action,
    details
  };

  const logLine = JSON.stringify(entry) + '\n';
  fs.appendFile(LOG_FILE, logLine, (err) => {
    if (err) console.error('Failed to write audit log:', err);
  });
};

module.exports = logAction;
