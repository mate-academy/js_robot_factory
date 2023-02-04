'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;
    this.coords = coords;

    this.coords = {
      x: coords.x || 0,
      y: coords.y || 0,
    };
  };

  goForward(step = 1) {
    this.coords.y += step;
  };
  goBack(step = 1) {
    this.coords.y -= step;
  };
  goLeft(step = 1) {
    this.coords.x -= step;
  };
  goRight(step = 1) {
    this.coords.x += step;
  };
  getInfo() {
    return `Robot: ${this.name}, Chip version: ${
      this.chipVersion}, Weight: ${this.weight}`;
  }
}
class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords = coords;

    this.coords = {
      x: coords.x || 0,
      y: coords.y || 0,
      z: coords.z || 0,
    };
  };
  goUp(step = 1) {
    this.coords.z += step;
  };
  goDown(step = 1) {
    this.coords.z -= step;
  };
}

// const cargo = {};

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad || null;
  };
  hookLoad(cargo = {}) {
    if (this.currentLoad === null && cargo.weight <= this.maxLoadWeight) {
      this.currentLoad = {
        weight: cargo.weight,
        description: cargo.description,
      };
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
