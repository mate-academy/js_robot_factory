'use strict';

class BaseRobot {
  constructor(name, weight, { x = 0, y = 0 }, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x, y,
    };
    this.chipVersion = chipVersion;
  }

  goForward(step = 1) {
    this.coords.y += step;
  }

  goBack(step = 1) {
    this.coords.y += -step;
  }

  goRight(step = 1) {
    this.coords.x += step;
  }

  goLeft(step = 1) {
    this.coords.x += -step;
  }

  getInfo() {
    return (`Robot: ${this.name}, Chip version: ${this.chipVersion},`
    + ` Weight: ${this.weight}`);
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, { x, y, z = 0 }, chipVersion) {
    super(name, weight, {
      x, y,
    }, chipVersion);
    this.coords.z = z;
  }

  goUp(step = 1) {
    this.coords.z += step;
  }

  goDown(step = 1) {
    this.coords.z += -step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, { x, y, z = 0 },
    chipVersion, maxLoadWeight, cargo) {
    super(name, weight, {
      x, y, z,
    }, chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = cargo || null;
  }

  hookLoad(cargo) {
    if ((cargo.weight <= this.maxLoadWeight) && (this.currentLoad === null)) {
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
