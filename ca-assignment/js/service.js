'use-strict'

var gUsers

const KEY = 'github_users'

const CLIENT_SECRET = '6ae4d6f8999d535da12213751899cbcffaa10da2'
const CLIENT_ID = '34879ee4eb8271676c81'

function getUsers() {
    gUsers = loadFromStorage(KEY)
    if (gUsers) return Promise.resolve(gUsers)
    else {
        return axios.get(`https://api.github.com/users?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`)
            .then(res => {
                saveToStorage(KEY, res.data)
                gUsers = res.data
                return res.data
            })
    }
}

function getUserRepos() {
    gUsers.forEach(user => {
        axios.get(`${user.repos_url}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`)
            .then(res => {
                onDisplayRepos(user.id, res.data.length)
            })
    })

}