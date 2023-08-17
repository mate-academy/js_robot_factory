'use strict';

const DEFAULT_VALUE_FOR_STEP = 1;
const DEFAULT_VALUE_FOR_COORD = 0;

class BaseRobot {
  constructor(name,
    weight,
    { x = DEFAULT_VALUE_FOR_COORD, y = DEFAULT_VALUE_FOR_COORD },
    chipVersion
  ) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: x,
      y: y,
    };

    this.chipVersion = chipVersion;
  }

  goForward(step = DEFAULT_VALUE_FOR_STEP) {
    this.coords.y += step;
  }

  goBack(step = DEFAULT_VALUE_FOR_STEP) {
    this.coords.y -= step;
  }

  goLeft(step = DEFAULT_VALUE_FOR_STEP) {
    this.coords.x -= step;
  }

  goRight(step = DEFAULT_VALUE_FOR_STEP) {
    this.coords.x += step;
  }

  getInfo() {
    return `Robot: ${this.name},`
    + ` Chip version: ${this.chipVersion},`
    + ` Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(
    name,
    weight,
    { z = DEFAULT_VALUE_FOR_COORD, ...xAndYCoords },
    chipVersion
  ) {
    super(name, weight, xAndYCoords, chipVersion);
    this.coords.z = z;
  }

  goUp(step = DEFAULT_VALUE_FOR_STEP) {
    this.coords.z += step;
  }

  goDown(step = DEFAULT_VALUE_FOR_STEP) {
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
    currentLoad = null,
  ) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (cargo.weight > this.maxLoadWeight || this.currentLoad !== null) {
      return;
    }

    this.currentLoad = cargo;
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
