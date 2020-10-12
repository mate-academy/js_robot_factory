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
  goRight(step = 1) {
    this.coords.x += step;
  },
  goLeft(step = 1) {
    this.coords.x -= step;
  },
  getInfo() {
    const robotName = this.name;
    const version = this.chipVersion;
    const weight = this.weight;

    return `Robot: ${robotName}, Chip version: ${version}, Weight: ${weight}`;
  },
};

function FlyingRobot(...args) {
  BaseRobot.call(this, ...args);
  this.coords = { z: 0 };
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

function DeliveryDrone(name, weight, coords, chipVersion, maxLoad, currLoad) {
  FlyingRobot.call(this, ...arguments);
  this.maxLoadWeight = maxLoad;
  this.currentLoad = currLoad;
}

DeliveryDrone.prototype = {
  ...FlyingRobot.prototype,
  hookLoad(load) {
    if (load.weight < this.maxLoadWeight) {
      this.currentLoad = load;
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
