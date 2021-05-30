const search = document.getElementById('recipient');
const matchList = document.getElementById('userList');

// autocomplete username

// const searchUser = async searchText => {
//     const resAPI = await fetch('/users', { //getdata weggehaald => /users: ik maak dit endpoint (fien)
//         method: "get",
//                 headers: {
//                     'Content-Type': 'application/json'
//     }})
   
//     const res = await resAPI.json();
//     let matches = res.filter(user => {
//         const regex = new RegExp(`^${searchText}`, 'gi');
//         return user.firstname.match(regex) || user.lastname.match(regex);
//     });

//     if(searchText.length === 0){
//         matches = [];
//         matchList.innerHTML = '';
//     }

//     outputHtml(matches);
// };

// const outputHtml = matches => {
//     if(matches.length > 0){
//         const html = matches.map(match => `
//             <div>
//                 <p>${match.firstname} ${match.lastname} </p>
//             </div>
//         `).join('');

//         match.innerHTML = html
//     }
// }
// search.addEventListener('input', ()=> searchUser(search.value));

var btnTransaction = document.querySelector(".transaction button");

btnTransaction.addEventListener("click", (e) => {
    console.log("click")
    let recipient = document.querySelector('#recipient').value;
    let amount = document.querySelector('#coins').value;
    let reason = document.querySelector('#reason').value;
    let message = document.querySelector('#message').value;
    let token = sessionStorage.getItem('token');
    let username = sessionStorage.getItem('username');
    
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
        let alertSuccess = document.querySelector(".alert--success");
        let alertFail = document.querySelector(".alert--fail");

        if (json.status === "success") {
            alertSuccess.innerHTML = "Transfer succesful!";
            alertSuccess.classList.remove('hidden');
        }
        else{
            alertFail.innerHTML = "Something went wrong!";
            alertFail.classList.remove('hidden');
        }
    })
});

