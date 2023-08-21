'use strict';

const defaultCoords = {
  x: 0,
  y: 0,
  z: 0,
};

const minStep = 1;

class BaseRobot {
  constructor(
    name,
    weight,
    coords = {},
    chipVersion,
  ) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = {
      x: coords.x || defaultCoords.x,
      y: coords.y || defaultCoords.y,
    };
  }

  goForward(step = minStep) {
    this.coords.y += step;
  };

  goBack(step = minStep) {
    this.coords.y -= step;
  };

  goRight(step = minStep) {
    this.coords.x += step;
  };

  goLeft(step = minStep) {
    this.coords.x -= step;
  };

  getInfo() {
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}, `
      + `Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(
    name,
    weight,
    coords = {},
    chipVersion
  ) {
    super(
      name,
      weight,
      coords,
      chipVersion
    );

    this.coords.z = coords.z || defaultCoords.z;
  }

  goUp(step = minStep) {
    this.coords.z += step;
  };

  goDown(step = minStep) {
    this.coords.z -= step;
  };
}

class DeliveryDrone extends FlyingRobot {
  constructor(
    name,
    weight,
    coords = {},
    chipVersion,
    maxLoadWeight,
    currentLoad = null
  ) {
    super(
      name,
      weight,
      coords,
      chipVersion,
    );

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (!this.currentLoad && cargo.weight <= this.maxLoadWeight) {
      this.currentLoad = cargo;
    }
  };

  unhookLoad() {
    this.currentLoad = null;
  };
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
