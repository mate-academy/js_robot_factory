'use strict';

class BaseRobot {
  constructor(
    name,
    weight,
    coords = {
      x: 0, y: 0,
    },
    chipVersion
  ) {
    this.name = name;
    this.weight = weight;

    if (coords.x === undefined) {
      coords.x = 0;
    }

    if (coords.y === undefined) {
      coords.y = 0;
    }
    this.coords = coords;
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
    return (
      `Robot: ${this.name},`
      + ` Chip version: ${this.chipVersion},`
      + ` Weight: ${this.weight}`
    );
  }
}

class FlyingRobot extends BaseRobot {
  constructor(
    name,
    weight,
    coords,
    chipVersion
  ) {
    super(name, weight, coords, chipVersion);

    this.coords.z = coords.z || 0;
  }

  goUp(steps = 1) {
    this.coords.z += steps;
  }
  goDown(steps = 1) {
    this.coords.z -= steps;
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
    if (this.currentLoad === null && this.maxLoadWeight >= cargo.weight) {
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
