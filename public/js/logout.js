function logout() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token");
    window.location.href = "login.html";
}