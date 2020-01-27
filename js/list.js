const toggleAddArtistModal = data => {
    const addArtistForm = document.querySelector(".add-artist-form");
    addArtistForm.style.display =
        addArtistForm.style.display === "block" ? "none" : "block";
    addArtistForm.firstElementChild.reset();
};

const addArtist = () => {
    console.log("Adding artist");
    const artistName = document.getElementById("artist-name").value;
    const artistAbout = document.querySelector("#artist-about").value;
    const artistImageURL = document.querySelector("#artist-image").value;
    const artistList = document.querySelector(".list-avatar");

    let avatar = document.createElement("div");
    avatar.classList.add("avatar");

    let artistMarkup = `
                    <div class="avatar-img">
                        <img
                            src="${artistImageURL}"
                        />
                    </div>
                    <div class="avatar-description">
                        <div class="avatar-name">
                            <p>
                                ${artistName}
                            </p>
                        </div>
                        <div class="avatar-location">
                            <p>
                                ${artistAbout};
                            </p>
                        </div>
                    </div>
                    <div class="btn-delete" >
                        <button type="button">Delete</button>
                    </div>
    `;



    // let newArtist = document.createElement("div");
    // newArtist.classList.add("avatar");

    // let newArtistImg = document.createElement("div");
    // newArtistImg.classList.add("avatar-img");
    // let image = document.createElement("img");

    // newArtistImg.appendChild(image);

    // let newArtistDescription = document.createElement("div");
    // newArtistDescription.classList.add("avatar-description");
    // let name = document.createElement("div");
    // name.classList.add("avatar-name");
    // let about = document.createElement("div");
    // about.classList.add("avatar-location");

    // newArtistDescription.appendChild(name);
    // newArtistDescription.appendChild(about);

    // newArtist.appendChild(newArtistImg);
    // newArtist.appendChild(newArtistDescription);


    avatar.innerHTML = artistMarkup;
    artistList.appendChild(avatar);
};

const deleteArtist = () => {};
