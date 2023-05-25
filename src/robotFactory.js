'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = coords;
    this.coords.x = coords.x || 0;
    this.coords.y = coords.y || 0;
    this.chipVersion = chipVersion;
  }

  goForward(step = 1) {
    this.coords.y += step;

    return this;
  }

  goBack(step = 1) {
    this.coords.y -= step;

    return this;
  }

  goRight(step = 1) {
    this.coords.x += step;

    return this;
  }

  goLeft(step = 1) {
    this.coords.x -= step;

    return this;
  }

  getInfo() {
    return `Robot: ${this.name}, Chip version: \
${this.chipVersion}, Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);
    this.coords.z = coords.z || 0;
  }

  goUp(step = 1) {
    this.coords.z += step;

    return this;
  }

  goDown(step = 1) {
    this.coords.z -= step;

    return this;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion,
    maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion, maxLoadWeight);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad || null;
  }

  hookLoad(cargo) {
    if (this.currentLoad == null && cargo.weight <= this.maxLoadWeight) {
      this.currentLoad = cargo;
    }
  };

  unhookLoad() {
    this.currentLoad = null;
  };
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};

// const cargo1 = {
//   weight: 57,
//   description: 'cargo 57 weight',
// };

// const robot = new DeliveryDrone('X', 9, {}, 0.7, 78, cargo1);

// console.log(robot);
