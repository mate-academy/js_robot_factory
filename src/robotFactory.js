'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;

    if (coords.x === undefined) {
      this.coords = {
        x: 0,
        y: 0,
      };
    } else {
      this.coords = coords;
    }

    this.chipVersion = chipVersion;
  }

  goForward(step = 1) {
    this.coords.y += step;
  }
  goBack(step = 1) {
    this.coords.y -= step;
  }
  goLeft(step = 1) {
    this.coords.x -= step;
  }
  goRight(step = 1) {
    this.coords.x += step;
  }
  getInfo() {
    const { name, weight, chipVersion } = this;

    return `Robot: ${name}, Chip version: ${chipVersion}, Weight: ${weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    if (coords.z === undefined) {
      this.coords.z = 0;
    } else {
      this.coords = coords;
    }
  }

  goUp(step = 1) {
    this.coords.z += step;
  }
  goDown(step = 1) {
    this.coords.z -= step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords = {
    x: 0, y: 0, z: 0,
  }, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);

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
