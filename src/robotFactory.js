'use strict';

class BaseRobot {
  constructor(name, weight, coords = {}, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = {
      x: 0,
      y: 0,
    };

    if (Object.keys(coords).length !== 0) {
      this.coords = {
        ...this.coords,
        ...coords,
      };
    }
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
    return `Robot: ${this.name},`
     + ` Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords = {}, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords = {
      ...this.coords,
      z: 0,
    };

    if (Object.keys(coords).length) {
      this.coords = {
        ...this.coords,
        ...coords,
      };
    }
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
    name,
    weight,
    coord = {},
    chipVersion,
    maxLoadWeight,
    currentLoad = null
  ) {
    super(name, weight, coord, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (this.currentLoad === null && cargo.weight <= this.maxLoadWeight) {
      this.currentLoad = {};
      this.currentLoad.weight = cargo.weight;
      this.currentLoad.description = cargo.description;
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
