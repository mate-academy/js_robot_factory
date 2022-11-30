'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = {
      x: coords.x || 0,
      y: coords.y || 0,
    };
  }
  goForward(value = 1) {
    if (value > 0) {
      this.coords.y += value;
    }
  }
  goBack(value = 1) {
    if (value > 0) {
      this.coords.y -= value;
    }
  }
  goRight(value = 1) {
    if (value > 0) {
      this.coords.x += value;
    }
  }
  goLeft(value = 1) {
    if (value > 0) {
      this.coords.x -= value;
    }
  }
  getInfo() {
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}, `
     + `Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords = {
      x: coords.x || 0,
      y: coords.y || 0,
      z: coords.z || 0,
    };
  }

  goUp(value = 1) {
    if (value > 0) {
      this.coords.z += value;
    }
  };
  goDown(value = 1) {
    if (value > 0) {
      this.coords.z -= value;
    };
  }
}
class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion,
    maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad || null;
  }
  hookLoad(cargo) {
    const loadCheck = cargo.weight <= this.maxLoadWeight;

    if (!this.currentLoad && loadCheck) {
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
