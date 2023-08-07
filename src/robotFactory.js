'use strict';

class BaseRobot {
  constructor(name, weight, coords = {}, chipVersion) {
    const { x = 0, y = 0 } = coords;

    this.name = name;
    this.weight = weight;

    this.coords = {
      x,
      y,
    };
    this.chipVersion = chipVersion;
  }

  goForward(step = 1) {
    if (step > 0) {
      this.coords.y += step;
    }
  }
  goBack(step = 1) {
    if (step > 0) {
      this.coords.y -= step;
    }
  }
  goRight(step = 1) {
    if (step > 0) {
      this.coords.x += step;
    }
  }
  goLeft(step = 1) {
    if (step > 0) {
      this.coords.x -= step;
    }
  }
  getInfo() {
    const robotNameString = `Robot: ${this.name}`;
    const chipVersionString = `Chip version: ${this.chipVersion}`;
    const weightString = `Weight: ${this.weight}`;

    return `${robotNameString}, ${chipVersionString}, ${weightString}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords = {}, chipVersion) {
    super(name, weight, coords, chipVersion);

    const { z = 0 } = coords;

    this.coords.z = z;
  }

  goUp(step = 1) {
    if (step > 0) {
      this.coords.z += step;
    }
  }
  goDown(step = 1) {
    if (step > 0) {
      this.coords.z -= step;
    }
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(
    name,
    weight,
    coords = {},
    chipVersion,
    maxLoadWeight,
    currentLoad
  ) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad || null;
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
