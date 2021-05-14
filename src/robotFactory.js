'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    if (!coords.x) {
      this.coords = {
        x: 0,
        y: 0,
      };
    } else {
      this.coords = coords;
    }

    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;
  }

  goForward(a = 1) {
    this.coords.y += a;
  };

  goBack(a = 1) {
    this.coords.y -= a;
  };

  goRight(a = 1) {
    this.coords.x += a;
  };

  goLeft(a = 1) {
    this.coords.x -= a;
  };

  getInfo() {
    return `Robot: ${this.name}, Chip version: ${this.chipVersion},`
    + ` Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    if (!this.coords.z) {
      this.coords.z = 0;
    }
  }

  goUp(a = 1) {
    this.coords.z += a;
  };

  goDown(a = 1) {
    this.coords.z -= a;
  };
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (this.currentLoad === null
      && cargo.weight <= this.maxLoadWeight) {
      this.currentLoad = cargo;
    }
  };

  unhookLoad() {
    this.currentLoad = null;
  }
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
