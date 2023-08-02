'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: coords.x || 0,
      y: coords.y || 0,
    };
    this.chipVersion = chipVersion;
  }

  getInfo() {
    const { name, chipVersion, weight } = this;

    return `Robot: ${name}, Chip version: ${chipVersion}, Weight: ${weight}`;
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
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);
    this.coords.z = coords.z || 0;
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
    this.currentLoad = currentLoad || null;
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
