'use strict';

class BaseRobot {
  constructor(name, weight, { x = 0, y = 0 }, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x,
      y,
    };
    this.chipVersion = chipVersion;
  }
  goForward(step = 1) {
    this.coords.y += 1;
  }
  goBack(step = 1) {
    this.coords.y -= 1;
  }
  goRight(step = 1) {
    this.coords.x += 1;
  }
  goLeft(step = 1) {
    this.coords.x -= 1;
  }
  getInfo() {
    return `Robot: ${this.name},
    Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords.z = coords.z || 0;
  }

  goUp(step = 1) {
    this.coords.z += 1;
  }
  goDown(step = 1) {
    this.coords.z -= 1;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion,
    maxLoadWeight, currentLoad = null) {
    super(name, weight, coords, chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (this.currentLoad === null && (cargo.weight <= this.maxLoadWeight)) {
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
