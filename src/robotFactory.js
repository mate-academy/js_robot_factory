'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    const { x = 0, y = 0 } = coords;

    this.name = name;
    this.weight = weight;

    this.coords = {
      x: x,
      y: y,
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
    return 'Robot: ' + this.name + ', Chip version: ' + this.chipVersion
    + ', Weight: ' + this.weight;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    const { x = 0, y = 0, z = 0 } = coords;

    super(name, weight, chipVersion);

    this.coords = {
      x: x,
      y: y,
      z: z,
    };

    this.chipVersion = chipVersion;
  }

  goUp(step = 1) {
    this.coords.z += step;
  }

  goDown(step = 1) {
    this.coords.z -= step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (this.currentLoad + cargo.weight <= this.maxLoadWeight) {
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
