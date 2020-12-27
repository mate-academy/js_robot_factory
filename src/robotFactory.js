'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype.goForward = function(step = 1) {
  this.coords.y = this.coords.y + step;
};

BaseRobot.prototype.goBack = function(step = 1) {
  this.coords.y = this.coords.y - step;
};

BaseRobot.prototype.goRight = function(step = 1) {
  this.coords.x = this.coords.x + step;
};

BaseRobot.prototype.goLeft = function(step = 1) {
  this.coords.x = this.coords.x - step;
};

BaseRobot.prototype.getInfo = function() {
  const str = `Weight: ${this.weight}`;

  return `Robot: ${this.name}, Chip version: ${this.chipVersion}, ${str}`;
};

function FlyingRobot(name, weight, coords, chipversion) {
  BaseRobot.call(this, name, weight, coords, chipversion);
  this.coords.z = 0;
}

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);

FlyingRobot.prototype.goUp = function(step = 1) {
  this.coords.z += step;
};

FlyingRobot.prototype.goDown = function(step = 1) {
  this.coords.z -= step;
};

function DeliveryDrone(name, weight, coords, chipversion, maxLoadWeight,
  currentLoad) {
  FlyingRobot.call(this, name, weight, coords, chipversion);
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

DeliveryDrone.prototype.hookLoad = function(load) {
  if (load.weight <= this.maxLoadWeight && this.currentLoad === null) {
    this.currentLoad = load;
  }
};

DeliveryDrone.prototype.unhookLoad = function(load) {
  this.currentLoad = null;
};

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
