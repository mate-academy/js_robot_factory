'use strict';

class BaseRobot {
  constructor(name, weight, coords = {}, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;
    this.coords = coords;
    this.coords.x = coords.x === undefined ? 0 : coords.x;
    this.coords.y = coords.y === undefined ? 0 : coords.y;
  };
  goForward(step = 1) {
    this.coords.y += step;
  };

  goBack(step = 1) {
    this.coords.y -= step;
  };

  goLeft(step = 1) {
    this.coords.x -= step;
  };

  goRight(step = 1) {
    this.coords.x += step;
  };
  getInfo() {
    // eslint-disable-next-line max-len
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  };
}

class FlyingRobot {}

class DeliveryDrone {}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
