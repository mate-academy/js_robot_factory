'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.coords = coords;

    if (!coords.x) {
      this.coords.x = 0;
    }

    if (!coords.y) {
      this.coords.y = 0;
    }

    this.chipVersion = chipVersion;
  }

  goForward(value = 1) {
    this.coords.y += value;
  }

  goBack(value = 1) {
    this.coords.y -= value;
  }

  goRight(value = 1) {
    this.coords.x += value;
  }

  goLeft(value = 1) {
    this.coords.x -= value;
  }

  getInfo() {
    return `Robot: ${this.name}, Chip version: ${this.chipVersion},`
    + ` Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    if (!coords.z) {
      this.coords.z = 0;
    }
  }

  goUp(value = 1) {
    this.coords.z += value;
  }

  goDown(value = 1) {
    this.coords.z -= value;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(
    name, weight, coords, chipVersion, maxLoadWeight, currentLoad = null
  ) {
    super(name, weight, coords, chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
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
