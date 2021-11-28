'use strict';

class BaseRobot {
  constructor(name,
    weight,
    coords,
    chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = Object.entries(coords).length === 0 ? {
      x: 0, y: 0,
    } : {
      y: coords.y, x: coords.x,
    };

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
    return (
      `Robot: ${this.name},`
      + ` Chip version: ${this.chipVersion},`
      + ` Weight: ${this.weight}`
    );
  }
}
class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords = { z: 0 }, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords = Object.entries(coords).length < 3 ? {
      x: 0, y: 0, z: 0,
    } : {
      y: coords.y, x: coords.x, z: coords.z,
    };
  }
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
    currentLoad) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }
  hookLoad(cargo) {
    if (cargo.weight > this.maxLoadWeight) {
      return;
    }

    if (this.currentLoad !== null) {
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
