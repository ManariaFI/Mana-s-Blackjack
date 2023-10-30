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
const chipsEl = document.getElementById("chips-el");
const dealerChipsEl = document.getElementById("dealer-chips-el");
const enterBtnEl = document.getElementById("enterBtn");
const dealerEl = document.getElementById("dealer-el");
const nameEl = document.getElementById("name-el");
const betEl = document.getElementById("bet-el");
const playerTableEl = document.getElementById("player-table-el");
const dealerTableEl = document.getElementById("dealer-table-el");
const enBtnEl = document.getElementById("en-btn");
const fiBtnEl = document.getElementById("fi-btn");
const rulesEl = document.getElementById("rules");
const sloganEl = document.getElementById("slogan");

function renderData() {
    playerEl.textContent = player.name;
    chipsEl.textContent = local.chips[lang] + player.chips;
    dealerEl.textContent = "Mana";
    dealerChipsEl.textContent = local.chips[lang] + dealer.chips;
    betEl.textContent = local.bet[lang] + local.chips[lang] + player.currentBet;
}
//Localization script:
let lang = "en";
enBtnEl.addEventListener("click", function () {
    lang = "en";
    console.log(lang);
    renderTranslate();
});
fiBtnEl.addEventListener("click", function () {
    lang = "fi";
    console.log(lang);
    renderTranslate();
});

const local = {
    welcome: {
        en: "Want to play a round against me?",
        fi: "Pelataanko pari erää?",
    },
    chips: {
        en: "$",
        fi: "€",
    },
    name: {
        en: "Select your name:",
        fi: "Valitse nimesi:",
    },
    enter: {
        en: "ENTER THE TABLE",
        fi: "ISTU PÖYTÄÄN",
    },
    start: {
        en: "START GAME",
        fi: "ALOITA PELI",
    },
    bet: {
        en: "Bet: ",
        fi: "Panos: ",
    },
    sum: {
        en: "Sum: ",
        fi: "Summa: ",
    },

    cards: {
        en: "Cards: ",
        fi: "Kortit: ",
    },
    dealerCards: {
        en: "Dealer's cards:",
        fi: "Jakajan kortit:",
    },
    rules: {
        en: "House stays at 17 or higher",
        fi: "Talo jää, jos tulos 17 tai yli",
    },
    slogan: {
        en: "In the end, the House always wins!",
        fi: "Lopulta, talo voittaa aina!",
    },
    handStart: {
        en: "Ok, your bet is $",
        fi: "Ok, panoksesi on €",
    },
    double: {
        en: "DOUBLE",
        fi: "TUPLAUS",
    },
    newCard: {
        en: "NEW CARD",
        fi: "UUSI KORTTI",
    },
    stand: {
        en: "STAND",
        fi: "JÄÄ",
    },
    wantCard: {
        en: "Do you want to draw a new card?",
        fi: "Haluatko uuden kortin?",
    },
    blackJack: {
        en: "You've got Blackjack!",
        fi: "Sait Blackjackin!",
    },
    twentyOne: {
        en: "You have 21!",
        fi: "Tuloksesi on 21!",
    },
    lose: {
        en: "You're out of the game!",
        fi: "Sinulla meni metsään!",
    },
    doubleDown: {
        en: "DOUBLE DOWN!!!",
        fi: "TUPLA TAI KUITTI!!!",
    },
    double21: {
        en: "YOU HAVE TWENTY-ONE!!!",
        fi: "SINULLA ON 21!!!",
    },
    doubleOut: {
        en: "OUT!!!!! YEEHAW!",
        fi: "METSÄÄN! METSÄÄN!!!",
    },
    dealerTurn: {
        en: "Ok, it's my turn now!",
        fi: "Ok, minun vuoroni!",
    },
    dealerWin: {
        en: "The house wins!",
        fi: "Talo voittaa!",
    },
    push: {
        en: "PUSH! Returning your bet!",
        fi: "TASAN! Palautetaan panos!",
    },
    dealerLose: {
        en: "You won $",
        fi: "Voitit €",
    },
    dealerBust: {
        en: "I'm out! You won $",
        fi: "Menin metsään! Voitit €",
    },
    dealerDraw: {
        en: "As per rules, drawing new card",
        fi: "Nostan kortin sääntöjen mukaisesti",
    },
    restart: {
        en: "RESTART",
        fi: "UUDESTAAN",
    },
    gameOver: {
        en: "Unfortunately, you are broke. Game over!",
        fi: "Valitettavasti rahasi on loppu. Peli ohi!",
    },
    victory: {
        en: "Erm, we are out of cash. You win!",
        fi: "Öh, meiltä loppui käteinen. Voitit!",
    },
    yourBet: {
        en: "Select your bet",
        fi: "Valitse panos",
    },
    deal: {
        en: "DEAL",
        fi: "JAA",
    },
};
function renderTranslate() {
    messageEl.textContent = local.welcome[lang];
    yourName.textContent = local.name[lang];
    chipsEl.textContent = local.chips[lang] + player.chips;
    dealerChipsEl.textContent = local.chips[lang] + dealer.chips;
    betEl.textContent = local.bet[lang] + local.chips[lang] + player.currentBet;
    enterBtn.textContent = local.enter[lang];
    sumEl.textContent = local.sum[lang];
    dealerSumEl.textContent = local.sum[lang];
    cardsEl.textContent = local.cards[lang];
    dealerCardsEl.textContent = local.dealerCards[lang];
    rulesEl.textContent = local.rules[lang];
    sloganEl.textContent = local.slogan[lang];
}

