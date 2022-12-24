require('dotenv').config()
let bodyParser = require('body-parse')
let express = require('express');
let app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/public", express.static(__dirname + '/public'))

app.use("/", (req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.ip)
    next()
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})

app.get("/json", (req, res) => {

    message = "Hello json"

    if(process.env.MESSAGE_STYLE == "uppercase")
        message = message.toUpperCase()

    res.json( { "message" : message} ) 
})

app.get("/now", (req, res, next) => {
    req.time = new Date().toString()
    next()
}, (req, res) => {
    res.json({ "time" : req.time })
})

app.get("/:word/echo", (req, res, next) => {
    res.json({"echo": req.params.word})
})

app.route("/name").get((req, res, next) => {
    first = req.query.first
    last = req.query.last

    res.json({"name" : first + " " + last})
})
























 module.exports = app;
