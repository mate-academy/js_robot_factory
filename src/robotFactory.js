'use strict';

class BaseRobot {
  constructor(name = '', weight = 0, coords = {
    x: 0, y: 0,
  }, chipVersion = 0) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: coords.x || 0,
      y: coords.y || 0,
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
    const robot = `Robot: ${this.name}`;
    const chip = `Chip version: ${this.chipVersion}`;
    const wt = `Weight: ${this.weight}`;

    return `${robot}, ${chip}, ${wt}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);
    super.goForward();
    super.goBack();
    super.goRight();
    super.goLeft();
    super.getInfo();
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
  constructor(name, weight, coords, chipVersion,
    maxLoadWeight = 0, currentLoad = null) {
    super(name, weight, coords, chipVersion);
    super.goForward();
    super.goBack();
    super.goRight();
    super.goLeft();
    super.getInfo();
    super.goUp();
    super.goDown();
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;

    this.cargo = {
      description: ``, weight: 0,
    };
  }

  hookLoad(cargo) {
    if (!this.currentLoad && cargo.weight <= this.maxLoadWeight) {
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
