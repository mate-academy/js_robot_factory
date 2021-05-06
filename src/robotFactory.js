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
  const name = `Robot: ${this.name}, `;
  const version = `Chip version: ${this.chipVersion}, `;
  const weight = `Weight: ${this.weight}`;

  return name + version + weight;
};

function FlyingRobot(name, weight, coords, chipVersion) {
  const result = new BaseRobot(name, weight, coords, chipVersion);

  result.coords.z = 0;

  return result;
}

FlyingRobot.prototype = BaseRobot.prototype;
FlyingRobot.prototype.constructor = FlyingRobot;

FlyingRobot.prototype.goUp = function(step = 1) {
  this.coords.z += step;
};

FlyingRobot.prototype.goDown = function(step = 1) {
  this.coords.z -= step;
};

function DeliveryDrone(name, weight, coords, chipVersion,
  maxLoadWeight, currentLoad) {
  const result = new FlyingRobot(name, weight, coords, chipVersion);

  result.maxLoadWeight = maxLoadWeight;
  result.currentLoad = currentLoad;

  return result;
}

DeliveryDrone.prototype = FlyingRobot.prototype;
DeliveryDrone.prototype.constructor = DeliveryDrone;

DeliveryDrone.prototype.hookLoad = function(object) {
  if (object.weight <= this.maxLoadWeight && this.currentLoad === null) {
    this.currentLoad = object;
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
