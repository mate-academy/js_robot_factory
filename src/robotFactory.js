'use strict';

class BaseRobot {
  constructor(name, weight, coords = {
    x: 0,
    y: 0,
  }, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: coords.x || 0,
      y: coords.y || 0,
    };
    this.chipVersion = chipVersion;
  }

  goRight(step = 1) {
    this.coords.x += step;
  }

  goLeft(step = 1) {
    this.coords.x -= step;
  }

  goForward(step = 1) {
    this.coords.y += step;
  }

  goBack(step = 1) {
    this.coords.y -= step;
  }

  getInfo() {
    return 'Robot: ' + this.name + ', Chip version: '
      + this.chipVersion + ', Weight: ' + this.weight;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, {
    x = 0,
    y = 0,
    z = 0,
  }, chipVersion) {
    super(name, weight, {
      x,
      y,
      z,
    }, chipVersion);
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
  constructor(name, coords = {
    x: 0, y: 0, z: 0,
  }, chipversion, weight, maxLoadWeight, currentLoad = null) {
    super(name, coords, chipversion, weight);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (this.currentLoad === null) {
      this.currentLoad = cargo.weight <= this.maxLoadWeight ? cargo : null;
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
