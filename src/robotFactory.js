'use strict';

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
    // eslint-disable-next-line max-len
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  },
};

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
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

FlyingRobot.prototype = {
  goUp(step = 1) {
    this.coords.z += step;
  },
  goDown(step = 1) {
    this.coords.z -= step;
  },
};

FlyingRobot.prototype = {
  goUp(step = 1) {
    this.coords.z += step;
  },
  goDown(step = 1) {
    this.coords.z -= step;
  },
};

function FlyingRobot(name, weight, coords, chipVersion) {
  this.coords = {
    z: 0,
  };
}

DeliveryDrone.prototype = {
  hookLoad(loadObject) {
    if (loadObject.weight < this.maxLoadWeight) {
      this.currentLoad = loadObject;
    }
  },
  unhookLoad() {
    this.currentLoad = null;
  },
};

// eslint-disable-next-line max-len
function DeliveryDrone(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}
Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);
Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
