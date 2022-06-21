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
    const { name: n, chipVersion: c, weight: w } = this;

    return `Robot: ${n}, Chip version: ${c}, Weight: ${w}`;
  }

  goForward(step = 1) {
    this.coords.y += step;
  }

  goBack(step = 1) {
    this.coords.y -= step;
  }

  goRight(step = 1) {
    this.coords.x += step;
  }

  goLeft(step = 1) {
    this.coords.x -= step;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, { x = 0, y = 0, z = 0 }, chipVersion) {
    super(name, weight, {
      x, y,
    }, chipVersion);

    this.coords.z = z;
  }

  goUp(step = 1) {
    this.coords.z += step;
  }

  goDown(step = 1) {
    this.coords.z -= step;
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
    const { weight: W } = cargo;
    const { currentLoad: CL } = this;
    const { maxLoadWeight: MLW } = this;

    if (CL === null && W <= MLW) {
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
