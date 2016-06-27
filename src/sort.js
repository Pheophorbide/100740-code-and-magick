'use strict';

(function() {
  var DAY_IN_MILLIS = 1000 * 60 * 60 * 24;

  module.exports = {
    sortReviews: function(reviewsList, filter) {
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
    }
  };
})();

