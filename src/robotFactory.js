'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    if (!coords.x) {
      this.coords = {
        x: 0,
        y: 0,
      };
    } else {
      this.coords = coords;
    }
  }

  goForward(step) {
    if (step) {
      this.coords.y += step;
    } else {
      this.coords.y++;
    }
  }

  goBack(step) {
    if (step) {
      this.coords.y -= step;
    } else {
      this.coords.y--;
    }
  }

  goRight(step) {
    if (step) {
      this.coords.x += step;
    } else {
      this.coords.x++;
    }
  }

  goLeft(step) {
    if (step) {
      this.coords.x -= step;
    } else {
      this.coords.x--;
    }
  }

  getInfo() {
    const name = this.name;
    const chip = this.chipVersion;
    const weight = this.weight;

    return `Robot: ${name}, Chip version: ${chip}, Weight: ${weight}`;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    if (!coords.z) {
      this.coords = { z: 0 };
    } else {
      this.coords = coords;
    }
  }

  goUp(step) {
    if (step) {
      this.coords.z += step;
    } else {
      this.coords.z++;
    }
  }

  goDown(step) {
    if (step) {
      this.coords.z -= step;
    } else {
      this.coords.z--;
    }
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (cargo.weight <= this.maxLoadWeight
      && this.currentLoad === null) {
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
