const AppError = require("./appError")
const multer = require("multer")
const multerStorage = (entity) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            //the first argument is err if not then it's null
            cb(null, `${publicFolder}/${entity}s`)
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split("/")[1]
            cb(null, `${entity}-${file.originalname}`)
        }
    });
}
const publicFolder = "public/img"
//multer will only accepts image 
//using mimetype image/imageExtension
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image"))
        cb(null, true)
    else
        cb(new AppError("Not an image, please upload only Images", 400), false)
}

const uploadUserImageConfiguration = multer({
    storage: multerStorage("user"),
    fileFilter: multerFilter
})

const uploadBranchImageConfiguration = multer({
    storage: multerStorage("branch"),
    fileFilter: multerFilter
})


const uploadProductImageConfiguration = multer({
    storage: multerStorage("product"),
    fileFilter: multerFilter
})

const uploadUserImage = uploadUserImageConfiguration.single("image")
const uploadBranchImage = uploadBranchImageConfiguration.single("image")
const uploadProductImage = uploadProductImageConfiguration.single("image")

module.exports = {
    uploadUserImage,
    uploadProductImage
}