'use strict';

class BaseRobot {

  constructor(name, weight, coords , chipVersion) {
    this.name = name;
    this.weight = weight;
    this.coords = {
      x: coords.x || 0,
      y: coords.y || 0
    }
    this.chipVersion = chipVersion;
  }

  getInfo() {
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}, Weight: ${this.weight}`
  }

  goForward(num = 1) {
    this.coords.y += num
  }

  goBack(num = 1) {
    this.coords.y -= num
  }

  goLeft(num = 1) {
    this.coords.x -= num
  }

  goRight(num = 1) {
    this.coords.x += num 
  }
}

class FlyingRobot extends BaseRobot {

  constructor(name, weight, coords , chipVersion) {
    super(name, weight, coords , chipVersion);

    this.coords.z = coords.z || 0
  }

     
  goUp(num = 1) {
    this.coords.z += num
  }

  goDown(num = 1) {
    this.coords.z -= num
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords , chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords , chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if(!this.currentLoad && cargo.weight <= this.maxLoadWeight) {
      this.currentLoad = cargo
    }
  }

  unhookLoad () {
    this.currentLoad = null
  }
  
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
