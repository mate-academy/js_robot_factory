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
  return `Robot: ${this.name}, `
  + `Chip version: ${this.chipVersion}, `
  + `Weight: ${this.weight}`;
};

FlyingRobot.prototype = BaseRobot.prototype;

function FlyingRobot(name, weight, coords, chipVersion) {
  BaseRobot.call(this, name, weight, coords, chipVersion);

  this.coords.z = 0;
};

FlyingRobot.prototype.goUp = function(step = 1) {
  this.coords.z += step;
};

FlyingRobot.prototype.goDown = function(step = 1) {
  this.coords.z -= step;
};

DeliveryDrone.prototype = FlyingRobot.prototype;

function DeliveryDrone(name,
  weight,
  coords,
  chipVersion,
  maxLoadWeight,
  currentLoad) {
  BaseRobot.call(this, name, weight, coords, chipVersion);
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
};

DeliveryDrone.prototype.hookLoad = function(cargo) {
  if (cargo.weight <= this.maxLoadWeight && this.currentLoad === null) {
    this.currentLoad = cargo;

    return cargo;
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
