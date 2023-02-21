'use strict';

class BaseRobot {
  constructor(name, weight, coords, chip) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chip;

    this.coords = {
      x: coords.x || 0,
      y: coords.y || 0,
    };
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
    return `Robot: ${
      this.name
    }, Chip version: ${
      this.chipVersion
    }, Weight: ${
      this.weight
    }`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chip) {
    super(name, weight, coords, chip);

    this.coords.z = coords.z || 0;
  }

  goUp(step = 1) {
    this.coords.z += step;
  }
  goDown(step = 1) {
    this.coords.z -= step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chip, maxLoad, currentLoad) {
    super(name, weight, coords, chip);

    this.maxLoadWeight = maxLoad;
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
