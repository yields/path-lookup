
/**
 * Export `lookup`
 */

module.exports = lookup;

/**
 * Lookup `path` within `obj` with optional
 * array of functions `fns`.
 *
 * @param {Object} obj
 * @param {String} path
 * @param {Object} fns
 * @return {Array}
 * @api public
 */

function lookup(obj, path, fns){
  var keys = lookup.keys(obj, path, fns);

  if (!keys) return;

  for (var i = 0; i < keys.length; ++i) {
    keys[i] = wrap(keys[i]);
  }

  return keys.join('');
}

/**
 * Lookup `path` within `obj` with optional
 * array of functions `fns`, the method returns
 * an array.
 *
 * @param {Object} obj
 * @param {String} path
 * @param {Object} fns
 * @return {Array}
 * @api public
 */

lookup.keys = function(obj, path, fns){
  var parts = path.split('.');
  var ret = Array(parts.length);
  var fns = fns || [];

  for (var i = 0; i < parts.length; ++i) {
    var key = parts[i];

    // has
    if (obj.hasOwnProperty(key)) {
      if (null == obj[key]) return;
      ret[i] = key;
      obj = obj[key];
      continue;
    }

    // fns
    for (var j = 0; j < fns.length; ++j) {
      key = fns[j](key);
      if (!obj.hasOwnProperty(key)) continue;
      if (null == obj[key]) return;
      ret[i] = key;
      obj = obj[key];
      break;
    }

    // 404
    if (!ret[i]) return;
  }

  return ret;
};

/**
 * Wrap `key`
 *
 * @param {String} key
 * @return {String}
 * @api public
 */

function wrap(key){
  key = String(key).replace(/'/g, "\\'");
  return '[\'' + key + '\']';
}
