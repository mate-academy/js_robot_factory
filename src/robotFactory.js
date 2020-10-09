'use strict';

// BASE ROBOT
function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype = {
  goForward(step = 1) {
    this.coords.y += step;
  },

  goBack(step = 1) {
    this.coords.y -= step;
  },

  goRight(step = 1) {
    this.coords.x += step;
  },

  goLeft(step = 1) {
    this.coords.x -= step;
  },

  getInfo() {
    return `Robot: ${this.name}, `
      + `Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  },
};

// FLYING ROBOT
function FlyingRobot(name, weight, coords, chipVersion) {
  BaseRobot.call(this, ...arguments);

  this.coords.z = 0;
}

FlyingRobot.prototype = {
  goUp(step = 1) {
    this.coords.z += step;
  },

  goDown(step = 1) {
    this.coords.z -= step;
  },
};

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);

// DELIVERY DRONE
function DeliveryDrone(
  name,
  weight,
  coords,
  chipVersion,
  maxLoadWeight,
  currentLoad) {
  BaseRobot.call(this, ...arguments);

  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype.hookLoad = function(load) {
  if (load.weight < this.maxLoadWeight) {
    this.currentLoad = load;
  }
};

DeliveryDrone.prototype.unhookLoad = function() {
  this.currentLoad = null;
};

Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
