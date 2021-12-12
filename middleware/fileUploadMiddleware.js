const multer = require('multer');

// multer middleware
let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/uploads');
  },
  filename : function(req, file, cb){
    cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname);
  },
})

let upload = multer({
  storage : storage
}).single('image');

module.exports = upload;