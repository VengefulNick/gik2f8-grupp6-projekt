class Api {
    url = '';

    constructor(url) {
        this.url = url;
    }

// Create/Post a user
    createUser(data) {
        const JSONdata = JSON.stringify(data);

        const request = new Request(this.url, {
            method: 'POST',
            body: JSONdata,
            headers: {'content-type': 'application/json'}
        });

        return fetch(request)
            .then((result) => result.json())
            .then((data) => data)
            .catch((err) => console.log(err));
        }

// Get all users
    getUsers() {
        return fetch(this.url)
            .then((result) => result.json())
            .then((data) => data)
            .catch((err) => console.log(err));
    }
// Get single user
    getUser(id) {
        //console.log(id);
        return fetch(`${this.url}/${id}`)
            .then((result) => result.json())
            .then((data) => data)
            .catch((err) => console.log(err));
    }

// UPDATE - PUT/PATCH
    updateUser(id, user) {
        const JSONdata = JSON.stringify({
            id : user.id,
            username : user.username,
            email : user.email,
            joinDate : user.joinDate,
            theme : user.theme,
            avatar : user.avatar
        });

        console.log(JSONdata)

        const request = new Request(`${this.url}/${id}`, {
            method: 'PUT',
            body: JSONdata,
            headers: {'content-type': 'application/json'}
        });

        return fetch(request)
            .then((result) => result.json())
            .then((data) => data)
            .catch((err) => console.log(err));
    }

// DELETE - DELETE
    removeUser(id) {
        console.log(`Removing user with id ${id}`);

        return fetch(`${this.url}/${id}`, {
            method: 'DELETE',
        })
            .then((result) => result)
            .catch((err) => console.log(err));
    }
}