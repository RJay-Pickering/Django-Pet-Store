// -------------------------- Grabbing HTML elements --------------------------
var pageElement = document.getElementById("pageId")
var submitBtn = document.getElementById("subBtn")
var closeSingleView = document.getElementById("closeBtn")
var mainContent = document.getElementById("allPets")
var showSpecificPets = document.getElementById("petInfo2")
var searchContent = document.getElementById("searchContent")
var searchedAnimal = document.getElementById("searchedAnimal")
// ----------------------------------------------------------------------------


// ------------ Starting the page off, not showing the single view ------------
showSpecificPets.style.display = "none"
closeSingleView.style.display = "none"
// ----------------------------------------------------------------------------


// ------------------------------ Changing pages ------------------------------
submitBtn.addEventListener("click", () => {
    searchContent.innerHTML = ""
    if (pageElement.value == "") {
        switchSearchedPages(1)
        pageStorage = 1
    } else if (pageElement.value <= pageTotal && pageElement.value > 0) {
        switchSearchedPages(pageElement.value)
        pageStorage = pageElement.value
    } else {
        switchSearchedPages(pageStorage)
    }
})
// ----------------------------------------------------------------------------


// --------------------------- Closing the pet card ---------------------------
closeSingleView.addEventListener("click", () => {
    console.log("test")
    mainContent.style.display = null
    showSpecificPets.style.display = "none"
    closeSingleView.style.display = "none"

    // ----- Refer to line 309 in "pet_cards.js" -----
    resetSingularView(showSpecificPets)
    // -----------------------------------------------
})
// ----------------------------------------------------------------------------


// --------------------- Starts the app on the first page ---------------------
switchSearchedPages(startPage)
// ----------------------------------------------------------------------------


// ---------------------------- Switches the pages ----------------------------
function switchSearchedPages(page) {
    pf.animal.search({page, type: searchedAnimal.innerText})
        .then(function (response) {
            pageTotal = response.data.pagination.total_pages
            pageElement.max = pageTotal
            for (let i = 0; i < response.data.animals.length; i++) {
                // ------- Refer to line 79 in "search.js" -------
                createSearchedPetCards(response.data.animals[i])
                // -----------------------------------------------
            }
            var all20Pages = document.getElementsByClassName("animal")
            for (let i = 0; i < all20Pages.length; i++) {
                all20Pages[i].addEventListener("click", () => {
                    // ---- Refer to line 96 in "pet_cards.js" ----
                    viewSingularPet(response.data.animals[i])
                    // --------------------------------------------
                })
            }
        })
        .catch(function (error) {
            console.log(error)
        });
}
// ----------------------------------------------------------------------------


function createSearchedPetCards(animal) {
    // --------------- created HTML elements ---------------
    let infoCard = document.createElement("div")
    let photos = document.createElement("img")
    let name = document.createElement("h1")
    let primaryBreed = document.createElement("p")
    let description = document.createElement("p")
    let environment = document.createElement("p")
    let envCat = document.createElement("p")
    let envDog = document.createElement("p")
    let envChild = document.createElement("p")
    let genderAndSize = document.createElement("p")
    // -----------------------------------------------------


    // -------------- added class to elements --------------
    infoCard.classList.add("animal")
    photos.classList.add("pet_photos_all")
    name.classList.add("name")
    primaryBreed.classList.add("primaryBreed")
    description.classList.add("description")
    environment.classList.add("environment")
    envCat.classList.add("environment_with_cat")
    envDog.classList.add("environment_with_dog")
    envChild.classList.add("environment_with_child")
    genderAndSize.classList.add("genderAndSize")
    // -----------------------------------------------------


    // ------ changing inner text of the new elements ------
    name.innerText = animal.name
    if (animal.breeds.secondary !== null) {
        primaryBreed.innerHTML = `Primary Breed: ${animal.breeds.primary}<br>
        Secondary Breed: ${animal.breeds.secondary}`
    } else {
        primaryBreed.innerHTML = `Primary Breed: ${animal.breeds.primary}<br>
        Secondary Breed: NONE`
    }

    if (animal.environment.cats == true) {
        if (animal.environment.children == true) {
            environment.append("Cat Loving, ")
        } else {
            if (animal.environment.dogs == true) {
                environment.append("Cat Loving, ")
            } else {
                environment.append("Cat Loving")
            }
        }
    }
    if (animal.environment.dogs == true) {
        if (animal.environment.children == true) {
            environment.append("Dog Loving, ")
        } else {
            environment.append("Dog Loving")
        }
    }
    if (animal.environment.children == true) {
        environment.append("Child Friendly")
    }
    if (animal.environment.cats !== true && animal.environment.dogs !== true  && animal.environment !== true ) {
        environment.innerText = "Has not been around cats, dogs, or children"
    }

    if (animal.gender == "Female") {
        genderAndSize.innerText = `She is a ${animal.size.toLowerCase()} sized ${animal.species.toLowerCase()}`
    } else {
        genderAndSize.innerText = `He is a ${animal.size.toLowerCase()} sized ${animal.species.toLowerCase()}`
    }

    if (animal.primary_photo_cropped !== null) {
        photos.src = animal.primary_photo_cropped.small
    } else {
        photos.src = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Fno-image-available-sign-vector-id1138179183%3Fk%3D6%26m%3D1138179183%26s%3D612x612%26w%3D0%26h%3DprMYPP9mLRNpTp3XIykjeJJ8oCZRhb2iez6vKs8a8eE%3D&f=1&nofb=1&ipt=15f591ccfd6ef6dd40aba188258f8f02b36e2d01cecafa8aa8771cd28c396a2b&ipo=images"
    }
    // -----------------------------------------------------


    // --------- adding elements to "infoCard" div ---------
    infoCard.appendChild(photos)
    infoCard.appendChild(name)
    infoCard.appendChild(genderAndSize)
    infoCard.appendChild(primaryBreed)
    infoCard.appendChild(environment)
    // -----------------------------------------------------


    // ----- adding infoCard to searchContent in the html -----
    searchContent.appendChild(infoCard)
    // -----------------------------------------------------
}