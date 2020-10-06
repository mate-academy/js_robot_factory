'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype.getInfo = function() {
  const { name, chipVersion, weight } = this;

  return `Robot: ${name}, Chip version: ${chipVersion}, Weight: ${weight}`;
};

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

function FlyingRobot(...arg) {
  BaseRobot.apply(this, arg);

  this.coords.z = 0;
}

FlyingRobot.prototype = {
  ...BaseRobot.prototype,

  goUp(step = 1) {
    this.coords.z += step;
  },

  goDown(step = 1) {
    this.coords.z -= step;
  },
};

function DeliveryDrone(
  name,
  weight,
  coords,
  chipVersion,
  maxLoadWeight,
  currentLoad
) {
  FlyingRobot.call(this, name, weight, coords, chipVersion);

  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype = {
  ...FlyingRobot.prototype,

  hookLoad(cargo) {
    if (cargo.weight < this.maxLoadWeight) {
      this.currentLoad = cargo;
    }
  },

  unhookLoad() {
    this.currentLoad = null;
  },
};

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
