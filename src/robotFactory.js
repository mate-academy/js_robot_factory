'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    const { x = 0, y = 0 } = coords;

    this.coords = {
      x: x,
      y: y,
    };
  }

  getInfo() {
    const { name, chipVersion, weight } = this;

    return `Robot: ${name}, Chip version: ${chipVersion}, Weight: ${weight}`;
  }

  goForward(step = 1) {
    this.coords.y += step;
  }

  goBack(step = 1) {
    this.coords.y -= step;
  }

  goLeft(step = 1) {
    this.coords.x -= step;
  }

  goRight(step = 1) {
    this.coords.x += step;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    const { z = 0 } = coords;

    this.coords.z = z;
  }

  goUp(step = 1) {
    this.coords.z += step;
  }

  goDown(step = 1) {
    this.coords.z -= step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);

    this.maxLoadWeight = maxLoadWeight;

    if (currentLoad === undefined) {
      this.currentLoad = null;
    } else if (currentLoad === null) {
      this.currentLoad = {
        weight: null,
        description: null,
      };
    } else {
      this.currentLoad = {
        weight: currentLoad.weight,
        description: currentLoad.description,
      };
    }
  }

  hookLoad(cargo) {
    if (this.currentLoad.weight !== null) {
      return this;
    }

    if (cargo !== null) {
      this.currentLoad.weight = cargo.weight;
      this.currentLoad.description = cargo.description;
    }

    if (cargo === null || cargo.weight > this.maxLoadWeight) {
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
