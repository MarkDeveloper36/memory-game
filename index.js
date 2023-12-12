let totalCards = 20;
let cardsFliped = 0;

const cardGrid = document.querySelector('#card-grid');

let cols = Math.ceil(Math.sqrt(totalCards));
let rows = Math.ceil(totalCards / cols);

cardGrid.style.gridTemplateColumns = `repeat(${cols}, 100px)`;
cardGrid.style.gridTemplateRows = `repeat(${rows}, 100px)`;


gameLoop()

function gameLoop() {
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
        cardBack.innerText = (i + 1);
        card.appendChild(cardBack);

        card.addEventListener('click', () => {
            card.classList.add('card-flip');
            cardsFliped ++;
            flipBack(cardsFliped);
        });
    }
}

function flipBack (num) {
    if (num > 1) {
        cardsFliped = 0;
        const flipedCards = document.querySelectorAll('.card-flip');
        setTimeout(() => {
            flipedCards[0].classList.remove('card-flip');
            flipedCards[1].classList.remove('card-flip');    
        }, 1200);
    }
}

// To do
// 1. add feature to give each card a random rotate x or rotate y 