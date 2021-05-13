'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    if (!coords.x) {
      coords.x = 0;
      coords.y = 0;
    }

    this.name = name;
    this.weight = weight;
    this.coords = coords;
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
    const n = this.name;
    const c = this.chipVersion;
    const w = this.weight;

    return `Robot: ${n}, Chip version: ${c}, Weight: ${w}`;
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
    if (this.currentLoad === null) {
      this.currentLoad = cargo;
    }

    if (this.currentLoad.weight > this.maxLoadWeight) {
      this.currentLoad = null;
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
