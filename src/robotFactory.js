'use strict';

class BaseRobot {
  constructor(name, weight, coords = 0, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    const {
      x = 0,
      y = 0,
    } = coords;

    this.coords = {
      x,
      y,
    };
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

  getInfo() {
    const { name, chipVersion, weight } = this;

    return `Robot: ${name}, Chip version: ${chipVersion}, Weight: ${weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords = {}, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords.z = coords.z || 0;
  }

  goDown(step = 1) {
    this.coords.z -= step;
  }

  goUp(step = 1) {
    this.coords.z += step;
  }

  getInfo() {
    const { name, chipVersion, weight } = this;

    return `Robot: ${name}, Chip version: ${chipVersion}, Weight: ${weight}`;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords = {}, chipVersion,
    maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);

    this.currentLoad = currentLoad || null;
    this.maxLoadWeight = maxLoadWeight;
  };

  hookLoad(cargo) {
    if (!this.currentLoad && cargo.weight <= this.maxLoadWeight) {
      this.currentLoad = { ...cargo };
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
