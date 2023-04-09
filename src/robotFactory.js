'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.coords = {};
    this.coords.x = coords.x;
    this.coords.y = coords.y;

    if (this.coords.x === undefined) {
      this.coords.x = 0;
    }

    if (this.coords.y === undefined) {
      this.coords.y = 0;
    }

    this.chipVersion = chipVersion;
  }

  goBack(step = 1) {
    this.coords.y -= step;
  };

  goLeft(step = 1) {
    this.coords.x -= step;
  };

  goRight(step = 1) {
    this.coords.x += step;
  };

  goForward(step = 1) {
    this.coords.y += step;
  };

  getInfo() {
    return `Robot: ${this.name}, Chip version: ${
      this.chipVersion}, Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(...name);
    this.name = name;

    this.coords.x = coords.x;
    this.coords.y = coords.y;
    this.coords.z = coords.z;

    if (this.coords.z === undefined) {
      this.coords.z = 0;
    }
    this.weight = weight;
    this.chipVersion = chipVersion;
  }

  goUp(step = 1) {
    this.coords.z += step;
  };

  goDown(step = 1) {
    this.coords.z -= step;
  };
}

class DeliveryDrone extends BaseRobot {
  constructor(name,
    weight, coords, chipVersion, maxLoadWeight, cargo = null) {
    Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);
    super(...name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = cargo;
  }

  hookLoad(cargo) {
    if ((this.currentLoad === null) && (cargo.weight <= this.maxLoadWeight)) {
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
