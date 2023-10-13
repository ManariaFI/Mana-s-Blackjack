let playerName = "Mana"
let chips = 200


let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let isDouble = false
let message = ""
const messageEl = document.getElementById("message-el")
const sumEl = document.getElementById("sum-el")
const cardsEl = document.getElementById("cards-el")
const playerEl = document.getElementById("player-el")
const dealerSumEl = document.getElementById("dealer-sum-el")
const dealerCardsEl = document.getElementById("dealer-cards-el")

playerEl.textContent = playerName + ": $" + chips

let dealerCards = []
let dealerSum = 0
let dealerTurn = false


bootUp()
function bootUp(){
    doubleBtn.style.display = "none"
    splitBtn.style.display = "none"
    newCardBtn.style.display = "none"
    standBtn.style.display = "none"
    dealerBtn.style.display = "none"

}

function mainMenu(){
        doubleBtn.style.display = "none"
        newCardBtn.style.display = "none"
        standBtn.style.display = "none"
        dealerBtn.style.display = "none"
        startBtn.style.display = "initial"
        isDouble = false
}

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}
function bet(){
    chips -= 10
    console.log(chips)
    playerEl.textContent = playerName + ": $" + chips
}
function blackJackPay(){
    chips += 25
    console.log(chips)
    playerEl.textContent = playerName + ": $" + chips
}
function winPay(){
    chips += 20
    console.log(chips)
    playerEl.textContent = playerName + ": $" + chips
}
function pushPay(){
    chips += 10
    console.log(chips)
    playerEl.textContent = playerName + ": $" + chips
}

function startGame() {
    bet()
    doubleBtn.style.display = "initial"
    newCardBtn.style.display = "initial"
    standBtn.style.display = "initial"
    startBtn.style.display = "none"
    hasBlackJack = false
    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    let dFirstCard = getRandomCard()
    dealerCards = [dFirstCard]
    dealerSum = dFirstCard
    renderGame()
  
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
            message = "Do you want to draw a new card?"

    } else if (sum === 21 && cards.length===2) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        blackJackPay()
        mainMenu()
    } else if (sum === 21) {
        message = "You have 21!"
        hasBlackJack = true
        bootUp()
        dealerBtn.style.display = "initial"


    } else{
        message = "You're out of the game!"
        isAlive = false
        mainMenu()
    }
    messageEl.textContent = message

    dealerCardsEl.textContent = "Dealer's cards: "
    for (let i = 0; i < dealerCards.length; i++){
        dealerCardsEl.textContent += dealerCards[i] + " "
    }
    dealerSumEl.textContent = "Dealer's sum: " + dealerSum
}
function double() {
    isDouble = true
    bet()
    let card = getRandomCard()
        sum += card
        cards.push(card)
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "DOUBLE DOWN!!!"
        bootUp()
        dealerBtn.style.display = "initial"

    } else if (sum === 21) {
        message = "YOU HAVE TWENTY-ONE!!!"
        bootUp()
        dealerBtn.style.display = "initial"


    } else {
        message = "OUT!!!!! YEEHAW!"
        isAlive = false
        mainMenu()
    }
    messageEl.textContent = message
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        doubleBtn.style.display = "none"
        renderGame()
        
    }
}
function stand(){
     bootUp()
     dealerBtn.style.display = "initial"
}
function renderDealer() {

    dealerCardsEl.textContent = "Dealer's cards: "
    for (let i = 0; i < dealerCards.length; i++){
        dealerCardsEl.textContent += dealerCards[i] + " "
    }
    dealerSumEl.textContent = "Dealer's sum: " + dealerSum

    if (dealerSum > 16 && sum < dealerSum && dealerSum < 22) {
        message = "The house wins!"
        mainMenu()

    } else if (dealerSum > 16 && sum === dealerSum && dealerSum < 22) {
        message = "PUSH! Returning your bet!"
        if (isDouble === true){
            pushPay()
        }
        pushPay()
        mainMenu()

    } else if (dealerSum < 17){
        message = "Drawing, as per rules."
    } else {
        message = "You won this round!"
        if (isDouble === true){
            winPay()
        }
        winPay()
        mainMenu()
    }
    messageEl.textContent = message
}
function dealerNewCard(){
    let card = getRandomCard()
        dealerSum += card
        dealerCards.push(card)
        renderDealer()
}