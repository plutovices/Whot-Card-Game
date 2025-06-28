// 1. Variables and Selectors
const cardContainer = document.querySelector("#getcard");
const centerDeck = document.querySelector(".center-deck .cards");
const market = document.querySelector("#market");
const whotPack = [];
const shapes = ["circle", "square", "play", "star", "cross"];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];


// 2. Game Initialization
createCardPack();
shuffleDeck(whotPack);
initializeGame();


// 3. Event Listener for Market Click
market.addEventListener("click", drawCardFromMarket);


// 4. Card Pack Creation
function createCardPack() {
    shapes.forEach((shape) => {
        numbers.forEach((number) => {
            whotPack.push({ number, shape });
        });
    });
}


// 5. Shuffle Deck
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}


// 6. Initialize the Game
function initializeGame() {
    for (let i = 0; i < 5; i++) {
        drawCardFromMarket();
    }

    const card = whotPack.pop();
    updateCenterDeck(card);
}


// 7. Draw a Card from Market
function drawCardFromMarket() {
    if (whotPack.length === 0) {
        alert("No more cards in the market!");
        return;
    }
    const card = whotPack.pop();
    const cardElement = createCardElement(card);
    cardContainer.appendChild(cardElement);
}


// 8. Create Card Element
function createCardElement(card, isCenterDeck = false) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("cards1", "hidden", "playercard");
    cardDiv.dataset.number = card.number;
    cardDiv.dataset.shape = card.shape;

    const sizeClass = isCenterDeck ? "fa-4x" : "fa-4x";
    const numberFontSize = isCenterDeck ? "20px" : "20px";

    cardDiv.innerHTML = `
        <i class="fa-solid fa-${card.shape} ${sizeClass}" style="color: #800808;"></i>
        <div>
            <i class="fa-solid fa-${card.shape} fa-lg" style="color: #800808; position: absolute; left: 5px; top: 40px;"></i>
            <p class="edge" style="font-size: ${numberFontSize}; font-weight: 500;">${card.number}</p>
        </div>
        <i class="fa-solid fa-${card.shape} fa-lg" style="color: #800808; position: absolute; right: 5px; bottom: 40px;"></i>
        <p class="edge1" style="font-size: ${numberFontSize}; font-weight: 500;">${card.number}</p>`;
    
    return cardDiv;
}


// 9. Update the Center Deck
function updateCenterDeck(card) {
    centerDeck.innerHTML = "";
    centerDeck.dataset.number = card.number;
    centerDeck.dataset.shape = card.shape;

    const cardElement = createCardElement(card, true);
    cardElement.classList.remove("hidden");
    centerDeck.appendChild(cardElement);
}


// 10. Card Play Event Listener
cardContainer.addEventListener("click", (event) => {
    const clickedCard = event.target.closest(".playercard");
    if (clickedCard && isValidCard(clickedCard, centerDeck)) {
        playCardToCenterDeck(clickedCard);
    } else if (clickedCard) {
        alert("Invalid card! You must match the shape or number.");
    }
});


// 11. Validate the Card
function isValidCard(card, centerDeck) {
    const { number: cardNumber, shape: cardShape } = card.dataset;
    const { number: centerNumber, shape: centerShape } = centerDeck.dataset;

    return cardNumber === centerNumber || cardShape === centerShape;
}


// 12. Play the Card to the Center Deck
function playCardToCenterDeck(card) {
    card.remove();

    updateCenterDeck({
        number: card.dataset.number,
        shape: card.dataset.shape,
    });

    checkWinner();
}


// 13. Check for Winner
function checkWinner() {
    const remainingCards = cardContainer.querySelectorAll(".playercard").length;
    if (remainingCards === 0) {
        alert("Congratulations! You have won the game!");
    }
}