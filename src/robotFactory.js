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

  Moves(value = 1) {
    return value < 0 ? 0 : value;
  };

  goRight(value) {
    this.coords.x += this.Moves(value);

    return this;
  };
  goLeft(value) {
    this.coords.x -= this.Moves(value);

    return this;
  };
  goBack(value) {
    this.coords.y -= this.Moves(value);

    return this;
  };
  goForward(value) {
    this.coords.y += this.Moves(value);

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

  goUp(value) {
    this.coords.z += this.Moves(value);

    return this;
  };

  goDown(value) {
    this.coords.z -= this.Moves(value);

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
