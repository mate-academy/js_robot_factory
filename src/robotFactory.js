'use strict';

class BaseRobot {
  constructor(name, weight, position = {
    x: 0, y: 0,
  }, chipVersion) {
    const x = position.x ? position.x : 0;
    const y = position.y ? position.y : 0;

    this.name = name;
    this.weight = weight;

    this.coords = {
      x: x,
      y: y,
    };

    this.chipVersion = chipVersion;
  }

  goForward(step = 1) {
    this.coords.y += step;
  }

  goBack(step = 1) {
    this.coords.y -= step;
  }

  goRight(step = 1) {
    this.coords.x += step;
  }

  goLeft(step = 1) {
    this.coords.x -= step;
  }

  getInfo() {
    const first = `Robot: ${this.name}, Chip version: ${this.chipVersion}, `;
    const second = `Weight: ${this.weight}`;

    return first + second;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, position = {
    x: 0, y: 0, z: 0,
  }, chipVersion) {
    super(name, weight, position, chipVersion);

    const z = position.z ? position.z : 0;

    this.coords.z = z;
  }

  goUp(step = 1) {
    this.coords.z += step;
  }

  goDown(step = 1) {
    this.coords.z -= step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, position = {
    x: 0, y: 0, z: 0,
  }, chipVersion, maxLoadWeight, currentLoad = null) {
    super(name, weight, position, chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    const cargoArr = Object.keys(cargo);

    if (
      this.currentLoad === null
      && cargoArr.length > 0
      && cargo.weight <= this.maxLoadWeight
    ) {
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
