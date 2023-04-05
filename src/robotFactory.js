'use strict';

class BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    this.name = name;
    this.weight = weight;
    this.coords = this.chekCoords(coords);
    this.chipVersion = chipVersion;
  }
  
  chekCoords(coords) {
  if (Object.keys(coords).length === 0) {
    return {x : 0, y : 0};
    } else if (!Object.keys(coords).includes('x')) {
      return { x : 0 , y: coords.y};
    } else if (!Object.keys(coords).includes('y')) {
      return { x : coords.x, y: 0};
    }

    return coords
}
  
  goForward(step = 1) {
    this.coords.y += step;
    return this;
  }

  goBack(step = 1) {
    this.coords.y -= step;
    return this;
  }
    
  goLeft(step = 1) {
    this.coords.x -= step;
    return this;
  }
  
  goRight(step = 1) {
    this.coords.x += step;
    return this;
  }
  
  getInfo() {
    const textName = `Robot: ${this.name}, `;
    const textChipVersion = `Chip version: ${this.chipVersion}, `;
    const textWeight = `Weight: ${this.weight}`;

    return textName + textChipVersion + textWeight;
  }
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, coords, chipVersion) {
    super(name, weight, coords, chipVersion);
    
    this.coords = this.chekAllCoords(coords);
  }
  
  
  chekAllCoords(coords) {
    const resultObj = {};
    const keysCoords = Object.keys(coords);
    const coordsArr = ['x','y','z'];
    for (let i = 0; i < coordsArr.length; i++) {
      if(!keysCoords.includes(coordsArr[i])) {
        resultObj[coordsArr[i]] = 0;
      }
    }
     return {...coords, ...resultObj};
}

  goUp(step = 1) {
    this.coords.z += step;
    return this;
  }

  goDown(step = 1) {
    this.coords.z -= step;
    return this;
  }

}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, coords, chipVersion, maxLoadWeight, currentLoad = null) {
    super(name, weight, coords, chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if(cargo.weight <= this.maxLoadWeight && !this.currentLoad) {
      return this.currentLoad = cargo;
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
