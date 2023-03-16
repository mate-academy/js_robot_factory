'use strict';

class BaseRobot {
  constructor(name, weight, coords = {}, chipVersion = null) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = Object.assign({
      x: 0,
      y: 0,
    }, coords);
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
    return 'Robot: ' + this.name
      + ', Chip version: ' + this.chipVersion
      + ', Weight: ' + this.weight;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords = {}, chipVersion = null) {
    const localCoords = Object.assign({
      x: 0,
      y: 0,
      z: 0,
    }, coords);

    super(name, weight, localCoords, chipVersion);
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
    coords = {},
    chipVersion = null,
    maxLoadWeight = 0,
    currentLoad = null
  ) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo = null) {
    if (
      cargo !== null
      && this.currentLoad === null
      && cargo.weight <= this.maxLoadWeight
    ) {
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
