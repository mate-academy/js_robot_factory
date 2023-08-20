'use strict';

const ROBOT_BASE_COORD = 0;
const BASE_STEP = 1;

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: coords.x || ROBOT_BASE_COORD,
      y: coords.y || ROBOT_BASE_COORD,
    };
    this.chipVersion = chipVersion;
  }

  getInfo() {
    return `Robot: ${this.name}, `
    + `Chip version: ${this.chipVersion}, `
    + `Weight: ${this.weight}`;
  }

  goForward(step = BASE_STEP) {
    this.coords.y += step;

    return this;
  }

  goBack(step = BASE_STEP) {
    this.coords.y -= step;

    return this;
  }

  goRight(step = BASE_STEP) {
    this.coords.x += step;

    return this;
  }

  goLeft(step = BASE_STEP) {
    this.coords.x -= step;

    return this;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords.z = coords.z || ROBOT_BASE_COORD;
  }

  goUp(step = BASE_STEP) {
    this.coords.z += step;

    return this;
  }

  goDown(step = BASE_STEP) {
    this.coords.z -= step;

    return this;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion,
    maxLoadWeight, currentLoad = null) {
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
