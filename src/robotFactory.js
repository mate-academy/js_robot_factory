'use strict';

class BaseRobot {
  constructor(name, weight, coords = {
    x: 0, y: 0,
  }, chipVersion) {
    if (coords.x !== undefined && coords.y === undefined) {
      coords.y = 0;
    } else if (coords.y !== undefined && coords.x === undefined) {
      coords.x = 0;
    }

    Object.assign(this, {
      name, weight, coords, chipVersion,
    });
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

  getInfo() {
    // eslint-disable-next-line max-len
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords = {
    x: 0, y: 0, z: 0,
  }, chipVersion) {
    super(name, weight, coords, chipVersion);
  }

  goUp(step = 1) {
    this.coords.z += step;
  }

  goDown(step = 1) {
    this.coords.z -= step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords = {
    x: 0, y: 0, z: 0,
  }, chipVersion, maxLoadWeight, currentLoad = null) {
    super(name, weight, coords, chipVersion);

    Object.assign(this, {
      maxLoadWeight, currentLoad,
    });
  }

  hookLoad(cargo) {
    if (!this.currentLoad && cargo.weight <= this.maxLoadWeight) {
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
