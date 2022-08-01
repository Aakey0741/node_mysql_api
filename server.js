const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

dotenv.config()

// Import Routes
const employee = require('./routes/employee')


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/v1', employee)

const PORT = process.env.API_PORT || 3000
app.listen(PORT, () => {
     console.log(`Running App on PORT - ${PORT}`)
})