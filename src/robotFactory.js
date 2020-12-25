'use strict';

function BaseRobot(
  name,
  weight,
  coords,
  chipVersion
) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype.goForward = function(steps = 1) {
  this.coords.y += steps;
};

BaseRobot.prototype.goBack = function(steps = 1) {
  this.coords.y -= steps;
};

BaseRobot.prototype.goRight = function(steps = 1) {
  this.coords.x += steps;
};

BaseRobot.prototype.goLeft = function(steps = 1) {
  this.coords.x -= steps;
};

BaseRobot.prototype.getInfo = function() {
  return `Robot: ${
    this.name
  }, Chip version: ${
    this.chipVersion
  }, Weight: ${
    this.weight
  }`;
};

function FlyingRobot(
  name,
  weight,
  coords,
  chipVersion
) {
  this.coords = coords;
  this.coords.z = 0;
}

Object.setPrototypeOf(FlyingRobot, BaseRobot);
FlyingRobot.prototype = Object.create(BaseRobot.prototype);

FlyingRobot.prototype.goUp = function(steps = 1) {
  this.coords.z += steps;
};

FlyingRobot.prototype.goDown = function(steps = 1) {
  this.coords.z -= steps;
};

function DeliveryDrone(
  name,
  weight,
  coords,
  chipVersion,
  maxLoadWeight,
  currentLoad
) {
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype.hookLoad = function(currentLoad) {
  if (this.currentLoad === null) {
    if (currentLoad.weight <= this.maxLoadWeight) {
      this.currentLoad = currentLoad;
    }
  }
};

Object.setPrototypeOf(DeliveryDrone, FlyingRobot);

DeliveryDrone.prototype.unhookLoad = function() {
  this.currentLoad = null;
};

Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
