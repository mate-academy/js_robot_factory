'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: Object.keys(coords).length > 0 ? coords.x : 0,
      y: Object.keys(coords).length > 0 ? coords.y : 0,
    };
    this.chipVersion = chipVersion;
  }

  goForward(step = 1) {
    this.coords.y += step;
  };

  goBack(step = 1) {
    this.coords.y -= step;
  };

  goLeft(step = 1) {
    this.coords.x -= step;
  };

  goRight(step = 1) {
    this.coords.x += step;
  };

  getInfo() {
    const a = `Robot: ${this.name}, `;
    const b = `Chip version: ${this.chipVersion}, Weight: ${this.weight}`;

    return a + b;
  };
}

class FlyingRobot extends BaseRobot {
  constructor(...args) {
    super(...args);
    this.coords.z = Object.keys(args[2]).length > 2 ? args[2].z : 0;
  }

  goUp(step = 1) {
    this.coords.z += step;
  };

  goDown(step = 1) {
    this.coords.z -= step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    this.currentLoad = this.currentLoad
      ? this.currentLoad
      : (cargo.weight <= this.maxLoadWeight)
        ? cargo
        : null;
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
