var btnLogin = document.querySelector(".login__btn");

btnLogin.addEventListener("click", (e) => {
    //console.log("click");
    
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

        fetch('/users/login', {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        }).then(response => {
            return response.json();
        }).then(json => {
            if (json.status === "success") {
                let token = json.data.token;
                localStorage.setItem("token", token);
                window.location.href = "index.html";
            } else {
                let feedback = document.querySelector(".alert");
                feedback.textContent = "Login failed.";
                feedback.classList.remove('hidden');
            }
        })
});