'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.coords = coords;
    this.chipVersion = chipVersion;
  }

  goForward(step = 0) {
    this.coords.y += step;
  };

  goBack(step = 0) {
    this.coords.y -= step;
  };

  goLeft(step = 0) {
    this.coords.x -= step;
  };

  goRight(step = 0) {
    this.coords.x += step;
  };

  getInfo() {
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  }
}

class FlyingRobot {}

class DeliveryDrone {}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
