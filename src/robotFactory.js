'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype.getInfo = function() {
  const { name, chipVersion, weight } = this;

  return `Robot: ${name}, Chip version: ${chipVersion}, Weight: ${weight}`;
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

function FlyingRobot() {
  const robot = new BaseRobot(...arguments);

  robot.coords.z = 0;

  return robot;
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
