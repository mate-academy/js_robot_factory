'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;

    if (!coords.hasOwnProperty('x')) {
      coords.x = 0;
    }

    if (!coords.hasOwnProperty('y')) {
      coords.y = 0;
    }

    this.coords = coords;
    this.weight = weight;
    this.chipVersion = chipVersion;
  }
  goForward(step = 1) {
    this.coords.y += step;
  }

  goRight(step = 1) {
    this.coords.x += step;
  }

  goLeft(step = 1) {
    this.coords.x -= step;
  }

  goBack(step = 1) {
    this.coords.y -= step;
  }
/* eslint-disable */
  getInfo() {
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  }
}
/* eslint-disable */
class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    if (!coords.hasOwnProperty('z')) {
      coords.z = 0;
    }
  }

  goUp(step = 1) {
    this.coords.z += step;
  }

  goDown(step = 1) {
    this.coords.z -= step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion, maxLoadWeight, currentLoad);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (this.currentLoad === null && this.maxLoadWeight >= cargo.weight) {
      this.currentLoad = cargo;
    }
  }

  unhookLoad() {
    this.currentLoad = null;
  }
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
