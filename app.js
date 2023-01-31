const express = require("express")
const app = express()
const path = require("path")
const fetch = require("node-fetch")
const {response} = require("express");

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.json())
app.use(express.urlencoded({extended : true}))

const key = "b9b27e0c6774d5bc94269cbec554bdbe"
let city = "Tartu"

app.get("/", (req, res) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            let description = data.weather[0].description
            let city = data.name
            let temp = Math.round(parseFloat(data.main.temp) - 273.15)

            res.render("index", {
                description: description,
                city: city,
                temp: temp,
            })
        })
})


app.post('/', function (req, res){
    let city = req.body.cityname
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`).then((response) => {
        return response.json()
    })
        .then((data) => {
            let description = data.weather[0].description
            let city = data.name
            let temp = Math.round(parseFloat(data.main.temp) - 273.15)
            res.render('index', {
                description: description,
                city: city,
                temp: temp
            })
        })
})

app.listen(3005)