'use strict';

class BaseRobot {
  constructor(
    name,
    weight,
    { x = 0, y = 0 },
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
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}, `
      + `Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(
    name,
    weight,
    { x = 0, y = 0, z = 0 },
    chipVersion
  ) {
    super(
      name,
      weight,
      {
        x,
        y,
        z,
      },
      chipVersion
    );

    this.coords.z = z;
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
    { x = 0, y = 0, z = 0 },
    chipVersion,
    maxLoadWeight,
    currentLoad
  ) {
    super(
      name,
      weight,
      {
        x,
        y,
        z,
      },
      chipVersion
    );

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
