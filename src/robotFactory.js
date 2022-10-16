'use strict';

class BaseRobot {
  constructor(name, weight, position, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: position.x || 0,
      y: position.y || 0,
    };

    this.chipVersion = chipVersion;
  }

  goForward(y = 1) {
    this.coords.y += y;
  }

  goBack(y = 1) {
    this.coords.y -= y;
  }

  goRight(x = 1) {
    this.coords.x += x;
  }

  goLeft(x = 1) {
    this.coords.x -= x;
  }

  getInfo() {
    return `Robot: ${this.name},`
    + ` Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, position, chipVersion) {
    super(name, weight, position, chipVersion);

    this.coords.z = position.z || 0;
  }

  goUp(z = 1) {
    this.coords.z += z;
  }

  goDown(z = 1) {
    this.coords.z -= z;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, position, chipVersion,
    maxLoadWeight, currentLoad = null) {
    super(name, weight, position, chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
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
