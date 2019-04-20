const mongoService = require('./mongo-service')

const ObjectId = require('mongodb').ObjectId;


// function checkLogin({ nickname }) {
//     return mongoService.connect()
//         .then(db => db.collection('user').findOne({ nickname }))
// }


function getById(id) {
    var _id = new ObjectId(id)
    return mongoService.connect()
        .then((db) => {
            const collection = db.collection('user');
            return collection.findOne({ _id })
        })
}


function checkLogin(userCredentials) {
    return mongoService.connect()
        .then((db) => {
            const collection = db.collection('user');
            return collection.findOne({
                $and: [{ "username": userCredentials.username },
                { "password": userCredentials.password }]
            })
                .then(user => {
                    if (user) {
                        var userToreturn = { ...user };
                        return userToreturn;
                    }
                    else {
                        console.log('about to send an error')
                        return Promise.reject(new Error("bad usernameor password"))
                    }
                })
        })
}
function query() {
    return mongoService.connect()
        .then(db => db.collection('user').find({}).toArray())
}

function addUser(user) {
    return mongoService.connect()
        .then(db => db.collection('user').insertOne(user))
        .then(res => {
            user._id = res._id
            return user;
        })

}


// // todo  - add user only if nickname is not taken
// function addUser({ nickname }) {
//     var user = { nickname }
//     return mongoService.connect()
//         .then(db => db.collection('user').insertOne(user))
//         .then(res => {
//             user._id = res.insertedId
//             return user
//         })
// }







module.exports = {
    query,
    getById,
    checkLogin,
    addUser,
    // checkLogin
}


