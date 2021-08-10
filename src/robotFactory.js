'use strict';

class BaseRobot {
  constructor(name, weight, { x = 0, y = 0 }, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = {
      x: x,
      y: y,
    };
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
    return (
      `Robot: ${this.name}, `
      + `Chip version: ${this.chipVersion}, `
      + `Weight: ${this.weight}`
    );
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, { x = 0, y = 0, z = 0 }, chipVersion) {
    super(
      name,
      weight,
      {
        x,
        y,
      },
      chipVersion
    );
    this.coords.z = z;
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
    { x = 0, y = 0, z = 0 },
    chipVersion,
    maxLoadWeight,
    cargo
  ) {
    super(
      name,
      weight,
      {
        x,
        y,
      },
      chipVersion
    );
    this.maxLoadWeight = maxLoadWeight;

    if (cargo === null) {
      this.currentLoad = null;
    } else {
      this.currentLoad = {
        weight: cargo.weight,
        description: cargo.description,
      };
    }
  }
  hookLoad(cargo) {
    const { weight, description } = cargo;

    if (this.currentLoad === null && weight <= this.maxLoadWeight) {
      this.currentLoad = {
        weight: weight,
        description: description,
      };
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
