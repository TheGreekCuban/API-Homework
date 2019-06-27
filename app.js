//We need an array of countries that we will use to dynamically create buttons
arrayOfCountries = ["America", "Canada", "Mexico", "Greece", "Cuba", "Chile", "Peru", "Switzerland", "France", "Spain",
"China", "Russia", "Vietnam"]

//We need a function that builds our URL in order to use it in the fetch.
const urlBuilder = () => {
    const giphyURL = 'https://api.giphy.com/v1/gifs/search?'
    
    let queryParams = {
        apiKey: 'api_key=k8QvgjlfZJisxH81TEc50Xxb5ZgErQ5i&q=',
        urlEnd: '&limit=50&offset=0&rating=R&lang=en'
    }

    let userSearch = document.getElementById("userInputArea").value
    queryParams.searchTerm = userSearch

    //create the final URL:
    let finalURL = `${giphyURL}${queryParams.apiKey}${queryParams.userSearch}${queryParams.urlEnd}`
    return finalURL
}


//This is a function that clears the textbox after every addition, it is run as a part of the onclick code. 
const clear = () => {
    document.getElementById("userInputArea").value = ''
}


//This is the click event that will build the URL using our search term and begin the sarch.
document.getElementById("submitButton").onclick = function (event) {
    event.preventDefault()
    clear()
    
    let finalURL = urlBuilder()

    fetch(finalURL).then(function(response) {
        return response.json();
    }).then(function(myJson) {
        console.log("OBJ: ", myJson.data[0].images.original.url)
    });
}







