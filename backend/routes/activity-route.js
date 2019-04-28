const activityService = require('../services/activity-service')
const reviewService = require('../services/review-service.js')


function addActivityRoutes(app) {
    // CARS REST API:

    // LIST
    app.get('/activity', (req, res) => {
        if (req.query.activity) {
            var activity = JSON.parse(req.query.activity)
           return activityService.getByGoogleId(activity.googleId).then(response => {
                if (!response) activityService.add(activity).then(response => {
                    res.json(response)
                })
                else return res.json(response)
            })
        } else
            activityService.query()
                .then(activitys => res.json(activitys))

    })

    // SINGLE - GET Full details including reviews
    app.get('/activity/:activityId', (req, res) => {
        const activityId = req.params.activityId;
        Promise.all([
            activityService.getById(activityId),
            reviewService.query({ activityId })
        ])
            .then(([activity, reviews]) => {
                res.json({
                    activity, reviews
                })
            })
    })

    // DELETE
    app.delete('/activity/:activityId', (req, res) => {
        const activityId = req.params.activityId;
        activityService.remove(activityId)
            .then(() => res.end(`Activity ${activityId} Deleted `))
    })

    // CREATE
    app.post('/activity', (req, res) => {
        const activity = req.body;
        activityService.add(activity)
            .then(activity => {
                res.json(activity)
            })
    })

    // UPDATE
    app.put('/activity/:activityId', (req, res) => {
        const activity = req.body;
        activityService.update(activity)
            .then(activity => res.json(activity))
    })

}


module.exports = addActivityRoutes;