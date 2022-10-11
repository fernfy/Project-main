//เพิ่มโฟล์เดอร์ authen เพิ่มไฟล์ isAuthenController.js และโค้ด
const passport = require('passport') 

module.exports = function (req, res, next) { //สร้าง module function ขึ้นมา , next ตรวจสอบดูว่าถูกรึป่าว

    passport.authenticate('user','jwt', function (err, user) {
        if (err || !user) {
            res.status(403).send({
                error: 'you do not have access to this resource'
            })
        } else {
            req.user = user 
            next()
        }
    }) (req, res, next)
}