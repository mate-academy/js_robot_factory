'use strict';

class BaseRobot {
  constructor(name, weight, coords = {}, chipVersion) {
    const {
      x = 0,
      y = 0,
    } = coords;

    this.name = name;
    this.weight = weight;

    this.coords = {
      x, y,
    };
    this.chipVersion = chipVersion;
  }

  goForward(a = 1) {
    this.coords.y += a;
  }

  goBack(a = 1) {
    this.coords.y -= a;
  }

  goLeft(a = 1) {
    this.coords.x -= a;
  }

  goRight(a = 1) {
    this.coords.x += a;
  }

  getInfo() {
    return `Robot: ${this.name}`
    + `, Chip version: ${this.chipVersion},`
    + ` Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords = {}, chipVersion) {
    super(name, weight, coords, chipVersion);

    const {
      z = 0,
    } = coords;

    this.coords.z = z;
  }

  goUp(a = 1) {
    this.coords.z += a;
  }

  goDown(a = 1) {
    this.coords.z -= a;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords = {},
    chipVersion, maxLoadWeight, currentLoad = null) {
    super(name, weight, coords, chipVersion);

    this.maxLoadWeight = maxLoadWeight;

    if (currentLoad === null || this.maxLoadWeight > currentLoad.weight) {
      this.currentLoad = currentLoad;
    }
  }

  hookLoad(load) {
    if (this.maxLoadWeight >= load.weight && this.currentLoad === null) {
      this.currentLoad = load;
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
