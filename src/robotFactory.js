'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    const { x = 0, y = 0 } = coords;

    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = {
      x,
      y,
    };
  }

  goForward(step = 1) {
    return (this.coords.y += step);
  };

  goBack(step = 1) {
    return (this.coords.y -= step);
  };

  goRight(step = 1) {
    return (this.coords.x += step);
  };

  goLeft(step = 1) {
    return (this.coords.x -= step);
  };

  getInfo() {
    return `Robot: ${this.name}, Chip version: ${this.chipVersion},`
      + ` Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    const { x = 0, y = 0, z = 0 } = coords;

    this.coords = {
      x,
      y,
      z,
    };
  }

  goUp(step = 1) {
    return (this.coords.z += step);
  };

  goDown(step = 1) {
    return (this.coords.z -= step);
  };
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, cargo = null) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;

    this.currentLoad = cargo;
  };

  hookLoad(cargo) {
    if (this.maxLoadWeight < cargo.weight) {
      this.cargo = null;

      return;
    }

    if (this.currentLoad === null) {
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
