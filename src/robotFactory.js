'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype = {
  goForward(step = 1) {
    this.coords.y += step;
  },
  goBack(step = 1) {
    this.coords.y -= step;
  },
  goLeft(step = 1) {
    this.coords.x -= step;
  },
  goRight(step = 1) {
    this.coords.x += step;
  },

  getInfo() {
    const str1 = `Robot: ${this.name}`;
    const str2 = `Chip version: ${this.chipVersion}`;
    const str3 = `Weight: ${this.weight}`;

    return `${str1}, ${str2}, ${str3}`;
  },
};

function FlyingRobot(name, weight, coords, chipVersion) {
  this.___proto___ = BaseRobot;
  this.coords = coords;
  this.coords.z = 0;
}

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);

FlyingRobot.prototype.goUp = function(step = 1) {
  this.coords.z += step;
};

FlyingRobot.prototype.goDown = function(step = 1) {
  this.coords.z -= step;
};

function DeliveryDrone(name, weight, coords, chipVersion,
  maxLoadWeight, currentLoad) {
  this.___proto___ = FlyingRobot;
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

DeliveryDrone.prototype.hookLoad = function(loadObj) {
  if (loadObj.weight <= this.maxLoadWeight && this.currentLoad === null) {
    this.currentLoad = loadObj;
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
