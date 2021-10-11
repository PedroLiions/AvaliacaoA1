const express = require('express');
const bodyParse = require('body-parser');
const _ = require('lodash');

const app = express();

const users = [];

app.use(bodyParse.json());

app.get('/users', (req, res) => {
    return res.json({
        status: 200,
        data: users
    })
});

app.get('/users/:id', (req, res) => {
    const {id} = req.params;

    const user = getUserByID(id);

    if (!user) {
        return res.status(404).json({
            message: 'Resource not found'
        })
    }

    return res.json({
        status: 200,
        data: user
    })

});

app.post('/users', (req, res) => {
    const user = req.body;

    user.id = users.length + 1;

    users.push(user);

    return res.status(201).json();
});

app.put('/users/:id', (req, res) => {
    const {id} = req.params;
    let userReq = req.body;
    let userDB = getUserByID(Number.parseInt(id));
    let newUser = {...userDB, ...userReq};
    let indexOfUser = getIndexByID(id);
    users[indexOfUser] = newUser;

    return res.json({
        status: 200,
    })
});

const getUserByID = (id) => {
    return _.find(users, {id: Number.parseInt(id)})
}

const getIndexByID = (id) => {
    return _.findIndex(users, {id: Number.parseInt(id)})
}

app.listen(3000);



