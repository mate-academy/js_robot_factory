'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    const basicCoords = {
      x: 0,
      y: 0,
    };

    this.name = name;
    this.weight = weight;
    this.coords = ('y' in coords) ? coords : basicCoords;
    this.chipVersion = chipVersion;
  };

  goForward(step = 1) {
    this.coords.y += step;
  };

  goBack(step = 1) {
    this.coords.y -= step;
  };

  goRight(step = 1) {
    this.coords.x += step;
  };

  goLeft(step = 1) {
    this.coords.x -= step;
  };

  getInfo() {
    return `Robot: ${this.name}, Chip version: `
 + `${this.chipVersion}, Weight: ${this.weight}`;
  };
};

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);
    this.coords.z = ('z' in coords) ? coords.z : 0;
  };

  goUp(step = 1) {
    this.coords.z += step;
  };

  goDown(step = 1) {
    this.coords.z -= step;
  };
};

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  };

  hookLoad(cargo) {
    this.currentLoad = (cargo.weight <= this.maxLoadWeight
      && !this.currentLoad > 0)
      ? cargo
      : this.currentLoad;
  };

  unhookLoad() {
    this.currentLoad = null;
  };
}

Object.setPrototypeOf(FlyingRobot, BaseRobot);

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
// наследует все методы от FlyingRobotи вызывает его конструктор
// в дополнение к FlyingRobotарг «S она принимает maxLoadWeightи
// currentLoad и сохраняет их.
//
// имеет hookLoad метод, принимающий cargo объект и
// сохраняющий его в currentLoad свойстве, если он пуст
//  и cargo.weight не больше, чем maxLoadWeightу дрона.
//
// если у дрона уже есть currentLoad, не меняйте его
// имеет unhookLoad метод, это currentLoad свойство для null
