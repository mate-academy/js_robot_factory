'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype.goForward = function(y = 1) {
  this.coords.y += y;
};

BaseRobot.prototype.goBack = function(y = 1) {
  this.coords.y -= y;
};

BaseRobot.prototype.goLeft = function(x = 1) {
  this.coords.x -= x;
};

BaseRobot.prototype.goRight = function(x = 1) {
  this.coords.x += x;
};

BaseRobot.prototype.getInfo = function() {
  return `Robot: ${this.name},`
  + ` Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
};

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);

function FlyingRobot(name, weight, coords, chipVersion) {
  BaseRobot.call(this, name, weight, coords, chipVersion);
  this.coords.z = 0;
}

FlyingRobot.prototype.goUp = function(z = 1) {
  this.coords.z += z;
};

FlyingRobot.prototype.goDown = function(z = 1) {
  this.coords.z -= z;
};

Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

function DeliveryDrone(name, weight,
  coords, chipVersion, maxLoadWeight, currentLoad) {
  FlyingRobot.call(this, name, weight, coords, chipVersion);
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype.hookLoad = function(obj) {
  if (obj.weight < this.maxLoadWeight) {
    this.currentLoad = obj;
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
