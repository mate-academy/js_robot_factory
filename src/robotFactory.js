'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype.getInfo = function() {
  return `Robot: ${this.name}, `
  + `Chip version: ${this.chipVersion}, `
  + `Weight: ${this.weight}`;
};

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

function FlyingRobot(name, weight, coords, chipVersion) {
  const robot = new BaseRobot(name, weight, coords, chipVersion);

  robot.coords.z = 0;

  return robot;
}

FlyingRobot.prototype = BaseRobot.prototype;

BaseRobot.prototype.goUp = function(step = 1) {
  this.coords.z += step;
};

BaseRobot.prototype.goDown = function(step = 1) {
  this.coords.z -= step;
};

function DeliveryDrone(
  name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
  const robot = new FlyingRobot(name, weight, coords, chipVersion);

  robot.maxLoadWeight = maxLoadWeight;
  robot.currentLoad = currentLoad;

  return robot;
}

DeliveryDrone.prototype = FlyingRobot.prototype;

DeliveryDrone.prototype.hookLoad = function(cargo) {
  if (cargo.weight < this.maxLoadWeight) {
    this.currentLoad = cargo;
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
