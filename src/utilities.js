'use strict';
var elementTemplate;
var elementToClone;


module.exports = {
  getElementToClone: function() {
    elementTemplate = elementTemplate || document.querySelector('template');
    if ('content' in elementTemplate) {
      elementToClone = elementTemplate.content.querySelector('.review');
    } else {
      elementToClone = elementTemplate.querySelector('.review');
    }
    return elementToClone;
  },
  updateReviewsButtonState: function(reviews, page, eventButton, pageSize) {
    if(page + 1 < Math.ceil(reviews.length / pageSize)) {
      eventButton.classList.remove('invisible');
    } else {
      eventButton.classList.add('invisible');
    }
  },
  areCloudsVisible: function(container, gap) {
    var cloudsPosition = container.getBoundingClientRect();
    return cloudsPosition.bottom >= gap;
  },
  isGameVisible: function(container, gap, game) {
    var gameContainerPosition = container.getBoundingClientRect();
    if (gameContainerPosition.bottom <= gap) {
      game.setGameStatus(window.Game.Verdict.PAUSE);
    }
  }
};
