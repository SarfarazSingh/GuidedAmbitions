document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const error = document.getElementById('loginError');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        const validUsername = 'client';
        const validPassword = 'password123';

        if (username === validUsername && password === validPassword) {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'index.html';
        } else {
            error.style.display = 'block';
        }
    });
});
