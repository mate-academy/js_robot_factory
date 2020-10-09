'use strict';

function BaseRobot(name = '', weight = 0, coords = {}, chipVersion = 1) {
  this.name = name;
  this.weight = weight;

  this.coords = coords;
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

BaseRobot.prototype.getInfo = function() {
  return `Robot: ${
    this.name
  }, Chip version: ${
    this.chipVersion
  }, Weight: ${
    this.weight
  }`;
};

function FlyingRobot(name = '', weight = 0, coords = {}, chipVersion = 1) {
  BaseRobot.call(this, ...arguments);

  this.coords.z = 0;
}

FlyingRobot.prototype = Object.create(BaseRobot.prototype);

FlyingRobot.prototype.goUp = function(step = 1) {
  this.coords.z += step;
};

FlyingRobot.prototype.goDown = function(step = 1) {
  this.coords.z -= step;
};

function DeliveryDrone(
  name = '',
  weight = 0,
  coords = {},
  chipVersion = 1,
  maxLoadWeight = 0,
  currentLoad = {}) {
  FlyingRobot.call(this, ...arguments);
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype = Object.create(FlyingRobot.prototype);

DeliveryDrone.prototype.hookLoad = function(currentLoad) {
  if ((currentLoad.weight + this.weight) < this.maxLoadWeight) {
    this.currentLoad = currentLoad;
  }
};

DeliveryDrone.prototype.unhookLoad = function() {
  this.currentLoad = null;
};

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
