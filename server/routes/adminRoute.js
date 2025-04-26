const express = require("express")
const router = express.Router()
const controller = require('../controllers/adminController')
const adminmiddleware = require("../Middelware/Adminmiddelware")

router.route('/adminRegistration').post(controller.adminRegistration)
router.route('/adminLogin').post(controller.adminLogin)
router.route('/adminData').get(adminmiddleware,controller.adminData)

module.exports = router