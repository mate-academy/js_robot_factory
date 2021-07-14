'use strict';

class BaseRobot {
  constructor(name, weight, position, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = {
      x: 0,
      y: 0,
    };

    if ('x' in position && 'y' in position) {
      this.coords.x = position.x;
      this.coords.y = position.y;
    }
  }

  goForward(step = 1) {
    this.coords.y = this.coords.y + step;
  }

  goBack(step = 1) {
    this.coords.y = this.coords.y - step;
  }

  goRight(step = 1) {
    this.coords.x = this.coords.x + step;
  }

  goLeft(step = 1) {
    this.coords.x = this.coords.x - step;
  }

  getInfo() {
    // eslint-disable-next-line max-len
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, position, chipVersion) {
    super(name, weight, position, chipVersion);
    this.coords.z = 0;

    if ('z' in position) {
      this.coords.z = position.z;
    }
  }

  goUp(step = 1) {
    this.coords.z = this.coords.z + step;
  }

  goDown(step = 1) {
    this.coords.z = this.coords.z - step;
  }
}

class DeliveryDrone extends FlyingRobot {
  // eslint-disable-next-line max-len
  constructor(name, weight, position, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, position, chipVersion);
    this.maxLoadWeight = maxLoadWeight;

    if (currentLoad) {
      this.currentLoad = {
        weight: currentLoad.weight,
        description: currentLoad.description,
      };
    }
  }

  hookLoad(cargo) {
    if (!this.currentLoad && cargo.weight <= this.maxLoadWeight) {
      this.currentLoad = {
        weight: cargo.weight,
        description: cargo.description,
      };
    } else if (!this.currentLoad && cargo.weight > this.maxLoadWeight) {
      this.currentLoad = null;
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
