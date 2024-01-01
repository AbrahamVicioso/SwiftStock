import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req,res,cb){
        cb(null,'uploads/articles');
    },
    filename: function(req,file,cb){
        cb(null,`${Date.now()}.${file.originalname.split('.').reverse()[0]}`)
    }
});

const upload = multer({storage : storage});

export default upload;