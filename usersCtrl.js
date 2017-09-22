const users = require('./userData.json');

const getUsers = (req, res, next) => {
    if (req.query.favorites) {
        const favesArr = [];
        for (var key in users) {
            if (users[key].favorites.includes(req.query.favorites) === true) {
                favesArr.push(users[key]);
            }
        }
        res.status(200).json(favesArr);
    }
    if (req.query.age) {
        const ageArr = [];
        for (var i in users) {
            if (users[i].age < req.query.age) {
                ageArr.push(users[i]);
            }
        }
        res.status(200).json(ageArr);
    }
    if (req.query.lastname) {
        const lastnameArr = [];
        for (var x in users) {
            if (users[x].last_name === req.query.lastname) {
                lastnameArr.push(users[x]);
            }
        }
        res.status(200).json(lastnameArr);
    }
    if (req.query.email) {
        const emailArr = [];
        for (var y in users) {
            if (users[y].email === req.query.email) {
                emailArr.push(users[y]);
            }
        }
        res.status(200).json(emailArr);
    }
    else { res.status(200).json(users); }
};


const getUserById = (req, res, next) => {
    if(req.params.id) {
        for (var key in users) {
            if (users[key].id.toString() === req.params.id) {
                res.status(200).json(users[key]);
            }
        }
    }
 res.status(404).json(null);
};


const getAdmins = (req, res, next) => {
    const adminsArr = [];
    for (var key in users) {
        if (users[key].type === "admin") {
            adminsArr.push(users[key]);
        }
    }
    res.status(200).json(adminsArr);
};


const getNonAdmins = (req, res, next) => {
    const usersArr = [];
    for (var key in users) {
        if (users[key].type !== "admin") {
            usersArr.push(users[key]);
        }
    }
    res.status(200).json( usersArr);
};


const getUsersByType = (req, res, next) => {
    const usertypeArr = [];
    if (req.params.userType) {
        for (var key in users) {
            if (users[key].type === req.params.userType) {
                usertypeArr.push(users[key]);
            }
        }
        res.status(200).json(usertypeArr);
    }
    else { res.status(404).json("ERROR");}
};


const updateUser = (req, res, next) => {
    if(req.params.id) {
        for (var key in users) {
            if (users[key].id.toString() === req.params.id) {
                users[key] = req.body;
                res.status(200).json(users);
            }
        }
    }
    else { res.status(404).json("ERROR");}
};


const addUser = (req, res, next) => {
    req.body.id = users.length+1;
    users.push(req.body);
    res.status(200).json(users);
};


const removeUser = (req, res, next) => {
    if (req.params.id) {
        for (var key in users) {
            if (users[key].id.toString() === req.params.id) {
                users.splice(key, 1);
                res.status(200).json(users);
            }
        }
    }
    else { res.status(404).json("ERROR"); }
};


module.exports = {
    getUsers,
    getUserById,
    getAdmins,
    getNonAdmins,
    getUsersByType,
    updateUser,
    addUser,
    removeUser
};