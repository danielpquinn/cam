(function () {

  'use strict';

  function Viewer() {};

  Viewer.prototype.init = function () {
    this.socket = io.connect('http://localhost:8082');
    this.image = new Image();
    this.container = document.getElementById('viewer');
    this.render();
    this.bindEvents();
  };

  Viewer.prototype.render = function () {
    this.container.appendChild(this.image);
  };

  Viewer.prototype.bindEvents = function () {
    var self = this;

    self.socket.on('image updated', function (data) {
      self.onImageUpdated(data);
    });
  };

  Viewer.prototype.onImageUpdated = function (data) {
    this.image.src = data;
  };

  window.Viewer = Viewer;

})();