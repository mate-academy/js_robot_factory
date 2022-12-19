'use strict';

class BaseRobot {
  constructor(name, weight, { x = 0, y = 0 }, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x,
      y,
    };

    this.chipVersion = chipVersion;
  }

  goForward(y = 1) {
    this.coords.y += y;
  }

  goBack(y = 1) {
    this.coords.y -= y;
  }

  goLeft(x = 1) {
    this.coords.x -= x;
  }

  goRight(x = 1) {
    this.coords.x += x;
  }

  getInfo() {
    return `Robot: ${this.name}, `
    + `Chip version: ${this.chipVersion}, `
    + `Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, { z = 0, ...coords }, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords.z = z;
  }

  goUp(z = 1) {
    this.coords.z += z;
  }

  goDown(z = 1) {
    this.coords.z -= z;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name,
    weight,
    { ...coords },
    chipVersion,
    maxLoadWeight,
    currentLoad = null) {
    super(name, weight, { ...coords }, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo = {}) {
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
