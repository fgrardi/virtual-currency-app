window.addEventListener("load", async function() {
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

    const users = await loadAllUsers();
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
        let fullUsername = getFullName(users, details.username);
        let fullRecipient = getFullName(users, details.recipient);

        // console.log(json.transaction, detailsElement);
        detailsElement.innerHTML = 
        `<ul class="list__item">
            <li>ID</li>
            <li>${details._id}</li>
        </ul>
        <ul class="list__item">
            <li>Amount</li>
            <li>${details.amount}</li>
        </ul>
        <ul class="list__item">
            <li>Sender</li>
            <li>${fullUsername}</li>
        </ul>
        <ul class="list__item">
            <li>Recipient</li>
            <li>${fullRecipient}</li>
        </ul>
        <ul class="list__item">
            <li>Reason</li>
            <li>${details.reason}</li>
        </ul>
        <ul class="list__item">
            <li>Remark</li>
            <li>${details.remark}</li>
        </ul>`;
    });

});

function getFullName(users, name){
    let detailsUser = users.filter(user => user.username === name);
    let detailsUserString = "?";
    if (detailsUser) {
        detailsUserString = detailsUser[0].firstname + " " + detailsUser[0].lastname;
    }
    return detailsUserString;
};
