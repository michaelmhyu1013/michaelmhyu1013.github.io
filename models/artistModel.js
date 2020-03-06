let pg = require("../util/postgres");

const addArtist = artist => {
    console.table(artist);
    return new Promise((resolve, reject) => {
        pg.query(
            `INSERT INTO artists (id, name, description, image) VALUES (DEFAULT, '${artist.name}', '${artist.about}', '${artist.image}');`
        ).then((res, err) => {
            if (err) {
                console.log("Failed to add artist", err);
                reject(err);
            }
            console.log("Successfully added artist to pg.");
            resolve(res);
        });
    });
};

const deleteArtist = id => {
    return new Promise((resolve, reject) => {
        pg.query(`DELETE FROM artists WHERE artists.id =${id}`).then(
            (res, err) => {
                if (err) {
                    console.log("Failed to delete artists", err);
                    reject(err);
                }
                console.log("Deleted artist index", id);
                resolve(res);
            }
        );
    });
};

const getArtists = searchValue => {
    return new Promise((resolve, reject) => {
        pg.query(
            `SELECT * FROM artists WHERE name like '%${searchValue}%'`
        ).then((res, err) => {
            if (err) {
                console.log("Error fetching artists", err);
                reject(err);
            }
            resolve(res.rows);
        });
    });
};

module.exports = {
    addArtist: addArtist,
    deleteArtist: deleteArtist,
    getArtists: getArtists,
};
