'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.x = 0;
    this.y = 0;
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: coords.x || this.x,
      y: coords.y || this.y,
    };
    this.chipVersion = chipVersion;
  }

  getInfo() {
    return `Robot: ${this.name}, Chip version: ${this.chipVersion},`
    + ` Weight: ${this.weight}`;
  }

  goForward(step = 1) {
    if (step > 0) {
      this.coords.y += step;
    }

    return this;
  }

  goBack(step = 1) {
    if (step > 0) {
      this.coords.y -= step;
    }

    return this;
  }

  goRight(step = 1) {
    if (step > 0) {
      this.coords.x += step;
    }

    return this;
  }

  goLeft(step = 1) {
    if (step > 0) {
      this.coords.x -= step;
    }

    return this;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);
    this.z = 0;

    this.coords = {
      x: coords.x || this.x,
      y: coords.y || this.y,
      z: coords.z || this.z,
    };
  }

  goUp(step = 1) {
    if (step > 0) {
      this.coords.z += step;
    }

    return this;
  }

  goDown(step = 1) {
    if (step > 0) {
      this.coords.z -= step;
    }

    return this;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(
    name,
    weight,
    coords,
    chipVersion,
    maxLoadWeight,
    currentLoad
  ) {
    super(name, weight, coords, chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (this.currentLoad === null && cargo.weight <= this.maxLoadWeight) {
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

// res === undefined ? null : res
