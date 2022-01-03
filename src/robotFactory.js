'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = {
      x: 0,
      y: 0,
    };

    if (coords.x) {
      this.coords.x = coords.x;
    }

    if (coords.y) {
      this.coords.y = coords.y;
    }

    this.chipVersion = chipVersion;
  }

  goForward(step = 1) {
    if (step > 0) {
      this.coords.y += step;
    }
  }

  goBack(step = 1) {
    if (step > 0) {
      this.coords.y -= step;
    }
  }

  goRight(step = 1) {
    if (step > 0) {
      this.coords.x += step;
    }
  }

  goLeft(step = 1) {
    if (step > 0) {
      this.coords.x -= step;
    }
  }

  getInfo() {
    const name = `Robot: ${this.name}, `;
    const version = `Chip version: ${this.chipVersion}, `;
    const weight = `Weight: ${this.weight}`;

    return name + version + weight;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);

    this.coords = {
      x: 0,
      y: 0,
      z: 0,
    };

    if (coords.x) {
      this.coords.x = coords.x;
    }

    if (coords.y) {
      this.coords.y = coords.y;
    }

    if (coords.z) {
      this.coords.z = coords.z;
    }
  }

  goUp(step = 1) {
    if (step > 0) {
      this.coords.z += step;
    }
  }

  goDown(step = 1) {
    if (step > 0) {
      this.coords.z -= step;
    }
  }
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, coords, chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (!this.currentLoad && cargo.weight <= this.maxLoadWeight) {
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
