// src/routes.js
const express = require('express');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const db = require('./db');

const router = express.Router();

// Ruta de registro
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await argon2.hash(password);
        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error en la base de datos' });
            }
            res.status(201).json({ message: 'Usuario registrado' });
        });
    } catch (err) {
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
});

// Ruta de login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        const user = results[0];
        const match = await argon2.verify(user.password, password);
        if (!match) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
});

module.exports = router;
