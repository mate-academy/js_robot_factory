'use strict';
class BaseRobot {
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
    return `Robot: ${this.name},`
+ ` Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  }

  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = {
      x: 0,
      y: 0,
    };

    if (coords.x !== undefined) {
      this.coords.x = coords.x;
    }

    if (coords.y !== undefined) {
      this.coords.y = coords.y;
    }
  }
}
class FlyingRobot extends BaseRobot {
  goUp(step = 1) {
    this.coords.z += step;
  }
  goDown(step = 1) {
    this.coords.z -= step;
  }
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords = {
      x: 0,
      y: 0,
      z: 0,
    };

    if (coords.x !== undefined) {
      this.coords.x = coords.x;
    }

    if (coords.y !== undefined) {
      this.coords.y = coords.y;
    }

    if (coords.z !== undefined) {
      this.coords.z = coords.z;
    }
  }
}

class DeliveryDrone extends FlyingRobot {
  hookLoad(cargo) {
    if (this.maxLoadWeight >= cargo.weight && this.currentLoad === null) {
      this.currentLoad = cargo;
    }
  }
  unhookLoad() {
    this.currentLoad = null;
  }

  constructor(name, weight, coords, chipVersion,
    maxLoadWeight, currentLoad = null) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
