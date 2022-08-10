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

  move(axis = '', step = 1, positive = true) {
    if (!axis || !this.coords.hasOwnProperty(axis)) {
      throw new Error(`Robot doesn't recognize axis "${axis}"`);
    }

    if (step <= 0) {
      throw new Error(`Step needs to be > 0`);
    }

    this.coords[axis] += positive ? step : -step;
  }

  goForward(step) {
    this.move('y', step);
  }

  goBack(step) {
    this.move('y', step, false);
  }

  goRight(step) {
    this.move('x', step);
  }

  goLeft(step) {
    this.move('x', step, false);
  }

  getInfo() {
    return `Robot: ${this.name}, `
      + `Chip version: ${this.chipVersion}, `
      + `Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords.z = coords.z || 0;
  }

  goUp(step = 1) {
    this.move('z', step);
  }

  goDown(step = 1) {
    this.move('z', step, false);
  }
}

class DeliveryDrone {}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
