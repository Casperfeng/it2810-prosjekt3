const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

app.use(bodyParser.json());

// Import routes
const pokemonRoute = require('./routes/pokemon');

app.use('/pokemon', pokemonRoute);


// Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION, 
    { useUnifiedTopology: true, useNewUrlParser: true }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to db");
});

// Listen to server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));