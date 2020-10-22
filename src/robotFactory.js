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
  goBack(step = 1) {
    this.coords.y -= step;
  },
  goRight(step = 1) {
    this.coords.x += step;
  },
  goLeft(step = 1) {
    this.coords.x += step;
  },
  getInfo() {
    return 'Robot: ' + this.name
    + ', Chip version: ' + this.chipVersion + ', Weight: ' + this.weight;
  },
};

function FlyingRobot(name, weight, coords, chipWersion) {
  BaseRobot.apply(this, arguments);

  this.coords.z = 0;
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

function DeliveryDrone(
  name, weight,
  coords, chipVersion,
  maxLoadWeight,
  currentLoad
) {
  FlyingRobot.apply(this, arguments);

  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype = {
  ...FlyingRobot.prototype,

  hookLoad(loadObject) {
    if (loadObject.weight < this.maxLoadWeight) {
      this.currentLoad = loadObject;
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
