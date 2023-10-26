let player = {
    name: "Player",
    chips: 1000,
    hand: [],
    sum: 0,
    canHit: false,
    aceCount: 0,
    firstCard: "",
    secondCard: "",
    currentBet: 0,
    chipsWon: 0,
};
let dealer = {
    chips: 1000,
    hand: [],
    sum: 0,
    aceCount: 0,
    firstCard: "",
    secondCard: "",
    chipsLost: 0,
};

let message = "";
let deck = [];

const messageEl = document.getElementById("message-el");
const sumEl = document.getElementById("sum-el");
const cardsEl = document.getElementById("cards-el");
const playerEl = document.getElementById("player-el");
const dealerSumEl = document.getElementById("dealer-sum-el");
const dealerCardsEl = document.getElementById("dealer-cards-el");
const enterBtnEl = document.getElementById("enterBtn");
const dealerEl = document.getElementById("dealer-el");
const nameEl = document.getElementById("name-el");
const betEl = document.getElementById("bet-el");

function renderData() {
    playerEl.textContent = player.name + ": $" + player.chips;
    dealerEl.textContent = "The House: $" + dealer.chips;
    betEl.textContent = "Current bet: $" + player.currentBet;
}

//Game Start
hideButtons();
startBtn.style.display = "none";
prepareDeck();
restartBtn.style.display = "none";

//Card related functions
function getRandomCard() {
    let card = deck.pop();
    return card;
}

function newCard() {
    if (player.canHit === true) {
        let card = getRandomCard();
        player.sum += cardValue(card);
        player.hand.push(card);
        doubleBtn.style.display = "none";
        renderGame();
    }
}

function dealerCard() {
    if (dealer.sum > 16) {
        renderDealer();
    } else {
        let card = getRandomCard();
        dealer.sum += cardValue(card);
        dealer.hand.push(card);
        renderDealer();
    }
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

function handStart() {
    message = "Ok, your bet is $" + player.currentBet + " this time!";
    doubleBtn.style.display = "initial";
    newCardBtn.style.display = "initial";
    standBtn.style.display = "initial";
    startBtn.style.display = "none";
    player.canHit = true;
    player.firstCard = getRandomCard();
    player.secondCard = getRandomCard();
    player.hand = [player.firstCard, player.secondCard];
    player.sum = cardValue(player.firstCard) + cardValue(player.secondCard);
    dealer.firstCard = getRandomCard();
    dealer.secondCard = getRandomCard();
    dealer.hand = [dealer.firstCard];
    dealer.sum = cardValue(dealer.firstCard);
    messageEl.textContent = message;
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
        dealer.chips += player.currentBet;
        mainMenu();
    }
    messageEl.textContent = message;
}
function double() {
    player.chips -= player.currentBet;
    player.currentBet += player.currentBet;
    renderData();
    player.canHit = false;
    let card = getRandomCard();
    player.sum += cardValue(card);
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
    dealer.sum = cardValue(dealer.firstCard) + cardValue(dealer.secondCard);
    if (player.sum < 21) {
        message = "DOUBLE DOWN!!!";
        hideButtons();
        dealerBtn.style.display = "initial";
    } else if (player.sum === 21) {
        message = "YOU HAVE TWENTY-ONE!!!";
        hideButtons();
        dealerBtn.style.display = "initial";
    } else {
        message = "OUT!!!!! YEEHAW!";
        dealer.chips += player.currentBet;
        messageEl.textContent = message;
        mainMenu();
    }

    messageEl.textContent = message;
}

function stand() {
    hideButtons();
    message = "Ok, it's my turn now!";
    player.canHit = false;
    dealerCardsEl.textContent =
        "Dealer's Cards: " + dealer.firstCard + " " + dealer.secondCard;
    dealer.sum = cardValue(dealer.firstCard) + cardValue(dealer.secondCard);
    dealer.sumEl = textContent = "Dealer's sum: " + dealer.sum;
    messageEl.textContent = message;
    renderData();
    dealerBtn.style.display = "initial";
}

function renderDealer() {
    dealerAceCheck();
    dealerCardsEl.textContent = "Dealer's cards: ";

    for (let i = 0; i < dealer.hand.length; i++) {
        dealerCardsEl.textContent += dealer.hand[i] + " ";

        dealerSumEl.textContent = "Dealer's sum: " + dealer.sum;
    }
    if (dealer.sum > 16 && player.sum < dealer.sum && dealer.sum < 22) {
        message = "The house wins!";
        dealer.chips += player.currentBet;
        mainMenu();
    } else if (
        dealer.sum > 16 &&
        player.sum === dealer.sum &&
        dealer.sum < 22
    ) {
        message = "PUSH! Returning your bet!";
        pushPay();
        mainMenu();
    } else if (dealer.sum > 16 && dealer.sum < player.sum && dealer.sum < 22) {
        winPay();
        message = "You won $" + player.chipsWon;
        mainMenu();
    } else if (dealer.sum > 21) {
        winPay();
        message = "I'm out! You won $" + player.chipsWon;
        mainMenu();
    } else {
        message = "As per rules, drawing new card";
        message.textContent = message;
    }
    messageEl.textContent = message;
}

function restart() {
    fullReset();
    deck = [];
    hideButtons();
    prepareDeck();
    player.chips = 1000;
    dealer.chips = 1000;
    mainMenu();
}
//Button click functions
bet10.addEventListener("click", function () {
    player.currentBet += 10;
    player.chips -= 10;
    hideButtons();
    renderData();
    handStart();
});

