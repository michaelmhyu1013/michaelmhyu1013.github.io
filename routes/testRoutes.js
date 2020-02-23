"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const ctrl = require("../controllers/controller");
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname, "public")));

router.get("/", ctrl.init);

router.get("/artists", ctrl.getArtists);

router.post("/artists/add", ctrl.addArtist);

router.use("/artists/delete/:id", ctrl.deleteArtist);

module.exports = router;
