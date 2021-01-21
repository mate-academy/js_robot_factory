'use strict';

function BaseRobot(name, weight, coords = {}, chipVersion) {
  const {
    x = 0,
    y = 0,
  } = coords;

  this.name = name;
  this.weight = weight;

  this.coords = {
    x: x,
    y: y,
  };
  this.chipVersion = chipVersion;

  BaseRobot.prototype.goBack = function(step = 1) {
    this.coords.y -= step;

    return this;
  };

  BaseRobot.prototype.goForward = function(step = 1) {
    this.coords.y += step;

    return this;
  };

  BaseRobot.prototype.goLeft = function(step = 1) {
    this.coords.x -= step;

    return this;
  };

  BaseRobot.prototype.goRight = function(step = 1) {
    this.coords.x += step;

    return this;
  };

  BaseRobot.prototype.getInfo = function() {
    return `Robot: ${
      this.name}, Chip version: ${
      this.chipVersion}, Weight: ${
      this.weight}`;
  };
}

FlyingRobot.prototype = new BaseRobot();
DeliveryDrone.prototype = new FlyingRobot();

function FlyingRobot(name, weight, coords = {}, chipVersion) {
  const {
    x = 0,
    y = 0,
    z = 0,
  } = coords;

  this.name = name;
  this.weight = weight;

  this.coords = {
    x: x,
    y: y,
    z: z,
  };
  this.chipVersion = chipVersion;

  FlyingRobot.prototype.goUp = function(step = 1) {
    this.coords.z += step;

    return this;
  };

  FlyingRobot.prototype.goDown = function(step = 1) {
    this.coords.z -= step;

    return this;
  };
}

function DeliveryDrone(name, weight, coords = {}, chipVersion,
  maxLoadWeight, currentLoad) {
  const {
    x = 0,
    y = 0,
    z = 0,
  } = coords;

  this.name = name;
  this.weight = weight;

  this.coords = {
    x: x,
    y: y,
    z: z,
  };
  this.chipVersion = chipVersion;
  this.currentLoad = currentLoad;
  this.maxLoadWeight = maxLoadWeight;

  DeliveryDrone.prototype.hookLoad = function(cargo) {
    if (cargo.weight <= this.maxLoadWeight && this.currentLoad === null) {
      this.currentLoad = cargo;
    };
  };

  DeliveryDrone.prototype.unhookLoad = function() {
    this.currentLoad = null;
  };
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
