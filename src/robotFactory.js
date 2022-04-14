'use strict';

class BaseRobot {
  constructor(
    name,
    weight,
    coords,
    chipVersion,
  ) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    if (coords.x || coords.y) {
      this.coords = coords;
    } else {
      this.coords = {
        x: 0,
        y: 0,
      };
    }
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
    const name = `Robot: ${this.name}`;
    const version = `Chip version: ${this.chipVersion}`;
    const weight = `Weight: ${this.weight}`;

    return `${name}, ${version}, ${weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(
    name,
    weight,
    coords,
    chipVersion,
  ) {
    super(
      name,
      weight,
      coords,
      chipVersion,
    );

    if (coords.z) {
      this.coords.z = coords.z;
    } else {
      this.coords.z = 0;
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
    coords,
    chipVersion,
    maxLoadWeight,
    currentLoad = null,
  ) {
    super(
      name,
      weight,
      coords,
      chipVersion,
    );

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (this.currentLoad !== null) {
      return;
    }

    if (cargo.weight <= this.maxLoadWeight) {
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
