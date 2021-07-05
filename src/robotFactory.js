'use strict';

class BaseRobot {
  constructor(
    name,
    weight,
    { x = 0, y = 0 },
    chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x,
      y,
    };
    // this.coords.x = this.coords.x === undefined ? 0 : this.coords.x;
    // this.coords.y = this.coords.y === undefined ? 0 : this.coords.y;
    this.chipVersion = chipVersion;
  }

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
    return `Robot: ${this.name}, `
+ `Chip version: ${this.chipVersion}, `
+ `Weight: ${this.weight}`;
  };
}

class FlyingRobot extends BaseRobot {
  constructor(
    name,
    weight,
    { x = 0, y = 0, z = 0 },
    chipVersion) {
    super(name, weight, {
      x, y,
    }, chipVersion);

    this.coords = {
      x,
      y,
      z,
    };
  }

  goUp(step = 1) {
    this.coords.z += step;
  };

  goDown(step = 1) {
    this.coords.z -= step;
  };
}

class DeliveryDrone extends FlyingRobot {
  constructor(
    name,
    weight,
    coords,
    chipVersion,
    maxLoadWeight,
    currentLoad = null) {
    super(
      name,
      weight,
      coords,
      chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    this.currentLoad
      = (this.currentLoad === null && cargo.weight <= this.maxLoadWeight)
        ? cargo
        : this.currentLoad;
  };

  unhookLoad() {
    this.currentLoad = null;
  }
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
