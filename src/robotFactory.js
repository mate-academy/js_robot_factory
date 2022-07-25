'use strict';

class BaseRobot {
  constructor(name, weight, { x = 0, y = 0 }, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x,
      y,
    };

    this.chipVersion = chipVersion;
  }

  goForward(step = 1) {
    this.coords.y += step;

    return this.y;
  };

  goBack(step = 1) {
    this.coords.y -= step;

    return this.y;
  };

  goLeft(step = 1) {
    this.coords.x -= step;

    return this.x;
  };

  goRight(step = 1) {
    this.coords.x += step;

    return this.x;
  };

  getInfo() {
    // eslint-disable-next-line max-len
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, { x = 0, y = 0, z = 0 }, chipVersion) {
    // eslint-disable-next-line object-curly-newline
    super(name, weight, { x, y }, chipVersion);

    // eslint-disable-next-line object-curly-newline
    this.coords = { x, y, z };
  }

  goUp(step = 1) {
    this.coords.z += step;

    return this.z;
  };

  goDown(step = 1) {
    this.coords.z -= step;

    return this.z;
  };
}

class DeliveryDrone extends FlyingRobot {
  constructor(name,
    weight,
    { x = 0, y = 0, z = 0 },
    chipVersion,
    maxLoadWeight,
    currentLoad = null
  ) {
    super(
      name,
      weight,
      chipVersion,
      // eslint-disable-next-line object-curly-newline
      { x, y, z }
    );

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
