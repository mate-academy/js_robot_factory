'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: coords.x === undefined ? 0 : coords.x,
      y: coords.y === undefined ? 0 : coords.y,
    };
    this.chipVersion = chipVersion;
  }

  getInfo() {
    const { name, chipVersion, weight } = this;

    return `Robot: ${name}, Chip version: ${chipVersion}, Weight: ${weight}`;
  }

  goForward(step = 1) {
    if (step > 0) {
      this.coords.y += step;
    }
  }
  goBack(step = 1) {
    if (step > 0) {
      this.coords.y -= step;
    }
  }
  goRight(step = 1) {
    if (step > 0) {
      this.coords.x += step;
    }
  }
  goLeft(step = 1) {
    if (step > 0) {
      this.coords.x -= step;
    }
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);
    this.coords.z = coords.z === undefined ? 0 : coords.z;
  }

  goUp(step = 1) {
    if (step > 0) {
      this.coords.z += step;
    }
  }

  goDown(step = 1) {
    if (step > 0) {
      this.coords.z -= step;
    }
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad === undefined ? null : currentLoad;
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
