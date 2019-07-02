//We need an array of countries that we will use to dynamically create buttons
let arrayOfCountries = ["America", "Canada", "Mexico", "Greece", "Cuba", "Chile", "Peru", "Switzerland", "France", "Spain",
"China", "Vietnam"]

//We need a function that dynamically creates all these buttons on page load
window.onload = () => {
    for (let i = 0; i < arrayOfCountries.length; i++) {
      let currentCountry = arrayOfCountries[i]
      let buttonDiv = document.createElement('button')

      //add click handler to buttons. Put an anonymous function before it so that it can be blocked from calling.
      buttonDiv.onclick = e => urlBuilderButton(e, currentCountry)

      //set id of dynamicButtons
      buttonDiv.setAttribute("id", "dynamicButtons")

      //set class of buttonsDiv
      buttonDiv.setAttribute("class", "buttonsDiv")

      //set value of country
      buttonDiv.setAttribute("country", currentCountry)

      //set text of button
      buttonDiv.innerHTML = currentCountry

    //append button to the buttons div
    document.getElementById("buttonsDiv").appendChild(buttonDiv)
  }
}

//We need a function that builds our URL in order to use it in the fetch from the search bar.
const urlBuilderSearch = () => {
    
    let queryParams = {
        giphyURL: 'https://api.giphy.com/v1/gifs/search?',
        apiKey: 'api_key=k8QvgjlfZJisxH81TEc50Xxb5ZgErQ5i&q=',
        urlEnd: '&limit=3&offset=0&rating=R&lang=en'
    }

    let userSearch = document.getElementById("userInputArea").value

    if(!userSearch) {
        alert("Invalid Entry, Please Input A Country.")
    }

    //create the final URL:
    let finalURL = `${queryParams.giphyURL}${queryParams.apiKey}${userSearch}${queryParams.urlEnd}`
    return finalURL
}

//This is a function that clears the textbox after every addition, it is run as a part of the onclick code. 
const clear = () => {
    document.getElementById("userInputArea").value = ''
}


//This is the click event that will build the URL using our search term and begin the sarch.
document.getElementById("submitButton").onclick = function (event) {
    event.preventDefault()
    
    let finalURL = urlBuilderSearch()

    fetch(finalURL).then(function(response) {
        return response.json();
    }).then(function(myJson) {

        //Must loop through the array in the object then dynamically create a p div and image div for each gif.
        for (let i = 0; i < myJson.data.length; i++) {
        
        //We have to dynamically create a div to append all gifs into
        let innerAppendDiv = document.createElement('div')

        //We must set the text of the p to rating
        let innerPDiv = document.createElement('p')
        let rating = myJson.data[i].rating
        innerPDiv.innerHTML = `Rating: ${rating}`

        //We must set the src attribute to the image url of the dynamically created image div
        let imageURL = myJson.data[i].images.original_still.url
        let secondUrl = myJson.data[i].images.original.url
        let innerPicDiv = document.createElement('img')

        let userSearch = document.getElementById("userInputArea").value

        //Set id for images
        innerPicDiv.onclick = e => replaceImgs(e, innerPicDiv, secondUrl, imageURL, i, userSearch)

        //Create attribute for data-state (still, moving)
        innerPicDiv.setAttribute('data-state', 'still')

        //This information
        innerPicDiv.setAttribute('src', imageURL)
        innerPicDiv.setAttribute('id', i)
        innerPicDiv.setAttribute('country', userSearch)
        innerPicDiv.style.width = "150px"
        innerPicDiv.style.height = "150px"

        //We must appen those to the innerDiv
        innerAppendDiv.append(innerPDiv)
        innerAppendDiv.append(innerPicDiv)

        //Push innerAppendDiv to array
        arrayOfDivs.push(innerAppendDiv)

        //Create append function
        appendImgs(innerAppendDiv, i)
        }
        addButtons()
        clear()
    });   
}

