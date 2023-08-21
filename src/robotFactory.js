'use strict';

const ROBOT_BASE_COORD = 0;
const ROBOT_BASE_STEP = 1;

class BaseRobot {
  constructor(name, weight, position, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = {
      x: position.x || ROBOT_BASE_COORD,
      y: position.y || ROBOT_BASE_COORD,
    };
  }

  goForward(step = ROBOT_BASE_STEP) {
    this.coords.y += step;

    return this;
  }

  goBack(step = ROBOT_BASE_STEP) {
    this.coords.y -= step;

    return this;
  }

  goRight(step = ROBOT_BASE_STEP) {
    this.coords.x += step;

    return this;
  }

  goLeft(step = ROBOT_BASE_STEP) {
    this.coords.x -= step;

    return this;
  }

  getInfo() {
    const { name, chipVersion, weight } = this;

    return `Robot: ${name}, Chip version: ${chipVersion}, Weight: ${weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, position, chipVerion) {
    super(name, weight, position, chipVerion);
    this.coords.z = position.z || ROBOT_BASE_COORD;
  }

  goUp(step = ROBOT_BASE_STEP) {
    this.coords.z += step;

    return this;
  }

  goDown(step = ROBOT_BASE_STEP) {
    this.coords.z -= step;

    return this;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(
    name,
    weight,
    position,
    chipVerion,
    maxLoadWeight,
    currentLoad = null,
  ) {
    super(name, weight, position, chipVerion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (cargo.weight <= this.maxLoadWeight && this.currentLoad === null) {
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
