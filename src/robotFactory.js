/* eslint-disable no-console */
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

  getInfo() {
    return `Robot: ${this.name}, `
    + `Chip version: ${this.chipVersion}, `
    + `Weight: ${this.weight}`;
  };

  goForward(value = 1) {
    if (value > 0) {
      this.coords.y += value;
    }

    return this;
  };

  goBack(value = 1) {
    if (value > 0) {
      this.coords.y -= value;
    }

    return this;
  };

  goLeft(value = 1) {
    if (value > 0) {
      this.coords.x -= value;
    }

    return this;
  };

  goRight(value = 1) {
    if (value > 0) {
      this.coords.x += value;
    }

    return this;
  };
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion,) {
    super(name, weight, coords, chipVersion);
    this.coords.z = coords.z || 0;
  }

  goUp(value = 1) {
    if (value > 0) {
      this.coords.z += value;
    }

    return this;
  };
  goDown(value = 1) {
    if (value > 0) {
      this.coords.z -= value;
    }

    return this;
  };
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords,
    chipVersion, maxLoadWeight, currentLoad = null) {
    super(name, weight, coords, chipVersion);
    this.currentLoad = currentLoad;
    this.maxLoadWeight = maxLoadWeight;
  }
  hookLoad(cargo) {
    if (this.currentLoad <= 0 && cargo.weight <= this.maxLoadWeight) {
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
