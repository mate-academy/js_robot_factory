/* eslint-disable max-len */
'use strict';

// **DeliveryDrone**
// - inherits all the methods from `FlyingRobot` and calls its constructor
// - in addition to `FlyingRobot`'s args it takes `maxLoadWeight` and `currentLoad`
//   and saves them.
// - `currentLoad` should be set to `null` if not passed
// - has `hookLoad` method taking a `cargo` object and saving it to a `currentLoad`
//   property if it is empty and the `cargo.weight` is not greater than the
//   `maxLoadWeight` of the drone.
// - if the drone already has `currentLoad` do not change it
// - has `unhookLoad` method, that `currentLoad` property to `null`

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
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
    return `Robot: ${this.name}, `
    + `Chip version: ${this.chipVersion}, `
    + `Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);
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
  }
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
