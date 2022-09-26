'use strict';
/* global require, describe, test, expect */
/* eslint-disable object-curly-newline, max-len */

const { BaseRobot, FlyingRobot, DeliveryDrone } = require('./robotFactory');

describe('BaseRobot class', () => {
  test('should create an instance of BaseRobot', () => {
    const position = { x: 0, y: 0 };
    const robot = new BaseRobot('Elon', 93, position, 0.1);

    expect(robot)
      .toBeInstanceOf(BaseRobot);
  });

  test('should save the first constructor argument as a robot name', () => {
    const position = { x: 0, y: 0 };
    const robot = new BaseRobot('Elon', 93, position, 0.1);

    expect(robot.name)
      .toBe('Elon');
  });

  test('should save the second constructor argument as a robot weight', () => {
    const position = { x: 0, y: 0 };
    const robot = new BaseRobot('Elon', 93, position, 0.1);

    expect(robot.weight)
      .toBe(93);
  });

  test('should take robot coords from the third constructor argument', () => {
    const position = { x: 3, y: 5 };
    const robot = new BaseRobot('Elon', 93, position, 0.1);

    expect(robot.coords)
      .toEqual({ x: 3, y: 5 });
  });

  test('should set coords to 0 by default', () => {
    const robot = new BaseRobot('Elon', 93, {}, 0.1);

    expect(robot.coords)
      .toEqual({ x: 0, y: 0 });
  });

  test('should set another coord to 0 by default if was passed only one', () => {
    const position = { x: 3 };

    const robot = new BaseRobot('Elon', 93, position, 0.1);

    expect(robot.coords)
      .toEqual({ x: 3, y: 0 });
  });

  test('should save the 4th constructor argument as a chipVersion', () => {
    const position = { x: 0, y: 0 };
    const robot = new BaseRobot('Elon', 93, position, 0.1);

    expect(robot.chipVersion)
      .toBe(0.1);
  });

  test(`should have an own 'getInfo' method`, () => {
    expect(BaseRobot.prototype.getInfo)
      .toBeInstanceOf(Function);

    expect(BaseRobot.prototype.hasOwnProperty('getInfo'))
      .toBe(true);
  });

  test(`should have an own 'goForward' method`, () => {
    expect(BaseRobot.prototype.goForward)
      .toBeInstanceOf(Function);

    expect(BaseRobot.prototype.hasOwnProperty('goForward'))
      .toBe(true);
  });

  test(`should have an own 'goBack' method`, () => {
    expect(BaseRobot.prototype.goBack)
      .toBeInstanceOf(Function);

    expect(BaseRobot.prototype.hasOwnProperty('goBack'))
      .toBe(true);
  });

  test(`should have an own 'goRight' method`, () => {
    expect(BaseRobot.prototype.goRight)
      .toBeInstanceOf(Function);

    expect(BaseRobot.prototype.hasOwnProperty('goRight'))
      .toBe(true);
  });

  test(`should have an own 'goLeft' method`, () => {
    expect(BaseRobot.prototype.goLeft)
      .toBeInstanceOf(Function);

    expect(BaseRobot.prototype.hasOwnProperty('goLeft'))
      .toBe(true);
  });
});

