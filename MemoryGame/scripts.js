const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click the card
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click the card
  secondCard = this;

  checkForMatch();
}

var countMatch = 0; countFlip = 0;

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  if (isMatch){
    disableCards();
    countMatch++;
    countFlip++;
    if (countMatch === 6){
      setTimeout(function(){
        alert("YOU WON" + "\nYou have flipped : " + countFlip + " times");
      alert("CLICK \nRESTART buttton at the right side to Play Again or \nBACK buttton at the left side to Go to CONTENT");
      }, 490);
      
    } 
  }else{
    unflipCards();
    countFlip++;
  }
  //isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);

}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));