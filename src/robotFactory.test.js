'use strict';
/* global require, describe, test, expect */

const { BaseRobot, FlyingRobot, DeliveryDrone } = require('./robotFactory');

describe('BaseRobot testing', () => {
  test('BaseRobot should be a function constructor', () => {
    const robot = new BaseRobot();

    expect(robot instanceof BaseRobot)
      .toBe(true);
  });

  test('BaseRobot takes name, weight, coords, chipVersion arguments'
    + 'and sets them for his instances', () => {
    const robot = new BaseRobot('Elon', 93, {
      x: 0, y: 0,
    }, 0.1);

    expect(robot.name)
      .toBe('Elon');

    expect(robot.weight)
      .toBe(93);

    expect(robot.coords)
      .toEqual({
        x: 0, y: 0,
      });

    expect(robot.chipVersion)
      .toBe(0.1);
  });

  test('BaseRobot prototype should has methods '
    + 'goForward, goBack, goRight, goLeft, getInfo', () => {
    expect(typeof BaseRobot.prototype.goForward)
      .toBe('function');

    expect(typeof BaseRobot.prototype.goBack)
      .toBe('function');

    expect(typeof BaseRobot.prototype.goRight)
      .toBe('function');

    expect(typeof BaseRobot.prototype.goLeft)
      .toBe('function');

    expect(typeof BaseRobot.prototype.getInfo)
      .toBe('function');
  });

  test('BaseRobot instance: initial coordinates: x: 0, y: 0'
    + 'robot.goBack(3) robot.goForward(11) robot.goForward() robot.goBack()\n'
    + 'Expected Y coordinate: 8', () => {
    const robot = new BaseRobot('Jackson', 29, {
      x: 0, y: 0,
    }, '');

    robot.goBack(3);
    robot.goForward(11);
    robot.goForward();
    robot.goBack();

    expect(robot.coords.y)
      .toBe(8);
  });

  test('BaseRobot instance: initial coordinates: x: -5, y: 7'
    + 'robot.goLeft(3) robot.goRight() robot.goRight(10) robot.goLeft(-8)\n'
    + 'Expected Y coordinate: 15', () => {
    const robot = new BaseRobot('Jackson', 29, {
      x: -5, y: 7,
    }, '');

    robot.goLeft(3);
    robot.goRight();
    robot.goRight(10);
    robot.goLeft(-8);

    expect(robot.coords.y)
      .toBe(7);
  });

  test('Robot\'s getInfo method should return string with info', () => {
    const robot = new BaseRobot('Michael', 29, {}, 0.7);

    const actual = robot.getInfo();
    const expected = `Robot: Michael, Chip version: 0.7, Weight: 29`;

    expect(actual)
      .toBe(expected);
  });
});

describe('FlyingRobot testing', () => {
  test('FlyingRobot should be a function constructor', () => {
    const robot = new FlyingRobot('Michael', 27, {}, 0.5);

    expect(robot instanceof FlyingRobot)
      .toBe(true);
  });

  test('FlyingRobot prototype should have methods from BaseRobot'
    + 'goForward, goBack, goRight, goLeft, getInfo', () => {
    expect(typeof FlyingRobot.prototype.goForward)
      .toBe('function');

    expect(typeof FlyingRobot.prototype.goBack)
      .toBe('function');

    expect(typeof FlyingRobot.prototype.goRight)
      .toBe('function');

    expect(typeof FlyingRobot.prototype.goLeft)
      .toBe('function');

    expect(typeof FlyingRobot.prototype.getInfo)
      .toBe('function');
  });

  test('FlyingRobot prototype should have methods goUp goDown', () => {
    expect(typeof FlyingRobot.prototype.goUp)
      .toBe('function');

    expect(typeof FlyingRobot.prototype.goDown)
      .toBe('function');
  });

  test('Instance of FlyingRobot should has Z coordinate, initial: 0', () => {
    const flyingRobot = new FlyingRobot('Michael', 56, {});
    const baseRobot = new BaseRobot('Samuel', 21, {});

    expect(flyingRobot.coords.z)
      .toBe(0);

    expect(baseRobot.coords.z)
      .toBe(undefined);
  });

  test('FlyingRobot instance: initial Z coordinate - 0\n'
    + 'robot.goUp() robot.goUp(-1) robot.goUp(6)\n'
    + 'robot.goDown(8) robot.goDown() robot.goDown(-27)\n'
    + 'Expected: robot.coords.z === -14', () => {
    const robot = new FlyingRobot('Alan', 93, {});

    robot.goUp();
    robot.goUp(-1);
    robot.goUp(6);
    robot.goDown(8);
    robot.goDown();
    robot.goDown(-27);

    expect(robot.coords.z)
      .toBe(-14);
  });
});

describe('DeliveryDrone testing', () => {
  test('DeliveryDrone should be a function constructor', () => {
    const robot = new DeliveryDrone('X-one', 27, {}, 0.5);

    expect(robot instanceof DeliveryDrone)
      .toBe(true);
  });

  test('DeliveryDrone prototype should has all methods from'
    + ' BaseRobot and FlyingRobot', () => {
    expect(typeof DeliveryDrone.prototype.goForward)
      .toBe('function');

    expect(typeof DeliveryDrone.prototype.goBack)
      .toBe('function');

    expect(typeof DeliveryDrone.prototype.goLeft)
      .toBe('function');

    expect(typeof DeliveryDrone.prototype.goRight)
      .toBe('function');

    expect(typeof DeliveryDrone.prototype.goUp)
      .toBe('function');

    expect(typeof DeliveryDrone.prototype.goDown)
      .toBe('function');

    expect(typeof DeliveryDrone.prototype.getInfo)
      .toBe('function');
  });

  test('DeliveryDrone constructor should takes '
    + 'maxLoadWeight, currentLoad and sets it to his instances', () => {
    const robot = new DeliveryDrone(
      'Alon',
      26,
      {
        x: 0, y: 0,
      },
      1.6,
      78,
      {
        weight: 57,
        description: 'Some cargo',
      }
    );

    expect(robot.maxLoadWeight)
      .toBe(78);

    expect(robot.currentLoad)
      .toEqual({
        weight: 57,
        description: 'Some cargo',
      });
  });

  test('DeliveryDrone prototype has methods hookLoad and unhookLoad', () => {
    expect(typeof DeliveryDrone.prototype.hookLoad)
      .toBe('function');

    expect(typeof DeliveryDrone.prototype.unhookLoad)
      .toBe('function');
  });

  test('hookLoad method should save the load object '
    + 'to currentLoad of DeliveryDrone instances '
    + 'if weight of cargo less than maxLoadWeight of drone', () => {
    const robot = new DeliveryDrone('X', 9, {}, 0.7, 78, null);

    const cargo = {
      weight: 57, description: 'cargo 57 weight',
    };

    const cargo2 = {
      weight: 98, description: 'cargo 98 weight',
    };

    robot.hookLoad(cargo);
    robot.hookLoad(cargo2);

    expect(robot.currentLoad)
      .toEqual(cargo);
  });

  test('unhookLoad method should sets initial'
    + ' value null to currentLoad', () => {
    const robot = new DeliveryDrone('X', 9, {}, 0.7, 78, null);

    const cargo = {
      weight: 57, description: 'cargo 57 weight',
    };

    robot.hookLoad(cargo);
    robot.unhookLoad();

    expect(robot.currentLoad)
      .toBe(null);
  });
});
