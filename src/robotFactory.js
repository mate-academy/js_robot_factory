'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = coords || {
      x: 0, y: 0,
    };
  }

  goForward(step = 1) {
    this.y += step;
  }
  goBack(step = 1) {
    this.y -= step;
  }
  goRight(step = 1) {
    this.x += step;
  }
  goLeft(step = 1) {
    this.x -= step;
  }
  getInfo() {
    return `Robot: ${this.name},`
      + `Chip version: ${this.chipVersion},`
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
