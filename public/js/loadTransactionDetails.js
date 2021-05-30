window.addEventListener("load", function() {
    let token = sessionStorage.getItem("token");

    // copied from stackoverflow
    const query = window.location.search;
    const regex = /[?&;](.+?)=([^&;]+)/g;
    let match;
    let params = {};
    if (query) {
        while (match = regex.exec(query)) {
            params[match[1]] = decodeURIComponent(match[2]);
        }
    }

    fetch('/api/v1/transfers/' + params.id, {
        method: "get",
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
    .then(response => {
        return response.json();
    }).then(json => {
        let detailsElement = document.querySelector("#details");
        let details = json.transaction;
        console.log(json.transaction, detailsElement);
        detailsElement.innerHTML = `
        <ul class="list__item">
            <li>ID</li>
            <li>${details._id}</li>
        </ul>
        <ul class="list__item">
            <li>Amount</li>
            <li>${details.amount}</li>
        </ul>
        <ul class="list__item">
            <li>Username</li>
            <li>${details.username}</li>
        </ul>
        <ul class="list__item">
            <li>Recipient</li>
            <li>${details.recipient}</li>
        </ul>`;
    });

});
