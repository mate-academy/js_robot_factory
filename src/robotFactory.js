'use strict';

class BaseRobot {
  constructor(
    name,
    weight,
    {
      x = 0,
      y = 0,
    },
    chipVersion
  ) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x,
      y,
    };
    this.chipVersion = chipVersion;
  }
  goForward(value = 1) {
    this.coords.y += value;
  }

  goBack(value = 1) {
    this.coords.y -= value;
  }

  goLeft(value = 1) {
    this.coords.x -= value;
  }
  goRight(value = 1) {
    this.coords.x += value;
  }

  getInfo() {
    return `Robot: ${this.name}, `
      + `Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(
    name,
    weight,
    {
      x = 0,
      y = 0,
      z = 0,
    },
    chipVersion,
  ) {
    super(
      name,
      weight,
      {
        x, y,
      },
      chipVersion);

    this.coords = {
      x,
      y,
      z,
    };
  }

  goUp(value = 1) {
    this.coords.z += value;
  }
  goDown(value = 1) {
    this.coords.z -= value;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(
    name,
    weight,
    {
      x = 0,
      y = 0,
      z = 0,
    },
    chipVersion,
    maxLoadWeight,
    currentLoad = null,
  ) {
    super(
      name,
      weight,
      {
        x,
        y,
        z,
      },
      chipVersion);
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
