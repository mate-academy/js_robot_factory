'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype.goForward = function(step) {
  if (step === undefined) {
    this.coords.y++;
  } else {
    this.coords.y += step;
  }
};

BaseRobot.prototype.goBack = function(step) {
  if (step === undefined) {
    this.coords.y--;
  } else {
    this.coords.y -= step;
  }
};

BaseRobot.prototype.goRight = function(step) {
  if (step === undefined) {
    this.coords.x++;
  } else {
    this.coords.x += step;
  }
};

BaseRobot.prototype.goLeft = function(step) {
  if (step === undefined) {
    this.coords.x--;
  } else {
    this.coords.x -= step;
  }
};

BaseRobot.prototype.getInfo = function() {
  return `Robot: ${this.name}, Chip version: ${this.chipVersion}, `
    + `Weight: ${this.weight}`;
};

function FlyingRobot(name, weight, coords, chipVersion) {
  BaseRobot.call(this, name, weight, coords, chipVersion);

  this.coords.z = 0;
}

FlyingRobot.prototype.goUp = function(step) {
  if (step === undefined) {
    this.coords.z++;
  } else {
    this.coords.z += step;
  }
};

FlyingRobot.prototype.goDown = function(step) {
  if (step === undefined) {
    this.coords.z--;
  } else {
    this.coords.z -= step;
  }
};

function DeliveryDrone(name, weight, coords, chipVersion,
  maxLoadWeight, currentLoad) {
  FlyingRobot.call(this, name, weight, coords, chipVersion);
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype.hookLoad = function(cargo) {
  if (cargo.weight <= this.maxLoadWeight && this.currentLoad === null) {
    this.currentLoad = cargo;
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
