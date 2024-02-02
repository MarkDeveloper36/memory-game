let totalCards = 4;
let cardsToFlip = 2;
let flipedThisTurn;
let cardsMatched = 0;
let round = 1;
const roundCount = document.querySelector('#roundCount');
let isSoundtrackPlaying = false;

const availebleCardsNum = [];

const accessKey = '8yshMIXzRfy5yAhEIhNYWqDobX9vjOMt2GB5OoE7J4k';
const apiUrl = 'https://api.unsplash.com/photos/random?count=1&width=100&height=100&client_id=' + accessKey;

//grid
const cardGrid = document.querySelector('#card-grid');
let cols;
let rows;

//sound
const soundTrack = document.querySelector('#soundTrack');
soundTrack.addEventListener('ended', () => soundTrack.play());
const musicBtn = document.querySelector('#icon-container');
musicBtn.addEventListener('click', () => {
    if (!isSoundtrackPlaying) {
        soundTrack.play();
        isSoundtrackPlaying = true;
    } else {
        soundTrack.pause();
        isSoundtrackPlaying = false;
    }
});

const newGameBtn = document.querySelector('#newGameBtn');
newGameBtn.addEventListener('click', () => {
    resetRound();
    totalCards = 4;
    round = 1;
    roundCount.innerText = `Round: ${round}`;
    gameLoop(totalCards);
})

gameLoop(totalCards);

function appendGrid(num) {
    cols = Math.ceil(Math.sqrt(num));
    rows = Math.ceil(num / cols);
    cardGrid.style.gridTemplateColumns = `repeat(${cols}, 100px)`;
    cardGrid.style.gridTemplateRows = `repeat(${rows}, 100px)`;
}

function gameLoop(amoutOfCards) {
    appendGrid(totalCards);
    for (let j = 0; j < (amoutOfCards / 2); j++) {
        availebleCardsNum.push(`${j + 1}`);
        availebleCardsNum.push(`${j + 1}`);
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
        cardBack.innerText = giveCardBacksideNum(availebleCardsNum);
        let img = giveCardBackSideImg();
        console.log(img);
        // cardBack.style.backgroundImage = `url('${giveCardBackSideImg()}')`;
        card.appendChild(cardBack);

        card.addEventListener('click', () => {
            if (cardsToFlip > 0 && !card.classList.contains('card-flip')) {
                cardsToFlip--;
                card.classList.add('card-flip');
                flipBack(cardsToFlip);
            }
        });
    }
}

//https://api.unsplash.com/
function giveCardBacksideNum(backOfCardArr) {
    let randomIndex = Math.ceil(Math.random() * backOfCardArr.length);
    let result = backOfCardArr[randomIndex - 1];
    backOfCardArr.splice((randomIndex - 1), 1);
    return result;
}

async function giveCardBackSideImg() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (data && data.length > 0) {
        const imageUrl = data[0].urls.small;
        console.log(imageUrl);
        return imageUrl;
      } else {
        console.error('Geen afbeeldingen ontvangen van de Unsplash API.');
      }
    } catch (error) {
      console.error('Fout bij het ophalen van de afbeelding:', error);
    }
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
            }, 1000);
        } else {
            setTimeout(() => {
                flipedThisTurn[0].classList.add('locked');
                flipedThisTurn[1].classList.add('locked');
                cardsToFlip = 2;
                flipedThisTurn = null;
                cardsMatched = cardsMatched + 2;
                checkToStartNextRound(cardsMatched);
            }, 400);
        }
    }
}

function resetRound() {
    while (cardGrid.firstChild) {
        cardGrid.removeChild(cardGrid.lastChild);
    }
    cardsMatched = 0;
    cardsToFlip = 2;
}

function checkToStartNextRound(num) {
    if (num === totalCards) {
        resetRound();
        totalCards = totalCards + 2;
        round++;
        roundCount.innerText = `Round: ${round}`;
        gameLoop(totalCards)
    }
}