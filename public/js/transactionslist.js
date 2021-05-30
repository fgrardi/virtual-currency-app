window.addEventListener("load", function() {
    console.log("load");
    let token = sessionStorage.getItem('token');

    fetch('/api/v1/transfers', {
        method: "get",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
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