const multer = require('multer');
const path = require('path')


// Configure storage for multer
const storage = multer.diskStorage({

    filename: function (req,file,cb){
        cb(null, Date.now() + '_' + path.extname(file.originalname))
    }

})

  
const upload = multer({ storage: storage });

module.exports = upload;