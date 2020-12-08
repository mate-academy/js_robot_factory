'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype = {
  goForward(step = 0) {
    this.coords.y += step;
  },

  goBack(step = 0) {
    this.coords.y -= step;
  },

  goLeft(step = 0) {
    this.coords.x -= step;
  },

  goRight(step = 0) {
    this.coords.x += step;
  },

  getInfo() {
    return `Robot: ${this.name}, Chip version: `
    + `${this.chipVersion}, Weight: ${this.weight}`;
  },
};

function FlyingRobot(name, weight, coords, chipVersion) {
  BaseRobot.call(this, name, weight, coords, chipVersion);
  this.coords.z = 0;
}

FlyingRobot.prototype = {
  goUp(step = 0) {
    this.coords.z += step;
  },

  goDown(step = 0) {
    this.coords.z -= step;
  },
};

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);

function DeliveryDrone(name, weight, coords, chipVersion,
  maxLoadWeight, currentLoad) {
  BaseRobot.call(this, name, weight, coords, chipVersion);
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype = {
  hookLoad(load) {
    if (!this.currentLoad && this.maxLoadWeight >= load.weight) {
      this.currentLoad = load;
    }
  },

  unhookLoad() {
    this.currentLoad = null;
  },

  goUp(units = 1) {
    this.coords.z += units;
  },

  goDown(units = 1) {
    this.coords.z -= units;
  },
};

Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
