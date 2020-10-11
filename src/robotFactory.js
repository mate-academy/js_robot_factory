'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.weight = weight;
  this.coords = coords;
  this.chipVersion = chipVersion;
}

BaseRobot.prototype.getInfo = function() {
  return 'Robot: ' + this.name
  + ', Chip version: ' + this.chipVersion + ', Weight: ' + this.weight;
};

BaseRobot.prototype.goForward = function(step = 1) {
  this.coords.y += step;
};

BaseRobot.prototype.goBack = function(step = 1) {
  this.coords.y -= step;
};

BaseRobot.prototype.goRight = function(step = 1) {
  this.coords.x += step;
};

BaseRobot.prototype.goLeft = function(step = 1) {
  this.coords.x += step;
};

function FlyingRobot(name, weight, coords, chipVersion) {
  const testRobot = new BaseRobot(name, weight, coords, chipVersion);

  for (const key in testRobot) {
    if (testRobot.hasOwnProperty(key)) {
      this[key] = testRobot[key];
    }
  }
  this.coords.z = 0;
}

FlyingRobot.prototype = BaseRobot.prototype;

FlyingRobot.prototype.goUp = function(step = 1) {
  this.coords.z += step;
};

FlyingRobot.prototype.goDown = function(step = 1) {
  this.coords.z -= step;
};

function DeliveryDrone(
  name, weight,
  coords, chipVersion,
  maxLoadWeight,
  currentLoad,
) {
  const prev = new FlyingRobot(name, weight, coords, chipVersion);

  for (const key in prev) {
    if (prev.hasOwnProperty(key)) {
      this[key] = prev[key];
    }
  }

  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
}

DeliveryDrone.prototype = FlyingRobot.prototype;

DeliveryDrone.prototype.hookLoad = function(loadObject) {
  if (loadObject.weight < this.maxLoadWeight) {
    this.currentLoad = loadObject;
  }
};

DeliveryDrone.prototype.unhookLoad = function(loadedObject) {
  this.currentLoad = null;
};

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
