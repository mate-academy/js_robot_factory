'use strict';

const ROBOT_BASE_COORDS = {
  x: 0,
  y: 0,
  z: 0,
};
const BASE_STEP = 1;

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.coords = {
      x: coords.x || ROBOT_BASE_COORDS.x,
      y: coords.y || ROBOT_BASE_COORDS.y,
    };
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;
  }

  getInfo() {
    return `Robot: ${this.name}, `
    + `Chip version: ${this.chipVersion}, `
    + `Weight: ${this.weight}`;
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
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords.z = coords.z || ROBOT_BASE_COORDS.z;
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
    coords,
    chipVersion,
    maxLoadWeight,
    currentLoad = null
  ) {
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
