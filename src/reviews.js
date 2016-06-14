'use strict';

(function() {
  var SINGLE_STAR_WIDTH = 30;
  var REVIEWS_LIST_URL = '//o0.github.io/assets/json/reviews.json';
  var DAY_IN_MILLIS = 1000 * 60 * 60 * 24;
  var filterContainer = document.querySelector('.reviews-filter');
  var reviewsContainer = document.querySelector('.reviews-list');
  var elementTemplate = document.querySelector('template');
  var elementToClone;
  var reviews = [];
  filterContainer.classList.add('invisible');
  if ('content' in elementTemplate) {
    elementToClone = elementTemplate.content.querySelector('.review');
  } else {
    elementToClone = elementTemplate.querySelector('.review');
  }

  var getReviewElement = function(data, container) {
    var element = elementToClone.cloneNode(true);
    container.appendChild(element);
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

  var getReviews = function(callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function(evt) {
      elementToClone.classList.remove('reviews-list-loading');
      var loadedData = JSON.parse(evt.target.response);
      callback(loadedData);
    };
    xhr.onerror = function() {
      elementToClone.classList.remove('reviews-load-failure');
    };
    xhr.open('GET', REVIEWS_LIST_URL);
    elementToClone.classList.add('reviews-list-loading');
    xhr.send();

  };

  var renderReviews = function(reviewsList) {
    reviewsContainer.innerHTML = '';
    reviewsList.forEach(function(review) {
      getReviewElement(review, reviewsContainer);
    });
  };

  var getFilteredReviews = function(reviewsList, filter) {
    var reviewToFilter = reviewsList.slice(0);

    switch (filter) {
      case 'reviews-recent':
        reviewToFilter = reviewToFilter.filter(function(element) {
          var currentTime = Date.now();
          var elementTime = Date.parse(element.date);
          var breakTime = currentTime - 4 * DAY_IN_MILLIS;
          return elementTime > breakTime && elementTime < currentTime;

        }).sort(function(a, b) {
          a = Date.parse(a.date);
          b = Date.parse(b.date);
          return b - a;
        });
        break;
      case 'reviews-good':
        reviewToFilter = reviewToFilter.filter(function(element) {
          return element.rating > 2;
        }).sort(function(a, b) {
          return b.rating - a.rating;
        });
        break;
      case 'reviews-bad':
        reviewToFilter = reviewToFilter.filter(function(element) {
          return element.rating <= 2;
        }).sort(function(a, b) {
          return a.rating - b.rating;
        });
        break;
      case 'reviews-popular':
        reviewToFilter = reviewToFilter.sort(function(a, b) {
          return b.review_usefulness - a.review_usefulness;
        });
        break;
      default:
        break;
    }
    return reviewToFilter;
  };

  var setFilterEnabled = function(filter) {
    var filteredReviews = getFilteredReviews(reviews, filter);
    renderReviews(filteredReviews);
  };

  var setFiltrationEnabled = function() {
    var filters = document.querySelectorAll('input[name="reviews"]');
    for (var i = 0; i < filters.length; i++) {
      filters[i].onclick = function() {
        setFilterEnabled(this.id);
      };
    }
  };


  getReviews(function(reviewsList) {
    reviews = reviewsList;
    renderReviews(reviews);
    setFiltrationEnabled();
    setFilterEnabled();
  });


  filterContainer.classList.remove('invisible');

})();
