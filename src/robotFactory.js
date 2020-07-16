'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
};

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
  return `Robot: ${this.name}, Chip version: ${this.chipVersion},`
    + ` Weight: ${this.weight}`;
};

function FlyingRobot(name, weight, coords, chipVersion) {
  BaseRobot.call(this, name, weight, coords, chipVersion);
  this.coords.z = 0;
}
FlyingRobot.prototype.__proto__ = BaseRobot.prototype;

FlyingRobot.prototype.__proto__.goUp = function(step = 1) {
  this.coords.z += step;

  return this;
};

FlyingRobot.prototype.__proto__.goDown = function(step = -1) {
  this.coords.z += step;

  return this;
};

function DeliveryDrone(name, weight, coords, chipVersion,
  maxLoadWeight, currentLoad) {
  FlyingRobot.call(this, name, weight, coords, chipVersion);
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
};

DeliveryDrone.prototype.hookLoad = function(kg) {
  if (kg.weight < this.maxLoadWeight) {
    this.currentLoad = kg;
  }

  return this;
};

DeliveryDrone.prototype.__proto__ = FlyingRobot.prototype;

DeliveryDrone.prototype.__proto__.hookLoad = function(kg) {
  if (kg.weight < this.maxLoadWeight) {
    this.currentLoad = kg;
  }

  return this;
};

DeliveryDrone.prototype.__proto__.unhookLoad = function() {
  this.currentLoad = null;

  return this;
};

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
