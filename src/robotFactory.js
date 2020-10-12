'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype = {
  goForward: function(step = 1) {
    this.coords.y += step;
  },

  goBack: function(step = 1) {
    this.coords.y -= step;
  },

  goRight: function(step = 1) {
    this.coords.x += step;
  },

  goLeft: function(step = 1) {
    this.coords.x -= step;
  },

  getInfo: function() {
    // eslint-disable-next-line max-len
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  },
};

function FlyingRobot(name, weight, coords, chipVersion) {
  BaseRobot.call(this, ...arguments);
  this.coords.z = 0;
}

FlyingRobot.prototype = {
  ...BaseRobot.prototype,

  goUp: function(step = 1) {
    this.coords.z += step;

    return this;
  },

  goDown: function(step = 1) {
    this.coords.z -= step;

    return this;
  },
};

// eslint-disable-next-line max-len
function DeliveryDrone(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
  FlyingRobot.call(this, ...arguments);

  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype = {
  ...FlyingRobot.prototype,

  hookLoad(loadObject) {
    if (loadObject.weight <= this.maxLoadWeight) {
      this.currentLoad = loadObject;
    }
  },

  unhookLoad() {
    this.currentLoad = null;
  },
};

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
