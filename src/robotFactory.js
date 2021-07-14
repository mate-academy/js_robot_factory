'use strict';

class BaseRobot {
  constructor(name, weight, position, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;
    this.coords = position;

    if (!this.coords.x) {
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
  constructor(name, weight, position, chipVersion) {
    super(name, weight, position, chipVersion);

    this.coords.z = position.z || 0;
  }

  goUp(step = 1) {
    this.coords.z += step;
  }

  goDown(step = 1) {
    this.coords.z -= step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, position,
    chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, position, chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (!this.currentLoad && (cargo.weight <= this.maxLoadWeight)) {
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
