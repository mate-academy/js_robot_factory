'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: 0,
      y: 0,
    };
    this.coords = Object.assign(this.coords, coords);
    this.chipVersion = chipVersion;
  }

  goForward(value = 1) {
    if (value <= 0) {
      return this;
    }

    this.coords.y += value;

    return this;
  }

  goBack(value = 1) {
    if (value <= 0) {
      return this;
    }

    this.coords.y -= value;

    return this;
  }

  goRight(value = 1) {
    if (value <= 0) {
      return this;
    }

    this.coords.x += value;

    return this;
  }

  goLeft(value = 1) {
    if (value <= 0) {
      return this;
    }

    this.coords.x -= value;

    return this;
  }

  getInfo() {
    // eslint-disable-next-line max-len
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords = {
      x: 0,
      y: 0,
      z: 0,
    };
    this.coords = Object.assign(this.coords, coords);
  }

  goUp(value = 1) {
    if (value <= 0) {
      return this;
    }

    this.coords.z += value;

    return this;
  }

  goDown(value = 1) {
    if (value <= 0) {
      return this;
    }

    this.coords.z -= value;

    return this;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords = {
    x: 0,
    y: 0,
    z: 0,
  }, chipVersion, maxLoadWeight, currentLoad = null) {
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
