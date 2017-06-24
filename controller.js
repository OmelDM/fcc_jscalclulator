(function (window) {
  'use strict';

  function Controller(aView) {
    this.view = aView;
    this.firstOperand = '';
    this.secondOperand = '';
    this.operation = '';
    this.isWaitingForOperation = true;
    var self = this;
    this.view.bind('numberEntered', function(number) {
      self.enterNumber(number);
    });
    this.view.bind('operationEntered', function(operation) {
      self.enterOperation(operation);
    });
    this.view.bind('equalsEntered', function() {
      self.calculateResult();
    });
    this.view.bind('clear', function() {
      self.clear();
    });
    this.view.bind('deleteLastNumber', function() {
      self.deleteLastNumber();
    });
  }

  Controller.prototype.enterNumber = function(number) {
    if (this.isValidEnteredNumber(number)) {
      if (this.isWaitingForOperation) {
        this.firstOperand += number;
        this.view.updateMainDisplay(this.firstOperand);
      } else {
        this.secondOperand += number;
        this.view.updateMainDisplay(this.secondOperand);
      }
    }
  };

  Controller.prototype.isValidEnteredNumber = function(number) {
    return true;
  };

  Controller.prototype.enterOperation = function(operation) {
    if (this.isWaitingForOperation) {
      this.operation = operation;
      this.isWaitingForOperation = false;
      this.view.updateMainDisplay(this.secondOperand);
      this.view.updateSecondDisplay(this.firstOperand + ' ' + this.operation);
    }
  };

  Controller.prototype.calculateResult = function() {
    if ('' !== this.firstOperand && '' !== this.operation &&
          '' !== this.secondOperand) {
      var result = 0;
      var a = parseInt(this.firstOperand);
      var b = parseInt(this.secondOperand);
      switch (this.operation) {
        case '÷':
          result = a / b;
          break;
        case '×':
          result = a * b;
          break;
        case '−':
          result = a - b;
          break;
        case '+':
          result = a + b;
          break;
        default:

      }

      this.view.updateMainDisplay(result);
      this.view.updateSecondDisplay(this.firstOperand + ' ' + this.operation
            + ' ' + this.secondOperand);
      this.isWaitingForOperation = false;
    }
  };

  Controller.prototype.clear = function() {
    alert('clear');
  };

  Controller.prototype.deleteLastNumber = function () {
    alert('deleteLastNumber');
  };

  window.app = window.app || {};
  window.app.Controller = Controller;
})(window);