//This function will append one image to each row in the grid
const appendImgs = (innerAppendDiv, i) => {

    switch (i) {
    case 0:
        document.getElementById('pictures1').prepend(innerAppendDiv)
        break;
    case 1:
        document.getElementById('pictures2').prepend(innerAppendDiv)
        break;   
    case 2:
        document.getElementById('pictures3').prepend(innerAppendDiv)
        break;
    }
}

//Create a function that replaces the static image URL with the animated one
const replaceImgs = (event, innerPicDiv, secondUrl, imageURL, i, userSearch) => {
    event.preventDefault()

    for (let j = 0; j < arrayOfCountries.length; j++) {
        let currentCountry = arrayOfCountries[j]

        if (currentCountry.toLowerCase() === userSearch.toLowerCase()) {

            let dataState = document.getElementById(i).getAttribute('data-state')
            
            if(dataState === 'still') {
                document.getElementById(i).setAttribute('src', secondUrl)
                document.getElementById(i).setAttribute('data-state', 'animated')
            } else {
                document.getElementById(i).setAttribute('src', imageURL)
                document.getElementById(i).setAttribute('data-state', 'still')
            }
        }    
    }    
}

const addButtons = () => {
  let userSearch = document.getElementById("userInputArea").value
  
  if(!userSearch) { return }

  //push the userSearch into the array 
  arrayOfCountries.push(userSearch)

  //create a button div and set the matching attributes
  let buttonDiv = document.createElement('button')
  buttonDiv.setAttribute('country', userSearch)
  buttonDiv.setAttribute('id', 'dynamicButtons')
  buttonDiv.setAttribute('calss', 'buttonsDiv')
  buttonDiv.innerText = userSearch
  buttonDiv.onclick = e => urlBuilderButton(e, userSearch)

  //append button to buttons div
  document.getElementById('buttonsDiv').appendChild(buttonDiv)
}

//We need a function that will run an api call from the button clicked
const urlBuilderButton = (event, userSearch) => {
    event.preventDefault();
    
    let queryParams = {
        giphyURL: 'https://api.giphy.com/v1/gifs/search?',
        apiKey: 'api_key=k8QvgjlfZJisxH81TEc50Xxb5ZgErQ5i&q=',
        urlEnd: '&limit=3&offset=0&rating=R&lang=en'
    }

    //create the final URL:
    let finalURL = `${queryParams.giphyURL}${queryParams.apiKey}${userSearch}${queryParams.urlEnd}`
    
    fetch(finalURL).then(function(response) {
        return response.json();
    }).then(function(myJson) {

        //Must loop through the array in the object then dynamically create a p div and image div for each gif.
        for (let i = 0; i < myJson.data.length; i++) {
        
        //We have to dynamically create a div to append all gifs into
        let innerAppendDiv = document.createElement('div')

        //We must set the text of the p to rating
        let innerPDiv = document.createElement('p')
        let rating = myJson.data[i].rating
        innerPDiv.innerHTML = `Rating: ${rating}`

        //We must set the src attribute to the image url of the dynamically created image div
        let imageURL = myJson.data[i].images.original_still.url
        let secondUrl = myJson.data[i].images.original.url
        let innerPicDiv = document.createElement('img')
        
        //Set id for images
        innerPicDiv.onclick = e => replaceImgs(e, innerPicDiv, secondUrl, imageURL, i, userSearch)

        //Create attribute for data-state (still, moving)
        innerPicDiv.setAttribute('data-state', 'still')

        //This information
        innerPicDiv.setAttribute('src', imageURL)
        innerPicDiv.setAttribute('id', i)
        innerPicDiv.setAttribute('country', userSearch)
        innerPicDiv.style.width = "150px"
        innerPicDiv.style.height = "150px"

        //We must appen those to the innerDiv
        innerAppendDiv.append(innerPDiv)
        innerAppendDiv.append(innerPicDiv)
        
        //Create append function
        appendImgs(innerAppendDiv, i)

        }
        clear()
    });   
}