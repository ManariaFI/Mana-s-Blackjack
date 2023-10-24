hideButtons();
startBtn.style.display = "none";
prepareDeck();
restartBtn.style.display = "none";

enterBtnEl.addEventListener("click", function () {
    player.name = nameEl.value;
    enterBtn.style.display = "none";
    nameEl.style.display = "none";
    yourName.style.display = "none";

    mainMenu();
    renderData();
});
//Hides all buttons from interface
function hideButtons() {
    doubleBtn.style.display = "none";
    newCardBtn.style.display = "none";
    standBtn.style.display = "none";
    dealerBtn.style.display = "none";
    bet10.style.display = "none";
    bet20.style.display = "none";
    bet30.style.display = "none";
    bet40.style.display = "none";
    bet50.style.display = "none";
}
function fullReset() {
    //resets all the flags for the next round
    player.hasBlackJack = false;
    player.aceCount = 0;
    player.double = false;
    player.canHit = false;
    dealer.hasBlackJack = false;
    dealer.aceCount = 0;
    dealer.canHit = false;
}
function renderAll() {
    renderGame();
    renderData();
    renderDealer();
}

function mainMenu() {
    hideButtons();
    fullReset();
    renderAll();
    startBtn.style.display = "initial";
}

function startGame() {
    if (player.chips <= 0) {
        message = "Unfortunately, you are broke. Game over!";
        hideButtons();
        restartBtn.style.display = "initial";
        messageEl.textContent = message;
        startBtn.style.display = "none";
    } else if (dealer.chips <= 0) {
        message = "Erm, we are out of cash. You win!";
        hideButtons();
        messageEl.textContent = message;
        startBtn.style.display = "none";
        restartBtn.style.display = "initial";
    } else {
        bet();
        startBtn.style.display = "none";
    }
}
// Elements for interface
const messageEl = document.getElementById("message-el");
const sumEl = document.getElementById("sum-el");
const cardsEl = document.getElementById("cards-el");
const playerEl = document.getElementById("player-el");
const dealerSumEl = document.getElementById("dealer-sum-el");
const dealerCardsEl = document.getElementById("dealer-cards-el");
const enterBtnEl = document.getElementById("enterBtn");
const dealerEl = document.getElementById("dealer-el");
const nameEl = document.getElementById("name-el");

playerEl.textContent = player.name + ": $" + player.chips;
