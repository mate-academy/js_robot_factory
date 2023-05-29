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
    const name = this.name;
    const chip = this.chipVersion;
    const weight = this.weight;

    return `Robot: ${name}, Chip version: ${chip}, Weight: ${weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, position, chipVersion) {
    super(name, weight, position, chipVersion);

    this.coords = {
      x: position.x || 0,
      y: position.y || 0,
      z: position.z || 0,
    };
  }

  goUp(step = 1) {
    this.coords.z += step;
  }

  goDown(step = 1) {
    this.coords.z -= step;
  }
};

class DeliveryDrone extends FlyingRobot {
  constructor(
    name,
    weight,
    position,
    chipVersion,
    maxLoadWeight,
    currentLoad = null
  ) {
    super(name, weight, position, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    const canLoad = this.currentLoad === null
      && cargo.weight <= this.maxLoadWeight;

    if (canLoad) {
      this.currentLoad = cargo;
    }
  };

  unhookLoad() {
    this.currentLoad = null;
  };
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
