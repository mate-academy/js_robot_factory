'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  // implement
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype = {
  goRight(step = 1) {
    this.coords.x += step;
  },

  goLeft(step = 1) {
    this.coords.x -= step;
  },

  goBack(step = 1) {
    this.coords.y -= step;
  },

  goForward(step = 1) {
    this.coords.y += step;
  },
  getInfo() {
    return (`Robot: ${this.name},`
    + ` Chip version: ${this.chipVersion},`
    + ` Weight: ${this.weight}`);
  },
};

FlyingRobot.prototype = {
  goUp(step = 1) {
    this.coords.z += step;
  },

  goDown(step = 1) {
    this.coords.z -= step;
  },
};

function FlyingRobot() {
  // implement
  BaseRobot.call(this, ...arguments);

  this.coords.z = 0;
}

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);

DeliveryDrone.prototype = {
  unhookLoad() {
    this.currentLoad = null;
  },
  hookLoad(cargo) {
    if (cargo.weight <= this.maxLoadWeight && this.currentLoad === null) {
      this.currentLoad = cargo;
    }
  },
};

function DeliveryDrone(name, weight, coords, chipVersion,
  maxLoadWeight, currentLoad) {
  // implement
  FlyingRobot.call(this, ...arguments);

  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
