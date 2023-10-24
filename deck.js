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
