'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.chipVersion = chipVersion;
    this.coords.x = coords.x !== undefined
      ? 0
      : coords.x;
    this.coords.y = coords.y !== undefined
      ? 0
      : coords.y;;
  }
  
  getInfo() {
    return `Robot: ${this.name}, Chip version: ${this.chipVersion}, Weight: ${this.weight}`;
  }
  
  goForward(value) {
    if (value === undefined) {
      this.coords.y += 1;
    } else {
      this.coords.y += value
    }
  }
  
  goBack(value) {
    if (value === undefined) {
      this.coords.y -= 1;
    } else {
      this.coords.y -= value
    }
  }
  
  goLeft(value) {
    if (value === undefined) {
      this.coords.x -= 1;
    } else {
      this.coords.x -= value
    }
  }
  
  goRight(value) {
    if (value === undefined) {
      this.coords.x += 1;
    } else {
      this.coords.x += value
    }
  }
}

class FlyingRobot {
  constructor(name, weight, { x = 0, y = 0, z = 0 }, chipVersion) {
    super(name, weight, {
      x: x,
      y: y,
    }, chipVersion)
    
    this.coords = {
      x: x,
      y: y,
      z: z,
    };
  }
  
  goUp(value) {
    if (value === undefined) {
      this.coords.z += 1;
    } else {
      this.coords.z += value
    }
  }
  
   goDown(value) {
    if (value === undefined) {
      this.coords.z -= 1;
    } else {
      this.coords.z -= value
    }
  }
}

class DeliveryDrone {
  constructor(
    name,
    weight,
    coords,
    chipVersion,
    maxLoadWeight,
    currentLoad,
  ) {
    super(name, weight, coords, chipVersion);
      
    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad
      ? currentLoad
      : null;
  }

  hookLoad(cargo) {
    if (this.currentLoad === null) {
      if (this.maxLoadWeight >= cargo.weight) {
        this.currentLoad = cargo;
      } else {
        return;
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
