'use strict';

class BaseRobot {
  /**
     * @param {string} name
     * @param {number} money
     */
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: coords.x || 0,
      y: coords.y || 0,
    };

    this.chipVersion = chipVersion;
  }

  goForward(step = 1) {
    this.coords.y = this.coords.y + step;
  }

  goBack(step = 1) {
    this.coords.y = this.coords.y - step;
  }

  goRight(step = 1) {
    this.coords.x = this.coords.x + step;
  }

  goLeft(step = 1) {
    this.coords.x = this.coords.x - step;
  }

  getInfo() {
    return `Robot: ${this.name}, Chip version: ${this.chipVersion},`
     + ` Weight: ${this.weight}`;
  }
};

class FlyingRobot extends BaseRobot {
// takes the same args as BaseRobot and passes them to the parent's constructor
// can work with z coords
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords.z = coords.z || 0;
  };
  // has methods goUp and goDown changing z coordinate by a given step
  goUp(step = 1) {
    this.coords.z = this.coords.z + step;
  }
  goDown(step = 1) {
    this.coords.z = this.coords.z - step;
  }
};

class DeliveryDrone extends FlyingRobot {
  // inherits all the methods from FlyingRobot and calls its constructor

  // in addition to FlyingRobot's args it takes maxLoadWeight
  // and currentLoad and saves them.
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion, maxLoadWeight, currentLoad);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  // has hookLoad method taking a cargo object and saving it
  // to a currentLoad property if it is empty
  // and the cargo.weight is not greater than the maxLoadWeight of the drone
  // принимающий объект груза и сохраняющий его в свойстве currentLoad,
  // если он пуст
  // и груз.вес не больше, чем maxLoadWeight дрона.

  hookLoad(cargo) {
    if ((this.currentLoad === null) && (cargo.weight <= this.maxLoadWeight)) {
      this.currentLoad = cargo;
    }
    // if the drone already
    // has currentLoad do not change it
  };
  unhookLoad() {
    this.currentLoad = null;
  }
};

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
