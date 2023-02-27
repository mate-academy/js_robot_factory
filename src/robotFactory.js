'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.coords = coords;
    this.coords.x = this.coords.x || 0;
    this.coords.y = this.coords.y || 0;
    this.chipVersion = chipVersion;
  }

  goRight(value = 1) {
    if (value > 0) {
      this.coords.x += value;
    };

    return this;
  };

  goLeft(value = 1) {
    if (value > 0) {
      this.coords.x += -value;
    };

    return this;
  };

  goBack(value = 1) {
    if (value > 0) {
      this.coords.y += -value;
    };

    return this;
  };

  goForward(value = 1) {
    if (value > 0) {
      this.coords.y += value;
    };

    return this;
  };

  getInfo() {
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}, `
    + `Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);
    this.coords.z = this.coords.z || 0;
  }

  goUp(value = 1) {
    if (value > 0) {
      this.coords.z += value;
    };

    return this;
  };

  goDown(value = 1) {
    if (value > 0) {
      this.coords.z += -value;
    };

    return this;
  };
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight,
    currentLoad = null) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (cargo.weight <= this.maxLoadWeight && !this.currentLoad) {
      this.currentLoad = cargo;
    }

    return this.currentLoad;
  }

  unhookLoad() {
    this.currentLoad = null;

    return this.currentLoad;
  }
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
