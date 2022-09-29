'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = {
      x: coords.x || 0,
      y: coords.y || 0,
    };
  }

  Moves(step = 1) {
    return step < 0 ? 0 : step;
  };

  goRight(step) {
    this.coords.x += this.Moves(step);

    return this;
  };
  goLeft(step) {
    this.coords.x -= this.Moves(step);

    return this;
  };
  goBack(step) {
    this.coords.y -= this.Moves(step);

    return this;
  };
  goForward(step) {
    this.coords.y += this.Moves(step);

    return this;
  };

  getInfo() {
    const { name, chipVersion, weight } = this;

    return `Robot: ${name}, Chip version: ${chipVersion}, Weight: ${weight}`;
  };
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);
    this.coords.z = coords.z || 0;
  }

  goUp(step) {
    this.coords.z += this.Moves(step);

    return this;
  };

  goDown(step) {
    this.coords.z -= this.Moves(step);

    return this;
  };
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad || null;
  }

  hookLoad(cargo) {
    this.currentLoad = (cargo.weight <= this.maxLoadWeight && !this.currentLoad)
      ? cargo
      : this.currentLoad;
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
