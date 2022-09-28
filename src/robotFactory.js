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

  goForward(y = 1) {
    if (y > 0) {
      this.coords.y += y;
    }

    return this;
  }
  goBack(y = 1) {
    if (y > 0) {
      this.coords.y -= y;
    }

    return this;
  }
  goLeft(x = 1) {
    if (x > 0) {
      this.coords.x -= x;
    }

    return this;
  }
  goRight(x = 1) {
    if (x > 0) {
      this.coords.x += x;
    }

    return this;
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

  goUp(z = 1) {
    if (z > 0) {
      this.coords.z += z;
    }

    return this;
  }

  goDown(z = 1) {
    if (z > 0) {
      this.coords.z -= z;
    }

    return this;
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
