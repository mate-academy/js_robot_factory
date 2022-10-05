'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: 0,
      y: 0,
      ...coords,
    };
    this.chipVersion = chipVersion;
  }
  getInfo() {
    return `Robot: ${this.name}, Chip version: `
      + `${this.chipVersion}, Weight: ${this.weight}`;
  }

  goForward(step = 1) {
    if (step > 0) {
      this.coords.y += step;
    }
  }
  goBack(step = 1) {
    if (step > 0) {
      this.coords.y -= step;
    }
  }
  goLeft(step = 1) {
    if (step > 0) {
      this.coords.x -= step;
    }
  }
  goRight(step = 1) {
    if (step > 0) {
      this.coords.x += step;
    }
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight);

    this.coords = {
      x: 0,
      y: 0,
      z: 0,
      ...coords,
    };
    this.chipVersion = chipVersion;
  }

  goUp(step = 1) {
    if (step > 0) {
      this.coords.z += step;
    }
  }

  goDown(step = 1) {
    if (step > 0) {
      this.coords.z -= step;
    }
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
    if (this.currentLoad === null && cargo.weight <= this.maxLoadWeight) {
      this.currentLoad = cargo;
    }

    return this;
  }
  unhookLoad() {
    this.currentLoad = null;

    return this;
  }
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
