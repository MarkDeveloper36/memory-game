let totalCards = 20;

const cardGrid = document.querySelector('#card-grid');

let cols = Math.ceil(Math.sqrt(totalCards));
let rows = Math.ceil(totalCards / cols);
console.log('rows = ' + rows);
console.log('cols = ' + cols);

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
    }
}