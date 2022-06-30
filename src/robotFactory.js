'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = {
      x: 0,
      y: 0,
      ...coords,
    };
  }

  goForward(steps = 1) {
    this.coords.y += steps;
  };

  goBack(steps = 1) {
    this.coords.y -= steps;
  };

  goRight(steps = 1) {
    this.coords.x += steps;
  };

  goLeft(steps = 1) {
    this.coords.x -= steps;
  };

  getInfo() {
    return `Robot: ${this.name},`
      + ` Chip version: ${this.chipVersion},`
      + ` Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords = {
      z: 0,
      ...coords,
    };
  }

  goUp(steps = 1) {
    this.coords.z += steps;
  };

  goDown(steps = 1) {
    this.coords.z -= steps;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, chipVersion, coords,
    maxLoadWeight, currentLoad = null) {
    super(name, weight, chipVersion, coords);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (!this.currentLoad && cargo.weight <= this.maxLoadWeight) {
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
