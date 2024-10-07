//API link
const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
//image path(add image name after this path)
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
//Api call according to user search (search keyword add after this api)
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
//container for movies (reference)
const moiveBox = document.querySelector(".movie-container")

//fetch movies (first time runs when page loads according to APIURL Argument)
async function getMovies(movie_api) {
    const moviedata = await fetch(movie_api)
    const data = await moviedata.json()
    console.log(data)
    showMovies(data)
}

//call when page loads
getMovies(APIURL)

//display movies on page
const showMovies = (data) => {
    moiveBox.innerHTML = "";
    data.results.forEach((result) => {
        const imagePath = result.poster_path === null ? "image-not-found.png" : IMGPATH + result.poster_path;
        const box = document.createElement("div")
        box.classList.add("movie-container")
        box.innerHTML = `
        <div class="movie-card">
            <img src="${imagePath}" alt="Movie Title" class="movie-image">
            <div class="movie-info">
                <h2 class="movie-title">${result.original_title}</h2>
                <p class="movie-description">${result.overview}</p>
                <div class="movie-rating">⭐  ${result.vote_average}</div>
            </div>
        </div>`
        moiveBox.appendChild(box)
    })
}

//display movies according to search keyword
document.querySelector("#search").addEventListener(
    "keyup",
    function (event) {
        if (event.target.value != "") {
            getMovies(SEARCHAPI + event.target.value)
        } else {
            getMovies(APIURL);
        }
    }
)
