const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  create: (userData, callback) => {
    bcrypt.hash(userData.password, 10, (err, hash) => {
      if (err) callback(err);
      db.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [userData.name, userData.email, hash, userData.role],
        callback
      );
    });
  },

  findByEmail: (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], callback);
  },
};

module.exports = User;
