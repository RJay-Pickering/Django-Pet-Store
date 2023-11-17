// ------------------------ Shows all pets on the page ------------------------
function createPetCards(animal) {
    console.log(animal)

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
    var apiContent = document.getElementById("apiContent")
    apiContent.appendChild(infoCard)
    // -----------------------------------------------------
}
// ----------------------------------------------------------------------------


// ------------------ Makes address readable for google maps ------------------
function decodeHtmlCharCodes(str) { 
    return str.replace(/(&#(\d+);)/g, function(match, capture, charCode) {
      return String.fromCharCode(charCode);
    });
}
// ----------------------------------------------------------------------------


// ------------------ Populates and views a single pets card ------------------
function viewSingularPet(animal) {
    document.getElementById("allPets").style.display = "none"
    document.getElementById("petInfo2").style.display = null
    document.getElementById("closeBtn").style.display = null
    let urlLinks = document.createElement("a")
    urlLinks.classList.add("url_links")
    urlLinks.href = animal.url
    urlLinks.innerText = "view organization"

    if (animal.attributes.declawed == true) {
        var declawed = "Is declawed"
    } else {
        var declawed = null
    }

    if (animal.attributes.house_trained == true) {
        var houseTrained = "House trained"
    } else {
        var houseTrained = null
    }

    if (animal.attributes.shots_current == true) {
        var shots = "Has shots"
    } else {
        var shots = null
    }

    if (animal.attributes.spayed_neutered == true) {
        var neutered = "Is fixed"
    } else {
        var neutered = null
    }

    if (animal.contact.address.address1 !== null) {
        var petAddress = decodeHtmlCharCodes(animal.contact.address.address1)
    } else {
        var petAddress = "Address not provided"
    }

    if (animal.contact.address.city !== null) {
        var petCity = animal.contact.address.city
    } else {
        var petCity = "City not provided"
    }

    if (animal.contact.address.state !== null) {
        var petState = animal.contact.address.state
    } else {
        var petState = "State not provided"
    }

    if (animal.contact.phone !== null) {
        var petPhone = animal.contact.phone
    } else {
        var petPhone = "Phone number not provided"
    }

    if (animal.contact.email !== null) {
        var petEmails = animal.contact.email
    } else {
        var petEmails = null
    }

    let photos = document.createElement("img")
    photos.classList.add("pet_photos")
    if (animal.primary_photo_cropped !== null) {
        photos.src = animal.primary_photo_cropped.small
    } else {
        photos.src = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Fno-image-available-sign-vector-id1138179183%3Fk%3D6%26m%3D1138179183%26s%3D612x612%26w%3D0%26h%3DprMYPP9mLRNpTp3XIykjeJJ8oCZRhb2iez6vKs8a8eE%3D&f=1&nofb=1&ipt=15f591ccfd6ef6dd40aba188258f8f02b36e2d01cecafa8aa8771cd28c396a2b&ipo=images"
    }


    document.getElementById("map").appendChild(photos)
    document.getElementById("pet_name").innerText = animal.name
    if (animal.breeds.secondary != null && animal.breeds.secondary.toLowerCase().includes("mixed breed")) {
        var secondaryBreed = null
    } else {
        var secondaryBreed = animal.breeds.secondary
    }
    if (animal.breeds.mixed == true) {
        if (animal.breeds.primary != null) {
            if (secondaryBreed != null) {
                document.getElementById("breed").innerText = `${animal.breeds.primary}, ${secondaryBreed} - Mix`
            } else {
                document.getElementById("breed").innerText = `${animal.breeds.primary} - Mix`
            }
        } else {
            if (secondaryBreed != null) {
                document.getElementById("breed").innerText = `${secondaryBreed} - Mix`
            } else {
                document.getElementById("breed").style.display = "none"
            }
        }
    } else {
        if (animal.breeds.primary != null) {
            if (secondaryBreed != null) {
                document.getElementById("breed").innerText = `${animal.breeds.primary}, ${secondaryBreed}`
            } else {
                document.getElementById("breed").innerText = `${animal.breeds.primary}`
            }
        } else {
            if (secondaryBreed != null) {
                document.getElementById("breed").innerText = `${secondaryBreed}`
            } else {
                document.getElementById("breed").style.display = "none"
            }
        }
    }
    document.getElementById("types").innerText = `${animal.age} • ${animal.gender} • ${animal.size} • ${animal.colors.primary}`

    if (declawed !== null) {
        if (houseTrained !== null) {
            if (shots !== null) {
                if (neutered != null) {
                    document.getElementById("health").innerText = `${declawed}, ${houseTrained}, ${shots}, ${neutered}`
                } else {
                    document.getElementById("health").innerText = `${declawed}, ${houseTrained}, ${shots}`
                }
            } else {
                if (neutered != null) {
                    document.getElementById("health").innerText = `${declawed}, ${houseTrained}, ${neutered}`
                } else {
                    document.getElementById("health").innerText = `${declawed}, ${houseTrained}`
                }
            }
        } else {
            if (shots !== null) {
                if (neutered !== null) {
                    document.getElementById("health").innerText = `${declawed}, ${shots}, ${neutered}`
                } else {
                    document.getElementById("health").innerText = `${declawed}, ${shots}`
                }
            } else {
                if (neutered !== null) {
                    document.getElementById("health").innerText = `${declawed}, ${neutered}`
                } else {
                    document.getElementById("health").innerText = `${declawed}`
                }
            }
        }
    } else {
        if (houseTrained !== null) {
            if (shots !== null) {
                if (neutered !== null) {
                    document.getElementById("health").innerText = `${houseTrained}, ${shots}, ${neutered}`
                } else {
                    document.getElementById("health").innerText = `${houseTrained}, ${shots}`
                }
            } else {
                if (neutered !== null) {
                    document.getElementById("health").innerText = `${houseTrained}, ${neutered}`
                } else {
                    document.getElementById("health").innerText = `${houseTrained}`
                }
            }
        } else {
            if (shots !== null) {
                if (neutered !== null) {
                    document.getElementById("health").innerText = `${shots}, ${neutered}`
                } else {
                    document.getElementById("health").innerText = `${shots}`
                }
            } else {
                if (neutered !== null) {
                    document.getElementById("health").innerText = `${neutered}`
                } else {
                    document.getElementById("health").style.display = "none"
                }
            }
        }
    }

    document.getElementById("address").innerHTML = `<i class="fa fa-map-marker"></i>${petAddress}`
    document.getElementById("state").innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" >
        <path d="M240.1 4.2c9.8-5.6 21.9-5.6 31.8 0l171.8 98.1L448 104l0 .9 47.9 27.4c12.6 7.2 18.8 22 15.1 36s-16.4 23.8-30.9 23.8H32c-14.5 0-27.2-9.8-30.9-23.8s2.5-28.8 15.1-36L64 104.9V104l4.4-1.6L240.1 4.2zM64 224h64V416h40V224h64V416h48V224h64V416h40V224h64V420.3c.6 .3 1.2 .7 1.8 1.1l48 32c11.7 7.8 17 22.4 12.9 35.9S494.1 512 480 512H32c-14.1 0-26.5-9.2-30.6-22.7s1.1-28.1 12.9-35.9l48-32c.6-.4 1.2-.7 1.8-1.1V224z" />
    </svg>
    ${petCity}, ${petState}`
    document.getElementById("phoneNum").innerHTML = `<i class="fa fa-phone"></i>${petPhone}`
    document.getElementById("website").innerHTML = `<i class="fa fa-globe"></i><a class="url_links" href="${animal.url}" target="_blank">visit organization</a>`

    if (petEmails != null) {
        document.getElementById("email").innerHTML = "<button id='cardButtons' class='fa fa-envelope'></button>"
        document.getElementById("email").href = `mailto:${petEmails}?subject=Info%20about%20adopting%20${animal.name}&body=Hello,%20I%20am%20asking%20about%20${animal.name}.`
    } else {
        document.getElementById("email").parentElement.style.display = "none"
    }

    googleMapsFunction(animal, petCity, petState, petAddress)
}
// ----------------------------------------------------------------------------


// ------------------------ Directions towards the pet ------------------------
function googleMapsFunction(animal, city, state, address) {
    var directions = document.getElementById("directions")
    directions.style.display = "none"
    var anotherPetAddress = animal.contact.address.address1
    if (anotherPetAddress !== null && anotherPetAddress.substring(0, 4) !== "P.O." && anotherPetAddress.substring(0, 2) !== "PO") {
        navigator.geolocation.getCurrentPosition(locationHandler);
    }
    function locationHandler(position){
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        directions.innerHTML = "<button id='cardButtons' class='fa fa-car'></button>"
        directions.style.display = null
        directions.href = `https://www.google.com/maps/dir/${lat.toFixed(4)},${lng.toFixed(4)}/${address},+${city},+${state}+${animal.contact.address.postcode}/`
    }
}
// ----------------------------------------------------------------------------


// ------------ Resets the singular view to the default empty card ------------
function resetSingularView(animalCard) {
    animalCard.innerHTML = `
    <div class="map">
    <div id="map"></div>
    <div class="map-c">
      <center>
        <h1 id="pet_name" title="Pet name"></h1>
        <p id="breed" title="Breed"></p>
        <p id="types" title="Age, gender, size, and color"></p>
        <p id="health" title="Medical info"></p>
      </center>
      <div class="det" id="address" title="Address"></div>
      <div class="det" id="state" title="City and State"></div>
      <div class="det" id="phoneNum" title="Phone number"></div>
      <div class="det" id="website" title="Website url"></div>
      <center>
        <a id="directions" target="_blank" title="Google Maps"></a>
        <a id="email" target="_blank" title="Email"></a>
      </center>
    </div>
  </div>
  `
}
// ----------------------------------------------------------------------------