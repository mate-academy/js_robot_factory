'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: (coords.x === undefined) ? 0 : coords.x,
      y: (coords.y === undefined) ? 0 : coords.y,
    };
    this.chipVersion = chipVersion;
  }
  goForward(step = 1) {
    this.coords.y = this.coords.y + step;
  }
  goBack(step = 1) {
    this.coords.y = this.coords.y - step;
  }
  goRight(step = 1) {
    this.coords.x = this.coords.x + step;
  }
  goLeft(step = 1) {
    this.coords.x = this.coords.x - step;
  }
  getInfo() {
    return `Robot: ${this.name
    }, Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords = {
      x: (coords.x === undefined) ? 0 : coords.x,
      y: (coords.y === undefined) ? 0 : coords.y,
      z: (coords.z === undefined) ? 0 : coords.z,
    };
  }
  goUp(step = 1) {
    this.coords.z = this.coords.z + step;
  }
  goDown(step = 1) {
    this.coords.z = this.coords.z - step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(
    name,
    weight,
    coords,
    chipVersion,
    maxLoadWeight,
    currentLoad = null
  ) {
    super(name, weight, coords, chipVersion);
    this.currentLoad = currentLoad;
    this.maxLoadWeight = maxLoadWeight;
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
