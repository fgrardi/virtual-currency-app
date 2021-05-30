var btnLogin = document.querySelector(".login__btn");

btnLogin.addEventListener("click", (e) => {
    //console.log("click");

    let username = document.querySelector("#username").value;
    let password = document.querySelector('#password').value;

    fetch('/users/login', {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.status === "success") {
            let token = json.data.token;
            sessionStorage.setItem("token", token);
            window.location.href = "index.html";
        } else {
            let feedback = document.querySelector(".alert--fail");
            feedback.innerText = "Username or password incorrect.";
            feedback.classList.remove('hidden');
        }
    })
});