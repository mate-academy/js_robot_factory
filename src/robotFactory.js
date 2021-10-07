'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = {
      x: x || 0,
      y: y || 0,
    };
  }

    for (const coord in coords) {
      if (coords[coord] === undefined) {
        result[coord] = 0;
      }

      result[coord] = coords[coord];
    }

    return result;
  }

  getInfo() {
    return (`Robot: ${this.name}, `
      + `Chip version: ${this.chipVersion}, `
      + `Weight: ${this.weight}`);
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
}

class FlyingRobot extends BaseRobot {
  constructor(...args) {
    super(...args);
    
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
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (this.currentLoad || cargo.weight > this.maxLoadWeight) {
      return;
    }

    this.currentLoad = cargo;
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
