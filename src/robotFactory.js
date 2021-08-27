'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = {
      x: coords.x,
      y: coords.y,
    };

    if (coords.x === undefined) {
      this.coords.x = 0;
      this.coords.y = 0;
    }
  }
  goForward(step = 1) {
    this.coords.y = this.coords.y + step;
  }
  goBack(step = 1) {
    this.coords.y = this.coords.y - step;
  }
  goRight(step = 1) {
    this.coords.x = this.coords.x + step;
  }
  goLeft(step = 1) {
    this.coords.x = this.coords.x - step;
  }
  getInfo() {
    const str = `Robot: ${this.name},
Chip version: ${this.chipVersion}, Weight: ${this.weight}`;

    return str.replace('\n', ' ');
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords = {
      x: coords.x,
      y: coords.y,
      z: coords.z,
    };

    if (this.coords.z === undefined) {
      this.coords.z = 0;
    }
  }
  goUp(step = 1) {
    this.coords.z = this.coords.z + step;
  }
  goDown(step = 1) {
    this.coords.z = this.coords.z - step;
  }
}
class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, position, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, position, chipVersion);
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
