'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.chipVersion = chipVersion;

  this.coords = coords;
}

BaseRobot.prototype.goForward = function(y = 0) {
  this.coords.y += y;
};

BaseRobot.prototype.goBack = function(y = 0) {
  this.coords.y -= y;
};

BaseRobot.prototype.goRight = function(x = 0) {
  this.coords.x += x;
};

BaseRobot.prototype.goLeft = function(x = 0) {
  this.coords.x -= x;
};

BaseRobot.prototype.getInfo = function() {
  return `Robot: ${this.name}, `
    + `Chip version: ${this.chipVersion}, `
    + `Weight: ${this.weight}`;
};

function FlyingRobot(name, weight, coords, chipVersion) {
  BaseRobot.call(this, name, weight, coords, chipVersion);

  this.coords = {
    z: 0,
  };
}

FlyingRobot.prototype.goUp = function(z = 0) {
  this.coords.z += z;
};

FlyingRobot.prototype.goDown = function(z = 0) {
  this.coords.z -= z;
};

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);

function DeliveryDrone(
  name, weight, coords, chipVersion, maxLoadWeight, currentLoad
) {
  FlyingRobot.call(this, name, weight, coords, chipVersion);

  this.maxLoadWeight = maxLoadWeight;

  this.currentLoad = currentLoad;
};

DeliveryDrone.prototype.hookLoad = function(cargo) {
  if (cargo.weight < this.maxLoadWeight) {
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

Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);
