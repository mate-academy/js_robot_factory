'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;

    if (Object.keys(coords).length < 2) {
      if (Object.keys(coords).includes('x')) {
        this.coords = coords;
        this.coords.y = 0;
      } else if (Object.keys(coords).includes('y')) {
        this.coords = coords;
        this.coords.x = 0;
      } else {
        this.coords = {
          x: 0, y: 0,
        };
      }
    } else {
      this.coords = coords;
    }
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
    return 'Robot: ' + this.name + ', Chip version: '
    + this.chipVersion + ', Weight: ' + this.weight;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    if (Object.keys(coords).length < 3) {
      this.coords = {
        x: 0, y: 0, z: 0,
      };
    } else {
      this.coords = coords;
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
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;

    if (!currentLoad) {
      this.currentLoad = null;
    } else {
      this.currentLoad = currentLoad;
    }
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
