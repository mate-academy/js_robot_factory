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
    // eslint-disable-next-line max-len
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  },
};

function FlyingRobot(name, weight, coords, chipVersion) {
  const flyingBaseRobot = new BaseRobot(name, weight, coords, chipVersion);

  flyingBaseRobot.coords.z = 0;

  return flyingBaseRobot;
}

FlyingRobot.prototype = BaseRobot.prototype;

FlyingRobot.prototype.goUp = function(step = 1) {
  this.coords.z += step;
};

FlyingRobot.prototype.goDown = function(step = 1) {
  this.coords.z -= step;
};

// eslint-disable-next-line max-len
function DeliveryDrone(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
  const drone = new FlyingRobot(name, weight, coords, chipVersion);

  drone.maxLoadWeight = maxLoadWeight;
  drone.currentLoad = currentLoad;

  return drone;
};

DeliveryDrone.prototype = FlyingRobot.prototype;

DeliveryDrone.prototype.hookLoad = function(load) {
  if (load.weight <= this.maxLoadWeight) {
    this.currentLoad = load;
  }
};

DeliveryDrone.prototype.unhookLoad = function() {
  this.currentLoad = null;
};

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
