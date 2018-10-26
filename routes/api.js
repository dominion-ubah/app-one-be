const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const fs = require('fs')
const multer = require('multer')
const Apartment = require('../models/Apartment')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/apartments')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() +'.'+ file.mimetype.split('/')[1])
    }
  })
  const baseUrl = 'http://localhost:2500/'

  var upload = multer({ storage: storage })


// Get ninjas from db
router.get('/apartments', (req, res, next) => {

    console.log('the request:',req.query)
    let query = {}
    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    if(req.query.location ) {
        query.location =req.query.location
    }
    if (req.query.propertyType) {
        query.propertyType = req.query.propertyType
    }
    if(req.query.budget) {
        query.budget =req.query.budget
    }
    
    console.log('the request:',req.query)
    if (isEmpty(query)) {
        console.log('no query')
        Apartment.find()
        .limit(12)
        .then((apartment) => {
            res.status(200).send({apartment})
        })
    } else {
        console.log('query available', query)
        // let apartment = new Apartment();
        Apartment.find(query)
        // .limit(12)
        .then((apartment) => {
            // console.log('res from get :',res)
            res.status(200).send({apartment})
        })
        // Apartment.find((apartment) => {
            // })
            // res.send({type:'Get'})
            } 
        })
// Post new ninja to db

router.post('/profile', upload.single('avatar'), function (req, res, next) {
    req.body.imgpath = baseUrl + req.file.path
    console.log('new post',req.file, req.body)
    let fil =req.file, bd = req.body, desc = {desc:'from pic upload'}
    // res.send({ desc, fil, bd})
    Apartment.create(req.body)
    .then((apartment)=> {
        res.status(200).send({apartment})
    })
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
})




router.post('/add', (req, res, next) => {
        // req.file is the `avatar` file
        // req.body will hold the text fields, if there were any
        console.log('new post',req.file, req.body)
        req.body.imgpath = req.file.path
        if(req.body.imgpath) {
            let fil =req.file, bd = req.body, desc = {desc:'from pic upload'}
            res.send({ desc, fil, bd})
        } else {
            res.send({nul:null})
        }

 
    

    
    // console.log(req.body) 
    // res.send({type:'Post', name: req.body.name, belt: req.body.belt})
})
// Update a ninja in db
router.put('/edit/:id', (req, res, next) => {
    res.send({type:'Put'})
})
// Delete a ninja from db
router.delete('/delete/:id', (req, res, next) => {
    res.send({type:'Delete'})
})


module.exports = router;