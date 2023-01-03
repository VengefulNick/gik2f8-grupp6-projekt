const express = require("express");
const app = express();
const fs = require("fs/promises");
const PORT = 5000;

app
    .use(express.json())
    .use(express.urlencoded({extended: false}))
    .use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        res.header("Access-Control-Allow-Methods", "*");
    
        next();
    });


// CREATE - POST
app.post('/users', async (req, res) => {
    console.log('Post');
    try {
        const user = req.body;
        const listBuffer = await fs.readFile('./users.json');
        const currentUsers = JSON.parse(listBuffer);
        let maxUserId = 1;
        if (currentUsers && currentUsers.length > 0) {
        maxUserId = currentUsers.reduce(
            (maxId, currentElement) =>
            currentElement.id > maxId ? currentElement.id : maxId,
            maxUserId
        );
        }

    const newUser = { id: maxUserId + 1, ...user };
    const newList = currentUsers ? [...currentUsers, newUser] : [newUser];

    await fs.writeFile('./users.json', JSON.stringify(newList));
    res.send(newUser);
    } catch (error) {
    res.status(500).send({ error: error.stack });
    }
});

// READ - GET
app.get('/users', async (req, res) => {
    console.log('Read');
    try {
        const users = await fs.readFile('./users.json');
        res.send(JSON.parse(users));
    } catch (error) {
        res.status(500).send({ error });
    }
});

// UPDATE - PUT/PATCH
app.put('/users/:id', async (req, res) => {
    console.log(req)
    try {
        // const id = req.params.id;
        const jsonUserList =  await fs.readFile("./users.json");
        const currentUsers = JSON.parse(jsonUserList);
        /*
        currentUsers.forEach(element => {
        if (element.id == id && element.completed == true) {
            element.completed = false;
        }

        else if (element.id == id && element.completed == false) {
            element.completed = true;
        }
        });
        */
        await fs.writeFile("./users.json", JSON.stringify(currentUsers));
    }
    catch(err) {
        console.log(err)
    }
})

// DELETE - DELETE
app.delete('/users/:id', async (req, res) => {
    console.log(req);
    try {
        const id = req.params.id;
        const listBuffer = await fs.readFile('./users.json');
        const currentUsers = JSON.parse(listBuffer);
        if (currentUsers.length > 0) {
        await fs.writeFile(
            './users.json',
            JSON.stringify(currentUsers.filter((user) => user.id != id))
        );
        res.send({ message: `Användare med id ${id} togs bort` });
        } else {
        res.status(404).send({ error: 'Ingen användare att ta bort' });
        }
    } catch (error) {
        res.status(500).send({ error: error.stack });
    }
});

app.listen(PORT, () => console.log('Server running on http://localhost:5000'));