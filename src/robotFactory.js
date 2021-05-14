'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    const { x = 0, y = 0 } = coords;

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
    return `Robot: ${this.name}, Chip version: `
      + `${this.chipVersion}, Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    const { z = 0 } = coords;

    this.coords = {
      ...coords,
      z,
    };
  }

  goUp(step = 1) {
    this.coords.z += step;
  }

  goDown(step = 1) {
    this.coords.z -= step;
  }

  goForward(step = 1) {
    super.goForward();
  }

  goBack(step = 1) {
    super.goBack();
  }

  goRight(step = 1) {
    super.goRight();
  }

  goLeft(step = 1) {
    super.goLeft();
  }

  getInfo() {
    super.getInfo();
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion,
    maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);

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

  goUp(step = 1) {
    super.goUp();
  }

  goDown(step = 1) {
    super.goDown();
  }

  goForward(step = 1) {
    super.goForward();
  }

  goBack(step = 1) {
    super.goBack();
  }

  goRight(step = 1) {
    super.goRight();
  }

  goLeft(step = 1) {
    super.goLeft();
  }

  getInfo() {
    super.getInfo();
  }
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
