const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '../audit.log');

const logAction = (actionName, description, reqOrUser = {}, extraDetails = {}) => {
  const timestamp = new Date().toISOString();
  let userEmail = 'System';
  let role = 'System';

  // Extract user info safely
  if (reqOrUser.user) {
    userEmail = reqOrUser.user.email || reqOrUser.user.id || 'Unknown';
    role = reqOrUser.user.role || 'Unknown';
  } else if (reqOrUser.email) {
    userEmail = reqOrUser.email;
    role = reqOrUser.role || 'Unknown';
  }

  const entry = {
    timestamp,
    user: userEmail,
    role,
    action: actionName,
    description: description,
    details: extraDetails
  };

  try {
    const logLine = JSON.stringify(entry) + '\n';
    fs.appendFile(LOG_FILE, logLine, (err) => {
      if (err) console.error('Failed to write audit log:', err);
    });
  } catch (err) {
    console.error('Circular JSON or other error in logger:', err);
  }
};

module.exports = logAction;
