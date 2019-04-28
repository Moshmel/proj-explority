import UtilService from './utilService.js';
import StorageService from './storageService.js';
import axios from 'axios';

export default {
    query,
    getById,
    remove,
    add,
    update,
    getByGoogleId,
}

const BASE_URL = (process.env.NODE_ENV !== 'development')
 ? ''
 : 'http://127.0.0.1:3003';

const resolveData = res => res.data;

// const EXPLORITY_KEY = 'kerama';

function query() {
    return axios.get(`${BASE_URL}/activity`)
        .then((res) => {
            return res.data
        })
}

function getById(activityId) {
    return axios.get(`${BASE_URL}/activity/${activityId}`)
        .then((res)=>{return res.data

    });
}
function getByGoogleId(activity) {
    return axios.get(`${BASE_URL}/activity/`, { params: { activity: activity } })
        .then(res => {
            console.log('from base if not exist',res.data)
            if (!res.data) {
                console.log('adding new activity to database')
                add(activity)
            }
            else return res.data
        })
}

function remove(activityId) {
    return axios.delete(`${BASE_URL}/${activityId}`)
        .then(resolveData);
}

function add(activity) {
    // console.log(activity);
    return axios.post(`${BASE_URL}/activity`, activity)
        .then(resolveData);
}

function update(activity) {
    console.log('Service:', activity);
    return axios.put(`${BASE_URL}/activity/${activity._id}`, activity).then(resolveData);
}

