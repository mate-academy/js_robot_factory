'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;
    this.coords = {};
    this.coords.x = coords.x || 0;
    this.coords.y = coords.y || 0;
  }

  goForward(step) {
    this.coords.y += step || 1;
  }

  goBack(step) {
    this.coords.y -= step || 1;
  }

  goRight(step) {
    this.coords.x += step || 1;
  }

  goLeft(step) {
    this.coords.x -= step || 1;
  }

  getInfo() {
    return `Robot: ${this.name}, `
      + `Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);
    this.coords.z = coords.z || 0;
  }

  goUp(step) {
    this.coords.z += step || 1;
  }

  goDown(step) {
    this.coords.z -= step || 1;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad || null;
  }

  hookLoad(cargo) {
    if (this.currentLoad === null && cargo.weight <= this.maxLoadWeight) {
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
