'use strict';

class BaseRobot {
  constructor(name, weight, { x = 0, y = 0 } = {}, chipVersion) {
    this.name = name;

    this.coords = {
      x: x,
      y: y,
    };

    this.weight = weight;

    this.chipVersion = chipVersion;
  }
  getInfo() {
    return `Robot: ${this.name}, Chip version: ${
      this.chipVersion}, Weight: ${this.weight}`;
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
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, { x, y, z = 0 } = {}, chipVersion) {
    super(name, weight, {
      x, y,
    }, chipVersion);
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
  constructor(name, weight, { x, y, z }, chipVersion,
    maxLoadWeight, currentLoad = null) {
    super(name, weight, {
      x, y, z,
    }, chipVersion);

    this.currentLoad = currentLoad;
    this.maxLoadWeight = maxLoadWeight;
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
