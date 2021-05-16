'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    const { y = 0, x = 0 } = coords;

    this.name = name;
    this.weight = weight;

    this.coords = {
      y,
      x,
    };
    this.chipVersion = chipVersion;
  }

  getInfo() {
    return `Robot: ${this.name},`
      + ` Chip version: ${this.chipVersion},`
      + ` Weight: ${this.weight}`;
  }

  goForward(step = 1) {
    this.coords.y += step;

    return this;
  };

  goBack(step = 1) {
    this.coords.y -= step;

    return this;
  };

  goRight(step = 1) {
    this.coords.x += step;

    return this;
  };

  goLeft(step = 1) {
    this.coords.x -= step;

    return this;
  };
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    const { x = 0, y = 0, z = 0 } = coords;

    this.coords = {
      x,
      y,
      z,
    };
  };

  goUp(step = 1) {
    this.coords.z += step;

    return this;
  };

  goDown(step = 1) {
    this.coords.z -= step;

    return this;
  };
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  };

  hookLoad(cargo) {
    if (cargo.weight <= this.maxLoadWeight && this.currentLoad === null) {
      this.currentLoad = cargo;
    }
  };

  unhookLoad() {
    this.currentLoad = null;
  };
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
