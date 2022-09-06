'use strict';

class BaseRobot {
  constructor(name, weight, position, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = {
      x: position.x || 0,
      y: position.y || 0,
    };
  }

  getInfo() {
    return `Robot: ${this.name}, `
     + `Chip version: ${this.chipVersion}, `
     + `Weight: ${this.weight}`;
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
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, position = {}, chipVersion) {
    super(name, weight, position, chipVersion);

    const { x = 0, y = 0, z = 0 } = position;

    this.coords = {
      x: x,
      y: y,
      z: z,
    };
  }

  goUp(step = 1) {
    this.coords.z += step;
  }

  goDown(step = 1) {
    this.coords.z -= step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(
    name, weight, position = {}, chipVersion,
    maxLoadWeight,
    currentLoad = null,
  ) {
    super(name, weight, position, chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo = null) {
    if (!this.currentLoad) {
      if (cargo.weight > this.maxLoadWeight) {
        this.currentLoad = null;

        return this.currentLoad;
      }
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
