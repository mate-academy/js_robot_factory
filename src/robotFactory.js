'use strict';

class BaseRobot {
  constructor(name, weight, { x = 0, y = 0 }, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = {
      x,
      y,
    };
  }

  goForward(y = 1) {
    this.coords.y += y;
  }

  goBack(y = 1) {
    this.coords.y -= y;
  }

  goRight(x = 1) {
    this.coords.x += x;
  }

  goLeft(x = 1) {
    this.coords.x -= x;
  }
  getInfo() {
    return `Robot: ${this.name}, Chip version: ${this.chipVersion
    }, Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(...args) {
    super(...args);
    this.coords.z = args.find(x => typeof x === 'object').z || 0;
  }

  goUp(z = 1) {
    this.coords.z += z;
  }

  goDown(z = 1) {
    this.coords.z -= z;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, { x = 0, y = 0, z = 0 }, chipVersion, maxLoadWeight,
    currentLoad) {
    super(name, weight,
      {
        x,
        y,
        z,
      },
      chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad || null;
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
