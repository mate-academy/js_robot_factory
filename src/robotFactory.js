'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    coords.x = (coords.x === undefined)
      ? 0 : coords.x;

    coords.y = (coords.y === undefined)
      ? 0 : coords.y;
    this.name = name;
    this.weight = weight;
    this.coords = coords;
    this.chipVersion = chipVersion;
  }

  getInfo() {
    return `Robot: ${this.name},`
      + ` Chip version: ${this.chipVersion},`
      + ` Weight: ${this.weight}`;
  }

  goForward(step = 1) {
    this.coords.y += step;
  }

  goBack(step = 1) {
    this.coords.y -= step;
  }

  goLeft(step = 1) {
    this.coords.x -= step;
  }

  goRight(step = 1) {
    this.coords.x += step;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    coords.z = (coords.z === undefined)
      ? 0 : coords.z;
  }

  goUp(step = 1) {
    this.coords.z += step;
  }

  goDown(step = 1) {
    this.coords.z -= step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(
    name, weight, coords, chipVersion, maxLoadWeight, currentLoad = null
  ) {
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
