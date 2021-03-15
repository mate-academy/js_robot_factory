'use strict';

function BaseRobot(name = '',
  weight = 0,
  coords = {
    x: 0,
    y: 0,
  },
  chipVersion,
) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
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

BaseRobot.prototype.getInfo = function() {
  return `Robot: ${this.name}, `
    + `Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
};

function FlyingRobot(name, chipVersion) {
  BaseRobot.call(this, name, chipVersion);
  this.coords.z = 0;
};

FlyingRobot.prototype = BaseRobot.prototype;

FlyingRobot.prototype.goUp = function(step = 1) {
  this.coords.z += step;
};

FlyingRobot.prototype.goDown = function(step = 1) {
  this.coords.z -= step;
};

function DeliveryDrone(name, weight, coords, chipVersion,
  maxLoadWeight, currentLoad) {
  FlyingRobot.call(this, name, weight, coords, chipVersion);
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
};

DeliveryDrone.prototype = FlyingRobot.prototype;

DeliveryDrone.prototype.hookLoad = function(currentLoad) {
  if (!this.currentLoad && currentLoad
    && (currentLoad.weight <= this.maxLoadWeight)) {
    this.currentLoad = currentLoad;
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
