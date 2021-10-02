'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;

    const {
      x = 0,
      y = 0,
    } = coords;

    this.coords = {
      x: x,
      y: y,
    };

    this.chipVersion = chipVersion;
  };

  getInfo() {
    const nameInf = this.name;
    const version = this.chipVersion;
    const weightInf = this.weight;

    return `Robot: ${nameInf}, Chip version: ${version}, Weight: ${weightInf}`;
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
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    const {
      z = 0,
    } = coords;

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
  constructor(name, weight, coords, chipVersion, maxLoadWeight, cargo) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = cargo;
  }

  hookLoad(cargo2) {
    const currentLoad1 = this.currentLoad;

    if (currentLoad1 === null & cargo2.weight <= this.maxLoadWeight) {
      this.currentLoad = cargo2;
    };
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
