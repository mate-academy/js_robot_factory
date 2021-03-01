'use strict';

function BaseRobot(
  name,
  weight,
  coords = {
    x: 0,
    y: 0,
  },
  chipVersion
) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype = {
  goForward(step = 1) {
    this.coords.y += step;
  },

  goBack(step = 1) {
    this.coords.y -= step;
  },

  goLeft(step = 1) {
    this.coords.x -= step;
  },

  goRight(step = 1) {
    this.coords.x += step;
  },

  getInfo() {
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}, `
  + `Weight: ${this.weight}`;
  },
};

function FlyingRobot(
  name,
  weight,
  coords = {
    x: 0,
    y: 0,
    z: 0,
  },
  chipVersion
) {
  BaseRobot.call(this, ...arguments);
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

Object.assign(FlyingRobot.prototype, BaseRobot.prototype);

function DeliveryDrone(
  name,
  weight,
  coords,
  chipVersion,
  maxLoadWeight,
  currentLoad
) {
  FlyingRobot.call(this, ...arguments);
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype = {
  hookLoad(cargo) {
    if (cargo.weight <= this.maxLoadWeight && this.currentLoad === null) {
      this.currentLoad = cargo;
    }
  },

  unhookLoad(weight) {
    this.currentLoad = null;
  },
};

Object.assign(DeliveryDrone.prototype, BaseRobot.prototype,
  FlyingRobot.prototype);

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
