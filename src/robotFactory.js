'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;

  return this;
}

BaseRobot.prototype = {
  goForward: function(step = 1) {
    this.coords.y += step;
  },

  goLeft: function(step = 1) {
    this.coords.x -= step;
  },

  goRight: function(step = 1) {
    this.coords.x += step;
  },

  goBack: function(step = 1) {
    this.coords.y -= step;
  },

  getInfo: function() {
    // eslint-disable-next-line max-len
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  },
};

function FlyingRobot(...args) {
  BaseRobot.apply(this, args);

  this.coords.z = 0;

  return this;
}

FlyingRobot.prototype = {
  goUp: function(step = 1) {
    this.coords.z += step;
  },

  goDown: function(step = 1) {
    this.coords.z -= step;
  },

  __proto__: BaseRobot.prototype,
};

function DeliveryDrone(...args) {
  FlyingRobot.apply(this, args);

  this.maxLoadWeight = args[4];
  this.currentLoad = args[5];

  return this;
}

DeliveryDrone.prototype = {
  hookLoad: function(cargo) {
    if (cargo.weight < this.maxLoadWeight) {
      this.currentLoad = cargo;
    }
  },
  unhookLoad: function() {
    this.currentLoad = null;
  },

  __proto__: FlyingRobot.prototype,
};

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
