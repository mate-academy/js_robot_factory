'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype = {
  getInfo() {
    const printName = `Robot: ${this.name}`;
    const printChipVersion = `Chip version: ${this.chipVersion}`;
    const printWeight = `Weight: ${this.weight}`;

    return `${printName}, ${printChipVersion}, ${printWeight}`;
  },

  goForward(step = 1) {
    this.coords.y += step;

    return this;
  },

  goBack(step = 1) {
    this.coords.y -= step;

    return this;
  },

  goLeft(step = 1) {
    this.coords.x -= step;

    return this;
  },

  goRight(step = 1) {
    this.coords.x += step;

    return this;
  },
};

function FlyingRobot(name, weight, coords, chipVersion) {
  BaseRobot.call(this, name, weight, coords, chipVersion);
  this.coords.z = 0;
};

FlyingRobot.prototype = {
  goUp(step = 1) {
    this.coords.z += step;

    return this;
  },

  goDown(step = 1) {
    this.coords.z -= step;

    return this;
  },
};

function DeliveryDrone(
  name, weight, coords, chipVersion, maxLoadWeight, currentLoad
) {
  FlyingRobot.call(this, name, weight, coords, chipVersion);
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
};

DeliveryDrone.prototype = {
  hookLoad(load) {
    if (this.currentLoad === null
      && load.weight <= this.maxLoadWeight) {
      this.currentLoad = load;
    };
  },

  unhookLoad() {
    this.currentLoad = null;
  },
};

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);
Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
