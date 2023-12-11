let totalCards = 20;

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
        let cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');
        cardGrid.appendChild(cardContainer);
        let cardFront = document.createElement('div');
        cardFront.classList.add('cart-front');
        cardContainer.appendChild(cardFront);
    }
}