'use strict';

class BaseRobot {
  constructor(name, weight, coords = {}, chipVersion = 0) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;
    this.coords = coords;
    this.coords.x = coords.x || 0;
    this.coords.y = coords.y || 0;
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
    return `Robot: ${this.name}, Chip version: ${this.chipVersion},`
      + ` Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords = {}, chipVersion = 0) {
    super(coords);
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;
    this.coords = coords;
    this.coords.x = coords.x || 0;
    this.coords.y = coords.y || 0;
    this.coords.z = coords.z || 0;
  }

  goUp(step = 1) {
    this.coords.z += step;
  }

  goDown(step = 1) {
    this.coords.z -= step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords = {}, chipVersion = 0,
    maxLoadWeight, currentLoad) {
    super(maxLoadWeight, currentLoad);
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;
    this.coords = coords;
    this.coords.x = coords.x || 0;
    this.coords.y = coords.y || 0;
    this.currentLoad = currentLoad;
    this.maxLoadWeight = maxLoadWeight;
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
