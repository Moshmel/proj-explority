const mongoService = require('./mongo-service')
const ObjectId = require('mongodb').ObjectId;

function query() {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('activity');
            return collection.find({}).toArray()
        })
}

function remove(activityId) {
    activityId = new ObjectId(activityId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('activity');
            return collection.remove({ _id: activityId })
        })
}
function getById(activityId) {
    activityId = new ObjectId(activityId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('activity');
            return collection.findOne({ _id: activityId })
        })
}
function getByGoogleId(googleId) {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('activity');
            collection.find({}).toArray().then(res => {
    
            })
            return collection.findOne({ googleId })
        })
}
function add(activity) {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('activity');
            return collection.insertOne(activity)
                .then(result => {
                    activity._id = result.insertedId;
                    return activity;
                })
        })
}

function update(activity) {
    activity._id = new ObjectId(activity._id)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('activity');
            return collection.updateOne({ _id: activity._id }, { $set: activity })
                .then(result => {
                    return activity;
                })
        })
}

module.exports = {
    query,
    remove,
    getById,
    add,
    update,
    getByGoogleId
}

