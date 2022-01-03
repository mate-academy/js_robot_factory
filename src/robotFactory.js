'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: coords.x || 0,
      y: coords.y || 0,
    };

    this.chipVersion = chipVersion;
  }

  goForward(value = 1) {
    this.coords.y += value;
  }

  goBack(value = 1) {
    this.coords.y -= value;
  }

  goLeft(value = 1) {
    this.coords.x -= value;
  }

  goRight(value = 1) {
    this.coords.x += value;
  }

  getInfo() {
    return (
      `Robot: ${this.name}, Chip version: ${this.chipVersion},\
 Weight: ${this.weight}`
    );
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords.z = coords.z || 0;
  }

  goUp(value = 1) {
    this.coords.z += value;
  }

  goDown(value = 1) {
    this.coords.z -= value;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, chipVersion, coords);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (cargo.weight <= this.maxLoadWeight && this.currentLoad === null) {
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
