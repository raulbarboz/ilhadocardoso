const express = require('express');
const app = express();
const ejs = require('ejs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const hostname = process.env.HOST || 'localhost';

app.use(express.static('public'))
app.set('view engine', 'ejs');

let data = null;


app.use((req, res, next) => {
    const rawData = fs.readFileSync('./src/data.json');
    data = JSON.parse(rawData)
    next()
})

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/:comunity', (req, res) => {
    const { comunity } = req.params;
    res.render(`comunidades`, {url: `/${comunity}`});
})

app.get('/' + ':comunity' + '/' + ':name', (req, res) => {
    var {name, comunity} = req.params;
    let newData = null
    try{
        newData = data["comunidades"][`${comunity}`][`${name}`]
    }catch(error){
        res.render('error')
    }
    res.render(`comunidades`, {url : `/${comunity}`, data: newData})
});


app.listen(port, () => {
    console.log(`App running on port ${port}`)
})