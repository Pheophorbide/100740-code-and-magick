'use strict';

(function() {
  var SINGLE_STAR_WIDTH = 30;
  var elementTemplate = document.querySelector('template');
  var elementToClone;

  if ('content' in elementTemplate) {
    elementToClone = elementTemplate.content.querySelector('.review');
  } else {
    elementToClone = elementTemplate.querySelector('.review');
  }


  var renderReviewElement = function(data) {
    var element = elementToClone.cloneNode(true);
    element.querySelector('.review-text').textContent = data.description;

    var ratingValue = data.rating;
    var ratingWidth = SINGLE_STAR_WIDTH * ratingValue;
    var ratingStar = element.querySelector('.review-rating');
    ratingStar.style.width = ratingWidth + 'px';

    var userPhoto = new Image(124, 124);
    userPhoto.onload = function(evt) {
      element.querySelector('.review-author').src = evt.target.src;
    };
    userPhoto.onerror = function() {
      element.classList.add('review-load-failure');
    };

    userPhoto.src = data.author.picture;

    return element;
  };

  var Review = function(data, container) {
    this.data = data;
    this.element = renderReviewElement(this.data);
    this.container = container;

    this.createElement(this.container, this.element);
    this.onReviewQuizClick = this.onReviewQuizClick.bind(this);
    this.addClickListener(this.element);
  };

  Review.prototype.onReviewQuizClick = function(event) {
    if (event.target.classList.contains('review-quiz-answer')) {
      event.target.classList.add('review-quiz-answer-active');
    }
  };

  Review.prototype.createElement = function(container, element) {
    container.appendChild(element);
  };

  Review.prototype.addClickListener = function(element) {
    element.querySelector('.review-quiz').addEventListener('click', this.onReviewQuizClick);
  };

  Review.prototype.remove = function() {
    this.element.querySelector('.review-quiz').removeEventListener('click', this.onReviewQuizClick);
    this.container.removeChild(this.element);
  };

  module.exports = Review;

})();

