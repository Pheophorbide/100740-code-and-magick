'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var userName = document.querySelector('.review-form-field-name');
  var reviewMark = document.querySelectorAll('input[name="review-mark"]');
  var reviewText = document.querySelector('.review-form-field-text');
  var reviewFields = document.querySelector('.review-fields');
  var fieldName = reviewFields.querySelector('.review-fields-name');
  var fieldText = reviewFields.querySelector('.review-fields-text');
  var submitButton = document.querySelector('.review-submit');
  userName.setAttribute('required', 'required');

  var validateReviewMark = function() {
    for (var i = 0; i < reviewMark.length; i++) {
      if (reviewMark[i].checked) {
        if (reviewMark[i].value > 3) {
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

  for (var i = 0; i < reviewMark.length; i++) {
    reviewMark[i].onchange = function() {
      validateReviewMark();
      validateInputFields();
    };
  }
  validateReviewMark();
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
