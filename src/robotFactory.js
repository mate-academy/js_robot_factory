'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype.goForward = function(step = 1) {
  this.coords.y += step;
};

BaseRobot.prototype.goBack = function(step = 1) {
  this.coords.y -= step;
};

BaseRobot.prototype.goRight = function(step = 1) {
  this.coords.x += step;
};

BaseRobot.prototype.goLeft = function(step = 1) {
  this.coords.x -= step;
};

BaseRobot.prototype.getInfo = function() {
  return `Robot: ${this.name}, Chip version: ${this.chipVersion},`
  + ` Weight: ${this.weight}`;
};

function FlyingRobot(name, weight, coords, chipVersion) {
  Object.assign(this, new BaseRobot(name, weight, coords, chipVersion));

  this.coords.z = 0;
}

FlyingRobot.prototype.goUp = function(step = 1) {
  this.coords.z += step;
};

FlyingRobot.prototype.goDown = function(step = 1) {
  this.coords.z -= step;
};

function DeliveryDrone(name, weight, coords,
  chipVersion, maxLoadWeight, currentLoad) {
  Object.assign(this, new FlyingRobot(name, weight, coords, chipVersion));
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype.hookLoad = function(load) {
  if (load.weight <= this.maxLoadWeight && this.currentLoad === null) {
    this.currentLoad = load;
  }
};

DeliveryDrone.prototype.unhookLoad = function() {
  this.currentLoad = null;
};

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);
Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
