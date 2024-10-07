// public/script.js

// Function to show the selected section and hide others
function showSection(sectionId) {
    const sections = document.querySelectorAll('.stat-card');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

// Handle Registration
document.getElementById('register-btn').onclick = function () {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const message = document.getElementById('register-message');

    fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        message.textContent = data.message || 'Registered successfully';
    })
    .catch(err => {
        message.textContent = 'Error: ' + err.message;
    });
};

// Handle Login
document.getElementById('login-btn').onclick = function () {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const message = document.getElementById('login-message');

    fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('token', data.token); // Store token for authenticated user
            message.textContent = 'Login successful!';
            // Redirect to home or dashboard
        } else {
            message.textContent = data.message;
        }
    })
    .catch(err => {
        message.textContent = 'Error: ' + err.message;
    });
};

// On page load, show home section by default
document.addEventListener('DOMContentLoaded', () => showSection('home'));
