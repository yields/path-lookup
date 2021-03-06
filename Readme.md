
# path-lookup

  lookup path within `object`.

## Installation

  Install with [component(1)](http://component.io):

    $ component install yields/path-lookup

## Example

```js
{
  user: {
    first_name: 'john'
  }
}
```

```js
// lookup

var path = lookup(obj, 'User.FirstName', [lower, snake]);
path; // => "['user']['first_name']"

// get
Function('_', 'return _' + path)(obj); // => "john"

// set
Function('_, v', '_' + path + ' = v')(obj, '');

// get
Function('_', 'return _' + path)(obj); // => ""

// delete
Function('_', 'delete _' + path)(obj); // => true

// get
Function('_', 'return _' + path)(obj); // => undefined
```

## API

### lookup(obj, path, fns)

  Lookup `path` within `obj` invoking `fn(key)` for each key that wasn't found
  the functions should return other possibilities for a key.

  return a string `path` or `null`

### lookup.keys(obj, path, fns)

  Same as `lookup()` but returns an array of `keys` or `null`.

## caveats

  you should probably make sure the `path` exists, before doing anything
  that will throw.

  you can either keep cache of path's and their state `{ path: '...', exists: true }`
  or just wrap stuff that will throw in a `try {} catch {}` block.

## License

  MIT
