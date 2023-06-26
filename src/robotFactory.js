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

  goForward(y = 1) {
    if (y < 1) {
      return this;
    }
    this.coords.y += y;

    return this;
  }

  goBack(y = 1) {
    if (y < 1) {
      return this;
    }
    this.coords.y -= y;

    return this;
  }

  goRight(x = 1) {
    if (x < 1) {
      return this;
    }
    this.coords.x += x;

    return this;
  }

  goLeft(x = 1) {
    if (x < 1) {
      return this;
    }
    this.coords.x -= x;

    return this;
  }

  getInfo() {
    return `Robot: ${this.name}, `
    + `Chip version: ${this.chipVersion}, `
    + `Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);
    this.coords.z = coords.z || 0;
  }

  goUp(z = 1) {
    this.coords.z += z;

    return this;
  }

  goDown(z = 1) {
    this.coords.z -= z;

    return this;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad = null) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (this.currentLoad === null
      && cargo.weight <= this.maxLoadWeight) {
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
