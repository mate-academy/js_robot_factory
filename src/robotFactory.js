'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: coords.x || 0,
      y: coords.y || 0,
    };
    this.chipVersion = chipVersion;
  }

  getInfo() {
    // eslint-disable-next-line max-len
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  }

  goForward(value = 1) {
    if (value > 0) {
      this.coords.y = this.coords.y + value;
    }

    return this;
  }

  goBack(value = 1) {
    if (value > 0) {
      this.coords.y = this.coords.y - value;
    }

    return this;
  }

  goRight(value = 1) {
    if (value > 0) {
      this.coords.x = this.coords.x + value;
    }

    return this;
  }

  goLeft(value = 1) {
    if (value > 0) {
      this.coords.x = this.coords.x - value;
    }

    return this;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);
    this.coords.z = coords.z || 0;
  }

  goUp(value = 1) {
    if (value > 0) {
      this.coords.z = this.coords.z + value;
    }
  }

  goDown(value = 1) {
    if (value > 0) {
      this.coords.z = this.coords.z - value;
    }
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name,
    weight,
    coords,
    chipVersion, maxLoadWeight,
    currentLoad) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (this.currentLoad === null && this.maxLoadWeight >= cargo.weight) {
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
