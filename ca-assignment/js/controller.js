'use-strict';

function onInit() {
    getUsers().then(users => {
        renderUsers(users)
    })
}

function renderUsers(users) {
    let strHTML = users.map((user) => {
        return `
                <div class="card text-center align-items-center">
                    <img src="${user.avatar_url}" alt="" class="round-img-sm auto"/>
                    <h2>${user.login}</h3>
                    <div class="user${user.id}">
                        <img class="spinner" src="img/spinner.gif"/>
                    </div>
                </div>
        `;
    });
    document.querySelector('.card-wrapper').innerHTML = strHTML.join('')
    getUserRepos()
}

function onDisplayRepos(userId, reposNumber) {
    document.querySelector('.spinner').style.display = 'block'
    setTimeout(() => {
        document.querySelector('.spinner').style.display = 'none'
        document.querySelector(`.user${userId}`).textContent = `Total Repos: ${reposNumber}`
    }, 1000)
}
