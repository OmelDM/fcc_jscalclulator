(function (window) {
  'use strict';

  function Controller(aView) {
    this.view = aView;
    this.view.init();
  }

  window.app = window.app || {};
  window.app.Controller = Controller;
})(window);
