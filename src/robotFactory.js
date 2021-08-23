'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion = 0) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: coords.x || 0,
      y: coords.y || 0,
    };

    this.chipVersion = chipVersion;
  }

  goForward(move = 1) {
    if (move > 0) {
      this.coords.y = this.coords.y + move;
    }

    return this;
  }

  goBack(move = 1) {
    if (move > 0) {
      this.coords.y = this.coords.y - move;
    }

    return this;
  }

  goRight(move = 1) {
    if (move > 0) {
      this.coords.x = this.coords.x + move;
    }

    return this;
  }

  goLeft(move = 1) {
    if (move > 0) {
      this.coords.x = this.coords.x - move;
    }

    return this;
  }

  getInfo() {
    return (
      `Robot: ${this.name}, Chip version:`
      + ` ${this.chipVersion}, Weight: ${this.weight}`
    );
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords.z = coords.z || 0;
  }

  goUp(move = 1) {
    if (move > 0) {
      this.coords.z = this.coords.z + move;
    }

    return this;
  }

  goDown(move = 1) {
    if (move > 0) {
      this.coords.z = this.coords.z - move;
    }

    return this;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad,) {
    super(name, weight, coords, chipVersion);
    this.currentLoad = currentLoad;
    this.maxLoadWeight = maxLoadWeight;
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
