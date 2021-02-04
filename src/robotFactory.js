'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype.goForward = function(steps = 1) {
  this.coords.y += steps;
};

BaseRobot.prototype.goBack = function(steps = 1) {
  this.coords.y -= steps;
};

BaseRobot.prototype.goRight = function(steps = 1) {
  this.coords.x += steps;
};

BaseRobot.prototype.goLeft = function(steps = 1) {
  this.coords.x -= steps;
};

BaseRobot.prototype.getInfo = function() {
  const { name, chipVersion, weight } = this;

  return `Robot: ${name}, Chip version: ${chipVersion}, Weight: ${weight}`;
};

function FlyingRobot(name, weight, coords, chipVersion) {
  BaseRobot.call(this, name, weight, coords, chipVersion);
  this.coords.z = 0;
}

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);

FlyingRobot.prototype.goUp = function(steps = 1) {
  this.coords.z += steps;
};

FlyingRobot.prototype.goDown = function(steps = 1) {
  this.coords.z -= steps;
};

function DeliveryDrone(
  name,
  weight,
  coords,
  chipVersion,
  maxLoadWeight,
  currentLoad) {
  FlyingRobot.call(this, name, weight, coords, chipVersion);
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

DeliveryDrone.prototype.hookLoad = function(cargo) {
  const { maxLoadWeight, currentLoad } = this;

  if (cargo.weight <= maxLoadWeight && currentLoad === null) {
    this.currentLoad = cargo;
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
