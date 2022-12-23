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

  goForward(step = 1) {
    this.coords.y += step;
  };

  goBack(step = 1) {
    this.coords.y -= step;
  };

  goLeft(step = 1) {
    this.coords.x -= step;
  };

  goRight(step = 1) {
    this.coords.x += step;
  };

  getInfo() {
    let result = `Robot: ${this.name}, `;

    result += `Chip version: ${this.chipVersion}, Weight: ${this.weight}`;

    return result;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords.z = coords.z || 0;
  }

  goDown(step = 1) {
    this.coords.z -= step;
  };

  goUp(step = 1) {
    this.coords.z += step;
  };
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;

    if (!currentLoad) {
      this.currentLoad = null;
    } else {
      this.currentLoad = currentLoad;
    }
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
