'use strict';

function BaseRobot(name, weight, coords = {
  x: 0,
  y: 0,
}, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.chipVersion = chipVersion;

  this.coords = {
    x: coords.x,
    y: coords.y,
  };
}

BaseRobot.prototype.goForward = function(step = 1) {
  this.coords.y += step;
};

BaseRobot.prototype.goBack = function(step = 1) {
  this.coords.y -= step;
};

BaseRobot.prototype.goRight = function(step = 1) {
  this.coords.x += step;
};

BaseRobot.prototype.goLeft = function(step = 1) {
  this.coords.x -= step;
};

BaseRobot.prototype.getInfo = function() {
  return `Robot: ${this.name}, Chip version: `
+ `${this.chipVersion}, Weight: ${this.weight}`;
};

function FlyingRobot(name, weight, chipVersion, coords = {
  x: 0,
  y: 0,
  z: 0,
}) {
  this.name = name;
  this.weight = weight;

  this.coords = {
    x: coords.x,
    y: coords.y,
    z: coords.z,
  };
  this.chipVersion = chipVersion;
}

FlyingRobot.prototype.goUp = function(step = 1) {
  this.coords.z += step;
};

FlyingRobot.prototype.goDown = function(step = -1) {
  this.coords.z += step;
};

Object.setPrototypeOf(FlyingRobot.prototype,
  BaseRobot.prototype);

function DeliveryDrone(name, weight,
  coords = {
    x: 0,
    y: 0,
    z: 0,
  },
  chipVersion, maxLoadWeight, currentLoad) {
  this.name = name;
  this.weight = weight;
  this.chipVersion = chipVersion;
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

Object.setPrototypeOf(FlyingRobot, DeliveryDrone);

DeliveryDrone.prototype.hookLoad = function(cargo) {
  if (cargo.weight <= this.maxLoadWeight && this.currentLoad === null) {
    this.currentLoad = cargo;
  } else {
    this.currentLoad = this.currentLoad;
  }
};

DeliveryDrone.prototype.unhookLoad = function() {
  this.currentLoad = null;
};

Object.setPrototypeOf(DeliveryDrone.prototype,
  FlyingRobot.prototype);

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
