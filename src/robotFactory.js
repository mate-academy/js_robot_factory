'use strict';

class BaseRobot {
  constructor(name, weight, coords = {}, chipVersion) {
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
  }

  getInfo() {
    return `Robot: ${this.name}, `
      + `Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  };

  goForward(y = 1) {
    this.coords.y += y;
  };

  goBack(y = 1) {
    this.coords.y -= y;
  };

  goLeft(x = 1) {
    this.coords.x -= x;
  };

  goRight(x = 1) {
    this.coords.x += x;
  };
}

class FlyingRobot {
  constructor(name, weight, coords = {}, chipVersion) {
    this.name = name;
    this.weight = weight;

    const {
      x = 0,
      y = 0,
      z = 0,
    } = coords;

    this.coords = {
      x: x,
      y: y,
      z: z,
    };

    this.chipVersion = chipVersion;
  }

  goUp(z = 1) {
    this.coords.z += z;
  };

  goDown(z = 1) {
    this.coords.z -= z;
  }
}

class DeliveryDrone {
  constructor(name,
    weight,
    coords = {},
    chipVersion,
    maxLoadWeight,
    currentLoad = null) {
    this.name = name;
    this.weight = weight;
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;

    const {
      x = 0,
      y = 0,
      z = 0,
    } = coords;

    this.coords = {
      x: x,
      y: y,
      z: z,
    };

    this.chipVersion = chipVersion;
  }

  hookLoad(cargo) {
    if (this.currentLoad === null && cargo.weight <= this.maxLoadWeight) {
      this.currentLoad = cargo;
    }
  }

  unhookLoad() {
    this.currentLoad = null;
  }
}

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);
Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
