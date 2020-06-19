'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.chipVersion = chipVersion;
  this.coords = coords;
}

BaseRobot.prototype.goForward = function(step = 1) {
  this.coords.y += step;

  return this;
};

BaseRobot.prototype.goBack = function(step = 1) {
  this.coords.y -= step;

  return this;
};

BaseRobot.prototype.goRight = function(step = 1) {
  this.coords.x += step;

  return this;
};

BaseRobot.prototype.goLeft = function(step = 1) {
  this.coords.x -= step;

  return this;
};

BaseRobot.prototype.getInfo = function() {
  return `Robot: ${this.name}, Chip version: ${this.chipVersion}, `
  + `Weight: ${this.weight}`;
};

function FlyingRobot(name, weigth, coords, chipVersion) {
  BaseRobot.call(this, name, weigth, coords, chipVersion);
  this.coords.z = 0;
}

FlyingRobot.prototype = BaseRobot.prototype;

FlyingRobot.prototype.goUp = function(step = 1) {
  this.coords.z += step;

  return this;
};

FlyingRobot.prototype.goDown = function(step = -1) {
  this.coords.z += step;

  return this;
};

function DeliveryDrone(name, weigth, coords,
  chipVersion, maxLoadWeight, currentLoad) {
  FlyingRobot.call(this, name, weigth, coords, chipVersion);
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype = FlyingRobot.prototype;

DeliveryDrone.prototype.hookLoad = function(newRobot) {
  if (newRobot.weight < this.maxLoadWeight) {
    this.currentLoad = newRobot;
  }

  return this;
};

DeliveryDrone.prototype.unhookLoad = function() {
  this.currentLoad = null;

  return this;
};

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
