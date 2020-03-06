"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const artistCtrl = require("../controllers/ArtistController");
const loginCtrl = require("../controllers/LoginController");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname, "public")));

router.get("/", loginCtrl.init);

router.post("/login", loginCtrl.login);

router.get("/artists", artistCtrl.getArtists);

router.post("/artists/add", artistCtrl.addArtist);

router.use("/artists/delete/:id", artistCtrl.deleteArtist);

module.exports = router;
