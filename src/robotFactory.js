'use strict';

class BaseRobot {
  constructor(...options) {
    const [name, weight, position, chipVersion] = [...options];

    this.name = name;
    this.weight = weight;

    this.coords = {
      x: position.x || 0,
      y: position.y || 0,
    };
    this.chipVersion = chipVersion;
  }

  goForward(step = 1) {
    this.coords.y += step;
  };
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
    return 'Robot: '
    + this.name + ', Chip version: '
    + this.chipVersion + ', Weight: ' + this.weight;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(...options) {
    const [name, weight, position, chipVersion] = [...options];

    super(name, weight, position, chipVersion);
    this.coords.z = position.z || 0;
  }
  goUp(step = 1) {
    this.coords.z += step;
  }
  goDown(step = 1) {
    this.coords.z -= step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(...options) {
    const [name, weight, coords, chipVersion, maxLoadWeight,
      currentLoad] = [...options];

    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad || null;
  }

  hookLoad(cargo) {
    if (this.currentLoad === null && cargo.weight <= this.maxLoadWeight) {
      this.currentLoad = cargo;
    }
  }
  unhookLoad(cargo) {
    this.currentLoad = null;
  }
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
