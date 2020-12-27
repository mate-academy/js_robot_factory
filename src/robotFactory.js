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

BaseRobot.prototype.goRight = function(step = 1) {
  this.coords.x += step;

  return this;
};

BaseRobot.prototype.goLeft = function(step = 1) {
  this.coords.x -= step;

  return this;
};

BaseRobot.prototype.getInfo = function() {
  return 'Robot: '
  + this.name
  + ', Chip version: '
  + this.chipVersion
  + ', Weight: '
  + this.weight;
};

function FlyingRobot(name, weight, coords, chipVersion) {
  BaseRobot.apply(this, arguments);
  this.coords.z = 0;
}

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);

FlyingRobot.prototype.goUp = function(step = 1) {
  this.coords.z += step;

  return this;
};

FlyingRobot.prototype.goDown = function(step = 1) {
  this.coords.z -= step;

  return this;
};

function DeliveryDrone(
  name, weight, coords, chipVerion, maxLoadWeight, currentLoad) {
  FlyingRobot.apply(this, arguments);

  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

DeliveryDrone.prototype.hookLoad = function(cargo) {
  if (cargo.weight <= this.maxLoadWeight && this.currentLoad === null) {
    this.currentLoad = cargo;
  }

  return this;
};

DeliveryDrone.prototype.unhookLoad = function(load) {
  this.currentLoad = null;

  return this;
};

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
