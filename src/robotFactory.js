'use strict';

class BaseRobot {
  constructor(name, weight, coords = {
    x: 0, y: 0,
  }, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;
    this.coords = coords;

    if (coords.x === undefined && coords.y === undefined) {
      this.coords.x = 0;
      this.coords.y = 0;
    } else if (coords.x === undefined) {
      this.coords.x = 0;
      this.coords.y = coords.y;
    } else if (coords.y === undefined) {
      this.coords.y = 0;
      this.coords.x = coords.x;
    } else {
      this.coords = coords;
    }
  }

  goForward(step = 1) {
    this.coords.y += step;
  };

  goBack(step = 1) {
    this.coords.y -= step;
  };

  goLeft(step = 1) {
    this.coords.x -= step;
  };
  goRight(step = 1) {
    this.coords.x += step;
  };

  getInfo() {
    return 'Robot: ' + this.name + ', Chip version: '
    + this.chipVersion + ', Weight: ' + this.weight;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords = {
    x: 0, y: 0, z: 0,
  }, chipVersion) {
    super(name, weight, coords, chipVersion);

    if (coords.z === undefined) {
      this.coords.z = 0;
      this.coords.x = coords.x;
      this.coords.y = coords.y;
    }
  }

  goUp(step = 1) {
    this.coords.z += step;
  }

  goDown(step = 1) {
    this.coords.z -= step;
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords = {
    x: 0, y: 0, z: 0,
  }, chipVersion, maxLoadWeight, currentLoad = null) {
    super(name, weight, coords, chipVersion);
    this.currentLoad = currentLoad;
    this.maxLoadWeight = maxLoadWeight;
  }

  hookLoad(cargo) {
    if (this.currentLoad === null && cargo.weight <= this.maxLoadWeight) {
      this.currentLoad = cargo;
    }
  }

  unhookLoad(currentLoad) {
    this.currentLoad = null;
  }
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
