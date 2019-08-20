const express = require('express');
const app = express();
const ejs = require('ejs');
const fs = require('fs');

const port = process.env.PORT || 3000;
//const hostname = process.env.HOST || 'localhost';

app.use(express.static('public'))
app.set('view engine', 'ejs');

let data = null;


app.use((req, res, next) => {
    const rawData = fs.readFileSync('./src/data.json');
    data = JSON.parse(rawData)
    next()
})

app.get('/', (req, res) => {
    let newData = null
    try{
        newData = data["home"]["images"]
    }catch(error){
        res.render('error')
    }

    res.render('index', {data: newData})
})

app.get('/:comunity', (req, res) => {
    const { comunity } = req.params;
    res.render(`comunidades`, {url: `/${comunity}`});
})

app.get('/' + ':comunity' + '/' + ':name', (req, res) => {
    var { search } =  req.query;
    
    var {name, comunity} = req.params;
    let newData = null
    try{
        newData = data["comunidades"][`${comunity}`][`${name}`]
       
        if(search){
            newData = newData.filter((d) => {
               return d.titulo.toLowerCase().includes(search)
            })
        }
        
    }catch(error){
        res.render('error')
    }
    res.render(`comunidades`, {url : `/${comunity}`, data: newData, search : search})
});


app.listen(port, () => {
    console.log(`App running on port ${port}`)
})