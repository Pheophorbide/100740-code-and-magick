'use strict';

var loadReviews = function(cloneElement, url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function(evt) {
    cloneElement.classList.remove('reviews-list-loading');
    var loadedData = JSON.parse(evt.target.response);
    callback(loadedData);
  };
  xhr.onerror = function() {
    cloneElement.classList.add('reviews-load-failure');
  };
  xhr.open('GET', url);
  cloneElement.classList.add('reviews-list-loading');
  xhr.send();

};

module.exports = loadReviews;

