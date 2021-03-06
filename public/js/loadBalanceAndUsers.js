window.addEventListener("load", async function() {
    let token = sessionStorage.getItem("token");
    let username = sessionStorage.getItem("username");

    fetch('/api/v1/balance', {
        method: "get",
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': token 
        }
    })
    .then(response => {
        return response.json();
    }).then(json => {
        let balanceElement = document.querySelector(".balance__amount");
        balanceElement.innerHTML = json.data.balance;
    });

    const users = await loadAllUsers();
    let loginUser = users.filter(user => user.username === username);
    if (loginUser) {
        let balanceElement = document.querySelector(".balance__username");
        balanceElement.innerHTML = loginUser[0].firstname + " " + loginUser[0].lastname;
    }
});

async function loadAllUsers() {
    return await fetch('/users', {
        method: "get",
        headers: { 
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        return response.json();
    }).then(json => {
        return json.users
    });
}