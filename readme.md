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

**Бейсробот**
- конструктор принимает `имя`, `вес`, `координаты`, `chipVersion` и сохраняет их
- `координаты` должны быть установлены на 0, если не переданы
- методы `goForward`, `goBack`, `goRight` и `goLeft` принимают аргумент `step`
  (по умолчанию 1) и перемещайте робота «шагом» в соответствующем направлении.
- метод `getInfo` возвращает строку следующего формата `Robot: %name%, Chip
  версия: %chipVersion%, вес: %weight%`

**Летающий робот**
- наследует все методы от `BaseRobot`
- принимает те же аргументы, что и `BaseRobot`, и передает их конструктору родителя
- может работать с координатами `z`
- имеет методы `goUp` и `goDown`, меняющие координату z на заданный `шаг`

**Дрон доставки**
- наследует все методы от FlyingRobot и вызывает его конструктор
- в дополнение к аргументам `FlyingRobot` он принимает `maxLoadWeight` и `currentLoad`
  и сохраняет их.
- `currentLoad` должен быть установлен в `null`, если не передан
- имеет метод `hookLoad`, принимающий объект `cargo` и сохраняющий его в `currentLoad`
  свойство, если оно пусто и `cargo.weight` не больше, чем
  `maxLoadWeight` дрона.
- если у дрона уже есть `currentLoad`, не меняйте его
- имеет метод `unhookLoad`, свойство `currentLoad` равно `null`

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
