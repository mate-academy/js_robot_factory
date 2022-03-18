'use strict';

class BaseRobot {
  constructor(name, weight, location, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: location.x || 0,
      y: location.y || 0,
    };
    this.chipVersion = chipVersion;
  };
  goForward(step = 1) {
    this.coords.y += step;
  };
  goBack(step = 1) {
    this.coords.y -= step;
  };
  goRight(step = 1) {
    this.coords.x += step;
  };
  goLeft(step = 1) {
    this.coords.x -= step;
  };
  getInfo() {
    return `Robot: ${this.name}`
    + `, Chip version: ${this.chipVersion}`
    + `, Weight: ${this.weight}`;
  };
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, location, chipVersion) {
    super(name, weight, location, chipVersion);
    this.coords.z = location.z || 0;
  };
  goUp(step = 1) {
    this.coords.z += step;
  };
  goDown(step = 1) {
    this.coords.z -= step;
  };
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, location, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, location, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  };
  hookLoad(cargo) {
    if (this.currentLoad === null) {
      if (cargo.weight === 0 || cargo.weight <= this.maxLoadWeight) {
        this.currentLoad = cargo;
      };
    };
  };
  unhookLoad() {
    this.currentLoad = null;
  };
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
