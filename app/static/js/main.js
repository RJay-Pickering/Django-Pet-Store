// -------------------- API key and Secret Key for the API --------------------
const myApiKey = '6cpQima4lKfDzkUR2Bk56gqT0ptg0TyuqkBNxPSilvjnmZONnL';
const apiSecret = 'pO8XoWOiqNgrbjXFZtNpVLYyydvyjHODjvZjtCaP';
const pf = new petfinder.Client({apiKey: myApiKey, secret: apiSecret});
// ----------------------------------------------------------------------------


// ------------------ Variables created/used for the project ------------------
let startPage = 1
let pageStorage = 0
let pageTotal = 0
// ----------------------------------------------------------------------------


// -------------------------- Grabbing HTML elements --------------------------
var pageElement = document.getElementById("pageId")
var submitBtn = document.getElementById("subBtn")
var closeSingleView = document.getElementById("closeBtn")
var mainContent = document.getElementById("allPets")
var showSpecificPets = document.getElementById("petInfo2")
var apiContent = document.getElementById("apiContent")
// ----------------------------------------------------------------------------


// ------------ Starting the page off, not showing the single view ------------
showSpecificPets.style.display = "none"
closeSingleView.style.display = "none"
// ----------------------------------------------------------------------------


// ------------------------------ Changing pages ------------------------------
submitBtn.addEventListener("click", () => {
    apiContent.innerHTML = ""
    if (pageElement.value == "") {
        switchPages(1)
        pageStorage = 1
    } else if (pageElement.value <= pageTotal && pageElement.value > 0) {
        switchPages(pageElement.value)
        pageStorage = pageElement.value
    } else {
        switchPages(pageStorage)
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


// -------------------- Refer to line 66 in "main.js" file --------------------
onInactive(1800000, function () {
    window.location.reload(true);
});
// ----------------------------------------------------------------------------

// -------------- Reloads the screen after a set of milliseconds --------------
function onInactive(ms, reloadWindow) {

    var wait = setTimeout(reloadWindow, ms);

    document.onmousemove = document.mousedown = document.mouseup = document.onkeydown = document.onkeyup = document.focus = function () {
        clearTimeout(wait);
        wait = setTimeout(reloadWindow, ms);
    };
}
// ----------------------------------------------------------------------------


// --------------------- Starts the app on the first page ---------------------
switchPages(startPage)
// ----------------------------------------------------------------------------


// ---------------------------- Switches the pages ----------------------------
function switchPages(page) {
    pf.animal.search({page})
        .then(function (response) {
            pageTotal = response.data.pagination.total_pages
            pageElement.max = pageTotal
            for (let i = 0; i < response.data.animals.length; i++) {
                // ------ Refer to line 1 in "pet_cards.js" ------
                createPetCards(response.data.animals[i])
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