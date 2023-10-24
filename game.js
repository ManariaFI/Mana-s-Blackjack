//Player and dealer data

let player = {
    name: "Player",
    chips: 200,
    hand: [],
    sum: 0,
    canHit: false,
    aceCount: 0,
    firstCard: "",
    secondCard: "",
    currentBet: 0,
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
let deck = [];

function renderData() {
    playerEl.textContent = player.name + ": $" + player.chips;
    dealerEl.textContent = "The House: $" + dealer.chips;
}

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
    let card = getRandomCard();
    dealer.sum += cardValue(card);
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

function handStart() {
    message = "Ok, your bet is $" + player.currentBet + " this time!";
    doubleBtn.style.display = "initial";
    newCardBtn.style.display = "initial";
    standBtn.style.display = "initial";
    startBtn.style.display = "none";
    hasBlackJack = false;
    player.canHit = true;
    player.firstCard = getRandomCard();
    player.secondCard = getRandomCard();
    player.hand = [player.firstCard, player.secondCard];
    player.sum = cardValue(player.firstCard) + cardValue(player.secondCard);
    dealer.firstCard = getRandomCard();
    dealer.secondCard = getRandomCard();
    dealer.hand = [dealer.firstCard, "??"];
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
        player.currentBet = 0;
        mainMenu();
    } else if (player.sum === 21) {
        message = "You have 21!";
        hideButtons();
        player.canHit = false;
        dealerBtn.style.display = "initial";
    } else {
        message = "You're out of the game!";
        player.canHit = false;
        player.currentBet = 0;
        mainMenu();
    }
    messageEl.textContent = message;
}
function double() {
    player.chips -= player.currentBet;
    player.currentBet += player.currentBet;
    renderData();
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
    player.canHit = false;
    dealer.hand = [dealer.firstCard, dealer.secondCard];
    dealer.sum = cardValue(dealer.firstCard) + cardValue(dealer.secondCard);
    dealerCardsEl.textContent = "Dealer's cards: ";
    for (let i = 0; i < dealer.hand.length; i++) {
        dealerCardsEl.textContent += dealer.hand[i] + " ";
    }
    dealerSumEl.textContent = "Dealer's sum: " + dealer.sum;
    if (dealer.sum <= 16) {
        dealerBtn.style.display = "initial";
    } else {
        startShowdown();
    }
}
function renderDealer() {
    dealerAceCheck();
    dealerCardsEl.textContent = "Dealer's cards: ";

    for (let i = 0; i < dealer.hand.length; i++) {
        dealerCardsEl.textContent += dealer.hand[i] + " ";
        if (dealer.sum >= 17) {
            startShowdown();
        }
    }

    dealerSumEl.textContent = "Dealer's sum: " + dealer.sum;
}

function startShowdown() {
    if (dealer.sum > 16 && player.sum < dealer.sum && dealer.sum < 22) {
        message = "The house wins!";
        dealer.chips += player.currentBet;
        player.currentBet = 0;
        mainMenu();
    } else if (
        dealer.sum > 16 &&
        player.sum === dealer.sum &&
        dealer.sum < 22
    ) {
        message = "PUSH! Returning your bet!";
        pushPay();
        player.currentBet = 0;
        mainMenu();
    } else {
        message = "You won $" + player.currentBet * 2;
        winPay();
        player.currentBet = 0;
        mainMenu();
    }
    messageEl.textContent = message;
}

function restart() {
    fullReset();
    deck = [];
    hideButtons();
    prepareDeck();
    player.chips = 200;
    dealer.chips = 200;
    mainMenu();
}
