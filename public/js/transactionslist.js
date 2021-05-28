window.addEventListener("load", function() {

        fetch('/api/v1/transfers', {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).then(json => {
            if (json.status === "success") {
                json.data.forEach(element => {
                    let transactions = `
                    <ul class="transactions--list">
                    <li class="transaction transactions--name">${data.username}</li>
                    <li class="transaction transactions--amount">${data.coins}</li>
                    <li class="transaction transactions--date">${data.date}</li>
                    </ul>
                    `
                    this.document.getElementById('list').innerHTML = transactions;
                });
            } 
        })
    });