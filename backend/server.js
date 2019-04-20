const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')


const addActivityRoutes = require('./routes/activity-route')
const addReviewRoutes = require('./routes/review-route')
const addUserRoutes = require('./routes/user-route')
const app = express()



app.use(cors({
  origin: ['http://localhost:8080', 'http://127.0.0.1:8080'],
  credentials: true // enable set cookie
}));
app.use(bodyParser.json())
app.use(cookieParser());
app.use(session({
  secret: 'puki muki',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})



const PORT = process.env.PORT || 3003;
const server = app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))
const io = require('socket.io')(server);

io.on('connection', socket => {
	console.log('coooonet', socket.id);
	socket.on('booked', ({booked}) => {
    
    socket.broadcast.emit('someonebooked')
});
socket.emit('fromserver',{data:'talallaa manyuk'})
});
addActivityRoutes(app)
addReviewRoutes(app)
addUserRoutes(app)


