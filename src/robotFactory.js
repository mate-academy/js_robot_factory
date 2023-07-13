'use strict';

class BaseRobot {
  constructor(name, weight, position = {
    x: 0, y: 0,
  }, chipVersion) {
    if (position.x === undefined) {
      position.x = 0;
    }

    if (position.y === undefined) {
      position.y = 0;
    }

    this.name = name;
    this.weight = weight;
    this.coords = position;
    this.chipVersion = chipVersion;
  }

  goForward(step = 1) {
    this.coords.y += step;
  }

  goBack(step = 1) {
    this.coords.y -= step;
  }

  goRight(step = 1) {
    this.coords.x += step;
  }

  goLeft(step = 1) {
    this.coords.x -= step;
  }

  getInfo() {
    const { name, weight, chipVersion } = this;

    return `Robot: ${name}, Chip version: ${chipVersion}, Weight: ${weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, position, chipVersion) {
    super(name, weight, position, chipVersion);

    if (position.z === undefined) {
      position.z = 0;
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
