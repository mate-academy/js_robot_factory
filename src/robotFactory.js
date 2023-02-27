'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.coords = coords;
    this.chipVersion = chipVersion;
    this.coords.x = coords.x || 0;
    this.coords.y = coords.y || 0;
  }

  goForward(stepY = 1) {
    this.coords.y += stepY;
  }

  goBack(stepY = 1) {
    this.coords.y -= stepY;
  }

  goRight(stepX = 1) {
    this.coords.x += stepX;
  }

  goLeft(stepX = 1) {
    this.coords.x -= stepX;
  }

  getInfo() {
    return `Robot: ${
      this.name}, Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);
    this.coords.z = coords.z || 0;
  }

  goUp(stepZ = 1) {
    this.coords.z += stepZ;
  }

  goDown(stepZ = 1) {
    this.coords.z -= stepZ;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);
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
