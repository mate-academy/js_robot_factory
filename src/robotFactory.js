'use strict';

function BaseRobot(name = '', weight = 0, coords = {
  x: 0, y: 0,
}, chipVersion = 0) {
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
    return `Robot: ${this.name}, Chip version: ${
      this.chipVersion}, Weight: ${this.weight}`;
  },
};

function FlyingRobot(name, weight, coords, chipVersion) {
  BaseRobot.call(this, name, weight, coords, chipVersion);

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

function DeliveryDrone(name, weight, coords, chipVersion,
  maxLoadWeight = 0, currentLoad = 0) {
  FlyingRobot.call(this, name, weight, coords, chipVersion);
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype = {
  hookLoad(obj) {
    if (obj.weight <= this.maxLoadWeight && this.currentLoad === null) {
      this.currentLoad = obj;
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
