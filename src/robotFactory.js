'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    const { x = 0, y = 0 } = coords;

    this.name = name;
    this.weight = weight;
    this.coords = coords;
    this.coords.x = x;
    this.coords.y = y;
    this.chipVersion = chipVersion;
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

  goBack(step = 1) {
    this.coords.y -= step;
  };

  getInfo() {
    return `Robot: ${this.name}, `
    + `Chip version: ${this.chipVersion}, `
    + `Weight: ${this.weight}`;
  };
};

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    const { z = 0 } = coords;

    this.coords.z = z;
  };

  goDown(step = 1) {
    this.coords.z -= step;
  }

  goUp(step = 1) {
    this.coords.z += step;
  };
};

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  };

  hookLoad(cargo) {
    if (cargo.weight <= this.maxLoadWeight && this.currentLoad === null) {
      this.currentLoad = cargo;
    };
  };
  unhookLoad() {
    this.currentLoad = null;
  };
};

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
