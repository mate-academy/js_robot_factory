'use strict';

class BaseRobot {
  constructor(name, weight, coords = 0, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: coords.x || 0,
      y: coords.y || 0,
    };

    this.chipVersion = chipVersion;
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
    return 'Robot: ' + this.name + ', Chip version: '
    + this.chipVersion + ', Weight: ' + this.weight;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords = {
      x: coords.x,
      y: coords.y,
      z: coords.z || 0,
    };
  }

  goForward(step = 1) {
    super.goForward();
    this.coords.y += step;
  }

  goBack(step = 1) {
    super.goBack();
    this.coords.y -= step;
  }

  goRight(step = 1) {
    super.goRight();
    this.coords.x += step;
  }

  goLeft(step = 1) {
    super.goLeft();
    this.coords.x -= step;
  }

  goUp(step = 1) {
    this.coords.z += step;
  }

  goDown(step = 1) {
    this.coords.z -= step;
  }

  getInfo() {
    super.getInfo();

    return 'Robot: ' + this.name + ', Chip version: '
    + this.chipVersion + ', Weight: ' + this.weight;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);

    this.maxLoadWeight = maxLoadWeight;

    this.currentLoad = currentLoad || null;
  }

  hookLoad(cargo) {
    if (this.currentLoad === null && cargo.weight <= this.maxLoadWeight) {
      this.currentLoad = cargo;
    }
  }

  unhookLoad() {
    this.currentLoad = null;
  };
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
