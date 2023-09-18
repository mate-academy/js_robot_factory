'use strict';

const BASE_STEP = 1;
const BASE_COORDS = 0;

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: coords.x || BASE_COORDS,
      y: coords.y || BASE_COORDS,
    };

    this.chipVersion = chipVersion;
  }

  goForward(step = BASE_STEP) {
    this.coords.y += step;
  }

  goBack(step = BASE_STEP) {
    this.coords.y -= step;
  }

  goRight(step = BASE_STEP) {
    this.coords.x += step;
  }

  goLeft(step = BASE_STEP) {
    this.coords.x -= step;
  }

  getInfo() {
    const name = this.name;
    const chipVersion = this.chipVersion;
    const weight = this.weight;

    return `Robot: ${name}, Chip version: ${chipVersion}, Weight: ${weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);
    this.coords.z = coords.z || BASE_COORDS;
  }

  goUp(step = BASE_STEP) {
    this.coords.z += step;
  }

  goDown(step = BASE_STEP) {
    this.coords.z -= step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(
    name,
    weight,
    coords = {
      x: 0,
      y: 0,
      z: 0,
    },
    chipVersion,
    maxLoadWeight,
    currentLoad = null
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
