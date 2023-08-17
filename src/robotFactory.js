'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = {
      x: coords.x || BaseRobot.DEFAULT_COORDS.x,
      y: coords.y || BaseRobot.DEFAULT_COORDS.y,
    };
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
    return (
      'Robot: ' + this.name + ', '
      + 'Chip version: ' + this.chipVersion + ', '
      + 'Weight: ' + this.weight
    );
  }
}

BaseRobot.DEFAULT_COORDS = {
  x: 0,
  y: 0,
  z: 0,
};

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords.z = coords.z || BaseRobot.DEFAULT_COORDS.z;
  }

  goUp(step = 1) {
    this.coords.z += step;
  }

  goDown(step = 1) {
    this.coords.z -= step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(
    name,
    weight,
    chipVersion,
    coords,
    maxLoadWeight,
    currentLoad
  ) {
    super(name, weight, chipVersion, coords);

    this.currentLoad = currentLoad || null;
    this.maxLoadWeight = maxLoadWeight;
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
