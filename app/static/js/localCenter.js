// source: https://extreme-ip-lookup.com/
fetch('https://extreme-ip-lookup.com/json/?key=d792bptqQXNELxWdMyyU')
.then( res => res.json())
.then(data => {
    // var state = data.region;
    // due to wifi having its own vpn type thing, this will do for presentation
    var state = "Mississippi"
    console.log(state)
    var states = {
        'Alabama': 'AL',
        'Alaska': 'AK',
        'American Samoa': 'AS',
        'Arizona': 'AZ',
        'Arkansas': 'AR',
        'California': 'CA',
        'Colorado': 'CO',
        'Connecticut': 'CT',
        'Delaware': 'DE',
        'District Of Columbia': 'DC',
        'Federated States Of Micronesia': 'FM',
        'Florida': 'FL',
        'Georgia': 'GA',
        'Guam': 'GU',
        'Hawaii': 'HI',
        'Idaho': 'ID',
        'Illinois': 'IL',
        'Indiana': 'IN',
        'Iowa': 'IA',
        'Kansas': 'KS',
        'Kentucky': 'KY',
        'Louisiana': 'LA',
        'Maine': 'ME',
        'Marshall Islands': 'MH',
        'Maryland': 'MD',
        'Massachusetts': 'MA',
        'Michigan': 'MI',
        'Minnesota': 'MN',
        'Mississippi': 'MS',
        'Missouri': 'MO',
        'Montana': 'MT',
        'Nebraska': 'NE',
        'Nevada': 'NV',
        'New Hampshire': 'NH',
        'New Jersey': 'NJ',
        'New Mexico': 'NM',
        'New York': 'NY',
        'North Carolina': 'NC',
        'North Dakota': 'ND',
        'Northern Mariana Islands': 'MP',
        'Ohio': 'OH',
        'Oklahoma': 'OK',
        'Oregon': 'OR',
        'Palau': 'PW',
        'Pennsylvania': 'PA',
        'Puerto Rico': 'PR',
        'Rhode Island': 'RI',
        'South Carolina': 'SC',
        'South Dakota': 'SD',
        'Tennessee': 'TN',
        'Texas': 'TX',
        'Utah': 'UT',
        'Vermont': 'VT',
        'Virgin Islands': 'VI',
        'Virginia': 'VA',
        'Washington': 'WA',
        'West Virginia': 'WV',
        'Wisconsin': 'WI',
        'Wyoming': 'WY'
    }
    
    function getStateAbbr(name) {
        return states[name];
    }
    
    var st = getStateAbbr(state)
    
    fetch('https://api.petfinder.com/v2/oauth2/token', {
      method: 'POST',
      body: `grant_type=client_credentials&client_id=${myApiKey}&client_secret=${apiSecret}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(response => response.json())
    .then(data => {
      const access_token = data.access_token;
    
      // Search for pets in Arkansas
      fetch(`https://api.petfinder.com/v2/animals?location=${st}&limit=100`, {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data.animals.length; i++) {
            // ---- Refer to line 113 in "localCenter.js" ----
            createLocalPetCards(data.animals[i])
            // -----------------------------------------------
        }
        var all20Pages = document.getElementsByClassName("animal")
        for (let i = 0; i < all20Pages.length; i++) {
            all20Pages[i].addEventListener("click", () => {
                // ---- Refer to line 96 in "pet_cards.js" ----
                viewSingularPet(data.animals[i])
                // --------------------------------------------
            })
        }
      });
    });
})

function createLocalPetCards(animal) {
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


    // ----- adding infoCard to apiContent in the html -----
    var apiContent = document.getElementById("localContent")
    apiContent.appendChild(infoCard)
    // -----------------------------------------------------
}

// --------------------------- Closing the pet card ---------------------------
var closeSingleView = document.getElementById("closeBtn")

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
