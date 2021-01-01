const formTag = document.querySelector('form')
const inputTag = formTag.querySelector('input')
const resultsTag = document.querySelector('section.results')
const accessKey = "Rzj50nVsUNPyrCGsKjAoMmb_sPy66wJqFNBraA7Dud8"
const apiUrl = "https://api.unsplash.com/search/photos?per_page=24&query="

const searchUnsplash = function(term){
  return fetch(apiUrl + term, {
    method: "GET",
    headers: {
      "Authorization": "Client-ID " + accessKey
    }
  })
  .then (response => response.json())
  .then(data => {
    //console.log(data)
    return data.results.map(result => {
      return {
        imageSrc: result.urls.regular,
        width: result.width,
        height: result.height,
        name: result.user.name,
        title: (result.description || "Untitled"),
        backgroundColor: (result.color || "#cccccc") + "33"
      }
    })
  })
}

const addResults = function(results){
  resultsTag.innerHTML = ""
  results.forEach(result => {
    resultsTag.innerHTML = resultsTag.innerHTML + `
		<div class="single-result">
      <div class="image" style="background-color: ${result.backgroundColor}">
        <img src="${result.imageSrc}">
      </div>
      <h2>Image of ${result.title}</h2>
      <p>By ${result.name} - ${result.width} x ${result.height} </p>
		</div>
		`
  })
}

formTag.addEventListener('submit', function(event){
  const searchTerm = inputTag.value
  searchUnsplash(searchTerm)
    .then(results => {
    addResults(results)
  })
  event.preventDefault()
})