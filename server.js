// Import || Require Dependencies
const express = require('express')
const  fs = require('fs')
const bodyParser = require('body-parser')
const multer = require('multer')
const cors = require('cors')
const routes = require('./routes/api')
const mongoose = require('mongoose')

// var storage = multer.diskStorage({
    //     destination: function (req, file, cb) {
        //       cb(null, 'uploads/apartments')
        //     },
        //     filename: function (req, file, cb) {
            //       cb(null, file.fieldname + '-' + Date.now())
            //     }
            //   })
            
            //   var upload = multer({ storage: storage })
            
            // var upload = multer({ dest: 'uploads/apartments' })
            // let __dirname = 'public/' 
            // Set up express app
            const app = express();
            
            // connect to mongodb using mongoose
            mongoose.connect("mongodb://localhost:27017/diapartments",
            // { useNewUrlParser: true },
            (err, db) => {
                if (err) {
                    console.log('Error occured:',err)
                }else {
                    console.log('Db is connected')
                }
            })
            
            mongoose.Promise = global.Promise
            
            
//::::::::::: Middlewares ::::::::::::
app.use(express.static('public'));
// Use Cors Handler
app.use(cors())



// Use Body Parser 
app.use(bodyParser.json())


// Use Routes From Api
app.use('/api', routes)

// 
// app.post('/profile', upload.single('avatar'), function (req, res, next) {
//     // req.file is the `avatar` file
//     // req.body will hold the text fields, if there were any
//     console.log('new post',req.file, req.body)
//     let fil =req.file, bd = req.body, desc = {desc:'from pic upload'}
//     res.send({ desc, fil, bd})
//   })




// app.get('/', (req, res, next) => {
//     res.status(200).send({text:'hello world'})
// })

// listen for requests
const PORT = 2500;

app.listen(process.env.port || PORT, () => {
    console.log(`server running on ${PORT}`)
})