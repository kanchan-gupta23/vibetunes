const express = require("express")
const router = express.Router()
const controller = require("../controllers/musicController")
const multer = require('../Middelware/multer')
const  adminmiddleware = require("../Middelware/Adminmiddelware")
const usermiddleware = require("../Middelware/Usermiddelware")

router.route("/createMusic").post(adminmiddleware,multer.single("audio"),controller.createMusic)
router.route("/AllMusic").get(adminmiddleware,controller.music)

router.route("/getMusicQuery").get(usermiddleware,controller.getMusicQuery)
router.route("/getMusicPrams/:genre").get(usermiddleware,controller.getMusicParams)
router.route("/actions").put(usermiddleware,controller.getAction )
router.route("/delete/:id").delete(adminmiddleware,controller.deleteSong )
router.route("/getSongById/:id").get(adminmiddleware,controller.getSongById )
router.route("/updateSongById/:id").put(adminmiddleware,multer.single("audio"),controller.updateSongById  )

module.exports = router
