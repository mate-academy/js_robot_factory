'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype = {
  goForward(value = 1) {
    this.coords.y += value;
  },
  goBack(value = 1) {
    this.coords.y -= value;
  },
  goRight(value = 1) {
    this.coords.x += value;
  },
  goLeft(value = 1) {
    this.coords.x -= value;
  },
  getInfo() {
    return `Robot: ${this
      .name}, Chip version: ${this
      .chipVersion}, Weight: ${this.weight}`;
  },
};

function FlyingRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
  this.coords.z = 0;
}

FlyingRobot.prototype = {
  goUp(value = 1) {
    this.coords.z += value;
  },
  goDown(value = 1) {
    this.coords.z -= value;
  },
};

function DeliveryDrone(name, weight, coords, chipVersion,
  maxLoadWeight, currentLoad) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
  this.coords.z = 0;
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype = {
  hookLoad(cargo) {
    if (cargo.weight <= this.maxLoadWeight
      && this.currentLoad === null) {
      this.currentLoad = cargo;
    }
  },
  unhookLoad() {
    this.currentLoad = null;
  },
};

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);
Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
