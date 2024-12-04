const apiKey = 'YOUR_API_KEY';  // Replace with your TMDb API key
const apiUrl = 'https://api.themoviedb.org/3';

// Function to fetch movie data from TMDb API
async function fetchMovies() {
    try {
        const response = await fetch(`${apiUrl}/discover/movie?api_key=${apiKey}&language=en-US&page=1`);
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error("Error fetching movie data:", error);
    }
}

// Function to display movies on the page
function displayMovies(movies) {
    movieList.innerHTML = '';
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie');
        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title} (${new Date(movie.release_date).getFullYear()})</h3>
            <p>${movie.overview}</p>
            <button class="btn" onclick="addToWatchlist('${movie.id}')">Add to Watchlist</button>
        `;
        movieList.appendChild(movieCard);
    });
}

// Function to add movies to the watchlist
function addToWatchlist(movieId) {
    const movie = watchlistMovies.find(m => m.id === movieId);
    if (movie && !watchlist.includes(movie)) {
        watchlist.push(movie);
        updateWatchlist();
    }
}

// Function to update the watchlist display
function updateWatchlist() {
    const watchlistSection = document.querySelector('.watchlist .movies');
    watchlistSection.innerHTML = '';
    watchlist.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie');
        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title} (${new Date(movie.release_date).getFullYear()})</h3>
        `;
        watchlistSection.appendChild(movieCard);
    });
}

// Search function
function searchMovies() {
    const searchTerm = searchInput.value.toLowerCase();
    fetch(`${apiUrl}/search/movie?api_key=${apiKey}&query=${searchTerm}&language=en-US&page=1`)
        .then(response => response.json())
        .then(data => displayMovies(data.results))
        .catch(error => console.error("Error searching for movies:", error));
}

// Initialize the website with movie data
fetchMovies();
