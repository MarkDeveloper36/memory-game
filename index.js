let totalCards = 20;
let cardsToFlip = 2;
let flipedThisTurn = null;

const availebleCards = [];

const cardGrid = document.querySelector('#card-grid');

let cols = Math.ceil(Math.sqrt(totalCards));
let rows = Math.ceil(totalCards / cols);

cardGrid.style.gridTemplateColumns = `repeat(${cols}, 100px)`;
cardGrid.style.gridTemplateRows = `repeat(${rows}, 100px)`;


gameLoop(totalCards)

function gameLoop(amoutOfCards) {
    for (let j = 0; j < (amoutOfCards / 2); j++) {
        availebleCards.push(`${j + 1}`);
        availebleCards.push(`${j + 1}`);
    }
    addCards();
}

function addCards() {
    for (let i = 0; i < totalCards; i++) {
        let card = document.createElement('div');
        card.classList.add('card');
        cardGrid.appendChild(card);
        let cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        card.appendChild(cardFront);
        let cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.innerText = giveCardBackside(availebleCards);
        card.appendChild(cardBack);

        card.addEventListener('click', () => {
            if (cardsToFlip > 0) {
                cardsToFlip --;
                card.classList.add('card-flip');
                flipBack(cardsToFlip);
            }
        });
    }
}

function giveCardBackside(backOfCardArr) {
    let randomIndex = Math.ceil(Math.random() * backOfCardArr.length);
    let result = backOfCardArr[randomIndex - 1];
    backOfCardArr.splice((randomIndex - 1), 1);
    return result;
}

function flipBack (num) {
    if (num < 1) {
        flipedThisTurn = document.querySelectorAll('.card-flip:not(.locked)');
        if (flipedThisTurn[0].lastChild.textContent !== flipedThisTurn[1].lastChild.textContent) {
            setTimeout(() => {
                flipedThisTurn[0].classList.remove('card-flip');
                flipedThisTurn[1].classList.remove('card-flip');
                cardsToFlip = 2;
                flipedThisTurn = null;
            }, 1200);
        } else {
            setTimeout(() => {
                flipedThisTurn[0].classList.add('locked');
                flipedThisTurn[1].classList.add('locked');
                cardsToFlip = 2;
                flipedThisTurn = null;
            }, 1200);
        }
    }
}

// To do
// 1. add feature to give each card a random rotate x or rotate y 