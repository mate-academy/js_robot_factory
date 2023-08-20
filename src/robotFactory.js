'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.coords = coords;
    this.chipVersion = chipVersion;

    if (!coords.y) {
      this.coords.y = 0;
    }

    if (!coords.x) {
      this.coords.x = 0;
    }
  }

  goForward(step = 1) {
    this.coords.y += step;

    return this.coords.x;
  }

  goBack(step = 1) {
    this.coords.y -= step;

    return this.coords.x;
  }

  goRight(step = 1) {
    this.coords.x += step;

    return this.coords.x;
  }

  goLeft(step = 1) {
    this.coords.x -= step;

    return this.coords.x;
  }

  getInfo() {
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}, Weight: ${
      this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    if (!coords.z) {
      this.coords.z = 0;
    }
  }

  goUp(step = 1) {
    this.coords.z += step;

    return this.coords.z;
  }

  goDown(step = 1) {
    this.coords.z -= step;

    return this.coords.z;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight || null;
    this.currentLoad = currentLoad || null;
  }

  hookLoad(cargo) {
    if (cargo.weight <= this.maxLoadWeight) {
      if (this.currentLoad === null) {
        this.currentLoad = cargo;
      }
    }
  }

  unhookLoad() {
    this.currentLoad = null;

    return this.currentLoad;
  }
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
