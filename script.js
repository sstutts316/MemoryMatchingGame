const cards = document.querySelectorAll('.card');
let flippedCards = [];
let matchedPairs = 0;
let remainingTime = 60;
let timerInterval;

const timerDisplay = document.getElementById('timer');
const matchCountDisplay = document.getElementById('match-count');
let isFirstClick = true; 
cards.forEach(card => {
    card.addEventListener('click', () => handleCardClick(card));
});

function handleCardClick(card) {
    if (!card.classList.contains('flipped') && flippedCards.length < 2) {
        if (isFirstClick) {
            isFirstClick = false;
            createCards();
            startTimer();
        }

        card.classList.add('flipped');

        if (!flippedCards.includes(card)) {
            flippedCards.push(card);
        }

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function createCards() {
    const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
    const duplicateValues = cardValues.concat(cardValues); 

    shuffleArray(duplicateValues);

    cards.forEach((card, index) => {
        const cardValue = duplicateValues[index];
        card.querySelector('.card-back').textContent = cardValue;
        card.setAttribute('data-value', cardValue);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const value1 = card1.getAttribute('data-value');
    const value2 = card2.getAttribute('data-value');

    if (value1 === value2) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        matchCountDisplay.textContent = matchedPairs;

        if (matchedPairs === cards.length / 2) {
            clearInterval(timerInterval);
            endGame(true); 
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }

    flippedCards = [];
}

function startTimer() {
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        remainingTime--;
        timerDisplay.textContent = remainingTime;

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            remainingTime = 0;
            timerDisplay.textContent = remainingTime;
            endGame(false);
        }
    }, 1000);
}

function endGame(hasWon) {
    if (hasWon) {
        alert('Congratulations! You have won!');
    } else {
        alert('I\'m sorry, please try again.');
    }

    matchedPairs = 0;
    matchCountDisplay.textContent = matchedPairs;
    remainingTime = 60;
    timerDisplay.textContent = remainingTime;
    timerInterval = null;

    cards.forEach(card => {
        card.classList.remove('flipped', 'matched');
    });

    isFirstClick = true;
}

startTimer();



