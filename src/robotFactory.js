'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype = {
  goForward(y = 1) {
    this.coords.y += y;
  },
  goBack(y = 1) {
    this.coords.y -= y;
  },
  goRight(x = 1) {
    this.coords.x += x;
  },
  goLeft(x = 1) {
    this.coords.x -= x;
  },
  getInfo() {
    return 'Robot: ' + this.name
    + ', Chip version: ' + this.chipVersion
    + ', Weight: ' + this.weight;
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
  goUp(z = 1) {
    this.coords.z += z;
  },
  goDown(z = 1) {
    this.coords.z -= z;
  },
};

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);

function DeliveryDrone(name, weight, coords,
  chipVersion, maxLoadWeight, currentLoad) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
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
};

Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
