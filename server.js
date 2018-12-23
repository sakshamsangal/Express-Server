const express = require('express')
const bodyParser = require('body-parser')
const api = require('./routes/api')
const app = express()
const cors = require('cors')


app.use(cors())
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', api);


app.get('/', (req, res) => {
    res.send("Express Server")
})

app.listen(3000, () => {
    console.log("Express Server")
})