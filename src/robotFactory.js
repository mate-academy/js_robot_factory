'use strict';

class BaseRobot {
  constructor(name, weight, coords = {
    x: 0,
    y: 0,
  }, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: coords.x || 0,
      y: coords.y || 0,
    };
    this.chipVersion = chipVersion;
  }

  getInfo() {
    /* eslint-disable object-curly-newline, max-len */
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  };

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
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords.z = coords.z || 0;
  }

  goDown(step = 1) {
    this.coords.z -= step;
  }

  goUp(step = 1) {
    this.coords.z += step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords = {
    x: 0,
    y: 0,
    z: 0,
  }, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad || null;
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

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
