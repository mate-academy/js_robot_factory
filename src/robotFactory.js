'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;

    const { x, y } = coords;

    if (Object.keys(coords).length === 0) {
      this.coords = {
        x: 0, y: 0,
      };
    } else if (y === undefined) {
      this.coords = {};
      this.coords.x = x;
      this.coords.y = 0;
    } else {
      this.coords = coords;
    }
    this.chipVersion = chipVersion;
  }

  goForward(step = 1) {
    this.coords.y = this.coords.y + step;

    return this;
  }

  goBack(step = 1) {
    this.coords.y = this.coords.y - step;

    return this;
  }

  goRight(step = 1) {
    this.coords.x = this.coords.x + step;

    return this;
  }

  goLeft(step = 1) {
    this.coords.x = this.coords.x - step;

    return this;
  }

  getInfo() {
    return `Robot: ${this.name}, `
    + `Chip version: ${this.chipVersion}, ` + `Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    const { x, y, z } = coords;

    if (z === undefined) {
      this.coords = {};
      this.coords.x = x;
      this.coords.y = y;
      this.coords.z = 0;
    } else {
      this.coords = coords;
    }
  }

  goUp(step = 1) {
    this.coords.z = this.coords.z + step;

    return this;
  }

  goDown(step = 1) {
    this.coords.z = this.coords.z - step;

    return this;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;

    if (currentLoad === undefined) {
      this.currentLoad = null;
    }
  }

  hookLoad(cargo) {
    if (this.currentLoad === undefined && cargo.weight <= this.maxLoadWeight) {
      this.currentLoad = cargo;
    }

    if (this.currentLoad === null && cargo.weight <= this.maxLoadWeight) {
      this.currentLoad = cargo;
    }

    return this;
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
