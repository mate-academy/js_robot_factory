'use strict';

class BaseRobot {
  constructor(name, weight, position, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: position.x || 0,
      y: position.y || 0,
    };

    this.chipVersion = chipVersion;
  }

  goForward(steps = 1) {
    this.coords.y += steps;
  }

  goBack(steps = 1) {
    this.coords.y -= steps;
  }

  goRight(steps = 1) {
    this.coords.x += steps;
  }

  goLeft(steps = 1) {
    this.coords.x -= steps;
  }

  getInfo() {
    return `Robot: ${this.name}, Chip version: `
      + `${this.chipVersion}, Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, position, chipVersion) {
    super(name, weight, position, chipVersion);

    this.coords = {
      x: position.x || 0,
      y: position.y || 0,
      z: position.z || 0,
    };
  };

  goUp(steps = 1) {
    this.coords.z += steps;
  }

  goDown(steps = 1) {
    this.coords.z -= steps;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(
    name,
    weight,
    position,
    chipVersion,
    maxLoadWeight,
    cargo
  ) {
    super(name, weight, position, chipVersion);

    this.maxLoadWeight = maxLoadWeight;

    this.currentLoad = cargo || null;
  };

  hookLoad(cargo) {
    if (this.currentLoad === null
      && cargo.weight <= this.maxLoadWeight) {
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
