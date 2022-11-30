'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: 0,
      y: 0,
    };

    if (coords.x) {
      this.coords.x = coords.x;
    }

    if (coords.y) {
      this.coords.y = coords.y;
    }
    this.chipVersion = chipVersion;
  }

  goForward(step = 1) {
    this.coords.y += step;
  }

  goBack(step = 1) {
    this.coords.y -= step;
  }

  goLeft(step = 1) {
    this.coords.x -= step;
  }

  goRight(step = 1) {
    this.coords.x += step;
  }

  getInfo() {
    const res1 = `Robot: ${this.name}, `;
    const res2 = `Chip version: ${this.chipVersion}, Weight: ${this.weight}`;

    return res1 + res2;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);
    this.coords.z = 0;

    if (coords.z) {
      this.coords.z = coords.z;
    }
  }

  goUp(step = 1) {
    this.coords.z += step;
  }

  goDown(step = 1) {
    this.coords.z -= step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(
    name,
    weight,
    coords,
    chipVersion,
    maxLoadWeight,
    currentLoad = null) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    const hasEnoughtPower = cargo.weight <= this.maxLoadWeight;
    const isNotOccupied = this.currentLoad === null;

    if (hasEnoughtPower && isNotOccupied) {
      this.currentLoad = cargo;
    }
  }

  unhookLoad() {
    if (this.currentLoad !== null) {
      this.currentLoad = null;
    }
  }
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
