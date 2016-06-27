'use strict';

var sort = require('./sort');
var renderElement = require('./render-reviews');
var utilities = require('./utilities');

(function() {

  var REVIEWS_LIST_URL = '//o0.github.io/assets/json/reviews.json';
  var PAGE_SIZE = 3;
  var reviewsContainer = document.querySelector('.reviews-list');
  var moreReviews = document.querySelector('.reviews-controls-more');
  var filterContainer = document.querySelector('.reviews-filter');
  var elementTemplate = document.querySelector('template');
  var elementToClone;
  var reviews = [];
  var filteredReviews = [];
  var pageNumber = 0;

  filterContainer.classList.add('invisible');

  if ('content' in elementTemplate) {
    elementToClone = elementTemplate.content.querySelector('.review');
  } else {
    elementToClone = elementTemplate.querySelector('.review');
  }

  var enableFilters = function() {
    filteredReviews = sort.sortReviews(reviews);
    filterContainer.addEventListener('click', function(evt) {
      var target = evt.target;
      if (target.nodeName === 'INPUT') {
        filteredReviews = sort.sortReviews(reviews, target.id);
        pageNumber = 0;
        renderReviews(filteredReviews, pageNumber, true);
        updateReviewsButtonState();
      }
    });
  };

  var renderReviews = function(reviewsList, page, replace) {
    var from = page * PAGE_SIZE;
    var to = from + PAGE_SIZE;
    if(replace) {
      reviewsContainer.innerHTML = '';
    }
    var slicedFilteredReviews = filteredReviews.slice(from, to);
    slicedFilteredReviews.forEach(function(review) {
      reviewsContainer.appendChild(renderElement(elementToClone, review));
    });
  };

  var updateReviewsButtonState = function() {
    if(pageNumber + 1 < Math.ceil(filteredReviews.length / PAGE_SIZE)) {
      moreReviews.classList.remove('invisible');
    } else {
      moreReviews.classList.add('invisible');
    }
  };

  moreReviews.classList.remove('invisible');

  moreReviews.addEventListener('click', function() {
    pageNumber++;
    renderReviews(filteredReviews, pageNumber);
    updateReviewsButtonState();
  });

  utilities.load(elementToClone, REVIEWS_LIST_URL, function(reviewsList) {
    reviews = reviewsList;
    enableFilters();
    renderReviews(filteredReviews, 0, true);
  });

  filterContainer.classList.remove('invisible');

})();
