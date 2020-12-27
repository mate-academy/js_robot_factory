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
    return `Robot: ${
      this.name
    }, Chip version: ${
      this.chipVersion
    }, Weight: ${
      this.weight
    }`;
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

function FlyingRobot(name, weight, coords, chipVersion) {
  Object.assign(this, new BaseRobot(name, weight, coords, chipVersion));
  this.coords.z = 0;
}

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);

DeliveryDrone.prototype = {
  hookLoad(parcel) {
    if (parcel.weight <= this.maxLoadWeight && this.currentLoad === null) {
      this.currentLoad = parcel;
    }
  },
  unhookLoad() {
    this.currentLoad = null;
  },
};

function DeliveryDrone(
  name,
  weight,
  coords,
  chipVersion,
  maxLoadWeight,
  currentLoad
) {
  Object.assign(this, new FlyingRobot(name, weight, coords, chipVersion));
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
