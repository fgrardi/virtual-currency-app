fetch('/users', {
    method: "get",
    headers: { 'Content-Type': 'application/json' }
})
.then(response => {
    return response.json();
}).then(json => {
    let users = json.users;
    let userOptionsHtml = "";
    let optionsUsers = document.getElementById("user_list");
    let username = sessionStorage.getItem('username');
    users.filter(user => user.username !== username)
         .forEach(user => {
            userOptionsHtml += `<option>${user.username}</option>\n`
        });
    optionsUsers.innerHTML = userOptionsHtml;
});

var btnTransaction = document.querySelector(".transaction button");

btnTransaction.addEventListener("click", (e) => {
    let alertSuccess = document.querySelector(".alert--success");
    let alertFail = document.querySelector(".alert--fail");

    let recipient = document.querySelector('#recipient').value;
    let amount = document.querySelector('#coins').value;
    let reason = document.querySelector('#reason').value;
    let message = document.querySelector('#message').value;
    let token = sessionStorage.getItem('token');
    let username = sessionStorage.getItem('username');

    console.log("[" + amount + "]");
    console.log("[" + reason + "]");

    if(amount === "" || recipient === "" || reason === "What is the reason") {
        alertFail.classList.remove('hidden');
        alertSuccess.classList.add('hidden');
        return
    }
    
    fetch('/api/v1/transfers', {
        method: "post",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            "username": username,
            "recipient": recipient,
            "amount": amount,
            "reason": reason,
            "message": message
        })
    }).then(response => {
        return response.json();
        
    }).then(json => {

        if (json.status === "success") {
            alertSuccess.innerHTML = "Transfer succesful!";
            alertSuccess.classList.remove('hidden');
            alertFail.classList.add('hidden');
        }
        else{
            alertFail.innerHTML = "Something went wrong!";
            alertFail.classList.remove('hidden');
            alertSuccess.classList.add('hidden');
        }
    })
});

