'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  // implement
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
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}, `
    + `Weight: ${this.weight}`;
  },
};

function FlyingRobot(name, weight, coords, chipVersion) {
  // implement
  this.coords = {
    z: 0,
  };
}

FlyingRobot.prototype.goUp = function(step = 1) {
  this.coords.z += step;
};

FlyingRobot.prototype.goDown = function(step = 1) {
  this.coords.z -= step;
};

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);

function DeliveryDrone(
  name, weight, coords, chipVersion, maxLoadWeight, currentLoad,
) {
  // implement
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype = {
  hookLoad(cargo) {
    if (cargo.weight <= this.maxLoadWeight && !this.currentLoad) {
      this.currentLoad = cargo;
    }
  },

  unhookLoad() {
    this.currentLoad = null;
  },
};

Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
