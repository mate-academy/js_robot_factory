'use strict';

class BaseRobot {
  // eslint-disable-next-line object-curly-newline
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.chipVersion = chipVersion;

    this.coords = {
      x: coords.x || 0,
      y: coords.y || 0,
    };
    this.weight = weight;
  }

  goLeft(step = 1) {
    this.coords.x -= step;

    return this;
  }

  goRight(step = 1) {
    this.coords.x += step;

    return this;
  }

  goForward(step = 1) {
    this.coords.y += step;

    return this;
  }

  goBack(step = 1) {
    this.coords.y -= step;

    return this;
  }

  getInfo() {
    return 'Robot: ' + this.name
    + ', Chip version: ' + this.chipVersion
    + ', Weight: ' + this.weight;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name,
    chipVersion,
    coords = {
      x: 0, y: 0, z: 0,
    },
    weight) {
    super(name, chipVersion, coords, weight);
    this.coords.z = coords.z || 0;
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
  constructor(name,
    chipVersion,
    coords = {
      x: 0, y: 0, z: 0,
    },
    weight,
    maxLoadWeight,
    currentLoad = null) {
    super(name, chipVersion, coords, weight);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (!this.currentLoad && cargo.weight <= this.maxLoadWeight) {
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
