const multer = require("multer");

const fileStorageEngine = multer.diskStorage({
     destination: (req, file, cb) => {
          cb(null, "./avatar")
     },
     filename: (req, file, cb) => {
          let extension = '';
          if(file.mimetype === 'image/png'){
               extension = 'png'
          }
          if(file.mimetype === 'image/jpeg'){
               extension = 'jpg'
          }
          cb(null, `${Date.now()}_avatar.${extension}`)
     },
})
module.exports = { fileStorageEngine }