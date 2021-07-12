'use strict';

class BaseRobot {
  constructor(name, weight, position, chipVersion) {
    this.name = name;
    this.weight = weight;

    if (position.x === undefined || position.y === undefined) {
      this.coords = {
        x: 0,
        y: 0,
      };
    } else {
      this.coords = position;
    }
    this.chipVersion = chipVersion;
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
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}, `
    + `Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, position, chipVersion) {
    super(name, weight, position, chipVersion);

    if (position.z === undefined) {
      this.coords.z = 0;
    }
  }

  goDown(step = 1) {
    this.coords.z -= step;
  }

  goUp(step = 1) {
    this.coords.z += step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, position, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, position, chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(load) {
    if (this.currentLoad === null && load.weight <= this.maxLoadWeight) {
      this.currentLoad = load;
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
