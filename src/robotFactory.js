'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype.goForward = function(step = 1) {
  this.coords.y += step;
};

BaseRobot.prototype.goBack = function(step = 1) {
  this.coords.y -= step;
};

BaseRobot.prototype.goRight = function(step = 1) {
  this.coords.x -= step;
};

BaseRobot.prototype.goLeft = function(step = 1) {
  this.coords.x += step;
};

BaseRobot.prototype.getInfo = function() {
  // eslint-disable-next-line max-len
  return `Robot: ${this.name}, Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
};

function FlyingRobot(name, weight, coords, chipVersion) {
  this.coords = { z: 0 };
}

FlyingRobot.prototype.goUp = function(step = 1) {
  this.coords.z += step;
};

FlyingRobot.prototype.goDown = function(step = 1) {
  this.coords.z -= step;
};

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);

function DeliveryDrone(
  name,
  weight,
  coords,
  chipVersion,
  maxLoadWeight,
  currentLoad) {
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype.hookLoad = function(loadableObject) {
  if (loadableObject.weight <= this.maxLoadWeight
    && this.currentLoad === null) {
    this.currentLoad = loadableObject;
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
