'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = {
      x: coords.x || 0,
      y: coords.y || 0,
    };
  }

  goForward(step = 1) {
    if (step > 0) {
      this.coords.y += step;
    }
  }

  goBack(step = 1) {
    if (step > 0) {
      this.coords.y -= step;
    }
  }

  goRight(step = 1) {
    if (step > 0) {
      this.coords.x += step;
    }
  }

  goLeft(step = 1) {
    if (step > 0) {
      this.coords.x -= step;
    }
  }

  getInfo() {
    return `Robot: ${this.name}, `
      + `Chip version: ${this.chipVersion}, `
      + `Weight: ${this.weight}`;
  }
}

class FlyingRobot {}

class DeliveryDrone {}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
