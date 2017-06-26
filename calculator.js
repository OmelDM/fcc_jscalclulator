(function (window) {
  'use strict';

  function Calculator() {
    this.operandA = null;
    this.operandB = null;
    this.operation = null;
  }

  Calculator.prototype.setOperand = function (operand) {
    if (isNaN(operand)) {
      return;
    }
    if (this.operation) {
      this.operandB = operand;
    } else {
      this.operandA = operand;
    }
  };

  Calculator.prototype.setOperation = function (operation) {
    this.operation = operation;
  };

  Calculator.prototype.getResults = function () {
    if (!this.operandA) {
      return '';
    }

    var result = 0;

    if (!this.operation) {
      return this.operandA;
    }

    var a = this.operandA;
    var b = this.operandB;

    if (!this.operandB) {
      b = a;
    }

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

    this.operandA = result;
    return result;
  };

  Calculator.prototype.reset = function () {
    this.operandA = null;
    this.operandB = null;
    this.operation = null;
  };

  window.app = window.app || {};
  window.app.Calculator = Calculator;
})(window);
