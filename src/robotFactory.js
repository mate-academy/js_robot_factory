'use strict';

const STEP = 1;
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

  goForward(step = STEP) {
    this.coords.y += step;
  }

  goBack(step = STEP) {
    this.coords.y -= step;
  }

  goRight(step = STEP) {
    this.coords.x += step;
  }

  goLeft(step = STEP) {
    this.coords.x -= step;
  }

  getInfo() {
    const NAME = this.name;
    const CHIP_VERSION = this.chipVersion;
    const WEIGHT = this.weight;

    return `Robot: ${NAME}, Chip version: ${CHIP_VERSION}, Weight: ${WEIGHT}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);
    this.coords.z = coords.z || BASE_COORDS;
  }

  goUp(step = STEP) {
    this.coords.z += step;
  }

  goDown(step = STEP) {
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
