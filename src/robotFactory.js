'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = {
      x: 0,
      y: 0,
    };
  }
  goForward(value = 1) {
    if (value > 0) {
      this.coords.y += value;
    }
  }
  goBack(value = 1) {
    if (value > 0) {
      this.coords.y -= value;
    }
  }
  goRight(value = 1) {
    if (value > 0) {
      this.coords.x += value;
    }
  }
  goLeft(value = 1) {
    if (value > 0) {
      this.coords.x -= value;
    }
  }
  getInfo() {
    return `Robot: ${this.name}, Chip version: ${this.chipVersion},
     Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  goUp(value = 1) {
    if (value > 1) {
      this.coords.z += value;
    }
  };
  goDown(value = 1) {
    if (value > 1) {
      this.coords.z -= value;
    };
  }
}
class DeliveryDrone extends FlyingRobot {
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
