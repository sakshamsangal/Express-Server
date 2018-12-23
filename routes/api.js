const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const model = require('../model/schema')
const jwt = require('jsonwebtoken')
const db = 'mongodb://localhost:27017/database1'


mongoose.set('useFindAndModify', false);
mongoose.connect(db, {
    useNewUrlParser: true
}, (err) => {
    if(err) throw err;
    console.log('mongodb connected')
})

router.post('/post', (req, res) => {
    x = req.body
    x = new model(x)
    x.save((err, data) => {
        if(err) throw err;
        payload = {
            "subject": data._id
        }
        token = jwt.sign(payload, 'secretKey')
        res.json({token})
    })
})

router.get('/get', (req, res) => {
    model.find({}).exec((err, data) => {
        if(err) throw err;
        res.json(data)
    })
})

router.put('/put/:id', (req, res) => {
    setData = {
        $set: {
            "email": req.body.email,
            "password": req.body.password
        }
    }
    newObj = {
        new: true
    }
    model.findOneAndUpdate(req.params.id, setData, newObj, (err, data) => {
        if(err) throw err;
        payload = {
            "subject": data._id
        }
        token = jwt.sign(payload, 'secretKey')
        res.json({token})
    })
})

router.delete('/delete/:id', (req, res) => {
    model.findOneAndDelete(req.params.id, (err, data) => {
        if(err) throw err;
        payload = {
            "subject": data._id
        }
        token = jwt.sign(payload, 'secretKey')
        res.json({token})
    })
})

module.exports = router