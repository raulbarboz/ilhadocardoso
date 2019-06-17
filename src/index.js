const express = require('express');
const app = express();
const ejs = require('ejs');

const port = process.env.PORT || 3000;
const hostname = process.env.HOST || 'localhost';

app.use(express.static('public'))
app.set('view engine', 'ejs');

app.get('/maruja', (req, res) => {
    res.render('comunidades')
})

app.listen(port, hostname, () => {
    console.log(`App running on port ${port}`)
})