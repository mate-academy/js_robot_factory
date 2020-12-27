'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = { ...coords };
  this.chipVersion = chipVersion;
}

BaseRobot.prototype = {
  goForward(step = 1) {
    this.coords.y += step;
  },

  goBack(step = 1) {
    this.coords.y -= step;
  },

  goRight(step = 1) {
    this.coords.x += step;
  },

  goLeft(step = 1) {
    this.coords.x -= step;
  },

  getInfo() {
    const string = 'Robot: '
      + this.name + ', Chip version: '
      + this.chipVersion + ', Weight: ' + this.weight;

    return string;
  },
};

function FlyingRobot(name, weight, coords, chipVersion) {
  Object.assign(this, new BaseRobot(name, weight, coords, chipVersion));

  this.coords = {
    ...coords,
    z: 0,
  };
  this.chipVersion = chipVersion;
}

FlyingRobot.prototype = {
  goUp(step = 1) {
    this.coords.z += step;
  },

  goDown(step = 1) {
    this.coords.z -= step;
  },
};

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);

function DeliveryDrone(
  name,
  weight,
  coords,
  chipVersion,
  maxLoadWeight,
  currentLoad) {
  Object.assign(this, new BaseRobot(name, weight, coords, chipVersion));

  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype = {
  hookLoad(loadObject) {
    if (loadObject.weight <= this.maxLoadWeight && this.currentLoad === null) {
      this.currentLoad = loadObject;
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
