import { 
    logout, 
    checkAuth,
    getGames,
    createGame,
} from '../fetch-utils.js';
import { renderGame } from '../render-utils.js';

const currentGameEl = document.getElementById('current-game-container');
const pastGamesEl = document.getElementById('past-games-container');
const logoutButton = document.getElementById('logout');

const nameForm = document.getElementById('name-form');
const teamOneAddButton = document.getElementById('team-one-add-button');
const teamTwoAddButton = document.getElementById('team-two-add-button');
const teamOneSubtractButton = document.getElementById('team-one-subtract-button');
const teamTwoSubtractButton = document.getElementById('team-two-subtract-button');
const finishGameButton = document.getElementById('finish-game-button');
const teamOneLabel = document.getElementById('team-one-name');
const teamTwoLabel = document.getElementById('team-two-name');

checkAuth();

let pastGames = [];

let currentGame = {
    name1: '',
    name2: '',
    score1: 0,
    score2: 0,
};

nameForm.addEventListener('submit', (e) => {
    // don't forget to prevent the default form behavior!
    e.preventDefault();

    // get the name data from the form
    const formData = new FormData(nameForm);

    // set the state to this data from the form
    const name1 = formData.get('team-one');
    const name2 = formData.get('team-two');
    currentGame.name1 = name1;
    currentGame.name2 = name2;
    

    // reset the form values
    nameForm.requestFullscreen();

    // display updated data in the current game div
    displayCurrentGameEl();
    
});


teamOneAddButton.addEventListener('click', () => {
    // increment the current state for team one's score
    currentGame.score1++;
    
    // display updated data in the current game div
    displayCurrentGameEl();
});

teamTwoAddButton.addEventListener('click', () => {
    // increment the current state for team two's score
    currentGame.score2++;
    // display updated data in the current game div
    displayCurrentGameEl();
});

teamOneSubtractButton.addEventListener('click', () => {
    // decrement the current state for team one's score
    currentGame.score1--;

    // display updated data in the current game div
    displayCurrentGameEl();
});

teamTwoSubtractButton.addEventListener('click', () => {
    // decrement the current state for team two's score
    currentGame.score2--;

    // display updated data in the current game div
    displayCurrentGameEl();
});

finishGameButton.addEventListener('click', async() => {
    
    // create a new game using the current game state
    await createGame(currentGame);
    
    // re-fetch the games to get the updated state
    const games = await getGames();
    
    // reassign the past games state to the re-fetched, updated games
    pastGames = games;
    
    displayAllGames();
    
    currentGame = {
        name1: '',
        name2: '',
        score1: 0,
        score2: 0,
    };

    displayCurrentGameEl();
});

logoutButton.addEventListener('click', () => {
    logout();
});

 // on load . . .
window.addEventListener('', async() => {
    // fetch all games
    const games = await getGames();
    // check if there are any
    if (games) {
        pastGames = games;
        
       
    }
    displayAllGames(games); 
    // if there are, set those as the initial state of pastGames
    // then display all the games (hint: call displayAllGames())
    
});


function displayCurrentGameEl() {
    // clear out the current game div
    currentGameEl.textContent = '';

    // change the label to show team one's name;
    teamOneLabel.textContent = currentGame.name1;
    // change the label to show team two's name;
    teamTwoLabel.textContent = currentGame.name2;

    // call the render game function to create a game element
    const gameEl = renderGame(currentGame);
    gameEl.classList.add('current');
    
    // append the element to the cleared out current game div
    currentGameEl.append(gameEl);

    
}


function displayAllGames() {
    // clear out the past games list in the DOM
    pastGamesEl.textContent = '';

    // fetch and loop through the past games
    for (let game of pastGames) {
        const gameEl = renderGame(game);
        gameEl.classList.add('past');

        pastGamesEl.append(gameEl);
    } 
    
    // render and append a past game for each past game in state
}




