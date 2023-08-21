'use strict';

const STEP = 1;

class BaseRobot {
  constructor(
    name,
    weight,
    coords,
    chipVersion
  ) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = {
      x: coords.x || 0,
      y: coords.y || 0,
    };
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
    return `Robot: ${this.name}, Chip version: ${
      this.chipVersion}, Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(
    name,
    weight,
    coords,
    chipVersion
  ) {
    super(name, weight, coords, chipVersion);

    this.coords.z = coords.z || 0;
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
