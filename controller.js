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

  window.app = window.app || {};
  window.app.Controller = Controller;
})(window);
