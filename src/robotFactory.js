'use strict';
class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.coords = coords;
    this.chipVersion = chipVersion;

    this.coords = {
      x: coords.x || 0,
      y: coords.y || 0,
    };
  }

  goBack(step = 1) {
    this.coords.y -= step;
  }

  goLeft(step = 1) {
    this.coords.x -= step;
  }

  goForward(step = 1) {
    this.coords.y += step;
  }

  goRight(step = 1) {
    this.coords.x += step;
  }

  getInfo() {
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}, `
     + `Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords.z = coords.z || 0;
  }

  goDown(step = 1) {
    this.coords.z -= step;
  };

  goUp(step = 1) {
    this.coords.z += step;
  };
}

class DeliveryDrone extends FlyingRobot {
  constructor(
    name,
    weight,
    coords,
    chipVersion,
    maxLoadWeight,
    currentLoad = null
  ) {
    super(name, weight, coords, chipVersion);
    this.currentLoad = currentLoad;
    this.maxLoadWeight = maxLoadWeight;
  }

  unhookLoad() {
    this.currentLoad = null;
  }

  hookLoad(cargo) {
    if (!this.currentLoad
      && cargo.weight <= this.maxLoadWeight) {
      this.currentLoad = cargo;
    }
  };
};

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