bet20.addEventListener("click", function () {
    player.currentBet += 20;
    player.chips -= 20;
    hideButtons();
    renderData();
    handStart();
});

bet30.addEventListener("click", function () {
    player.currentBet += 30;
    player.chips -= 30;
    hideButtons();
    renderData();
    handStart();
});

bet40.addEventListener("click", function () {
    player.currentBet += 40;
    player.chips -= 40;
    hideButtons();
    renderData();
    handStart();
});

bet50.addEventListener("click", function () {
    player.currentBet += 50;
    player.chips -= 50;
    hideButtons();
    renderData();
    handStart();
});
enterBtnEl.addEventListener("click", function () {
    player.name = nameEl.value;
    enterBtn.style.display = "none";
    nameEl.style.display = "none";
    yourName.style.display = "none";

    mainMenu();
    renderData();
});
//Deck preparing, n declares amount of decks used
function createDeck(n) {
    this.names = [
        "A",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "J",
        "Q",
        "K",
    ];
    this.suits = ["♥", "♦", "♠", "♣"];
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < this.suits.length; i++) {
            for (let j = 0; j < this.names.length; j++) {
                deck.push(suits[i] + names[j]);
            }
        }
    }
    return deck;
}
function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let shuffle = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[shuffle];
        deck[shuffle] = temp;
    }
}
function cardValue(card) {
    if (
        card === "♥J" ||
        card === "♥Q" ||
        card === "♥K" ||
        card === "♥10" ||
        card === "♦J" ||
        card === "♦Q" ||
        card === "♦K" ||
        card === "♦10" ||
        card === "♠J" ||
        card === "♠Q" ||
        card === "♠K" ||
        card === "♠10" ||
        card === "♣J" ||
        card === "♣Q" ||
        card === "♣K" ||
        card === "♣10"
    ) {
        return 10;
    } else if (
        card === "♥A" ||
        card === "♦A" ||
        card === "♠A" ||
        card === "♣A"
    ) {
        if (player.canHit === true) {
            player.aceCount += 1;
            return 11;
        } else {
            dealer.aceCount += 1;
            return 11;
        }
    } else if (
        card === "♥9" ||
        card === "♦9" ||
        card === "♠9" ||
        card === "♣9"
    ) {
        return 9;
    } else if (
        card === "♥8" ||
        card === "♦8" ||
        card === "♠8" ||
        card === "♣8"
    ) {
        return 8;
    } else if (
        card === "♥7" ||
        card === "♦7" ||
        card === "♠7" ||
        card === "♣7"
    ) {
        return 7;
    } else if (
        card === "♥6" ||
        card === "♦6" ||
        card === "♠6" ||
        card === "♣6"
    ) {
        return 6;
    } else if (
        card === "♥5" ||
        card === "♦5" ||
        card === "♠5" ||
        card === "♣5"
    ) {
        return 5;
    } else if (
        card === "♥4" ||
        card === "♦4" ||
        card === "♠4" ||
        card === "♣4"
    ) {
        return 4;
    } else if (
        card === "♥3" ||
        card === "♦3" ||
        card === "♠3" ||
        card === "♣3"
    ) {
        return 3;
    } else if (
        card === "♥2" ||
        card === "♦2" ||
        card === "♠2" ||
        card === "♣2"
    ) {
        return 2;
    }
}

function prepareDeck() {
    createDeck(8);
    shuffleDeck();
}
//Bet functions

function bet() {
    message = "Select your bet";
    bet10.style.display = "initial";
    bet20.style.display = "initial";
    bet30.style.display = "initial";
    bet40.style.display = "initial";
    bet50.style.display = "initial";

    messageEl.textContent = message;
}

function blackJackPay() {
    dealer.chipsLost = player.currentBet * 1.5;
    player.chipsWon = player.currentBet * 2.5;
    player.chips += player.chipsWon;
    dealer.chips -= dealer.chipsLost;
    renderData();
}
function winPay() {
    dealer.chipsLost = player.currentBet;
    player.chipsWon = player.currentBet * 2;
    player.chips += player.chipsWon;
    dealer.chips -= dealer.chipsLost;
    renderData();
}
function pushPay() {
    player.chips += player.currentBet;
    renderData();
}
//Hides all buttons from interface
function hideButtons() {
    doubleBtn.style.display = "none";
    newCardBtn.style.display = "none";
    standBtn.style.display = "none";
    dealerBtn.style.display = "none";
    restartBtn.style.display = "none";
    bet10.style.display = "none";
    bet20.style.display = "none";
    bet30.style.display = "none";
    bet40.style.display = "none";
    bet50.style.display = "none";
}
function fullReset() {
    //resets all elements for the next round
    player.hasBlackJack = false;
    player.aceCount = 0;
    player.double = false;
    player.canHit = false;
    dealer.hasBlackJack = false;
    dealer.aceCount = 0;
    handReset();
}

function mainMenu() {
    hideButtons();
    fullReset();
    startBtn.style.display = "initial";
    betEl.textContent = "Current bet: $" + player.currentBet;
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
        player.currentBet = 0;
        bet();
        renderData();
        cardsEl.textContent = "Cards: " + player.hand;
        dealerCardsEl.textContent = "Dealer's cards: " + dealer.hand;
        startBtn.style.display = "none";
    }
}
//Bet functions

function bet() {
    message = "Select your bet";
    bet10.style.display = "initial";
    bet20.style.display = "initial";
    bet30.style.display = "initial";
    bet40.style.display = "initial";
    bet50.style.display = "initial";

    messageEl.textContent = message;
}
function handReset() {
    player.hand = [];
    dealer.hand = [];
}
