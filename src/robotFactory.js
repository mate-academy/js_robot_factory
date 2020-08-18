'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  // implement
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

BaseRobot.prototype.goLeft = function(step = 1) {
  this.coords.x -= step;
};

BaseRobot.prototype.goRight = function(step = 1) {
  this.coords.x += step;
};

BaseRobot.prototype.getInfo = function() {
  return `Robot: ${this.name}, Chip version: `
  + `${this.chipVersion}, Weight: ${this.weight}`;
};

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);
// FlyingRobot.prototype = BaseRobot.prototype;

function FlyingRobot(name, weight, coords, chipVersion) {
  // implement
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.coords.z = 0;
  this.chipVersion = chipVersion;
}

FlyingRobot.prototype.goUp = function(step = 1) {
  this.coords.z += step;
};

FlyingRobot.prototype.goDown = function(step = 1) {
  this.coords.z -= step;
};

Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

function DeliveryDrone(name, weight, coords, chipVersion
  , maxLoadWeight, currentLoad) {
  // implement
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype.hookLoad = function(cargo) {
  if (cargo.weight <= this.maxLoadWeight) {
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
