'use strict';

class BaseRobot {
  constructor(
    name,
    weight,
    coords,
    chipVersion) {
    this.name = name;
    this.weight = weight;
    this.coords = this.setCoords(coords, false);
    this.chipVersion = chipVersion;
  }

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
    return `Robot: ${this.name}, `
      + `Chip version: ${this.chipVersion}, `
      + `Weight: ${this.weight}`;
  }

  setCoords(coords) {
    if (Object.keys(coords).length === 0) {
      coords.y = 0;
      coords.x = 0;
    } else if (!coords.y) {
      coords.y = 0;
    } else if (!coords.x) {
      coords.x = 0;
    }

    return coords;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(
    name,
    weight,
    coords,
    chipVersion) {
    super(name, weight, coords, chipVersion);

    if (!coords.z) {
      coords.z = 0;
    }

    this.name = name;
    this.weight = weight;
    this.coords = coords;
    this.chipVersion = chipVersion;
  }

  goUp(step = 1) {
    this.coords.z += step;
  };

  goDown(step = 1) {
    this.coords.z -= step;
  };
}

class DeliveryDrone extends FlyingRobot {
  constructor(name,
    weight,
    coords,
    chipVersion,
    maxLoadWeight,
    currentLoad = null) {
    super(name, weight, coords, chipVersion);
    this.name = name;
    this.weight = weight;
    this.coords = coords;
    this.chipVersion = chipVersion;
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (!this.currentLoad && cargo.weight <= this.maxLoadWeight) {
      this.currentLoad = cargo;
    }
  };

  unhookLoad() {
    this.currentLoad = null;
  }
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
