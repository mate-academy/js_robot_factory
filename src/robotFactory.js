'use strict';

class BaseRobot {
  constructor(
    name,
    weight,
    coords,
    chipVersion
  ) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;

    this.coords = coords.x ? coords : {
      x: 0,
      y: 0,
    };
  }

  goForward(step) {
    if (step) {
      this.coords.y += step;
    } else {
      this.coords.y++;
    }
  };

  goBack(step) {
    if (step) {
      this.coords.y -= step;
    } else {
      this.coords.y--;
    }
  };

  goRight(step) {
    if (step) {
      this.coords.x += step;
    } else {
      this.coords.x++;
    }
  };

  goLeft(step) {
    if (step) {
      this.coords.x -= step;
    } else {
      this.coords.x--;
    }
  };

  getInfo() {
    return `Robot: ${this.name},\
 Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  };
}

class FlyingRobot extends BaseRobot {
  constructor(
    name,
    weight,
    coords,
    chipVersion
  ) {
    super(name, weight, chipVersion);
    super.name = name;
    super.weight = weight;
    super.coords = coords;
    super.chipVersion = chipVersion;
    this.coords.x = coords.x || 0;
    this.coords.y = coords.y || 0;
    this.coords.z = coords.z || 0;
  }

  goUp(step) {
    if (step) {
      this.coords.z += step;
    } else {
      this.coords.z++;
    }
  };

  goDown(step) {
    if (step) {
      this.coords.z -= step;
    } else {
      this.coords.z--;
    }
  };
}

class DeliveryDrone extends FlyingRobot {
  constructor(
    name,
    weight,
    coords,
    chipVersion,
    maxLoadWeight,
    currentLoad = null
  ) {
    super(name, weight, coords, chipVersion);
    super.name = name;
    super.weight = weight;
    super.coords = coords;
    super.chipVersion = chipVersion;
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(load) {
    if (!this.currentLoad && load.weight <= this.maxLoadWeight) {
      this.currentLoad = load;
    }
  };

  unhookLoad() {
    this.currentLoad = null;
  };
}

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
