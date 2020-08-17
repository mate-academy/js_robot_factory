'use strict';

BaseRobot.prototype = {
  goForward(step = 1) {
    if (step > 0) {
      this.coords.y += step;
    }
  },
  goBack(step = 1) {
    if (step > 0) {
      this.coords.y -= step;
    }
  },
  goLeft(step = 1) {
    if (step > 0) {
      this.coords.x -= step;
    }
  },
  goRight(step = 1) {
    if (step > 0) {
      this.coords.x += step;
    }
  },
  getInfo() {
    return `Robot: ${this.name}, Chip version: ${
      this.chipVersion
    }, Weight: ${this.weight}`;
  },
};

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
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

function FlyingRobot(name, weight, coords, chipVersion) {
  this.coords = coords;
  this.coords.z = 0;
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

function DeliveryDrone(
  name,
  weight,
  coords,
  chipVersion,
  maxLoadWeight,
  currentLoad
) {
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
