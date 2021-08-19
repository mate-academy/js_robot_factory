'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.coords = {
      x: 0,
      y: 0,
      ...coords,
    };
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;
  }

  getInfo() {
    const robot = `Robot: ${this.name}`;
    const chipVersion = `Chip version: ${this.chipVersion}`;
    const weight = `Weight: ${this.weight}`;

    return `${robot}, ${chipVersion}, ${weight}`;
  };

  goForward(steps = 1) {
    this.coords.y += steps;
  };

  goBack(steps = 1) {
    this.coords.y -= steps;
  };

  goRight(steps = 1) {
    this.coords.x += steps;
  };

  goLeft(steps = 1) {
    this.coords.x -= steps;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    if (coords.z === undefined) {
      coords.z = 0;
    }
    super(name, weight, coords, chipVersion);
  }

  goUp(steps = 1) {
    this.coords.z += steps;
  }

  goDown(steps = 1) {
    this.coords.z -= steps;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion, maxLoadWeight, currentLoad);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (this.maxLoadWeight >= cargo.weight && this.currentLoad === null) {
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
