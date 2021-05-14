'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.coords = coords;
    this.chipVersion = chipVersion;

    coords.x = coords.x
      ? coords.x
      : 0;

    coords.y = coords.y
      ? coords.y
      : 0;
  }
}

BaseRobot.prototype.goLeft = function(step = 1) {
  this.coords.x -= step;
};

BaseRobot.prototype.goRight = function(step = 1) {
  this.coords.x += step;
};

BaseRobot.prototype.goBack = function(step = 1) {
  this.coords.y -= step;
};

BaseRobot.prototype.goForward = function(step = 1) {
  this.coords.y += step;
};

BaseRobot.prototype.getInfo = function() {
  // eslint-disable-next-line max-len
  return `Robot: ${this.name}, Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
};

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords = {
    x: 0,
    y: 0,
    z: 0,
  }, chipVersion) {
    super(name, weight, coords, chipVersion);

    coords.z = coords.z
      ? coords.z
      : 0;
  }
}

FlyingRobot.prototype.goUp = function(step = 1) {
  this.coords.z += step;
};

FlyingRobot.prototype.goDown = function(step = 1) {
  this.coords.z -= step;
};

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords = {
    x: 0,
    y: 0,
    z: 0,
  }, chipVersion, maxLoadWeight, currentLoad = null) {
    super(name, weight, coords, chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }
}

DeliveryDrone.prototype.hookLoad = function(cargo) {
  if (this.currentLoad === null && cargo.weight <= this.maxLoadWeight) {
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
