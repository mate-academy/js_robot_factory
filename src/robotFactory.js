'use strict';

function BaseRobot(
  name,
  weight,
  coords,
  chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype = {
  goForward: function(step = 1) {
    this.coords.y += step;
  },
  goBack: function(step = 1) {
    this.coords.y -= step;
  },
  goRight: function(step = 1) {
    this.coords.x += step;
  },
  goLeft: function(step = 1) {
    this.coords.x -= step;
  },
  getInfo: function() {
    // eslint-disable-next-line max-len
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  },
};

function FlyingRobot(
  name,
  weight,
  coords,
  chipVersion) {
  BaseRobot.call(this, name, weight, coords, chipVersion);

  this.coords = {
    z: 0,
  };
}

FlyingRobot.prototype = {
  goUp: function(step = 1) {
    this.coords.z += step;
  },
  goDown: function(step = 1) {
    this.coords.z -= step;
  },
};

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);

function DeliveryDrone(
  name,
  weight,
  coords,
  chipVersion,
  maxLoadWeight,
  currentLoad) {
  FlyingRobot.call(this, name, weight, coords, chipVersion);
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype = {
  hookLoad(objectLoad) {
    if (objectLoad.weight <= this.maxLoadWeight && this.currentLoad === null) {
      this.currentLoad = objectLoad;
    }
  },
  unhookLoad() {
    this.currentLoad = null;
  },
};

Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
