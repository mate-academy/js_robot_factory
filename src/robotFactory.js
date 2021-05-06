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

BaseRobot.prototype.getInfo = function(step = 1) {
  // eslint-disable-next-line max-len
  return `Robot: ${this.name}, Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
};

function FlyingRobot(name, weight, coords, chipVersion) {
  const prev = new BaseRobot(name, weight, coords, chipVersion);

  for (const key in prev) {
    if (prev.hasOwnProperty(key)) {
      this[key] = prev[key];
    }
  }

  this.coords.z = 0;
}

FlyingRobot.prototype = BaseRobot.prototype;

FlyingRobot.prototype.goUp = function(step = 1) {
  this.coords.z += step;

  return this;
};

FlyingRobot.prototype.goDown = function(step = 1) {
  this.coords.z -= step;

  return this;
};

function DeliveryDrone(
  name,
  weight,
  coords,
  chipVersion,
  maxLoadWeight,
  currentLoad) {
  const prev = new FlyingRobot(name, weight, coords, chipVersion);

  for (const key in prev) {
    if (prev.hasOwnProperty(key)) {
      this[key] = prev[key];
    }
  }

  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype = FlyingRobot.prototype;

DeliveryDrone.prototype.hookLoad = function(loadObject) {
  if (loadObject.weight < this.maxLoadWeight) {
    this.currentLoad = loadObject;
  }
};

DeliveryDrone.prototype.unhookLoad = function(loadedObject) {
  this.currentLoad = null;
};

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
