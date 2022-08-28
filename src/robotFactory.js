'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: coords.x || 0,
      y: coords.y || 0,
    };
    this.chipVersion = chipVersion;
  };

  goForward(step = 1) {
    this.coords.y += step;

    return this.coords;
  }

  goBack(step = 1) {
    this.coords.y -= step;

    return this.coords;
  }

  goLeft(step = 1) {
    this.coords.x -= step;

    return this.coords;
  }

  goRight(step = 1) {
    this.coords.x += step;

    return this.coords;
  }

  getInfo() {
    const robotName = `Robot: ${this.name}, `;
    const robotChip = `Chip version: ${this.chipVersion}, `;
    const roboWeight = `Weight: ${this.weight}`;

    return robotName + robotChip + roboWeight;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords.z = coords.z || 0;
  };

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
  };

  hookLoad(cargo) {
    if (!this.currentLoad && cargo.weight <= this.maxLoadWeight) {
      this.currentLoad = { ...cargo };
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
