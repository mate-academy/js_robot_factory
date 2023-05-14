'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = {
      x: 0,
      y: 0,
    };
  }

  getInfo() {
    return `Robot: ${this.name},`
    + ` Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  }

  goForward(step) {
    this.coords.y += step;
  }
  goBack(step) {
    this.coords.y -= step;
  }
  goRight(step) {
    this.coords.x += step;
  }
  goLeft(step) {
    this.coords.x -= step;
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
  }

  goUp(step) {
    this.coords.z += step;
  }
  goDown(step) {
    this.coords.z -= step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(coords) {
    super(coords);

    this.currentLoad = null;
    this.maxLoadWeight = null;
  }

  hookLoad(cargo) {
    if (this.currentLoad === null && cargo.length <= this.maxLoadWeight) {
      this.currentLoad = cargo;
    }
  }
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
