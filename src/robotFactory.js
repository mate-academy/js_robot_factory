'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;
    this.coords = coords;

    if (!this.coords.hasOwnProperty('x')) {
      this.coords.x = 0;
    }

    if (!this.coords.hasOwnProperty('y')) {
      this.coords.y = 0;
    }
  }

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
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}, `
    + `Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    if (!this.coords.hasOwnProperty('z')) {
      this.coords.z = 0;
    }
  }
  goForward(step = 1) {
    super.goForward(step);
  }

  goBack(step = 1) {
    super.goBack(step);
  }

  goRight(step = 1) {
    super.goRight(step);
  }

  goLeft(step = 1) {
    super.goLeft(step);
  }

  goUp(step = 1) {
    this.coords.z += step;
  }

  goDown(step = 1) {
    this.coords.z -= step;
  }

  getInfo() {
    super.getInfo();
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords,
    chipVersion, maxLoadWeight, currentLoad = null) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }
  goForward(step = 1) {
    super.goForward(step);
  }

  goBack(step = 1) {
    super.goBack(step);
  }

  goRight(step = 1) {
    super.goRight(step);
  }

  goLeft(step = 1) {
    super.goLeft(step);
  }

  goUp(step = 1) {
    super.goUp(step);
  }

  goDown(step = 1) {
    super.goDown(step);
  }

  getInfo() {
    super.getInfo();
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