describe('BaseRobot instance', () => {
  it('should return its info', () => {
    const position = { x: -5, y: -8 };
    const robot = new BaseRobot('Kobi', 42, position, 1.1);

    expect(robot.getInfo())
      .toBe(`Robot: Kobi, Chip version: 1.1, Weight: 42`);
  });

  it('should go forward by a given step', () => {
    const position = { x: -5, y: -8 };
    const robot = new BaseRobot('Elon', 93, position, 0.1);

    robot.goForward(10);

    expect(robot.coords)
      .toEqual({ x: -5, y: 2 });
  });

  it('should go forward by 1 if step is not passed', () => {
    const position = { x: -5, y: -8 };
    const robot = new BaseRobot('Elon', 93, position, 0.1);

    robot.goForward();

    expect(robot.coords)
      .toEqual({ x: -5, y: -7 });
  });

  it('should go back by a given step', () => {
    const position = { x: -5, y: -8 };
    const robot = new BaseRobot('Elon', 93, position, 0.1);

    robot.goBack(10);

    expect(robot.coords)
      .toEqual({ x: -5, y: -18 });
  });

  it('should go back by 1 if step is not passed', () => {
    const position = { x: -5, y: -8 };
    const robot = new BaseRobot('Elon', 93, position, 0.1);

    robot.goBack();

    expect(robot.coords)
      .toEqual({ x: -5, y: -9 });
  });

  it('should go right by a given step', () => {
    const position = { x: -5, y: -8 };
    const robot = new BaseRobot('Elon', 93, position, 0.1);

    robot.goRight(5);

    expect(robot.coords)
      .toEqual({ x: 0, y: -8 });
  });

  it('should go right by 1 if step is not passed', () => {
    const position = { x: -5, y: -8 };
    const robot = new BaseRobot('Elon', 93, position, 0.1);

    robot.goRight();

    expect(robot.coords)
      .toEqual({ x: -4, y: -8 });
  });

  it('should go left by a given step', () => {
    const position = { x: -5, y: -8 };
    const robot = new BaseRobot('Elon', 93, position, 0.1);

    robot.goLeft(5);

    expect(robot.coords)
      .toEqual({ x: -10, y: -8 });
  });

  it('should go left by 1 if step is not passed', () => {
    const position = { x: -5, y: -8 };
    const robot = new BaseRobot('Elon', 93, position, 0.1);

    robot.goLeft();

    expect(robot.coords)
      .toEqual({ x: -6, y: -8 });
  });
});

describe('FlyingRobot class', () => {
  test('should create an instance of FlyingRobot', () => {
    const position = { x: 0, y: 0 };
    const robot = new FlyingRobot('Elon', 93, position, 0.1);

    expect(robot)
      .toBeInstanceOf(FlyingRobot);
  });

  test('should extend a BaseRobot', () => {
    const position = { x: 0, y: 0 };
    const robot = new FlyingRobot('Elon', 93, position, 0.1);

    expect(robot)
      .toBeInstanceOf(BaseRobot);
  });

  test('should save the first constructor argument as a robot name', () => {
    const position = { x: 0, y: 0 };
    const robot = new FlyingRobot('Elon', 93, position, 0.1);

    expect(robot.name)
      .toBe('Elon');
  });

  test('should save the second constructor argument as a robot weight', () => {
    const position = { x: 0, y: 0 };
    const robot = new FlyingRobot('Elon', 93, position, 0.1);

    expect(robot.weight)
      .toBe(93);
  });

  test('should take robot coords including Z', () => {
    const position = { x: 3, y: 5, z: 7 };
    const robot = new FlyingRobot('Elon', 93, position, 0.1);

    expect(robot.coords)
      .toEqual({ x: 3, y: 5, z: 7 });
  });

  test('should set Z coordinate to 0 by default', () => {
    const position = { x: 3, y: 5 };
    const robot = new FlyingRobot('Elon', 93, position, 0.1);

    expect(robot.coords.z)
      .toBe(0);
  });

  test('should save the 4th constructor argument as a chipVersion', () => {
    const position = { x: 0, y: 0 };
    const robot = new FlyingRobot('Elon', 93, position, 0.1);

    expect(robot.chipVersion)
      .toBe(0.1);
  });

  test(`should have an own 'goUp' method`, () => {
    expect(FlyingRobot.prototype.goUp)
      .toBeInstanceOf(Function);

    expect(FlyingRobot.prototype.hasOwnProperty('goUp'))
      .toBe(true);
  });

  test(`should have an own 'goDown' method`, () => {
    expect(FlyingRobot.prototype.goDown)
      .toBeInstanceOf(Function);

    expect(FlyingRobot.prototype.hasOwnProperty('goDown'))
      .toBe(true);
  });
});

describe(`FlyingRobot instance`, () => {
  it('should go up by a given step', () => {
    const position = { x: -5, y: -8, z: -3 };
    const robot = new FlyingRobot('Elon', 93, position, 0.1);

    robot.goUp(10);

    expect(robot.coords)
      .toEqual({ x: -5, y: -8, z: 7 });
  });

  it('should go up by 1 if step is not passed', () => {
    const position = { x: -5, y: -8, z: -3 };
    const robot = new FlyingRobot('Elon', 93, position, 0.1);

    robot.goUp();

    expect(robot.coords)
      .toEqual({ x: -5, y: -8, z: -2 });
  });

  it('should go down by a given step', () => {
    const position = { x: -5, y: -8, z: -3 };
    const robot = new FlyingRobot('Elon', 93, position, 0.1);

    robot.goDown(10);

    expect(robot.coords)
      .toEqual({ x: -5, y: -8, z: -13 });
  });

  it('should go down by 1 if step is not passed', () => {
    const position = { x: -5, y: -8, z: -3 };
    const robot = new FlyingRobot('Elon', 93, position, 0.1);

    robot.goDown();

    expect(robot.coords)
      .toEqual({ x: -5, y: -8, z: -4 });
  });
});

