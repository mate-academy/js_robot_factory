'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  // implement
  this.name = name;
  this.weight = weight;

  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype.goForward = function(value = 1) {
  this.coords.y += value;

  return this;
};

BaseRobot.prototype.goBack = function(value = 1) {
  this.coords.y -= value;

  return this;
};

BaseRobot.prototype.goLeft = function(value = 1) {
  this.coords.x -= value;

  return this;
};

BaseRobot.prototype.goRight = function(value = 1) {
  this.coords.x += value;

  return this;
};

BaseRobot.prototype.getInfo = function() {
  return `Robot: ${this.name}, Chip version: `
    + `${this.chipVersion}, Weight: ${this.weight}`;
};

function FlyingRobot(name, weight, coords, chipVersion) {
  // implement
  BaseRobot.call(this, ...arguments);
  this.coords.z = 0;
}

FlyingRobot.prototype.goUp = function(value = 1) {
  this.coords.z += value;

  return this;
};

FlyingRobot.prototype.goDown = function(value = 1) {
  this.coords.z -= value;

  return this;
};

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);

function DeliveryDrone(
  name,
  weight,
  coords,
  chipVersion,
  maxLoadWeight,
  currentLoad) {
  // implement
  FlyingRobot.call(this, name, weight, coords, chipVersion);
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype.hookLoad = function(cargo) {
  if (cargo.weight <= this.maxLoadWeight && this.currentLoad === null) {
    this.currentLoad = cargo;
  }
};

DeliveryDrone.prototype.unhookLoad = function() {
  this.currentLoad = null;
};

Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
