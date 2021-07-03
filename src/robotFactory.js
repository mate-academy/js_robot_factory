'use strict';
class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;
    this.coords = coords;

    if (!this.coords.x) {
      this.coords.x = 0;
    }

    if (!this.coords.y) {
      this.coords.y = 0;
    }
  }

  goForward(step = 1) {
    this.coords.y += step;
  };
  goRight(step = 1) {
    this.coords.x += step;
  };
  goBack(step = 1) {
    this.coords.y -= step;
  };
  goLeft(step = 1) {
    this.coords.x -= step;
  };

  getInfo() {
    // eslint-disable-next-line max-len
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    if (!this.coords.z) {
      this.coords.z = 0;
    }
  }
  goUp(step = 1) {
    this.coords.z += step;
  }

  goDown(step = 1) {
    this.coords.z -= step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;

    this.currentLoad = currentLoad === null ? null : { ...currentLoad };
  }

  hookLoad(cargo) {
    if ((this.currentLoad === null) && (this.maxLoadWeight >= cargo.weight)) {
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
