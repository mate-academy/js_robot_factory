'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.chipVersion = chipVersion;
  this.coords = coords;
  this.weight = weight;
};

BaseRobot.prototype = {
  goForward: function(step = 1) {
    this.coords.y += step;

    return this.coords.y;
  },
  goBack: function(step = 1) {
    this.coords.y -= step;

    return this.coords.y;
  },
  goRight: function(step = 1) {
    this.coords.x += step;

    return this.coords.x;
  },
  goLeft: function(step = 1) {
    this.coords.x += step;

    return this.coords.x;
  },
  getInfo: function() {
    const robot = `Robot: ${this.name}, `;

    return robot + `Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  },
};

function FlyingRobot(name, weight, coords, chipVersion) {
  BaseRobot.call(this, name, weight, coords, chipVersion);
  this.coords.z = 0;
};

FlyingRobot.prototype = {
  goUp: function(step = 1) {
    this.coords.z += step;

    return this.coords.z;
  },
  goDown: function(step = 1) {
    this.coords.z -= step;

    return this.coords.z;
  },
};

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);

function DeliveryDrone(name, weight,
  coords, chipVersion, maxLoadWeight, currentLoad) {
  FlyingRobot.call(this, name, weight, coords, chipVersion);
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
};

DeliveryDrone.prototype = {
  unhookLoad: function() {
    this.currentLoad = null;

    return this.currnetLoad;
  },
  hookLoad: function(obj) {
    if (obj.weight < this.maxLoadWeight) {
      this.currentLoad = obj;

      return this.currentLoad;
    }
  },
};

Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
