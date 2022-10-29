'use strict';

class BaseRobot {
  constructor(name, weight, coords = {
    x: 0, y: 0,
  }, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.coords = {};
    this.setCoords(coords);
    this.chipVersion = chipVersion;
  }

  setCoords(coords) {
    this.coords.x = coords.x || 0;
    this.coords.y = coords.y || 0;
  }

  goForward(step = 1) {
    this.coords.y += step;

    return this;
  }

  goRight(step = 1) {
    this.coords.x += step;

    return this;
  }

  goBack(step = 1) {
    this.coords.y -= step;

    return this;
  }

  goLeft(step = 1) {
    this.coords.x -= step;

    return this;
  }

  getInfo() {
    return `Robot: ${this.name}, Chip version:`
    + ` ${this.chipVersion}, Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);
    this.setCoords(coords);
  }

  setCoords(coords) {
    this.coords.x = coords.x || 0;
    this.coords.y = coords.y || 0;
    this.coords.z = coords.z || 0;
  }

  goDown(step = 1) {
    this.coords.z -= step;

    return this;
  }

  goUp(step = 1) {
    this.coords.z += step;

    return this;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords = {
    x: 0, y: 0, z: 0,
  }, chipVersion, maxLoadWeight, currentLoad = null) {
    super(name, weight, coords, chipVersion, maxLoadWeight, currentLoad);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (Object.keys(cargo).length
      && cargo.weight <= this.maxLoadWeight
      && this.currentLoad === null) {
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
