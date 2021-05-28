const search = document.getElementById('username');
const matchList = document.getElementById('userList');

// autocomplete username

const searchUser = async searchText => {
    const resAPI = await fetch('/users/getdata', {
        method: "get",
                headers: {
                    'Content-Type': 'application/json'
    }})
   
    const res = await resAPI.json();
    let matches = res.filter(user => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return user.username.match(regex) || user.name.match(regex);
    });

    if(searchText.lenght === 0){
        matches = [];
        matchList.innerHTML = '';
    }

    outputHtml(matches);
};

const outputHtml = matches => {
    if(matches.length > 0){
        const html = matches.map(match => `
            <div>
                <p>${match.username} </p>
            </div>
        `).join('');

        match.innerHTML = html
    }
}

search.addEventListener('input', ()=> searchUser(search.value));

