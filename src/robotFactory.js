'use strict';

class BaseRobot {
  constructor(name, weight, { x, y }, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: x || 0,
      y: y || 0,
    };

    this.chipVersion = chipVersion;
  }

  goForward(step = 1) {
    const move = this.coords.y += step;

    return move;
  };

  goBack(step = 1) {
    const move = this.coords.y -= step;

    return move;
  };

  goRight(step = 1) {
    const move = this.coords.x += step;

    return move;
  };

  goLeft(step = 1) {
    const move = this.coords.x -= step;

    return move;
  };

  getInfo() {
    return `Robot: ${this.name}, Chip version: ${this.chipVersion},`
    + ` Weight: ${this.weight}`;
  };
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, { x, y, z }, chipVersion) {
    super(name, weight, {
      x,
      y,
      z,
    },

    chipVersion);

    this.coords = {
      x: x || 0,
      y: y || 0,
      z: z || 0,
    };
  }

  goUp(step = 1) {
    const move = this.coords.z += step;

    return move;
  };

  goDown(step = 1) {
    const move = this.coords.z -= step;

    return move;
  };
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    const isEmpty = !this.currentLoad;

    if (isEmpty && cargo.weight <= this.maxLoadWeight) {
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
