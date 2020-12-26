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
  return `Robot: ${this.name
  }, Chip version: ${this.chipVersion
  }, Weight: ${this.weight}`;
};

function FlyingRobot(name, weight, coords, chipVersion) {
  BaseRobot.call(this, name, weight, coords, chipVersion);

  this.coords.z = 0;
}

FlyingRobot.prototype.goUp = function(step = 1) {
  this.coords.z += step;

  return this;
};

FlyingRobot.prototype.goDown = function(step = 1) {
  this.coords.z -= step;

  return this;
};

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);

function DeliveryDrone(
  name,
  weight,
  coords,
  chipVerion,
  maxLoadWeight,
  currentLoad
) {
  FlyingRobot.call(this, name, weight, coords, chipVerion);

  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype.hookLoad = function(load) {
  if (this.maxLoadWeight >= load.weight && this.currentLoad === null) {
    this.currentLoad = load;
  }

  return this;
};

DeliveryDrone.prototype.unhookLoad = function(load) {
  this.currentLoad = null;

  return this;
};

Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
