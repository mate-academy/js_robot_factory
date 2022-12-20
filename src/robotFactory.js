'use strict';

class BaseRobot {
  constructor(name, weight, position, chipVersion) {
    this.name = name;
    this.weight = weight;

    if (position.x === undefined) {
      position.x = 0;
    };

    if (position.y === undefined) {
      position.y = 0;
    };

    this.coords = {
      x: position.x,
      y: position.y,
    };
    this.chipVersion = chipVersion;
  };

  getInfo() {
    return `Robot: ${this.name
    }, Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
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
  constructor(name, weight, position, chipVersion) {
    super(name, weight, position, chipVersion);

    if (position.z === undefined) {
      position.z = 0;
    };
    this.coords.z = position.z;
  };

  goUp(step = 1) {
    this.coords.z += step;
  };

  goDown(step = 1) {
    this.coords.z -= step;
  };
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, position, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, position, chipVersion);

    this.maxLoadWeight = maxLoadWeight;

    if (currentLoad === undefined || currentLoad === null) {
      this.currentLoad = null;
    } else {
      this.currentLoad = {
        weight: currentLoad.weight,
        description: currentLoad.description,
      };
    }
  }

  hookLoad(cargo) {
    if (this.maxLoadWeight >= cargo.weight && this.currentLoad === null) {
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
