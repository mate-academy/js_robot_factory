# Robot factory 
Let's implement 3 classes with inheritance

**BaseRobot**
- constructor takes `name`, `weight`, `coords`, `chipVersion` and saves them
- `coords` should be set to 0 if not passed
- `goForward`, `goBack`, `goRight` and `goLeft` methods take a `step` argument
  (1 by default) and move the robot by `step` in the appropriate direction
- `getInfo` method returns a string in the next format `Robot: %name%, Chip
  version: %chipVersion%, Weight: %weight%`

**FlyingRobot**
- inherits all the methods from `BaseRobot`
- takes the same args as `BaseRobot` and passes them to the parent's constructor
- can work with `z` `coords`
- has methods `goUp` and `goDown` changing `z` coordinate by a given `step`

**DeliveryDrone**
- inherits all the methods from `FlyingRobot` and calls its constructor
- in addition to `FlyingRobot`'s args it takes `maxLoadWeight` and `currentLoad`
  and saves them.
- `currentLoad` should be set to `null` if not passed
- has `hookLoad` method taking a `cargo` object and saving it to a `currentLoad`
  property if it is empty and the `cargo.weight` is not greater than the
  `maxLoadWeight` of the drone.
- if the drone already has `currentLoad` do not change it
- has `unhookLoad` method, that `currentLoad` property to `null`

```
DeliveryDrone {
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
