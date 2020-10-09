'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype = {
  goForward(step = 1) {
    this.coords.y += step;

    return this;
  },

  goBack(step = 1) {
    this.coords.y -= step;

    return this;
  },

  goLeft(step = 1) {
    this.coords.x -= step;

    return this;
  },

  goRight(step = 1) {
    this.coords.x += step;

    return this;
  },

  getInfo() {
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}`
    + `, Weight: ${this.weight}`;
  },
};

function FlyingRobot(name, weight, coords, chipVersion) {
  BaseRobot.call(this, ...arguments);

  this.coords.z = 0;
};

FlyingRobot.prototype = {
  ...BaseRobot.prototype,

  goUp(step = 1) {
    this.coords.z += step;

    return this;
  },

  goDown(step = 1) {
    this.coords.z -= step;

    return this;
  },
};

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
};

DeliveryDrone.prototype = {
  ...FlyingRobot.prototype,

  hookLoad(load) {
    if (load.weight < this.maxLoadWeight) {
      this.currentLoad = load;
    }

    return this;
  },

  unhookLoad() {
    this.currentLoad = null;

    return this;
  },
};

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
