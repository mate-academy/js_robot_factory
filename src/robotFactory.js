'use strict';

class BaseRobot {
  constructor(name, weight, position, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = {
      x: position.x || 0,
      y: position.y || 0,
    };
  }

  getInfo() {
    const {
      name,
      weight,
      chipVersion,
    } = this;

    return `Robot: ${name}, Chip version: ${chipVersion}, Weight: ${weight}`;
  }

  goForward(step = 1) {
    if (step >= 0) {
      this.coords.y += step;
    }
  }

  goBack(step = 1) {
    if (step >= 0) {
      this.coords.y -= step;
    }
  }

  goRight(step = 1) {
    if (step >= 0) {
      this.coords.x += step;
    }
  }

  goLeft(step = 1) {
    if (step >= 0) {
      this.coords.x -= step;
    }
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, position, chipVersion) {
    super(name, weight, position, chipVersion);

    this.coords.z = position.z || 0;
  }

  goUp(step = 1) {
    if (step >= 0) {
      this.coords.z += step;
    }
  }

  goDown(step = 1) {
    if (step >= 0) {
      this.coords.z -= step;
    }
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, position, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, position, chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad || null;
  }

  hookLoad(cargo) {
    if (!this.currentLoad && this.maxLoadWeight >= cargo.weight) {
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
