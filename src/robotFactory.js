'use strict';

class BaseRobot {
  constructor(name, weight, { x: x1 = 0, y: y1 = 0 }, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: x1,
      y: y1,
    };

    this.chipVersion = chipVersion;
  }

  getInfo() {
    return `Robot: ${this.name}, Chip version: ${
      this.chipVersion}, Weight: ${this.weight}`;
  }

  goForward(value = 1) {
    this.coords.y += value;

    return this;
  };

  goBack(value = 1) {
    this.coords.y -= value;

    return this;
  };

  goLeft(value = 1) {
    this.coords.x -= value;

    return this;
  };

  goRight(value = 1) {
    this.coords.x += value;

    return this;
  };
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, { x: x1 = 0, y: y1 = 0, z: z1 = 0 }, chipVersion) {
    super(name, weight, z1, chipVersion);
    this.coords.x = x1;
    this.coords.y = y1;
    this.coords.z = z1;
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
    super(name, weight, coords, chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (this.currentLoad === null && cargo.weight <= this.maxLoadWeight) {
      this.currentLoad = cargo;
    }
  }

  unhookLoad() {
    this.currentLoad = null;
  };
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
