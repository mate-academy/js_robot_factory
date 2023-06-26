'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.coords = coords;

    if (coords.x === undefined) {
      this.coords.x = 0;
    }

    if (coords.y === undefined) {
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
    return `Robot: ${this.name}`
    + `, Chip version: ${this.chipVersion}`
    + `, Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    if (this.coords.z === undefined) {
      this.coords.z = 0;
    }
  };
  goUp(step = 1) {
    this.coords.z += step;
  }
  goDown(step = 1) {
    this.coords.z -= step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name,
    weight,
    coords,
    chipVersion,
    maxLoadWeight,
    currentLoad = null) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  };
  hookLoad(cargo) {
    if (cargo.weight > this.maxLoadWeight) {
      this.currentLoad = null;
    } else if (!this.currentLoad) {
      this.currentLoad = {
        weight: cargo.weight,
        description: `cargo ${cargo.weight} weight`,
      };
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
