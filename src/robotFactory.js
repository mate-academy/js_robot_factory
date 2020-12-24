'use strict';

function BaseRobot(name,
  weight,
  coords,
  chipVersion) {
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

function FlyingRobot(name,
  weight,
  coords,
  chipVersion) {
  this.___proto___ = BaseRobot;
  this.coords = coords;
  this.coords.z = 0;
}

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);

FlyingRobot.prototype.goUp = function f(n = 1) {
  this.coords.z += n;
};

FlyingRobot.prototype.goDown = function f(n = 1) {
  this.coords.z -= n;
};

function DeliveryDrone(
  name,
  weight,
  coords,
  chipVersion,
  maxLoadWeight,
  currentLoad = null) {
  this.___proto___ = FlyingRobot;
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

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
