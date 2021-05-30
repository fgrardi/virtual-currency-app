var btnSignup = document.querySelector(".signup button");
btnSignup.addEventListener("click", (e) => {
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    let firstname = document.querySelector('#firstname').value;
    let lastname = document.querySelector('#lastname').value;
    let username = document.querySelector('#username').value;

    function validEmail() {
        let allowedDomain = ['student.thomasmore.be', 'gmail.com'];
        let emailValue = document.getElementById("email").value;
        let splitArray = emailValue.split('@');
        let feedback = document.querySelector(".alert--email");
        if (allowedDomain.indexOf(splitArray[1]) >= 0) {
            feedback.classList.add('hidden');
            return true;
        }
        feedback.textContent = "Invalid email: email must contain @student.thomasmore.be or @gmail.com!";
        feedback.classList.remove('hidden');
        return false;
    }

    if (validEmail()) {
        fetch('/users/signup', {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "firstname": firstname,
                "lastname": lastname,
                "username": username,
                "email": email,
                "password": password
            })
        }).then(response => {
            return response.json();
            
        }).then(json => {
            let signupSuccess = document.querySelector(".alert--success");
            let signupFail = document.querySelector(".alert--fail");
    
            console.log(json);
            if (json.status === "success") {
                signupSuccess.classList.remove('hidden');
                signupFail.classList.add('hidden');
            }
            else {
                signupFail.innerHTML = "Username already in use.";
                signupFail.classList.remove('hidden');
                signupSuccess.classList.add('hidden');
            }
        })
    };
});

