//Player and dealer data
let player = {
    name: "Player",
    chips: 200,
    hand: [],
    sum: 0,
    double: false,
    canHit: false,
    aceCount: 0,
    firstCard: "",
    secondCard: "",
};
let dealer = {
    chips: 200,
    hand: [],
    sum: 0,
    aceCount: 0,
    firstCard: "",
    secondCard: "",
};
let message = "";

// Elements for interface
const messageEl = document.getElementById("message-el");
const sumEl = document.getElementById("sum-el");
const cardsEl = document.getElementById("cards-el");
const playerEl = document.getElementById("player-el");
const dealerSumEl = document.getElementById("dealer-sum-el");
const dealerCardsEl = document.getElementById("dealer-cards-el");
const enterBtnEl = document.getElementById("enterBtn");
const dealerEl = document.getElementById("dealer-el");
const nameEl = document.getElementById("name");

playerEl.textContent = player.name + ": $" + player.chips;

function renderData() {
    playerEl.textContent = player.name + ": $" + player.chips;
    dealerEl.textContent = "The House: $" + dealer.chips;
}

//When game is started:
hideButtons();
startBtn.style.display = "none";

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
    splitBtn.style.display = "none";
    newCardBtn.style.display = "none";
    standBtn.style.display = "none";
    dealerBtn.style.display = "none";
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
function mainMenu() {
    hideButtons();
    fullReset();
    startBtn.style.display = "initial";
}
//Gameplay related functions
function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1;
    if (randomNumber > 10) {
        return 10;
    } else if (randomNumber === 1) {
        if (player.canHit === true) {
            player.aceCount += 1;
            return 11;
        } else {
            dealer.aceCount += 1;
            return 11;
        }
    } else {
        return randomNumber;
    }
}

function newCard() {
    console.log(getRandomCard);
    if (player.canHit === true) {
        let card = getRandomCard();
        player.sum += card;
        player.hand.push(card);
        doubleBtn.style.display = "none";
        renderGame();
    }
}
function dealerCard() {
    let card = getRandomCard();
    dealer.sum += card;
    dealer.hand.push(card);
    renderDealer();
}
//Checks if hand have ace with value of 11, if they do and would bust substract 10 points from score

function aceCheck() {
    for (let i = 0; i <= player.aceCount; i++) {
        if (player.sum > 21 && player.aceCount >= 1) {
            player.aceCount -= 1;
            player.sum -= 10;
        }
    }
}
function dealerAceCheck() {
    for (let i = 0; i <= dealer.aceCount; i++) {
        if (dealer.sum > 21 && dealer.aceCount >= 1) {
            dealer.aceCount -= 1;
            dealer.sum -= 10;
        }
    }
}
//
//Bet payout functions

function bet() {
    player.chips -= 10;
    dealer.chips += 10;

    renderData();
}
function blackJackPay() {
    player.chips += 25;
    dealer.chips -= 25;
    renderData();
}
function winPay() {
    player.chips += 20;
    dealer.chips -= 20;
    renderData();
}
function pushPay() {
    chips += 10;
    dealer.chips -= 10;
    renderData();
}
//
function startGame() {
    bet();
    doubleBtn.style.display = "initial";
    newCardBtn.style.display = "initial";
    standBtn.style.display = "initial";
    startBtn.style.display = "none";
    hasBlackJack = false;
    player.canHit = true;
    player.firstCard = getRandomCard();
    player.secondCard = getRandomCard();
    player.hand = [player.firstCard, player.secondCard];
    player.sum = player.firstCard + player.secondCard;
    dealer.firstCard = getRandomCard();
    dealer.secondCard = getRandomCard();
    dealer.hand = [dealer.firstCard, "??"];
    dealer.sum = dealer.firstCard;
    renderGame();
}

