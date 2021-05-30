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
            let transactionHtml = "";

            transactions.forEach(element => {
                transactionHtml += `
                <ul class="list__item">
                <li class="">${element.recipient}</li>
                <li class="">${element.reason}</li>
                <li class="list__item--amount">${element.amount}</li>
                </ul>
                `;
                document.getElementById('list').innerHTML = transactionHtml;
            });
            
        } 
    })
});