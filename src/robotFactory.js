'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.coords = {};

    if ('x' in coords) {
      this.coords.x = coords.x;
    } else {
      this.coords.x = 0;
    }

    if ('y' in coords) {
      this.coords.y = coords.y;
    } else {
      this.coords.y = 0;
    }

    this.chipVersion = chipVersion;
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
    return `Robot: ${this.name}, `
      + `Chip version: ${this.chipVersion}, `
      + `Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    if ('z' in coords) {
      this.coords.z = coords.z;
    } else {
      this.coords.z = 0;
    }
  }

  goUp(step = 1) {
    this.coords.z += step;
  };

  goDown(step = 1) {
    this.coords.z -= step;
  };
};

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;

    if (currentLoad) {
      this.currentLoad = currentLoad;
    } else {
      this.currentLoad = null;
    }
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
