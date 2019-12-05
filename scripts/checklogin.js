var token, role;

//----------------- GET COOKIE ROLE -------------------
function getCookieRole(role) {
    var name = role + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//----------------- GET COOKIE TOKEN -------------------
function getCookie(token) {
    var name = token + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function clearCookie(cookie) {
    document.cookie = cookie + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
}

function logout() {
    clearCookie('AuthorizationToken');
    clearCookie('role');
    window.location.href = "login.html";

    $.ajax({
        url:logOut,
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        headers: {
            Authorization: "Bearer " + getCookie("AuthorizationToken") + ""
        },
        success: function(data) {
            // console.log(data);
        },
        error: function(err) {
           console.log(err);
        }
    });
}

function checkLogin() {
    token = getCookie('AuthorizationToken');
    role = getCookieRole('role');

    // if (role.length) {
        // role = JSON.parse(role);
    // }

    if (!token || !role) {
        window.location.href = "login.html";
        clearCookie('AuthorizationToken');
        clearCookie('role');
    }
}

function setupGUI() {
    // Logout Button
    $('#logout').click(function () {
        logout();
    });
}

$(function () {
    checkLogin();
    setupGUI();
});
