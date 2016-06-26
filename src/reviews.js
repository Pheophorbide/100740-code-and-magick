'use strict';

var load = require('./load');
var filters = require('./filters');
var renderElement = require('./render-reviews');
var utilities = require('./utilities');

(function() {

  var REVIEWS_LIST_URL = '//o0.github.io/assets/json/reviews.json';
  var PAGE_SIZE = 3;
  var reviewsContainer = document.querySelector('.reviews-list');
  var moreReviews = document.querySelector('.reviews-controls-more');
  var filterContainer = document.querySelector('.reviews-filter');
  var reviews = [];
  var filteredReviews = [];
  var pageNumber = 0;

  filterContainer.classList.add('invisible');

  var enableFilters = function() {
    filteredReviews = filters(reviews);
    filterContainer.addEventListener('click', function(evt) {
      var target = evt.target;
      if (target.nodeName === 'INPUT') {
        filteredReviews = filters(reviews, target.id);
        pageNumber = 0;
        renderReviews(filteredReviews, pageNumber, true);
        utilities.updateReviewsButtonState(filteredReviews, pageNumber, moreReviews, PAGE_SIZE);
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
      reviewsContainer.appendChild(renderElement(utilities.getElementToClone(), review));
    });
  };

  moreReviews.classList.remove('invisible');

  moreReviews.addEventListener('click', function() {
    pageNumber++;
    renderReviews(filteredReviews, pageNumber);
    utilities.updateReviewsButtonState(filteredReviews, pageNumber, moreReviews, PAGE_SIZE);
  });

  load(utilities.getElementToClone(), REVIEWS_LIST_URL, function(reviewsList) {
    reviews = reviewsList;
    enableFilters();
    renderReviews(filteredReviews, 0, true);
  });

  filterContainer.classList.remove('invisible');

})();
