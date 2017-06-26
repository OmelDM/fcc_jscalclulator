(function (window) {
  'use strict';
  var MAX_LENGTH = 9;

  function Controller(aView, aCalculator) {
    this.view = aView;
    this.calculator = aCalculator;
    this.operand = '';
    this.operation = '';
    this.isNewOperandRequired = true;
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

  Controller.prototype.enterNumber = function(newNumber) {
    if (this.isNewOperandRequired) {
      this.operand = '';
      this.isNewOperandRequired = false;
    }
    this.operand = _validated(this.operand, newNumber);
    this.calculator.setOperand(parseNumber(this.operand));
    this.updateDisplay(this.operand);
  };

  Controller.prototype.enterOperation = function(operation) {
    this.calculator.setOperation(operation);
    this.calculator.setOperand(parseNumber(this.operand));
    this.isNewOperandRequired = true;
  };

  Controller.prototype.calculateResult = function() {
    this.calculator.setOperand(parseNumber(this.operand));
    this.isNewOperandRequired = true;
    this.updateDisplay(this.calculator.getResults());
  };

  Controller.prototype.clear = function() {
    this.operation = '';
    this.isNewOperandRequired = true;
    this.calculator.reset();
    this.updateDisplay('');
  };

  Controller.prototype.deleteLastNumber = function () {
    this.operand = this.operand.slice(0, -1);
    this.updateDisplay(this.operand);
  };

  Controller.prototype.updateDisplay = function(newNumber) {
    if (MAX_LENGTH < String(newNumber).length) {
      newNumber = newNumber.toPrecision(MAX_LENGTH/3);
    }
    this.view.updateDisplay(newNumber);
  };

  function parseNumber(number) {
    return number.includes('.') ? parseFloat(number) : parseInt(number);
  }
  function _validated(prevOperand, newNumber) {
    var newValue = prevOperand + newNumber;

    if (prevOperand === '') {
      if (newNumber === '.') {
        return '0.';
      }
    } else if (prevOperand === '0') {
      if (newNumber === '0') {
        return prevOperand;
      } else if (newNumber === '.') {
        return newValue;
      } else {
        return newNumber;
      }
    } else if (MAX_LENGTH < newValue.length) {
      return prevOperand;
    } else if (newNumber === '.' && prevOperand.includes('.')) {
      return prevOperand;
    }

    return newValue;
  };

  window.app = window.app || {};
  window.app.Controller = Controller;
})(window);
