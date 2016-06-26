'use strict';

var SINGLE_STAR_WIDTH = 30;


var renderReviewElement = function(cloneElement, data) {
  var element = cloneElement.cloneNode(true);
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

module.exports = renderReviewElement;