describe('DeliveryDrone class', () => {
  test('should create an instance of DeliveryDrone', () => {
    const position = { x: 0, y: 0 };
    const robot = new DeliveryDrone('Elon', 93, position, 0.1, 78, null);

    expect(robot)
      .toBeInstanceOf(DeliveryDrone);
  });

  test('should extend a FlyingRobot', () => {
    const position = { x: 0, y: 0 };
    const robot = new DeliveryDrone('Elon', 93, position, 0.1, 78, null);

    expect(robot)
      .toBeInstanceOf(FlyingRobot);
  });

  test('should save maxLoadWeight and currentLoad', () => {
    const position = { x: 0, y: 0 };
    const cargo = {
      weight: 57,
      description: 'Some cargo',
    };

    const robot = new DeliveryDrone('Alon', 26, position, 1.6, 78, cargo);

    expect(robot.maxLoadWeight)
      .toBe(78);

    expect(robot.currentLoad)
      .toEqual({
        weight: 57,
        description: 'Some cargo',
      });
  });

  test(`should set 'currentLoad' prop to null by default`, () => {
    const robot = new DeliveryDrone('X', 9, {}, 0.7, 80);

    expect(robot.currentLoad)
      .toBe(null);
  });

  test(`should have an own 'hookLoad' method`, () => {
    expect(DeliveryDrone.prototype.hookLoad)
      .toBeInstanceOf(Function);

    expect(DeliveryDrone.prototype.hasOwnProperty('hookLoad'))
      .toBe(true);
  });

  test(`should have an own 'unhookLoad' method`, () => {
    expect(DeliveryDrone.prototype.unhookLoad)
      .toBeInstanceOf(Function);

    expect(DeliveryDrone.prototype.hasOwnProperty('unhookLoad'))
      .toBe(true);
  });
});

describe(`'hookLoad' method`, () => {
  test(`should save a given 'cargo' to a 'currentLoad' prop`, () => {
    const robot = new DeliveryDrone('X', 9, {}, 0.7, 78, null);

    const cargo = {
      weight: 57,
      description: 'cargo 57 weight',
    };

    robot.hookLoad(cargo);

    expect(robot.currentLoad)
      .toEqual(cargo);
  });

  test(
    `shouldn't save a 'cargo' if its weight is greater then 'maxLoadWeight'`,
    () => {
      const robot = new DeliveryDrone('X', 9, {}, 0.7, 78, null);

      const cargo = {
        weight: 98,
        description: 'cargo 98 weight',
      };

      robot.hookLoad(cargo);

      expect(robot.currentLoad)
        .toBe(null);
    }
  );

  test('should save the cargo if its weight is equal to maxLoadWeight', () => {
    const robot = new DeliveryDrone('X', 9, {}, 0.7, 78, null);

    const cargo = {
      weight: 78, description: 'cargo 78 weight',
    };

    robot.hookLoad(cargo);

    expect(robot.currentLoad)
      .toEqual(cargo);
  });

  test(`shouldn't change a currentLoad if the drone already have one`, () => {
    const cargo = {
      weight: 30,
      description: 'cargo 30 weight',
    };

    const robot = new DeliveryDrone('X', 9, {}, 0.7, 80, cargo);

    const cargo2 = {
      weight: 40,
      description: 'cargo 40 weight',
    };

    robot.hookLoad(cargo2);

    expect(robot.currentLoad)
      .toEqual(cargo);
  });
});

describe(`'unhookLoad' method`, () => {
  test('should set null to currentLoad property', () => {
    const cargo = {
      weight: 57,
      description: 'cargo 57 weight',
    };

    const robot = new DeliveryDrone('X', 9, {}, 0.7, 78, cargo);

    robot.unhookLoad();

    expect(robot.currentLoad)
      .toBe(null);
  });
});
/* eslint-enable object-curly-newline */
