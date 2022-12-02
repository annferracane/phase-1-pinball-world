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