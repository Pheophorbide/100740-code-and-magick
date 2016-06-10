'use strict';

(function() {
  var SINGLE_STAR_WIDTH = 30;
  var filterContainer = document.querySelector('.reviews-filter');
  var reviewsContainer = document.querySelector('.reviews-list');
  var elementTemplate = document.querySelector('template');
  var elementToClone;
  filterContainer.classList.add('invisible');

  if ('content' in elementTemplate) {
    elementToClone = elementTemplate.content.querySelector('.review');
  }

  var getReviewElement = function(data, container) {
    var element = elementToClone.cloneNode(true);
    container.appendChild(element);
    element.querySelector('.review-text').textContent = data.description;

    var ratingValue = data.rating;
    var ratingWidth = SINGLE_STAR_WIDTH * ratingValue;
    console.log(ratingWidth);
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

  window.reviews.forEach(function(review) {
    getReviewElement(review, reviewsContainer);
  });

  filterContainer.classList.remove('invisible');

})();
