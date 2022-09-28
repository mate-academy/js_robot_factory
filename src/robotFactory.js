'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;

    if (Object.keys(coords).length < 2) {
      const axises = ['x', 'y'];

      for (const axis of axises) {
        if (!coords[axis]) {
          coords[axis] = 0;
        }
      }
    }

    this.coords = coords;
    this.chipVersion = chipVersion;
  }

  getInfo() {
    return `Robot: ${this.name}, Chip version: ${
      this.chipVersion}, Weight: ${this.weight}`;
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
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    if (Object.keys(coords).length < 3) {
      const axises = ['x', 'y', 'z'];

      for (const axis of axises) {
        if (!coords[axis]) {
          coords[axis] = 0;
        }
      }
    }

    this.coords = coords;
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
    coords,
    chipVersion,
    maxLoadWeight,
    currentLoad) {
    super(name, weight, coords, chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad || null;
  }

  hookLoad(cargo) {
    if (!this.currentLoad && cargo.weight <= this.maxLoadWeight) {
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
