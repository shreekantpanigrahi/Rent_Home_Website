const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const HouseListing = require('./models/HouseListing');
const port = process.env.PORT || 3000;
require('dotenv').config();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
mongoose.connect(process.env.MONGODB_URI)
app.use(express.static(path.join(__dirname, 'public')));

  app.get('/', async (req, res) => {
    let houselistings = [];
    if (req.query.location) {
      try {
        houselistings = await HouseListing.find({ $text : { $search: req.query.location}});
        console.log('Found listings:', houselistings); // Add this line for debugging
      } catch (error) {
        if (!res.headersSent) {
          console.error('Error', error);
          res.status(500).send('Server Error');
        }
      }
    }
    if (!res.headersSent) {
      res.render('index', { houselistings: houselistings });
    }
  });
  

  app.get('/login', (req,res) => {
    res.render('login');
  })

  app.get('/signup', (req,res) => {
    res.render('signup');
  })
app.listen(port)