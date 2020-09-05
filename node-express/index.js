const express = require('express')
const app = express()
const port = 3000

app.get('/',(req, res) => res.send('hello world by Express!'))

app.listen(port, ()=> console.log('hello paladino at port 3000!'))