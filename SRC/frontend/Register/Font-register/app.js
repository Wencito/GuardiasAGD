// frontend/app.js

// Login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario, password })
        });

        const data = await res.json();

        if (res.status === 200) {
            alert('Login exitoso');
            console.log('Token:', data.token);
        } else {
            alert(data.message);
        }
    } catch (err) {
        console.error('Error en la solicitud', err);
    }
});

// Registro
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario, password })
        });

        const data = await res.json();

        if (res.status === 201) {
            alert('Registro exitoso');
        } else {
            alert(data.message);
        }
    } catch (err) {
        console.error('Error en la solicitud', err);
    }
});
