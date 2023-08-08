'use strict';

class BaseRobot {
  constructor(name, weight, {
    x = 0,
    y = 0,
  }, chipVersion) {
    Object.assign(this, {
      name,
      weight,
      coords: {
        x,
        y,
      },
      chipVersion,
    });
  }

  getInfo() {
    return `Robot: ${this.name}, Chip version: ${this.chipVersion},`
    + ` Weight: ${this.weight}`;
  }

  goForward(steps = 1) {
    this.coords.y += steps;
  }

  goBack(steps = 1) {
    this.coords.y -= steps;
  }

  goRight(steps = 1) {
    this.coords.x += steps;
  }

  goLeft(steps = 1) {
    this.coords.x -= steps;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    if (!this.coords.z) {
      this.coords.z = coords.z || 0;
    }
  }

  goUp(steps = 1) {
    this.coords.z += steps;
  }

  goDown(steps = 1) {
    this.coords.z -= steps;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad || null;
  }

  hookLoad(cargo) {
    if (!this.currentLoad && this.maxLoadWeight >= cargo.weight) {
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
