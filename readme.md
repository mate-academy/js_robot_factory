# Robot factory
Let's implement 3 classes with inheritance

**BaseRobot**
- constructor takes `name`, `weight`, `coords`, `chipVersion` and saves them
- `coords` should be set to 0 if not passed
- `goForward`, `goBack`, `goRight` and `goLeft` methods take a `step` argument
  (1 by default) and move the robot by `step` in the appropriate direction
- `getInfo` method returns a string in the next format `Robot: %name%, Chip
  version: %chipVersion%, Weight: %weight%`

  конструктор приймає `name`, `weight`, `coords`, `chipVersion` і зберігає їх
- `coords` має бути встановлено на 0, якщо не передано
- методи `goForward`, `goBack`, `goRight` і `goLeft` приймають аргумент `step`
  (1 за замовчуванням) і перемістіть робота `кроком` у відповідному напрямку
- Метод getInfo повертає рядок у форматі Robot: %name%, Chip
  версія: %chipVersion%, Вага: %weight%`

**FlyingRobot**
- inherits all the methods from `BaseRobot`
- takes the same args as `BaseRobot` and passes them to the parent's constructor
- can work with `z` `coords`
- has methods `goUp` and `goDown` changing `z` coordinate by a given `step`

успадковує всі методи від `BaseRobot`
- приймає ті самі аргументи, що й `BaseRobot`, і передає їх до батьківського конструктора
- може працювати з `z` `coords`
- має методи `goUp` і `goDown`, що змінюють координату `z` на заданий `крок`

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

успадковує всі методи від `FlyingRobot` і викликає його конструктор
- на додаток до аргументів `FlyingRobot` приймає `maxLoadWeight` і `currentLoad`
  і рятує їх.
- `currentLoad` має бути встановлено на `null`, якщо не передано
- має метод `hookLoad`, який бере об’єкт `cargo` і зберігає його в `currentLoad`
  якщо він порожній і `cargo.weight` не перевищує
  `maxLoadWeight` дрона.
- якщо дрон вже має `currentLoad`, не змінюйте його
- має метод `unhookLoad`, що властивість `currentLoad` має значення `null`

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
