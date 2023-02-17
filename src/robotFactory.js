'use strict';

class BaseRobot {
  constructor(name, weight, position, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = {
      ...{
        x: 0, y: 0,
      },
      ...position,
    };
  }

  getInfo() {
    return `Robot: ${this.name}, `
      + `Chip version: ${this.chipVersion}, `
      + `Weight: ${this.weight}`;
  }

  goForward(move = 1) {
    this.coords.y += move;
  }

  goBack(move = 1) {
    this.coords.y += -move;
  }

  goRight(move = 1) {
    this.coords.x += move;
  }

  goLeft(move = 1) {
    this.coords.x += -move;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, position, chipVersion) {
    super(name, weight, position, chipVersion);

    this.coords = {
      ...{
        x: 0, y: 0, z: 0,
      },
      ...position,
    };
  }

  goUp(move = 1) {
    this.coords.z += move;
  }

  goDown(move = 1) {
    this.coords.z += -move;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, position, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, position, chipVersion);
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
