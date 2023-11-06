const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const HouseListing = require('./models/HouseListing');
const filter = require('./searchFilter');
const port = process.env.PORT || 3000;
require('dotenv').config();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch(err) { 
    console.error(err.message);
    process.exit(1);
  }
};
connectDB();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', filter);

app.get('/', async (req, res) => {
    let houselistings = [];
    if (req.query.location) {
      try {
        houselistings = await HouseListing.find({ $text : { $search: req.query.location}});
        console.log('Found listings:', houselistings); // Add this line for debugging
        res.json(houselistings);
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