const controller = require('../controllers/userController')
const express = require("express")
const router = express.Router()
const authmiddleware = require("../Middelware/Usermiddelware")

router.route("/user").post(controller.userRegistration)
router.route("/userLogin").post(controller.userLogin)
router.route("/userData").get(authmiddleware,controller.getUser)

module.exports= router