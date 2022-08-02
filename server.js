const express = require('express')
var cors = require('cors')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
var multer = require('multer');
var upload = multer();

app.use(cors())
dotenv.config()

// Import Routes
const employee = require('./routes/employee')

app.use(bodyParser.json())
app.use(upload.array())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/v1', employee)

const PORT = process.env.API_PORT || 3000
app.listen(PORT, () => {
     console.log(`Running App on PORT - ${PORT}`)
})




