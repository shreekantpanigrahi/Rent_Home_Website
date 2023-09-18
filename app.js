const express = require('express');
const path = require('path');
const app = express();

// app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})