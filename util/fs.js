"use strict";

const fsPromises = require("fs").promises;

const artistModel = require("../models/artistModel");
const artistFilePath = "artists.txt";

const controller = {
    addArtist: (req, res, next) => {
        let storage;
        let newArtist = {
            name: req.body.name,
            about: req.body.about,
            image: req.body.image,
        };

        artistModel.addArtist(newArtist);

        fsPromises
            .readFile(artistFilePath, "utf-8")
            .then(data => {
                try {
                    storage = JSON.parse(data);
                } catch {
                    storage = { artists: [] };
                }
                storage.artists.push({
                    id: storage.artists.length + req.body.name,
                    name: req.body.name,
                    about: req.body.about,
                    image: req.body.image,
                });
                fsPromises
                    .writeFile(artistFilePath, JSON.stringify(storage), "utf-8")
                    .then(() => {
                        return res.redirect("/artists");
                    })
                    .catch(err => {
                        if (err) {
                            console.log("Error appending to file: ", err);
                        }
                    });
            })
            .catch(err => {
                console.log("Add artist error: ", err);
                next(err);
            });
    },
    deleteArtist: (req, res) => {
        let artistID = req.params.id;
        fsPromises
            .readFile(artistFilePath, "utf-8")
            .then(data => {
                let storage = JSON.parse(data);
                let ind = storage.artists.findIndex(artist => {
                    return artist.id === artistID;
                });
                storage.artists.splice(ind, 1);
                fsPromises
                    .writeFile(artistFilePath, JSON.stringify(storage), "utf-8")
                    .then(() => {
                        return res.redirect("/artists");
                    })
                    .catch(err => {
                        if (err) {
                            console.log("Error appending to file: ", err);
                        }
                    });
            })
            .catch(err => {
                console.log("Delete Artist Fail: ", err);
                next(err);
            });
    },
    getArtists: (req, res, next) => {
        let response = {};
        let filteredResponse = {};
        fsPromises
            .readFile(artistFilePath, "utf-8")
            .then(data => {
                try {
                    response = JSON.parse(data);
                    if (req.query.search) {
                        filteredResponse.artists = response.artists.filter(
                            artist => {
                                return artist.name
                                    .toLowerCase()
                                    .includes(req.query.search.toLowerCase());
                            }
                        );
                    }
                } catch (err) {
                    console.log("No artists: ", err);
                }
                return res.status(200).render("artistPage", {
                    title: "Artist Directory",
                    response: req.query.search ? filteredResponse : response,
                });
            })
            .catch(err => {
                console.log("error fetching", err);
                next(err);
            });
    },
};

