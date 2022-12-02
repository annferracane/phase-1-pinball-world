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

// Fetch data for individual game and show game details
function fetchGameDataDetails(e) {
    const id = e.id.substr(5);
    const url = `${baseUrl}/${id}`;
    fetchData(url, displayGameDetails);
}

// Display game data on DOM
function displayGameDetails(game) {
    gameListDetailImg.src = game.image;
    gameListDetailTitle.textContent = game.name;
    gameListDetailScore.textContent = game.high_score;
    gameListDetailID.textContent = game.id;
}

// High score form handler
function handleHighScoreFormSubmit(e) {
    e.preventDefault();

    const highScore = e.target.querySelector('#score-input').value;
    const configObj = { high_score: highScore };

    fetch(`${baseUrl}/${gameListDetailID.textContent}`, {
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify(configObj)
    })
    .then(resp => resp.json())
    .catch(error => console.log(error));

    gameListDetailScore.textContent = highScore;
    e.target.reset();
    
}

// Generic fetch function that takes URL and function to act on data received
function fetchData(url, fn) {
    fetch(url)
    .then(resp => resp.json())
    .then(data => fn(data))
}