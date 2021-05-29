let leaderboardGrid = document.querySelector(".leaderboard list");

window.addEventListener("load", (e) => {
    let token = localStorage.getItem("token");
    if(!token) {
        window.location.replace("login.html");
    }

    let leaderbord;
    
    fetch('api/v1/transfers', {
        method: "get",
        headers: {
            'Content-Type': 'application-json',
            'Authorization': token
        }
    }).then(response => {
        return response.json();
    }).then(json => {
        if(json.status === "succes") {
            leaderboard = json.data;
            let ranking = 1;

            json.data.forEach(element => {
                let username = element.username;
                let amount = element.amount;

                let rankingList = 
                `<div class="list__item">
                    <div class="list__item--rank">${ranking}</div>
                    <div class="list__item--name">${username}</div>
                    <div class="list__item--amount">${amount} Coins</div>
                </div>
                <hr class="list__hr">`
                leaderboardGrid.innerHTML += rankingList;
                ranking ++;
            })
        }
    })

})