//Game Start
renderTranslate();
messageEl.textContent = local.welcome[lang];
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
    message = local.handStart[lang] + player.currentBet;
    doubleBtn.style.display = "initial";
    doubleBtn.textContent = local.double[lang];
    newCardBtn.style.display = "initial";
    newCardBtn.textContent = local.newCard[lang];
    standBtn.style.display = "initial";
    standBtn.textContent = local.stand[lang];
    startBtn.style.display = "none";
    player.canHit = true;
    player.firstCard = getRandomCard();
    player.secondCard = getRandomCard();
    player.hand = [player.firstCard, player.secondCard];
    cardsEl.textContent =
        local.cards[lang] + [player.firstCard + player.secondCard];
    player.sum = cardValue(player.firstCard) + cardValue(player.secondCard);
    player;
    dealer.firstCard = getRandomCard();
    dealer.secondCard = getRandomCard();
    dealer.hand = [dealer.firstCard];
    dealer.sum = cardValue(dealer.firstCard);
    messageEl.textContent = message;
    renderGame();
}

function renderGame() {
    aceCheck();
    cardsEl.textContent = "";
    for (let i = 0; i < player.hand.length; i++) {
        cardsEl.textContent += player.hand[i] + " ";
    }
    sumEl.textContent = local.sum[lang] + player.sum;
    dealerCardsEl.textContent = "";
    for (let i = 0; i < dealer.hand.length; i++) {
        dealerCardsEl.textContent += dealer.hand[i] + " ";
    }
    dealerSumEl.textContent = local.sum[lang];
    if (player.sum <= 20) {
        message = local.wantCard[lang];
    } else if (player.sum === 21 && player.hand.length === 2) {
        message = local.blackJack[lang];
        blackJackPay();
        mainMenu();
    } else if (player.sum === 21) {
        message = local.twentyOne[lang];
        hideButtons();
        player.canHit = false;
        dealerBtn.style.display = "initial";
    } else {
        message = local.lose[lang];
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
    cardsEl.textContent = "";
    for (let i = 0; i < player.hand.length; i++) {
        cardsEl.textContent += player.hand[i] + " ";
    }
    dealer.hand.push(dealer.secondCard);
    dealerCardsEl.textContent = "";
    for (let i = 0; i < dealer.hand.length; i++) {
        dealerCardsEl.textContent += dealer.hand[i] + " ";
    }
    dealerSumEl.textContent = "Sum: " + dealer.sum;
    sumEl.textContent = "Sum: " + player.sum;
    dealer.hand = [dealer.firstCard, dealer.secondCard];
    dealer.sum = cardValue(dealer.firstCard) + cardValue(dealer.secondCard);
    if (player.sum < 21) {
        message = local.doubleDown[lang];
        hideButtons();
        dealerBtn.style.display = "initial";
        dealerBtn.textContent = local.deal[lang];
    } else if (player.sum === 21) {
        message = local.double21[lang];
        hideButtons();
        dealerBtn.style.display = "initial";
        dealerBtn.textContent = local.deal[lang];
    } else {
        message = local.doubleOut[lang];
        dealer.chips += player.currentBet;
        messageEl.textContent = message;
        mainMenu();
    }

    messageEl.textContent = message;
}

function stand() {
    hideButtons();
    message = local.dealerTurn[lang];
    messageEl.textContent = message;
    player.canHit = false;
    dealer.hand.push(dealer.secondCard);
    dealerCardsEl.textContent = "";
    for (let i = 0; i < dealer.hand.length; i++) {
        dealerCardsEl.textContent += dealer.hand[i] + " ";
    }
    dealer.sum = cardValue(dealer.firstCard) + cardValue(dealer.secondCard);
    dealer.sumEl = textContent = local.sum[lang] + dealer.sum;
    messageEl.textContent = message;
    renderData();
    dealerBtn.style.display = "initial";
    dealerBtn.textContent = local.deal[lang];
}

function renderDealer() {
    dealerAceCheck();
    dealerCardsEl.textContent = "";

    for (let i = 0; i < dealer.hand.length; i++) {
        dealerCardsEl.textContent += dealer.hand[i] + " ";

        dealerSumEl.textContent = local.sum[lang] + dealer.sum;
    }
    if (dealer.sum > 16 && player.sum < dealer.sum && dealer.sum < 22) {
        message = local.dealerWin[lang];
        dealer.chips += player.currentBet;
        mainMenu();
    } else if (
        dealer.sum > 16 &&
        player.sum === dealer.sum &&
        dealer.sum < 22
    ) {
        message = local.push[lang];
        pushPay();
        mainMenu();
    } else if (dealer.sum > 16 && dealer.sum < player.sum && dealer.sum < 22) {
        winPay();
        message = local.dealerLose[lang] + player.chipsWon;
        mainMenu();
    } else if (dealer.sum > 21) {
        winPay();
        message = local.dealerBust[lang] + player.chipsWon;
        mainMenu();
    } else {
        message = local.dealerDraw[lang];
        messageEl.textContent = message;
    }
    messageEl.textContent = message;
}

function restart() {
    location.reload();
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
    if (nameEl.value.length > 0) {
        player.name = nameEl.value;
        enterBtn.style.display = "none";
        nameEl.style.display = "none";
        yourName.style.display = "none";
        mainMenu();
        renderData();
    }
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
    message = local.yourBet[lang];
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
    startBtn.textContent = local.start[lang];
    betEl.textContent = "Bet: $" + player.currentBet;
}

function startGame() {
    if (player.chips <= 0) {
        message = local.gameOver[lang];
        hideButtons();
        restartBtn.style.display = "initial";
        restartBtn.textContent = local.restart[lang];
        messageEl.textContent = message;
        startBtn.style.display = "none";
    } else if (dealer.chips <= 0) {
        message = local.victory[lang];
        hideButtons();
        messageEl.textContent = message;
        restartBtn.textContent = local.restart[lang];
        startBtn.style.display = "none";
        restartBtn.style.display = "initial";
    } else {
        player.currentBet = 0;
        bet();
        renderData();
        cardsEl.textContent = player.hand;
        dealerCardsEl.textContent = dealer.hand;
        startBtn.style.display = "none";
    }
}
function handReset() {
    player.hand = [];
    dealer.hand = [];
}
