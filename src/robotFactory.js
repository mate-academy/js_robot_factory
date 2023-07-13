'use strict';

class BaseRobot {
  constructor(name, weight, coords = {}, chipVersion) {
    if (coords.x === undefined) {
      coords.x = 0;
    }

    if (coords.y === undefined) {
      coords.y = 0;
    }

    this.name = name;
    this.weight = weight;
    this.coords = coords;
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
    return `Robot: ${this.name},`
    + ` Chip version: ${this.chipVersion},`
    + ` Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords = {
    x: 0,
    y: 0,
    z: 0,
  }, chipVersion) {
    if (coords.z === undefined) {
      coords.z = 0;
    }

    super(name, weight, coords, chipVersion);
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
  constructor(name, weight, coords = {
    x: 0,
    y: 0,
  }, chipVersion, maxLoadWeight, currentLoad = null) {
    super(name, weight, coords, chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (!this.currentLoad && cargo.weight <= this.maxLoadWeight) {
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
