'use strict';

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
    return `Robot: ${this.name}, Chip version: ${this.chipVersion},
    Weight: ${this.weight}`;
  },
};

function BaseRobot(name, weight, coords = {}, chipVersion) {
  const { x = 0, y = 0 } = coords;

  this.name = name;

  this.weight = weight;

  this.coords = {
    x: x,
    y: y,
  };
  this.chipVersion = chipVersion;
}

FlyingRobot.prototype = {
  __proto__: BaseRobot.prototype,

  goUp(step = 1) {
    this.coords.z += step;
  },

  goDown(step = 1) {
    this.coords.z -= step;
  },
};

function FlyingRobot(name, weight, coords, chipVersion) {
  BaseRobot.call(this, name, weight, coords, chipVersion);

  this.coords.z = 0;
}

DeliveryDrone.prototype = {
  __proto__: FlyingRobot.prototype,

  hookLoad(obj) {
    if (obj.weight <= this.maxLoadWeight && this.currentLoad === null) {
      this.currentLoad = obj;
    }
  },

  unhookLoad() {
    this.currentLoad = null;
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
  FlyingRobot.call(this, name, weight, coords, chipVersion);

  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
