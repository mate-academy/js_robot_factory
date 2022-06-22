'use strict';

class BaseRobot {
  constructor(name, weight, coords = {}, chipVersion) {
    const defaultCoords = {
      x: 0,
      y: 0,
    };

    const robotCoords = Object.keys(coords).length !== 2
      ? defaultCoords
      : coords;

    this.name = name;
    this.weight = weight;
    this.coords = robotCoords;
    this.chipVersion = chipVersion;
  }

  goForward(step = 1) {
    this.coords.y += step;
  }

  goBack(step = 1) {
    this.coords.y -= step;
  }

  goLeft(step = 1) {
    this.coords.x -= step;
  }

  goRight(step = 1) {
    this.coords.x += step;
  }

  getInfo() {
    return `Robot: ${this.name}, `
          + `Chip version: ${this.chipVersion}, `
          + `Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords = {}, chipVersion) {
    super(name, weight, coords, chipVersion);

    const defaultCoords = {
      x: 0,
      y: 0,
      z: 0,
    };

    const robotCoords = Object.keys(coords).length !== 3
      ? defaultCoords
      : coords;

    this.coords = robotCoords;
  }

  goUp(step = 1) {
    this.coords.z += step;
  }

  goDown(step = 1) {
    this.coords.z -= step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name,
    weight,
    coords = {},
    chipVersion,
    maxLoadWeight,
    currentLoad) {
    super(name, weight, coords, chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if ((this.currentLoad === null)
      && (cargo.weight <= this.maxLoadWeight)) {
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
