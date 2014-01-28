(function () {

  'use strict';

  navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia);

  function Cam() {}

  Cam.prototype.init = function () {
    this.socket = io.connect('http://' + window.location.host);
    this.container = document.getElementById('security-camera');
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.video = document.createElement('video');
    this.render();
    this.startRecording();
    this.width = 0;
    this.height = 0;
  };

  Cam.prototype.render = function () {
  };

  Cam.prototype.startRecording = function () {
    var self = this;

    navigator.getMedia(
      // constraints
      {video:true, audio:false},

      // success callback
      function (mediaStream) {
        self.video.src = window.URL.createObjectURL(mediaStream);
        self.video.onloadedmetadata = function (e) {
          self.width = self.video.videoWidth;
          self.height = self.video.videoHeight;
          self.canvas.width = self.width;
          self.canvas.height = self.height;
          self.video.play();
          setInterval(function () {
            self.snap();
          }, 2000);
        };
      },
      //handle error
      function (error) {
        console.log(error);
      });
  };

  Cam.prototype.snap = function() {
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.drawImage(this.video, 0, 0, this.width, this.height);

    this.socket.emit('snap', this.canvas.toDataURL('snap', 0.2));
  };

  window.Cam = Cam;

})();