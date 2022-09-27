'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.coords = coords;
    this.chipVersion = chipVersion;
  }
}

class FlyingRobot {}

class DeliveryDrone {}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
