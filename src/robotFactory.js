'use strict';

class BaseRobot {
  constructor(name, weight, position, chipVersion) {
    const { x = 0, y = 0 } = { ...position };

    this.name = name;
    this.weight = weight;

    this.coords = {
      x: x,
      y: y,
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
    const nameInfo = `Robot: ${this.name}, `;
    const chipInfo = `Chip version: ${this.chipVersion}, `;
    const weightInfo = `Weight: ${this.weight}`;

    return nameInfo + chipInfo + weightInfo;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, position, chipVersion) {
    super(name, weight, position, chipVersion);

    const { x = 0, y = 0, z = 0 } = position;

    this.coords = {
      x: x,
      y: y,
      z: z,
    };
  }

  goUp(step = 1) {
    this.coords.z += step;
  }

  goDown(step = 1) {
    this.coords.z -= step;
  }
};

class DeliveryDrone extends FlyingRobot {
  constructor(
    name,
    weight,
    position,
    chipVersion,
    maxLoadWeight,
    currentLoad = null
  ) {
    super(name, weight, position, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (this.currentLoad === null && cargo.weight <= this.maxLoadWeight) {
      this.currentLoad = cargo;
    }
  };

  unhookLoad() {
    this.currentLoad = null;
  };
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
