'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
};

BaseRobot.prototype.goForward = function(y = 1) {
  if (y > 0) {
    this.coords.y += y;
  }

  return this;
};

BaseRobot.prototype.goBack = function(y = 1) {
  if (y > 0) {
    this.coords.y -= y;
  }

  return this;
};

BaseRobot.prototype.goLeft = function(x = 1) {
  if (x > 0) {
    this.coords.x -= x;
  }

  return this;
};

BaseRobot.prototype.goRight = function(x = 1) {
  if (x > 0) {
    this.coords.x += x;
  }

  return this;
};

BaseRobot.prototype.getInfo = function() {
  const { name, chipVersion, weight } = this;

  return `Robot: ${name}, Chip version: ${chipVersion}, Weight: ${weight}`;
};

function FlyingRobot(name, weight, coords, chipVersion) {
  BaseRobot.call(this, name, weight, coords, chipVersion);
  this.coords.z = 0;
}

FlyingRobot.prototype.goUp = function(z = 1) {
  this.coords.z += z;

  return this;
};

FlyingRobot.prototype.goDown = function(z = 1) {
  this.coords.z -= z;

  return this;
};

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);

function DeliveryDrone(
  name, weight, coords, chipVersion, maxLoadWeight, currentLoad
) {
  FlyingRobot.call(this, name, weight, coords, chipVersion);

  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype.hookLoad = function(load) {
  if (load.weight <= this.maxLoadWeight && this.currentLoad === null) {
    this.currentLoad = load;
  }

  return this;
};

DeliveryDrone.prototype.unhookLoad = function() {
  this.currentLoad = null;

  return this;
};

Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
