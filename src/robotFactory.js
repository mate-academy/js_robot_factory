'use strict';

class BaseRobot {
  constructor(name, weight, positon, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: positon.x || 0,
      y: positon.y || 0,
    };
    this.chipVersion = chipVersion;
  }

  goForward(step) {
    if (step > 0) {
      this.coords.y += step;
    } else {
      this.coords.y++;
    }
  }

  goBack(step) {
    if (step > 0) {
      this.coords.y -= step;
    } else {
      this.coords.y--;
    }
  }

  goLeft(step) {
    if (step > 0) {
      this.coords.x -= step;
    } else {
      this.coords.x--;
    }
  }

  goRight(step) {
    if (step > 0) {
      this.coords.x += step || 1;
    } else {
      this.coords.x++;
    }
  }

  getInfo() {
    return `Robot: ${
      this.name}, Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, positon, chipVersion) {
    super(name, weight, positon, chipVersion);
    this.coords.z = positon.z || 0;
  }
  goUp(step) {
    if (step > 0) {
      this.coords.z += step;
    } else {
      this.coords.z++;
    }
  }

  goDown(step) {
    if (step > 0) {
      this.coords.z -= step;
    } else {
      this.coords.z--;
    }
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, positon, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, positon, chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad || null;
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
