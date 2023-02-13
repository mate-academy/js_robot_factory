'use strict';

class BaseRobot {
  constructor(name, weight, { x = 0, y = 0 }, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = {
      x, y,
    };
  }

  goForward(num = 1) {
    if (num > 0) {
      this.coords.y += num;
    }
  }

  goBack(num = 1) {
    if (num > 0) {
      this.coords.y -= num;
    }
  }

  goRight(num = 1) {
    if (num > 0) {
      this.coords.x += num;
    }
  }

  goLeft(num = 1) {
    if (num > 0) {
      this.coords.x -= num;
    }
  }

  getInfo() {
    return `Robot: ${this.name}, Chip version: ${this.chipVersion},`
      + ` Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, { x = 0, y = 0, z = 0 }, chipVersion) {
    super(name, weight, {
      x, y,
    }, chipVersion);
    this.coords.z = z;
  }

  goUp(num = 1) {
    if (num > 0) {
      this.coords.z += num;
    }
  }

  goDown(num = 1) {
    if (num > 0) {
      this.coords.z -= num;
    }
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(
    name,
    weight,
    { x = 0, y = 0, z = 0 },
    chipVersion,
    maxLoadWeight,
    currentLoad = null
  ) {
    super(name, weight, {
      x, y, z,
    }, chipVersion);
    this.currentLoad = currentLoad;
    this.maxLoadWeight = maxLoadWeight;
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
