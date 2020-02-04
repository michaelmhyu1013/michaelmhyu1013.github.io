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
    const avatarID = Date.now();

    const avatar = createAvatar(
        avatarID,
        artistName,
        artistAbout,
        artistImageURL
    );

    toggleModal(addArtistForm);
    addArtistForm.firstElementChild.reset();
    artistList.appendChild(avatar);

    saveToLocalStorage(avatarID, artistName, artistAbout, artistImageURL);
};

const deleteArtist = id => {
    let avatarList = document.querySelector(".list-avatar");
    let avatarToDelete = document.getElementById(id);
    avatarList.removeChild(avatarToDelete);
};

const toggleModal = elem => {
    elem.style.display = elem.style.display === "block" ? "none" : "block";
};

const loadAvatar = avatar => {
    const artistList = document.querySelector(".list-avatar");
    artistList.appendChild(
        createAvatar(avatar.id, avatar.name, avatar.about, avatar.imageURL)
    );
};

const createAvatar = (id, name, about, imageURL) => {
    let avatar = document.createElement("div");
    avatar.setAttribute("id", id);
    avatar.classList.add("avatar");

    let newArtistImg = document.createElement("div");
    newArtistImg.classList.add("avatar-img");
    let image = document.createElement("img");
    image.setAttribute("src", imageURL);

    newArtistImg.appendChild(image);

    let newArtistDescription = document.createElement("div");
    newArtistDescription.classList.add("avatar-description");

    let nameDiv = document.createElement("div");
    nameDiv.classList.add("avatar-name");
    nameDiv.textContent = name;

    let aboutDiv = document.createElement("div");
    aboutDiv.classList.add("avatar-location");
    aboutDiv.textContent = about;

    let deleteContainer = document.createElement("div");
    deleteContainer.classList.add("btn-delete");
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute("onclick", `deleteArtist(${id})`);
    deleteButton.textContent = "Delete";
    deleteContainer.appendChild(deleteButton);

    newArtistDescription.appendChild(nameDiv);
    newArtistDescription.appendChild(aboutDiv);

    avatar.appendChild(newArtistImg);
    avatar.appendChild(newArtistDescription);
    avatar.appendChild(deleteContainer);
    return avatar;
};

const saveToLocalStorage = (id, name, about, imageURL) => {
    let storage = localStorage.getItem("avatars");
    let avatarStorage = storage ? JSON.parse(storage) : [];
    avatarStorage.push({
        id: id,
        name: name,
        about: about,
        imageURL: imageURL
    });

    let avatarStorageStr = JSON.stringify(avatarStorage);
    localStorage.setItem("avatars", avatarStorageStr);
};

const loadListFromLocalStorage = (() => {
    // to read from localstorage
    var avatars = JSON.parse(localStorage.getItem("avatars"));
    avatars.forEach(avatar => {
        console.log(avatar);
        loadAvatar(avatar);
    });
})();
