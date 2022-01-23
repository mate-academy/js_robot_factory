'use strict';

const coordsDef = {
  x: 0, y: 0,
};

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;
    this.coords = Object.keys(coords).length === 2 ? coords : coordsDef;
  }

  goForward(a = 1) {
    this.coords.y += a;
  }

  goBack(a = 1) {
    this.coords.y -= a;
  }

  goLeft(a = 1) {
    this.coords.x -= a;
  }

  goRight(a = 1) {
    this.coords.x += a;
  }

  getInfo() {
    return 'Robot: ' + this.name + ', Chip version: '
      + this.chipVersion + ', Weight: ' + this.weight;
  }
}

const coordsDefFly = {
  x: 0, y: 0, z: 0,
};

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);
    this.coords = Object.keys(coords).length === 3 ? coords : coordsDefFly;
  }

  goUp(a = 1) {
    this.coords.z += a;
  }

  goDown(a = 1) {
    this.coords.z -= a;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion,
    maxLoadWeight, currentLoad = null) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (cargo.weight <= this.maxLoadWeight && this.currentLoad === null) {
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

/**
 *
DeliveryDrone**
weight: number
description: string

- inherits all the methods from `FlyingRobot` and calls its constructor
- in addition to `FlyingRobot`'s args it takes `maxLoadWeight` and `currentLoad`
  and saves them.
- has `hookLoad` method taking a `cargo` object and saving it to a `currentLoad`
  property if it is empty and the `cargo.weight` is not greater than the
  `maxLoadWeight` of the drone.
- if the drone already has `currentLoad` do not change it
- has `unhookLoad` method, that `currentLoad` property to `null``
 */
