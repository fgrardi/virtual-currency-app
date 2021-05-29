const search = document.getElementById('username');
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

var btnSignup = document.querySelector(".transaction button");

btnSignup.addEventListener("click", (e) => {
    console.log("click")
    let username = document.querySelector('#username').value;
    let amount = document.querySelector('#coins').value;
    let reason = document.querySelector('#reason').value;
    let message = document.querySelector('#message').value;
    let token = localStorage.getItem('token');
    
    fetch('/api/v1/transfers', {
        method: "post",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            "username": username,
            "amount": amount,
            "reason": reason,
            "message": message
        })
    }).then(response => {
        return response.json();
        
    }).then(json => {
        if (json.status === "success") {
            let feedback = document.querySelector(".alert__fail");
            feedback.textContent = "Transfer succesful!";
            feedback.classList.remove('hidden');
        }
        else{
            let feedback = document.querySelector(".alert__fail");
            feedback.textContent = "Something went wrong!";
            feedback.classList.remove('hidden');
        }
    })
});

