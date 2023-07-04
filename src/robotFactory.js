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

    this.coords = {
      x: coords.x || 0,
      y: coords.y || 0,
    };
    this.chipVersion = chipVersion;
  }

  getInfo() {
    const name = `Robot: ${this.name}`;
    const version = `Chip version: ${this.chipVersion}`;
    const weight = `Weight: ${this.weight}`;

    return `${name}, ${version}, ${weight}`;
  }

  goForward(y = 1) {
    this.coords.y += y;
  }

  goBack(y = 1) {
    this.coords.y -= y;
  }

  goRight(x = 1) {
    this.coords.x += x;
  }

  goLeft(x = 1) {
    this.coords.x -= x;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name,
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

    this.coords = {
      x: coords.x || 0,
      y: coords.y || 0,
      z: coords.z || 0,
    };
  }

  goUp(z = 1) {
    this.coords.z += z;
  }

  goDown(z = 1) {
    this.coords.z -= z;
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
