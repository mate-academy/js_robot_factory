'use strict';

class BaseRobot {
  constructor(name, weight, coords = {}, chipVersion) {
    // I didn't understand a little how to write it
    // use only one word in js class as written in checklist
    // I use it in another theme, but in js class don't work
    // maybe need some wrapper
    // so I wrote so

    this.name = name;
    this.weight = weight;
    this.coords = coords;
    this.coords.x = this.coords.x || 0;
    this.coords.y = this.coords.y || 0;
    this.chipVersion = chipVersion;
  }

  goForward(step = 1) {
    this.coords.y += step;

    return this;
  }

  goBack(step = 1) {
    this.coords.y -= step;

    return this;
  }

  goRight(step = 1) {
    this.coords.x += step;

    return this;
  }

  goLeft(step = 1) {
    this.coords.x -= step;

    return this;
  }

  getInfo() {
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}, Weight: ${this.weight}`; // eslint-disable-line
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords = {}, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords.z = this.coords.z || 0;
  }

  goUp(step = 1) {
    this.coords.z += step;

    return this;
  }

  goDown(step = 1) {
    this.coords.z -= step;

    return this;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords = {
    x: 0,
    y: 0,
    z: 0,
  }, chipVersion, maxLoadWeight, currentLoad = null) {
    super(name, weight, coords, chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
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
