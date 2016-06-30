'use strict';

var renderElement = require('./render-reviews');

(function() {
  var reviewsContainer = document.querySelector('.reviews-list');

  var Review = function(data, container) {
    this.data = data;
    this.element = renderElement(container, this.data);
    this.onReviewQuizClick = function(event) {
      event.target.classList.add('review-quiz-answer-active');
    };

    this.element.querySelector('.review-quiz').addEventListener('click', this.onReviewQuizClick);
    reviewsContainer.appendChild(this.element);
    this.remove = function() {
      this.element.querySelector('.review-quiz').removeEventListener('click', this.onReviewQuizClick);
      reviewsContainer.removeChild(this.element);
    };
  };

  module.exports = Review;

})();
