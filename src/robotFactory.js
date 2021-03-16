'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype.goForward = function(step) {
  if (step) {
    this.coords.y += step;
  }

  this.coords.y++;
};

BaseRobot.prototype.goBack = function(step) {
  if (step) {
    this.coords.y -= step;
  }

  this.coords.y--;
};

BaseRobot.prototype.goLeft = function(step) {
  if (step) {
    this.coords.x -= step;
  }

  this.coords.x--;
};

BaseRobot.prototype.goRight = function(step) {
  if (step) {
    this.coords.x += step;
  }

  this.coords.x++;
};

BaseRobot.prototype.getInfo = function() {
  return `Robot: ${this.name}, Chip version: ${this.chipVersion}`
  + `, Weight: ${this.weight}`;
};

FlyingRobot.prototype = BaseRobot.prototype;

function FlyingRobot(name, weight, coords, chipVersion) {
  BaseRobot.call(this, name, weight, coords, chipVersion);
  this.coords.z = 0;
};

FlyingRobot.prototype.goUp = function(step) {
  if (step) {
    this.coords.z += step;
  }

  this.coords.z++;
};

FlyingRobot.prototype.goDown = function(step) {
  if (step) {
    this.coords.z -= step;
  }

  this.coords.z--;
};

DeliveryDrone.prototype = FlyingRobot.prototype;

function DeliveryDrone(
  name,
  weight,
  coords,
  chipVersion,
  maxLoadWeight,
  currentLoad
) {
  BaseRobot.call(this, name, weight, coords, chipVersion);
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
};

DeliveryDrone.prototype.hookLoad = function(load) {
  if (load.weight <= this.maxLoadWeight && this.currentLoad === null) {
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
