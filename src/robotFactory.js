'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;
    this.coords = coords;
    this.init();
  }

  init() {
    (!this.coords.x) && (this.coords.x = 0);
    (!this.coords.y) && (this.coords.y = 0);
  }

  goForward(y = 1) {
    this.coords.y += y;
  };

  goBack(y = 1) {
    this.coords.y -= y;
  };

  goLeft(x = 1) {
    this.coords.x -= x;
  };

  goRight(x = 1) {
    this.coords.x += x;
  }

  getInfo() {
    return `Robot: ${
      this.name}, Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coorsd, chipVersion) {
    super(name, weight, coorsd, chipVersion);
    (!this.coords.z) && (this.coords.z = 0);
  }

  goUp(z = 1) {
    this.coords.z += z;
  };

  goDown(z = 1) {
    this.coords.z -= z;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name,
    weight, coords, chipVersion, maxLoadWeight, currentLoad = null) {
    super(name, weight, coords, chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (this.currentLoad === null
      && cargo.weight <= this.maxLoadWeight) {
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
