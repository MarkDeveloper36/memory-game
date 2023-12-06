let totalCards = 11;

const cardContainer = document.querySelector('#card-container');

if (totalCards < 16) {cardContainer.style.width = '330px'}
else if (totalCards < 25) {cardContainer.style.width = '440px'}
else {
    cardContainer.style.width = '770px';
    cardContainer.style.height = '440px';
};






gameLoop()

function gameLoop() {
    addCards();
}

function addCards() {
    for (let i = 0; i < totalCards; i++) {
        let card = document.createElement('div');
        card.classList.add('card');
        cardContainer.appendChild(card);
    }
}