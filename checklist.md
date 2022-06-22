1. [CODE KNOWLEDGE] - If in object `variableName === keyName` you can use short syntax:.

BAD EXAMPLE: 
```
{
  name: name,
  wheels: wheels,
  version: version,
}
```

GOOD EXAMPLE:
```
{
  name,
  wheels,
  version,
}
```

2. [CODE KNOWLEDGE] - use logic operator `||` if you want safely add some initial values.

BAD EXAMPLE: 
```
this.firstName = name
 ? { name: firstName } 
 : { name: 'Unknown' }
```

GOOD EXAMPLE:
```
this.firstName = { 
  name: firstName || 'Unknown',
}
```

3. [CODE KNOWLEDGE] - use default function params, if you what to set default value to not passed arguments

BAD EXAMPLE: 
```
function square (a) {
  if (a === undefined) {
    return 0 ** 2;
  }
```


GOOD EXAMPLE:
```
function square (a = 0) {
  return a ** 2;
}
```
