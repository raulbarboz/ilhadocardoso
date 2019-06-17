const express = require('express');
const app = express();
const ejs = require('ejs');

const port = process.env.PORT || 3000;
const hostname = process.env.HOST || 'localhost';

app.use(express.static('public'))
app.set('view engine', 'ejs');

let url = null;

app.use((req, res, next) => {
    url = req.url;
    if (url.substr(-1) === '/'){
        url = url.substring(0, url.length -1);
    }
    next()
})

app.get('/maruja', (req, res) => {
    res.render('comunidades', {url:url})
})

app.get('/maruja/praias', (req, res) => {
    res.render('praias', {url : '/maruja'})
})

app.listen(port, hostname, () => {
    console.log(`App running on port ${port}`)
})