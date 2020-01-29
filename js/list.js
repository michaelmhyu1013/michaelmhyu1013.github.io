const toggleAddArtistModal = () => {
    const addArtistForm = document.querySelector(".add-artist-form");
    toggleModal(addArtistForm);
    addArtistForm.firstElementChild.reset();
};

const addArtist = () => {
    const addArtistForm = document.querySelector(".add-artist-form");
    const artistName = document.getElementById("artist-name").value;
    if (!artistName) {
        return;
    }
    const artistAbout = document.querySelector("#artist-about").value;
    const artistImageURL = document.querySelector("#artist-image").value;
    const artistList = document.querySelector(".list-avatar");

    let avatar = document.createElement("div");
    let avatarID = Date.now();
    avatar.setAttribute("id", avatarID);
    avatar.classList.add("avatar");

    let newArtistImg = document.createElement("div");
    newArtistImg.classList.add("avatar-img");
    let image = document.createElement("img");
    image.setAttribute("src", artistImageURL);

    newArtistImg.appendChild(image);

    let newArtistDescription = document.createElement("div");
    newArtistDescription.classList.add("avatar-description");

    let name = document.createElement("div");
    name.classList.add("avatar-name");
    name.textContent = artistName;

    let about = document.createElement("div");
    about.classList.add("avatar-location");
    about.textContent = artistAbout;

    let deleteContainer = document.createElement("div");
    deleteContainer.classList.add("btn-delete");
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute("onclick", `deleteArtist(${avatarID})`);
    deleteButton.textContent = "Delete";
    deleteContainer.appendChild(deleteButton);

    newArtistDescription.appendChild(name);
    newArtistDescription.appendChild(about);

    avatar.appendChild(newArtistImg);
    avatar.appendChild(newArtistDescription);
    avatar.appendChild(deleteContainer);

    toggleModal(addArtistForm);
    addArtistForm.firstElementChild.reset();
    artistList.appendChild(avatar);
};

const deleteArtist = id => {
    let avatarList = document.querySelector(".list-avatar");
    let avatarToDelete = document.getElementById(id);
    avatarList.removeChild(avatarToDelete);
};

const toggleModal = elem => {
    elem.style.display = elem.style.display === "block" ? "none" : "block";
};
