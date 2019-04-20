const userService = require('../services/user-service')
const reviewService = require('../services/review-service')
const BASE = '/user'

function addRoutes(app) {
    app.post(`${BASE}/registeruser`, (req, res) => {

        const user = req.body;
        userService.addUser(user)
            .then((user) => {
                req.session.loggedInUser = user;
                res.json(user)
            })
            .catch(err => {
                res.status(500).send('Wrong user details')
            })
    }),
    app.get(BASE, (req, res) => {
        userService.query()
            .then((users) => {
                res.json(users)
            })
    })
    app.post(`${BASE}/login`, (req, res) => {
        const userCredentials = req.body;
        userService.checkLogin(userCredentials)
            .then((user) => {
                req.session.loggedInUser = user;
                res.json(user)
            })
            .catch(err => {
                res.status(500).send('Wrong Credentials')
            })
    }),

        app.get(`${BASE}/:id`, (req, res) => {
            const userId = req.params.id
            userService.getById(userId)
                .then((user) => {
                    res.json(user)
                })
                .catch(() => { return Promise.reject() })
        })

    app.post('/singup', (req, res) => {
        const nickname = req.body.nickname
        userService.addUser({ nickname })
            .then(user => res.json(user))
    })

    app.put('/login', (req, res) => {
        const nickname = req.body.nickname
        userService.checkLogin({ nickname })
            .then(user => {
                req.session.user = user
                res.json(user)
            })
    })

}


module.exports = addRoutes;