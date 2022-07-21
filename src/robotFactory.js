'use strict';

class BaseRobot {
  constructor(name, weight, coords = {}, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = {
      x: 0,
      y: 0,
    };

    this.coords.x = 'x' in coords
      ? coords.x
      : 0;

    this.coords.y = 'y' in coords
      ? coords.y
      : 0;
  }

  getInfo() {
    // eslint-disable-next-line max-len
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
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
  constructor(name, weight, coords = {}, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords = {
      ...this.coords,
      z: 'z' in coords
        ? coords.z
        : 0,
    };
  };

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
  constructor(name, weight, coords = {},
    chipVersion, maxLoadWeight, currentLoad = null
  ) {
    super(name, weight, coords, chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (this.currentLoad === null
      && cargo.weight <= this.maxLoadWeight
    ) {
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
