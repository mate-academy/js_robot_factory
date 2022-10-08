'use strict';

class BaseRobot {
  constructor(name, weight, { x = 0, y = 0 }, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: x,
      y: y,
    };
    this.chipVersion = chipVersion;
  }

  getInfo() {
    return `Robot: ${this.name}, Chip version: ${this
      .chipVersion}, Weight: ${this.weight}`;
  }

  goForward(steps = 1) {
    this.coords.y += steps;
  }

  goBack(steps = 1) {
    this.coords.y -= steps;
  }

  goRight(steps = 1) {
    this.coords.x += steps;
  }

  goLeft(steps = 1) {
    this.coords.x -= steps;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, { x = 0, y = 0, z = 0 }, chipVersion) {
    super(name, weight, {
      x, y,
    }, chipVersion);

    this.coords.z = z;
  }

  goUp(steps = 1) {
    this.coords.z += steps;
  }

  goDown(steps = 1) {
    this.coords.z -= steps;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, { x = 0, y = 0, z = 0 },
    chipVersion, maxLoadWeight, currentLoad = null) {
    super(name, weight, {
      x, y, z,
    }, chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (cargo.weight <= this.maxLoadWeight && this.currentLoad === null) {
      this.currentLoad = cargo;
    };
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
