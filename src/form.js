'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var userName = document.querySelector('.review-form-field-name');
  var reviewMark = document.querySelectorAll('input[name="review-mark"]');
  var reviewText = document.querySelector('.review-form-field-text');
  var fieldName = document.querySelector('.review-fields-name');
  var fieldText = document.querySelector('.review-fields-text');

  userName.setAttribute('required', 'required');

  var estimateReviewMark = function() {
    for (var i = 0; i < reviewMark.length; i++) {
      if (reviewMark[i].checked) {
        if (reviewMark[i].value > 3) {
          reviewText.removeAttribute('required');
        } else {
          reviewText.setAttribute('required', 'required');
        }
      }
      reviewMark[i].onchange = function() {
        estimateReviewMark();
      };
    }
  };

  estimateReviewMark();

  var hideFields = function() {
    var hideFieldName = function() {
      if (userName.value.length !== 0) {
        fieldName.style.display = 'none';
      } else {
        fieldName.style.display = 'inline-block';
      }
    };
    userName.oninput = function() {
      hideFieldName();
    };

    var hideFieldText = function() {
      if (reviewText.value.length !== 0) {
        fieldText.style.display = 'none';
      } else {
        fieldText.style.display = 'inline-block';
      }
    };
    reviewText.oninput = function() {
      hideFieldText();
    };
  };

  hideFields();
  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

})();
