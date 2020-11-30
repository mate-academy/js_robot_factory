'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype.goForward = function(step = 1) {
  this.coords.y += step;
};

BaseRobot.prototype.goBack = function(step = 1) {
  this.coords.y += -step;
};

BaseRobot.prototype.goLeft = function(step = 1) {
  this.coords.x += -step;
};

BaseRobot.prototype.goRight = function(step = 1) {
  this.coords.x += step;
};

BaseRobot.prototype.getInfo = function() {
  return `Robot: ${this.name}, Chip version: ${this.chipVersion}, `
+ `Weight: ${this.weight}`;
};

function FlyingRobot(name, weight, coords) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.coords.z = 0;
}

FlyingRobot.prototype.goUp = function(step = 1) {
  this.coords.z += step;
};

FlyingRobot.prototype.goDown = function(step = 1) {
  this.coords.z -= step;
};

FlyingRobot.prototype.__proto__ = BaseRobot.prototype;

function DeliveryDrone(name, weight, coords, chipVersion, maxLoadWeight,
  currentLoad) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype.hookLoad = function(input) {
  if (input.weight <= this.maxLoadWeight && this.currentLoad === null) {
    this.currentLoad = input;
  }
};

DeliveryDrone.prototype.unhookLoad = function() {
  this.currentLoad = null;
};

DeliveryDrone.prototype.__proto__ = FlyingRobot.prototype;

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
