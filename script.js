



// API request
// landing page new movies



async function newMovieRequest(){
    const apiKey = "f6e256e1"
    const randomLetter = new RandExp(/^[A-Za-z]{1}$/).gen()
    
    const apiUrl = `https://www.omdbapi.com/?t=${randomLetter}&y=2022&type=movie&page=1&apikey=${apiKey}`
    return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        return data;
    })
}

async function newReleases(){
    let i = 0;
    let mList = []
    console.log(mList)
    while(i<9){
        let movie = await newMovieRequest();
        mList.push(movie);
        i++;
    }
    cardUpdater(mList);
}

newReleases();

//// API functions

async function getMovie(title){
    const apiKey = "f6e256e1"
    const apiUrl = `https://www.omdbapi.com/?s=${title}&type=movie&plot=full&apikey=${apiKey}`
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => apiParser(data.Search))
}




function apiParser(result){
    let mList = [];
    result.forEach(item => {
        mList.push(item);
    })

    cardUpdater(mList);

}

//search interactions

const searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', () => {
    
    const search = document.getElementById('searchBox').value;
    getMovie(search);
})


function cardUpdater(movieList){
    const movieCards = document.querySelectorAll('.card-body')
    imdbUrl = "https://www.imdb.com/title/"

    let i = 0;

    movieCards.forEach(movie => {
        movie.parentNode.setAttribute('data-href', `${imdbUrl + movieList[i].imdbID}`)
        movie.firstElementChild.setAttribute('src', movieList[i].Poster)
        movie.querySelector('h5').textContent = movieList[i].Title;
        movie.querySelector('p').textContent = movieList[i].Year
        i++;
    })

    
}
