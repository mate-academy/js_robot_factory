'use strict';

function BaseRobot(name, weight, coords, chipVersion) {
  this.name = name;
  this.chipVersion = chipVersion;
  this.coords = coords;
  this.weight = weight;
};

BaseRobot.prototype = {
  goForward: function(step=1){
    return this.coords.y+=step;
  },
  goBack: function (step=1){
    return this.coords.y-=step;
  },
  goRight: function(step=1) {
    return this.coords.x+=step;
  },
  goLeft: function(step=1) {
    return this.coords.x+=step;
  },
  getInfo: function() {
    return `Robot: ${this.name}, Chip version: ${this.chipVersion},
      Weight: ${this.weight}`;
  }
};

function FlyingRobot(name, weight, coords, chipVersion) {
  BaseRobot.call(this, name, weight, coords, chipVersion);
  this.coords.z = 0;
};

FlyingRobot.prototype = {
  goUp: function(step=1) {
    return this.coords.z+=step;
  },
  goDown: function(step=1) {
    return this.coords.z-=step;
  }
};

Object.setPrototypeOf(FlyingRobot.prototype, BaseRobot.prototype);

function DeliveryDrone(name, weight,
  coords, chipVersion, maxLoadWeight, currentLoad) {
  FlyingRobot.call(this, name, weight, coords, chipVersion);
  this.maxLoadWeight = maxLoadWeight;
  this.currentLoad = currentLoad;
};

DeliveryDrone.prototype = {
  unhookLoad: function() {
    return this.currentLoad = null;
  },
  hookLoad: function(obj) {
    if(obj.weight < this.maxLoadWeight) {
      return this.currentLoad = obj;
    }
  }
}

Object.setPrototypeOf(DeliveryDrone.prototype, FlyingRobot.prototype);

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
