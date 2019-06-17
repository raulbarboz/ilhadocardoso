const express = require('express');
const app = express();
const ejs = require('ejs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const hostname = process.env.HOST || 'localhost';

app.use(express.static('public'))
app.set('view engine', 'ejs');

let url, data = null;

app.use((req, res, next) => {
    url = req.url;
    const rawData = fs.readFileSync('./src/data.json');
    data = JSON.parse(rawData)
    if (url.substr(-1) === '/'){
        url = url.substring(0, url.length -1);
    }
    next()
})

app.get('/', (req, res) => {
    res.render('index')
})

/*
app.get('/maruja', (req, res) => {
    res.render('comunidades', {url:url})
})

app.get('/baleia', (req, res) => {
    res.render('comunidades', {url:url})
})
 
app.get('/maruja/praias', (req, res) => {
    console.log(data["comunidades"]["maruja"]["praias"])
    
    res.render('praias', {url : '/maruja', data: data["comunidades"]["maruja"]["praias"]})
})
*/

app.get('/' + ':comunity' + '/' + ':name', function(req, res){
    var {name, comunity} = req.params;
    res.render(`comunidades`, {url : `/${comunity}`, data: data["comunidades"][`${comunity}`][`${name}`]})
});

app.listen(port, hostname, () => {
    console.log(`App running on port ${port}`)
})