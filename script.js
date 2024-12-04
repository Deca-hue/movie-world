const apiKey = 'f67b8ca8750ac6345dfdaabe9d466765';  // Replace with your TMDb API key
const apiUrl = 'https://api.themoviedb.org/3';

// Function to fetch movies based on search
async function searchMovies() {
    const searchTerm = document.getElementById('searchInput').value;
    if (!searchTerm) return;

    try {
        const response = await fetch(`${apiUrl}/search/movie?api_key=${apiKey}&query=${searchTerm}&language=en-US&page=1`);
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
}

// Function to display movies on the page
function displayMovies(movies) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie');
        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>${movie.release_date}</p>
        `;
        movieList.appendChild(movieCard);
    });
}

// Optional: Load popular movies on page load
async function loadPopularMovies() {
    try {
        const response = await fetch(`${apiUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Error fetching popular movies:', error);
    }
}

// Load popular movies when the page loads
loadPopularMovies();
