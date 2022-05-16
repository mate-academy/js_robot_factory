'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.coords.x = coords.x || 0;
    this.coords.y = coords.y || 0;
    this.chipVersion = chipVersion;
  }

  goForward(step = 1) {
    this.coords.y += step;
  };

  goBack(step = 1) {
    this.coords.y -= step;
  };

  goRight(step = 1) {
    this.coords.x += step;
  };

  goLeft(step = 1) {
    this.coords.x -= step;
  };

  getInfo() {
    return `Robot: ${this.name},
  Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  };
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion, zCoords) {
    super(name, weight, coords, chipVersion);
    this.coords.z = zCoords.z || 0;
  }

  goUp(step = 1) {
    this.coords.z += step;
  }

  goDown(step = 1) {
    this.coords.z -= step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(
    name, weight, coords, chipVersion, zCoords, maxLoadWeight, currentLoad
  ) {
    super(name, weight, coords, chipVersion, zCoords);
    this.maxLoadWeight = maxLoadWeight;

    this.currentLoad = null || {
      weight: currentLoad.weight,
      description: currentLoad.description,
    };
  }
  hookLoad(cargo) {
    if (cargo.weight < this.maxLoadWeight
        && this.currentLoad.weight === null) {
      this.currentLoad.weight = cargo.weight;
    }
  }

  unhookLoad() {
    this.currentLoad.weight = null;
  }
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
