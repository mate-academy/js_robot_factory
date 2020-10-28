'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype = {
  getInfo() {
    // eslint-disable-next-line max-len
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  },

  goForward(step = 1) {
    this.coords.y += step;
  },

  goBack(step = 1) {
    this.coords.y -= step;
  },

  goRight(step = 1) {
    this.coords.x += step;
  },

  goLeft(step = 1) {
    this.coords.x += step;
  },
};

function FlyingRobot(name, weight, coords, chipVersion) {
  const testRobot = new BaseRobot(name, weight, coords, chipVersion);

  for (const key in testRobot) {
    if (testRobot.hasOwnProperty(key)) {
      this[key] = testRobot[key];
    }
  }
  this.coords.z = 0;
}

FlyingRobot.prototype = {
  goUp(step = 1) {
    this.coords.z += step;
  },

  goDown(step = 1) {
    this.coords.z -= step;
  },
};

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);

function DeliveryDrone(
  name,
  weight,
  coords,
  chipVersion,
  maxLoadWeight,
  currentLoad,
) {
  const newFlyingRobot = new FlyingRobot(name, weight, coords, chipVersion);

  for (const key in newFlyingRobot) {
    if (newFlyingRobot.hasOwnProperty(key)) {
      this[key] = newFlyingRobot[key];
    }
  }

  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype = {
  hookLoad(load) {
    if (load.weight < this.maxLoadWeight) {
      this.currentLoad = load;
    }
  },

  unhookLoad() {
    this.currentLoad = null;
  },
};

Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
