// DOM Elements & Listener
const gameList = document.querySelector('.game-list');
const gameListDetailImg = document.querySelector('#detail-image');
const gameListDetailID = document.querySelector('#detail-id');
const gameListDetailTitle = document.querySelector('#detail-title');
const gameListDetailScore = document.querySelector('#detail-high-score');
const highscoreForm = document.querySelector('#high-score-form');
highscoreForm.addEventListener('submit', e => handleHighScoreFormSubmit(e)); 

// Fetch Game Data
const baseUrl = 'http://localhost:3000/games';
fetchData(baseUrl, displayGames);

// Display games in nav and show details of first game
function displayGames(gameData) {
    gameData.forEach(game => {
        const h5game = document.createElement('h5');
        h5game.textContent = `${game.name} (${game.manufacturer_name})`;
        h5game.id = `game-${game.id}`;
        h5game.addEventListener('click', e => fetchGameDataDetails(e.target));
        gameList.appendChild(h5game);
    })

    // Show first game in array
    const firstGame = document.querySelector(`#game-${gameData[0].id}`);
    fetchGameDataDetails(firstGame);
}

// Fetch data for invidual game and show game details
function fetchGameDataDetails(e) {
    const id = e.id.substr(5);
    const url = `${baseUrl}/${id}`;
    fetchData(url, displayGameDetails);
}