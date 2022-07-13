'use strict';

class BaseRobot {
  constructor(name, weight, { x = 0, y = 0 }, chipVersion) {
    this.name = name;

    this.coords = {
      x,
      y,
    };
    this.weight = weight;
    this.chipVersion = chipVersion;
  }

  goForward(step = 1) {
    this.coords.y = this.coords.y + step;
  }

  goBack(step = 1) {
    this.coords.y = this.coords.y - step;
  }

  goRight(step = 1) {
    this.coords.x = this.coords.x + step;
  }

  goLeft(step = 1) {
    this.coords.x = this.coords.x - step;
  }

  getInfo() {
    const { name, chipVersion, weight } = this;

    return `Robot: ${name}, Chip version: ${chipVersion}, Weight: ${weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords.z = coords.z || 0;
  }
  goUp(step = 1) {
    this.coords.z = this.coords.z + step;
  }

  goDown(step = 1) {
    this.coords.z = this.coords.z - step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion,
    maxLoadWeight, currentLoad = null) {
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
