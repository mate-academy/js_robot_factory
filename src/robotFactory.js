'use strict';

class BaseRobot {
  constructor(name, weight, positon, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: positon.x || 0,
      y: positon.y || 0,
    };
    this.chipVersion = chipVersion;
  }

  goForward(step) {
    this.coords.y += step || 1;
  }

  goBack(step) {
    this.coords.y -= step || 1;
  }

  goLeft(step) {
    this.coords.x -= step || 1;
  }

  goRight(step) {
    this.coords.x += step || 1;
  }

  getInfo() {
    return `Robot: ${
      this.name}, Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, positon, chipVersion) {
    super(name, weight, positon, chipVersion);
    this.coords.z = positon.z || 0;
  }

  goUp(step) {
    this.coords.z += step || 1;
  }

  goDown(step) {
    this.coords.z -= step || 1;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, positon, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, positon, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad || null;
  }

  hookLoad(cargo) {
    if (!this.currentLoad && cargo.weight <= this.maxLoadWeight) {
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
