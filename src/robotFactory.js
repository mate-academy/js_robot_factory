'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.coords = coords;

    if ((this.coords !== null) && (this.coords !== undefined)) {
      if (Object.keys(this.coords).length === 0) {
        this.coords = {
          x: 0,
          y: 0,
        };
      }

      if (Object.keys(this.coords).length === 1) {
        if (Object.keys(this.coords)[0] === 'x') {
          this.coords = coords;
          this.coords.y = 0;
        } else {
          this.coords.x = 0;
          this.coords.y = Object.values(this.coords)[0];
        }
      }
    }
    this.chipVersion = chipVersion;
  }

  getInfo() {
    return `Robot: ${this.name},` + ` Chip version: ${this.chipVersion},`
    + ` Weight: ${this.weight}`;
  }

  goForward(step = 1) {
    this.coords.y += step;
  }

  goBack(step = 1) {
    this.coords.y -= step;
  }

  goLeft(step = 1) {
    this.coords.x -= step;
  }

  goRight(step = 1) {
    this.coords.x += step;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    if ((this.coords !== null) && (this.coords !== undefined)) {
      this.coords.z = (!Object.values(this.coords)[2])
        ? 0
        : Object.values(this.coords)[2];
    }
  }

  goUp(step = 1) {
    this.coords.z += step;
  }

  goDown(step = 1) {
    this.coords.z -= step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion,);

    this.currentLoad = (!currentLoad)
      ? null
      : currentLoad;
    this.maxLoadWeight = maxLoadWeight;
  }

  hookLoad(cargo) {
    if ((cargo.weight <= this.maxLoadWeight) && (this.currentLoad === null)) {
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
