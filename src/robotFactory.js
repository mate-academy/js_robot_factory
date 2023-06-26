'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.x = coords.x || 0;
    this.y = coords.y || 0;

    this.name = name;
    this.weight = weight;

    this.coords = {
      x: this.x,
      y: this.y,
    };

    this.chipVersion = chipVersion;
  }

  goForward(value = 1) {
    this.coords.y += value;
  }

  goBack(value = 1) {
    this.coords.y -= value;
  }

  goRight(value = 1) {
    this.coords.x += value;
  }

  goLeft(value = 1) {
    this.coords.x -= value;
  }

  getInfo() {
    return `Robot: ${
      this.name}, Chip version: ${
      this.chipVersion}, Weight: ${
      this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion, z) {
    super(name, weight, coords, chipVersion);

    this.z = coords.z || 0;

    this.coords = {
      ...coords,
      z: this.z,
    };
  }

  goUp(value = 1) {
    this.coords.z += value;
  }

  goDown(value = 1) {
    this.coords.z -= value;
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
