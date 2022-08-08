'use strict';

class BaseRobot {
  constructor(...args) {
    this.name = args[0];

    this.weight = args[1];

    this.coords = {
      x: args[2].x || 0,
      y: args[2].y || 0,
    };

    this.chipVersion = args[3];
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
    return (`Robot: ${this.name}, Chip version: ${
      this.chipVersion}, Weight: ${this.weight}`);
  }
}

class FlyingRobot extends BaseRobot {
  constructor(...args) {
    super(...args);

    this.coords.z = args[2].z || 0;
  }

  goUp(step = 1) {
    this.coords.z += step;
  }

  goDown(step = 1) {
    this.coords.z -= step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(...args) {
    super(...args);

    this.maxLoadWeight = args[4];

    this.currentLoad = args[5] || null;
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
