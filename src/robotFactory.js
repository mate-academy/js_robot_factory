'use strict';

class BaseRobot {
  constructor(name, weight, coords = {}, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = {
      x: coords.x || 0,
      y: coords.y || 0,
    };
  }

  goForward(stepForward = 1) {
    if (stepForward > 0) {
      this.coords.y += stepForward;
    }

    return this;
  };

  goBack(stepBack = 1) {
    if (stepBack > 0) {
      this.coords.y -= stepBack;
    }

    return this;
  };

  goRight(stepRight = 1) {
    if (stepRight > 0) {
      this.coords.x += stepRight;
    }

    return this;
  };

  goLeft(stepLeft = 1) {
    if (stepLeft > 0) {
      this.coords.x -= stepLeft;
    }

    return this;
  };

  getInfo() {
    return `Robot: ${this.name}, Chip version: `
    + `${this.chipVersion}, Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords.z = coords.z || 0;
  }

  goUp(stepUp = 1) {
    this.coords.z += stepUp;
  }
  goDown(stepDown = 1) {
    this.coords.z -= stepDown;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(
    name,
    weight,
    coords,
    chipVersion,
    maxLoadWeight,
    currentLoad = null
  ) {
    super(name, weight, coords, chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  unhookLoad() {
    this.currentLoad = null;
  }

  hookLoad(cargo) {
    if (!this.currentLoad && this.maxLoadWeight >= cargo.weight) {
      this.currentLoad = cargo;
    }
  }
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
