'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;

  this.coords = coords;
  this.chipVersion = chipVersion;
}

function FlyingRobot(name, weight, coords, chipVersion) {
  BaseRobot.call(this, name, weight, coords, chipVersion);
  this.coords.z = 0;
}

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);

function DeliveryDrone(name, weight, coords, chipVersion,
  maxLoadWeight, currentLoad) {
  FlyingRobot.call(this, name, weight, coords, chipVersion);
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

BaseRobot.prototype.goForward = function(units = 0) {
  this.coords.y += units;
};

BaseRobot.prototype.goBack = function(units = 0) {
  this.coords.y -= units;
};

BaseRobot.prototype.goRight = function(units = 0) {
  this.coords.x += units;
};

BaseRobot.prototype.goLeft = function(units = 0) {
  this.coords.x -= units;
};

BaseRobot.prototype.getInfo = function() {
  return `Robot: ${this.name}, Chip version: ${this.chipVersion}`
  + `, Weight: ${this.weight}`;
};

DeliveryDrone.prototype.hookLoad = function(load) {
  if (!this.currentLoad && this.maxLoadWeight >= load.weight) {
    this.currentLoad = load;
  }
};

DeliveryDrone.prototype.unhookLoad = function() {
  this.currentLoad = null;
};

FlyingRobot.prototype.goUp = function(units = 1) {
  this.coords.z += units;
};

FlyingRobot.prototype.goDown = function(units = 1) {
  this.coords.z -= units;
};

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
