'use strict';

class BaseRobot {
  constructor(name, weight, pos, chipVersion) {
    this.name = name;
    this.weight = weight;

    if (Object.keys(pos).length === 0) {
      this.coords = {
        x: 0, y: 0,
      };
    } else {
      this.coords = pos;
    }
    this.chipVersion = chipVersion;
  }

  getInfo() {
    const infoPart = `Robot: ${this.name}, Chip version: ${this.chipVersion}`;

    return infoPart + `, Weight: ${this.weight}`;
  };

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
  constructor(...args) {
    super(...args);

    if (this.coords.z === undefined) {
      this.coords.z = 0;
    }
  }

  goUp(step = 1) {
    this.coords.z += step;
  };

  goDown(step = 1) {
    this.coords.z -= step;
  };
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, pos, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, pos, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  };

  hookLoad(givenCargo) {
    if (givenCargo.weight <= this.maxLoadWeight
      && this.currentLoad === null) {
      this.currentLoad = givenCargo;
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
