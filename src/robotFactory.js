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
  return `Robot: ${this.name}, `
  + `Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
};

function FlyingRobot(name, weigth, coords, chipVersion) {
  BaseRobot.call(this, name, weigth, coords, chipVersion);
  this.coords.z = 0;
}

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);

FlyingRobot.prototype.__proto__.goUp = function(step = 1) {
  this.coords.z += step;

  return this;
};

FlyingRobot.prototype.__proto__.goDown = function(step = -1) {
  this.coords.z += step;

  return this;
};

function DeliveryDrone(
  name,
  weigth,
  coords,
  chipVersion,
  maxLoadWeight,
  currentLoad
) {
  FlyingRobot.call(this, name, weigth, coords, chipVersion);
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

DeliveryDrone.prototype.__proto__.hookLoad = function(loadObj) {
  if (loadObj.weight < this.maxLoadWeight) {
    this.currentLoad = loadObj;
  }

  return this;
};

DeliveryDrone.prototype.__proto__.unhookLoad = function() {
  this.currentLoad = null;

  return this;
};

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
