'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = {
      x: 0,
      y: 0,
      ...coords,
    };
  }

  goForward(step = 1) {
    if (step > 0) {
      this.coords.y += step;
    }

    return this;
  };

  goBack(step = 1) {
    if (step > 0) {
      this.coords.y -= step;
    }

    return this;
  };

  goRight(step = 1) {
    if (step > 0) {
      this.coords.x += step;
    }

    return this;
  };

  goLeft(step = 1) {
    if (step > 0) {
      this.coords.x -= step;
    }

    return this;
  };

  getInfo() {
    const name = this.name;
    const version = this.chipVersion;
    const weight = this.weight;

    return `Robot: ${name}, Chip version: ${version}, Weight: ${weight}`;
  };
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    const coordsZ = {
      z: 0,
      ...coords,
    };

    super(name, weight, coordsZ, chipVersion);
  }

  goUp(step = 1) {
    if (step > 0) {
      this.coords.z += step;
    }

    return this;
  };

  goDown(step = 1) {
    if (step > 0) {
      this.coords.z -= step;
    }

    return this;
  };
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords,
    chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (this.currentLoad === null
      && cargo.weight <= this.maxLoadWeight) {
      this.currentLoad = cargo;
    }
  }

  unhookLoad() {
    this.currentLoad = null;
  }
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
