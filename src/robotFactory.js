'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = {
      x: coords.x || 0,
      y: coords.y || 0,
    };
  };

  goForward(step = 1) {
    this.coords.y += step;
  }

  goLeft(step = 1) {
    this.coords.x -= step;
  }

  goBack(step = 1) {
    this.coords.y -= step;
  }

  goRight(step = 1) {
    this.coords.x += step;
  }

  getInfo() {
    return `Robot: ${
      this.name}, Chip version: ${
      this.chipVersion}, Weight: ${
      this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords = {
      x: coords.x || 0,
      y: coords.y || 0,
      z: coords.z || 0,
    };
  }
  goForward() {
    super.goForward();
  }
  goLeft() {
    super.goLeft();
  }
  goBack() {
    super.goBack();
  }
  goRight() {
    super.goRight();
  }

  goUp(step = 1) {
    this.coords.z += step;
  }

  goDown(step = 1) {
    this.coords.z -= step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords = 0,
    chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;

    if (!currentLoad) {
      this.currentLoad = null;
    }
  }

  goForward() {
    super.goForward();
  }

  goLeft() {
    super.goLeft();
  }

  goBack() {
    super.goBack();
  }

  goRight() {
    super.goRight();
  }

  goUp(step) {
    super.goUp();
  }

  goDown(step) {
    super.goDown();
  };

  hookLoad(cargo) {
    if (this.currentLoad) {
      return this.currentLoad;
    } else
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
