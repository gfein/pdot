(function(){if (!Date.now) Date.now = function() {
  return +new Date;
};
try {
  document.createElement("div").style.setProperty("opacity", 0, "");
} catch (error) {
  var d3_style_prototype = CSSStyleDeclaration.prototype,
      d3_style_setProperty = d3_style_prototype.setProperty;
  d3_style_prototype.setProperty = function(name, value, priority) {
    d3_style_setProperty.call(this, name, value + "", priority);
  };
}
d3 = {version: "2.9.6"}; // semver
function d3_class(ctor, properties) {
  try {
    for (var key in properties) {
      Object.defineProperty(ctor.prototype, key, {
        value: properties[key],
        enumerable: false
      });
    }
  } catch (e) {
    ctor.prototype = properties;
  }
}
var d3_array = d3_arraySlice; // conversion for NodeLists

function d3_arrayCopy(pseudoarray) {
  var i = -1, n = pseudoarray.length, array = [];
  while (++i < n) array.push(pseudoarray[i]);
  return array;
}

function d3_arraySlice(pseudoarray) {
  return Array.prototype.slice.call(pseudoarray);
}

try {
  d3_array(document.documentElement.childNodes)[0].nodeType;
} catch(e) {
  d3_array = d3_arrayCopy;
}

var d3_arraySubclass = [].__proto__?

// Until ECMAScript supports array subclassing, prototype injection works well.
function(array, prototype) {
  array.__proto__ = prototype;
}:

// And if your browser doesn't support __proto__, we'll use direct extension.
function(array, prototype) {
  for (var property in prototype) array[property] = prototype[property];
};
d3.map = function(object) {
  var map = new d3_Map;
  for (var key in object) map.set(key, object[key]);
  return map;
};

function d3_Map() {}

d3_class(d3_Map, {
  has: function(key) {
    return d3_map_prefix + key in this;
  },
  get: function(key) {
    return this[d3_map_prefix + key];
  },
  set: function(key, value) {
    return this[d3_map_prefix + key] = value;
  },
  remove: function(key) {
    key = d3_map_prefix + key;
    return key in this && delete this[key];
  },
  keys: function() {
    var keys = [];
    this.forEach(function(key) { keys.push(key); });
    return keys;
  },
  values: function() {
    var values = [];
    this.forEach(function(key, value) { values.push(value); });
    return values;
  },
  entries: function() {
    var entries = [];
    this.forEach(function(key, value) { entries.push({key: key, value: value}); });
    return entries;
  },
  forEach: function(f) {
    for (var key in this) {
      if (key.charCodeAt(0) === d3_map_prefixCode) {
        f.call(this, key.substring(1), this[key]);
      }
    }
  }
});

var d3_map_prefix = "\0", // prevent collision with built-ins
    d3_map_prefixCode = d3_map_prefix.charCodeAt(0);
function d3_identity(d) {
  return d;
}
function d3_this() {
  return this;
}
function d3_true() {
  return true;
}
function d3_functor(v) {
  return typeof v === "function" ? v : function() { return v; };
}

d3.functor = d3_functor;
// Copies a variable number of methods from source to target.
d3.rebind = function(target, source) {
  var i = 1, n = arguments.length, method;
  while (++i < n) target[method = arguments[i]] = d3_rebind(target, source, source[method]);
  return target;
};

// Method is assumed to be a standard D3 getter-setter:
// If passed with no arguments, gets the value.
// If passed with arguments, sets the value and returns the target.
function d3_rebind(target, source, method) {
  return function() {
    var value = method.apply(source, arguments);
    return arguments.length ? target : value;
  };
}
d3.ascending = function(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
};
d3.descending = function(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
};
d3.mean = function(array, f) {
  var n = array.length,
      a,
      m = 0,
      i = -1,
      j = 0;
  if (arguments.length === 1) {
    while (++i < n) if (d3_number(a = array[i])) m += (a - m) / ++j;
  } else {
    while (++i < n) if (d3_number(a = f.call(array, array[i], i))) m += (a - m) / ++j;
  }
  return j ? m : undefined;
};
d3.median = function(array, f) {
  if (arguments.length > 1) array = array.map(f);
  array = array.filter(d3_number);
  return array.length ? d3.quantile(array.sort(d3.ascending), .5) : undefined;
};
d3.min = function(array, f) {
  var i = -1,
      n = array.length,
      a,
      b;
  if (arguments.length === 1) {
    while (++i < n && ((a = array[i]) == null || a != a)) a = undefined;
    while (++i < n) if ((b = array[i]) != null && a > b) a = b;
  } else {
    while (++i < n && ((a = f.call(array, array[i], i)) == null || a != a)) a = undefined;
    while (++i < n) if ((b = f.call(array, array[i], i)) != null && a > b) a = b;
  }
  return a;
};
d3.max = function(array, f) {
  var i = -1,
      n = array.length,
      a,
      b;
  if (arguments.length === 1) {
    while (++i < n && ((a = array[i]) == null || a != a)) a = undefined;
    while (++i < n) if ((b = array[i]) != null && b > a) a = b;
  } else {
    while (++i < n && ((a = f.call(array, array[i], i)) == null || a != a)) a = undefined;
    while (++i < n) if ((b = f.call(array, array[i], i)) != null && b > a) a = b;
  }
  return a;
};
d3.extent = function(array, f) {
  var i = -1,
      n = array.length,
      a,
      b,
      c;
  if (arguments.length === 1) {
    while (++i < n && ((a = c = array[i]) == null || a != a)) a = c = undefined;
    while (++i < n) if ((b = array[i]) != null) {
      if (a > b) a = b;
      if (c < b) c = b;
    }
  } else {
    while (++i < n && ((a = c = f.call(array, array[i], i)) == null || a != a)) a = undefined;
    while (++i < n) if ((b = f.call(array, array[i], i)) != null) {
      if (a > b) a = b;
      if (c < b) c = b;
    }
  }
  return [a, c];
};
d3.random = {
  normal: function(mean, deviation) {
    if (arguments.length < 2) deviation = 1;
    if (arguments.length < 1) mean = 0;
    return function() {
      var x, y, r;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        r = x * x + y * y;
      } while (!r || r > 1);
      return mean + deviation * x * Math.sqrt(-2 * Math.log(r) / r);
    };
  }
};
function d3_number(x) {
  return x != null && !isNaN(x);
}
d3.sum = function(array, f) {
  var s = 0,
      n = array.length,
      a,
      i = -1;

  if (arguments.length === 1) {
    while (++i < n) if (!isNaN(a = +array[i])) s += a;
  } else {
    while (++i < n) if (!isNaN(a = +f.call(array, array[i], i))) s += a;
  }

  return s;
};
// R-7 per <http://en.wikipedia.org/wiki/Quantile>
d3.quantile = function(values, p) {
  var H = (values.length - 1) * p + 1,
      h = Math.floor(H),
      v = values[h - 1],
      e = H - h;
  return e ? v + e * (values[h] - v) : v;
};
d3.transpose = function(matrix) {
  return d3.zip.apply(d3, matrix);
};
d3.zip = function() {
  if (!(n = arguments.length)) return [];
  for (var i = -1, m = d3.min(arguments, d3_zipLength), zips = new Array(m); ++i < m;) {
    for (var j = -1, n, zip = zips[i] = new Array(n); ++j < n;) {
      zip[j] = arguments[j][i];
    }
  }
  return zips;
};

function d3_zipLength(d) {
  return d.length;
}
d3.bisector = function(f) {
  return {
    left: function(a, x, lo, hi) {
      if (arguments.length < 3) lo = 0;
      if (arguments.length < 4) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >> 1;
        if (f.call(a, a[mid], mid) < x) lo = mid + 1;
        else hi = mid;
      }
      return lo;
    },
    right: function(a, x, lo, hi) {
      if (arguments.length < 3) lo = 0;
      if (arguments.length < 4) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >> 1;
        if (x < f.call(a, a[mid], mid)) hi = mid;
        else lo = mid + 1;
      }
      return lo;
    }
  };
};

var d3_bisector = d3.bisector(function(d) { return d; });
d3.bisectLeft = d3_bisector.left;
d3.bisect = d3.bisectRight = d3_bisector.right;
d3.first = function(array, f) {
  var i = 0,
      n = array.length,
      a = array[0],
      b;
  if (arguments.length === 1) f = d3.ascending;
  while (++i < n) {
    if (f.call(array, a, b = array[i]) > 0) {
      a = b;
    }
  }
  return a;
};
d3.last = function(array, f) {
  var i = 0,
      n = array.length,
      a = array[0],
      b;
  if (arguments.length === 1) f = d3.ascending;
  while (++i < n) {
    if (f.call(array, a, b = array[i]) <= 0) {
      a = b;
    }
  }
  return a;
};
d3.nest = function() {
  var nest = {},
      keys = [],
      sortKeys = [],
      sortValues,
      rollup;

  function map(array, depth) {
    if (depth >= keys.length) return rollup
        ? rollup.call(nest, array) : (sortValues
        ? array.sort(sortValues)
        : array);

    var i = -1,
        n = array.length,
        key = keys[depth++],
        keyValue,
        object,
        valuesByKey = new d3_Map,
        values,
        o = {};

    while (++i < n) {
      if (values = valuesByKey.get(keyValue = key(object = array[i]))) {
        values.push(object);
      } else {
        valuesByKey.set(keyValue, [object]);
      }
    }

    valuesByKey.forEach(function(keyValue) {
      o[keyValue] = map(valuesByKey.get(keyValue), depth);
    });

    return o;
  }

  function entries(map, depth) {
    if (depth >= keys.length) return map;

    var a = [],
        sortKey = sortKeys[depth++],
        key;

    for (key in map) {
      a.push({key: key, values: entries(map[key], depth)});
    }

    if (sortKey) a.sort(function(a, b) {
      return sortKey(a.key, b.key);
    });

    return a;
  }

  nest.map = function(array) {
    return map(array, 0);
  };

  nest.entries = function(array) {
    return entries(map(array, 0), 0);
  };

  nest.key = function(d) {
    keys.push(d);
    return nest;
  };

  // Specifies the order for the most-recently specified key.
  // Note: only applies to entries. Map keys are unordered!
  nest.sortKeys = function(order) {
    sortKeys[keys.length - 1] = order;
    return nest;
  };

  // Specifies the order for leaf values.
  // Applies to both maps and entries array.
  nest.sortValues = function(order) {
    sortValues = order;
    return nest;
  };

  nest.rollup = function(f) {
    rollup = f;
    return nest;
  };

  return nest;
};
d3.keys = function(map) {
  var keys = [];
  for (var key in map) keys.push(key);
  return keys;
};
d3.values = function(map) {
  var values = [];
  for (var key in map) values.push(map[key]);
  return values;
};
d3.entries = function(map) {
  var entries = [];
  for (var key in map) entries.push({key: key, value: map[key]});
  return entries;
};
d3.permute = function(array, indexes) {
  var permutes = [],
      i = -1,
      n = indexes.length;
  while (++i < n) permutes[i] = array[indexes[i]];
  return permutes;
};
d3.merge = function(arrays) {
  return Array.prototype.concat.apply([], arrays);
};
d3.split = function(array, f) {
  var arrays = [],
      values = [],
      value,
      i = -1,
      n = array.length;
  if (arguments.length < 2) f = d3_splitter;
  while (++i < n) {
    if (f.call(values, value = array[i], i)) {
      values = [];
    } else {
      if (!values.length) arrays.push(values);
      values.push(value);
    }
  }
  return arrays;
};

function d3_splitter(d) {
  return d == null;
}
function d3_collapse(s) {
  return s.replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ");
}
d3.range = function(start, stop, step) {
  if (arguments.length < 3) {
    step = 1;
    if (arguments.length < 2) {
      stop = start;
      start = 0;
    }
  }
  if ((stop - start) / step === Infinity) throw new Error("infinite range");
  var range = [],
       k = d3_range_integerScale(Math.abs(step)),
       i = -1,
       j;
  start *= k, stop *= k, step *= k;
  if (step < 0) while ((j = start + step * ++i) > stop) range.push(j / k);
  else while ((j = start + step * ++i) < stop) range.push(j / k);
  return range;
};

function d3_range_integerScale(x) {
  var k = 1;
  while (x * k % 1) k *= 10;
  return k;
}
d3.requote = function(s) {
  return s.replace(d3_requote_re, "\\$&");
};

var d3_requote_re = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
d3.round = function(x, n) {
  return n
      ? Math.round(x * (n = Math.pow(10, n))) / n
      : Math.round(x);
};
d3.xhr = function(url, mime, callback) {
  var req = new XMLHttpRequest;
  if (arguments.length < 3) callback = mime, mime = null;
  else if (mime && req.overrideMimeType) req.overrideMimeType(mime);
  req.open("GET", url, true);
  if (mime) req.setRequestHeader("Accept", mime);
  req.onreadystatechange = function() {
    if (req.readyState === 4) {
      var s = req.status;
      callback(!s && req.response || s >= 200 && s < 300 || s === 304 ? req : null);
    }
  };
  req.send(null);
};
d3.text = function(url, mime, callback) {
  function ready(req) {
    callback(req && req.responseText);
  }
  if (arguments.length < 3) {
    callback = mime;
    mime = null;
  }
  d3.xhr(url, mime, ready);
};
d3.json = function(url, callback) {
  d3.text(url, "application/json", function(text) {
    callback(text ? JSON.parse(text) : null);
  });
};
d3.html = function(url, callback) {
  d3.text(url, "text/html", function(text) {
    if (text != null) { // Treat empty string as valid HTML.
      var range = document.createRange();
      range.selectNode(document.body);
      text = range.createContextualFragment(text);
    }
    callback(text);
  });
};
d3.xml = function(url, mime, callback) {
  function ready(req) {
    callback(req && req.responseXML);
  }
  if (arguments.length < 3) {
    callback = mime;
    mime = null;
  }
  d3.xhr(url, mime, ready);
};
var d3_nsPrefix = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: "http://www.w3.org/1999/xhtml",
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

d3.ns = {
  prefix: d3_nsPrefix,
  qualify: function(name) {
    var i = name.indexOf(":"),
        prefix = name;
    if (i >= 0) {
      prefix = name.substring(0, i);
      name = name.substring(i + 1);
    }
    return d3_nsPrefix.hasOwnProperty(prefix)
        ? {space: d3_nsPrefix[prefix], local: name}
        : name;
  }
};
d3.dispatch = function() {
  var dispatch = new d3_dispatch,
      i = -1,
      n = arguments.length;
  while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);
  return dispatch;
};

function d3_dispatch() {}

d3_dispatch.prototype.on = function(type, listener) {
  var i = type.indexOf("."),
      name = "";

  // Extract optional namespace, e.g., "click.foo"
  if (i > 0) {
    name = type.substring(i + 1);
    type = type.substring(0, i);
  }

  return arguments.length < 2
      ? this[type].on(name)
      : this[type].on(name, listener);
};

function d3_dispatch_event(dispatch) {
  var listeners = [],
      listenerByName = new d3_Map;

  function event() {
    var z = listeners, // defensive reference
        i = -1,
        n = z.length,
        l;
    while (++i < n) if (l = z[i].on) l.apply(this, arguments);
    return dispatch;
  }

  event.on = function(name, listener) {
    var l = listenerByName.get(name),
        i;

    // return the current listener, if any
    if (arguments.length < 2) return l && l.on;

    // remove the old listener, if any (with copy-on-write)
    if (l) {
      l.on = null;
      listeners = listeners.slice(0, i = listeners.indexOf(l)).concat(listeners.slice(i + 1));
      listenerByName.remove(name);
    }

    // add the new listener, if any
    if (listener) listeners.push(listenerByName.set(name, {on: listener}));

    return dispatch;
  };

  return event;
}
// TODO align
d3.format = function(specifier) {
  var match = d3_format_re.exec(specifier),
      fill = match[1] || " ",
      sign = match[3] || "",
      zfill = match[5],
      width = +match[6],
      comma = match[7],
      precision = match[8],
      type = match[9],
      scale = 1,
      suffix = "",
      integer = false;

  if (precision) precision = +precision.substring(1);

  if (zfill) {
    fill = "0"; // TODO align = "=";
    if (comma) width -= Math.floor((width - 1) / 4);
  }

  switch (type) {
    case "n": comma = true; type = "g"; break;
    case "%": scale = 100; suffix = "%"; type = "f"; break;
    case "p": scale = 100; suffix = "%"; type = "r"; break;
    case "d": integer = true; precision = 0; break;
    case "s": scale = -1; type = "r"; break;
  }

  // If no precision is specified for r, fallback to general notation.
  if (type == "r" && !precision) type = "g";

  type = d3_format_types.get(type) || d3_format_typeDefault;

  return function(value) {

    // Return the empty string for floats formatted as ints.
    if (integer && (value % 1)) return "";

    // Convert negative to positive, and record the sign prefix.
    var negative = (value < 0) && (value = -value) ? "\u2212" : sign;

    // Apply the scale, computing it from the value's exponent for si format.
    if (scale < 0) {
      var prefix = d3.formatPrefix(value, precision);
      value = prefix.scale(value);
      suffix = prefix.symbol;
    } else {
      value *= scale;
    }

    // Convert to the desired precision.
    value = type(value, precision);

    // If the fill character is 0, the sign and group is applied after the fill.
    if (zfill) {
      var length = value.length + negative.length;
      if (length < width) value = new Array(width - length + 1).join(fill) + value;
      if (comma) value = d3_format_group(value);
      value = negative + value;
    }

    // Otherwise (e.g., space-filling), the sign and group is applied before.
    else {
      if (comma) value = d3_format_group(value);
      value = negative + value;
      var length = value.length;
      if (length < width) value = new Array(width - length + 1).join(fill) + value;
    }

    return value + suffix;
  };
};

// [[fill]align][sign][#][0][width][,][.precision][type]
var d3_format_re = /(?:([^{])?([<>=^]))?([+\- ])?(#)?(0)?([0-9]+)?(,)?(\.[0-9]+)?([a-zA-Z%])?/;

var d3_format_types = d3.map({
  g: function(x, p) { return x.toPrecision(p); },
  e: function(x, p) { return x.toExponential(p); },
  f: function(x, p) { return x.toFixed(p); },
  r: function(x, p) { return d3.round(x, p = d3_format_precision(x, p)).toFixed(Math.max(0, Math.min(20, p))); }
});

function d3_format_precision(x, p) {
  return p - (x ? 1 + Math.floor(Math.log(x + Math.pow(10, 1 + Math.floor(Math.log(x) / Math.LN10) - p)) / Math.LN10) : 1);
}

function d3_format_typeDefault(x) {
  return x + "";
}

// Apply comma grouping for thousands.
function d3_format_group(value) {
  var i = value.lastIndexOf("."),
      f = i >= 0 ? value.substring(i) : (i = value.length, ""),
      t = [];
  while (i > 0) t.push(value.substring(i -= 3, i + 3));
  return t.reverse().join(",") + f;
}
var d3_formatPrefixes = ["y","z","a","f","p","n","μ","m","","k","M","G","T","P","E","Z","Y"].map(d3_formatPrefix);

d3.formatPrefix = function(value, precision) {
  var i = 0;
  if (value) {
    if (value < 0) value *= -1;
    if (precision) value = d3.round(value, d3_format_precision(value, precision));
    i = 1 + Math.floor(1e-12 + Math.log(value) / Math.LN10);
    i = Math.max(-24, Math.min(24, Math.floor((i <= 0 ? i + 1 : i - 1) / 3) * 3));
  }
  return d3_formatPrefixes[8 + i / 3];
};

function d3_formatPrefix(d, i) {
  var k = Math.pow(10, Math.abs(8 - i) * 3);
  return {
    scale: i > 8 ? function(d) { return d / k; } : function(d) { return d * k; },
    symbol: d
  };
}
/*
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the author nor the names of contributors may be used to
 *   endorse or promote products derived from this software without specific
 *   prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

var d3_ease_quad = d3_ease_poly(2),
    d3_ease_cubic = d3_ease_poly(3),
    d3_ease_default = function() { return d3_ease_identity; };

var d3_ease = d3.map({
  linear: d3_ease_default,
  poly: d3_ease_poly,
  quad: function() { return d3_ease_quad; },
  cubic: function() { return d3_ease_cubic; },
  sin: function() { return d3_ease_sin; },
  exp: function() { return d3_ease_exp; },
  circle: function() { return d3_ease_circle; },
  elastic: d3_ease_elastic,
  back: d3_ease_back,
  bounce: function() { return d3_ease_bounce; }
});

var d3_ease_mode = d3.map({
  "in": d3_ease_identity,
  "out": d3_ease_reverse,
  "in-out": d3_ease_reflect,
  "out-in": function(f) { return d3_ease_reflect(d3_ease_reverse(f)); }
});

d3.ease = function(name) {
  var i = name.indexOf("-"),
      t = i >= 0 ? name.substring(0, i) : name,
      m = i >= 0 ? name.substring(i + 1) : "in";
  t = d3_ease.get(t) || d3_ease_default;
  m = d3_ease_mode.get(m) || d3_ease_identity;
  return d3_ease_clamp(m(t.apply(null, Array.prototype.slice.call(arguments, 1))));
};

function d3_ease_clamp(f) {
  return function(t) {
    return t <= 0 ? 0 : t >= 1 ? 1 : f(t);
  };
}

function d3_ease_reverse(f) {
  return function(t) {
    return 1 - f(1 - t);
  };
}

function d3_ease_reflect(f) {
  return function(t) {
    return .5 * (t < .5 ? f(2 * t) : (2 - f(2 - 2 * t)));
  };
}

function d3_ease_identity(t) {
  return t;
}

function d3_ease_poly(e) {
  return function(t) {
    return Math.pow(t, e);
  };
}

function d3_ease_sin(t) {
  return 1 - Math.cos(t * Math.PI / 2);
}

function d3_ease_exp(t) {
  return Math.pow(2, 10 * (t - 1));
}

function d3_ease_circle(t) {
  return 1 - Math.sqrt(1 - t * t);
}

function d3_ease_elastic(a, p) {
  var s;
  if (arguments.length < 2) p = 0.45;
  if (arguments.length < 1) { a = 1; s = p / 4; }
  else s = p / (2 * Math.PI) * Math.asin(1 / a);
  return function(t) {
    return 1 + a * Math.pow(2, 10 * -t) * Math.sin((t - s) * 2 * Math.PI / p);
  };
}

function d3_ease_back(s) {
  if (!s) s = 1.70158;
  return function(t) {
    return t * t * ((s + 1) * t - s);
  };
}

function d3_ease_bounce(t) {
  return t < 1 / 2.75 ? 7.5625 * t * t
      : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75
      : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375
      : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
}
d3.event = null;

function d3_eventCancel() {
  d3.event.stopPropagation();
  d3.event.preventDefault();
}

function d3_eventSource() {
  var e = d3.event, s;
  while (s = e.sourceEvent) e = s;
  return e;
}

// Like d3.dispatch, but for custom events abstracting native UI events. These
// events have a target component (such as a brush), a target element (such as
// the svg:g element containing the brush) and the standard arguments `d` (the
// target element's data) and `i` (the selection index of the target element).
function d3_eventDispatch(target) {
  var dispatch = new d3_dispatch,
      i = 0,
      n = arguments.length;

  while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);

  // Creates a dispatch context for the specified `thiz` (typically, the target
  // DOM element that received the source event) and `argumentz` (typically, the
  // data `d` and index `i` of the target element). The returned function can be
  // used to dispatch an event to any registered listeners; the function takes a
  // single argument as input, being the event to dispatch. The event must have
  // a "type" attribute which corresponds to a type registered in the
  // constructor. This context will automatically populate the "sourceEvent" and
  // "target" attributes of the event, as well as setting the `d3.event` global
  // for the duration of the notification.
  dispatch.of = function(thiz, argumentz) {
    return function(e1) {
      try {
        var e0 =
        e1.sourceEvent = d3.event;
        e1.target = target;
        d3.event = e1;
        dispatch[e1.type].apply(thiz, argumentz);
      } finally {
        d3.event = e0;
      }
    };
  };

  return dispatch;
}
d3.interpolate = function(a, b) {
  var i = d3.interpolators.length, f;
  while (--i >= 0 && !(f = d3.interpolators[i](a, b)));
  return f;
};

d3.interpolateNumber = function(a, b) {
  b -= a;
  return function(t) { return a + b * t; };
};

d3.interpolateRound = function(a, b) {
  b -= a;
  return function(t) { return Math.round(a + b * t); };
};

d3.interpolateString = function(a, b) {
  var m, // current match
      i, // current index
      j, // current index (for coallescing)
      s0 = 0, // start index of current string prefix
      s1 = 0, // end index of current string prefix
      s = [], // string constants and placeholders
      q = [], // number interpolators
      n, // q.length
      o;

  // Reset our regular expression!
  d3_interpolate_number.lastIndex = 0;

  // Find all numbers in b.
  for (i = 0; m = d3_interpolate_number.exec(b); ++i) {
    if (m.index) s.push(b.substring(s0, s1 = m.index));
    q.push({i: s.length, x: m[0]});
    s.push(null);
    s0 = d3_interpolate_number.lastIndex;
  }
  if (s0 < b.length) s.push(b.substring(s0));

  // Find all numbers in a.
  for (i = 0, n = q.length; (m = d3_interpolate_number.exec(a)) && i < n; ++i) {
    o = q[i];
    if (o.x == m[0]) { // The numbers match, so coallesce.
      if (o.i) {
        if (s[o.i + 1] == null) { // This match is followed by another number.
          s[o.i - 1] += o.x;
          s.splice(o.i, 1);
          for (j = i + 1; j < n; ++j) q[j].i--;
        } else { // This match is followed by a string, so coallesce twice.
          s[o.i - 1] += o.x + s[o.i + 1];
          s.splice(o.i, 2);
          for (j = i + 1; j < n; ++j) q[j].i -= 2;
        }
      } else {
          if (s[o.i + 1] == null) { // This match is followed by another number.
          s[o.i] = o.x;
        } else { // This match is followed by a string, so coallesce twice.
          s[o.i] = o.x + s[o.i + 1];
          s.splice(o.i + 1, 1);
          for (j = i + 1; j < n; ++j) q[j].i--;
        }
      }
      q.splice(i, 1);
      n--;
      i--;
    } else {
      o.x = d3.interpolateNumber(parseFloat(m[0]), parseFloat(o.x));
    }
  }

  // Remove any numbers in b not found in a.
  while (i < n) {
    o = q.pop();
    if (s[o.i + 1] == null) { // This match is followed by another number.
      s[o.i] = o.x;
    } else { // This match is followed by a string, so coallesce twice.
      s[o.i] = o.x + s[o.i + 1];
      s.splice(o.i + 1, 1);
    }
    n--;
  }

  // Special optimization for only a single match.
  if (s.length === 1) {
    return s[0] == null ? q[0].x : function() { return b; };
  }

  // Otherwise, interpolate each of the numbers and rejoin the string.
  return function(t) {
    for (i = 0; i < n; ++i) s[(o = q[i]).i] = o.x(t);
    return s.join("");
  };
};

d3.interpolateTransform = function(a, b) {
  var s = [], // string constants and placeholders
      q = [], // number interpolators
      n,
      A = d3.transform(a),
      B = d3.transform(b),
      ta = A.translate,
      tb = B.translate,
      ra = A.rotate,
      rb = B.rotate,
      wa = A.skew,
      wb = B.skew,
      ka = A.scale,
      kb = B.scale;

  if (ta[0] != tb[0] || ta[1] != tb[1]) {
    s.push("translate(", null, ",", null, ")");
    q.push({i: 1, x: d3.interpolateNumber(ta[0], tb[0])}, {i: 3, x: d3.interpolateNumber(ta[1], tb[1])});
  } else if (tb[0] || tb[1]) {
    s.push("translate(" + tb + ")");
  } else {
    s.push("");
  }

  if (ra != rb) {
    if (ra - rb > 180) rb += 360; else if (rb - ra > 180) ra += 360; // shortest path
    q.push({i: s.push(s.pop() + "rotate(", null, ")") - 2, x: d3.interpolateNumber(ra, rb)});
  } else if (rb) {
    s.push(s.pop() + "rotate(" + rb + ")");
  }

  if (wa != wb) {
    q.push({i: s.push(s.pop() + "skewX(", null, ")") - 2, x: d3.interpolateNumber(wa, wb)});
  } else if (wb) {
    s.push(s.pop() + "skewX(" + wb + ")");
  }

  if (ka[0] != kb[0] || ka[1] != kb[1]) {
    n = s.push(s.pop() + "scale(", null, ",", null, ")");
    q.push({i: n - 4, x: d3.interpolateNumber(ka[0], kb[0])}, {i: n - 2, x: d3.interpolateNumber(ka[1], kb[1])});
  } else if (kb[0] != 1 || kb[1] != 1) {
    s.push(s.pop() + "scale(" + kb + ")");
  }

  n = q.length;
  return function(t) {
    var i = -1, o;
    while (++i < n) s[(o = q[i]).i] = o.x(t);
    return s.join("");
  };
};

d3.interpolateRgb = function(a, b) {
  a = d3.rgb(a);
  b = d3.rgb(b);
  var ar = a.r,
      ag = a.g,
      ab = a.b,
      br = b.r - ar,
      bg = b.g - ag,
      bb = b.b - ab;
  return function(t) {
    return "#"
        + d3_rgb_hex(Math.round(ar + br * t))
        + d3_rgb_hex(Math.round(ag + bg * t))
        + d3_rgb_hex(Math.round(ab + bb * t));
  };
};

// interpolates HSL space, but outputs RGB string (for compatibility)
d3.interpolateHsl = function(a, b) {
  a = d3.hsl(a);
  b = d3.hsl(b);
  var h0 = a.h,
      s0 = a.s,
      l0 = a.l,
      h1 = b.h - h0,
      s1 = b.s - s0,
      l1 = b.l - l0;
  if (h1 > 180) h1 -= 360; else if (h1 < -180) h1 += 360; // shortest path
  return function(t) {
    return d3_hsl_rgb(h0 + h1 * t, s0 + s1 * t, l0 + l1 * t).toString();
  };
};

d3.interpolateArray = function(a, b) {
  var x = [],
      c = [],
      na = a.length,
      nb = b.length,
      n0 = Math.min(a.length, b.length),
      i;
  for (i = 0; i < n0; ++i) x.push(d3.interpolate(a[i], b[i]));
  for (; i < na; ++i) c[i] = a[i];
  for (; i < nb; ++i) c[i] = b[i];
  return function(t) {
    for (i = 0; i < n0; ++i) c[i] = x[i](t);
    return c;
  };
};

d3.interpolateObject = function(a, b) {
  var i = {},
      c = {},
      k;
  for (k in a) {
    if (k in b) {
      i[k] = d3_interpolateByName(k)(a[k], b[k]);
    } else {
      c[k] = a[k];
    }
  }
  for (k in b) {
    if (!(k in a)) {
      c[k] = b[k];
    }
  }
  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
}

var d3_interpolate_number = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;

function d3_interpolateByName(n) {
  return n == "transform"
      ? d3.interpolateTransform
      : d3.interpolate;
}

d3.interpolators = [
  d3.interpolateObject,
  function(a, b) { return (b instanceof Array) && d3.interpolateArray(a, b); },
  function(a, b) { return (typeof a === "string" || typeof b === "string") && d3.interpolateString(a + "", b + ""); },
  function(a, b) { return (typeof b === "string" ? d3_rgb_names.has(b) || /^(#|rgb\(|hsl\()/.test(b) : b instanceof d3_Rgb || b instanceof d3_Hsl) && d3.interpolateRgb(a, b); },
  function(a, b) { return !isNaN(a = +a) && !isNaN(b = +b) && d3.interpolateNumber(a, b); }
];
function d3_uninterpolateNumber(a, b) {
  b = b - (a = +a) ? 1 / (b - a) : 0;
  return function(x) { return (x - a) * b; };
}

function d3_uninterpolateClamp(a, b) {
  b = b - (a = +a) ? 1 / (b - a) : 0;
  return function(x) { return Math.max(0, Math.min(1, (x - a) * b)); };
}
d3.rgb = function(r, g, b) {
  return arguments.length === 1
      ? (r instanceof d3_Rgb ? d3_rgb(r.r, r.g, r.b)
      : d3_rgb_parse("" + r, d3_rgb, d3_hsl_rgb))
      : d3_rgb(~~r, ~~g, ~~b);
};

function d3_rgb(r, g, b) {
  return new d3_Rgb(r, g, b);
}

function d3_Rgb(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;
}

d3_Rgb.prototype.brighter = function(k) {
  k = Math.pow(0.7, arguments.length ? k : 1);
  var r = this.r,
      g = this.g,
      b = this.b,
      i = 30;
  if (!r && !g && !b) return d3_rgb(i, i, i);
  if (r && r < i) r = i;
  if (g && g < i) g = i;
  if (b && b < i) b = i;
  return d3_rgb(
      Math.min(255, Math.floor(r / k)),
      Math.min(255, Math.floor(g / k)),
      Math.min(255, Math.floor(b / k)));
};

d3_Rgb.prototype.darker = function(k) {
  k = Math.pow(0.7, arguments.length ? k : 1);
  return d3_rgb(
      Math.floor(k * this.r),
      Math.floor(k * this.g),
      Math.floor(k * this.b));
};

d3_Rgb.prototype.hsl = function() {
  return d3_rgb_hsl(this.r, this.g, this.b);
};

d3_Rgb.prototype.toString = function() {
  return "#" + d3_rgb_hex(this.r) + d3_rgb_hex(this.g) + d3_rgb_hex(this.b);
};

function d3_rgb_hex(v) {
  return v < 0x10
      ? "0" + Math.max(0, v).toString(16)
      : Math.min(255, v).toString(16);
}

function d3_rgb_parse(format, rgb, hsl) {
  var r = 0, // red channel; int in [0, 255]
      g = 0, // green channel; int in [0, 255]
      b = 0, // blue channel; int in [0, 255]
      m1, // CSS color specification match
      m2, // CSS color specification type (e.g., rgb)
      name;

  /* Handle hsl, rgb. */
  m1 = /([a-z]+)\((.*)\)/i.exec(format);
  if (m1) {
    m2 = m1[2].split(",");
    switch (m1[1]) {
      case "hsl": {
        return hsl(
          parseFloat(m2[0]), // degrees
          parseFloat(m2[1]) / 100, // percentage
          parseFloat(m2[2]) / 100 // percentage
        );
      }
      case "rgb": {
        return rgb(
          d3_rgb_parseNumber(m2[0]),
          d3_rgb_parseNumber(m2[1]),
          d3_rgb_parseNumber(m2[2])
        );
      }
    }
  }

  /* Named colors. */
  if (name = d3_rgb_names.get(format)) return rgb(name.r, name.g, name.b);

  /* Hexadecimal colors: #rgb and #rrggbb. */
  if (format != null && format.charAt(0) === "#") {
    if (format.length === 4) {
      r = format.charAt(1); r += r;
      g = format.charAt(2); g += g;
      b = format.charAt(3); b += b;
    } else if (format.length === 7) {
      r = format.substring(1, 3);
      g = format.substring(3, 5);
      b = format.substring(5, 7);
    }
    r = parseInt(r, 16);
    g = parseInt(g, 16);
    b = parseInt(b, 16);
  }

  return rgb(r, g, b);
}

function d3_rgb_hsl(r, g, b) {
  var min = Math.min(r /= 255, g /= 255, b /= 255),
      max = Math.max(r, g, b),
      d = max - min,
      h,
      s,
      l = (max + min) / 2;
  if (d) {
    s = l < .5 ? d / (max + min) : d / (2 - max - min);
    if (r == max) h = (g - b) / d + (g < b ? 6 : 0);
    else if (g == max) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  } else {
    s = h = 0;
  }
  return d3_hsl(h, s, l);
}

function d3_rgb_parseNumber(c) { // either integer or percentage
  var f = parseFloat(c);
  return c.charAt(c.length - 1) === "%" ? Math.round(f * 2.55) : f;
}

var d3_rgb_names = d3.map({
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
});

d3_rgb_names.forEach(function(key, value) {
  d3_rgb_names.set(key, d3_rgb_parse(value, d3_rgb, d3_hsl_rgb));
});
d3.hsl = function(h, s, l) {
  return arguments.length === 1
      ? (h instanceof d3_Hsl ? d3_hsl(h.h, h.s, h.l)
      : d3_rgb_parse("" + h, d3_rgb_hsl, d3_hsl))
      : d3_hsl(+h, +s, +l);
};

function d3_hsl(h, s, l) {
  return new d3_Hsl(h, s, l);
}

function d3_Hsl(h, s, l) {
  this.h = h;
  this.s = s;
  this.l = l;
}

d3_Hsl.prototype.brighter = function(k) {
  k = Math.pow(0.7, arguments.length ? k : 1);
  return d3_hsl(this.h, this.s, this.l / k);
};

d3_Hsl.prototype.darker = function(k) {
  k = Math.pow(0.7, arguments.length ? k : 1);
  return d3_hsl(this.h, this.s, k * this.l);
};

d3_Hsl.prototype.rgb = function() {
  return d3_hsl_rgb(this.h, this.s, this.l);
};

d3_Hsl.prototype.toString = function() {
  return this.rgb().toString();
};

function d3_hsl_rgb(h, s, l) {
  var m1,
      m2;

  /* Some simple corrections for h, s and l. */
  h = h % 360; if (h < 0) h += 360;
  s = s < 0 ? 0 : s > 1 ? 1 : s;
  l = l < 0 ? 0 : l > 1 ? 1 : l;

  /* From FvD 13.37, CSS Color Module Level 3 */
  m2 = l <= .5 ? l * (1 + s) : l + s - l * s;
  m1 = 2 * l - m2;

  function v(h) {
    if (h > 360) h -= 360;
    else if (h < 0) h += 360;
    if (h < 60) return m1 + (m2 - m1) * h / 60;
    if (h < 180) return m2;
    if (h < 240) return m1 + (m2 - m1) * (240 - h) / 60;
    return m1;
  }

  function vv(h) {
    return Math.round(v(h) * 255);
  }

  return d3_rgb(vv(h + 120), vv(h), vv(h - 120));
}
function d3_selection(groups) {
  d3_arraySubclass(groups, d3_selectionPrototype);
  return groups;
}

var d3_select = function(s, n) { return n.querySelector(s); },
    d3_selectAll = function(s, n) { return n.querySelectorAll(s); },
    d3_selectRoot = document.documentElement,
    d3_selectMatcher = d3_selectRoot.matchesSelector || d3_selectRoot.webkitMatchesSelector || d3_selectRoot.mozMatchesSelector || d3_selectRoot.msMatchesSelector || d3_selectRoot.oMatchesSelector,
    d3_selectMatches = function(n, s) { return d3_selectMatcher.call(n, s); };

// Prefer Sizzle, if available.
if (typeof Sizzle === "function") {
  d3_select = function(s, n) { return Sizzle(s, n)[0] || null; };
  d3_selectAll = function(s, n) { return Sizzle.uniqueSort(Sizzle(s, n)); };
  d3_selectMatches = Sizzle.matchesSelector;
}

var d3_selectionPrototype = [];

d3.selection = function() {
  return d3_selectionRoot;
};

d3.selection.prototype = d3_selectionPrototype;
d3_selectionPrototype.select = function(selector) {
  var subgroups = [],
      subgroup,
      subnode,
      group,
      node;

  if (typeof selector !== "function") selector = d3_selection_selector(selector);

  for (var j = -1, m = this.length; ++j < m;) {
    subgroups.push(subgroup = []);
    subgroup.parentNode = (group = this[j]).parentNode;
    for (var i = -1, n = group.length; ++i < n;) {
      if (node = group[i]) {
        subgroup.push(subnode = selector.call(node, node.__data__, i));
        if (subnode && "__data__" in node) subnode.__data__ = node.__data__;
      } else {
        subgroup.push(null);
      }
    }
  }

  return d3_selection(subgroups);
};

function d3_selection_selector(selector) {
  return function() {
    return d3_select(selector, this);
  };
}
d3_selectionPrototype.selectAll = function(selector) {
  var subgroups = [],
      subgroup,
      node;

  if (typeof selector !== "function") selector = d3_selection_selectorAll(selector);

  for (var j = -1, m = this.length; ++j < m;) {
    for (var group = this[j], i = -1, n = group.length; ++i < n;) {
      if (node = group[i]) {
        subgroups.push(subgroup = d3_array(selector.call(node, node.__data__, i)));
        subgroup.parentNode = node;
      }
    }
  }

  return d3_selection(subgroups);
};

function d3_selection_selectorAll(selector) {
  return function() {
    return d3_selectAll(selector, this);
  };
}
d3_selectionPrototype.attr = function(name, value) {
  name = d3.ns.qualify(name);

  // If no value is specified, return the first value.
  if (arguments.length < 2) {
    var node = this.node();
    return name.local
        ? node.getAttributeNS(name.space, name.local)
        : node.getAttribute(name);
  }

  function attrNull() {
    this.removeAttribute(name);
  }

  function attrNullNS() {
    this.removeAttributeNS(name.space, name.local);
  }

  function attrConstant() {
    this.setAttribute(name, value);
  }

  function attrConstantNS() {
    this.setAttributeNS(name.space, name.local, value);
  }

  function attrFunction() {
    var x = value.apply(this, arguments);
    if (x == null) this.removeAttribute(name);
    else this.setAttribute(name, x);
  }

  function attrFunctionNS() {
    var x = value.apply(this, arguments);
    if (x == null) this.removeAttributeNS(name.space, name.local);
    else this.setAttributeNS(name.space, name.local, x);
  }

  return this.each(value == null
      ? (name.local ? attrNullNS : attrNull) : (typeof value === "function"
      ? (name.local ? attrFunctionNS : attrFunction)
      : (name.local ? attrConstantNS : attrConstant)));
};
d3_selectionPrototype.classed = function(name, value) {
  var names = d3_collapse(name).split(" "),
      n = names.length,
      i = -1;
  if (arguments.length > 1) {
    while (++i < n) d3_selection_classed.call(this, names[i], value);
    return this;
  } else {
    while (++i < n) if (!d3_selection_classed.call(this, names[i])) return false;
    return true;
  }
};

function d3_selection_classed(name, value) {
  var re = new RegExp("(^|\\s+)" + d3.requote(name) + "(\\s+|$)", "g");

  // If no value is specified, return the first value.
  if (arguments.length < 2) {
    var node = this.node();
    if (c = node.classList) return c.contains(name);
    var c = node.className;
    re.lastIndex = 0;
    return re.test(c.baseVal != null ? c.baseVal : c);
  }

  function classedAdd() {
    if (c = this.classList) return c.add(name);
    var c = this.className,
        cb = c.baseVal != null,
        cv = cb ? c.baseVal : c;
    re.lastIndex = 0;
    if (!re.test(cv)) {
      cv = d3_collapse(cv + " " + name);
      if (cb) c.baseVal = cv;
      else this.className = cv;
    }
  }

  function classedRemove() {
    if (c = this.classList) return c.remove(name);
    var c = this.className,
        cb = c.baseVal != null,
        cv = cb ? c.baseVal : c;
    cv = d3_collapse(cv.replace(re, " "));
    if (cb) c.baseVal = cv;
    else this.className = cv;
  }

  function classedFunction() {
    (value.apply(this, arguments)
        ? classedAdd
        : classedRemove).call(this);
  }

  return this.each(typeof value === "function"
      ? classedFunction : value
      ? classedAdd
      : classedRemove);
}
d3_selectionPrototype.style = function(name, value, priority) {
  if (arguments.length < 3) priority = "";

  // If no value is specified, return the first value.
  if (arguments.length < 2) return window
      .getComputedStyle(this.node(), null)
      .getPropertyValue(name);

  function styleNull() {
    this.style.removeProperty(name);
  }

  function styleConstant() {
    this.style.setProperty(name, value, priority);
  }

  function styleFunction() {
    var x = value.apply(this, arguments);
    if (x == null) this.style.removeProperty(name);
    else this.style.setProperty(name, x, priority);
  }

  return this.each(value == null
      ? styleNull : (typeof value === "function"
      ? styleFunction : styleConstant));
};
d3_selectionPrototype.property = function(name, value) {

  // If no value is specified, return the first value.
  if (arguments.length < 2) return this.node()[name];

  function propertyNull() {
    delete this[name];
  }

  function propertyConstant() {
    this[name] = value;
  }

  function propertyFunction() {
    var x = value.apply(this, arguments);
    if (x == null) delete this[name];
    else this[name] = x;
  }

  return this.each(value == null
      ? propertyNull : (typeof value === "function"
      ? propertyFunction : propertyConstant));
};
d3_selectionPrototype.text = function(value) {
  return arguments.length < 1
      ? this.node().textContent : this.each(typeof value === "function"
      ? function() { var v = value.apply(this, arguments); this.textContent = v == null ? "" : v; } : value == null
      ? function() { this.textContent = ""; }
      : function() { this.textContent = value; });
};
d3_selectionPrototype.html = function(value) {
  return arguments.length < 1
      ? this.node().innerHTML : this.each(typeof value === "function"
      ? function() { var v = value.apply(this, arguments); this.innerHTML = v == null ? "" : v; } : value == null
      ? function() { this.innerHTML = ""; }
      : function() { this.innerHTML = value; });
};
// TODO append(node)?
// TODO append(function)?
d3_selectionPrototype.append = function(name) {
  name = d3.ns.qualify(name);

  function append() {
    return this.appendChild(document.createElementNS(this.namespaceURI, name));
  }

  function appendNS() {
    return this.appendChild(document.createElementNS(name.space, name.local));
  }

  return this.select(name.local ? appendNS : append);
};
// TODO insert(node, function)?
// TODO insert(function, string)?
// TODO insert(function, function)?
d3_selectionPrototype.insert = function(name, before) {
  name = d3.ns.qualify(name);

  function insert() {
    return this.insertBefore(
        document.createElementNS(this.namespaceURI, name),
        d3_select(before, this));
  }

  function insertNS() {
    return this.insertBefore(
        document.createElementNS(name.space, name.local),
        d3_select(before, this));
  }

  return this.select(name.local ? insertNS : insert);
};
// TODO remove(selector)?
// TODO remove(node)?
// TODO remove(function)?
d3_selectionPrototype.remove = function() {
  return this.each(function() {
    var parent = this.parentNode;
    if (parent) parent.removeChild(this);
  });
};
d3_selectionPrototype.data = function(value, key) {
  var i = -1,
      n = this.length,
      group,
      node;

  // If no value is specified, return the first value.
  if (!arguments.length) {
    value = new Array(n = (group = this[0]).length);
    while (++i < n) {
      if (node = group[i]) {
        value[i] = node.__data__;
      }
    }
    return value;
  }

  function bind(group, groupData) {
    var i,
        n = group.length,
        m = groupData.length,
        n0 = Math.min(n, m),
        n1 = Math.max(n, m),
        updateNodes = [],
        enterNodes = [],
        exitNodes = [],
        node,
        nodeData;

    if (key) {
      var nodeByKeyValue = new d3_Map,
          keyValues = [],
          keyValue,
          j = groupData.length;

      for (i = -1; ++i < n;) {
        keyValue = key.call(node = group[i], node.__data__, i);
        if (nodeByKeyValue.has(keyValue)) {
          exitNodes[j++] = node; // duplicate key
        } else {
          nodeByKeyValue.set(keyValue, node);
        }
        keyValues.push(keyValue);
      }

      for (i = -1; ++i < m;) {
        keyValue = key.call(groupData, nodeData = groupData[i], i)
        if (nodeByKeyValue.has(keyValue)) {
          updateNodes[i] = node = nodeByKeyValue.get(keyValue);
          node.__data__ = nodeData;
          enterNodes[i] = exitNodes[i] = null;
        } else {
          enterNodes[i] = d3_selection_dataNode(nodeData);
          updateNodes[i] = exitNodes[i] = null;
        }
        nodeByKeyValue.remove(keyValue);
      }

      for (i = -1; ++i < n;) {
        if (nodeByKeyValue.has(keyValues[i])) {
          exitNodes[i] = group[i];
        }
      }
    } else {
      for (i = -1; ++i < n0;) {
        node = group[i];
        nodeData = groupData[i];
        if (node) {
          node.__data__ = nodeData;
          updateNodes[i] = node;
          enterNodes[i] = exitNodes[i] = null;
        } else {
          enterNodes[i] = d3_selection_dataNode(nodeData);
          updateNodes[i] = exitNodes[i] = null;
        }
      }
      for (; i < m; ++i) {
        enterNodes[i] = d3_selection_dataNode(groupData[i]);
        updateNodes[i] = exitNodes[i] = null;
      }
      for (; i < n1; ++i) {
        exitNodes[i] = group[i];
        enterNodes[i] = updateNodes[i] = null;
      }
    }

    enterNodes.update
        = updateNodes;

    enterNodes.parentNode
        = updateNodes.parentNode
        = exitNodes.parentNode
        = group.parentNode;

    enter.push(enterNodes);
    update.push(updateNodes);
    exit.push(exitNodes);
  }

  var enter = d3_selection_enter([]),
      update = d3_selection([]),
      exit = d3_selection([]);

  if (typeof value === "function") {
    while (++i < n) {
      bind(group = this[i], value.call(group, group.parentNode.__data__, i));
    }
  } else {
    while (++i < n) {
      bind(group = this[i], value);
    }
  }

  update.enter = function() { return enter; };
  update.exit = function() { return exit; };
  return update;
};

function d3_selection_dataNode(data) {
  return {__data__: data};
}
d3_selectionPrototype.datum =
d3_selectionPrototype.map = function(value) {
  return arguments.length < 1
      ? this.property("__data__")
      : this.property("__data__", value);
};
d3_selectionPrototype.filter = function(filter) {
  var subgroups = [],
      subgroup,
      group,
      node;

  if (typeof filter !== "function") filter = d3_selection_filter(filter);

  for (var j = 0, m = this.length; j < m; j++) {
    subgroups.push(subgroup = []);
    subgroup.parentNode = (group = this[j]).parentNode;
    for (var i = 0, n = group.length; i < n; i++) {
      if ((node = group[i]) && filter.call(node, node.__data__, i)) {
        subgroup.push(node);
      }
    }
  }

  return d3_selection(subgroups);
};

function d3_selection_filter(selector) {
  return function() {
    return d3_selectMatches(this, selector);
  };
}
d3_selectionPrototype.order = function() {
  for (var j = -1, m = this.length; ++j < m;) {
    for (var group = this[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && next !== node.nextSibling) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }
  return this;
};
d3_selectionPrototype.sort = function(comparator) {
  comparator = d3_selection_sortComparator.apply(this, arguments);
  for (var j = -1, m = this.length; ++j < m;) this[j].sort(comparator);
  return this.order();
};

function d3_selection_sortComparator(comparator) {
  if (!arguments.length) comparator = d3.ascending;
  return function(a, b) {
    return comparator(a && a.__data__, b && b.__data__);
  };
}
// type can be namespaced, e.g., "click.foo"
// listener can be null for removal
d3_selectionPrototype.on = function(type, listener, capture) {
  if (arguments.length < 3) capture = false;

  // parse the type specifier
  var name = "__on" + type, i = type.indexOf(".");
  if (i > 0) type = type.substring(0, i);

  // if called with only one argument, return the current listener
  if (arguments.length < 2) return (i = this.node()[name]) && i._;

  // remove the old event listener, and add the new event listener
  return this.each(function(d, i) {
    var node = this,
        o = node[name];

    // remove the old listener, if any (using the previously-set capture)
    if (o) {
      node.removeEventListener(type, o, o.$);
      delete node[name];
    }

    // add the new listener, if any (remembering the capture flag)
    if (listener) {
      node.addEventListener(type, node[name] = l, l.$ = capture);
      l._ = listener; // stash the unwrapped listener for get
    }

    // wrapped event listener that preserves i
    function l(e) {
      var o = d3.event; // Events can be reentrant (e.g., focus).
      d3.event = e;
      try {
        listener.call(node, node.__data__, i);
      } finally {
        d3.event = o;
      }
    }
  });
};
d3_selectionPrototype.each = function(callback) {
  return d3_selection_each(this, function(node, i, j) {
    callback.call(node, node.__data__, i, j);
  });
};

function d3_selection_each(groups, callback) {
  for (var j = 0, m = groups.length; j < m; j++) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; i++) {
      if (node = group[i]) callback(node, i, j);
    }
  }
  return groups;
}
//
// Note: assigning to the arguments array simultaneously changes the value of
// the corresponding argument!
//
// TODO The `this` argument probably shouldn't be the first argument to the
// callback, anyway, since it's redundant. However, that will require a major
// version bump due to backwards compatibility, so I'm not changing it right
// away.
//
d3_selectionPrototype.call = function(callback) {
  callback.apply(this, (arguments[0] = this, arguments));
  return this;
};
d3_selectionPrototype.empty = function() {
  return !this.node();
};
d3_selectionPrototype.node = function(callback) {
  for (var j = 0, m = this.length; j < m; j++) {
    for (var group = this[j], i = 0, n = group.length; i < n; i++) {
      var node = group[i];
      if (node) return node;
    }
  }
  return null;
};
d3_selectionPrototype.transition = function() {
  var subgroups = [],
      subgroup,
      node;

  for (var j = -1, m = this.length; ++j < m;) {
    subgroups.push(subgroup = []);
    for (var group = this[j], i = -1, n = group.length; ++i < n;) {
      subgroup.push((node = group[i]) ? {node: node, delay: d3_transitionDelay, duration: d3_transitionDuration} : null);
    }
  }

  return d3_transition(subgroups, d3_transitionId || ++d3_transitionNextId, Date.now());
};
var d3_selectionRoot = d3_selection([[document]]);

d3_selectionRoot[0].parentNode = d3_selectRoot;

// TODO fast singleton implementation!
// TODO select(function)
d3.select = function(selector) {
  return typeof selector === "string"
      ? d3_selectionRoot.select(selector)
      : d3_selection([[selector]]); // assume node
};

// TODO selectAll(function)
d3.selectAll = function(selector) {
  return typeof selector === "string"
      ? d3_selectionRoot.selectAll(selector)
      : d3_selection([d3_array(selector)]); // assume node[]
};
function d3_selection_enter(selection) {
  d3_arraySubclass(selection, d3_selection_enterPrototype);
  return selection;
}

var d3_selection_enterPrototype = [];

d3.selection.enter = d3_selection_enter;
d3.selection.enter.prototype = d3_selection_enterPrototype;

d3_selection_enterPrototype.append = d3_selectionPrototype.append;
d3_selection_enterPrototype.insert = d3_selectionPrototype.insert;
d3_selection_enterPrototype.empty = d3_selectionPrototype.empty;
d3_selection_enterPrototype.node = d3_selectionPrototype.node;
d3_selection_enterPrototype.select = function(selector) {
  var subgroups = [],
      subgroup,
      subnode,
      upgroup,
      group,
      node;

  for (var j = -1, m = this.length; ++j < m;) {
    upgroup = (group = this[j]).update;
    subgroups.push(subgroup = []);
    subgroup.parentNode = group.parentNode;
    for (var i = -1, n = group.length; ++i < n;) {
      if (node = group[i]) {
        subgroup.push(upgroup[i] = subnode = selector.call(group.parentNode, node.__data__, i));
        subnode.__data__ = node.__data__;
      } else {
        subgroup.push(null);
      }
    }
  }

  return d3_selection(subgroups);
};
function d3_transition(groups, id, time) {
  d3_arraySubclass(groups, d3_transitionPrototype);

  var tweens = new d3_Map,
      event = d3.dispatch("start", "end"),
      ease = d3_transitionEase;

  groups.id = id;

  groups.time = time;

  groups.tween = function(name, tween) {
    if (arguments.length < 2) return tweens.get(name);
    if (tween == null) tweens.remove(name);
    else tweens.set(name, tween);
    return groups;
  };

  groups.ease = function(value) {
    if (!arguments.length) return ease;
    ease = typeof value === "function" ? value : d3.ease.apply(d3, arguments);
    return groups;
  };

  groups.each = function(type, listener) {
    if (arguments.length < 2) return d3_transition_each.call(groups, type);
    event.on(type, listener);
    return groups;
  };

  d3.timer(function(elapsed) {
    return d3_selection_each(groups, function(node, i, j) {
      var tweened = [],
          delay = node.delay,
          duration = node.duration,
          lock = (node = node.node).__transition__ || (node.__transition__ = {active: 0, count: 0}),
          d = node.__data__;

      ++lock.count;

      delay <= elapsed ? start(elapsed) : d3.timer(start, delay, time);

      function start(elapsed) {
        if (lock.active > id) return stop();
        lock.active = id;

        tweens.forEach(function(key, value) {
          if (value = value.call(node, d, i)) {
            tweened.push(value);
          }
        });

        event.start.call(node, d, i);
        if (!tick(elapsed)) d3.timer(tick, 0, time);
        return 1;
      }

      function tick(elapsed) {
        if (lock.active !== id) return stop();

        var t = (elapsed - delay) / duration,
            e = ease(t),
            n = tweened.length;

        while (n > 0) {
          tweened[--n].call(node, e);
        }

        if (t >= 1) {
          stop();
          d3_transitionId = id;
          event.end.call(node, d, i);
          d3_transitionId = 0;
          return 1;
        }
      }

      function stop() {
        if (!--lock.count) delete node.__transition__;
        return 1;
      }
    });
  }, 0, time);

  return groups;
}

var d3_transitionRemove = {};

function d3_transitionNull(d, i, a) {
  return a != "" && d3_transitionRemove;
}

function d3_transitionTween(name, b) {
  var interpolate = d3_interpolateByName(name);

  function transitionFunction(d, i, a) {
    var v = b.call(this, d, i);
    return v == null
        ? a != "" && d3_transitionRemove
        : a != v && interpolate(a, v);
  }

  function transitionString(d, i, a) {
    return a != b && interpolate(a, b);
  }

  return typeof b === "function" ? transitionFunction
      : b == null ? d3_transitionNull
      : (b += "", transitionString);
}

var d3_transitionPrototype = [],
    d3_transitionNextId = 0,
    d3_transitionId = 0,
    d3_transitionDefaultDelay = 0,
    d3_transitionDefaultDuration = 250,
    d3_transitionDefaultEase = d3.ease("cubic-in-out"),
    d3_transitionDelay = d3_transitionDefaultDelay,
    d3_transitionDuration = d3_transitionDefaultDuration,
    d3_transitionEase = d3_transitionDefaultEase;

d3_transitionPrototype.call = d3_selectionPrototype.call;

d3.transition = function(selection) {
  return arguments.length
      ? (d3_transitionId ? selection.transition() : selection)
      : d3_selectionRoot.transition();
};

d3.transition.prototype = d3_transitionPrototype;
d3_transitionPrototype.select = function(selector) {
  var subgroups = [],
      subgroup,
      subnode,
      node;

  if (typeof selector !== "function") selector = d3_selection_selector(selector);

  for (var j = -1, m = this.length; ++j < m;) {
    subgroups.push(subgroup = []);
    for (var group = this[j], i = -1, n = group.length; ++i < n;) {
      if ((node = group[i]) && (subnode = selector.call(node.node, node.node.__data__, i))) {
        if ("__data__" in node.node) subnode.__data__ = node.node.__data__;
        subgroup.push({node: subnode, delay: node.delay, duration: node.duration});
      } else {
        subgroup.push(null);
      }
    }
  }

  return d3_transition(subgroups, this.id, this.time).ease(this.ease());
};
d3_transitionPrototype.selectAll = function(selector) {
  var subgroups = [],
      subgroup,
      subnodes,
      node;

  if (typeof selector !== "function") selector = d3_selection_selectorAll(selector);

  for (var j = -1, m = this.length; ++j < m;) {
    for (var group = this[j], i = -1, n = group.length; ++i < n;) {
      if (node = group[i]) {
        subnodes = selector.call(node.node, node.node.__data__, i);
        subgroups.push(subgroup = []);
        for (var k = -1, o = subnodes.length; ++k < o;) {
          subgroup.push({node: subnodes[k], delay: node.delay, duration: node.duration});
        }
      }
    }
  }

  return d3_transition(subgroups, this.id, this.time).ease(this.ease());
};
d3_transitionPrototype.attr = function(name, value) {
  return this.attrTween(name, d3_transitionTween(name, value));
};

d3_transitionPrototype.attrTween = function(nameNS, tween) {
  var name = d3.ns.qualify(nameNS);

  function attrTween(d, i) {
    var f = tween.call(this, d, i, this.getAttribute(name));
    return f === d3_transitionRemove
        ? (this.removeAttribute(name), null)
        : f && function(t) { this.setAttribute(name, f(t)); };
  }

  function attrTweenNS(d, i) {
    var f = tween.call(this, d, i, this.getAttributeNS(name.space, name.local));
    return f === d3_transitionRemove
        ? (this.removeAttributeNS(name.space, name.local), null)
        : f && function(t) { this.setAttributeNS(name.space, name.local, f(t)); };
  }

  return this.tween("attr." + nameNS, name.local ? attrTweenNS : attrTween);
};
d3_transitionPrototype.style = function(name, value, priority) {
  if (arguments.length < 3) priority = "";
  return this.styleTween(name, d3_transitionTween(name, value), priority);
};

d3_transitionPrototype.styleTween = function(name, tween, priority) {
  if (arguments.length < 3) priority = "";
  return this.tween("style." + name, function(d, i) {
    var f = tween.call(this, d, i, window.getComputedStyle(this, null).getPropertyValue(name));
    return f === d3_transitionRemove
        ? (this.style.removeProperty(name), null)
        : f && function(t) { this.style.setProperty(name, f(t), priority); };
  });
};
d3_transitionPrototype.text = function(value) {
  return this.tween("text", function(d, i) {
    this.textContent = typeof value === "function"
        ? value.call(this, d, i)
        : value;
  });
};
d3_transitionPrototype.remove = function() {
  return this.each("end.transition", function() {
    var p;
    if (!this.__transition__ && (p = this.parentNode)) p.removeChild(this);
  });
};
d3_transitionPrototype.delay = function(value) {
  return d3_selection_each(this, typeof value === "function"
      ? function(node, i, j) { node.delay = value.call(node = node.node, node.__data__, i, j) | 0; }
      : (value = value | 0, function(node) { node.delay = value; }));
};
d3_transitionPrototype.duration = function(value) {
  return d3_selection_each(this, typeof value === "function"
      ? function(node, i, j) { node.duration = Math.max(1, value.call(node = node.node, node.__data__, i, j) | 0); }
      : (value = Math.max(1, value | 0), function(node) { node.duration = value; }));
};
function d3_transition_each(callback) {
  var id = d3_transitionId,
      ease = d3_transitionEase,
      delay = d3_transitionDelay,
      duration = d3_transitionDuration;

  d3_transitionId = this.id;
  d3_transitionEase = this.ease();
  d3_selection_each(this, function(node, i, j) {
    d3_transitionDelay = node.delay;
    d3_transitionDuration = node.duration;
    callback.call(node = node.node, node.__data__, i, j);
  });

  d3_transitionId = id;
  d3_transitionEase = ease;
  d3_transitionDelay = delay;
  d3_transitionDuration = duration;
  return this;
}
d3_transitionPrototype.transition = function() {
  return this.select(d3_this);
};
var d3_timer_queue = null,
    d3_timer_interval, // is an interval (or frame) active?
    d3_timer_timeout; // is a timeout active?

// The timer will continue to fire until callback returns true.
d3.timer = function(callback, delay, then) {
  var found = false,
      t0,
      t1 = d3_timer_queue;

  if (arguments.length < 3) {
    if (arguments.length < 2) delay = 0;
    else if (!isFinite(delay)) return;
    then = Date.now();
  }

  // See if the callback's already in the queue.
  while (t1) {
    if (t1.callback === callback) {
      t1.then = then;
      t1.delay = delay;
      found = true;
      break;
    }
    t0 = t1;
    t1 = t1.next;
  }

  // Otherwise, add the callback to the queue.
  if (!found) d3_timer_queue = {
    callback: callback,
    then: then,
    delay: delay,
    next: d3_timer_queue
  };

  // Start animatin'!
  if (!d3_timer_interval) {
    d3_timer_timeout = clearTimeout(d3_timer_timeout);
    d3_timer_interval = 1;
    d3_timer_frame(d3_timer_step);
  }
}

function d3_timer_step() {
  var elapsed,
      now = Date.now(),
      t1 = d3_timer_queue;

  while (t1) {
    elapsed = now - t1.then;
    if (elapsed >= t1.delay) t1.flush = t1.callback(elapsed);
    t1 = t1.next;
  }

  var delay = d3_timer_flush() - now;
  if (delay > 24) {
    if (isFinite(delay)) {
      clearTimeout(d3_timer_timeout);
      d3_timer_timeout = setTimeout(d3_timer_step, delay);
    }
    d3_timer_interval = 0;
  } else {
    d3_timer_interval = 1;
    d3_timer_frame(d3_timer_step);
  }
}

d3.timer.flush = function() {
  var elapsed,
      now = Date.now(),
      t1 = d3_timer_queue;

  while (t1) {
    elapsed = now - t1.then;
    if (!t1.delay) t1.flush = t1.callback(elapsed);
    t1 = t1.next;
  }

  d3_timer_flush();
};

// Flush after callbacks, to avoid concurrent queue modification.
function d3_timer_flush() {
  var t0 = null,
      t1 = d3_timer_queue,
      then = Infinity;
  while (t1) {
    if (t1.flush) {
      t1 = t0 ? t0.next = t1.next : d3_timer_queue = t1.next;
    } else {
      then = Math.min(then, t1.then + t1.delay);
      t1 = (t0 = t1).next;
    }
  }
  return then;
}

var d3_timer_frame = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(callback) { setTimeout(callback, 17); };
d3.transform = function(string) {
  var g = document.createElementNS(d3.ns.prefix.svg, "g"),
      identity = {a: 1, b: 0, c: 0, d: 1, e: 0, f: 0};
  return (d3.transform = function(string) {
    g.setAttribute("transform", string);
    var t = g.transform.baseVal.consolidate();
    return new d3_transform(t ? t.matrix : identity);
  })(string);
};

// Compute x-scale and normalize the first row.
// Compute shear and make second row orthogonal to first.
// Compute y-scale and normalize the second row.
// Finally, compute the rotation.
function d3_transform(m) {
  var r0 = [m.a, m.b],
      r1 = [m.c, m.d],
      kx = d3_transformNormalize(r0),
      kz = d3_transformDot(r0, r1),
      ky = d3_transformNormalize(d3_transformCombine(r1, r0, -kz)) || 0;
  if (r0[0] * r1[1] < r1[0] * r0[1]) {
    r0[0] *= -1;
    r0[1] *= -1;
    kx *= -1;
    kz *= -1;
  }
  this.rotate = (kx ? Math.atan2(r0[1], r0[0]) : Math.atan2(-r1[0], r1[1])) * d3_transformDegrees;
  this.translate = [m.e, m.f];
  this.scale = [kx, ky];
  this.skew = ky ? Math.atan2(kz, ky) * d3_transformDegrees : 0;
};

d3_transform.prototype.toString = function() {
  return "translate(" + this.translate
      + ")rotate(" + this.rotate
      + ")skewX(" + this.skew
      + ")scale(" + this.scale
      + ")";
};

function d3_transformDot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}

function d3_transformNormalize(a) {
  var k = Math.sqrt(d3_transformDot(a, a));
  if (k) {
    a[0] /= k;
    a[1] /= k;
  }
  return k;
}

function d3_transformCombine(a, b, k) {
  a[0] += k * b[0];
  a[1] += k * b[1];
  return a;
}

var d3_transformDegrees = 180 / Math.PI;
d3.mouse = function(container) {
  return d3_mousePoint(container, d3_eventSource());
};

// https://bugs.webkit.org/show_bug.cgi?id=44083
var d3_mouse_bug44083 = /WebKit/.test(navigator.userAgent) ? -1 : 0;

function d3_mousePoint(container, e) {
  var svg = container.ownerSVGElement || container;
  if (svg.createSVGPoint) {
    var point = svg.createSVGPoint();
    if ((d3_mouse_bug44083 < 0) && (window.scrollX || window.scrollY)) {
      svg = d3.select(document.body)
        .append("svg")
          .style("position", "absolute")
          .style("top", 0)
          .style("left", 0);
      var ctm = svg[0][0].getScreenCTM();
      d3_mouse_bug44083 = !(ctm.f || ctm.e);
      svg.remove();
    }
    if (d3_mouse_bug44083) {
      point.x = e.pageX;
      point.y = e.pageY;
    } else {
      point.x = e.clientX;
      point.y = e.clientY;
    }
    point = point.matrixTransform(container.getScreenCTM().inverse());
    return [point.x, point.y];
  }
  var rect = container.getBoundingClientRect();
  return [e.clientX - rect.left - container.clientLeft, e.clientY - rect.top - container.clientTop];
};
d3.touches = function(container, touches) {
  if (arguments.length < 2) touches = d3_eventSource().touches;
  return touches ? d3_array(touches).map(function(touch) {
    var point = d3_mousePoint(container, touch);
    point.identifier = touch.identifier;
    return point;
  }) : [];
};
function d3_noop() {}
d3.scale = {};

function d3_scaleExtent(domain) {
  var start = domain[0], stop = domain[domain.length - 1];
  return start < stop ? [start, stop] : [stop, start];
}

function d3_scaleRange(scale) {
  return scale.rangeExtent ? scale.rangeExtent() : d3_scaleExtent(scale.range());
}
function d3_scale_nice(domain, nice) {
  var i0 = 0,
      i1 = domain.length - 1,
      x0 = domain[i0],
      x1 = domain[i1],
      dx;

  if (x1 < x0) {
    dx = i0; i0 = i1; i1 = dx;
    dx = x0; x0 = x1; x1 = dx;
  }

  if (dx = x1 - x0) {
    nice = nice(dx);
    domain[i0] = nice.floor(x0);
    domain[i1] = nice.ceil(x1);
  }

  return domain;
}

function d3_scale_niceDefault() {
  return Math;
}
d3.scale.linear = function() {
  return d3_scale_linear([0, 1], [0, 1], d3.interpolate, false);
};

function d3_scale_linear(domain, range, interpolate, clamp) {
  var output,
      input;

  function rescale() {
    var linear = Math.min(domain.length, range.length) > 2 ? d3_scale_polylinear : d3_scale_bilinear,
        uninterpolate = clamp ? d3_uninterpolateClamp : d3_uninterpolateNumber;
    output = linear(domain, range, uninterpolate, interpolate);
    input = linear(range, domain, uninterpolate, d3.interpolate);
    return scale;
  }

  function scale(x) {
    return output(x);
  }

  // Note: requires range is coercible to number!
  scale.invert = function(y) {
    return input(y);
  };

  scale.domain = function(x) {
    if (!arguments.length) return domain;
    domain = x.map(Number);
    return rescale();
  };

  scale.range = function(x) {
    if (!arguments.length) return range;
    range = x;
    return rescale();
  };

  scale.rangeRound = function(x) {
    return scale.range(x).interpolate(d3.interpolateRound);
  };

  scale.clamp = function(x) {
    if (!arguments.length) return clamp;
    clamp = x;
    return rescale();
  };

  scale.interpolate = function(x) {
    if (!arguments.length) return interpolate;
    interpolate = x;
    return rescale();
  };

  scale.ticks = function(m) {
    return d3_scale_linearTicks(domain, m);
  };

  scale.tickFormat = function(m) {
    return d3_scale_linearTickFormat(domain, m);
  };

  scale.nice = function() {
    d3_scale_nice(domain, d3_scale_linearNice);
    return rescale();
  };

  scale.copy = function() {
    return d3_scale_linear(domain, range, interpolate, clamp);
  };

  return rescale();
}

function d3_scale_linearRebind(scale, linear) {
  return d3.rebind(scale, linear, "range", "rangeRound", "interpolate", "clamp");
}

function d3_scale_linearNice(dx) {
  dx = Math.pow(10, Math.round(Math.log(dx) / Math.LN10) - 1);
  return {
    floor: function(x) { return Math.floor(x / dx) * dx; },
    ceil: function(x) { return Math.ceil(x / dx) * dx; }
  };
}

function d3_scale_linearTickRange(domain, m) {
  var extent = d3_scaleExtent(domain),
      span = extent[1] - extent[0],
      step = Math.pow(10, Math.floor(Math.log(span / m) / Math.LN10)),
      err = m / span * step;

  // Filter ticks to get closer to the desired count.
  if (err <= .15) step *= 10;
  else if (err <= .35) step *= 5;
  else if (err <= .75) step *= 2;

  // Round start and stop values to step interval.
  extent[0] = Math.ceil(extent[0] / step) * step;
  extent[1] = Math.floor(extent[1] / step) * step + step * .5; // inclusive
  extent[2] = step;
  return extent;
}

function d3_scale_linearTicks(domain, m) {
  return d3.range.apply(d3, d3_scale_linearTickRange(domain, m));
}

function d3_scale_linearTickFormat(domain, m) {
  return d3.format(",." + Math.max(0, -Math.floor(Math.log(d3_scale_linearTickRange(domain, m)[2]) / Math.LN10 + .01)) + "f");
}
function d3_scale_bilinear(domain, range, uninterpolate, interpolate) {
  var u = uninterpolate(domain[0], domain[1]),
      i = interpolate(range[0], range[1]);
  return function(x) {
    return i(u(x));
  };
}
function d3_scale_polylinear(domain, range, uninterpolate, interpolate) {
  var u = [],
      i = [],
      j = 0,
      k = Math.min(domain.length, range.length) - 1;

  // Handle descending domains.
  if (domain[k] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }

  while (++j <= k) {
    u.push(uninterpolate(domain[j - 1], domain[j]));
    i.push(interpolate(range[j - 1], range[j]));
  }

  return function(x) {
    var j = d3.bisect(domain, x, 1, k) - 1;
    return i[j](u[j](x));
  };
}
d3.scale.log = function() {
  return d3_scale_log(d3.scale.linear(), d3_scale_logp);
};

function d3_scale_log(linear, log) {
  var pow = log.pow;

  function scale(x) {
    return linear(log(x));
  }

  scale.invert = function(x) {
    return pow(linear.invert(x));
  };

  scale.domain = function(x) {
    if (!arguments.length) return linear.domain().map(pow);
    log = x[0] < 0 ? d3_scale_logn : d3_scale_logp;
    pow = log.pow;
    linear.domain(x.map(log));
    return scale;
  };

  scale.nice = function() {
    linear.domain(d3_scale_nice(linear.domain(), d3_scale_niceDefault));
    return scale;
  };

  scale.ticks = function() {
    var extent = d3_scaleExtent(linear.domain()),
        ticks = [];
    if (extent.every(isFinite)) {
      var i = Math.floor(extent[0]),
          j = Math.ceil(extent[1]),
          u = pow(extent[0]),
          v = pow(extent[1]);
      if (log === d3_scale_logn) {
        ticks.push(pow(i));
        for (; i++ < j;) for (var k = 9; k > 0; k--) ticks.push(pow(i) * k);
      } else {
        for (; i < j; i++) for (var k = 1; k < 10; k++) ticks.push(pow(i) * k);
        ticks.push(pow(i));
      }
      for (i = 0; ticks[i] < u; i++) {} // strip small values
      for (j = ticks.length; ticks[j - 1] > v; j--) {} // strip big values
      ticks = ticks.slice(i, j);
    }
    return ticks;
  };

  scale.tickFormat = function(n, format) {
    if (arguments.length < 2) format = d3_scale_logFormat;
    if (arguments.length < 1) return format;
    var k = Math.max(.1, n / scale.ticks().length),
        f = log === d3_scale_logn ? (e = -1e-12, Math.floor) : (e = 1e-12, Math.ceil),
        e;
    return function(d) {
      return d / pow(f(log(d) + e)) <= k ? format(d) : "";
    };
  };

  scale.copy = function() {
    return d3_scale_log(linear.copy(), log);
  };

  return d3_scale_linearRebind(scale, linear);
}

var d3_scale_logFormat = d3.format(".0e");

function d3_scale_logp(x) {
  return Math.log(x < 0 ? 0 : x) / Math.LN10;
}

function d3_scale_logn(x) {
  return -Math.log(x > 0 ? 0 : -x) / Math.LN10;
}

d3_scale_logp.pow = function(x) {
  return Math.pow(10, x);
};

d3_scale_logn.pow = function(x) {
  return -Math.pow(10, -x);
};
d3.scale.pow = function() {
  return d3_scale_pow(d3.scale.linear(), 1);
};

function d3_scale_pow(linear, exponent) {
  var powp = d3_scale_powPow(exponent),
      powb = d3_scale_powPow(1 / exponent);

  function scale(x) {
    return linear(powp(x));
  }

  scale.invert = function(x) {
    return powb(linear.invert(x));
  };

  scale.domain = function(x) {
    if (!arguments.length) return linear.domain().map(powb);
    linear.domain(x.map(powp));
    return scale;
  };

  scale.ticks = function(m) {
    return d3_scale_linearTicks(scale.domain(), m);
  };

  scale.tickFormat = function(m) {
    return d3_scale_linearTickFormat(scale.domain(), m);
  };

  scale.nice = function() {
    return scale.domain(d3_scale_nice(scale.domain(), d3_scale_linearNice));
  };

  scale.exponent = function(x) {
    if (!arguments.length) return exponent;
    var domain = scale.domain();
    powp = d3_scale_powPow(exponent = x);
    powb = d3_scale_powPow(1 / exponent);
    return scale.domain(domain);
  };

  scale.copy = function() {
    return d3_scale_pow(linear.copy(), exponent);
  };

  return d3_scale_linearRebind(scale, linear);
}

function d3_scale_powPow(e) {
  return function(x) {
    return x < 0 ? -Math.pow(-x, e) : Math.pow(x, e);
  };
}
d3.scale.sqrt = function() {
  return d3.scale.pow().exponent(.5);
};
d3.scale.ordinal = function() {
  return d3_scale_ordinal([], {t: "range", x: []});
};

function d3_scale_ordinal(domain, ranger) {
  var index,
      range,
      rangeBand;

  function scale(x) {
    return range[((index.get(x) || index.set(x, domain.push(x))) - 1) % range.length];
  }

  function steps(start, step) {
    return d3.range(domain.length).map(function(i) { return start + step * i; });
  }

  scale.domain = function(x) {
    if (!arguments.length) return domain;
    domain = [];
    index = new d3_Map;
    var i = -1, n = x.length, xi;
    while (++i < n) if (!index.has(xi = x[i])) index.set(xi, domain.push(xi));
    return scale[ranger.t](ranger.x, ranger.p);
  };

  scale.range = function(x) {
    if (!arguments.length) return range;
    range = x;
    rangeBand = 0;
    ranger = {t: "range", x: x};
    return scale;
  };

  scale.rangePoints = function(x, padding) {
    if (arguments.length < 2) padding = 0;
    var start = x[0],
        stop = x[1],
        step = (stop - start) / (domain.length - 1 + padding);
    range = steps(domain.length < 2 ? (start + stop) / 2 : start + step * padding / 2, step);
    rangeBand = 0;
    ranger = {t: "rangePoints", x: x, p: padding};
    return scale;
  };

  scale.rangeBands = function(x, padding) {
    if (arguments.length < 2) padding = 0;
    var reverse = x[1] < x[0],
        start = x[reverse - 0],
        stop = x[1 - reverse],
        step = (stop - start) / (domain.length + padding);
    range = steps(start + step * padding, step);
    if (reverse) range.reverse();
    rangeBand = step * (1 - padding);
    ranger = {t: "rangeBands", x: x, p: padding};
    return scale;
  };

  scale.rangeRoundBands = function(x, padding) {
    if (arguments.length < 2) padding = 0;
    var reverse = x[1] < x[0],
        start = x[reverse - 0],
        stop = x[1 - reverse],
        step = Math.floor((stop - start) / (domain.length + padding)),
        error = stop - start - (domain.length - padding) * step;
    range = steps(start + Math.round(error / 2), step);
    if (reverse) range.reverse();
    rangeBand = Math.round(step * (1 - padding));
    ranger = {t: "rangeRoundBands", x: x, p: padding};
    return scale;
  };

  scale.rangeBand = function() {
    return rangeBand;
  };

  scale.rangeExtent = function() {
    return d3_scaleExtent(ranger.x);
  };

  scale.copy = function() {
    return d3_scale_ordinal(domain, ranger);
  };

  return scale.domain(domain);
}
/*
 * This product includes color specifications and designs developed by Cynthia
 * Brewer (http://colorbrewer.org/). See lib/colorbrewer for more information.
 */

d3.scale.category10 = function() {
  return d3.scale.ordinal().range(d3_category10);
};

d3.scale.category20 = function() {
  return d3.scale.ordinal().range(d3_category20);
};

d3.scale.category20b = function() {
  return d3.scale.ordinal().range(d3_category20b);
};

d3.scale.category20c = function() {
  return d3.scale.ordinal().range(d3_category20c);
};

var d3_category10 = [
  "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
  "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
];

var d3_category20 = [
  "#1f77b4", "#aec7e8",
  "#ff7f0e", "#ffbb78",
  "#2ca02c", "#98df8a",
  "#d62728", "#ff9896",
  "#9467bd", "#c5b0d5",
  "#8c564b", "#c49c94",
  "#e377c2", "#f7b6d2",
  "#7f7f7f", "#c7c7c7",
  "#bcbd22", "#dbdb8d",
  "#17becf", "#9edae5"
];

var d3_category20b = [
  "#393b79", "#5254a3", "#6b6ecf", "#9c9ede",
  "#637939", "#8ca252", "#b5cf6b", "#cedb9c",
  "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94",
  "#843c39", "#ad494a", "#d6616b", "#e7969c",
  "#7b4173", "#a55194", "#ce6dbd", "#de9ed6"
];

var d3_category20c = [
  "#3182bd", "#6baed6", "#9ecae1", "#c6dbef",
  "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2",
  "#31a354", "#74c476", "#a1d99b", "#c7e9c0",
  "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb",
  "#636363", "#969696", "#bdbdbd", "#d9d9d9"
];
d3.scale.quantile = function() {
  return d3_scale_quantile([], []);
};

function d3_scale_quantile(domain, range) {
  var thresholds;

  function rescale() {
    var k = 0,
        n = domain.length,
        q = range.length;
    thresholds = [];
    while (++k < q) thresholds[k - 1] = d3.quantile(domain, k / q);
    return scale;
  }

  function scale(x) {
    if (isNaN(x = +x)) return NaN;
    return range[d3.bisect(thresholds, x)];
  }

  scale.domain = function(x) {
    if (!arguments.length) return domain;
    domain = x.filter(function(d) { return !isNaN(d); }).sort(d3.ascending);
    return rescale();
  };

  scale.range = function(x) {
    if (!arguments.length) return range;
    range = x;
    return rescale();
  };

  scale.quantiles = function() {
    return thresholds;
  };

  scale.copy = function() {
    return d3_scale_quantile(domain, range); // copy on write!
  };

  return rescale();
}
d3.scale.quantize = function() {
  return d3_scale_quantize(0, 1, [0, 1]);
};

function d3_scale_quantize(x0, x1, range) {
  var kx, i;

  function scale(x) {
    return range[Math.max(0, Math.min(i, Math.floor(kx * (x - x0))))];
  }

  function rescale() {
    kx = range.length / (x1 - x0);
    i = range.length - 1;
    return scale;
  }

  scale.domain = function(x) {
    if (!arguments.length) return [x0, x1];
    x0 = +x[0];
    x1 = +x[x.length - 1];
    return rescale();
  };

  scale.range = function(x) {
    if (!arguments.length) return range;
    range = x;
    return rescale();
  };

  scale.copy = function() {
    return d3_scale_quantize(x0, x1, range); // copy on write
  };

  return rescale();
}
d3.scale.identity = function() {
  return d3_scale_identity([0, 1]);
};

function d3_scale_identity(domain) {

  function identity(x) { return +x; }

  identity.invert = identity;

  identity.domain = identity.range = function(x) {
    if (!arguments.length) return domain;
    domain = x.map(identity);
    return identity;
  };

  identity.ticks = function(m) {
    return d3_scale_linearTicks(domain, m);
  };

  identity.tickFormat = function(m) {
    return d3_scale_linearTickFormat(domain, m);
  };

  identity.copy = function() {
    return d3_scale_identity(domain);
  };

  return identity;
}
d3.svg = {};
d3.svg.arc = function() {
  var innerRadius = d3_svg_arcInnerRadius,
      outerRadius = d3_svg_arcOuterRadius,
      startAngle = d3_svg_arcStartAngle,
      endAngle = d3_svg_arcEndAngle;

  function arc() {
    var r0 = innerRadius.apply(this, arguments),
        r1 = outerRadius.apply(this, arguments),
        a0 = startAngle.apply(this, arguments) + d3_svg_arcOffset,
        a1 = endAngle.apply(this, arguments) + d3_svg_arcOffset,
        da = (a1 < a0 && (da = a0, a0 = a1, a1 = da), a1 - a0),
        df = da < Math.PI ? "0" : "1",
        c0 = Math.cos(a0),
        s0 = Math.sin(a0),
        c1 = Math.cos(a1),
        s1 = Math.sin(a1);
    return da >= d3_svg_arcMax
      ? (r0
      ? "M0," + r1
      + "A" + r1 + "," + r1 + " 0 1,1 0," + (-r1)
      + "A" + r1 + "," + r1 + " 0 1,1 0," + r1
      + "M0," + r0
      + "A" + r0 + "," + r0 + " 0 1,0 0," + (-r0)
      + "A" + r0 + "," + r0 + " 0 1,0 0," + r0
      + "Z"
      : "M0," + r1
      + "A" + r1 + "," + r1 + " 0 1,1 0," + (-r1)
      + "A" + r1 + "," + r1 + " 0 1,1 0," + r1
      + "Z")
      : (r0
      ? "M" + r1 * c0 + "," + r1 * s0
      + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1
      + "L" + r0 * c1 + "," + r0 * s1
      + "A" + r0 + "," + r0 + " 0 " + df + ",0 " + r0 * c0 + "," + r0 * s0
      + "Z"
      : "M" + r1 * c0 + "," + r1 * s0
      + "A" + r1 + "," + r1 + " 0 " + df + ",1 " + r1 * c1 + "," + r1 * s1
      + "L0,0"
      + "Z");
  }

  arc.innerRadius = function(v) {
    if (!arguments.length) return innerRadius;
    innerRadius = d3_functor(v);
    return arc;
  };

  arc.outerRadius = function(v) {
    if (!arguments.length) return outerRadius;
    outerRadius = d3_functor(v);
    return arc;
  };

  arc.startAngle = function(v) {
    if (!arguments.length) return startAngle;
    startAngle = d3_functor(v);
    return arc;
  };

  arc.endAngle = function(v) {
    if (!arguments.length) return endAngle;
    endAngle = d3_functor(v);
    return arc;
  };

  arc.centroid = function() {
    var r = (innerRadius.apply(this, arguments)
        + outerRadius.apply(this, arguments)) / 2,
        a = (startAngle.apply(this, arguments)
        + endAngle.apply(this, arguments)) / 2 + d3_svg_arcOffset;
    return [Math.cos(a) * r, Math.sin(a) * r];
  };

  return arc;
};

var d3_svg_arcOffset = -Math.PI / 2,
    d3_svg_arcMax = 2 * Math.PI - 1e-6;

function d3_svg_arcInnerRadius(d) {
  return d.innerRadius;
}

function d3_svg_arcOuterRadius(d) {
  return d.outerRadius;
}

function d3_svg_arcStartAngle(d) {
  return d.startAngle;
}

function d3_svg_arcEndAngle(d) {
  return d.endAngle;
}
function d3_svg_line(projection) {
  var x = d3_svg_lineX,
      y = d3_svg_lineY,
      defined = d3_true,
      interpolate = d3_svg_lineInterpolatorDefault,
      interpolator = d3_svg_lineLinear,
      tension = .7;

  function line(data) {
    var segments = [],
        points = [],
        i = -1,
        n = data.length,
        d,
        fx = d3_functor(x),
        fy = d3_functor(y);

    function segment() {
      segments.push("M", interpolator(projection(points), tension));
    }

    while (++i < n) {
      if (defined.call(this, d = data[i], i)) {
        points.push([+fx.call(this, d, i), +fy.call(this, d, i)]);
      } else if (points.length) {
        segment();
        points = [];
      }
    }

    if (points.length) segment();

    return segments.length ? segments.join("") : null;
  }

  line.x = function(_) {
    if (!arguments.length) return x;
    x = _;
    return line;
  };

  line.y = function(_) {
    if (!arguments.length) return y;
    y = _;
    return line;
  };

  line.defined  = function(_) {
    if (!arguments.length) return defined;
    defined = _;
    return line;
  };

  line.interpolate = function(_) {
    if (!arguments.length) return interpolate;
    if (!d3_svg_lineInterpolators.has(_ += "")) _ = d3_svg_lineInterpolatorDefault;
    interpolator = d3_svg_lineInterpolators.get(interpolate = _);
    return line;
  };

  line.tension = function(_) {
    if (!arguments.length) return tension;
    tension = _;
    return line;
  };

  return line;
}

d3.svg.line = function() {
  return d3_svg_line(d3_identity);
};

// The default `x` property, which references d[0].
function d3_svg_lineX(d) {
  return d[0];
}

// The default `y` property, which references d[1].
function d3_svg_lineY(d) {
  return d[1];
}

var d3_svg_lineInterpolatorDefault = "linear";

// The various interpolators supported by the `line` class.
var d3_svg_lineInterpolators = d3.map({
  "linear": d3_svg_lineLinear,
  "step-before": d3_svg_lineStepBefore,
  "step-after": d3_svg_lineStepAfter,
  "basis": d3_svg_lineBasis,
  "basis-open": d3_svg_lineBasisOpen,
  "basis-closed": d3_svg_lineBasisClosed,
  "bundle": d3_svg_lineBundle,
  "cardinal": d3_svg_lineCardinal,
  "cardinal-open": d3_svg_lineCardinalOpen,
  "cardinal-closed": d3_svg_lineCardinalClosed,
  "monotone": d3_svg_lineMonotone
});

// Linear interpolation; generates "L" commands.
function d3_svg_lineLinear(points) {
  var i = 0,
      n = points.length,
      p = points[0],
      path = [p[0], ",", p[1]];
  while (++i < n) path.push("L", (p = points[i])[0], ",", p[1]);
  return path.join("");
}

// Step interpolation; generates "H" and "V" commands.
function d3_svg_lineStepBefore(points) {
  var i = 0,
      n = points.length,
      p = points[0],
      path = [p[0], ",", p[1]];
  while (++i < n) path.push("V", (p = points[i])[1], "H", p[0]);
  return path.join("");
}

// Step interpolation; generates "H" and "V" commands.
function d3_svg_lineStepAfter(points) {
  var i = 0,
      n = points.length,
      p = points[0],
      path = [p[0], ",", p[1]];
  while (++i < n) path.push("H", (p = points[i])[0], "V", p[1]);
  return path.join("");
}

// Open cardinal spline interpolation; generates "C" commands.
function d3_svg_lineCardinalOpen(points, tension) {
  return points.length < 4
      ? d3_svg_lineLinear(points)
      : points[1] + d3_svg_lineHermite(points.slice(1, points.length - 1),
        d3_svg_lineCardinalTangents(points, tension));
}

// Closed cardinal spline interpolation; generates "C" commands.
function d3_svg_lineCardinalClosed(points, tension) {
  return points.length < 3
      ? d3_svg_lineLinear(points)
      : points[0] + d3_svg_lineHermite((points.push(points[0]), points),
        d3_svg_lineCardinalTangents([points[points.length - 2]]
        .concat(points, [points[1]]), tension));
}

// Cardinal spline interpolation; generates "C" commands.
function d3_svg_lineCardinal(points, tension, closed) {
  return points.length < 3
      ? d3_svg_lineLinear(points)
      : points[0] + d3_svg_lineHermite(points,
        d3_svg_lineCardinalTangents(points, tension));
}

// Hermite spline construction; generates "C" commands.
function d3_svg_lineHermite(points, tangents) {
  if (tangents.length < 1
      || (points.length != tangents.length
      && points.length != tangents.length + 2)) {
    return d3_svg_lineLinear(points);
  }

  var quad = points.length != tangents.length,
      path = "",
      p0 = points[0],
      p = points[1],
      t0 = tangents[0],
      t = t0,
      pi = 1;

  if (quad) {
    path += "Q" + (p[0] - t0[0] * 2 / 3) + "," + (p[1] - t0[1] * 2 / 3)
        + "," + p[0] + "," + p[1];
    p0 = points[1];
    pi = 2;
  }

  if (tangents.length > 1) {
    t = tangents[1];
    p = points[pi];
    pi++;
    path += "C" + (p0[0] + t0[0]) + "," + (p0[1] + t0[1])
        + "," + (p[0] - t[0]) + "," + (p[1] - t[1])
        + "," + p[0] + "," + p[1];
    for (var i = 2; i < tangents.length; i++, pi++) {
      p = points[pi];
      t = tangents[i];
      path += "S" + (p[0] - t[0]) + "," + (p[1] - t[1])
          + "," + p[0] + "," + p[1];
    }
  }

  if (quad) {
    var lp = points[pi];
    path += "Q" + (p[0] + t[0] * 2 / 3) + "," + (p[1] + t[1] * 2 / 3)
        + "," + lp[0] + "," + lp[1];
  }

  return path;
}

// Generates tangents for a cardinal spline.
function d3_svg_lineCardinalTangents(points, tension) {
  var tangents = [],
      a = (1 - tension) / 2,
      p0,
      p1 = points[0],
      p2 = points[1],
      i = 1,
      n = points.length;
  while (++i < n) {
    p0 = p1;
    p1 = p2;
    p2 = points[i];
    tangents.push([a * (p2[0] - p0[0]), a * (p2[1] - p0[1])]);
  }
  return tangents;
}

// B-spline interpolation; generates "C" commands.
function d3_svg_lineBasis(points) {
  if (points.length < 3) return d3_svg_lineLinear(points);
  var i = 1,
      n = points.length,
      pi = points[0],
      x0 = pi[0],
      y0 = pi[1],
      px = [x0, x0, x0, (pi = points[1])[0]],
      py = [y0, y0, y0, pi[1]],
      path = [x0, ",", y0];
  d3_svg_lineBasisBezier(path, px, py);
  while (++i < n) {
    pi = points[i];
    px.shift(); px.push(pi[0]);
    py.shift(); py.push(pi[1]);
    d3_svg_lineBasisBezier(path, px, py);
  }
  i = -1;
  while (++i < 2) {
    px.shift(); px.push(pi[0]);
    py.shift(); py.push(pi[1]);
    d3_svg_lineBasisBezier(path, px, py);
  }
  return path.join("");
}

// Open B-spline interpolation; generates "C" commands.
function d3_svg_lineBasisOpen(points) {
  if (points.length < 4) return d3_svg_lineLinear(points);
  var path = [],
      i = -1,
      n = points.length,
      pi,
      px = [0],
      py = [0];
  while (++i < 3) {
    pi = points[i];
    px.push(pi[0]);
    py.push(pi[1]);
  }
  path.push(d3_svg_lineDot4(d3_svg_lineBasisBezier3, px)
    + "," + d3_svg_lineDot4(d3_svg_lineBasisBezier3, py));
  --i; while (++i < n) {
    pi = points[i];
    px.shift(); px.push(pi[0]);
    py.shift(); py.push(pi[1]);
    d3_svg_lineBasisBezier(path, px, py);
  }
  return path.join("");
}

// Closed B-spline interpolation; generates "C" commands.
function d3_svg_lineBasisClosed(points) {
  var path,
      i = -1,
      n = points.length,
      m = n + 4,
      pi,
      px = [],
      py = [];
  while (++i < 4) {
    pi = points[i % n];
    px.push(pi[0]);
    py.push(pi[1]);
  }
  path = [
    d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), ",",
    d3_svg_lineDot4(d3_svg_lineBasisBezier3, py)
  ];
  --i; while (++i < m) {
    pi = points[i % n];
    px.shift(); px.push(pi[0]);
    py.shift(); py.push(pi[1]);
    d3_svg_lineBasisBezier(path, px, py);
  }
  return path.join("");
}

function d3_svg_lineBundle(points, tension) {
  var n = points.length - 1;
  if (n) {
    var x0 = points[0][0],
        y0 = points[0][1],
        dx = points[n][0] - x0,
        dy = points[n][1] - y0,
        i = -1,
        p,
        t;
    while (++i <= n) {
      p = points[i];
      t = i / n;
      p[0] = tension * p[0] + (1 - tension) * (x0 + t * dx);
      p[1] = tension * p[1] + (1 - tension) * (y0 + t * dy);
    }
  }
  return d3_svg_lineBasis(points);
}

// Returns the dot product of the given four-element vectors.
function d3_svg_lineDot4(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}

// Matrix to transform basis (b-spline) control points to bezier
// control points. Derived from FvD 11.2.8.
var d3_svg_lineBasisBezier1 = [0, 2/3, 1/3, 0],
    d3_svg_lineBasisBezier2 = [0, 1/3, 2/3, 0],
    d3_svg_lineBasisBezier3 = [0, 1/6, 2/3, 1/6];

// Pushes a "C" Bézier curve onto the specified path array, given the
// two specified four-element arrays which define the control points.
function d3_svg_lineBasisBezier(path, x, y) {
  path.push(
      "C", d3_svg_lineDot4(d3_svg_lineBasisBezier1, x),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier1, y),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, x),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier2, y),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, x),
      ",", d3_svg_lineDot4(d3_svg_lineBasisBezier3, y));
}

// Computes the slope from points p0 to p1.
function d3_svg_lineSlope(p0, p1) {
  return (p1[1] - p0[1]) / (p1[0] - p0[0]);
}

// Compute three-point differences for the given points.
// http://en.wikipedia.org/wiki/Cubic_Hermite_spline#Finite_difference
function d3_svg_lineFiniteDifferences(points) {
  var i = 0,
      j = points.length - 1,
      m = [],
      p0 = points[0],
      p1 = points[1],
      d = m[0] = d3_svg_lineSlope(p0, p1);
  while (++i < j) {
    m[i] = d + (d = d3_svg_lineSlope(p0 = p1, p1 = points[i + 1]));
  }
  m[i] = d;
  return m;
}

// Interpolates the given points using Fritsch-Carlson Monotone cubic Hermite
// interpolation. Returns an array of tangent vectors. For details, see
// http://en.wikipedia.org/wiki/Monotone_cubic_interpolation
function d3_svg_lineMonotoneTangents(points) {
  var tangents = [],
      d,
      a,
      b,
      s,
      m = d3_svg_lineFiniteDifferences(points),
      i = -1,
      j = points.length - 1;

  // The first two steps are done by computing finite-differences:
  // 1. Compute the slopes of the secant lines between successive points.
  // 2. Initialize the tangents at every point as the average of the secants.

  // Then, for each segment…
  while (++i < j) {
    d = d3_svg_lineSlope(points[i], points[i + 1]);

    // 3. If two successive yk = y{k + 1} are equal (i.e., d is zero), then set
    // mk = m{k + 1} = 0 as the spline connecting these points must be flat to
    // preserve monotonicity. Ignore step 4 and 5 for those k.

    if (Math.abs(d) < 1e-6) {
      m[i] = m[i + 1] = 0;
    } else {
      // 4. Let ak = mk / dk and bk = m{k + 1} / dk.
      a = m[i] / d;
      b = m[i + 1] / d;

      // 5. Prevent overshoot and ensure monotonicity by restricting the
      // magnitude of vector <ak, bk> to a circle of radius 3.
      s = a * a + b * b;
      if (s > 9) {
        s = d * 3 / Math.sqrt(s);
        m[i] = s * a;
        m[i + 1] = s * b;
      }
    }
  }

  // Compute the normalized tangent vector from the slopes. Note that if x is
  // not monotonic, it's possible that the slope will be infinite, so we protect
  // against NaN by setting the coordinate to zero.
  i = -1; while (++i <= j) {
    s = (points[Math.min(j, i + 1)][0] - points[Math.max(0, i - 1)][0]) / (6 * (1 + m[i] * m[i]));
    tangents.push([s || 0, m[i] * s || 0]);
  }

  return tangents;
}

function d3_svg_lineMonotone(points) {
  return points.length < 3
      ? d3_svg_lineLinear(points)
      : points[0] + d3_svg_lineHermite(points, d3_svg_lineMonotoneTangents(points));
}
d3.svg.line.radial = function() {
  var line = d3_svg_line(d3_svg_lineRadial);
  line.radius = line.x, delete line.x;
  line.angle = line.y, delete line.y;
  return line;
};

function d3_svg_lineRadial(points) {
  var point,
      i = -1,
      n = points.length,
      r,
      a;
  while (++i < n) {
    point = points[i];
    r = point[0];
    a = point[1] + d3_svg_arcOffset;
    point[0] = r * Math.cos(a);
    point[1] = r * Math.sin(a);
  }
  return points;
}
function d3_svg_area(projection) {
  var x0 = d3_svg_lineX,
      x1 = d3_svg_lineX,
      y0 = 0,
      y1 = d3_svg_lineY,
      defined = d3_true,
      interpolate = d3_svg_lineInterpolatorDefault,
      i0 = d3_svg_lineLinear,
      i1 = d3_svg_lineLinear,
      L = "L",
      tension = .7;

  function area(data) {
    var segments = [],
        points0 = [],
        points1 = [],
        i = -1,
        n = data.length,
        d,
        fx0 = d3_functor(x0),
        fy0 = d3_functor(y0),
        fx1 = x0 === x1 ? function() { return x; } : d3_functor(x1),
        fy1 = y0 === y1 ? function() { return y; } : d3_functor(y1),
        x,
        y;

    function segment() {
      segments.push("M", i0(projection(points1), tension),
          L, i1(projection(points0.reverse()), tension),
          "Z");
    }

    while (++i < n) {
      if (defined.call(this, d = data[i], i)) {
        points0.push([x = +fx0.call(this, d, i), y = +fy0.call(this, d, i)]);
        points1.push([+fx1.call(this, d, i), +fy1.call(this, d, i)]);
      } else if (points0.length) {
        segment();
        points0 = [];
        points1 = [];
      }
    }

    if (points0.length) segment();

    return segments.length ? segments.join("") : null;
  }

  area.x = function(_) {
    if (!arguments.length) return x1;
    x0 = x1 = _;
    return area;
  };

  area.x0 = function(_) {
    if (!arguments.length) return x0;
    x0 = _;
    return area;
  };

  area.x1 = function(_) {
    if (!arguments.length) return x1;
    x1 = _;
    return area;
  };

  area.y = function(_) {
    if (!arguments.length) return y1;
    y0 = y1 = _;
    return area;
  };

  area.y0 = function(_) {
    if (!arguments.length) return y0;
    y0 = _;
    return area;
  };

  area.y1 = function(_) {
    if (!arguments.length) return y1;
    y1 = _;
    return area;
  };

  area.defined  = function(_) {
    if (!arguments.length) return defined;
    defined = _;
    return area;
  };

  area.interpolate = function(_) {
    if (!arguments.length) return interpolate;
    if (!d3_svg_lineInterpolators.has(_ += "")) _ = d3_svg_lineInterpolatorDefault;
    i0 = d3_svg_lineInterpolators.get(interpolate = _);
    i1 = i0.reverse || i0;
    L = /-closed$/.test(_) ? "M" : "L";
    return area;
  };

  area.tension = function(_) {
    if (!arguments.length) return tension;
    tension = _;
    return area;
  };

  return area;
}

d3_svg_lineStepBefore.reverse = d3_svg_lineStepAfter;
d3_svg_lineStepAfter.reverse = d3_svg_lineStepBefore;

d3.svg.area = function() {
  return d3_svg_area(Object);
};
d3.svg.area.radial = function() {
  var area = d3_svg_area(d3_svg_lineRadial);
  area.radius = area.x, delete area.x;
  area.innerRadius = area.x0, delete area.x0;
  area.outerRadius = area.x1, delete area.x1;
  area.angle = area.y, delete area.y;
  area.startAngle = area.y0, delete area.y0;
  area.endAngle = area.y1, delete area.y1;
  return area;
};
d3.svg.chord = function() {
  var source = d3_svg_chordSource,
      target = d3_svg_chordTarget,
      radius = d3_svg_chordRadius,
      startAngle = d3_svg_arcStartAngle,
      endAngle = d3_svg_arcEndAngle;

  // TODO Allow control point to be customized.

  function chord(d, i) {
    var s = subgroup(this, source, d, i),
        t = subgroup(this, target, d, i);
    return "M" + s.p0
      + arc(s.r, s.p1, s.a1 - s.a0) + (equals(s, t)
      ? curve(s.r, s.p1, s.r, s.p0)
      : curve(s.r, s.p1, t.r, t.p0)
      + arc(t.r, t.p1, t.a1 - t.a0)
      + curve(t.r, t.p1, s.r, s.p0))
      + "Z";
  }

  function subgroup(self, f, d, i) {
    var subgroup = f.call(self, d, i),
        r = radius.call(self, subgroup, i),
        a0 = startAngle.call(self, subgroup, i) + d3_svg_arcOffset,
        a1 = endAngle.call(self, subgroup, i) + d3_svg_arcOffset;
    return {
      r: r,
      a0: a0,
      a1: a1,
      p0: [r * Math.cos(a0), r * Math.sin(a0)],
      p1: [r * Math.cos(a1), r * Math.sin(a1)]
    };
  }

  function equals(a, b) {
    return a.a0 == b.a0 && a.a1 == b.a1;
  }

  function arc(r, p, a) {
    return "A" + r + "," + r + " 0 " + +(a > Math.PI) + ",1 " + p;
  }

  function curve(r0, p0, r1, p1) {
    return "Q 0,0 " + p1;
  }

  chord.radius = function(v) {
    if (!arguments.length) return radius;
    radius = d3_functor(v);
    return chord;
  };

  chord.source = function(v) {
    if (!arguments.length) return source;
    source = d3_functor(v);
    return chord;
  };

  chord.target = function(v) {
    if (!arguments.length) return target;
    target = d3_functor(v);
    return chord;
  };

  chord.startAngle = function(v) {
    if (!arguments.length) return startAngle;
    startAngle = d3_functor(v);
    return chord;
  };

  chord.endAngle = function(v) {
    if (!arguments.length) return endAngle;
    endAngle = d3_functor(v);
    return chord;
  };

  return chord;
};

function d3_svg_chordSource(d) {
  return d.source;
}

function d3_svg_chordTarget(d) {
  return d.target;
}

function d3_svg_chordRadius(d) {
  return d.radius;
}

function d3_svg_chordStartAngle(d) {
  return d.startAngle;
}

function d3_svg_chordEndAngle(d) {
  return d.endAngle;
}
d3.svg.diagonal = function() {
  var source = d3_svg_chordSource,
      target = d3_svg_chordTarget,
      projection = d3_svg_diagonalProjection;

  function diagonal(d, i) {
    var p0 = source.call(this, d, i),
        p3 = target.call(this, d, i),
        m = (p0.y + p3.y) / 2,
        p = [p0, {x: p0.x, y: m}, {x: p3.x, y: m}, p3];
    p = p.map(projection);
    return "M" + p[0] + "C" + p[1] + " " + p[2] + " " + p[3];
  }

  diagonal.source = function(x) {
    if (!arguments.length) return source;
    source = d3_functor(x);
    return diagonal;
  };

  diagonal.target = function(x) {
    if (!arguments.length) return target;
    target = d3_functor(x);
    return diagonal;
  };

  diagonal.projection = function(x) {
    if (!arguments.length) return projection;
    projection = x;
    return diagonal;
  };

  return diagonal;
};

function d3_svg_diagonalProjection(d) {
  return [d.x, d.y];
}
d3.svg.diagonal.radial = function() {
  var diagonal = d3.svg.diagonal(),
      projection = d3_svg_diagonalProjection,
      projection_ = diagonal.projection;

  diagonal.projection = function(x) {
    return arguments.length
        ? projection_(d3_svg_diagonalRadialProjection(projection = x))
        : projection;
  };

  return diagonal;
};

function d3_svg_diagonalRadialProjection(projection) {
  return function() {
    var d = projection.apply(this, arguments),
        r = d[0],
        a = d[1] + d3_svg_arcOffset;
    return [r * Math.cos(a), r * Math.sin(a)];
  };
}
d3.svg.mouse = d3.mouse;
d3.svg.touches = d3.touches;
d3.svg.symbol = function() {
  var type = d3_svg_symbolType,
      size = d3_svg_symbolSize;

  function symbol(d, i) {
    return (d3_svg_symbols.get(type.call(this, d, i))
        || d3_svg_symbolCircle)
        (size.call(this, d, i));
  }

  symbol.type = function(x) {
    if (!arguments.length) return type;
    type = d3_functor(x);
    return symbol;
  };

  // size of symbol in square pixels
  symbol.size = function(x) {
    if (!arguments.length) return size;
    size = d3_functor(x);
    return symbol;
  };

  return symbol;
};

function d3_svg_symbolSize() {
  return 64;
}

function d3_svg_symbolType() {
  return "circle";
}

function d3_svg_symbolCircle(size) {
  var r = Math.sqrt(size / Math.PI);
  return "M0," + r
      + "A" + r + "," + r + " 0 1,1 0," + (-r)
      + "A" + r + "," + r + " 0 1,1 0," + r
      + "Z";
}

// TODO cross-diagonal?
var d3_svg_symbols = d3.map({
  "circle": d3_svg_symbolCircle,
  "cross": function(size) {
    var r = Math.sqrt(size / 5) / 2;
    return "M" + -3 * r + "," + -r
        + "H" + -r
        + "V" + -3 * r
        + "H" + r
        + "V" + -r
        + "H" + 3 * r
        + "V" + r
        + "H" + r
        + "V" + 3 * r
        + "H" + -r
        + "V" + r
        + "H" + -3 * r
        + "Z";
  },
  "diamond": function(size) {
    var ry = Math.sqrt(size / (2 * d3_svg_symbolTan30)),
        rx = ry * d3_svg_symbolTan30;
    return "M0," + -ry
        + "L" + rx + ",0"
        + " 0," + ry
        + " " + -rx + ",0"
        + "Z";
  },
  "square": function(size) {
    var r = Math.sqrt(size) / 2;
    return "M" + -r + "," + -r
        + "L" + r + "," + -r
        + " " + r + "," + r
        + " " + -r + "," + r
        + "Z";
  },
  "triangle-down": function(size) {
    var rx = Math.sqrt(size / d3_svg_symbolSqrt3),
        ry = rx * d3_svg_symbolSqrt3 / 2;
    return "M0," + ry
        + "L" + rx +"," + -ry
        + " " + -rx + "," + -ry
        + "Z";
  },
  "triangle-up": function(size) {
    var rx = Math.sqrt(size / d3_svg_symbolSqrt3),
        ry = rx * d3_svg_symbolSqrt3 / 2;
    return "M0," + -ry
        + "L" + rx +"," + ry
        + " " + -rx + "," + ry
        + "Z";
  }
});

d3.svg.symbolTypes = d3_svg_symbols.keys();

var d3_svg_symbolSqrt3 = Math.sqrt(3),
    d3_svg_symbolTan30 = Math.tan(30 * Math.PI / 180);
d3.svg.axis = function() {
  var scale = d3.scale.linear(),
      orient = "bottom",
      tickMajorSize = 6,
      tickMinorSize = 6,
      tickEndSize = 6,
      tickPadding = 3,
      tickArguments_ = [10],
      tickValues = null,
      tickFormat_,
      tickSubdivide = 0;

  function axis(g) {
    g.each(function() {
      var g = d3.select(this);

      // Ticks, or domain values for ordinal scales.
      var ticks = tickValues == null ? (scale.ticks ? scale.ticks.apply(scale, tickArguments_) : scale.domain()) : tickValues,
          tickFormat = tickFormat_ == null ? (scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments_) : String) : tickFormat_;

      // Minor ticks.
      var subticks = d3_svg_axisSubdivide(scale, ticks, tickSubdivide),
          subtick = g.selectAll(".minor").data(subticks, String),
          subtickEnter = subtick.enter().insert("line", "g").attr("class", "tick minor").style("opacity", 1e-6),
          subtickExit = d3.transition(subtick.exit()).style("opacity", 1e-6).remove(),
          subtickUpdate = d3.transition(subtick).style("opacity", 1);

      // Major ticks.
      var tick = g.selectAll("g").data(ticks, String),
          tickEnter = tick.enter().insert("g", "path").style("opacity", 1e-6),
          tickExit = d3.transition(tick.exit()).style("opacity", 1e-6).remove(),
          tickUpdate = d3.transition(tick).style("opacity", 1),
          tickTransform;

      // Domain.
      var range = d3_scaleRange(scale),
          path = g.selectAll(".domain").data([0]),
          pathEnter = path.enter().append("path").attr("class", "domain"),
          pathUpdate = d3.transition(path);

      // Stash a snapshot of the new scale, and retrieve the old snapshot.
      var scale1 = scale.copy(),
          scale0 = this.__chart__ || scale1;
      this.__chart__ = scale1;

      tickEnter.append("line").attr("class", "tick");
      tickEnter.append("text");

      var lineEnter = tickEnter.select("line"),
          lineUpdate = tickUpdate.select("line"),
          text = tick.select("text").text(tickFormat),
          textEnter = tickEnter.select("text"),
          textUpdate = tickUpdate.select("text");

      switch (orient) {
        case "bottom": {
          tickTransform = d3_svg_axisX;
          subtickEnter.attr("y2", tickMinorSize);
          subtickUpdate.attr("x2", 0).attr("y2", tickMinorSize);
          lineEnter.attr("y2", tickMajorSize);
          textEnter.attr("y", Math.max(tickMajorSize, 0) + tickPadding);
          lineUpdate.attr("x2", 0).attr("y2", tickMajorSize);
          textUpdate.attr("x", 0).attr("y", Math.max(tickMajorSize, 0) + tickPadding);
          text.attr("dy", ".71em").attr("text-anchor", "middle");
          pathUpdate.attr("d", "M" + range[0] + "," + tickEndSize + "V0H" + range[1] + "V" + tickEndSize);
          break;
        }
        case "top": {
          tickTransform = d3_svg_axisX;
          subtickEnter.attr("y2", -tickMinorSize);
          subtickUpdate.attr("x2", 0).attr("y2", -tickMinorSize);
          lineEnter.attr("y2", -tickMajorSize);
          textEnter.attr("y", -(Math.max(tickMajorSize, 0) + tickPadding));
          lineUpdate.attr("x2", 0).attr("y2", -tickMajorSize);
          textUpdate.attr("x", 0).attr("y", -(Math.max(tickMajorSize, 0) + tickPadding));
          text.attr("dy", "0em").attr("text-anchor", "middle");
          pathUpdate.attr("d", "M" + range[0] + "," + -tickEndSize + "V0H" + range[1] + "V" + -tickEndSize);
          break;
        }
        case "left": {
          tickTransform = d3_svg_axisY;
          subtickEnter.attr("x2", -tickMinorSize);
          subtickUpdate.attr("x2", -tickMinorSize).attr("y2", 0);
          lineEnter.attr("x2", -tickMajorSize);
          textEnter.attr("x", -(Math.max(tickMajorSize, 0) + tickPadding));
          lineUpdate.attr("x2", -tickMajorSize).attr("y2", 0);
          textUpdate.attr("x", -(Math.max(tickMajorSize, 0) + tickPadding)).attr("y", 0);
          text.attr("dy", ".32em").attr("text-anchor", "end");
          pathUpdate.attr("d", "M" + -tickEndSize + "," + range[0] + "H0V" + range[1] + "H" + -tickEndSize);
          break;
        }
        case "right": {
          tickTransform = d3_svg_axisY;
          subtickEnter.attr("x2", tickMinorSize);
          subtickUpdate.attr("x2", tickMinorSize).attr("y2", 0);
          lineEnter.attr("x2", tickMajorSize);
          textEnter.attr("x", Math.max(tickMajorSize, 0) + tickPadding);
          lineUpdate.attr("x2", tickMajorSize).attr("y2", 0);
          textUpdate.attr("x", Math.max(tickMajorSize, 0) + tickPadding).attr("y", 0);
          text.attr("dy", ".32em").attr("text-anchor", "start");
          pathUpdate.attr("d", "M" + tickEndSize + "," + range[0] + "H0V" + range[1] + "H" + tickEndSize);
          break;
        }
      }

      // For quantitative scales:
      // - enter new ticks from the old scale
      // - exit old ticks to the new scale
      if (scale.ticks) {
        tickEnter.call(tickTransform, scale0);
        tickUpdate.call(tickTransform, scale1);
        tickExit.call(tickTransform, scale1);
        subtickEnter.call(tickTransform, scale0);
        subtickUpdate.call(tickTransform, scale1);
        subtickExit.call(tickTransform, scale1);
      }

      // For ordinal scales:
      // - any entering ticks are undefined in the old scale
      // - any exiting ticks are undefined in the new scale
      // Therefore, we only need to transition updating ticks.
      else {
        var dx = scale1.rangeBand() / 2, x = function(d) { return scale1(d) + dx; };
        tickEnter.call(tickTransform, x);
        tickUpdate.call(tickTransform, x);
      }
    });
  }

  axis.scale = function(x) {
    if (!arguments.length) return scale;
    scale = x;
    return axis;
  };

  axis.orient = function(x) {
    if (!arguments.length) return orient;
    orient = x;
    return axis;
  };

  axis.ticks = function() {
    if (!arguments.length) return tickArguments_;
    tickArguments_ = arguments;
    return axis;
  };

  axis.tickValues = function(x) {
    if (!arguments.length) return tickValues;
    tickValues = x;
    return axis;
  };

  axis.tickFormat = function(x) {
    if (!arguments.length) return tickFormat_;
    tickFormat_ = x;
    return axis;
  };

  axis.tickSize = function(x, y, z) {
    if (!arguments.length) return tickMajorSize;
    var n = arguments.length - 1;
    tickMajorSize = +x;
    tickMinorSize = n > 1 ? +y : tickMajorSize;
    tickEndSize = n > 0 ? +arguments[n] : tickMajorSize;
    return axis;
  };

  axis.tickPadding = function(x) {
    if (!arguments.length) return tickPadding;
    tickPadding = +x;
    return axis;
  };

  axis.tickSubdivide = function(x) {
    if (!arguments.length) return tickSubdivide;
    tickSubdivide = +x;
    return axis;
  };

  return axis;
};

function d3_svg_axisX(selection, x) {
  selection.attr("transform", function(d) { return "translate(" + x(d) + ",0)"; });
}

function d3_svg_axisY(selection, y) {
  selection.attr("transform", function(d) { return "translate(0," + y(d) + ")"; });
}

function d3_svg_axisSubdivide(scale, ticks, m) {
  subticks = [];
  if (m && ticks.length > 1) {
    var extent = d3_scaleExtent(scale.domain()),
        subticks,
        i = -1,
        n = ticks.length,
        d = (ticks[1] - ticks[0]) / ++m,
        j,
        v;
    while (++i < n) {
      for (j = m; --j > 0;) {
        if ((v = +ticks[i] - j * d) >= extent[0]) {
          subticks.push(v);
        }
      }
    }
    for (--i, j = 0; ++j < m && (v = +ticks[i] + j * d) < extent[1];) {
      subticks.push(v);
    }
  }
  return subticks;
}
d3.svg.brush = function() {
  var event = d3_eventDispatch(brush, "brushstart", "brush", "brushend"),
      x = null, // x-scale, optional
      y = null, // y-scale, optional
      resizes = d3_svg_brushResizes[0],
      extent = [[0, 0], [0, 0]], // [x0, y0], [x1, y1], in pixels (integers)
      extentDomain; // the extent in data space, lazily created

  function brush(g) {
    g.each(function() {
      var g = d3.select(this),
          bg = g.selectAll(".background").data([0]),
          fg = g.selectAll(".extent").data([0]),
          tz = g.selectAll(".resize").data(resizes, String),
          e;

      // Prepare the brush container for events.
      g
          .style("pointer-events", "all")
          .on("mousedown.brush", brushstart)
          .on("touchstart.brush", brushstart);

      // An invisible, mouseable area for starting a new brush.
      bg.enter().append("rect")
          .attr("class", "background")
          .style("visibility", "hidden")
          .style("cursor", "crosshair");

      // The visible brush extent; style this as you like!
      fg.enter().append("rect")
          .attr("class", "extent")
          .style("cursor", "move");

      // More invisible rects for resizing the extent.
      tz.enter().append("g")
          .attr("class", function(d) { return "resize " + d; })
          .style("cursor", function(d) { return d3_svg_brushCursor[d]; })
        .append("rect")
          .attr("x", function(d) { return /[ew]$/.test(d) ? -3 : null; })
          .attr("y", function(d) { return /^[ns]/.test(d) ? -3 : null; })
          .attr("width", 6)
          .attr("height", 6)
          .style("visibility", "hidden");

      // Show or hide the resizers.
      tz.style("display", brush.empty() ? "none" : null);

      // Remove any superfluous resizers.
      tz.exit().remove();

      // Initialize the background to fill the defined range.
      // If the range isn't defined, you can post-process.
      if (x) {
        e = d3_scaleRange(x);
        bg.attr("x", e[0]).attr("width", e[1] - e[0]);
        redrawX(g);
      }
      if (y) {
        e = d3_scaleRange(y);
        bg.attr("y", e[0]).attr("height", e[1] - e[0]);
        redrawY(g);
      }
      redraw(g);
    });
  }

  function redraw(g) {
    g.selectAll(".resize").attr("transform", function(d) {
      return "translate(" + extent[+/e$/.test(d)][0] + "," + extent[+/^s/.test(d)][1] + ")";
    });
  }

  function redrawX(g) {
    g.select(".extent").attr("x", extent[0][0]);
    g.selectAll(".extent,.n>rect,.s>rect").attr("width", extent[1][0] - extent[0][0]);
  }

  function redrawY(g) {
    g.select(".extent").attr("y", extent[0][1]);
    g.selectAll(".extent,.e>rect,.w>rect").attr("height", extent[1][1] - extent[0][1]);
  }

  function brushstart() {
    var target = this,
        eventTarget = d3.select(d3.event.target),
        event_ = event.of(target, arguments),
        g = d3.select(target),
        resizing = eventTarget.datum(),
        resizingX = !/^(n|s)$/.test(resizing) && x,
        resizingY = !/^(e|w)$/.test(resizing) && y,
        dragging = eventTarget.classed("extent"),
        center,
        origin = mouse(),
        offset;

    var w = d3.select(window)
        .on("mousemove.brush", brushmove)
        .on("mouseup.brush", brushend)
        .on("touchmove.brush", brushmove)
        .on("touchend.brush", brushend)
        .on("keydown.brush", keydown)
        .on("keyup.brush", keyup);

    // If the extent was clicked on, drag rather than brush;
    // store the point between the mouse and extent origin instead.
    if (dragging) {
      origin[0] = extent[0][0] - origin[0];
      origin[1] = extent[0][1] - origin[1];
    }

    // If a resizer was clicked on, record which side is to be resized.
    // Also, set the origin to the opposite side.
    else if (resizing) {
      var ex = +/w$/.test(resizing),
          ey = +/^n/.test(resizing);
      offset = [extent[1 - ex][0] - origin[0], extent[1 - ey][1] - origin[1]];
      origin[0] = extent[ex][0];
      origin[1] = extent[ey][1];
    }

    // If the ALT key is down when starting a brush, the center is at the mouse.
    else if (d3.event.altKey) center = origin.slice();

    // Propagate the active cursor to the body for the drag duration.
    g.style("pointer-events", "none").selectAll(".resize").style("display", null);
    d3.select("body").style("cursor", eventTarget.style("cursor"));

    // Notify listeners.
    event_({type: "brushstart"});
    brushmove();
    d3_eventCancel();

    function mouse() {
      var touches = d3.event.changedTouches;
      return touches ? d3.touches(target, touches)[0] : d3.mouse(target);
    }

    function keydown() {
      if (d3.event.keyCode == 32) {
        if (!dragging) {
          center = null;
          origin[0] -= extent[1][0];
          origin[1] -= extent[1][1];
          dragging = 2;
        }
        d3_eventCancel();
      }
    }

    function keyup() {
      if (d3.event.keyCode == 32 && dragging == 2) {
        origin[0] += extent[1][0];
        origin[1] += extent[1][1];
        dragging = 0;
        d3_eventCancel();
      }
    }

    function brushmove() {
      var point = mouse(),
          moved = false;

      // Preserve the offset for thick resizers.
      if (offset) {
        point[0] += offset[0];
        point[1] += offset[1];
      }

      if (!dragging) {

        // If needed, determine the center from the current extent.
        if (d3.event.altKey) {
          if (!center) center = [(extent[0][0] + extent[1][0]) / 2, (extent[0][1] + extent[1][1]) / 2];

          // Update the origin, for when the ALT key is released.
          origin[0] = extent[+(point[0] < center[0])][0];
          origin[1] = extent[+(point[1] < center[1])][1];
        }

        // When the ALT key is released, we clear the center.
        else center = null;
      }

      // Update the brush extent for each dimension.
      if (resizingX && move1(point, x, 0)) {
        redrawX(g);
        moved = true;
      }
      if (resizingY && move1(point, y, 1)) {
        redrawY(g);
        moved = true;
      }

      // Final redraw and notify listeners.
      if (moved) {
        redraw(g);
        event_({type: "brush", mode: dragging ? "move" : "resize"});
      }
    }

    function move1(point, scale, i) {
      var range = d3_scaleRange(scale),
          r0 = range[0],
          r1 = range[1],
          position = origin[i],
          size = extent[1][i] - extent[0][i],
          min,
          max;

      // When dragging, reduce the range by the extent size and position.
      if (dragging) {
        r0 -= position;
        r1 -= size + position;
      }

      // Clamp the point so that the extent fits within the range extent.
      min = Math.max(r0, Math.min(r1, point[i]));

      // Compute the new extent bounds.
      if (dragging) {
        max = (min += position) + size;
      } else {

        // If the ALT key is pressed, then preserve the center of the extent.
        if (center) position = Math.max(r0, Math.min(r1, 2 * center[i] - min));

        // Compute the min and max of the position and point.
        if (position < min) {
          max = min;
          min = position;
        } else {
          max = position;
        }
      }

      // Update the stored bounds.
      if (extent[0][i] !== min || extent[1][i] !== max) {
        extentDomain = null;
        extent[0][i] = min;
        extent[1][i] = max;
        return true;
      }
    }

    function brushend() {
      brushmove();

      // reset the cursor styles
      g.style("pointer-events", "all").selectAll(".resize").style("display", brush.empty() ? "none" : null);
      d3.select("body").style("cursor", null);

      w .on("mousemove.brush", null)
        .on("mouseup.brush", null)
        .on("touchmove.brush", null)
        .on("touchend.brush", null)
        .on("keydown.brush", null)
        .on("keyup.brush", null);

      event_({type: "brushend"});
      d3_eventCancel();
    }
  }

  brush.x = function(z) {
    if (!arguments.length) return x;
    x = z;
    resizes = d3_svg_brushResizes[!x << 1 | !y]; // fore!
    return brush;
  };

  brush.y = function(z) {
    if (!arguments.length) return y;
    y = z;
    resizes = d3_svg_brushResizes[!x << 1 | !y]; // fore!
    return brush;
  };

  brush.extent = function(z) {
    var x0, x1, y0, y1, t;

    // Invert the pixel extent to data-space.
    if (!arguments.length) {
      z = extentDomain || extent;
      if (x) {
        x0 = z[0][0], x1 = z[1][0];
        if (!extentDomain) {
          x0 = extent[0][0], x1 = extent[1][0];
          if (x.invert) x0 = x.invert(x0), x1 = x.invert(x1);
          if (x1 < x0) t = x0, x0 = x1, x1 = t;
        }
      }
      if (y) {
        y0 = z[0][1], y1 = z[1][1];
        if (!extentDomain) {
          y0 = extent[0][1], y1 = extent[1][1];
          if (y.invert) y0 = y.invert(y0), y1 = y.invert(y1);
          if (y1 < y0) t = y0, y0 = y1, y1 = t;
        }
      }
      return x && y ? [[x0, y0], [x1, y1]] : x ? [x0, x1] : y && [y0, y1];
    }

    // Scale the data-space extent to pixels.
    extentDomain = [[0, 0], [0, 0]];
    if (x) {
      x0 = z[0], x1 = z[1];
      if (y) x0 = x0[0], x1 = x1[0];
      extentDomain[0][0] = x0, extentDomain[1][0] = x1;
      if (x.invert) x0 = x(x0), x1 = x(x1);
      if (x1 < x0) t = x0, x0 = x1, x1 = t;
      extent[0][0] = x0 | 0, extent[1][0] = x1 | 0;
    }
    if (y) {
      y0 = z[0], y1 = z[1];
      if (x) y0 = y0[1], y1 = y1[1];
      extentDomain[0][1] = y0, extentDomain[1][1] = y1;
      if (y.invert) y0 = y(y0), y1 = y(y1);
      if (y1 < y0) t = y0, y0 = y1, y1 = t;
      extent[0][1] = y0 | 0, extent[1][1] = y1 | 0;
    }

    return brush;
  };

  brush.clear = function() {
    extentDomain = null;
    extent[0][0] =
    extent[0][1] =
    extent[1][0] =
    extent[1][1] = 0;
    return brush;
  };

  brush.empty = function() {
    return (x && extent[0][0] === extent[1][0])
        || (y && extent[0][1] === extent[1][1]);
  };

  return d3.rebind(brush, event, "on");
};

var d3_svg_brushCursor = {
  n: "ns-resize",
  e: "ew-resize",
  s: "ns-resize",
  w: "ew-resize",
  nw: "nwse-resize",
  ne: "nesw-resize",
  se: "nwse-resize",
  sw: "nesw-resize"
};

var d3_svg_brushResizes = [
  ["n", "e", "s", "w", "nw", "ne", "se", "sw"],
  ["e", "w"],
  ["n", "s"],
  []
];
d3.behavior = {};
// TODO Track touch points by identifier.

d3.behavior.drag = function() {
  var event = d3_eventDispatch(drag, "drag", "dragstart", "dragend"),
      origin = null;

  function drag() {
    this.on("mousedown.drag", mousedown)
        .on("touchstart.drag", mousedown);
  }

  function mousedown() {
    var target = this,
        event_ = event.of(target, arguments),
        eventTarget = d3.event.target,
        offset,
        origin_ = point(),
        moved = 0;

    var w = d3.select(window)
        .on("mousemove.drag", dragmove)
        .on("touchmove.drag", dragmove)
        .on("mouseup.drag", dragend, true)
        .on("touchend.drag", dragend, true);

    if (origin) {
      offset = origin.apply(target, arguments);
      offset = [offset.x - origin_[0], offset.y - origin_[1]];
    } else {
      offset = [0, 0];
    }

    d3_eventCancel();
    event_({type: "dragstart"});

    function point() {
      var p = target.parentNode,
          t = d3.event.changedTouches;
      return t ? d3.touches(p, t)[0] : d3.mouse(p);
    }

    function dragmove() {
      if (!target.parentNode) return dragend(); // target removed from DOM

      var p = point(),
          dx = p[0] - origin_[0],
          dy = p[1] - origin_[1];

      moved |= dx | dy;
      origin_ = p;
      d3_eventCancel();

      event_({type: "drag", x: p[0] + offset[0], y: p[1] + offset[1], dx: dx, dy: dy});
    }

    function dragend() {
      event_({type: "dragend"});

      // if moved, prevent the mouseup (and possibly click) from propagating
      if (moved) {
        d3_eventCancel();
        if (d3.event.target === eventTarget) w.on("click.drag", click, true);
      }

      w .on("mousemove.drag", null)
        .on("touchmove.drag", null)
        .on("mouseup.drag", null)
        .on("touchend.drag", null);
    }

    // prevent the subsequent click from propagating (e.g., for anchors)
    function click() {
      d3_eventCancel();
      w.on("click.drag", null);
    }
  }

  drag.origin = function(x) {
    if (!arguments.length) return origin;
    origin = x;
    return drag;
  };

  return d3.rebind(drag, event, "on");
};
d3.behavior.zoom = function() {
  var translate = [0, 0],
      translate0, // translate when we started zooming (to avoid drift)
      scale = 1,
      scale0, // scale when we started touching
      scaleExtent = d3_behavior_zoomInfinity,
      event = d3_eventDispatch(zoom, "zoom"),
      x0,
      x1,
      y0,
      y1,
      touchtime; // time of last touchstart (to detect double-tap)

  function zoom() {
    this
        .on("mousedown.zoom", mousedown)
        .on("mousewheel.zoom", mousewheel)
        .on("mousemove.zoom", mousemove)
        .on("DOMMouseScroll.zoom", mousewheel)
        .on("dblclick.zoom", dblclick)
        .on("touchstart.zoom", touchstart)
        .on("touchmove.zoom", touchmove)
        .on("touchend.zoom", touchstart);
  }

  zoom.translate = function(x) {
    if (!arguments.length) return translate;
    translate = x.map(Number);
    return zoom;
  };

  zoom.scale = function(x) {
    if (!arguments.length) return scale;
    scale = +x;
    return zoom;
  };

  zoom.scaleExtent = function(x) {
    if (!arguments.length) return scaleExtent;
    scaleExtent = x == null ? d3_behavior_zoomInfinity : x.map(Number);
    return zoom;
  };

  zoom.x = function(z) {
    if (!arguments.length) return x1;
    x1 = z;
    x0 = z.copy();
    return zoom;
  };

  zoom.y = function(z) {
    if (!arguments.length) return y1;
    y1 = z;
    y0 = z.copy();
    return zoom;
  };

  function location(p) {
    return [(p[0] - translate[0]) / scale, (p[1] - translate[1]) / scale];
  }

  function point(l) {
    return [l[0] * scale + translate[0], l[1] * scale + translate[1]];
  }

  function scaleTo(s) {
    scale = Math.max(scaleExtent[0], Math.min(scaleExtent[1], s));
  }

  function translateTo(p, l) {
    l = point(l);
    translate[0] += p[0] - l[0];
    translate[1] += p[1] - l[1];
  }

  function dispatch(event) {
    if (x1) x1.domain(x0.range().map(function(x) { return (x - translate[0]) / scale; }).map(x0.invert));
    if (y1) y1.domain(y0.range().map(function(y) { return (y - translate[1]) / scale; }).map(y0.invert));
    d3.event.preventDefault();
    event({type: "zoom", scale: scale, translate: translate});
  }

  function mousedown() {
    var target = this,
        event_ = event.of(target, arguments),
        eventTarget = d3.event.target,
        moved = 0,
        w = d3.select(window).on("mousemove.zoom", mousemove).on("mouseup.zoom", mouseup),
        l = location(d3.mouse(target));

    window.focus();
    d3_eventCancel();

    function mousemove() {
      moved = 1;
      translateTo(d3.mouse(target), l);
      dispatch(event_);
    }

    function mouseup() {
      if (moved) d3_eventCancel();
      w.on("mousemove.zoom", null).on("mouseup.zoom", null);
      if (moved && d3.event.target === eventTarget) w.on("click.zoom", click, true);
    }

    function click() {
      d3_eventCancel();
      w.on("click.zoom", null);
    }
  }

  function mousewheel() {
    if (!translate0) translate0 = location(d3.mouse(this));
    scaleTo(Math.pow(2, d3_behavior_zoomDelta() * .002) * scale);
    translateTo(d3.mouse(this), translate0);
    dispatch(event.of(this, arguments));
  }

  function mousemove() {
    translate0 = null;
  }

  function dblclick() {
    var p = d3.mouse(this), l = location(p);
    scaleTo(d3.event.shiftKey ? scale / 2 : scale * 2);
    translateTo(p, l);
    dispatch(event.of(this, arguments));
  }

  function touchstart() {
    var touches = d3.touches(this),
        now = Date.now();

    scale0 = scale;
    translate0 = {};
    touches.forEach(function(t) { translate0[t.identifier] = location(t); });
    d3_eventCancel();

    if ((touches.length === 1) && (now - touchtime < 500)) { // dbltap
      var p = touches[0], l = location(touches[0]);
      scaleTo(scale * 2);
      translateTo(p, l);
      dispatch(event.of(this, arguments));
    }
    touchtime = now;
  }

  function touchmove() {
    var touches = d3.touches(this),
        p0 = touches[0],
        l0 = translate0[p0.identifier];
    if (p1 = touches[1]) {
      var p1, l1 = translate0[p1.identifier];
      p0 = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
      l0 = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
      scaleTo(d3.event.scale * scale0);
    }
    translateTo(p0, l0);
    dispatch(event.of(this, arguments));
  }

  return d3.rebind(zoom, event, "on");
};

var d3_behavior_zoomDiv, // for interpreting mousewheel events
    d3_behavior_zoomInfinity = [0, Infinity]; // default scale extent

function d3_behavior_zoomDelta() {

  // mousewheel events are totally broken!
  // https://bugs.webkit.org/show_bug.cgi?id=40441
  // not only that, but Chrome and Safari differ in re. to acceleration!
  if (!d3_behavior_zoomDiv) {
    d3_behavior_zoomDiv = d3.select("body").append("div")
        .style("visibility", "hidden")
        .style("top", 0)
        .style("height", 0)
        .style("width", 0)
        .style("overflow-y", "scroll")
      .append("div")
        .style("height", "2000px")
      .node().parentNode;
  }

  var e = d3.event, delta;
  try {
    d3_behavior_zoomDiv.scrollTop = 1000;
    d3_behavior_zoomDiv.dispatchEvent(e);
    delta = 1000 - d3_behavior_zoomDiv.scrollTop;
  } catch (error) {
    delta = e.wheelDelta || (-e.detail * 5);
  }

  return delta;
}
d3.layout = {};
// Implements hierarchical edge bundling using Holten's algorithm. For each
// input link, a path is computed that travels through the tree, up the parent
// hierarchy to the least common ancestor, and then back down to the destination
// node. Each path is simply an array of nodes.
d3.layout.bundle = function() {
  return function(links) {
    var paths = [],
        i = -1,
        n = links.length;
    while (++i < n) paths.push(d3_layout_bundlePath(links[i]));
    return paths;
  };
};

function d3_layout_bundlePath(link) {
  var start = link.source,
      end = link.target,
      lca = d3_layout_bundleLeastCommonAncestor(start, end),
      points = [start];
  while (start !== lca) {
    start = start.parent;
    points.push(start);
  }
  var k = points.length;
  while (end !== lca) {
    points.splice(k, 0, end);
    end = end.parent;
  }
  return points;
}

function d3_layout_bundleAncestors(node) {
  var ancestors = [],
      parent = node.parent;
  while (parent != null) {
    ancestors.push(node);
    node = parent;
    parent = parent.parent;
  }
  ancestors.push(node);
  return ancestors;
}

function d3_layout_bundleLeastCommonAncestor(a, b) {
  if (a === b) return a;
  var aNodes = d3_layout_bundleAncestors(a),
      bNodes = d3_layout_bundleAncestors(b),
      aNode = aNodes.pop(),
      bNode = bNodes.pop(),
      sharedNode = null;
  while (aNode === bNode) {
    sharedNode = aNode;
    aNode = aNodes.pop();
    bNode = bNodes.pop();
  }
  return sharedNode;
}
d3.layout.chord = function() {
  var chord = {},
      chords,
      groups,
      matrix,
      n,
      padding = 0,
      sortGroups,
      sortSubgroups,
      sortChords;

  function relayout() {
    var subgroups = {},
        groupSums = [],
        groupIndex = d3.range(n),
        subgroupIndex = [],
        k,
        x,
        x0,
        i,
        j;

    chords = [];
    groups = [];

    // Compute the sum.
    k = 0, i = -1; while (++i < n) {
      x = 0, j = -1; while (++j < n) {
        x += matrix[i][j];
      }
      groupSums.push(x);
      subgroupIndex.push(d3.range(n));
      k += x;
    }

    // Sort groups…
    if (sortGroups) {
      groupIndex.sort(function(a, b) {
        return sortGroups(groupSums[a], groupSums[b]);
      });
    }

    // Sort subgroups…
    if (sortSubgroups) {
      subgroupIndex.forEach(function(d, i) {
        d.sort(function(a, b) {
          return sortSubgroups(matrix[i][a], matrix[i][b]);
        });
      });
    }

    // Convert the sum to scaling factor for [0, 2pi].
    // TODO Allow start and end angle to be specified.
    // TODO Allow padding to be specified as percentage?
    k = (2 * Math.PI - padding * n) / k;

    // Compute the start and end angle for each group and subgroup.
    // Note: Opera has a bug reordering object literal properties!
    x = 0, i = -1; while (++i < n) {
      x0 = x, j = -1; while (++j < n) {
        var di = groupIndex[i],
            dj = subgroupIndex[di][j],
            v = matrix[di][dj],
            a0 = x,
            a1 = x += v * k;
        subgroups[di + "-" + dj] = {
          index: di,
          subindex: dj,
          startAngle: a0,
          endAngle: a1,
          value: v
        };
      }
      groups[di] = {
        index: di,
        startAngle: x0,
        endAngle: x,
        value: (x - x0) / k
      };
      x += padding;
    }

    // Generate chords for each (non-empty) subgroup-subgroup link.
    i = -1; while (++i < n) {
      j = i - 1; while (++j < n) {
        var source = subgroups[i + "-" + j],
            target = subgroups[j + "-" + i];
        if (source.value || target.value) {
          chords.push(source.value < target.value
              ? {source: target, target: source}
              : {source: source, target: target});
        }
      }
    }

    if (sortChords) resort();
  }

  function resort() {
    chords.sort(function(a, b) {
      return sortChords(
          (a.source.value + a.target.value) / 2,
          (b.source.value + b.target.value) / 2);
    });
  }

  chord.matrix = function(x) {
    if (!arguments.length) return matrix;
    n = (matrix = x) && matrix.length;
    chords = groups = null;
    return chord;
  };

  chord.padding = function(x) {
    if (!arguments.length) return padding;
    padding = x;
    chords = groups = null;
    return chord;
  };

  chord.sortGroups = function(x) {
    if (!arguments.length) return sortGroups;
    sortGroups = x;
    chords = groups = null;
    return chord;
  };

  chord.sortSubgroups = function(x) {
    if (!arguments.length) return sortSubgroups;
    sortSubgroups = x;
    chords = null;
    return chord;
  };

  chord.sortChords = function(x) {
    if (!arguments.length) return sortChords;
    sortChords = x;
    if (chords) resort();
    return chord;
  };

  chord.chords = function() {
    if (!chords) relayout();
    return chords;
  };

  chord.groups = function() {
    if (!groups) relayout();
    return groups;
  };

  return chord;
};
// A rudimentary force layout using Gauss-Seidel.
d3.layout.force = function() {
  var force = {},
      event = d3.dispatch("start", "tick", "end"),
      size = [1, 1],
      drag,
      alpha,
      friction = .9,
      linkDistance = d3_layout_forceLinkDistance,
      linkStrength = d3_layout_forceLinkStrength,
      charge = -30,
      gravity = .1,
      theta = .8,
      interval,
      nodes = [],
      links = [],
      distances,
      strengths,
      charges;

  function repulse(node) {
    return function(quad, x1, y1, x2, y2) {
      if (quad.point !== node) {
        var dx = quad.cx - node.x,
            dy = quad.cy - node.y,
            dn = 1 / Math.sqrt(dx * dx + dy * dy);

        /* Barnes-Hut criterion. */
        if ((x2 - x1) * dn < theta) {
          var k = quad.charge * dn * dn;
          node.px -= dx * k;
          node.py -= dy * k;
          return true;
        }

        if (quad.point && isFinite(dn)) {
          var k = quad.pointCharge * dn * dn;
          node.px -= dx * k;
          node.py -= dy * k;
        }
      }
      return !quad.charge;
    };
  }

  force.tick = function() {
    // simulated annealing, basically
    if ((alpha *= .99) < .005) {
      event.end({type: "end", alpha: alpha = 0});
      return true;
    }

    var n = nodes.length,
        m = links.length,
        q,
        i, // current index
        o, // current object
        s, // current source
        t, // current target
        l, // current distance
        k, // current force
        x, // x-distance
        y; // y-distance

    // gauss-seidel relaxation for links
    for (i = 0; i < m; ++i) {
      o = links[i];
      s = o.source;
      t = o.target;
      x = t.x - s.x;
      y = t.y - s.y;
      if (l = (x * x + y * y)) {
        l = alpha * strengths[i] * ((l = Math.sqrt(l)) - distances[i]) / l;
        x *= l;
        y *= l;
        t.x -= x * (k = s.weight / (t.weight + s.weight));
        t.y -= y * k;
        s.x += x * (k = 1 - k);
        s.y += y * k;
      }
    }

    // apply gravity forces
    if (k = alpha * gravity) {
      x = size[0] / 2;
      y = size[1] / 2;
      i = -1; if (k) while (++i < n) {
        o = nodes[i];
        o.x += (x - o.x) * k;
        o.y += (y - o.y) * k;
      }
    }

    // compute quadtree center of mass and apply charge forces
    if (charge) {
      d3_layout_forceAccumulate(q = d3.geom.quadtree(nodes), alpha, charges);
      i = -1; while (++i < n) {
        if (!(o = nodes[i]).fixed) {
          q.visit(repulse(o));
        }
      }
    }

    // position verlet integration
    i = -1; while (++i < n) {
      o = nodes[i];
      if (o.fixed) {
        o.x = o.px;
        o.y = o.py;
      } else {
        o.x -= (o.px - (o.px = o.x)) * friction;
        o.y -= (o.py - (o.py = o.y)) * friction;
      }
    }

    event.tick({type: "tick", alpha: alpha});
  };

  force.nodes = function(x) {
    if (!arguments.length) return nodes;
    nodes = x;
    return force;
  };

  force.links = function(x) {
    if (!arguments.length) return links;
    links = x;
    return force;
  };

  force.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return force;
  };

  force.linkDistance = function(x) {
    if (!arguments.length) return linkDistance;
    linkDistance = d3_functor(x);
    return force;
  };

  // For backwards-compatibility.
  force.distance = force.linkDistance;

  force.linkStrength = function(x) {
    if (!arguments.length) return linkStrength;
    linkStrength = d3_functor(x);
    return force;
  };

  force.friction = function(x) {
    if (!arguments.length) return friction;
    friction = x;
    return force;
  };

  force.charge = function(x) {
    if (!arguments.length) return charge;
    charge = typeof x === "function" ? x : +x;
    return force;
  };

  force.gravity = function(x) {
    if (!arguments.length) return gravity;
    gravity = x;
    return force;
  };

  force.theta = function(x) {
    if (!arguments.length) return theta;
    theta = x;
    return force;
  };

  force.alpha = function(x) {
    if (!arguments.length) return alpha;

    if (alpha) { // if we're already running
      if (x > 0) alpha = x; // we might keep it hot
      else alpha = 0; // or, next tick will dispatch "end"
    } else if (x > 0) { // otherwise, fire it up!
      event.start({type: "start", alpha: alpha = x});
      d3.timer(force.tick);
    }

    return force;
  };

  force.start = function() {
    var i,
        j,
        n = nodes.length,
        m = links.length,
        w = size[0],
        h = size[1],
        neighbors,
        o;

    for (i = 0; i < n; ++i) {
      (o = nodes[i]).index = i;
      o.weight = 0;
    }

    distances = [];
    strengths = [];
    for (i = 0; i < m; ++i) {
      o = links[i];
      if (typeof o.source == "number") o.source = nodes[o.source];
      if (typeof o.target == "number") o.target = nodes[o.target];
      distances[i] = linkDistance.call(this, o, i);
      strengths[i] = linkStrength.call(this, o, i);
      ++o.source.weight;
      ++o.target.weight;
    }

    for (i = 0; i < n; ++i) {
      o = nodes[i];
      if (isNaN(o.x)) o.x = position("x", w);
      if (isNaN(o.y)) o.y = position("y", h);
      if (isNaN(o.px)) o.px = o.x;
      if (isNaN(o.py)) o.py = o.y;
    }

    charges = [];
    if (typeof charge === "function") {
      for (i = 0; i < n; ++i) {
        charges[i] = +charge.call(this, nodes[i], i);
      }
    } else {
      for (i = 0; i < n; ++i) {
        charges[i] = charge;
      }
    }

    // initialize node position based on first neighbor
    function position(dimension, size) {
      var neighbors = neighbor(i),
          j = -1,
          m = neighbors.length,
          x;
      while (++j < m) if (!isNaN(x = neighbors[j][dimension])) return x;
      return Math.random() * size;
    }

    // initialize neighbors lazily
    function neighbor() {
      if (!neighbors) {
        neighbors = [];
        for (j = 0; j < n; ++j) {
          neighbors[j] = [];
        }
        for (j = 0; j < m; ++j) {
          var o = links[j];
          neighbors[o.source.index].push(o.target);
          neighbors[o.target.index].push(o.source);
        }
      }
      return neighbors[i];
    }

    return force.resume();
  };

  force.resume = function() {
    return force.alpha(.1);
  };

  force.stop = function() {
    return force.alpha(0);
  };

  // use `node.call(force.drag)` to make nodes draggable
  force.drag = function() {
    if (!drag) drag = d3.behavior.drag()
        .origin(d3_identity)
        .on("dragstart", dragstart)
        .on("drag", d3_layout_forceDrag)
        .on("dragend", d3_layout_forceDragEnd);

    this.on("mouseover.force", d3_layout_forceDragOver)
        .on("mouseout.force", d3_layout_forceDragOut)
        .call(drag);
  };

  function dragstart(d) {
    d3_layout_forceDragOver(d3_layout_forceDragNode = d);
    d3_layout_forceDragForce = force;
  }

  return d3.rebind(force, event, "on");
};

var d3_layout_forceDragForce,
    d3_layout_forceDragNode;

function d3_layout_forceDragOver(d) {
  d.fixed |= 2;
}

function d3_layout_forceDragOut(d) {
  if (d !== d3_layout_forceDragNode) d.fixed &= 1;
}

function d3_layout_forceDragEnd() {
  d3_layout_forceDragNode.fixed &= 1;
  d3_layout_forceDragForce = d3_layout_forceDragNode = null;
}

function d3_layout_forceDrag() {
  d3_layout_forceDragNode.px = d3.event.x;
  d3_layout_forceDragNode.py = d3.event.y;
  d3_layout_forceDragForce.resume(); // restart annealing
}

function d3_layout_forceAccumulate(quad, alpha, charges) {
  var cx = 0,
      cy = 0;
  quad.charge = 0;
  if (!quad.leaf) {
    var nodes = quad.nodes,
        n = nodes.length,
        i = -1,
        c;
    while (++i < n) {
      c = nodes[i];
      if (c == null) continue;
      d3_layout_forceAccumulate(c, alpha, charges);
      quad.charge += c.charge;
      cx += c.charge * c.cx;
      cy += c.charge * c.cy;
    }
  }
  if (quad.point) {
    // jitter internal nodes that are coincident
    if (!quad.leaf) {
      quad.point.x += Math.random() - .5;
      quad.point.y += Math.random() - .5;
    }
    var k = alpha * charges[quad.point.index];
    quad.charge += quad.pointCharge = k;
    cx += k * quad.point.x;
    cy += k * quad.point.y;
  }
  quad.cx = cx / quad.charge;
  quad.cy = cy / quad.charge;
}

function d3_layout_forceLinkDistance(link) {
  return 20;
}

function d3_layout_forceLinkStrength(link) {
  return 1;
}
d3.layout.partition = function() {
  var hierarchy = d3.layout.hierarchy(),
      size = [1, 1]; // width, height

  function position(node, x, dx, dy) {
    var children = node.children;
    node.x = x;
    node.y = node.depth * dy;
    node.dx = dx;
    node.dy = dy;
    if (children && (n = children.length)) {
      var i = -1,
          n,
          c,
          d;
      dx = node.value ? dx / node.value : 0;
      while (++i < n) {
        position(c = children[i], x, d = c.value * dx, dy);
        x += d;
      }
    }
  }

  function depth(node) {
    var children = node.children,
        d = 0;
    if (children && (n = children.length)) {
      var i = -1,
          n;
      while (++i < n) d = Math.max(d, depth(children[i]));
    }
    return 1 + d;
  }

  function partition(d, i) {
    var nodes = hierarchy.call(this, d, i);
    position(nodes[0], 0, size[0], size[1] / depth(nodes[0]));
    return nodes;
  }

  partition.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return partition;
  };

  return d3_layout_hierarchyRebind(partition, hierarchy);
};
d3.layout.pie = function() {
  var value = Number,
      sort = d3_layout_pieSortByValue,
      startAngle = 0,
      endAngle = 2 * Math.PI;

  function pie(data, i) {

    // Compute the numeric values for each data element.
    var values = data.map(function(d, i) { return +value.call(pie, d, i); });

    // Compute the start angle.
    var a = +(typeof startAngle === "function"
        ? startAngle.apply(this, arguments)
        : startAngle);

    // Compute the angular scale factor: from value to radians.
    var k = ((typeof endAngle === "function"
        ? endAngle.apply(this, arguments)
        : endAngle) - startAngle)
        / d3.sum(values);

    // Optionally sort the data.
    var index = d3.range(data.length);
    if (sort != null) index.sort(sort === d3_layout_pieSortByValue
        ? function(i, j) { return values[j] - values[i]; }
        : function(i, j) { return sort(data[i], data[j]); });

    // Compute the arcs!
    // They are stored in the original data's order.
    var arcs = [];
    index.forEach(function(i) {
      var d;
      arcs[i] = {
        data: data[i],
        value: d = values[i],
        startAngle: a,
        endAngle: a += d * k
      };
    });
    return arcs;
  }

  /**
   * Specifies the value function *x*, which returns a nonnegative numeric value
   * for each datum. The default value function is `Number`. The value function
   * is passed two arguments: the current datum and the current index.
   */
  pie.value = function(x) {
    if (!arguments.length) return value;
    value = x;
    return pie;
  };

  /**
   * Specifies a sort comparison operator *x*. The comparator is passed two data
   * elements from the data array, a and b; it returns a negative value if a is
   * less than b, a positive value if a is greater than b, and zero if a equals
   * b.
   */
  pie.sort = function(x) {
    if (!arguments.length) return sort;
    sort = x;
    return pie;
  };

  /**
   * Specifies the overall start angle of the pie chart. Defaults to 0. The
   * start angle can be specified either as a constant or as a function; in the
   * case of a function, it is evaluated once per array (as opposed to per
   * element).
   */
  pie.startAngle = function(x) {
    if (!arguments.length) return startAngle;
    startAngle = x;
    return pie;
  };

  /**
   * Specifies the overall end angle of the pie chart. Defaults to 2π. The
   * end angle can be specified either as a constant or as a function; in the
   * case of a function, it is evaluated once per array (as opposed to per
   * element).
   */
  pie.endAngle = function(x) {
    if (!arguments.length) return endAngle;
    endAngle = x;
    return pie;
  };

  return pie;
};

var d3_layout_pieSortByValue = {};
// data is two-dimensional array of x,y; we populate y0
d3.layout.stack = function() {
  var values = d3_identity,
      order = d3_layout_stackOrderDefault,
      offset = d3_layout_stackOffsetZero,
      out = d3_layout_stackOut,
      x = d3_layout_stackX,
      y = d3_layout_stackY;

  function stack(data, index) {

    // Convert series to canonical two-dimensional representation.
    var series = data.map(function(d, i) {
      return values.call(stack, d, i);
    });

    // Convert each series to canonical [[x,y]] representation.
    var points = series.map(function(d, i) {
      return d.map(function(v, i) {
        return [x.call(stack, v, i), y.call(stack, v, i)];
      });
    });

    // Compute the order of series, and permute them.
    var orders = order.call(stack, points, index);
    series = d3.permute(series, orders);
    points = d3.permute(points, orders);

    // Compute the baseline…
    var offsets = offset.call(stack, points, index);

    // And propagate it to other series.
    var n = series.length,
        m = series[0].length,
        i,
        j,
        o;
    for (j = 0; j < m; ++j) {
      out.call(stack, series[0][j], o = offsets[j], points[0][j][1]);
      for (i = 1; i < n; ++i) {
        out.call(stack, series[i][j], o += points[i - 1][j][1], points[i][j][1]);
      }
    }

    return data;
  }

  stack.values = function(x) {
    if (!arguments.length) return values;
    values = x;
    return stack;
  };

  stack.order = function(x) {
    if (!arguments.length) return order;
    order = typeof x === "function" ? x : d3_layout_stackOrders.get(x) || d3_layout_stackOrderDefault;
    return stack;
  };

  stack.offset = function(x) {
    if (!arguments.length) return offset;
    offset = typeof x === "function" ? x : d3_layout_stackOffsets.get(x) || d3_layout_stackOffsetZero;
    return stack;
  };

  stack.x = function(z) {
    if (!arguments.length) return x;
    x = z;
    return stack;
  };

  stack.y = function(z) {
    if (!arguments.length) return y;
    y = z;
    return stack;
  };

  stack.out = function(z) {
    if (!arguments.length) return out;
    out = z;
    return stack;
  };

  return stack;
}

function d3_layout_stackX(d) {
  return d.x;
}

function d3_layout_stackY(d) {
  return d.y;
}

function d3_layout_stackOut(d, y0, y) {
  d.y0 = y0;
  d.y = y;
}

var d3_layout_stackOrders = d3.map({

  "inside-out": function(data) {
    var n = data.length,
        i,
        j,
        max = data.map(d3_layout_stackMaxIndex),
        sums = data.map(d3_layout_stackReduceSum),
        index = d3.range(n).sort(function(a, b) { return max[a] - max[b]; }),
        top = 0,
        bottom = 0,
        tops = [],
        bottoms = [];
    for (i = 0; i < n; ++i) {
      j = index[i];
      if (top < bottom) {
        top += sums[j];
        tops.push(j);
      } else {
        bottom += sums[j];
        bottoms.push(j);
      }
    }
    return bottoms.reverse().concat(tops);
  },

  "reverse": function(data) {
    return d3.range(data.length).reverse();
  },

  "default": d3_layout_stackOrderDefault

});

var d3_layout_stackOffsets = d3.map({

  "silhouette": function(data) {
    var n = data.length,
        m = data[0].length,
        sums = [],
        max = 0,
        i,
        j,
        o,
        y0 = [];
    for (j = 0; j < m; ++j) {
      for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
      if (o > max) max = o;
      sums.push(o);
    }
    for (j = 0; j < m; ++j) {
      y0[j] = (max - sums[j]) / 2;
    }
    return y0;
  },

  "wiggle": function(data) {
    var n = data.length,
        x = data[0],
        m = x.length,
        max = 0,
        i,
        j,
        k,
        s1,
        s2,
        s3,
        dx,
        o,
        o0,
        y0 = [];
    y0[0] = o = o0 = 0;
    for (j = 1; j < m; ++j) {
      for (i = 0, s1 = 0; i < n; ++i) s1 += data[i][j][1];
      for (i = 0, s2 = 0, dx = x[j][0] - x[j - 1][0]; i < n; ++i) {
        for (k = 0, s3 = (data[i][j][1] - data[i][j - 1][1]) / (2 * dx); k < i; ++k) {
          s3 += (data[k][j][1] - data[k][j - 1][1]) / dx;
        }
        s2 += s3 * data[i][j][1];
      }
      y0[j] = o -= s1 ? s2 / s1 * dx : 0;
      if (o < o0) o0 = o;
    }
    for (j = 0; j < m; ++j) y0[j] -= o0;
    return y0;
  },

  "expand": function(data) {
    var n = data.length,
        m = data[0].length,
        k = 1 / n,
        i,
        j,
        o,
        y0 = [];
    for (j = 0; j < m; ++j) {
      for (i = 0, o = 0; i < n; i++) o += data[i][j][1];
      if (o) for (i = 0; i < n; i++) data[i][j][1] /= o;
      else for (i = 0; i < n; i++) data[i][j][1] = k;
    }
    for (j = 0; j < m; ++j) y0[j] = 0;
    return y0;
  },

  "zero": d3_layout_stackOffsetZero

});

function d3_layout_stackOrderDefault(data) {
  return d3.range(data.length);
}

function d3_layout_stackOffsetZero(data) {
  var j = -1,
      m = data[0].length,
      y0 = [];
  while (++j < m) y0[j] = 0;
  return y0;
}

function d3_layout_stackMaxIndex(array) {
  var i = 1,
      j = 0,
      v = array[0][1],
      k,
      n = array.length;
  for (; i < n; ++i) {
    if ((k = array[i][1]) > v) {
      j = i;
      v = k;
    }
  }
  return j;
}

function d3_layout_stackReduceSum(d) {
  return d.reduce(d3_layout_stackSum, 0);
}

function d3_layout_stackSum(p, d) {
  return p + d[1];
}
d3.layout.histogram = function() {
  var frequency = true,
      valuer = Number,
      ranger = d3_layout_histogramRange,
      binner = d3_layout_histogramBinSturges;

  function histogram(data, i) {
    var bins = [],
        values = data.map(valuer, this),
        range = ranger.call(this, values, i),
        thresholds = binner.call(this, range, values, i),
        bin,
        i = -1,
        n = values.length,
        m = thresholds.length - 1,
        k = frequency ? 1 : 1 / n,
        x;

    // Initialize the bins.
    while (++i < m) {
      bin = bins[i] = [];
      bin.dx = thresholds[i + 1] - (bin.x = thresholds[i]);
      bin.y = 0;
    }

    // Fill the bins, ignoring values outside the range.
    if (m > 0) {
      i = -1; while(++i < n) {
        x = values[i];
        if ((x >= range[0]) && (x <= range[1])) {
          bin = bins[d3.bisect(thresholds, x, 1, m) - 1];
          bin.y += k;
          bin.push(data[i]);
        }
      }
    }

    return bins;
  }

  // Specifies how to extract a value from the associated data. The default
  // value function is `Number`, which is equivalent to the identity function.
  histogram.value = function(x) {
    if (!arguments.length) return valuer;
    valuer = x;
    return histogram;
  };

  // Specifies the range of the histogram. Values outside the specified range
  // will be ignored. The argument `x` may be specified either as a two-element
  // array representing the minimum and maximum value of the range, or as a
  // function that returns the range given the array of values and the current
  // index `i`. The default range is the extent (minimum and maximum) of the
  // values.
  histogram.range = function(x) {
    if (!arguments.length) return ranger;
    ranger = d3_functor(x);
    return histogram;
  };

  // Specifies how to bin values in the histogram. The argument `x` may be
  // specified as a number, in which case the range of values will be split
  // uniformly into the given number of bins. Or, `x` may be an array of
  // threshold values, defining the bins; the specified array must contain the
  // rightmost (upper) value, thus specifying n + 1 values for n bins. Or, `x`
  // may be a function which is evaluated, being passed the range, the array of
  // values, and the current index `i`, returning an array of thresholds. The
  // default bin function will divide the values into uniform bins using
  // Sturges' formula.
  histogram.bins = function(x) {
    if (!arguments.length) return binner;
    binner = typeof x === "number"
        ? function(range) { return d3_layout_histogramBinFixed(range, x); }
        : d3_functor(x);
    return histogram;
  };

  // Specifies whether the histogram's `y` value is a count (frequency) or a
  // probability (density). The default value is true.
  histogram.frequency = function(x) {
    if (!arguments.length) return frequency;
    frequency = !!x;
    return histogram;
  };

  return histogram;
};

function d3_layout_histogramBinSturges(range, values) {
  return d3_layout_histogramBinFixed(range, Math.ceil(Math.log(values.length) / Math.LN2 + 1));
}

function d3_layout_histogramBinFixed(range, n) {
  var x = -1,
      b = +range[0],
      m = (range[1] - b) / n,
      f = [];
  while (++x <= n) f[x] = m * x + b;
  return f;
}

function d3_layout_histogramRange(values) {
  return [d3.min(values), d3.max(values)];
}
d3.layout.hierarchy = function() {
  var sort = d3_layout_hierarchySort,
      children = d3_layout_hierarchyChildren,
      value = d3_layout_hierarchyValue;

  // Recursively compute the node depth and value.
  // Also converts the data representation into a standard hierarchy structure.
  function recurse(data, depth, nodes) {
    var childs = children.call(hierarchy, data, depth),
        node = d3_layout_hierarchyInline ? data : {data: data};
    node.depth = depth;
    nodes.push(node);
    if (childs && (n = childs.length)) {
      var i = -1,
          n,
          c = node.children = [],
          v = 0,
          j = depth + 1,
          d;
      while (++i < n) {
        d = recurse(childs[i], j, nodes);
        d.parent = node;
        c.push(d);
        v += d.value;
      }
      if (sort) c.sort(sort);
      if (value) node.value = v;
    } else if (value) {
      node.value = +value.call(hierarchy, data, depth) || 0;
    }
    return node;
  }

  // Recursively re-evaluates the node value.
  function revalue(node, depth) {
    var children = node.children,
        v = 0;
    if (children && (n = children.length)) {
      var i = -1,
          n,
          j = depth + 1;
      while (++i < n) v += revalue(children[i], j);
    } else if (value) {
      v = +value.call(hierarchy, d3_layout_hierarchyInline ? node : node.data, depth) || 0;
    }
    if (value) node.value = v;
    return v;
  }

  function hierarchy(d) {
    var nodes = [];
    recurse(d, 0, nodes);
    return nodes;
  }

  hierarchy.sort = function(x) {
    if (!arguments.length) return sort;
    sort = x;
    return hierarchy;
  };

  hierarchy.children = function(x) {
    if (!arguments.length) return children;
    children = x;
    return hierarchy;
  };

  hierarchy.value = function(x) {
    if (!arguments.length) return value;
    value = x;
    return hierarchy;
  };

  // Re-evaluates the `value` property for the specified hierarchy.
  hierarchy.revalue = function(root) {
    revalue(root, 0);
    return root;
  };

  return hierarchy;
};

// A method assignment helper for hierarchy subclasses.
function d3_layout_hierarchyRebind(object, hierarchy) {
  d3.rebind(object, hierarchy, "sort", "children", "value");

  // Add an alias for links, for convenience.
  object.links = d3_layout_hierarchyLinks;

  // If the new API is used, enabling inlining.
  object.nodes = function(d) {
    d3_layout_hierarchyInline = true;
    return (object.nodes = object)(d);
  };

  return object;
}

function d3_layout_hierarchyChildren(d) {
  return d.children;
}

function d3_layout_hierarchyValue(d) {
  return d.value;
}

function d3_layout_hierarchySort(a, b) {
  return b.value - a.value;
}

// Returns an array source+target objects for the specified nodes.
function d3_layout_hierarchyLinks(nodes) {
  return d3.merge(nodes.map(function(parent) {
    return (parent.children || []).map(function(child) {
      return {source: parent, target: child};
    });
  }));
}

// For backwards-compatibility, don't enable inlining by default.
var d3_layout_hierarchyInline = false;
d3.layout.pack = function() {
  var hierarchy = d3.layout.hierarchy().sort(d3_layout_packSort),
      size = [1, 1];

  function pack(d, i) {
    var nodes = hierarchy.call(this, d, i),
        root = nodes[0];

    // Recursively compute the layout.
    root.x = 0;
    root.y = 0;
    d3_layout_packTree(root);

    // Scale the layout to fit the requested size.
    var w = size[0],
        h = size[1],
        k = 1 / Math.max(2 * root.r / w, 2 * root.r / h);
    d3_layout_packTransform(root, w / 2, h / 2, k);

    return nodes;
  }

  pack.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return pack;
  };

  return d3_layout_hierarchyRebind(pack, hierarchy);
};

function d3_layout_packSort(a, b) {
  return a.value - b.value;
}

function d3_layout_packInsert(a, b) {
  var c = a._pack_next;
  a._pack_next = b;
  b._pack_prev = a;
  b._pack_next = c;
  c._pack_prev = b;
}

function d3_layout_packSplice(a, b) {
  a._pack_next = b;
  b._pack_prev = a;
}

function d3_layout_packIntersects(a, b) {
  var dx = b.x - a.x,
      dy = b.y - a.y,
      dr = a.r + b.r;
  return dr * dr - dx * dx - dy * dy > .001; // within epsilon
}

function d3_layout_packCircle(nodes) {
  var xMin = Infinity,
      xMax = -Infinity,
      yMin = Infinity,
      yMax = -Infinity,
      n = nodes.length,
      a, b, c, j, k;

  function bound(node) {
    xMin = Math.min(node.x - node.r, xMin);
    xMax = Math.max(node.x + node.r, xMax);
    yMin = Math.min(node.y - node.r, yMin);
    yMax = Math.max(node.y + node.r, yMax);
  }

  // Create node links.
  nodes.forEach(d3_layout_packLink);

  // Create first node.
  a = nodes[0];
  a.x = -a.r;
  a.y = 0;
  bound(a);

  // Create second node.
  if (n > 1) {
    b = nodes[1];
    b.x = b.r;
    b.y = 0;
    bound(b);

    // Create third node and build chain.
    if (n > 2) {
      c = nodes[2];
      d3_layout_packPlace(a, b, c);
      bound(c);
      d3_layout_packInsert(a, c);
      a._pack_prev = c;
      d3_layout_packInsert(c, b);
      b = a._pack_next;

      // Now iterate through the rest.
      for (var i = 3; i < n; i++) {
        d3_layout_packPlace(a, b, c = nodes[i]);

        // Search for the closest intersection.
        var isect = 0, s1 = 1, s2 = 1;
        for (j = b._pack_next; j !== b; j = j._pack_next, s1++) {
          if (d3_layout_packIntersects(j, c)) {
            isect = 1;
            break;
          }
        }
        if (isect == 1) {
          for (k = a._pack_prev; k !== j._pack_prev; k = k._pack_prev, s2++) {
            if (d3_layout_packIntersects(k, c)) {
              break;
            }
          }
        }

        // Update node chain.
        if (isect) {
          if (s1 < s2 || (s1 == s2 && b.r < a.r)) d3_layout_packSplice(a, b = j);
          else d3_layout_packSplice(a = k, b);
          i--;
        } else {
          d3_layout_packInsert(a, c);
          b = c;
          bound(c);
        }
      }
    }
  }

  // Re-center the circles and return the encompassing radius.
  var cx = (xMin + xMax) / 2,
      cy = (yMin + yMax) / 2,
      cr = 0;
  for (var i = 0; i < n; i++) {
    var node = nodes[i];
    node.x -= cx;
    node.y -= cy;
    cr = Math.max(cr, node.r + Math.sqrt(node.x * node.x + node.y * node.y));
  }

  // Remove node links.
  nodes.forEach(d3_layout_packUnlink);

  return cr;
}

function d3_layout_packLink(node) {
  node._pack_next = node._pack_prev = node;
}

function d3_layout_packUnlink(node) {
  delete node._pack_next;
  delete node._pack_prev;
}

function d3_layout_packTree(node) {
  var children = node.children;
  if (children && children.length) {
    children.forEach(d3_layout_packTree);
    node.r = d3_layout_packCircle(children);
  } else {
    node.r = Math.sqrt(node.value);
  }
}

function d3_layout_packTransform(node, x, y, k) {
  var children = node.children;
  node.x = (x += k * node.x);
  node.y = (y += k * node.y);
  node.r *= k;
  if (children) {
    var i = -1, n = children.length;
    while (++i < n) d3_layout_packTransform(children[i], x, y, k);
  }
}

function d3_layout_packPlace(a, b, c) {
  var db = a.r + c.r,
      dx = b.x - a.x,
      dy = b.y - a.y;
  if (db && (dx || dy)) {
    var da = b.r + c.r,
        dc = Math.sqrt(dx * dx + dy * dy),
        cos = Math.max(-1, Math.min(1, (db * db + dc * dc - da * da) / (2 * db * dc))),
        theta = Math.acos(cos),
        x = cos * (db /= dc),
        y = Math.sin(theta) * db;
    c.x = a.x + x * dx + y * dy;
    c.y = a.y + x * dy - y * dx;
  } else {
    c.x = a.x + db;
    c.y = a.y;
  }
}
// Implements a hierarchical layout using the cluster (or dendrogram)
// algorithm.
d3.layout.cluster = function() {
  var hierarchy = d3.layout.hierarchy().sort(null).value(null),
      separation = d3_layout_treeSeparation,
      size = [1, 1]; // width, height

  function cluster(d, i) {
    var nodes = hierarchy.call(this, d, i),
        root = nodes[0],
        previousNode,
        x = 0,
        kx,
        ky;

    // First walk, computing the initial x & y values.
    d3_layout_treeVisitAfter(root, function(node) {
      var children = node.children;
      if (children && children.length) {
        node.x = d3_layout_clusterX(children);
        node.y = d3_layout_clusterY(children);
      } else {
        node.x = previousNode ? x += separation(node, previousNode) : 0;
        node.y = 0;
        previousNode = node;
      }
    });

    // Compute the left-most, right-most, and depth-most nodes for extents.
    var left = d3_layout_clusterLeft(root),
        right = d3_layout_clusterRight(root),
        x0 = left.x - separation(left, right) / 2,
        x1 = right.x + separation(right, left) / 2;

    // Second walk, normalizing x & y to the desired size.
    d3_layout_treeVisitAfter(root, function(node) {
      node.x = (node.x - x0) / (x1 - x0) * size[0];
      node.y = (1 - (root.y ? node.y / root.y : 1)) * size[1];
    });

    return nodes;
  }

  cluster.separation = function(x) {
    if (!arguments.length) return separation;
    separation = x;
    return cluster;
  };

  cluster.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return cluster;
  };

  return d3_layout_hierarchyRebind(cluster, hierarchy);
};

function d3_layout_clusterY(children) {
  return 1 + d3.max(children, function(child) {
    return child.y;
  });
}

function d3_layout_clusterX(children) {
  return children.reduce(function(x, child) {
    return x + child.x;
  }, 0) / children.length;
}

function d3_layout_clusterLeft(node) {
  var children = node.children;
  return children && children.length ? d3_layout_clusterLeft(children[0]) : node;
}

function d3_layout_clusterRight(node) {
  var children = node.children, n;
  return children && (n = children.length) ? d3_layout_clusterRight(children[n - 1]) : node;
}
// Node-link tree diagram using the Reingold-Tilford "tidy" algorithm
d3.layout.tree = function() {
  var hierarchy = d3.layout.hierarchy().sort(null).value(null),
      separation = d3_layout_treeSeparation,
      size = [1, 1]; // width, height

  function tree(d, i) {
    var nodes = hierarchy.call(this, d, i),
        root = nodes[0];

    function firstWalk(node, previousSibling) {
      var children = node.children,
          layout = node._tree;
      if (children && (n = children.length)) {
        var n,
            firstChild = children[0],
            previousChild,
            ancestor = firstChild,
            child,
            i = -1;
        while (++i < n) {
          child = children[i];
          firstWalk(child, previousChild);
          ancestor = apportion(child, previousChild, ancestor);
          previousChild = child;
        }
        d3_layout_treeShift(node);
        var midpoint = .5 * (firstChild._tree.prelim + child._tree.prelim);
        if (previousSibling) {
          layout.prelim = previousSibling._tree.prelim + separation(node, previousSibling);
          layout.mod = layout.prelim - midpoint;
        } else {
          layout.prelim = midpoint;
        }
      } else {
        if (previousSibling) {
          layout.prelim = previousSibling._tree.prelim + separation(node, previousSibling);
        }
      }
    }

    function secondWalk(node, x) {
      node.x = node._tree.prelim + x;
      var children = node.children;
      if (children && (n = children.length)) {
        var i = -1,
            n;
        x += node._tree.mod;
        while (++i < n) {
          secondWalk(children[i], x);
        }
      }
    }

    function apportion(node, previousSibling, ancestor) {
      if (previousSibling) {
        var vip = node,
            vop = node,
            vim = previousSibling,
            vom = node.parent.children[0],
            sip = vip._tree.mod,
            sop = vop._tree.mod,
            sim = vim._tree.mod,
            som = vom._tree.mod,
            shift;
        while (vim = d3_layout_treeRight(vim), vip = d3_layout_treeLeft(vip), vim && vip) {
          vom = d3_layout_treeLeft(vom);
          vop = d3_layout_treeRight(vop);
          vop._tree.ancestor = node;
          shift = vim._tree.prelim + sim - vip._tree.prelim - sip + separation(vim, vip);
          if (shift > 0) {
            d3_layout_treeMove(d3_layout_treeAncestor(vim, node, ancestor), node, shift);
            sip += shift;
            sop += shift;
          }
          sim += vim._tree.mod;
          sip += vip._tree.mod;
          som += vom._tree.mod;
          sop += vop._tree.mod;
        }
        if (vim && !d3_layout_treeRight(vop)) {
          vop._tree.thread = vim;
          vop._tree.mod += sim - sop;
        }
        if (vip && !d3_layout_treeLeft(vom)) {
          vom._tree.thread = vip;
          vom._tree.mod += sip - som;
          ancestor = node;
        }
      }
      return ancestor;
    }

    // Initialize temporary layout variables.
    d3_layout_treeVisitAfter(root, function(node, previousSibling) {
      node._tree = {
        ancestor: node,
        prelim: 0,
        mod: 0,
        change: 0,
        shift: 0,
        number: previousSibling ? previousSibling._tree.number + 1 : 0
      };
    });

    // Compute the layout using Buchheim et al.'s algorithm.
    firstWalk(root);
    secondWalk(root, -root._tree.prelim);

    // Compute the left-most, right-most, and depth-most nodes for extents.
    var left = d3_layout_treeSearch(root, d3_layout_treeLeftmost),
        right = d3_layout_treeSearch(root, d3_layout_treeRightmost),
        deep = d3_layout_treeSearch(root, d3_layout_treeDeepest),
        x0 = left.x - separation(left, right) / 2,
        x1 = right.x + separation(right, left) / 2,
        y1 = deep.depth || 1;

    // Clear temporary layout variables; transform x and y.
    d3_layout_treeVisitAfter(root, function(node) {
      node.x = (node.x - x0) / (x1 - x0) * size[0];
      node.y = node.depth / y1 * size[1];
      delete node._tree;
    });

    return nodes;
  }

  tree.separation = function(x) {
    if (!arguments.length) return separation;
    separation = x;
    return tree;
  };

  tree.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return tree;
  };

  return d3_layout_hierarchyRebind(tree, hierarchy);
};

function d3_layout_treeSeparation(a, b) {
  return a.parent == b.parent ? 1 : 2;
}

// function d3_layout_treeSeparationRadial(a, b) {
//   return (a.parent == b.parent ? 1 : 2) / a.depth;
// }

function d3_layout_treeLeft(node) {
  var children = node.children;
  return children && children.length ? children[0] : node._tree.thread;
}

function d3_layout_treeRight(node) {
  var children = node.children,
      n;
  return children && (n = children.length) ? children[n - 1] : node._tree.thread;
}

function d3_layout_treeSearch(node, compare) {
  var children = node.children;
  if (children && (n = children.length)) {
    var child,
        n,
        i = -1;
    while (++i < n) {
      if (compare(child = d3_layout_treeSearch(children[i], compare), node) > 0) {
        node = child;
      }
    }
  }
  return node;
}

function d3_layout_treeRightmost(a, b) {
  return a.x - b.x;
}

function d3_layout_treeLeftmost(a, b) {
  return b.x - a.x;
}

function d3_layout_treeDeepest(a, b) {
  return a.depth - b.depth;
}

function d3_layout_treeVisitAfter(node, callback) {
  function visit(node, previousSibling) {
    var children = node.children;
    if (children && (n = children.length)) {
      var child,
          previousChild = null,
          i = -1,
          n;
      while (++i < n) {
        child = children[i];
        visit(child, previousChild);
        previousChild = child;
      }
    }
    callback(node, previousSibling);
  }
  visit(node, null);
}

function d3_layout_treeShift(node) {
  var shift = 0,
      change = 0,
      children = node.children,
      i = children.length,
      child;
  while (--i >= 0) {
    child = children[i]._tree;
    child.prelim += shift;
    child.mod += shift;
    shift += child.shift + (change += child.change);
  }
}

function d3_layout_treeMove(ancestor, node, shift) {
  ancestor = ancestor._tree;
  node = node._tree;
  var change = shift / (node.number - ancestor.number);
  ancestor.change += change;
  node.change -= change;
  node.shift += shift;
  node.prelim += shift;
  node.mod += shift;
}

function d3_layout_treeAncestor(vim, node, ancestor) {
  return vim._tree.ancestor.parent == node.parent
      ? vim._tree.ancestor
      : ancestor;
}
// Squarified Treemaps by Mark Bruls, Kees Huizing, and Jarke J. van Wijk
// Modified to support a target aspect ratio by Jeff Heer
d3.layout.treemap = function() {
  var hierarchy = d3.layout.hierarchy(),
      round = Math.round,
      size = [1, 1], // width, height
      padding = null,
      pad = d3_layout_treemapPadNull,
      sticky = false,
      stickies,
      ratio = 0.5 * (1 + Math.sqrt(5)); // golden ratio

  // Compute the area for each child based on value & scale.
  function scale(children, k) {
    var i = -1,
        n = children.length,
        child,
        area;
    while (++i < n) {
      area = (child = children[i]).value * (k < 0 ? 0 : k);
      child.area = isNaN(area) || area <= 0 ? 0 : area;
    }
  }

  // Recursively arranges the specified node's children into squarified rows.
  function squarify(node) {
    var children = node.children;
    if (children && children.length) {
      var rect = pad(node),
          row = [],
          remaining = children.slice(), // copy-on-write
          child,
          best = Infinity, // the best row score so far
          score, // the current row score
          u = Math.min(rect.dx, rect.dy), // initial orientation
          n;
      scale(remaining, rect.dx * rect.dy / node.value);
      row.area = 0;
      while ((n = remaining.length) > 0) {
        row.push(child = remaining[n - 1]);
        row.area += child.area;
        if ((score = worst(row, u)) <= best) { // continue with this orientation
          remaining.pop();
          best = score;
        } else { // abort, and try a different orientation
          row.area -= row.pop().area;
          position(row, u, rect, false);
          u = Math.min(rect.dx, rect.dy);
          row.length = row.area = 0;
          best = Infinity;
        }
      }
      if (row.length) {
        position(row, u, rect, true);
        row.length = row.area = 0;
      }
      children.forEach(squarify);
    }
  }

  // Recursively resizes the specified node's children into existing rows.
  // Preserves the existing layout!
  function stickify(node) {
    var children = node.children;
    if (children && children.length) {
      var rect = pad(node),
          remaining = children.slice(), // copy-on-write
          child,
          row = [];
      scale(remaining, rect.dx * rect.dy / node.value);
      row.area = 0;
      while (child = remaining.pop()) {
        row.push(child);
        row.area += child.area;
        if (child.z != null) {
          position(row, child.z ? rect.dx : rect.dy, rect, !remaining.length);
          row.length = row.area = 0;
        }
      }
      children.forEach(stickify);
    }
  }

  // Computes the score for the specified row, as the worst aspect ratio.
  function worst(row, u) {
    var s = row.area,
        r,
        rmax = 0,
        rmin = Infinity,
        i = -1,
        n = row.length;
    while (++i < n) {
      if (!(r = row[i].area)) continue;
      if (r < rmin) rmin = r;
      if (r > rmax) rmax = r;
    }
    s *= s;
    u *= u;
    return s
        ? Math.max((u * rmax * ratio) / s, s / (u * rmin * ratio))
        : Infinity;
  }

  // Positions the specified row of nodes. Modifies `rect`.
  function position(row, u, rect, flush) {
    var i = -1,
        n = row.length,
        x = rect.x,
        y = rect.y,
        v = u ? round(row.area / u) : 0,
        o;
    if (u == rect.dx) { // horizontal subdivision
      if (flush || v > rect.dy) v = rect.dy; // over+underflow
      while (++i < n) {
        o = row[i];
        o.x = x;
        o.y = y;
        o.dy = v;
        x += o.dx = Math.min(rect.x + rect.dx - x, v ? round(o.area / v) : 0);
      }
      o.z = true;
      o.dx += rect.x + rect.dx - x; // rounding error
      rect.y += v;
      rect.dy -= v;
    } else { // vertical subdivision
      if (flush || v > rect.dx) v = rect.dx; // over+underflow
      while (++i < n) {
        o = row[i];
        o.x = x;
        o.y = y;
        o.dx = v;
        y += o.dy = Math.min(rect.y + rect.dy - y, v ? round(o.area / v) : 0);
      }
      o.z = false;
      o.dy += rect.y + rect.dy - y; // rounding error
      rect.x += v;
      rect.dx -= v;
    }
  }

  function treemap(d) {
    var nodes = stickies || hierarchy(d),
        root = nodes[0];
    root.x = 0;
    root.y = 0;
    root.dx = size[0];
    root.dy = size[1];
    if (stickies) hierarchy.revalue(root);
    scale([root], root.dx * root.dy / root.value);
    (stickies ? stickify : squarify)(root);
    if (sticky) stickies = nodes;
    return nodes;
  }

  treemap.size = function(x) {
    if (!arguments.length) return size;
    size = x;
    return treemap;
  };

  treemap.padding = function(x) {
    if (!arguments.length) return padding;

    function padFunction(node) {
      var p = x.call(treemap, node, node.depth);
      return p == null
          ? d3_layout_treemapPadNull(node)
          : d3_layout_treemapPad(node, typeof p === "number" ? [p, p, p, p] : p);
    }

    function padConstant(node) {
      return d3_layout_treemapPad(node, x);
    }

    var type;
    pad = (padding = x) == null ? d3_layout_treemapPadNull
        : (type = typeof x) === "function" ? padFunction
        : type === "number" ? (x = [x, x, x, x], padConstant)
        : padConstant;
    return treemap;
  };

  treemap.round = function(x) {
    if (!arguments.length) return round != Number;
    round = x ? Math.round : Number;
    return treemap;
  };

  treemap.sticky = function(x) {
    if (!arguments.length) return sticky;
    sticky = x;
    stickies = null;
    return treemap;
  };

  treemap.ratio = function(x) {
    if (!arguments.length) return ratio;
    ratio = x;
    return treemap;
  };

  return d3_layout_hierarchyRebind(treemap, hierarchy);
};

function d3_layout_treemapPadNull(node) {
  return {x: node.x, y: node.y, dx: node.dx, dy: node.dy};
}

function d3_layout_treemapPad(node, padding) {
  var x = node.x + padding[3],
      y = node.y + padding[0],
      dx = node.dx - padding[1] - padding[3],
      dy = node.dy - padding[0] - padding[2];
  if (dx < 0) { x += dx / 2; dx = 0; }
  if (dy < 0) { y += dy / 2; dy = 0; }
  return {x: x, y: y, dx: dx, dy: dy};
}
d3.csv = function(url, callback) {
  d3.text(url, "text/csv", function(text) {
    callback(text && d3.csv.parse(text));
  });
};
d3.csv.parse = function(text) {
  var header;
  return d3.csv.parseRows(text, function(row, i) {
    if (i) {
      var o = {}, j = -1, m = header.length;
      while (++j < m) o[header[j]] = row[j];
      return o;
    } else {
      header = row;
      return null;
    }
  });
};

d3.csv.parseRows = function(text, f) {
  var EOL = {}, // sentinel value for end-of-line
      EOF = {}, // sentinel value for end-of-file
      rows = [], // output rows
      re = /\r\n|[,\r\n]/g, // field separator regex
      n = 0, // the current line number
      t, // the current token
      eol; // is the current token followed by EOL?

  re.lastIndex = 0; // work-around bug in FF 3.6

  /** @private Returns the next token. */
  function token() {
    if (re.lastIndex >= text.length) return EOF; // special case: end of file
    if (eol) { eol = false; return EOL; } // special case: end of line

    // special case: quotes
    var j = re.lastIndex;
    if (text.charCodeAt(j) === 34) {
      var i = j;
      while (i++ < text.length) {
        if (text.charCodeAt(i) === 34) {
          if (text.charCodeAt(i + 1) !== 34) break;
          i++;
        }
      }
      re.lastIndex = i + 2;
      var c = text.charCodeAt(i + 1);
      if (c === 13) {
        eol = true;
        if (text.charCodeAt(i + 2) === 10) re.lastIndex++;
      } else if (c === 10) {
        eol = true;
      }
      return text.substring(j + 1, i).replace(/""/g, "\"");
    }

    // common case
    var m = re.exec(text);
    if (m) {
      eol = m[0].charCodeAt(0) !== 44;
      return text.substring(j, m.index);
    }
    re.lastIndex = text.length;
    return text.substring(j);
  }

  while ((t = token()) !== EOF) {
    var a = [];
    while ((t !== EOL) && (t !== EOF)) {
      a.push(t);
      t = token();
    }
    if (f && !(a = f(a, n++))) continue;
    rows.push(a);
  }

  return rows;
};
d3.csv.format = function(rows) {
  return rows.map(d3_csv_formatRow).join("\n");
};

function d3_csv_formatRow(row) {
  return row.map(d3_csv_formatValue).join(",");
}

function d3_csv_formatValue(text) {
  return /[",\n]/.test(text)
      ? "\"" + text.replace(/\"/g, "\"\"") + "\""
      : text;
}
d3.geo = {};

var d3_geo_radians = Math.PI / 180;
// TODO clip input coordinates on opposite hemisphere
d3.geo.azimuthal = function() {
  var mode = "orthographic", // or stereographic, gnomonic, equidistant or equalarea
      origin,
      scale = 200,
      translate = [480, 250],
      x0,
      y0,
      cy0,
      sy0;

  function azimuthal(coordinates) {
    var x1 = coordinates[0] * d3_geo_radians - x0,
        y1 = coordinates[1] * d3_geo_radians,
        cx1 = Math.cos(x1),
        sx1 = Math.sin(x1),
        cy1 = Math.cos(y1),
        sy1 = Math.sin(y1),
        cc = mode !== "orthographic" ? sy0 * sy1 + cy0 * cy1 * cx1 : null,
        c,
        k = mode === "stereographic" ? 1 / (1 + cc)
          : mode === "gnomonic" ? 1 / cc
          : mode === "equidistant" ? (c = Math.acos(cc), c ? c / Math.sin(c) : 0)
          : mode === "equalarea" ? Math.sqrt(2 / (1 + cc))
          : 1,
        x = k * cy1 * sx1,
        y = k * (sy0 * cy1 * cx1 - cy0 * sy1);
    return [
      scale * x + translate[0],
      scale * y + translate[1]
    ];
  }

  azimuthal.invert = function(coordinates) {
    var x = (coordinates[0] - translate[0]) / scale,
        y = (coordinates[1] - translate[1]) / scale,
        p = Math.sqrt(x * x + y * y),
        c = mode === "stereographic" ? 2 * Math.atan(p)
          : mode === "gnomonic" ? Math.atan(p)
          : mode === "equidistant" ? p
          : mode === "equalarea" ? 2 * Math.asin(.5 * p)
          : Math.asin(p),
        sc = Math.sin(c),
        cc = Math.cos(c);
    return [
      (x0 + Math.atan2(x * sc, p * cy0 * cc + y * sy0 * sc)) / d3_geo_radians,
      Math.asin(cc * sy0 - (p ? (y * sc * cy0) / p : 0)) / d3_geo_radians
    ];
  };

  azimuthal.mode = function(x) {
    if (!arguments.length) return mode;
    mode = x + "";
    return azimuthal;
  };

  azimuthal.origin = function(x) {
    if (!arguments.length) return origin;
    origin = x;
    x0 = origin[0] * d3_geo_radians;
    y0 = origin[1] * d3_geo_radians;
    cy0 = Math.cos(y0);
    sy0 = Math.sin(y0);
    return azimuthal;
  };

  azimuthal.scale = function(x) {
    if (!arguments.length) return scale;
    scale = +x;
    return azimuthal;
  };

  azimuthal.translate = function(x) {
    if (!arguments.length) return translate;
    translate = [+x[0], +x[1]];
    return azimuthal;
  };

  return azimuthal.origin([0, 0]);
};
// Derived from Tom Carden's Albers implementation for Protovis.
// http://gist.github.com/476238
// http://mathworld.wolfram.com/AlbersEqual-AreaConicProjection.html

d3.geo.albers = function() {
  var origin = [-98, 38],
      parallels = [29.5, 45.5],
      scale = 1000,
      translate = [480, 250],
      lng0, // d3_geo_radians * origin[0]
      n,
      C,
      p0;

  function albers(coordinates) {
    var t = n * (d3_geo_radians * coordinates[0] - lng0),
        p = Math.sqrt(C - 2 * n * Math.sin(d3_geo_radians * coordinates[1])) / n;
    return [
      scale * p * Math.sin(t) + translate[0],
      scale * (p * Math.cos(t) - p0) + translate[1]
    ];
  }

  albers.invert = function(coordinates) {
    var x = (coordinates[0] - translate[0]) / scale,
        y = (coordinates[1] - translate[1]) / scale,
        p0y = p0 + y,
        t = Math.atan2(x, p0y),
        p = Math.sqrt(x * x + p0y * p0y);
    return [
      (lng0 + t / n) / d3_geo_radians,
      Math.asin((C - p * p * n * n) / (2 * n)) / d3_geo_radians
    ];
  };

  function reload() {
    var phi1 = d3_geo_radians * parallels[0],
        phi2 = d3_geo_radians * parallels[1],
        lat0 = d3_geo_radians * origin[1],
        s = Math.sin(phi1),
        c = Math.cos(phi1);
    lng0 = d3_geo_radians * origin[0];
    n = .5 * (s + Math.sin(phi2));
    C = c * c + 2 * n * s;
    p0 = Math.sqrt(C - 2 * n * Math.sin(lat0)) / n;
    return albers;
  }

  albers.origin = function(x) {
    if (!arguments.length) return origin;
    origin = [+x[0], +x[1]];
    return reload();
  };

  albers.parallels = function(x) {
    if (!arguments.length) return parallels;
    parallels = [+x[0], +x[1]];
    return reload();
  };

  albers.scale = function(x) {
    if (!arguments.length) return scale;
    scale = +x;
    return albers;
  };

  albers.translate = function(x) {
    if (!arguments.length) return translate;
    translate = [+x[0], +x[1]];
    return albers;
  };

  return reload();
};

// A composite projection for the United States, 960x500. The set of standard
// parallels for each region comes from USGS, which is published here:
// http://egsc.usgs.gov/isb/pubs/MapProjections/projections.html#albers
// TODO allow the composite projection to be rescaled?
d3.geo.albersUsa = function() {
  var lower48 = d3.geo.albers();

  var alaska = d3.geo.albers()
      .origin([-160, 60])
      .parallels([55, 65]);

  var hawaii = d3.geo.albers()
      .origin([-160, 20])
      .parallels([8, 18]);

  var puertoRico = d3.geo.albers()
      .origin([-60, 10])
      .parallels([8, 18]);

  function albersUsa(coordinates) {
    var lon = coordinates[0],
        lat = coordinates[1];
    return (lat > 50 ? alaska
        : lon < -140 ? hawaii
        : lat < 21 ? puertoRico
        : lower48)(coordinates);
  }

  albersUsa.scale = function(x) {
    if (!arguments.length) return lower48.scale();
    lower48.scale(x);
    alaska.scale(x * .6);
    hawaii.scale(x);
    puertoRico.scale(x * 1.5);
    return albersUsa.translate(lower48.translate());
  };

  albersUsa.translate = function(x) {
    if (!arguments.length) return lower48.translate();
    var dz = lower48.scale() / 1000,
        dx = x[0],
        dy = x[1];
    lower48.translate(x);
    alaska.translate([dx - 400 * dz, dy + 170 * dz]);
    hawaii.translate([dx - 190 * dz, dy + 200 * dz]);
    puertoRico.translate([dx + 580 * dz, dy + 430 * dz]);
    return albersUsa;
  };

  return albersUsa.scale(lower48.scale());
};
d3.geo.bonne = function() {
  var scale = 200,
      translate = [480, 250],
      x0, // origin longitude in radians
      y0, // origin latitude in radians
      y1, // parallel latitude in radians
      c1; // cot(y1)

  function bonne(coordinates) {
    var x = coordinates[0] * d3_geo_radians - x0,
        y = coordinates[1] * d3_geo_radians - y0;
    if (y1) {
      var p = c1 + y1 - y, E = x * Math.cos(y) / p;
      x = p * Math.sin(E);
      y = p * Math.cos(E) - c1;
    } else {
      x *= Math.cos(y);
      y *= -1;
    }
    return [
      scale * x + translate[0],
      scale * y + translate[1]
    ];
  }

  bonne.invert = function(coordinates) {
    var x = (coordinates[0] - translate[0]) / scale,
        y = (coordinates[1] - translate[1]) / scale;
    if (y1) {
      var c = c1 + y, p = Math.sqrt(x * x + c * c);
      y = c1 + y1 - p;
      x = x0 + p * Math.atan2(x, c) / Math.cos(y);
    } else {
      y *= -1;
      x /= Math.cos(y);
    }
    return [
      x / d3_geo_radians,
      y / d3_geo_radians
    ];
  };

  // 90° for Werner, 0° for Sinusoidal
  bonne.parallel = function(x) {
    if (!arguments.length) return y1 / d3_geo_radians;
    c1 = 1 / Math.tan(y1 = x * d3_geo_radians);
    return bonne;
  };

  bonne.origin = function(x) {
    if (!arguments.length) return [x0 / d3_geo_radians, y0 / d3_geo_radians];
    x0 = x[0] * d3_geo_radians;
    y0 = x[1] * d3_geo_radians;
    return bonne;
  };

  bonne.scale = function(x) {
    if (!arguments.length) return scale;
    scale = +x;
    return bonne;
  };

  bonne.translate = function(x) {
    if (!arguments.length) return translate;
    translate = [+x[0], +x[1]];
    return bonne;
  };

  return bonne.origin([0, 0]).parallel(45);
};
d3.geo.equirectangular = function() {
  var scale = 500,
      translate = [480, 250];

  function equirectangular(coordinates) {
    var x = coordinates[0] / 360,
        y = -coordinates[1] / 360;
    return [
      scale * x + translate[0],
      scale * y + translate[1]
    ];
  }

  equirectangular.invert = function(coordinates) {
    var x = (coordinates[0] - translate[0]) / scale,
        y = (coordinates[1] - translate[1]) / scale;
    return [
      360 * x,
      -360 * y
    ];
  };

  equirectangular.scale = function(x) {
    if (!arguments.length) return scale;
    scale = +x;
    return equirectangular;
  };

  equirectangular.translate = function(x) {
    if (!arguments.length) return translate;
    translate = [+x[0], +x[1]];
    return equirectangular;
  };

  return equirectangular;
};
d3.geo.mercator = function() {
  var scale = 500,
      translate = [480, 250];

  function mercator(coordinates) {
    var x = coordinates[0] / 360,
        y = -(Math.log(Math.tan(Math.PI / 4 + coordinates[1] * d3_geo_radians / 2)) / d3_geo_radians) / 360;
    return [
      scale * x + translate[0],
      scale * Math.max(-.5, Math.min(.5, y)) + translate[1]
    ];
  }

  mercator.invert = function(coordinates) {
    var x = (coordinates[0] - translate[0]) / scale,
        y = (coordinates[1] - translate[1]) / scale;
    return [
      360 * x,
      2 * Math.atan(Math.exp(-360 * y * d3_geo_radians)) / d3_geo_radians - 90
    ];
  };

  mercator.scale = function(x) {
    if (!arguments.length) return scale;
    scale = +x;
    return mercator;
  };

  mercator.translate = function(x) {
    if (!arguments.length) return translate;
    translate = [+x[0], +x[1]];
    return mercator;
  };

  return mercator;
};
function d3_geo_type(types, defaultValue) {
  return function(object) {
    return object && types.hasOwnProperty(object.type) ? types[object.type](object) : defaultValue;
  };
}
/**
 * Returns a function that, given a GeoJSON object (e.g., a feature), returns
 * the corresponding SVG path. The function can be customized by overriding the
 * projection. Point features are mapped to circles with a default radius of
 * 4.5px; the radius can be specified either as a constant or a function that
 * is evaluated per object.
 */
d3.geo.path = function() {
  var pointRadius = 4.5,
      pointCircle = d3_path_circle(pointRadius),
      projection = d3.geo.albersUsa(),
      buffer = [];

  function path(d, i) {
    if (typeof pointRadius === "function") pointCircle = d3_path_circle(pointRadius.apply(this, arguments));
    pathType(d);
    var result = buffer.length ? buffer.join("") : null;
    buffer = [];
    return result;
  }

  function project(coordinates) {
    return projection(coordinates).join(",");
  }

  var pathType = d3_geo_type({

    FeatureCollection: function(o) {
      var features = o.features,
          i = -1, // features.index
          n = features.length;
      while (++i < n) buffer.push(pathType(features[i].geometry));
    },

    Feature: function(o) {
      pathType(o.geometry);
    },

    Point: function(o) {
      buffer.push("M", project(o.coordinates), pointCircle);
    },

    MultiPoint: function(o) {
      var coordinates = o.coordinates,
          i = -1, // coordinates.index
          n = coordinates.length;
      while (++i < n) buffer.push("M", project(coordinates[i]), pointCircle);
    },

    LineString: function(o) {
      var coordinates = o.coordinates,
          i = -1, // coordinates.index
          n = coordinates.length;
      buffer.push("M");
      while (++i < n) buffer.push(project(coordinates[i]), "L");
      buffer.pop();
    },

    MultiLineString: function(o) {
      var coordinates = o.coordinates,
          i = -1, // coordinates.index
          n = coordinates.length,
          subcoordinates, // coordinates[i]
          j, // subcoordinates.index
          m; // subcoordinates.length
      while (++i < n) {
        subcoordinates = coordinates[i];
        j = -1;
        m = subcoordinates.length;
        buffer.push("M");
        while (++j < m) buffer.push(project(subcoordinates[j]), "L");
        buffer.pop();
      }
    },

    Polygon: function(o) {
      var coordinates = o.coordinates,
          i = -1, // coordinates.index
          n = coordinates.length,
          subcoordinates, // coordinates[i]
          j, // subcoordinates.index
          m; // subcoordinates.length
      while (++i < n) {
        subcoordinates = coordinates[i];
        j = -1;
        if ((m = subcoordinates.length - 1) > 0) {
          buffer.push("M");
          while (++j < m) buffer.push(project(subcoordinates[j]), "L");
          buffer[buffer.length - 1] = "Z";
        }
      }
    },

    MultiPolygon: function(o) {
      var coordinates = o.coordinates,
          i = -1, // coordinates index
          n = coordinates.length,
          subcoordinates, // coordinates[i]
          j, // subcoordinates index
          m, // subcoordinates.length
          subsubcoordinates, // subcoordinates[j]
          k, // subsubcoordinates index
          p; // subsubcoordinates.length
      while (++i < n) {
        subcoordinates = coordinates[i];
        j = -1;
        m = subcoordinates.length;
        while (++j < m) {
          subsubcoordinates = subcoordinates[j];
          k = -1;
          if ((p = subsubcoordinates.length - 1) > 0) {
            buffer.push("M");
            while (++k < p) buffer.push(project(subsubcoordinates[k]), "L");
            buffer[buffer.length - 1] = "Z";
          }
        }
      }
    },

    GeometryCollection: function(o) {
      var geometries = o.geometries,
          i = -1, // geometries index
          n = geometries.length;
      while (++i < n) buffer.push(pathType(geometries[i]));
    }

  });

  var areaType = path.area = d3_geo_type({

    FeatureCollection: function(o) {
      var area = 0,
          features = o.features,
          i = -1, // features.index
          n = features.length;
      while (++i < n) area += areaType(features[i]);
      return area;
    },

    Feature: function(o) {
      return areaType(o.geometry);
    },

    Polygon: function(o) {
      return polygonArea(o.coordinates);
    },

    MultiPolygon: function(o) {
      var sum = 0,
          coordinates = o.coordinates,
          i = -1, // coordinates index
          n = coordinates.length;
      while (++i < n) sum += polygonArea(coordinates[i]);
      return sum;
    },

    GeometryCollection: function(o) {
      var sum = 0,
          geometries = o.geometries,
          i = -1, // geometries index
          n = geometries.length;
      while (++i < n) sum += areaType(geometries[i]);
      return sum;
    }

  }, 0);

  function polygonArea(coordinates) {
    var sum = area(coordinates[0]), // exterior ring
        i = 0, // coordinates.index
        n = coordinates.length;
    while (++i < n) sum -= area(coordinates[i]); // holes
    return sum;
  }

  function polygonCentroid(coordinates) {
    var polygon = d3.geom.polygon(coordinates[0].map(projection)), // exterior ring
        area = polygon.area(),
        centroid = polygon.centroid(area < 0 ? (area *= -1, 1) : -1),
        x = centroid[0],
        y = centroid[1],
        z = area,
        i = 0, // coordinates index
        n = coordinates.length;
    while (++i < n) {
      polygon = d3.geom.polygon(coordinates[i].map(projection)); // holes
      area = polygon.area();
      centroid = polygon.centroid(area < 0 ? (area *= -1, 1) : -1);
      x -= centroid[0];
      y -= centroid[1];
      z -= area;
    }
    return [x, y, 6 * z]; // weighted centroid
  }

  var centroidType = path.centroid = d3_geo_type({

    // TODO FeatureCollection
    // TODO Point
    // TODO MultiPoint
    // TODO LineString
    // TODO MultiLineString
    // TODO GeometryCollection

    Feature: function(o) {
      return centroidType(o.geometry);
    },

    Polygon: function(o) {
      var centroid = polygonCentroid(o.coordinates);
      return [centroid[0] / centroid[2], centroid[1] / centroid[2]];
    },

    MultiPolygon: function(o) {
      var area = 0,
          coordinates = o.coordinates,
          centroid,
          x = 0,
          y = 0,
          z = 0,
          i = -1, // coordinates index
          n = coordinates.length;
      while (++i < n) {
        centroid = polygonCentroid(coordinates[i]);
        x += centroid[0];
        y += centroid[1];
        z += centroid[2];
      }
      return [x / z, y / z];
    }

  });

  function area(coordinates) {
    return Math.abs(d3.geom.polygon(coordinates.map(projection)).area());
  }

  path.projection = function(x) {
    projection = x;
    return path;
  };

  path.pointRadius = function(x) {
    if (typeof x === "function") pointRadius = x;
    else {
      pointRadius = +x;
      pointCircle = d3_path_circle(pointRadius);
    }
    return path;
  };

  return path;
};

function d3_path_circle(radius) {
  return "m0," + radius
      + "a" + radius + "," + radius + " 0 1,1 0," + (-2 * radius)
      + "a" + radius + "," + radius + " 0 1,1 0," + (+2 * radius)
      + "z";
}
/**
 * Given a GeoJSON object, returns the corresponding bounding box. The bounding
 * box is represented by a two-dimensional array: [[left, bottom], [right,
 * top]], where left is the minimum longitude, bottom is the minimum latitude,
 * right is maximum longitude, and top is the maximum latitude.
 */
d3.geo.bounds = function(feature) {
  var left = Infinity,
      bottom = Infinity,
      right = -Infinity,
      top = -Infinity;
  d3_geo_bounds(feature, function(x, y) {
    if (x < left) left = x;
    if (x > right) right = x;
    if (y < bottom) bottom = y;
    if (y > top) top = y;
  });
  return [[left, bottom], [right, top]];
};

function d3_geo_bounds(o, f) {
  if (d3_geo_boundsTypes.hasOwnProperty(o.type)) d3_geo_boundsTypes[o.type](o, f);
}

var d3_geo_boundsTypes = {
  Feature: d3_geo_boundsFeature,
  FeatureCollection: d3_geo_boundsFeatureCollection,
  GeometryCollection: d3_geo_boundsGeometryCollection,
  LineString: d3_geo_boundsLineString,
  MultiLineString: d3_geo_boundsMultiLineString,
  MultiPoint: d3_geo_boundsLineString,
  MultiPolygon: d3_geo_boundsMultiPolygon,
  Point: d3_geo_boundsPoint,
  Polygon: d3_geo_boundsPolygon
};

function d3_geo_boundsFeature(o, f) {
  d3_geo_bounds(o.geometry, f);
}

function d3_geo_boundsFeatureCollection(o, f) {
  for (var a = o.features, i = 0, n = a.length; i < n; i++) {
    d3_geo_bounds(a[i].geometry, f);
  }
}

function d3_geo_boundsGeometryCollection(o, f) {
  for (var a = o.geometries, i = 0, n = a.length; i < n; i++) {
    d3_geo_bounds(a[i], f);
  }
}

function d3_geo_boundsLineString(o, f) {
  for (var a = o.coordinates, i = 0, n = a.length; i < n; i++) {
    f.apply(null, a[i]);
  }
}

function d3_geo_boundsMultiLineString(o, f) {
  for (var a = o.coordinates, i = 0, n = a.length; i < n; i++) {
    for (var b = a[i], j = 0, m = b.length; j < m; j++) {
      f.apply(null, b[j]);
    }
  }
}

function d3_geo_boundsMultiPolygon(o, f) {
  for (var a = o.coordinates, i = 0, n = a.length; i < n; i++) {
    for (var b = a[i][0], j = 0, m = b.length; j < m; j++) {
      f.apply(null, b[j]);
    }
  }
}

function d3_geo_boundsPoint(o, f) {
  f.apply(null, o.coordinates);
}

function d3_geo_boundsPolygon(o, f) {
  for (var a = o.coordinates[0], i = 0, n = a.length; i < n; i++) {
    f.apply(null, a[i]);
  }
}
// TODO breakAtDateLine?

d3.geo.circle = function() {
  var origin = [0, 0],
      degrees = 90 - 1e-2,
      radians = degrees * d3_geo_radians,
      arc = d3.geo.greatArc().source(origin).target(d3_identity);

  function circle() {
    // TODO render a circle as a Polygon
  }

  function visible(point) {
    return arc.distance(point) < radians;
  }

  circle.clip = function(d) {
    if (typeof origin === "function") arc.source(origin.apply(this, arguments));
    return clipType(d) || null;
  };

  var clipType = d3_geo_type({

    FeatureCollection: function(o) {
      var features = o.features.map(clipType).filter(d3_identity);
      return features && (o = Object.create(o), o.features = features, o);
    },

    Feature: function(o) {
      var geometry = clipType(o.geometry);
      return geometry && (o = Object.create(o), o.geometry = geometry, o);
    },

    Point: function(o) {
      return visible(o.coordinates) && o;
    },

    MultiPoint: function(o) {
      var coordinates = o.coordinates.filter(visible);
      return coordinates.length && {
        type: o.type,
        coordinates: coordinates
      };
    },

    LineString: function(o) {
      var coordinates = clip(o.coordinates);
      return coordinates.length && (o = Object.create(o), o.coordinates = coordinates, o);
    },

    MultiLineString: function(o) {
      var coordinates = o.coordinates.map(clip).filter(function(d) { return d.length; });
      return coordinates.length && (o = Object.create(o), o.coordinates = coordinates, o);
    },

    Polygon: function(o) {
      var coordinates = o.coordinates.map(clip);
      return coordinates[0].length && (o = Object.create(o), o.coordinates = coordinates, o);
    },

    MultiPolygon: function(o) {
      var coordinates = o.coordinates.map(function(d) { return d.map(clip); }).filter(function(d) { return d[0].length; });
      return coordinates.length && (o = Object.create(o), o.coordinates = coordinates, o);
    },

    GeometryCollection: function(o) {
      var geometries = o.geometries.map(clipType).filter(d3_identity);
      return geometries.length && (o = Object.create(o), o.geometries = geometries, o);
    }

  });

  function clip(coordinates) {
    var i = -1,
        n = coordinates.length,
        clipped = [],
        p0,
        p1,
        p2,
        d0,
        d1;

    while (++i < n) {
      d1 = arc.distance(p2 = coordinates[i]);
      if (d1 < radians) {
        if (p1) clipped.push(d3_geo_greatArcInterpolate(p1, p2)((d0 - radians) / (d0 - d1)));
        clipped.push(p2);
        p0 = p1 = null;
      } else {
        p1 = p2;
        if (!p0 && clipped.length) {
          clipped.push(d3_geo_greatArcInterpolate(clipped[clipped.length - 1], p1)((radians - d0) / (d1 - d0)));
          p0 = p1;
        }
      }
      d0 = d1;
    }

    // Close the clipped polygon if necessary.
    p0 = coordinates[0];
    p1 = clipped[0];
    if (p1 && p2[0] === p0[0] && p2[1] === p0[1] && !(p2[0] === p1[0] && p2[1] === p1[1])) {
      clipped.push(p1);
    }

    return resample(clipped);
  }

  // Resample coordinates, creating great arcs between each.
  function resample(coordinates) {
    var i = 0,
        n = coordinates.length,
        j,
        m,
        resampled = n ? [coordinates[0]] : coordinates,
        resamples,
        origin = arc.source();

    while (++i < n) {
      resamples = arc.source(coordinates[i - 1])(coordinates[i]).coordinates;
      for (j = 0, m = resamples.length; ++j < m;) resampled.push(resamples[j]);
    }

    arc.source(origin);
    return resampled;
  }

  circle.origin = function(x) {
    if (!arguments.length) return origin;
    origin = x;
    if (typeof origin !== "function") arc.source(origin);
    return circle;
  };

  circle.angle = function(x) {
    if (!arguments.length) return degrees;
    radians = (degrees = +x) * d3_geo_radians;
    return circle;
  };

  return d3.rebind(circle, arc, "precision");
}
d3.geo.greatArc = function() {
  var source = d3_geo_greatArcSource, p0,
      target = d3_geo_greatArcTarget, p1,
      precision = 6 * d3_geo_radians,
      interpolate = d3_geo_greatArcInterpolator();

  function greatArc() {
    var d = greatArc.distance.apply(this, arguments), // initializes the interpolator, too
        t = 0,
        dt = precision / d,
        coordinates = [p0];
    while ((t += dt) < 1) coordinates.push(interpolate(t));
    coordinates.push(p1);
    return {type: "LineString", coordinates: coordinates};
  }

  // Length returned in radians; multiply by radius for distance.
  greatArc.distance = function() {
    if (typeof source === "function") interpolate.source(p0 = source.apply(this, arguments));
    if (typeof target === "function") interpolate.target(p1 = target.apply(this, arguments));
    return interpolate.distance();
  };

  greatArc.source = function(_) {
    if (!arguments.length) return source;
    source = _;
    if (typeof source !== "function") interpolate.source(p0 = source);
    return greatArc;
  };

  greatArc.target = function(_) {
    if (!arguments.length) return target;
    target = _;
    if (typeof target !== "function") interpolate.target(p1 = target);
    return greatArc;
  };

  // Precision is specified in degrees.
  greatArc.precision = function(_) {
    if (!arguments.length) return precision / d3_geo_radians;
    precision = _ * d3_geo_radians;
    return greatArc;
  };

  return greatArc;
};

function d3_geo_greatArcSource(d) {
  return d.source;
}

function d3_geo_greatArcTarget(d) {
  return d.target;
}

function d3_geo_greatArcInterpolator() {
  var x0, y0, cy0, sy0, kx0, ky0,
      x1, y1, cy1, sy1, kx1, ky1,
      d,
      k;

  function interpolate(t) {
    var B = Math.sin(t *= d) * k,
        A = Math.sin(d - t) * k,
        x = A * kx0 + B * kx1,
        y = A * ky0 + B * ky1,
        z = A * sy0 + B * sy1;
    return [
      Math.atan2(y, x) / d3_geo_radians,
      Math.atan2(z, Math.sqrt(x * x + y * y)) / d3_geo_radians
    ];
  }

  interpolate.distance = function() {
    if (d == null) k = 1 / Math.sin(d = Math.acos(Math.max(-1, Math.min(1, sy0 * sy1 + cy0 * cy1 * Math.cos(x1 - x0)))));
    return d;
  };

  interpolate.source = function(_) {
    var cx0 = Math.cos(x0 = _[0] * d3_geo_radians),
        sx0 = Math.sin(x0);
    cy0 = Math.cos(y0 = _[1] * d3_geo_radians);
    sy0 = Math.sin(y0);
    kx0 = cy0 * cx0;
    ky0 = cy0 * sx0;
    d = null;
    return interpolate;
  };

  interpolate.target = function(_) {
    var cx1 = Math.cos(x1 = _[0] * d3_geo_radians),
        sx1 = Math.sin(x1);
    cy1 = Math.cos(y1 = _[1] * d3_geo_radians);
    sy1 = Math.sin(y1);
    kx1 = cy1 * cx1;
    ky1 = cy1 * sx1;
    d = null;
    return interpolate;
  };

  return interpolate;
}

function d3_geo_greatArcInterpolate(a, b) {
  var i = d3_geo_greatArcInterpolator().source(a).target(b);
  i.distance();
  return i;
}
d3.geo.greatCircle = d3.geo.circle;
d3.geom = {};
/**
 * Computes a contour for a given input grid function using the <a
 * href="http://en.wikipedia.org/wiki/Marching_squares">marching
 * squares</a> algorithm. Returns the contour polygon as an array of points.
 *
 * @param grid a two-input function(x, y) that returns true for values
 * inside the contour and false for values outside the contour.
 * @param start an optional starting point [x, y] on the grid.
 * @returns polygon [[x1, y1], [x2, y2], …]
 */
d3.geom.contour = function(grid, start) {
  var s = start || d3_geom_contourStart(grid), // starting point
      c = [],    // contour polygon
      x = s[0],  // current x position
      y = s[1],  // current y position
      dx = 0,    // next x direction
      dy = 0,    // next y direction
      pdx = NaN, // previous x direction
      pdy = NaN, // previous y direction
      i = 0;

  do {
    // determine marching squares index
    i = 0;
    if (grid(x-1, y-1)) i += 1;
    if (grid(x,   y-1)) i += 2;
    if (grid(x-1, y  )) i += 4;
    if (grid(x,   y  )) i += 8;

    // determine next direction
    if (i === 6) {
      dx = pdy === -1 ? -1 : 1;
      dy = 0;
    } else if (i === 9) {
      dx = 0;
      dy = pdx === 1 ? -1 : 1;
    } else {
      dx = d3_geom_contourDx[i];
      dy = d3_geom_contourDy[i];
    }

    // update contour polygon
    if (dx != pdx && dy != pdy) {
      c.push([x, y]);
      pdx = dx;
      pdy = dy;
    }

    x += dx;
    y += dy;
  } while (s[0] != x || s[1] != y);

  return c;
};

// lookup tables for marching directions
var d3_geom_contourDx = [1, 0, 1, 1,-1, 0,-1, 1,0, 0,0,0,-1, 0,-1,NaN],
    d3_geom_contourDy = [0,-1, 0, 0, 0,-1, 0, 0,1,-1,1,1, 0,-1, 0,NaN];

function d3_geom_contourStart(grid) {
  var x = 0,
      y = 0;

  // search for a starting point; begin at origin
  // and proceed along outward-expanding diagonals
  while (true) {
    if (grid(x,y)) {
      return [x,y];
    }
    if (x === 0) {
      x = y + 1;
      y = 0;
    } else {
      x = x - 1;
      y = y + 1;
    }
  }
}
/**
 * Computes the 2D convex hull of a set of points using Graham's scanning
 * algorithm. The algorithm has been implemented as described in Cormen,
 * Leiserson, and Rivest's Introduction to Algorithms. The running time of
 * this algorithm is O(n log n), where n is the number of input points.
 *
 * @param vertices [[x1, y1], [x2, y2], …]
 * @returns polygon [[x1, y1], [x2, y2], …]
 */
d3.geom.hull = function(vertices) {
  if (vertices.length < 3) return [];

  var len = vertices.length,
      plen = len - 1,
      points = [],
      stack = [],
      i, j, h = 0, x1, y1, x2, y2, u, v, a, sp;

  // find the starting ref point: leftmost point with the minimum y coord
  for (i=1; i<len; ++i) {
    if (vertices[i][1] < vertices[h][1]) {
      h = i;
    } else if (vertices[i][1] == vertices[h][1]) {
      h = (vertices[i][0] < vertices[h][0] ? i : h);
    }
  }

  // calculate polar angles from ref point and sort
  for (i=0; i<len; ++i) {
    if (i === h) continue;
    y1 = vertices[i][1] - vertices[h][1];
    x1 = vertices[i][0] - vertices[h][0];
    points.push({angle: Math.atan2(y1, x1), index: i});
  }
  points.sort(function(a, b) { return a.angle - b.angle; });

  // toss out duplicate angles
  a = points[0].angle;
  v = points[0].index;
  u = 0;
  for (i=1; i<plen; ++i) {
    j = points[i].index;
    if (a == points[i].angle) {
      // keep angle for point most distant from the reference
      x1 = vertices[v][0] - vertices[h][0];
      y1 = vertices[v][1] - vertices[h][1];
      x2 = vertices[j][0] - vertices[h][0];
      y2 = vertices[j][1] - vertices[h][1];
      if ((x1*x1 + y1*y1) >= (x2*x2 + y2*y2)) {
        points[i].index = -1;
      } else {
        points[u].index = -1;
        a = points[i].angle;
        u = i;
        v = j;
      }
    } else {
      a = points[i].angle;
      u = i;
      v = j;
    }
  }

  // initialize the stack
  stack.push(h);
  for (i=0, j=0; i<2; ++j) {
    if (points[j].index !== -1) {
      stack.push(points[j].index);
      i++;
    }
  }
  sp = stack.length;

  // do graham's scan
  for (; j<plen; ++j) {
    if (points[j].index === -1) continue; // skip tossed out points
    while (!d3_geom_hullCCW(stack[sp-2], stack[sp-1], points[j].index, vertices)) {
      --sp;
    }
    stack[sp++] = points[j].index;
  }

  // construct the hull
  var poly = [];
  for (i=0; i<sp; ++i) {
    poly.push(vertices[stack[i]]);
  }
  return poly;
}

// are three points in counter-clockwise order?
function d3_geom_hullCCW(i1, i2, i3, v) {
  var t, a, b, c, d, e, f;
  t = v[i1]; a = t[0]; b = t[1];
  t = v[i2]; c = t[0]; d = t[1];
  t = v[i3]; e = t[0]; f = t[1];
  return ((f-b)*(c-a) - (d-b)*(e-a)) > 0;
}
// Note: requires coordinates to be counterclockwise and convex!
d3.geom.polygon = function(coordinates) {

  coordinates.area = function() {
    var i = 0,
        n = coordinates.length,
        a = coordinates[n - 1][0] * coordinates[0][1],
        b = coordinates[n - 1][1] * coordinates[0][0];
    while (++i < n) {
      a += coordinates[i - 1][0] * coordinates[i][1];
      b += coordinates[i - 1][1] * coordinates[i][0];
    }
    return (b - a) * .5;
  };

  coordinates.centroid = function(k) {
    var i = -1,
        n = coordinates.length,
        x = 0,
        y = 0,
        a,
        b = coordinates[n - 1],
        c;
    if (!arguments.length) k = -1 / (6 * coordinates.area());
    while (++i < n) {
      a = b;
      b = coordinates[i];
      c = a[0] * b[1] - b[0] * a[1];
      x += (a[0] + b[0]) * c;
      y += (a[1] + b[1]) * c;
    }
    return [x * k, y * k];
  };

  // The Sutherland-Hodgman clipping algorithm.
  coordinates.clip = function(subject) {
    var input,
        i = -1,
        n = coordinates.length,
        j,
        m,
        a = coordinates[n - 1],
        b,
        c,
        d;
    while (++i < n) {
      input = subject.slice();
      subject.length = 0;
      b = coordinates[i];
      c = input[(m = input.length) - 1];
      j = -1;
      while (++j < m) {
        d = input[j];
        if (d3_geom_polygonInside(d, a, b)) {
          if (!d3_geom_polygonInside(c, a, b)) {
            subject.push(d3_geom_polygonIntersect(c, d, a, b));
          }
          subject.push(d);
        } else if (d3_geom_polygonInside(c, a, b)) {
          subject.push(d3_geom_polygonIntersect(c, d, a, b));
        }
        c = d;
      }
      a = b;
    }
    return subject;
  };

  return coordinates;
};

function d3_geom_polygonInside(p, a, b) {
  return (b[0] - a[0]) * (p[1] - a[1]) < (b[1] - a[1]) * (p[0] - a[0]);
}

// Intersect two infinite lines cd and ab.
function d3_geom_polygonIntersect(c, d, a, b) {
  var x1 = c[0], x2 = d[0], x3 = a[0], x4 = b[0],
      y1 = c[1], y2 = d[1], y3 = a[1], y4 = b[1],
      x13 = x1 - x3,
      x21 = x2 - x1,
      x43 = x4 - x3,
      y13 = y1 - y3,
      y21 = y2 - y1,
      y43 = y4 - y3,
      ua = (x43 * y13 - y43 * x13) / (y43 * x21 - x43 * y21);
  return [x1 + ua * x21, y1 + ua * y21];
}
// Adapted from Nicolas Garcia Belmonte's JIT implementation:
// http://blog.thejit.org/2010/02/12/voronoi-tessellation/
// http://blog.thejit.org/assets/voronoijs/voronoi.js
// See lib/jit/LICENSE for details.

// Notes:
//
// This implementation does not clip the returned polygons, so if you want to
// clip them to a particular shape you will need to do that either in SVG or by
// post-processing with d3.geom.polygon's clip method.
//
// If any vertices are coincident or have NaN positions, the behavior of this
// method is undefined. Most likely invalid polygons will be returned. You
// should filter invalid points, and consolidate coincident points, before
// computing the tessellation.

/**
 * @param vertices [[x1, y1], [x2, y2], …]
 * @returns polygons [[[x1, y1], [x2, y2], …], …]
 */
d3.geom.voronoi = function(vertices) {
  var polygons = vertices.map(function() { return []; });

  d3_voronoi_tessellate(vertices, function(e) {
    var s1,
        s2,
        x1,
        x2,
        y1,
        y2;
    if (e.a === 1 && e.b >= 0) {
      s1 = e.ep.r;
      s2 = e.ep.l;
    } else {
      s1 = e.ep.l;
      s2 = e.ep.r;
    }
    if (e.a === 1) {
      y1 = s1 ? s1.y : -1e6;
      x1 = e.c - e.b * y1;
      y2 = s2 ? s2.y : 1e6;
      x2 = e.c - e.b * y2;
    } else {
      x1 = s1 ? s1.x : -1e6;
      y1 = e.c - e.a * x1;
      x2 = s2 ? s2.x : 1e6;
      y2 = e.c - e.a * x2;
    }
    var v1 = [x1, y1],
        v2 = [x2, y2];
    polygons[e.region.l.index].push(v1, v2);
    polygons[e.region.r.index].push(v1, v2);
  });

  // Reconnect the polygon segments into counterclockwise loops.
  return polygons.map(function(polygon, i) {
    var cx = vertices[i][0],
        cy = vertices[i][1];
    polygon.forEach(function(v) {
      v.angle = Math.atan2(v[0] - cx, v[1] - cy);
    });
    return polygon.sort(function(a, b) {
      return a.angle - b.angle;
    }).filter(function(d, i) {
      return !i || (d.angle - polygon[i - 1].angle > 1e-10);
    });
  });
};

var d3_voronoi_opposite = {"l": "r", "r": "l"};

function d3_voronoi_tessellate(vertices, callback) {

  var Sites = {
    list: vertices
      .map(function(v, i) {
        return {
          index: i,
          x: v[0],
          y: v[1]
        };
      })
      .sort(function(a, b) {
        return a.y < b.y ? -1
          : a.y > b.y ? 1
          : a.x < b.x ? -1
          : a.x > b.x ? 1
          : 0;
      }),
    bottomSite: null
  };

  var EdgeList = {
    list: [],
    leftEnd: null,
    rightEnd: null,

    init: function() {
      EdgeList.leftEnd = EdgeList.createHalfEdge(null, "l");
      EdgeList.rightEnd = EdgeList.createHalfEdge(null, "l");
      EdgeList.leftEnd.r = EdgeList.rightEnd;
      EdgeList.rightEnd.l = EdgeList.leftEnd;
      EdgeList.list.unshift(EdgeList.leftEnd, EdgeList.rightEnd);
    },

    createHalfEdge: function(edge, side) {
      return {
        edge: edge,
        side: side,
        vertex: null,
        "l": null,
        "r": null
      };
    },

    insert: function(lb, he) {
      he.l = lb;
      he.r = lb.r;
      lb.r.l = he;
      lb.r = he;
    },

    leftBound: function(p) {
      var he = EdgeList.leftEnd;
      do {
        he = he.r;
      } while (he != EdgeList.rightEnd && Geom.rightOf(he, p));
      he = he.l;
      return he;
    },

    del: function(he) {
      he.l.r = he.r;
      he.r.l = he.l;
      he.edge = null;
    },

    right: function(he) {
      return he.r;
    },

    left: function(he) {
      return he.l;
    },

    leftRegion: function(he) {
      return he.edge == null
          ? Sites.bottomSite
          : he.edge.region[he.side];
    },

    rightRegion: function(he) {
      return he.edge == null
          ? Sites.bottomSite
          : he.edge.region[d3_voronoi_opposite[he.side]];
    }
  };

  var Geom = {

    bisect: function(s1, s2) {
      var newEdge = {
        region: {"l": s1, "r": s2},
        ep: {"l": null, "r": null}
      };

      var dx = s2.x - s1.x,
          dy = s2.y - s1.y,
          adx = dx > 0 ? dx : -dx,
          ady = dy > 0 ? dy : -dy;

      newEdge.c = s1.x * dx + s1.y * dy
          + (dx * dx + dy * dy) * .5;

      if (adx > ady) {
        newEdge.a = 1;
        newEdge.b = dy / dx;
        newEdge.c /= dx;
      } else {
        newEdge.b = 1;
        newEdge.a = dx / dy;
        newEdge.c /= dy;
      }

      return newEdge;
    },

    intersect: function(el1, el2) {
      var e1 = el1.edge,
          e2 = el2.edge;
      if (!e1 || !e2 || (e1.region.r == e2.region.r)) {
        return null;
      }
      var d = (e1.a * e2.b) - (e1.b * e2.a);
      if (Math.abs(d) < 1e-10) {
        return null;
      }
      var xint = (e1.c * e2.b - e2.c * e1.b) / d,
          yint = (e2.c * e1.a - e1.c * e2.a) / d,
          e1r = e1.region.r,
          e2r = e2.region.r,
          el,
          e;
      if ((e1r.y < e2r.y) ||
         (e1r.y == e2r.y && e1r.x < e2r.x)) {
        el = el1;
        e = e1;
      } else {
        el = el2;
        e = e2;
      }
      var rightOfSite = (xint >= e.region.r.x);
      if ((rightOfSite && (el.side === "l")) ||
        (!rightOfSite && (el.side === "r"))) {
        return null;
      }
      return {
        x: xint,
        y: yint
      };
    },

    rightOf: function(he, p) {
      var e = he.edge,
          topsite = e.region.r,
          rightOfSite = (p.x > topsite.x);

      if (rightOfSite && (he.side === "l")) {
        return 1;
      }
      if (!rightOfSite && (he.side === "r")) {
        return 0;
      }
      if (e.a === 1) {
        var dyp = p.y - topsite.y,
            dxp = p.x - topsite.x,
            fast = 0,
            above = 0;

        if ((!rightOfSite && (e.b < 0)) ||
          (rightOfSite && (e.b >= 0))) {
          above = fast = (dyp >= e.b * dxp);
        } else {
          above = ((p.x + p.y * e.b) > e.c);
          if (e.b < 0) {
            above = !above;
          }
          if (!above) {
            fast = 1;
          }
        }
        if (!fast) {
          var dxs = topsite.x - e.region.l.x;
          above = (e.b * (dxp * dxp - dyp * dyp)) <
            (dxs * dyp * (1 + 2 * dxp / dxs + e.b * e.b));

          if (e.b < 0) {
            above = !above;
          }
        }
      } else /* e.b == 1 */ {
        var yl = e.c - e.a * p.x,
            t1 = p.y - yl,
            t2 = p.x - topsite.x,
            t3 = yl - topsite.y;

        above = (t1 * t1) > (t2 * t2 + t3 * t3);
      }
      return he.side === "l" ? above : !above;
    },

    endPoint: function(edge, side, site) {
      edge.ep[side] = site;
      if (!edge.ep[d3_voronoi_opposite[side]]) return;
      callback(edge);
    },

    distance: function(s, t) {
      var dx = s.x - t.x,
          dy = s.y - t.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
  };

  var EventQueue = {
    list: [],

    insert: function(he, site, offset) {
      he.vertex = site;
      he.ystar = site.y + offset;
      for (var i=0, list=EventQueue.list, l=list.length; i<l; i++) {
        var next = list[i];
        if (he.ystar > next.ystar ||
          (he.ystar == next.ystar &&
          site.x > next.vertex.x)) {
          continue;
        } else {
          break;
        }
      }
      list.splice(i, 0, he);
    },

    del: function(he) {
      for (var i=0, ls=EventQueue.list, l=ls.length; i<l && (ls[i] != he); ++i) {}
      ls.splice(i, 1);
    },

    empty: function() { return EventQueue.list.length === 0; },

    nextEvent: function(he) {
      for (var i=0, ls=EventQueue.list, l=ls.length; i<l; ++i) {
        if (ls[i] == he) return ls[i+1];
      }
      return null;
    },

    min: function() {
      var elem = EventQueue.list[0];
      return {
        x: elem.vertex.x,
        y: elem.ystar
      };
    },

    extractMin: function() {
      return EventQueue.list.shift();
    }
  };

  EdgeList.init();
  Sites.bottomSite = Sites.list.shift();

  var newSite = Sites.list.shift(), newIntStar;
  var lbnd, rbnd, llbnd, rrbnd, bisector;
  var bot, top, temp, p, v;
  var e, pm;

  while (true) {
    if (!EventQueue.empty()) {
      newIntStar = EventQueue.min();
    }
    if (newSite && (EventQueue.empty()
      || newSite.y < newIntStar.y
      || (newSite.y == newIntStar.y
      && newSite.x < newIntStar.x))) { //new site is smallest
      lbnd = EdgeList.leftBound(newSite);
      rbnd = EdgeList.right(lbnd);
      bot = EdgeList.rightRegion(lbnd);
      e = Geom.bisect(bot, newSite);
      bisector = EdgeList.createHalfEdge(e, "l");
      EdgeList.insert(lbnd, bisector);
      p = Geom.intersect(lbnd, bisector);
      if (p) {
        EventQueue.del(lbnd);
        EventQueue.insert(lbnd, p, Geom.distance(p, newSite));
      }
      lbnd = bisector;
      bisector = EdgeList.createHalfEdge(e, "r");
      EdgeList.insert(lbnd, bisector);
      p = Geom.intersect(bisector, rbnd);
      if (p) {
        EventQueue.insert(bisector, p, Geom.distance(p, newSite));
      }
      newSite = Sites.list.shift();
    } else if (!EventQueue.empty()) { //intersection is smallest
      lbnd = EventQueue.extractMin();
      llbnd = EdgeList.left(lbnd);
      rbnd = EdgeList.right(lbnd);
      rrbnd = EdgeList.right(rbnd);
      bot = EdgeList.leftRegion(lbnd);
      top = EdgeList.rightRegion(rbnd);
      v = lbnd.vertex;
      Geom.endPoint(lbnd.edge, lbnd.side, v);
      Geom.endPoint(rbnd.edge, rbnd.side, v);
      EdgeList.del(lbnd);
      EventQueue.del(rbnd);
      EdgeList.del(rbnd);
      pm = "l";
      if (bot.y > top.y) {
        temp = bot;
        bot = top;
        top = temp;
        pm = "r";
      }
      e = Geom.bisect(bot, top);
      bisector = EdgeList.createHalfEdge(e, pm);
      EdgeList.insert(llbnd, bisector);
      Geom.endPoint(e, d3_voronoi_opposite[pm], v);
      p = Geom.intersect(llbnd, bisector);
      if (p) {
        EventQueue.del(llbnd);
        EventQueue.insert(llbnd, p, Geom.distance(p, bot));
      }
      p = Geom.intersect(bisector, rrbnd);
      if (p) {
        EventQueue.insert(bisector, p, Geom.distance(p, bot));
      }
    } else {
      break;
    }
  }//end while

  for (lbnd = EdgeList.right(EdgeList.leftEnd);
      lbnd != EdgeList.rightEnd;
      lbnd = EdgeList.right(lbnd)) {
    callback(lbnd.edge);
  }
}
/**
* @param vertices [[x1, y1], [x2, y2], …]
* @returns triangles [[[x1, y1], [x2, y2], [x3, y3]], …]
 */
d3.geom.delaunay = function(vertices) {
  var edges = vertices.map(function() { return []; }),
      triangles = [];

  // Use the Voronoi tessellation to determine Delaunay edges.
  d3_voronoi_tessellate(vertices, function(e) {
    edges[e.region.l.index].push(vertices[e.region.r.index]);
  });

  // Reconnect the edges into counterclockwise triangles.
  edges.forEach(function(edge, i) {
    var v = vertices[i],
        cx = v[0],
        cy = v[1];
    edge.forEach(function(v) {
      v.angle = Math.atan2(v[0] - cx, v[1] - cy);
    });
    edge.sort(function(a, b) {
      return a.angle - b.angle;
    });
    for (var j = 0, m = edge.length - 1; j < m; j++) {
      triangles.push([v, edge[j], edge[j + 1]]);
    }
  });

  return triangles;
};
// Constructs a new quadtree for the specified array of points. A quadtree is a
// two-dimensional recursive spatial subdivision. This implementation uses
// square partitions, dividing each square into four equally-sized squares. Each
// point exists in a unique node; if multiple points are in the same position,
// some points may be stored on internal nodes rather than leaf nodes. Quadtrees
// can be used to accelerate various spatial operations, such as the Barnes-Hut
// approximation for computing n-body forces, or collision detection.
d3.geom.quadtree = function(points, x1, y1, x2, y2) {
  var p,
      i = -1,
      n = points.length;

  // Type conversion for deprecated API.
  if (n && isNaN(points[0].x)) points = points.map(d3_geom_quadtreePoint);

  // Allow bounds to be specified explicitly.
  if (arguments.length < 5) {
    if (arguments.length === 3) {
      y2 = x2 = y1;
      y1 = x1;
    } else {
      x1 = y1 = Infinity;
      x2 = y2 = -Infinity;

      // Compute bounds.
      while (++i < n) {
        p = points[i];
        if (p.x < x1) x1 = p.x;
        if (p.y < y1) y1 = p.y;
        if (p.x > x2) x2 = p.x;
        if (p.y > y2) y2 = p.y;
      }

      // Squarify the bounds.
      var dx = x2 - x1,
          dy = y2 - y1;
      if (dx > dy) y2 = y1 + dx;
      else x2 = x1 + dy;
    }
  }

  // Recursively inserts the specified point p at the node n or one of its
  // descendants. The bounds are defined by [x1, x2] and [y1, y2].
  function insert(n, p, x1, y1, x2, y2) {
    if (isNaN(p.x) || isNaN(p.y)) return; // ignore invalid points
    if (n.leaf) {
      var v = n.point;
      if (v) {
        // If the point at this leaf node is at the same position as the new
        // point we are adding, we leave the point associated with the
        // internal node while adding the new point to a child node. This
        // avoids infinite recursion.
        if ((Math.abs(v.x - p.x) + Math.abs(v.y - p.y)) < .01) {
          insertChild(n, p, x1, y1, x2, y2);
        } else {
          n.point = null;
          insertChild(n, v, x1, y1, x2, y2);
          insertChild(n, p, x1, y1, x2, y2);
        }
      } else {
        n.point = p;
      }
    } else {
      insertChild(n, p, x1, y1, x2, y2);
    }
  }

  // Recursively inserts the specified point p into a descendant of node n. The
  // bounds are defined by [x1, x2] and [y1, y2].
  function insertChild(n, p, x1, y1, x2, y2) {
    // Compute the split point, and the quadrant in which to insert p.
    var sx = (x1 + x2) * .5,
        sy = (y1 + y2) * .5,
        right = p.x >= sx,
        bottom = p.y >= sy,
        i = (bottom << 1) + right;

    // Recursively insert into the child node.
    n.leaf = false;
    n = n.nodes[i] || (n.nodes[i] = d3_geom_quadtreeNode());

    // Update the bounds as we recurse.
    if (right) x1 = sx; else x2 = sx;
    if (bottom) y1 = sy; else y2 = sy;
    insert(n, p, x1, y1, x2, y2);
  }

  // Create the root node.
  var root = d3_geom_quadtreeNode();

  root.add = function(p) {
    insert(root, p, x1, y1, x2, y2);
  };

  root.visit = function(f) {
    d3_geom_quadtreeVisit(f, root, x1, y1, x2, y2);
  };

  // Insert all points.
  points.forEach(root.add);
  return root;
};

function d3_geom_quadtreeNode() {
  return {
    leaf: true,
    nodes: [],
    point: null
  };
}

function d3_geom_quadtreeVisit(f, node, x1, y1, x2, y2) {
  if (!f(node, x1, y1, x2, y2)) {
    var sx = (x1 + x2) * .5,
        sy = (y1 + y2) * .5,
        children = node.nodes;
    if (children[0]) d3_geom_quadtreeVisit(f, children[0], x1, y1, sx, sy);
    if (children[1]) d3_geom_quadtreeVisit(f, children[1], sx, y1, x2, sy);
    if (children[2]) d3_geom_quadtreeVisit(f, children[2], x1, sy, sx, y2);
    if (children[3]) d3_geom_quadtreeVisit(f, children[3], sx, sy, x2, y2);
  }
}

function d3_geom_quadtreePoint(p) {
  return {
    x: p[0],
    y: p[1]
  };
}
d3.time = {};

var d3_time = Date;

function d3_time_utc() {
  this._ = new Date(arguments.length > 1
      ? Date.UTC.apply(this, arguments)
      : arguments[0]);
}

d3_time_utc.prototype = {
  getDate: function() { return this._.getUTCDate(); },
  getDay: function() { return this._.getUTCDay(); },
  getFullYear: function() { return this._.getUTCFullYear(); },
  getHours: function() { return this._.getUTCHours(); },
  getMilliseconds: function() { return this._.getUTCMilliseconds(); },
  getMinutes: function() { return this._.getUTCMinutes(); },
  getMonth: function() { return this._.getUTCMonth(); },
  getSeconds: function() { return this._.getUTCSeconds(); },
  getTime: function() { return this._.getTime(); },
  getTimezoneOffset: function() { return 0; },
  valueOf: function() { return this._.valueOf(); },
  setDate: function() { d3_time_prototype.setUTCDate.apply(this._, arguments); },
  setDay: function() { d3_time_prototype.setUTCDay.apply(this._, arguments); },
  setFullYear: function() { d3_time_prototype.setUTCFullYear.apply(this._, arguments); },
  setHours: function() { d3_time_prototype.setUTCHours.apply(this._, arguments); },
  setMilliseconds: function() { d3_time_prototype.setUTCMilliseconds.apply(this._, arguments); },
  setMinutes: function() { d3_time_prototype.setUTCMinutes.apply(this._, arguments); },
  setMonth: function() { d3_time_prototype.setUTCMonth.apply(this._, arguments); },
  setSeconds: function() { d3_time_prototype.setUTCSeconds.apply(this._, arguments); },
  setTime: function() { d3_time_prototype.setTime.apply(this._, arguments); }
};

var d3_time_prototype = Date.prototype;
d3.time.format = function(template) {
  var n = template.length;

  function format(date) {
    var string = [],
        i = -1,
        j = 0,
        c,
        f;
    while (++i < n) {
      if (template.charCodeAt(i) == 37) {
        string.push(
            template.substring(j, i),
            (f = d3_time_formats[c = template.charAt(++i)])
            ? f(date) : c);
        j = i + 1;
      }
    }
    string.push(template.substring(j, i));
    return string.join("");
  }

  format.parse = function(string) {
    var d = {y: 1900, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0},
        i = d3_time_parse(d, template, string, 0);
    if (i != string.length) return null;

    // The am-pm flag is 0 for AM, and 1 for PM.
    if ("p" in d) d.H = d.H % 12 + d.p * 12;

    var date = new d3_time();
    date.setFullYear(d.y, d.m, d.d);
    date.setHours(d.H, d.M, d.S, d.L);
    return date;
  };

  format.toString = function() {
    return template;
  };

  return format;
};

function d3_time_parse(date, template, string, j) {
  var c,
      p,
      i = 0,
      n = template.length,
      m = string.length;
  while (i < n) {
    if (j >= m) return -1;
    c = template.charCodeAt(i++);
    if (c == 37) {
      p = d3_time_parsers[template.charAt(i++)];
      if (!p || ((j = p(date, string, j)) < 0)) return -1;
    } else if (c != string.charCodeAt(j++)) {
      return -1;
    }
  }
  return j;
}

var d3_time_zfill2 = d3.format("02d"),
    d3_time_zfill3 = d3.format("03d"),
    d3_time_zfill4 = d3.format("04d"),
    d3_time_sfill2 = d3.format("2d");

var d3_time_formats = {
  a: function(d) { return d3_time_weekdays[d.getDay()].substring(0, 3); },
  A: function(d) { return d3_time_weekdays[d.getDay()]; },
  b: function(d) { return d3_time_months[d.getMonth()].substring(0, 3); },
  B: function(d) { return d3_time_months[d.getMonth()]; },
  c: d3.time.format("%a %b %e %H:%M:%S %Y"),
  d: function(d) { return d3_time_zfill2(d.getDate()); },
  e: function(d) { return d3_time_sfill2(d.getDate()); },
  H: function(d) { return d3_time_zfill2(d.getHours()); },
  I: function(d) { return d3_time_zfill2(d.getHours() % 12 || 12); },
  j: function(d) { return d3_time_zfill3(1 + d3.time.dayOfYear(d)); },
  L: function(d) { return d3_time_zfill3(d.getMilliseconds()); },
  m: function(d) { return d3_time_zfill2(d.getMonth() + 1); },
  M: function(d) { return d3_time_zfill2(d.getMinutes()); },
  p: function(d) { return d.getHours() >= 12 ? "PM" : "AM"; },
  S: function(d) { return d3_time_zfill2(d.getSeconds()); },
  U: function(d) { return d3_time_zfill2(d3.time.sundayOfYear(d)); },
  w: function(d) { return d.getDay(); },
  W: function(d) { return d3_time_zfill2(d3.time.mondayOfYear(d)); },
  x: d3.time.format("%m/%d/%y"),
  X: d3.time.format("%H:%M:%S"),
  y: function(d) { return d3_time_zfill2(d.getFullYear() % 100); },
  Y: function(d) { return d3_time_zfill4(d.getFullYear() % 10000); },
  Z: d3_time_zone,
  "%": function(d) { return "%"; }
};

var d3_time_parsers = {
  a: d3_time_parseWeekdayAbbrev,
  A: d3_time_parseWeekday,
  b: d3_time_parseMonthAbbrev,
  B: d3_time_parseMonth,
  c: d3_time_parseLocaleFull,
  d: d3_time_parseDay,
  e: d3_time_parseDay,
  H: d3_time_parseHour24,
  I: d3_time_parseHour24,
  // j: function(d, s, i) { /*TODO day of year [001,366] */ return i; },
  L: d3_time_parseMilliseconds,
  m: d3_time_parseMonthNumber,
  M: d3_time_parseMinutes,
  p: d3_time_parseAmPm,
  S: d3_time_parseSeconds,
  // U: function(d, s, i) { /*TODO week number (sunday) [00,53] */ return i; },
  // w: function(d, s, i) { /*TODO weekday [0,6] */ return i; },
  // W: function(d, s, i) { /*TODO week number (monday) [00,53] */ return i; },
  x: d3_time_parseLocaleDate,
  X: d3_time_parseLocaleTime,
  y: d3_time_parseYear,
  Y: d3_time_parseFullYear
  // ,
  // Z: function(d, s, i) { /*TODO time zone */ return i; },
  // "%": function(d, s, i) { /*TODO literal % */ return i; }
};

// Note: weekday is validated, but does not set the date.
function d3_time_parseWeekdayAbbrev(date, string, i) {
  return d3_time_weekdayAbbrevRe.test(string.substring(i, i += 3)) ? i : -1;
}

// Note: weekday is validated, but does not set the date.
function d3_time_parseWeekday(date, string, i) {
  d3_time_weekdayRe.lastIndex = 0;
  var n = d3_time_weekdayRe.exec(string.substring(i, i + 10));
  return n ? i += n[0].length : -1;
}

var d3_time_weekdayAbbrevRe = /^(?:sun|mon|tue|wed|thu|fri|sat)/i,
    d3_time_weekdayRe = /^(?:Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)/i,
    d3_time_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function d3_time_parseMonthAbbrev(date, string, i) {
  var n = d3_time_monthAbbrevLookup.get(string.substring(i, i += 3).toLowerCase());
  return n == null ? -1 : (date.m = n, i);
}

var d3_time_monthAbbrevLookup = d3.map({
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11
});

function d3_time_parseMonth(date, string, i) {
  d3_time_monthRe.lastIndex = 0;
  var n = d3_time_monthRe.exec(string.substring(i, i + 12));
  return n ? (date.m = d3_time_monthLookup.get(n[0].toLowerCase()), i += n[0].length) : -1;
}

var d3_time_monthRe = /^(?:January|February|March|April|May|June|July|August|September|October|November|December)/ig;

var d3_time_monthLookup = d3.map({
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11
});

var d3_time_months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function d3_time_parseLocaleFull(date, string, i) {
  return d3_time_parse(date, d3_time_formats.c.toString(), string, i);
}

function d3_time_parseLocaleDate(date, string, i) {
  return d3_time_parse(date, d3_time_formats.x.toString(), string, i);
}

function d3_time_parseLocaleTime(date, string, i) {
  return d3_time_parse(date, d3_time_formats.X.toString(), string, i);
}

function d3_time_parseFullYear(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 4));
  return n ? (date.y = +n[0], i += n[0].length) : -1;
}

function d3_time_parseYear(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.y = d3_time_century() + +n[0], i += n[0].length) : -1;
}

function d3_time_century() {
  return ~~(new Date().getFullYear() / 1000) * 1000;
}

function d3_time_parseMonthNumber(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.m = n[0] - 1, i += n[0].length) : -1;
}

function d3_time_parseDay(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.d = +n[0], i += n[0].length) : -1;
}

// Note: we don't validate that the hour is in the range [0,23] or [1,12].
function d3_time_parseHour24(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.H = +n[0], i += n[0].length) : -1;
}

function d3_time_parseMinutes(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.M = +n[0], i += n[0].length) : -1;
}

function d3_time_parseSeconds(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.S = +n[0], i += n[0].length) : -1;
}

function d3_time_parseMilliseconds(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 3));
  return n ? (date.L = +n[0], i += n[0].length) : -1;
}

// Note: we don't look at the next directive.
var d3_time_numberRe = /\s*\d+/;

function d3_time_parseAmPm(date, string, i) {
  var n = d3_time_amPmLookup.get(string.substring(i, i += 2).toLowerCase());
  return n == null ? -1 : (date.p = n, i);
}

var d3_time_amPmLookup = d3.map({
  am: 0,
  pm: 1
});

// TODO table of time zone offset names?
function d3_time_zone(d) {
  var z = d.getTimezoneOffset(),
      zs = z > 0 ? "-" : "+",
      zh = ~~(Math.abs(z) / 60),
      zm = Math.abs(z) % 60;
  return zs + d3_time_zfill2(zh) + d3_time_zfill2(zm);
}
d3.time.format.utc = function(template) {
  var local = d3.time.format(template);

  function format(date) {
    try {
      d3_time = d3_time_utc;
      var utc = new d3_time();
      utc._ = date;
      return local(utc);
    } finally {
      d3_time = Date;
    }
  }

  format.parse = function(string) {
    try {
      d3_time = d3_time_utc;
      var date = local.parse(string);
      return date && date._;
    } finally {
      d3_time = Date;
    }
  };

  format.toString = local.toString;

  return format;
};
var d3_time_formatIso = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ");

d3.time.format.iso = Date.prototype.toISOString ? d3_time_formatIsoNative : d3_time_formatIso;

function d3_time_formatIsoNative(date) {
  return date.toISOString();
}

d3_time_formatIsoNative.parse = function(string) {
  var date = new Date(string);
  return isNaN(date) ? null : date;
};

d3_time_formatIsoNative.toString = d3_time_formatIso.toString;
function d3_time_interval(local, step, number) {

  function round(date) {
    var d0 = local(date), d1 = offset(d0, 1);
    return date - d0 < d1 - date ? d0 : d1;
  }

  function ceil(date) {
    step(date = local(new d3_time(date - 1)), 1);
    return date;
  }

  function offset(date, k) {
    step(date = new d3_time(+date), k);
    return date;
  }

  function range(t0, t1, dt) {
    var time = ceil(t0), times = [];
    if (dt > 1) {
      while (time < t1) {
        if (!(number(time) % dt)) times.push(new Date(+time));
        step(time, 1);
      }
    } else {
      while (time < t1) times.push(new Date(+time)), step(time, 1);
    }
    return times;
  }

  function range_utc(t0, t1, dt) {
    try {
      d3_time = d3_time_utc;
      var utc = new d3_time_utc();
      utc._ = t0;
      return range(utc, t1, dt);
    } finally {
      d3_time = Date;
    }
  }

  local.floor = local;
  local.round = round;
  local.ceil = ceil;
  local.offset = offset;
  local.range = range;

  var utc = local.utc = d3_time_interval_utc(local);
  utc.floor = utc;
  utc.round = d3_time_interval_utc(round);
  utc.ceil = d3_time_interval_utc(ceil);
  utc.offset = d3_time_interval_utc(offset);
  utc.range = range_utc;

  return local;
}

function d3_time_interval_utc(method) {
  return function(date, k) {
    try {
      d3_time = d3_time_utc;
      var utc = new d3_time_utc();
      utc._ = date;
      return method(utc, k)._;
    } finally {
      d3_time = Date;
    }
  };
}
d3.time.second = d3_time_interval(function(date) {
  return new d3_time(Math.floor(date / 1e3) * 1e3);
}, function(date, offset) {
  date.setTime(date.getTime() + Math.floor(offset) * 1e3); // DST breaks setSeconds
}, function(date) {
  return date.getSeconds();
});

d3.time.seconds = d3.time.second.range;
d3.time.seconds.utc = d3.time.second.utc.range;
d3.time.minute = d3_time_interval(function(date) {
  return new d3_time(Math.floor(date / 6e4) * 6e4);
}, function(date, offset) {
  date.setTime(date.getTime() + Math.floor(offset) * 6e4); // DST breaks setMinutes
}, function(date) {
  return date.getMinutes();
});

d3.time.minutes = d3.time.minute.range;
d3.time.minutes.utc = d3.time.minute.utc.range;
d3.time.hour = d3_time_interval(function(date) {
  var timezone = date.getTimezoneOffset() / 60;
  return new d3_time((Math.floor(date / 36e5 - timezone) + timezone) * 36e5);
}, function(date, offset) {
  date.setTime(date.getTime() + Math.floor(offset) * 36e5); // DST breaks setHours
}, function(date) {
  return date.getHours();
});

d3.time.hours = d3.time.hour.range;
d3.time.hours.utc = d3.time.hour.utc.range;
d3.time.day = d3_time_interval(function(date) {
  return new d3_time(date.getFullYear(), date.getMonth(), date.getDate());
}, function(date, offset) {
  date.setDate(date.getDate() + offset);
}, function(date) {
  return date.getDate() - 1;
});

d3.time.days = d3.time.day.range;
d3.time.days.utc = d3.time.day.utc.range;

d3.time.dayOfYear = function(date) {
  var year = d3.time.year(date);
  return Math.floor((date - year) / 864e5 - (date.getTimezoneOffset() - year.getTimezoneOffset()) / 1440);
};
d3_time_weekdays.forEach(function(day, i) {
  day = day.toLowerCase();
  i = 7 - i;

  var interval = d3.time[day] = d3_time_interval(function(date) {
    (date = d3.time.day(date)).setDate(date.getDate() - (date.getDay() + i) % 7);
    return date;
  }, function(date, offset) {
    date.setDate(date.getDate() + Math.floor(offset) * 7);
  }, function(date) {
    var day = d3.time.year(date).getDay();
    return Math.floor((d3.time.dayOfYear(date) + (day + i) % 7) / 7) - (day !== i);
  });

  d3.time[day + "s"] = interval.range;
  d3.time[day + "s"].utc = interval.utc.range;

  d3.time[day + "OfYear"] = function(date) {
    var day = d3.time.year(date).getDay();
    return Math.floor((d3.time.dayOfYear(date) + (day + i) % 7) / 7);
  };
});

d3.time.week = d3.time.sunday;
d3.time.weeks = d3.time.sunday.range;
d3.time.weeks.utc = d3.time.sunday.utc.range;
d3.time.weekOfYear = d3.time.sundayOfYear;
d3.time.month = d3_time_interval(function(date) {
  return new d3_time(date.getFullYear(), date.getMonth(), 1);
}, function(date, offset) {
  date.setMonth(date.getMonth() + offset);
}, function(date) {
  return date.getMonth();
});

d3.time.months = d3.time.month.range;
d3.time.months.utc = d3.time.month.utc.range;
d3.time.year = d3_time_interval(function(date) {
  return new d3_time(date.getFullYear(), 0, 1);
}, function(date, offset) {
  date.setFullYear(date.getFullYear() + offset);
}, function(date) {
  return date.getFullYear();
});

d3.time.years = d3.time.year.range;
d3.time.years.utc = d3.time.year.utc.range;
function d3_time_scale(linear, methods, format) {

  function scale(x) {
    return linear(x);
  }

  scale.invert = function(x) {
    return d3_time_scaleDate(linear.invert(x));
  };

  scale.domain = function(x) {
    if (!arguments.length) return linear.domain().map(d3_time_scaleDate);
    linear.domain(x);
    return scale;
  };

  scale.nice = function(m) {
    var extent = d3_time_scaleExtent(scale.domain());
    return scale.domain([m.floor(extent[0]), m.ceil(extent[1])]);
  };

  scale.ticks = function(m, k) {
    var extent = d3_time_scaleExtent(scale.domain());
    if (typeof m !== "function") {
      var span = extent[1] - extent[0],
          target = span / m,
          i = d3.bisect(d3_time_scaleSteps, target);
      if (i == d3_time_scaleSteps.length) return methods.year(extent, m);
      if (!i) return linear.ticks(m).map(d3_time_scaleDate);
      if (Math.log(target / d3_time_scaleSteps[i - 1]) < Math.log(d3_time_scaleSteps[i] / target)) --i;
      m = methods[i];
      k = m[1];
      m = m[0].range;
    }
    return m(extent[0], new Date(+extent[1] + 1), k); // inclusive upper bound
  };

  scale.tickFormat = function() {
    return format;
  };

  scale.copy = function() {
    return d3_time_scale(linear.copy(), methods, format);
  };

  // TOOD expose d3_scale_linear_rebind?
  return d3.rebind(scale, linear, "range", "rangeRound", "interpolate", "clamp");
}

// TODO expose d3_scaleExtent?
function d3_time_scaleExtent(domain) {
  var start = domain[0], stop = domain[domain.length - 1];
  return start < stop ? [start, stop] : [stop, start];
}

function d3_time_scaleDate(t) {
  return new Date(t);
}

function d3_time_scaleFormat(formats) {
  return function(date) {
    var i = formats.length - 1, f = formats[i];
    while (!f[1](date)) f = formats[--i];
    return f[0](date);
  };
}

function d3_time_scaleSetYear(y) {
  var d = new Date(y, 0, 1);
  d.setFullYear(y); // Y2K fail
  return d;
}

function d3_time_scaleGetYear(d) {
  var y = d.getFullYear(),
      d0 = d3_time_scaleSetYear(y),
      d1 = d3_time_scaleSetYear(y + 1);
  return y + (d - d0) / (d1 - d0);
}

var d3_time_scaleSteps = [
  1e3,    // 1-second
  5e3,    // 5-second
  15e3,   // 15-second
  3e4,    // 30-second
  6e4,    // 1-minute
  3e5,    // 5-minute
  9e5,    // 15-minute
  18e5,   // 30-minute
  36e5,   // 1-hour
  108e5,  // 3-hour
  216e5,  // 6-hour
  432e5,  // 12-hour
  864e5,  // 1-day
  1728e5, // 2-day
  6048e5, // 1-week
  2592e6, // 1-month
  7776e6, // 3-month
  31536e6 // 1-year
];

var d3_time_scaleLocalMethods = [
  [d3.time.second, 1],
  [d3.time.second, 5],
  [d3.time.second, 15],
  [d3.time.second, 30],
  [d3.time.minute, 1],
  [d3.time.minute, 5],
  [d3.time.minute, 15],
  [d3.time.minute, 30],
  [d3.time.hour, 1],
  [d3.time.hour, 3],
  [d3.time.hour, 6],
  [d3.time.hour, 12],
  [d3.time.day, 1],
  [d3.time.day, 2],
  [d3.time.week, 1],
  [d3.time.month, 1],
  [d3.time.month, 3],
  [d3.time.year, 1]
];

var d3_time_scaleLocalFormats = [
  [d3.time.format("%Y"), function(d) { return true; }],
  [d3.time.format("%B"), function(d) { return d.getMonth(); }],
  [d3.time.format("%b %d"), function(d) { return d.getDate() != 1; }],
  [d3.time.format("%a %d"), function(d) { return d.getDay() && d.getDate() != 1; }],
  [d3.time.format("%I %p"), function(d) { return d.getHours(); }],
  [d3.time.format("%I:%M"), function(d) { return d.getMinutes(); }],
  [d3.time.format(":%S"), function(d) { return d.getSeconds(); }],
  [d3.time.format(".%L"), function(d) { return d.getMilliseconds(); }]
];

var d3_time_scaleLinear = d3.scale.linear(),
    d3_time_scaleLocalFormat = d3_time_scaleFormat(d3_time_scaleLocalFormats);

d3_time_scaleLocalMethods.year = function(extent, m) {
  return d3_time_scaleLinear.domain(extent.map(d3_time_scaleGetYear)).ticks(m).map(d3_time_scaleSetYear);
};

d3.time.scale = function() {
  return d3_time_scale(d3.scale.linear(), d3_time_scaleLocalMethods, d3_time_scaleLocalFormat);
};
var d3_time_scaleUTCMethods = d3_time_scaleLocalMethods.map(function(m) {
  return [m[0].utc, m[1]];
});

var d3_time_scaleUTCFormats = [
  [d3.time.format.utc("%Y"), function(d) { return true; }],
  [d3.time.format.utc("%B"), function(d) { return d.getUTCMonth(); }],
  [d3.time.format.utc("%b %d"), function(d) { return d.getUTCDate() != 1; }],
  [d3.time.format.utc("%a %d"), function(d) { return d.getUTCDay() && d.getUTCDate() != 1; }],
  [d3.time.format.utc("%I %p"), function(d) { return d.getUTCHours(); }],
  [d3.time.format.utc("%I:%M"), function(d) { return d.getUTCMinutes(); }],
  [d3.time.format.utc(":%S"), function(d) { return d.getUTCSeconds(); }],
  [d3.time.format.utc(".%L"), function(d) { return d.getUTCMilliseconds(); }]
];

var d3_time_scaleUTCFormat = d3_time_scaleFormat(d3_time_scaleUTCFormats);

function d3_time_scaleUTCSetYear(y) {
  var d = new Date(Date.UTC(y, 0, 1));
  d.setUTCFullYear(y); // Y2K fail
  return d;
}

function d3_time_scaleUTCGetYear(d) {
  var y = d.getUTCFullYear(),
      d0 = d3_time_scaleUTCSetYear(y),
      d1 = d3_time_scaleUTCSetYear(y + 1);
  return y + (d - d0) / (d1 - d0);
}

d3_time_scaleUTCMethods.year = function(extent, m) {
  return d3_time_scaleLinear.domain(extent.map(d3_time_scaleUTCGetYear)).ticks(m).map(d3_time_scaleUTCSetYear);
};

d3.time.scale.utc = function() {
  return d3_time_scale(d3.scale.linear(), d3_time_scaleUTCMethods, d3_time_scaleUTCFormat);
};
})();
  
  (function(){
	  var nv = {
	    version: '0.0.1a',
	    dev: true //set false when in production
	  };

	  window.nv = nv;

	  nv.tooltip = {}; // For the tooltip system
	  nv.utils = {}; // Utility subsystem
	  nv.models = {}; //stores all the possible models/components
	  nv.charts = {}; //stores all the ready to use charts
	  nv.graphs = []; //stores all the graphs currently on the page
	  nv.logs = {}; //stores some statistics and potential error messages

	  nv.dispatch = d3.dispatch('render_start', 'render_end');

	  // *************************************************************************
	  //  Development render timers - disabled if dev = false

	  if (nv.dev) {
	    nv.dispatch.on('render_start', function(e) {
	      nv.logs.startTime = +new Date();
	    });

	    nv.dispatch.on('render_end', function(e) {
	      nv.logs.endTime = +new Date();
	      nv.logs.totalTime = nv.logs.endTime - nv.logs.startTime;
	      nv.log('total', nv.logs.totalTime); // used for development, to keep track of graph generation times
	    });
	  }

	  // ********************************************
	  //  Public Core NV functions

	  // Logs all arguments, and returns the last so you can test things in place
	  nv.log = function() {
	    if (nv.dev && console.log) console.log.apply(console, arguments);
	    return arguments[arguments.length - 1];
	  };


	  nv.render = function render(step) {
	    step = step || 1; // number of graphs to generate in each timout loop

	    render.active = true;
	    nv.dispatch.render_start();

	    setTimeout(function() {
	      var chart;

	      for (var i = 0; i < step && (graph = render.queue[i]); i++) {
	        chart = graph.generate();
	        if (typeof graph.callback == typeof(Function)) graph.callback(chart);
	        nv.graphs.push(chart);
	      }

	      render.queue.splice(0, i);

	      if (render.queue.length) setTimeout(arguments.callee, 0);
	      else { nv.render.active = false; nv.dispatch.render_end(); }
	    }, 0);
	  };

	  nv.render.queue = [];

	  nv.addGraph = function(obj) {
	    if (typeof arguments[0] === typeof(Function))
	      obj = {generate: arguments[0], callback: arguments[1]};

	    nv.render.queue.push(obj);

	    if (!nv.render.active) nv.render();
	  };

	  nv.identity = function(d) { return d; };

	  nv.strip = function(s) { return s.replace(/(\s|&)/g,''); };

	  function daysInMonth(month,year) {
	    return (new Date(year, month+1, 0)).getDate();
	  }

	  function d3_time_range(floor, step, number) {
	    return function(t0, t1, dt) {
	      var time = floor(t0), times = [];
	      if (time < t0) step(time);
	      if (dt > 1) {
	        while (time < t1) {
	          var date = new Date(+time);
	          if ((number(date) % dt === 0)) times.push(date);
	          step(time);
	        }
	      } else {
	        while (time < t1) { times.push(new Date(+time)); step(time); }
	      }
	      return times;
	    };
	  }

	  d3.time.monthEnd = function(date) {
	    return new Date(date.getFullYear(), date.getMonth(), 0);
	  };

	  d3.time.monthEnds = d3_time_range(d3.time.monthEnd, function(date) {
	      date.setUTCDate(date.getUTCDate() + 1);
	      date.setDate(daysInMonth(date.getMonth() + 1, date.getFullYear()));
	    }, function(date) {
	      return date.getMonth();
	    }
	  );


	  /*****
	   * A no frills tooltip implementation.
	   *****/


	  (function() {

	    var nvtooltip = window.nv.tooltip = {};

	    nvtooltip.show = function(pos, content, gravity, dist, parentContainer, classes) {

	      var container = document.createElement('div');
	          container.className = 'nvtooltip ' + (classes ? classes : 'xy-tooltip');

	      gravity = gravity || 's';
	      dist = dist || 20;

	      var body = parentContainer ? parentContainer : document.getElementsByTagName('body')[0];

	      container.innerHTML = content;
	      container.style.left = 0;
	      container.style.top = 0;
	      container.style.opacity = 0;

	      body.appendChild(container);

	      var height = parseInt(container.offsetHeight),
	          width = parseInt(container.offsetWidth),
	          windowWidth = nv.utils.windowSize().width,
	          windowHeight = nv.utils.windowSize().height,
	          scrollTop = body.scrollTop,
	          scrollLeft = body.scrollLeft,
	          left, top;


	      switch (gravity) {
	        case 'e':
	          left = pos[0] - width - dist;
	          top = pos[1] - (height / 2);
	          if (left < scrollLeft) left = pos[0] + dist;
	          if (top < scrollTop) top = scrollTop + 5;
	          if (top + height > scrollTop + windowHeight) top = scrollTop - height - 5;
	          break;
	        case 'w':
	          left = pos[0] + dist;
	          top = pos[1] - (height / 2);
	          if (left + width > windowWidth) left = pos[0] - width - dist;
	          if (top < scrollTop) top = scrollTop + 5;
	          if (top + height > scrollTop + windowHeight) top = scrollTop - height - 5;
	          break;
	        case 'n':
	          left = pos[0] - (width / 2);
	          top = pos[1] + dist;
	          if (left < scrollLeft) left = scrollLeft + 5;
	          if (left + width > windowWidth) left = windowWidth - width - 5;
	          if (top + height > scrollTop + windowHeight) top = pos[1] - height - dist;
	          break;
	        case 's':
	          left = pos[0] - (width / 2);
	          top = pos[1] - height - dist;
	          if (left < scrollLeft) left = scrollLeft + 5;
	          if (left + width > windowWidth) left = windowWidth - width - 5;
	          if (scrollTop > top) top = pos[1] + 20;
	          break;
	      }


	      container.style.left = left+'px';
	      container.style.top = top+'px';
	      container.style.opacity = 1;
	      container.style.position = 'absolute'; //fix scroll bar issue
	      container.style.pointerEvents = 'none'; //fix scroll bar issue

	      return container;
	    };

	    nvtooltip.cleanup = function() {

	        // Find the tooltips, mark them for removal by this class (so others cleanups won't find it)
	        var tooltips = document.getElementsByClassName('nvtooltip');
	        var purging = [];
	        while(tooltips.length) {
	          purging.push(tooltips[0]);
	          tooltips[0].style.transitionDelay = '0 !important';
	          tooltips[0].style.opacity = 0;
	          tooltips[0].className = 'nvtooltip-pending-removal';
	        }


	        setTimeout(function() {

	            while (purging.length) {
	               var removeMe = purging.pop();
	                removeMe.parentNode.removeChild(removeMe);
	            }
	      }, 500);
	    };


	  })();

	  nv.utils.windowSize = function() {
	      // Sane defaults
	      var size = {width: 640, height: 480};

	      // Earlier IE uses Doc.body
	      if (document.body && document.body.offsetWidth) {
	          size.width = document.body.offsetWidth;
	          size.height = document.body.offsetHeight;
	      }

	      // IE can use depending on mode it is in
	      if (document.compatMode=='CSS1Compat' &&
	          document.documentElement &&
	          document.documentElement.offsetWidth ) {
	          size.width = document.documentElement.offsetWidth;
	          size.height = document.documentElement.offsetHeight;
	      }

	      // Most recent browsers use
	      if (window.innerWidth && window.innerHeight) {
	          size.width = window.innerWidth;
	          size.height = window.innerHeight;
	      }
	      return (size);
	  };



	  // Easy way to bind multiple functions to window.onresize
	  // TODO: give a way to remove a function after its bound, other than removing alkl of them
	  nv.utils.windowResize = function(fun){
	    var oldresize = window.onresize;

	    window.onresize = function(e) {
	      if (typeof oldresize == 'function') oldresize(e);
	      fun(e);
	    }
	  }

	  // Backwards compatible way to implement more d3-like coloring of graphs.
	  // If passed an array, wrap it in a function which implements the old default
	  // behaviour
	  nv.utils.getColor = function(color) {
	      if (!arguments.length) return nv.utils.defaultColor(); //if you pass in nothing, get default colors back

	      if( Object.prototype.toString.call( color ) === '[object Array]' )
	          return function(d, i) { return d.color || color[i % color.length]; };
	      else
	          return color;
	          //can't really help it if someone passes rubish as color
	  }

	  // Default color chooser uses the index of an object as before.
	  nv.utils.defaultColor = function() {
	      var colors = d3.scale.category20().range();
	      return function(d, i) { return d.color || colors[i % colors.length] };
	  }



	  // From the PJAX example on d3js.org, while this is not really directly needed
	  // it's a very cool method for doing pjax, I may expand upon it a little bit,
	  // open to suggestions on anything that may be useful
	  nv.utils.pjax = function(links, content) {
	    d3.selectAll(links).on("click", function() {
	      history.pushState(this.href, this.textContent, this.href);
	      load(this.href);
	      d3.event.preventDefault();
	    });

	    function load(href) {
	      d3.html(href, function(fragment) {
	        var target = d3.select(content).node();
	        target.parentNode.replaceChild(d3.select(fragment).select(content).node(), target);
	        nv.utils.pjax(links, content);
	      });
	    }

	    d3.select(window).on("popstate", function() {
	      if (d3.event.state) load(d3.event.state);
	    });
	  }

	  nv.models.axis = function() {
	    //Default Settings
	    var width = 60, //only used for tickLabel currently
	        height = 60, //only used for tickLabel currently
	        scale = d3.scale.linear(),
	        axisLabelText = null,
	        showMaxMin = true, //TODO: showMaxMin should be disabled on all ordinal scaled axes
	        highlightZero = true,
	        rotateLabels = 0,
	        rotateYLabel = true,
	        margin = {top: 0, right: 0, bottom: 0, left: 0},
	        ticks = null;

	    var axis = d3.svg.axis()
	                 .scale(scale)
	                 .orient('bottom')
	                 .tickFormat(function(d) { return d }), //TODO: decide if we want to keep this
	        scale0;

	    function chart(selection) {
	      selection.each(function(data) {
	        var container = d3.select(this);

	        var wrap = container.selectAll('g.nv-wrap.nv-axis').data([data]);
	        var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-axis');
	        var gEnter = wrapEnter.append('g');
	        var g = wrap.select('g')

	        if (ticks !== null) {
	          axis.ticks(ticks);
	        } else if (axis.orient() == 'top' || axis.orient() == 'bottom') {
	          axis.ticks(Math.abs(scale.range()[1] - scale.range()[0]) / 100);
	        }

	        //TODO: consider calculating width/height based on whether or not label is added, for reference in charts using this component


	        d3.transition(g)
	            .call(axis);

	        scale0 = scale0 || axis.scale();

	        var axisLabel = g.selectAll('text.nv-axislabel')
	            .data([axisLabelText || null]);
	        axisLabel.exit().remove();
	        switch (axis.orient()) {
	          case 'top':
	            axisLabel.enter().append('text').attr('class', 'nv-axislabel')
	                .attr('text-anchor', 'middle')
	                .attr('y', 0);
	            var w = (scale.range().length==2) ? scale.range()[1] : (scale.range()[scale.range().length-1]+(scale.range()[1]-scale.range()[0]));
	            axisLabel
	                .attr('x', w/2);
	            if (showMaxMin) {
	              var axisMaxMin = wrap.selectAll('g.nv-axisMaxMin')
	                             .data(scale.domain());
	              axisMaxMin.enter().append('g').attr('class', 'nv-axisMaxMin').append('text');
	              axisMaxMin.exit().remove();
	              axisMaxMin
	                  .attr('transform', function(d,i) {
	                    return 'translate(' + scale(d) + ',0)'
	                  })
	                .select('text')
	                  .attr('dy', '0em')
	                  .attr('y', -axis.tickPadding())
	                  .attr('text-anchor', 'middle')
	                  .text(function(d,i) {
	                    return ('' + axis.tickFormat()(d)).match('NaN') ? '' : axis.tickFormat()(d)
	                  });
	              d3.transition(axisMaxMin)
	                  .attr('transform', function(d,i) {
	                    return 'translate(' + scale.range()[i] + ',0)'
	                  });
	            }
	            break;
	          case 'bottom':
	          var xLabelMargin = 30;
	          var maxTextWidth = 30;
	          if(rotateLabels%360){
	            var xTicks = g.selectAll('g').select("text");
	            //Calculate the longest xTick width
	            xTicks.each(function(d,i){
	              var width = this.getBBox().width;
	              if(width > maxTextWidth) maxTextWidth = width;
	            });
	            //Convert to radians before calculating sin. Add 30 to margin for healthy padding.
	            var sin = Math.abs(Math.sin(rotateLabels*Math.PI/180));
	            var xLabelMargin = (sin ? sin*maxTextWidth : maxTextWidth)+30;
	            //Rotate all xTicks
	            xTicks.attr('transform', function(d,i,j) { return 'rotate(' + rotateLabels + ' 0,0)' })
	            .attr('text-anchor', rotateLabels%360 > 0 ? 'start' : 'end');
	          }
	          axisLabel.enter().append('text').attr('class', 'nv-axislabel')
	                .attr('text-anchor', 'middle')
	                .attr('y', xLabelMargin);
	            var w = (scale.range().length==2) ? scale.range()[1] : (scale.range()[scale.range().length-1]+(scale.range()[1]-scale.range()[0]));
	            axisLabel
	                .attr('x', w/2);
	            if (showMaxMin) {
	              var axisMaxMin = wrap.selectAll('g.nv-axisMaxMin')
	                             .data(scale.domain());
	              axisMaxMin.enter().append('g').attr('class', 'nv-axisMaxMin').append('text');
	              axisMaxMin.exit().remove();
	              axisMaxMin
	                  .attr('transform', function(d,i) {
	                    return 'translate(' + scale(d) + ',0)'
	                  })
	                .select('text')
	                  .attr('dy', '.71em')
	                  .attr('y', axis.tickPadding())
	                  .attr('transform', function(d,i,j) { return 'rotate(' + rotateLabels + ' 0,0)' })
	                  .attr('text-anchor', rotateLabels%360 > 0 ? 'start' : 'end')
	                  .text(function(d,i) {
	                    return ('' + axis.tickFormat()(d)).match('NaN') ? '' : axis.tickFormat()(d)
	                  });
	              d3.transition(axisMaxMin)
	                  .attr('transform', function(d,i) {
	                    return 'translate(' + scale.range()[i] + ',0)'
	                  });
	            }
	            break;
	          case 'right':
	            axisLabel.enter().append('text').attr('class', 'nv-axislabel')
	                .attr('text-anchor', rotateYLabel ? 'middle' : 'begin')
	                .attr('transform', rotateYLabel ? 'rotate(90)' : '')
	                .attr('y', rotateYLabel ? (-Math.max(margin.right,width) - 12) : -10); //TODO: consider calculating this based on largest tick width... OR at least expose this on chart
	            axisLabel
	                .attr('x', rotateYLabel ? (scale.range()[0] / 2) : axis.tickPadding());
	            if (showMaxMin) {
	              var axisMaxMin = wrap.selectAll('g.nv-axisMaxMin')
	                             .data(scale.domain());
	              axisMaxMin.enter().append('g').attr('class', 'nv-axisMaxMin').append('text')
	                  .style('opacity', 0);
	              axisMaxMin.exit().remove();
	              axisMaxMin
	                  .attr('transform', function(d,i) {
	                    return 'translate(0,' + scale(d) + ')'
	                  })
	                .select('text')
	                  .attr('dy', '.32em')
	                  .attr('y', 0)
	                  .attr('x', axis.tickPadding())
	                  .attr('text-anchor', 'start')
	                  .text(function(d,i) {
	                    return ('' + axis.tickFormat()(d)).match('NaN') ? '' : axis.tickFormat()(d)
	                  });
	              d3.transition(axisMaxMin)
	                  .attr('transform', function(d,i) {
	                    return 'translate(0,' + scale.range()[i] + ')'
	                  })
	                .select('text')
	                  .style('opacity', 1);
	            }
	            break;
	          case 'left':
	            axisLabel.enter().append('text').attr('class', 'nv-axislabel')
	                .attr('text-anchor', rotateYLabel ? 'middle' : 'end')
	                .attr('transform', rotateYLabel ? 'rotate(-90)' : '')
	                .attr('y', rotateYLabel ? (-Math.max(margin.left,width) + 12) : -10); //TODO: consider calculating this based on largest tick width... OR at least expose this on chart
	            axisLabel
	                .attr('x', rotateYLabel ? (-scale.range()[0] / 2) : -axis.tickPadding());
	            if (showMaxMin) {
	              var axisMaxMin = wrap.selectAll('g.nv-axisMaxMin')
	                             .data(scale.domain());
	              axisMaxMin.enter().append('g').attr('class', 'nv-axisMaxMin').append('text')
	                  .style('opacity', 0);
	              axisMaxMin.exit().remove();
	              axisMaxMin
	                  .attr('transform', function(d,i) {
	                    return 'translate(0,' + scale0(d) + ')'
	                  })
	                .select('text')
	                  .attr('dy', '.32em')
	                  .attr('y', 0)
	                  .attr('x', -axis.tickPadding())
	                  .attr('text-anchor', 'end')
	                  .text(function(d,i) {
	                    return ('' + axis.tickFormat()(d)).match('NaN') ? '' : axis.tickFormat()(d)
	                  });
	              d3.transition(axisMaxMin)
	                  .attr('transform', function(d,i) {
	                    return 'translate(0,' + scale.range()[i] + ')'
	                  })
	                .select('text')
	                  .style('opacity', 1);
	            }
	            break;
	        }
	        axisLabel
	            .text(function(d) { return d });


	        //check if max and min overlap other values, if so, hide the values that overlap
	        if (showMaxMin && (axis.orient() === 'left' || axis.orient() === 'right')) {
	          g.selectAll('g') // the g's wrapping each tick
	              .each(function(d,i) {
	                if (scale(d) < scale.range()[1] + 10 || scale(d) > scale.range()[0] - 10) { // 10 is assuming text height is 16... if d is 0, leave it!
	                  if (d > 1e-10 || d < -1e-10) // accounts for minor floating point errors... though could be problematic if the scale is EXTREMELY SMALL
	                    d3.select(this).remove();
	                  else
	                    d3.select(this).select('text').remove(); // Don't remove the ZERO line!!
	                }
	              });
	        }

	        if (showMaxMin && (axis.orient() === 'top' || axis.orient() === 'bottom')) {
	          var maxMinRange = [];
	          wrap.selectAll('g.nv-axisMaxMin')
	              .each(function(d,i) {
	                if (i) // i== 1, max position
	                  maxMinRange.push(scale(d) - this.getBBox().width - 4)  //assuming the max and min labels are as wide as the next tick (with an extra 4 pixels just in case)
	                else // i==0, min position
	                  maxMinRange.push(scale(d) + this.getBBox().width + 4)
	              });
	          g.selectAll('g') // the g's wrapping each tick
	              .each(function(d,i) {
	                if (scale(d) < maxMinRange[0] || scale(d) > maxMinRange[1]) {
	                  if (d > 1e-10 || d < -1e-10) // accounts for minor floating point errors... though could be problematic if the scale is EXTREMELY SMALL
	                    d3.select(this).remove();
	                  else
	                    d3.select(this).select('text').remove(); // Don't remove the ZERO line!!
	                }
	              });
	        }


	        //highlight zero line ... Maybe should not be an option and should just be in CSS?
	        if (highlightZero)
	          g.selectAll('line.tick')
	            .filter(function(d) { return !parseFloat(Math.round(d*100000)/1000000) }) //this is because sometimes the 0 tick is a very small fraction, TODO: think of cleaner technique
	              .classed('zero', true);

	        scale0 = scale.copy();

	      });


	      return chart;
	    }


	    d3.rebind(chart, axis, 'orient', 'tickValues', 'tickSubdivide', 'tickSize', 'tickPadding', 'tickFormat');
	    d3.rebind(chart, scale, 'domain', 'range', 'rangeBand', 'rangeBands'); //these are also accessible by chart.scale(), but added common ones directly for ease of use

	    chart.width = function(_) {
	      if (!arguments.length) return width;
	      width = _;
	      return chart;
	    };

	    chart.ticks = function(_) {
	      if (!arguments.length) return ticks;
	      ticks = _;
	      return chart;
	    };

	    chart.height = function(_) {
	      if (!arguments.length) return height;
	      height = _;
	      return chart;
	    };

	    chart.axisLabel = function(_) {
	      if (!arguments.length) return axisLabelText;
	      axisLabelText = _;
	      return chart;
	    }

	    chart.showMaxMin = function(_) {
	      if (!arguments.length) return showMaxMin;
	      showMaxMin = _;
	      return chart;
	    }

	    chart.highlightZero = function(_) {
	      if (!arguments.length) return highlightZero;
	      highlightZero = _;
	      return chart;
	    }

	    chart.scale = function(_) {
	      if (!arguments.length) return scale;
	      scale = _;
	      axis.scale(scale);
	      d3.rebind(chart, scale, 'domain', 'range', 'rangeBand', 'rangeBands');
	      return chart;
	    }
	    chart.rotateYLabel = function(_) {
	    	if(!arguments.length) return rotateYLabel;
	    	rotateYLabel = _;
	    	return chart;
	    }
	    chart.rotateLabels = function(_) {
	      if(!arguments.length) return rotateLabels;
	      rotateLabels = _;
	      return chart;
	    }
	    chart.margin = function(_) {
	    	if(!arguments.length) return margin;
	    	margin = _;
	    	return chart;
	    }

	    return chart;
	  }
	  //TODO: eitehr drastically clean up or deprecate this model
	  nv.models.historicalBar = function() {
	    var margin = {top: 0, right: 0, bottom: 0, left: 0},
	        width = 960,
	        height = 500,
	        id = Math.floor(Math.random() * 10000), //Create semi-unique ID in case user doesn't select one
	        getX = function(d) { return d.x },
	        getY = function(d) { return d.y },
	        forceX = [],
	        forceY = [],
	        clipEdge = true,
	        color = nv.utils.defaultColor(),
	        xDomain, yDomain;

	    var x = d3.scale.linear(),
	        y = d3.scale.linear(),
	        xAxis = d3.svg.axis().scale(x).orient('bottom'),
	        yAxis = d3.svg.axis().scale(y).orient('left'),
	        dispatch = d3.dispatch('chartClick', 'elementClick', 'elementDblClick', 'elementMouseover', 'elementMouseout');


	    function chart(selection) {
	      selection.each(function(data) {
	        var availableWidth = width - margin.left - margin.right,
	            availableHeight = height - margin.top - margin.bottom;


	        x   .domain(xDomain || d3.extent(data[0].values.map(getX).concat(forceX) ))
	            .range([0, availableWidth]);

	        y   .domain(yDomain || d3.extent(data[0].values.map(getY).concat(forceY) )) 
	            .range([availableHeight, 0]);

	        // If scale's domain don't have a range, slightly adjust to make one... so a chart can show a single data point
	        if (x.domain()[0] === x.domain()[1] || y.domain()[0] === y.domain()[1]) singlePoint = true;
	        if (x.domain()[0] === x.domain()[1])
	          x.domain()[0] ?
	              x.domain([x.domain()[0] - x.domain()[0] * 0.01, x.domain()[1] + x.domain()[1] * 0.01])
	            : x.domain([-1,1]);

	        if (y.domain()[0] === y.domain()[1])
	          y.domain()[0] ?
	              y.domain([y.domain()[0] + y.domain()[0] * 0.01, y.domain()[1] - y.domain()[1] * 0.01])
	            : y.domain([-1,1]);


	        var parent = d3.select(this)
	            .on('click', function(d,i) {
	              dispatch.chartClick({
	                  data: d,
	                  index: i,
	                  pos: d3.event,
	                  id: id
	              });
	            });


	        var wrap = d3.select(this).selectAll('g.nv-wrap.nv-bar').data([data[0].values]);
	        var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-bar');
	        var gEnter = wrapEnter.append('g');

	        gEnter.append('g').attr('class', 'nv-bars');


	        wrap.attr('width', width)
	            .attr('height', height);

	        var g = wrap.select('g')
	            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


	        wrapEnter.append('defs').append('clipPath')
	            .attr('id', 'nv-chart-clip-path-' + id)
	          .append('rect');
	        wrap.select('#nv-chart-clip-path-' + id + ' rect')
	            .attr('width', availableWidth)
	            .attr('height', availableHeight);

	        gEnter
	            .attr('clip-path', clipEdge ? 'url(#nv-chart-clip-path-' + id + ')' : '');

	        var shiftWrap = gEnter.append('g').attr('class', 'nv-shiftWrap');



	        var bars = wrap.select('.nv-bars').selectAll('.nv-bar')
	            .data(function(d) { return d });

	        bars.exit().remove();


	        var barsEnter = bars.enter().append('rect')
	            .attr('class', function(d,i,j) { return (getY(d,i) < 0 ? 'nv-bar negative' : 'nv-bar positive') + ' nv-bar-' + j + '-' + i })
	            .attr('fill', function(d,i) { return color(d, i); })
	            .attr('x', 0 )
	            .attr('y', function(d,i) {  return y(Math.max(0, getY(d,i))) })
	            .attr('height', function(d,i) { return Math.abs(y(getY(d,i)) - y(0)) })
	            .on('mouseover', function(d,i) {
	              d3.select(this).classed('hover', true);
	              dispatch.elementMouseover({
	                  point: d,
	                  series: data[0],
	                  pos: [x(getX(d,i)), y(getY(d,i))],  // TODO: Figure out why the value appears to be shifted
	                  pointIndex: i,
	                  seriesIndex: 0,
	                  e: d3.event
	              });

	            })
	            .on('mouseout', function(d,i) {
	                  d3.select(this).classed('hover', false);
	                  dispatch.elementMouseout({
	                      point: d,
	                      series: data[0],
	                      pointIndex: i,
	                      seriesIndex: 0,
	                      e: d3.event
	                  });
	            })
	            .on('click', function(d,i) {
	                  dispatch.elementClick({
	                      //label: d[label],
	                      value: getY(d,i),
	                      data: d,
	                      index: i,
	                      pos: [x(getX(d,i)), y(getY(d,i))],
	                      e: d3.event,
	                      id: id
	                  });
	                d3.event.stopPropagation();
	            })
	            .on('dblclick', function(d,i) {
	                dispatch.elementDblClick({
	                    //label: d[label],
	                    value: getY(d,i),
	                    data: d,
	                    index: i,
	                    pos: [x(getX(d,i)), y(getY(d,i))],
	                    e: d3.event,
	                    id: id
	                });
	                d3.event.stopPropagation();
	            });

	        bars
	            .attr('class', function(d,i,j) { return (getY(d,i) < 0 ? 'nv-bar negative' : 'nv-bar positive') + ' nv-bar-' + j + '-' + i })
	            .attr('transform', function(d,i) { return 'translate(' + (x(getX(d,i)) - ((availableWidth / data[0].values.length) * .5)) + ',0)'; })  //TODO: better width calculations that don't assume always uniform data spacing;w
	            .attr('width', (availableWidth / data[0].values.length) * .9 )


	        d3.transition(bars)
	            .attr('y', function(d,i) {  return y(Math.max(0, getY(d,i))) })
	            .attr('height', function(d,i) { return Math.abs(y(getY(d,i)) - y(0)) });
	            //.order();  // not sure if this makes any sense for this model

	      });

	      return chart;
	    }


	    chart.dispatch = dispatch;

	    chart.x = function(_) {
	      if (!arguments.length) return getX;
	      getX = _;
	      return chart;
	    };

	    chart.y = function(_) {
	      if (!arguments.length) return getY;
	      getY = _;
	      return chart;
	    };

	    chart.margin = function(_) {
	      if (!arguments.length) return margin;
	      margin = _;
	      return chart;
	    };

	    chart.width = function(_) {
	      if (!arguments.length) return width;
	      width = _;
	      return chart;
	    };

	    chart.height = function(_) {
	      if (!arguments.length) return height;
	      height = _;
	      return chart;
	    };

	    chart.xScale = function(_) {
	      if (!arguments.length) return x;
	      x = _;
	      return chart;
	    };

	    chart.yScale = function(_) {
	      if (!arguments.length) return y;
	      y = _;
	      return chart;
	    };

	    chart.xDomain = function(_) {
	      if (!arguments.length) return xDomain;
	      xDomain = _;
	      return chart;
	    };

	    chart.yDomain = function(_) {
	      if (!arguments.length) return yDomain;
	      yDomain = _;
	      return chart;
	    };

	    chart.forceX = function(_) {
	      if (!arguments.length) return forceX;
	      forceX = _;
	      return chart;
	    };

	    chart.forceY = function(_) {
	      if (!arguments.length) return forceY;
	      forceY = _;
	      return chart;
	    };

	    chart.clipEdge = function(_) {
	      if (!arguments.length) return clipEdge;
	      clipEdge = _;
	      return chart;
	    };

	    chart.color = function(_) {
	      if (!arguments.length) return color;
	      color = nv.utils.getColor(_);
	      return chart;
	    };

	    chart.id = function(_) {
	      if (!arguments.length) return id;
	      id = _;
	      return chart;
	    };



	    return chart;
	  }

	  // Chart design based on the recommendations of Stephen Few. Implementation
	  // based on the work of Clint Ivy, Jamie Love, and Jason Davies.
	  // http://projects.instantcognition.com/protovis/bulletchart/
	  nv.models.bullet = function() {
	    var orient = 'left', // TODO top & bottom
	        reverse = false,
	        margin = {top: 0, right: 0, bottom: 0, left: 0},
	        ranges = function(d) { return d.ranges },
	        markers = function(d) { return d.markers },
	        measures = function(d) { return d.measures },
	        width = 380,
	        height = 30,
	        tickFormat = null;

	    var dispatch = d3.dispatch('elementMouseover', 'elementMouseout');

	    // For each small multiple
	    function chart(g) {
	      g.each(function(d, i) {
	        var availableWidth = width - margin.left - margin.right,
	            availableHeight = height - margin.top - margin.bottom;

	        var rangez = ranges.call(this, d, i).slice().sort(d3.descending),
	            markerz = markers.call(this, d, i).slice().sort(d3.descending),
	            measurez = measures.call(this, d, i).slice().sort(d3.descending);


	        var wrap = d3.select(this).selectAll('g.nv-wrap.nv-bullet').data([d]);
	        var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-bullet');
	        var gEnter = wrapEnter.append('g');

	        var g = wrap.select('g')
	        wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


	        // Compute the new x-scale.
	        var x1 = d3.scale.linear()
	            .domain([0, Math.max(rangez[0], markerz[0], measurez[0])])  // TODO: need to allow forceX and forceY, and xDomain, yDomain
	            .range(reverse ? [availableWidth, 0] : [0, availableWidth]);

	        // Retrieve the old x-scale, if this is an update.
	        var x0 = this.__chart__ || d3.scale.linear()
	            .domain([0, Infinity])
	            .range(x1.range());

	        // Stash the new scale.
	        this.__chart__ = x1;

	        /*
	        // Derive width-scales from the x-scales.
	        var w0 = bulletWidth(x0),
	            w1 = bulletWidth(x1);

	        function bulletWidth(x) {
	          var x0 = x(0);
	          return function(d) {
	            return Math.abs(x(d) - x(0));
	          };
	        }

	        function bulletTranslate(x) {
	          return function(d) {
	            return 'translate(' + x(d) + ',0)';
	          };
	        }
	        */

	        var w0 = function(d) { return Math.abs(x0(d) - x0(0)) }, // TODO: could optimize by precalculating x0(0) and x1(0)
	            w1 = function(d) { return Math.abs(x1(d) - x1(0)) };


	        // Update the range rects.
	        var range = g.selectAll('rect.nv-range')
	            .data(rangez);

	        range.enter().append('rect')
	            .attr('class', function(d, i) { return 'nv-range nv-s' + i; })
	            .attr('width', w0)
	            .attr('height', availableHeight)
	            .attr('x', reverse ? x0 : 0)
	            .on('mouseover', function(d,i) { 
	                dispatch.elementMouseover({
	                  value: d,
	                  label: (i <= 0) ? 'Maximum' : (i > 1) ? 'Minimum' : 'Mean', //TODO: make these labels a variable
	                  pos: [x1(d), availableHeight/2]
	                })
	            })
	            .on('mouseout', function(d,i) { 
	                dispatch.elementMouseout({
	                  value: d,
	                  label: (i <= 0) ? 'Minimum' : (i >=1) ? 'Maximum' : 'Mean' //TODO: make these labels a variable
	                })
	            })

	        d3.transition(range)
	            .attr('x', reverse ? x1 : 0)
	            .attr('width', w1)
	            .attr('height', availableHeight);


	        // Update the measure rects.
	        var measure = g.selectAll('rect.nv-measure')
	            .data(measurez);

	        measure.enter().append('rect')
	            .attr('class', function(d, i) { return 'nv-measure nv-s' + i; })
	            .attr('width', w0)
	            .attr('height', availableHeight / 3)
	            .attr('x', reverse ? x0 : 0)
	            .attr('y', availableHeight / 3)
	            .on('mouseover', function(d) { 
	                dispatch.elementMouseover({
	                  value: d,
	                  label: 'Current', //TODO: make these labels a variable
	                  pos: [x1(d), availableHeight/2]
	                })
	            })
	            .on('mouseout', function(d) { 
	                dispatch.elementMouseout({
	                  value: d,
	                  label: 'Current' //TODO: make these labels a variable
	                })
	            })

	        d3.transition(measure)
	            .attr('width', w1)
	            .attr('height', availableHeight / 3)
	            .attr('x', reverse ? x1 : 0)
	            .attr('y', availableHeight / 3);



	        // Update the marker lines.
	        var marker = g.selectAll('path.nv-markerTriangle')
	            .data(markerz);

	        var h3 =  availableHeight / 6;
	        marker.enter().append('path')
	            .attr('class', 'nv-markerTriangle')
	            .attr('transform', function(d) { return 'translate(' + x0(d) + ',' + (availableHeight / 2) + ')' })
	            .attr('d', 'M0,' + h3 + 'L' + h3 + ',' + (-h3) + ' ' + (-h3) + ',' + (-h3) + 'Z')
	            .on('mouseover', function(d,i) {
	                dispatch.elementMouseover({
	                  value: d,
	                  label: 'Previous',
	                  pos: [x1(d), availableHeight/2]
	                })
	            })
	            .on('mouseout', function(d,i) {
	                dispatch.elementMouseout({
	                  value: d,
	                  label: 'Previous'
	                })
	            });

	        d3.transition(marker)
	            .attr('transform', function(d) { return 'translate(' + x1(d) + ',' + (availableHeight / 2) + ')' });

	        marker.exit().remove();


	      });
	      d3.timer.flush();
	    }


	    chart.dispatch = dispatch;

	    // left, right, top, bottom
	    chart.orient = function(_) {
	      if (!arguments.length) return orient;
	      orient = _;
	      reverse = orient == 'right' || orient == 'bottom';
	      return chart;
	    };

	    // ranges (bad, satisfactory, good)
	    chart.ranges = function(_) {
	      if (!arguments.length) return ranges;
	      ranges = _;
	      return chart;
	    };

	    // markers (previous, goal)
	    chart.markers = function(_) {
	      if (!arguments.length) return markers;
	      markers = _;
	      return chart;
	    };

	    // measures (actual, forecast)
	    chart.measures = function(_) {
	      if (!arguments.length) return measures;
	      measures = _;
	      return chart;
	    };

	    chart.width = function(_) {
	      if (!arguments.length) return width;
	      width = _;
	      return chart;
	    };

	    chart.height = function(_) {
	      if (!arguments.length) return height;
	      height = _;
	      return chart;
	    };

	    chart.margin = function(_) {
	      if (!arguments.length) return margin;
	      margin = _;
	      return chart;
	    };

	    chart.tickFormat = function(_) {
	      if (!arguments.length) return tickFormat;
	      tickFormat = _;
	      return chart;
	    };

	    return chart;
	  };



	  // Chart design based on the recommendations of Stephen Few. Implementation
	  // based on the work of Clint Ivy, Jamie Love, and Jason Davies.
	  // http://projects.instantcognition.com/protovis/bulletchart/
	  nv.models.bulletChart = function() {
	    var orient = 'left', // TODO top & bottom
	        reverse = false,
	        margin = {top: 5, right: 40, bottom: 20, left: 120},
	        ranges = function(d) { return d.ranges },
	        markers = function(d) { return d.markers },
	        measures = function(d) { return d.measures },
	        width = null,
	        height = 55,
	        tickFormat = null,
	        tooltips = true,
	        tooltip = function(key, x, y, e, graph) {
	          return '<h3>' + e.label + '</h3>' +
	                 '<p>' +  e.value + '</p>'
	        },
	        noData = "No Data Available."
	        ;


	    var dispatch = d3.dispatch('tooltipShow', 'tooltipHide'),
	        bullet = nv.models.bullet();


	    var showTooltip = function(e, offsetElement) {
	      var offsetElement = document.getElementById("chart"),
	          left = e.pos[0] + offsetElement.offsetLeft + margin.left,
	          top = e.pos[1] + offsetElement.offsetTop + margin.top;

	      var content = '<h3>' + e.label + '</h3>' +
	              '<p>' + e.value + '</p>';

	      nv.tooltip.show([left, top], content, e.value < 0 ? 'e' : 'w', null, offsetElement);
	    };


	    // For each small multipleâ€¦
	    function chart(g) {
	      g.each(function(d, i) {
	        var container = d3.select(this);

	        var availableWidth = (width  || parseInt(container.style('width')) || 960)
	                               - margin.left - margin.right,
	            availableHeight = height - margin.top - margin.bottom,
	            that = this;


	        //------------------------------------------------------------
	        // Display No Data message if there's nothing to show.

	        /*
	        // Disabled until I figure out a better way to check for no data with the bullet chart
	        if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
	          container.append('text')
	            .attr('class', 'nvd3 nv-noData')
	            .attr('x', availableWidth / 2)
	            .attr('y', availableHeight / 2)
	            .attr('dy', '-.7em')
	            .style('text-anchor', 'middle')
	            .text(noData);
	            return chart;
	        } else {
	          container.select('.nv-noData').remove();
	        }
	        */

	        //------------------------------------------------------------



	        var rangez = ranges.call(this, d, i).slice().sort(d3.descending),
	            markerz = markers.call(this, d, i).slice().sort(d3.descending),
	            measurez = measures.call(this, d, i).slice().sort(d3.descending);

	        var wrap = container.selectAll('g.nv-wrap.nv-bulletChart').data([d]);
	        var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-bulletChart');
	        var gEnter = wrapEnter.append('g');

	        gEnter.append('g').attr('class', 'nv-bulletWrap');
	        gEnter.append('g').attr('class', 'nv-titles');

	        var g = wrap.select('g')
	        wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


	        // Compute the new x-scale.
	        var x1 = d3.scale.linear()
	            .domain([0, Math.max(rangez[0], markerz[0], measurez[0])])  // TODO: need to allow forceX and forceY, and xDomain, yDomain
	            .range(reverse ? [availableWidth, 0] : [0, availableWidth]);

	        // Retrieve the old x-scale, if this is an update.
	        var x0 = this.__chart__ || d3.scale.linear()
	            .domain([0, Infinity])
	            .range(x1.range());

	        // Stash the new scale.
	        this.__chart__ = x1;

	        /*
	        // Derive width-scales from the x-scales.
	        var w0 = bulletWidth(x0),
	            w1 = bulletWidth(x1);

	        function bulletWidth(x) {
	          var x0 = x(0);
	          return function(d) {
	            return Math.abs(x(d) - x(0));
	          };
	        }

	        function bulletTranslate(x) {
	          return function(d) {
	            return 'translate(' + x(d) + ',0)';
	          };
	        }
	        */

	        var w0 = function(d) { return Math.abs(x0(d) - x0(0)) }, // TODO: could optimize by precalculating x0(0) and x1(0)
	            w1 = function(d) { return Math.abs(x1(d) - x1(0)) };


	        var title = g.select('.nv-titles').append("g")
	            .attr("text-anchor", "end")
	            .attr("transform", "translate(-6," + (height - margin.top - margin.bottom) / 2 + ")");
	        title.append("text")
	            .attr("class", "nv-title")
	            .text(function(d) { return d.title; });

	        title.append("text")
	            .attr("class", "nv-subtitle")
	            .attr("dy", "1em")
	            .text(function(d) { return d.subtitle; });



	        bullet
	          .width(availableWidth)
	          .height(availableHeight)

	        var bulletWrap = g.select('.nv-bulletWrap')
	            //.datum(data);

	        d3.transition(bulletWrap).call(bullet);



	        // Compute the tick format.
	        var format = tickFormat || x1.tickFormat(8);

	        // Update the tick groups.
	        var tick = g.selectAll('g.nv-tick')
	            .data(x1.ticks(8), function(d) {
	              return this.textContent || format(d);
	            });

	        // Initialize the ticks with the old scale, x0.
	        var tickEnter = tick.enter().append('g')
	            .attr('class', 'nv-tick')
	            .attr('transform', function(d) { return 'translate(' + x0(d) + ',0)' })
	            .style('opacity', 1e-6);

	        tickEnter.append('line')
	            .attr('y1', availableHeight)
	            .attr('y2', availableHeight * 7 / 6);

	        tickEnter.append('text')
	            .attr('text-anchor', 'middle')
	            .attr('dy', '1em')
	            .attr('y', availableHeight * 7 / 6)
	            .text(format);

	        // Transition the entering ticks to the new scale, x1.
	        d3.transition(tickEnter)
	            .attr('transform', function(d) { return 'translate(' + x1(d) + ',0)' })
	            .style('opacity', 1);

	        // Transition the updating ticks to the new scale, x1.
	        var tickUpdate = d3.transition(tick)
	            .attr('transform', function(d) { return 'translate(' + x1(d) + ',0)' })
	            .style('opacity', 1);

	        tickUpdate.select('line')
	            .attr('y1', availableHeight)
	            .attr('y2', availableHeight * 7 / 6);

	        tickUpdate.select('text')
	            .attr('y', availableHeight * 7 / 6);

	        // Transition the exiting ticks to the new scale, x1.
	        d3.transition(tick.exit())
	            .attr('transform', function(d) { return 'translate(' + x1(d) + ',0)' })
	            .style('opacity', 1e-6)
	            .remove();

	  /*
	        bullet.dispatch.on('elementMouseover', function(e) {
	            var offsetElement = document.getElementById("chart"),
	                left = e.pos[0] + offsetElement.offsetLeft + margin.left,
	                top = e.pos[1] + offsetElement.offsetTop + margin.top;

	            var content = '<h3>' + e.label + '</h3>' +
	                    '<p>' +
	                    e.value +
	                    '</p>';

	            nv.tooltip.show([left, top], content, e.value < 0 ? 'e' : 'w');
	        });


	        bullet.dispatch.on('elementMouseout', function(e) {
	            nv.tooltip.cleanup();
	        });
	  */

	        bullet.dispatch.on('elementMouseover.tooltip', function(e) {
	          //e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
	          dispatch.tooltipShow(e);
	        });
	        if (tooltips) dispatch.on('tooltipShow', function(e) { showTooltip(e, that.parentNode) } ); // TODO: maybe merge with above?

	        bullet.dispatch.on('elementMouseout.tooltip', function(e) {
	          dispatch.tooltipHide(e);
	        });
	        if (tooltips) dispatch.on('tooltipHide', nv.tooltip.cleanup);



	      });
	      d3.timer.flush();
	    }


	    chart.dispatch = dispatch;
	    chart.bullet = bullet;

	    // left, right, top, bottom
	    chart.orient = function(x) {
	      if (!arguments.length) return orient;
	      orient = x;
	      reverse = orient == 'right' || orient == 'bottom';
	      return chart;
	    };

	    // ranges (bad, satisfactory, good)
	    chart.ranges = function(x) {
	      if (!arguments.length) return ranges;
	      ranges = x;
	      return chart;
	    };

	    // markers (previous, goal)
	    chart.markers = function(x) {
	      if (!arguments.length) return markers;
	      markers = x;
	      return chart;
	    };

	    // measures (actual, forecast)
	    chart.measures = function(x) {
	      if (!arguments.length) return measures;
	      measures = x;
	      return chart;
	    };

	    chart.width = function(x) {
	      if (!arguments.length) return width;
	      width = x;
	      return chart;
	    };

	    chart.height = function(x) {
	      if (!arguments.length) return height;
	      height = x;
	      return chart;
	    };

	    chart.margin = function(_) {
	      if (!arguments.length) return margin;
	      margin = _;
	      return chart;
	    };

	    chart.tickFormat = function(x) {
	      if (!arguments.length) return tickFormat;
	      tickFormat = x;
	      return chart;
	    };

	    chart.tooltips = function(_) {
	      if (!arguments.length) return tooltips;
	      tooltips = _;
	      return chart;
	    };

	    chart.tooltipContent = function(_) {
	      if (!arguments.length) return tooltip;
	      tooltip = _;
	      return chart;
	    };

	    chart.noData = function(_) {
	      if (!arguments.length) return noData;
	      noData = _;
	      return chart;
	    };


	    return chart;
	  };



	  nv.models.cumulativeLineChart = function() {

	    //============================================================
	    // Public Variables with Default Settings
	    //------------------------------------------------------------

	    var margin = {top: 30, right: 30, bottom: 50, left: 60},
	        color = nv.utils.defaultColor(),
	        width = null,
	        height = null,
	        showLegend = true,
	        tooltips = true,
	        showRescaleToggle = true, //TODO: get rescale y functionality back (need to calculate exten of y for ALL possible re-zero points
	        rescaleY = true,
	        tooltip = function(key, x, y, e, graph) {
	          return '<h3>' + key + '</h3>' +
	                 '<p>' +  y + ' at ' + x + '</p>'
	        },
	        x, y, //can be accessed via chart.lines.[x/y]Scale()
	        noData = "No Data Available."
	        ;


	    //============================================================
	    // Private Variables
	    //------------------------------------------------------------

	    var lines = nv.models.line(),
	        dx = d3.scale.linear(),
	        id = lines.id(),
	        xAxis = nv.models.axis().orient('bottom').tickPadding(5),
	        yAxis = nv.models.axis().orient('left'),
	        legend = nv.models.legend().height(30),
	        controls = nv.models.legend().height(30),
	        dispatch = d3.dispatch('tooltipShow', 'tooltipHide'),
	        index = {i: 0, x: 0};

	    //TODO: let user select default
	    var controlsData = [
	      { key: 'Re-scale y-axis' }
	    ];

	    var showTooltip = function(e, offsetElement) {
	      var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
	          top = e.pos[1] + ( offsetElement.offsetTop || 0),
	          x = xAxis.tickFormat()(lines.x()(e.point, e.pointIndex)),
	          y = yAxis.tickFormat()(lines.y()(e.point, e.pointIndex)),
	          content = tooltip(e.series.key, x, y, e, chart);

	      nv.tooltip.show([left, top], content, null, null, offsetElement);
	    };


	    var indexDrag = d3.behavior.drag()
	                      .on('dragstart', dragStart)
	                      .on('drag', dragMove)
	                      .on('dragend', dragEnd);

	    function dragStart(d,i) {}

	    function dragMove(d,i) {
	      d.x += d3.event.dx;
	      d.i = Math.round(dx.invert(d.x));

	      //d3.transition(d3.select('.chart-' + id)).call(chart);
	      d3.select(this).attr('transform', 'translate(' + dx(d.i) + ',0)');
	    }

	    function dragEnd(d,i) {
	      //d3.transition(d3.select('.chart-' + id)).call(chart);
	      chart.update();
	    }



	    function chart(selection) {
	      selection.each(function(data) {
	        var container = d3.select(this).classed('nv-chart-' + id, true),
	            that = this;

	        var availableWidth = (width  || parseInt(container.style('width')) || 960)
	                               - margin.left - margin.right,
	            availableHeight = (height || parseInt(container.style('height')) || 400)
	                               - margin.top - margin.bottom;


	        //------------------------------------------------------------
	        // Display No Data message if there's nothing to show.

	        if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
	          container.append('text')
	            .attr('class', 'nvd3 nv-noData')
	            .attr('x', availableWidth / 2)
	            .attr('y', availableHeight / 2)
	            .attr('dy', '-.7em')
	            .style('text-anchor', 'middle')
	            .text(noData);
	            return chart;
	        } else {
	          container.select('.nv-noData').remove();
	        }

	        //------------------------------------------------------------



	        x = lines.xScale();
	        y = lines.yScale();

	        if (!rescaleY) {
	          var seriesDomains = data
	            .filter(function(series) { return !series.disabled })
	            .map(function(series,i) {
	              var initialDomain = d3.extent(series.values, lines.y());

	              return [
	                (initialDomain[0] - initialDomain[1]) / (1 + initialDomain[1]),
	                (initialDomain[1] - initialDomain[0]) / (1 + initialDomain[0])
	              ];
	            });

	          var completeDomain = [
	            d3.min(seriesDomains, function(d) { return d[0] }),
	            d3.max(seriesDomains, function(d) { return d[1] })
	          ]

	          lines.yDomain(completeDomain);
	        } else {
	          lines.yDomain(null);
	        }


	        dx  .domain([0, data[0].values.length - 1]) //Assumes all series have same length
	            .range([0, availableWidth])
	            .clamp(true);


	        var data = indexify(index.i, data);


	        var wrap = container.selectAll('g.nv-wrap.nv-cumulativeLine').data([data]);
	        var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-cumulativeLine').append('g');

	        gEnter.append('g').attr('class', 'nv-x nv-axis');
	        gEnter.append('g').attr('class', 'nv-y nv-axis');
	        gEnter.append('g').attr('class', 'nv-linesWrap');
	        gEnter.append('g').attr('class', 'nv-legendWrap');
	        gEnter.append('g').attr('class', 'nv-controlsWrap');


	        var g = wrap.select('g');


	        if (showLegend) {
	          legend.width(availableWidth);

	          g.select('.nv-legendWrap')
	              .datum(data)
	              .call(legend);

	          if ( margin.top != legend.height()) {
	            margin.top = legend.height();
	            availableHeight = (height || parseInt(container.style('height')) || 400)
	                               - margin.top - margin.bottom;
	          }

	          g.select('.nv-legendWrap')
	              .attr('transform', 'translate(0,' + (-margin.top) +')')
	        }


	        if (showRescaleToggle) {
	          controls.width(140).color(['#444', '#444', '#444']);
	          g.select('.nv-controlsWrap')
	              .datum(controlsData)
	              .attr('transform', 'translate(0,' + (-margin.top) +')')
	              .call(controls);
	        }



	        lines
	          //.x(function(d) { return d.x })
	          .y(function(d) { return d.display.y })
	          .width(availableWidth)
	          .height(availableHeight)
	          .color(data.map(function(d,i) {
	            return d.color || color(d, i);
	          }).filter(function(d,i) { return !data[i].disabled }));



	        g.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


	        var linesWrap = g.select('.nv-linesWrap')
	            .datum(data.filter(function(d) { return !d.disabled }))

	        d3.transition(linesWrap).call(lines);


	        var indexLine = linesWrap.selectAll('.nv-indexLine')
	            .data([index]);
	        indexLine.enter().append('rect').attr('class', 'nv-indexLine')
	            .attr('width', 3)
	            .attr('x', -2)
	            .attr('fill', 'red')
	            .attr('fill-opacity', .5)
	            .call(indexDrag)

	        indexLine
	            .attr('transform', function(d) { return 'translate(' + dx(d.i) + ',0)' })
	            .attr('height', availableHeight)



	        xAxis
	          .scale(x)
	          .ticks( availableWidth / 100 )
	          .tickSize(-availableHeight, 0);

	        g.select('.nv-x.nv-axis')
	            .attr('transform', 'translate(0,' + y.range()[0] + ')');
	        d3.transition(g.select('.nv-x.nv-axis'))
	            .call(xAxis);


	        yAxis
	          .scale(y)
	          .ticks( availableHeight / 36 )
	          .tickSize( -availableWidth, 0);

	        d3.transition(g.select('.nv-y.nv-axis'))
	            .call(yAxis);



	        //============================================================
	        // Event Handling/Dispatching (in chart's scope)
	        //------------------------------------------------------------

	        controls.dispatch.on('legendClick', function(d,i) { 
	          d.disabled = !d.disabled;
	          rescaleY = !d.disabled;

	          //console.log(d,i,arguments);

	          selection.transition().call(chart);
	        });


	        legend.dispatch.on('legendClick', function(d,i) { 
	          d.disabled = !d.disabled;

	          if (!data.filter(function(d) { return !d.disabled }).length) {
	            data.map(function(d) {
	              d.disabled = false;
	              wrap.selectAll('.nv-series').classed('disabled', false);
	              return d;
	            });
	          }

	          selection.transition().call(chart);
	        });

	  /*
	        //
	        legend.dispatch.on('legendMouseover', function(d, i) {
	          d.hover = true;
	          selection.transition().call(chart)
	        });

	        legend.dispatch.on('legendMouseout', function(d, i) {
	          d.hover = false;
	          selection.transition().call(chart)
	        });
	  */

	        dispatch.on('tooltipShow', function(e) {
	          if (tooltips) showTooltip(e, that.parentNode);
	        });


	      });


	      //TODO: decide if this is a good idea, and if it should be in all models
	      chart.update = function() { chart(selection) };
	      chart.container = this; // I need a reference to the container in order to have outside code check if the chart is visible or not


	      return chart;
	    }


	    //============================================================
	    // Event Handling/Dispatching (out of chart's scope)
	    //------------------------------------------------------------

	    lines.dispatch.on('elementMouseover.tooltip', function(e) {
	      e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
	      dispatch.tooltipShow(e);
	    });

	    lines.dispatch.on('elementMouseout.tooltip', function(e) {
	      dispatch.tooltipHide(e);
	    });

	    dispatch.on('tooltipHide', function() {
	      if (tooltips) nv.tooltip.cleanup();
	    });


	    //============================================================
	    // Global getters and setters
	    //------------------------------------------------------------

	    chart.dispatch = dispatch;
	    chart.legend = legend;
	    chart.xAxis = xAxis;
	    chart.yAxis = yAxis;

	    d3.rebind(chart, lines, 'defined', 'isArea', 'x', 'y', 'size', 'xDomain', 'yDomain', 'forceX', 'forceY', 'interactive', 'clipEdge', 'clipVoronoi', 'id');


	    chart.margin = function(_) {
	      if (!arguments.length) return margin;
	      margin = _;
	      return chart;
	    };

	    chart.width = function(_) {
	      if (!arguments.length) return width;
	      width = _;
	      return chart;
	    };

	    chart.height = function(_) {
	      if (!arguments.length) return height;
	      height = _;
	      return chart;
	    };

	    chart.color = function(_) {
	      if (!arguments.length) return color;
	      color = nv.utils.getColor(_);
	      legend.color(color);
	      return chart;
	    };

	    chart.showLegend = function(_) {
	      if (!arguments.length) return showLegend;
	      showLegend = _;
	      return chart;
	    };

	    chart.tooltips = function(_) {
	      if (!arguments.length) return tooltips;
	      tooltips = _;
	      return chart;
	    };

	    chart.tooltipContent = function(_) {
	      if (!arguments.length) return tooltip;
	      tooltip = _;
	      return chart;
	    };

	    chart.noData = function(_) {
	      if (!arguments.length) return noData;
	      noData = _;
	      return chart;
	    };



	    //============================================================
	    // Functions
	    //------------------------------------------------------------

	    /* Normalize the data according to an index point. */
	    function indexify(idx, data) {
	      return data.map(function(line, i) {
	        var v = lines.y()(line.values[idx], idx);

	        line.values = line.values.map(function(point, pointIndex) {
	          point.display = {'y': (lines.y()(point, pointIndex) - v) / (1 + v) };
	          return point;
	        })
	        /*
	        if (v < -.9) {
	          //if a series loses more than 100%, calculations fail.. anything close can cause major distortion (but is mathematically currect till it hits 100)
	        }
	        */
	        return line;
	      })
	    }


	    return chart;
	  }

	  nv.models.discreteBar = function() {

	    //============================================================
	    // Public Variables with Default Settings
	    //------------------------------------------------------------

	    var margin = {top: 0, right: 0, bottom: 0, left: 0},
	        width = 960,
	        height = 500,
	        id = Math.floor(Math.random() * 10000), //Create semi-unique ID in case user doesn't select one
	        x = d3.scale.ordinal(),
	        y = d3.scale.linear(),
	        getX = function(d) { return d.x },
	        getY = function(d) { return d.y },
	        forceY = [0], // 0 is forced by default.. this makes sense for the majority of bar graphs... user can always do chart.forceY([]) to remove
	        color = nv.utils.defaultColor(),
	        showValues = false,
	        valueFormat = d3.format(',.2f'),
	        xDomain, yDomain;


	    //============================================================
	    // Private Variables
	    //------------------------------------------------------------

	    var dispatch = d3.dispatch('chartClick', 'elementClick', 'elementDblClick', 'elementMouseover', 'elementMouseout'),
	        x0, y0;


	    function chart(selection) {
	      selection.each(function(data) {
	        var availableWidth = width - margin.left - margin.right,
	            availableHeight = height - margin.top - margin.bottom;


	        //add series index to each data point for reference
	        data = data.map(function(series, i) {
	          series.values = series.values.map(function(point) {
	            point.series = i;
	            return point;
	          });
	          return series;
	        });


	        var seriesData = (xDomain && yDomain) ? [] : // if we know xDomain and yDomain, no need to calculate
	              data.map(function(d) {
	                return d.values.map(function(d,i) {
	                  return { x: getX(d,i), y: getY(d,i), y0: d.y0 }
	                })
	              });

	        x   .domain(xDomain || d3.merge(seriesData).map(function(d) { return d.x }))
	            .rangeBands([0, availableWidth], .1);

	        y   .domain(yDomain || d3.extent(d3.merge(seriesData).map(function(d) { return d.y }).concat(forceY)));


	        // If showValues, pad the Y axis range to account for label height
	        if (showValues) y.range([availableHeight - (y.domain()[0] < 0 ? 12 : 0), y.domain()[1] > 0 ? 12 : 0]);
	        else y.range([availableHeight, 0]);

	        //store old scales if they exist
	        x0 = x0 || x;
	        y0 = y0 || y.copy().range([y(0),y(0)]);


	        var wrap = d3.select(this).selectAll('g.nv-wrap.nv-discretebar').data([data]);
	        var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-discretebar');
	        var gEnter = wrapEnter.append('g');

	        gEnter.append('g').attr('class', 'nv-groups');

	        var g = wrap.select('g')
	        wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');



	        //TODO: by definition, the discrete bar should not have multiple groups, will modify/remove later
	        var groups = wrap.select('.nv-groups').selectAll('.nv-group')
	            .data(function(d) { return d }, function(d) { return d.key });
	        groups.enter().append('g')
	            .style('stroke-opacity', 1e-6)
	            .style('fill-opacity', 1e-6);
	        d3.transition(groups.exit())
	            .style('stroke-opacity', 1e-6)
	            .style('fill-opacity', 1e-6)
	            .remove();
	        groups
	            .attr('class', function(d,i) { return 'nv-group nv-series-' + i })
	            .classed('hover', function(d) { return d.hover });
	        d3.transition(groups)
	            .style('stroke-opacity', 1)
	            .style('fill-opacity', .75);


	        var bars = groups.selectAll('g.nv-bar')
	            .data(function(d) { return d.values });

	        bars.exit().remove();


	        var barsEnter = bars.enter().append('g')
	            .attr('transform', function(d,i,j) {
	                return 'translate(' + x(getX(d,i)) + ', ' + y(0) + ')' 
	            })
	            .on('mouseover', function(d,i) { //TODO: figure out why j works above, but not here
	              d3.select(this).classed('hover', true);
	              dispatch.elementMouseover({
	                value: getY(d,i),
	                point: d,
	                series: data[d.series],
	                pos: [x(getX(d,i)) + (x.rangeBand() * (d.series + .5) / data.length), y(getY(d,i))],  // TODO: Figure out why the value appears to be shifted
	                pointIndex: i,
	                seriesIndex: d.series,
	                e: d3.event
	              });
	            })
	            .on('mouseout', function(d,i) {
	              d3.select(this).classed('hover', false);
	              dispatch.elementMouseout({
	                value: getY(d,i),
	                point: d,
	                series: data[d.series],
	                pointIndex: i,
	                seriesIndex: d.series,
	                e: d3.event
	              });
	            })
	            .on('click', function(d,i) {
	              dispatch.elementClick({
	                value: getY(d,i),
	                point: d,
	                series: data[d.series],
	                pos: [x(getX(d,i)) + (x.rangeBand() * (d.series + .5) / data.length), y(getY(d,i))],  // TODO: Figure out why the value appears to be shifted
	                pointIndex: i,
	                seriesIndex: d.series,
	                e: d3.event
	              });
	              d3.event.stopPropagation();
	            })
	            .on('dblclick', function(d,i) {
	              dispatch.elementDblClick({
	                value: getY(d,i),
	                point: d,
	                series: data[d.series],
	                pos: [x(getX(d,i)) + (x.rangeBand() * (d.series + .5) / data.length), y(getY(d,i))],  // TODO: Figure out why the value appears to be shifted
	                pointIndex: i,
	                seriesIndex: d.series,
	                e: d3.event
	              });
	              d3.event.stopPropagation();
	            });

	        barsEnter.append('rect')
	            .attr('height', 0)
	            .attr('width', x.rangeBand() / data.length )
	            .style('fill', function(d,i){  return d.color || color(d, i) }) 
	            .style('stroke', function(d,i){ return d.color || color(d, i)});

	        if (showValues) {
	          barsEnter.append('text')
	            .attr('text-anchor', 'middle')
	          bars.selectAll('text')
	            .attr('x', x.rangeBand() / 2)
	            .attr('y', function(d,i) { return getY(d,i) < 0 ? y(getY(d,i)) - y(0) + 12 : -4 })
	            .text(function(d,i) { return valueFormat(getY(d,i)) });
	        } else {
	          bars.selectAll('text').remove();
	        }

	        bars
	            .attr('class', function(d,i) { return getY(d,i) < 0 ? 'nv-bar negative' : 'nv-bar positive'})
	            //.attr('transform', function(d,i) { return 'translate(' + x(getX(d,i)) + ',0)'; })
	            .attr('transform', function(d,i) {
	                return 'translate(' + x(getX(d,i)) + ', ' + (getY(d,i) < 0 ? y0(0) : y0(getY(d,i))) + ')' 
	            })
	          .selectAll('rect')
	            .attr('width', x.rangeBand() / data.length);
	        d3.transition(bars)
	          //.delay(function(d,i) { return i * 1200 / data[0].values.length })
	            .attr('transform', function(d,i) {
	                return 'translate(' + x(getX(d,i)) + ', ' + (getY(d,i) < 0 ? y(0) : y(getY(d,i))) + ')' 
	            })
	          .selectAll('rect')
	            .attr('height', function(d,i) {
	               return Math.abs(y(getY(d,i)) - y(0))
	             });



	        //TODO: decide if this makes sense to add into all the models for ease of updating (updating without needing the selection)
	        chart.update = function() { chart(selection) };

	        //store old scales for use in transitions on update, to animate from old to new positions, and sizes
	        x0 = x.copy();
	        y0 = y.copy();

	      });

	      return chart;
	    }


	    chart.dispatch = dispatch;

	    chart.x = function(_) {
	      if (!arguments.length) return getX;
	      getX = _;
	      return chart;
	    };

	    chart.y = function(_) {
	      if (!arguments.length) return getY;
	      getY = _;
	      return chart;
	    };

	    chart.margin = function(_) {
	      if (!arguments.length) return margin;
	      margin = _;
	      return chart;
	    };

	    chart.width = function(_) {
	      if (!arguments.length) return width;
	      width = _;
	      return chart;
	    };

	    chart.height = function(_) {
	      if (!arguments.length) return height;
	      height = _;
	      return chart;
	    };

	    chart.xScale = function(_) {
	      if (!arguments.length) return x;
	      x = _;
	      return chart;
	    };

	    chart.yScale = function(_) {
	      if (!arguments.length) return y;
	      y = _;
	      return chart;
	    };

	    chart.xDomain = function(_) {
	      if (!arguments.length) return xDomain;
	      xDomain = _;
	      return chart;
	    };

	    chart.yDomain = function(_) {
	      if (!arguments.length) return yDomain;
	      yDomain = _;
	      return chart;
	    };

	    chart.forceY = function(_) {
	      if (!arguments.length) return forceY;
	      forceY = _;
	      return chart;
	    };

	    chart.color = function(_) {
	      if (!arguments.length) return color;
	      color = nv.utils.getColor(_);
	      return chart;
	    };

	    chart.id = function(_) {
	      if (!arguments.length) return id;
	      id = _;
	      return chart;
	    };

	    chart.showValues = function(_) {
	      if (!arguments.length) return showValues;
	      showValues = _;
	      return chart;
	    };

	    chart.valueFormat= function(_) {
	      if (!arguments.length) return valueFormat;
	      valueFormat = _;
	      return chart;
	    };


	    return chart;
	  }

	  nv.models.discreteBarChart = function() {
	    var margin = {top: 10, right: 10, bottom: 50, left: 60},
	        width = null,
	        height = null,
	        color = nv.utils.getColor(), //a function that gets color for a datum
	        staggerLabels = false,
	        tooltips = true,
	        tooltip = function(key, x, y, e, graph) { 
	          return '<h3>' + x + '</h3>' +
	                 '<p>' +  y + '</p>'
	        },
	        noData = "No Data Available."
	        ;


	    var discretebar = nv.models.discreteBar(),
	        x = discretebar.xScale(),
	        y = discretebar.yScale(),
	        xAxis = nv.models.axis().scale(x).orient('bottom').highlightZero(false).showMaxMin(false),
	        yAxis = nv.models.axis().scale(y).orient('left'),
	        dispatch = d3.dispatch('tooltipShow', 'tooltipHide');

	    xAxis.tickFormat(function(d) { return d });
	    yAxis.tickFormat(d3.format(',.1f'));


	    var showTooltip = function(e, offsetElement) {
	      var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
	          top = e.pos[1] + ( offsetElement.offsetTop || 0),
	          x = xAxis.tickFormat()(discretebar.x()(e.point, e.pointIndex)),
	          y = yAxis.tickFormat()(discretebar.y()(e.point, e.pointIndex)),
	          content = tooltip(e.series.key, x, y, e, chart);

	      nv.tooltip.show([left, top], content, e.value < 0 ? 'n' : 's', null, offsetElement);
	    };


	    //TODO: let user select default
	    var controlsData = [
	      { key: 'Grouped' },
	      { key: 'Stacked', disabled: true }
	    ];

	    function chart(selection) {
	      selection.each(function(data) {
	        var container = d3.select(this),
	            that = this;

	        var availableWidth = (width  || parseInt(container.style('width')) || 960)
	                               - margin.left - margin.right,
	            availableHeight = (height || parseInt(container.style('height')) || 400)
	                               - margin.top - margin.bottom;


	        //------------------------------------------------------------
	        // Display No Data message if there's nothing to show.

	        if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
	          container.append('text')
	            .attr('class', 'nvd3 nv-noData')
	            .attr('x', availableWidth / 2)
	            .attr('y', availableHeight / 2)
	            .attr('dy', '-.7em')
	            .style('text-anchor', 'middle')
	            .text(noData);
	            return chart;
	        } else {
	          container.select('.nv-noData').remove();
	        }

	        //------------------------------------------------------------


	        discretebar
	          .width(availableWidth)
	          .height(availableHeight);


	        var wrap = container.selectAll('g.nv-wrap.nv-discreteBarWithAxes').data([data]);
	        var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-discreteBarWithAxes').append('g');
	        var defsEnter = gEnter.append('defs');

	        gEnter.append('g').attr('class', 'nv-x nv-axis');
	        gEnter.append('g').attr('class', 'nv-y nv-axis');
	        gEnter.append('g').attr('class', 'nv-barsWrap');



	        var g = wrap.select('g');


	        g.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	        var barsWrap = g.select('.nv-barsWrap')
	            .datum(data.filter(function(d) { return !d.disabled }))


	        d3.transition(barsWrap).call(discretebar);


	        defsEnter.append('clipPath')
	            .attr('id', 'nv-x-label-clip-' + discretebar.id())
	          .append('rect')

	        g.select('#nv-x-label-clip-' + discretebar.id() + ' rect')
	            .attr('width', x.rangeBand() * (staggerLabels ? 2 : 1))
	            .attr('height', 16)
	            .attr('x', -x.rangeBand() / (staggerLabels ? 1 : 2 ));


	        xAxis
	          .ticks( availableWidth / 100 )
	          .tickSize(-availableHeight, 0);

	        g.select('.nv-x.nv-axis')
	            .attr('transform', 'translate(0,' + (y.range()[0] + ((discretebar.showValues() && y.domain()[0] < 0) ? 16 : 0)) + ')')
	        //d3.transition(g.select('.x.axis'))
	        g.select('.nv-x.nv-axis').transition().duration(0)
	            .call(xAxis);


	        var xTicks = g.select('.nv-x.nv-axis').selectAll('g');

	        if (staggerLabels)
	          xTicks
	              .selectAll('text')
	              .attr('transform', function(d,i,j) { return 'translate(0,' + (j % 2 == 0 ? '0' : '12') + ')' })

	        yAxis
	          .ticks( availableHeight / 36 )
	          .tickSize( -availableWidth, 0);

	        d3.transition(g.select('.nv-y.nv-axis'))
	            .call(yAxis);


	        discretebar.dispatch.on('elementMouseover.tooltip', function(e) {
	          e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
	          dispatch.tooltipShow(e);
	        });
	        if (tooltips) dispatch.on('tooltipShow', function(e) { showTooltip(e, that.parentNode) } ); // TODO: maybe merge with above?

	        discretebar.dispatch.on('elementMouseout.tooltip', function(e) {
	          dispatch.tooltipHide(e);
	        });
	        if (tooltips) dispatch.on('tooltipHide', nv.tooltip.cleanup);


	        //TODO: decide if this makes sense to add into all the models for ease of updating (updating without needing the selection)
	        chart.update = function() { selection.transition().call(chart); };
	        chart.container = this; // I need a reference to the container in order to have outside code check if the chart is visible or not

	      });

	      return chart;
	    }


	    chart.dispatch = dispatch;
	    chart.discretebar = discretebar; // really just makign the accessible for discretebar.dispatch, may rethink slightly
	    chart.xAxis = xAxis;
	    chart.yAxis = yAxis;

	    d3.rebind(chart, discretebar, 'x', 'y', 'xDomain', 'yDomain', 'forceX', 'forceY', 'id', 'showValues', 'valueFormat');


	    chart.margin = function(_) {
	      if (!arguments.length) return margin;
	      margin = _;
	      return chart;
	    };

	    chart.width = function(_) {
	      if (!arguments.length) return width;
	      width = _;
	      return chart;
	    };

	    chart.height = function(_) {
	      if (!arguments.length) return height;
	      height = _;
	      return chart;
	    };

	    chart.color = function(_) {
	      if (!arguments.length) return color;
	      color = nv.utils.getColor(_);
	      discretebar.color(color);
	      return chart;
	    };

	    chart.staggerLabels = function(_) {
	      if (!arguments.length) return staggerLabels;
	      staggerLabels = _;
	      return chart;
	    };

	    chart.tooltips = function(_) {
	      if (!arguments.length) return tooltips;
	      tooltips = _;
	      return chart;
	    };

	    chart.tooltipContent = function(_) {
	      if (!arguments.length) return tooltip;
	      tooltip = _;
	      return chart;
	    };

	    chart.noData = function(_) {
	      if (!arguments.length) return noData;
	      noData = _;
	      return chart;
	    };


	    return chart;
	  }

	  nv.models.distribution = function() {
	    var margin = {top: 0, right: 0, bottom: 0, left: 0},
	        width = 400, //technically width or height depending on x or y....
	        size = 8,
	        axis = 'x', // 'x' or 'y'... horizontal or vertical
	        getData = function(d) { return d[axis] },  // defaults d.x or d.y
	        color = nv.utils.defaultColor(),
	        domain;

	    var scale = d3.scale.linear(),
	        scale0;

	    function chart(selection) {
	      selection.each(function(data) {
	        var availableLength = width - (axis === 'x' ? margin.left + margin.right : margin.top + margin.bottom),
	            naxis = axis == 'x' ? 'y' : 'x';


	        //store old scales if they exist
	        scale0 = scale0 || scale;

	  /*
	        scale
	            .domain(domain || d3.extent(data, getData))
	            .range(axis == 'x' ? [0, availableLength] : [availableLength,0]);
	  */


	        var wrap = d3.select(this).selectAll('g.nv-distribution').data([data]);
	        var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-distribution');
	        var gEnter = wrapEnter.append('g');
	        var g = wrap.select('g');

	        wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

	        var distWrap = g.selectAll('g.nv-dist')
	            .data(function(d) { return d }, function(d) { return d.key });

	        distWrap.enter().append('g')
	        distWrap
	            .attr('class', function(d,i) { return 'nv-dist nv-series-' + i })
	            .style('stroke', function(d,i) { return color(d, i) });
	            //.style('stroke', function(d,i) { return color.filter(function(d,i) { return data[i] && !data[i].disabled })[i % color.length] });

	        var dist = distWrap.selectAll('line.nv-dist' + axis)
	            .data(function(d) { return d.values })
	        dist.enter().append('line')
	            .attr(axis + '1', function(d,i) { return scale0(getData(d,i)) })
	            .attr(axis + '2', function(d,i) { return scale0(getData(d,i)) })
	        d3.transition(distWrap.exit().selectAll('line.nv-dist' + axis))
	            .attr(axis + '1', function(d,i) { return scale(getData(d,i)) })
	            .attr(axis + '2', function(d,i) { return scale(getData(d,i)) })
	            .style('stroke-opacity', 0)
	            .remove();
	        dist
	        //distWrap.selectAll('line.dist' + axis)
	            .attr('class', function(d,i) { return 'nv-dist' + axis + ' nv-dist' + axis + '-' + i })
	            .attr(naxis + '1', 0)
	            .attr(naxis + '2', size);
	        d3.transition(dist)
	        //d3.transition(distWrap.selectAll('line.dist' + axis))
	            .attr(axis + '1', function(d,i) { return scale(getData(d,i)) })
	            .attr(axis + '2', function(d,i) { return scale(getData(d,i)) })


	        scale0 = scale.copy();

	      });

	      return chart;
	    }


	    chart.margin = function(_) {
	      if (!arguments.length) return margin;
	      margin = _;
	      return chart;
	    };

	    chart.width = function(_) {
	      if (!arguments.length) return width;
	      width = _;
	      return chart;
	    };

	    chart.axis = function(_) {
	      if (!arguments.length) return axis;
	      axis = _;
	      return chart;
	    };

	    chart.size = function(_) {
	      if (!arguments.length) return size;
	      size = _;
	      return chart;
	    };

	    chart.getData = function(_) {
	      if (!arguments.length) return getData;
	      getData = d3.functor(_);
	      return chart;
	    };

	    chart.scale = function(_) {
	      if (!arguments.length) return scale;
	      scale = _;
	      return chart;
	    };

	    chart.color = function(_) {
	      if (!arguments.length) return color;
	      color = nv.utils.getColor(_);
	      return chart;
	    };

	    return chart;
	  }

	  //TODO: Finish merging this chart into the NVD3 style!
	  nv.models.indentedTree = function() {
	    //Default Settings
	    var margin = {top: 0, right: 0, bottom: 0, left: 0}, //TODO: implement, maybe as margin on the containing div
	        width = 960,
	        height = 500,
	        color = nv.utils.defaultColor(),
	        id = Math.floor(Math.random() * 10000), 
	        header = true,
	        noResultsText = 'No Results found.'
	        childIndent = 20,
	        columns = [{key:'key', label: 'Name', type:'text'}], //TODO: consider functions like chart.addColumn, chart.removeColumn, instead of a block like this
	        tableClass = null,
	        iconOpen = 'images/grey-plus.png', //TODO: consider removing this and replacing with a '+' or '-' unless user defines images
	        iconClose = 'images/grey-minus.png';


	    var dispatch = d3.dispatch('elementClick', 'elementDblclick', 'elementMouseover', 'elementMouseout');


	    function chart(selection) {
	      selection.each(function(data) {
	        var availableWidth = width - margin.left - margin.right,  //TODO: decide if there is any use for these
	            availableHeight = height - margin.top - margin.bottom;


	        chart.update = function() { selection.transition().call(chart) };

	        var i = 0,
	            depth = 1;

	        var tree = d3.layout.tree()
	            .children(function(d) { return d.values })
	            .size([height, childIndent]); //Not sure if this is needed now that the result is HTML


	        if (!data[0].key) data[0].key = noResultsText;

	        var nodes = tree.nodes(data[0]);


	        var wrap = d3.select(this).selectAll('div').data([[nodes]]);
	        var wrapEnter = wrap.enter().append('div').attr('class', 'nvd3 nv-wrap nv-indentedtree');
	        var tableEnter = wrapEnter.append('table');
	        var table = wrap.select('table').attr('width', '100%').attr('class', tableClass);



	        if (header) {
	          var thead = tableEnter.append('thead');

	          var theadRow1 = thead.append('tr');

	          columns.forEach(function(column) {
	            theadRow1
	              .append('th')
	                .attr('width', column.width ? column.width : '10%')
	                .style('text-align', column.type == 'numeric' ? 'right' : 'left')
	              .append('span')
	                .text(column.label);
	          });
	        }


	        var tbody = table.selectAll('tbody')
	                      .data(function(d) {return d });
	        tbody.enter().append('tbody');



	        //compute max generations
	        depth = d3.max(nodes, function(node) { return node.depth });
	        tree.size([height, depth * childIndent]); //TODO: see if this is necessary at all


	        // Update the nodes…
	        var node = tbody.selectAll('tr')
	            .data(function(d) { return d }, function(d) { return d.id || (d.id == ++i)});
	            //.style('display', 'table-row'); //TODO: see if this does anything

	        node.exit().remove();


	        node.select('img.nv-treeicon')
	            .attr('src', icon)
	            .classed('folded', folded);

	        var nodeEnter = node.enter().append('tr');


	        columns.forEach(function(column, index) {

	          var nodeName = nodeEnter.append('td')
	              .style('padding-left', function(d) { return (index ? 0 : d.depth * childIndent + 12 + (icon(d) ? 0 : 16)) + 'px' }, 'important') //TODO: check why I did the ternary here
	              .style('text-align', column.type == 'numeric' ? 'right' : 'left');


	          if (index == 0) {
	            nodeName.append('img')
	                .classed('nv-treeicon', true)
	                .classed('nv-folded', folded)
	                .attr('src', icon)
	                .style('width', '14px')
	                .style('height', '14px')
	                .style('padding', '0 1px')
	                .style('display', function(d) { return icon(d) ? 'inline-block' : 'none'; })
	                .on('click', click);
	          }


	          nodeName.append('span')
	              .attr('class', d3.functor(column.classes) )
	              .text(function(d) { return column.format ? column.format(d) :
	                                          (d[column.key] || '-') });

	          if  (column.showCount)
	            nodeName.append('span')
	                .attr('class', 'nv-childrenCount')
	                .text(function(d) {
	                  return ((d.values && d.values.length) || (d._values && d._values.length)) ?
	                      '(' + ((d.values && d.values.length) || (d._values && d._values.length)) + ')'
	                    : ''
	                });


	          if (column.click)
	            nodeName.select('span').on('click', column.click);

	        });


	        node
	          .order()
	          .on('click', function(d) { 
	            dispatch.elementClick({
	              row: this, //TODO: decide whether or not this should be consistent with scatter/line events
	              data: d,
	              pos: [d.x, d.y]
	            });
	          })
	          .on('dblclick', function(d) { 
	            dispatch.elementDblclick({
	              row: this,
	              data: d,
	              pos: [d.x, d.y]
	            });
	          })
	          .on('mouseover', function(d) { 
	            dispatch.elementMouseover({
	              row: this,
	              data: d,
	              pos: [d.x, d.y]
	            });
	          })
	          .on('mouseout', function(d) { 
	            dispatch.elementMouseout({
	              row: this,
	              data: d,
	              pos: [d.x, d.y]
	            });
	          });




	        // Toggle children on click.
	        function click(d, _, unshift) {
	          d3.event.stopPropagation();

	          if(d3.event.shiftKey && !unshift) {
	            //If you shift-click, it'll toggle fold all the children, instead of itself
	            d3.event.shiftKey = false;
	            d.values && d.values.forEach(function(node){
	              if (node.values || node._values) {
	                click(node, 0, true);
	              }
	            });
	            return true;
	          }
	          if(!hasChildren(d)) {
	            //download file
	            //window.location.href = d.url;
	            return true;
	          }
	          if (d.values) {
	            d._values = d.values;
	            d.values = null;
	          } else {
	            d.values = d._values;
	            d._values = null;
	          }
	          chart.update();
	        }


	        function icon(d) {
	          return (d._values && d._values.length) ? iconOpen : (d.values && d.values.length) ? iconClose : '';
	        }

	        function folded(d) {
	          return (d._values && d._values.length);
	        }

	        function hasChildren(d) {
	          var values = d.values || d._values;

	          return (values && values.length);
	        }

	      });

	      return chart;
	    }




	    chart.margin = function(_) {
	      if (!arguments.length) return margin;
	      margin = _;
	      return chart;
	    };

	    chart.width = function(_) {
	      if (!arguments.length) return width;
	      width = _;
	      return chart;
	    };

	    chart.height = function(_) {
	      if (!arguments.length) return height;
	      height = _;
	      return chart;
	    };

	    chart.color = function(_) {
	      if (!arguments.length) return color;
	      color = nv.utils.getColor(_);
	      scatter.color(color);
	      return chart;
	    };

	    chart.id = function(_) {
	      if (!arguments.length) return id;
	      id = _;
	      return chart;
	    };

	    chart.header = function(_) {
	      if (!arguments.length) return header;
	      header = _;
	      return chart;
	    };

	    chart.noResultsText = function(_) {
	      if (!arguments.length) return noResultsText;
	      noResultsText = _;
	      return chart;
	    };

	    chart.columns = function(_) {
	      if (!arguments.length) return columns;
	      columns = _;
	      return chart;
	    };

	    chart.tableClass = function(_) {
	      if (!arguments.length) return tableClass;
	      tableClass = _;
	      return chart;
	    };

	    chart.iconOpen = function(_){
	       if (!arguments.length) return iconOpen;
	      iconOpen = _;
	      return chart;
	    }

	    chart.iconClose = function(_){
	       if (!arguments.length) return iconClose;
	      iconClose = _;
	      return chart;
	    }

	    return chart;
	  }

	  nv.models.legend = function() {
	    var margin = {top: 5, right: 0, bottom: 5, left: 0},
	        width = 400,
	        height = 20,
	        getKey = function(d) { return d.key },
	        color = nv.utils.defaultColor(),
	        align = true;

	    var dispatch = d3.dispatch('legendClick', 'legendDblclick', 'legendMouseover', 'legendMouseout'); //TODO: theres are really element or series events, there are currently no 'LEGEND' events (as in entire legend)... decide if they are needed

	    function chart(selection) {
	      selection.each(function(data) {
	        var availableWidth = width - margin.left - margin.right;

	        var wrap = d3.select(this).selectAll('g.nv-legend').data([data]);
	        var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-legend').append('g');


	        var g = wrap.select('g')
	            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


	        var series = g.selectAll('.nv-series')
	            .data(function(d) { return d });
	        var seriesEnter = series.enter().append('g').attr('class', 'nv-series')
	            .on('mouseover', function(d,i) {
	              dispatch.legendMouseover(d,i);  //TODO: Make consistent with other event objects
	            })
	            .on('mouseout', function(d,i) {
	              dispatch.legendMouseout(d,i);
	            })
	            .on('click', function(d,i) {
	              dispatch.legendClick(d,i);
	            })
	            .on('dblclick', function(d,i) {
	              dispatch.legendDblclick(d,i);
	            });
	        seriesEnter.append('circle')
	            .style('fill', function(d,i) { return d.color || color(d,i)})
	            .style('stroke', function(d,i) { return d.color || color(d, i) })
	            .style('stroke-width', 2)
	            .attr('r', 5);
	        seriesEnter.append('text')
	            .text(getKey)
	            .attr('text-anchor', 'start')
	            .attr('dy', '.32em')
	            .attr('dx', '8');
	        series.classed('disabled', function(d) { return d.disabled });
	        series.exit().remove();


	        //TODO: implement fixed-width and max-width options (max-width is especially useful with the align option)


	        // NEW ALIGNING CODE, TODO: drastically clean up ... this is just the ugly initial code to make sure the math is right
	        if (align) {
	          var seriesWidths = [];
	          series.each(function(d,i) {
	                seriesWidths.push(d3.select(this).select('text').node().getComputedTextLength() + 28); // 28 is ~ the width of the circle plus some padding
	              });

	          //console.log('Series Widths: ', JSON.stringify(seriesWidths));

	          var seriesPerRow = 0;
	          var legendWidth = 0;
	          var columnWidths = [];

	          while ( legendWidth < availableWidth && seriesPerRow < seriesWidths.length) {
	            columnWidths[seriesPerRow] = seriesWidths[seriesPerRow];
	            legendWidth += seriesWidths[seriesPerRow++];
	          }


	          while ( legendWidth > availableWidth && seriesPerRow > 1 ) {
	            columnWidths = [];
	            seriesPerRow--;

	            for (k = 0; k < seriesWidths.length; k++) {
	              if (seriesWidths[k] > (columnWidths[k % seriesPerRow] || 0) )
	                columnWidths[k % seriesPerRow] = seriesWidths[k];
	            }

	            legendWidth = columnWidths.reduce(function(prev, cur, index, array) {
	                            return prev + cur;
	                          });
	          }
	          //console.log(columnWidths, legendWidth, seriesPerRow);

	          var xPositions = [];
	          for (var i = 0, curX = 0; i < seriesPerRow; i++) {
	              xPositions[i] = curX;
	              curX += columnWidths[i];
	          }

	          series
	              .attr('transform', function(d, i) {
	                return 'translate(' + xPositions[i % seriesPerRow] + ',' + (5 + Math.floor(i / seriesPerRow) * 20) + ')';
	              });

	          //position legend as far right as possible within the total width
	          g.attr('transform', 'translate(' + (width - margin.right - legendWidth) + ',' + margin.top + ')');

	          height = margin.top + margin.bottom + (Math.ceil(seriesWidths.length / seriesPerRow) * 20);
	        } else {

	          var ypos = 5,
	              newxpos = 5,
	              maxwidth = 0,
	              xpos;
	          series
	              .attr('transform', function(d, i) {
	                var length = d3.select(this).select('text').node().getComputedTextLength() + 28;
	                xpos = newxpos;

	                if (width < margin.left + margin.right + xpos + length) {
	                  newxpos = xpos = 5;
	                  ypos += 20;
	                }

	                newxpos += length;
	                if (newxpos > maxwidth) maxwidth = newxpos;

	                return 'translate(' + xpos + ',' + ypos + ')';
	              });

	          //position legend as far right as possible within the total width
	          g.attr('transform', 'translate(' + (width - margin.right - maxwidth) + ',' + margin.top + ')');

	          height = margin.top + margin.bottom + ypos + 15;
	        }




	      });

	      return chart;
	    }


	    chart.dispatch = dispatch;

	    chart.margin = function(_) {
	      if (!arguments.length) return margin;
	      margin = _;
	      return chart;
	    };

	    chart.width = function(_) {
	      if (!arguments.length) return width;
	      width = _;
	      return chart;
	    };

	    chart.height = function(_) {
	      if (!arguments.length) return height;
	      height = _;
	      return chart;
	    };

	    chart.key = function(_) {
	      if (!arguments.length) return getKey;
	      getKey = _;
	      return chart;
	    };

	    chart.color = function(_) {
	      if (!arguments.length) return color;
	      color = nv.utils.getColor(_);
	      return chart;
	    };

	    chart.align = function(_) {
	      if (!arguments.length) return align;
	      align = _;
	      return chart;
	    };

	    return chart;
	  }

	  nv.models.line = function() {

	    //============================================================
	    // Public Variables with Default Settings
	    //------------------------------------------------------------

	    var margin = {top: 0, right: 0, bottom: 0, left: 0},
	        width = 960,
	        height = 500,
	        color = nv.utils.defaultColor(), // a function that returns a color
	        id = Math.floor(Math.random() * 10000), //Create semi-unique ID incase user doesn't select one
	        getX = function(d) { return d.x }, // accessor to get the x value from a data point
	        getY = function(d) { return d.y }, // accessor to get the y value from a data point
	        defined = function(d,i) { return !isNaN(getY(d,i)) && getY(d,i) !== null }, // allows a line to be not continous when it is not defined
	        isArea = function(d) { return d.area }, // decides if a line is an area or just a line
	        clipEdge = false, // if true, masks lines within x and y scale
	        x, y, //can be accessed via chart.scatter.[x/y]Scale()
	        interpolate = "linear"; // controls the line interpolation


	    //============================================================
	    // Private Variables
	    //------------------------------------------------------------

	    var scatter = nv.models.scatter()
	                    .id(id)
	                    .size(16) // default size
	                    .sizeDomain([16,256]), //set to speed up calculation, needs to be unset if there is a cstom size accessor
	        x0, y0,
	        timeoutID;


	    function chart(selection) {
	      selection.each(function(data) {
	        var availableWidth = width - margin.left - margin.right,
	            availableHeight = height - margin.top - margin.bottom,
	            container = d3.select(this);

	        x = scatter.xScale();
	        y = scatter.yScale();

	        x0 = x0 || x;
	        y0 = y0 || y;


	        var wrap = container.selectAll('g.nv-wrap.nv-line').data([data]);
	        var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-line');
	        var defsEnter = wrapEnter.append('defs');
	        var gEnter = wrapEnter.append('g');
	        var g = wrap.select('g')

	        gEnter.append('g').attr('class', 'nv-groups');
	        gEnter.append('g').attr('class', 'nv-scatterWrap');

	        var scatterWrap = wrap.select('.nv-scatterWrap');//.datum(data);


	        scatter
	          .width(availableWidth)
	          .height(availableHeight)

	        d3.transition(scatterWrap).call(scatter);



	        wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


	        defsEnter.append('clipPath')
	            .attr('id', 'nv-edge-clip-' + id)
	          .append('rect');

	        wrap.select('#nv-edge-clip-' + id + ' rect')
	            .attr('width', availableWidth)
	            .attr('height', availableHeight);

	        g   .attr('clip-path', clipEdge ? 'url(#nv-edge-clip-' + id + ')' : '');
	        scatterWrap
	            .attr('clip-path', clipEdge ? 'url(#nv-edge-clip-' + id + ')' : '');




	        var groups = wrap.select('.nv-groups').selectAll('.nv-group')
	            .data(function(d) { return d }, function(d) { return d.key });
	        groups.enter().append('g')
	            .style('stroke-opacity', 1e-6)
	            .style('fill-opacity', 1e-6);
	        d3.transition(groups.exit())
	            .style('stroke-opacity', 1e-6)
	            .style('fill-opacity', 1e-6)
	            .remove();
	        groups
	            .attr('class', function(d,i) { return 'nv-group nv-series-' + i })
	            .classed('hover', function(d) { return d.hover })
	            .style('fill', function(d,i){ return color(d, i) })
	            .style('stroke', function(d,i){ return color(d, i)});
	        d3.transition(groups)
	            .style('stroke-opacity', 1)
	            .style('fill-opacity', .5);



	        var areaPaths = groups.selectAll('path.nv-area')
	            .data(function(d) { return [d] }); // this is done differently than lines because I need to check if series is an area
	        areaPaths.enter().append('path')
	            .filter(isArea)
	            .attr('class', 'nv-area')
	            .attr('d', function(d) {
	              return d3.svg.area()
	                  .interpolate(interpolate)
	                  .defined(defined)
	                  .x(function(d,i) { return x0(getX(d,i)) })
	                  .y0(function(d,i) { return y0(getY(d,i)) })
	                  .y1(function(d,i) { return y0( y.domain()[0] <= 0 ? y.domain()[1] >= 0 ? 0 : y.domain()[1] : y.domain()[0] ) })
	                  //.y1(function(d,i) { return y0(0) }) //assuming 0 is within y domain.. may need to tweak this
	                  .apply(this, [d.values])
	            });
	        d3.transition(groups.exit().selectAll('path.nv-area'))
	            .attr('d', function(d) {
	              return d3.svg.area()
	                  .interpolate(interpolate)
	                  .defined(defined)
	                  .x(function(d,i) { return x0(getX(d,i)) })
	                  .y0(function(d,i) { return y0(getY(d,i)) })
	                  .y1(function(d,i) { return y0( y.domain()[0] <= 0 ? y.domain()[1] >= 0 ? 0 : y.domain()[1] : y.domain()[0] ) })
	                  //.y1(function(d,i) { return y0(0) }) //assuming 0 is within y domain.. may need to tweak this
	                  .apply(this, [d.values])
	            });
	        d3.transition(areaPaths.filter(isArea))
	            .attr('d', function(d) {
	              return d3.svg.area()
	                  .interpolate(interpolate)
	                  .defined(defined)
	                  .x(function(d,i) { return x0(getX(d,i)) })
	                  .y0(function(d,i) { return y0(getY(d,i)) })
	                  .y1(function(d,i) { return y0( y.domain()[0] <= 0 ? y.domain()[1] >= 0 ? 0 : y.domain()[1] : y.domain()[0] ) })
	                  //.y1(function(d,i) { return y0(0) }) //assuming 0 is within y domain.. may need to tweak this
	                  .apply(this, [d.values])
	            });



	        var linePaths = groups.selectAll('path.nv-line')
	            .data(function(d) { return [d.values] });
	        linePaths.enter().append('path')
	            .attr('class', function(d) { return 'nv-line' })
	            .attr('d',
	              d3.svg.line()
	                .interpolate(interpolate)
	                .defined(defined)
	                .x(function(d,i) { return x0(getX(d,i)) })
	                .y(function(d,i) { return y0(getY(d,i)) })
	            );
	        d3.transition(groups.exit().selectAll('path.nv-line'))
	            .attr('d',
	              d3.svg.line()
	                .interpolate(interpolate)
	                .defined(defined)
	                .x(function(d,i) { return x(getX(d,i)) })
	                .y(function(d,i) { return y(getY(d,i)) })
	            );
	        d3.transition(linePaths)
	            .attr('d',
	              d3.svg.line()
	                .interpolate(interpolate)
	                .defined(defined)
	                .x(function(d,i) { return x(getX(d,i)) })
	                .y(function(d,i) { return y(getY(d,i)) })
	            );



	        //store old scales for use in transitions on update
	        x0 = x.copy();
	        y0 = y.copy();

	      });

	      return chart;
	    }


	    //============================================================
	    // Global getters and setters
	    //------------------------------------------------------------

	    chart.dispatch = scatter.dispatch;

	    d3.rebind(chart, scatter, 'interactive', 'size', 'xScale', 'yScale', 'zScale', 'xDomain', 'yDomain', 'sizeDomain', 'forceX', 'forceY', 'forceSize', 'clipVoronoi', 'clipRadius');

	    chart.margin = function(_) {
	      if (!arguments.length) return margin;
	      margin = _;
	      return chart;
	    };

	    chart.width = function(_) {
	      if (!arguments.length) return width;
	      width = _;
	      return chart;
	    };

	    chart.height = function(_) {
	      if (!arguments.length) return height;
	      height = _;
	      return chart;
	    };

	    chart.x = function(_) {
	      if (!arguments.length) return getX;
	      getX = _;
	      scatter.x(_);
	      return chart;
	    };

	    chart.y = function(_) {
	      if (!arguments.length) return getY;
	      getY = _;
	      scatter.y(_);
	      return chart;
	    };

	    chart.clipEdge = function(_) {
	      if (!arguments.length) return clipEdge;
	      clipEdge = _;
	      return chart;
	    };

	    chart.color = function(_) {
	      if (!arguments.length) return color;
	      color = nv.utils.getColor(_);
	      scatter.color(color);
	      return chart;
	    };

	    chart.id = function(_) {
	      if (!arguments.length) return id;
	      id = _;
	      return chart;
	    };

	    chart.interpolate = function(_) {
	      if (!arguments.length) return interpolate;
	      interpolate = _;
	      return chart;
	    };

	    chart.defined = function(_) {
	      if (!arguments.length) return defined;
	      defined = _;
	      return chart;
	    };

	    chart.isArea = function(_) {
	      if (!arguments.length) return isArea;
	      isArea = d3.functor(_);
	      return chart;
	    };

	    return chart;
	  }

	  nv.models.multiLineChart = function() {

		    //============================================================
		    // Public Variables with Default Settings
		    //------------------------------------------------------------

		    var margin = {top: 30, right: 20, bottom: 50, left: 60},
		        color = nv.utils.defaultColor(),
		        width = null, 
		        height = null,
		        showLegend = true,
		        tooltips = true,
		        tooltip = function(key, x, y, e, graph, text) {
		          return '<h3>' + key + '</h3>' +
		                 '<p>' +  y + ' at ' + x + '</p>' + 
		                 'Also: ' + String(text); // HERE TOO.
		        },
		        x,//can be accessed via chart.lines.[x/y]Scale()
		        y,
		        noData = "No Data Available."
		        ;


		    //============================================================
		    // Private Variables
		    //------------------------------------------------------------

		    var lines = nv.models.line(),
		        xAxis = nv.models.axis().orient('bottom').tickPadding(5),
		        yAxis = nv.models.axis().orient('left'),
		        legend = nv.models.legend().height(30),
		        dispatch = d3.dispatch('tooltipShow', 'tooltipHide');

		    var showTooltip = function(e, offsetElement) {

		      // New addition to calculate position if SVG is scaled with viewBox, may move
		      if (offsetElement) {
		        var svg = d3.select(offsetElement).select('svg');
		        var viewBox = svg.attr('viewBox');
		        if (viewBox) {
		          viewBox = viewBox.split(' ');
		          var ratio = parseInt(svg.style('width')) / viewBox[2];
		          e.pos[0] = e.pos[0] * ratio;
		          e.pos[1] = e.pos[1] * ratio;
		        }
		      }

		      var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
		          top = e.pos[1] + ( offsetElement.offsetTop || 0),
		          x = xAxis.tickFormat()(lines.x()(e.point, e.pointIndex)),
		          y = yAxis.tickFormat()(lines.y()(e.point, e.pointIndex)),
		          content = tooltip(e.series.key, x, y, e, chart, e.point.text); // HERE IT IS.

		      nv.tooltip.show([left, top], content, null, null, offsetElement);
		    };


		    function chart(selection) {
		      selection.each(function(data) {
		        var container = d3.select(this),
		            that = this;

		        var availableWidth = (width  || parseInt(container.style('width')) || 960)
		                               - margin.left - margin.right,
		            availableHeight = (height || parseInt(container.style('height')) || 400)
		                               - margin.top - margin.bottom;


		        //------------------------------------------------------------
		        // Display No Data message if there's nothing to show.

		        if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
		          container.append('text')
		            .attr('class', 'nvd3 nv-noData')
		            .attr('x', availableWidth / 2)
		            .attr('y', availableHeight / 2)
		            .attr('dy', '-.7em')
		            .style('text-anchor', 'middle')
		            .text(noData);
		            return chart;
		        } else {
		          container.select('.nv-noData').remove();
		        }

		        //------------------------------------------------------------


		        x = lines.xScale();
		        y = lines.yScale();


		        var wrap = container.selectAll('g.nv-wrap.nv-lineChart').data([data]);
		        var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-lineChart').append('g');

		        gEnter.append('g').attr('class', 'nv-x nv-axis');
		        gEnter.append('g').attr('class', 'nv-y nv-axis');
		        gEnter.append('g').attr('class', 'nv-linesWrap');
		        gEnter.append('g').attr('class', 'nv-legendWrap');


		        var g = wrap.select('g');




		        if (showLegend) {
		          legend.width(availableWidth);

		          g.select('.nv-legendWrap')
		              .datum(data)
		              .call(legend);

		          if ( margin.top != legend.height()) {
		            margin.top = legend.height();
		            availableHeight = (height || parseInt(container.style('height')) || 400)
		                               - margin.top - margin.bottom;
		          }

		          g.select('.nv-legendWrap')
		              .attr('transform', 'translate(0,' + (-margin.top) +')')
		        }


		        lines
		          .width(availableWidth)
		          .height(availableHeight)
		          .color(data.map(function(d,i) {
		            return d.color || color(d, i);
		          }).filter(function(d,i) { return !data[i].disabled }));



		        g.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


		        var linesWrap = g.select('.nv-linesWrap')
		            .datum(data.filter(function(d) { return !d.disabled }))

		        d3.transition(linesWrap).call(lines);



		        xAxis
		          .scale(x)
		          .ticks( availableWidth / 100 )
		          .tickSize(-availableHeight, 0);

		        g.select('.nv-x.nv-axis')
		            .attr('transform', 'translate(0,' + y.range()[0] + ')');
		        d3.transition(g.select('.nv-x.nv-axis'))
		            .call(xAxis);


		        yAxis
		          .scale(y)
		          .ticks( availableHeight / 36 )
		          .tickSize( -availableWidth, 0);

		        d3.transition(g.select('.nv-y.nv-axis'))
		            .call(yAxis);



		        //============================================================
		        // Event Handling/Dispatching (in chart's scope)
		        //------------------------------------------------------------

		        legend.dispatch.on('legendClick', function(d,i) { 
		          d.disabled = !d.disabled;

		          if (!data.filter(function(d) { return !d.disabled }).length) {
		            data.map(function(d) {
		              d.disabled = false;
		              wrap.selectAll('.nv-series').classed('disabled', false);
		              return d;
		            });
		          }

		          selection.transition().call(chart);
		        });

		  /*
		        legend.dispatch.on('legendMouseover', function(d, i) {
		          d.hover = true;
		          selection.transition().call(chart)
		        });

		        legend.dispatch.on('legendMouseout', function(d, i) {
		          d.hover = false;
		          selection.transition().call(chart)
		        });
		  */

		        dispatch.on('tooltipShow', function(e) {
		          if (tooltips) showTooltip(e, that.parentNode);
		        });

		      });


		      //TODO: decide if this is a good idea, and if it should be in all models
		      chart.update = function() { chart(selection) };
		      chart.container = this; // I need a reference to the container in order to have outside code check if the chart is visible or not

		      return chart;
		    }


		    //============================================================
		    // Event Handling/Dispatching (out of chart's scope)
		    //------------------------------------------------------------

		    lines.dispatch.on('elementMouseover.tooltip', function(e) {
		      e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
		      dispatch.tooltipShow(e);
		    });

		    lines.dispatch.on('elementMouseout.tooltip', function(e) {
		      dispatch.tooltipHide(e);
		    });

		    dispatch.on('tooltipHide', function() {
		      if (tooltips) nv.tooltip.cleanup();
		    });


		    //============================================================
		    // Global getters and setters
		    //------------------------------------------------------------

		    chart.dispatch = dispatch;
		    chart.legend = legend;
		    chart.xAxis = xAxis;
		    chart.yAxis = yAxis;

		    d3.rebind(chart, lines, 'defined', 'isArea', 'x', 'y', 'size', 'xScale', 'yScale', 'xDomain', 'yDomain', 'forceX', 'forceY', 'interactive', 'clipEdge', 'clipVoronoi', 'id', 'interpolate');


		    chart.margin = function(_) {
		      if (!arguments.length) return margin;
		      margin = _;
		      return chart;
		    };

		    chart.width = function(_) {
		      if (!arguments.length) return width;
		      width = _;
		      return chart;
		    };

		    chart.height = function(_) {
		      if (!arguments.length) return height;
		      height = _;
		      return chart;
		    };

		    chart.color = function(_) {
		      if (!arguments.length) return color;
		      color = nv.utils.getColor(_);
		      legend.color(color);
		      return chart;
		    };

		    chart.showLegend = function(_) {
		      if (!arguments.length) return showLegend;
		      showLegend = _;
		      return chart;
		    };

		    chart.tooltips = function(_) {
		      if (!arguments.length) return tooltips;
		      tooltips = _;
		      return chart;
		    };

		    chart.tooltipContent = function(_) {
		      if (!arguments.length) return tooltip;
		      tooltip = _;
		      return chart;
		    };

		    chart.noData = function(_) {
		      if (!arguments.length) return noData;
		      noData = _;
		      return chart;
		    };


		    return chart;
		  }
	  
	  nv.models.lineChart = function() {

	    //============================================================
	    // Public Variables with Default Settings
	    //------------------------------------------------------------

	    var margin = {top: 30, right: 20, bottom: 50, left: 60},
	        color = nv.utils.defaultColor(),
	        width = null, 
	        height = null,
	        showLegend = true,
	        tooltips = true,
	        tooltip = function(key, x, y, e, graph, text) {
	          return '<h3>' + key + '</h3>' +
	                 '<p>' +  y + ' at ' + x + '</p>' + 
	                 'Also: ' + String(text); // HERE TOO.
	        },
	        x,//can be accessed via chart.lines.[x/y]Scale()
	        y,
	        noData = "No Data Available."
	        ;


	    //============================================================
	    // Private Variables
	    //------------------------------------------------------------

	    var lines = nv.models.line(),
	        xAxis = nv.models.axis().orient('bottom').tickPadding(5),
	        yAxis = nv.models.axis().orient('left'),
	        legend = nv.models.legend().height(30),
	        dispatch = d3.dispatch('tooltipShow', 'tooltipHide');

	    var showTooltip = function(e, offsetElement) {

	      // New addition to calculate position if SVG is scaled with viewBox, may move
	      if (offsetElement) {
	        var svg = d3.select(offsetElement).select('svg');
	        var viewBox = svg.attr('viewBox');
	        if (viewBox) {
	          viewBox = viewBox.split(' ');
	          var ratio = parseInt(svg.style('width')) / viewBox[2];
	          e.pos[0] = e.pos[0] * ratio;
	          e.pos[1] = e.pos[1] * ratio;
	        }
	      }

	      var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
	          top = e.pos[1] + ( offsetElement.offsetTop || 0),
	          x = xAxis.tickFormat()(lines.x()(e.point, e.pointIndex)),
	          y = yAxis.tickFormat()(lines.y()(e.point, e.pointIndex)),
	          content = tooltip(e.series.key, x, y, e, chart, e.point.text); // HERE IT IS.

	      nv.tooltip.show([left, top], content, null, null, offsetElement);
	    };


	    function chart(selection) {
	      selection.each(function(data) {
	        var container = d3.select(this),
	            that = this;

	        var availableWidth = (width  || parseInt(container.style('width')) || 960)
	                               - margin.left - margin.right,
	            availableHeight = (height || parseInt(container.style('height')) || 400)
	                               - margin.top - margin.bottom;


	        //------------------------------------------------------------
	        // Display No Data message if there's nothing to show.

	        if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
	          container.append('text')
	            .attr('class', 'nvd3 nv-noData')
	            .attr('x', availableWidth / 2)
	            .attr('y', availableHeight / 2)
	            .attr('dy', '-.7em')
	            .style('text-anchor', 'middle')
	            .text(noData);
	            return chart;
	        } else {
	          container.select('.nv-noData').remove();
	        }

	        //------------------------------------------------------------


	        x = lines.xScale();
	        y = lines.yScale();


	        var wrap = container.selectAll('g.nv-wrap.nv-lineChart').data([data]);
	        var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-lineChart').append('g');

	        gEnter.append('g').attr('class', 'nv-x nv-axis');
	        gEnter.append('g').attr('class', 'nv-y nv-axis');
	        gEnter.append('g').attr('class', 'nv-linesWrap');
	        gEnter.append('g').attr('class', 'nv-legendWrap');


	        var g = wrap.select('g');




	        if (showLegend) {
	          legend.width(availableWidth);

	          g.select('.nv-legendWrap')
	              .datum(data)
	              .call(legend);

	          if ( margin.top != legend.height()) {
	            margin.top = legend.height();
	            availableHeight = (height || parseInt(container.style('height')) || 400)
	                               - margin.top - margin.bottom;
	          }

	          g.select('.nv-legendWrap')
	              .attr('transform', 'translate(0,' + (-margin.top) +')')
	        }


	        lines
	          .width(availableWidth)
	          .height(availableHeight)
	          .color(data.map(function(d,i) {
	            return d.color || color(d, i);
	          }).filter(function(d,i) { return !data[i].disabled }));



	        g.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


	        var linesWrap = g.select('.nv-linesWrap')
	            .datum(data.filter(function(d) { return !d.disabled }))

	        d3.transition(linesWrap).call(lines);



	        xAxis
	          .scale(x)
	          .ticks( availableWidth / 100 )
	          .tickSize(-availableHeight, 0);

	        g.select('.nv-x.nv-axis')
	            .attr('transform', 'translate(0,' + y.range()[0] + ')');
	        d3.transition(g.select('.nv-x.nv-axis'))
	            .call(xAxis);


	        yAxis
	          .scale(y)
	          .ticks( availableHeight / 36 )
	          .tickSize( -availableWidth, 0);

	        d3.transition(g.select('.nv-y.nv-axis'))
	            .call(yAxis);



	        //============================================================
	        // Event Handling/Dispatching (in chart's scope)
	        //------------------------------------------------------------

	        legend.dispatch.on('legendClick', function(d,i) { 
	          d.disabled = !d.disabled;

	          if (!data.filter(function(d) { return !d.disabled }).length) {
	            data.map(function(d) {
	              d.disabled = false;
	              wrap.selectAll('.nv-series').classed('disabled', false);
	              return d;
	            });
	          }

	          selection.transition().call(chart);
	        });

	  /*
	        legend.dispatch.on('legendMouseover', function(d, i) {
	          d.hover = true;
	          selection.transition().call(chart)
	        });

	        legend.dispatch.on('legendMouseout', function(d, i) {
	          d.hover = false;
	          selection.transition().call(chart)
	        });
	  */

	        dispatch.on('tooltipShow', function(e) {
	          if (tooltips) showTooltip(e, that.parentNode);
	        });

	      });


	      //TODO: decide if this is a good idea, and if it should be in all models
	      chart.update = function() { chart(selection) };
	      chart.container = this; // I need a reference to the container in order to have outside code check if the chart is visible or not

	      return chart;
	    }


	    //============================================================
	    // Event Handling/Dispatching (out of chart's scope)
	    //------------------------------------------------------------

	    lines.dispatch.on('elementMouseover.tooltip', function(e) {
	      e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
	      dispatch.tooltipShow(e);
	    });

	    lines.dispatch.on('elementMouseout.tooltip', function(e) {
	      dispatch.tooltipHide(e);
	    });

	    dispatch.on('tooltipHide', function() {
	      if (tooltips) nv.tooltip.cleanup();
	    });


	    //============================================================
	    // Global getters and setters
	    //------------------------------------------------------------

	    chart.dispatch = dispatch;
	    chart.legend = legend;
	    chart.xAxis = xAxis;
	    chart.yAxis = yAxis;

	    d3.rebind(chart, lines, 'defined', 'isArea', 'x', 'y', 'size', 'xScale', 'yScale', 'xDomain', 'yDomain', 'forceX', 'forceY', 'interactive', 'clipEdge', 'clipVoronoi', 'id', 'interpolate');


	    chart.margin = function(_) {
	      if (!arguments.length) return margin;
	      margin = _;
	      return chart;
	    };

	    chart.width = function(_) {
	      if (!arguments.length) return width;
	      width = _;
	      return chart;
	    };

	    chart.height = function(_) {
	      if (!arguments.length) return height;
	      height = _;
	      return chart;
	    };

	    chart.color = function(_) {
	      if (!arguments.length) return color;
	      color = nv.utils.getColor(_);
	      legend.color(color);
	      return chart;
	    };

	    chart.showLegend = function(_) {
	      if (!arguments.length) return showLegend;
	      showLegend = _;
	      return chart;
	    };

	    chart.tooltips = function(_) {
	      if (!arguments.length) return tooltips;
	      tooltips = _;
	      return chart;
	    };

	    chart.tooltipContent = function(_) {
	      if (!arguments.length) return tooltip;
	      tooltip = _;
	      return chart;
	    };

	    chart.noData = function(_) {
	      if (!arguments.length) return noData;
	      noData = _;
	      return chart;
	    };


	    return chart;
	  }

	  nv.models.linePlusBarChart = function() {
	    var margin = {top: 30, right: 60, bottom: 50, left: 60},
	        width = null,
	        height = null,
	        getX = function(d) { return d.x },
	        getY = function(d) { return d.y },
	        color = nv.utils.defaultColor(),
	        showLegend = true,
	        tooltips = true,
	        tooltip = function(key, x, y, e, graph) { 
	          return '<h3>' + key + '</h3>' +
	                 '<p>' +  y + ' at ' + x + '</p>'
	        },
	        noData = "No Data Available."
	        ;


	    var lines = nv.models.line(),
	        bars = nv.models.historicalBar(),
	        x = d3.scale.linear(), // needs to be both line and historicalBar x Axis
	        y1 = bars.yScale(),
	        y2 = lines.yScale(),
	        xAxis = nv.models.axis().scale(x).orient('bottom').tickPadding(5),
	        yAxis1 = nv.models.axis().scale(y1).orient('left'),
	        yAxis2 = nv.models.axis().scale(y2).orient('right'),
	        legend = nv.models.legend().height(30),
	        dispatch = d3.dispatch('tooltipShow', 'tooltipHide');

	    var showTooltip = function(e, offsetElement) {
	      var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
	          top = e.pos[1] + ( offsetElement.offsetTop || 0),
	          x = xAxis.tickFormat()(lines.x()(e.point, e.pointIndex)),
	          y = (e.series.bar ? yAxis1 : yAxis2).tickFormat()(lines.y()(e.point, e.pointIndex)),
	          content = tooltip(e.series.key, x, y, e, chart);

	      nv.tooltip.show([left, top], content, e.value < 0 ? 'n' : 's', null, offsetElement);
	    };



	    function chart(selection) {
	      selection.each(function(data) {
	        var container = d3.select(this),
	            that = this;

	        var availableWidth = (width  || parseInt(container.style('width')) || 960)
	                               - margin.left - margin.right,
	            availableHeight = (height || parseInt(container.style('height')) || 400)
	                               - margin.top - margin.bottom;


	        //------------------------------------------------------------
	        // Display No Data message if there's nothing to show.

	        if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
	          container.append('text')
	            .attr('class', 'nvd3 nv-noData')
	            .attr('x', availableWidth / 2)
	            .attr('y', availableHeight / 2)
	            .attr('dy', '-.7em')
	            .style('text-anchor', 'middle')
	            .text(noData);
	            return chart;
	        } else {
	          container.select('.nv-noData').remove();
	        }

	        //------------------------------------------------------------




	        var dataBars = data.filter(function(d) { return !d.disabled && d.bar });

	        var dataLines = data.filter(function(d) { return !d.disabled && !d.bar });



	        //TODO: try to remove x scale computation from this layer

	        var series1 = data.filter(function(d) { return !d.disabled && d.bar })
	              .map(function(d) {
	                return d.values.map(function(d,i) {
	                  return { x: getX(d,i), y: getY(d,i) }
	                })
	              });

	        var series2 = data.filter(function(d) { return !d.disabled && !d.bar })
	              .map(function(d) {
	                return d.values.map(function(d,i) {
	                  return { x: getX(d,i), y: getY(d,i) }
	                })
	              });

	        x   .domain(d3.extent(d3.merge(series1.concat(series2)), function(d) { return d.x } ))
	            .range([0, availableWidth]);



	            /*
	        x   .domain(d3.extent(d3.merge(data.map(function(d) { return d.values })), getX ))
	            .range([0, availableWidth]);

	        y1  .domain(d3.extent(d3.merge(dataBars), function(d) { return d.y } ))
	            .range([availableHeight, 0]);

	        y2  .domain(d3.extent(d3.merge(dataLines), function(d) { return d.y } ))
	            .range([availableHeight, 0]);
	           */



	        var wrap = d3.select(this).selectAll('g.nv-wrap.nv-linePlusBar').data([data]);
	        var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-linePlusBar').append('g');

	        gEnter.append('g').attr('class', 'nv-x nv-axis');
	        gEnter.append('g').attr('class', 'nv-y1 nv-axis');
	        gEnter.append('g').attr('class', 'nv-y2 nv-axis');
	        gEnter.append('g').attr('class', 'nv-barsWrap');
	        gEnter.append('g').attr('class', 'nv-linesWrap');
	        gEnter.append('g').attr('class', 'nv-legendWrap');



	        var g = wrap.select('g');


	        if (showLegend) {
	          legend.width( availableWidth / 2 );

	          g.select('.nv-legendWrap')
	              .datum(data.map(function(series) {
	                series.originalKey = series.originalKey === undefined ? series.key : series.originalKey;
	                series.key = series.originalKey + (series.bar ? ' (left axis)' : ' (right axis)');
	                return series;
	              }))
	            .call(legend);

	          if ( margin.top != legend.height()) {
	            margin.top = legend.height();
	            availableHeight = (height || parseInt(container.style('height')) || 400)
	                               - margin.top - margin.bottom;
	          }

	          g.select('.nv-legendWrap')
	              .attr('transform', 'translate(' + ( availableWidth / 2 ) + ',' + (-margin.top) +')');
	        }




	        lines
	          .width(availableWidth)
	          .height(availableHeight)
	          .color(data.map(function(d,i) {
	            return d.color || color(d, i);
	          }).filter(function(d,i) { return !data[i].disabled && !data[i].bar }))

	        bars
	          .width(availableWidth)
	          .height(availableHeight)
	          .color(data.map(function(d,i) {
	            return d.color || color(d, i);
	          }).filter(function(d,i) { return !data[i].disabled && data[i].bar }))



	        var barsWrap = g.select('.nv-barsWrap')
	            .datum(dataBars.length ? dataBars : [{values:[]}])

	        var linesWrap = g.select('.nv-linesWrap')
	            .datum(dataLines.length ? dataLines : [{values:[]}])


	        d3.transition(barsWrap).call(bars);
	        d3.transition(linesWrap).call(lines);


	        g.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


	        xAxis
	          .ticks( availableWidth / 100 )
	          .tickSize(-availableHeight, 0);

	        g.select('.nv-x.nv-axis')
	            .attr('transform', 'translate(0,' + y1.range()[0] + ')');
	        d3.transition(g.select('.nv-x.nv-axis'))
	            .call(xAxis);


	        yAxis1
	          .ticks( availableHeight / 36 )
	          .tickSize(-availableWidth, 0);

	        d3.transition(g.select('.nv-y1.nv-axis'))
	            .style('opacity', dataBars.length ? 1 : 0)
	            .call(yAxis1);


	        yAxis2
	          .ticks( availableHeight / 36 )
	          .tickSize(dataBars.length ? 0 : -availableWidth, 0); // Show the y2 rules only if y1 has none

	        g.select('.nv-y2.nv-axis')
	            .style('opacity', dataLines.length ? 1 : 0)
	            .attr('transform', 'translate(' + x.range()[1] + ',0)');

	        d3.transition(g.select('.nv-y2.nv-axis'))
	            .call(yAxis2);



	        legend.dispatch.on('legendClick', function(d,i) { 
	          d.disabled = !d.disabled;

	          if (!data.filter(function(d) { return !d.disabled }).length) {
	            data.map(function(d) {
	              d.disabled = false;
	              wrap.selectAll('.nv-series').classed('disabled', false);
	              return d;
	            });
	          }

	          selection.transition().call(chart);
	        });


	        lines.dispatch.on('elementMouseover.tooltip', function(e) {
	          e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
	          dispatch.tooltipShow(e);
	        });
	        if (tooltips) dispatch.on('tooltipShow', function(e) { showTooltip(e, that.parentNode) } ); // TODO: maybe merge with above?

	        lines.dispatch.on('elementMouseout.tooltip', function(e) {
	          dispatch.tooltipHide(e);
	        });
	        if (tooltips) dispatch.on('tooltipHide', nv.tooltip.cleanup);


	        bars.dispatch.on('elementMouseover.tooltip', function(e) {
	          e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
	          dispatch.tooltipShow(e);
	        });
	        if (tooltips) dispatch.on('tooltipShow', function(e) { showTooltip(e, that.parentNode) } ); // TODO: maybe merge with above?

	        bars.dispatch.on('elementMouseout.tooltip', function(e) {
	          dispatch.tooltipHide(e);
	        });
	        if (tooltips) dispatch.on('tooltipHide', nv.tooltip.cleanup);


	        chart.update = function() { selection.transition().call(chart) };
	        chart.container = this; // I need a reference to the container in order to have outside code check if the chart is visible or not

	      });

	      return chart;
	    }

	    chart.dispatch = dispatch;
	    chart.legend = legend;
	    chart.lines = lines;
	    chart.bars = bars;
	    chart.xAxis = xAxis;
	    chart.yAxis1 = yAxis1;
	    chart.yAxis2 = yAxis2;

	    d3.rebind(chart, lines, 'defined', 'size', 'clipVoronoi', 'interpolate');
	    //TODO: consider rebinding x, y and some other stuff, and simply do soemthign lile bars.x(lines.x()), etc.
	    //d3.rebind(chart, lines, 'x', 'y', 'size', 'xDomain', 'yDomain', 'forceX', 'forceY', 'interactive', 'clipEdge', 'clipVoronoi', 'id');

	    //d3.rebind(chart, lines, 'interactive');
	    //consider rebinding x and y as well

	    chart.x = function(_) {
	      if (!arguments.length) return getX;
	      getX = _;
	      lines.x(_);
	      bars.x(_);
	      return chart;
	    };

	    chart.y = function(_) {
	      if (!arguments.length) return getY;
	      getY = _;
	      lines.y(_);
	      bars.y(_);
	      return chart;
	    };

	    chart.margin = function(_) {
	      if (!arguments.length) return margin;
	      margin = _;
	      return chart;
	    };

	    chart.width = function(_) {
	      if (!arguments.length) return width;
	      width = _;
	      return chart;
	    };

	    chart.height = function(_) {
	      if (!arguments.length) return height;
	      height = _;
	      return chart;
	    };

	    chart.color = function(_) {
	      if (!arguments.length) return color;
	      color = nv.utils.getColor(_);
	      legend.color(color);
	      return chart;
	    };

	    chart.showLegend = function(_) {
	      if (!arguments.length) return showLegend;
	      showLegend = _;
	      return chart;
	    };

	    chart.tooltips = function(_) {
	      if (!arguments.length) return tooltips;
	      tooltips = _;
	      return chart;
	    };

	    chart.tooltipContent = function(_) {
	      if (!arguments.length) return tooltip;
	      tooltip = _;
	      return chart;
	    };

	    chart.noData = function(_) {
	      if (!arguments.length) return noData;
	      noData = _;
	      return chart;
	    };


	    return chart;
	  }

	  nv.models.lineWithFocusChart = function() {
	    var margin = {top: 30, right: 30, bottom: 30, left: 60},
	        margin2 = {top: 0, right: 30, bottom: 20, left: 60},
	        color = nv.utils.defaultColor(),
	        width = null,
	        height = null,
	        height2 = 100,
	        showLegend = true,
	        brushExtent = null,
	        tooltips = true,
	        tooltip = function(key, x, y, e, graph) {
	          return '<h3>' + key + '</h3>' +
	                 '<p>' +  y + ' at ' + x + '</p>'
	        },
	        noData = "No Data Available."
	        ;

	    var lines = nv.models.line().clipEdge(true),
	        lines2 = nv.models.line().interactive(false),
	        x = lines.xScale(),
	        y = lines.yScale(),
	        x2 = lines2.xScale(),
	        y2 = lines2.yScale(),
	        xAxis = nv.models.axis().scale(x).orient('bottom').tickPadding(5),
	        yAxis = nv.models.axis().scale(y).orient('left'),
	        x2Axis = nv.models.axis().scale(x2).orient('bottom').tickPadding(5),
	        y2Axis = nv.models.axis().scale(y2).orient('left'),
	        legend = nv.models.legend().height(30),
	        dispatch = d3.dispatch('tooltipShow', 'tooltipHide'),
	        brush = d3.svg.brush().x(x2);


	    var showTooltip = function(e, offsetElement) {
	      var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
	          top = e.pos[1] + ( offsetElement.offsetTop || 0),
	          x = xAxis.tickFormat()(lines.x()(e.point, e.pointIndex)),
	          y = yAxis.tickFormat()(lines.y()(e.point, e.pointIndex)),
	          content = tooltip(e.series.key, x, y, e, chart);

	      nv.tooltip.show([left, top], content, null, null, offsetElement);
	    };


	    function chart(selection) {
	      selection.each(function(data) {
	        var container = d3.select(this),
	            that = this;

	        var availableWidth = (width  || parseInt(container.style('width')) || 960)
	                               - margin.left - margin.right,
	            availableHeight = (height || parseInt(container.style('height')) || 400)
	                               - margin.top - margin.bottom - height2,
	            availableHeight2 = height2 - margin2.top - margin2.bottom;


	        //------------------------------------------------------------
	        // Display No Data message if there's nothing to show.

	        if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
	          container.append('text')
	            .attr('class', 'nvd3 nv-noData')
	            .attr('x', availableWidth / 2)
	            .attr('y', availableHeight / 2)
	            .attr('dy', '-.7em')
	            .style('text-anchor', 'middle')
	            .text(noData);
	            return chart;
	        } else {
	          container.select('.nv-noData').remove();
	        }

	        //------------------------------------------------------------



	        brush.on('brush', onBrush);


	        var wrap = container.selectAll('g.nv-wrap.nv-lineWithFocusChart').data([data]);
	        var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-lineWithFocusChart').append('g');

	        gEnter.append('g').attr('class', 'nv-legendWrap');

	        var focusEnter = gEnter.append('g').attr('class', 'nv-focus');
	        focusEnter.append('g').attr('class', 'nv-x nv-axis');
	        focusEnter.append('g').attr('class', 'nv-y nv-axis');
	        focusEnter.append('g').attr('class', 'nv-linesWrap');

	        var contextEnter = gEnter.append('g').attr('class', 'nv-context');
	        contextEnter.append('g').attr('class', 'nv-x nv-axis');
	        contextEnter.append('g').attr('class', 'nv-y nv-axis');
	        contextEnter.append('g').attr('class', 'nv-linesWrap');
	        contextEnter.append('g').attr('class', 'nv-brushBackground');
	        contextEnter.append('g').attr('class', 'nv-x nv-brush');



	        var g = wrap.select('g');




	        if (showLegend) {
	          legend.width(availableWidth);

	          g.select('.nv-legendWrap')
	              .datum(data)
	              .call(legend);

	          if ( margin.top != legend.height()) {
	            margin.top = legend.height();
	            availableHeight = (height || parseInt(container.style('height')) || 400)
	                               - margin.top - margin.bottom - height2;
	          }

	          g.select('.nv-legendWrap')
	              .attr('transform', 'translate(0,' + (-margin.top) +')')
	        }


	        lines
	          .width(availableWidth)
	          .height(availableHeight)
	          .color(
	            data
	              .map(function(d,i) {
	                return d.color || color(d, i);
	              })
	              .filter(function(d,i) {
	                return !data[i].disabled;
	            })
	          );

	        lines2
	          .defined(lines.defined())
	          .width(availableWidth)
	          .height(availableHeight2)
	          .color(
	            data
	              .map(function(d,i) {
	                return d.color || color(d, i);
	              })
	              .filter(function(d,i) {
	                return !data[i].disabled;
	            })
	          );


	        g.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


	        /*
	        var focusLinesWrap = g.select('.nv-focus .nv-linesWrap')
	            .datum(data.filter(function(d) { return !d.disabled }))

	        d3.transition(focusLinesWrap).call(lines);
	       */


	        xAxis
	          .ticks( availableWidth / 100 )
	          .tickSize(-availableHeight, 0);

	        yAxis
	          .ticks( availableHeight / 36 )
	          .tickSize( -availableWidth, 0);

	        g.select('.nv-focus .nv-x.nv-axis')
	            .attr('transform', 'translate(0,' + y.range()[0] + ')');


	  /*
	        d3.transition(g.select('.nv-focus .nv-x.nv-axis'))
	            .call(xAxis);


	        d3.transition(g.select('.nv-focus .nv-y.nv-axis'))
	            .call(yAxis);
	           */



	        g.select('.nv-context')
	            .attr('transform', 'translate(0,' + ( availableHeight + margin.bottom + margin2.top) + ')')

	        var contextLinesWrap = g.select('.nv-context .nv-linesWrap')
	            .datum(data.filter(function(d) { return !d.disabled }))

	        d3.transition(contextLinesWrap).call(lines2);



	        if (brushExtent) brush.extent(brushExtent);

	        var brushBG = g.select('.nv-brushBackground').selectAll('g')
	            .data([brushExtent || brush.extent()])

	        var brushBGenter = brushBG.enter()
	            .append('g');

	        brushBGenter.append('rect')
	            .attr('class', 'left')
	            .attr('x', 0)
	            .attr('y', 0)
	            .attr('height', availableHeight2);

	        brushBGenter.append('rect')
	            .attr('class', 'right')
	            .attr('x', 0)
	            .attr('y', 0)
	            .attr('height', availableHeight2);


	        function updateBrushBG() {
	          //nv.log('test', brush.empty(), brush.extent());
	          if (!brush.empty()) brush.extent(brushExtent);
	          brushBG
	              .data([brush.empty() ? x2.domain() : brushExtent])
	              //.data([brush.empty() ? xi.domain() : brush.extent()])
	              .each(function(d,i) {
	                var leftWidth = x2(d[0]) - x.range()[0],
	                    rightWidth = x.range()[1] - x2(d[1]);
	                d3.select(this).select('.left')
	                  .attr('width',  leftWidth < 0 ? 0 : leftWidth);

	                d3.select(this).select('.right')
	                  .attr('x', x2(d[1]))
	                  .attr('width', rightWidth < 0 ? 0 : rightWidth);
	              });
	        }



	        gBrush = g.select('.nv-x.nv-brush')
	            .call(brush);
	        gBrush.selectAll('rect')
	            //.attr('y', -5)
	            .attr('height', availableHeight2);
	        gBrush.selectAll('.resize').append('path').attr('d', resizePath);


	        //if (brushExtent) onBrush();
	        onBrush();



	        x2Axis
	          //.tickFormat(xAxis.tickFormat())  //exposing x2Axis so user can set differently
	          .ticks( availableWidth / 100 )
	          .tickSize(-availableHeight2, 0);

	        g.select('.nv-context .nv-x.nv-axis')
	            .attr('transform', 'translate(0,' + y2.range()[0] + ')');
	        d3.transition(g.select('.nv-context .nv-x.nv-axis'))
	            .call(x2Axis);


	        y2Axis
	          //.tickFormat(yAxis.tickFormat())  //exposing y2Axis so user can set differently
	          .ticks( availableHeight2 / 36 )
	          .tickSize( -availableWidth, 0);

	        d3.transition(g.select('.nv-context .nv-y.nv-axis'))
	            .call(y2Axis);



	        g.select('.nv-focus .nv-x.nv-axis')
	            .attr('transform', 'translate(0,' + y.range()[0] + ')');
	        g.select('.nv-context .nv-x.nv-axis')
	            .attr('transform', 'translate(0,' + y2.range()[0] + ')');


	        legend.dispatch.on('legendClick', function(d,i) {
	          d.disabled = !d.disabled;

	          if (!data.filter(function(d) { return !d.disabled }).length) {
	            data.map(function(d) {
	              d.disabled = false;
	              wrap.selectAll('.nv-series').classed('disabled', false);
	              return d;
	            });
	          }

	          selection.transition().call(chart);
	        });


	  /*
	        //
	        legend.dispatch.on('legendMouseover', function(d, i) {
	          d.hover = true;
	          selection.transition().call(chart)
	        });

	        legend.dispatch.on('legendMouseout', function(d, i) {
	          d.hover = false;
	          selection.transition().call(chart)
	        });
	  */

	        lines.dispatch.on('elementMouseover.tooltip', function(e) {
	          e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
	          dispatch.tooltipShow(e);
	        });
	        if (tooltips) dispatch.on('tooltipShow', function(e) { showTooltip(e, that.parentNode) } ); // TODO: maybe merge with above?

	        lines.dispatch.on('elementMouseout.tooltip', function(e) {
	          dispatch.tooltipHide(e);
	        });
	        if (tooltips) dispatch.on('tooltipHide', nv.tooltip.cleanup);



	        // Taken from crossfilter (http://square.github.com/crossfilter/)
	        function resizePath(d) {
	          var e = +(d == 'e'),
	              x = e ? 1 : -1,
	              y = availableHeight2 / 3;
	          return 'M' + (.5 * x) + ',' + y
	              + 'A6,6 0 0 ' + e + ' ' + (6.5 * x) + ',' + (y + 6)
	              + 'V' + (2 * y - 6)
	              + 'A6,6 0 0 ' + e + ' ' + (.5 * x) + ',' + (2 * y)
	              + 'Z'
	              + 'M' + (2.5 * x) + ',' + (y + 8)
	              + 'V' + (2 * y - 8)
	              + 'M' + (4.5 * x) + ',' + (y + 8)
	              + 'V' + (2 * y - 8);
	        }



	        function onBrush() {
	          //nv.log(brush.empty(), brush.extent(), x2(brush.extent()[0]), x2(brush.extent()[1]));

	    /*
	          focusLinesWrap.call(lines)
	          //var focusLinesWrap = g.select('.focus .linesWrap')
	          g.select('.nv-focus .nv-x.nv-axis').call(xAxis);
	          g.select('.nv-focus .nv-y.nv-axis').call(yAxis);
	        }
	    */
	          brushExtent = brush.empty() ? null : brush.extent();
	          extent = brush.empty() ? x2.domain() : brush.extent();

	          updateBrushBG();



	          var focusLinesWrap = g.select('.nv-focus .nv-linesWrap')
	              .datum(
	                data
	                  .filter(function(d) { return !d.disabled })
	                  .map(function(d,i) {
	                    return {
	                      key: d.key,
	                      values: d.values.filter(function(d,i) {
	                        return lines.x()(d,i) >= extent[0] && lines.x()(d,i) <= extent[1];
	                      })
	                    }
	                  })
	              )

	          d3.transition(focusLinesWrap).call(lines);


	          /*
	          var contextLinesWrap = g.select('.context .linesWrap')
	              .datum(data.filter(function(d) { return !d.disabled }))

	          d3.transition(contextLinesWrap).call(lines2);
	         */


	          d3.transition(g.select('.nv-focus .nv-x.nv-axis'))
	              .call(xAxis);

	          d3.transition(g.select('.nv-focus .nv-y.nv-axis'))
	              .call(yAxis);
	        }


	      });



	      //TODO: decide if this is a good idea, and if it should be in all models
	      chart.update = function() { chart(selection) };
	      chart.container = this; // I need a reference to the container in order to have outside code check if the chart is visible or not


	      return chart;
	    }


	    chart.dispatch = dispatch;
	    chart.legend = legend;
	    chart.lines = lines;
	    chart.lines2 = lines2;
	    chart.xAxis = xAxis;
	    chart.yAxis = yAxis;
	    chart.x2Axis = x2Axis;
	    chart.y2Axis = y2Axis;

	    d3.rebind(chart, lines, 'defined', 'isArea', 'size', 'xDomain', 'yDomain', 'forceX', 'forceY', 'interactive', 'clipEdge', 'clipVoronoi', 'id');

	    chart.x = function(_) {
	      if (!arguments.length) return lines.x;
	      lines.x(_);
	      lines2.x(_);
	      return chart;
	    };

	    chart.y = function(_) {
	      if (!arguments.length) return lines.y;
	      lines.y(_);
	      lines2.y(_);
	      return chart;
	    };

	    chart.margin = function(_) {
	      if (!arguments.length) return margin;
	      margin = _;
	      return chart;
	    };

	    chart.margin2 = function(_) {
	      if (!arguments.length) return margin2;
	      margin2 = _;
	      return chart;
	    };

	    chart.width = function(_) {
	      if (!arguments.length) return width;
	      width = _;
	      return chart;
	    };

	    chart.height = function(_) {
	      if (!arguments.length) return height;
	      height = _;
	      return chart;
	    };

	    chart.color = function(_) {
	      if (!arguments.length) return color;
	      color =nv.utils.getColor(_);
	      legend.color(color);
	      return chart;
	    };

	    chart.showLegend = function(_) {
	      if (!arguments.length) return showLegend;
	      showLegend = _;
	      return chart;
	    };

	    chart.tooltips = function(_) {
	      if (!arguments.length) return tooltips;
	      tooltips = _;
	      return chart;
	    };

	    chart.tooltipContent = function(_) {
	      if (!arguments.length) return tooltip;
	      tooltip = _;
	      return chart;
	    };

	    chart.interpolate = function(_) {
	      if (!arguments.length) return lines.interpolate();
	      lines.interpolate(_);
	      lines2.interpolate(_);
	      return chart;
	    };

	    chart.noData = function(_) {
	      if (!arguments.length) return noData;
	      noData = _;
	      return chart;
	    };



	    // Chart has multiple similar Axes, to prevent code duplication, probably need to link all axis functions manually like below
	    chart.xTickFormat = function(_) {
	      if (!arguments.length) return xAxis.tickFormat();
	      xAxis.tickFormat(_);
	      x2Axis.tickFormat(_);
	      return chart;
	    };

	    chart.yTickFormat = function(_) {
	      if (!arguments.length) return yAxis.tickFormat();
	      yAxis.tickFormat(_);
	      y2Axis.tickFormat(_);
	      return chart;
	    };


	    return chart;
	  }

	  nv.models.multiBar = function() {

	    //============================================================
	    // Public Variables with Default Settings
	    //------------------------------------------------------------

	    var margin = {top: 0, right: 0, bottom: 0, left: 0},
	        width = 960,
	        height = 500,
	        x = d3.scale.ordinal(),
	        y = d3.scale.linear(),
	        id = Math.floor(Math.random() * 10000), //Create semi-unique ID in case user doesn't select one
	        getX = function(d) { return d.x },
	        getY = function(d) { return d.y },
	        forceY = [0], // 0 is forced by default.. this makes sense for the majority of bar graphs... user can always do chart.forceY([]) to remove
	        clipEdge = true,
	        stacked = false,
	        color = nv.utils.defaultColor(),
	        delay = 1200,
	        xDomain, yDomain;


	    //============================================================
	    // Private Variables
	    //------------------------------------------------------------

	    //var x = d3.scale.linear(),
	    var dispatch = d3.dispatch('chartClick', 'elementClick', 'elementDblClick', 'elementMouseover', 'elementMouseout'),
	        x0, y0;


	    function chart(selection) {
	      selection.each(function(data) {
	        var availableWidth = width - margin.left - margin.right,
	            availableHeight = height - margin.top - margin.bottom;

	        if (stacked) {
	        //var stackedData = d3.layout.stack()
	          data = d3.layout.stack()
	                       .offset('zero')
	                       .values(function(d){ return d.values })
	                       .y(getY)
	                       (data);
	        }



	        //add series index to each data point for reference
	        data = data.map(function(series, i) {
	          series.values = series.values.map(function(point) {
	            point.series = i;
	            return point;
	          });
	          return series;
	        });


	        var seriesData = (xDomain && yDomain) ? [] : // if we know xDomain and yDomain, no need to calculate
	              data.map(function(d) {
	                return d.values.map(function(d,i) {
	                  return { x: getX(d,i), y: getY(d,i), y0: d.y0 }
	                })
	              });

	        x   .domain(d3.merge(seriesData).map(function(d) { return d.x }))
	            .rangeBands([0, availableWidth], .1);

	        y   .domain(yDomain || d3.extent(d3.merge(seriesData).map(function(d) { return d.y + (stacked ? d.y0 : 0) }).concat(forceY)))
	            .range([availableHeight, 0]);


	        // If scale's domain don't have a range, slightly adjust to make one... so a chart can show a single data point
	        if (x.domain()[0] === x.domain()[1] || y.domain()[0] === y.domain()[1]) singlePoint = true;
	        if (x.domain()[0] === x.domain()[1])
	          x.domain()[0] ?
	              x.domain([x.domain()[0] - x.domain()[0] * 0.01, x.domain()[1] + x.domain()[1] * 0.01])
	            : x.domain([-1,1]);

	        if (y.domain()[0] === y.domain()[1])
	          y.domain()[0] ?
	              y.domain([y.domain()[0] + y.domain()[0] * 0.01, y.domain()[1] - y.domain()[1] * 0.01])
	            : y.domain([-1,1]);


	        //store old scales if they exist
	        x0 = x0 || x;
	        y0 = y0 || y;






	        var wrap = d3.select(this).selectAll('g.nv-wrap.nv-multibar').data([data]);
	        var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-multibar');
	        var defsEnter = wrapEnter.append('defs');
	        var gEnter = wrapEnter.append('g');

	        gEnter.append('g').attr('class', 'nv-groups');

	        var g = wrap.select('g')
	        wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');



	        defsEnter.append('clipPath')
	            .attr('id', 'nv-edge-clip-' + id)
	          .append('rect');
	        wrap.select('#nv-edge-clip-' + id + ' rect')
	            .attr('width', availableWidth)
	            .attr('height', availableHeight);

	        g   .attr('clip-path', clipEdge ? 'url(#nv-edge-clip-' + id + ')' : '');



	        var groups = wrap.select('.nv-groups').selectAll('.nv-group')
	            .data(function(d) { return d }, function(d) { return d.key });
	        groups.enter().append('g')
	            .style('stroke-opacity', 1e-6)
	            .style('fill-opacity', 1e-6);
	        d3.transition(groups.exit())
	            //.style('stroke-opacity', 1e-6)
	            //.style('fill-opacity', 1e-6)
	          .selectAll('rect.nv-bar')
	          .delay(function(d,i) { return i * delay/ data[0].values.length })
	            .attr('y', function(d) { return stacked ? y0(d.y0) : y0(0) })
	            .attr('height', 0)
	            .remove();
	        groups
	            .attr('class', function(d,i) { return 'nv-group nv-series-' + i })
	            .classed('hover', function(d) { return d.hover })
	            .style('fill', function(d,i){ return color(d, i) })
	            .style('stroke', function(d,i){ return color(d, i) });
	        d3.transition(groups)
	            .style('stroke-opacity', 1)
	            .style('fill-opacity', .75);


	        var bars = groups.selectAll('rect.nv-bar')
	            .data(function(d) { return d.values });

	        bars.exit().remove();


	        var barsEnter = bars.enter().append('rect')
	            .attr('class', function(d,i) { return getY(d,i) < 0 ? 'nv-bar negative' : 'nv-bar positive'})
	            .attr('x', function(d,i,j) {
	                return stacked ? 0 : (j * x.rangeBand() / data.length )
	            })
	            .attr('y', function(d) { return y0(stacked ? d.y0 : 0) })
	            .attr('height', 0)
	            .attr('width', x.rangeBand() / (stacked ? 1 : data.length) );
	        bars
	            .on('mouseover', function(d,i) { //TODO: figure out why j works above, but not here
	              d3.select(this).classed('hover', true);
	              dispatch.elementMouseover({
	                value: getY(d,i),
	                point: d,
	                series: data[d.series],
	                pos: [x(getX(d,i)) + (x.rangeBand() * (stacked ? data.length / 2 : d.series + .5) / data.length), y(getY(d,i) + (stacked ? d.y0 : 0))],  // TODO: Figure out why the value appears to be shifted
	                pointIndex: i,
	                seriesIndex: d.series,
	                e: d3.event
	              });
	            })
	            .on('mouseout', function(d,i) {
	              d3.select(this).classed('hover', false);
	              dispatch.elementMouseout({
	                value: getY(d,i),
	                point: d,
	                series: data[d.series],
	                pointIndex: i,
	                seriesIndex: d.series,
	                e: d3.event
	              });
	            })
	            .on('click', function(d,i) {
	              dispatch.elementClick({
	                value: getY(d,i),
	                point: d,
	                series: data[d.series],
	                pos: [x(getX(d,i)) + (x.rangeBand() * (stacked ? data.length / 2 : d.series + .5) / data.length), y(getY(d,i) + (stacked ? d.y0 : 0))],  // TODO: Figure out why the value appears to be shifted
	                pointIndex: i,
	                seriesIndex: d.series,
	                e: d3.event
	              });
	              d3.event.stopPropagation();
	            })
	            .on('dblclick', function(d,i) {
	              dispatch.elementDblClick({
	                value: getY(d,i),
	                point: d,
	                series: data[d.series],
	                pos: [x(getX(d,i)) + (x.rangeBand() * (stacked ? data.length / 2 : d.series + .5) / data.length), y(getY(d,i) + (stacked ? d.y0 : 0))],  // TODO: Figure out why the value appears to be shifted
	                pointIndex: i,
	                seriesIndex: d.series,
	                e: d3.event
	              });
	              d3.event.stopPropagation();
	            });
	        bars
	            .attr('class', function(d,i) { return getY(d,i) < 0 ? 'nv-bar negative' : 'nv-bar positive'})
	            .attr('transform', function(d,i) { return 'translate(' + x(getX(d,i)) + ',0)'; })
	        if (stacked)
	          d3.transition(bars)
	              .delay(function(d,i) { return i * delay / data[0].values.length })
	              .attr('y', function(d,i) {
	                return y(getY(d,i) + (stacked ? d.y0 : 0));
	              })
	              .attr('height', function(d,i) {
	                return Math.abs(y(d.y + (stacked ? d.y0 : 0)) - y((stacked ? d.y0 : 0)))
	              })
	              .each('end', function() {
	                d3.transition(d3.select(this))
	                  .attr('x', function(d,i) {
	                    return stacked ? 0 : (d.series * x.rangeBand() / data.length )
	                  })
	                  .attr('width', x.rangeBand() / (stacked ? 1 : data.length) );
	              })
	        else
	          d3.transition(bars)
	            .delay(function(d,i) { return i * delay/ data[0].values.length })
	              .attr('x', function(d,i) {
	                return d.series * x.rangeBand() / data.length
	              })
	              .attr('width', x.rangeBand() / data.length)
	              .each('end', function() {
	                d3.transition(d3.select(this))
	                  .attr('y', function(d,i) {
	                    return getY(d,i) < 0 ?
	                      y(0) :
	                      y(getY(d,i))
	                  })
	                  .attr('height', function(d,i) {
	                    return Math.abs(y(getY(d,i)) - y(0))
	                  });
	              })



	        //TODO: decide if this makes sense to add into all the models for ease of updating (updating without needing the selection)
	        chart.update = function() { chart(selection) };

	        //store old scales for use in transitions on update
	        x0 = x.copy();
	        y0 = y.copy();

	      });

	      return chart;
	    }


	    //============================================================
	    // Global getters and setters
	    //------------------------------------------------------------

	    chart.dispatch = dispatch;

	    chart.x = function(_) {
	      if (!arguments.length) return getX;
	      getX = _;
	      return chart;
	    };

	    chart.y = function(_) {
	      if (!arguments.length) return getY;
	      getY = _;
	      return chart;
	    };

	    chart.margin = function(_) {
	      if (!arguments.length) return margin;
	      margin = _;
	      return chart;
	    };

	    chart.width = function(_) {
	      if (!arguments.length) return width;
	      width = _;
	      return chart;
	    };

	    chart.height = function(_) {
	      if (!arguments.length) return height;
	      height = _;
	      return chart;
	    };

	    chart.xScale = function(_) {
	      if (!arguments.length) return x;
	      x = _;
	      return chart;
	    };

	    chart.yScale = function(_) {
	      if (!arguments.length) return y;
	      y = _;
	      return chart;
	    };

	    chart.xDomain = function(_) {
	      if (!arguments.length) return xDomain;
	      xDomain = _;
	      return chart;
	    };

	    chart.yDomain = function(_) {
	      if (!arguments.length) return yDomain;
	      yDomain = _;
	      return chart;
	    };

	    chart.forceY = function(_) {
	      if (!arguments.length) return forceY;
	      forceY = _;
	      return chart;
	    };

	    chart.stacked = function(_) {
	      if (!arguments.length) return stacked;
	      stacked = _;
	      return chart;
	    };

	    chart.clipEdge = function(_) {
	      if (!arguments.length) return clipEdge;
	      clipEdge = _;
	      return chart;
	    };

	    chart.color = function(_) {
	      if (!arguments.length) return color;
	      color = nv.utils.getColor(_);
	      return chart;
	    };

	    chart.id = function(_) {
	      if (!arguments.length) return id;
	      id = _;
	      return chart;
	    };

	    chart.delay = function(_) {
	      if (!arguments.length) return delay;
	      delay = _;
	      return chart;
	    };


	    return chart;
	  }

	  nv.models.multiBarChart = function() {

	    //============================================================
	    // Public Variables with Default Settings
	    //------------------------------------------------------------

	    var margin = {top: 30, right: 20, bottom: 50, left: 60},
	        width = null,
	        height = null,
	        color = nv.utils.defaultColor(),
	        showControls = true,
	        showLegend = true,
	        reduceXTicks = true, // if false a tick will show for every data point
	        rotateLabels = 0,
	        tooltips = true,
	        tooltip = function(key, x, y, e, graph) {
	          return '<h3>' + key + '</h3>' +
	                 '<p>' +  y + ' on ' + x + '</p>'
	        },
	        x, y, //can be accessed via chart.multibar.[x/y]Scale()
	        noData = "No Data Available."
	        ;


	    //============================================================
	    // Private Variables
	    //------------------------------------------------------------

	    var multibar = nv.models.multiBar().stacked(false),
	        xAxis = nv.models.axis().orient('bottom').highlightZero(false).showMaxMin(false), //TODO: see why showMaxMin(false) causes no ticks to be shown on x axis
	        yAxis = nv.models.axis().orient('left'),
	        legend = nv.models.legend().height(30),
	        controls = nv.models.legend().height(30),
	        dispatch = d3.dispatch('tooltipShow', 'tooltipHide');

	    xAxis.tickFormat(function(d) { return d });
	    yAxis.tickFormat(d3.format(',.1f'));

	    var showTooltip = function(e, offsetElement) {
	      var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
	          top = e.pos[1] + ( offsetElement.offsetTop || 0),
	          x = xAxis.tickFormat()(multibar.x()(e.point, e.pointIndex)),
	          y = yAxis.tickFormat()(multibar.y()(e.point, e.pointIndex)),
	          content = tooltip(e.series.key, x, y, e, chart);

	      nv.tooltip.show([left, top], content, e.value < 0 ? 'n' : 's', null, offsetElement);
	    };


	    function chart(selection) {
	      selection.each(function(data) {
	        var container = d3.select(this),
	            that = this;

	        var availableWidth = (width  || parseInt(container.style('width')) || 960)
	                               - margin.left - margin.right,
	            availableHeight = (height || parseInt(container.style('height')) || 400)
	                               - margin.top - margin.bottom;


	        //------------------------------------------------------------
	        // Display No Data message if there's nothing to show.

	        if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
	          container.append('text')
	            .attr('class', 'nvd3 nv-noData')
	            .attr('x', availableWidth / 2)
	            .attr('y', availableHeight / 2)
	            .attr('dy', '-.7em')
	            .style('text-anchor', 'middle')
	            .text(noData);
	            return chart;
	        } else {
	          container.select('.nv-noData').remove();
	        }

	        //------------------------------------------------------------



	        x = multibar.xScale();
	        y = multibar.yScale();


	        var wrap = container.selectAll('g.nv-wrap.nv-multiBarWithLegend').data([data]);
	        var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-multiBarWithLegend').append('g');

	        gEnter.append('g').attr('class', 'nv-x nv-axis');
	        gEnter.append('g').attr('class', 'nv-y nv-axis');
	        gEnter.append('g').attr('class', 'nv-barsWrap');
	        gEnter.append('g').attr('class', 'nv-legendWrap');
	        gEnter.append('g').attr('class', 'nv-controlsWrap');



	        var g = wrap.select('g');


	        if (showLegend) {
	          legend.width(availableWidth / 2);

	          g.select('.nv-legendWrap')
	              .datum(data)
	              .call(legend);

	          if ( margin.top != legend.height()) {
	            margin.top = legend.height();
	            availableHeight = (height || parseInt(container.style('height')) || 400)
	                               - margin.top - margin.bottom;
	          }

	          g.select('.nv-legendWrap')
	              .attr('transform', 'translate(' + (availableWidth / 2) + ',' + (-margin.top) +')');
	        }


	        multibar
	          .width(availableWidth)
	          .height(availableHeight)
	          .color(data.map(function(d,i) {
	            return d.color || color(d, i);
	          }).filter(function(d,i) { return !data[i].disabled }))



	        if (showControls) {
	          var controlsData = [
	            { key: 'Grouped', disabled: multibar.stacked() },
	            { key: 'Stacked', disabled: !multibar.stacked() }
	          ];

	          controls.width(180).color(['#444', '#444', '#444']);
	          g.select('.nv-controlsWrap')
	              .datum(controlsData)
	              .attr('transform', 'translate(0,' + (-margin.top) +')')
	              .call(controls);
	        }


	        g.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


	        var barsWrap = g.select('.nv-barsWrap')
	            .datum(data.filter(function(d) { return !d.disabled }))


	        d3.transition(barsWrap).call(multibar);


	        xAxis
	          .scale(x)
	          .ticks( availableWidth / 100 )
	          .tickSize(-availableHeight, 0);

	        g.select('.nv-x.nv-axis')
	            .attr('transform', 'translate(0,' + y.range()[0] + ')');
	        d3.transition(g.select('.nv-x.nv-axis'))
	            .call(xAxis);

	        var xTicks = g.select('.nv-x.nv-axis > g').selectAll('g');

	        xTicks
	            .selectAll('line, text')
	            .style('opacity', 1)

	        if (reduceXTicks)
	          xTicks
	            .filter(function(d,i) {
	                return i % Math.ceil(data[0].values.length / (availableWidth / 100)) !== 0;
	              })
	            .selectAll('text, line')
	            .style('opacity', 0);

	        if(rotateLabels)
	          xTicks
	              .selectAll('text')
	              .attr('transform', function(d,i,j) { return 'rotate('+rotateLabels+' 0,0)' })
	              .attr('text-transform', rotateLabels > 0 ? 'start' : 'end');

	        yAxis
	          .scale(y)
	          .ticks( availableHeight / 36 )
	          .tickSize( -availableWidth, 0);

	        d3.transition(g.select('.nv-y.nv-axis'))
	            .call(yAxis);



	        //============================================================
	        // Event Handling/Dispatching (in chart's scope)
	        //------------------------------------------------------------

	        legend.dispatch.on('legendClick', function(d,i) {
	          d.disabled = !d.disabled;

	          if (!data.filter(function(d) { return !d.disabled }).length) {
	            data.map(function(d) {
	              d.disabled = false;
	              wrap.selectAll('.nv-series').classed('disabled', false);
	              return d;
	            });
	          }

	          selection.transition().call(chart);
	        });

	        controls.dispatch.on('legendClick', function(d,i) {
	          if (!d.disabled) return;
	          controlsData = controlsData.map(function(s) {
	            s.disabled = true;
	            return s;
	          });
	          d.disabled = false;

	          switch (d.key) {
	            case 'Grouped':
	              multibar.stacked(false);
	              break;
	            case 'Stacked':
	              multibar.stacked(true);
	              break;
	          }

	          selection.transition().call(chart);
	        });

	        dispatch.on('tooltipShow', function(e) { 
	          if (tooltips) showTooltip(e, that.parentNode) 
	        });


	        chart.update = function() { selection.transition().call(chart) };
	        chart.container = this; // I need a reference to the container in order to have outside code check if the chart is visible or not

	      });

	      return chart;
	    }


	    //============================================================
	    // Event Handling/Dispatching (out of chart's scope)
	    //------------------------------------------------------------

	    multibar.dispatch.on('elementMouseover.tooltip2', function(e) {
	      e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
	      dispatch.tooltipShow(e);
	    });

	    multibar.dispatch.on('elementMouseout.tooltip', function(e) {
	      dispatch.tooltipHide(e);
	    });
	    dispatch.on('tooltipHide', function() {
	      if (tooltips) nv.tooltip.cleanup();
	    });


	    //============================================================
	    // Global getters and setters
	    //------------------------------------------------------------

	    chart.dispatch = dispatch;
	    chart.legend = legend;
	    chart.xAxis = xAxis;
	    chart.yAxis = yAxis;

	    d3.rebind(chart, multibar, 'x', 'y', 'xDomain', 'yDomain', 'forceX', 'forceY', 'clipEdge', 'id', 'stacked', 'delay');


	    chart.margin = function(_) {
	      if (!arguments.length) return margin;
	      margin = _;
	      return chart;
	    };

	    chart.width = function(_) {
	      if (!arguments.length) return width;
	      width = _;
	      return chart;
	    };

	    chart.height = function(_) {
	      if (!arguments.length) return height;
	      height = _;
	      return chart;
	    };

	    chart.color = function(_) {
	      if (!arguments.length) return color;
	      color = nv.utils.getColor(_);
	      legend.color(color);
	      return chart;
	    };

	    chart.showControls = function(_) {
	      if (!arguments.length) return showControls;
	      showControls = _;
	      return chart;
	    };

	    chart.showLegend = function(_) {
	      if (!arguments.length) return showLegend;
	      showLegend = _;
	      return chart;
	    };

	    chart.reduceXTicks= function(_) {
	      if (!arguments.length) return reduceXTicks;
	      reduceXTicks = _;
	      return chart;
	    };

	    chart.rotateLabels = function(_) {
	      if (!arguments.length) return rotateLabels;
	      rotateLabels = _;
	      return chart;
	    }

	    chart.tooltip = function(_) {
	      if (!arguments.length) return tooltip;
	      tooltip = _;
	      return chart;
	    };

	    chart.tooltips = function(_) {
	      if (!arguments.length) return tooltips;
	      tooltips = _;
	      return chart;
	    };

	    chart.tooltipContent = function(_) {
	      if (!arguments.length) return tooltip;
	      tooltip = _;
	      return chart;
	    };

	    chart.noData = function(_) {
	      if (!arguments.length) return noData;
	      noData = _;
	      return chart;
	    };


	    return chart;
	  }

	  nv.models.multiBarHorizontal = function() {
	    var margin = {top: 0, right: 0, bottom: 0, left: 0},
	        width = 960,
	        height = 500,
	        id = Math.floor(Math.random() * 10000), //Create semi-unique ID in case user doesn't select one
	        x = d3.scale.ordinal(),
	        y = d3.scale.linear(),
	        getX = function(d) { return d.x },
	        getY = function(d) { return d.y },
	        forceY = [0], // 0 is forced by default.. this makes sense for the majority of bar graphs... user can always do chart.forceY([]) to remove
	        color = nv.utils.defaultColor(),
	        stacked = false,
	        showValues = false,
	        valuePadding = 60,
	        valueFormat = d3.format(',.2f'),
	        delay = 1200,
	        xDomain, yDomain,
	        x0, y0;

	    var dispatch = d3.dispatch('chartClick', 'elementClick', 'elementDblClick', 'elementMouseover', 'elementMouseout');


	    function chart(selection) {
	      selection.each(function(data) {
	        var availableWidth = width - margin.left - margin.right,
	            availableHeight = height - margin.top - margin.bottom;


	        if (stacked)
	          data = d3.layout.stack()
	                       .offset('zero')
	                       .values(function(d){ return d.values })
	                       .y(getY)
	                       (data);


	        //add series index to each data point for reference
	        data = data.map(function(series, i) {
	          series.values = series.values.map(function(point) {
	            point.series = i;
	            return point;
	          });
	          return series;
	        });


	        var seriesData = (xDomain && yDomain) ? [] : // if we know xDomain and yDomain, no need to calculate
	              data.map(function(d) {
	                return d.values.map(function(d,i) {
	                  return { x: getX(d,i), y: getY(d,i), y0: d.y0 }
	                })
	              });

	        x   .domain(xDomain || d3.merge(seriesData).map(function(d) { return d.x }))
	            .rangeBands([0, availableHeight], .1);

	        y   .domain(yDomain || d3.extent(d3.merge(seriesData).map(function(d) { return d.y + (stacked ? d.y0 : 0) }).concat(forceY)))
	            //.range([0, availableWidth]);

	        if (showValues && !stacked) y.range([(y.domain()[0] < 0 ? valuePadding : 0), availableWidth - (y.domain()[1] > 0 ? valuePadding : 0) ]);
	        else y.range([0, availableWidth]);

	        //store old scales if they exist
	        x0 = x0 || x;
	        y0 = y0 || d3.scale.linear().domain(y.domain()).range([y(0),y(0)]);

	        var wrap = d3.select(this).selectAll('g.nv-wrap.nv-multibarHorizontal').data([data]);
	        var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-multibarHorizontal');
	        var defsEnter = wrapEnter.append('defs');
	        var gEnter = wrapEnter.append('g');

	        gEnter.append('g').attr('class', 'nv-groups');

	        var g = wrap.select('g')
	        wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');



	        var groups = wrap.select('.nv-groups').selectAll('.nv-group')
	            .data(function(d) { return d }, function(d) { return d.key });
	        groups.enter().append('g')
	            .style('stroke-opacity', 1e-6)
	            .style('fill-opacity', 1e-6);
	        d3.transition(groups.exit())
	            .style('stroke-opacity', 1e-6)
	            .style('fill-opacity', 1e-6)
	            .remove();
	        groups
	            .attr('class', function(d,i) { return 'nv-group nv-series-' + i })
	            .classed('hover', function(d) { return d.hover })
	            .style('fill', function(d,i){ return color(d, i) })
	            .style('stroke', function(d,i){ return color(d, i) });
	        d3.transition(groups)
	            .style('stroke-opacity', 1)
	            .style('fill-opacity', .75);


	        var bars = groups.selectAll('g.nv-bar')
	            .data(function(d) { return d.values });

	        bars.exit().remove();


	        var barsEnter = bars.enter().append('g')
	            .attr('transform', function(d,i,j) {
	                return 'translate(' + y0(stacked ? d.y0 : 0) + ',' + (stacked ? 0 : (j * x.rangeBand() / data.length ) + x(getX(d,i))) + ')'
	            });

	        barsEnter.append('rect')
	            .attr('width', 0)
	            .attr('height', x.rangeBand() / (stacked ? 1 : data.length) )

	        bars
	            .on('mouseover', function(d,i) { //TODO: figure out why j works above, but not here
	              d3.select(this).classed('hover', true);
	              dispatch.elementMouseover({
	                value: getY(d,i),
	                point: d,
	                series: data[d.series],
	                pos: [ y(getY(d,i) + (stacked ? d.y0 : 0)), x(getX(d,i)) + (x.rangeBand() * (stacked ? data.length / 2 : d.series + .5) / data.length) ],
	                pointIndex: i,
	                seriesIndex: d.series,
	                e: d3.event
	              });
	            })
	            .on('mouseout', function(d,i) {
	              d3.select(this).classed('hover', false);
	              dispatch.elementMouseout({
	                value: getY(d,i),
	                point: d,
	                series: data[d.series],
	                pointIndex: i,
	                seriesIndex: d.series,
	                e: d3.event
	              });
	            })
	            .on('click', function(d,i) {
	              dispatch.elementClick({
	                value: getY(d,i),
	                point: d,
	                series: data[d.series],
	                pos: [x(getX(d,i)) + (x.rangeBand() * (stacked ? data.length / 2 : d.series + .5) / data.length), y(getY(d,i) + (stacked ? d.y0 : 0))],  // TODO: Figure out why the value appears to be shifted
	                pointIndex: i,
	                seriesIndex: d.series,
	                e: d3.event
	              });
	              d3.event.stopPropagation();
	            })
	            .on('dblclick', function(d,i) {
	              dispatch.elementDblClick({
	                value: getY(d,i),
	                point: d,
	                series: data[d.series],
	                pos: [x(getX(d,i)) + (x.rangeBand() * (stacked ? data.length / 2 : d.series + .5) / data.length), y(getY(d,i) + (stacked ? d.y0 : 0))],  // TODO: Figure out why the value appears to be shifted
	                pointIndex: i,
	                seriesIndex: d.series,
	                e: d3.event
	              });
	              d3.event.stopPropagation();
	            });

	        if (showValues && !stacked) {
	          barsEnter.append('text')
	              .attr('text-anchor', function(d,i) { return getY(d,i) < 0 ? 'end' : 'start' })
	          bars.select('text')
	              .attr('y', x.rangeBand() / 2)
	              .attr('dy', '-.32em')
	              .text(function(d,i) { return valueFormat(getY(d,i)) })
	          d3.transition(bars)
	              //.delay(function(d,i) { return i * delay / data[0].values.length })
	            .select('text')
	              .attr('x', function(d,i) { return getY(d,i) < 0 ? -4 : y(getY(d,i)) - y(0) + 4 })
	        } else {
	          bars.selectAll('text').remove();
	        }

	        bars
	            .attr('class', function(d,i) { return getY(d,i) < 0 ? 'nv-bar negative' : 'nv-bar positive'})
	            //.attr('transform', function(d,i,j) {
	                //return 'translate(' + y0(stacked ? d.y0 : 0) + ',' + x(getX(d,i)) + ')'
	            //})
	        if (stacked)
	          d3.transition(bars)
	              //.delay(function(d,i) { return i * delay / data[0].values.length })
	              .attr('transform', function(d,i) {
	                //return 'translate(' + y(d.y0) + ',0)'
	                return 'translate(' + y(d.y0) + ',' + x(getX(d,i)) + ')'
	              })
	            .select('rect')
	              .attr('width', function(d,i) {
	                return Math.abs(y(getY(d,i) + d.y0) - y(d.y0))
	              })
	              .attr('height', x.rangeBand() );
	        else
	          d3.transition(bars)
	            //.delay(function(d,i) { return i * delay / data[0].values.length })
	              .attr('transform', function(d,i) {
	                //TODO: stacked must be all positive or all negative, not both?
	                return 'translate(' + 
	                (getY(d,i) < 0 ? y(getY(d,i)) : y(0))
	                + ',' +
	                (d.series * x.rangeBand() / data.length
	                +
	                x(getX(d,i)) )
	                + ')'
	              })
	            .select('rect')
	              .attr('height', x.rangeBand() / data.length )
	              .attr('width', function(d,i) {
	                return Math.abs(y(getY(d,i)) - y(0))
	              });
	            /*
	        if (stacked)
	          d3.transition(bars)
	              .delay(function(d,i) { return i * 1000 / data[0].values.length })
	              .attr('x', function(d,i) {
	                return y(d.y0);
	              })
	              .attr('width', function(d,i) {
	                return Math.abs(y(getY(d,i) + d.y0) - y(d.y0))
	              })
	              .each('end', function() {
	                d3.transition(d3.select(this))
	                  .attr('y', function(d,i) {
	                    return 0
	                  })
	                  .attr('height', x.rangeBand() );
	              })
	        else
	          d3.transition(bars)
	            .delay(function(d,i) { return i * 1200 / data[0].values.length })
	              .attr('y', function(d,i) {
	                return d.series * x.rangeBand() / data.length
	              })
	              .attr('height', x.rangeBand() / data.length )
	              .each('end', function() {
	                d3.transition(d3.select(this))
	                  .attr('x', function(d,i) {
	                    return getY(d,i) < 0 ? //TODO: stacked must be all positive or all negative, not both?
	                        y(getY(d,i)) :
	                        y(0)
	                  })
	                  .attr('width', function(d,i) {
	                    return Math.abs(y(getY(d,i)) - y(0))
	                  });
	              })
	              */




	        //TODO: decide if this makes sense to add into all the models for ease of updating (updating without needing the selection)
	        chart.update = function() {
	          selection.transition().call(chart);
	        }

	        //store old scales for use in transitions on update, to animate from old to new positions, and sizes
	        x0 = x.copy();
	        y0 = y.copy();

	      });

	      return chart;
	    }


	    chart.dispatch = dispatch;

	    chart.x = function(_) {
	      if (!arguments.length) return getX;
	      getX = _;
	      return chart;
	    };

	    chart.y = function(_) {
	      if (!arguments.length) return getY;
	      getY = _;
	      return chart;
	    };

	    chart.margin = function(_) {
	      if (!arguments.length) return margin;
	      margin = _;
	      return chart;
	    };

	    chart.width = function(_) {
	      if (!arguments.length) return width;
	      width = _;
	      return chart;
	    };

	    chart.height = function(_) {
	      if (!arguments.length) return height;
	      height = _;
	      return chart;
	    };

	    chart.xScale = function(_) {
	      if (!arguments.length) return x;
	      x = _;
	      return chart;
	    };

	    chart.yScale = function(_) {
	      if (!arguments.length) return y;
	      y = _;
	      return chart;
	    };

	    chart.xDomain = function(_) {
	      if (!arguments.length) return xDomain;
	      xDomain = _;
	      return chart;
	    };

	    chart.yDomain = function(_) {
	      if (!arguments.length) return yDomain;
	      yDomain = _;
	      return chart;
	    };

	    chart.forceY = function(_) {
	      if (!arguments.length) return forceY;
	      forceY = _;
	      return chart;
	    };

	    chart.stacked = function(_) {
	      if (!arguments.length) return stacked;
	      stacked = _;
	      return chart;
	    };

	    chart.color = function(_) {
	      if (!arguments.length) return color;
	      color = nv.utils.getColor(_);
	      return chart;
	    };

	    chart.id = function(_) {
	      if (!arguments.length) return id;
	      id = _;
	      return chart;
	    };

	    chart.delay = function(_) {
	      if (!arguments.length) return delay;
	      delay = _;
	      return chart;
	    };

	    chart.showValues = function(_) {
	      if (!arguments.length) return showValues;
	      showValues = _;
	      return chart;
	    };

	    chart.valueFormat= function(_) {
	      if (!arguments.length) return valueFormat;
	      valueFormat = _;
	      return chart;
	    };

	    chart.valuePadding = function(_) {
	      if (!arguments.length) return valuePadding;
	      valuePadding = _;
	      return chart;
	    };


	    return chart;
	  }

	  nv.models.multiBarHorizontalChart = function() {
	    var margin = {top: 30, right: 20, bottom: 50, left: 60},
	        width = null,
	        height = null,
	        color = nv.utils.defaultColor(),
	        showControls = true,
	        showLegend = true,
	        stacked = false,
	        tooltips = true,
	        tooltip = function(key, x, y, e, graph) { 
	          return '<h3>' + key + " - " + x + '</h3>' +
	                 '<p>' +  y + '</p>'
	        },
	        noData = "No Data Available."
	        ;


	    var multibar = nv.models.multiBarHorizontal().stacked(stacked),
	        x = multibar.xScale(),
	        y = multibar.yScale(),
	        xAxis = nv.models.axis().scale(x).orient('left').highlightZero(false).showMaxMin(false),
	        yAxis = nv.models.axis().scale(y).orient('bottom'),
	        legend = nv.models.legend().height(30),
	        controls = nv.models.legend().height(30),
	        dispatch = d3.dispatch('tooltipShow', 'tooltipHide');

	    xAxis.tickFormat(function(d) { return d });
	    yAxis.tickFormat(d3.format(',.1f'));

	    var showTooltip = function(e, offsetElement) {
	      var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
	          top = e.pos[1] + ( offsetElement.offsetTop || 0),
	          x = xAxis.tickFormat()(multibar.x()(e.point, e.pointIndex)),
	          y = yAxis.tickFormat()(multibar.y()(e.point, e.pointIndex)),
	          content = tooltip(e.series.key, x, y, e, chart);

	      nv.tooltip.show([left, top], content, e.value < 0 ? 'e' : 'w', null, offsetElement);
	    };

	    //TODO: let user select default
	    var controlsData = [
	      { key: 'Grouped' },
	      { key: 'Stacked', disabled: true },
	    ];

	    function chart(selection) {
	      selection.each(function(data) {
	        var container = d3.select(this),
	            that = this;

	        var availableWidth = (width  || parseInt(container.style('width')) || 960)
	                               - margin.left - margin.right,
	            availableHeight = (height || parseInt(container.style('height')) || 400)
	                               - margin.top - margin.bottom;


	        //------------------------------------------------------------
	        // Display No Data message if there's nothing to show.

	        if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
	          container.append('text')
	            .attr('class', 'nvd3 nv-noData')
	            .attr('x', availableWidth / 2)
	            .attr('y', availableHeight / 2)
	            .attr('dy', '-.7em')
	            .style('text-anchor', 'middle')
	            .text(noData);
	            return chart;
	        } else {
	          container.select('.nv-noData').remove();
	        }

	        //------------------------------------------------------------



	        var wrap = container.selectAll('g.nv-wrap.nv-multiBarHorizontalChart').data([data]);
	        var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-multiBarHorizontalChart').append('g');

	        gEnter.append('g').attr('class', 'nv-x nv-axis');
	        gEnter.append('g').attr('class', 'nv-y nv-axis');
	        gEnter.append('g').attr('class', 'nv-barsWrap');
	        gEnter.append('g').attr('class', 'nv-legendWrap');
	        gEnter.append('g').attr('class', 'nv-controlsWrap');



	        //TODO: margins should be adjusted based on what components are used: axes, axis labels, legend
	        margin.top = legend.height();

	        var g = wrap.select('g');


	        if (showLegend) {
	          legend.width(availableWidth / 2);

	          g.select('.nv-legendWrap')
	              .datum(data)
	              .call(legend);

	          if ( margin.top != legend.height()) {
	            margin.top = legend.height();
	            availableHeight = (height || parseInt(container.style('height')) || 400)
	                               - margin.top - margin.bottom;
	          }

	          g.select('.nv-legendWrap')
	              .attr('transform', 'translate(' + (availableWidth / 2) + ',' + (-margin.top) +')')
	        }


	        multibar
	          .width(availableWidth)
	          .height(availableHeight)
	          .color(data.map(function(d,i) {
	            return d.color || color(d, i);
	          }).filter(function(d,i) { return !data[i].disabled }))



	        if (showControls) {
	          controls.width(180).color(['#444', '#444', '#444']);
	          g.select('.nv-controlsWrap')
	              .datum(controlsData)
	              .attr('transform', 'translate(0,' + (-margin.top) +')')
	              .call(controls);
	        }


	        g.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


	        var barsWrap = g.select('.nv-barsWrap')
	            .datum(data.filter(function(d) { return !d.disabled }))


	        d3.transition(barsWrap).call(multibar);


	        xAxis
	          .ticks( availableHeight / 24 )
	          .tickSize(-availableWidth, 0);

	        //d3.transition(g.select('.x.axis'))
	        g.select('.nv-x.nv-axis').transition().duration(0)
	            .call(xAxis);

	        var xTicks = g.select('.nv-x.nv-axis').selectAll('g');

	        xTicks
	            .selectAll('line, text')
	            .style('opacity', 1)

	            /*
	        //I think this was just leaft over from the multiBar chart this was built from.. commented to maek sure
	        xTicks.filter(function(d,i) {
	              return i % Math.ceil(data[0].values.length / (availableWidth / 100)) !== 0;
	            })
	            .selectAll('line, text')
	            .style('opacity', 0)
	            */

	        yAxis
	          .ticks( availableWidth / 100 )
	          .tickSize( -availableHeight, 0);

	        g.select('.nv-y.nv-axis')
	            .attr('transform', 'translate(0,' + availableHeight + ')');
	        d3.transition(g.select('.nv-y.nv-axis'))
	        //g.select('.y.axis').transition().duration(0)
	            .call(yAxis);




	        legend.dispatch.on('legendClick', function(d,i) {
	          d.disabled = !d.disabled;

	          if (!data.filter(function(d) { return !d.disabled }).length) {
	            data.map(function(d) {
	              d.disabled = false;
	              wrap.selectAll('.nv-series').classed('disabled', false);
	              return d;
	            });
	          }

	          selection.transition().call(chart);
	        });

	        controls.dispatch.on('legendClick', function(d,i) { 
	          if (!d.disabled) return;
	          controlsData = controlsData.map(function(s) {
	            s.disabled = true;
	            return s;
	          });
	          d.disabled = false;

	          switch (d.key) {
	            case 'Grouped':
	              multibar.stacked(false);
	              break;
	            case 'Stacked':
	              multibar.stacked(true);
	              break;
	          }

	          selection.transition().call(chart);
	        });


	        multibar.dispatch.on('elementMouseover.tooltip', function(e) {
	          e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
	          dispatch.tooltipShow(e);
	        });
	        if (tooltips) dispatch.on('tooltipShow', function(e) { showTooltip(e, that.parentNode) } ); // TODO: maybe merge with above?

	        multibar.dispatch.on('elementMouseout.tooltip', function(e) {
	          dispatch.tooltipHide(e);
	        });
	        if (tooltips) dispatch.on('tooltipHide', nv.tooltip.cleanup);


	        //TODO: decide if this makes sense to add into all the models for ease of updating (updating without needing the selection)
	        chart.update = function() { selection.transition().call(chart) };
	        chart.container = this; // I need a reference to the container in order to have outside code check if the chart is visible or not

	      });

	      return chart;
	    }


	    chart.dispatch = dispatch;
	    chart.multibar = multibar; // really just makign the accessible for multibar.dispatch, may rethink slightly
	    chart.legend = legend;
	    chart.xAxis = xAxis;
	    chart.yAxis = yAxis;

	    d3.rebind(chart, multibar, 'x', 'y', 'xDomain', 'yDomain', 'forceX', 'forceY', 'clipEdge', 'id', 'delay', 'showValues', 'valueFormat', 'stacked');


	    chart.margin = function(_) {
	      if (!arguments.length) return margin;
	      margin = _;
	      return chart;
	    };

	    chart.width = function(_) {
	      if (!arguments.length) return width;
	      width = _;
	      return chart;
	    };

	    chart.height = function(_) {
	      if (!arguments.length) return height;
	      height = _;
	      return chart;
	    };

	    chart.color = function(_) {
	      if (!arguments.length) return color;
	      color = nv.utils.getColor(_);
	      legend.color(color);
	      return chart;
	    };

	    chart.showControls = function(_) {
	      if (!arguments.length) return showControls;
	      showControls = _;
	      return chart;
	    };

	    chart.showLegend = function(_) {
	      if (!arguments.length) return showLegend;
	      showLegend = _;
	      return chart;
	    };

	    chart.tooltip = function(_) {
	      if (!arguments.length) return tooltip;
	      tooltip = _;
	      return chart;
	    };

	    chart.tooltips = function(_) {
	      if (!arguments.length) return tooltips;
	      tooltips = _;
	      return chart;
	    };

	    chart.tooltipContent = function(_) {
	      if (!arguments.length) return tooltip;
	      tooltip = _;
	      return chart;
	    };

	    chart.noData = function(_) {
	      if (!arguments.length) return noData;
	      noData = _;
	      return chart;
	    };


	    return chart;
	  }
	  nv.models.multiChart = function() {

	    //============================================================
	    // Public Variables with Default Settings
	    //------------------------------------------------------------

	    var margin = {top: 30, right: 20, bottom: 50, left: 60},
	        color = d3.scale.category20().range(),
	        width = null, 
	        height = null,
	        showLegend = true,
	        tooltips = true,
	        tooltip = function(key, x, y, e, graph) {
	          return '<h3>' + key + '</h3>' +
	                 '<p>' +  y + ' at ' + x + '</p>'
	        },
	        x, y; //can be accessed via chart.lines.[x/y]Scale()

	    //============================================================
	    // Private Variables
	    //------------------------------------------------------------

	    var x = d3.scale.linear(),
	        yScale1 = d3.scale.linear(),
	        yScale2 = d3.scale.linear(),

	        lines1 = nv.models.line().yScale(yScale1),
	        lines2 = nv.models.line().yScale(yScale2),

	        bars1 = nv.models.multiBar().stacked(false).yScale(yScale1),
	        bars2 = nv.models.multiBar().stacked(false).yScale(yScale2),

	        stack1 = nv.models.stackedArea().yScale(yScale1),
	        stack2 = nv.models.stackedArea().yScale(yScale2),

	        xAxis = nv.models.axis().scale(x).orient('bottom').tickPadding(5),
	        yAxis1 = nv.models.axis().scale(yScale1).orient('left'),
	        yAxis2 = nv.models.axis().scale(yScale2).orient('right'),

	        legend = nv.models.legend().height(30),
	        dispatch = d3.dispatch('tooltipShow', 'tooltipHide');

	    var showTooltip = function(e, offsetElement) {
	      var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
	          top = e.pos[1] + ( offsetElement.offsetTop || 0),
	          x = xAxis.tickFormat()(lines1.x()(e.point, e.pointIndex)),
	          y = (e.series.bar ? yAxis1 : yAxis2).tickFormat()(lines1.y()(e.point, e.pointIndex)),
	          content = tooltip(e.series.key, x, y, e, chart);

	      nv.tooltip.show([left, top], content, undefined, undefined, offsetElement.offsetParent);
	    };

	    function chart(selection) {
	      selection.each(function(data) {
	        var container = d3.select(this),
	            that = this;

	        var availableWidth = (width  || parseInt(container.style('width')) || 960)
	                               - margin.left - margin.right,
	            availableHeight = (height || parseInt(container.style('height')) || 400)
	                               - margin.top - margin.bottom;

	        var dataLines1 = data.filter(function(d) {return !d.disabled && d.type == 'line' && d.yAxis == 1})
	        var dataLines2 = data.filter(function(d) {return !d.disabled && d.type == 'line' && d.yAxis == 2})
	        var dataBars1 = data.filter(function(d) {return !d.disabled && d.type == 'bar' && d.yAxis == 1})
	        var dataBars2 = data.filter(function(d) {return !d.disabled && d.type == 'bar' && d.yAxis == 2})
	        var dataStack1 = data.filter(function(d) {return !d.disabled && d.type == 'area' && d.yAxis == 1})
	        var dataStack2 = data.filter(function(d) {return !d.disabled && d.type == 'area' && d.yAxis == 2})

	        var series1 = data.filter(function(d) {return !d.disabled && d.yAxis == 1})
	              .map(function(d) {
	                return d.values.map(function(d,i) {
	                  return { x: d.x, y: d.y }
	                })
	              })

	        var series2 = data.filter(function(d) {return !d.disabled && d.yAxis == 2})
	              .map(function(d) {
	                return d.values.map(function(d,i) {
	                  return { x: d.x, y: d.y }
	                })
	              })

	        x   .domain(d3.extent(d3.merge(series1.concat(series2)), function(d) { return d.x } ))
	            .range([0, availableWidth]);

	        var wrap = container.selectAll('g.wrap.multiChart').data([data]);
	        var gEnter = wrap.enter().append('g').attr('class', 'wrap nvd3 multiChart').append('g');

	        gEnter.append('g').attr('class', 'x axis');
	        gEnter.append('g').attr('class', 'y1 axis');
	        gEnter.append('g').attr('class', 'y2 axis');
	        gEnter.append('g').attr('class', 'lines1Wrap');
	        gEnter.append('g').attr('class', 'lines2Wrap');
	        gEnter.append('g').attr('class', 'bars1Wrap');
	        gEnter.append('g').attr('class', 'bars2Wrap');
	        gEnter.append('g').attr('class', 'stack1Wrap');
	        gEnter.append('g').attr('class', 'stack2Wrap');
	        gEnter.append('g').attr('class', 'legendWrap');

	        var g = wrap.select('g');

	        if (showLegend) {
	          legend.width( availableWidth / 2 );

	          g.select('.legendWrap')
	              .datum(data.map(function(series) { 
	                series.originalKey = series.originalKey === undefined ? series.key : series.originalKey;
	                series.key = series.originalKey + (series.yAxis == 1 ? '' : ' (right axis)');
	                return series;
	              }))
	            .call(legend);

	          if ( margin.top != legend.height()) {
	            margin.top = legend.height();
	            availableHeight = (height || parseInt(container.style('height')) || 400)
	                               - margin.top - margin.bottom;
	          }

	          g.select('.legendWrap')
	              .attr('transform', 'translate(' + ( availableWidth / 2 ) + ',' + (-margin.top) +')');
	        }


	        lines1
	          .width(availableWidth)
	          .height(availableHeight)
	          .interpolate("monotone")
	          .color(data.map(function(d,i) {
	            return d.color || color[i % color.length];
	          }).filter(function(d,i) { return !data[i].disabled && data[i].yAxis == 1 && data[i].type == 'line'}));

	        lines2
	          .width(availableWidth)
	          .height(availableHeight)
	          .interpolate("monotone")
	          .color(data.map(function(d,i) {
	            return d.color || color[i % color.length];
	          }).filter(function(d,i) { return !data[i].disabled && data[i].yAxis == 2 && data[i].type == 'line'}));

	        bars1
	          .width(availableWidth)
	          .height(availableHeight)
	          .color(data.map(function(d,i) {
	            return d.color || color[i % color.length];
	          }).filter(function(d,i) { return !data[i].disabled && data[i].yAxis == 1 && data[i].type == 'bar'}));

	        bars2
	          .width(availableWidth)
	          .height(availableHeight)
	          .color(data.map(function(d,i) {
	            return d.color || color[i % color.length];
	          }).filter(function(d,i) { return !data[i].disabled && data[i].yAxis == 2 && data[i].type == 'bar'}));

	        stack1
	          .width(availableWidth)
	          .height(availableHeight)
	          .color(data.map(function(d,i) {
	            return d.color || color[i % color.length];
	          }).filter(function(d,i) { return !data[i].disabled && data[i].yAxis == 1 && data[i].type == 'area'}));

	        stack2
	          .width(availableWidth)
	          .height(availableHeight)
	          .color(data.map(function(d,i) {
	            return d.color || color[i % color.length];
	          }).filter(function(d,i) { return !data[i].disabled && data[i].yAxis == 2 && data[i].type == 'area'}));

	        g.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


	        var lines1Wrap = g.select('.lines1Wrap')
	            .datum(dataLines1)
	        var bars1Wrap = g.select('.bars1Wrap')
	            .datum(dataBars1)
	        var stack1Wrap = g.select('.stack1Wrap')
	            .datum(dataStack1)

	        var lines2Wrap = g.select('.lines2Wrap')
	            .datum(dataLines2)
	        var bars2Wrap = g.select('.bars2Wrap')
	            .datum(dataBars2)
	        var stack2Wrap = g.select('.stack2Wrap')
	            .datum(dataStack2)

	        var extraValue1 = dataStack1.length ? dataStack1.map(function(a){return a.values}).reduce(function(a,b){
	          return a.map(function(aVal,i){return {x: aVal.x, y: aVal.y + b[i].y}})
	        }).concat([{x:0, y:0}]) : []
	        var extraValue2 = dataStack2.length ? dataStack2.map(function(a){return a.values}).reduce(function(a,b){
	          return a.map(function(aVal,i){return {x: aVal.x, y: aVal.y + b[i].y}})
	        }).concat([{x:0, y:0}]) : []

	        yScale1 .domain(d3.extent(d3.merge(series1).concat(extraValue1), function(d) { return d.y } ))
	                .range([0, availableHeight])

	        yScale2 .domain(d3.extent(d3.merge(series2).concat(extraValue2), function(d) { return d.y } ))
	                .range([0, availableHeight])

	        lines1.yDomain(yScale1.domain())
	        bars1.yDomain(yScale1.domain())
	        stack1.yDomain(yScale1.domain())

	        lines2.yDomain(yScale2.domain())
	        bars2.yDomain(yScale2.domain())
	        stack2.yDomain(yScale2.domain())

	        if(dataStack1.length){d3.transition(stack1Wrap).call(stack1);}
	        if(dataStack2.length){d3.transition(stack2Wrap).call(stack2);}

	        if(dataBars1.length){d3.transition(bars1Wrap).call(bars1);}
	        if(dataBars2.length){d3.transition(bars2Wrap).call(bars2);}

	        if(dataLines1.length){d3.transition(lines1Wrap).call(lines1);}
	        if(dataLines2.length){d3.transition(lines2Wrap).call(lines2);}
	        


	        xAxis
	          .ticks( availableWidth / 100 )
	          .tickSize(-availableHeight, 0);

	        g.select('.x.axis')
	            .attr('transform', 'translate(0,' + availableHeight + ')');
	        d3.transition(g.select('.x.axis'))
	            .call(xAxis);

	        yAxis1
	          .ticks( availableHeight / 36 )
	          .tickSize( -availableWidth, 0);


	        d3.transition(g.select('.y1.axis'))
	            .call(yAxis1);

	        yAxis2
	          .ticks( availableHeight / 36 )
	          .tickSize( -availableWidth, 0);

	        d3.transition(g.select('.y2.axis'))
	            .call(yAxis2);

	        g.select('.y2.axis')
	            .style('opacity', series2.length ? 1 : 0)
	            .attr('transform', 'translate(' + x.range()[1] + ',0)');

	        legend.dispatch.on('legendClick', function(d,i) { 
	          d.disabled = !d.disabled;

	          if (!data.filter(function(d) { return !d.disabled }).length) {
	            data.map(function(d) {
	              d.disabled = false;
	              wrap.selectAll('.series').classed('disabled', false);
	              return d;
	            });
	          }
	          selection.transition().call(chart);
	        });

	        dispatch.on('tooltipShow', function(e) {
	          if (tooltips) showTooltip(e, that.parentNode);
	        });

	      });

	      chart.update = function() { chart(selection) };
	      chart.container = this;

	      return chart;
	    }


	    //============================================================
	    // Event Handling/Dispatching (out of chart's scope)
	    //------------------------------------------------------------

	    lines1.dispatch.on('elementMouseover.tooltip', function(e) {
	      e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
	      dispatch.tooltipShow(e);
	    });

	    lines1.dispatch.on('elementMouseout.tooltip', function(e) {
	      dispatch.tooltipHide(e);
	    });

	    lines2.dispatch.on('elementMouseover.tooltip', function(e) {
	      e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
	      dispatch.tooltipShow(e);
	    });

	    lines2.dispatch.on('elementMouseout.tooltip', function(e) {
	      dispatch.tooltipHide(e);
	    });

	    bars1.dispatch.on('elementMouseover.tooltip', function(e) {
	      e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
	      dispatch.tooltipShow(e);
	    });

	    bars1.dispatch.on('elementMouseout.tooltip', function(e) {
	      dispatch.tooltipHide(e);
	    });

	    bars2.dispatch.on('elementMouseover.tooltip', function(e) {
	      e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
	      dispatch.tooltipShow(e);
	    });

	    bars2.dispatch.on('elementMouseout.tooltip', function(e) {
	      dispatch.tooltipHide(e);
	    });

	    stack1.dispatch.on('tooltipShow', function(e) {
	      //disable tooltips when value ~= 0
	      //// TODO: consider removing points from voronoi that have 0 value instead of this hack
	      if (!Math.round(stack1.y()(e.point) * 100)) {  // 100 will not be good for very small numbers... will have to think about making this valu dynamic, based on data range
	        setTimeout(function() { d3.selectAll('.point.hover').classed('hover', false) }, 0);
	        return false;
	      }

	      e.pos = [e.pos[0] + margin.left, e.pos[1] + margin.top],
	      dispatch.tooltipShow(e);
	    });

	    stack1.dispatch.on('tooltipHide', function(e) {
	      dispatch.tooltipHide(e);
	    });

	    stack2.dispatch.on('tooltipShow', function(e) {
	      //disable tooltips when value ~= 0
	      //// TODO: consider removing points from voronoi that have 0 value instead of this hack
	      if (!Math.round(stack2.y()(e.point) * 100)) {  // 100 will not be good for very small numbers... will have to think about making this valu dynamic, based on data range
	        setTimeout(function() { d3.selectAll('.point.hover').classed('hover', false) }, 0);
	        return false;
	      }

	      e.pos = [e.pos[0] + margin.left, e.pos[1] + margin.top],
	      dispatch.tooltipShow(e);
	    });

	    stack2.dispatch.on('tooltipHide', function(e) {
	      dispatch.tooltipHide(e);
	    });

	      lines1.dispatch.on('elementMouseover.tooltip', function(e) {
	      e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
	      dispatch.tooltipShow(e);
	    });

	    lines1.dispatch.on('elementMouseout.tooltip', function(e) {
	      dispatch.tooltipHide(e);
	    });

	    lines2.dispatch.on('elementMouseover.tooltip', function(e) {
	      e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
	      dispatch.tooltipShow(e);
	    });

	    lines2.dispatch.on('elementMouseout.tooltip', function(e) {
	      dispatch.tooltipHide(e);
	    });

	    dispatch.on('tooltipHide', function() {
	      if (tooltips) nv.tooltip.cleanup();
	    });



	    //============================================================
	    // Global getters and setters
	    //------------------------------------------------------------

	    chart.dispatch = dispatch;
	    chart.lines1 = lines1;
	    chart.lines2 = lines2;
	    chart.bars1 = bars1;
	    chart.bars2 = bars2;
	    chart.stack1 = stack1;
	    chart.stack2 = stack2;
	    chart.xAxis = xAxis;
	    chart.yAxis1 = yAxis1;
	    chart.yAxis2 = yAxis2;

	    chart.x = function(_) {
	      if (!arguments.length) return getX;
	      getX = _;
	      lines1.x(_);
	      bars1.x(_);
	      return chart;
	    };

	    chart.y = function(_) {
	      if (!arguments.length) return getY;
	      getY = _;
	      lines1.y(_);
	      bars1.y(_);
	      return chart;
	    };

	    chart.margin = function(_) {
	      if (!arguments.length) return margin;
	      margin = _;
	      return chart;
	    };

	    chart.width = function(_) {
	      if (!arguments.length) return width;
	      width = _;
	      return chart;
	    };

	    chart.height = function(_) {
	      if (!arguments.length) return height;
	      height = _;
	      return chart;
	    };

	    chart.color = function(_) {
	      if (!arguments.length) return color;
	      color = _;
	      legend.color(_);
	      return chart;
	    };

	    chart.showLegend = function(_) {
	      if (!arguments.length) return showLegend;
	      showLegend = _;
	      return chart;
	    };

	    chart.tooltips = function(_) {
	      if (!arguments.length) return tooltips;
	      tooltips = _;
	      return chart;
	    };

	    chart.tooltipContent = function(_) {
	      if (!arguments.length) return tooltip;
	      tooltip = _;
	      return chart;
	    };

	    return chart;
	  }

	  //TODO: eitehr drastically clean up or deprecate this model
	  nv.models.ohlcBar = function() {
	    var margin = {top: 0, right: 0, bottom: 0, left: 0},
	        width = 960,
	        height = 500,
	        id = Math.floor(Math.random() * 10000), //Create semi-unique ID in case user doesn't select one
	        getX = function(d) { return d.x },
	        getY = function(d) { return d.y },
	        getOpen = function(d) { return d.open },
	        getClose = function(d) { return d.close },
	        getHigh = function(d) { return d.high },
	        getLow = function(d) { return d.low },
	        forceX = [],
	        forceY = [],
	        clipEdge = true,
	        color = nv.utils.defaultColor(),
	        xDomain, yDomain;

	    var x = d3.scale.linear(),
	        y = d3.scale.linear(),
	        xAxis = d3.svg.axis().scale(x).orient('bottom'),
	        yAxis = d3.svg.axis().scale(y).orient('left'),
	        dispatch = d3.dispatch('chartClick', 'elementClick', 'elementDblClick', 'elementMouseover', 'elementMouseout');


	    function chart(selection) {
	      selection.each(function(data) {
	        var availableWidth = width - margin.left - margin.right,
	            availableHeight = height - margin.top - margin.bottom;


	        x   .domain(xDomain || d3.extent(data[0].values.map(getX).concat(forceX) ))
	            .range([0, availableWidth]);

	        //y   .domain(yDomain || d3.extent(data[0].values.map(getY).concat(forceY) ))
	        y   .domain(yDomain || [
	              d3.min(data[0].values.map(getLow).concat(forceY)),
	              d3.max(data[0].values.map(getHigh).concat(forceY))
	            ])
	            .range([availableHeight, 0]);

	        // If scale's domain don't have a range, slightly adjust to make one... so a chart can show a single data point
	        if (x.domain()[0] === x.domain()[1] || y.domain()[0] === y.domain()[1]) singlePoint = true;
	        if (x.domain()[0] === x.domain()[1])
	          x.domain()[0] ?
	              x.domain([x.domain()[0] - x.domain()[0] * 0.01, x.domain()[1] + x.domain()[1] * 0.01])
	            : x.domain([-1,1]);

	        if (y.domain()[0] === y.domain()[1])
	          y.domain()[0] ?
	              y.domain([y.domain()[0] + y.domain()[0] * 0.01, y.domain()[1] - y.domain()[1] * 0.01])
	            : y.domain([-1,1]);


	        var parent = d3.select(this)
	            .on('click', function(d,i) {
	              dispatch.chartClick({
	                  data: d,
	                  index: i,
	                  pos: d3.event,
	                  id: id
	              });
	            });


	        var wrap = d3.select(this).selectAll('g.nv-wrap.nv-ohlcBar').data([data[0].values]);
	        var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-ohlcBar');
	        var gEnter = wrapEnter.append('g');

	        gEnter.append('g').attr('class', 'nv-ticks');


	        wrap.attr('width', width)
	            .attr('height', height);

	        var g = wrap.select('g')
	            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


	        wrapEnter.append('defs').append('clipPath')
	            .attr('id', 'nv-chart-clip-path-' + id)
	          .append('rect');
	        wrap.select('#nv-chart-clip-path-' + id + ' rect')
	            .attr('width', availableWidth)
	            .attr('height', availableHeight);

	        gEnter
	            .attr('clip-path', clipEdge ? 'url(#nv-chart-clip-path-' + id + ')' : '');

	        var shiftWrap = gEnter.append('g').attr('class', 'nv-shiftWrap');



	        var ticks = wrap.select('.nv-ticks').selectAll('.nv-tick')
	            .data(function(d) { return d });

	        ticks.exit().remove();


	        var ticksEnter = ticks.enter().append('path')
	            .attr('class', function(d,i,j) { return (getOpen(d,i) > getClose(d,i) ? 'nv-tick negative' : 'nv-tick positive') + ' nv-tick-' + j + '-' + i })
	            .attr('d', function(d,i) {
	              var w = (availableWidth / data[0].values.length) * .9;
	              return 'm0,0l0,' 
	                   + (y(getOpen(d,i))
	                   - y(getHigh(d,i)))
	                   + 'l'
	                   + (-w/2)
	                   + ',0l'
	                   + (w/2)
	                   + ',0l0,'
	                   + (y(getLow(d,i)) - y(getOpen(d,i)))
	                   + 'l0,'
	                   + (y(getClose(d,i))
	                   - y(getLow(d,i)))
	                   + 'l'
	                   + (w/2)
	                   + ',0l'
	                   + (-w/2)
	                   + ',0z';
	            })
	            .attr('transform', function(d,i) { return 'translate(' + x(getX(d,i)) + ',' + y(getHigh(d,i)) + ')'; })
	            //.attr('fill', function(d,i) { return color[0]; })
	            //.attr('stroke', function(d,i) { return color[0]; })
	            //.attr('x', 0 )
	            //.attr('y', function(d,i) {  return y(Math.max(0, getY(d,i))) })
	            //.attr('height', function(d,i) { return Math.abs(y(getY(d,i)) - y(0)) })
	            .on('mouseover', function(d,i) {
	              d3.select(this).classed('hover', true);
	              dispatch.elementMouseover({
	                  point: d,
	                  series: data[0],
	                  pos: [x(getX(d,i)), y(getY(d,i))],  // TODO: Figure out why the value appears to be shifted
	                  pointIndex: i,
	                  seriesIndex: 0,
	                  e: d3.event
	              });

	            })
	            .on('mouseout', function(d,i) {
	                  d3.select(this).classed('hover', false);
	                  dispatch.elementMouseout({
	                      point: d,
	                      series: data[0],
	                      pointIndex: i,
	                      seriesIndex: 0,
	                      e: d3.event
	                  });
	            })
	            .on('click', function(d,i) {
	                  dispatch.elementClick({
	                      //label: d[label],
	                      value: getY(d,i),
	                      data: d,
	                      index: i,
	                      pos: [x(getX(d,i)), y(getY(d,i))],
	                      e: d3.event,
	                      id: id
	                  });
	                d3.event.stopPropagation();
	            })
	            .on('dblclick', function(d,i) {
	                dispatch.elementDblClick({
	                    //label: d[label],
	                    value: getY(d,i),
	                    data: d,
	                    index: i,
	                    pos: [x(getX(d,i)), y(getY(d,i))],
	                    e: d3.event,
	                    id: id
	                });
	                d3.event.stopPropagation();
	            });

	        ticks
	            .attr('class', function(d,i,j) { return (getOpen(d,i) > getClose(d,i) ? 'nv-tick negative' : 'nv-tick positive') + ' nv-tick-' + j + '-' + i })
	        d3.transition(ticks)
	            .attr('transform', function(d,i) { return 'translate(' + x(getX(d,i)) + ',' + y(getHigh(d,i)) + ')'; })
	            .attr('d', function(d,i) {
	              var w = (availableWidth / data[0].values.length) * .9;
	              return 'm0,0l0,'
	                   + (y(getOpen(d,i))
	                   - y(getHigh(d,i)))
	                   + 'l'
	                   + (-w/2)
	                   + ',0l'
	                   + (w/2)
	                   + ',0l0,'
	                   + (y(getLow(d,i))
	                   - y(getOpen(d,i)))
	                   + 'l0,'
	                   + (y(getClose(d,i))
	                   - y(getLow(d,i)))
	                   + 'l'
	                   + (w/2)
	                   + ',0l'
	                   + (-w/2)
	                   + ',0z';
	            })
	            //.attr('width', (availableWidth / data[0].values.length) * .9 )


	        //d3.transition(ticks)
	            //.attr('y', function(d,i) {  return y(Math.max(0, getY(d,i))) })
	            //.attr('height', function(d,i) { return Math.abs(y(getY(d,i)) - y(0)) });
	            //.order();  // not sure if this makes any sense for this model

	      });

	      return chart;
	    }


	    chart.dispatch = dispatch;

	    chart.x = function(_) {
	      if (!arguments.length) return getX;
	      getX = _;
	      return chart;
	    };

	    chart.y = function(_) {
	      if (!arguments.length) return getY;
	      getY = _;
	      return chart;
	    };

	    chart.open = function(_) {
	      if (!arguments.length) return getOpen;
	      getOpen = _;
	      return chart;
	    };

	    chart.close = function(_) {
	      if (!arguments.length) return getClose;
	      getClose = _;
	      return chart;
	    };

	    chart.high = function(_) {
	      if (!arguments.length) return getHigh;
	      getHigh = _;
	      return chart;
	    };

	    chart.low = function(_) {
	      if (!arguments.length) return getLow;
	      getLow = _;
	      return chart;
	    };

	    chart.margin = function(_) {
	      if (!arguments.length) return margin;
	      margin = _;
	      return chart;
	    };

	    chart.width = function(_) {
	      if (!arguments.length) return width;
	      width = _;
	      return chart;
	    };

	    chart.height = function(_) {
	      if (!arguments.length) return height;
	      height = _;
	      return chart;
	    };

	    chart.xScale = function(_) {
	      if (!arguments.length) return x;
	      x = _;
	      return chart;
	    };

	    chart.yScale = function(_) {
	      if (!arguments.length) return y;
	      y = _;
	      return chart;
	    };

	    chart.xDomain = function(_) {
	      if (!arguments.length) return xDomain;
	      xDomain = _;
	      return chart;
	    };

	    chart.yDomain = function(_) {
	      if (!arguments.length) return yDomain;
	      yDomain = _;
	      return chart;
	    };

	    chart.forceX = function(_) {
	      if (!arguments.length) return forceX;
	      forceX = _;
	      return chart;
	    };

	    chart.forceY = function(_) {
	      if (!arguments.length) return forceY;
	      forceY = _;
	      return chart;
	    };

	    chart.clipEdge = function(_) {
	      if (!arguments.length) return clipEdge;
	      clipEdge = _;
	      return chart;
	    };

	    chart.color = function(_) {
	      if (!arguments.length) return color;
	      color = nv.utils.getColor(_);
	      return chart;
	    };

	    chart.id = function(_) {
	      if (!arguments.length) return id;
	      id = _;
	      return chart;
	    };



	    return chart;
	  }

	  nv.models.pie = function() {
	    var margin = {top: 0, right: 0, bottom: 0, left: 0},
	        width = 500,
	        height = 500,
	        getValues = function(d) { return d.values },
	        getX = function(d) { return d.x },
	        getY = function(d) { return d.y },
	        id = Math.floor(Math.random() * 10000), //Create semi-unique ID in case user doesn't select one
	        color = nv.utils.defaultColor(),
	        valueFormat = d3.format(',.2f'),
	        showLabels = true,
	        donutLabelsOutside = false,
	        labelThreshold = .02, //if slice percentage is under this, don't show label
	        donut = false;

	    var  dispatch = d3.dispatch('chartClick', 'elementClick', 'elementDblClick', 'elementMouseover', 'elementMouseout');

	    function chart(selection) {
	      selection.each(function(data) {
	        var availableWidth = width - margin.left - margin.right,
	            availableHeight = height - margin.top - margin.bottom,
	            radius = Math.min(availableWidth, availableHeight) / 2;

	        var container = d3.select(this)
	            .on('click', function(d,i) {
	                dispatch.chartClick({
	                    data: d,
	                    index: i,
	                    pos: d3.event,
	                    id: id
	                });
	            });


	        var wrap = container.selectAll('.nv-wrap.nv-pie').data([getValues(data[0])]);
	        var wrapEnter = wrap.enter().append('g').attr('class','nvd3 nv-wrap nv-pie nv-chart-' + id);
	        var gEnter = wrapEnter.append('g');
	        var g = wrap.select('g')

	        gEnter.append('g').attr('class', 'nv-pie');

	        wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	        g.select('.nv-pie').attr('transform', 'translate(' + availableWidth / 2 + ',' + availableHeight / 2 + ')');



	        var arc = d3.svg.arc()
	                    .outerRadius((radius-(radius / 5)));

	        if (donut) arc.innerRadius(radius / 2);


	        // Setup the Pie chart and choose the data element
	        var pie = d3.layout.pie()
	            .sort(null)
	            .value(function(d) { return d.disabled ? 0 : getY(d) });

	        var slices = wrap.select('.nv-pie').selectAll('.nv-slice')
	            .data(pie);

	        slices.exit().remove();

	        var ae = slices.enter().append('g')
	                .attr('class', 'nv-slice')
	                .on('mouseover', function(d,i){
	                  d3.select(this).classed('hover', true);
	                  dispatch.elementMouseover({
	                      label: getX(d.data),
	                      value: getY(d.data),
	                      point: d.data,
	                      pointIndex: i,
	                      pos: [d3.event.pageX, d3.event.pageY],
	                      id: id
	                  });
	                })
	                .on('mouseout', function(d,i){
	                  d3.select(this).classed('hover', false);
	                  dispatch.elementMouseout({
	                      label: getX(d.data),
	                      value: getY(d.data),
	                      point: d.data,
	                      index: i,
	                      id: id
	                  });
	                })
	                .on('click', function(d,i) {
	                  dispatch.elementClick({
	                      label: getX(d.data),
	                      value: getY(d.data),
	                      point: d.data,
	                      index: i,
	                      pos: d3.event,
	                      id: id
	                  });
	                  d3.event.stopPropagation();
	                })
	                .on('dblclick', function(d,i) {
	                  dispatch.elementDblClick({
	                      label: getX(d.data),
	                      value: getY(d.data),
	                      point: d.data,
	                      index: i,
	                      pos: d3.event,
	                      id: id
	                  });
	                  d3.event.stopPropagation();
	                });

	          slices
	              .attr('fill', function(d,i) { return color(d, i); })
	              .attr('stroke', function(d,i) { return color(d, i); });

	          var paths = ae.append('path')
	              .each(function(d) { this._current = d; });
	              //.attr('d', arc);

	          d3.transition(slices.select('path'))
	              .attr('d', arc)
	              //.ease('bounce')
	              .attrTween('d', arcTween);
	              //.attrTween('d', tweenPie);

	          if (showLabels) {
	            // This does the normal label
	            var labelsArc = arc;
	            if (donutLabelsOutside) {
	              labelsArc = d3.svg.arc().outerRadius(arc.outerRadius())
	            }

	            ae.append("g").classed("nv-label", true)
	              .each(function(d, i) {
	                var group = d3.select(this);

	                group
	                  .attr('transform', function(d) {
	                     d.outerRadius = radius + 10; // Set Outer Coordinate
	                     d.innerRadius = radius + 15; // Set Inner Coordinate
	                     return 'translate(' + labelsArc.centroid(d) + ')'
	                  });

	                group.append('rect')
	                    .style('stroke', '#fff')
	                    .style('fill', '#fff')
	                    .attr("rx", 3)
	                    .attr("ry", 3);

	                group.append('text')
	                    .style('text-anchor', 'middle') //center the text on it's origin
	                    .style('fill', '#000')


	            });

	            slices.select(".nv-label").transition()
	              .attr('transform', function(d) {
	                  d.outerRadius = radius + 10; // Set Outer Coordinate
	                  d.innerRadius = radius + 15; // Set Inner Coordinate
	                  return 'translate(' + labelsArc.centroid(d) + ')';
	              });

	            slices.each(function(d, i) {
	              var slice = d3.select(this);

	              slice
	                .select(".nv-label text")
	                  .text(function(d, i) {
	                    var percent = (d.endAngle - d.startAngle) / (2 * Math.PI);
	                    return (d.value && percent > labelThreshold) ? getX(d.data) : '';
	                  });

	              var textBox = slice.select('text').node().getBBox();
	              slice.select(".nv-label rect")
	                .attr("width", textBox.width + 10)
	                .attr("height", textBox.height + 10)
	                .attr("transform", function() {
	                  return "translate(" + [textBox.x - 5, textBox.y - 5] + ")";
	                });
	            });
	          }


	          // Computes the angle of an arc, converting from radians to degrees.
	          function angle(d) {
	            var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
	            return a > 90 ? a - 180 : a;
	          }

	          function arcTween(a) {
	            if (!donut) a.innerRadius = 0;
	            var i = d3.interpolate(this._current, a);
	            this._current = i(0);
	            return function(t) {
	              return arc(i(t));
	            };
	          }

	          function tweenPie(b) {
	            b.innerRadius = 0;
	            var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
	            return function(t) {
	                return arc(i(t));
	            };
	          }

	      });

	      return chart;
	    }


	    chart.dispatch = dispatch;

	    chart.margin = function(_) {
	      if (!arguments.length) return margin;
	      margin = _;
	      return chart;
	    };

	    chart.width = function(_) {
	      if (!arguments.length) return width;
	      width = _;
	      return chart;
	    };

	    chart.height = function(_) {
	      if (!arguments.length) return height;
	      height = _;
	      return chart;
	    };

	    chart.values = function(_) {
	      if (!arguments.length) return getValues;
	      getValues = _;
	      return chart;
	    };

	    chart.x = function(_) {
	      if (!arguments.length) return getX;
	      getX = _;
	      return chart;
	    };

	    chart.y = function(_) {
	      if (!arguments.length) return getY;
	      getY = d3.functor(_);
	      return chart;
	    };

	    chart.showLabels = function(_) {
	      if (!arguments.length) return showLabels;
	      showLabels = _;
	      return chart;
	    };

	    chart.donutLabelsOutside = function(_) {
	      if (!arguments.length) return donutLabelsOutside;
	      donutLabelsOutside = _;
	      return chart;
	    };

	    chart.donut = function(_) {
	      if (!arguments.length) return donut;
	      donut = _;
	      return chart;
	    };

	    chart.id = function(_) {
	      if (!arguments.length) return id;
	      id = _;
	      return chart;
	    };

	    chart.color = function(_) {
	      if (!arguments.length) return color;
	      color = nv.utils.getColor(_);
	      return chart;
	    };

	    chart.valueFormat = function(_) {
	      if (!arguments.length) return valueFormat;
	      valueFormat = _;
	      return chart;
	    };

	    chart.labelThreshold = function(_) {
	      if (!arguments.length) return labelThreshold;
	      labelThreshold = _;
	      return chart;
	    };


	    return chart;
	  }

	  nv.models.pieChart = function() {
	    var margin = {top: 30, right: 20, bottom: 20, left: 20},
	        width = null,
	        height = null,
	        showLegend = true,
	        color = nv.utils.defaultColor(),
	        tooltips = true,
	        tooltip = function(key, y, e, graph) {
	          return '<h3>' + key + '</h3>' +
	                 '<p>' +  y + '</p>'
	        },
	        noData = "No Data Available."
	        ;


	    var pie = nv.models.pie(),
	        legend = nv.models.legend().height(30),
	        dispatch = d3.dispatch('tooltipShow', 'tooltipHide');


	    var showTooltip = function(e, offsetElement) {
	      var left = e.pos[0] + ( (offsetElement && offsetElement.offsetLeft) || 0 ),
	          top = e.pos[1] + ( (offsetElement && offsetElement.offsetTop) || 0),
	          y = pie.valueFormat()(pie.y()(e.point)),
	          content = tooltip(pie.x()(e.point), y, e, chart);

	      nv.tooltip.show([left, top], content, e.value < 0 ? 'n' : 's', null, offsetElement);
	    };



	    function chart(selection) {
	      selection.each(function(data) {
	        var container = d3.select(this),
	            that = this;

	        var availableWidth = (width  || parseInt(container.style('width')) || 960)
	                               - margin.left - margin.right,
	            availableHeight = (height || parseInt(container.style('height')) || 400)
	                               - margin.top - margin.bottom;


	        //------------------------------------------------------------
	        // Display No Data message if there's nothing to show.

	        if (!data || !data.length) {
	          container.append('text')
	            .attr('class', 'nvd3 nv-noData')
	            .attr('x', availableWidth / 2)
	            .attr('y', availableHeight / 2)
	            .attr('dy', '-.7em')
	            .style('text-anchor', 'middle')
	            .text(noData);
	            return chart;
	        } else {
	          container.select('.nv-noData').remove();
	        }

	        //------------------------------------------------------------



	        var wrap = container.selectAll('g.nv-wrap.nv-pieChart').data([data]);
	        var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-pieChart').append('g');

	        gEnter.append('g').attr('class', 'nv-pieWrap');
	        gEnter.append('g').attr('class', 'nv-legendWrap');

	        var g = wrap.select('g');


	        if (showLegend) {
	          legend
	            .width( availableWidth )
	            .key(pie.x());

	          wrap.select('.nv-legendWrap')
	              .datum(pie.values()(data[0]))
	              .call(legend);

	          if ( margin.top != legend.height()) {
	            margin.top = legend.height();
	            availableHeight = (height || parseInt(container.style('height')) || 400)
	                               - margin.top - margin.bottom;
	          }

	          wrap.select('.nv-legendWrap')
	              .attr('transform', 'translate(0,' + (-margin.top) +')');
	        }


	        pie
	          .width(availableWidth)
	          .height(availableHeight)
	          //.color(data.map(function(d,i) {
	            //return d.color || color[i % color.length];
	          //}).filter(function(d,i) { return !data[i].disabled }))



	        g.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	        var pieWrap = g.select('.nv-pieWrap')
	            .datum(data)
	            //.datum(data.filter(function(d) { return !d.disabled }))


	        d3.transition(pieWrap).call(pie);


	        legend.dispatch.on('legendClick', function(d,i, that) {
	          d.disabled = !d.disabled;

	          if (!pie.values()(data[0]).filter(function(d) { return !d.disabled }).length) {
	            pie.values()(data[0]).map(function(d) {
	              d.disabled = false;
	              wrap.selectAll('.nv-series').classed('disabled', false);
	              return d;
	            });
	          }

	          selection.transition().call(chart)
	        });

	        pie.dispatch.on('elementMouseover.tooltip', function(e) {
	          e.pos = [e.pos[0] +  margin.left, e.pos[1] + margin.top];
	          dispatch.tooltipShow(e);
	        });
	        if (tooltips) dispatch.on('tooltipShow', function(e) { showTooltip(e) } ); // TODO: maybe merge with above?

	        pie.dispatch.on('elementMouseout.tooltip', function(e) {
	          dispatch.tooltipHide(e);
	        });
	        if (tooltips) dispatch.on('tooltipHide', nv.tooltip.cleanup);


	        //TODO: decide if this makes sense to add into all the models for ease of updating (updating without needing the selection)
	        chart.update = function() { selection.transition().call(chart); };
	        chart.container = this; // I need a reference to the container in order to have outside code check if the chart is visible or not

	      });

	      return chart;
	    }


	    chart.dispatch = dispatch;
	    chart.pie = pie; // really just makign the accessible for discretebar.dispatch, may rethink slightly

	    d3.rebind(chart, pie, 'valueFormat', 'values', 'x', 'y', 'id', 'showLabels', 'donutLabelsOutside', 'donut', 'labelThreshold');


	    chart.margin = function(_) {
	      if (!arguments.length) return margin;
	      margin = _;
	      return chart;
	    };

	    chart.width = function(_) {
	      if (!arguments.length) return width;
	      width = _;
	      return chart;
	    };

	    chart.height = function(_) {
	      if (!arguments.length) return height;
	      height = _;
	      return chart;
	    };

	    chart.color = function(_) {
	      if (!arguments.length) return color;
	      color = nv.utils.getColor(_);
	      legend.color(color);
	      pie.color(color);
	      return chart;
	    };

	    chart.showLegend = function(_) {
	      if (!arguments.length) return showLegend;
	      showLegend = _;
	      return chart;
	    };

	    chart.tooltips = function(_) {
	      if (!arguments.length) return tooltips;
	      tooltips = _;
	      return chart;
	    };

	    chart.tooltipContent = function(_) {
	      if (!arguments.length) return tooltip;
	      tooltip = _;
	      return chart;
	    };

	    chart.noData = function(_) {
	      if (!arguments.length) return noData;
	      noData = _;
	      return chart;
	    };


	    return chart;
	  }

	  nv.models.scatter = function() {

	    //============================================================
	    // Public Variables with Default Settings
	    //------------------------------------------------------------

	    var margin      = {top: 0, right: 0, bottom: 0, left: 0}
	     ,  width       = 960
	     ,  height      = 500
	     ,  color       = nv.utils.defaultColor() // chooses color
	     ,  id          = Math.floor(Math.random() * 100000) //Create semi-unique ID incase user doesn't selet one
	     ,  x           = d3.scale.linear()
	     ,  y           = d3.scale.linear()
	     ,  z           = d3.scale.linear() //linear because d3.svg.shape.size is treated as area
	     ,  getX        = function(d) { return d.x } // accessor to get the x value
	     ,  getY        = function(d) { return d.y } // accessor to get the y value
	     ,  getSize     = function(d) { return d.size } // accessor to get the point size
	     ,  getShape    = function(d) { return d.shape || 'circle' } // accessor to get point shape
	     ,  forceX      = [] // List of numbers to Force into the X scale (ie. 0, or a max / min, etc.)
	     ,  forceY      = [] // List of numbers to Force into the Y scale
	     ,  forceSize   = [] // List of numbers to Force into the Size scale
	     ,  interactive = true // If true, plots a voronoi overlay for advanced point interection
	     ,  pointActive = function(d) { return !d.notActive } // any points that return false will be filtered out
	     ,  clipEdge    = false // if true, masks points within x and y scale
	     ,  clipVoronoi = true // if true, masks each point with a circle... can turn off to slightly increase performance
	     ,  clipRadius  = function() { return 25 } // function to get the radius for voronoi point clips
	     ,  xDomain     = null // Override x domain (skips the calculation from data)
	     ,  yDomain     = null // Override y domain
	     ,  sizeDomain  = null // Override point size domain
	     ,  sizeRange   = null
	     ,  singlePoint = false
	     ,  dispatch    = d3.dispatch('elementClick', 'elementMouseover', 'elementMouseout')
	     ,  useVoronoi  = true
	     ;

	    //============================================================


	    //============================================================
	    // Private Variables
	    //------------------------------------------------------------

	    var x0, y0, z0 // used to store previous scales
	      , timeoutID
	      ;

	    //============================================================


	    function chart(selection) {
	      selection.each(function(data) {
	        var availableWidth = width - margin.left - margin.right,
	            availableHeight = height - margin.top - margin.bottom,
	            container = d3.select(this);

	        //add series index to each data point for reference
	        data = data.map(function(series, i) {
	          series.values = series.values.map(function(point) {
	            point.series = i;
	            return point;
	          });
	          return series;
	        });

	        //------------------------------------------------------------
	        // Setup Scales

	        // remap and flatten the data for use in calculating the scales' domains
	        var seriesData = (xDomain && yDomain && sizeDomain) ? [] : // if we know xDomain and yDomain and sizeDomain, no need to calculate.... if Size is constant remember to set sizeDomain to speed up performance
	              d3.merge(
	                data.map(function(d) {
	                  return d.values.map(function(d,i) {
	                    return { x: getX(d,i), y: getY(d,i), size: getSize(d,i) }
	                  })
	                })
	              );

	        x   .domain(xDomain || d3.extent(seriesData.map(function(d) { return d.x }).concat(forceX)))
	            .range([0, availableWidth]);

	        y   .domain(yDomain || d3.extent(seriesData.map(function(d) { return d.y }).concat(forceY)))
	            .range([availableHeight, 0]);

	        z   .domain(sizeDomain || d3.extent(seriesData.map(function(d) { return d.size }).concat(forceSize)))
	            .range(sizeRange || [16, 256]);

	        // If scale's domain don't have a range, slightly adjust to make one... so a chart can show a single data point
	        if (x.domain()[0] === x.domain()[1] || y.domain()[0] === y.domain()[1]) singlePoint = true;
	        if (x.domain()[0] === x.domain()[1])
	          x.domain()[0] ?
	              x.domain([x.domain()[0] - x.domain()[0] * 0.01, x.domain()[1] + x.domain()[1] * 0.01])
	            : x.domain([-1,1]);

	        if (y.domain()[0] === y.domain()[1])
	          y.domain()[0] ?
	              y.domain([y.domain()[0] + y.domain()[0] * 0.01, y.domain()[1] - y.domain()[1] * 0.01])
	            : y.domain([-1,1]);


	        x0 = x0 || x;
	        y0 = y0 || y;
	        z0 = z0 || z;

	        //------------------------------------------------------------


	        //------------------------------------------------------------
	        // Setup containers and skeleton of chart

	        var wrap = container.selectAll('g.nv-wrap.nv-scatter').data([data]);
	        var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-scatter nv-chart-' + id + (singlePoint ? ' nv-single-point' : ''));
	        var defsEnter = wrapEnter.append('defs');
	        var gEnter = wrapEnter.append('g');
	        var g = wrap.select('g');

	        gEnter.append('g').attr('class', 'nv-groups');
	        gEnter.append('g').attr('class', 'nv-point-paths');

	        wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	        //------------------------------------------------------------


	        defsEnter.append('clipPath')
	            .attr('id', 'nv-edge-clip-' + id)
	          .append('rect');

	        wrap.select('#nv-edge-clip-' + id + ' rect')
	            .attr('width', availableWidth)
	            .attr('height', availableHeight);

	        g   .attr('clip-path', clipEdge ? 'url(#nv-edge-clip-' + id + ')' : '');


	        function updateInteractiveLayer() {

	          if (!interactive) return false;

	          var eventElements;

	          var vertices = d3.merge(data.map(function(group, groupIndex) {
	              return group.values
	                .filter(pointActive) // remove non-interactive points
	                .map(function(point, pointIndex) {
	                  // *Adding noise to make duplicates very unlikely
	                  // **Injecting series and point index for reference
	                  return [x(getX(point,pointIndex)) * (Math.random() / 1e12 + 1)  , y(getY(point,pointIndex)) * (Math.random() / 1e12 + 1), groupIndex, pointIndex]; //temp hack to add noise untill I think of a better way so there are no duplicates
	                })
	            })
	          );


	          if (clipVoronoi) {
	            defsEnter.append('clipPath').attr('id', 'nv-points-clip-' + id);

	            var pointClips = wrap.select('#nv-points-clip-' + id).selectAll('circle')
	                .data(vertices);
	            pointClips.enter().append('circle')
	                .attr('r', clipRadius);
	            pointClips.exit().remove();
	            pointClips
	                .attr('cx', function(d) { return d[0] })
	                .attr('cy', function(d) { return d[1] });

	            wrap.select('.nv-point-paths')
	                .attr('clip-path', 'url(#nv-points-clip-' + id + ')');
	          }


	          //inject series and point index for reference into voronoi
	          if (useVoronoi === true) {
	            var voronoi = d3.geom.voronoi(vertices).map(function(d, i) {
	                return {
	                  'data': d,
	                  'series': vertices[i][2],
	                  'point': vertices[i][3]
	                }
	              });


	            var pointPaths = wrap.select('.nv-point-paths').selectAll('path')
	                .data(voronoi);
	            pointPaths.enter().append('path')
	                .attr('class', function(d,i) { return 'nv-path-'+i; });
	            pointPaths.exit().remove();
	            pointPaths
	                .attr('d', function(d) { return 'M' + d.data.join(',') + 'Z'; });

	            eventElements = pointPaths;

	          } else {
	            // bring data in form needed for click handlers
	            var dataWithPoints = vertices.map(function(d, i) {
	                return {
	                  'data': d,
	                  'series': vertices[i][2],
	                  'point': vertices[i][3]
	                }
	              });

	            // add event handlers to points instead voronoi paths
	            eventElements = wrap.select('.nv-groups').selectAll('.nv-group')
	              .selectAll('path.nv-point')
	              .data(dataWithPoints)
	              .style('pointer-events', 'auto'); // recativate events, disabled by css
	          }

	          eventElements
	              .on('click', function(d) {
	                var series = data[d.series],
	                    point  = series.values[d.point];

	                dispatch.elementClick({
	                  point: point,
	                  series: series,
	                  pos: [x(getX(point, d.point)) + margin.left, y(getY(point, d.point)) + margin.top],
	                  seriesIndex: d.series,
	                  pointIndex: d.point
	                });
	              })
	              .on('mouseover', function(d) {
	                var series = data[d.series],
	                    point  = series.values[d.point];

	                dispatch.elementMouseover({
	                  point: point,
	                  series: series,
	                  pos: [x(getX(point, d.point)) + margin.left, y(getY(point, d.point)) + margin.top],
	                  seriesIndex: d.series,
	                  pointIndex: d.point
	                });
	              })
	              .on('mouseout', function(d, i) {
	                var series = data[d.series],
	                    point  = series.values[d.point];

	                dispatch.elementMouseout({
	                  point: point,
	                  series: series,
	                  seriesIndex: d.series,
	                  pointIndex: d.point
	                });
	              });

	        }



	        var groups = wrap.select('.nv-groups').selectAll('.nv-group')
	            .data(function(d) { return d }, function(d) { return d.key });
	        groups.enter().append('g')
	            .style('stroke-opacity', 1e-6)
	            .style('fill-opacity', 1e-6);
	        d3.transition(groups.exit())
	            .style('stroke-opacity', 1e-6)
	            .style('fill-opacity', 1e-6)
	            .remove();
	        groups
	            .attr('class', function(d,i) { return 'nv-group nv-series-' + i })
	            .classed('hover', function(d) { return d.hover });
	        d3.transition(groups)
	            .style('fill', function(d,i) { return color(d, i) })
	            .style('stroke', function(d,i) { return color(d, i) })
	            .style('stroke-opacity', 1)
	            .style('fill-opacity', .5);


	        var points = groups.selectAll('path.nv-point')
	            .data(function(d) { return d.values });
	        points.enter().append('path')
	            .attr('transform', function(d,i) {
	              return 'translate(' + x0(getX(d,i)) + ',' + y0(getY(d,i)) + ')'
	            })
	            .attr('d',
	              d3.svg.symbol()
	                .type(getShape)
	                .size(function(d,i) { return z(getSize(d,i)) })
	            );
	        points.exit().remove();
	        d3.transition(groups.exit().selectAll('path.nv-point'))
	            .attr('transform', function(d,i) {
	              return 'translate(' + x(getX(d,i)) + ',' + y(getY(d,i)) + ')'
	            })
	            .remove();
	        points.attr('class', function(d,i) { return 'nv-point nv-point-' + i });
	        d3.transition(points)
	            .attr('transform', function(d,i) {
	              return 'translate(' + x(getX(d,i)) + ',' + y(getY(d,i)) + ')'
	            })
	            .attr('d',
	              d3.svg.symbol()
	                .type(getShape)
	                .size(function(d,i) { return z(getSize(d,i)) })
	            );


	        // Delay updating the invisible interactive layer for smoother animation
	        clearTimeout(timeoutID); // stop repeat calls to updateInteractiveLayer
	        timeoutID = setTimeout(updateInteractiveLayer, 1000);

	        //store old scales for use in transitions on update
	        x0 = x.copy();
	        y0 = y.copy();
	        z0 = z.copy();

	      });

	      return chart;
	    }


	    //============================================================
	    // Event Handling/Dispatching (out of chart's scope)
	    //------------------------------------------------------------

	    dispatch.on('elementMouseover.point', function(d) {
	      if (interactive)
	        d3.select('.nv-chart-' + id + ' .nv-series-' + d.seriesIndex + ' .nv-point-' + d.pointIndex)
	            .classed('hover', true);
	    });

	    dispatch.on('elementMouseout.point', function(d) {
	      if (interactive)
	        d3.select('.nv-chart-' + id + ' .nv-series-' + d.seriesIndex + ' .nv-point-' + d.pointIndex)
	            .classed('hover', false);
	    });

	    //============================================================


	    //============================================================
	    // Expose Public Variables
	    //------------------------------------------------------------

	    chart.dispatch = dispatch;

	    chart.x = function(_) {
	      if (!arguments.length) return getX;
	      getX = d3.functor(_);
	      return chart;
	    };

	    chart.y = function(_) {
	      if (!arguments.length) return getY;
	      getY = d3.functor(_);
	      return chart;
	    };

	    chart.size = function(_) {
	      if (!arguments.length) return getSize;
	      getSize = d3.functor(_);
	      return chart;
	    };

	    chart.margin = function(_) {
	      if (!arguments.length) return margin;
	      margin = _;
	      return chart;
	    };

	    chart.width = function(_) {
	      if (!arguments.length) return width;
	      width = _;
	      return chart;
	    };

	    chart.height = function(_) {
	      if (!arguments.length) return height;
	      height = _;
	      return chart;
	    };

	    chart.xScale = function(_) {
	      if (!arguments.length) return x;
	      x = _;
	      return chart;
	    };

	    chart.yScale = function(_) {
	      if (!arguments.length) return y;
	      y = _;
	      return chart;
	    };

	    chart.zScale = function(_) {
	      if (!arguments.length) return z;
	      z = _;
	      return chart;
	    };

	    chart.xDomain = function(_) {
	      if (!arguments.length) return xDomain;
	      xDomain = _;
	      return chart;
	    };

	    chart.yDomain = function(_) {
	      if (!arguments.length) return yDomain;
	      yDomain = _;
	      return chart;
	    };

	    chart.sizeDomain = function(_) {
	      if (!arguments.length) return sizeDomain;
	      sizeDomain = _;
	      return chart;
	    };

	    chart.sizeRange = function(_) {
	      if (!arguments.length) return sizeRange;
	      sizeRange = _;
	      return chart;
	    };

	    chart.forceX = function(_) {
	      if (!arguments.length) return forceX;
	      forceX = _;
	      return chart;
	    };

	    chart.forceY = function(_) {
	      if (!arguments.length) return forceY;
	      forceY = _;
	      return chart;
	    };

	    chart.forceSize = function(_) {
	      if (!arguments.length) return forceSize;
	      forceSize = _;
	      return chart;
	    };

	    chart.interactive = function(_) {
	      if (!arguments.length) return interactive;
	      interactive = _;
	      return chart;
	    };

	    chart.pointActive = function(_) {
	      if (!arguments.length) return pointActive;
	      pointActive = _;
	      return chart;
	    };

	    chart.clipEdge = function(_) {
	      if (!arguments.length) return clipEdge;
	      clipEdge = _;
	      return chart;
	    };

	    chart.clipVoronoi= function(_) {
	      if (!arguments.length) return clipVoronoi;
	      clipVoronoi = _;
	      return chart;
	    };

	    chart.useVoronoi= function(_) {
	      if (!arguments.length) return useVoronoi;
	      useVoronoi = _;
	      if (useVoronoi === false) {
	          clipVoronoi = false;
	      }
	      return chart;
	    };

	    chart.clipRadius = function(_) {
	      if (!arguments.length) return clipRadius;
	      clipRadius = _;
	      return chart;
	    };

	    chart.color = function(_) {
	      if (!arguments.length) return color;
	      color = nv.utils.getColor(_);
	      return chart;
	    };

	    chart.shape = function(_) {
	      if (!arguments.length) return getShape;
	      getShape = _;
	      return chart;
	    };

	    chart.id = function(_) {
	      if (!arguments.length) return id;
	      id = _;
	      return chart;
	    };

	    chart.singlePoint = function(_) {
	      if (!arguments.length) return singlePoint;
	      singlePoint = _;
	      return chart;
	    };

	    //============================================================


	    return chart;
	  }

	  nv.models.scatterChart = function() {

	    //============================================================
	    // Public Variables with Default Settings
	    //------------------------------------------------------------

	    var margin       = {top: 30, right: 20, bottom: 50, left: 60}
	      , width        = null
	      , height       = null
	      , color        = nv.utils.defaultColor()
	      //x            = scatter.xScale(),
	      , x            = d3.fisheye.scale(d3.scale.linear).distortion(0)
	      //y            = scatter.yScale(),
	      , y            = d3.fisheye.scale(d3.scale.linear).distortion(0)
	      , showDistX    = false
	      , showDistY    = false
	      , showLegend   = true
	      , showControls = true
	      , fisheye      = 0
	      , pauseFisheye = false
	      , tooltips     = true
	      , tooltipX     = function(key, x, y) { return '<strong>' + x + '</strong>' }
	      , tooltipY     = function(key, x, y) { return '<strong>' + y + '</strong>' }
	      //, tooltip      = function(key, x, y) { return '<h3>' + key + '</h3>' }
	      , tooltip      = null
	      , scatter      = nv.models.scatter().xScale(x).yScale(y)
	      , xAxis        = nv.models.axis().orient('bottom').tickPadding(10)
	      , yAxis        = nv.models.axis().orient('left').tickPadding(10)
	      , legend       = nv.models.legend().height(30)
	      , controls     = nv.models.legend().height(30)
	      , distX        = nv.models.distribution().axis('x')
	      , distY        = nv.models.distribution().axis('y')
	      , dispatch     = d3.dispatch('tooltipShow', 'tooltipHide')
	      , noData       = "No Data Available."
	      ;

	    //============================================================


	    //============================================================
	    // Private Variables
	    //------------------------------------------------------------

	    var x0, y0;

	    var showTooltip = function(e, offsetElement) {
	      //TODO: make tooltip style an option between single or dual on axes (maybe on all charts with axes?)

	      var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
	          top = e.pos[1] + ( offsetElement.offsetTop || 0),
	          leftX = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
	          topX = y.range()[0] + margin.top + ( offsetElement.offsetTop || 0),
	          leftY = x.range()[0] + margin.left + ( offsetElement.offsetLeft || 0 ),
	          topY = e.pos[1] + ( offsetElement.offsetTop || 0),
	          xVal = xAxis.tickFormat()(scatter.x()(e.point, e.pointIndex)),
	          yVal = yAxis.tickFormat()(scatter.y()(e.point, e.pointIndex));

	        if( tooltipX != null )
	            nv.tooltip.show([leftX, topX], tooltipX(e.series.key, xVal, yVal, e, chart), 'n', 1, offsetElement, 'x-nvtooltip');
	        if( tooltipY != null )
	            nv.tooltip.show([leftY, topY], tooltipY(e.series.key, xVal, yVal, e, chart), 'e', 1, offsetElement, 'y-nvtooltip');
	        if( tooltip != null )
	            nv.tooltip.show([left, top], tooltip(e.series.key, xVal, yVal, e, chart), e.value < 0 ? 'n' : 's', null, offsetElement);
	    };

	    var controlsData = [
	      { key: 'Magnify', disabled: true }
	    ];

	    //============================================================


	    function chart(selection) {
	      selection.each(function(data) {
	        var container = d3.select(this),
	            that = this;

	        var availableWidth = (width  || parseInt(container.style('width')) || 960)
	                               - margin.left - margin.right,
	            availableHeight = (height || parseInt(container.style('height')) || 400)
	                               - margin.top - margin.bottom;


	        if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
	          container.append('text')
	            .attr('class', 'nvd3 nv-noData')
	            .attr('x', availableWidth / 2)
	            .attr('y', availableHeight / 2)
	            .attr('dy', '-.7em')
	            .style('text-anchor', 'middle')
	            .text(noData);
	            return chart;
	        } else {
	          container.select('.nv-noData').remove();
	        }

	        //------------------------------------------------------------
	        // Setup Scales

	        x = scatter.xScale();
	        y = scatter.yScale();

	        x0 = x0 || x;
	        y0 = y0 || y;

	        //------------------------------------------------------------


	        //------------------------------------------------------------
	        // Setup containers and skeleton of chart

	        var wrap = container.selectAll('g.nv-wrap.nv-scatterChart').data([data]);
	        var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-scatterChart nv-chart-' + scatter.id());
	        var gEnter = wrapEnter.append('g');
	        var g = wrap.select('g')

	        // background for pointer events
	        gEnter.append('rect').attr('class', 'nvd3 nv-background')

	        gEnter.append('g').attr('class', 'nv-x nv-axis');
	        gEnter.append('g').attr('class', 'nv-y nv-axis');
	        gEnter.append('g').attr('class', 'nv-scatterWrap');
	        gEnter.append('g').attr('class', 'nv-distWrap');
	        gEnter.append('g').attr('class', 'nv-legendWrap');
	        gEnter.append('g').attr('class', 'nv-controlsWrap');

	        wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	        //------------------------------------------------------------


	        if (showLegend) {
	          legend.width( availableWidth / 2 );

	          wrap.select('.nv-legendWrap')
	              .datum(data)
	              .call(legend);

	          if ( margin.top != legend.height()) {
	            margin.top = legend.height();
	            availableHeight = (height || parseInt(container.style('height')) || 400)
	                               - margin.top - margin.bottom;
	          }

	          wrap.select('.nv-legendWrap')
	              .attr('transform', 'translate(' + (availableWidth / 2) + ',' + (-margin.top) +')');
	        }


	        if (showControls) {
	          controls.width(180).color(['#444']);
	          g.select('.nv-controlsWrap')
	              .datum(controlsData)
	              .attr('transform', 'translate(0,' + (-margin.top) +')')
	              .call(controls);
	        }


	        g.select('.nv-background')
	            .attr('width', availableWidth)
	            .attr('height', availableHeight);


	        scatter
	            .width(availableWidth)
	            .height(availableHeight)
	            .color(data.map(function(d,i) {
	              return d.color || color(d, i);
	            }).filter(function(d,i) { return !data[i].disabled }))

	        wrap.select('.nv-scatterWrap')
	            .datum(data.filter(function(d) { return !d.disabled }))
	            .call(scatter);


	        xAxis
	            .scale(x)
	            .ticks( xAxis.ticks() ? xAxis.ticks() : availableWidth / 100 )
	            .tickSize( -availableHeight , 0);

	        g.select('.nv-x.nv-axis')
	            .attr('transform', 'translate(0,' + y.range()[0] + ')')
	            .call(xAxis);


	        yAxis
	            .scale(y)
	            .ticks( yAxis.ticks() ? yAxis.ticks() : availableHeight / 36 )
	            .tickSize( -availableWidth, 0);

	        g.select('.nv-y.nv-axis')
	            .call(yAxis);

	        if(showDistX){
	  	      distX
	  	          .getData(scatter.x())
	  	          .scale(x)
	  	          .width(availableWidth)
	  	          .color(data.map(function(d,i) {
	  	            return d.color || color(d, i);
	  	          }).filter(function(d,i) { return !data[i].disabled }));
	  	      gEnter.select('.nv-distWrap').append('g')
	  	          .attr('class', 'nv-distributionX')
	  	          .attr('transform', 'translate(0,' + y.range()[0] + ')');
	  	      g.select('.nv-distributionX')
	  	          .datum(data.filter(function(d) { return !d.disabled }))
	  	          .call(distX);
	  	   }

	  	   if(showDistY){
	  	      distY
	  	          .getData(scatter.y())
	  	          .scale(y)
	  	          .width(availableHeight)
	  	          .color(data.map(function(d,i) {
	  	            return d.color || color(d, i);
	  	          }).filter(function(d,i) { return !data[i].disabled }));
	  	      gEnter.select('.nv-distWrap').append('g')
	  	          .attr('class', 'nv-distributionY')
	  	          .attr('transform', 'translate(-' + distY.size() + ',0)');
	  	      g.select('.nv-distributionY')
	  	          .datum(data.filter(function(d) { return !d.disabled }))
	  	          .call(distY);
	  	  }

	        g.select('.nv-background').on('mousemove', updateFisheye);
	        g.select('.nv-background').on('click', function() { pauseFisheye = !pauseFisheye;});
	        scatter.dispatch.on('elementClick.freezeFisheye', function() {
	          pauseFisheye = !pauseFisheye;
	        });


	        function updateFisheye() {
	          if (pauseFisheye) {
	            g.select('.nv-point-paths').style('pointer-events', 'all');
	            return false;
	          }

	          g.select('.nv-point-paths').style('pointer-events', 'none' );

	          var mouse = d3.mouse(this);
	          x.distortion(fisheye).focus(mouse[0]);
	          y.distortion(fisheye).focus(mouse[1]);

	          g.select('.nv-scatterWrap')
	              .datum(data.filter(function(d) { return !d.disabled }))
	              .call(scatter);
	          g.select('.nv-x.nv-axis').call(xAxis);
	          g.select('.nv-y.nv-axis').call(yAxis);
	          g.select('.nv-distributionX')
	              .datum(data.filter(function(d) { return !d.disabled }))
	              .call(distX);
	          g.select('.nv-distributionY')
	              .datum(data.filter(function(d) { return !d.disabled }))
	              .call(distY);
	        }



	        //============================================================
	        // Event Handling/Dispatching (in chart's scope)
	        //------------------------------------------------------------

	        controls.dispatch.on('legendClick', function(d,i) {
	          d.disabled = !d.disabled;

	          fisheye = d.disabled ? 0 : 2.5;
	          g.select('.nv-background') .style('pointer-events', d.disabled ? 'none' : 'all');
	          g.select('.nv-point-paths').style('pointer-events', d.disabled ? 'all' : 'none' );

	          if (d.disabled) {
	            x.distortion(fisheye).focus(0);
	            y.distortion(fisheye).focus(0);

	            g.select('.nv-scatterWrap').call(scatter);
	            g.select('.nv-x.nv-axis').call(xAxis);
	            g.select('.nv-y.nv-axis').call(yAxis);
	          } else {
	            pauseFisheye = false;
	          }

	          chart(selection);
	        });

	        legend.dispatch.on('legendClick', function(d,i, that) {
	          d.disabled = !d.disabled;

	          if (!data.filter(function(d) { return !d.disabled }).length) {
	            data.map(function(d) {
	              d.disabled = false;
	              wrap.selectAll('.nv-series').classed('disabled', false);
	              return d;
	            });
	          }

	          chart(selection);
	        });

	        /*
	        legend.dispatch.on('legendMouseover', function(d, i) {
	          d.hover = true;
	          chart(selection);
	        });

	        legend.dispatch.on('legendMouseout', function(d, i) {
	          d.hover = false;
	          chart(selection);
	        });
	        */

	        scatter.dispatch.on('elementMouseover.tooltip', function(e) {
	          d3.select('.nv-chart-' + scatter.id() + ' .nv-series-' + e.seriesIndex + ' .nv-distx-' + e.pointIndex)
	              .attr('y1', e.pos[1] - availableHeight);
	          d3.select('.nv-chart-' + scatter.id() + ' .nv-series-' + e.seriesIndex + ' .nv-disty-' + e.pointIndex)
	              .attr('x2', e.pos[0] + distX.size());

	          e.pos = [e.pos[0] + margin.left, e.pos[1] + margin.top];
	          dispatch.tooltipShow(e);
	        });

	        dispatch.on('tooltipShow', function(e) {
	          if (tooltips) showTooltip(e, that.parentNode);
	        });


	        //store old scales for use in transitions on update
	        x0 = x.copy();
	        y0 = y.copy();


	        chart.update = function() { chart(selection) };
	        chart.container = this;

	      });

	      return chart;
	    }


	    //============================================================
	    // Event Handling/Dispatching (out of chart's scope)
	    //------------------------------------------------------------

	    scatter.dispatch.on('elementMouseout.tooltip', function(e) {
	      dispatch.tooltipHide(e);

	      d3.select('.nv-chart-' + scatter.id() + ' .nv-series-' + e.seriesIndex + ' .nv-distx-' + e.pointIndex)
	          .attr('y1', 0);
	      d3.select('.nv-chart-' + scatter.id() + ' .nv-series-' + e.seriesIndex + ' .nv-disty-' + e.pointIndex)
	          .attr('x2', distY.size());
	    });
	    dispatch.on('tooltipHide', function() {
	      if (tooltips) nv.tooltip.cleanup();
	    });


	    //============================================================
	    // Expose Public Variables
	    //------------------------------------------------------------

	    chart.dispatch = dispatch;
	    chart.legend = legend;
	    chart.controls = legend;
	    chart.xAxis = xAxis;
	    chart.yAxis = yAxis;
	    chart.distX = distX;
	    chart.distY = distY;

	    d3.rebind(chart, scatter, 'id', 'interactive', 'pointActive', 'x', 'y', 'shape', 'size', 'xScale', 'yScale', 'zScale', 'xDomain', 'yDomain', 'sizeDomain', 'sizeRange', 'forceX', 'forceY', 'forceSize', 'clipVoronoi', 'clipRadius', 'useVoronoi');

	    chart.margin = function(_) {
	      if (!arguments.length) return margin;
	      margin = _;
	      return chart;
	    };

	    chart.width = function(_) {
	      if (!arguments.length) return width;
	      width = _;
	      return chart;
	    };

	    chart.height = function(_) {
	      if (!arguments.length) return height;
	      height = _;
	      return chart;
	    };

	    chart.color = function(_) {
	      if (!arguments.length) return color;
	      color = nv.utils.getColor(_);
	      legend.color(color);
	      distX.color(color);
	      distY.color(color);
	      return chart;
	    };

	    chart.showDistX = function(_) {
	      if (!arguments.length) return showDistX;
	      showDistX = _;
	      return chart;
	    };

	    chart.showDistY = function(_) {
	      if (!arguments.length) return showDistY;
	      showDistY = _;
	      return chart;
	    };

	    chart.showControls = function(_) {
	      if (!arguments.length) return showControls;
	      showControls = _;
	      return chart;
	    };

	    chart.showLegend = function(_) {
	      if (!arguments.length) return showLegend;
	      showLegend = _;
	      return chart;
	    };

	    chart.fisheye = function(_) {
	      if (!arguments.length) return fisheye;
	      fisheye = _;
	      return chart;
	    };

	    chart.tooltips = function(_) {
	      if (!arguments.length) return tooltips;
	      tooltips = _;
	      return chart;
	    };

	    chart.tooltipContent = function(_) {
	      if (!arguments.length) return tooltip;
	      tooltip = _;
	      return chart;
	    };

	    chart.tooltipXContent = function(_) {
	      if (!arguments.length) return tooltipX;
	      tooltipX = _;
	      return chart;
	    };

	    chart.tooltipYContent = function(_) {
	      if (!arguments.length) return tooltipY;
	      tooltipY = _;
	      return chart;
	    };

	    chart.noData = function(_) {
	      if (!arguments.length) return noData;
	      noData = _;
	      return chart;
	    };

	    //============================================================


	    return chart;
	  }

	  nv.models.sparkline = function() {
	    var margin = {top: 0, right: 0, bottom: 0, left: 0},
	        width = 400,
	        height = 32,
	        animate = true,
	        getX = function(d) { return d.x },
	        getY = function(d) { return d.y },
	        color = nv.utils.defaultColor(),
	        xDomain, yDomain;

	    var x = d3.scale.linear(),
	        y = d3.scale.linear();

	    function chart(selection) {
	      selection.each(function(data) {
	        var availableWidth = width - margin.left - margin.right,
	            availableHeight = height - margin.top - margin.bottom;


	        x   .domain(xDomain || d3.extent(data, getX ))
	            .range([0, availableWidth]);

	        y   .domain(yDomain || d3.extent(data,getY ))
	            .range([availableHeight, 0]);


	        var wrap = d3.select(this).selectAll('g.nv-wrap.nv-sparkline').data([data]);

	        var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-sparkline');
	        //var gEnter = svg.enter().append('svg').append('g');
	        //gEnter.append('g').attr('class', 'sparkline')
	        gEnter
	            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
	            .style('stroke', function(d,i) { return d.color || color(d, i) });

	  /*
	        d3.select(this)
	            .attr('width', width)
	            .attr('height', height);
	           */


	        //var paths = gEnter.select('.sparkline').selectAll('path')
	        var paths = gEnter.selectAll('path')
	            .data(function(d) { return [d] });
	        paths.enter().append('path');
	        paths.exit().remove();
	        paths
	            .attr('d', d3.svg.line()
	              .x(function(d,i) { return x(getX(d,i)) })
	              .y(function(d,i) { return y(getY(d,i)) })
	            );


	        // TODO: Add CURRENT data point (Need Min, Mac, Current / Most recent)
	        var points = gEnter.selectAll('circle.nv-point')
	            .data(function(d) { return d.filter(function(p,i) { return y.domain().indexOf(getY(p,i)) != -1 || getX(p,i) == x.domain()[1]  }) });
	        points.enter().append('circle').attr('class', 'nv-point');
	        points.exit().remove();
	        points
	            .attr('cx', function(d,i) { return x(getX(d,i)) })
	            .attr('cy', function(d,i) { return y(getY(d,i)) })
	            .attr('r', 2)
	            .style('stroke', function(d,i) { return d.x == x.domain()[1] ? '#444' : d.y == y.domain()[0] ? '#d62728' : '#2ca02c' })
	            .style('fill', function(d,i) { return d.x == x.domain()[1] ? '#444' : d.y == y.domain()[0] ? '#d62728' : '#2ca02c' });
	      });

	      return chart;
	    }


	    chart.margin = function(_) {
	      if (!arguments.length) return margin;
	      margin = _;
	      return chart;
	    };

	    chart.width = function(_) {
	      if (!arguments.length) return width;
	      width = _;
	      return chart;
	    };

	    chart.height = function(_) {
	      if (!arguments.length) return height;
	      height = _;
	      return chart;
	    };

	    chart.x = function(_) {
	      if (!arguments.length) return getX;
	      getX = d3.functor(_);
	      return chart;
	    };

	    chart.y = function(_) {
	      if (!arguments.length) return getY;
	      getY = d3.functor(_);
	      return chart;
	    };

	    chart.xDomain = function(_) {
	      if (!arguments.length) return xDomain;
	      xDomain = _;
	      return chart;
	    };

	    chart.yDomain = function(_) {
	      if (!arguments.length) return yDomain;
	      yDomain = _;
	      return chart;
	    };

	    chart.animate = function(_) {
	      if (!arguments.length) return animate;
	      animate = _;
	      return chart;
	    };

	    return chart;
	  }

	  nv.models.sparklinePlus = function() {
	    var margin = {top: 15, right: 40, bottom: 3, left: 40},
	        width = 400,
	        height = 50,
	        animate = true,
	        getX = function(d) { return d.x },
	        getY = function(d) { return d.y },
	        color = nv.utils.defaultColor(),
	        id = Math.floor(Math.random() * 100000), //Create semi-unique ID incase user doesn't selet one
	        xTickFormat = d3.format(',r'),
	        yTickFormat = d3.format(',.2f'),
	        noData = "No Data Available."
	        ;

	    var x = d3.scale.linear(),
	        y = d3.scale.linear(),
	        sparkline = nv.models.sparkline();

	    function chart(selection) {
	      selection.each(function(data) {
	        var availableWidth = width - margin.left - margin.right,
	            availableHeight = height - margin.top - margin.bottom;


	        //------------------------------------------------------------
	        // Display No Data message if there's nothing to show.

	        if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
	          container.append('text')
	            .attr('class', 'nvd3 nv-noData')
	            .attr('x', availableWidth / 2)
	            .attr('y', availableHeight / 2)
	            .attr('dy', '-.7em')
	            .style('text-anchor', 'middle')
	            .text(noData);
	            return chart;
	        } else {
	          container.select('.nv-noData').remove();
	        }

	        //------------------------------------------------------------



	        x   .domain(d3.extent(data, getX ))
	            .range([0, availableWidth]);

	        y   .domain(d3.extent(data, getY ))
	            .range([availableHeight, 0]);


	        var wrap = d3.select(this).selectAll('g.nv-wrap.nv-sparklineplus').data([data]);


	        var gEnter = wrap.enter().append('g')
	        //var gEnter = svg.enter().append('svg').append('g');
	        var sparklineWrap = gEnter.append('g').attr('class', 'nvd3 nv-wrap nv-sparklineplus')
	            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
	            .style('stroke', function(d, i){ return d.color || color(d, i) });

	        sparkline
	          .xDomain(x.domain())
	          .yDomain(y.domain());


	        sparklineWrap
	            //.attr('width', width)
	            //.attr('height', height)
	            .call(sparkline);

	        var hoverValue = sparklineWrap.append('g').attr('class', 'nv-hoverValue');
	        var hoverArea = sparklineWrap.append('g').attr('class', 'nv-hoverArea');


	        hoverValue.attr('transform', function(d) { return 'translate(' + x(d) + ',0)' });

	        var hoverLine = hoverValue.append('line')
	            .attr('x1', x.range()[1])
	            .attr('y1', -margin.top)
	            .attr('x2', x.range()[1])
	            .attr('y2', height)

	       var hoverX = hoverValue.append('text').attr('class', 'nv-xValue')
	            .attr('text-anchor', 'end')
	            .attr('dy', '.9em')

	       var hoverY = hoverValue.append('text').attr('class', 'nv-yValue')
	            //.attr('transform', function(d) { return 'translate(' + x(d) + ',0)' })
	            .attr('text-anchor', 'start')
	            .attr('dy', '.9em')


	        hoverArea.append('rect')
	            .attr('width', availableWidth)
	            .attr('height', availableHeight)
	            .on('mousemove', sparklineHover);



	        function sparklineHover() {
	          var pos = d3.event.offsetX - margin.left;

	          hoverLine
	              .attr('x1', pos)
	              .attr('x2', pos);

	          hoverX
	              .attr('transform', function(d) { return 'translate(' + (pos - 6) + ',' + (-margin.top) + ')' })
	              //.text(xTickFormat(pos));
	              .text(xTickFormat(Math.round(x.invert(pos)))); //TODO: refactor this line
	          var f = function(data, x){
	              var distance = Math.abs(getX(data[0]) - x) ;
	              var closestIndex = 0;
	              for (var i = 0; i < data.length; i++){
	                  if (Math.abs(getX(data[i]) - x) < distance) {
	                      distance = Math.abs(getX(data[i]) -x);
	                      closestIndex = i;
	                  }
	              }
	              return closestIndex;
	          }

	          hoverY
	              .attr('transform', function(d) { return 'translate(' + (pos + 6) + ',' + (-margin.top) + ')' })
	              //.text(data[pos] && yTickFormat(data[pos].y));
	              .text(yTickFormat(getY(data[f(data, Math.round(x.invert(pos)))]))); //TODO: refactor this line
	        }

	      });

	      return chart;
	    }


	    chart.margin = function(_) {
	      if (!arguments.length) return margin;
	      margin = _;
	      return chart;
	    };

	    chart.width = function(_) {
	      if (!arguments.length) return width;
	      width = _;
	      sparkline.width(_ - margin.left - margin.right);
	      return chart;
	    };

	    chart.height = function(_) {
	      if (!arguments.length) return height;
	      height = _;
	      sparkline.height(_ - margin.top - margin.bottom);
	      return chart;
	    };

	    chart.x = function(_) {
	      if (!arguments.length) return getX;
	      getX = d3.functor(_);
	      sparkline.x(_);
	      return chart;
	    };

	    chart.y = function(_) {
	      if (!arguments.length) return getY;
	      getY = d3.functor(_);
	      sparkline.y(_);
	      return chart;
	    };

	    chart.id = function(_) {
	      if (!arguments.length) return id;
	      id = _;
	      return chart;
	    };

	    chart.animate = function(_) {
	      if (!arguments.length) return animate;
	      animate = _;
	      return chart;
	    };

	    chart.noData = function(_) {
	      if (!arguments.length) return noData;
	      noData = _;
	      return chart;
	    };


	    return chart;
	  }

	  nv.models.stackedArea = function() {

	    //============================================================
	    // Public Variables with Default Settings
	    //------------------------------------------------------------

	    var margin = {top: 0, right: 0, bottom: 0, left: 0},
	        width = 960,
	        height = 500,
	        color = nv.utils.defaultColor(), // a function that computes the color 
	        id = Math.floor(Math.random() * 100000), //Create semi-unique ID incase user doesn't selet one
	        getX = function(d) { return d.x }, // accessor to get the x value from a data point
	        getY = function(d) { return d.y }, // accessor to get the y value from a data point
	        style = 'stack',
	        offset = 'zero',
	        order = 'default',
	        clipEdge = false, // if true, masks lines within x and y scale
	        x, y; //can be accessed via chart.scatter.[x/y]Scale()

	  /************************************
	   * offset:
	   *   'wiggle' (stream)
	   *   'zero' (stacked)
	   *   'expand' (normalize to 100%)
	   *   'silhouette' (simple centered)
	   *
	   * order:
	   *   'inside-out' (stream)
	   *   'default' (input order)
	   ************************************/


	    //============================================================
	    // Private Variables
	    //------------------------------------------------------------

	    var stacked = d3.layout.stack()
	                   //.offset('zero')
	                   .values(function(d) { return d.values })  //TODO: make values customizeable in EVERY model in this fashion
	                   .x(getX)
	                   .y(function(d) { return d.stackedY })
	                   .out(function(d, y0, y) {
	                      d.display = {
	                        y: y,
	                       y0: y0
	                      };
	                    }),
	        scatter = nv.models.scatter()
	                    .size(2.2) // default size
	                    .sizeDomain([2.5]), 
	        dispatch =  d3.dispatch('tooltipShow', 'tooltipHide', 'areaClick', 'areaMouseover', 'areaMouseout');

	    function chart(selection) {
	      selection.each(function(data) {
	          var availableWidth = width - margin.left - margin.right,
	              availableHeight = height - margin.top - margin.bottom;

	          x = scatter.xScale();
	          y = scatter.yScale();

	          // Injecting point index into each point because d3.layout.stack().out does not give index
	          // ***Also storing getY(d,i) as yStacked so that it can be set to 0 if series is disabled
	          // TODO: see if theres a way to deal with disabled series more consistent with the other models
	          data = data.map(function(aseries, i) {
	                   aseries.values = aseries.values.map(function(d, j) {
	                     d.index = j;
	                     d.stackedY = aseries.disabled ? 0 : getY(d,j);
	                     return d;
	                   })
	                   return aseries;
	                 });

	  /*
	          //TODO: Figure out why stream mode is broken with this
	          data = stacked
	                  .order(order)
	                  .offset(offset)
	                  (data);
	  */

	          data = d3.layout.stack()
	                   .order(order)
	                   .offset(offset)
	                   .values(function(d) { return d.values })  //TODO: make values customizeable in EVERY model in this fashion
	                   .x(getX)
	                   .y(function(d) { return d.stackedY })
	                   .out(function(d, y0, y) {
	                      d.display = {
	                        y: y,
	                       y0: y0
	                      };
	                    })
	                  (data);


	          var wrap = d3.select(this).selectAll('g.nv-wrap.nv-stackedarea').data([data]);
	          var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-stackedarea');
	          var defsEnter = wrapEnter.append('defs');
	          var gEnter = wrapEnter.append('g');
	          var g = wrap.select('g');

	          gEnter.append('g').attr('class', 'nv-areaWrap');


	          scatter
	            .width(availableWidth)
	            .height(availableHeight)
	            .x(getX)
	            .y(function(d) { return d.display.y + d.display.y0 })
	            .forceY([0])
	            .color(data.map(function(d,i) {
	              return d.color || color(d, i);
	            }).filter(function(d,i) { return !data[i].disabled }));


	          gEnter.append('g').attr('class', 'nv-scatterWrap');
	          var scatterWrap = g.select('.nv-scatterWrap')
	              .datum(data.filter(function(d) { return !d.disabled }))

	          d3.transition(scatterWrap).call(scatter);



	          wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


	          defsEnter.append('clipPath')
	              .attr('id', 'nv-edge-clip-' + id)
	            .append('rect');

	          wrap.select('#nv-edge-clip-' + id + ' rect')
	              .attr('width', availableWidth)
	              .attr('height', availableHeight);

	          g   .attr('clip-path', clipEdge ? 'url(#nv-edge-clip-' + id + ')' : '');




	          var area = d3.svg.area()
	              .x(function(d,i)  { return x(getX(d,i)) })
	              .y0(function(d) { return y(d.display.y0) })
	              .y1(function(d) { return y(d.display.y + d.display.y0) });

	          var zeroArea = d3.svg.area()
	              .x(function(d,i)  { return x(getX(d,i)) })
	              .y0(function(d) { return y(d.display.y0) })
	              .y1(function(d) { return y(d.display.y0) });


	          var path = g.select('.nv-areaWrap').selectAll('path.nv-area')
	              .data(function(d) { return d });
	              //.data(function(d) { return d }, function(d) { return d.key });
	          path.enter().append('path').attr('class', function(d,i) { return 'nv-area nv-area-' + i })
	              .on('mouseover', function(d,i) {
	                d3.select(this).classed('hover', true);
	                dispatch.areaMouseover({
	                  point: d,
	                  series: d.key,
	                  pos: [d3.event.pageX, d3.event.pageY],
	                  seriesIndex: i
	                });
	              })
	              .on('mouseout', function(d,i) {
	                d3.select(this).classed('hover', false);
	                dispatch.areaMouseout({
	                  point: d,
	                  series: d.key,
	                  pos: [d3.event.pageX, d3.event.pageY],
	                  seriesIndex: i
	                });
	              })
	              .on('click', function(d,i) {
	                d3.select(this).classed('hover', false);
	                dispatch.areaClick({
	                  point: d,
	                  series: d.key,
	                  pos: [d3.event.pageX, d3.event.pageY],
	                  seriesIndex: i
	                });
	              })
	          d3.transition(path.exit())
	              .attr('d', function(d,i) { return zeroArea(d.values,i) })
	              .remove();
	          path
	              .style('fill', function(d,i){ return d.color || color(d, i) })
	              .style('stroke', function(d,i){ return d.color || color(d, i) });
	          d3.transition(path)
	              .attr('d', function(d,i) { return area(d.values,i) })


	          //============================================================
	          // Event Handling/Dispatching (in chart's scope)
	          //------------------------------------------------------------

	          scatter.dispatch.on('elementMouseover.area', function(e) {
	            g.select('.nv-chart-' + id + ' .nv-area-' + e.seriesIndex).classed('hover', true);
	          });
	          scatter.dispatch.on('elementMouseout.area', function(e) {
	            g.select('.nv-chart-' + id + ' .nv-area-' + e.seriesIndex).classed('hover', false);
	          });

	      });


	      return chart;
	    }


	    //============================================================
	    // Event Handling/Dispatching (out of chart's scope)
	    //------------------------------------------------------------

	    scatter.dispatch.on('elementClick.area', function(e) {
	      dispatch.areaClick(e);
	    })
	    scatter.dispatch.on('elementMouseover.tooltip', function(e) {
	          e.pos = [e.pos[0] + margin.left, e.pos[1] + margin.top],
	          dispatch.tooltipShow(e);
	    });
	    scatter.dispatch.on('elementMouseout.tooltip', function(e) {
	          dispatch.tooltipHide(e);
	    });



	    //============================================================
	    // Global getters and setters
	    //------------------------------------------------------------

	    chart.dispatch = dispatch;
	    chart.scatter = scatter;

	    d3.rebind(chart, scatter, 'interactive', 'size', 'xScale', 'yScale', 'zScale', 'xDomain', 'yDomain', 'sizeDomain', 'forceX', 'forceY', 'forceSize', 'clipVoronoi', 'clipRadius');

	    chart.x = function(_) {
	      if (!arguments.length) return getX;
	      getX = d3.functor(_);
	      return chart;
	    };

	    chart.y = function(_) {
	      if (!arguments.length) return getY;
	      getY = d3.functor(_);
	      return chart;
	    }

	    chart.margin = function(_) {
	      if (!arguments.length) return margin;
	      margin = _;
	      return chart;
	    };

	    chart.width = function(_) {
	      if (!arguments.length) return width;
	      width = _;
	      return chart;
	    };

	    chart.height = function(_) {
	      if (!arguments.length) return height;
	      height = _;
	      return chart;
	    };

	    chart.clipEdge = function(_) {
	      if (!arguments.length) return clipEdge;
	      clipEdge = _;
	      return chart;
	    };

	    chart.color = function(_) {
	      if (!arguments.length) return color;
	      color = nv.utils.getColor(_);
	      return chart;
	    };

	    chart.offset = function(_) {
	      if (!arguments.length) return offset;
	      offset = _;
	      return chart;
	    };

	    chart.order = function(_) {
	      if (!arguments.length) return order;
	      order = _;
	      return chart;
	    };

	    //shortcut for offset + order
	    chart.style = function(_) {
	      if (!arguments.length) return style;
	      style = _;

	      switch (style) {
	        case 'stack':
	          chart.offset('zero');
	          chart.order('default');
	          break;
	        case 'stream':
	          chart.offset('wiggle');
	          chart.order('inside-out');
	          break;
	        case 'expand':
	          chart.offset('expand');
	          chart.order('default');
	          break;
	      }

	      return chart;
	    };


	    return chart;
	  }

	  nv.models.stackedAreaChart = function() {

	    //============================================================
	    // Public Variables with Default Settings
	    //------------------------------------------------------------

	    var margin = {top: 30, right: 25, bottom: 50, left: 60},
	        width = null,
	        height = null,
	        color = nv.utils.defaultColor(), // a function that takes in d, i and
	        //returns color
	        showControls = true,
	        showLegend = true,
	        tooltips = true,
	        tooltip = function(key, x, y, e, graph) {
	          return '<h3>' + key + '</h3>' +
	                 '<p>' +  y + ' on ' + x + '</p>'
	        },
	        x, y, //can be accessed via chart.stacked.[x/y]Scale()
	        noData = "No Data Available."
	        ;


	    //============================================================
	    // Private Variables
	    //------------------------------------------------------------

	    var stacked = nv.models.stackedArea(),
	        xAxis = nv.models.axis().orient('bottom').tickPadding(5),
	        yAxis = nv.models.axis().orient('left'),
	        yAxisTickFormat = d3.format(",.2f"),
	        legend = nv.models.legend().height(30),
	        controls = nv.models.legend().height(30),
	        dispatch = d3.dispatch('tooltipShow', 'tooltipHide');

	    //TODO: let user select default
	    var controlsData = [
	      { key: 'Stacked' },
	      { key: 'Stream', disabled: true },
	      { key: 'Expanded', disabled: true }
	    ];

	    var showTooltip = function(e, offsetElement) {
	      var left = e.pos[0] + ( offsetElement.offsetLeft || 0 ),
	          top = e.pos[1] + ( offsetElement.offsetTop || 0),
	          x = xAxis.tickFormat()(stacked.x()(e.point, e.pointIndex)),
	          y = yAxis.tickFormat()(stacked.y()(e.point, e.pointIndex)),
	          content = tooltip(e.series.key, x, y, e, chart);

	      nv.tooltip.show([left, top], content, e.value < 0 ? 'n' : 's', null, offsetElement);
	    };


	    function chart(selection) {
	      selection.each(function(data) {
	        var container = d3.select(this),
	            that = this;

	        var availableWidth = (width  || parseInt(container.style('width')) || 960)
	                               - margin.left - margin.right,
	            availableHeight = (height || parseInt(container.style('height')) || 400)
	                               - margin.top - margin.bottom;


	        //------------------------------------------------------------
	        // Display No Data message if there's nothing to show.

	        if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
	          container.append('text')
	            .attr('class', 'nvd3 nv-noData')
	            .attr('x', availableWidth / 2)
	            .attr('y', availableHeight / 2)
	            .attr('dy', '-.7em')
	            .style('text-anchor', 'middle')
	            .text(noData);
	            return chart;
	        } else {
	          container.select('.nv-noData').remove();
	        }

	        //------------------------------------------------------------



	        x = stacked.xScale();
	        y = stacked.yScale();

	        var wrap = container.selectAll('g.nv-wrap.nv-stackedAreaChart').data([data]);
	        var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-stackedAreaChart').append('g');

	        gEnter.append('g').attr('class', 'nv-x nv-axis');
	        gEnter.append('g').attr('class', 'nv-y nv-axis');
	        gEnter.append('g').attr('class', 'nv-stackedWrap');
	        gEnter.append('g').attr('class', 'nv-legendWrap');
	        gEnter.append('g').attr('class', 'nv-controlsWrap');


	        var g = wrap.select('g');


	        if (showLegend) {
	          legend
	            .width( availableWidth / 2 );

	          g.select('.nv-legendWrap')
	              .datum(data)
	              .call(legend);

	          if ( margin.top != legend.height()) {
	            margin.top = legend.height();
	            availableHeight = (height || parseInt(container.style('height')) || 400)
	                               - margin.top - margin.bottom;
	          }

	          g.select('.nv-legendWrap')
	              .attr('transform', 'translate(' + ( availableWidth / 2 ) + ',' + (-margin.top) +')');
	        }


	        stacked
	          .width(availableWidth)
	          .height(availableHeight)



	        if (showControls) {
	          controls.width(280).color(['#444', '#444', '#444']);
	          g.select('.nv-controlsWrap')
	              .datum(controlsData)
	              .attr('transform', 'translate(0,' + (-margin.top) +')')
	              .call(controls);
	        }


	        g.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


	        var stackedWrap = g.select('.nv-stackedWrap')
	            .datum(data);
	        d3.transition(stackedWrap).call(stacked);


	        xAxis
	          .scale(x)
	          .ticks( availableWidth / 100 )
	          .tickSize( -availableHeight, 0);

	        g.select('.nv-x.nv-axis')
	            .attr('transform', 'translate(0,' + availableHeight + ')');
	        d3.transition(g.select('.nv-x.nv-axis'))
	            .call(xAxis);

	        yAxis
	          .scale(y)
	          .ticks(stacked.offset() == 'wiggle' ? 0 : availableHeight / 36)
	          .tickSize(-availableWidth, 0)
	          .setTickFormat(stacked.offset() == 'expand' ? d3.format('%') : yAxisTickFormat);

	        d3.transition(g.select('.nv-y.nv-axis'))
	            .call(yAxis);


	        //============================================================
	        // Event Handling/Dispatching (in chart's scope)
	        //------------------------------------------------------------

	        stacked.dispatch.on('areaClick.toggle', function(e) {
	          if (data.filter(function(d) { return !d.disabled }).length === 1)
	            data = data.map(function(d) {
	              d.disabled = false;
	              return d
	            });
	          else
	            data = data.map(function(d,i) {
	              d.disabled = (i != e.seriesIndex);
	              return d
	            });

	          selection.transition().call(chart);
	        });

	        legend.dispatch.on('legendClick', function(d,i) {
	          d.disabled = !d.disabled;

	          if (!data.filter(function(d) { return !d.disabled }).length) {
	            data.map(function(d) {
	              d.disabled = false;
	              return d;
	            });
	          }

	          selection.transition().call(chart);
	        });

	        controls.dispatch.on('legendClick', function(d,i) {
	          if (!d.disabled) return;

	          controlsData = controlsData.map(function(s) {
	            s.disabled = true;
	            return s;
	          });
	          d.disabled = false;

	          switch (d.key) {
	            case 'Stacked':
	              stacked.style('stack');
	              break;
	            case 'Stream':
	              stacked.style('stream');
	              break;
	            case 'Expanded':
	              stacked.style('expand');
	              break;
	          }

	          selection.transition().call(chart);
	        });

	        dispatch.on('tooltipShow', function(e) {
	          if (tooltips) showTooltip(e, that.parentNode);
	        });

	      });


	      //TODO: decide if this makes sense to add into all the models for ease of updating (updating without needing the selection)
	      chart.update = function() { selection.transition().call(chart) };
	      chart.container = this; // I need a reference to the container in order to have outside code check if the chart is visible or not

	      return chart;
	    }



	    //============================================================
	    // Event Handling/Dispatching (out of chart's scope)
	    //------------------------------------------------------------

	    stacked.dispatch.on('tooltipShow', function(e) {
	      //disable tooltips when value ~= 0
	      //// TODO: consider removing points from voronoi that have 0 value instead of this hack
	      if (!Math.round(stacked.y()(e.point) * 100)) {  // 100 will not be good for very small numbers... will have to think about making this valu dynamic, based on data range
	        setTimeout(function() { d3.selectAll('.point.hover').classed('hover', false) }, 0);
	        return false;
	      }

	      e.pos = [e.pos[0] + margin.left, e.pos[1] + margin.top],
	      dispatch.tooltipShow(e);
	    });

	    stacked.dispatch.on('tooltipHide', function(e) {
	      dispatch.tooltipHide(e);
	    });

	    dispatch.on('tooltipHide', function() {
	      if (tooltips) nv.tooltip.cleanup();
	    });



	    //============================================================
	    // Global getters and setters
	    //------------------------------------------------------------

	    chart.dispatch = dispatch;
	    chart.stacked = stacked;
	    chart.xAxis = xAxis;
	    chart.yAxis = yAxis;

	    d3.rebind(chart, stacked, 'x', 'y', 'size', 'xScale', 'yScale', 'xDomain', 'yDomain', 'sizeDomain', 'interactive', 'offset', 'order', 'style', 'clipEdge', 'forceX', 'forceY', 'forceSize');

	    chart.margin = function(_) {
	      if (!arguments.length) return margin;
	      margin = _;
	      return chart;
	    };

	    chart.width = function(_) {
	      if (!arguments.length) return getWidth;
	      width = _;
	      return chart;
	    };

	    chart.height = function(_) {
	      if (!arguments.length) return getHeight;
	      height = _;
	      return chart;
	    };

	    chart.color = function(_) {
	      if (!arguments.length) return color;
	      color = nv.utils.getColor(_);
	      legend.color(color);
	      stacked.color(color);
	      return chart;
	    };

	    chart.showControls = function(_) {
	      if (!arguments.length) return showControls;
	      showControls = _;
	      return chart;
	    };

	    chart.showLegend = function(_) {
	      if (!arguments.length) return showLegend;
	      showLegend = _;
	      return chart;
	    };

	    chart.tooltips = function(_) {
	      if (!arguments.length) return tooltips;
	      tooltips = _;
	      return chart;
	    };

	    chart.tooltipContent = function(_) {
	      if (!arguments.length) return tooltip;
	      tooltip = _;
	      return chart;
	    };

	    chart.noData = function(_) {
	      if (!arguments.length) return noData;
	      noData = _;
	      return chart;
	    };

	    yAxis.setTickFormat = yAxis.tickFormat;
	    yAxis.tickFormat = function(_) {
	      if (!arguments.length) return yAxisTickFormat;
	      yAxisTickFormat = _;
	      return yAxis;
	    };

	    return chart;
	  }
	  })();