'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype.goForward = function goForward(step = 1) {
  this.coords.y += step;
};

BaseRobot.prototype.goBack = function goForward(step = 1) {
  this.coords.y -= step;
};

BaseRobot.prototype.goLeft = function goForward(step = 1) {
  this.coords.x -= step;
};

BaseRobot.prototype.goRight = function goForward(step = 1) {
  this.coords.x += step;
};

BaseRobot.prototype.getInfo = function getInfo() {
  return `Robot: ${this.name}, `
   + `Chip version: ${this.chipVersion}, `
   + `Weight: ${this.weight}`;
};

function FlyingRobot(name, weight, coords, chipVersion) {
  BaseRobot.call(this, ...arguments);
  this.coords.z = 0;
}

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);

FlyingRobot.prototype.goUp = function goUp(step = 1) {
  this.coords.z += step;
};

FlyingRobot.prototype.goDown = function goUp(step = 1) {
  this.coords.z -= step;
};

function DeliveryDrone(
  name,
  weight,
  coords,
  chipVersion,
  maxLoadWeight,
  currentLoad
) {
  FlyingRobot.call(this, ...arguments);
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

DeliveryDrone.prototype.hookLoad = function hookLoad(cargo) {
  if (cargo.weight < this.maxLoadWeight) {
    this.currentLoad = cargo;
  }
};

DeliveryDrone.prototype.unhookLoad = function unhookLoad() {
  this.currentLoad = null;
};

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
