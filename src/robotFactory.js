/* eslint-disable space-before-function-paren */
'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype.goForward = function (step = 1) {
  this.coords.y += step;
};

BaseRobot.prototype.goBack = function (step = 1) {
  this.coords.y -= step;
};

BaseRobot.prototype.goRight = function (step = 1) {
  this.coords.x += step;
};

BaseRobot.prototype.goLeft = function (step = 1) {
  this.coords.x -= step;
};

BaseRobot.prototype.getInfo = function () {
  const { name, chipVersion, weight } = this;

  return `Robot: ${name}, Chip version: ${chipVersion}, Weight: ${weight}`;
};

function FlyingRobot(name, weight, coords, chipVersion) {
  BaseRobot.call(this, name, weight, coords, chipVersion);
  this.coords.z = 0;
}

FlyingRobot.prototype.goUp = function (step = 1) {
  this.coords.z += step;
};

FlyingRobot.prototype.goDown = function (step = 1) {
  this.coords.z -= step;
};

FlyingRobot.prototype.__proto__ = BaseRobot.prototype;

function DeliveryDrone(
  name,
  weight,
  coords,
  chipVersion,
  maxLoadWeight,
  currentLoad
) {
  FlyingRobot.call(this, name, weight, coords, chipVersion);
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype.hookLoad = function (cargo) {
  if (cargo.weight <= this.maxLoadWeight && this.currentLoad === null) {
    this.currentLoad = {
      weight: cargo.weight,
      description: `cargo ${cargo.weight} weight`,
    };
  }
};

DeliveryDrone.prototype.unhookLoad = function () {
  this.currentLoad = null;
};

DeliveryDrone.prototype.__proto__ = FlyingRobot.prototype;

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
