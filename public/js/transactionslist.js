window.addEventListener("load", function() {
    console.log("load");

        fetch('/api/v1/transfers', {
            method: "get",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjIyODg0MjIsImV4cCI6MTYyMjM3NDgyMn0.4OzuQO3hIvqXQfbaViN9rh9AyUUmtksx1NiZ-V7ZlJE'
            }
        }).then(response => {
            return response.json();
        }).then(json => {
            console.log(json, json.status, json.data);
            if (json.status === "success") {
                let transactions = json.data.transactions;
                //console.log(transactions);
                let transactionHtml;

                transactions.forEach(element => {
                    console.log(element);
                    transactionHtml = transactionHtml + `
                    <ul class="transactions--list">
                    <li class="transaction transactions--name">${element.recipient}</li>
                    <li class="transaction transactions--amount">${element.amount}</li>
                    <li class="transaction transactions--date">${element.reason}</li>
                    </ul>
                    `
                });
                this.document.getElementById('list').innerHTML = transactionHtml;
            } 
        })
    });