'use strict';

(function() {
  var reviewList = document.querySelector('.reviews');
  module.exports = {
    load: function(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function(evt) {
        reviewList.classList.remove('reviews-list-loading');
        var loadedData = JSON.parse(evt.target.response);
        callback(loadedData);
      };
      xhr.onerror = function() {
        reviewList.classList.add('reviews-load-failure');
      };
      xhr.open('GET', url);
      reviewList.classList.add('reviews-list-loading');
      xhr.send();
    }
  };
})();
