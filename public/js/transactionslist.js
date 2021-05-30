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
            let username = sessionStorage.getItem('username');

            let transactions = json.data.transactions;
            let transactionHtml = "";

            transactions.forEach(element => {
                let type = '<img src="./assets/money-red.png"></img>';
                if (element.recipient === username) {
                    type = '<img src="./assets/money-green.png"></img>';
                }
                transactionHtml += 
                    `<ul class="list__item" onclick="showDetails('${element._id}')">
                        <li class"list__item--type">${type}</li>
                        <li class="">${element.recipient}</li>
                        <li class="">${element.reason}</li>
                        <li class="list__item--amount">${element.amount}</li>
                    </ul>`
                    ;
                document.getElementById('list').innerHTML = transactionHtml;
            });
            
        } 
    })
});

function showDetails(id) {
    window.location.href = "transactiondetails.html?id=" + id;
}