var btnSignup = document.querySelector(".signup button").addEventListener("click", (e) => {
let email = document.querySelector('#email').value;
let password = document.querySelector('#password').value;
function validateEmail(){
    let allowedDomain = ['student.thomasmore.be'];
    let emailValue = document.getElementById("email").value;
    let splitArray = emailValue.split('@');
    if (allowedDomain.indexOf(splitArray[1]) >=0)
  {
      console.log(emailValue);
    return (true)
  }
    let feedback = document.querySelector(".alert__email");
    feedback.textContent = "Invalid email: email must contain @student.thomasmore.be!";
    feedback.classList.remove('hidden');
    return (false)
}
validateEmail();

    fetch('http://localhost:3000/users/signup', {
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
            let feedback = document.querySelector(".alert__fail");
            feedback.textContent = "Sign up complete!";
            feedback.classList.remove('hidden');
        }
    })
});

