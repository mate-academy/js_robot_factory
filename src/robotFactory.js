'use strict';

class BaseRobot {
  constructor(name, weight, position = {}, chipVersion) {
    const { x = 0, y = 0 } = position;

    this.name = name;
    this.weight = weight;

    this.coords = {
      x: x,
      y: y,
    };
    this.chipVersion = chipVersion;
  }

  goForward(step = 1) {
    return (this.coords.y += step);
  };
  goBack(step = 1) {
    return (this.coords.y -= step);
  };
  goLeft(step = 1) {
    return (this.coords.x -= step);
  };
  goRight(step = 1) {
    return (this.coords.x += step);
  };

  getInfo() {
    const { name, chipVersion, weight } = this;

    return `Robot: ${name}, Chip version: ${chipVersion}, Weight: ${weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, position = {}, chipVersion) {
    super(name, weight, position, chipVersion);

    const { z = 0 } = position;

    this.coords.z = z;
  }

  goUp(step = 1) {
    return (this.coords.z += step);
  }

  goDown(step = 1) {
    return (this.coords.z -= step);
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, position, chipVersion,
    maxLoadWeight, currentLoad = null) {
    super(name, weight, position, chipVersion);

    this.currentLoad = currentLoad;
    this.maxLoadWeight = maxLoadWeight;
  }

  hookLoad(cargo) {
    if (cargo.weight > this.maxLoadWeight) {
      return null;
    } else if (this.currentLoad) {
      return this.currentLoad;
    }

    return (this.currentLoad = cargo);
  }

  unhookLoad(cargo) {
    return (this.currentLoad = null);
  }
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
