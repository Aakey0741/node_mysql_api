const appRoute = require('express').Router()
const jwt = require('jsonwebtoken')
const multer  = require('multer')
const upload = multer()
const { find_all, find_one, create_data, delete_data, update_data } = require('../curd_oprations/crudOptions')

// Import Routes
const profile = require('./profile')

appRoute.get('/employees', async (req, res) => {
     try {

          let params = {
               database: 'emp_db',
               tableName: 'emp_login',
               select: "*"
          }

          let response = await find_all(params)
          
          return res.json(response)
          
     } catch (errors) {
          return res.json({
               status: 0,
               message: `Unable to fatch data...!`,
               error: `Server error - ${errors}`
          })
     }
})

appRoute.post('/employee', upload.array(), async (req, res) => {
     try {

          const { id } = req.body

          let params = {
               database: 'emp_db',
               tableName: 'emp_login',
               select: "*",
               where: `WHERE _id = '${id}'`
          }

          let jwtSecretKey = process.env.JWT_SECRET_KEY;
          let data = {
               // exp: Math.floor(Date.now() / 1000) + (60 * 60),
               sub: id,
               name: 'default'
          }

          const token = jwt.sign(data, jwtSecretKey, { expiresIn: '1m' });
          
          let response = await find_one(params, token)
          
          return res.json(response)
          
     } catch (errors) {
          return res.json({
               status: 0,
               message: `Unable to fatch data...!`,
               error: `Server error - ${errors}`
          })
     }
})

appRoute.post('/employee/create', async (req, res) => {
     try {

          const { first_name, last_name, email, password, username } = req.body

          let params = {
               database: 'emp_db',
               tableName: 'emp_login',
               select: "*",
               where: `WHERE emp_username = '${username}'`,
               insert_column_name: '(emp_first_name, emp_last_name, emp_email, emp_password, emp_username)',
               insert_column_value: `('${first_name}', '${last_name}', '${email}', '${password}', '${username}')`
          }

          let response = await create_data(params)

          return res.json(response)

     } catch (errors) {
          return res.json({
               status: 0,
               message: `Unable to create employee...!`,
               error: `Server error - ${errors}`
          })
     }
})

appRoute.post('/employee/update', async (req, res) => {
     try {

          const { id, first_name, last_name, email, username } = req.body

          // let queryStr = ''
          // let objKeys = Object.keys(req.body);
          // for(let i = 0; i < objKeys.length; i++){
          //      if(req.body[objKeys[i]]){
          //           queryStr += 'emp_'+objKeys[i]+' = "'+req.body[objKeys[i]]+'"'
          //           if(i < objKeys.length-1){
          //                queryStr += ", "
          //           }
          //      }
          // }
          
          let getUserParams = {
               database: 'emp_db',
               tableName: 'emp_login',
               select: "*",
               where: `WHERE _id = '${id}'`
          }

          let getUser = await find_one(getUserParams)
          
          let params = {
               database: 'emp_db',
               tableName: 'emp_login',
               select: '*',
               where: `WHERE _id = '${id}'`,
               update_column_with_values: `emp_first_name ='${first_name ? first_name : getUser.data[0].emp_first_name}', emp_last_name ='${last_name ? last_name : getUser.data[0].emp_last_name}', emp_email ='${email ? email : getUser.data[0].emp_email}'`
          }
          
          let response = await update_data(params)

          return res.json(response)

     } catch (errors) {
          return res.json({
               status: 0,
               message: `Unable to update details.`,
               error: `Server error - ${errors}`
          })
     }
})

appRoute.post('/employee/delete', async (req, res) => {
     try {

          const { id } = req.body

          let params = {
               database: 'emp_db',
               tableName: 'emp_login',
               select: "*",
               where: `WHERE _id = '${id}'`
          }

          let response = await delete_data(params)

          return res.json(response)

     } catch (errors) {
          return res.json({
               status: 0,
               message: `Unable to create employee...!`,
               error: `Server error - ${errors}`
          })
     }
})

appRoute.use('/employee/profile', profile)

module.exports = appRoute