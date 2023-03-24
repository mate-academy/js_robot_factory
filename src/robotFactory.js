'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: coords.x || 0,
      y: coords.y || 0,
    };

    this.chipVersion = chipVersion;
  }

  goForward(step = 1) {
    this.coords.y += step < 1 ? 1 : step;
  }

  goBack(step = 1) {
    this.coords.y -= step < 1 ? 1 : step;
  }

  goRight(step = 1) {
    this.coords.x += step < 1 ? 1 : step;
  }

  goLeft(step = 1) {
    this.coords.x -= step < 1 ? 1 : step;
  }

  getInfo() {
    return (`Robot: ${this.name},`
    + ` Chip version: ${this.chipVersion}, Weight: ${this.weight}`);
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);
    this.coords.z = coords.z || 0;
  }

  goDown(step = 1) {
    this.coords.z -= step < 1 ? 1 : step;
  }

  goUp(step = 1) {
    this.coords.z += step < 1 ? 1 : step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords,
    chipVersion, maxLoadWeight, currentLoad = null) {
    super(name, weight, coords, chipVersion);
    this.currentLoad = currentLoad;
    this.maxLoadWeight = maxLoadWeight;
  }

  hookLoad(cargo) {
    if (cargo.weight <= this.maxLoadWeight && this.currentLoad === null) {
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
