'use strict';

class BaseRobot {
  constructor(name, weight, { x = 0, y = 0 }, chipversion) {
    this.name = name;

    this.weight = weight;

    this.coords = {
      x,
      y,
    };

    this.chipVersion = chipversion;
  }

  goForward(step = 1) {
    this.coords.y += step;
  };

  goBack(step = 1) {
    this.coords.y -= step;
  };

  goRight(step = 1) {
    this.coords.x += step;
  };
  goLeft(step = 1) {
    this.coords.x -= step;
  };

  getInfo() {
    return `Robot: ${this.name}, Chip version: ${
      this.chipVersion}, Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, { x, y, z = 0 }, chipversion) {
    super(name, weight, {
      x, y,
    }, chipversion);
    this.coords.z = z;
  }

  goUp(step = 1) {
    this.coords.z += step;
  }

  goDown(step = 1) {
    this.coords.z -= step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(
    name, weight, coords, chipversion,
    maxLoadWeight, currentLoad = null
  ) {
    super(name, weight, coords, chipversion);
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
