'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.coords = {
      x: 0, y: 0,
    };
    this.name = name;
    this.weight = weight;

    if (coords.hasOwnProperty('x')) {
      this.coords.x = coords.x;
    }

    if (coords.hasOwnProperty('y')) {
      this.coords.y = coords.y;
    }
    this.chipVersion = chipVersion;
  }

  goLeft(step = 1) {
    this.coords.x -= step;
  }

  goRight(step = 1) {
    this.coords.x += step;
  }

  goBack(step = 1) {
    this.coords.y -= step;
  }

  goForward(step = 1) {
    this.coords.y += step;
  }

  getInfo() {
    /* eslint-disable-next-line */
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    if (coords.hasOwnProperty('z')) {
      this.coords.z = coords.z;
    } else {
      this.coords.z = 0;
    }
  }
  goDown(step = 1) {
    this.coords.z -= step;
  }

  goUp(step = 1) {
    this.coords.z += step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (cargo.weight <= this.maxLoadWeight && !this.currentLoad) {
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
