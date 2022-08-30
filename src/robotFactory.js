'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: coords.x || 0,
      y: coords.y || 0,
    };

    this.chipVersion = chipVersion;
  }

  goForward(forward = 1) {
    this.coords.y += forward;
  }

  goBack(back = 1) {
    this.coords.y -= back;
  }

  goRight(right = 1) {
    this.coords.x += right;
  }

  goLeft(left = 1) {
    this.coords.x -= left;
  }

  getInfo() {
    return `\
Robot: ${this.name}, Chip version: ${this.chipVersion}, Weight: ${this.weight}\
`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords.z = coords.z || 0;
  }

  goUp(up = 1) {
    this.coords.z += up;
  }

  goDown(down = 1) {
    this.coords.z -= down;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);

    this.maxLoadWeight = maxLoadWeight || null;
    this.currentLoad = currentLoad || null;
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
