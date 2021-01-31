'use strict';

function BaseRobot(name, weigth, coords, chipVersion) {
  // implement
  this.name = name;
  this.weight = weigth;
  this.coords = coords;
  this.chipVersion = chipVersion;
};

BaseRobot.prototype.goForward = function(num = 1) {
  this.coords.y += num;
};

BaseRobot.prototype.goBack = function(num = 1) {
  this.coords.y -= num;
};

BaseRobot.prototype.goRight = function(num = 1) {
  this.coords.x += num;
};

BaseRobot.prototype.goLeft = function(num = 1) {
  this.coords.x -= num;
};

BaseRobot.prototype.getInfo = function() {
  return (
    `Robot: ${this.name}, Chip version: ${this.chipVersion}, `
    + `Weight: ${this.weight}`);
};

function FlyingRobot(name, weigth, coords, chipVersion) {
  // implement
  BaseRobot.call(this, name, weigth, coords, chipVersion);
  this.coords.z = 0;
}

FlyingRobot.prototype.goUp = function(num = 1) {
  this.coords.z += num;
};

FlyingRobot.prototype.goDown = function(num = 1) {
  this.coords.z -= num;
};

function DeliveryDrone(
  name, weigth, coords, chipVersion, maxLoadWeight, currentLoad) {
  // implement
  FlyingRobot.call(this, name, weigth, coords, chipVersion,);
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
};

DeliveryDrone.prototype.hookLoad = function(cargo) {
  if (cargo.weight <= this.maxLoadWeight && !this.currentLoad) {
    this.currentLoad = cargo;
  }
};

DeliveryDrone.prototype.unhookLoad = function() {
  this.currentLoad = null;
};

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);
Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
