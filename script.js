const API = 'http://localhost:5000';

async function register() {
    const res = await fetch(`${API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        })
    });
    const data = await res.json();
    document.getElementById('msg').innerText = data.message;
}

async function login() {
    const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        })
    });
    const data = await res.json();
    document.getElementById('msg').innerText = data.message;
    if (data.status === 'success') {
        alert('Login successful! Now you can donate.');
        window.location.href = 'donate.html';
    }
}
