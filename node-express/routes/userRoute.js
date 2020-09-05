//add lib for files
const fs = require('fs')

//add lib for paths
const { join } = require('path')

//get current path
const filePath = join(__dirname, 'user.json')

//get all users by file in server
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

//method for save the users list in a file
const saveUser = (users) => fs.writeFileSync(filePath, JSON.stringify(users))

//set the routes for crud users
const userRoute = (app) => {    
    app.route('/users/:id?')
        //list of users
        .get((req, res) => {
            const users = getUsers()
            res.send({ users })
        })
        //insert user        
        .post((req, res)=>{
            const users = getUsers()            
            users.push(req.body)            
            saveUser(users)
            res.status(201).send('OK')
        })
        //update user
        .put((req, res)=>{
            const users = getUsers()
            saveUser(users.map(
                user => {
                    if (user.id === req.params.id){
                        return{
                            ...user,
                            ...req.body
                        }
                    }
                    return user
                }
            ))
            res.status(200).send('OK')
        })
        //delete user
        .delete((req,res)=>{
            const users = getUsers()
            saveUser(users.filter(
                user => user.id !== req.params.id                
            ))
            res.status(200).send('OK')
        })
}

//publish your userRoute
module.exports = userRoute