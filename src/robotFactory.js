'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype = {
  goForward(step = 0) {
    this.coords.y += step;
  },
  goBack(step = 0) {
    this.coords.y -= step;
  },
  goRight(step = 0) {
    this.coords.x += step;
  },
  goLeft(step = 0) {
    this.coords.x -= step;
  },
  getInfo() {
    return `Robot: ${this.name}, Chip version: ${this.chipVersion},`
      + ` Weight: ${this.weight}`;
  },
  goUp(step = 0) {
    this.coords.z += step;
  },
  goDown(step = 0) {
    this.coords.z += step;
  },
  hookLoad(cargo) {
    if (cargo.weight < this.maxLoadWeight) {
      this.currentLoad = cargo;
    }
  },
  unhookLoad() {
    this.currentLoad = null;
  },
};

function FlyingRobot(name, weight, coords, chipVersion) {
  BaseRobot.call(this, name, weight, coords, chipVersion);
  this.coords.z = 0;
}
FlyingRobot.prototype = BaseRobot.prototype;

function DeliveryDrone(name, weight, coords,
  chipVersion, maxLoadWeight, currentLoad) {
  FlyingRobot.call(this, name, weight, coords, chipVersion);
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}
DeliveryDrone.prototype = FlyingRobot.prototype;

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
