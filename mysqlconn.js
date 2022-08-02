const mysql = require('mysql')

const connection = mysql.createConnection( {
     host : process.env.HOST,
     port : process.env.PORT,
     user: process.env.USER,
     password: process.env.PASSWORD
})

connection.connect( function (err) {
     if (err) {
          console.log('Error occured white connecting...!')
     } else {
          console.log('Connection created with Mysql Successfully...!')
     }
})

// console.log( { host : process.env.HOST, port : process.env.PORT, user: process.env.USER, password: process.env.PASSWORD })

module.exports = { connection }