'use strict';

function setDefaultCoords(coords, zIncluded = false) {
  if (coords === {} || !coords) {
    return {
      x: 0, y: 0,
    };
  }

  if (!coords.x) {
    coords.x = 0;
  }

  if (!coords.y) {
    coords.y = 0;
  }

  if (zIncluded && !coords.z) {
    coords.z = 0;
  }

  return coords;
}

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.coords = setDefaultCoords(coords);
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
    return `Robot: ${this.name},`
    + ` Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords = setDefaultCoords(coords, true);
  }

  goUp(step = 1) {
    this.coords.z += step;
  }

  goDown(step = 1) {
    this.coords.z -= step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords,
    chipVersion, maxLoadWeight, currentLoad = null) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (this.currentLoad !== null || cargo.weight > this.maxLoadWeight) {
      return;
    }

    this.currentLoad = cargo;
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
