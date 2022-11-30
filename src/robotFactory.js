'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    const x = coords.x ? coords.x : 0;
    const y = coords.y ? coords.y : 0;

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
    const n = this.name;
    const c = this.chipVersion;

    return `Robot: ${n}, Chip version: ${c}, Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(...all) {
    const z = all[2].z ? all[2].z : 0;

    super(...all);
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
  constructor(...all) {
    super(...all);

    const curent = all[5] || null;

    this.maxLoadWeight = all[4];
    this.currentLoad = curent;
  }
  hookLoad(cargo) {

    if (this.currentLoad) { 
      return;
    }

    if (cargo.weight > this.maxLoadWeight) { 
      return;
    }

    this.currentLoad = cargo;
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
