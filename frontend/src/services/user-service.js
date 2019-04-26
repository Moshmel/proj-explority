import axios from 'axios';
import storageService from './storageService.js'
const userKey = "userSession"
// import socketIo from 'socket.io'
// var socket  = socketIo.listen();
export default {
    query,
    getById, checkLogin,
    add,
     update,
    // getEmpty
}

const BASE_URL = 'http://localhost:3003';

const resolveData = res => res.data;
var myUser = { "username": "Themsssssssssikl", "password": "123", "userActivities": [{ "favorited": [] }, { "attended": [] }], "isAdmin": false, "birthDate": "", "email": "trassssl@gmail.com" };

function add(user) {
    user.userActivities = [{ "favorited": [] }, { "attended": [] }];
    user.isAdmin = false;
    user.birthDate = "";
    return axios.post('http://127.0.0.1:3003/user/registeruser', user)
        .then((user) => {
            console.log('user return frontend service', user)
            return user;
        })
}
function checkLogin(userCredentials) {
    return axios.post('http://127.0.0.1:3003/user/login',
        userCredentials).then((user) => {
            return user.data;
        });
}
function query() {
    return axios.get('http://127.0.0.1:3003/user')
        .then((res) => {
            return res.data
        })
}

function getById(activityId) {
    return axios.get(`${BASE_URL}/${activityId}`)
        .then(resolveData);
}

function update(user){
    console.log('update frontend')
    console.log('user that goted!!',user)
    return axios.post(`${BASE_URL}/user/update`, user)
    .then((res) => {
        console.log('user return frontend service', res)
        return res;
    })
}

