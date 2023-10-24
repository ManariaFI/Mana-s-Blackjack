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

function blackJackPay() {
    player.chips += player.currentBet * 2.5;
    dealer.chips -= player.currentBet * 2.5;
    renderData();
}
function winPay() {
    player.chips += player.currentBet * 2;
    dealer.chips -= player.currentBet * 2;
    renderData();
}
function pushPay() {
    player.chips += player.currentBet;
    renderData();
}
