'use strict';

class BaseRobot {
  constructor(
    name,
    weight,
    coords,
    chipVersion
  ) {
    const defaultCoords = {
      ...coords,
    };

    if (coords.x) {
      defaultCoords.x = coords.x;
    } else {
      defaultCoords.x = 0;
    }

    if (coords.y) {
      defaultCoords.y = coords.y;
    } else {
      defaultCoords.y = 0;
    }

    this.coords = defaultCoords;
    this.name = name;
    this.weight = weight;
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
    return `Robot: ${this.name}, `
    + `Chip version: ${this.chipVersion}, `
    + `Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(
    name,
    weight,
    coords,
    chipVersion
  ) {
    const defaultCoords = {
      ...coords,
    };

    if (coords.z) {
      defaultCoords.z = coords.z;
    } else {
      defaultCoords.z = 0;
    }

    super(name, weight, defaultCoords, chipVersion);
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
      x: 0,
      y: 0,
      z: 0,
    },
    chipVersion,
    maxLoadWeight,
    currentLoad = null,
  ) {
    super(name, weight, coords, chipVersion);
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
