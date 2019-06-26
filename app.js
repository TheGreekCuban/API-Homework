

const giphyURL = 'https://api.giphy.com/v1/gifs/search?api_key=k8QvgjlfZJisxH81TEc50Xxb5ZgErQ5i'
const country = ''
const giphySearch = '&q=c' + country
const giphyLimit = '&limit=100'
const giphyMiscContent ='&offset=0&rating=R&lang=en'
const finalURL = `${giphyURL}${giphySearch}${giphyLimit}${giphyMiscContent}`

fetch(finalURL)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log("GIPHY URL: ", myJson.data[0].images.original.url)
  });

const leleA = document.getElementById("userInputArea").value
console.log(leleA)





