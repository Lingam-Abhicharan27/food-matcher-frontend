const API = 'https://your-backend-url.onrender.com';
async function donate() {
    const lat = parseFloat(document.getElementById("latitude").value);
    const lon = parseFloat(document.getElementById("longitude").value);
    const food = document.getElementById("food_type").value;

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    try {
        const res = await fetch(`${API}/donate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ latitude: lat, longitude: lon, food_type: food })
        });

        const data = await res.json();

        if (data.status === "success") {
            resultsDiv.innerHTML = `<h4>Matching NGOs:</h4>`;
            data.matched_ngos.forEach(ngo => {
                const div = document.createElement("div");
                div.className = "ngo";
                div.innerHTML = `<strong>${ngo.ngo_name}</strong><br>Distance: ${ngo.distance_km} km`;
                resultsDiv.appendChild(div);
            });
        } else {
            resultsDiv.innerHTML = `<p class="error">${data.message}</p>`;
        }
    } catch (err) {
        resultsDiv.innerHTML = `<p class="error">Failed to connect to server.</p>`;
    }
}
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
