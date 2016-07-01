'use strict';

(function() {
  var SINGLE_STAR_WIDTH = 30;
  var reviewsContainer = document.querySelector('.reviews-list');

  var renderReviewElement = function(data, elementToClone) {
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
    this.element = renderReviewElement(this.data, container);
    this.onReviewQuizClick = function(event) {
      if(event.target.classList.contains('review-quiz-answer')) {
        event.target.classList.add('review-quiz-answer-active');
      }
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
