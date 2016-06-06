'use strict';

(function() {
  var browserCookies = require('browser-cookies');

  var CONVERSION_TO_DAY = 1000 * 60 * 60 * 24;

  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var userName = document.querySelector('.review-form-field-name');
  var reviewMarks = document.querySelectorAll('input[name="review-mark"]');
  var reviewText = document.querySelector('.review-form-field-text');
  var reviewFields = document.querySelector('.review-fields');
  var fieldName = reviewFields.querySelector('.review-fields-name');
  var fieldText = reviewFields.querySelector('.review-fields-text');
  var submitButton = document.querySelector('.review-submit');
  var reviewForm = document.querySelector('.review-form');

  userName.setAttribute('required', 'required');

  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  var myBday = new Date(currentYear, 3, 13);
  var cookiesLifeTime = (currentDate - myBday) / CONVERSION_TO_DAY;

  userName.value = browserCookies.get('userName') || '';
  var currentReviewMarks = browserCookies.get('reviewMarks');
  for (var n = 0; n < reviewMarks.length; n++) {
    if (reviewMarks[n].value === currentReviewMarks) {
      reviewMarks[n].setAttribute('checked', 'checked');
    }
  }

  reviewForm.onsubmit = function(evt) {
    evt.preventDefault();
    browserCookies.set('userName', userName.value, {
      expires: cookiesLifeTime
    });
    for (var a = 0; a < reviewMarks.length; a++) {
      if (reviewMarks[a].checked) {
        browserCookies.set('reviewMarks', reviewMarks[a].value, {
          expires: cookiesLifeTime
        });
      }
    }
    this.submit();
  };

  var validatereviewMarks = function() {
    for (var i = 0; i < reviewMarks.length; i++) {
      if (reviewMarks[i].checked) {
        if (reviewMarks[i].value > 3) {
          reviewText.removeAttribute('required');
          fieldText.style.display = 'none';
        } else {
          reviewText.setAttribute('required', 'required');
          fieldText.style.display = 'inline-block';
        }
      }
    }
  };

  var validateInputFields = function() {
    if (userName.validity.valid && reviewText.validity.valid) {
      submitButton.removeAttribute('disabled');
      reviewFields.style.display = 'none';
    } else {
      submitButton.setAttribute('disabled', 'disabled');
      reviewFields.style.display = 'inline-block';
    }
    if (userName.validity.valid) {
      fieldName.style.display = 'none';
    } else {
      fieldName.style.display = 'inline-block';
    }
    if (reviewText.validity.valid) {
      fieldText.style.display = 'none';
    } else {
      fieldText.style.display = 'inline-block';
    }
  };
  userName.oninput = validateInputFields;
  reviewText.oninput = validateInputFields;

  for (var i = 0; i < reviewMarks.length; i++) {
    reviewMarks[i].onchange = function() {
      validatereviewMarks();
      validateInputFields();
    };
  }
  validatereviewMarks();
  validateInputFields();


  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

})();
