'use strict';

class BaseRobot {
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

  goRight(step = 1) {
    this.coords.x += step;
  }

  goLeft(step = 1) {
    this.coords.x -= step;
  }

  constructor(
    name,
    weight,
    coords = {
      x: 0,
      y: 0,
    },
    chipVersion) {
    this.name = name;
    this.weight = weight;
    this.coords = coords;
    this.chipVersion = chipVersion;
    this.coords.x = coords.x || 0;
    this.coords.y = coords.y || 0;
  }
}

class FlyingRobot extends BaseRobot {
  goUp(step = 1) {
    this.coords.z += step;
  }

  goDown(step = 1) {
    this.coords.z -= step;
  }

  constructor(
    name,
    weight,
    coords = {
      x: 0,
      y: 0,
      z: 0,
    },
    chipVersion) {
    super(name, weight, coords, chipVersion);
    this.coords = coords;
    this.coords.x = coords.x || 0;
    this.coords.y = coords.y || 0;
    this.coords.z = coords.z || 0;
  }
}

class DeliveryDrone extends FlyingRobot {
  hookLoad(cargo) {
    if (this.currentLoad === null && cargo.weight <= this.maxLoadWeight) {
      this.currentLoad = cargo;
    }
  }

  unhookLoad() {
    this.currentLoad = null;
  }

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
    currentLoad = null) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
