'use strict';

class BaseRobot {
  constructor(
    name,
    weight,
    coords = {
      x: 0,
      y: 0,
    },
    chipVersion
  ) {
    this.name = name;
    this.weight = weight;
    this.coords = coords;
    this.chipVersion = chipVersion;

    this.coords.x = this.coords.x || 0;
    this.coords.y = this.coords.y || 0;
  }

  goForward(step = 1) {
    this.coords.y += step;

    return this;
  }

  goBack(step = 1) {
    this.coords.y -= step;

    return this;
  }

  goRight(step = 1) {
    this.coords.x += step;

    return this;
  }

  goLeft(step = 1) {
    this.coords.x -= step;

    return this;
  }

  getInfo() {
    return (
      `Robot: ${this.name}, `
      + `Chip version: ${this.chipVersion}, `
      + `Weight: ${this.weight}`
    );
  }
}

class FlyingRobot extends BaseRobot {
  constructor(
    name,
    weight,
    coords = {
      x: 0,
      y: 0,
      z: 0,
    },
    chipVersion
  ) {
    super(
      name,
      weight,
      coords,
      chipVersion
    );

    this.coords.x = this.coords.x || 0;
    this.coords.y = this.coords.y || 0;
    this.coords.z = this.coords.z || 0;
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
    coords = {
      x: 0,
      y: 0,
    },
    chipVersion,
    maxLoadWeight,
    currentLoad = null,
  ) {
    super(
      name,
      weight,
      coords,
      chipVersion
    );

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (cargo.weight <= this.maxLoadWeight
      && this.currentLoad === null) {
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
