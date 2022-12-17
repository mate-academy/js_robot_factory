'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = coords;

    if (coords.x === undefined) {
      this.coords.x = 0;
    }

    if (coords.y === undefined) {
      this.coords.y = 0;
    }
  }

  getInfo() {
    const name = this.name;
    const chipVersion = this.chipVersion;
    const weight = this.weight;

    return `Robot: ${name}, Chip version: ${chipVersion}, Weight: ${weight}`;
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
  constructor(
    name,
    weight,
    coords = {
      x: 0,
      y: 0,
    },
    chipVersion
  ) {
    super(name, weight, coords, chipVersion);

    if (coords.z === undefined) {
      this.coords.z = 0;
    } else {
      this.coords.z = coords.z;
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
  constructor(
    name,
    weight,
    coords = {
      x: 0,
      y: 0,
    },
    chipVersion,
    maxLoadWeight,
    currentLoad = null
  ) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    const isCurrentLoadEmpty = this.currentLoad === null;
    const isCargoLessThanMaxLoad = cargo.weight <= this.maxLoadWeight;

    if (isCurrentLoadEmpty && isCargoLessThanMaxLoad) {
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
