'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype.goForward = function(step = 1) {
  this.coords.y += step;

  return this;
};

BaseRobot.prototype.goBack = function(step = 1) {
  this.coords.y -= step;

  return this;
};

BaseRobot.prototype.goLeft = function(step = 1) {
  this.coords.x -= step;

  return this;
};

BaseRobot.prototype.goRight = function(step = 1) {
  this.coords.x += step;

  return this;
};

BaseRobot.prototype.getInfo = function() {
  return `Robot: ${this.name}, `
    + `Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
};

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);

function FlyingRobot(name, weight, coords, chipVersion) {
  Object.assign(this, new BaseRobot(name, weight, coords, chipVersion));
  this.coords.z = 0;
}

FlyingRobot.prototype.goUp = function(step = 1) {
  this.coords.z += step;

  return this;
};

FlyingRobot.prototype.goDown = function(step = 1) {
  this.coords.z -= step;

  return this;
};

Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

function DeliveryDrone(
  name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
  Object.assign(this, new FlyingRobot(name, weight, coords, chipVersion));
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype.hookLoad = function(cargo) {
  if (this.currentLoad !== null) {
    return this;
  }

  this.currentLoad = cargo.weight <= this.maxLoadWeight
    ? cargo
    : this.currentLoad;

  return this;
};

DeliveryDrone.prototype.unhookLoad = function() {
  this.currentLoad = null;

  return this;
};

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
