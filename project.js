const cardContainer = document.querySelector("#getcard");
const bgContainer = document.querySelector("#background");
const frame = document.querySelector(".frame");
const centerDeck = document.querySelector(".center-deck .cards");
const market = document.querySelector("#market");
const whotPack = [];
const shapes = ["circle", "square", "play", "star", "cross"];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const floaters = []; //object
const leftBtn = document.querySelector(".arrow-left");
const rightBtn = document.querySelector(".arrow-right");

createCardPack();
shuffleDeck(whotPack);
initializeGame();



market.addEventListener("click", drawCardFromMarket);

leftBtn.onclick = () => {
    cardContainer.scrollBy({
        left: -300,
        behavior: "smooth"
    });
};

rightBtn.onclick = () => {
    cardContainer.scrollBy({
        left: 300,
        behavior: "smooth"
    });
};



for (let i=0; i<22; i++){
    const element = document.createElement("div");
    const float_shape = shapes[Math.floor( Math.random() * 5)];
    element.className = `fa-solid fa-${float_shape} fa-5x floater`;
    
    
    bgContainer.appendChild(element);
    
    floaters.push({
        element,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        speed: 0.3 + Math.random() * 0.8,
        offset: Math.random()* 100 //random horizontal postion in the sway
    })

}

let time =0;

function animate(){
    time += 0.02;
    floaters.forEach(floater => {

        floater.y -= floater.speed;

        floater.x += Math.sin(time + floater.offset) *0.35;
        if( floater.y < -800){
            floater.y = window.innerHeight + 50;
            floater.x = Math.random() * window.innerWidth;
        }
        // console.log(floater.y)

        floater.element.style.transform = `translate(${floater.x}px, ${floater.y}px)`;

    });

    requestAnimationFrame(animate);

}

 animate();

 
function createCardPack() {
    shapes.forEach((shape) => {
        numbers.forEach((number) => {
            whotPack.push({ number, shape });
        });
    });
}



function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}


//  Initialize the Game
function initializeGame() {
    for (let i = 0; i < 5; i++) {
        drawCardFromMarket();
    }

    const card = whotPack.pop();
    updateCenterDeck(card);
}


// . Draw a Card from Market
function drawCardFromMarket() {
    if (whotPack.length === 0) {
        alert("No more cards in the market!");
        return;
    }
    const card = whotPack.pop();
    const cardElement = createCardElement(card);
    cardContainer.appendChild(cardElement);
    //  if (cardContainer.querySelectorAll('div').length > 6){
    //     console.log("alertttt!!!!!!!!")
    //     cardContainer.style.background = " linear-gradient(to right, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.9) 100%)"
    //   }
}


//  Create Card Element
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


//  Update the Center Deck
function updateCenterDeck(card) {
    centerDeck.innerHTML = "";
    centerDeck.dataset.number = card.number;
    centerDeck.dataset.shape = card.shape;

    const cardElement = createCardElement(card, true);
    cardElement.classList.remove("hidden");
    centerDeck.appendChild(cardElement);
}

console.log(document.querySelectorAll(".cards").length);

//  Card Play Event Listener
cardContainer.addEventListener("click", (event) => {
    const clickedCard = event.target.closest(".playercard");
    if (clickedCard && isValidCard(clickedCard, centerDeck)) {
        playCardToCenterDeck(clickedCard);
    } else if (clickedCard) {
        alert("Invalid card! You must match the shape or number.");
    }
});


//  Validate the Card
function isValidCard(card, centerDeck) {
    const { number: cardNumber, shape: cardShape } = card.dataset;
    const { number: centerNumber, shape: centerShape } = centerDeck.dataset;

    return cardNumber === centerNumber || cardShape === centerShape;
}


//  Play the Card to the Center Deck
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