'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype = {
  getInfo() {
    return `Robot: ${this.name}, `
      + `Chip version: ${this.chipVersion}, `
      + `Weight: ${this.weight}`;
  },

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
};

function FlyingRobot(...args) {
  BaseRobot.call(this, ...args);

  this.coords.z = 0;
}

FlyingRobot.prototype = {
  goUp(step = 1) {
    this.coords.z += step;
  },

  goDown(step = 1) {
    this.coords.z -= step;
  },

  ...BaseRobot.prototype,
};

function DeliveryDrone(
  name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
  FlyingRobot.call(this, ...arguments);

  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype = {
  hookLoad(cargo) {
    if (cargo.weight < this.maxLoadWeight) {
      this.currentLoad = cargo;
    }
  },

  unhookLoad() {
    this.currentLoad = null;
  },

  ...FlyingRobot.prototype,
};

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
