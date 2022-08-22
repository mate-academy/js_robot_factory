'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: coords.x || 0,
      y: coords.y || 0,
    };
    this.chipVersion = chipVersion || 0;
  }
  goForward(step = 1) {
    this.coords.y += step;
  }
  goBack(step = 1) {
    this.coords.y -= step;
  }
  goLeft(step = 1) {
    this.coords.x -= step;
  }
  goRight(step = 1) {
    this.coords.x += step;
  }
  getInfo() {
    const a = `Robot: ${this.name}, Chip version: `;
    const b = `${this.chipVersion}, Weight: ${this.weight}`;

    return a + b;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, chipVersion, coords);
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
    super(name, weight, chipVersion, coords);
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
