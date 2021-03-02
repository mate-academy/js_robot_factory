'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.chipVersion = chipVersion;

  this.coords = coords;
}

BaseRobot.prototype = {
  goForward(step = 1) {
    this.coords.y += step;
  },

  goRight(step = 1) {
    this.coords.x += step;
  },

  goBack(step = 1) {
    this.coords.y -= step;
  },

  goLeft(step = 1) {
    this.coords.x -= step;
  },

  getInfo() {
    return 'Robot: ' + this.name + ', Chip version: '
    + this.chipVersion + ', Weight: ' + this.weight;
  },
};

function FlyingRobot(name, weight, coords, chipVersion) {
  BaseRobot.call(this, name, weight, coords, chipVersion);
  this.coords.z = 0;
}

FlyingRobot.prototype = {
  goUp(step = 1) {
    this.coords.z += step;
  },
  goDown(step = 1) {
    this.coords.z -= step;
  },
};

Object.assign(FlyingRobot.prototype, BaseRobot.prototype);

function DeliveryDrone(
  name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
  FlyingRobot.call(this, name, weight, coords,
    chipVersion, maxLoadWeight, currentLoad);
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype = {
  ...FlyingRobot.prototype,
  hookLoad(loadingObject) {
    if (loadingObject.weight <= this.maxLoadWeight
      && this.currentLoad === null) {
      this.currentLoad = loadingObject;
    }
  },
  unhookLoad() {
    this.currentLoad = null;
  },
};

Object.assign(DeliveryDrone.prototype, FlyingRobot.prototype);

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
