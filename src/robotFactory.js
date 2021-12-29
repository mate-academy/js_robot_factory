'use strict';

class BaseRobot {
  constructor(name, weight, position, chipVersion) {
    const { x = 0, y = 0 } = position;

    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = {
      x,
      y,
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
    const robot = `Robot: ${this.name}`;
    const chip = `Chip version: ${this.chipVersion}`;
    const w = `Weight: ${this.weight}`;

    return `${robot}, ${chip}, ${w}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, position, chipVersion) {
    super(name, weight, position, chipVersion);

    const { z = 0 } = position;

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
    position,
    chipVersion,
    maxLoadWeight,
    currentLoad) {
    super(name, weight, position, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (this.currentLoad === null
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
