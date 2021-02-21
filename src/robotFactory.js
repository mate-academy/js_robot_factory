'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  // implement
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype.getInfo = function() {
  return (`Robot: ${this.name},`
  + ` Chip version: ${this.chipVersion},`
  + ` Weight: ${this.weight}`);
};

BaseRobot.prototype.goForward = function(step = 1) {
  this.coords.y += step;
};

BaseRobot.prototype.goBack = function(step = 1) {
  this.coords.y -= step;
};

BaseRobot.prototype.goLeft = function(step = 1) {
  this.coords.x -= step;
};

BaseRobot.prototype.goRight = function(step = 1) {
  this.coords.x += step;
};

function FlyingRobot(name, weight, coords, chipVersion) {
  // implement
  BaseRobot.call(this, ...arguments);

  this.coords.z = 0;
}

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);

FlyingRobot.prototype.goUp = function(step = 1) {
  this.coords.z += step;
};

FlyingRobot.prototype.goDown = function(step = 1) {
  this.coords.z -= step;
};

function DeliveryDrone(name, weight, coords, chipVersion,
  maxLoadWeight, currentLoad) {
  // implement
  FlyingRobot.call(this, ...arguments);

  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

DeliveryDrone.prototype.unhookLoad = function() {
  this.currentLoad = null;
};

DeliveryDrone.prototype.hookLoad = function(load) {
  if (load.weight <= this.maxLoadWeight && this.currentLoad === null) {
    this.currentLoad = load;
  }
};

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
