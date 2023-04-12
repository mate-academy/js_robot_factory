'use strict';

class BaseRobot {
  constructor(name, weight, { x = 0, y = 0 }, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x,
      y,
    };
    this.chipVersion = chipVersion;
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
    const text = `Robot: ${this.name}, Chip version: ${this.chipVersion}, `;
    const text2 = `Weight: ${this.weight}`;

    return `${text}${text2}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, { x = 0, y = 0, z = 0 }, chipVersion) {
    super(name, weight, {
      x, y,
    }, chipVersion);
    this.coords.z = z;
  }

  goUp(step = 1) {
    this.coords.z += step;
  };
  goDown(step = 1) {
    this.coords.z -= step;
  };
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, { x = 0, y = 0, z = 0 },
    chipVersion, maxLoadWeight, currentLoad = null) {
    super(name, weight, {
      x, y, z,
    }, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    this.currentLoad = !this.currentLoad && cargo.weight <= this.maxLoadWeight
      ? cargo
      : this.currentLoad;
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
