'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = {
      x: coords.x || 0,
      y: coords.y || 0,
    };
  }

  getInfo() {
    return `Robot: ${this.name}, `
    + `Chip version: ${this.chipVersion}, `
    + `Weight: ${this.weight}`;
  }

  goForward(step) {
    this.coords.y += step || 1;

    return this;
  }

  goBack(step) {
    this.coords.y -= step || 1;

    return this;
  }

  goRight(step) {
    this.coords.x += step || 1;

    return this;
  }

  goLeft(step) {
    this.coords.x -= step || 1;

    return this;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);
    this.coords.z = coords.z || 0;
  }

  goUp(step) {
    this.coords.z += step || 1;

    return this;
  }

  goDown(step) {
    this.coords.z -= step || 1;

    return this;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (this.maxLoadWeight >= cargo.weight && this.currentLoad === null) {
      this.currentLoad = cargo;
    }

    return this;
  }

  unhookLoad() {
    this.currentLoad = null;

    return this;
  }
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
