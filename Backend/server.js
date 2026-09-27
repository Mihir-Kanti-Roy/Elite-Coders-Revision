const express = require("express")
const app = express()
const path = require("path")

app.use(express.json())

app.get("/landing", function(request, response){
    response.sendFile(path.join(__dirname, "..", "Frontend", "dashboard.html"))
})

app.get("/", function(request, response){
    response.sendFile(path.join(__dirname, "..", "Frontend", "index.html"))
})

app.listen(8000, function(){
    console.log("server has started")
})