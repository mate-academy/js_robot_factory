'use strict';

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
    return `Robot: ${this.name},`
    + ` Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);
    this.coords.z = coords.z || 0;
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
  constructor(name,
    weight,
    coords,
    chipVersion,
    maxLoadWeight,
    currentLoad = null) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cardo) {
    if (this.currentLoad === null && cardo.weight <= this.maxLoadWeight) {
      this.currentLoad = cardo;
    }

    return this;
  }

  unhookLoad() {
    this.currentLoad = null;

    return this;
  }
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
