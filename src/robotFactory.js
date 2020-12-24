'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype = {
  goForward(n = 1) {
    this.coords.y += n;
  },
  goBack(n = 1) {
    this.coords.y -= n;
  },
  goRight(n = 1) {
    this.coords.x += n;
  },
  goLeft(n = 1) {
    this.coords.x -= n;
  },
  getInfo() {
    return `Robot: ${this.name}, `
      + `Chip version: ${this.chipVersion}, `
      + `Weight: ${this.weight}`;
  },
};

function FlyingRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
  this.coords.z = 0;
}

FlyingRobot.prototype = BaseRobot.prototype;

FlyingRobot.prototype.goUp = function f(n = 1) {
  this.coords.z += n;
};

FlyingRobot.prototype.goDown = function f(n = 1) {
  this.coords.z -= n;
};

function DeliveryDrone(name, weight, coords,
  chipVersion, maxLoadWeight, currentLoad = null) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype = FlyingRobot.prototype;

DeliveryDrone.prototype.hookLoad = function f(obj) {
  if (obj.weight <= this.maxLoadWeight
    && this.currentLoad === null) {
    this.currentLoad = obj;
  }
};

DeliveryDrone.prototype.unhookLoad = function f() {
  this.currentLoad = null;
};

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
