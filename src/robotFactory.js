'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  // implement
  this.name = name;
  this.weight = weight;
  this.chipVersion = chipVersion;
  this.coords = coords;
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
    const { name, chipVersion, weight } = this;

    return `Robot: ${name}, Chip version: ${chipVersion}, Weight: ${weight}`;
  },
};

function FlyingRobot(name, weight, coords, chipVersion) {
  // implement
  BaseRobot.call(this, ...arguments);

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

function DeliveryDrone(
  name,
  weight,
  coords,
  chipVersion,
  maxLoadWeight,
  currentLoad,
) {
  // implement
  FlyingRobot.call(this, ...arguments);

  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype = {
  hookLoad(loadObject) {
    if (loadObject.weight < this.maxLoadWeight) {
      this.currentLoad = loadObject;
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
