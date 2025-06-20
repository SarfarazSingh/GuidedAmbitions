document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.endsWith('login.html')) {
        return;
    }

    if (!localStorage.getItem('isLoggedIn')) {
        var depth = window.location.pathname.split('/').length - 2;
        var prefix = '';
        for (var i = 0; i < depth; i++) {
            prefix += '../';
        }
        window.location.href = prefix + 'login.html';
        return;
    }

    var logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            var depth = window.location.pathname.split('/').length - 2;
            var prefix = '';
            for (var i = 0; i < depth; i++) {
                prefix += '../';
            }
            window.location.href = prefix + 'login.html';
        });
    }
});
