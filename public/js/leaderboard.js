let leaderboardGrid = document.querySelector(".list");
console.log(leaderboardGrid);

window.addEventListener("load", (e) => {
    let token = sessionStorage.getItem("token");
    if(!token) {
        window.location.replace("login.html");
    }
    
    fetch('api/v1/leaderboard', {
        method: "get",
        headers: {
            'Content-Type': 'application-json'
        }
    }).then(response => {
        return response.json();
    }).then(json => {
        console.log(json);
        if(json.status === "success") {
            let leaderboard = json.leaderboard;
            leaderboardGrid.innerHTML = createLeaderboardHtml(leaderboard);
        }
    })

})

function createLeaderboardHtml(leaderboard) {
    let rankingList = '';
    let ranking = 1;

    leaderboard.forEach(element => {
        let username = element.username;
        let amount = element.amount;

        rankingList +=
            `<div class="list__item">
                <div class="list__item--rank">${ranking}</div>
                <div class="list__item--name">${username}</div>
                <div class="list__item--amount">${amount} Coins</div>
            </div>
            <hr class="list__hr">`
        ranking ++;
    })
    return rankingList;
}