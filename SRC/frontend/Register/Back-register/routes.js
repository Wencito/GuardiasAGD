// backend/routes.js
const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const pool = require('./config');
require('dotenv').config();

// Registro de usuario
router.post('/register', async (req, res) => {
    const { usuario, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
        if (rows.length > 0) {
            return res.status(400).json({ message: 'Usuario ya existe' });
        }

        // Encriptar la contraseña
        const hashedPassword = await argon2.hash(password);

        // Insertar el nuevo usuario en la base de datos
        await pool.query('INSERT INTO usuarios (usuario, password) VALUES (?, ?)', [usuario, hashedPassword]);

        res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Login de usuario
router.post('/login', async (req, res) => {
    const { usuario, password } = req.body;

    try {
        // Verificar si el usuario existe
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
        if (rows.length === 0) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }

        const user = rows[0];

        // Verificar la contraseña
        const isMatch = await argon2.verify(user.password, password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }

        // Generar un token JWT
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

module.exports = router;

