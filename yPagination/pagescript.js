const cards = document.querySelectorAll('.card');

const searchBtn = document.querySelector('#searchBtn')

const cardFront = document.querySelectorAll('.card-body');
const cardSlide = document.querySelectorAll('#slide');


const key = "f6e256e1"





cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.firstElementChild.style.width = "100%"
        card.firstElementChild.style.backgroundColor = "#9D7C83"
        card.firstElementChild.firstElementChild.style.transition = 'visibility 1s ease-in-out .7s';
        card.firstElementChild.firstElementChild.style.visibility = "visible"
        
    })
    card.addEventListener('mouseleave', ()=>{
        card.firstElementChild.style.width = "1px"
        card.firstElementChild.style.backgroundColor = "red"
        card.firstElementChild.firstElementChild.style.transition = 'none';
        card.firstElementChild.firstElementChild.style.visibility = "hidden"
    })
})



const mI = {
    title: null,
    year: null,
    rated: null,
    genre: null,
    runtime: null,
    director: null,
    actors: null,
    plot: null,
    ratings: null,

    

    addMovie: function(object) {
        mI.title = object.Title
        mI.year = object.Year
        mI.rated = object.Rated
        mI.genre = object.Genre
        mI.runtime = object.Runtime
        mI.director = object.Director
        mI.actors = object.Actors
        mI.plot = object.Plot
        mI.ratings = [object.Ratings, object.Metascore, object.imdbRating]

        return mI
        // return [this.title, this.year, this.rated, this.genre, this.runtime, this.director, this.actors, this.plot, this.ratings]


    },

}


async function getMovies(searchValue){
    const apiUrl = `https://www.omdbapi.com/?s=${searchValue}&type=movie&plot=short&apikey=${key}`

    let mList = fetch(apiUrl)
    .then(response => response.json())
    .then(data => wrapper(data.Search) )

}    

async function wrapper(mList){
    let list = mList;
    
    let newList = []
    let posters = []

    list.forEach(movie => {
        let id = movie.imdbID;
        let poster = movie.Poster
        newList.push(id);
        posters.push(poster)
    })
    
    for(i=0; i < newList.length - 2; i++) {
        let movie = await MovieRequest(newList[i]);
        
        cardFront[i].previousElementSibling.setAttribute('src', posters[i])
        cardFront[i].querySelector('.card-title').textContent = movie.title;
        cardFront[i].querySelector('div').querySelector('.rating').textContent = movie.rated
        cardFront[i].querySelector('div').querySelector('.year').textContent = movie.year
        cardFront[i].querySelector('div').querySelector('.duration').textContent = movie.runtime
        cardFront[i].querySelector('div').querySelector('div').querySelector('p').textContent = movie.ratings[0][1].Value 
        cardFront[i].querySelector('.card-text').textContent = movie.plot;

        cardSlide[i].querySelector('h3').textContent = movie.title;
        let basicMovieInfo = cardSlide[i].querySelector('div').querySelectorAll('p')
        basicMovieInfo[0].textContent = movie.year
        basicMovieInfo[1].textContent = movie.runtime
        basicMovieInfo[2].textContent = movie.rated
        let prodInfo = cardSlide[i].querySelector('.production').querySelectorAll('p');
        prodInfo[0].textContent = movie.genre
        prodInfo[1].textContent = movie.actors
        prodInfo[2].textContent = movie.director


    }
}


async function MovieRequest(imdbID) {
    
    const apiUrl= `https://www.omdbapi.com/?i=${imdbID}&type=movie&plot=short&apikey=${key}`
    


    let movie = fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        return mI.addMovie(data)
    })



    return movie
}

// async function changeDOM(movieId){

//     let response = await MovieRequest(movieId)    
//     //front 

//     const cardFront = document.querySelector('.card-body')
//     const movieInfoDiv = cardFront.querySelector('div').querySelectorAll('p')
//     const mRating = cardFront.querySelector('div').querySelector('div').querySelector('p')
//     const desc = cardFront.querySelector('p.card-text')
    
    

//     cardFront.querySelector('h5').textContent = response.title;
    
//     movieInfoDiv[0].textContent = response.rated
//     movieInfoDiv[1].textContent = response.year
//     movieInfoDiv[2].textContent = response.runtime
//     mRating.textContent = response.ratings[0][1].Value;
//     desc.textContent = response.plot;

//     //slide 

//     const slide = document.querySelector('#slide')
//     const basicInfo = slide.querySelector('div').querySelectorAll('p');
//     const prodInfo = slide.querySelector('.production').querySelectorAll('p')

//     slide.querySelector('h3').textContent = response.title;
//     basicInfo[0].textContent = response.year;
//     basicInfo[1].textContent = response.runtime;
//     basicInfo[2].textContent = response.rated;
//     prodInfo[0].textContent = response.genre;
//     prodInfo[1].textContent = response.actors;
//     prodInfo[2].textContent = response.director;

// }

// pirate test
// changeDOM('tt0325980')

    