function renderGame() {
    aceCheck();
    cardsEl.textContent = "Cards: ";
    for (let i = 0; i < player.hand.length; i++) {
        cardsEl.textContent += player.hand[i] + " ";
    }
    sumEl.textContent = "Sum: " + player.sum;
    dealerCardsEl.textContent = "Dealer's cards: ";
    for (let i = 0; i < dealer.hand.length; i++) {
        dealerCardsEl.textContent += dealer.hand[i] + " ";
    }
    dealerSumEl.textContent = "Dealer's sum: " + dealer.sum;
    if (player.sum <= 20) {
        message = "Do you want to draw a new card?";
    } else if (player.sum === 21 && player.hand.length === 2) {
        message = "You've got Blackjack!";
        blackJackPay();
        mainMenu();
    } else if (player.sum === 21) {
        message = "You have 21!";
        hideButtons();
        player.canHit = false;
        dealerBtn.style.display = "initial";
    } else {
        message = "You're out of the game!";
        player.canHit = false;
        mainMenu();
    }
    messageEl.textContent = message;
}
function double() {
    player.double = true;
    bet();
    let card = getRandomCard();
    player.sum += card;
    player.hand.push(card);
    aceCheck();
    cardsEl.textContent = "Cards: ";
    for (let i = 0; i < player.hand.length; i++) {
        cardsEl.textContent += player.hand[i] + " ";
    }
    dealerCardsEl.textContent = "Dealer's cards: ";
    for (let i = 0; i < dealer.hand.length; i++) {
        dealerCardsEl.textContent += dealer.hand[i] + " ";
    }
    dealerSumEl.textContent = "Dealer's sum: " + dealer.sum;
    sumEl.textContent = "Sum: " + player.sum;
    dealer.hand = [dealer.firstCard, dealer.secondCard];
    dealer.sum = dealer.firstCard + dealer.secondCard;
    if (player.sum <= 20) {
        message = "DOUBLE DOWN!!!";
        hideButtons();
        player.canHit = false;
        dealerBtn.style.display = "initial";
    } else if (player.sum === 21) {
        message = "YOU HAVE TWENTY-ONE!!!";
        hideButtons();
        player.canHit = false;
        dealerBtn.style.display = "initial";
    } else {
        message = "OUT!!!!! YEEHAW!";
        player.canHit = false;
        mainMenu();
    }
    messageEl.textContent = message;
}

function stand() {
    hideButtons();
    message = "Ok, it's my turn now!";
    dealerBtn.style.display = "initial";
    player.canHit = false;
    dealer.hand = [dealer.firstCard, dealer.secondCard];
    dealer.sum = dealer.firstCard + dealer.secondCard;
    dealerCardsEl.textContent = "Dealer's cards: ";
    for (let i = 0; i < dealer.hand.length; i++) {
        dealerCardsEl.textContent += dealer.hand[i] + " ";
    }
    dealerSumEl.textContent = "Dealer's sum: " + dealer.sum;
    messageEl.textContent = message;
}
function renderDealer() {
    dealerAceCheck();
    dealerCardsEl.textContent = "Dealer's cards: ";
    for (let i = 0; i < dealer.hand.length; i++) {
        dealerCardsEl.textContent += dealer.hand[i] + " ";
    }
    dealerSumEl.textContent = "Dealer's sum: " + dealer.sum;

    if (dealer.sum > 16 && player.sum < dealer.sum && dealer.sum < 22) {
        message = "The house wins!";
        mainMenu();
    } else if (
        dealer.sum > 16 &&
        player.sum === dealer.sum &&
        dealer.sum < 22
    ) {
        message = "PUSH! Returning your bet!";
        if (player.double === true) {
            pushPay();
        }
        pushPay();
        mainMenu();
    } else if (dealer.sum < 17) {
        message = "Drawing, as per rules.";
    } else {
        message = "You won this round!";
        if (player.double === true) {
            winPay();
        }
        winPay();
        mainMenu();
    }
    messageEl.textContent = message;
}
