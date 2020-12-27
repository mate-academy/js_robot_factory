'use strict';

function BaseRobot(
  name,
  weight,
  coords = {
    x: 0,
    y: 0,
  },
  chipVersion) {
  this.name = name;
  this.weight = weight;

  this.coords = {
    x: coords.x,
    y: coords.y,
  };

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
  return `Robot: ${this.name},
    Chip version: ${this.chipVersion},
    Weight: ${this.weight}`;
};

function FlyingRobot(
  name,
  weight,
  coords = {
    x: 0,
    y: 0,
    z: 0,
  },
  chipVersion) {
  this.coords = {
    z: 0,
  };
}

FlyingRobot.prototype.goUp = function(step = 1) {
  this.coords.z += step;
};

FlyingRobot.prototype.goDown = function(step = 1) {
  this.coords.z -= step;
};

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

DeliveryDrone.prototype.hookLoad = function(currentLoad) {
  if (!this.currentLoad) {
    if (currentLoad.weight <= this.maxLoadWeight) {
      this.currentLoad = currentLoad;
    }
  }
};

DeliveryDrone.prototype.unhookLoad = function() {
  this.currentLoad = null;
};

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);
Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
