'use strict';

var sort = require('./sort');
var utilities = require('./utilities');
var Review = require('./render-reviews');

(function() {

  var REVIEWS_LIST_URL = '//o0.github.io/assets/json/reviews.json';
  var PAGE_SIZE = 3;
  var moreReviews = document.querySelector('.reviews-controls-more');
  var filterContainer = document.querySelector('.reviews-filter');
  var reviewsContainer = document.querySelector('.reviews-list');
  var reviews = [];
  var filteredReviews = [];
  var renderedReviews = [];
  var pageNumber = 0;

  filterContainer.classList.add('invisible');

  var setActiveFilter = function(filter) {
    var activeFilter = document.querySelector('#' + filter);
    activeFilter.checked = true;
  };

  var enableFilters = function(filter) {
    filteredReviews = sort.sortReviews(reviews, filter);
    setActiveFilter(filter);
    filterContainer.addEventListener('click', function(evt) {
      var target = evt.target;
      if (target.nodeName === 'INPUT') {
        filteredReviews = sort.sortReviews(reviews, target.id);
        pageNumber = 0;
        renderReviews(filteredReviews, pageNumber, true);
        updateReviewsButtonState();
        localStorage.setItem('filter', target.id);
      }
    });
  };

  var renderReviews = function(reviewsList, page, replace) {
    var from = page * PAGE_SIZE;
    var to = from + PAGE_SIZE;
    if(replace) {
      renderedReviews.forEach(function(review) {
        review.remove();
      });
      renderedReviews = [];
    }
    var slicedFilteredReviews = filteredReviews.slice(from, to);
    slicedFilteredReviews.forEach(function(review) {
      renderedReviews.push(new Review(review, reviewsContainer));
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

  utilities.load(REVIEWS_LIST_URL, function(reviewsList) {
    reviews = reviewsList;
    var currentFilter = localStorage.getItem('filter');
    enableFilters(currentFilter || 'reviews-all');
    renderReviews(filteredReviews, 0, true);
  });

  filterContainer.classList.remove('invisible');

})();
