# Robot factory
Let's consolidate our knowledge of prototypes and constructors!
This task has 3 parts.

The first part is to build base robot's constructor and its prototype according to the following requirements
- BaseRobot function constructor takes `name`, `weight`, `coords`, `chipVersion` and sets them for his instances;
- BaseRobot prototype has methods `goForward`, `goBack`, `goRight`, `goLeft`, which can take `step` prop or move the robot by 1 in the appropriate direction in the case when `step` is undefined;
- BaseRobot prototype has method `getInfo`, which returns a string in the format `Robot: %name%, Chip version: %chipVersion%, Weight: %weight%`;

The second part is to build flying robots constructor and his prototype according to the following requirements:
- FlyingRobot prototype inherits BaseRobot prototype;
- FlyingRobot constructor takes `name`, `weight`, `coords`, `chipVersion`, and transmits them to BaseRobot constructor;
- FlyingRobot constructor sets `z` coordinate to `coords` object of his instances;
- FlyingRobot prototype has methods `goUp` and `goDown`,  which can take `step` prop or move the robot by 1 in the `z` coordinate in the case when `step` is undefined;
- The instance of FlyingRobot can use all methods from BaseRobot and FlyingRobot prototypes;

The third part is to build delivery drone constructor and his prototype according to the following requirements:
- DeliveryDrone prototype inherits FlyingRobot prototype;
- DeliveryDrone constructor takes `name`, `weight`, `coords`, `chipVersion`, and transmits them to FlyingRobot constructor;
- DeliveryDrone constructor takes `maxLoadWeight`, `currentLoad` and sets it to his instances;
- DeliveryDrone prototype has method `hookLoad`, which saved the load object to `currentLoad` of DeliveryDrone instances if `weight` of cargo less than `maxLoadWeight` of drone;
- DeliveryDrone prototype has method `unhookLoad`, which sets initial value `null` to `currentLoad`;
- The instance of DeliveryDrone can use all methods of BaseRobot, FlyingRobot, DeliveryDrone prototypes;

Delivery Robot schema:
```
deliveryRobot {
  name: string
  weight: number
  chipVersion: number
  maxLoadWeight: number
  currentLoad: null || {
    weight: number
    description: string
  }
  coords: {
    x: number
    y: number
    z: number
  }
}

```

**Read [the guideline](https://github.com/mate-academy/js_task-guideline/blob/master/README.md) before start**
