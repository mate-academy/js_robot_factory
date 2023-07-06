'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;

    const { x = 0, y = 0 } = coords || {};

    this.coords = {
      x, y,
    };
    this.chipVersion = chipVersion;
  }

  goForward(step = 1) {
    this.coords.y += step;

    return this;
  }
  goBack(step = 1) {
    this.coords.y -= step;

    return this;
  }
  goLeft(step = 1) {
    this.coords.x -= step;

    return this;
  }
  goRight(step = 1) {
    this.coords.x += step;

    return this;
  }
  getInfo() {
    return (
      'Robot: ' + this.name + ', Chip version: '
      + this.chipVersion + ', Weight: ' + this.weight
    );
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    const { z = 0 } = coords || {};

    this.coords = {
      ...this.coords, z,
    };
  }
  goUp(step = 1) {
    this.coords.z += step;

    return this;
  }
  goDown(step = 1) {
    this.coords.z -= step;

    return this;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(
    name,
    weight,
    coords,
    chipVersion,
    maxLoadWeight,
    currentLoad = null
  ) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }
  hookLoad(cargo) {
    if (cargo.weight <= this.maxLoadWeight && !this.currentLoad) {
      this.currentLoad = cargo;
    }

    return this;
  }
  unhookLoad() {
    this.currentLoad = null;

    return this;
  }
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
