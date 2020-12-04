/* eslint-disable max-len */
/* eslint-disable space-before-function-paren */
'use strict';

function BaseRobot(name, weight, coords = {
  x: 0, y: 0,
}, chipVersion, maxLoadWeight, currentLoad) {
  // implement
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
};

BaseRobot.prototype.goForward = function (step = 1) {
  this.coords.y += step;

  return this;
};

BaseRobot.prototype.goLeft = function (step = 1) {
  this.coords.x += -step;

  return this;
};

BaseRobot.prototype.goRight = function (step = 1) {
  this.coords.x += step;

  return this;
};

BaseRobot.prototype.goBack = function (step = 1) {
  this.coords.y += -step;

  return this;
};

BaseRobot.prototype.getInfo = function () {
  return `Robot: ${this.name}, Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
};

function FlyingRobot() {
  // implement
  BaseRobot.call(this, ...arguments);

  this.coords.z = 0;
}

FlyingRobot.prototype.goUp = function (step = 1) {
  this.coords.z += step;

  return this;
};

FlyingRobot.prototype.goDown = function (step = 1) {
  this.coords.z += -step;

  return this;
};

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);

function DeliveryDrone() {
  // implement
  FlyingRobot.call(this, ...arguments);
}

DeliveryDrone.prototype.hookLoad = function (cargo) {
  if (cargo.weight < this.maxLoadWeight) {
    this.currentLoad = cargo;
  }
};

DeliveryDrone.prototype.unhookLoad = function () {
  this.currentLoad = null;
};

Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
