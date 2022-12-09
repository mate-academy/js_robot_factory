'use strict';

class BaseRobot {
  constructor(
    name,
    weight,
    coords = {},
    chipVersion,) {
    this.name = name;
    this.weight = weight;
    this.coords = coords;

    if (this.coords.x === undefined) {
      this.coords.x = 0;
    }

    if (this.coords.y === undefined) {
      this.coords.y = 0;
    }
    this.chipVersion = chipVersion;
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
    const robotName = `Robot: ${this.name}`;
    const chipVersion = `Chip version: ${this.chipVersion}`;
    const weight = `Weight: ${this.weight}`;

    return `${robotName}, ${chipVersion}, ${weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(
    name,
    weight,
    coords = {},
    chipVersion) {
    super(name, weight, coords, chipVersion);
    this.coords = coords;

    if (this.coords.z === undefined) {
      this.coords.z = 0;
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
  constructor(name, weight, chipVersion, coords = {
    x: 0, y: 0, z: 0,
  }, maxLoadWeight, currentLoad = null) {
    super(name, weight, chipVersion, coords);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo = {}) {
    if (this.currentLoad === null && cargo.weight <= this.maxLoadWeight) {
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
