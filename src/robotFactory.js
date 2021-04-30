'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype = {
  goForward(step = 1) {
    this.coords.y = this.coords.y + step;
  },

  goBack(step = 1) {
    this.coords.y = this.coords.y - step;
  },

  goLeft(step = 1) {
    this.coords.x = this.coords.x - step;
  },

  goRight(step = 1) {
    this.coords.x = this.coords.x + step;
  },

  getInfo() {
    return `Robot: ${this.name}, Chip version:`
    + ` ${this.chipVersion}, Weight: ${this.weight}`;
  },
};

function FlyingRobot(name, weight, coords, chipVersion) {
  BaseRobot.call(this, name, weight, coords, chipVersion);
  this.coords.z = 0;
}

FlyingRobot.prototype = Object.create(BaseRobot.prototype);

Object.assign(FlyingRobot.prototype, {

  goUp(step = 1) {
    this.coords.z = this.coords.z + step;
  },

  goDown(step = 1) {
    this.coords.z = this.coords.z - step;
  },
});

function DeliveryDrone(name, weight,
  coords, chipVersion,
  maxLoadWeight, currentLoad
) {
  FlyingRobot.call(this, name, weight, coords, chipVersion);
  this.currentLoad = currentLoad;
  this.maxLoadWeight = maxLoadWeight;
}

DeliveryDrone.prototype = Object.create(FlyingRobot.prototype);

Object.assign(DeliveryDrone.prototype, {

  hookLoad(load) {
    if (load.weight <= this.maxLoadWeight && !this.currentLoad) {
      this.currentLoad = load;
    }
  },

  unhookLoad() {
    this.currentLoad = null;
  },
});

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
