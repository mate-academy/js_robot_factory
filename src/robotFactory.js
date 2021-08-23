'use strict';
class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: (coords.x) ? coords.x : 0,
      y: (coords.y) ? coords.y : 0,
    };

    this.chipVersion = chipVersion;
  };

  goForward(step = 1) {
    this.coords.y += step;
  };

  goBack(step = 1) {
    this.coords.y -= step;
  };

  goRight(step = 1) {
    this.coords.x += step;
  };

  goLeft(step = 1) {
    this.coords.x -= step;
  };

  getInfo() {
    const robotName = `Robot: ${this.name}`;
    const robotChipVersion = `Chip version: ${this.chipVersion}`;
    const robotWeight = `Weight: ${this.weight}`;

    return `${robotName}, ${robotChipVersion}, ${robotWeight}`;
  };
};

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);
    this.coords.z = (coords.z) ? coords.z : 0;
  };

  goForward() {
    super.goForward();
  };

  goBack() {
    super.goBack();
  };

  goRight() {
    super.goRight();
  };

  goLeft() {
    super.goLeft();
  };

  goUp(step = 1) {
    this.coords.z += step;
  };

  goDown(step = 1) {
    this.coords.z -= step;
  };

  getInfo() {
    super.getInfo();
  };
};

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  };

  hookLoad(cargo) {
    if (cargo.weight <= this.maxLoadWeight && this.currentLoad === null) {
      this.currentLoad = cargo;
    };
  };

  unhookLoad() {
    this.currentLoad = null;
  };
};

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
