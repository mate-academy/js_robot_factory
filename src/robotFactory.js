'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.coords = {};
    this.coords.x = coords.x ? coords.x : 0;
    this.coords.y = coords.y ? coords.y : 0;
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
    const robot = `Robot: ${this.name},`;
    const chip = `Chip version: ${this.chipVersion},`;
    const weight = `Weight: ${this.weight}`;

    /* Сделал так потому что строка слишком длинная для линтера получалась */

    return `${robot} ${chip} ${weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);
    this.coords.z = coords.z ? coords.z : 0;
  }

  goUp(step = 1) {
    this.coords.z += step;
  }

  goDown(step = 1) {
    this.coords.z -= step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;

    if (!this.currentLoad) {
      this.currentLoad = {
        weight: 0,
        description: `cargo ${this.currentLoad} weight`,
      };
    }
  }

  hookLoad(cargo) {
    const tmp = this.currentLoad.weight + cargo.weight;

    if (!this.currentLoad.weight) {
      if (cargo && this.maxLoadWeight >= (tmp + this.currentLoad.weight)) {
        this.currentLoad.weight += cargo.weight;

        this.currentLoad.description
        = `cargo ${this.currentLoad.weight} weight`;
      } else {
        this.currentLoad = null;
      }
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
