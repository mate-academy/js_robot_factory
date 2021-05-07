'use strict';

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
  goLeft(step = 1) {
    this.coords.x -= step;
  },
  goRight(step = 1) {
    this.coords.x += step;
  },
  getInfo() {
    return `Robot: ${this.name}, Chip version: ${
      this.chipVersion}, Weight: ${this.weight}`;
  },
};

Object.setPrototypeOf(FlyingRobot, BaseRobot);

function FlyingRobot(name, weight, coords, chipVersion) {
  this.coords = coords;
  this.coords.z = 0;
}

FlyingRobot.prototype = {
  __proto__: BaseRobot.prototype,
  goUp(step = 1) {
    this.coords.z += step;
  },
  goDown(step = 1) {
    this.coords.z -= step;
  },
};

Object.setPrototypeOf(DeliveryDrone, FlyingRobot);

function DeliveryDrone(
  name, weight, coords, chipVersion, maxLoadWeight, currentLoad
) {
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype = {
  __proto__: FlyingRobot.prototype,
  hookLoad(load) {
    if (load.weight <= this.maxLoadWeight && !this.currentLoad) {
      this.currentLoad = load;
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
