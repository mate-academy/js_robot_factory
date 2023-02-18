'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    if (!coords.x) {
      this.coords = {
        x: 0, y: 0,
      };
    } else if (!coords.y) {
      this.coords = coords;
      this.coords.y = 0;
    } else {
      this.coords = coords;
    }
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
    // I wanted to do it in single line,
    // but linter wouldn't let me to do it via big length of line
    const name = `Robot: ${this.name}`;
    const chipVersion = `Chip version: ${this.chipVersion}`;
    const weight = `Weight: ${this.weight}`;

    return `${name}, ${chipVersion}, ${weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    if (!coords.z) {
      coords.z = 0;
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
  constructor(name, weight, coords, chipVersion,
    maxLoadWeight, currentLoad = null) {
    super(name, weight, coords, chipVersion, maxLoadWeight, currentLoad);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (!this.currentLoad
      && cargo.weight <= this.maxLoadWeight) {
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
