'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = coords;

    if (!this.coords.x) {
      this.coords.x = 0;
    }

    if (!this.coords.y) {
      this.coords.y = 0;
    }
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

  getInfo() {
    // eslint-disable-next-line max-len
    return (`Robot: ${this.name}, Chip version: ${this.chipVersion}, Weight: ${this.weight}`);
  };
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);
    this.coords = coords;

    if (!this.coords.z) {
      this.coords.z = 0;
    }
  };

  goUp(step = 1) {
    this.coords.z += step;
  };

  goDown(step = 1) {
    this.coords.z -= step;
  };
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
    this.count = 0;

    if (!currentLoad) {
      this.currentLoad = null;
    }
  }

  hookLoad(cargo) {
    if (this.count === 0 && cargo.weight <= this.maxLoadWeight) {
      this.currentLoad = cargo;

      // // eslint-disable-next-line no-console
      // console.log(this.currentLoad, cargo, this.maxLoadWeight);
    }
  };

  unhookLoad() {
    this.currentLoad = null;
    this.count++;
  }
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};

// // eslint-disable-next-line no-console
// console.log(cargo);
