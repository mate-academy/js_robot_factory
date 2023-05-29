'use strict';

class BaseRobot {
  constructor(
    name,
    weight,
    coords = {
      x: 0,
      y: 0,
    },
    chipVersion
  ) {
    this.name = name;
    this.weight = weight;

    if (Object.keys(coords).length === 0) {
      this.coords = {
        x: 0,
        y: 0,
      };
    } else {
      this.coords = coords;
    }

    if (!coords.hasOwnProperty('x')) {
      this.coords.x = 0;
    }

    if (!coords.hasOwnProperty('y')) {
      this.coords.y = 0;
    }

    this.chipVersion = chipVersion;
  }

  goForward(step = 1) {
    this.coords.y += step;
  }

  goBack(step = 1) {
    this.coords.y -= step;
  }

  goRight(step = 1) {
    this.coords.x += step;
  }

  goLeft(step = 1) {
    this.coords.x -= step;
  }

  getInfo() {
    return (
      `Robot: ${this.name}, Chip version: ${this.chipVersion},`
      + ` Weight: ${this.weight}`
    );
  }
}

class FlyingRobot extends BaseRobot {
  constructor(
    name,
    weight,
    coords = {
      x: 0,
      y: 0,
      z: 0,
    },
    chipVersion,
  ) {
    super(name, weight, coords, chipVersion);

    if (!coords.hasOwnProperty('z')) {
      this.coords.z = 0;
    }
  }

  goUp(step = 1) {
    this.coords.z += step;
  };

  goDown(step = 1) {
    this.coords.z -= step;
  };
}

class DeliveryDrone {}

// const robert = new BaseRobot();
const position = {
  x: 0, y: 0, z: 7,
};
const robot = new FlyingRobot('Elon', 93, position, 0.1);

console.log(robot.goForward());
robot.goForward();
console.log(robot);

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
