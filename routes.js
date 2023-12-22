const express = require('express');
const router = express.Router();
const db = require('./db');

// Create
router.post('/create', (req, res) => {
  const { name, email } = req.body;
  const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
  db.query(sql, [name, email], (err, result) => {
    if (err) throw err;
    res.send('User created');
  });
});

// Read
router.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update
router.put('/update/:id', (req, res) => {
  const { name, email } = req.body;
  const { id } = req.params;
  const sql = 'UPDATE users SET name=?, email=? WHERE id=?';
  db.query(sql, [name, email, id], (err, result) => {
    if (err) throw err;
    res.send('User updated');
  });
});

// Delete
router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id=?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send('User deleted');
  });
});

module.exports = router;
