const express = require("express")
const app = express()
const path = require("path")
const fs = require("fs")
const bcrypt = require("bcryptjs")
const userDatabase = "../Database/users.json"

app.use(express.json())

app.get("/landing", function(request, response){
    response.sendFile(path.join(__dirname, "..", "Frontend", "dashboard.html"))
})

app.get("/", function(request, response){
    response.sendFile(path.join(__dirname, "..", "Frontend", "index.html"))
})

app.post("/createAccount", function(request, response){
    var fullName = request.body.fullName
    var email = request.body.email
    var password = request.body.password
    var userFile = fs.readFileSync(userDatabase,"utf-8")
    var userFileArray = JSON.parse(userFile)
    var exists = false
    for(i=0;i<userFileArray.length;i++){
        if(userFileArray[i].email == email){
            exists = true
            break
        }
    }
    if(exists == false){
        var hashedPassword = bcrypt.hashSync(password, 10)
        var userObject = {
            "name" : fullName,
            "email" : email,
            "password" : hashedPassword
        }
        userFileArray.push(userObject)
        fs.writeFileSync(userDatabase, JSON.stringify(userFileArray))
        response.send("Success")
    }
    else{
        response.send("Email already exists")
    }
})

app.listen(8000, function(){
    console.log("server has started")
})