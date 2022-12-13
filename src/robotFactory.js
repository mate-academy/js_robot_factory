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
    this.coords.y += step;

    return this.coords.y;
  }

  goBack(step = 1) {
    this.coords.y -= step;

    return this.coords.y;
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
    // These two variables are to avoid eslintmax-len error
    const n = this.name;
    const cV = this.chipVersion;

    return `Robot: ${n}, Chip version: ${cV}, Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);
    this.coords.z = coords.z || 0;
  };
  goForward(step = 1) {
    super.goForward(step);
  }

  goBack(step = 1) {
    super.goBack(step);
  }

  goRight(step = 1) {
    super.goRight(step);
  }

  goLeft(step = 1) {
    super.goLeft(step);
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
