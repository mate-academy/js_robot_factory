'use strict';

class BaseRobot {
  /**
   * @param {string} name - Name of a robot.
   * @param {number} weight - Weight of a robot.
   * @param {Object} coords - Current position of a robot.
   * @param {number} [coords.x = 0] - Position of a robot at x-axis
   * @param {number} [coords.y = 0] - Postion of a robot at y-axis
   * @param {number} chipVersion - Current chip version of a robot
   */
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: 0,
      y: 0,
      ...coords,
    };

    this.chipVersion = chipVersion;
  }

  /**
   * Return info about the robot
   *
   * @returns {string}
   */
  getInfo() {
    return `Robot: ${this.name}, `
      + `Chip version: ${this.chipVersion}, `
      + `Weight: ${this.weight}`;
  }

  /**
   * Move the robot up by 'step'
   * @param {number} [step=1] - Number of steps to move a robot
   */
  goForward(step = 1) {
    this.coords.y += step;
  }

  /**
   * Move the robot down by 'step'
   * @param {number} [step=1] - Number of steps to move a robot
   */
  goBack(step = 1) {
    this.coords.y -= step;
  }

  /**
   * Move the robot right by 'step'
   * @param {number} [step=1] - Number of steps to move a robot
   */
  goRight(step = 1) {
    this.coords.x += step;
  }

  /**
   * Move the robot left by 'step'
   * @param {number} [step=1] - Number of steps to move a robot
   */
  goLeft(step = 1) {
    this.coords.x -= step;
  }
}

class FlyingRobot extends BaseRobot {
  /**
   * @augments BaseRobot
   * @param {number} [coords.z = 0] - Postion of a robot at z-axis
   */
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);
    this.coords.z = coords.z || 0;
  }

  /**
   * Make the robot fly up by 'step'
   * @param {number} [step=1] - Number of steps to move a robot
   */
  goUp(step = 1) {
    this.coords.z += step;
  }

  /**
   * Make the robot fly down by 'step'
   * @param {number} [step=1] - Number of steps to move a robot
   */
  goDown(step = 1) {
    this.coords.z -= step;
  }
}

class DeliveryDrone extends FlyingRobot {
  /**
   * @augments FlyingRobot
   * @param {number} maxLoadWeight - Maximum weight that a robot can take
   * @param {Object|null} currentLoad - Info about current load of a robot
   * @param {number} currentLoad.weight - Weight of a current load of a robot
   * @param {number} currentLoad.description - Info about load supplies
   */
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  /**
   * Hook new load to a robot
   * @param {Object} cargo - New shipment
   * @param {number} cargo.weight - Weight of a new shipment
   * @param {number} cargo.description - Info about a new shipment
   */
  hookLoad(cargo) {
    if (!this.currentLoad && cargo.weight <= this.maxLoadWeight) {
      this.currentLoad = cargo;
    }
  }

  /**
   * Unhook the load of a robot
   */
  unhookLoad() {
    this.currentLoad = null;
  }
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
