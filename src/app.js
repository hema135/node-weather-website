const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs')
const geocode = require('./utlis/geocode');
const forecast = require('./utlis/forecast');

// Define Path for express config
const publicPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partial')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath)
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicPath))
 

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Hema Rana"
    });
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Hema Rana"
    }

    )
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: "Help",
        message: "This is a dynamic message sent from app file to help page.",
        name: "Hema Rana"
    })
})

// passing Objects
app.get('/weather', (req, res) => {
    // console.log(req.query.address)
    if(!req.query.address){
        return res.send({
            error: "No address found"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
        return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
            return res.send({ error})
        }
            // console.log('Data', forecastdata)
            res.send({
                description: forecastdata,
                address: location
        
            });
            })
        })
    
})


app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        errorMessage: "No help article found",
        name: "Hema Rana"
    })
})

// * Wild card character
app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: "My 404 Page",
        name: "Hema Rana"
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000');
})



// passing Array object
// app.get('/help', (req, res) => { 
//     res.send([
//         {
//         name: "hema"
//     },{
//         name: "prachi"
//     }
// ]);
// })

// app.get('/about', (req, res) => {
//     res.send("<h1>About Page</h1>");
// })
