'use strict';

function BaseRobot(name, weight, coords, chip) {
  this.name = name;
  this.weight = weight;

  this.coords = coords;

  this.chipVersion = chip;
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
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}`
    + `, Weight: ${this.weight}`;
  },
};

function FlyingRobot(name, weight, coords, chip) {
  BaseRobot.apply(this, [name, weight, coords, chip]);
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

function DeliveryDrone(name, weight, coords, chip, maxweight, curload) {
  FlyingRobot.apply(this, [name, weight, coords, chip]);

  this.maxLoadWeight = maxweight;
  this.currentLoad = curload;
}

DeliveryDrone.prototype = {
  hookLoad(cargo) {
    if (this.currentLoad === null && cargo.weight <= this.maxLoadWeight) {
      this.currentLoad = cargo;
    }
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
