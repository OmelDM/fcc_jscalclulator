(function(window) {
  'use strict';

  function View() {
    this.numericalButtons = document.querySelectorAll('.js_numerical');
    this.signButtons = document.querySelectorAll('.js_operation_sign');
    this.clearButton = document.querySelector('.js_clear');
    this.backspaceButton = document.querySelector('.js_backspace');
    this.currentDisplay = document.querySelector('.js_current');
    this.prevDisplay = document.querySelector('.js_previous');
    this.equalsButton = document.querySelector('.js_equals');
  }

  View.prototype.bind = function (eventName, handler) {
    var self = this;

    switch (eventName) {

      case 'numberEntered':
        self.numericalButtons.forEach(function(button) {
          button.addEventListener('click', function (event) {
            handler(event.target.innerHTML);
          });
        });
        break;

        case 'operationEntered':
          self.signButtons.forEach(function(button) {
            button.addEventListener('click', function (event) {
              handler(event.target.innerHTML);
            });
          });
          break;

          case 'equalsEntered':
            self.equalsButton.addEventListener('click', function () {
              handler();
            });
            break;
      default:

    }

  };

  View.prototype.updateMainDisplay = function (newValue) {
    this.currentDisplay.innerHTML = newValue;
  };

  View.prototype.updateSecondDisplay = function (newValue) {
    this.prevDisplay.innerHTML = newValue;
  };

  window.app = window.app || {};
  window.app.View = View;

})(window);
