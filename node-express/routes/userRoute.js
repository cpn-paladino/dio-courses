//work with files
const fs = require('fs')
//work with files
const { join } = require('path')

const filePath = join(__dirname, 'user.json')

const getUsers = () => {
    const data = fs.existsSync(filePath)
        ? fs.readFileSync(filePath)
        : []

    try{
        return JSON.parse(data)
    } catch (error){
        return []
    }    
}

const saveUser = (users) => fs.writeFileSync(filePath, JSON.stringify(users))

const userRoute = (app) => {
    
    app.route('/users/:id?')
        .get((req, res) => {
            const users = getUsers()
            res.send({ users })
        })
        .post((req, res)=>{
            const users = getUsers()
            console.log(req)
            console.log(req.body)
            users.push(req.body)
            console.log(users)
            saveUser(users)
            res.status(201).send('OK')
        })
}

module.exports = userRoute