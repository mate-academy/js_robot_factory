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

  getInfo() {
    const name = `Robot: ${this.name}`;
    const chip = `Chip version: ${this.chipVersion}`;
    const robotWeight = `Weight: ${this.weight}`;

    return `${name}, ${chip}, ${robotWeight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    const { x = 0, y = 0, z = 0 } = coords;

    this.coords = {
      x: x,
      y: y,
      z: z,
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
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);

    this.currentLoad = currentLoad || null;
    this.maxLoadWeight = maxLoadWeight;
  }

  hookLoad(cargo) {
    if (!this.currentLoad && cargo.weight <= this.maxLoadWeight) {
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
