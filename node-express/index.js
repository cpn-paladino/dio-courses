//add express lib
const express = require('express')

//instantiate an userRoute
const userRoute = require('./routes/userRoute')

//instantiate an app from express
const app = express()

//set port
const port = 3000

//add bodyParser in app to decode POST
app.use(express.urlencoded({ extend: true}))
app.use(express.json());

//add app in routes to redirect results
userRoute(app)

//pass a response when the page is acessed
app.get('/',(req, res) => res.send('hello world by Express!'))

//pass a function when the port is accessed
app.listen(port, ()=> console.log('hello paladino at port 3000!'))