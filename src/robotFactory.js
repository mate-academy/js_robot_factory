'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = {
      x: 0,
      y: 0,

      ...coords,
    };

    BaseRobot.prototype.getInfo = function() {
      return `Robot: ${name}, Chip version: ${chipVersion}, Weight: ${weight}`;
    };
  }

  goForward(step = 1) {
    this.coords.y += step;
  };
  goBack(step = 1) {
    this.coords.y -= step;
  };
  goRight(step = 1) {
    this.coords.x += step;
  };
  goLeft(step = 1) {
    this.coords.x -= step;
  };
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords = {
      x: 0,
      y: 0,
      z: 0,

      ...coords,
    };
  };

  goUp(step = 1) {
    this.coords.z += step;
  }
  goDown(step = 1) {
    this.coords.z -= step;
  }
};

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion, maxLoadWeight, currentLoad);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (!(cargo.weight > this.maxLoadWeight) && !this.currentLoad) {
      this.currentLoad = cargo;
    }
  }
  unhookLoad() {
    this.currentLoad = null;
  }
};

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
