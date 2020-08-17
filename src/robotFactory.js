'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.coords = coords;
  this.chipVersion = chipVersion;
  this.weight = weight;
}

BaseRobot.prototype = {
  getInfo() {
    return (
      `Robot: ${this.name}, Chip version: ${
        this.chipVersion}, Weight: ${this.weight}`
    );
  },
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
};

function FlyingRobot(name, weight, coords, chipVersion) {
  BaseRobot.apply(this);
  this.name = name;

  this.coords = {
    ...coords,
    x: 0,
    y: 0,
    z: 0,
  };
  this.chipVersion = chipVersion;
  this.weight = weight;
}

FlyingRobot.prototype = {
  ...BaseRobot.prototype,
  goUp(step = 1) {
    this.coords.z += step;
  },
  goDown(step = 1) {
    this.coords.z -= step;
  },
};

function DeliveryDrone(name, weight, coords, chipVersion,
  maxLoadWeight, currentLoad) {
  FlyingRobot.apply(this);
  this.name = name;

  this.coords = {
    ...coords,
    x: 0,
    y: 0,
    z: 0,
  };
  this.chipVersion = chipVersion;
  this.weight = weight;
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype = {
  ...FlyingRobot.prototype,
  ...BaseRobot.prototype,
  hookLoad(cargo) {
    if (cargo.weight < this.maxLoadWeight) {
      this.currentLoad = cargo;
    }
  },
  unhookLoad() {
    this.currentLoad = null;
  },
};

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
