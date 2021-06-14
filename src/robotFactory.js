'use strict';

class BaseRobot {
  constructor(
    name,
    weight,
    coords,
    chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: coords.x ? coords.x : 0,
      y: coords.x ? coords.y : 0,
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

    return (
      `Robot: ${name}, Chip version: ${chip}, Weight: ${weight}`
    );
  }
}

class FlyingRobot extends BaseRobot {
  constructor(
    name,
    weight,
    coords = {
      x: 0, y: 0,
    },
    chipVersion) {
    super(
      name,
      weight,
      coords,
      chipVersion);
    this.coords.z = coords.z ? coords.z : 0;
  }

  goUp(step = 1) {
    this.coords.z += step;
  }

  goDown(step = 1) {
    this.coords.z -= step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(
    name,
    weight,
    coords = {
      x: 0, y: 0,
    },
    chipVersion,
    maxLoadWeight,
    currentLoad) {
    super(
      name,
      weight,
      coords,
      chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (!this.currentLoad && this.maxLoadWeight >= cargo.weight) {
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
