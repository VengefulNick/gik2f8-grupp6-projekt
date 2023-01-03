class Api {
    url = '';

    constructor(url) {
        this.url = url;
    }

    // Create/Post a user

    createUser(/*insert*/) {
        const JSONdata = JSON.stringify(/*insert*/);

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



// Get users
    getUsers() {
        const request = new Request(`${this.url}/insert-here/${insert-user}`, {
            method: "GET", 
        });
        return fetch(request)
            .then((result) => result.json())
            .then((data) => data)
            .catch((err) => console.log(err));
    }

// UPDATE - PUT/PATCH

    updateUser(/*insert*/) {
        const JSONData = JSON.stringify({
            id: userId,
            name: userName,
        });

        return fetch(`${this.url}/${insert-here}`, {
        method: 'PUT'
        })
        .then((result) => result)
        .catch((err) => console.log(err));
    }

// DELETE - DELETE

    removeUser(/*insert-id*/) {
        console.log(`Removing task with id ${id}`);

        return fetch(`${this.url}/${insert-id}`, {
            method: 'DELETE',
        })
            .then((result) => result)
            .catch((err) => console.log(err));
    }

}