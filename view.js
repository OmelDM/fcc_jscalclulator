(function(window) {
  'use strict';

  function View() {
    this.numericalButtons = document.querySelectorAll('.js_numerical');
    this.signButtons = document.querySelectorAll('.js_operation_sign');
    this.clearButton = document.querySelector('.js_clear');
    this.backspaceButton = document.querySelector('.js_backspace');
    this.currentDisplay = document.querySelector('.js_current');
    this.prevDisplay = document.querySelector('.js_previous');
    this.isWaitingForOperation = true;
  }

  View.prototype.init = function () {
    var self = this;

    self.numericalButtons.forEach(function(button) {
      button.addEventListener('click', function () {
        self.currentDisplay.innerHTML += this.innerHTML;
      });
    });

    self.signButtons.forEach(function(button) {
      button.addEventListener('click', function () {
        if (self.isWaitingForOperation) {
          self.currentDisplay.innerHTML += this.innerHTML;
          self.isWaitingForOperation = false;
        }
      });
    });

    self.clearButton.addEventListener('click', function() {
      self.currentDisplay.innerHTML = '';
      self.prevDisplay.innerHTML = '';
      self.isWaitingForOperation = true;
    });

    self.backspaceButton.addEventListener('click', function() {
      var lastCharacter = self.currentDisplay.innerHTML.substr(-1);
      if (lastCharacter === '÷' || lastCharacter === '×' || lastCharacter === '−'
        || lastCharacter === '+') {
        self.isWaitingForOperation = true;
      }
      self.currentDisplay.innerHTML = self.currentDisplay.innerHTML.slice(0, -1);
    });

  };

  window.app = window.app || {};
  window.app.View = View;

})(window);
