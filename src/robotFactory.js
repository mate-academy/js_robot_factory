'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype.goForward = function(y = 0) {
  this.coords.y += y;
};

BaseRobot.prototype.goBack = function(y = 0) {
  this.coords.y -= y;
};

BaseRobot.prototype.goLeft = function(x = 0) {
  this.coords.x -= x;
};

BaseRobot.prototype.goRight = function(x = 0) {
  this.coords.x += x;
};

BaseRobot.prototype.getInfo = function() {
  // eslint-disable-next-line max-len
  return `Robot: ${this.name}, Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
};

function FlyingRobot(name, weight, coords, chipVersion) {
  BaseRobot.call(this, name, weight, coords, chipVersion);
  this.coords.z = 0;
}

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);

FlyingRobot.prototype.goUp = function(z = 0) {
  this.coords.z += z;
};

FlyingRobot.prototype.goDown = function(z = 0) {
  this.coords.z += z;
};

function DeliveryDrone(name, weight,
  coords, chipVersion, maxLoadWeight, currentLoad) {
  FlyingRobot.call(this, name, weight, coords, chipVersion);

  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

Object.setPrototypeOf(DeliveryDrone.prototype,
  FlyingRobot.prototype, BaseRobot.prototype);

DeliveryDrone.prototype.hookLoad = function(cargo) {
  if (cargo.weight < this.maxLoadWeight) {
    this.currentLoad = cargo;
  };
};

DeliveryDrone.prototype.unhookLoad = function() {
  this.currentLoad = null;
};

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
