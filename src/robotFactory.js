'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;

  this.coords = {
    x: coords.x,
    y: coords.y,
  };
  this.chipVersion = chipVersion;
}

BaseRobot.prototype.goForward = function(step = 1) {
  this.coords.y += step;
};

BaseRobot.prototype.goBack = function(step = 1) {
  this.coords.y -= step;
};

BaseRobot.prototype.goRight = function(step = 1) {
  this.coords.x += step;
};

BaseRobot.prototype.goLeft = function(step = 1) {
  this.coords.x -= step;
};

function FlyingRobot() {
  // implement
}

function DeliveryDrone() {
  // implement
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
