const path = require('path')
const express = require ('express')
const hbs = require ('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handlebar engine and views location.
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//setup static directory to serve.
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        owner: 'Ibrahim'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help page',
        message: 'This should be the help message!',
        owner: 'Ibrahim'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About page',
        owner: 'Ibrahim'
    })
})


app.get('/weather',(req, res)=>{
    if(!req.query.address){
       return res.send({
            error: 'you must provide address query!'
        })
    }
    geocode(req.query.address,(error,{latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude,(error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({  
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
   
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title: '404',
        owner: 'Ibrahim',
        errorMessage: 'Help article not found!'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        owner: 'Ibrahim',
        errorMessage: 'Pages Not Found!'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000!')
})