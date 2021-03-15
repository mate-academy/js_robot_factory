'use strict';

BaseRobot.prototype = {
  goForward(steps = 1) {
    if (steps >= 1) {
      this.coords.y += steps;
    }
  },

  goBack(steps = 1) {
    if (steps >= 1) {
      this.coords.y -= steps;
    }
  },

  goRight(steps = 1) {
    if (steps >= 1) {
      this.coords.x += steps;
    }
  },

  goLeft(steps = 1) {
    if (steps >= 1) {
      this.coords.x -= steps;
    }
  },

  getInfo() {
    return `Robot: ${this.name},`
      + ` Chip version: ${this.chipVersion},`
      + ` Weight: ${this.weight}`;
  },
};

FlyingRobot.prototype = {
  __proto__: BaseRobot.prototype,

  goUp(steps = 1) {
    this.coords.z += steps;
  },

  goDown(steps = 1) {
    this.coords.z -= steps;
  },
};

DeliveryDrone.prototype = {
  __proto__: FlyingRobot.prototype,

  hookLoad(cargo) {
    if (cargo.weight <= this.maxLoadWeight && this.currentLoad === null) {
      this.currentLoad = cargo;
    }
  },

  unhookLoad() {
    this.currentLoad = null;
  },
};

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

function FlyingRobot(name, weight, coords, chipVersion) {
  BaseRobot.call(this, name, weight, coords, chipVersion);

  this.coords.z = 0;
}

function DeliveryDrone(name, weight, coords,
  chipVersion, maxLoadWeight, currentLoad) {
  BaseRobot.call(this, name, weight, coords, chipVersion);

  this.coords.z = 0;
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
