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
  this.chipVersion = chipVersion;

  this.coords = coords;
}

BaseRobot.prototype.goForward = function(step) {
  if (step) {
    this.coords.y += step;
  } else {
    this.coords.y++;
  }
};

BaseRobot.prototype.goBack = function(step) {
  if (step) {
    this.coords.y -= step;
  } else {
    this.coords.y--;
  }
};

BaseRobot.prototype.goRight = function(step) {
  if (step) {
    this.coords.x += step;
  } else {
    this.coords.x++;
  }
};

BaseRobot.prototype.goLeft = function(step) {
  if (step) {
    this.coords.x -= step;
  } else {
    this.coords.x--;
  }
};

BaseRobot.prototype.getInfo = function() {
  return `Robot: ${this.name},\
 Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
};

function FlyingRobot(
  name,
  weight,
  coords,
  chipVersion
) {
  BaseRobot.prototype.name = name;
  BaseRobot.prototype.weight = weight;
  BaseRobot.prototype.coords = coords;
  BaseRobot.prototype.chipVersion = chipVersion;
  this.coords.z = 0;
}

FlyingRobot.prototype.__proto__ = BaseRobot.prototype;

FlyingRobot.prototype.goUp = function(step) {
  if (step) {
    this.coords.z += step;
  } else {
    this.coords.z++;
  }
};

FlyingRobot.prototype.goDown = function(step) {
  if (step) {
    this.coords.z -= step;
  } else {
    this.coords.z--;
  }
};

function DeliveryDrone(
  name,
  weight,
  coords,
  chipVersion,
  maxLoadWeight,
  currentLoad = null
) {
  BaseRobot.prototype.name = name;
  BaseRobot.prototype.weight = weight;
  BaseRobot.prototype.coords = coords;
  BaseRobot.prototype.chipVersion = chipVersion;
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype.__proto__ = FlyingRobot.prototype;

DeliveryDrone.prototype.hookLoad = function(load) {
  if (!this.currentLoad && load.weight <= this.maxLoadWeight) {
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
