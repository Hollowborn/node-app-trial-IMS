import { U as clsx, q as push, u as pop, P as copy_payload, Q as assign_payload, M as bind_props, I as spread_props, V as props_id, J as spread_attributes, N as derived, F as escape_html, K as clsx$1, T as sanitize_props, C as slot, t as setContext, W as hasContext, G as getContext, S as ensure_array_like, R as attr_class, X as attr_style, z as attr, O as stringify, Y as run, Z as is_array, _ as get_prototype_of, $ as object_prototype, a0 as source, a1 as render_effect, s as set, a2 as noop$3, a3 as deferred, g as get$1 } from './index-C7g5K6pr.js';
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from './card-title-2UI1-8SA.js';
import { C as Card_description } from './card-description-DBEtfUW_.js';
import { C as Card_footer } from './card-footer-CIrQjlS9.js';
import { e as extendTailwindMerge, c as cn } from './utils-CgnlkBsb.js';
import { S as Separator } from './separator-Dp6kZbL1.js';
import { c as ce, b as buttonVariants } from './button-CTUnD44E.js';
import { h as html } from './html-FW6Ia4bL.js';
import { b as box, S as SvelteMap, a as attachRef, d as createBitsAttrs, c as createSubscriber, w as watch$1, g as getDataOrientation, e as getDataDisabled, f as getAriaOrientation, h as getHidden, i as getDisabled, j as getAriaSelected, k as getDataOpenClosed, l as SvelteSet, m as getAriaExpanded, M as MediaQuery } from './attrs-CWQZy0Ma.js';
import { c as createId$1, m as mergeProps } from './create-id-DFnkhZAm.js';
import { n as noop$2, C as Context$1, O as OpenChangeComplete, a as afterTick } from './open-change-complete-BEHPw3Wp.js';
import { E as END, H as HOME, A as ARROW_DOWN, a as ARROW_RIGHT, b as ARROW_UP, c as ARROW_LEFT, S as SPACE, d as ENTER, P as Presence_layer } from './presence-layer-B_7GDLHC.js';
import { B as Badge } from './badge-CyI62jER.js';
import { U as Users } from './users-CzjdtVJj.js';
import { I as Icon } from './Icon2-NvMOmgSA.js';
import { F as Fish } from './fish-DoyYKSor.js';
import { B as Briefcase } from './briefcase-D_CUshXW.js';
import { C as Clipboard_list } from './clipboard-list-Golqt3lc.js';
import { I as Info } from './info-DL3_Jdz5.js';
import { C as Chevrons_up_down, P as Plus, T as Trash_2 } from './trash-2-D8prpRXC.js';
import { D as Dollar_sign } from './dollar-sign-CDdfvTN_.js';
import { W as Wheat } from './wheat-CELwlSvR.js';
import { P as Pencil } from './pencil-RVjprur7.js';
import './events-zWHOGqsb.js';

function ascending(a, b) {
  return a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

function descending$1(a, b) {
  return a == null || b == null ? NaN
    : b < a ? -1
    : b > a ? 1
    : b >= a ? 0
    : NaN;
}

function bisector(f) {
  let compare1, compare2, delta;

  // If an accessor is specified, promote it to a comparator. In this case we
  // can test whether the search value is (self-) comparable. We can’t do this
  // for a comparator (except for specific, known comparators) because we can’t
  // tell if the comparator is symmetric, and an asymmetric comparator can’t be
  // used to test whether a single value is comparable.
  if (f.length !== 2) {
    compare1 = ascending;
    compare2 = (d, x) => ascending(f(d), x);
    delta = (d, x) => f(d) - x;
  } else {
    compare1 = f === ascending || f === descending$1 ? f : zero$1;
    compare2 = f;
    delta = f;
  }

  function left(a, x, lo = 0, hi = a.length) {
    if (lo < hi) {
      if (compare1(x, x) !== 0) return hi;
      do {
        const mid = (lo + hi) >>> 1;
        if (compare2(a[mid], x) < 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }

  function right(a, x, lo = 0, hi = a.length) {
    if (lo < hi) {
      if (compare1(x, x) !== 0) return hi;
      do {
        const mid = (lo + hi) >>> 1;
        if (compare2(a[mid], x) <= 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }

  function center(a, x, lo = 0, hi = a.length) {
    const i = left(a, x, lo, hi - 1);
    return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
  }

  return {left, center, right};
}

function zero$1() {
  return 0;
}

function number$2(x) {
  return x === null ? NaN : +x;
}

function* numbers(values, valueof) {
  {
    for (let value of values) {
      if (value != null && (value = +value) >= value) {
        yield value;
      }
    }
  }
}

const ascendingBisect = bisector(ascending);
const bisectRight = ascendingBisect.right;
bisector(number$2).center;

function extent(values, valueof) {
  let min;
  let max;
  if (valueof === undefined) {
    for (const value of values) {
      if (value != null) {
        if (min === undefined) {
          if (value >= value) min = max = value;
        } else {
          if (min > value) min = value;
          if (max < value) max = value;
        }
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null) {
        if (min === undefined) {
          if (value >= value) min = max = value;
        } else {
          if (min > value) min = value;
          if (max < value) max = value;
        }
      }
    }
  }
  return [min, max];
}

// https://github.com/python/cpython/blob/a74eea238f5baba15797e2e8b570d153bc8690a7/Modules/mathmodule.c#L1423
class Adder {
  constructor() {
    this._partials = new Float64Array(32);
    this._n = 0;
  }
  add(x) {
    const p = this._partials;
    let i = 0;
    for (let j = 0; j < this._n && j < 32; j++) {
      const y = p[j],
        hi = x + y,
        lo = Math.abs(x) < Math.abs(y) ? x - (hi - y) : y - (hi - x);
      if (lo) p[i++] = lo;
      x = hi;
    }
    p[i] = x;
    this._n = i + 1;
    return this;
  }
  valueOf() {
    const p = this._partials;
    let n = this._n, x, y, lo, hi = 0;
    if (n > 0) {
      hi = p[--n];
      while (n > 0) {
        x = hi;
        y = p[--n];
        hi = x + y;
        lo = y - (hi - x);
        if (lo) break;
      }
      if (n > 0 && ((lo < 0 && p[n - 1] < 0) || (lo > 0 && p[n - 1] > 0))) {
        y = lo * 2;
        x = hi + y;
        if (y == x - hi) hi = x;
      }
    }
    return hi;
  }
}

class InternMap extends Map {
  constructor(entries, key = keyof) {
    super();
    Object.defineProperties(this, {_intern: {value: new Map()}, _key: {value: key}});
    if (entries != null) for (const [key, value] of entries) this.set(key, value);
  }
  get(key) {
    return super.get(intern_get(this, key));
  }
  has(key) {
    return super.has(intern_get(this, key));
  }
  set(key, value) {
    return super.set(intern_set(this, key), value);
  }
  delete(key) {
    return super.delete(intern_delete(this, key));
  }
}

class InternSet extends Set {
  constructor(values, key = keyof) {
    super();
    Object.defineProperties(this, {_intern: {value: new Map()}, _key: {value: key}});
    if (values != null) for (const value of values) this.add(value);
  }
  has(value) {
    return super.has(intern_get(this, value));
  }
  add(value) {
    return super.add(intern_set(this, value));
  }
  delete(value) {
    return super.delete(intern_delete(this, value));
  }
}

function intern_get({_intern, _key}, value) {
  const key = _key(value);
  return _intern.has(key) ? _intern.get(key) : value;
}

function intern_set({_intern, _key}, value) {
  const key = _key(value);
  if (_intern.has(key)) return _intern.get(key);
  _intern.set(key, value);
  return value;
}

function intern_delete({_intern, _key}, value) {
  const key = _key(value);
  if (_intern.has(key)) {
    value = _intern.get(key);
    _intern.delete(key);
  }
  return value;
}

function keyof(value) {
  return value !== null && typeof value === "object" ? value.valueOf() : value;
}

function compareDefined(compare = ascending) {
  if (compare === ascending) return ascendingDefined;
  if (typeof compare !== "function") throw new TypeError("compare is not a function");
  return (a, b) => {
    const x = compare(a, b);
    if (x || x === 0) return x;
    return (compare(b, b) === 0) - (compare(a, a) === 0);
  };
}

function ascendingDefined(a, b) {
  return (a == null || !(a >= a)) - (b == null || !(b >= b)) || (a < b ? -1 : a > b ? 1 : 0);
}

const e10 = Math.sqrt(50),
    e5 = Math.sqrt(10),
    e2 = Math.sqrt(2);

function tickSpec(start, stop, count) {
  const step = (stop - start) / Math.max(0, count),
      power = Math.floor(Math.log10(step)),
      error = step / Math.pow(10, power),
      factor = error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1;
  let i1, i2, inc;
  if (power < 0) {
    inc = Math.pow(10, -power) / factor;
    i1 = Math.round(start * inc);
    i2 = Math.round(stop * inc);
    if (i1 / inc < start) ++i1;
    if (i2 / inc > stop) --i2;
    inc = -inc;
  } else {
    inc = Math.pow(10, power) * factor;
    i1 = Math.round(start / inc);
    i2 = Math.round(stop / inc);
    if (i1 * inc < start) ++i1;
    if (i2 * inc > stop) --i2;
  }
  if (i2 < i1 && 0.5 <= count && count < 2) return tickSpec(start, stop, count * 2);
  return [i1, i2, inc];
}

function ticks(start, stop, count) {
  stop = +stop, start = +start, count = +count;
  if (!(count > 0)) return [];
  if (start === stop) return [start];
  const reverse = stop < start, [i1, i2, inc] = reverse ? tickSpec(stop, start, count) : tickSpec(start, stop, count);
  if (!(i2 >= i1)) return [];
  const n = i2 - i1 + 1, ticks = new Array(n);
  if (reverse) {
    if (inc < 0) for (let i = 0; i < n; ++i) ticks[i] = (i2 - i) / -inc;
    else for (let i = 0; i < n; ++i) ticks[i] = (i2 - i) * inc;
  } else {
    if (inc < 0) for (let i = 0; i < n; ++i) ticks[i] = (i1 + i) / -inc;
    else for (let i = 0; i < n; ++i) ticks[i] = (i1 + i) * inc;
  }
  return ticks;
}

function tickIncrement(start, stop, count) {
  stop = +stop, start = +start, count = +count;
  return tickSpec(start, stop, count)[2];
}

function tickStep(start, stop, count) {
  stop = +stop, start = +start, count = +count;
  const reverse = stop < start, inc = reverse ? tickIncrement(stop, start, count) : tickIncrement(start, stop, count);
  return (reverse ? -1 : 1) * (inc < 0 ? 1 / -inc : inc);
}

function max$2(values, valueof) {
  let max;
  {
    for (const value of values) {
      if (value != null
          && (max < value || (max === undefined && value >= value))) {
        max = value;
      }
    }
  }
  return max;
}

function min$2(values, valueof) {
  let min;
  {
    for (const value of values) {
      if (value != null
          && (min > value || (min === undefined && value >= value))) {
        min = value;
      }
    }
  }
  return min;
}

// Based on https://github.com/mourner/quickselect
// ISC license, Copyright 2018 Vladimir Agafonkin.
function quickselect(array, k, left = 0, right = Infinity, compare) {
  k = Math.floor(k);
  left = Math.floor(Math.max(0, left));
  right = Math.floor(Math.min(array.length - 1, right));

  if (!(left <= k && k <= right)) return array;

  compare = compare === undefined ? ascendingDefined : compareDefined(compare);

  while (right > left) {
    if (right - left > 600) {
      const n = right - left + 1;
      const m = k - left + 1;
      const z = Math.log(n);
      const s = 0.5 * Math.exp(2 * z / 3);
      const sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
      const newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
      const newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
      quickselect(array, k, newLeft, newRight, compare);
    }

    const t = array[k];
    let i = left;
    let j = right;

    swap$1(array, left, k);
    if (compare(array[right], t) > 0) swap$1(array, left, right);

    while (i < j) {
      swap$1(array, i, j), ++i, --j;
      while (compare(array[i], t) < 0) ++i;
      while (compare(array[j], t) > 0) --j;
    }

    if (compare(array[left], t) === 0) swap$1(array, left, j);
    else ++j, swap$1(array, j, right);

    if (j <= k) left = j + 1;
    if (k <= j) right = j - 1;
  }

  return array;
}

function swap$1(array, i, j) {
  const t = array[i];
  array[i] = array[j];
  array[j] = t;
}

function greatest(values, compare = ascending) {
  let max;
  let defined = false;
  if (compare.length === 1) {
    let maxValue;
    for (const element of values) {
      const value = compare(element);
      if (defined
          ? ascending(value, maxValue) > 0
          : ascending(value, value) === 0) {
        max = element;
        maxValue = value;
        defined = true;
      }
    }
  } else {
    for (const value of values) {
      if (defined
          ? compare(value, max) > 0
          : compare(value, value) === 0) {
        max = value;
        defined = true;
      }
    }
  }
  return max;
}

function quantile(values, p, valueof) {
  values = Float64Array.from(numbers(values));
  if (!(n = values.length) || isNaN(p = +p)) return;
  if (p <= 0 || n < 2) return min$2(values);
  if (p >= 1) return max$2(values);
  var n,
      i = (n - 1) * p,
      i0 = Math.floor(i),
      value0 = max$2(quickselect(values, i0).subarray(0, i0 + 1)),
      value1 = min$2(values.subarray(i0 + 1));
  return value0 + (value1 - value0) * (i - i0);
}

function* flatten(arrays) {
  for (const array of arrays) {
    yield* array;
  }
}

function merge(arrays) {
  return Array.from(flatten(arrays));
}

function range$1(start, stop, step) {
  start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;

  var i = -1,
      n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
      range = new Array(n);

  while (++i < n) {
    range[i] = start + i * step;
  }

  return range;
}

function sum$1(values, valueof) {
  let sum = 0;
  if (valueof === undefined) {
    for (let value of values) {
      if (value = +value) {
        sum += value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if (value = +valueof(value, ++index, values)) {
        sum += value;
      }
    }
  }
  return sum;
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Built-in value references. */
var Symbol$1 = root.Symbol;

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$9.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty$7.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$8.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -Infinity) ? '-0' : result;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity$5(value) {
  return value;
}

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag$1 = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction$1(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/** Used for built-in method references. */
var funcProto$2 = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$2 = funcProto$2.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$2.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto$1 = Function.prototype,
    objectProto$7 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString$1.call(hasOwnProperty$6).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction$1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant$2(value) {
  return function() {
    return value;
  };
}

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity$5 : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant$2(string),
    'writable': true
  });
};

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$5.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity$5), func + '');
}

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction$1(value);
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$5;

  return value === proto;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$1;
}

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$4.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$4.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$4.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

/** Detect free variable `exports`. */
var freeExports$2 = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$2 = freeExports$2 && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;

/** Built-in value references. */
var Buffer$1 = moduleExports$2 ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag$1 = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag$1] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/** Detect free variable `exports`. */
var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports$1 && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule$1 && freeModule$1.require && freeModule$1.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if (!(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$3.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$3.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeysIn(object);
}

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? undefined : result;
  }
  return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
}

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty$1.call(data, key);
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/* Built-in method references that are verified to be native. */
var Map$1 = getNative(root, 'Map');

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map$1 || ListCache),
    'string': new Hash
  };
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize$1(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize$1.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize$1.Cache = MapCache;

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize$1(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString$1(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString$1(value));
}

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -Infinity) ? '-0' : result;
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map$1 || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;
    Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  {
    return buffer.slice();
  }
}

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = cloneArrayBuffer(typedArray.buffer) ;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq(object[key], value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function safeGet(object, key) {
  if (key === 'constructor' && typeof object[key] === 'function') {
    return;
  }

  if (key == '__proto__') {
    return;
  }

  return object[key];
}

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet(object, key),
      srcValue = safeGet(source, key),
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray(srcValue),
        isBuff = !isArr && isBuffer(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      }
      else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue);
      }
      else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue);
      }
      else {
        newValue = [];
      }
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      }
      else if (!isObject(objValue) || isFunction$1(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    }
    else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  assignMergeValue(object, key, newValue);
}

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function(srcValue, key) {
    stack || (stack = new Stack);
    if (isObject(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}

/**
 * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
 * objects into destination objects that are passed thru.
 *
 * @private
 * @param {*} objValue The destination value.
 * @param {*} srcValue The source value.
 * @param {string} key The key of the property to merge.
 * @param {Object} object The parent object of `objValue`.
 * @param {Object} source The parent object of `srcValue`.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 * @returns {*} Returns the value to assign.
 */
function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
  if (isObject(objValue) && isObject(srcValue)) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, objValue);
    baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);
    stack['delete'](srcValue);
  }
  return objValue;
}

/**
 * This method is like `_.merge` except that it accepts `customizer` which
 * is invoked to produce the merged values of the destination and source
 * properties. If `customizer` returns `undefined`, merging is handled by the
 * method instead. The `customizer` is invoked with six arguments:
 * (objValue, srcValue, key, object, source, stack).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} customizer The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   if (_.isArray(objValue)) {
 *     return objValue.concat(srcValue);
 *   }
 * }
 *
 * var object = { 'a': [1], 'b': [2] };
 * var other = { 'a': [3], 'b': [4] };
 *
 * _.mergeWith(object, other, customizer);
 * // => { 'a': [1, 3], 'b': [2, 4] }
 */
var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
  baseMerge(object, source, srcIndex, customizer);
});

/**
 * This method is like `_.defaults` except that it recursively assigns
 * default properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 3.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.defaults
 * @example
 *
 * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
 * // => { 'a': { 'b': 2, 'c': 3 } }
 */
var defaultsDeep = baseRest(function(args) {
  args.push(undefined, customDefaultsMerge);
  return apply(mergeWith, undefined, args);
});

// https://basarat.gitbooks.io/typescript/docs/types/never.html#use-case-exhaustive-checks
// https://www.typescriptlang.org/docs/handbook/basic-types.html#never
// Get keys of object (strongly-typed)
// Reason Object.keys() isn't like this by default due to runtime properties: https://github.com/Microsoft/TypeScript/pull/12253#issuecomment-263132208
function keys(o) {
    return Object.keys(o);
}
// @ts-expect-error
function entries(o) {
    if (o instanceof Map)
        return Array.from(o.entries());
    return Object.entries(o); // TODO: Improve based on key/value pair - https://stackoverflow.com/questions/60141960/typescript-key-value-relation-preserving-object-entries-type
}
// Get object from entries (array of [key, value] arrays) (strongly-typed)
function fromEntries(entries) {
    return Object.fromEntries(entries);
}

function isLiteralObject(obj) {
    return obj && typeof obj === 'object' && obj.constructor === Object;
}
function propAccessor(prop) {
    return typeof prop === 'function'
        ? prop
        : typeof prop === 'string'
            ? (d) => get(d, prop)
            : (x) => x;
}
/**
 * Produce a unique Id for an object (helpful for debugging)
 * See: https://stackoverflow.com/a/35306050/191902
 */
var objIdMap = new WeakMap(), objectCount = 0;
function objectId(object) {
    if (!objIdMap.has(object))
        objIdMap.set(object, ++objectCount);
    return objIdMap.get(object);
}
/**
 * Remove `null` or `undefined` properties from an object
 */
function omitNil(obj) {
    if (keys.length === 0) {
        return obj;
    }
    else {
        return fromEntries(entries(obj).filter(([key, value]) => value != null));
    }
}

/**
 * Return the unique set of values (remove duplicates)
 */
function unique(values) {
    return Array.from(new Set(values));
}
/**
 * Get the greatest absolute value in an array of numbers, and maintain sign of value
 */
function greatestAbs(array) {
    return greatest(array, (a, b) => Math.abs(a) - Math.abs(b));
}

const t0 = new Date, t1 = new Date;

function timeInterval$1(floori, offseti, count, field) {

  function interval(date) {
    return floori(date = arguments.length === 0 ? new Date : new Date(+date)), date;
  }

  interval.floor = (date) => {
    return floori(date = new Date(+date)), date;
  };

  interval.ceil = (date) => {
    return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
  };

  interval.round = (date) => {
    const d0 = interval(date), d1 = interval.ceil(date);
    return date - d0 < d1 - date ? d0 : d1;
  };

  interval.offset = (date, step) => {
    return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
  };

  interval.range = (start, stop, step) => {
    const range = [];
    start = interval.ceil(start);
    step = step == null ? 1 : Math.floor(step);
    if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
    let previous;
    do range.push(previous = new Date(+start)), offseti(start, step), floori(start);
    while (previous < start && start < stop);
    return range;
  };

  interval.filter = (test) => {
    return timeInterval$1((date) => {
      if (date >= date) while (floori(date), !test(date)) date.setTime(date - 1);
    }, (date, step) => {
      if (date >= date) {
        if (step < 0) while (++step <= 0) {
          while (offseti(date, -1), !test(date)) {} // eslint-disable-line no-empty
        } else while (--step >= 0) {
          while (offseti(date, 1), !test(date)) {} // eslint-disable-line no-empty
        }
      }
    });
  };

  if (count) {
    interval.count = (start, end) => {
      t0.setTime(+start), t1.setTime(+end);
      floori(t0), floori(t1);
      return Math.floor(count(t0, t1));
    };

    interval.every = (step) => {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null
          : !(step > 1) ? interval
          : interval.filter(field
              ? (d) => field(d) % step === 0
              : (d) => interval.count(0, d) % step === 0);
    };
  }

  return interval;
}

const millisecond = timeInterval$1(() => {
  // noop
}, (date, step) => {
  date.setTime(+date + step);
}, (start, end) => {
  return end - start;
});

// An optimized implementation for this simple case.
millisecond.every = (k) => {
  k = Math.floor(k);
  if (!isFinite(k) || !(k > 0)) return null;
  if (!(k > 1)) return millisecond;
  return timeInterval$1((date) => {
    date.setTime(Math.floor(date / k) * k);
  }, (date, step) => {
    date.setTime(+date + step * k);
  }, (start, end) => {
    return (end - start) / k;
  });
};

millisecond.range;

const durationSecond = 1000;
const durationMinute = durationSecond * 60;
const durationHour = durationMinute * 60;
const durationDay = durationHour * 24;
const durationWeek = durationDay * 7;
const durationMonth = durationDay * 30;
const durationYear = durationDay * 365;

const second = timeInterval$1((date) => {
  date.setTime(date - date.getMilliseconds());
}, (date, step) => {
  date.setTime(+date + step * durationSecond);
}, (start, end) => {
  return (end - start) / durationSecond;
}, (date) => {
  return date.getUTCSeconds();
});

second.range;

const timeMinute = timeInterval$1((date) => {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond);
}, (date, step) => {
  date.setTime(+date + step * durationMinute);
}, (start, end) => {
  return (end - start) / durationMinute;
}, (date) => {
  return date.getMinutes();
});

timeMinute.range;

const utcMinute = timeInterval$1((date) => {
  date.setUTCSeconds(0, 0);
}, (date, step) => {
  date.setTime(+date + step * durationMinute);
}, (start, end) => {
  return (end - start) / durationMinute;
}, (date) => {
  return date.getUTCMinutes();
});

utcMinute.range;

const timeHour = timeInterval$1((date) => {
  date.setTime(date - date.getMilliseconds() - date.getSeconds() * durationSecond - date.getMinutes() * durationMinute);
}, (date, step) => {
  date.setTime(+date + step * durationHour);
}, (start, end) => {
  return (end - start) / durationHour;
}, (date) => {
  return date.getHours();
});

timeHour.range;

const utcHour = timeInterval$1((date) => {
  date.setUTCMinutes(0, 0, 0);
}, (date, step) => {
  date.setTime(+date + step * durationHour);
}, (start, end) => {
  return (end - start) / durationHour;
}, (date) => {
  return date.getUTCHours();
});

utcHour.range;

const timeDay = timeInterval$1(
  date => date.setHours(0, 0, 0, 0),
  (date, step) => date.setDate(date.getDate() + step),
  (start, end) => (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay,
  date => date.getDate() - 1
);

timeDay.range;

const utcDay = timeInterval$1((date) => {
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCDate(date.getUTCDate() + step);
}, (start, end) => {
  return (end - start) / durationDay;
}, (date) => {
  return date.getUTCDate() - 1;
});

utcDay.range;

const unixDay = timeInterval$1((date) => {
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCDate(date.getUTCDate() + step);
}, (start, end) => {
  return (end - start) / durationDay;
}, (date) => {
  return Math.floor(date / durationDay);
});

unixDay.range;

function timeWeekday(i) {
  return timeInterval$1((date) => {
    date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
    date.setHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setDate(date.getDate() + step * 7);
  }, (start, end) => {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
  });
}

const timeSunday = timeWeekday(0);
const timeMonday = timeWeekday(1);
const timeTuesday = timeWeekday(2);
const timeWednesday = timeWeekday(3);
const timeThursday = timeWeekday(4);
const timeFriday = timeWeekday(5);
const timeSaturday = timeWeekday(6);

timeSunday.range;
timeMonday.range;
timeTuesday.range;
timeWednesday.range;
timeThursday.range;
timeFriday.range;
timeSaturday.range;

function utcWeekday(i) {
  return timeInterval$1((date) => {
    date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
    date.setUTCHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setUTCDate(date.getUTCDate() + step * 7);
  }, (start, end) => {
    return (end - start) / durationWeek;
  });
}

const utcSunday = utcWeekday(0);
const utcMonday = utcWeekday(1);
const utcTuesday = utcWeekday(2);
const utcWednesday = utcWeekday(3);
const utcThursday = utcWeekday(4);
const utcFriday = utcWeekday(5);
const utcSaturday = utcWeekday(6);

utcSunday.range;
utcMonday.range;
utcTuesday.range;
utcWednesday.range;
utcThursday.range;
utcFriday.range;
utcSaturday.range;

const timeMonth = timeInterval$1((date) => {
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
}, (date, step) => {
  date.setMonth(date.getMonth() + step);
}, (start, end) => {
  return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
}, (date) => {
  return date.getMonth();
});

timeMonth.range;

const utcMonth = timeInterval$1((date) => {
  date.setUTCDate(1);
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCMonth(date.getUTCMonth() + step);
}, (start, end) => {
  return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
}, (date) => {
  return date.getUTCMonth();
});

utcMonth.range;

const timeYear = timeInterval$1((date) => {
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
}, (date, step) => {
  date.setFullYear(date.getFullYear() + step);
}, (start, end) => {
  return end.getFullYear() - start.getFullYear();
}, (date) => {
  return date.getFullYear();
});

// An optimized implementation for this simple case.
timeYear.every = (k) => {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : timeInterval$1((date) => {
    date.setFullYear(Math.floor(date.getFullYear() / k) * k);
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setFullYear(date.getFullYear() + step * k);
  });
};

timeYear.range;

const utcYear = timeInterval$1((date) => {
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
}, (date, step) => {
  date.setUTCFullYear(date.getUTCFullYear() + step);
}, (start, end) => {
  return end.getUTCFullYear() - start.getUTCFullYear();
}, (date) => {
  return date.getUTCFullYear();
});

// An optimized implementation for this simple case.
utcYear.every = (k) => {
  return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : timeInterval$1((date) => {
    date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
  }, (date, step) => {
    date.setUTCFullYear(date.getUTCFullYear() + step * k);
  });
};

utcYear.range;

function ticker(year, month, week, day, hour, minute) {

  const tickIntervals = [
    [second,  1,      durationSecond],
    [second,  5,  5 * durationSecond],
    [second, 15, 15 * durationSecond],
    [second, 30, 30 * durationSecond],
    [minute,  1,      durationMinute],
    [minute,  5,  5 * durationMinute],
    [minute, 15, 15 * durationMinute],
    [minute, 30, 30 * durationMinute],
    [  hour,  1,      durationHour  ],
    [  hour,  3,  3 * durationHour  ],
    [  hour,  6,  6 * durationHour  ],
    [  hour, 12, 12 * durationHour  ],
    [   day,  1,      durationDay   ],
    [   day,  2,  2 * durationDay   ],
    [  week,  1,      durationWeek  ],
    [ month,  1,      durationMonth ],
    [ month,  3,  3 * durationMonth ],
    [  year,  1,      durationYear  ]
  ];

  function ticks(start, stop, count) {
    const reverse = stop < start;
    if (reverse) [start, stop] = [stop, start];
    const interval = count && typeof count.range === "function" ? count : tickInterval(start, stop, count);
    const ticks = interval ? interval.range(start, +stop + 1) : []; // inclusive stop
    return reverse ? ticks.reverse() : ticks;
  }

  function tickInterval(start, stop, count) {
    const target = Math.abs(stop - start) / count;
    const i = bisector(([,, step]) => step).right(tickIntervals, target);
    if (i === tickIntervals.length) return year.every(tickStep(start / durationYear, stop / durationYear, count));
    if (i === 0) return millisecond.every(Math.max(tickStep(start, stop, count), 1));
    const [t, step] = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
    return t.every(step);
  }

  return [ticks, tickInterval];
}
const [timeTicks, timeTickInterval] = ticker(timeYear, timeMonth, timeSunday, timeDay, timeHour, timeMinute);

function localDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
    date.setFullYear(d.y);
    return date;
  }
  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}

function utcDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
    date.setUTCFullYear(d.y);
    return date;
  }
  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}

function newDate(y, m, d) {
  return {y: y, m: m, d: d, H: 0, M: 0, S: 0, L: 0};
}

function formatLocale$1(locale) {
  var locale_dateTime = locale.dateTime,
      locale_date = locale.date,
      locale_time = locale.time,
      locale_periods = locale.periods,
      locale_weekdays = locale.days,
      locale_shortWeekdays = locale.shortDays,
      locale_months = locale.months,
      locale_shortMonths = locale.shortMonths;

  var periodRe = formatRe(locale_periods),
      periodLookup = formatLookup(locale_periods),
      weekdayRe = formatRe(locale_weekdays),
      weekdayLookup = formatLookup(locale_weekdays),
      shortWeekdayRe = formatRe(locale_shortWeekdays),
      shortWeekdayLookup = formatLookup(locale_shortWeekdays),
      monthRe = formatRe(locale_months),
      monthLookup = formatLookup(locale_months),
      shortMonthRe = formatRe(locale_shortMonths),
      shortMonthLookup = formatLookup(locale_shortMonths);

  var formats = {
    "a": formatShortWeekday,
    "A": formatWeekday,
    "b": formatShortMonth,
    "B": formatMonth,
    "c": null,
    "d": formatDayOfMonth,
    "e": formatDayOfMonth,
    "f": formatMicroseconds,
    "g": formatYearISO,
    "G": formatFullYearISO,
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "q": formatQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatSeconds,
    "u": formatWeekdayNumberMonday,
    "U": formatWeekNumberSunday,
    "V": formatWeekNumberISO,
    "w": formatWeekdayNumberSunday,
    "W": formatWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatYear,
    "Y": formatFullYear,
    "Z": formatZone,
    "%": formatLiteralPercent
  };

  var utcFormats = {
    "a": formatUTCShortWeekday,
    "A": formatUTCWeekday,
    "b": formatUTCShortMonth,
    "B": formatUTCMonth,
    "c": null,
    "d": formatUTCDayOfMonth,
    "e": formatUTCDayOfMonth,
    "f": formatUTCMicroseconds,
    "g": formatUTCYearISO,
    "G": formatUTCFullYearISO,
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "q": formatUTCQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatUTCSeconds,
    "u": formatUTCWeekdayNumberMonday,
    "U": formatUTCWeekNumberSunday,
    "V": formatUTCWeekNumberISO,
    "w": formatUTCWeekdayNumberSunday,
    "W": formatUTCWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatUTCYear,
    "Y": formatUTCFullYear,
    "Z": formatUTCZone,
    "%": formatLiteralPercent
  };

  var parses = {
    "a": parseShortWeekday,
    "A": parseWeekday,
    "b": parseShortMonth,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDayOfMonth,
    "e": parseDayOfMonth,
    "f": parseMicroseconds,
    "g": parseYear,
    "G": parseFullYear,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "q": parseQuarter,
    "Q": parseUnixTimestamp,
    "s": parseUnixTimestampSeconds,
    "S": parseSeconds,
    "u": parseWeekdayNumberMonday,
    "U": parseWeekNumberSunday,
    "V": parseWeekNumberISO,
    "w": parseWeekdayNumberSunday,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  };

  // These recursive directive definitions must be deferred.
  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);

  function newFormat(specifier, formats) {
    return function(date) {
      var string = [],
          i = -1,
          j = 0,
          n = specifier.length,
          c,
          pad,
          format;

      if (!(date instanceof Date)) date = new Date(+date);

      while (++i < n) {
        if (specifier.charCodeAt(i) === 37) {
          string.push(specifier.slice(j, i));
          if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
          else pad = c === "e" ? " " : "0";
          if (format = formats[c]) c = format(date, pad);
          string.push(c);
          j = i + 1;
        }
      }

      string.push(specifier.slice(j, i));
      return string.join("");
    };
  }

  function newParse(specifier, Z) {
    return function(string) {
      var d = newDate(1900, undefined, 1),
          i = parseSpecifier(d, specifier, string += "", 0),
          week, day;
      if (i != string.length) return null;

      // If a UNIX timestamp is specified, return it.
      if ("Q" in d) return new Date(d.Q);
      if ("s" in d) return new Date(d.s * 1000 + ("L" in d ? d.L : 0));

      // If this is utcParse, never use the local timezone.
      if (Z && !("Z" in d)) d.Z = 0;

      // The am-pm flag is 0 for AM, and 1 for PM.
      if ("p" in d) d.H = d.H % 12 + d.p * 12;

      // If the month was not specified, inherit from the quarter.
      if (d.m === undefined) d.m = "q" in d ? d.q : 0;

      // Convert day-of-week and week-of-year to day-of-year.
      if ("V" in d) {
        if (d.V < 1 || d.V > 53) return null;
        if (!("w" in d)) d.w = 1;
        if ("Z" in d) {
          week = utcDate(newDate(d.y, 0, 1)), day = week.getUTCDay();
          week = day > 4 || day === 0 ? utcMonday.ceil(week) : utcMonday(week);
          week = utcDay.offset(week, (d.V - 1) * 7);
          d.y = week.getUTCFullYear();
          d.m = week.getUTCMonth();
          d.d = week.getUTCDate() + (d.w + 6) % 7;
        } else {
          week = localDate(newDate(d.y, 0, 1)), day = week.getDay();
          week = day > 4 || day === 0 ? timeMonday.ceil(week) : timeMonday(week);
          week = timeDay.offset(week, (d.V - 1) * 7);
          d.y = week.getFullYear();
          d.m = week.getMonth();
          d.d = week.getDate() + (d.w + 6) % 7;
        }
      } else if ("W" in d || "U" in d) {
        if (!("w" in d)) d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
        day = "Z" in d ? utcDate(newDate(d.y, 0, 1)).getUTCDay() : localDate(newDate(d.y, 0, 1)).getDay();
        d.m = 0;
        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
      }

      // If a time zone is specified, all fields are interpreted as UTC and then
      // offset according to the specified time zone.
      if ("Z" in d) {
        d.H += d.Z / 100 | 0;
        d.M += d.Z % 100;
        return utcDate(d);
      }

      // Otherwise, all fields are in local time.
      return localDate(d);
    };
  }

  function parseSpecifier(d, specifier, string, j) {
    var i = 0,
        n = specifier.length,
        m = string.length,
        c,
        parse;

    while (i < n) {
      if (j >= m) return -1;
      c = specifier.charCodeAt(i++);
      if (c === 37) {
        c = specifier.charAt(i++);
        parse = parses[c in pads ? specifier.charAt(i++) : c];
        if (!parse || ((j = parse(d, string, j)) < 0)) return -1;
      } else if (c != string.charCodeAt(j++)) {
        return -1;
      }
    }

    return j;
  }

  function parsePeriod(d, string, i) {
    var n = periodRe.exec(string.slice(i));
    return n ? (d.p = periodLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseShortWeekday(d, string, i) {
    var n = shortWeekdayRe.exec(string.slice(i));
    return n ? (d.w = shortWeekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseWeekday(d, string, i) {
    var n = weekdayRe.exec(string.slice(i));
    return n ? (d.w = weekdayLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseShortMonth(d, string, i) {
    var n = shortMonthRe.exec(string.slice(i));
    return n ? (d.m = shortMonthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseMonth(d, string, i) {
    var n = monthRe.exec(string.slice(i));
    return n ? (d.m = monthLookup.get(n[0].toLowerCase()), i + n[0].length) : -1;
  }

  function parseLocaleDateTime(d, string, i) {
    return parseSpecifier(d, locale_dateTime, string, i);
  }

  function parseLocaleDate(d, string, i) {
    return parseSpecifier(d, locale_date, string, i);
  }

  function parseLocaleTime(d, string, i) {
    return parseSpecifier(d, locale_time, string, i);
  }

  function formatShortWeekday(d) {
    return locale_shortWeekdays[d.getDay()];
  }

  function formatWeekday(d) {
    return locale_weekdays[d.getDay()];
  }

  function formatShortMonth(d) {
    return locale_shortMonths[d.getMonth()];
  }

  function formatMonth(d) {
    return locale_months[d.getMonth()];
  }

  function formatPeriod(d) {
    return locale_periods[+(d.getHours() >= 12)];
  }

  function formatQuarter(d) {
    return 1 + ~~(d.getMonth() / 3);
  }

  function formatUTCShortWeekday(d) {
    return locale_shortWeekdays[d.getUTCDay()];
  }

  function formatUTCWeekday(d) {
    return locale_weekdays[d.getUTCDay()];
  }

  function formatUTCShortMonth(d) {
    return locale_shortMonths[d.getUTCMonth()];
  }

  function formatUTCMonth(d) {
    return locale_months[d.getUTCMonth()];
  }

  function formatUTCPeriod(d) {
    return locale_periods[+(d.getUTCHours() >= 12)];
  }

  function formatUTCQuarter(d) {
    return 1 + ~~(d.getUTCMonth() / 3);
  }

  return {
    format: function(specifier) {
      var f = newFormat(specifier += "", formats);
      f.toString = function() { return specifier; };
      return f;
    },
    parse: function(specifier) {
      var p = newParse(specifier += "", false);
      p.toString = function() { return specifier; };
      return p;
    },
    utcFormat: function(specifier) {
      var f = newFormat(specifier += "", utcFormats);
      f.toString = function() { return specifier; };
      return f;
    },
    utcParse: function(specifier) {
      var p = newParse(specifier += "", true);
      p.toString = function() { return specifier; };
      return p;
    }
  };
}

var pads = {"-": "", "_": " ", "0": "0"},
    numberRe = /^\s*\d+/, // note: ignores next directive
    percentRe = /^%/,
    requoteRe = /[\\^$*+?|[\]().{}]/g;

function pad(value, fill, width) {
  var sign = value < 0 ? "-" : "",
      string = (sign ? -value : value) + "",
      length = string.length;
  return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
}

function requote(s) {
  return s.replace(requoteRe, "\\$&");
}

function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}

function formatLookup(names) {
  return new Map(names.map((name, i) => [name.toLowerCase(), i]));
}

function parseWeekdayNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.w = +n[0], i + n[0].length) : -1;
}

function parseWeekdayNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.u = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.U = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberISO(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.V = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.W = +n[0], i + n[0].length) : -1;
}

function parseFullYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 4));
  return n ? (d.y = +n[0], i + n[0].length) : -1;
}

function parseYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
}

function parseZone(d, string, i) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
  return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
}

function parseQuarter(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.q = n[0] * 3 - 3, i + n[0].length) : -1;
}

function parseMonthNumber(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
}

function parseDayOfMonth(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.d = +n[0], i + n[0].length) : -1;
}

function parseDayOfYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
}

function parseHour24(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.H = +n[0], i + n[0].length) : -1;
}

function parseMinutes(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.M = +n[0], i + n[0].length) : -1;
}

function parseSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.S = +n[0], i + n[0].length) : -1;
}

function parseMilliseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.L = +n[0], i + n[0].length) : -1;
}

function parseMicroseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 6));
  return n ? (d.L = Math.floor(n[0] / 1000), i + n[0].length) : -1;
}

function parseLiteralPercent(d, string, i) {
  var n = percentRe.exec(string.slice(i, i + 1));
  return n ? i + n[0].length : -1;
}

function parseUnixTimestamp(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.Q = +n[0], i + n[0].length) : -1;
}

function parseUnixTimestampSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.s = +n[0], i + n[0].length) : -1;
}

function formatDayOfMonth(d, p) {
  return pad(d.getDate(), p, 2);
}

function formatHour24(d, p) {
  return pad(d.getHours(), p, 2);
}

function formatHour12(d, p) {
  return pad(d.getHours() % 12 || 12, p, 2);
}

function formatDayOfYear(d, p) {
  return pad(1 + timeDay.count(timeYear(d), d), p, 3);
}

function formatMilliseconds(d, p) {
  return pad(d.getMilliseconds(), p, 3);
}

function formatMicroseconds(d, p) {
  return formatMilliseconds(d, p) + "000";
}

function formatMonthNumber(d, p) {
  return pad(d.getMonth() + 1, p, 2);
}

function formatMinutes(d, p) {
  return pad(d.getMinutes(), p, 2);
}

function formatSeconds(d, p) {
  return pad(d.getSeconds(), p, 2);
}

function formatWeekdayNumberMonday(d) {
  var day = d.getDay();
  return day === 0 ? 7 : day;
}

function formatWeekNumberSunday(d, p) {
  return pad(timeSunday.count(timeYear(d) - 1, d), p, 2);
}

function dISO(d) {
  var day = d.getDay();
  return (day >= 4 || day === 0) ? timeThursday(d) : timeThursday.ceil(d);
}

function formatWeekNumberISO(d, p) {
  d = dISO(d);
  return pad(timeThursday.count(timeYear(d), d) + (timeYear(d).getDay() === 4), p, 2);
}

function formatWeekdayNumberSunday(d) {
  return d.getDay();
}

function formatWeekNumberMonday(d, p) {
  return pad(timeMonday.count(timeYear(d) - 1, d), p, 2);
}

function formatYear(d, p) {
  return pad(d.getFullYear() % 100, p, 2);
}

function formatYearISO(d, p) {
  d = dISO(d);
  return pad(d.getFullYear() % 100, p, 2);
}

function formatFullYear(d, p) {
  return pad(d.getFullYear() % 10000, p, 4);
}

function formatFullYearISO(d, p) {
  var day = d.getDay();
  d = (day >= 4 || day === 0) ? timeThursday(d) : timeThursday.ceil(d);
  return pad(d.getFullYear() % 10000, p, 4);
}

function formatZone(d) {
  var z = d.getTimezoneOffset();
  return (z > 0 ? "-" : (z *= -1, "+"))
      + pad(z / 60 | 0, "0", 2)
      + pad(z % 60, "0", 2);
}

function formatUTCDayOfMonth(d, p) {
  return pad(d.getUTCDate(), p, 2);
}

function formatUTCHour24(d, p) {
  return pad(d.getUTCHours(), p, 2);
}

function formatUTCHour12(d, p) {
  return pad(d.getUTCHours() % 12 || 12, p, 2);
}

function formatUTCDayOfYear(d, p) {
  return pad(1 + utcDay.count(utcYear(d), d), p, 3);
}

function formatUTCMilliseconds(d, p) {
  return pad(d.getUTCMilliseconds(), p, 3);
}

function formatUTCMicroseconds(d, p) {
  return formatUTCMilliseconds(d, p) + "000";
}

function formatUTCMonthNumber(d, p) {
  return pad(d.getUTCMonth() + 1, p, 2);
}

function formatUTCMinutes(d, p) {
  return pad(d.getUTCMinutes(), p, 2);
}

function formatUTCSeconds(d, p) {
  return pad(d.getUTCSeconds(), p, 2);
}

function formatUTCWeekdayNumberMonday(d) {
  var dow = d.getUTCDay();
  return dow === 0 ? 7 : dow;
}

function formatUTCWeekNumberSunday(d, p) {
  return pad(utcSunday.count(utcYear(d) - 1, d), p, 2);
}

function UTCdISO(d) {
  var day = d.getUTCDay();
  return (day >= 4 || day === 0) ? utcThursday(d) : utcThursday.ceil(d);
}

function formatUTCWeekNumberISO(d, p) {
  d = UTCdISO(d);
  return pad(utcThursday.count(utcYear(d), d) + (utcYear(d).getUTCDay() === 4), p, 2);
}

function formatUTCWeekdayNumberSunday(d) {
  return d.getUTCDay();
}

function formatUTCWeekNumberMonday(d, p) {
  return pad(utcMonday.count(utcYear(d) - 1, d), p, 2);
}

function formatUTCYear(d, p) {
  return pad(d.getUTCFullYear() % 100, p, 2);
}

function formatUTCYearISO(d, p) {
  d = UTCdISO(d);
  return pad(d.getUTCFullYear() % 100, p, 2);
}

function formatUTCFullYear(d, p) {
  return pad(d.getUTCFullYear() % 10000, p, 4);
}

function formatUTCFullYearISO(d, p) {
  var day = d.getUTCDay();
  d = (day >= 4 || day === 0) ? utcThursday(d) : utcThursday.ceil(d);
  return pad(d.getUTCFullYear() % 10000, p, 4);
}

function formatUTCZone() {
  return "+0000";
}

function formatLiteralPercent() {
  return "%";
}

function formatUnixTimestamp(d) {
  return +d;
}

function formatUnixTimestampSeconds(d) {
  return Math.floor(+d / 1000);
}

var locale$1;
var timeFormat;

defaultLocale$2({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});

function defaultLocale$2(definition) {
  locale$1 = formatLocale$1(definition);
  timeFormat = locale$1.format;
  locale$1.parse;
  locale$1.utcFormat;
  locale$1.utcParse;
  return locale$1;
}

// Generic type guard -  https://stackoverflow.com/a/43423642/191902
/**
 * Check if value is present (not `null`/`undefined`).  Useful with `arr.filter(notNull)`
 */
function notNull(value) {
    return value != null;
}
// functional definition of isSVGElement. Note that SVGSVGElements are HTMLElements
function isSVGElement(elem) {
    return !!elem && (elem instanceof SVGElement || 'ownerSVGElement' in elem);
}
// functional definition of SVGGElement
function isSVGSVGElement(elem) {
    return !!elem && 'createSVGPoint' in elem;
}
function isSVGGraphicsElement(elem) {
    return !!elem && 'getScreenCTM' in elem;
}
// functional definition of TouchEvent
function isTouchEvent(event) {
    return !!event && 'changedTouches' in event;
}

var PeriodType;
(function (PeriodType) {
    PeriodType[PeriodType["Custom"] = 1] = "Custom";
    PeriodType[PeriodType["Day"] = 10] = "Day";
    PeriodType[PeriodType["DayTime"] = 11] = "DayTime";
    PeriodType[PeriodType["TimeOnly"] = 15] = "TimeOnly";
    PeriodType[PeriodType["Week"] = 20] = "Week";
    PeriodType[PeriodType["WeekSun"] = 21] = "WeekSun";
    PeriodType[PeriodType["WeekMon"] = 22] = "WeekMon";
    PeriodType[PeriodType["WeekTue"] = 23] = "WeekTue";
    PeriodType[PeriodType["WeekWed"] = 24] = "WeekWed";
    PeriodType[PeriodType["WeekThu"] = 25] = "WeekThu";
    PeriodType[PeriodType["WeekFri"] = 26] = "WeekFri";
    PeriodType[PeriodType["WeekSat"] = 27] = "WeekSat";
    PeriodType[PeriodType["Month"] = 30] = "Month";
    PeriodType[PeriodType["MonthYear"] = 31] = "MonthYear";
    PeriodType[PeriodType["Quarter"] = 40] = "Quarter";
    PeriodType[PeriodType["CalendarYear"] = 50] = "CalendarYear";
    PeriodType[PeriodType["FiscalYearOctober"] = 60] = "FiscalYearOctober";
    PeriodType[PeriodType["BiWeek1"] = 70] = "BiWeek1";
    PeriodType[PeriodType["BiWeek1Sun"] = 71] = "BiWeek1Sun";
    PeriodType[PeriodType["BiWeek1Mon"] = 72] = "BiWeek1Mon";
    PeriodType[PeriodType["BiWeek1Tue"] = 73] = "BiWeek1Tue";
    PeriodType[PeriodType["BiWeek1Wed"] = 74] = "BiWeek1Wed";
    PeriodType[PeriodType["BiWeek1Thu"] = 75] = "BiWeek1Thu";
    PeriodType[PeriodType["BiWeek1Fri"] = 76] = "BiWeek1Fri";
    PeriodType[PeriodType["BiWeek1Sat"] = 77] = "BiWeek1Sat";
    PeriodType[PeriodType["BiWeek2"] = 80] = "BiWeek2";
    PeriodType[PeriodType["BiWeek2Sun"] = 81] = "BiWeek2Sun";
    PeriodType[PeriodType["BiWeek2Mon"] = 82] = "BiWeek2Mon";
    PeriodType[PeriodType["BiWeek2Tue"] = 83] = "BiWeek2Tue";
    PeriodType[PeriodType["BiWeek2Wed"] = 84] = "BiWeek2Wed";
    PeriodType[PeriodType["BiWeek2Thu"] = 85] = "BiWeek2Thu";
    PeriodType[PeriodType["BiWeek2Fri"] = 86] = "BiWeek2Fri";
    PeriodType[PeriodType["BiWeek2Sat"] = 87] = "BiWeek2Sat";
})(PeriodType || (PeriodType = {}));
const periodTypeMappings = {
    [PeriodType.Custom]: 'custom',
    [PeriodType.Day]: 'day',
    [PeriodType.DayTime]: 'daytime',
    [PeriodType.TimeOnly]: 'time',
    [PeriodType.WeekSun]: 'week-sun',
    [PeriodType.WeekMon]: 'week-mon',
    [PeriodType.WeekTue]: 'week-tue',
    [PeriodType.WeekWed]: 'week-wed',
    [PeriodType.WeekThu]: 'week-thu',
    [PeriodType.WeekFri]: 'week-fri',
    [PeriodType.WeekSat]: 'week-sat',
    [PeriodType.Week]: 'week',
    [PeriodType.Month]: 'month',
    [PeriodType.MonthYear]: 'month-year',
    [PeriodType.Quarter]: 'quarter',
    [PeriodType.CalendarYear]: 'year',
    [PeriodType.FiscalYearOctober]: 'fiscal-year-october',
    [PeriodType.BiWeek1Sun]: 'biweek1-sun',
    [PeriodType.BiWeek1Mon]: 'biweek1-mon',
    [PeriodType.BiWeek1Tue]: 'biweek1-tue',
    [PeriodType.BiWeek1Wed]: 'biweek1-wed',
    [PeriodType.BiWeek1Thu]: 'biweek1-thu',
    [PeriodType.BiWeek1Fri]: 'biweek1-fri',
    [PeriodType.BiWeek1Sat]: 'biweek1-sat',
    [PeriodType.BiWeek1]: 'biweek1',
    [PeriodType.BiWeek2Sun]: 'biweek2-sun',
    [PeriodType.BiWeek2Mon]: 'biweek2-mon',
    [PeriodType.BiWeek2Tue]: 'biweek2-tue',
    [PeriodType.BiWeek2Wed]: 'biweek2-wed',
    [PeriodType.BiWeek2Thu]: 'biweek2-thu',
    [PeriodType.BiWeek2Fri]: 'biweek2-fri',
    [PeriodType.BiWeek2Sat]: 'biweek2-sat',
    [PeriodType.BiWeek2]: 'biweek2',
};
var DayOfWeek;
(function (DayOfWeek) {
    DayOfWeek[DayOfWeek["Sunday"] = 0] = "Sunday";
    DayOfWeek[DayOfWeek["Monday"] = 1] = "Monday";
    DayOfWeek[DayOfWeek["Tuesday"] = 2] = "Tuesday";
    DayOfWeek[DayOfWeek["Wednesday"] = 3] = "Wednesday";
    DayOfWeek[DayOfWeek["Thursday"] = 4] = "Thursday";
    DayOfWeek[DayOfWeek["Friday"] = 5] = "Friday";
    DayOfWeek[DayOfWeek["Saturday"] = 6] = "Saturday";
})(DayOfWeek || (DayOfWeek = {}));
var DateToken;
(function (DateToken) {
    /** `1982, 1986, 2024` */
    DateToken["Year_numeric"] = "yyy";
    /** `82, 86, 24` */
    DateToken["Year_2Digit"] = "yy";
    /** `January, February, ..., December` */
    DateToken["Month_long"] = "MMMM";
    /** `Jan, Feb, ..., Dec` */
    DateToken["Month_short"] = "MMM";
    /** `01, 02, ..., 12` */
    DateToken["Month_2Digit"] = "MM";
    /** `1, 2, ..., 12` */
    DateToken["Month_numeric"] = "M";
    /** `1, 2, ..., 11, 12` */
    DateToken["Hour_numeric"] = "h";
    /** `01, 02, ..., 11, 12` */
    DateToken["Hour_2Digit"] = "hh";
    /** You should probably not use this. Force with AM/PM (and the good locale), not specifying this will automatically take the good local */
    DateToken["Hour_wAMPM"] = "a";
    /** You should probably not use this. Force without AM/PM (and the good locale), not specifying this will automatically take the good local */
    DateToken["Hour_woAMPM"] = "aaaaaa";
    /** `0, 1, ..., 59` */
    DateToken["Minute_numeric"] = "m";
    /** `00, 01, ..., 59` */
    DateToken["Minute_2Digit"] = "mm";
    /** `0, 1, ..., 59` */
    DateToken["Second_numeric"] = "s";
    /** `00, 01, ..., 59` */
    DateToken["Second_2Digit"] = "ss";
    /** `000, 001, ..., 999` */
    DateToken["MiliSecond_3"] = "SSS";
    /** Minimize digit: `1, 2, 11, ...` */
    DateToken["DayOfMonth_numeric"] = "d";
    /** `01, 02, 11, ...` */
    DateToken["DayOfMonth_2Digit"] = "dd";
    /** `1st, 2nd, 11th, ...` You can have your local ordinal by passing `ordinalSuffixes` in options / settings */
    DateToken["DayOfMonth_withOrdinal"] = "do";
    /** `M, T, W, T, F, S, S` */
    DateToken["DayOfWeek_narrow"] = "eeeee";
    /** `Monday, Tuesday, ..., Sunday` */
    DateToken["DayOfWeek_long"] = "eeee";
    /** `Mon, Tue, Wed, ..., Sun` */
    DateToken["DayOfWeek_short"] = "eee";
})(DateToken || (DateToken = {}));

function getWeekStartsOnFromIntl(locales) {
    if (!locales) {
        return DayOfWeek.Sunday;
    }
    const locale = new Intl.Locale(locales);
    // @ts-expect-error
    const weekInfo = locale.weekInfo ?? locale.getWeekInfo?.();
    return (weekInfo?.firstDay ?? 0) % 7; // (in Intl, sunday is 7 not 0, so we need to mod 7)
}

const defaultLocaleSettings = {
    locale: 'en',
    dictionary: {
        Ok: 'Ok',
        Cancel: 'Cancel',
        Date: {
            Start: 'Start',
            End: 'End',
            Empty: 'Empty',
            Day: 'Day',
            DayTime: 'Day Time',
            Time: 'Time',
            Week: 'Week',
            BiWeek: 'Bi-Week',
            Month: 'Month',
            Quarter: 'Quarter',
            CalendarYear: 'Calendar Year',
            FiscalYearOct: 'Fiscal Year (Oct)',
            PeriodDay: {
                Current: 'Today',
                Last: 'Yesterday',
                LastX: 'Last {0} days',
            },
            PeriodWeek: {
                Current: 'This week',
                Last: 'Last week',
                LastX: 'Last {0} weeks',
            },
            PeriodBiWeek: {
                Current: 'This bi-week',
                Last: 'Last bi-week',
                LastX: 'Last {0} bi-weeks',
            },
            PeriodMonth: {
                Current: 'This month',
                Last: 'Last month',
                LastX: 'Last {0} months',
            },
            PeriodQuarter: {
                Current: 'This quarter',
                Last: 'Last quarter',
                LastX: 'Last {0} quarters',
            },
            PeriodQuarterSameLastyear: 'Same quarter last year',
            PeriodYear: {
                Current: 'This year',
                Last: 'Last year',
                LastX: 'Last {0} years',
            },
            PeriodFiscalYear: {
                Current: 'This fiscal year',
                Last: 'Last fiscal year',
                LastX: 'Last {0} fiscal years',
            },
        },
    },
    formats: {
        numbers: {
            defaults: {
                currency: 'USD',
                fractionDigits: 2,
                currencyDisplay: 'symbol',
            },
        },
        dates: {
            baseParsing: 'MM/dd/yyyy',
            weekStartsOn: DayOfWeek.Sunday,
            ordinalSuffixes: {
                one: 'st',
                two: 'nd',
                few: 'rd',
                other: 'th',
            },
            presets: {
                day: {
                    short: [DateToken.DayOfMonth_numeric, DateToken.Month_numeric],
                    default: [DateToken.DayOfMonth_numeric, DateToken.Month_numeric, DateToken.Year_numeric],
                    long: [DateToken.DayOfMonth_numeric, DateToken.Month_short, DateToken.Year_numeric],
                },
                dayTime: {
                    short: [
                        DateToken.DayOfMonth_numeric,
                        DateToken.Month_numeric,
                        DateToken.Year_numeric,
                        DateToken.Hour_numeric,
                        DateToken.Minute_numeric,
                    ],
                    default: [
                        DateToken.DayOfMonth_numeric,
                        DateToken.Month_numeric,
                        DateToken.Year_numeric,
                        DateToken.Hour_2Digit,
                        DateToken.Minute_2Digit,
                    ],
                    long: [
                        DateToken.DayOfMonth_numeric,
                        DateToken.Month_numeric,
                        DateToken.Year_numeric,
                        DateToken.Hour_2Digit,
                        DateToken.Minute_2Digit,
                        DateToken.Second_2Digit,
                    ],
                },
                timeOnly: {
                    short: [DateToken.Hour_numeric, DateToken.Minute_numeric],
                    default: [DateToken.Hour_2Digit, DateToken.Minute_2Digit, DateToken.Second_2Digit],
                    long: [
                        DateToken.Hour_2Digit,
                        DateToken.Minute_2Digit,
                        DateToken.Second_2Digit,
                        DateToken.MiliSecond_3,
                    ],
                },
                week: {
                    short: [DateToken.DayOfMonth_numeric, DateToken.Month_numeric],
                    default: [DateToken.DayOfMonth_numeric, DateToken.Month_numeric, DateToken.Year_numeric],
                    long: [DateToken.DayOfMonth_numeric, DateToken.Month_numeric, DateToken.Year_numeric],
                },
                month: {
                    short: DateToken.Month_short,
                    default: DateToken.Month_long,
                    long: [DateToken.Month_long, DateToken.Year_numeric],
                },
                monthsYear: {
                    short: [DateToken.Month_short, DateToken.Year_2Digit],
                    default: [DateToken.Month_long, DateToken.Year_numeric],
                    long: [DateToken.Month_long, DateToken.Year_numeric],
                },
                year: {
                    short: DateToken.Year_2Digit,
                    default: DateToken.Year_numeric,
                    long: DateToken.Year_numeric,
                },
            },
        },
    },
};
/** Creates a locale settings object, using the `base` locale settings as defaults.
 * If omitted, the `en` locale is used as the base. */
function createLocaleSettings(localeSettings, base = defaultLocaleSettings) {
    // if ordinalSuffixes is specified, we want to make sure that all are empty first
    if (localeSettings.formats?.dates?.ordinalSuffixes) {
        localeSettings.formats.dates.ordinalSuffixes = {
            one: '',
            two: '',
            few: '',
            other: '',
            zero: '',
            many: '',
            ...localeSettings.formats.dates.ordinalSuffixes,
        };
    }
    // if weekStartsOn is not specified, let's default to the local one
    if (localeSettings.formats?.dates?.weekStartsOn === undefined) {
        localeSettings = defaultsDeep(localeSettings, {
            formats: { dates: { weekStartsOn: getWeekStartsOnFromIntl(localeSettings.locale) } },
        });
    }
    return defaultsDeep(localeSettings, base);
}
const defaultLocale$1 = createLocaleSettings({ locale: 'en' });

function getPeriodTypeByCode(code) {
    const element = entries(periodTypeMappings).find((c) => c[1] === code);
    return parseInt(String(element?.[0] ?? '0'));
}
/*
 * Fiscal Year
 */
function getFiscalYear(date = new Date(), options) {
    if (date === null) {
        // null explicitly passed in (default value overridden)
        return NaN;
    }
    const startMonth = 10;
    return date.getMonth() >= startMonth - 1 ? date.getFullYear() + 1 : date.getFullYear();
}
/*
 * Bi-Weekly
 */
const biweekBaseDates = [new Date('1799-12-22T00:00'), new Date('1799-12-15T00:00')];
function startOfBiWeek(date, week, startOfWeek) {
    var weekBaseDate = biweekBaseDates[week - 1];
    var baseDate = intervalOffset('day', weekBaseDate, startOfWeek);
    var periodsSince = Math.floor(intervalDifference('day', baseDate, date) / 14);
    return intervalOffset('day', baseDate, periodsSince * 14);
}
function endOfBiWeek(date, week, startOfWeek) {
    return intervalOffset('day', startOfBiWeek(date, week, startOfWeek), 13);
}
function startOfWeek(date, weekStartsOn) {
    switch (weekStartsOn) {
        case DayOfWeek.Sunday:
            return startOfInterval(timeSunday, date);
        case DayOfWeek.Monday:
            return startOfInterval(timeMonday, date);
        case DayOfWeek.Tuesday:
            return startOfInterval(timeTuesday, date);
        case DayOfWeek.Wednesday:
            return startOfInterval(timeWednesday, date);
        case DayOfWeek.Thursday:
            return startOfInterval(timeThursday, date);
        case DayOfWeek.Friday:
            return startOfInterval(timeFriday, date);
        case DayOfWeek.Saturday:
            return startOfInterval(timeSaturday, date);
    }
}
function endOfWeek(date, weekStartsOn) {
    switch (weekStartsOn) {
        case DayOfWeek.Sunday:
            return endOfInterval(timeSunday, date);
        case DayOfWeek.Monday:
            return endOfInterval(timeMonday, date);
        case DayOfWeek.Tuesday:
            return endOfInterval(timeTuesday, date);
        case DayOfWeek.Wednesday:
            return endOfInterval(timeWednesday, date);
        case DayOfWeek.Thursday:
            return endOfInterval(timeThursday, date);
        case DayOfWeek.Friday:
            return endOfInterval(timeFriday, date);
        case DayOfWeek.Saturday:
            return endOfInterval(timeSaturday, date);
    }
}
function formatIntl(settings, dt, tokens_or_intlOptions) {
    const { locale, formats: { dates: { ordinalSuffixes: suffixes }, }, } = settings;
    function formatIntlOrdinal(formatter, with_ordinal = false) {
        if (with_ordinal) {
            const rules = new Intl.PluralRules(locale, { type: 'ordinal' });
            const splited = formatter.formatToParts(dt);
            return splited
                .map((c) => {
                if (c.type === 'day') {
                    const ordinal = rules.select(parseInt(c.value, 10));
                    const suffix = suffixes[ordinal];
                    return `${c.value}${suffix}`;
                }
                return c.value;
            })
                .join('');
        }
        return formatter.format(dt);
    }
    if (typeof tokens_or_intlOptions !== 'string' && !Array.isArray(tokens_or_intlOptions)) {
        return formatIntlOrdinal(new Intl.DateTimeFormat(locale, tokens_or_intlOptions), tokens_or_intlOptions.withOrdinal);
    }
    const tokens = Array.isArray(tokens_or_intlOptions)
        ? tokens_or_intlOptions.join('')
        : tokens_or_intlOptions;
    // Order of includes check is important! (longest first)
    const formatter = new Intl.DateTimeFormat(locale, {
        year: tokens.includes(DateToken.Year_numeric)
            ? 'numeric'
            : tokens.includes(DateToken.Year_2Digit)
                ? '2-digit'
                : undefined,
        month: tokens.includes(DateToken.Month_long)
            ? 'long'
            : tokens.includes(DateToken.Month_short)
                ? 'short'
                : tokens.includes(DateToken.Month_2Digit)
                    ? '2-digit'
                    : tokens.includes(DateToken.Month_numeric)
                        ? 'numeric'
                        : undefined,
        day: tokens.includes(DateToken.DayOfMonth_2Digit)
            ? '2-digit'
            : tokens.includes(DateToken.DayOfMonth_numeric)
                ? 'numeric'
                : undefined,
        hour: tokens.includes(DateToken.Hour_2Digit)
            ? '2-digit'
            : tokens.includes(DateToken.Hour_numeric)
                ? 'numeric'
                : undefined,
        hour12: tokens.includes(DateToken.Hour_woAMPM)
            ? false
            : tokens.includes(DateToken.Hour_wAMPM)
                ? true
                : undefined,
        minute: tokens.includes(DateToken.Minute_2Digit)
            ? '2-digit'
            : tokens.includes(DateToken.Minute_numeric)
                ? 'numeric'
                : undefined,
        second: tokens.includes(DateToken.Second_2Digit)
            ? '2-digit'
            : tokens.includes(DateToken.Second_numeric)
                ? 'numeric'
                : undefined,
        fractionalSecondDigits: tokens.includes(DateToken.MiliSecond_3) ? 3 : undefined,
        weekday: tokens.includes(DateToken.DayOfWeek_narrow)
            ? 'narrow'
            : tokens.includes(DateToken.DayOfWeek_long)
                ? 'long'
                : tokens.includes(DateToken.DayOfWeek_short)
                    ? 'short'
                    : undefined,
    });
    return formatIntlOrdinal(formatter, tokens.includes(DateToken.DayOfMonth_withOrdinal));
}
function range(settings, date, weekStartsOn, formatToUse, biWeek = undefined // undefined means that it's not a bi-week
) {
    const start = biWeek === undefined
        ? startOfWeek(date, weekStartsOn)
        : startOfBiWeek(date, biWeek, weekStartsOn);
    const end = biWeek === undefined ? endOfWeek(date, weekStartsOn) : endOfBiWeek(date, biWeek, weekStartsOn);
    return formatIntl(settings, start, formatToUse) + ' - ' + formatIntl(settings, end, formatToUse);
}
function updatePeriodTypeWithWeekStartsOn(weekStartsOn, periodType) {
    if (periodType === PeriodType.Week) {
        periodType = [
            PeriodType.WeekSun,
            PeriodType.WeekMon,
            PeriodType.WeekTue,
            PeriodType.WeekWed,
            PeriodType.WeekThu,
            PeriodType.WeekFri,
            PeriodType.WeekSat,
        ][weekStartsOn];
    }
    else if (periodType === PeriodType.BiWeek1) {
        periodType = [
            PeriodType.BiWeek1Sun,
            PeriodType.BiWeek1Mon,
            PeriodType.BiWeek1Tue,
            PeriodType.BiWeek1Wed,
            PeriodType.BiWeek1Thu,
            PeriodType.BiWeek1Fri,
            PeriodType.BiWeek1Sat,
        ][weekStartsOn];
    }
    else if (periodType === PeriodType.BiWeek2) {
        periodType = [
            PeriodType.BiWeek2Sun,
            PeriodType.BiWeek2Mon,
            PeriodType.BiWeek2Tue,
            PeriodType.BiWeek2Wed,
            PeriodType.BiWeek2Thu,
            PeriodType.BiWeek2Fri,
            PeriodType.BiWeek2Sat,
        ][weekStartsOn];
    }
    return periodType;
}
function formatDateWithLocale(settings, date, periodType, options = {}) {
    if (typeof date === 'string') {
        date = parseDate(date);
    }
    // Handle 'Invalid Date'
    // @ts-expect-error - Date is a number (see: https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript)
    if (date == null || isNaN(date)) {
        return '';
    }
    const weekStartsOn = options.weekStartsOn ?? settings.formats.dates.weekStartsOn;
    const { day, dayTime, timeOnly, week, month, monthsYear, year } = settings.formats.dates.presets;
    periodType =
        typeof periodType === 'string'
            ? getPeriodTypeByCode(periodType)
            : (periodType ?? PeriodType.Day);
    periodType = updatePeriodTypeWithWeekStartsOn(weekStartsOn, periodType) ?? periodType;
    /** Resolve a preset given the chosen variant */
    function rv(preset) {
        if (options.variant === 'custom') {
            return options.custom ?? preset.default;
        }
        else if (options.custom && !options.variant) {
            return options.custom;
        }
        return preset[options.variant ?? 'default'];
    }
    switch (periodType) {
        case PeriodType.Custom:
            return formatIntl(settings, date, options.custom);
        case PeriodType.Day:
            return formatIntl(settings, date, rv(day));
        case PeriodType.DayTime:
            return formatIntl(settings, date, rv(dayTime));
        case PeriodType.TimeOnly:
            return formatIntl(settings, date, rv(timeOnly));
        case PeriodType.Week: //Should never happen, but to make types happy
        case PeriodType.WeekSun:
            return range(settings, date, 0, rv(week));
        case PeriodType.WeekMon:
            return range(settings, date, 1, rv(week));
        case PeriodType.WeekTue:
            return range(settings, date, 2, rv(week));
        case PeriodType.WeekWed:
            return range(settings, date, 3, rv(week));
        case PeriodType.WeekThu:
            return range(settings, date, 4, rv(week));
        case PeriodType.WeekFri:
            return range(settings, date, 5, rv(week));
        case PeriodType.WeekSat:
            return range(settings, date, 6, rv(week));
        case PeriodType.Month:
            return formatIntl(settings, date, rv(month));
        case PeriodType.MonthYear:
            return formatIntl(settings, date, rv(monthsYear));
        case PeriodType.Quarter:
            return [
                formatIntl(settings, startOfInterval('quarter', date), rv(month)),
                formatIntl(settings, endOfInterval('quarter', date), rv(monthsYear)),
            ].join(' - ');
        case PeriodType.CalendarYear:
            return formatIntl(settings, date, rv(year));
        case PeriodType.FiscalYearOctober:
            const fDate = new Date(getFiscalYear(date), 0, 1);
            return formatIntl(settings, fDate, rv(year));
        case PeriodType.BiWeek1: //Should never happen, but to make types happy
        case PeriodType.BiWeek1Sun:
            return range(settings, date, 0, rv(week), 1);
        case PeriodType.BiWeek1Mon:
            return range(settings, date, 1, rv(week), 1);
        case PeriodType.BiWeek1Tue:
            return range(settings, date, 2, rv(week), 1);
        case PeriodType.BiWeek1Wed:
            return range(settings, date, 3, rv(week), 1);
        case PeriodType.BiWeek1Thu:
            return range(settings, date, 4, rv(week), 1);
        case PeriodType.BiWeek1Fri:
            return range(settings, date, 5, rv(week), 1);
        case PeriodType.BiWeek1Sat:
            return range(settings, date, 6, rv(week), 1);
        case PeriodType.BiWeek2: //Should never happen, but to make types happy
        case PeriodType.BiWeek2Sun:
            return range(settings, date, 0, rv(week), 2);
        case PeriodType.BiWeek2Mon:
            return range(settings, date, 1, rv(week), 2);
        case PeriodType.BiWeek2Tue:
            return range(settings, date, 2, rv(week), 2);
        case PeriodType.BiWeek2Wed:
            return range(settings, date, 3, rv(week), 2);
        case PeriodType.BiWeek2Thu:
            return range(settings, date, 4, rv(week), 2);
        case PeriodType.BiWeek2Fri:
            return range(settings, date, 5, rv(week), 2);
        case PeriodType.BiWeek2Sat:
            return range(settings, date, 6, rv(week), 2);
        default:
            return date.toISOString();
        // default:
        //   assertNever(periodType); // This will now report unhandled cases
    }
}
// '1982-03-30'
// '1982-03-30T04:00'
// '1982-03-30T04:00:00'
// '1982-03-30T11:25:59Z'
// '1982-03-30T11:25:59-04:00'
// '1982-03-30T11:25:59.123Z'
// '1982-03-30T11:25:59.1234567Z'
const DATE_FORMAT = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2}(\.\d+|)?(Z|(-|\+)\d{2}:\d{2}?)?)?)?$/;
/**
 * Determine if string is valid date string
 * - Date-only (yyyy-mm-dd)
 * - Date with time (yyyy-mm-ddThh:mm:ss)
 * - Date with time and timezone (yyyy-mm-ddThh:mm:ssZ)
 * - Date with time and offset (yyyy-mm-ddThh:mm:ss-ZZ:ZZ)
 * - Date with time and 3 digit milliseconds (yyyy-mm-ddThh:mm:ss.sss) with or without timezone / offset
 * - Date with time and 7 digit milliseconds (yyyy-mm-ddThh:mm:ss.sssssss) with or without timezone / offset
 */
function isStringDate(value) {
    return DATE_FORMAT.test(value);
}
/**
 * Determine if string is a date string with time (yyyy-mm-ddThh:mm:ss)
 */
function isStringDateWithTime(value) {
    return isStringDate(value) && value.includes('T');
}
/** Parse a date string as a local Date if no timezone is specified
 * @param dateStr - The date string to parse
 * @param format - The format of the date string. If not provided, expects ISO 8601 format.
 *   - If provided, will use the format to parse the date string.
 *   - Supports Unicode or strftime date format strings, but will be converted to applicable strftime format before parsing.
 * @returns A Date object
 */
function parseDate(dateStr, format) {
    if (!isStringDate(dateStr))
        return new Date('Invalid Date');
    if (isStringDateWithTime(dateStr)) {
        // Respect timezone.  Also parses unqualified strings like '1982-03-30T04:00' as local date
        return new Date(dateStr);
    }
    const [date, time] = dateStr.split('T');
    const [year, month, day] = date.split('-').map(Number);
    if (time) {
        const [hour, minute, second] = time.split(':').map(Number);
        return new Date(year, month - 1, day, hour, minute, second);
    }
    else {
        return new Date(year, month - 1, day);
    }
}
/** Custom time interval for quarters */
const timeQuarter = timeInterval$1(
// floor
(date) => {
    date.setMonth(date.getMonth() - (date.getMonth() % 3), 1);
    date.setHours(0, 0, 0, 0);
}, 
// offset
(date, step) => date.setMonth(date.getMonth() + step * 3, 1), 
// count
(start, end) => (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30 * 3), 
// field
(date) => date.getMonth() // TODO: what should this be?
);
/** Get a time interval function by name */
function timeInterval(name) {
    switch (name) {
        case 'millisecond':
            return millisecond;
        case 'second':
            return second;
        case 'minute':
            return timeMinute;
        case 'hour':
            return timeHour;
        case 'day':
            return timeDay;
        case 'week':
            return timeSunday;
        case 'month':
            return timeMonth;
        case 'quarter':
            return timeQuarter;
        case 'year':
            return timeYear;
    }
}
function startOfInterval(interval, date) {
    interval = typeof interval === 'string' ? timeInterval(interval) : interval;
    if (date === undefined) {
        return (date) => new Date(interval.floor(date));
    }
    return new Date(interval.floor(date));
}
function endOfInterval(interval, date) {
    interval = typeof interval === 'string' ? timeInterval(interval) : interval;
    if (date === undefined) {
        return (date) => new Date(interval.offset(interval.floor(date), 1).getTime() - 1);
    }
    // Can not use `new Date(+interval.ceil(date) - 1)`; as `.ceil()` will return same date when start of the day (matching `.floor()`)
    return new Date(interval.offset(interval.floor(date), 1).getTime() - 1);
}
/** Add or subtract an interval from a date */
function intervalOffset(interval, date, offset) {
    interval = typeof interval === 'string' ? timeInterval(interval) : interval;
    return interval.offset(date, offset);
}
function intervalDifference(interval, date1, date2) {
    interval = typeof interval === 'string' ? timeInterval(interval) : interval;
    if (date1 === undefined || date2 === undefined) {
        return (date1, date2) => interval.count(date1, date2);
    }
    return interval.count(date1, date2);
}

/**
 * Get pointer coordinates relative to node/container
 * Matches event.layerX/Y, but is deprecated (https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/layerX).
 * Also similar but not identical to event.offsetX/Y
 */
function localPoint(event, node) {
    if (!node) {
        node = event.currentTarget ?? event.target;
    }
    if (!node || !event)
        return { x: 0, y: 0 };
    const coords = getPointFromEvent(event);
    // find top-most SVG
    const svg = isSVGElement(node) ? node.ownerSVGElement : node;
    const screenCTM = isSVGGraphicsElement(svg) ? svg.getScreenCTM() : null;
    if (isSVGSVGElement(svg) && screenCTM) {
        let point = svg.createSVGPoint();
        point.x = coords.x;
        point.y = coords.y;
        point = point.matrixTransform(screenCTM.inverse());
        return {
            x: point.x,
            y: point.y,
        };
    }
    // fall back to bounding box
    const rect = node.getBoundingClientRect();
    return {
        x: coords.x - rect.left - node.clientLeft,
        y: coords.y - rect.top - node.clientTop,
    };
}
function getPointFromEvent(event) {
    if (!event)
        return { x: 0, y: 0 };
    if (isTouchEvent(event)) {
        return event.changedTouches.length > 0
            ? {
                x: event.changedTouches[0].clientX,
                y: event.changedTouches[0].clientY,
            }
            : { x: 0, y: 0 };
    }
    return {
        x: event.clientX,
        y: event.clientY,
    };
}

var DurationUnits;
(function (DurationUnits) {
    DurationUnits[DurationUnits["Year"] = 0] = "Year";
    DurationUnits[DurationUnits["Day"] = 1] = "Day";
    DurationUnits[DurationUnits["Hour"] = 2] = "Hour";
    DurationUnits[DurationUnits["Minute"] = 3] = "Minute";
    DurationUnits[DurationUnits["Second"] = 4] = "Second";
    DurationUnits[DurationUnits["Millisecond"] = 5] = "Millisecond";
})(DurationUnits || (DurationUnits = {}));
class Duration {
    #milliseconds = 0;
    #seconds = 0;
    #minutes = 0;
    #hours = 0;
    #days = 0;
    #years = 0;
    constructor(options = {}) {
        const startDate = typeof options.start === 'string' ? parseDate(options.start) : options.start;
        const endDate = typeof options.end === 'string' ? parseDate(options.end) : options.end;
        const differenceInMs = startDate
            ? Math.abs(Number(endDate || new Date()) - Number(startDate))
            : undefined;
        if (!Number.isFinite(differenceInMs) && options.duration == null) {
            return;
        }
        this.#milliseconds = options.duration?.milliseconds ?? differenceInMs ?? 0;
        this.#seconds = options.duration?.seconds ?? 0;
        this.#minutes = options.duration?.minutes ?? 0;
        this.#hours = options.duration?.hours ?? 0;
        this.#days = options.duration?.days ?? 0;
        this.#years = options.duration?.years ?? 0;
        if (this.#milliseconds >= 1000) {
            const carrySeconds = (this.#milliseconds - (this.#milliseconds % 1000)) / 1000;
            this.#seconds += carrySeconds;
            this.#milliseconds = this.#milliseconds - carrySeconds * 1000;
        }
        if (this.#seconds >= 60) {
            const carryMinutes = (this.#seconds - (this.#seconds % 60)) / 60;
            this.#minutes += carryMinutes;
            this.#seconds = this.#seconds - carryMinutes * 60;
        }
        if (this.#minutes >= 60) {
            const carryHours = (this.#minutes - (this.#minutes % 60)) / 60;
            this.#hours += carryHours;
            this.#minutes = this.#minutes - carryHours * 60;
        }
        if (this.#hours >= 24) {
            const carryDays = (this.#hours - (this.#hours % 24)) / 24;
            this.#days += carryDays;
            this.#hours = this.#hours - carryDays * 24;
        }
        if (this.#days >= 365) {
            const carryYears = (this.#days - (this.#days % 365)) / 365;
            this.#years += carryYears;
            this.#days = this.#days - carryYears * 365;
        }
    }
    get years() {
        return this.#years;
    }
    get days() {
        return this.#days;
    }
    get hours() {
        return this.#hours;
    }
    get minutes() {
        return this.#minutes;
    }
    get seconds() {
        return this.#seconds;
    }
    get milliseconds() {
        return this.#milliseconds;
    }
    valueOf() {
        return (this.#milliseconds +
            this.#seconds * 1000 +
            this.#minutes * 60 * 1000 +
            this.#hours * 60 * 60 * 1000 +
            this.#days * 24 * 60 * 60 * 1000 +
            this.#years * 365 * 24 * 60 * 60 * 1000);
    }
    toJSON() {
        return {
            years: this.#years,
            days: this.#days,
            hours: this.#hours,
            minutes: this.#minutes,
            seconds: this.#seconds,
            milliseconds: this.#milliseconds,
        };
    }
    format(options = {}) {
        const { minUnits, totalUnits = 99, variant = 'short' } = options;
        var sentenceArr = [];
        var unitNames = variant === 'short'
            ? ['y', 'd', 'h', 'm', 's', 'ms']
            : ['years', 'days', 'hours', 'minutes', 'seconds', 'milliseconds'];
        var unitNums = [
            this.years,
            this.days,
            this.hours,
            this.minutes,
            this.seconds,
            this.milliseconds,
        ].filter((x, i) => i <= (minUnits ?? 99));
        // Combine unit numbers and names
        for (var i in unitNums) {
            if (sentenceArr.length >= totalUnits) {
                break;
            }
            const unitNum = unitNums[i];
            let unitName = unitNames[i];
            // Hide `0` values unless last unit (and none shown before)
            if (unitNum !== 0 || (sentenceArr.length === 0 && Number(i) === unitNums.length - 1)) {
                switch (variant) {
                    case 'short':
                        sentenceArr.push(unitNum + unitName);
                        break;
                    case 'long':
                        if (unitNum === 1) {
                            // Trim off plural `s`
                            unitName = unitName.slice(0, -1);
                        }
                        sentenceArr.push(unitNum + ' ' + unitName);
                        break;
                }
            }
        }
        const sentence = sentenceArr.join(variant === 'long' ? ' and ' : ' ');
        return sentence;
    }
    toString() {
        return this.format();
    }
}

function getFormatNumber(settings, style) {
    const { numbers } = settings.formats;
    const styleSettings = style && style != 'none' ? numbers[style] : {};
    return {
        ...numbers.defaults,
        ...styleSettings,
    };
}
// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
function formatNumberWithLocale(settings, number, style, options = {}) {
    if (number == null) {
        return '';
    }
    if (style === 'none') {
        return `${number}`;
    }
    // Determine default style if not provided (undefined or null)
    if (style == null) {
        style = Number.isInteger(number) ? 'integer' : 'decimal';
    }
    const defaults = getFormatNumber(settings, style);
    // @ts-expect-error: Determine how to access `NumberFormatOptionsStyleRegistry` and check instead of just `style !=== 'default' below)
    const formatter = Intl.NumberFormat(settings.locale, {
        // Let's always starts with all defaults
        ...defaults,
        ...(style !== 'default' && {
            style,
        }),
        // Let's shorten min / max with fractionDigits
        ...{
            minimumFractionDigits: options.fractionDigits ?? defaults.fractionDigits,
            maximumFractionDigits: options.fractionDigits ?? defaults.fractionDigits,
        },
        // now we bring in user specified options
        ...omitNil(options),
        ...(style === 'currencyRound' && {
            style: 'currency',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }),
        // Let's overwrite for style=percentRound
        ...(style === 'percentRound' && {
            style: 'percent',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }),
        // Let's overwrite for style=metric
        ...(style === 'metric' && {
            style: 'decimal',
            notation: 'compact',
            minimumFractionDigits: 0,
        }),
        // Let's overwrite for style=integer
        ...(style === 'integer' && {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }),
    });
    const value = formatter.format(number);
    let suffix = options.suffix ?? '';
    if (suffix && Math.abs(number) >= 2 && options.suffixExtraIfMany !== '') {
        suffix += options.suffixExtraIfMany ?? 's';
    }
    return `${value}${suffix}`;
}

function format$1(value, formatOrConfig, options) {
    if (formatOrConfig && typeof formatOrConfig === 'object' && 'type' in formatOrConfig) {
        return formatWithLocale(defaultLocale$1, value, formatOrConfig.type, formatOrConfig.options);
    }
    return formatWithLocale(defaultLocale$1, value, formatOrConfig, options);
}
function formatWithLocale(settings, value, formatOrConfig, options) {
    const format = formatOrConfig && typeof formatOrConfig === 'object' && 'type' in formatOrConfig
        ? formatOrConfig.type
        : formatOrConfig;
    const formatOptions = formatOrConfig &&
        typeof formatOrConfig === 'object' &&
        'type' in formatOrConfig &&
        'options' in formatOrConfig
        ? formatOrConfig.options
        : options;
    if (typeof format === 'function') {
        return format(value);
    }
    else if (value instanceof Date ||
        isStringDate(value) ||
        (format &&
            (format in PeriodType ||
                Object.values(periodTypeMappings).includes(format)))) {
        return formatDateWithLocale(settings, value, format, formatOptions);
    }
    else if (typeof value === 'number') {
        return formatNumberWithLocale(settings, value, format, formatOptions);
    }
    else if (typeof value === 'string') {
        // Keep original value if already string
        return value;
    }
    else if (value == null) {
        return '';
    }
    else {
        // Provide some reasonable fallback for objects/etc (maybe use stringify() instead)
        return `${value}`;
    }
}

function sortFunc(value, direction = 'asc') {
    const sortDirection = direction === 'asc' ? 1 : -1;
    return (a, b) => {
        const valueFn = propAccessor(value);
        const aValue = valueFn(a);
        const bValue = valueFn(b);
        if (aValue == null || bValue == null) {
            if (aValue == null && bValue != null) {
                return -sortDirection;
            }
            else if (aValue != null && bValue == null) {
                return sortDirection;
            }
            else {
                // both `null`
                return 0;
            }
        }
        return aValue < bValue ? -sortDirection : aValue > bValue ? sortDirection : 0;
    };
}

[50, ...range$1(100, 1000, 100)];

/**
 * Wrapper around `tailwind-merge` and `clsx`
 */
const twMerge = extendTailwindMerge({
    extend: {
        classGroups: {
            shadow: [
                'shadow-border-l',
                'shadow-border-r',
                'shadow-border-t',
                'shadow-border-b',
                'elevation-none',
                ...range$1(1, 25).map((x) => `elevation-${x}`),
            ],
        },
    },
});
const cls = (...inputs) => twMerge(clsx(...inputs));

const copyProperty = (to, from, property, ignoreNonConfigurable) => {
	// `Function#length` should reflect the parameters of `to` not `from` since we keep its body.
	// `Function#prototype` is non-writable and non-configurable so can never be modified.
	if (property === 'length' || property === 'prototype') {
		return;
	}

	// `Function#arguments` and `Function#caller` should not be copied. They were reported to be present in `Reflect.ownKeys` for some devices in React Native (#41), so we explicitly ignore them here.
	if (property === 'arguments' || property === 'caller') {
		return;
	}

	const toDescriptor = Object.getOwnPropertyDescriptor(to, property);
	const fromDescriptor = Object.getOwnPropertyDescriptor(from, property);

	if (!canCopyProperty(toDescriptor, fromDescriptor) && ignoreNonConfigurable) {
		return;
	}

	Object.defineProperty(to, property, fromDescriptor);
};

// `Object.defineProperty()` throws if the property exists, is not configurable and either:
// - one its descriptors is changed
// - it is non-writable and its value is changed
const canCopyProperty = function (toDescriptor, fromDescriptor) {
	return toDescriptor === undefined || toDescriptor.configurable || (
		toDescriptor.writable === fromDescriptor.writable
		&& toDescriptor.enumerable === fromDescriptor.enumerable
		&& toDescriptor.configurable === fromDescriptor.configurable
		&& (toDescriptor.writable || toDescriptor.value === fromDescriptor.value)
	);
};

const changePrototype = (to, from) => {
	const fromPrototype = Object.getPrototypeOf(from);
	if (fromPrototype === Object.getPrototypeOf(to)) {
		return;
	}

	Object.setPrototypeOf(to, fromPrototype);
};

const wrappedToString = (withName, fromBody) => `/* Wrapped ${withName}*/\n${fromBody}`;

const toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, 'toString');
const toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, 'name');

// We call `from.toString()` early (not lazily) to ensure `from` can be garbage collected.
// We use `bind()` instead of a closure for the same reason.
// Calling `from.toString()` early also allows caching it in case `to.toString()` is called several times.
const changeToString = (to, from, name) => {
	const withName = name === '' ? '' : `with ${name.trim()}() `;
	const newToString = wrappedToString.bind(null, withName, from.toString());
	// Ensure `to.toString.toString` is non-enumerable and has the same `same`
	Object.defineProperty(newToString, 'name', toStringName);
	const {writable, enumerable, configurable} = toStringDescriptor; // We destructue to avoid a potential `get` descriptor.
	Object.defineProperty(to, 'toString', {value: newToString, writable, enumerable, configurable});
};

function mimicFunction(to, from, {ignoreNonConfigurable = false} = {}) {
	const {name} = to;

	for (const property of Reflect.ownKeys(from)) {
		copyProperty(to, from, property, ignoreNonConfigurable);
	}

	changePrototype(to, from);
	changeToString(to, from, name);

	return to;
}

const cacheStore = new WeakMap();
const cacheTimerStore = new WeakMap();
/**
[Memoize](https://en.wikipedia.org/wiki/Memoization) functions - An optimization used to speed up consecutive function calls by caching the result of calls with identical input.

@param function_ - The function to be memoized.

@example
```
import memoize from 'memoize';

let index = 0;
const counter = () => ++index;
const memoized = memoize(counter);

memoized('foo');
//=> 1

// Cached as it's the same argument
memoized('foo');
//=> 1

// Not cached anymore as the arguments changed
memoized('bar');
//=> 2

memoized('bar');
//=> 2
```
*/
function memoize(function_, { cacheKey, cache = new Map(), maxAge, } = {}) {
    if (maxAge === 0) {
        return function_;
    }
    if (typeof maxAge === 'number') {
        const maxSetIntervalValue = 2_147_483_647;
        if (maxAge > maxSetIntervalValue) {
            throw new TypeError(`The \`maxAge\` option cannot exceed ${maxSetIntervalValue}.`);
        }
        if (maxAge < 0) {
            throw new TypeError('The `maxAge` option should not be a negative number.');
        }
    }
    const memoized = function (...arguments_) {
        const key = cacheKey ? cacheKey(arguments_) : arguments_[0];
        const cacheItem = cache.get(key);
        if (cacheItem) {
            return cacheItem.data;
        }
        const result = function_.apply(this, arguments_);
        const computedMaxAge = typeof maxAge === 'function' ? maxAge(...arguments_) : maxAge;
        cache.set(key, {
            data: result,
            maxAge: computedMaxAge ? Date.now() + computedMaxAge : Number.POSITIVE_INFINITY,
        });
        if (computedMaxAge && computedMaxAge > 0 && computedMaxAge !== Number.POSITIVE_INFINITY) {
            const timer = setTimeout(() => {
                cache.delete(key);
            }, computedMaxAge);
            timer.unref?.();
            const timers = cacheTimerStore.get(function_) ?? new Set();
            timers.add(timer);
            cacheTimerStore.set(function_, timers);
        }
        return result;
    };
    mimicFunction(memoized, function_, {
        ignoreNonConfigurable: true,
    });
    cacheStore.set(memoized, cache);
    return memoized;
}

function tree_add(d) {
  const x = +this._x.call(null, d),
      y = +this._y.call(null, d);
  return add(this.cover(x, y), x, y, d);
}

function add(tree, x, y, d) {
  if (isNaN(x) || isNaN(y)) return tree; // ignore invalid points

  var parent,
      node = tree._root,
      leaf = {data: d},
      x0 = tree._x0,
      y0 = tree._y0,
      x1 = tree._x1,
      y1 = tree._y1,
      xm,
      ym,
      xp,
      yp,
      right,
      bottom,
      i,
      j;

  // If the tree is empty, initialize the root as a leaf.
  if (!node) return tree._root = leaf, tree;

  // Find the existing leaf for the new point, or add it.
  while (node.length) {
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    if (parent = node, !(node = node[i = bottom << 1 | right])) return parent[i] = leaf, tree;
  }

  // Is the new point is exactly coincident with the existing point?
  xp = +tree._x.call(null, node.data);
  yp = +tree._y.call(null, node.data);
  if (x === xp && y === yp) return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree;

  // Otherwise, split the leaf node until the old and new point are separated.
  do {
    parent = parent ? parent[i] = new Array(4) : tree._root = new Array(4);
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
  } while ((i = bottom << 1 | right) === (j = (yp >= ym) << 1 | (xp >= xm)));
  return parent[j] = node, parent[i] = leaf, tree;
}

function addAll(data) {
  var d, i, n = data.length,
      x,
      y,
      xz = new Array(n),
      yz = new Array(n),
      x0 = Infinity,
      y0 = Infinity,
      x1 = -Infinity,
      y1 = -Infinity;

  // Compute the points and their extent.
  for (i = 0; i < n; ++i) {
    if (isNaN(x = +this._x.call(null, d = data[i])) || isNaN(y = +this._y.call(null, d))) continue;
    xz[i] = x;
    yz[i] = y;
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
    if (y < y0) y0 = y;
    if (y > y1) y1 = y;
  }

  // If there were no (valid) points, abort.
  if (x0 > x1 || y0 > y1) return this;

  // Expand the tree to cover the new points.
  this.cover(x0, y0).cover(x1, y1);

  // Add the new points.
  for (i = 0; i < n; ++i) {
    add(this, xz[i], yz[i], data[i]);
  }

  return this;
}

function tree_cover(x, y) {
  if (isNaN(x = +x) || isNaN(y = +y)) return this; // ignore invalid points

  var x0 = this._x0,
      y0 = this._y0,
      x1 = this._x1,
      y1 = this._y1;

  // If the quadtree has no extent, initialize them.
  // Integer extent are necessary so that if we later double the extent,
  // the existing quadrant boundaries don’t change due to floating point error!
  if (isNaN(x0)) {
    x1 = (x0 = Math.floor(x)) + 1;
    y1 = (y0 = Math.floor(y)) + 1;
  }

  // Otherwise, double repeatedly to cover.
  else {
    var z = x1 - x0 || 1,
        node = this._root,
        parent,
        i;

    while (x0 > x || x >= x1 || y0 > y || y >= y1) {
      i = (y < y0) << 1 | (x < x0);
      parent = new Array(4), parent[i] = node, node = parent, z *= 2;
      switch (i) {
        case 0: x1 = x0 + z, y1 = y0 + z; break;
        case 1: x0 = x1 - z, y1 = y0 + z; break;
        case 2: x1 = x0 + z, y0 = y1 - z; break;
        case 3: x0 = x1 - z, y0 = y1 - z; break;
      }
    }

    if (this._root && this._root.length) this._root = node;
  }

  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  return this;
}

function tree_data() {
  var data = [];
  this.visit(function(node) {
    if (!node.length) do data.push(node.data); while (node = node.next)
  });
  return data;
}

function tree_extent(_) {
  return arguments.length
      ? this.cover(+_[0][0], +_[0][1]).cover(+_[1][0], +_[1][1])
      : isNaN(this._x0) ? undefined : [[this._x0, this._y0], [this._x1, this._y1]];
}

function Quad(node, x0, y0, x1, y1) {
  this.node = node;
  this.x0 = x0;
  this.y0 = y0;
  this.x1 = x1;
  this.y1 = y1;
}

function tree_find(x, y, radius) {
  var data,
      x0 = this._x0,
      y0 = this._y0,
      x1,
      y1,
      x2,
      y2,
      x3 = this._x1,
      y3 = this._y1,
      quads = [],
      node = this._root,
      q,
      i;

  if (node) quads.push(new Quad(node, x0, y0, x3, y3));
  if (radius == null) radius = Infinity;
  else {
    x0 = x - radius, y0 = y - radius;
    x3 = x + radius, y3 = y + radius;
    radius *= radius;
  }

  while (q = quads.pop()) {

    // Stop searching if this quadrant can’t contain a closer node.
    if (!(node = q.node)
        || (x1 = q.x0) > x3
        || (y1 = q.y0) > y3
        || (x2 = q.x1) < x0
        || (y2 = q.y1) < y0) continue;

    // Bisect the current quadrant.
    if (node.length) {
      var xm = (x1 + x2) / 2,
          ym = (y1 + y2) / 2;

      quads.push(
        new Quad(node[3], xm, ym, x2, y2),
        new Quad(node[2], x1, ym, xm, y2),
        new Quad(node[1], xm, y1, x2, ym),
        new Quad(node[0], x1, y1, xm, ym)
      );

      // Visit the closest quadrant first.
      if (i = (y >= ym) << 1 | (x >= xm)) {
        q = quads[quads.length - 1];
        quads[quads.length - 1] = quads[quads.length - 1 - i];
        quads[quads.length - 1 - i] = q;
      }
    }

    // Visit this point. (Visiting coincident points isn’t necessary!)
    else {
      var dx = x - +this._x.call(null, node.data),
          dy = y - +this._y.call(null, node.data),
          d2 = dx * dx + dy * dy;
      if (d2 < radius) {
        var d = Math.sqrt(radius = d2);
        x0 = x - d, y0 = y - d;
        x3 = x + d, y3 = y + d;
        data = node.data;
      }
    }
  }

  return data;
}

function tree_remove(d) {
  if (isNaN(x = +this._x.call(null, d)) || isNaN(y = +this._y.call(null, d))) return this; // ignore invalid points

  var parent,
      node = this._root,
      retainer,
      previous,
      next,
      x0 = this._x0,
      y0 = this._y0,
      x1 = this._x1,
      y1 = this._y1,
      x,
      y,
      xm,
      ym,
      right,
      bottom,
      i,
      j;

  // If the tree is empty, initialize the root as a leaf.
  if (!node) return this;

  // Find the leaf node for the point.
  // While descending, also retain the deepest parent with a non-removed sibling.
  if (node.length) while (true) {
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    if (!(parent = node, node = node[i = bottom << 1 | right])) return this;
    if (!node.length) break;
    if (parent[(i + 1) & 3] || parent[(i + 2) & 3] || parent[(i + 3) & 3]) retainer = parent, j = i;
  }

  // Find the point to remove.
  while (node.data !== d) if (!(previous = node, node = node.next)) return this;
  if (next = node.next) delete node.next;

  // If there are multiple coincident points, remove just the point.
  if (previous) return (next ? previous.next = next : delete previous.next), this;

  // If this is the root point, remove it.
  if (!parent) return this._root = next, this;

  // Remove this leaf.
  next ? parent[i] = next : delete parent[i];

  // If the parent now contains exactly one leaf, collapse superfluous parents.
  if ((node = parent[0] || parent[1] || parent[2] || parent[3])
      && node === (parent[3] || parent[2] || parent[1] || parent[0])
      && !node.length) {
    if (retainer) retainer[j] = node;
    else this._root = node;
  }

  return this;
}

function removeAll(data) {
  for (var i = 0, n = data.length; i < n; ++i) this.remove(data[i]);
  return this;
}

function tree_root() {
  return this._root;
}

function tree_size() {
  var size = 0;
  this.visit(function(node) {
    if (!node.length) do ++size; while (node = node.next)
  });
  return size;
}

function tree_visit(callback) {
  var quads = [], q, node = this._root, child, x0, y0, x1, y1;
  if (node) quads.push(new Quad(node, this._x0, this._y0, this._x1, this._y1));
  while (q = quads.pop()) {
    if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1) && node.length) {
      var xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if (child = node[3]) quads.push(new Quad(child, xm, ym, x1, y1));
      if (child = node[2]) quads.push(new Quad(child, x0, ym, xm, y1));
      if (child = node[1]) quads.push(new Quad(child, xm, y0, x1, ym));
      if (child = node[0]) quads.push(new Quad(child, x0, y0, xm, ym));
    }
  }
  return this;
}

function tree_visitAfter(callback) {
  var quads = [], next = [], q;
  if (this._root) quads.push(new Quad(this._root, this._x0, this._y0, this._x1, this._y1));
  while (q = quads.pop()) {
    var node = q.node;
    if (node.length) {
      var child, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1, xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if (child = node[0]) quads.push(new Quad(child, x0, y0, xm, ym));
      if (child = node[1]) quads.push(new Quad(child, xm, y0, x1, ym));
      if (child = node[2]) quads.push(new Quad(child, x0, ym, xm, y1));
      if (child = node[3]) quads.push(new Quad(child, xm, ym, x1, y1));
    }
    next.push(q);
  }
  while (q = next.pop()) {
    callback(q.node, q.x0, q.y0, q.x1, q.y1);
  }
  return this;
}

function defaultX(d) {
  return d[0];
}

function tree_x(_) {
  return arguments.length ? (this._x = _, this) : this._x;
}

function defaultY(d) {
  return d[1];
}

function tree_y(_) {
  return arguments.length ? (this._y = _, this) : this._y;
}

function quadtree(nodes, x, y) {
  var tree = new Quadtree(x == null ? defaultX : x, y == null ? defaultY : y, NaN, NaN, NaN, NaN);
  return nodes == null ? tree : tree.addAll(nodes);
}

function Quadtree(x, y, x0, y0, x1, y1) {
  this._x = x;
  this._y = y;
  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  this._root = undefined;
}

function leaf_copy(leaf) {
  var copy = {data: leaf.data}, next = copy;
  while (leaf = leaf.next) next = next.next = {data: leaf.data};
  return copy;
}

var treeProto = quadtree.prototype = Quadtree.prototype;

treeProto.copy = function() {
  var copy = new Quadtree(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
      node = this._root,
      nodes,
      child;

  if (!node) return copy;

  if (!node.length) return copy._root = leaf_copy(node), copy;

  nodes = [{source: node, target: copy._root = new Array(4)}];
  while (node = nodes.pop()) {
    for (var i = 0; i < 4; ++i) {
      if (child = node.source[i]) {
        if (child.length) nodes.push({source: child, target: node.target[i] = new Array(4)});
        else node.target[i] = leaf_copy(child);
      }
    }
  }

  return copy;
};

treeProto.add = tree_add;
treeProto.addAll = addAll;
treeProto.cover = tree_cover;
treeProto.data = tree_data;
treeProto.extent = tree_extent;
treeProto.find = tree_find;
treeProto.remove = tree_remove;
treeProto.removeAll = removeAll;
treeProto.root = tree_root;
treeProto.size = tree_size;
treeProto.visit = tree_visit;
treeProto.visitAfter = tree_visitAfter;
treeProto.x = tree_x;
treeProto.y = tree_y;

function initRange(domain, range) {
  switch (arguments.length) {
    case 0: break;
    case 1: this.range(domain); break;
    default: this.range(range).domain(domain); break;
  }
  return this;
}

const implicit = Symbol("implicit");

function ordinal() {
  var index = new InternMap(),
      domain = [],
      range = [],
      unknown = implicit;

  function scale(d) {
    let i = index.get(d);
    if (i === undefined) {
      if (unknown !== implicit) return unknown;
      index.set(d, i = domain.push(d) - 1);
    }
    return range[i % range.length];
  }

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [], index = new InternMap();
    for (const value of _) {
      if (index.has(value)) continue;
      index.set(value, domain.push(value) - 1);
    }
    return scale;
  };

  scale.range = function(_) {
    return arguments.length ? (range = Array.from(_), scale) : range.slice();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return ordinal(domain, range).unknown(unknown);
  };

  initRange.apply(scale, arguments);

  return scale;
}

function band() {
  var scale = ordinal().unknown(undefined),
      domain = scale.domain,
      ordinalRange = scale.range,
      r0 = 0,
      r1 = 1,
      step,
      bandwidth,
      round = false,
      paddingInner = 0,
      paddingOuter = 0,
      align = 0.5;

  delete scale.unknown;

  function rescale() {
    var n = domain().length,
        reverse = r1 < r0,
        start = reverse ? r1 : r0,
        stop = reverse ? r0 : r1;
    step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
    if (round) step = Math.floor(step);
    start += (stop - start - step * (n - paddingInner)) * align;
    bandwidth = step * (1 - paddingInner);
    if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
    var values = range$1(n).map(function(i) { return start + step * i; });
    return ordinalRange(reverse ? values.reverse() : values);
  }

  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };

  scale.range = function(_) {
    return arguments.length ? ([r0, r1] = _, r0 = +r0, r1 = +r1, rescale()) : [r0, r1];
  };

  scale.rangeRound = function(_) {
    return [r0, r1] = _, r0 = +r0, r1 = +r1, round = true, rescale();
  };

  scale.bandwidth = function() {
    return bandwidth;
  };

  scale.step = function() {
    return step;
  };

  scale.round = function(_) {
    return arguments.length ? (round = !!_, rescale()) : round;
  };

  scale.padding = function(_) {
    return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_), rescale()) : paddingInner;
  };

  scale.paddingInner = function(_) {
    return arguments.length ? (paddingInner = Math.min(1, _), rescale()) : paddingInner;
  };

  scale.paddingOuter = function(_) {
    return arguments.length ? (paddingOuter = +_, rescale()) : paddingOuter;
  };

  scale.align = function(_) {
    return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
  };

  scale.copy = function() {
    return band(domain(), [r0, r1])
        .round(round)
        .paddingInner(paddingInner)
        .paddingOuter(paddingOuter)
        .align(align);
  };

  return initRange.apply(rescale(), arguments);
}

function define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}

function extend$1(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex = /^#([0-9a-f]{3,8})$/,
    reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`),
    reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`),
    reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`),
    reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`),
    reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`),
    reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);

var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};

define(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor, this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex, // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});

function color_formatHex() {
  return this.rgb().formatHex();
}

function color_formatHex8() {
  return this.rgb().formatHex8();
}

function color_formatHsl() {
  return hslConvert(this).formatHsl();
}

function color_formatRgb() {
  return this.rgb().formatRgb();
}

function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
      : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
      : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
      : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
      : null) // invalid hex
      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
      : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb;
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function rgb$1(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

define(Rgb, rgb$1, extend$1(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return (-0.5 <= this.r && this.r < 255.5)
        && (-0.5 <= this.g && this.g < 255.5)
        && (-0.5 <= this.b && this.b < 255.5)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex, // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));

function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}

function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}

function rgb_formatRgb() {
  const a = clampa(this.opacity);
  return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}

function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}

function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}

function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl;
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;
    else if (g === max) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

define(Hsl, hsl, extend$1(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
  }
}));

function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}

function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}

var constant$1 = x => () => x;

function linear$3(a, d) {
  return function(t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant$1(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear$3(a, d) : constant$1(isNaN(a) ? b : a);
}

var rgb = (function rgbGamma(y) {
  var color = gamma(y);

  function rgb(start, end) {
    var r = color((start = rgb$1(start)).r, (end = rgb$1(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb.gamma = rgbGamma;

  return rgb;
})(1);

function numberArray(a, b) {
  if (!b) b = [];
  var n = a ? Math.min(b.length, a.length) : 0,
      c = b.slice(),
      i;
  return function(t) {
    for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
    return c;
  };
}

function isNumberArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}

function genericArray(a, b) {
  var nb = b ? b.length : 0,
      na = a ? Math.min(nb, a.length) : 0,
      x = new Array(na),
      c = new Array(nb),
      i;

  for (i = 0; i < na; ++i) x[i] = interpolate(a[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];

  return function(t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);
    return c;
  };
}

function date$1(a, b) {
  var d = new Date;
  return a = +a, b = +b, function(t) {
    return d.setTime(a * (1 - t) + b * t), d;
  };
}

function interpolateNumber(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}

function object$1(a, b) {
  var i = {},
      c = {},
      k;

  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};

  for (k in b) {
    if (k in a) {
      i[k] = interpolate(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }

  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
}

var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, "g");

function zero(b) {
  return function() {
    return b;
  };
}

function one(b) {
  return function(t) {
    return b(t) + "";
  };
}

function string(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
      am, // current match in a
      bm, // current match in b
      bs, // string preceding current number in b, if any
      i = -1, // index in s
      s = [], // string constants and placeholders
      q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a))
      && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) { // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else { // interpolate non-matching numbers
      s[++i] = null;
      q.push({i: i, x: interpolateNumber(am, bm)});
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? (q[0]
      ? one(q[0].x)
      : zero(b))
      : (b = q.length, function(t) {
          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        });
}

function interpolate(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? constant$1(b)
      : (t === "number" ? interpolateNumber
      : t === "string" ? ((c = color(b)) ? (b = c, rgb) : string)
      : b instanceof color ? rgb
      : b instanceof Date ? date$1
      : isNumberArray(b) ? numberArray
      : Array.isArray(b) ? genericArray
      : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object$1
      : interpolateNumber)(a, b);
}

function interpolateRound(a, b) {
  return a = +a, b = +b, function(t) {
    return Math.round(a * (1 - t) + b * t);
  };
}

function quantize(interpolator, n) {
  var samples = new Array(n);
  for (var i = 0; i < n; ++i) samples[i] = interpolator(i / (n - 1));
  return samples;
}

function constants(x) {
  return function() {
    return x;
  };
}

function number$1(x) {
  return +x;
}

var unit = [0, 1];

function identity$4(x) {
  return x;
}

function normalize$1(a, b) {
  return (b -= (a = +a))
      ? function(x) { return (x - a) / b; }
      : constants(isNaN(b) ? NaN : 0.5);
}

function clamper(a, b) {
  var t;
  if (a > b) t = a, a = b, b = t;
  return function(x) { return Math.max(a, Math.min(b, x)); };
}

// normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
// interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].
function bimap(domain, range, interpolate) {
  var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
  if (d1 < d0) d0 = normalize$1(d1, d0), r0 = interpolate(r1, r0);
  else d0 = normalize$1(d0, d1), r0 = interpolate(r0, r1);
  return function(x) { return r0(d0(x)); };
}

function polymap(domain, range, interpolate) {
  var j = Math.min(domain.length, range.length) - 1,
      d = new Array(j),
      r = new Array(j),
      i = -1;

  // Reverse descending domains.
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }

  while (++i < j) {
    d[i] = normalize$1(domain[i], domain[i + 1]);
    r[i] = interpolate(range[i], range[i + 1]);
  }

  return function(x) {
    var i = bisectRight(domain, x, 1, j) - 1;
    return r[i](d[i](x));
  };
}

function copy(source, target) {
  return target
      .domain(source.domain())
      .range(source.range())
      .interpolate(source.interpolate())
      .clamp(source.clamp())
      .unknown(source.unknown());
}

function transformer$1() {
  var domain = unit,
      range = unit,
      interpolate$1 = interpolate,
      transform,
      untransform,
      unknown,
      clamp = identity$4,
      piecewise,
      output,
      input;

  function rescale() {
    var n = Math.min(domain.length, range.length);
    if (clamp !== identity$4) clamp = clamper(domain[0], domain[n - 1]);
    piecewise = n > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }

  function scale(x) {
    return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate$1)))(transform(clamp(x)));
  }

  scale.invert = function(y) {
    return clamp(untransform((input || (input = piecewise(range, domain.map(transform), interpolateNumber)))(y)));
  };

  scale.domain = function(_) {
    return arguments.length ? (domain = Array.from(_, number$1), rescale()) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
  };

  scale.rangeRound = function(_) {
    return range = Array.from(_), interpolate$1 = interpolateRound, rescale();
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = _ ? true : identity$4, rescale()) : clamp !== identity$4;
  };

  scale.interpolate = function(_) {
    return arguments.length ? (interpolate$1 = _, rescale()) : interpolate$1;
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  return function(t, u) {
    transform = t, untransform = u;
    return rescale();
  };
}

function continuous() {
  return transformer$1()(identity$4, identity$4);
}

function formatDecimal(x) {
  return Math.abs(x = Math.round(x)) >= 1e21
      ? x.toLocaleString("en").replace(/,/g, "")
      : x.toString(10);
}

// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimalParts(1.23) returns ["123", 0].
function formatDecimalParts(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
  var i, coefficient = x.slice(0, i);

  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x.slice(i + 1)
  ];
}

function exponent(x) {
  return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
}

function formatGroup(grouping, thousands) {
  return function(value, width) {
    var i = value.length,
        t = [],
        j = 0,
        g = grouping[0],
        length = 0;

    while (i > 0 && g > 0) {
      if (length + g + 1 > width) g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }

    return t.reverse().join(thousands);
  };
}

function formatNumerals(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}

// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}

formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

function FormatSpecifier(specifier) {
  this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
  this.align = specifier.align === undefined ? ">" : specifier.align + "";
  this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === undefined ? undefined : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === undefined ? "" : specifier.type + "";
}

FormatSpecifier.prototype.toString = function() {
  return this.fill
      + this.align
      + this.sign
      + this.symbol
      + (this.zero ? "0" : "")
      + (this.width === undefined ? "" : Math.max(1, this.width | 0))
      + (this.comma ? "," : "")
      + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0))
      + (this.trim ? "~" : "")
      + this.type;
};

// Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
function formatTrim(s) {
  out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (s[i]) {
      case ".": i0 = i1 = i; break;
      case "0": if (i0 === 0) i0 = i; i1 = i; break;
      default: if (!+s[i]) break out; if (i0 > 0) i0 = 0; break;
    }
  }
  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}

var prefixExponent;

function formatPrefixAuto(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1],
      i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
      n = coefficient.length;
  return i === n ? coefficient
      : i > n ? coefficient + new Array(i - n + 1).join("0")
      : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
      : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0]; // less than 1y!
}

function formatRounded(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
      : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
      : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}

var formatTypes = {
  "%": (x, p) => (x * 100).toFixed(p),
  "b": (x) => Math.round(x).toString(2),
  "c": (x) => x + "",
  "d": formatDecimal,
  "e": (x, p) => x.toExponential(p),
  "f": (x, p) => x.toFixed(p),
  "g": (x, p) => x.toPrecision(p),
  "o": (x) => Math.round(x).toString(8),
  "p": (x, p) => formatRounded(x * 100, p),
  "r": formatRounded,
  "s": formatPrefixAuto,
  "X": (x) => Math.round(x).toString(16).toUpperCase(),
  "x": (x) => Math.round(x).toString(16)
};

function identity$3(x) {
  return x;
}

var map = Array.prototype.map,
    prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

function formatLocale(locale) {
  var group = locale.grouping === undefined || locale.thousands === undefined ? identity$3 : formatGroup(map.call(locale.grouping, Number), locale.thousands + ""),
      currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
      currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
      decimal = locale.decimal === undefined ? "." : locale.decimal + "",
      numerals = locale.numerals === undefined ? identity$3 : formatNumerals(map.call(locale.numerals, String)),
      percent = locale.percent === undefined ? "%" : locale.percent + "",
      minus = locale.minus === undefined ? "−" : locale.minus + "",
      nan = locale.nan === undefined ? "NaN" : locale.nan + "";

  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);

    var fill = specifier.fill,
        align = specifier.align,
        sign = specifier.sign,
        symbol = specifier.symbol,
        zero = specifier.zero,
        width = specifier.width,
        comma = specifier.comma,
        precision = specifier.precision,
        trim = specifier.trim,
        type = specifier.type;

    // The "n" type is an alias for ",g".
    if (type === "n") comma = true, type = "g";

    // The "" type, and any invalid type, is an alias for ".12~g".
    else if (!formatTypes[type]) precision === undefined && (precision = 12), trim = true, type = "g";

    // If zero fill is specified, padding goes after sign and before digits.
    if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

    // Compute the prefix and suffix.
    // For SI-prefix, the suffix is lazily computed.
    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
        suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";

    // What format function should we use?
    // Is this an integer type?
    // Can this type generate exponential notation?
    var formatType = formatTypes[type],
        maybeSuffix = /[defgprs%]/.test(type);

    // Set the default precision if not specified,
    // or clamp the specified precision to the supported range.
    // For significant precision, it must be in [1, 21].
    // For fixed precision, it must be in [0, 20].
    precision = precision === undefined ? 6
        : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
        : Math.max(0, Math.min(20, precision));

    function format(value) {
      var valuePrefix = prefix,
          valueSuffix = suffix,
          i, n, c;

      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;

        // Determine the sign. -0 is not less than 0, but 1 / -0 is!
        var valueNegative = value < 0 || 1 / value < 0;

        // Perform the initial formatting.
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);

        // Trim insignificant zeros.
        if (trim) value = formatTrim(value);

        // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
        if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;

        // Compute the prefix and suffix.
        valuePrefix = (valueNegative ? (sign === "(" ? sign : minus) : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

        // Break the formatted value into the integer “value” part that can be
        // grouped, and fractional or exponential “suffix” part that is not.
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }

      // If the fill character is not "0", grouping is applied before padding.
      if (comma && !zero) value = group(value, Infinity);

      // Compute the padding.
      var length = valuePrefix.length + value.length + valueSuffix.length,
          padding = length < width ? new Array(width - length + 1).join(fill) : "";

      // If the fill character is "0", grouping is applied after padding.
      if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

      // Reconstruct the final output based on the desired alignment.
      switch (align) {
        case "<": value = valuePrefix + value + valueSuffix + padding; break;
        case "=": value = valuePrefix + padding + value + valueSuffix; break;
        case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
        default: value = padding + valuePrefix + value + valueSuffix; break;
      }

      return numerals(value);
    }

    format.toString = function() {
      return specifier + "";
    };

    return format;
  }

  function formatPrefix(specifier, value) {
    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
        e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
        k = Math.pow(10, -e),
        prefix = prefixes[8 + e / 3];
    return function(value) {
      return f(k * value) + prefix;
    };
  }

  return {
    format: newFormat,
    formatPrefix: formatPrefix
  };
}

var locale;
var format;
var formatPrefix;

defaultLocale({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});

function defaultLocale(definition) {
  locale = formatLocale(definition);
  format = locale.format;
  formatPrefix = locale.formatPrefix;
  return locale;
}

function precisionFixed(step) {
  return Math.max(0, -exponent(Math.abs(step)));
}

function precisionPrefix(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
}

function precisionRound(step, max) {
  step = Math.abs(step), max = Math.abs(max) - step;
  return Math.max(0, exponent(max) - exponent(step)) + 1;
}

function tickFormat(start, stop, count, specifier) {
  var step = tickStep(start, stop, count),
      precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
      return formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return format(specifier);
}

function linearish(scale) {
  var domain = scale.domain;

  scale.ticks = function(count) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
  };

  scale.tickFormat = function(count, specifier) {
    var d = domain();
    return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
  };

  scale.nice = function(count) {
    if (count == null) count = 10;

    var d = domain();
    var i0 = 0;
    var i1 = d.length - 1;
    var start = d[i0];
    var stop = d[i1];
    var prestep;
    var step;
    var maxIter = 10;

    if (stop < start) {
      step = start, start = stop, stop = step;
      step = i0, i0 = i1, i1 = step;
    }
    
    while (maxIter-- > 0) {
      step = tickIncrement(start, stop, count);
      if (step === prestep) {
        d[i0] = start;
        d[i1] = stop;
        return domain(d);
      } else if (step > 0) {
        start = Math.floor(start / step) * step;
        stop = Math.ceil(stop / step) * step;
      } else if (step < 0) {
        start = Math.ceil(start * step) / step;
        stop = Math.floor(stop * step) / step;
      } else {
        break;
      }
      prestep = step;
    }

    return scale;
  };

  return scale;
}

function linear$2() {
  var scale = continuous();

  scale.copy = function() {
    return copy(scale, linear$2());
  };

  initRange.apply(scale, arguments);

  return linearish(scale);
}

function nice(domain, interval) {
  domain = domain.slice();

  var i0 = 0,
      i1 = domain.length - 1,
      x0 = domain[i0],
      x1 = domain[i1],
      t;

  if (x1 < x0) {
    t = i0, i0 = i1, i1 = t;
    t = x0, x0 = x1, x1 = t;
  }

  domain[i0] = interval.floor(x0);
  domain[i1] = interval.ceil(x1);
  return domain;
}

function transformPow(exponent) {
  return function(x) {
    return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
  };
}

function transformSqrt(x) {
  return x < 0 ? -Math.sqrt(-x) : Math.sqrt(x);
}

function transformSquare(x) {
  return x < 0 ? -x * x : x * x;
}

function powish(transform) {
  var scale = transform(identity$4, identity$4),
      exponent = 1;

  function rescale() {
    return exponent === 1 ? transform(identity$4, identity$4)
        : exponent === 0.5 ? transform(transformSqrt, transformSquare)
        : transform(transformPow(exponent), transformPow(1 / exponent));
  }

  scale.exponent = function(_) {
    return arguments.length ? (exponent = +_, rescale()) : exponent;
  };

  return linearish(scale);
}

function pow$2() {
  var scale = powish(transformer$1());

  scale.copy = function() {
    return copy(scale, pow$2()).exponent(scale.exponent());
  };

  initRange.apply(scale, arguments);

  return scale;
}

function sqrt$3() {
  return pow$2.apply(null, arguments).exponent(0.5);
}

function date(t) {
  return new Date(t);
}

function number(t) {
  return t instanceof Date ? +t : +new Date(+t);
}

function calendar(ticks, tickInterval, year, month, week, day, hour, minute, second, format) {
  var scale = continuous(),
      invert = scale.invert,
      domain = scale.domain;

  var formatMillisecond = format(".%L"),
      formatSecond = format(":%S"),
      formatMinute = format("%I:%M"),
      formatHour = format("%I %p"),
      formatDay = format("%a %d"),
      formatWeek = format("%b %d"),
      formatMonth = format("%B"),
      formatYear = format("%Y");

  function tickFormat(date) {
    return (second(date) < date ? formatMillisecond
        : minute(date) < date ? formatSecond
        : hour(date) < date ? formatMinute
        : day(date) < date ? formatHour
        : month(date) < date ? (week(date) < date ? formatDay : formatWeek)
        : year(date) < date ? formatMonth
        : formatYear)(date);
  }

  scale.invert = function(y) {
    return new Date(invert(y));
  };

  scale.domain = function(_) {
    return arguments.length ? domain(Array.from(_, number)) : domain().map(date);
  };

  scale.ticks = function(interval) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], interval == null ? 10 : interval);
  };

  scale.tickFormat = function(count, specifier) {
    return specifier == null ? tickFormat : format(specifier);
  };

  scale.nice = function(interval) {
    var d = domain();
    if (!interval || typeof interval.range !== "function") interval = tickInterval(d[0], d[d.length - 1], interval == null ? 10 : interval);
    return interval ? domain(nice(d, interval)) : scale;
  };

  scale.copy = function() {
    return copy(scale, calendar(ticks, tickInterval, year, month, week, day, hour, minute, second, format));
  };

  return scale;
}

function time() {
  return initRange.apply(calendar(timeTicks, timeTickInterval, timeYear, timeMonth, timeSunday, timeDay, timeHour, timeMinute, second, timeFormat).domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]), arguments);
}

var epsilon$4 = 1e-6;
var epsilon2 = 1e-12;
var pi$3 = Math.PI;
var halfPi$2 = pi$3 / 2;
var quarterPi = pi$3 / 4;
var tau$3 = pi$3 * 2;

var degrees$1 = 180 / pi$3;
var radians$1 = pi$3 / 180;

var abs$1 = Math.abs;
var atan = Math.atan;
var atan2$2 = Math.atan2;
var cos$2 = Math.cos;
var hypot = Math.hypot;
var sin$2 = Math.sin;
var sign$1 = Math.sign || function(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; };
var sqrt$2 = Math.sqrt;

function acos$1(x) {
  return x > 1 ? 0 : x < -1 ? pi$3 : Math.acos(x);
}

function asin$2(x) {
  return x > 1 ? halfPi$2 : x < -1 ? -halfPi$2 : Math.asin(x);
}

function noop$1() {}

function streamGeometry(geometry, stream) {
  if (geometry && streamGeometryType.hasOwnProperty(geometry.type)) {
    streamGeometryType[geometry.type](geometry, stream);
  }
}

var streamObjectType = {
  Feature: function(object, stream) {
    streamGeometry(object.geometry, stream);
  },
  FeatureCollection: function(object, stream) {
    var features = object.features, i = -1, n = features.length;
    while (++i < n) streamGeometry(features[i].geometry, stream);
  }
};

var streamGeometryType = {
  Sphere: function(object, stream) {
    stream.sphere();
  },
  Point: function(object, stream) {
    object = object.coordinates;
    stream.point(object[0], object[1], object[2]);
  },
  MultiPoint: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) object = coordinates[i], stream.point(object[0], object[1], object[2]);
  },
  LineString: function(object, stream) {
    streamLine(object.coordinates, stream, 0);
  },
  MultiLineString: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) streamLine(coordinates[i], stream, 0);
  },
  Polygon: function(object, stream) {
    streamPolygon(object.coordinates, stream);
  },
  MultiPolygon: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) streamPolygon(coordinates[i], stream);
  },
  GeometryCollection: function(object, stream) {
    var geometries = object.geometries, i = -1, n = geometries.length;
    while (++i < n) streamGeometry(geometries[i], stream);
  }
};

function streamLine(coordinates, stream, closed) {
  var i = -1, n = coordinates.length - closed, coordinate;
  stream.lineStart();
  while (++i < n) coordinate = coordinates[i], stream.point(coordinate[0], coordinate[1], coordinate[2]);
  stream.lineEnd();
}

function streamPolygon(coordinates, stream) {
  var i = -1, n = coordinates.length;
  stream.polygonStart();
  while (++i < n) streamLine(coordinates[i], stream, 1);
  stream.polygonEnd();
}

function geoStream(object, stream) {
  if (object && streamObjectType.hasOwnProperty(object.type)) {
    streamObjectType[object.type](object, stream);
  } else {
    streamGeometry(object, stream);
  }
}

function spherical$1(cartesian) {
  return [atan2$2(cartesian[1], cartesian[0]), asin$2(cartesian[2])];
}

function cartesian$1(spherical) {
  var lambda = spherical[0], phi = spherical[1], cosPhi = cos$2(phi);
  return [cosPhi * cos$2(lambda), cosPhi * sin$2(lambda), sin$2(phi)];
}

function cartesianDot$1(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cartesianCross$1(a, b) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

// TODO return a
function cartesianAddInPlace(a, b) {
  a[0] += b[0], a[1] += b[1], a[2] += b[2];
}

function cartesianScale(vector, k) {
  return [vector[0] * k, vector[1] * k, vector[2] * k];
}

// TODO return d
function cartesianNormalizeInPlace(d) {
  var l = sqrt$2(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
  d[0] /= l, d[1] /= l, d[2] /= l;
}

var W0, W1,
    X0$1, Y0$1, Z0$1,
    X1$1, Y1$1, Z1$1,
    X2$1, Y2$1, Z2$1,
    lambda00, phi00, // first point
    x0$4, y0$4, z0; // previous point

var centroidStream$1 = {
  sphere: noop$1,
  point: centroidPoint$1,
  lineStart: centroidLineStart$1,
  lineEnd: centroidLineEnd$1,
  polygonStart: function() {
    centroidStream$1.lineStart = centroidRingStart$1;
    centroidStream$1.lineEnd = centroidRingEnd$1;
  },
  polygonEnd: function() {
    centroidStream$1.lineStart = centroidLineStart$1;
    centroidStream$1.lineEnd = centroidLineEnd$1;
  }
};

// Arithmetic mean of Cartesian vectors.
function centroidPoint$1(lambda, phi) {
  lambda *= radians$1, phi *= radians$1;
  var cosPhi = cos$2(phi);
  centroidPointCartesian(cosPhi * cos$2(lambda), cosPhi * sin$2(lambda), sin$2(phi));
}

function centroidPointCartesian(x, y, z) {
  ++W0;
  X0$1 += (x - X0$1) / W0;
  Y0$1 += (y - Y0$1) / W0;
  Z0$1 += (z - Z0$1) / W0;
}

function centroidLineStart$1() {
  centroidStream$1.point = centroidLinePointFirst;
}

function centroidLinePointFirst(lambda, phi) {
  lambda *= radians$1, phi *= radians$1;
  var cosPhi = cos$2(phi);
  x0$4 = cosPhi * cos$2(lambda);
  y0$4 = cosPhi * sin$2(lambda);
  z0 = sin$2(phi);
  centroidStream$1.point = centroidLinePoint;
  centroidPointCartesian(x0$4, y0$4, z0);
}

function centroidLinePoint(lambda, phi) {
  lambda *= radians$1, phi *= radians$1;
  var cosPhi = cos$2(phi),
      x = cosPhi * cos$2(lambda),
      y = cosPhi * sin$2(lambda),
      z = sin$2(phi),
      w = atan2$2(sqrt$2((w = y0$4 * z - z0 * y) * w + (w = z0 * x - x0$4 * z) * w + (w = x0$4 * y - y0$4 * x) * w), x0$4 * x + y0$4 * y + z0 * z);
  W1 += w;
  X1$1 += w * (x0$4 + (x0$4 = x));
  Y1$1 += w * (y0$4 + (y0$4 = y));
  Z1$1 += w * (z0 + (z0 = z));
  centroidPointCartesian(x0$4, y0$4, z0);
}

function centroidLineEnd$1() {
  centroidStream$1.point = centroidPoint$1;
}

// See J. E. Brock, The Inertia Tensor for a Spherical Triangle,
// J. Applied Mechanics 42, 239 (1975).
function centroidRingStart$1() {
  centroidStream$1.point = centroidRingPointFirst;
}

function centroidRingEnd$1() {
  centroidRingPoint(lambda00, phi00);
  centroidStream$1.point = centroidPoint$1;
}

function centroidRingPointFirst(lambda, phi) {
  lambda00 = lambda, phi00 = phi;
  lambda *= radians$1, phi *= radians$1;
  centroidStream$1.point = centroidRingPoint;
  var cosPhi = cos$2(phi);
  x0$4 = cosPhi * cos$2(lambda);
  y0$4 = cosPhi * sin$2(lambda);
  z0 = sin$2(phi);
  centroidPointCartesian(x0$4, y0$4, z0);
}

function centroidRingPoint(lambda, phi) {
  lambda *= radians$1, phi *= radians$1;
  var cosPhi = cos$2(phi),
      x = cosPhi * cos$2(lambda),
      y = cosPhi * sin$2(lambda),
      z = sin$2(phi),
      cx = y0$4 * z - z0 * y,
      cy = z0 * x - x0$4 * z,
      cz = x0$4 * y - y0$4 * x,
      m = hypot(cx, cy, cz),
      w = asin$2(m), // line weight = angle
      v = m && -w / m; // area weight multiplier
  X2$1.add(v * cx);
  Y2$1.add(v * cy);
  Z2$1.add(v * cz);
  W1 += w;
  X1$1 += w * (x0$4 + (x0$4 = x));
  Y1$1 += w * (y0$4 + (y0$4 = y));
  Z1$1 += w * (z0 + (z0 = z));
  centroidPointCartesian(x0$4, y0$4, z0);
}

function geoCentroid(object) {
  W0 = W1 =
  X0$1 = Y0$1 = Z0$1 =
  X1$1 = Y1$1 = Z1$1 = 0;
  X2$1 = new Adder();
  Y2$1 = new Adder();
  Z2$1 = new Adder();
  geoStream(object, centroidStream$1);

  var x = +X2$1,
      y = +Y2$1,
      z = +Z2$1,
      m = hypot(x, y, z);

  // If the area-weighted ccentroid is undefined, fall back to length-weighted ccentroid.
  if (m < epsilon2) {
    x = X1$1, y = Y1$1, z = Z1$1;
    // If the feature has zero length, fall back to arithmetic mean of point vectors.
    if (W1 < epsilon$4) x = X0$1, y = Y0$1, z = Z0$1;
    m = hypot(x, y, z);
    // If the feature still has an undefined ccentroid, then return.
    if (m < epsilon2) return [NaN, NaN];
  }

  return [atan2$2(y, x) * degrees$1, asin$2(z / m) * degrees$1];
}

function compose(a, b) {

  function compose(x, y) {
    return x = a(x, y), b(x[0], x[1]);
  }

  if (a.invert && b.invert) compose.invert = function(x, y) {
    return x = b.invert(x, y), x && a.invert(x[0], x[1]);
  };

  return compose;
}

function rotationIdentity(lambda, phi) {
  if (abs$1(lambda) > pi$3) lambda -= Math.round(lambda / tau$3) * tau$3;
  return [lambda, phi];
}

rotationIdentity.invert = rotationIdentity;

function rotateRadians(deltaLambda, deltaPhi, deltaGamma) {
  return (deltaLambda %= tau$3) ? (deltaPhi || deltaGamma ? compose(rotationLambda(deltaLambda), rotationPhiGamma(deltaPhi, deltaGamma))
    : rotationLambda(deltaLambda))
    : (deltaPhi || deltaGamma ? rotationPhiGamma(deltaPhi, deltaGamma)
    : rotationIdentity);
}

function forwardRotationLambda(deltaLambda) {
  return function(lambda, phi) {
    lambda += deltaLambda;
    if (abs$1(lambda) > pi$3) lambda -= Math.round(lambda / tau$3) * tau$3;
    return [lambda, phi];
  };
}

function rotationLambda(deltaLambda) {
  var rotation = forwardRotationLambda(deltaLambda);
  rotation.invert = forwardRotationLambda(-deltaLambda);
  return rotation;
}

function rotationPhiGamma(deltaPhi, deltaGamma) {
  var cosDeltaPhi = cos$2(deltaPhi),
      sinDeltaPhi = sin$2(deltaPhi),
      cosDeltaGamma = cos$2(deltaGamma),
      sinDeltaGamma = sin$2(deltaGamma);

  function rotation(lambda, phi) {
    var cosPhi = cos$2(phi),
        x = cos$2(lambda) * cosPhi,
        y = sin$2(lambda) * cosPhi,
        z = sin$2(phi),
        k = z * cosDeltaPhi + x * sinDeltaPhi;
    return [
      atan2$2(y * cosDeltaGamma - k * sinDeltaGamma, x * cosDeltaPhi - z * sinDeltaPhi),
      asin$2(k * cosDeltaGamma + y * sinDeltaGamma)
    ];
  }

  rotation.invert = function(lambda, phi) {
    var cosPhi = cos$2(phi),
        x = cos$2(lambda) * cosPhi,
        y = sin$2(lambda) * cosPhi,
        z = sin$2(phi),
        k = z * cosDeltaGamma - y * sinDeltaGamma;
    return [
      atan2$2(y * cosDeltaGamma + z * sinDeltaGamma, x * cosDeltaPhi + k * sinDeltaPhi),
      asin$2(k * cosDeltaPhi - x * sinDeltaPhi)
    ];
  };

  return rotation;
}

function geoRotation(rotate) {
  rotate = rotateRadians(rotate[0] * radians$1, rotate[1] * radians$1, rotate.length > 2 ? rotate[2] * radians$1 : 0);

  function forward(coordinates) {
    coordinates = rotate(coordinates[0] * radians$1, coordinates[1] * radians$1);
    return coordinates[0] *= degrees$1, coordinates[1] *= degrees$1, coordinates;
  }

  forward.invert = function(coordinates) {
    coordinates = rotate.invert(coordinates[0] * radians$1, coordinates[1] * radians$1);
    return coordinates[0] *= degrees$1, coordinates[1] *= degrees$1, coordinates;
  };

  return forward;
}

// Generates a circle centered at [0°, 0°], with a given radius and precision.
function circleStream(stream, radius, delta, direction, t0, t1) {
  if (!delta) return;
  var cosRadius = cos$2(radius),
      sinRadius = sin$2(radius),
      step = direction * delta;
  if (t0 == null) {
    t0 = radius + direction * tau$3;
    t1 = radius - step / 2;
  } else {
    t0 = circleRadius(cosRadius, t0);
    t1 = circleRadius(cosRadius, t1);
    if (direction > 0 ? t0 < t1 : t0 > t1) t0 += direction * tau$3;
  }
  for (var point, t = t0; direction > 0 ? t > t1 : t < t1; t -= step) {
    point = spherical$1([cosRadius, -sinRadius * cos$2(t), -sinRadius * sin$2(t)]);
    stream.point(point[0], point[1]);
  }
}

// Returns the signed angle of a cartesian point relative to [cosRadius, 0, 0].
function circleRadius(cosRadius, point) {
  point = cartesian$1(point), point[0] -= cosRadius;
  cartesianNormalizeInPlace(point);
  var radius = acos$1(-point[1]);
  return ((-point[2] < 0 ? -radius : radius) + tau$3 - epsilon$4) % tau$3;
}

function clipBuffer() {
  var lines = [],
      line;
  return {
    point: function(x, y, m) {
      line.push([x, y, m]);
    },
    lineStart: function() {
      lines.push(line = []);
    },
    lineEnd: noop$1,
    rejoin: function() {
      if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()));
    },
    result: function() {
      var result = lines;
      lines = [];
      line = null;
      return result;
    }
  };
}

function pointEqual(a, b) {
  return abs$1(a[0] - b[0]) < epsilon$4 && abs$1(a[1] - b[1]) < epsilon$4;
}

function Intersection(point, points, other, entry) {
  this.x = point;
  this.z = points;
  this.o = other; // another intersection
  this.e = entry; // is an entry?
  this.v = false; // visited
  this.n = this.p = null; // next & previous
}

// A generalized polygon clipping algorithm: given a polygon that has been cut
// into its visible line segments, and rejoins the segments by interpolating
// along the clip edge.
function clipRejoin(segments, compareIntersection, startInside, interpolate, stream) {
  var subject = [],
      clip = [],
      i,
      n;

  segments.forEach(function(segment) {
    if ((n = segment.length - 1) <= 0) return;
    var n, p0 = segment[0], p1 = segment[n], x;

    if (pointEqual(p0, p1)) {
      if (!p0[2] && !p1[2]) {
        stream.lineStart();
        for (i = 0; i < n; ++i) stream.point((p0 = segment[i])[0], p0[1]);
        stream.lineEnd();
        return;
      }
      // handle degenerate cases by moving the point
      p1[0] += 2 * epsilon$4;
    }

    subject.push(x = new Intersection(p0, segment, null, true));
    clip.push(x.o = new Intersection(p0, null, x, false));
    subject.push(x = new Intersection(p1, segment, null, false));
    clip.push(x.o = new Intersection(p1, null, x, true));
  });

  if (!subject.length) return;

  clip.sort(compareIntersection);
  link(subject);
  link(clip);

  for (i = 0, n = clip.length; i < n; ++i) {
    clip[i].e = startInside = !startInside;
  }

  var start = subject[0],
      points,
      point;

  while (1) {
    // Find first unvisited intersection.
    var current = start,
        isSubject = true;
    while (current.v) if ((current = current.n) === start) return;
    points = current.z;
    stream.lineStart();
    do {
      current.v = current.o.v = true;
      if (current.e) {
        if (isSubject) {
          for (i = 0, n = points.length; i < n; ++i) stream.point((point = points[i])[0], point[1]);
        } else {
          interpolate(current.x, current.n.x, 1, stream);
        }
        current = current.n;
      } else {
        if (isSubject) {
          points = current.p.z;
          for (i = points.length - 1; i >= 0; --i) stream.point((point = points[i])[0], point[1]);
        } else {
          interpolate(current.x, current.p.x, -1, stream);
        }
        current = current.p;
      }
      current = current.o;
      points = current.z;
      isSubject = !isSubject;
    } while (!current.v);
    stream.lineEnd();
  }
}

function link(array) {
  if (!(n = array.length)) return;
  var n,
      i = 0,
      a = array[0],
      b;
  while (++i < n) {
    a.n = b = array[i];
    b.p = a;
    a = b;
  }
  a.n = b = array[0];
  b.p = a;
}

function longitude(point) {
  return abs$1(point[0]) <= pi$3 ? point[0] : sign$1(point[0]) * ((abs$1(point[0]) + pi$3) % tau$3 - pi$3);
}

function polygonContains(polygon, point) {
  var lambda = longitude(point),
      phi = point[1],
      sinPhi = sin$2(phi),
      normal = [sin$2(lambda), -cos$2(lambda), 0],
      angle = 0,
      winding = 0;

  var sum = new Adder();

  if (sinPhi === 1) phi = halfPi$2 + epsilon$4;
  else if (sinPhi === -1) phi = -halfPi$2 - epsilon$4;

  for (var i = 0, n = polygon.length; i < n; ++i) {
    if (!(m = (ring = polygon[i]).length)) continue;
    var ring,
        m,
        point0 = ring[m - 1],
        lambda0 = longitude(point0),
        phi0 = point0[1] / 2 + quarterPi,
        sinPhi0 = sin$2(phi0),
        cosPhi0 = cos$2(phi0);

    for (var j = 0; j < m; ++j, lambda0 = lambda1, sinPhi0 = sinPhi1, cosPhi0 = cosPhi1, point0 = point1) {
      var point1 = ring[j],
          lambda1 = longitude(point1),
          phi1 = point1[1] / 2 + quarterPi,
          sinPhi1 = sin$2(phi1),
          cosPhi1 = cos$2(phi1),
          delta = lambda1 - lambda0,
          sign = delta >= 0 ? 1 : -1,
          absDelta = sign * delta,
          antimeridian = absDelta > pi$3,
          k = sinPhi0 * sinPhi1;

      sum.add(atan2$2(k * sign * sin$2(absDelta), cosPhi0 * cosPhi1 + k * cos$2(absDelta)));
      angle += antimeridian ? delta + sign * tau$3 : delta;

      // Are the longitudes either side of the point’s meridian (lambda),
      // and are the latitudes smaller than the parallel (phi)?
      if (antimeridian ^ lambda0 >= lambda ^ lambda1 >= lambda) {
        var arc = cartesianCross$1(cartesian$1(point0), cartesian$1(point1));
        cartesianNormalizeInPlace(arc);
        var intersection = cartesianCross$1(normal, arc);
        cartesianNormalizeInPlace(intersection);
        var phiArc = (antimeridian ^ delta >= 0 ? -1 : 1) * asin$2(intersection[2]);
        if (phi > phiArc || phi === phiArc && (arc[0] || arc[1])) {
          winding += antimeridian ^ delta >= 0 ? 1 : -1;
        }
      }
    }
  }

  // First, determine whether the South pole is inside or outside:
  //
  // It is inside if:
  // * the polygon winds around it in a clockwise direction.
  // * the polygon does not (cumulatively) wind around it, but has a negative
  //   (counter-clockwise) area.
  //
  // Second, count the (signed) number of times a segment crosses a lambda
  // from the point to the South pole.  If it is zero, then the point is the
  // same side as the South pole.

  return (angle < -epsilon$4 || angle < epsilon$4 && sum < -epsilon2) ^ (winding & 1);
}

function clip(pointVisible, clipLine, interpolate, start) {
  return function(sink) {
    var line = clipLine(sink),
        ringBuffer = clipBuffer(),
        ringSink = clipLine(ringBuffer),
        polygonStarted = false,
        polygon,
        segments,
        ring;

    var clip = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() {
        clip.point = pointRing;
        clip.lineStart = ringStart;
        clip.lineEnd = ringEnd;
        segments = [];
        polygon = [];
      },
      polygonEnd: function() {
        clip.point = point;
        clip.lineStart = lineStart;
        clip.lineEnd = lineEnd;
        segments = merge(segments);
        var startInside = polygonContains(polygon, start);
        if (segments.length) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          clipRejoin(segments, compareIntersection, startInside, interpolate, sink);
        } else if (startInside) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          interpolate(null, null, 1, sink);
          sink.lineEnd();
        }
        if (polygonStarted) sink.polygonEnd(), polygonStarted = false;
        segments = polygon = null;
      },
      sphere: function() {
        sink.polygonStart();
        sink.lineStart();
        interpolate(null, null, 1, sink);
        sink.lineEnd();
        sink.polygonEnd();
      }
    };

    function point(lambda, phi) {
      if (pointVisible(lambda, phi)) sink.point(lambda, phi);
    }

    function pointLine(lambda, phi) {
      line.point(lambda, phi);
    }

    function lineStart() {
      clip.point = pointLine;
      line.lineStart();
    }

    function lineEnd() {
      clip.point = point;
      line.lineEnd();
    }

    function pointRing(lambda, phi) {
      ring.push([lambda, phi]);
      ringSink.point(lambda, phi);
    }

    function ringStart() {
      ringSink.lineStart();
      ring = [];
    }

    function ringEnd() {
      pointRing(ring[0][0], ring[0][1]);
      ringSink.lineEnd();

      var clean = ringSink.clean(),
          ringSegments = ringBuffer.result(),
          i, n = ringSegments.length, m,
          segment,
          point;

      ring.pop();
      polygon.push(ring);
      ring = null;

      if (!n) return;

      // No intersections.
      if (clean & 1) {
        segment = ringSegments[0];
        if ((m = segment.length - 1) > 0) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          for (i = 0; i < m; ++i) sink.point((point = segment[i])[0], point[1]);
          sink.lineEnd();
        }
        return;
      }

      // Rejoin connected segments.
      // TODO reuse ringBuffer.rejoin()?
      if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));

      segments.push(ringSegments.filter(validSegment));
    }

    return clip;
  };
}

function validSegment(segment) {
  return segment.length > 1;
}

// Intersections are sorted along the clip edge. For both antimeridian cutting
// and circle clipping, the same comparison is used.
function compareIntersection(a, b) {
  return ((a = a.x)[0] < 0 ? a[1] - halfPi$2 - epsilon$4 : halfPi$2 - a[1])
       - ((b = b.x)[0] < 0 ? b[1] - halfPi$2 - epsilon$4 : halfPi$2 - b[1]);
}

var clipAntimeridian = clip(
  function() { return true; },
  clipAntimeridianLine,
  clipAntimeridianInterpolate,
  [-pi$3, -halfPi$2]
);

// Takes a line and cuts into visible segments. Return values: 0 - there were
// intersections or the line was empty; 1 - no intersections; 2 - there were
// intersections, and the first and last segments should be rejoined.
function clipAntimeridianLine(stream) {
  var lambda0 = NaN,
      phi0 = NaN,
      sign0 = NaN,
      clean; // no intersections

  return {
    lineStart: function() {
      stream.lineStart();
      clean = 1;
    },
    point: function(lambda1, phi1) {
      var sign1 = lambda1 > 0 ? pi$3 : -pi$3,
          delta = abs$1(lambda1 - lambda0);
      if (abs$1(delta - pi$3) < epsilon$4) { // line crosses a pole
        stream.point(lambda0, phi0 = (phi0 + phi1) / 2 > 0 ? halfPi$2 : -halfPi$2);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        stream.point(lambda1, phi0);
        clean = 0;
      } else if (sign0 !== sign1 && delta >= pi$3) { // line crosses antimeridian
        if (abs$1(lambda0 - sign0) < epsilon$4) lambda0 -= sign0 * epsilon$4; // handle degeneracies
        if (abs$1(lambda1 - sign1) < epsilon$4) lambda1 -= sign1 * epsilon$4;
        phi0 = clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        clean = 0;
      }
      stream.point(lambda0 = lambda1, phi0 = phi1);
      sign0 = sign1;
    },
    lineEnd: function() {
      stream.lineEnd();
      lambda0 = phi0 = NaN;
    },
    clean: function() {
      return 2 - clean; // if intersections, rejoin first and last segments
    }
  };
}

function clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1) {
  var cosPhi0,
      cosPhi1,
      sinLambda0Lambda1 = sin$2(lambda0 - lambda1);
  return abs$1(sinLambda0Lambda1) > epsilon$4
      ? atan((sin$2(phi0) * (cosPhi1 = cos$2(phi1)) * sin$2(lambda1)
          - sin$2(phi1) * (cosPhi0 = cos$2(phi0)) * sin$2(lambda0))
          / (cosPhi0 * cosPhi1 * sinLambda0Lambda1))
      : (phi0 + phi1) / 2;
}

function clipAntimeridianInterpolate(from, to, direction, stream) {
  var phi;
  if (from == null) {
    phi = direction * halfPi$2;
    stream.point(-pi$3, phi);
    stream.point(0, phi);
    stream.point(pi$3, phi);
    stream.point(pi$3, 0);
    stream.point(pi$3, -phi);
    stream.point(0, -phi);
    stream.point(-pi$3, -phi);
    stream.point(-pi$3, 0);
    stream.point(-pi$3, phi);
  } else if (abs$1(from[0] - to[0]) > epsilon$4) {
    var lambda = from[0] < to[0] ? pi$3 : -pi$3;
    phi = direction * lambda / 2;
    stream.point(-lambda, phi);
    stream.point(0, phi);
    stream.point(lambda, phi);
  } else {
    stream.point(to[0], to[1]);
  }
}

function clipCircle(radius) {
  var cr = cos$2(radius),
      delta = 2 * radians$1,
      smallRadius = cr > 0,
      notHemisphere = abs$1(cr) > epsilon$4; // TODO optimise for this common case

  function interpolate(from, to, direction, stream) {
    circleStream(stream, radius, delta, direction, from, to);
  }

  function visible(lambda, phi) {
    return cos$2(lambda) * cos$2(phi) > cr;
  }

  // Takes a line and cuts into visible segments. Return values used for polygon
  // clipping: 0 - there were intersections or the line was empty; 1 - no
  // intersections 2 - there were intersections, and the first and last segments
  // should be rejoined.
  function clipLine(stream) {
    var point0, // previous point
        c0, // code for previous point
        v0, // visibility of previous point
        v00, // visibility of first point
        clean; // no intersections
    return {
      lineStart: function() {
        v00 = v0 = false;
        clean = 1;
      },
      point: function(lambda, phi) {
        var point1 = [lambda, phi],
            point2,
            v = visible(lambda, phi),
            c = smallRadius
              ? v ? 0 : code(lambda, phi)
              : v ? code(lambda + (lambda < 0 ? pi$3 : -pi$3), phi) : 0;
        if (!point0 && (v00 = v0 = v)) stream.lineStart();
        if (v !== v0) {
          point2 = intersect(point0, point1);
          if (!point2 || pointEqual(point0, point2) || pointEqual(point1, point2))
            point1[2] = 1;
        }
        if (v !== v0) {
          clean = 0;
          if (v) {
            // outside going in
            stream.lineStart();
            point2 = intersect(point1, point0);
            stream.point(point2[0], point2[1]);
          } else {
            // inside going out
            point2 = intersect(point0, point1);
            stream.point(point2[0], point2[1], 2);
            stream.lineEnd();
          }
          point0 = point2;
        } else if (notHemisphere && point0 && smallRadius ^ v) {
          var t;
          // If the codes for two points are different, or are both zero,
          // and there this segment intersects with the small circle.
          if (!(c & c0) && (t = intersect(point1, point0, true))) {
            clean = 0;
            if (smallRadius) {
              stream.lineStart();
              stream.point(t[0][0], t[0][1]);
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
            } else {
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
              stream.lineStart();
              stream.point(t[0][0], t[0][1], 3);
            }
          }
        }
        if (v && (!point0 || !pointEqual(point0, point1))) {
          stream.point(point1[0], point1[1]);
        }
        point0 = point1, v0 = v, c0 = c;
      },
      lineEnd: function() {
        if (v0) stream.lineEnd();
        point0 = null;
      },
      // Rejoin first and last segments if there were intersections and the first
      // and last points were visible.
      clean: function() {
        return clean | ((v00 && v0) << 1);
      }
    };
  }

  // Intersects the great circle between a and b with the clip circle.
  function intersect(a, b, two) {
    var pa = cartesian$1(a),
        pb = cartesian$1(b);

    // We have two planes, n1.p = d1 and n2.p = d2.
    // Find intersection line p(t) = c1 n1 + c2 n2 + t (n1 ⨯ n2).
    var n1 = [1, 0, 0], // normal
        n2 = cartesianCross$1(pa, pb),
        n2n2 = cartesianDot$1(n2, n2),
        n1n2 = n2[0], // cartesianDot(n1, n2),
        determinant = n2n2 - n1n2 * n1n2;

    // Two polar points.
    if (!determinant) return !two && a;

    var c1 =  cr * n2n2 / determinant,
        c2 = -cr * n1n2 / determinant,
        n1xn2 = cartesianCross$1(n1, n2),
        A = cartesianScale(n1, c1),
        B = cartesianScale(n2, c2);
    cartesianAddInPlace(A, B);

    // Solve |p(t)|^2 = 1.
    var u = n1xn2,
        w = cartesianDot$1(A, u),
        uu = cartesianDot$1(u, u),
        t2 = w * w - uu * (cartesianDot$1(A, A) - 1);

    if (t2 < 0) return;

    var t = sqrt$2(t2),
        q = cartesianScale(u, (-w - t) / uu);
    cartesianAddInPlace(q, A);
    q = spherical$1(q);

    if (!two) return q;

    // Two intersection points.
    var lambda0 = a[0],
        lambda1 = b[0],
        phi0 = a[1],
        phi1 = b[1],
        z;

    if (lambda1 < lambda0) z = lambda0, lambda0 = lambda1, lambda1 = z;

    var delta = lambda1 - lambda0,
        polar = abs$1(delta - pi$3) < epsilon$4,
        meridian = polar || delta < epsilon$4;

    if (!polar && phi1 < phi0) z = phi0, phi0 = phi1, phi1 = z;

    // Check that the first point is between a and b.
    if (meridian
        ? polar
          ? phi0 + phi1 > 0 ^ q[1] < (abs$1(q[0] - lambda0) < epsilon$4 ? phi0 : phi1)
          : phi0 <= q[1] && q[1] <= phi1
        : delta > pi$3 ^ (lambda0 <= q[0] && q[0] <= lambda1)) {
      var q1 = cartesianScale(u, (-w + t) / uu);
      cartesianAddInPlace(q1, A);
      return [q, spherical$1(q1)];
    }
  }

  // Generates a 4-bit vector representing the location of a point relative to
  // the small circle's bounding box.
  function code(lambda, phi) {
    var r = smallRadius ? radius : pi$3 - radius,
        code = 0;
    if (lambda < -r) code |= 1; // left
    else if (lambda > r) code |= 2; // right
    if (phi < -r) code |= 4; // below
    else if (phi > r) code |= 8; // above
    return code;
  }

  return clip(visible, clipLine, interpolate, smallRadius ? [0, -radius] : [-pi$3, radius - pi$3]);
}

function clipLine(a, b, x0, y0, x1, y1) {
  var ax = a[0],
      ay = a[1],
      bx = b[0],
      by = b[1],
      t0 = 0,
      t1 = 1,
      dx = bx - ax,
      dy = by - ay,
      r;

  r = x0 - ax;
  if (!dx && r > 0) return;
  r /= dx;
  if (dx < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dx > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = x1 - ax;
  if (!dx && r < 0) return;
  r /= dx;
  if (dx < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dx > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  r = y0 - ay;
  if (!dy && r > 0) return;
  r /= dy;
  if (dy < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dy > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = y1 - ay;
  if (!dy && r < 0) return;
  r /= dy;
  if (dy < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dy > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  if (t0 > 0) a[0] = ax + t0 * dx, a[1] = ay + t0 * dy;
  if (t1 < 1) b[0] = ax + t1 * dx, b[1] = ay + t1 * dy;
  return true;
}

var clipMax = 1e9, clipMin = -clipMax;

// TODO Use d3-polygon’s polygonContains here for the ring check?
// TODO Eliminate duplicate buffering in clipBuffer and polygon.push?

function clipRectangle(x0, y0, x1, y1) {

  function visible(x, y) {
    return x0 <= x && x <= x1 && y0 <= y && y <= y1;
  }

  function interpolate(from, to, direction, stream) {
    var a = 0, a1 = 0;
    if (from == null
        || (a = corner(from, direction)) !== (a1 = corner(to, direction))
        || comparePoint(from, to) < 0 ^ direction > 0) {
      do stream.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0);
      while ((a = (a + direction + 4) % 4) !== a1);
    } else {
      stream.point(to[0], to[1]);
    }
  }

  function corner(p, direction) {
    return abs$1(p[0] - x0) < epsilon$4 ? direction > 0 ? 0 : 3
        : abs$1(p[0] - x1) < epsilon$4 ? direction > 0 ? 2 : 1
        : abs$1(p[1] - y0) < epsilon$4 ? direction > 0 ? 1 : 0
        : direction > 0 ? 3 : 2; // abs(p[1] - y1) < epsilon
  }

  function compareIntersection(a, b) {
    return comparePoint(a.x, b.x);
  }

  function comparePoint(a, b) {
    var ca = corner(a, 1),
        cb = corner(b, 1);
    return ca !== cb ? ca - cb
        : ca === 0 ? b[1] - a[1]
        : ca === 1 ? a[0] - b[0]
        : ca === 2 ? a[1] - b[1]
        : b[0] - a[0];
  }

  return function(stream) {
    var activeStream = stream,
        bufferStream = clipBuffer(),
        segments,
        polygon,
        ring,
        x__, y__, v__, // first point
        x_, y_, v_, // previous point
        first,
        clean;

    var clipStream = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: polygonStart,
      polygonEnd: polygonEnd
    };

    function point(x, y) {
      if (visible(x, y)) activeStream.point(x, y);
    }

    function polygonInside() {
      var winding = 0;

      for (var i = 0, n = polygon.length; i < n; ++i) {
        for (var ring = polygon[i], j = 1, m = ring.length, point = ring[0], a0, a1, b0 = point[0], b1 = point[1]; j < m; ++j) {
          a0 = b0, a1 = b1, point = ring[j], b0 = point[0], b1 = point[1];
          if (a1 <= y1) { if (b1 > y1 && (b0 - a0) * (y1 - a1) > (b1 - a1) * (x0 - a0)) ++winding; }
          else { if (b1 <= y1 && (b0 - a0) * (y1 - a1) < (b1 - a1) * (x0 - a0)) --winding; }
        }
      }

      return winding;
    }

    // Buffer geometry within a polygon and then clip it en masse.
    function polygonStart() {
      activeStream = bufferStream, segments = [], polygon = [], clean = true;
    }

    function polygonEnd() {
      var startInside = polygonInside(),
          cleanInside = clean && startInside,
          visible = (segments = merge(segments)).length;
      if (cleanInside || visible) {
        stream.polygonStart();
        if (cleanInside) {
          stream.lineStart();
          interpolate(null, null, 1, stream);
          stream.lineEnd();
        }
        if (visible) {
          clipRejoin(segments, compareIntersection, startInside, interpolate, stream);
        }
        stream.polygonEnd();
      }
      activeStream = stream, segments = polygon = ring = null;
    }

    function lineStart() {
      clipStream.point = linePoint;
      if (polygon) polygon.push(ring = []);
      first = true;
      v_ = false;
      x_ = y_ = NaN;
    }

    // TODO rather than special-case polygons, simply handle them separately.
    // Ideally, coincident intersection points should be jittered to avoid
    // clipping issues.
    function lineEnd() {
      if (segments) {
        linePoint(x__, y__);
        if (v__ && v_) bufferStream.rejoin();
        segments.push(bufferStream.result());
      }
      clipStream.point = point;
      if (v_) activeStream.lineEnd();
    }

    function linePoint(x, y) {
      var v = visible(x, y);
      if (polygon) ring.push([x, y]);
      if (first) {
        x__ = x, y__ = y, v__ = v;
        first = false;
        if (v) {
          activeStream.lineStart();
          activeStream.point(x, y);
        }
      } else {
        if (v && v_) activeStream.point(x, y);
        else {
          var a = [x_ = Math.max(clipMin, Math.min(clipMax, x_)), y_ = Math.max(clipMin, Math.min(clipMax, y_))],
              b = [x = Math.max(clipMin, Math.min(clipMax, x)), y = Math.max(clipMin, Math.min(clipMax, y))];
          if (clipLine(a, b, x0, y0, x1, y1)) {
            if (!v_) {
              activeStream.lineStart();
              activeStream.point(a[0], a[1]);
            }
            activeStream.point(b[0], b[1]);
            if (!v) activeStream.lineEnd();
            clean = false;
          } else if (v) {
            activeStream.lineStart();
            activeStream.point(x, y);
            clean = false;
          }
        }
      }
      x_ = x, y_ = y, v_ = v;
    }

    return clipStream;
  };
}

var lengthSum$1,
    lambda0,
    sinPhi0,
    cosPhi0;

var lengthStream$1 = {
  sphere: noop$1,
  point: noop$1,
  lineStart: lengthLineStart,
  lineEnd: noop$1,
  polygonStart: noop$1,
  polygonEnd: noop$1
};

function lengthLineStart() {
  lengthStream$1.point = lengthPointFirst$1;
  lengthStream$1.lineEnd = lengthLineEnd;
}

function lengthLineEnd() {
  lengthStream$1.point = lengthStream$1.lineEnd = noop$1;
}

function lengthPointFirst$1(lambda, phi) {
  lambda *= radians$1, phi *= radians$1;
  lambda0 = lambda, sinPhi0 = sin$2(phi), cosPhi0 = cos$2(phi);
  lengthStream$1.point = lengthPoint$1;
}

function lengthPoint$1(lambda, phi) {
  lambda *= radians$1, phi *= radians$1;
  var sinPhi = sin$2(phi),
      cosPhi = cos$2(phi),
      delta = abs$1(lambda - lambda0),
      cosDelta = cos$2(delta),
      sinDelta = sin$2(delta),
      x = cosPhi * sinDelta,
      y = cosPhi0 * sinPhi - sinPhi0 * cosPhi * cosDelta,
      z = sinPhi0 * sinPhi + cosPhi0 * cosPhi * cosDelta;
  lengthSum$1.add(atan2$2(sqrt$2(x * x + y * y), z));
  lambda0 = lambda, sinPhi0 = sinPhi, cosPhi0 = cosPhi;
}

function length(object) {
  lengthSum$1 = new Adder();
  geoStream(object, lengthStream$1);
  return +lengthSum$1;
}

var coordinates = [null, null],
    object = {type: "LineString", coordinates: coordinates};

function geoDistance(a, b) {
  coordinates[0] = a;
  coordinates[1] = b;
  return length(object);
}

var identity$2 = x => x;

var areaSum = new Adder(),
    areaRingSum = new Adder(),
    x00$2,
    y00$2,
    x0$3,
    y0$3;

var areaStream = {
  point: noop$1,
  lineStart: noop$1,
  lineEnd: noop$1,
  polygonStart: function() {
    areaStream.lineStart = areaRingStart;
    areaStream.lineEnd = areaRingEnd;
  },
  polygonEnd: function() {
    areaStream.lineStart = areaStream.lineEnd = areaStream.point = noop$1;
    areaSum.add(abs$1(areaRingSum));
    areaRingSum = new Adder();
  },
  result: function() {
    var area = areaSum / 2;
    areaSum = new Adder();
    return area;
  }
};

function areaRingStart() {
  areaStream.point = areaPointFirst;
}

function areaPointFirst(x, y) {
  areaStream.point = areaPoint;
  x00$2 = x0$3 = x, y00$2 = y0$3 = y;
}

function areaPoint(x, y) {
  areaRingSum.add(y0$3 * x - x0$3 * y);
  x0$3 = x, y0$3 = y;
}

function areaRingEnd() {
  areaPoint(x00$2, y00$2);
}

var x0$2 = Infinity,
    y0$2 = x0$2,
    x1 = -x0$2,
    y1 = x1;

var boundsStream = {
  point: boundsPoint,
  lineStart: noop$1,
  lineEnd: noop$1,
  polygonStart: noop$1,
  polygonEnd: noop$1,
  result: function() {
    var bounds = [[x0$2, y0$2], [x1, y1]];
    x1 = y1 = -(y0$2 = x0$2 = Infinity);
    return bounds;
  }
};

function boundsPoint(x, y) {
  if (x < x0$2) x0$2 = x;
  if (x > x1) x1 = x;
  if (y < y0$2) y0$2 = y;
  if (y > y1) y1 = y;
}

// TODO Enforce positive area for exterior, negative area for interior?

var X0 = 0,
    Y0 = 0,
    Z0 = 0,
    X1 = 0,
    Y1 = 0,
    Z1 = 0,
    X2 = 0,
    Y2 = 0,
    Z2 = 0,
    x00$1,
    y00$1,
    x0$1,
    y0$1;

var centroidStream = {
  point: centroidPoint,
  lineStart: centroidLineStart,
  lineEnd: centroidLineEnd,
  polygonStart: function() {
    centroidStream.lineStart = centroidRingStart;
    centroidStream.lineEnd = centroidRingEnd;
  },
  polygonEnd: function() {
    centroidStream.point = centroidPoint;
    centroidStream.lineStart = centroidLineStart;
    centroidStream.lineEnd = centroidLineEnd;
  },
  result: function() {
    var centroid = Z2 ? [X2 / Z2, Y2 / Z2]
        : Z1 ? [X1 / Z1, Y1 / Z1]
        : Z0 ? [X0 / Z0, Y0 / Z0]
        : [NaN, NaN];
    X0 = Y0 = Z0 =
    X1 = Y1 = Z1 =
    X2 = Y2 = Z2 = 0;
    return centroid;
  }
};

function centroidPoint(x, y) {
  X0 += x;
  Y0 += y;
  ++Z0;
}

function centroidLineStart() {
  centroidStream.point = centroidPointFirstLine;
}

function centroidPointFirstLine(x, y) {
  centroidStream.point = centroidPointLine;
  centroidPoint(x0$1 = x, y0$1 = y);
}

function centroidPointLine(x, y) {
  var dx = x - x0$1, dy = y - y0$1, z = sqrt$2(dx * dx + dy * dy);
  X1 += z * (x0$1 + x) / 2;
  Y1 += z * (y0$1 + y) / 2;
  Z1 += z;
  centroidPoint(x0$1 = x, y0$1 = y);
}

function centroidLineEnd() {
  centroidStream.point = centroidPoint;
}

function centroidRingStart() {
  centroidStream.point = centroidPointFirstRing;
}

function centroidRingEnd() {
  centroidPointRing(x00$1, y00$1);
}

function centroidPointFirstRing(x, y) {
  centroidStream.point = centroidPointRing;
  centroidPoint(x00$1 = x0$1 = x, y00$1 = y0$1 = y);
}

function centroidPointRing(x, y) {
  var dx = x - x0$1,
      dy = y - y0$1,
      z = sqrt$2(dx * dx + dy * dy);

  X1 += z * (x0$1 + x) / 2;
  Y1 += z * (y0$1 + y) / 2;
  Z1 += z;

  z = y0$1 * x - x0$1 * y;
  X2 += z * (x0$1 + x);
  Y2 += z * (y0$1 + y);
  Z2 += z * 3;
  centroidPoint(x0$1 = x, y0$1 = y);
}

function PathContext(context) {
  this._context = context;
}

PathContext.prototype = {
  _radius: 4.5,
  pointRadius: function(_) {
    return this._radius = _, this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line === 0) this._context.closePath();
    this._point = NaN;
  },
  point: function(x, y) {
    switch (this._point) {
      case 0: {
        this._context.moveTo(x, y);
        this._point = 1;
        break;
      }
      case 1: {
        this._context.lineTo(x, y);
        break;
      }
      default: {
        this._context.moveTo(x + this._radius, y);
        this._context.arc(x, y, this._radius, 0, tau$3);
        break;
      }
    }
  },
  result: noop$1
};

var lengthSum = new Adder(),
    lengthRing,
    x00,
    y00,
    x0,
    y0;

var lengthStream = {
  point: noop$1,
  lineStart: function() {
    lengthStream.point = lengthPointFirst;
  },
  lineEnd: function() {
    if (lengthRing) lengthPoint(x00, y00);
    lengthStream.point = noop$1;
  },
  polygonStart: function() {
    lengthRing = true;
  },
  polygonEnd: function() {
    lengthRing = null;
  },
  result: function() {
    var length = +lengthSum;
    lengthSum = new Adder();
    return length;
  }
};

function lengthPointFirst(x, y) {
  lengthStream.point = lengthPoint;
  x00 = x0 = x, y00 = y0 = y;
}

function lengthPoint(x, y) {
  x0 -= x, y0 -= y;
  lengthSum.add(sqrt$2(x0 * x0 + y0 * y0));
  x0 = x, y0 = y;
}

// Simple caching for constant-radius points.
let cacheDigits, cacheAppend, cacheRadius, cacheCircle;

class PathString {
  constructor(digits) {
    this._append = digits == null ? append$1 : appendRound$1(digits);
    this._radius = 4.5;
    this._ = "";
  }
  pointRadius(_) {
    this._radius = +_;
    return this;
  }
  polygonStart() {
    this._line = 0;
  }
  polygonEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    if (this._line === 0) this._ += "Z";
    this._point = NaN;
  }
  point(x, y) {
    switch (this._point) {
      case 0: {
        this._append`M${x},${y}`;
        this._point = 1;
        break;
      }
      case 1: {
        this._append`L${x},${y}`;
        break;
      }
      default: {
        this._append`M${x},${y}`;
        if (this._radius !== cacheRadius || this._append !== cacheAppend) {
          const r = this._radius;
          const s = this._;
          this._ = ""; // stash the old string so we can cache the circle path fragment
          this._append`m0,${r}a${r},${r} 0 1,1 0,${ -2 * r}a${r},${r} 0 1,1 0,${2 * r}z`;
          cacheRadius = r;
          cacheAppend = this._append;
          cacheCircle = this._;
          this._ = s;
        }
        this._ += cacheCircle;
        break;
      }
    }
  }
  result() {
    const result = this._;
    this._ = "";
    return result.length ? result : null;
  }
}

function append$1(strings) {
  let i = 1;
  this._ += strings[0];
  for (const j = strings.length; i < j; ++i) {
    this._ += arguments[i] + strings[i];
  }
}

function appendRound$1(digits) {
  const d = Math.floor(digits);
  if (!(d >= 0)) throw new RangeError(`invalid digits: ${digits}`);
  if (d > 15) return append$1;
  if (d !== cacheDigits) {
    const k = 10 ** d;
    cacheDigits = d;
    cacheAppend = function append(strings) {
      let i = 1;
      this._ += strings[0];
      for (const j = strings.length; i < j; ++i) {
        this._ += Math.round(arguments[i] * k) / k + strings[i];
      }
    };
  }
  return cacheAppend;
}

function geoPath(projection, context) {
  let digits = 3,
      pointRadius = 4.5,
      projectionStream,
      contextStream;

  function path(object) {
    if (object) {
      if (typeof pointRadius === "function") contextStream.pointRadius(+pointRadius.apply(this, arguments));
      geoStream(object, projectionStream(contextStream));
    }
    return contextStream.result();
  }

  path.area = function(object) {
    geoStream(object, projectionStream(areaStream));
    return areaStream.result();
  };

  path.measure = function(object) {
    geoStream(object, projectionStream(lengthStream));
    return lengthStream.result();
  };

  path.bounds = function(object) {
    geoStream(object, projectionStream(boundsStream));
    return boundsStream.result();
  };

  path.centroid = function(object) {
    geoStream(object, projectionStream(centroidStream));
    return centroidStream.result();
  };

  path.projection = function(_) {
    if (!arguments.length) return projection;
    projectionStream = _ == null ? (projection = null, identity$2) : (projection = _).stream;
    return path;
  };

  path.context = function(_) {
    if (!arguments.length) return context;
    contextStream = _ == null ? (context = null, new PathString(digits)) : new PathContext(context = _);
    if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
    return path;
  };

  path.pointRadius = function(_) {
    if (!arguments.length) return pointRadius;
    pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
    return path;
  };

  path.digits = function(_) {
    if (!arguments.length) return digits;
    if (_ == null) digits = null;
    else {
      const d = Math.floor(_);
      if (!(d >= 0)) throw new RangeError(`invalid digits: ${_}`);
      digits = d;
    }
    if (context === null) contextStream = new PathString(digits);
    return path;
  };

  return path.projection(projection).digits(digits).context(context);
}

function geoTransform(methods) {
  return {
    stream: transformer(methods)
  };
}

function transformer(methods) {
  return function(stream) {
    var s = new TransformStream;
    for (var key in methods) s[key] = methods[key];
    s.stream = stream;
    return s;
  };
}

function TransformStream() {}

TransformStream.prototype = {
  constructor: TransformStream,
  point: function(x, y) { this.stream.point(x, y); },
  sphere: function() { this.stream.sphere(); },
  lineStart: function() { this.stream.lineStart(); },
  lineEnd: function() { this.stream.lineEnd(); },
  polygonStart: function() { this.stream.polygonStart(); },
  polygonEnd: function() { this.stream.polygonEnd(); }
};

function fit(projection, fitBounds, object) {
  var clip = projection.clipExtent && projection.clipExtent();
  projection.scale(150).translate([0, 0]);
  if (clip != null) projection.clipExtent(null);
  geoStream(object, projection.stream(boundsStream));
  fitBounds(boundsStream.result());
  if (clip != null) projection.clipExtent(clip);
  return projection;
}

function fitExtent(projection, extent, object) {
  return fit(projection, function(b) {
    var w = extent[1][0] - extent[0][0],
        h = extent[1][1] - extent[0][1],
        k = Math.min(w / (b[1][0] - b[0][0]), h / (b[1][1] - b[0][1])),
        x = +extent[0][0] + (w - k * (b[1][0] + b[0][0])) / 2,
        y = +extent[0][1] + (h - k * (b[1][1] + b[0][1])) / 2;
    projection.scale(150 * k).translate([x, y]);
  }, object);
}

function fitSize(projection, size, object) {
  return fitExtent(projection, [[0, 0], size], object);
}

function fitWidth(projection, width, object) {
  return fit(projection, function(b) {
    var w = +width,
        k = w / (b[1][0] - b[0][0]),
        x = (w - k * (b[1][0] + b[0][0])) / 2,
        y = -k * b[0][1];
    projection.scale(150 * k).translate([x, y]);
  }, object);
}

function fitHeight(projection, height, object) {
  return fit(projection, function(b) {
    var h = +height,
        k = h / (b[1][1] - b[0][1]),
        x = -k * b[0][0],
        y = (h - k * (b[1][1] + b[0][1])) / 2;
    projection.scale(150 * k).translate([x, y]);
  }, object);
}

var maxDepth = 16, // maximum depth of subdivision
    cosMinDistance = cos$2(30 * radians$1); // cos(minimum angular distance)

function resample(project, delta2) {
  return +delta2 ? resample$1(project, delta2) : resampleNone(project);
}

function resampleNone(project) {
  return transformer({
    point: function(x, y) {
      x = project(x, y);
      this.stream.point(x[0], x[1]);
    }
  });
}

function resample$1(project, delta2) {

  function resampleLineTo(x0, y0, lambda0, a0, b0, c0, x1, y1, lambda1, a1, b1, c1, depth, stream) {
    var dx = x1 - x0,
        dy = y1 - y0,
        d2 = dx * dx + dy * dy;
    if (d2 > 4 * delta2 && depth--) {
      var a = a0 + a1,
          b = b0 + b1,
          c = c0 + c1,
          m = sqrt$2(a * a + b * b + c * c),
          phi2 = asin$2(c /= m),
          lambda2 = abs$1(abs$1(c) - 1) < epsilon$4 || abs$1(lambda0 - lambda1) < epsilon$4 ? (lambda0 + lambda1) / 2 : atan2$2(b, a),
          p = project(lambda2, phi2),
          x2 = p[0],
          y2 = p[1],
          dx2 = x2 - x0,
          dy2 = y2 - y0,
          dz = dy * dx2 - dx * dy2;
      if (dz * dz / d2 > delta2 // perpendicular projected distance
          || abs$1((dx * dx2 + dy * dy2) / d2 - 0.5) > 0.3 // midpoint close to an end
          || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) { // angular distance
        resampleLineTo(x0, y0, lambda0, a0, b0, c0, x2, y2, lambda2, a /= m, b /= m, c, depth, stream);
        stream.point(x2, y2);
        resampleLineTo(x2, y2, lambda2, a, b, c, x1, y1, lambda1, a1, b1, c1, depth, stream);
      }
    }
  }
  return function(stream) {
    var lambda00, x00, y00, a00, b00, c00, // first point
        lambda0, x0, y0, a0, b0, c0; // previous point

    var resampleStream = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() { stream.polygonStart(); resampleStream.lineStart = ringStart; },
      polygonEnd: function() { stream.polygonEnd(); resampleStream.lineStart = lineStart; }
    };

    function point(x, y) {
      x = project(x, y);
      stream.point(x[0], x[1]);
    }

    function lineStart() {
      x0 = NaN;
      resampleStream.point = linePoint;
      stream.lineStart();
    }

    function linePoint(lambda, phi) {
      var c = cartesian$1([lambda, phi]), p = project(lambda, phi);
      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x0 = p[0], y0 = p[1], lambda0 = lambda, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
      stream.point(x0, y0);
    }

    function lineEnd() {
      resampleStream.point = point;
      stream.lineEnd();
    }

    function ringStart() {
      lineStart();
      resampleStream.point = ringPoint;
      resampleStream.lineEnd = ringEnd;
    }

    function ringPoint(lambda, phi) {
      linePoint(lambda00 = lambda, phi), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
      resampleStream.point = linePoint;
    }

    function ringEnd() {
      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x00, y00, lambda00, a00, b00, c00, maxDepth, stream);
      resampleStream.lineEnd = lineEnd;
      lineEnd();
    }

    return resampleStream;
  };
}

var transformRadians = transformer({
  point: function(x, y) {
    this.stream.point(x * radians$1, y * radians$1);
  }
});

function transformRotate(rotate) {
  return transformer({
    point: function(x, y) {
      var r = rotate(x, y);
      return this.stream.point(r[0], r[1]);
    }
  });
}

function scaleTranslate(k, dx, dy, sx, sy) {
  function transform(x, y) {
    x *= sx; y *= sy;
    return [dx + k * x, dy - k * y];
  }
  transform.invert = function(x, y) {
    return [(x - dx) / k * sx, (dy - y) / k * sy];
  };
  return transform;
}

function scaleTranslateRotate(k, dx, dy, sx, sy, alpha) {
  if (!alpha) return scaleTranslate(k, dx, dy, sx, sy);
  var cosAlpha = cos$2(alpha),
      sinAlpha = sin$2(alpha),
      a = cosAlpha * k,
      b = sinAlpha * k,
      ai = cosAlpha / k,
      bi = sinAlpha / k,
      ci = (sinAlpha * dy - cosAlpha * dx) / k,
      fi = (sinAlpha * dx + cosAlpha * dy) / k;
  function transform(x, y) {
    x *= sx; y *= sy;
    return [a * x - b * y + dx, dy - b * x - a * y];
  }
  transform.invert = function(x, y) {
    return [sx * (ai * x - bi * y + ci), sy * (fi - bi * x - ai * y)];
  };
  return transform;
}

function projection(project) {
  return projectionMutator(function() { return project; })();
}

function projectionMutator(projectAt) {
  var project,
      k = 150, // scale
      x = 480, y = 250, // translate
      lambda = 0, phi = 0, // center
      deltaLambda = 0, deltaPhi = 0, deltaGamma = 0, rotate, // pre-rotate
      alpha = 0, // post-rotate angle
      sx = 1, // reflectX
      sy = 1, // reflectX
      theta = null, preclip = clipAntimeridian, // pre-clip angle
      x0 = null, y0, x1, y1, postclip = identity$2, // post-clip extent
      delta2 = 0.5, // precision
      projectResample,
      projectTransform,
      projectRotateTransform,
      cache,
      cacheStream;

  function projection(point) {
    return projectRotateTransform(point[0] * radians$1, point[1] * radians$1);
  }

  function invert(point) {
    point = projectRotateTransform.invert(point[0], point[1]);
    return point && [point[0] * degrees$1, point[1] * degrees$1];
  }

  projection.stream = function(stream) {
    return cache && cacheStream === stream ? cache : cache = transformRadians(transformRotate(rotate)(preclip(projectResample(postclip(cacheStream = stream)))));
  };

  projection.preclip = function(_) {
    return arguments.length ? (preclip = _, theta = undefined, reset()) : preclip;
  };

  projection.postclip = function(_) {
    return arguments.length ? (postclip = _, x0 = y0 = x1 = y1 = null, reset()) : postclip;
  };

  projection.clipAngle = function(_) {
    return arguments.length ? (preclip = +_ ? clipCircle(theta = _ * radians$1) : (theta = null, clipAntimeridian), reset()) : theta * degrees$1;
  };

  projection.clipExtent = function(_) {
    return arguments.length ? (postclip = _ == null ? (x0 = y0 = x1 = y1 = null, identity$2) : clipRectangle(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reset()) : x0 == null ? null : [[x0, y0], [x1, y1]];
  };

  projection.scale = function(_) {
    return arguments.length ? (k = +_, recenter()) : k;
  };

  projection.translate = function(_) {
    return arguments.length ? (x = +_[0], y = +_[1], recenter()) : [x, y];
  };

  projection.center = function(_) {
    return arguments.length ? (lambda = _[0] % 360 * radians$1, phi = _[1] % 360 * radians$1, recenter()) : [lambda * degrees$1, phi * degrees$1];
  };

  projection.rotate = function(_) {
    return arguments.length ? (deltaLambda = _[0] % 360 * radians$1, deltaPhi = _[1] % 360 * radians$1, deltaGamma = _.length > 2 ? _[2] % 360 * radians$1 : 0, recenter()) : [deltaLambda * degrees$1, deltaPhi * degrees$1, deltaGamma * degrees$1];
  };

  projection.angle = function(_) {
    return arguments.length ? (alpha = _ % 360 * radians$1, recenter()) : alpha * degrees$1;
  };

  projection.reflectX = function(_) {
    return arguments.length ? (sx = _ ? -1 : 1, recenter()) : sx < 0;
  };

  projection.reflectY = function(_) {
    return arguments.length ? (sy = _ ? -1 : 1, recenter()) : sy < 0;
  };

  projection.precision = function(_) {
    return arguments.length ? (projectResample = resample(projectTransform, delta2 = _ * _), reset()) : sqrt$2(delta2);
  };

  projection.fitExtent = function(extent, object) {
    return fitExtent(projection, extent, object);
  };

  projection.fitSize = function(size, object) {
    return fitSize(projection, size, object);
  };

  projection.fitWidth = function(width, object) {
    return fitWidth(projection, width, object);
  };

  projection.fitHeight = function(height, object) {
    return fitHeight(projection, height, object);
  };

  function recenter() {
    var center = scaleTranslateRotate(k, 0, 0, sx, sy, alpha).apply(null, project(lambda, phi)),
        transform = scaleTranslateRotate(k, x - center[0], y - center[1], sx, sy, alpha);
    rotate = rotateRadians(deltaLambda, deltaPhi, deltaGamma);
    projectTransform = compose(project, transform);
    projectRotateTransform = compose(rotate, projectTransform);
    projectResample = resample(projectTransform, delta2);
    return reset();
  }

  function reset() {
    cache = cacheStream = null;
    return projection;
  }

  return function() {
    project = projectAt.apply(this, arguments);
    projection.invert = project.invert && invert;
    return recenter();
  };
}

function azimuthalInvert(angle) {
  return function(x, y) {
    var z = sqrt$2(x * x + y * y),
        c = angle(z),
        sc = sin$2(c),
        cc = cos$2(c);
    return [
      atan2$2(x * sc, z * cc),
      asin$2(z && y * sc / z)
    ];
  }
}

function stereographicRaw(x, y) {
  var cy = cos$2(y), k = 1 + cos$2(x) * cy;
  return [cy * sin$2(x) / k, sin$2(y) / k];
}

stereographicRaw.invert = azimuthalInvert(function(z) {
  return 2 * atan(z);
});

function geoStereographic() {
  return projection(stereographicRaw)
      .scale(250)
      .clipAngle(142);
}

const pi$2 = Math.PI,
    tau$2 = 2 * pi$2,
    epsilon$3 = 1e-6,
    tauEpsilon = tau$2 - epsilon$3;

function append(strings) {
  this._ += strings[0];
  for (let i = 1, n = strings.length; i < n; ++i) {
    this._ += arguments[i] + strings[i];
  }
}

function appendRound(digits) {
  let d = Math.floor(digits);
  if (!(d >= 0)) throw new Error(`invalid digits: ${digits}`);
  if (d > 15) return append;
  const k = 10 ** d;
  return function(strings) {
    this._ += strings[0];
    for (let i = 1, n = strings.length; i < n; ++i) {
      this._ += Math.round(arguments[i] * k) / k + strings[i];
    }
  };
}

let Path$1 = class Path {
  constructor(digits) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null; // end of current subpath
    this._ = "";
    this._append = digits == null ? append : appendRound(digits);
  }
  moveTo(x, y) {
    this._append`M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}`;
  }
  closePath() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._append`Z`;
    }
  }
  lineTo(x, y) {
    this._append`L${this._x1 = +x},${this._y1 = +y}`;
  }
  quadraticCurveTo(x1, y1, x, y) {
    this._append`Q${+x1},${+y1},${this._x1 = +x},${this._y1 = +y}`;
  }
  bezierCurveTo(x1, y1, x2, y2, x, y) {
    this._append`C${+x1},${+y1},${+x2},${+y2},${this._x1 = +x},${this._y1 = +y}`;
  }
  arcTo(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;

    // Is the radius negative? Error.
    if (r < 0) throw new Error(`negative radius: ${r}`);

    let x0 = this._x1,
        y0 = this._y1,
        x21 = x2 - x1,
        y21 = y2 - y1,
        x01 = x0 - x1,
        y01 = y0 - y1,
        l01_2 = x01 * x01 + y01 * y01;

    // Is this path empty? Move to (x1,y1).
    if (this._x1 === null) {
      this._append`M${this._x1 = x1},${this._y1 = y1}`;
    }

    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
    else if (!(l01_2 > epsilon$3));

    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
    // Equivalently, is (x1,y1) coincident with (x2,y2)?
    // Or, is the radius zero? Line to (x1,y1).
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon$3) || !r) {
      this._append`L${this._x1 = x1},${this._y1 = y1}`;
    }

    // Otherwise, draw an arc!
    else {
      let x20 = x2 - x0,
          y20 = y2 - y0,
          l21_2 = x21 * x21 + y21 * y21,
          l20_2 = x20 * x20 + y20 * y20,
          l21 = Math.sqrt(l21_2),
          l01 = Math.sqrt(l01_2),
          l = r * Math.tan((pi$2 - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
          t01 = l / l01,
          t21 = l / l21;

      // If the start tangent is not coincident with (x0,y0), line to.
      if (Math.abs(t01 - 1) > epsilon$3) {
        this._append`L${x1 + t01 * x01},${y1 + t01 * y01}`;
      }

      this._append`A${r},${r},0,0,${+(y01 * x20 > x01 * y20)},${this._x1 = x1 + t21 * x21},${this._y1 = y1 + t21 * y21}`;
    }
  }
  arc(x, y, r, a0, a1, ccw) {
    x = +x, y = +y, r = +r, ccw = !!ccw;

    // Is the radius negative? Error.
    if (r < 0) throw new Error(`negative radius: ${r}`);

    let dx = r * Math.cos(a0),
        dy = r * Math.sin(a0),
        x0 = x + dx,
        y0 = y + dy,
        cw = 1 ^ ccw,
        da = ccw ? a0 - a1 : a1 - a0;

    // Is this path empty? Move to (x0,y0).
    if (this._x1 === null) {
      this._append`M${x0},${y0}`;
    }

    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
    else if (Math.abs(this._x1 - x0) > epsilon$3 || Math.abs(this._y1 - y0) > epsilon$3) {
      this._append`L${x0},${y0}`;
    }

    // Is this arc empty? We’re done.
    if (!r) return;

    // Does the angle go the wrong way? Flip the direction.
    if (da < 0) da = da % tau$2 + tau$2;

    // Is this a complete circle? Draw two arcs to complete the circle.
    if (da > tauEpsilon) {
      this._append`A${r},${r},0,1,${cw},${x - dx},${y - dy}A${r},${r},0,1,${cw},${this._x1 = x0},${this._y1 = y0}`;
    }

    // Is this arc non-empty? Draw an arc!
    else if (da > epsilon$3) {
      this._append`A${r},${r},0,${+(da >= pi$2)},${cw},${this._x1 = x + r * Math.cos(a1)},${this._y1 = y + r * Math.sin(a1)}`;
    }
  }
  rect(x, y, w, h) {
    this._append`M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}h${w = +w}v${+h}h${-w}Z`;
  }
  toString() {
    return this._;
  }
};

function path() {
  return new Path$1;
}

// Allow instanceof d3.path
path.prototype = Path$1.prototype;

function constant(x) {
  return function constant() {
    return x;
  };
}

const abs = Math.abs;
const atan2$1 = Math.atan2;
const cos$1 = Math.cos;
const max$1 = Math.max;
const min$1 = Math.min;
const sin$1 = Math.sin;
const sqrt$1 = Math.sqrt;

const epsilon$2 = 1e-12;
const pi$1 = Math.PI;
const halfPi$1 = pi$1 / 2;
const tau$1 = 2 * pi$1;

function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi$1 : Math.acos(x);
}

function asin$1(x) {
  return x >= 1 ? halfPi$1 : x <= -1 ? -halfPi$1 : Math.asin(x);
}

function withPath(shape) {
  let digits = 3;

  shape.digits = function(_) {
    if (!arguments.length) return digits;
    if (_ == null) {
      digits = null;
    } else {
      const d = Math.floor(_);
      if (!(d >= 0)) throw new RangeError(`invalid digits: ${_}`);
      digits = d;
    }
    return shape;
  };

  return () => new Path$1(digits);
}

function arcInnerRadius(d) {
  return d.innerRadius;
}

function arcOuterRadius(d) {
  return d.outerRadius;
}

function arcStartAngle(d) {
  return d.startAngle;
}

function arcEndAngle(d) {
  return d.endAngle;
}

function arcPadAngle(d) {
  return d && d.padAngle; // Note: optional!
}

function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
  var x10 = x1 - x0, y10 = y1 - y0,
      x32 = x3 - x2, y32 = y3 - y2,
      t = y32 * x10 - x32 * y10;
  if (t * t < epsilon$2) return;
  t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / t;
  return [x0 + t * x10, y0 + t * y10];
}

// Compute perpendicular offset line of length rc.
// http://mathworld.wolfram.com/Circle-LineIntersection.html
function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
  var x01 = x0 - x1,
      y01 = y0 - y1,
      lo = (cw ? rc : -rc) / sqrt$1(x01 * x01 + y01 * y01),
      ox = lo * y01,
      oy = -lo * x01,
      x11 = x0 + ox,
      y11 = y0 + oy,
      x10 = x1 + ox,
      y10 = y1 + oy,
      x00 = (x11 + x10) / 2,
      y00 = (y11 + y10) / 2,
      dx = x10 - x11,
      dy = y10 - y11,
      d2 = dx * dx + dy * dy,
      r = r1 - rc,
      D = x11 * y10 - x10 * y11,
      d = (dy < 0 ? -1 : 1) * sqrt$1(max$1(0, r * r * d2 - D * D)),
      cx0 = (D * dy - dx * d) / d2,
      cy0 = (-D * dx - dy * d) / d2,
      cx1 = (D * dy + dx * d) / d2,
      cy1 = (-D * dx + dy * d) / d2,
      dx0 = cx0 - x00,
      dy0 = cy0 - y00,
      dx1 = cx1 - x00,
      dy1 = cy1 - y00;

  // Pick the closer of the two intersection points.
  // TODO Is there a faster way to determine which intersection to use?
  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;

  return {
    cx: cx0,
    cy: cy0,
    x01: -ox,
    y01: -oy,
    x11: cx0 * (r1 / r - 1),
    y11: cy0 * (r1 / r - 1)
  };
}

function arc() {
  var innerRadius = arcInnerRadius,
      outerRadius = arcOuterRadius,
      cornerRadius = constant(0),
      padRadius = null,
      startAngle = arcStartAngle,
      endAngle = arcEndAngle,
      padAngle = arcPadAngle,
      context = null,
      path = withPath(arc);

  function arc() {
    var buffer,
        r,
        r0 = +innerRadius.apply(this, arguments),
        r1 = +outerRadius.apply(this, arguments),
        a0 = startAngle.apply(this, arguments) - halfPi$1,
        a1 = endAngle.apply(this, arguments) - halfPi$1,
        da = abs(a1 - a0),
        cw = a1 > a0;

    if (!context) context = buffer = path();

    // Ensure that the outer radius is always larger than the inner radius.
    if (r1 < r0) r = r1, r1 = r0, r0 = r;

    // Is it a point?
    if (!(r1 > epsilon$2)) context.moveTo(0, 0);

    // Or is it a circle or annulus?
    else if (da > tau$1 - epsilon$2) {
      context.moveTo(r1 * cos$1(a0), r1 * sin$1(a0));
      context.arc(0, 0, r1, a0, a1, !cw);
      if (r0 > epsilon$2) {
        context.moveTo(r0 * cos$1(a1), r0 * sin$1(a1));
        context.arc(0, 0, r0, a1, a0, cw);
      }
    }

    // Or is it a circular or annular sector?
    else {
      var a01 = a0,
          a11 = a1,
          a00 = a0,
          a10 = a1,
          da0 = da,
          da1 = da,
          ap = padAngle.apply(this, arguments) / 2,
          rp = (ap > epsilon$2) && (padRadius ? +padRadius.apply(this, arguments) : sqrt$1(r0 * r0 + r1 * r1)),
          rc = min$1(abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
          rc0 = rc,
          rc1 = rc,
          t0,
          t1;

      // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
      if (rp > epsilon$2) {
        var p0 = asin$1(rp / r0 * sin$1(ap)),
            p1 = asin$1(rp / r1 * sin$1(ap));
        if ((da0 -= p0 * 2) > epsilon$2) p0 *= (cw ? 1 : -1), a00 += p0, a10 -= p0;
        else da0 = 0, a00 = a10 = (a0 + a1) / 2;
        if ((da1 -= p1 * 2) > epsilon$2) p1 *= (cw ? 1 : -1), a01 += p1, a11 -= p1;
        else da1 = 0, a01 = a11 = (a0 + a1) / 2;
      }

      var x01 = r1 * cos$1(a01),
          y01 = r1 * sin$1(a01),
          x10 = r0 * cos$1(a10),
          y10 = r0 * sin$1(a10);

      // Apply rounded corners?
      if (rc > epsilon$2) {
        var x11 = r1 * cos$1(a11),
            y11 = r1 * sin$1(a11),
            x00 = r0 * cos$1(a00),
            y00 = r0 * sin$1(a00),
            oc;

        // Restrict the corner radius according to the sector angle. If this
        // intersection fails, it’s probably because the arc is too small, so
        // disable the corner radius entirely.
        if (da < pi$1) {
          if (oc = intersect(x01, y01, x00, y00, x11, y11, x10, y10)) {
            var ax = x01 - oc[0],
                ay = y01 - oc[1],
                bx = x11 - oc[0],
                by = y11 - oc[1],
                kc = 1 / sin$1(acos((ax * bx + ay * by) / (sqrt$1(ax * ax + ay * ay) * sqrt$1(bx * bx + by * by))) / 2),
                lc = sqrt$1(oc[0] * oc[0] + oc[1] * oc[1]);
            rc0 = min$1(rc, (r0 - lc) / (kc - 1));
            rc1 = min$1(rc, (r1 - lc) / (kc + 1));
          } else {
            rc0 = rc1 = 0;
          }
        }
      }

      // Is the sector collapsed to a line?
      if (!(da1 > epsilon$2)) context.moveTo(x01, y01);

      // Does the sector’s outer ring have rounded corners?
      else if (rc1 > epsilon$2) {
        t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
        t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);

        context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, atan2$1(t0.y01, t0.x01), atan2$1(t1.y01, t1.x01), !cw);

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc1, atan2$1(t0.y01, t0.x01), atan2$1(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r1, atan2$1(t0.cy + t0.y11, t0.cx + t0.x11), atan2$1(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
          context.arc(t1.cx, t1.cy, rc1, atan2$1(t1.y11, t1.x11), atan2$1(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the outer ring just a circular arc?
      else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);

      // Is there no inner ring, and it’s a circular sector?
      // Or perhaps it’s an annular sector collapsed due to padding?
      if (!(r0 > epsilon$2) || !(da0 > epsilon$2)) context.lineTo(x10, y10);

      // Does the sector’s inner ring (or point) have rounded corners?
      else if (rc0 > epsilon$2) {
        t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
        t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);

        context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, atan2$1(t0.y01, t0.x01), atan2$1(t1.y01, t1.x01), !cw);

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc0, atan2$1(t0.y01, t0.x01), atan2$1(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r0, atan2$1(t0.cy + t0.y11, t0.cx + t0.x11), atan2$1(t1.cy + t1.y11, t1.cx + t1.x11), cw);
          context.arc(t1.cx, t1.cy, rc0, atan2$1(t1.y11, t1.x11), atan2$1(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the inner ring just a circular arc?
      else context.arc(0, 0, r0, a10, a00, cw);
    }

    context.closePath();

    if (buffer) return context = null, buffer + "" || null;
  }

  arc.centroid = function() {
    var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
        a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi$1 / 2;
    return [cos$1(a) * r, sin$1(a) * r];
  };

  arc.innerRadius = function(_) {
    return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant(+_), arc) : innerRadius;
  };

  arc.outerRadius = function(_) {
    return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant(+_), arc) : outerRadius;
  };

  arc.cornerRadius = function(_) {
    return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant(+_), arc) : cornerRadius;
  };

  arc.padRadius = function(_) {
    return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant(+_), arc) : padRadius;
  };

  arc.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), arc) : startAngle;
  };

  arc.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), arc) : endAngle;
  };

  arc.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), arc) : padAngle;
  };

  arc.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), arc) : context;
  };

  return arc;
}

function array(x) {
  return typeof x === "object" && "length" in x
    ? x // Array, TypedArray, NodeList, array-like
    : Array.from(x); // Map, Set, iterable, string, or anything else
}

function Linear(context) {
  this._context = context;
}

Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // falls through
      default: this._context.lineTo(x, y); break;
    }
  }
};

function curveLinear(context) {
  return new Linear(context);
}

function x(p) {
  return p[0];
}

function y(p) {
  return p[1];
}

function line(x$1, y$1) {
  var defined = constant(true),
      context = null,
      curve = curveLinear,
      output = null,
      path = withPath(line);

  x$1 = typeof x$1 === "function" ? x$1 : (x$1 === undefined) ? x : constant(x$1);
  y$1 = typeof y$1 === "function" ? y$1 : (y$1 === undefined) ? y : constant(y$1);

  function line(data) {
    var i,
        n = (data = array(data)).length,
        d,
        defined0 = false,
        buffer;

    if (context == null) output = curve(buffer = path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) output.lineStart();
        else output.lineEnd();
      }
      if (defined0) output.point(+x$1(d, i, data), +y$1(d, i, data));
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  line.x = function(_) {
    return arguments.length ? (x$1 = typeof _ === "function" ? _ : constant(+_), line) : x$1;
  };

  line.y = function(_) {
    return arguments.length ? (y$1 = typeof _ === "function" ? _ : constant(+_), line) : y$1;
  };

  line.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), line) : defined;
  };

  line.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };

  line.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };

  return line;
}

function descending(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}

function identity$1(d) {
  return d;
}

function pie() {
  var value = identity$1,
      sortValues = descending,
      sort = null,
      startAngle = constant(0),
      endAngle = constant(tau$1),
      padAngle = constant(0);

  function pie(data) {
    var i,
        n = (data = array(data)).length,
        j,
        k,
        sum = 0,
        index = new Array(n),
        arcs = new Array(n),
        a0 = +startAngle.apply(this, arguments),
        da = Math.min(tau$1, Math.max(-tau$1, endAngle.apply(this, arguments) - a0)),
        a1,
        p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)),
        pa = p * (da < 0 ? -1 : 1),
        v;

    for (i = 0; i < n; ++i) {
      if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) {
        sum += v;
      }
    }

    // Optionally sort the arcs by previously-computed values or by data.
    if (sortValues != null) index.sort(function(i, j) { return sortValues(arcs[i], arcs[j]); });
    else if (sort != null) index.sort(function(i, j) { return sort(data[i], data[j]); });

    // Compute the arcs! They are stored in the original data's order.
    for (i = 0, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1) {
      j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k : 0) + pa, arcs[j] = {
        data: data[j],
        index: i,
        value: v,
        startAngle: a0,
        endAngle: a1,
        padAngle: p
      };
    }

    return arcs;
  }

  pie.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), pie) : value;
  };

  pie.sortValues = function(_) {
    return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
  };

  pie.sort = function(_) {
    return arguments.length ? (sort = _, sortValues = null, pie) : sort;
  };

  pie.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), pie) : startAngle;
  };

  pie.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), pie) : endAngle;
  };

  pie.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), pie) : padAngle;
  };

  return pie;
}

var curveRadialLinear = curveRadial(curveLinear);

function Radial(curve) {
  this._curve = curve;
}

Radial.prototype = {
  areaStart: function() {
    this._curve.areaStart();
  },
  areaEnd: function() {
    this._curve.areaEnd();
  },
  lineStart: function() {
    this._curve.lineStart();
  },
  lineEnd: function() {
    this._curve.lineEnd();
  },
  point: function(a, r) {
    this._curve.point(r * Math.sin(a), r * -Math.cos(a));
  }
};

function curveRadial(curve) {

  function radial(context) {
    return new Radial(curve(context));
  }

  radial._curve = curve;

  return radial;
}

function lineRadial(l) {
  var c = l.curve;

  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;

  l.curve = function(_) {
    return arguments.length ? c(curveRadial(_)) : c()._curve;
  };

  return l;
}

function lineRadial$1() {
  return lineRadial(line().curve(curveRadialLinear));
}

function pointRadial(x, y) {
  return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
}

class Bump {
  constructor(context, x) {
    this._context = context;
    this._x = x;
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  }
  point(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: {
        this._point = 1;
        if (this._line) this._context.lineTo(x, y);
        else this._context.moveTo(x, y);
        break;
      }
      case 1: this._point = 2; // falls through
      default: {
        if (this._x) this._context.bezierCurveTo(this._x0 = (this._x0 + x) / 2, this._y0, this._x0, y, x, y);
        else this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + y) / 2, x, this._y0, x, y);
        break;
      }
    }
    this._x0 = x, this._y0 = y;
  }
}

function bumpX(context) {
  return new Bump(context, true);
}

function bumpY(context) {
  return new Bump(context, false);
}

function noop() {}

function point$1(that, x, y) {
  that._context.bezierCurveTo(
    that._x1 + that._k * (that._x2 - that._x0),
    that._y1 + that._k * (that._y2 - that._y0),
    that._x2 + that._k * (that._x1 - x),
    that._y2 + that._k * (that._y1 - y),
    that._x2,
    that._y2
  );
}

function Cardinal(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

Cardinal.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: point$1(this, this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; this._x1 = x, this._y1 = y; break;
      case 2: this._point = 3; // falls through
      default: point$1(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

((function custom(tension) {

  function cardinal(context) {
    return new Cardinal(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
}))(0);

function point(that, x, y) {
  var x1 = that._x1,
      y1 = that._y1,
      x2 = that._x2,
      y2 = that._y2;

  if (that._l01_a > epsilon$2) {
    var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a,
        n = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
    y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
  }

  if (that._l23_a > epsilon$2) {
    var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a,
        m = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
    y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
  }

  that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
}

function CatmullRom(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRom.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: this.point(this._x2, this._y2); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; // falls through
      default: point(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var curveCatmullRom = (function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
})(0.5);

function LinearClosed(context) {
  this._context = context;
}

LinearClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._point) this._context.closePath();
  },
  point: function(x, y) {
    x = +x, y = +y;
    if (this._point) this._context.lineTo(x, y);
    else this._point = 1, this._context.moveTo(x, y);
  }
};

function curveLinearClosed(context) {
  return new LinearClosed(context);
}

function stackOffsetNone(series, order) {
  if (!((n = series.length) > 1)) return;
  for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
    s0 = s1, s1 = series[order[i]];
    for (j = 0; j < m; ++j) {
      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
    }
  }
}

function none(series) {
  var n = series.length, o = new Array(n);
  while (--n >= 0) o[n] = n;
  return o;
}

function stackValue(d, key) {
  return d[key];
}

function stackSeries(key) {
  const series = [];
  series.key = key;
  return series;
}

function stack() {
  var keys = constant([]),
      order = none,
      offset = stackOffsetNone,
      value = stackValue;

  function stack(data) {
    var sz = Array.from(keys.apply(this, arguments), stackSeries),
        i, n = sz.length, j = -1,
        oz;

    for (const d of data) {
      for (i = 0, ++j; i < n; ++i) {
        (sz[i][j] = [0, +value(d, sz[i].key, j, data)]).data = d;
      }
    }

    for (i = 0, oz = array(order(sz)); i < n; ++i) {
      sz[oz[i]].index = i;
    }

    offset(sz, oz);
    return sz;
  }

  stack.keys = function(_) {
    return arguments.length ? (keys = typeof _ === "function" ? _ : constant(Array.from(_)), stack) : keys;
  };

  stack.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), stack) : value;
  };

  stack.order = function(_) {
    return arguments.length ? (order = _ == null ? none : typeof _ === "function" ? _ : constant(Array.from(_)), stack) : order;
  };

  stack.offset = function(_) {
    return arguments.length ? (offset = _ == null ? stackOffsetNone : _, stack) : offset;
  };

  return stack;
}

function stackOffsetExpand(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var i, n, j = 0, m = series[0].length, y; j < m; ++j) {
    for (y = i = 0; i < n; ++i) y += series[i][j][1] || 0;
    if (y) for (i = 0; i < n; ++i) series[i][j][1] /= y;
  }
  stackOffsetNone(series, order);
}

function stackOffsetDiverging(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var i, j = 0, d, dy, yp, yn, n, m = series[order[0]].length; j < m; ++j) {
    for (yp = yn = 0, i = 0; i < n; ++i) {
      if ((dy = (d = series[order[i]][j])[1] - d[0]) > 0) {
        d[0] = yp, d[1] = yp += dy;
      } else if (dy < 0) {
        d[1] = yn, d[0] = yn += dy;
      } else {
        d[0] = 0, d[1] = dy;
      }
    }
  }
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike) {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

/**
 * de Casteljau's algorithm for drawing and splitting bezier curves.
 * Inspired by https://pomax.github.io/bezierinfo/
 *
 * @param {Number[][]} points Array of [x,y] points: [start, control1, control2, ..., end]
 *   The original segment to split.
 * @param {Number} t Where to split the curve (value between [0, 1])
 * @return {Object} An object { left, right } where left is the segment from 0..t and
 *   right is the segment from t..1.
 */
function decasteljau(points, t) {
  var left = [];
  var right = [];

  function decasteljauRecurse(points, t) {
    if (points.length === 1) {
      left.push(points[0]);
      right.push(points[0]);
    } else {
      var newPoints = Array(points.length - 1);

      for (var i = 0; i < newPoints.length; i++) {
        if (i === 0) {
          left.push(points[0]);
        }

        if (i === newPoints.length - 1) {
          right.push(points[i + 1]);
        }

        newPoints[i] = [(1 - t) * points[i][0] + t * points[i + 1][0], (1 - t) * points[i][1] + t * points[i + 1][1]];
      }

      decasteljauRecurse(newPoints, t);
    }
  }

  if (points.length) {
    decasteljauRecurse(points, t);
  }

  return {
    left: left,
    right: right.reverse()
  };
}
/**
 * Convert segments represented as points back into a command object
 *
 * @param {Number[][]} points Array of [x,y] points: [start, control1, control2, ..., end]
 *   Represents a segment
 * @return {Object} A command object representing the segment.
 */


function pointsToCommand(points) {
  var command = {};

  if (points.length === 4) {
    command.x2 = points[2][0];
    command.y2 = points[2][1];
  }

  if (points.length >= 3) {
    command.x1 = points[1][0];
    command.y1 = points[1][1];
  }

  command.x = points[points.length - 1][0];
  command.y = points[points.length - 1][1];

  if (points.length === 4) {
    // start, control1, control2, end
    command.type = 'C';
  } else if (points.length === 3) {
    // start, control, end
    command.type = 'Q';
  } else {
    // start, end
    command.type = 'L';
  }

  return command;
}
/**
 * Runs de Casteljau's algorithm enough times to produce the desired number of segments.
 *
 * @param {Number[][]} points Array of [x,y] points for de Casteljau (the initial segment to split)
 * @param {Number} segmentCount Number of segments to split the original into
 * @return {Number[][][]} Array of segments
 */


function splitCurveAsPoints(points, segmentCount) {
  segmentCount = segmentCount || 2;
  var segments = [];
  var remainingCurve = points;
  var tIncrement = 1 / segmentCount; // x-----x-----x-----x
  // t=  0.33   0.66   1
  // x-----o-----------x
  // r=  0.33
  //       x-----o-----x
  // r=         0.5  (0.33 / (1 - 0.33))  === tIncrement / (1 - (tIncrement * (i - 1))
  // x-----x-----x-----x----x
  // t=  0.25   0.5   0.75  1
  // x-----o----------------x
  // r=  0.25
  //       x-----o----------x
  // r=         0.33  (0.25 / (1 - 0.25))
  //             x-----o----x
  // r=         0.5  (0.25 / (1 - 0.5))

  for (var i = 0; i < segmentCount - 1; i++) {
    var tRelative = tIncrement / (1 - tIncrement * i);
    var split = decasteljau(remainingCurve, tRelative);
    segments.push(split.left);
    remainingCurve = split.right;
  } // last segment is just to the end from the last point


  segments.push(remainingCurve);
  return segments;
}
/**
 * Convert command objects to arrays of points, run de Casteljau's algorithm on it
 * to split into to the desired number of segments.
 *
 * @param {Object} commandStart The start command object
 * @param {Object} commandEnd The end command object
 * @param {Number} segmentCount The number of segments to create
 * @return {Object[]} An array of commands representing the segments in sequence
 */


function splitCurve(commandStart, commandEnd, segmentCount) {
  var points = [[commandStart.x, commandStart.y]];

  if (commandEnd.x1 != null) {
    points.push([commandEnd.x1, commandEnd.y1]);
  }

  if (commandEnd.x2 != null) {
    points.push([commandEnd.x2, commandEnd.y2]);
  }

  points.push([commandEnd.x, commandEnd.y]);
  return splitCurveAsPoints(points, segmentCount).map(pointsToCommand);
}

var commandTokenRegex = /[MLCSTQAHVZmlcstqahv]|-?[\d.e+-]+/g;
/**
 * List of params for each command type in a path `d` attribute
 */

var typeMap = {
  M: ['x', 'y'],
  L: ['x', 'y'],
  H: ['x'],
  V: ['y'],
  C: ['x1', 'y1', 'x2', 'y2', 'x', 'y'],
  S: ['x2', 'y2', 'x', 'y'],
  Q: ['x1', 'y1', 'x', 'y'],
  T: ['x', 'y'],
  A: ['rx', 'ry', 'xAxisRotation', 'largeArcFlag', 'sweepFlag', 'x', 'y'],
  Z: []
}; // Add lower case entries too matching uppercase (e.g. 'm' == 'M')

Object.keys(typeMap).forEach(function (key) {
  typeMap[key.toLowerCase()] = typeMap[key];
});

function arrayOfLength(length, value) {
  var array = Array(length);

  for (var i = 0; i < length; i++) {
    array[i] = value;
  }

  return array;
}
/**
 * Converts a command object to a string to be used in a `d` attribute
 * @param {Object} command A command object
 * @return {String} The string for the `d` attribute
 */


function commandToString(command) {
  return "".concat(command.type).concat(typeMap[command.type].map(function (p) {
    return command[p];
  }).join(','));
}
/**
 * Converts command A to have the same type as command B.
 *
 * e.g., L0,5 -> C0,5,0,5,0,5
 *
 * Uses these rules:
 * x1 <- x
 * x2 <- x
 * y1 <- y
 * y2 <- y
 * rx <- 0
 * ry <- 0
 * xAxisRotation <- read from B
 * largeArcFlag <- read from B
 * sweepflag <- read from B
 *
 * @param {Object} aCommand Command object from path `d` attribute
 * @param {Object} bCommand Command object from path `d` attribute to match against
 * @return {Object} aCommand converted to type of bCommand
 */


function convertToSameType(aCommand, bCommand) {
  var conversionMap = {
    x1: 'x',
    y1: 'y',
    x2: 'x',
    y2: 'y'
  };
  var readFromBKeys = ['xAxisRotation', 'largeArcFlag', 'sweepFlag']; // convert (but ignore M types)

  if (aCommand.type !== bCommand.type && bCommand.type.toUpperCase() !== 'M') {
    var aConverted = {};
    Object.keys(bCommand).forEach(function (bKey) {
      var bValue = bCommand[bKey]; // first read from the A command

      var aValue = aCommand[bKey]; // if it is one of these values, read from B no matter what

      if (aValue === undefined) {
        if (readFromBKeys.includes(bKey)) {
          aValue = bValue;
        } else {
          // if it wasn't in the A command, see if an equivalent was
          if (aValue === undefined && conversionMap[bKey]) {
            aValue = aCommand[conversionMap[bKey]];
          } // if it doesn't have a converted value, use 0


          if (aValue === undefined) {
            aValue = 0;
          }
        }
      }

      aConverted[bKey] = aValue;
    }); // update the type to match B

    aConverted.type = bCommand.type;
    aCommand = aConverted;
  }

  return aCommand;
}
/**
 * Interpolate between command objects commandStart and commandEnd segmentCount times.
 * If the types are L, Q, or C then the curves are split as per de Casteljau's algorithm.
 * Otherwise we just copy commandStart segmentCount - 1 times, finally ending with commandEnd.
 *
 * @param {Object} commandStart Command object at the beginning of the segment
 * @param {Object} commandEnd Command object at the end of the segment
 * @param {Number} segmentCount The number of segments to split this into. If only 1
 *   Then [commandEnd] is returned.
 * @return {Object[]} Array of ~segmentCount command objects between commandStart and
 *   commandEnd. (Can be segmentCount+1 objects if commandStart is type M).
 */


function splitSegment(commandStart, commandEnd, segmentCount) {
  var segments = []; // line, quadratic bezier, or cubic bezier

  if (commandEnd.type === 'L' || commandEnd.type === 'Q' || commandEnd.type === 'C') {
    segments = segments.concat(splitCurve(commandStart, commandEnd, segmentCount)); // general case - just copy the same point
  } else {
    var copyCommand = _extends({}, commandStart); // convert M to L


    if (copyCommand.type === 'M') {
      copyCommand.type = 'L';
    }

    segments = segments.concat(arrayOfLength(segmentCount - 1).map(function () {
      return copyCommand;
    }));
    segments.push(commandEnd);
  }

  return segments;
}
/**
 * Extends an array of commandsToExtend to the length of the referenceCommands by
 * splitting segments until the number of commands match. Ensures all the actual
 * points of commandsToExtend are in the extended array.
 *
 * @param {Object[]} commandsToExtend The command object array to extend
 * @param {Object[]} referenceCommands The command object array to match in length
 * @param {Function} excludeSegment a function that takes a start command object and
 *   end command object and returns true if the segment should be excluded from splitting.
 * @return {Object[]} The extended commandsToExtend array
 */


function extend(commandsToExtend, referenceCommands, excludeSegment) {
  // compute insertion points:
  // number of segments in the path to extend
  var numSegmentsToExtend = commandsToExtend.length - 1; // number of segments in the reference path.

  var numReferenceSegments = referenceCommands.length - 1; // this value is always between [0, 1].

  var segmentRatio = numSegmentsToExtend / numReferenceSegments; // create a map, mapping segments in referenceCommands to how many points
  // should be added in that segment (should always be >= 1 since we need each
  // point itself).
  // 0 = segment 0-1, 1 = segment 1-2, n-1 = last vertex

  var countPointsPerSegment = arrayOfLength(numReferenceSegments).reduce(function (accum, d, i) {
    var insertIndex = Math.floor(segmentRatio * i); // handle excluding segments

    if (excludeSegment && insertIndex < commandsToExtend.length - 1 && excludeSegment(commandsToExtend[insertIndex], commandsToExtend[insertIndex + 1])) {
      // set the insertIndex to the segment that this point should be added to:
      // round the insertIndex essentially so we split half and half on
      // neighbouring segments. hence the segmentRatio * i < 0.5
      var addToPriorSegment = segmentRatio * i % 1 < 0.5; // only skip segment if we already have 1 point in it (can't entirely remove a segment)

      if (accum[insertIndex]) {
        // TODO - Note this is a naive algorithm that should work for most d3-area use cases
        // but if two adjacent segments are supposed to be skipped, this will not perform as
        // expected. Could be updated to search for nearest segment to place the point in, but
        // will only do that if necessary.
        // add to the prior segment
        if (addToPriorSegment) {
          if (insertIndex > 0) {
            insertIndex -= 1; // not possible to add to previous so adding to next
          } else if (insertIndex < commandsToExtend.length - 1) {
            insertIndex += 1;
          } // add to next segment

        } else if (insertIndex < commandsToExtend.length - 1) {
          insertIndex += 1; // not possible to add to next so adding to previous
        } else if (insertIndex > 0) {
          insertIndex -= 1;
        }
      }
    }

    accum[insertIndex] = (accum[insertIndex] || 0) + 1;
    return accum;
  }, []); // extend each segment to have the correct number of points for a smooth interpolation

  var extended = countPointsPerSegment.reduce(function (extended, segmentCount, i) {
    // if last command, just add `segmentCount` number of times
    if (i === commandsToExtend.length - 1) {
      var lastCommandCopies = arrayOfLength(segmentCount, _extends({}, commandsToExtend[commandsToExtend.length - 1])); // convert M to L

      if (lastCommandCopies[0].type === 'M') {
        lastCommandCopies.forEach(function (d) {
          d.type = 'L';
        });
      }

      return extended.concat(lastCommandCopies);
    } // otherwise, split the segment segmentCount times.


    return extended.concat(splitSegment(commandsToExtend[i], commandsToExtend[i + 1], segmentCount));
  }, []); // add in the very first point since splitSegment only adds in the ones after it

  extended.unshift(commandsToExtend[0]);
  return extended;
}
/**
 * Takes a path `d` string and converts it into an array of command
 * objects. Drops the `Z` character.
 *
 * @param {String|null} d A path `d` string
 */


function pathCommandsFromString(d) {
  // split into valid tokens
  var tokens = (d || '').match(commandTokenRegex) || [];
  var commands = [];
  var commandArgs;
  var command; // iterate over each token, checking if we are at a new command
  // by presence in the typeMap

  for (var i = 0; i < tokens.length; ++i) {
    commandArgs = typeMap[tokens[i]]; // new command found:

    if (commandArgs) {
      command = {
        type: tokens[i]
      }; // add each of the expected args for this command:

      for (var a = 0; a < commandArgs.length; ++a) {
        command[commandArgs[a]] = +tokens[i + a + 1];
      } // need to increment our token index appropriately since
      // we consumed token args


      i += commandArgs.length;
      commands.push(command);
    }
  }

  return commands;
}
/**
 * Interpolate from A to B by extending A and B during interpolation to have
 * the same number of points. This allows for a smooth transition when they
 * have a different number of points.
 *
 * Ignores the `Z` command in paths unless both A and B end with it.
 *
 * This function works directly with arrays of command objects instead of with
 * path `d` strings (see interpolatePath for working with `d` strings).
 *
 * @param {Object[]} aCommandsInput Array of path commands
 * @param {Object[]} bCommandsInput Array of path commands
 * @param {(Function|Object)} interpolateOptions
 * @param {Function} interpolateOptions.excludeSegment a function that takes a start command object and
 *   end command object and returns true if the segment should be excluded from splitting.
 * @param {Boolean} interpolateOptions.snapEndsToInput a boolean indicating whether end of input should
 *   be sourced from input argument or computed.
 * @returns {Function} Interpolation function that maps t ([0, 1]) to an array of path commands.
 */

function interpolatePathCommands(aCommandsInput, bCommandsInput, interpolateOptions) {
  // make a copy so we don't mess with the input arrays
  var aCommands = aCommandsInput == null ? [] : aCommandsInput.slice();
  var bCommands = bCommandsInput == null ? [] : bCommandsInput.slice();

  var _ref = _typeof(interpolateOptions) === 'object' ? interpolateOptions : {
    excludeSegment: interpolateOptions,
    snapEndsToInput: true
  },
      excludeSegment = _ref.excludeSegment,
      snapEndsToInput = _ref.snapEndsToInput; // both input sets are empty, so we don't interpolate


  if (!aCommands.length && !bCommands.length) {
    return function nullInterpolator() {
      return [];
    };
  } // do we add Z during interpolation? yes if both have it. (we'd expect both to have it or not)


  var addZ = (aCommands.length === 0 || aCommands[aCommands.length - 1].type === 'Z') && (bCommands.length === 0 || bCommands[bCommands.length - 1].type === 'Z'); // we temporarily remove Z

  if (aCommands.length > 0 && aCommands[aCommands.length - 1].type === 'Z') {
    aCommands.pop();
  }

  if (bCommands.length > 0 && bCommands[bCommands.length - 1].type === 'Z') {
    bCommands.pop();
  } // if A is empty, treat it as if it used to contain just the first point
  // of B. This makes it so the line extends out of from that first point.


  if (!aCommands.length) {
    aCommands.push(bCommands[0]); // otherwise if B is empty, treat it as if it contains the first point
    // of A. This makes it so the line retracts into the first point.
  } else if (!bCommands.length) {
    bCommands.push(aCommands[0]);
  } // extend to match equal size


  var numPointsToExtend = Math.abs(bCommands.length - aCommands.length);

  if (numPointsToExtend !== 0) {
    // B has more points than A, so add points to A before interpolating
    if (bCommands.length > aCommands.length) {
      aCommands = extend(aCommands, bCommands, excludeSegment); // else if A has more points than B, add more points to B
    } else if (bCommands.length < aCommands.length) {
      bCommands = extend(bCommands, aCommands, excludeSegment);
    }
  } // commands have same length now.
  // convert commands in A to the same type as those in B


  aCommands = aCommands.map(function (aCommand, i) {
    return convertToSameType(aCommand, bCommands[i]);
  }); // create mutable interpolated command objects

  var interpolatedCommands = aCommands.map(function (aCommand) {
    return _objectSpread2({}, aCommand);
  });

  if (addZ) {
    interpolatedCommands.push({
      type: 'Z'
    });
    aCommands.push({
      type: 'Z'
    }); // required for when returning at t == 0
  }

  return function pathCommandInterpolator(t) {
    // at 1 return the final value without the extensions used during interpolation
    if (t === 1 && snapEndsToInput) {
      return bCommandsInput == null ? [] : bCommandsInput;
    } // work with aCommands directly since interpolatedCommands are mutated


    if (t === 0) {
      return aCommands;
    } // interpolate the commands using the mutable interpolated command objs


    for (var i = 0; i < interpolatedCommands.length; ++i) {
      // if (interpolatedCommands[i].type === 'Z') continue;
      var aCommand = aCommands[i];
      var bCommand = bCommands[i];
      var interpolatedCommand = interpolatedCommands[i];

      var _iterator = _createForOfIteratorHelper(typeMap[interpolatedCommand.type]),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var arg = _step.value;
          interpolatedCommand[arg] = (1 - t) * aCommand[arg] + t * bCommand[arg]; // do not use floats for flags (#27), round to integer

          if (arg === 'largeArcFlag' || arg === 'sweepFlag') {
            interpolatedCommand[arg] = Math.round(interpolatedCommand[arg]);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    return interpolatedCommands;
  };
}
/** @typedef InterpolateOptions  */

/**
 * Interpolate from A to B by extending A and B during interpolation to have
 * the same number of points. This allows for a smooth transition when they
 * have a different number of points.
 *
 * Ignores the `Z` character in paths unless both A and B end with it.
 *
 * @param {String} a The `d` attribute for a path
 * @param {String} b The `d` attribute for a path
 * @param {((command1, command2) => boolean|{
 *   excludeSegment?: (command1, command2) => boolean;
 *   snapEndsToInput?: boolean
 * })} interpolateOptions The excludeSegment function or an options object
 *    - interpolateOptions.excludeSegment a function that takes a start command object and
 *      end command object and returns true if the segment should be excluded from splitting.
 *    - interpolateOptions.snapEndsToInput a boolean indicating whether end of input should
 *      be sourced from input argument or computed.
 * @returns {Function} Interpolation function that maps t ([0, 1]) to a path `d` string.
 */

function interpolatePath(a, b, interpolateOptions) {
  var aCommands = pathCommandsFromString(a);
  var bCommands = pathCommandsFromString(b);

  var _ref2 = _typeof(interpolateOptions) === 'object' ? interpolateOptions : {
    excludeSegment: interpolateOptions,
    snapEndsToInput: true
  },
      excludeSegment = _ref2.excludeSegment,
      snapEndsToInput = _ref2.snapEndsToInput;

  if (!aCommands.length && !bCommands.length) {
    return function nullInterpolator() {
      return '';
    };
  }

  var commandInterpolator = interpolatePathCommands(aCommands, bCommands, {
    excludeSegment: excludeSegment,
    snapEndsToInput: snapEndsToInput
  });
  return function pathStringInterpolator(t) {
    // at 1 return the final value without the extensions used during interpolation
    if (t === 1 && snapEndsToInput) {
      return b == null ? '' : b;
    }

    var interpolatedCommands = commandInterpolator(t); // convert to a string (fastest concat: https://jsperf.com/join-concat/150)

    var interpolatedString = '';

    var _iterator2 = _createForOfIteratorHelper(interpolatedCommands),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var interpolatedCommand = _step2.value;
        interpolatedString += commandToString(interpolatedCommand);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    return interpolatedString;
  };
}

const epsilon$1 = 1.1102230246251565e-16;
const splitter = 134217729;
const resulterrbound = (3 + 8 * epsilon$1) * epsilon$1;

// fast_expansion_sum_zeroelim routine from oritinal code
function sum(elen, e, flen, f, h) {
    let Q, Qnew, hh, bvirt;
    let enow = e[0];
    let fnow = f[0];
    let eindex = 0;
    let findex = 0;
    if ((fnow > enow) === (fnow > -enow)) {
        Q = enow;
        enow = e[++eindex];
    } else {
        Q = fnow;
        fnow = f[++findex];
    }
    let hindex = 0;
    if (eindex < elen && findex < flen) {
        if ((fnow > enow) === (fnow > -enow)) {
            Qnew = enow + Q;
            hh = Q - (Qnew - enow);
            enow = e[++eindex];
        } else {
            Qnew = fnow + Q;
            hh = Q - (Qnew - fnow);
            fnow = f[++findex];
        }
        Q = Qnew;
        if (hh !== 0) {
            h[hindex++] = hh;
        }
        while (eindex < elen && findex < flen) {
            if ((fnow > enow) === (fnow > -enow)) {
                Qnew = Q + enow;
                bvirt = Qnew - Q;
                hh = Q - (Qnew - bvirt) + (enow - bvirt);
                enow = e[++eindex];
            } else {
                Qnew = Q + fnow;
                bvirt = Qnew - Q;
                hh = Q - (Qnew - bvirt) + (fnow - bvirt);
                fnow = f[++findex];
            }
            Q = Qnew;
            if (hh !== 0) {
                h[hindex++] = hh;
            }
        }
    }
    while (eindex < elen) {
        Qnew = Q + enow;
        bvirt = Qnew - Q;
        hh = Q - (Qnew - bvirt) + (enow - bvirt);
        enow = e[++eindex];
        Q = Qnew;
        if (hh !== 0) {
            h[hindex++] = hh;
        }
    }
    while (findex < flen) {
        Qnew = Q + fnow;
        bvirt = Qnew - Q;
        hh = Q - (Qnew - bvirt) + (fnow - bvirt);
        fnow = f[++findex];
        Q = Qnew;
        if (hh !== 0) {
            h[hindex++] = hh;
        }
    }
    if (Q !== 0 || hindex === 0) {
        h[hindex++] = Q;
    }
    return hindex;
}

function estimate(elen, e) {
    let Q = e[0];
    for (let i = 1; i < elen; i++) Q += e[i];
    return Q;
}

function vec(n) {
    return new Float64Array(n);
}

const ccwerrboundA = (3 + 16 * epsilon$1) * epsilon$1;
const ccwerrboundB = (2 + 12 * epsilon$1) * epsilon$1;
const ccwerrboundC = (9 + 64 * epsilon$1) * epsilon$1 * epsilon$1;

const B = vec(4);
const C1 = vec(8);
const C2 = vec(12);
const D = vec(16);
const u = vec(4);

function orient2dadapt(ax, ay, bx, by, cx, cy, detsum) {
    let acxtail, acytail, bcxtail, bcytail;
    let bvirt, c, ahi, alo, bhi, blo, _i, _j, _0, s1, s0, t1, t0, u3;

    const acx = ax - cx;
    const bcx = bx - cx;
    const acy = ay - cy;
    const bcy = by - cy;

    s1 = acx * bcy;
    c = splitter * acx;
    ahi = c - (c - acx);
    alo = acx - ahi;
    c = splitter * bcy;
    bhi = c - (c - bcy);
    blo = bcy - bhi;
    s0 = alo * blo - (s1 - ahi * bhi - alo * bhi - ahi * blo);
    t1 = acy * bcx;
    c = splitter * acy;
    ahi = c - (c - acy);
    alo = acy - ahi;
    c = splitter * bcx;
    bhi = c - (c - bcx);
    blo = bcx - bhi;
    t0 = alo * blo - (t1 - ahi * bhi - alo * bhi - ahi * blo);
    _i = s0 - t0;
    bvirt = s0 - _i;
    B[0] = s0 - (_i + bvirt) + (bvirt - t0);
    _j = s1 + _i;
    bvirt = _j - s1;
    _0 = s1 - (_j - bvirt) + (_i - bvirt);
    _i = _0 - t1;
    bvirt = _0 - _i;
    B[1] = _0 - (_i + bvirt) + (bvirt - t1);
    u3 = _j + _i;
    bvirt = u3 - _j;
    B[2] = _j - (u3 - bvirt) + (_i - bvirt);
    B[3] = u3;

    let det = estimate(4, B);
    let errbound = ccwerrboundB * detsum;
    if (det >= errbound || -det >= errbound) {
        return det;
    }

    bvirt = ax - acx;
    acxtail = ax - (acx + bvirt) + (bvirt - cx);
    bvirt = bx - bcx;
    bcxtail = bx - (bcx + bvirt) + (bvirt - cx);
    bvirt = ay - acy;
    acytail = ay - (acy + bvirt) + (bvirt - cy);
    bvirt = by - bcy;
    bcytail = by - (bcy + bvirt) + (bvirt - cy);

    if (acxtail === 0 && acytail === 0 && bcxtail === 0 && bcytail === 0) {
        return det;
    }

    errbound = ccwerrboundC * detsum + resulterrbound * Math.abs(det);
    det += (acx * bcytail + bcy * acxtail) - (acy * bcxtail + bcx * acytail);
    if (det >= errbound || -det >= errbound) return det;

    s1 = acxtail * bcy;
    c = splitter * acxtail;
    ahi = c - (c - acxtail);
    alo = acxtail - ahi;
    c = splitter * bcy;
    bhi = c - (c - bcy);
    blo = bcy - bhi;
    s0 = alo * blo - (s1 - ahi * bhi - alo * bhi - ahi * blo);
    t1 = acytail * bcx;
    c = splitter * acytail;
    ahi = c - (c - acytail);
    alo = acytail - ahi;
    c = splitter * bcx;
    bhi = c - (c - bcx);
    blo = bcx - bhi;
    t0 = alo * blo - (t1 - ahi * bhi - alo * bhi - ahi * blo);
    _i = s0 - t0;
    bvirt = s0 - _i;
    u[0] = s0 - (_i + bvirt) + (bvirt - t0);
    _j = s1 + _i;
    bvirt = _j - s1;
    _0 = s1 - (_j - bvirt) + (_i - bvirt);
    _i = _0 - t1;
    bvirt = _0 - _i;
    u[1] = _0 - (_i + bvirt) + (bvirt - t1);
    u3 = _j + _i;
    bvirt = u3 - _j;
    u[2] = _j - (u3 - bvirt) + (_i - bvirt);
    u[3] = u3;
    const C1len = sum(4, B, 4, u, C1);

    s1 = acx * bcytail;
    c = splitter * acx;
    ahi = c - (c - acx);
    alo = acx - ahi;
    c = splitter * bcytail;
    bhi = c - (c - bcytail);
    blo = bcytail - bhi;
    s0 = alo * blo - (s1 - ahi * bhi - alo * bhi - ahi * blo);
    t1 = acy * bcxtail;
    c = splitter * acy;
    ahi = c - (c - acy);
    alo = acy - ahi;
    c = splitter * bcxtail;
    bhi = c - (c - bcxtail);
    blo = bcxtail - bhi;
    t0 = alo * blo - (t1 - ahi * bhi - alo * bhi - ahi * blo);
    _i = s0 - t0;
    bvirt = s0 - _i;
    u[0] = s0 - (_i + bvirt) + (bvirt - t0);
    _j = s1 + _i;
    bvirt = _j - s1;
    _0 = s1 - (_j - bvirt) + (_i - bvirt);
    _i = _0 - t1;
    bvirt = _0 - _i;
    u[1] = _0 - (_i + bvirt) + (bvirt - t1);
    u3 = _j + _i;
    bvirt = u3 - _j;
    u[2] = _j - (u3 - bvirt) + (_i - bvirt);
    u[3] = u3;
    const C2len = sum(C1len, C1, 4, u, C2);

    s1 = acxtail * bcytail;
    c = splitter * acxtail;
    ahi = c - (c - acxtail);
    alo = acxtail - ahi;
    c = splitter * bcytail;
    bhi = c - (c - bcytail);
    blo = bcytail - bhi;
    s0 = alo * blo - (s1 - ahi * bhi - alo * bhi - ahi * blo);
    t1 = acytail * bcxtail;
    c = splitter * acytail;
    ahi = c - (c - acytail);
    alo = acytail - ahi;
    c = splitter * bcxtail;
    bhi = c - (c - bcxtail);
    blo = bcxtail - bhi;
    t0 = alo * blo - (t1 - ahi * bhi - alo * bhi - ahi * blo);
    _i = s0 - t0;
    bvirt = s0 - _i;
    u[0] = s0 - (_i + bvirt) + (bvirt - t0);
    _j = s1 + _i;
    bvirt = _j - s1;
    _0 = s1 - (_j - bvirt) + (_i - bvirt);
    _i = _0 - t1;
    bvirt = _0 - _i;
    u[1] = _0 - (_i + bvirt) + (bvirt - t1);
    u3 = _j + _i;
    bvirt = u3 - _j;
    u[2] = _j - (u3 - bvirt) + (_i - bvirt);
    u[3] = u3;
    const Dlen = sum(C2len, C2, 4, u, D);

    return D[Dlen - 1];
}

function orient2d(ax, ay, bx, by, cx, cy) {
    const detleft = (ay - cy) * (bx - cx);
    const detright = (ax - cx) * (by - cy);
    const det = detleft - detright;

    const detsum = Math.abs(detleft + detright);
    if (Math.abs(det) >= ccwerrboundA * detsum) return det;

    return -orient2dadapt(ax, ay, bx, by, cx, cy, detsum);
}

const EPSILON = Math.pow(2, -52);
const EDGE_STACK = new Uint32Array(512);

class Delaunator {

    static from(points, getX = defaultGetX, getY = defaultGetY) {
        const n = points.length;
        const coords = new Float64Array(n * 2);

        for (let i = 0; i < n; i++) {
            const p = points[i];
            coords[2 * i] = getX(p);
            coords[2 * i + 1] = getY(p);
        }

        return new Delaunator(coords);
    }

    constructor(coords) {
        const n = coords.length >> 1;
        if (n > 0 && typeof coords[0] !== 'number') throw new Error('Expected coords to contain numbers.');

        this.coords = coords;

        // arrays that will store the triangulation graph
        const maxTriangles = Math.max(2 * n - 5, 0);
        this._triangles = new Uint32Array(maxTriangles * 3);
        this._halfedges = new Int32Array(maxTriangles * 3);

        // temporary arrays for tracking the edges of the advancing convex hull
        this._hashSize = Math.ceil(Math.sqrt(n));
        this._hullPrev = new Uint32Array(n); // edge to prev edge
        this._hullNext = new Uint32Array(n); // edge to next edge
        this._hullTri = new Uint32Array(n); // edge to adjacent triangle
        this._hullHash = new Int32Array(this._hashSize); // angular edge hash

        // temporary arrays for sorting points
        this._ids = new Uint32Array(n);
        this._dists = new Float64Array(n);

        this.update();
    }

    update() {
        const {coords, _hullPrev: hullPrev, _hullNext: hullNext, _hullTri: hullTri, _hullHash: hullHash} =  this;
        const n = coords.length >> 1;

        // populate an array of point indices; calculate input data bbox
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;

        for (let i = 0; i < n; i++) {
            const x = coords[2 * i];
            const y = coords[2 * i + 1];
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
            this._ids[i] = i;
        }
        const cx = (minX + maxX) / 2;
        const cy = (minY + maxY) / 2;

        let i0, i1, i2;

        // pick a seed point close to the center
        for (let i = 0, minDist = Infinity; i < n; i++) {
            const d = dist(cx, cy, coords[2 * i], coords[2 * i + 1]);
            if (d < minDist) {
                i0 = i;
                minDist = d;
            }
        }
        const i0x = coords[2 * i0];
        const i0y = coords[2 * i0 + 1];

        // find the point closest to the seed
        for (let i = 0, minDist = Infinity; i < n; i++) {
            if (i === i0) continue;
            const d = dist(i0x, i0y, coords[2 * i], coords[2 * i + 1]);
            if (d < minDist && d > 0) {
                i1 = i;
                minDist = d;
            }
        }
        let i1x = coords[2 * i1];
        let i1y = coords[2 * i1 + 1];

        let minRadius = Infinity;

        // find the third point which forms the smallest circumcircle with the first two
        for (let i = 0; i < n; i++) {
            if (i === i0 || i === i1) continue;
            const r = circumradius(i0x, i0y, i1x, i1y, coords[2 * i], coords[2 * i + 1]);
            if (r < minRadius) {
                i2 = i;
                minRadius = r;
            }
        }
        let i2x = coords[2 * i2];
        let i2y = coords[2 * i2 + 1];

        if (minRadius === Infinity) {
            // order collinear points by dx (or dy if all x are identical)
            // and return the list as a hull
            for (let i = 0; i < n; i++) {
                this._dists[i] = (coords[2 * i] - coords[0]) || (coords[2 * i + 1] - coords[1]);
            }
            quicksort(this._ids, this._dists, 0, n - 1);
            const hull = new Uint32Array(n);
            let j = 0;
            for (let i = 0, d0 = -Infinity; i < n; i++) {
                const id = this._ids[i];
                const d = this._dists[id];
                if (d > d0) {
                    hull[j++] = id;
                    d0 = d;
                }
            }
            this.hull = hull.subarray(0, j);
            this.triangles = new Uint32Array(0);
            this.halfedges = new Uint32Array(0);
            return;
        }

        // swap the order of the seed points for counter-clockwise orientation
        if (orient2d(i0x, i0y, i1x, i1y, i2x, i2y) < 0) {
            const i = i1;
            const x = i1x;
            const y = i1y;
            i1 = i2;
            i1x = i2x;
            i1y = i2y;
            i2 = i;
            i2x = x;
            i2y = y;
        }

        const center = circumcenter(i0x, i0y, i1x, i1y, i2x, i2y);
        this._cx = center.x;
        this._cy = center.y;

        for (let i = 0; i < n; i++) {
            this._dists[i] = dist(coords[2 * i], coords[2 * i + 1], center.x, center.y);
        }

        // sort the points by distance from the seed triangle circumcenter
        quicksort(this._ids, this._dists, 0, n - 1);

        // set up the seed triangle as the starting hull
        this._hullStart = i0;
        let hullSize = 3;

        hullNext[i0] = hullPrev[i2] = i1;
        hullNext[i1] = hullPrev[i0] = i2;
        hullNext[i2] = hullPrev[i1] = i0;

        hullTri[i0] = 0;
        hullTri[i1] = 1;
        hullTri[i2] = 2;

        hullHash.fill(-1);
        hullHash[this._hashKey(i0x, i0y)] = i0;
        hullHash[this._hashKey(i1x, i1y)] = i1;
        hullHash[this._hashKey(i2x, i2y)] = i2;

        this.trianglesLen = 0;
        this._addTriangle(i0, i1, i2, -1, -1, -1);

        for (let k = 0, xp, yp; k < this._ids.length; k++) {
            const i = this._ids[k];
            const x = coords[2 * i];
            const y = coords[2 * i + 1];

            // skip near-duplicate points
            if (k > 0 && Math.abs(x - xp) <= EPSILON && Math.abs(y - yp) <= EPSILON) continue;
            xp = x;
            yp = y;

            // skip seed triangle points
            if (i === i0 || i === i1 || i === i2) continue;

            // find a visible edge on the convex hull using edge hash
            let start = 0;
            for (let j = 0, key = this._hashKey(x, y); j < this._hashSize; j++) {
                start = hullHash[(key + j) % this._hashSize];
                if (start !== -1 && start !== hullNext[start]) break;
            }

            start = hullPrev[start];
            let e = start, q;
            while (q = hullNext[e], orient2d(x, y, coords[2 * e], coords[2 * e + 1], coords[2 * q], coords[2 * q + 1]) >= 0) {
                e = q;
                if (e === start) {
                    e = -1;
                    break;
                }
            }
            if (e === -1) continue; // likely a near-duplicate point; skip it

            // add the first triangle from the point
            let t = this._addTriangle(e, i, hullNext[e], -1, -1, hullTri[e]);

            // recursively flip triangles from the point until they satisfy the Delaunay condition
            hullTri[i] = this._legalize(t + 2);
            hullTri[e] = t; // keep track of boundary triangles on the hull
            hullSize++;

            // walk forward through the hull, adding more triangles and flipping recursively
            let n = hullNext[e];
            while (q = hullNext[n], orient2d(x, y, coords[2 * n], coords[2 * n + 1], coords[2 * q], coords[2 * q + 1]) < 0) {
                t = this._addTriangle(n, i, q, hullTri[i], -1, hullTri[n]);
                hullTri[i] = this._legalize(t + 2);
                hullNext[n] = n; // mark as removed
                hullSize--;
                n = q;
            }

            // walk backward from the other side, adding more triangles and flipping
            if (e === start) {
                while (q = hullPrev[e], orient2d(x, y, coords[2 * q], coords[2 * q + 1], coords[2 * e], coords[2 * e + 1]) < 0) {
                    t = this._addTriangle(q, i, e, -1, hullTri[e], hullTri[q]);
                    this._legalize(t + 2);
                    hullTri[q] = t;
                    hullNext[e] = e; // mark as removed
                    hullSize--;
                    e = q;
                }
            }

            // update the hull indices
            this._hullStart = hullPrev[i] = e;
            hullNext[e] = hullPrev[n] = i;
            hullNext[i] = n;

            // save the two new edges in the hash table
            hullHash[this._hashKey(x, y)] = i;
            hullHash[this._hashKey(coords[2 * e], coords[2 * e + 1])] = e;
        }

        this.hull = new Uint32Array(hullSize);
        for (let i = 0, e = this._hullStart; i < hullSize; i++) {
            this.hull[i] = e;
            e = hullNext[e];
        }

        // trim typed triangle mesh arrays
        this.triangles = this._triangles.subarray(0, this.trianglesLen);
        this.halfedges = this._halfedges.subarray(0, this.trianglesLen);
    }

    _hashKey(x, y) {
        return Math.floor(pseudoAngle(x - this._cx, y - this._cy) * this._hashSize) % this._hashSize;
    }

    _legalize(a) {
        const {_triangles: triangles, _halfedges: halfedges, coords} = this;

        let i = 0;
        let ar = 0;

        // recursion eliminated with a fixed-size stack
        while (true) {
            const b = halfedges[a];

            /* if the pair of triangles doesn't satisfy the Delaunay condition
             * (p1 is inside the circumcircle of [p0, pl, pr]), flip them,
             * then do the same check/flip recursively for the new pair of triangles
             *
             *           pl                    pl
             *          /||\                  /  \
             *       al/ || \bl            al/    \a
             *        /  ||  \              /      \
             *       /  a||b  \    flip    /___ar___\
             *     p0\   ||   /p1   =>   p0\---bl---/p1
             *        \  ||  /              \      /
             *       ar\ || /br             b\    /br
             *          \||/                  \  /
             *           pr                    pr
             */
            const a0 = a - a % 3;
            ar = a0 + (a + 2) % 3;

            if (b === -1) { // convex hull edge
                if (i === 0) break;
                a = EDGE_STACK[--i];
                continue;
            }

            const b0 = b - b % 3;
            const al = a0 + (a + 1) % 3;
            const bl = b0 + (b + 2) % 3;

            const p0 = triangles[ar];
            const pr = triangles[a];
            const pl = triangles[al];
            const p1 = triangles[bl];

            const illegal = inCircle(
                coords[2 * p0], coords[2 * p0 + 1],
                coords[2 * pr], coords[2 * pr + 1],
                coords[2 * pl], coords[2 * pl + 1],
                coords[2 * p1], coords[2 * p1 + 1]);

            if (illegal) {
                triangles[a] = p1;
                triangles[b] = p0;

                const hbl = halfedges[bl];

                // edge swapped on the other side of the hull (rare); fix the halfedge reference
                if (hbl === -1) {
                    let e = this._hullStart;
                    do {
                        if (this._hullTri[e] === bl) {
                            this._hullTri[e] = a;
                            break;
                        }
                        e = this._hullPrev[e];
                    } while (e !== this._hullStart);
                }
                this._link(a, hbl);
                this._link(b, halfedges[ar]);
                this._link(ar, bl);

                const br = b0 + (b + 1) % 3;

                // don't worry about hitting the cap: it can only happen on extremely degenerate input
                if (i < EDGE_STACK.length) {
                    EDGE_STACK[i++] = br;
                }
            } else {
                if (i === 0) break;
                a = EDGE_STACK[--i];
            }
        }

        return ar;
    }

    _link(a, b) {
        this._halfedges[a] = b;
        if (b !== -1) this._halfedges[b] = a;
    }

    // add a new triangle given vertex indices and adjacent half-edge ids
    _addTriangle(i0, i1, i2, a, b, c) {
        const t = this.trianglesLen;

        this._triangles[t] = i0;
        this._triangles[t + 1] = i1;
        this._triangles[t + 2] = i2;

        this._link(t, a);
        this._link(t + 1, b);
        this._link(t + 2, c);

        this.trianglesLen += 3;

        return t;
    }
}

// monotonically increases with real angle, but doesn't need expensive trigonometry
function pseudoAngle(dx, dy) {
    const p = dx / (Math.abs(dx) + Math.abs(dy));
    return (dy > 0 ? 3 - p : 1 + p) / 4; // [0..1]
}

function dist(ax, ay, bx, by) {
    const dx = ax - bx;
    const dy = ay - by;
    return dx * dx + dy * dy;
}

function inCircle(ax, ay, bx, by, cx, cy, px, py) {
    const dx = ax - px;
    const dy = ay - py;
    const ex = bx - px;
    const ey = by - py;
    const fx = cx - px;
    const fy = cy - py;

    const ap = dx * dx + dy * dy;
    const bp = ex * ex + ey * ey;
    const cp = fx * fx + fy * fy;

    return dx * (ey * cp - bp * fy) -
           dy * (ex * cp - bp * fx) +
           ap * (ex * fy - ey * fx) < 0;
}

function circumradius(ax, ay, bx, by, cx, cy) {
    const dx = bx - ax;
    const dy = by - ay;
    const ex = cx - ax;
    const ey = cy - ay;

    const bl = dx * dx + dy * dy;
    const cl = ex * ex + ey * ey;
    const d = 0.5 / (dx * ey - dy * ex);

    const x = (ey * bl - dy * cl) * d;
    const y = (dx * cl - ex * bl) * d;

    return x * x + y * y;
}

function circumcenter(ax, ay, bx, by, cx, cy) {
    const dx = bx - ax;
    const dy = by - ay;
    const ex = cx - ax;
    const ey = cy - ay;

    const bl = dx * dx + dy * dy;
    const cl = ex * ex + ey * ey;
    const d = 0.5 / (dx * ey - dy * ex);

    const x = ax + (ey * bl - dy * cl) * d;
    const y = ay + (dx * cl - ex * bl) * d;

    return {x, y};
}

function quicksort(ids, dists, left, right) {
    if (right - left <= 20) {
        for (let i = left + 1; i <= right; i++) {
            const temp = ids[i];
            const tempDist = dists[temp];
            let j = i - 1;
            while (j >= left && dists[ids[j]] > tempDist) ids[j + 1] = ids[j--];
            ids[j + 1] = temp;
        }
    } else {
        const median = (left + right) >> 1;
        let i = left + 1;
        let j = right;
        swap(ids, median, i);
        if (dists[ids[left]] > dists[ids[right]]) swap(ids, left, right);
        if (dists[ids[i]] > dists[ids[right]]) swap(ids, i, right);
        if (dists[ids[left]] > dists[ids[i]]) swap(ids, left, i);

        const temp = ids[i];
        const tempDist = dists[temp];
        while (true) {
            do i++; while (dists[ids[i]] < tempDist);
            do j--; while (dists[ids[j]] > tempDist);
            if (j < i) break;
            swap(ids, i, j);
        }
        ids[left + 1] = ids[j];
        ids[j] = temp;

        if (right - i + 1 >= j - left) {
            quicksort(ids, dists, i, right);
            quicksort(ids, dists, left, j - 1);
        } else {
            quicksort(ids, dists, left, j - 1);
            quicksort(ids, dists, i, right);
        }
    }
}

function swap(arr, i, j) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

function defaultGetX(p) {
    return p[0];
}
function defaultGetY(p) {
    return p[1];
}

const epsilon = 1e-6;

class Path {
  constructor() {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null; // end of current subpath
    this._ = "";
  }
  moveTo(x, y) {
    this._ += `M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}`;
  }
  closePath() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  }
  lineTo(x, y) {
    this._ += `L${this._x1 = +x},${this._y1 = +y}`;
  }
  arc(x, y, r) {
    x = +x, y = +y, r = +r;
    const x0 = x + r;
    const y0 = y;
    if (r < 0) throw new Error("negative radius");
    if (this._x1 === null) this._ += `M${x0},${y0}`;
    else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) this._ += "L" + x0 + "," + y0;
    if (!r) return;
    this._ += `A${r},${r},0,1,1,${x - r},${y}A${r},${r},0,1,1,${this._x1 = x0},${this._y1 = y0}`;
  }
  rect(x, y, w, h) {
    this._ += `M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}h${+w}v${+h}h${-w}Z`;
  }
  value() {
    return this._ || null;
  }
}

class Polygon {
  constructor() {
    this._ = [];
  }
  moveTo(x, y) {
    this._.push([x, y]);
  }
  closePath() {
    this._.push(this._[0].slice());
  }
  lineTo(x, y) {
    this._.push([x, y]);
  }
  value() {
    return this._.length ? this._ : null;
  }
}

let Voronoi$1 = class Voronoi {
  constructor(delaunay, [xmin, ymin, xmax, ymax] = [0, 0, 960, 500]) {
    if (!((xmax = +xmax) >= (xmin = +xmin)) || !((ymax = +ymax) >= (ymin = +ymin))) throw new Error("invalid bounds");
    this.delaunay = delaunay;
    this._circumcenters = new Float64Array(delaunay.points.length * 2);
    this.vectors = new Float64Array(delaunay.points.length * 2);
    this.xmax = xmax, this.xmin = xmin;
    this.ymax = ymax, this.ymin = ymin;
    this._init();
  }
  update() {
    this.delaunay.update();
    this._init();
    return this;
  }
  _init() {
    const {delaunay: {points, hull, triangles}, vectors} = this;
    let bx, by; // lazily computed barycenter of the hull

    // Compute circumcenters.
    const circumcenters = this.circumcenters = this._circumcenters.subarray(0, triangles.length / 3 * 2);
    for (let i = 0, j = 0, n = triangles.length, x, y; i < n; i += 3, j += 2) {
      const t1 = triangles[i] * 2;
      const t2 = triangles[i + 1] * 2;
      const t3 = triangles[i + 2] * 2;
      const x1 = points[t1];
      const y1 = points[t1 + 1];
      const x2 = points[t2];
      const y2 = points[t2 + 1];
      const x3 = points[t3];
      const y3 = points[t3 + 1];

      const dx = x2 - x1;
      const dy = y2 - y1;
      const ex = x3 - x1;
      const ey = y3 - y1;
      const ab = (dx * ey - dy * ex) * 2;

      if (Math.abs(ab) < 1e-9) {
        // For a degenerate triangle, the circumcenter is at the infinity, in a
        // direction orthogonal to the halfedge and away from the “center” of
        // the diagram <bx, by>, defined as the hull’s barycenter.
        if (bx === undefined) {
          bx = by = 0;
          for (const i of hull) bx += points[i * 2], by += points[i * 2 + 1];
          bx /= hull.length, by /= hull.length;
        }
        const a = 1e9 * Math.sign((bx - x1) * ey - (by - y1) * ex);
        x = (x1 + x3) / 2 - a * ey;
        y = (y1 + y3) / 2 + a * ex;
      } else {
        const d = 1 / ab;
        const bl = dx * dx + dy * dy;
        const cl = ex * ex + ey * ey;
        x = x1 + (ey * bl - dy * cl) * d;
        y = y1 + (dx * cl - ex * bl) * d;
      }
      circumcenters[j] = x;
      circumcenters[j + 1] = y;
    }

    // Compute exterior cell rays.
    let h = hull[hull.length - 1];
    let p0, p1 = h * 4;
    let x0, x1 = points[2 * h];
    let y0, y1 = points[2 * h + 1];
    vectors.fill(0);
    for (let i = 0; i < hull.length; ++i) {
      h = hull[i];
      p0 = p1, x0 = x1, y0 = y1;
      p1 = h * 4, x1 = points[2 * h], y1 = points[2 * h + 1];
      vectors[p0 + 2] = vectors[p1] = y0 - y1;
      vectors[p0 + 3] = vectors[p1 + 1] = x1 - x0;
    }
  }
  render(context) {
    const buffer = context == null ? context = new Path : undefined;
    const {delaunay: {halfedges, inedges, hull}, circumcenters, vectors} = this;
    if (hull.length <= 1) return null;
    for (let i = 0, n = halfedges.length; i < n; ++i) {
      const j = halfedges[i];
      if (j < i) continue;
      const ti = Math.floor(i / 3) * 2;
      const tj = Math.floor(j / 3) * 2;
      const xi = circumcenters[ti];
      const yi = circumcenters[ti + 1];
      const xj = circumcenters[tj];
      const yj = circumcenters[tj + 1];
      this._renderSegment(xi, yi, xj, yj, context);
    }
    let h0, h1 = hull[hull.length - 1];
    for (let i = 0; i < hull.length; ++i) {
      h0 = h1, h1 = hull[i];
      const t = Math.floor(inedges[h1] / 3) * 2;
      const x = circumcenters[t];
      const y = circumcenters[t + 1];
      const v = h0 * 4;
      const p = this._project(x, y, vectors[v + 2], vectors[v + 3]);
      if (p) this._renderSegment(x, y, p[0], p[1], context);
    }
    return buffer && buffer.value();
  }
  renderBounds(context) {
    const buffer = context == null ? context = new Path : undefined;
    context.rect(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin);
    return buffer && buffer.value();
  }
  renderCell(i, context) {
    const buffer = context == null ? context = new Path : undefined;
    const points = this._clip(i);
    if (points === null || !points.length) return;
    context.moveTo(points[0], points[1]);
    let n = points.length;
    while (points[0] === points[n-2] && points[1] === points[n-1] && n > 1) n -= 2;
    for (let i = 2; i < n; i += 2) {
      if (points[i] !== points[i-2] || points[i+1] !== points[i-1])
        context.lineTo(points[i], points[i + 1]);
    }
    context.closePath();
    return buffer && buffer.value();
  }
  *cellPolygons() {
    const {delaunay: {points}} = this;
    for (let i = 0, n = points.length / 2; i < n; ++i) {
      const cell = this.cellPolygon(i);
      if (cell) cell.index = i, yield cell;
    }
  }
  cellPolygon(i) {
    const polygon = new Polygon;
    this.renderCell(i, polygon);
    return polygon.value();
  }
  _renderSegment(x0, y0, x1, y1, context) {
    let S;
    const c0 = this._regioncode(x0, y0);
    const c1 = this._regioncode(x1, y1);
    if (c0 === 0 && c1 === 0) {
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
    } else if (S = this._clipSegment(x0, y0, x1, y1, c0, c1)) {
      context.moveTo(S[0], S[1]);
      context.lineTo(S[2], S[3]);
    }
  }
  contains(i, x, y) {
    if ((x = +x, x !== x) || (y = +y, y !== y)) return false;
    return this.delaunay._step(i, x, y) === i;
  }
  *neighbors(i) {
    const ci = this._clip(i);
    if (ci) for (const j of this.delaunay.neighbors(i)) {
      const cj = this._clip(j);
      // find the common edge
      if (cj) loop: for (let ai = 0, li = ci.length; ai < li; ai += 2) {
        for (let aj = 0, lj = cj.length; aj < lj; aj += 2) {
          if (ci[ai] === cj[aj]
              && ci[ai + 1] === cj[aj + 1]
              && ci[(ai + 2) % li] === cj[(aj + lj - 2) % lj]
              && ci[(ai + 3) % li] === cj[(aj + lj - 1) % lj]) {
            yield j;
            break loop;
          }
        }
      }
    }
  }
  _cell(i) {
    const {circumcenters, delaunay: {inedges, halfedges, triangles}} = this;
    const e0 = inedges[i];
    if (e0 === -1) return null; // coincident point
    const points = [];
    let e = e0;
    do {
      const t = Math.floor(e / 3);
      points.push(circumcenters[t * 2], circumcenters[t * 2 + 1]);
      e = e % 3 === 2 ? e - 2 : e + 1;
      if (triangles[e] !== i) break; // bad triangulation
      e = halfedges[e];
    } while (e !== e0 && e !== -1);
    return points;
  }
  _clip(i) {
    // degenerate case (1 valid point: return the box)
    if (i === 0 && this.delaunay.hull.length === 1) {
      return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
    }
    const points = this._cell(i);
    if (points === null) return null;
    const {vectors: V} = this;
    const v = i * 4;
    return this._simplify(V[v] || V[v + 1]
        ? this._clipInfinite(i, points, V[v], V[v + 1], V[v + 2], V[v + 3])
        : this._clipFinite(i, points));
  }
  _clipFinite(i, points) {
    const n = points.length;
    let P = null;
    let x0, y0, x1 = points[n - 2], y1 = points[n - 1];
    let c0, c1 = this._regioncode(x1, y1);
    let e0, e1 = 0;
    for (let j = 0; j < n; j += 2) {
      x0 = x1, y0 = y1, x1 = points[j], y1 = points[j + 1];
      c0 = c1, c1 = this._regioncode(x1, y1);
      if (c0 === 0 && c1 === 0) {
        e0 = e1, e1 = 0;
        if (P) P.push(x1, y1);
        else P = [x1, y1];
      } else {
        let S, sx0, sy0, sx1, sy1;
        if (c0 === 0) {
          if ((S = this._clipSegment(x0, y0, x1, y1, c0, c1)) === null) continue;
          [sx0, sy0, sx1, sy1] = S;
        } else {
          if ((S = this._clipSegment(x1, y1, x0, y0, c1, c0)) === null) continue;
          [sx1, sy1, sx0, sy0] = S;
          e0 = e1, e1 = this._edgecode(sx0, sy0);
          if (e0 && e1) this._edge(i, e0, e1, P, P.length);
          if (P) P.push(sx0, sy0);
          else P = [sx0, sy0];
        }
        e0 = e1, e1 = this._edgecode(sx1, sy1);
        if (e0 && e1) this._edge(i, e0, e1, P, P.length);
        if (P) P.push(sx1, sy1);
        else P = [sx1, sy1];
      }
    }
    if (P) {
      e0 = e1, e1 = this._edgecode(P[0], P[1]);
      if (e0 && e1) this._edge(i, e0, e1, P, P.length);
    } else if (this.contains(i, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2)) {
      return [this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax, this.xmin, this.ymin];
    }
    return P;
  }
  _clipSegment(x0, y0, x1, y1, c0, c1) {
    // for more robustness, always consider the segment in the same order
    const flip = c0 < c1;
    if (flip) [x0, y0, x1, y1, c0, c1] = [x1, y1, x0, y0, c1, c0];
    while (true) {
      if (c0 === 0 && c1 === 0) return flip ? [x1, y1, x0, y0] : [x0, y0, x1, y1];
      if (c0 & c1) return null;
      let x, y, c = c0 || c1;
      if (c & 0b1000) x = x0 + (x1 - x0) * (this.ymax - y0) / (y1 - y0), y = this.ymax;
      else if (c & 0b0100) x = x0 + (x1 - x0) * (this.ymin - y0) / (y1 - y0), y = this.ymin;
      else if (c & 0b0010) y = y0 + (y1 - y0) * (this.xmax - x0) / (x1 - x0), x = this.xmax;
      else y = y0 + (y1 - y0) * (this.xmin - x0) / (x1 - x0), x = this.xmin;
      if (c0) x0 = x, y0 = y, c0 = this._regioncode(x0, y0);
      else x1 = x, y1 = y, c1 = this._regioncode(x1, y1);
    }
  }
  _clipInfinite(i, points, vx0, vy0, vxn, vyn) {
    let P = Array.from(points), p;
    if (p = this._project(P[0], P[1], vx0, vy0)) P.unshift(p[0], p[1]);
    if (p = this._project(P[P.length - 2], P[P.length - 1], vxn, vyn)) P.push(p[0], p[1]);
    if (P = this._clipFinite(i, P)) {
      for (let j = 0, n = P.length, c0, c1 = this._edgecode(P[n - 2], P[n - 1]); j < n; j += 2) {
        c0 = c1, c1 = this._edgecode(P[j], P[j + 1]);
        if (c0 && c1) j = this._edge(i, c0, c1, P, j), n = P.length;
      }
    } else if (this.contains(i, (this.xmin + this.xmax) / 2, (this.ymin + this.ymax) / 2)) {
      P = [this.xmin, this.ymin, this.xmax, this.ymin, this.xmax, this.ymax, this.xmin, this.ymax];
    }
    return P;
  }
  _edge(i, e0, e1, P, j) {
    while (e0 !== e1) {
      let x, y;
      switch (e0) {
        case 0b0101: e0 = 0b0100; continue; // top-left
        case 0b0100: e0 = 0b0110, x = this.xmax, y = this.ymin; break; // top
        case 0b0110: e0 = 0b0010; continue; // top-right
        case 0b0010: e0 = 0b1010, x = this.xmax, y = this.ymax; break; // right
        case 0b1010: e0 = 0b1000; continue; // bottom-right
        case 0b1000: e0 = 0b1001, x = this.xmin, y = this.ymax; break; // bottom
        case 0b1001: e0 = 0b0001; continue; // bottom-left
        case 0b0001: e0 = 0b0101, x = this.xmin, y = this.ymin; break; // left
      }
      // Note: this implicitly checks for out of bounds: if P[j] or P[j+1] are
      // undefined, the conditional statement will be executed.
      if ((P[j] !== x || P[j + 1] !== y) && this.contains(i, x, y)) {
        P.splice(j, 0, x, y), j += 2;
      }
    }
    return j;
  }
  _project(x0, y0, vx, vy) {
    let t = Infinity, c, x, y;
    if (vy < 0) { // top
      if (y0 <= this.ymin) return null;
      if ((c = (this.ymin - y0) / vy) < t) y = this.ymin, x = x0 + (t = c) * vx;
    } else if (vy > 0) { // bottom
      if (y0 >= this.ymax) return null;
      if ((c = (this.ymax - y0) / vy) < t) y = this.ymax, x = x0 + (t = c) * vx;
    }
    if (vx > 0) { // right
      if (x0 >= this.xmax) return null;
      if ((c = (this.xmax - x0) / vx) < t) x = this.xmax, y = y0 + (t = c) * vy;
    } else if (vx < 0) { // left
      if (x0 <= this.xmin) return null;
      if ((c = (this.xmin - x0) / vx) < t) x = this.xmin, y = y0 + (t = c) * vy;
    }
    return [x, y];
  }
  _edgecode(x, y) {
    return (x === this.xmin ? 0b0001
        : x === this.xmax ? 0b0010 : 0b0000)
        | (y === this.ymin ? 0b0100
        : y === this.ymax ? 0b1000 : 0b0000);
  }
  _regioncode(x, y) {
    return (x < this.xmin ? 0b0001
        : x > this.xmax ? 0b0010 : 0b0000)
        | (y < this.ymin ? 0b0100
        : y > this.ymax ? 0b1000 : 0b0000);
  }
  _simplify(P) {
    if (P && P.length > 4) {
      for (let i = 0; i < P.length; i+= 2) {
        const j = (i + 2) % P.length, k = (i + 4) % P.length;
        if (P[i] === P[j] && P[j] === P[k] || P[i + 1] === P[j + 1] && P[j + 1] === P[k + 1]) {
          P.splice(j, 2), i -= 2;
        }
      }
      if (!P.length) P = null;
    }
    return P;
  }
};

const tau = 2 * Math.PI, pow$1 = Math.pow;

function pointX(p) {
  return p[0];
}

function pointY(p) {
  return p[1];
}

// A triangulation is collinear if all its triangles have a non-null area
function collinear(d) {
  const {triangles, coords} = d;
  for (let i = 0; i < triangles.length; i += 3) {
    const a = 2 * triangles[i],
          b = 2 * triangles[i + 1],
          c = 2 * triangles[i + 2],
          cross = (coords[c] - coords[a]) * (coords[b + 1] - coords[a + 1])
                - (coords[b] - coords[a]) * (coords[c + 1] - coords[a + 1]);
    if (cross > 1e-10) return false;
  }
  return true;
}

function jitter(x, y, r) {
  return [x + Math.sin(x + y) * r, y + Math.cos(x - y) * r];
}

class Delaunay {
  static from(points, fx = pointX, fy = pointY, that) {
    return new Delaunay("length" in points
        ? flatArray(points, fx, fy, that)
        : Float64Array.from(flatIterable(points, fx, fy, that)));
  }
  constructor(points) {
    this._delaunator = new Delaunator(points);
    this.inedges = new Int32Array(points.length / 2);
    this._hullIndex = new Int32Array(points.length / 2);
    this.points = this._delaunator.coords;
    this._init();
  }
  update() {
    this._delaunator.update();
    this._init();
    return this;
  }
  _init() {
    const d = this._delaunator, points = this.points;

    // check for collinear
    if (d.hull && d.hull.length > 2 && collinear(d)) {
      this.collinear = Int32Array.from({length: points.length/2}, (_,i) => i)
        .sort((i, j) => points[2 * i] - points[2 * j] || points[2 * i + 1] - points[2 * j + 1]); // for exact neighbors
      const e = this.collinear[0], f = this.collinear[this.collinear.length - 1],
        bounds = [ points[2 * e], points[2 * e + 1], points[2 * f], points[2 * f + 1] ],
        r = 1e-8 * Math.hypot(bounds[3] - bounds[1], bounds[2] - bounds[0]);
      for (let i = 0, n = points.length / 2; i < n; ++i) {
        const p = jitter(points[2 * i], points[2 * i + 1], r);
        points[2 * i] = p[0];
        points[2 * i + 1] = p[1];
      }
      this._delaunator = new Delaunator(points);
    } else {
      delete this.collinear;
    }

    const halfedges = this.halfedges = this._delaunator.halfedges;
    const hull = this.hull = this._delaunator.hull;
    const triangles = this.triangles = this._delaunator.triangles;
    const inedges = this.inedges.fill(-1);
    const hullIndex = this._hullIndex.fill(-1);

    // Compute an index from each point to an (arbitrary) incoming halfedge
    // Used to give the first neighbor of each point; for this reason,
    // on the hull we give priority to exterior halfedges
    for (let e = 0, n = halfedges.length; e < n; ++e) {
      const p = triangles[e % 3 === 2 ? e - 2 : e + 1];
      if (halfedges[e] === -1 || inedges[p] === -1) inedges[p] = e;
    }
    for (let i = 0, n = hull.length; i < n; ++i) {
      hullIndex[hull[i]] = i;
    }

    // degenerate case: 1 or 2 (distinct) points
    if (hull.length <= 2 && hull.length > 0) {
      this.triangles = new Int32Array(3).fill(-1);
      this.halfedges = new Int32Array(3).fill(-1);
      this.triangles[0] = hull[0];
      inedges[hull[0]] = 1;
      if (hull.length === 2) {
        inedges[hull[1]] = 0;
        this.triangles[1] = hull[1];
        this.triangles[2] = hull[1];
      }
    }
  }
  voronoi(bounds) {
    return new Voronoi$1(this, bounds);
  }
  *neighbors(i) {
    const {inedges, hull, _hullIndex, halfedges, triangles, collinear} = this;

    // degenerate case with several collinear points
    if (collinear) {
      const l = collinear.indexOf(i);
      if (l > 0) yield collinear[l - 1];
      if (l < collinear.length - 1) yield collinear[l + 1];
      return;
    }

    const e0 = inedges[i];
    if (e0 === -1) return; // coincident point
    let e = e0, p0 = -1;
    do {
      yield p0 = triangles[e];
      e = e % 3 === 2 ? e - 2 : e + 1;
      if (triangles[e] !== i) return; // bad triangulation
      e = halfedges[e];
      if (e === -1) {
        const p = hull[(_hullIndex[i] + 1) % hull.length];
        if (p !== p0) yield p;
        return;
      }
    } while (e !== e0);
  }
  find(x, y, i = 0) {
    if ((x = +x, x !== x) || (y = +y, y !== y)) return -1;
    const i0 = i;
    let c;
    while ((c = this._step(i, x, y)) >= 0 && c !== i && c !== i0) i = c;
    return c;
  }
  _step(i, x, y) {
    const {inedges, hull, _hullIndex, halfedges, triangles, points} = this;
    if (inedges[i] === -1 || !points.length) return (i + 1) % (points.length >> 1);
    let c = i;
    let dc = pow$1(x - points[i * 2], 2) + pow$1(y - points[i * 2 + 1], 2);
    const e0 = inedges[i];
    let e = e0;
    do {
      let t = triangles[e];
      const dt = pow$1(x - points[t * 2], 2) + pow$1(y - points[t * 2 + 1], 2);
      if (dt < dc) dc = dt, c = t;
      e = e % 3 === 2 ? e - 2 : e + 1;
      if (triangles[e] !== i) break; // bad triangulation
      e = halfedges[e];
      if (e === -1) {
        e = hull[(_hullIndex[i] + 1) % hull.length];
        if (e !== t) {
          if (pow$1(x - points[e * 2], 2) + pow$1(y - points[e * 2 + 1], 2) < dc) return e;
        }
        break;
      }
    } while (e !== e0);
    return c;
  }
  render(context) {
    const buffer = context == null ? context = new Path : undefined;
    const {points, halfedges, triangles} = this;
    for (let i = 0, n = halfedges.length; i < n; ++i) {
      const j = halfedges[i];
      if (j < i) continue;
      const ti = triangles[i] * 2;
      const tj = triangles[j] * 2;
      context.moveTo(points[ti], points[ti + 1]);
      context.lineTo(points[tj], points[tj + 1]);
    }
    this.renderHull(context);
    return buffer && buffer.value();
  }
  renderPoints(context, r) {
    if (r === undefined && (!context || typeof context.moveTo !== "function")) r = context, context = null;
    r = r == undefined ? 2 : +r;
    const buffer = context == null ? context = new Path : undefined;
    const {points} = this;
    for (let i = 0, n = points.length; i < n; i += 2) {
      const x = points[i], y = points[i + 1];
      context.moveTo(x + r, y);
      context.arc(x, y, r, 0, tau);
    }
    return buffer && buffer.value();
  }
  renderHull(context) {
    const buffer = context == null ? context = new Path : undefined;
    const {hull, points} = this;
    const h = hull[0] * 2, n = hull.length;
    context.moveTo(points[h], points[h + 1]);
    for (let i = 1; i < n; ++i) {
      const h = 2 * hull[i];
      context.lineTo(points[h], points[h + 1]);
    }
    context.closePath();
    return buffer && buffer.value();
  }
  hullPolygon() {
    const polygon = new Polygon;
    this.renderHull(polygon);
    return polygon.value();
  }
  renderTriangle(i, context) {
    const buffer = context == null ? context = new Path : undefined;
    const {points, triangles} = this;
    const t0 = triangles[i *= 3] * 2;
    const t1 = triangles[i + 1] * 2;
    const t2 = triangles[i + 2] * 2;
    context.moveTo(points[t0], points[t0 + 1]);
    context.lineTo(points[t1], points[t1 + 1]);
    context.lineTo(points[t2], points[t2 + 1]);
    context.closePath();
    return buffer && buffer.value();
  }
  *trianglePolygons() {
    const {triangles} = this;
    for (let i = 0, n = triangles.length / 3; i < n; ++i) {
      yield this.trianglePolygon(i);
    }
  }
  trianglePolygon(i) {
    const polygon = new Polygon;
    this.renderTriangle(i, polygon);
    return polygon.value();
  }
}

function flatArray(points, fx, fy, that) {
  const n = points.length;
  const array = new Float64Array(n * 2);
  for (let i = 0; i < n; ++i) {
    const p = points[i];
    array[i * 2] = fx.call(that, p, i, points);
    array[i * 2 + 1] = fy.call(that, p, i, points);
  }
  return array;
}

function* flatIterable(points, fx, fy, that) {
  let i = 0;
  for (const p of points) {
    yield fx.call(that, p, i, points);
    yield fy.call(that, p, i, points);
    ++i;
  }
}

const pi = Math.PI;
const halfPi = pi / 2;

const degrees = 180 / pi;
const radians = pi / 180;
const atan2 = Math.atan2;
const cos = Math.cos;
const max = Math.max;
const min = Math.min;
const sin = Math.sin;
const sign =
  Math.sign ||
  function (x) {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
  };
const sqrt = Math.sqrt;

function asin(x) {
  return x > 1 ? halfPi : x < -1 ? -halfPi : Math.asin(x);
}

function cartesianDot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cartesianCross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function cartesianAdd(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function cartesianNormalize(d) {
  var l = sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
  return [d[0] / l, d[1] / l, d[2] / l];
}

// Converts 3D Cartesian to spherical coordinates (degrees).
function spherical(cartesian) {
  return [
    atan2(cartesian[1], cartesian[0]) * degrees,
    asin(max(-1, min(1, cartesian[2]))) * degrees,
  ];
}

// Converts spherical coordinates (degrees) to 3D Cartesian.
function cartesian(coordinates) {
  const lambda = coordinates[0] * radians,
    phi = coordinates[1] * radians,
    cosphi = cos(phi);
  return [cosphi * cos(lambda), cosphi * sin(lambda), sin(phi)];
}

// Spherical excess of a triangle (in spherical coordinates)
function excess(triangle) {
  triangle = triangle.map((p) => cartesian(p));
  return cartesianDot(triangle[0], cartesianCross(triangle[2], triangle[1]));
}

function geoDelaunay(points) {
  const delaunay = geo_delaunay_from(points),
    triangles = geo_triangles(delaunay),
    edges = geo_edges(triangles, points),
    neighbors = geo_neighbors(triangles, points.length),
    find = geo_find(neighbors, points),
    // Voronoi ; could take a center function as an argument
    circumcenters = geo_circumcenters(triangles, points),
    { polygons, centers } = geo_polygons(circumcenters, triangles, points),
    mesh = geo_mesh(polygons),
    hull = geo_hull(triangles, points),
    // Urquhart ; returns a function that takes a distance array as argument.
    urquhart = geo_urquhart(edges, triangles);
  return {
    delaunay,
    edges,
    triangles,
    centers,
    neighbors,
    polygons,
    mesh,
    hull,
    urquhart,
    find,
  };
}

function geo_find(neighbors, points) {
  function distance2(a, b) {
    let x = a[0] - b[0],
      y = a[1] - b[1],
      z = a[2] - b[2];
    return x * x + y * y + z * z;
  }

  return function find(x, y, next) {
    if (next === undefined) next = 0;
    let cell,
      dist,
      found = next;
    const xyz = cartesian([x, y]);
    do {
      cell = next;
      next = null;
      dist = distance2(xyz, cartesian(points[cell]));
      neighbors[cell].forEach((i) => {
        let ndist = distance2(xyz, cartesian(points[i]));
        if (ndist < dist) {
          dist = ndist;
          next = i;
          found = i;
          return;
        }
      });
    } while (next !== null);

    return found;
  };
}

function geo_delaunay_from(points) {
  if (points.length < 2) return {};

  // find a valid point to send to infinity
  let pivot = 0;
  while (isNaN(points[pivot][0] + points[pivot][1]) && pivot++ < points.length);

  const r = geoRotation(points[pivot]),
    projection = geoStereographic()
      .translate([0, 0])
      .scale(1)
      .rotate(r.invert([180, 0]));
  points = points.map(projection);

  const zeros = [];
  let max2 = 1;
  for (let i = 0, n = points.length; i < n; i++) {
    let m = points[i][0] ** 2 + points[i][1] ** 2;
    if (!isFinite(m) || m > 1e32) zeros.push(i);
    else if (m > max2) max2 = m;
  }

  const FAR = 1e6 * sqrt(max2);

  zeros.forEach((i) => (points[i] = [FAR, 0]));

  // Add infinite horizon points
  points.push([0, FAR]);
  points.push([-FAR, 0]);
  points.push([0, -FAR]);

  const delaunay = Delaunay.from(points);

  delaunay.projection = projection;

  // clean up the triangulation
  const { triangles, halfedges, inedges } = delaunay;
  for (let i = 0, l = halfedges.length; i < l; i++) {
    if (halfedges[i] < 0) {
      const j = i % 3 == 2 ? i - 2 : i + 1;
      const k = i % 3 == 0 ? i + 2 : i - 1;
      const a = halfedges[j];
      const b = halfedges[k];
      halfedges[a] = b;
      halfedges[b] = a;
      halfedges[j] = halfedges[k] = -1;
      triangles[i] = triangles[j] = triangles[k] = pivot;
      inedges[triangles[a]] = a % 3 == 0 ? a + 2 : a - 1;
      inedges[triangles[b]] = b % 3 == 0 ? b + 2 : b - 1;
      i += 2 - (i % 3);
    } else if (triangles[i] > points.length - 3 - 1) {
      triangles[i] = pivot;
    }
  }

  // there should always be 4 degenerate triangles
  // console.warn(degenerate);
  return delaunay;
}

function geo_edges(triangles, points) {
  const _index = new Set();
  if (points.length === 2) return [[0, 1]];
  triangles.forEach((tri) => {
    if (tri[0] === tri[1]) return;
    if (excess(tri.map((i) => points[i])) < 0) return;
    for (let i = 0, j; i < 3; i++) {
      j = (i + 1) % 3;
      _index.add(extent([tri[i], tri[j]]).join("-"));
    }
  });
  return Array.from(_index, (d) => d.split("-").map(Number));
}

function geo_triangles(delaunay) {
  const { triangles } = delaunay;
  if (!triangles) return [];

  const geo_triangles = [];
  for (let i = 0, n = triangles.length / 3; i < n; i++) {
    const a = triangles[3 * i],
      b = triangles[3 * i + 1],
      c = triangles[3 * i + 2];
    if (a !== b && b !== c) {
      geo_triangles.push([a, c, b]);
    }
  }
  return geo_triangles;
}

function geo_circumcenters(triangles, points) {
  // if (!use_centroids) {
  return triangles.map((tri) => {
    const c = tri.map((i) => points[i]).map(cartesian),
      V = cartesianAdd(
        cartesianAdd(cartesianCross(c[1], c[0]), cartesianCross(c[2], c[1])),
        cartesianCross(c[0], c[2])
      );
    return spherical(cartesianNormalize(V));
  });
  /*} else {
    return triangles.map(tri => {
      return d3.geoCentroid({
        type: "MultiPoint",
        coordinates: tri.map(i => points[i])
      });
    });
  }*/
}

function geo_neighbors(triangles, npoints) {
  const neighbors = [];
  triangles.forEach((tri) => {
    for (let j = 0; j < 3; j++) {
      const a = tri[j],
        b = tri[(j + 1) % 3];
      neighbors[a] = neighbors[a] || [];
      neighbors[a].push(b);
    }
  });

  // degenerate cases
  if (triangles.length === 0) {
    if (npoints === 2) (neighbors[0] = [1]), (neighbors[1] = [0]);
    else if (npoints === 1) neighbors[0] = [];
  }

  return neighbors;
}

function geo_polygons(circumcenters, triangles, points) {
  const polygons = [];

  const centers = circumcenters.slice();

  if (triangles.length === 0) {
    if (points.length < 2) return { polygons, centers };
    if (points.length === 2) {
      // two hemispheres
      const a = cartesian(points[0]),
        b = cartesian(points[1]),
        m = cartesianNormalize(cartesianAdd(a, b)),
        d = cartesianNormalize(cartesianCross(a, b)),
        c = cartesianCross(m, d);
      const poly = [
        m,
        cartesianCross(m, c),
        cartesianCross(cartesianCross(m, c), c),
        cartesianCross(cartesianCross(cartesianCross(m, c), c), c),
      ]
        .map(spherical)
        .map(supplement);
      return (
        polygons.push(poly),
        polygons.push(poly.slice().reverse()),
        { polygons, centers }
      );
    }
  }

  triangles.forEach((tri, t) => {
    for (let j = 0; j < 3; j++) {
      const a = tri[j],
        b = tri[(j + 1) % 3],
        c = tri[(j + 2) % 3];
      polygons[a] = polygons[a] || [];
      polygons[a].push([b, c, t, [a, b, c]]);
    }
  });

  // reorder each polygon
  const reordered = polygons.map((poly) => {
    const p = [poly[0][2]]; // t
    let k = poly[0][1]; // k = c
    for (let i = 1; i < poly.length; i++) {
      // look for b = k
      for (let j = 0; j < poly.length; j++) {
        if (poly[j][0] == k) {
          k = poly[j][1];
          p.push(poly[j][2]);
          break;
        }
      }
    }

    if (p.length > 2) {
      return p;
    } else if (p.length == 2) {
      const R0 = o_midpoint(
          points[poly[0][3][0]],
          points[poly[0][3][1]],
          centers[p[0]]
        ),
        R1 = o_midpoint(
          points[poly[0][3][2]],
          points[poly[0][3][0]],
          centers[p[0]]
        );
      const i0 = supplement(R0),
        i1 = supplement(R1);
      return [p[0], i1, p[1], i0];
    }
  });

  function supplement(point) {
    let f = -1;
    centers.slice(triangles.length, Infinity).forEach((p, i) => {
      if (p[0] === point[0] && p[1] === point[1]) f = i + triangles.length;
    });
    if (f < 0) (f = centers.length), centers.push(point);
    return f;
  }

  return { polygons: reordered, centers };
}

function o_midpoint(a, b, c) {
  a = cartesian(a);
  b = cartesian(b);
  c = cartesian(c);
  const s = sign(cartesianDot(cartesianCross(b, a), c));
  return spherical(cartesianNormalize(cartesianAdd(a, b)).map((d) => s * d));
}

function geo_mesh(polygons) {
  const mesh = [];
  polygons.forEach((poly) => {
    if (!poly) return;
    let p = poly[poly.length - 1];
    for (let q of poly) {
      if (q > p) mesh.push([p, q]);
      p = q;
    }
  });
  return mesh;
}

function geo_urquhart(edges, triangles) {
  return function (distances) {
    const _lengths = new Map(),
      _urquhart = new Map();
    edges.forEach((edge, i) => {
      const u = edge.join("-");
      _lengths.set(u, distances[i]);
      _urquhart.set(u, true);
    });

    triangles.forEach((tri) => {
      let l = 0,
        remove = -1;
      for (let j = 0; j < 3; j++) {
        let u = extent([tri[j], tri[(j + 1) % 3]]).join("-");
        if (_lengths.get(u) > l) {
          l = _lengths.get(u);
          remove = u;
        }
      }
      _urquhart.set(remove, false);
    });

    return edges.map((edge) => _urquhart.get(edge.join("-")));
  };
}

function geo_hull(triangles, points) {
  const _hull = new Set(),
    hull = [];
  triangles.map((tri) => {
    if (excess(tri.map((i) => points[i > points.length ? 0 : i])) > 1e-12)
      return;
    for (let i = 0; i < 3; i++) {
      let e = [tri[i], tri[(i + 1) % 3]],
        code = `${e[0]}-${e[1]}`;
      if (_hull.has(code)) _hull.delete(code);
      else _hull.add(`${e[1]}-${e[0]}`);
    }
  });

  const _index = new Map();
  let start;
  _hull.forEach((e) => {
    e = e.split("-").map(Number);
    _index.set(e[0], e[1]);
    start = e[0];
  });

  if (start === undefined) return hull;

  let next = start;
  do {
    hull.push(next);
    let n = _index.get(next);
    _index.set(next, -1);
    next = n;
  } while (next > -1 && next !== start);

  return hull;
}

function geoVoronoi(data) {
  const v = function (data) {
    v.delaunay = null;
    v._data = data;

    if (typeof v._data === "object" && v._data.type === "FeatureCollection") {
      v._data = v._data.features;
    }
    if (typeof v._data === "object") {
      const temp = v._data
        .map((d) => [v._vx(d), v._vy(d), d])
        .filter((d) => isFinite(d[0] + d[1]));
      v.points = temp.map((d) => [d[0], d[1]]);
      v.valid = temp.map((d) => d[2]);
      v.delaunay = geoDelaunay(v.points);
    }
    return v;
  };

  v._vx = function (d) {
    if (typeof d == "object" && "type" in d) {
      return geoCentroid(d)[0];
    }
    if (0 in d) return d[0];
  };
  v._vy = function (d) {
    if (typeof d == "object" && "type" in d) {
      return geoCentroid(d)[1];
    }
    if (1 in d) return d[1];
  };

  v.x = function (f) {
    if (!f) return v._vx;
    v._vx = f;
    return v;
  };
  v.y = function (f) {
    if (!f) return v._vy;
    v._vy = f;
    return v;
  };

  v.polygons = function (data) {
    if (data !== undefined) {
      v(data);
    }

    if (!v.delaunay) return false;
    const coll = {
      type: "FeatureCollection",
      features: [],
    };
    if (v.valid.length === 0) return coll;
    v.delaunay.polygons.forEach((poly, i) =>
      coll.features.push({
        type: "Feature",
        geometry: !poly
          ? null
          : {
              type: "Polygon",
              coordinates: [
                [...poly, poly[0]].map((i) => v.delaunay.centers[i]),
              ],
            },
        properties: {
          site: v.valid[i],
          sitecoordinates: v.points[i],
          neighbours: v.delaunay.neighbors[i], // not part of the public API
        },
      })
    );
    if (v.valid.length === 1)
      coll.features.push({
        type: "Feature",
        geometry: { type: "Sphere" },
        properties: {
          site: v.valid[0],
          sitecoordinates: v.points[0],
          neighbours: [],
        },
      });
    return coll;
  };

  v.triangles = function (data) {
    if (data !== undefined) {
      v(data);
    }
    if (!v.delaunay) return false;

    return {
      type: "FeatureCollection",
      features: v.delaunay.triangles
        .map((tri, index) => {
          tri = tri.map((i) => v.points[i]);
          tri.center = v.delaunay.centers[index];
          return tri;
        })
        .filter((tri) => excess(tri) > 0)
        .map((tri) => ({
          type: "Feature",
          properties: {
            circumcenter: tri.center,
          },
          geometry: {
            type: "Polygon",
            coordinates: [[...tri, tri[0]]],
          },
        })),
    };
  };

  v.links = function (data) {
    if (data !== undefined) {
      v(data);
    }
    if (!v.delaunay) return false;
    const _distances = v.delaunay.edges.map((e) =>
        geoDistance(v.points[e[0]], v.points[e[1]])
      ),
      _urquart = v.delaunay.urquhart(_distances);
    return {
      type: "FeatureCollection",
      features: v.delaunay.edges.map((e, i) => ({
        type: "Feature",
        properties: {
          source: v.valid[e[0]],
          target: v.valid[e[1]],
          length: _distances[i],
          urquhart: !!_urquart[i],
        },
        geometry: {
          type: "LineString",
          coordinates: [v.points[e[0]], v.points[e[1]]],
        },
      })),
    };
  };

  v.mesh = function (data) {
    if (data !== undefined) {
      v(data);
    }
    if (!v.delaunay) return false;
    return {
      type: "MultiLineString",
      coordinates: v.delaunay.edges.map((e) => [
        v.points[e[0]],
        v.points[e[1]],
      ]),
    };
  };

  v.cellMesh = function (data) {
    if (data !== undefined) {
      v(data);
    }
    if (!v.delaunay) return false;
    const { centers, polygons } = v.delaunay;
    const coordinates = [];
    for (const p of polygons) {
      if (!p) continue;
      for (
        let n = p.length, p0 = p[n - 1], p1 = p[0], i = 0;
        i < n;
        p0 = p1, p1 = p[++i]
      ) {
        if (p1 > p0) {
          coordinates.push([centers[p0], centers[p1]]);
        }
      }
    }
    return {
      type: "MultiLineString",
      coordinates,
    };
  };

  v._found = undefined;
  v.find = function (x, y, radius) {
    v._found = v.delaunay.find(x, y, v._found);
    if (!radius || geoDistance([x, y], v.points[v._found]) < radius)
      return v._found;
  };

  v.hull = function (data) {
    if (data !== undefined) {
      v(data);
    }
    const hull = v.delaunay.hull,
      points = v.points;
    return hull.length === 0
      ? null
      : {
          type: "Polygon",
          coordinates: [[...hull.map((i) => points[i]), points[hull[0]]]],
        };
  };

  return data ? v(data) : v;
}

var graph;
var hasRequiredGraph;

function requireGraph () {
	if (hasRequiredGraph) return graph;
	hasRequiredGraph = 1;

	var DEFAULT_EDGE_NAME = "\x00";
	var GRAPH_NODE = "\x00";
	var EDGE_KEY_DELIM = "\x01";

	// Implementation notes:
	//
	//  * Node id query functions should return string ids for the nodes
	//  * Edge id query functions should return an "edgeObj", edge object, that is
	//    composed of enough information to uniquely identify an edge: {v, w, name}.
	//  * Internally we use an "edgeId", a stringified form of the edgeObj, to
	//    reference edges. This is because we need a performant way to look these
	//    edges up and, object properties, which have string keys, are the closest
	//    we're going to get to a performant hashtable in JavaScript.

	class Graph {
	  _isDirected = true;
	  _isMultigraph = false;
	  _isCompound = false;

	  // Label for the graph itself
	  _label;

	  // Defaults to be set when creating a new node
	  _defaultNodeLabelFn = () => undefined;

	  // Defaults to be set when creating a new edge
	  _defaultEdgeLabelFn = () => undefined;

	  // v -> label
	  _nodes = {};

	  // v -> edgeObj
	  _in = {};

	  // u -> v -> Number
	  _preds = {};

	  // v -> edgeObj
	  _out = {};

	  // v -> w -> Number
	  _sucs = {};

	  // e -> edgeObj
	  _edgeObjs = {};

	  // e -> label
	  _edgeLabels = {};

	  /* Number of nodes in the graph. Should only be changed by the implementation. */
	  _nodeCount = 0;

	  /* Number of edges in the graph. Should only be changed by the implementation. */
	  _edgeCount = 0;

	  _parent;

	  _children;

	  constructor(opts) {
	    if (opts) {
	      this._isDirected = Object.hasOwn(opts, "directed") ? opts.directed : true;
	      this._isMultigraph = Object.hasOwn(opts, "multigraph") ? opts.multigraph : false;
	      this._isCompound = Object.hasOwn(opts, "compound") ? opts.compound : false;
	    }

	    if (this._isCompound) {
	      // v -> parent
	      this._parent = {};

	      // v -> children
	      this._children = {};
	      this._children[GRAPH_NODE] = {};
	    }
	  }

	  /* === Graph functions ========= */

	  /**
	   * Whether graph was created with 'directed' flag set to true or not.
	   */
	  isDirected() {
	    return this._isDirected;
	  }

	  /**
	   * Whether graph was created with 'multigraph' flag set to true or not.
	   */
	  isMultigraph() {
	    return this._isMultigraph;
	  }

	  /**
	   * Whether graph was created with 'compound' flag set to true or not.
	   */
	  isCompound() {
	    return this._isCompound;
	  }

	  /**
	   * Sets the label of the graph.
	   */
	  setGraph(label) {
	    this._label = label;
	    return this;
	  }

	  /**
	   * Gets the graph label.
	   */
	  graph() {
	    return this._label;
	  }


	  /* === Node functions ========== */

	  /**
	   * Sets the default node label. If newDefault is a function, it will be
	   * invoked ach time when setting a label for a node. Otherwise, this label
	   * will be assigned as default label in case if no label was specified while
	   * setting a node.
	   * Complexity: O(1).
	   */
	  setDefaultNodeLabel(newDefault) {
	    this._defaultNodeLabelFn = newDefault;
	    if (typeof newDefault !== 'function') {
	      this._defaultNodeLabelFn = () => newDefault;
	    }

	    return this;
	  }

	  /**
	   * Gets the number of nodes in the graph.
	   * Complexity: O(1).
	   */
	  nodeCount() {
	    return this._nodeCount;
	  }

	  /**
	   * Gets all nodes of the graph. Note, the in case of compound graph subnodes are
	   * not included in list.
	   * Complexity: O(1).
	   */
	  nodes() {
	    return Object.keys(this._nodes);
	  }

	  /**
	   * Gets list of nodes without in-edges.
	   * Complexity: O(|V|).
	   */
	  sources() {
	    var self = this;
	    return this.nodes().filter(v => Object.keys(self._in[v]).length === 0);
	  }

	  /**
	   * Gets list of nodes without out-edges.
	   * Complexity: O(|V|).
	   */
	  sinks() {
	    var self = this;
	    return this.nodes().filter(v => Object.keys(self._out[v]).length === 0);
	  }

	  /**
	   * Invokes setNode method for each node in names list.
	   * Complexity: O(|names|).
	   */
	  setNodes(vs, value) {
	    var args = arguments;
	    var self = this;
	    vs.forEach(function(v) {
	      if (args.length > 1) {
	        self.setNode(v, value);
	      } else {
	        self.setNode(v);
	      }
	    });
	    return this;
	  }

	  /**
	   * Creates or updates the value for the node v in the graph. If label is supplied
	   * it is set as the value for the node. If label is not supplied and the node was
	   * created by this call then the default node label will be assigned.
	   * Complexity: O(1).
	   */
	  setNode(v, value) {
	    if (Object.hasOwn(this._nodes, v)) {
	      if (arguments.length > 1) {
	        this._nodes[v] = value;
	      }
	      return this;
	    }

	    this._nodes[v] = arguments.length > 1 ? value : this._defaultNodeLabelFn(v);
	    if (this._isCompound) {
	      this._parent[v] = GRAPH_NODE;
	      this._children[v] = {};
	      this._children[GRAPH_NODE][v] = true;
	    }
	    this._in[v] = {};
	    this._preds[v] = {};
	    this._out[v] = {};
	    this._sucs[v] = {};
	    ++this._nodeCount;
	    return this;
	  }

	  /**
	   * Gets the label of node with specified name.
	   * Complexity: O(|V|).
	   */
	  node(v) {
	    return this._nodes[v];
	  }

	  /**
	   * Detects whether graph has a node with specified name or not.
	   */
	  hasNode(v) {
	    return Object.hasOwn(this._nodes, v);
	  }

	  /**
	   * Remove the node with the name from the graph or do nothing if the node is not in
	   * the graph. If the node was removed this function also removes any incident
	   * edges.
	   * Complexity: O(1).
	   */
	  removeNode(v) {
	    var self = this;
	    if (Object.hasOwn(this._nodes, v)) {
	      var removeEdge = e => self.removeEdge(self._edgeObjs[e]);
	      delete this._nodes[v];
	      if (this._isCompound) {
	        this._removeFromParentsChildList(v);
	        delete this._parent[v];
	        this.children(v).forEach(function(child) {
	          self.setParent(child);
	        });
	        delete this._children[v];
	      }
	      Object.keys(this._in[v]).forEach(removeEdge);
	      delete this._in[v];
	      delete this._preds[v];
	      Object.keys(this._out[v]).forEach(removeEdge);
	      delete this._out[v];
	      delete this._sucs[v];
	      --this._nodeCount;
	    }
	    return this;
	  }

	  /**
	   * Sets node p as a parent for node v if it is defined, or removes the
	   * parent for v if p is undefined. Method throws an exception in case of
	   * invoking it in context of noncompound graph.
	   * Average-case complexity: O(1).
	   */
	  setParent(v, parent) {
	    if (!this._isCompound) {
	      throw new Error("Cannot set parent in a non-compound graph");
	    }

	    if (parent === undefined) {
	      parent = GRAPH_NODE;
	    } else {
	      // Coerce parent to string
	      parent += "";
	      for (var ancestor = parent; ancestor !== undefined; ancestor = this.parent(ancestor)) {
	        if (ancestor === v) {
	          throw new Error("Setting " + parent+ " as parent of " + v +
	              " would create a cycle");
	        }
	      }

	      this.setNode(parent);
	    }

	    this.setNode(v);
	    this._removeFromParentsChildList(v);
	    this._parent[v] = parent;
	    this._children[parent][v] = true;
	    return this;
	  }

	  _removeFromParentsChildList(v) {
	    delete this._children[this._parent[v]][v];
	  }

	  /**
	   * Gets parent node for node v.
	   * Complexity: O(1).
	   */
	  parent(v) {
	    if (this._isCompound) {
	      var parent = this._parent[v];
	      if (parent !== GRAPH_NODE) {
	        return parent;
	      }
	    }
	  }

	  /**
	   * Gets list of direct children of node v.
	   * Complexity: O(1).
	   */
	  children(v = GRAPH_NODE) {
	    if (this._isCompound) {
	      var children = this._children[v];
	      if (children) {
	        return Object.keys(children);
	      }
	    } else if (v === GRAPH_NODE) {
	      return this.nodes();
	    } else if (this.hasNode(v)) {
	      return [];
	    }
	  }

	  /**
	   * Return all nodes that are predecessors of the specified node or undefined if node v is not in
	   * the graph. Behavior is undefined for undirected graphs - use neighbors instead.
	   * Complexity: O(|V|).
	   */
	  predecessors(v) {
	    var predsV = this._preds[v];
	    if (predsV) {
	      return Object.keys(predsV);
	    }
	  }

	  /**
	   * Return all nodes that are successors of the specified node or undefined if node v is not in
	   * the graph. Behavior is undefined for undirected graphs - use neighbors instead.
	   * Complexity: O(|V|).
	   */
	  successors(v) {
	    var sucsV = this._sucs[v];
	    if (sucsV) {
	      return Object.keys(sucsV);
	    }
	  }

	  /**
	   * Return all nodes that are predecessors or successors of the specified node or undefined if
	   * node v is not in the graph.
	   * Complexity: O(|V|).
	   */
	  neighbors(v) {
	    var preds = this.predecessors(v);
	    if (preds) {
	      const union = new Set(preds);
	      for (var succ of this.successors(v)) {
	        union.add(succ);
	      }

	      return Array.from(union.values());
	    }
	  }

	  isLeaf(v) {
	    var neighbors;
	    if (this.isDirected()) {
	      neighbors = this.successors(v);
	    } else {
	      neighbors = this.neighbors(v);
	    }
	    return neighbors.length === 0;
	  }

	  /**
	   * Creates new graph with nodes filtered via filter. Edges incident to rejected node
	   * are also removed. In case of compound graph, if parent is rejected by filter,
	   * than all its children are rejected too.
	   * Average-case complexity: O(|E|+|V|).
	   */
	  filterNodes(filter) {
	    var copy = new this.constructor({
	      directed: this._isDirected,
	      multigraph: this._isMultigraph,
	      compound: this._isCompound
	    });

	    copy.setGraph(this.graph());

	    var self = this;
	    Object.entries(this._nodes).forEach(function([v, value]) {
	      if (filter(v)) {
	        copy.setNode(v, value);
	      }
	    });

	    Object.values(this._edgeObjs).forEach(function(e) {
	      if (copy.hasNode(e.v) && copy.hasNode(e.w)) {
	        copy.setEdge(e, self.edge(e));
	      }
	    });

	    var parents = {};
	    function findParent(v) {
	      var parent = self.parent(v);
	      if (parent === undefined || copy.hasNode(parent)) {
	        parents[v] = parent;
	        return parent;
	      } else if (parent in parents) {
	        return parents[parent];
	      } else {
	        return findParent(parent);
	      }
	    }

	    if (this._isCompound) {
	      copy.nodes().forEach(v => copy.setParent(v, findParent(v)));
	    }

	    return copy;
	  }

	  /* === Edge functions ========== */

	  /**
	   * Sets the default edge label or factory function. This label will be
	   * assigned as default label in case if no label was specified while setting
	   * an edge or this function will be invoked each time when setting an edge
	   * with no label specified and returned value * will be used as a label for edge.
	   * Complexity: O(1).
	   */
	  setDefaultEdgeLabel(newDefault) {
	    this._defaultEdgeLabelFn = newDefault;
	    if (typeof newDefault !== 'function') {
	      this._defaultEdgeLabelFn = () => newDefault;
	    }

	    return this;
	  }

	  /**
	   * Gets the number of edges in the graph.
	   * Complexity: O(1).
	   */
	  edgeCount() {
	    return this._edgeCount;
	  }

	  /**
	   * Gets edges of the graph. In case of compound graph subgraphs are not considered.
	   * Complexity: O(|E|).
	   */
	  edges() {
	    return Object.values(this._edgeObjs);
	  }

	  /**
	   * Establish an edges path over the nodes in nodes list. If some edge is already
	   * exists, it will update its label, otherwise it will create an edge between pair
	   * of nodes with label provided or default label if no label provided.
	   * Complexity: O(|nodes|).
	   */
	  setPath(vs, value) {
	    var self = this;
	    var args = arguments;
	    vs.reduce(function(v, w) {
	      if (args.length > 1) {
	        self.setEdge(v, w, value);
	      } else {
	        self.setEdge(v, w);
	      }
	      return w;
	    });
	    return this;
	  }

	  /**
	   * Creates or updates the label for the edge (v, w) with the optionally supplied
	   * name. If label is supplied it is set as the value for the edge. If label is not
	   * supplied and the edge was created by this call then the default edge label will
	   * be assigned. The name parameter is only useful with multigraphs.
	   */
	  setEdge() {
	    var v, w, name, value;
	    var valueSpecified = false;
	    var arg0 = arguments[0];

	    if (typeof arg0 === "object" && arg0 !== null && "v" in arg0) {
	      v = arg0.v;
	      w = arg0.w;
	      name = arg0.name;
	      if (arguments.length === 2) {
	        value = arguments[1];
	        valueSpecified = true;
	      }
	    } else {
	      v = arg0;
	      w = arguments[1];
	      name = arguments[3];
	      if (arguments.length > 2) {
	        value = arguments[2];
	        valueSpecified = true;
	      }
	    }

	    v = "" + v;
	    w = "" + w;
	    if (name !== undefined) {
	      name = "" + name;
	    }

	    var e = edgeArgsToId(this._isDirected, v, w, name);
	    if (Object.hasOwn(this._edgeLabels, e)) {
	      if (valueSpecified) {
	        this._edgeLabels[e] = value;
	      }
	      return this;
	    }

	    if (name !== undefined && !this._isMultigraph) {
	      throw new Error("Cannot set a named edge when isMultigraph = false");
	    }

	    // It didn't exist, so we need to create it.
	    // First ensure the nodes exist.
	    this.setNode(v);
	    this.setNode(w);

	    this._edgeLabels[e] = valueSpecified ? value : this._defaultEdgeLabelFn(v, w, name);

	    var edgeObj = edgeArgsToObj(this._isDirected, v, w, name);
	    // Ensure we add undirected edges in a consistent way.
	    v = edgeObj.v;
	    w = edgeObj.w;

	    Object.freeze(edgeObj);
	    this._edgeObjs[e] = edgeObj;
	    incrementOrInitEntry(this._preds[w], v);
	    incrementOrInitEntry(this._sucs[v], w);
	    this._in[w][e] = edgeObj;
	    this._out[v][e] = edgeObj;
	    this._edgeCount++;
	    return this;
	  }

	  /**
	   * Gets the label for the specified edge.
	   * Complexity: O(1).
	   */
	  edge(v, w, name) {
	    var e = (arguments.length === 1
	      ? edgeObjToId(this._isDirected, arguments[0])
	      : edgeArgsToId(this._isDirected, v, w, name));
	    return this._edgeLabels[e];
	  }

	  /**
	   * Gets the label for the specified edge and converts it to an object.
	   * Complexity: O(1)
	   */
	  edgeAsObj() {
	    const edge = this.edge(...arguments);
	    if (typeof edge !== "object") {
	      return {label: edge};
	    }

	    return edge;
	  }

	  /**
	   * Detects whether the graph contains specified edge or not. No subgraphs are considered.
	   * Complexity: O(1).
	   */
	  hasEdge(v, w, name) {
	    var e = (arguments.length === 1
	      ? edgeObjToId(this._isDirected, arguments[0])
	      : edgeArgsToId(this._isDirected, v, w, name));
	    return Object.hasOwn(this._edgeLabels, e);
	  }

	  /**
	   * Removes the specified edge from the graph. No subgraphs are considered.
	   * Complexity: O(1).
	   */
	  removeEdge(v, w, name) {
	    var e = (arguments.length === 1
	      ? edgeObjToId(this._isDirected, arguments[0])
	      : edgeArgsToId(this._isDirected, v, w, name));
	    var edge = this._edgeObjs[e];
	    if (edge) {
	      v = edge.v;
	      w = edge.w;
	      delete this._edgeLabels[e];
	      delete this._edgeObjs[e];
	      decrementOrRemoveEntry(this._preds[w], v);
	      decrementOrRemoveEntry(this._sucs[v], w);
	      delete this._in[w][e];
	      delete this._out[v][e];
	      this._edgeCount--;
	    }
	    return this;
	  }

	  /**
	   * Return all edges that point to the node v. Optionally filters those edges down to just those
	   * coming from node u. Behavior is undefined for undirected graphs - use nodeEdges instead.
	   * Complexity: O(|E|).
	   */
	  inEdges(v, u) {
	    var inV = this._in[v];
	    if (inV) {
	      var edges = Object.values(inV);
	      if (!u) {
	        return edges;
	      }
	      return edges.filter(edge => edge.v === u);
	    }
	  }

	  /**
	   * Return all edges that are pointed at by node v. Optionally filters those edges down to just
	   * those point to w. Behavior is undefined for undirected graphs - use nodeEdges instead.
	   * Complexity: O(|E|).
	   */
	  outEdges(v, w) {
	    var outV = this._out[v];
	    if (outV) {
	      var edges = Object.values(outV);
	      if (!w) {
	        return edges;
	      }
	      return edges.filter(edge => edge.w === w);
	    }
	  }

	  /**
	   * Returns all edges to or from node v regardless of direction. Optionally filters those edges
	   * down to just those between nodes v and w regardless of direction.
	   * Complexity: O(|E|).
	   */
	  nodeEdges(v, w) {
	    var inEdges = this.inEdges(v, w);
	    if (inEdges) {
	      return inEdges.concat(this.outEdges(v, w));
	    }
	  }
	}

	function incrementOrInitEntry(map, k) {
	  if (map[k]) {
	    map[k]++;
	  } else {
	    map[k] = 1;
	  }
	}

	function decrementOrRemoveEntry(map, k) {
	  if (!--map[k]) { delete map[k]; }
	}

	function edgeArgsToId(isDirected, v_, w_, name) {
	  var v = "" + v_;
	  var w = "" + w_;
	  if (!isDirected && v > w) {
	    var tmp = v;
	    v = w;
	    w = tmp;
	  }
	  return v + EDGE_KEY_DELIM + w + EDGE_KEY_DELIM +
	             (name === undefined ? DEFAULT_EDGE_NAME : name);
	}

	function edgeArgsToObj(isDirected, v_, w_, name) {
	  var v = "" + v_;
	  var w = "" + w_;
	  if (!isDirected && v > w) {
	    var tmp = v;
	    v = w;
	    w = tmp;
	  }
	  var edgeObj =  { v: v, w: w };
	  if (name) {
	    edgeObj.name = name;
	  }
	  return edgeObj;
	}

	function edgeObjToId(isDirected, edgeObj) {
	  return edgeArgsToId(isDirected, edgeObj.v, edgeObj.w, edgeObj.name);
	}

	graph = Graph;
	return graph;
}

var version$1;
var hasRequiredVersion$1;

function requireVersion$1 () {
	if (hasRequiredVersion$1) return version$1;
	hasRequiredVersion$1 = 1;
	version$1 = '2.2.4';
	return version$1;
}

var lib;
var hasRequiredLib;

function requireLib () {
	if (hasRequiredLib) return lib;
	hasRequiredLib = 1;
	// Includes only the "core" of graphlib
	lib = {
	  Graph: requireGraph(),
	  version: requireVersion$1()
	};
	return lib;
}

var json;
var hasRequiredJson;

function requireJson () {
	if (hasRequiredJson) return json;
	hasRequiredJson = 1;
	var Graph = requireGraph();

	json = {
	  write: write,
	  read: read
	};

	/**
	 * Creates a JSON representation of the graph that can be serialized to a string with
	 * JSON.stringify. The graph can later be restored using json.read.
	 */
	function write(g) {
	  var json = {
	    options: {
	      directed: g.isDirected(),
	      multigraph: g.isMultigraph(),
	      compound: g.isCompound()
	    },
	    nodes: writeNodes(g),
	    edges: writeEdges(g)
	  };

	  if (g.graph() !== undefined) {
	    json.value = structuredClone(g.graph());
	  }
	  return json;
	}

	function writeNodes(g) {
	  return g.nodes().map(function(v) {
	    var nodeValue = g.node(v);
	    var parent = g.parent(v);
	    var node = { v: v };
	    if (nodeValue !== undefined) {
	      node.value = nodeValue;
	    }
	    if (parent !== undefined) {
	      node.parent = parent;
	    }
	    return node;
	  });
	}

	function writeEdges(g) {
	  return g.edges().map(function(e) {
	    var edgeValue = g.edge(e);
	    var edge = { v: e.v, w: e.w };
	    if (e.name !== undefined) {
	      edge.name = e.name;
	    }
	    if (edgeValue !== undefined) {
	      edge.value = edgeValue;
	    }
	    return edge;
	  });
	}

	/**
	 * Takes JSON as input and returns the graph representation.
	 *
	 * @example
	 * var g2 = graphlib.json.read(JSON.parse(str));
	 * g2.nodes();
	 * // ['a', 'b']
	 * g2.edges()
	 * // [ { v: 'a', w: 'b' } ]
	 */
	function read(json) {
	  var g = new Graph(json.options).setGraph(json.value);
	  json.nodes.forEach(function(entry) {
	    g.setNode(entry.v, entry.value);
	    if (entry.parent) {
	      g.setParent(entry.v, entry.parent);
	    }
	  });
	  json.edges.forEach(function(entry) {
	    g.setEdge({ v: entry.v, w: entry.w, name: entry.name }, entry.value);
	  });
	  return g;
	}
	return json;
}

var components_1;
var hasRequiredComponents;

function requireComponents () {
	if (hasRequiredComponents) return components_1;
	hasRequiredComponents = 1;
	components_1 = components;

	function components(g) {
	  var visited = {};
	  var cmpts = [];
	  var cmpt;

	  function dfs(v) {
	    if (Object.hasOwn(visited, v)) return;
	    visited[v] = true;
	    cmpt.push(v);
	    g.successors(v).forEach(dfs);
	    g.predecessors(v).forEach(dfs);
	  }

	  g.nodes().forEach(function(v) {
	    cmpt = [];
	    dfs(v);
	    if (cmpt.length) {
	      cmpts.push(cmpt);
	    }
	  });

	  return cmpts;
	}
	return components_1;
}

/**
 * A min-priority queue data structure. This algorithm is derived from Cormen,
 * et al., "Introduction to Algorithms". The basic idea of a min-priority
 * queue is that you can efficiently (in O(1) time) get the smallest key in
 * the queue. Adding and removing elements takes O(log n) time. A key can
 * have its priority decreased in O(log n) time.
 */

var priorityQueue;
var hasRequiredPriorityQueue;

function requirePriorityQueue () {
	if (hasRequiredPriorityQueue) return priorityQueue;
	hasRequiredPriorityQueue = 1;
	class PriorityQueue {
	  _arr = [];
	  _keyIndices = {};

	  /**
	   * Returns the number of elements in the queue. Takes `O(1)` time.
	   */
	  size() {
	    return this._arr.length;
	  }

	  /**
	   * Returns the keys that are in the queue. Takes `O(n)` time.
	   */
	  keys() {
	    return this._arr.map(function(x) { return x.key; });
	  }

	  /**
	   * Returns `true` if **key** is in the queue and `false` if not.
	   */
	  has(key) {
	    return Object.hasOwn(this._keyIndices, key);
	  }

	  /**
	   * Returns the priority for **key**. If **key** is not present in the queue
	   * then this function returns `undefined`. Takes `O(1)` time.
	   *
	   * @param {Object} key
	   */
	  priority(key) {
	    var index = this._keyIndices[key];
	    if (index !== undefined) {
	      return this._arr[index].priority;
	    }
	  }

	  /**
	   * Returns the key for the minimum element in this queue. If the queue is
	   * empty this function throws an Error. Takes `O(1)` time.
	   */
	  min() {
	    if (this.size() === 0) {
	      throw new Error("Queue underflow");
	    }
	    return this._arr[0].key;
	  }

	  /**
	   * Inserts a new key into the priority queue. If the key already exists in
	   * the queue this function returns `false`; otherwise it will return `true`.
	   * Takes `O(n)` time.
	   *
	   * @param {Object} key the key to add
	   * @param {Number} priority the initial priority for the key
	   */
	  add(key, priority) {
	    var keyIndices = this._keyIndices;
	    key = String(key);
	    if (!Object.hasOwn(keyIndices, key)) {
	      var arr = this._arr;
	      var index = arr.length;
	      keyIndices[key] = index;
	      arr.push({key: key, priority: priority});
	      this._decrease(index);
	      return true;
	    }
	    return false;
	  }

	  /**
	   * Removes and returns the smallest key in the queue. Takes `O(log n)` time.
	   */
	  removeMin() {
	    this._swap(0, this._arr.length - 1);
	    var min = this._arr.pop();
	    delete this._keyIndices[min.key];
	    this._heapify(0);
	    return min.key;
	  }

	  /**
	   * Decreases the priority for **key** to **priority**. If the new priority is
	   * greater than the previous priority, this function will throw an Error.
	   *
	   * @param {Object} key the key for which to raise priority
	   * @param {Number} priority the new priority for the key
	   */
	  decrease(key, priority) {
	    var index = this._keyIndices[key];
	    if (priority > this._arr[index].priority) {
	      throw new Error("New priority is greater than current priority. " +
	          "Key: " + key + " Old: " + this._arr[index].priority + " New: " + priority);
	    }
	    this._arr[index].priority = priority;
	    this._decrease(index);
	  }

	  _heapify(i) {
	    var arr = this._arr;
	    var l = 2 * i;
	    var r = l + 1;
	    var largest = i;
	    if (l < arr.length) {
	      largest = arr[l].priority < arr[largest].priority ? l : largest;
	      if (r < arr.length) {
	        largest = arr[r].priority < arr[largest].priority ? r : largest;
	      }
	      if (largest !== i) {
	        this._swap(i, largest);
	        this._heapify(largest);
	      }
	    }
	  }

	  _decrease(index) {
	    var arr = this._arr;
	    var priority = arr[index].priority;
	    var parent;
	    while (index !== 0) {
	      parent = index >> 1;
	      if (arr[parent].priority < priority) {
	        break;
	      }
	      this._swap(index, parent);
	      index = parent;
	    }
	  }

	  _swap(i, j) {
	    var arr = this._arr;
	    var keyIndices = this._keyIndices;
	    var origArrI = arr[i];
	    var origArrJ = arr[j];
	    arr[i] = origArrJ;
	    arr[j] = origArrI;
	    keyIndices[origArrJ.key] = i;
	    keyIndices[origArrI.key] = j;
	  }
	}

	priorityQueue = PriorityQueue;
	return priorityQueue;
}

var dijkstra_1;
var hasRequiredDijkstra;

function requireDijkstra () {
	if (hasRequiredDijkstra) return dijkstra_1;
	hasRequiredDijkstra = 1;
	var PriorityQueue = requirePriorityQueue();

	dijkstra_1 = dijkstra;

	var DEFAULT_WEIGHT_FUNC = () => 1;

	function dijkstra(g, source, weightFn, edgeFn) {
	  return runDijkstra(g, String(source),
	    weightFn || DEFAULT_WEIGHT_FUNC,
	    edgeFn || function(v) { return g.outEdges(v); });
	}

	function runDijkstra(g, source, weightFn, edgeFn) {
	  var results = {};
	  var pq = new PriorityQueue();
	  var v, vEntry;

	  var updateNeighbors = function(edge) {
	    var w = edge.v !== v ? edge.v : edge.w;
	    var wEntry = results[w];
	    var weight = weightFn(edge);
	    var distance = vEntry.distance + weight;

	    if (weight < 0) {
	      throw new Error("dijkstra does not allow negative edge weights. " +
	                      "Bad edge: " + edge + " Weight: " + weight);
	    }

	    if (distance < wEntry.distance) {
	      wEntry.distance = distance;
	      wEntry.predecessor = v;
	      pq.decrease(w, distance);
	    }
	  };

	  g.nodes().forEach(function(v) {
	    var distance = v === source ? 0 : Number.POSITIVE_INFINITY;
	    results[v] = { distance: distance };
	    pq.add(v, distance);
	  });

	  while (pq.size() > 0) {
	    v = pq.removeMin();
	    vEntry = results[v];
	    if (vEntry.distance === Number.POSITIVE_INFINITY) {
	      break;
	    }

	    edgeFn(v).forEach(updateNeighbors);
	  }

	  return results;
	}
	return dijkstra_1;
}

var dijkstraAll_1;
var hasRequiredDijkstraAll;

function requireDijkstraAll () {
	if (hasRequiredDijkstraAll) return dijkstraAll_1;
	hasRequiredDijkstraAll = 1;
	var dijkstra = requireDijkstra();

	dijkstraAll_1 = dijkstraAll;

	function dijkstraAll(g, weightFunc, edgeFunc) {
	  return g.nodes().reduce(function(acc, v) {
	    acc[v] = dijkstra(g, v, weightFunc, edgeFunc);
	    return acc;
	  }, {});
	}
	return dijkstraAll_1;
}

var tarjan_1;
var hasRequiredTarjan;

function requireTarjan () {
	if (hasRequiredTarjan) return tarjan_1;
	hasRequiredTarjan = 1;
	tarjan_1 = tarjan;

	function tarjan(g) {
	  var index = 0;
	  var stack = [];
	  var visited = {}; // node id -> { onStack, lowlink, index }
	  var results = [];

	  function dfs(v) {
	    var entry = visited[v] = {
	      onStack: true,
	      lowlink: index,
	      index: index++
	    };
	    stack.push(v);

	    g.successors(v).forEach(function(w) {
	      if (!Object.hasOwn(visited, w)) {
	        dfs(w);
	        entry.lowlink = Math.min(entry.lowlink, visited[w].lowlink);
	      } else if (visited[w].onStack) {
	        entry.lowlink = Math.min(entry.lowlink, visited[w].index);
	      }
	    });

	    if (entry.lowlink === entry.index) {
	      var cmpt = [];
	      var w;
	      do {
	        w = stack.pop();
	        visited[w].onStack = false;
	        cmpt.push(w);
	      } while (v !== w);
	      results.push(cmpt);
	    }
	  }

	  g.nodes().forEach(function(v) {
	    if (!Object.hasOwn(visited, v)) {
	      dfs(v);
	    }
	  });

	  return results;
	}
	return tarjan_1;
}

var findCycles_1;
var hasRequiredFindCycles;

function requireFindCycles () {
	if (hasRequiredFindCycles) return findCycles_1;
	hasRequiredFindCycles = 1;
	var tarjan = requireTarjan();

	findCycles_1 = findCycles;

	function findCycles(g) {
	  return tarjan(g).filter(function(cmpt) {
	    return cmpt.length > 1 || (cmpt.length === 1 && g.hasEdge(cmpt[0], cmpt[0]));
	  });
	}
	return findCycles_1;
}

var floydWarshall_1;
var hasRequiredFloydWarshall;

function requireFloydWarshall () {
	if (hasRequiredFloydWarshall) return floydWarshall_1;
	hasRequiredFloydWarshall = 1;
	floydWarshall_1 = floydWarshall;

	var DEFAULT_WEIGHT_FUNC = () => 1;

	function floydWarshall(g, weightFn, edgeFn) {
	  return runFloydWarshall(g,
	    weightFn || DEFAULT_WEIGHT_FUNC,
	    edgeFn || function(v) { return g.outEdges(v); });
	}

	function runFloydWarshall(g, weightFn, edgeFn) {
	  var results = {};
	  var nodes = g.nodes();

	  nodes.forEach(function(v) {
	    results[v] = {};
	    results[v][v] = { distance: 0 };
	    nodes.forEach(function(w) {
	      if (v !== w) {
	        results[v][w] = { distance: Number.POSITIVE_INFINITY };
	      }
	    });
	    edgeFn(v).forEach(function(edge) {
	      var w = edge.v === v ? edge.w : edge.v;
	      var d = weightFn(edge);
	      results[v][w] = { distance: d, predecessor: v };
	    });
	  });

	  nodes.forEach(function(k) {
	    var rowK = results[k];
	    nodes.forEach(function(i) {
	      var rowI = results[i];
	      nodes.forEach(function(j) {
	        var ik = rowI[k];
	        var kj = rowK[j];
	        var ij = rowI[j];
	        var altDistance = ik.distance + kj.distance;
	        if (altDistance < ij.distance) {
	          ij.distance = altDistance;
	          ij.predecessor = kj.predecessor;
	        }
	      });
	    });
	  });

	  return results;
	}
	return floydWarshall_1;
}

var topsort_1;
var hasRequiredTopsort;

function requireTopsort () {
	if (hasRequiredTopsort) return topsort_1;
	hasRequiredTopsort = 1;
	function topsort(g) {
	  var visited = {};
	  var stack = {};
	  var results = [];

	  function visit(node) {
	    if (Object.hasOwn(stack, node)) {
	      throw new CycleException();
	    }

	    if (!Object.hasOwn(visited, node)) {
	      stack[node] = true;
	      visited[node] = true;
	      g.predecessors(node).forEach(visit);
	      delete stack[node];
	      results.push(node);
	    }
	  }

	  g.sinks().forEach(visit);

	  if (Object.keys(visited).length !== g.nodeCount()) {
	    throw new CycleException();
	  }

	  return results;
	}

	class CycleException extends Error {
	  constructor() {
	    super(...arguments);
	  }
	}

	topsort_1 = topsort;
	topsort.CycleException = CycleException;
	return topsort_1;
}

var isAcyclic_1;
var hasRequiredIsAcyclic;

function requireIsAcyclic () {
	if (hasRequiredIsAcyclic) return isAcyclic_1;
	hasRequiredIsAcyclic = 1;
	var topsort = requireTopsort();

	isAcyclic_1 = isAcyclic;

	function isAcyclic(g) {
	  try {
	    topsort(g);
	  } catch (e) {
	    if (e instanceof topsort.CycleException) {
	      return false;
	    }
	    throw e;
	  }
	  return true;
	}
	return isAcyclic_1;
}

var dfs_1;
var hasRequiredDfs;

function requireDfs () {
	if (hasRequiredDfs) return dfs_1;
	hasRequiredDfs = 1;
	dfs_1 = dfs;

	/*
	 * A helper that preforms a pre- or post-order traversal on the input graph
	 * and returns the nodes in the order they were visited. If the graph is
	 * undirected then this algorithm will navigate using neighbors. If the graph
	 * is directed then this algorithm will navigate using successors.
	 *
	 * If the order is not "post", it will be treated as "pre".
	 */
	function dfs(g, vs, order) {
	  if (!Array.isArray(vs)) {
	    vs = [vs];
	  }

	  var navigation = g.isDirected() ? v => g.successors(v) : v => g.neighbors(v);
	  var orderFunc = order === "post" ? postOrderDfs : preOrderDfs;

	  var acc = [];
	  var visited = {};
	  vs.forEach(v => {
	    if (!g.hasNode(v)) {
	      throw new Error("Graph does not have node: " + v);
	    }

	    orderFunc(v, navigation, visited, acc);
	  });

	  return acc;
	}

	function postOrderDfs(v, navigation, visited, acc) {
	  var stack = [[v, false]];
	  while (stack.length > 0) {
	    var curr = stack.pop();
	    if (curr[1]) {
	      acc.push(curr[0]);
	    } else {
	      if (!Object.hasOwn(visited, curr[0])) {
	        visited[curr[0]] = true;
	        stack.push([curr[0], true]);
	        forEachRight(navigation(curr[0]), w => stack.push([w, false]));
	      }
	    }
	  }
	}

	function preOrderDfs(v, navigation, visited, acc) {
	  var stack = [v];
	  while (stack.length > 0) {
	    var curr = stack.pop();
	    if (!Object.hasOwn(visited, curr)) {
	      visited[curr] = true;
	      acc.push(curr);
	      forEachRight(navigation(curr), w => stack.push(w));
	    }
	  }
	}

	function forEachRight(array, iteratee) {
	  var length = array.length;
	  while (length--) {
	    iteratee(array[length], length, array);
	  }

	  return array;
	}
	return dfs_1;
}

var postorder_1;
var hasRequiredPostorder;

function requirePostorder () {
	if (hasRequiredPostorder) return postorder_1;
	hasRequiredPostorder = 1;
	var dfs = requireDfs();

	postorder_1 = postorder;

	function postorder(g, vs) {
	  return dfs(g, vs, "post");
	}
	return postorder_1;
}

var preorder_1;
var hasRequiredPreorder;

function requirePreorder () {
	if (hasRequiredPreorder) return preorder_1;
	hasRequiredPreorder = 1;
	var dfs = requireDfs();

	preorder_1 = preorder;

	function preorder(g, vs) {
	  return dfs(g, vs, "pre");
	}
	return preorder_1;
}

var prim_1;
var hasRequiredPrim;

function requirePrim () {
	if (hasRequiredPrim) return prim_1;
	hasRequiredPrim = 1;
	var Graph = requireGraph();
	var PriorityQueue = requirePriorityQueue();

	prim_1 = prim;

	function prim(g, weightFunc) {
	  var result = new Graph();
	  var parents = {};
	  var pq = new PriorityQueue();
	  var v;

	  function updateNeighbors(edge) {
	    var w = edge.v === v ? edge.w : edge.v;
	    var pri = pq.priority(w);
	    if (pri !== undefined) {
	      var edgeWeight = weightFunc(edge);
	      if (edgeWeight < pri) {
	        parents[w] = v;
	        pq.decrease(w, edgeWeight);
	      }
	    }
	  }

	  if (g.nodeCount() === 0) {
	    return result;
	  }

	  g.nodes().forEach(function(v) {
	    pq.add(v, Number.POSITIVE_INFINITY);
	    result.setNode(v);
	  });

	  // Start from an arbitrary node
	  pq.decrease(g.nodes()[0], 0);

	  var init = false;
	  while (pq.size() > 0) {
	    v = pq.removeMin();
	    if (Object.hasOwn(parents, v)) {
	      result.setEdge(v, parents[v]);
	    } else if (init) {
	      throw new Error("Input graph is not connected: " + g);
	    } else {
	      init = true;
	    }

	    g.nodeEdges(v).forEach(updateNeighbors);
	  }

	  return result;
	}
	return prim_1;
}

var alg;
var hasRequiredAlg;

function requireAlg () {
	if (hasRequiredAlg) return alg;
	hasRequiredAlg = 1;
	alg = {
	  components: requireComponents(),
	  dijkstra: requireDijkstra(),
	  dijkstraAll: requireDijkstraAll(),
	  findCycles: requireFindCycles(),
	  floydWarshall: requireFloydWarshall(),
	  isAcyclic: requireIsAcyclic(),
	  postorder: requirePostorder(),
	  preorder: requirePreorder(),
	  prim: requirePrim(),
	  tarjan: requireTarjan(),
	  topsort: requireTopsort()
	};
	return alg;
}

/**
 * Copyright (c) 2014, Chris Pettitt
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. Neither the name of the copyright holder nor the names of its contributors
 * may be used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var graphlib;
var hasRequiredGraphlib;

function requireGraphlib () {
	if (hasRequiredGraphlib) return graphlib;
	hasRequiredGraphlib = 1;
	var lib = requireLib();

	graphlib = {
	  Graph: lib.Graph,
	  json: requireJson(),
	  alg: requireAlg(),
	  version: lib.version
	};
	return graphlib;
}

/*
 * Simple doubly linked list implementation derived from Cormen, et al.,
 * "Introduction to Algorithms".
 */

var list;
var hasRequiredList;

function requireList () {
	if (hasRequiredList) return list;
	hasRequiredList = 1;
	class List {
	  constructor() {
	    let sentinel = {};
	    sentinel._next = sentinel._prev = sentinel;
	    this._sentinel = sentinel;
	  }

	  dequeue() {
	    let sentinel = this._sentinel;
	    let entry = sentinel._prev;
	    if (entry !== sentinel) {
	      unlink(entry);
	      return entry;
	    }
	  }

	  enqueue(entry) {
	    let sentinel = this._sentinel;
	    if (entry._prev && entry._next) {
	      unlink(entry);
	    }
	    entry._next = sentinel._next;
	    sentinel._next._prev = entry;
	    sentinel._next = entry;
	    entry._prev = sentinel;
	  }

	  toString() {
	    let strs = [];
	    let sentinel = this._sentinel;
	    let curr = sentinel._prev;
	    while (curr !== sentinel) {
	      strs.push(JSON.stringify(curr, filterOutLinks));
	      curr = curr._prev;
	    }
	    return "[" + strs.join(", ") + "]";
	  }
	}

	function unlink(entry) {
	  entry._prev._next = entry._next;
	  entry._next._prev = entry._prev;
	  delete entry._next;
	  delete entry._prev;
	}

	function filterOutLinks(k, v) {
	  if (k !== "_next" && k !== "_prev") {
	    return v;
	  }
	}

	list = List;
	return list;
}

var greedyFas;
var hasRequiredGreedyFas;

function requireGreedyFas () {
	if (hasRequiredGreedyFas) return greedyFas;
	hasRequiredGreedyFas = 1;
	let Graph = requireGraphlib().Graph;
	let List = requireList();

	/*
	 * A greedy heuristic for finding a feedback arc set for a graph. A feedback
	 * arc set is a set of edges that can be removed to make a graph acyclic.
	 * The algorithm comes from: P. Eades, X. Lin, and W. F. Smyth, "A fast and
	 * effective heuristic for the feedback arc set problem." This implementation
	 * adjusts that from the paper to allow for weighted edges.
	 */
	greedyFas = greedyFAS;

	let DEFAULT_WEIGHT_FN = () => 1;

	function greedyFAS(g, weightFn) {
	  if (g.nodeCount() <= 1) {
	    return [];
	  }
	  let state = buildState(g, weightFn || DEFAULT_WEIGHT_FN);
	  let results = doGreedyFAS(state.graph, state.buckets, state.zeroIdx);

	  // Expand multi-edges
	  return results.flatMap(e => g.outEdges(e.v, e.w));
	}

	function doGreedyFAS(g, buckets, zeroIdx) {
	  let results = [];
	  let sources = buckets[buckets.length - 1];
	  let sinks = buckets[0];

	  let entry;
	  while (g.nodeCount()) {
	    while ((entry = sinks.dequeue()))   { removeNode(g, buckets, zeroIdx, entry); }
	    while ((entry = sources.dequeue())) { removeNode(g, buckets, zeroIdx, entry); }
	    if (g.nodeCount()) {
	      for (let i = buckets.length - 2; i > 0; --i) {
	        entry = buckets[i].dequeue();
	        if (entry) {
	          results = results.concat(removeNode(g, buckets, zeroIdx, entry, true));
	          break;
	        }
	      }
	    }
	  }

	  return results;
	}

	function removeNode(g, buckets, zeroIdx, entry, collectPredecessors) {
	  let results = collectPredecessors ? [] : undefined;

	  g.inEdges(entry.v).forEach(edge => {
	    let weight = g.edge(edge);
	    let uEntry = g.node(edge.v);

	    if (collectPredecessors) {
	      results.push({ v: edge.v, w: edge.w });
	    }

	    uEntry.out -= weight;
	    assignBucket(buckets, zeroIdx, uEntry);
	  });

	  g.outEdges(entry.v).forEach(edge => {
	    let weight = g.edge(edge);
	    let w = edge.w;
	    let wEntry = g.node(w);
	    wEntry["in"] -= weight;
	    assignBucket(buckets, zeroIdx, wEntry);
	  });

	  g.removeNode(entry.v);

	  return results;
	}

	function buildState(g, weightFn) {
	  let fasGraph = new Graph();
	  let maxIn = 0;
	  let maxOut = 0;

	  g.nodes().forEach(v => {
	    fasGraph.setNode(v, { v: v, "in": 0, out: 0 });
	  });

	  // Aggregate weights on nodes, but also sum the weights across multi-edges
	  // into a single edge for the fasGraph.
	  g.edges().forEach(e => {
	    let prevWeight = fasGraph.edge(e.v, e.w) || 0;
	    let weight = weightFn(e);
	    let edgeWeight = prevWeight + weight;
	    fasGraph.setEdge(e.v, e.w, edgeWeight);
	    maxOut = Math.max(maxOut, fasGraph.node(e.v).out += weight);
	    maxIn  = Math.max(maxIn,  fasGraph.node(e.w)["in"]  += weight);
	  });

	  let buckets = range(maxOut + maxIn + 3).map(() => new List());
	  let zeroIdx = maxIn + 1;

	  fasGraph.nodes().forEach(v => {
	    assignBucket(buckets, zeroIdx, fasGraph.node(v));
	  });

	  return { graph: fasGraph, buckets: buckets, zeroIdx: zeroIdx };
	}

	function assignBucket(buckets, zeroIdx, entry) {
	  if (!entry.out) {
	    buckets[0].enqueue(entry);
	  } else if (!entry["in"]) {
	    buckets[buckets.length - 1].enqueue(entry);
	  } else {
	    buckets[entry.out - entry["in"] + zeroIdx].enqueue(entry);
	  }
	}

	function range(limit) {
	  const range = [];
	  for (let i = 0; i < limit; i++) {
	    range.push(i);
	  }

	  return range;
	}
	return greedyFas;
}

/* eslint "no-console": off */

var util$1;
var hasRequiredUtil$1;

function requireUtil$1 () {
	if (hasRequiredUtil$1) return util$1;
	hasRequiredUtil$1 = 1;

	let Graph = requireGraphlib().Graph;

	util$1 = {
	  addBorderNode,
	  addDummyNode,
	  applyWithChunking,
	  asNonCompoundGraph,
	  buildLayerMatrix,
	  intersectRect,
	  mapValues,
	  maxRank,
	  normalizeRanks,
	  notime,
	  partition,
	  pick,
	  predecessorWeights,
	  range,
	  removeEmptyRanks,
	  simplify,
	  successorWeights,
	  time,
	  uniqueId,
	  zipObject,
	};

	/*
	 * Adds a dummy node to the graph and return v.
	 */
	function addDummyNode(g, type, attrs, name) {
	  let v;
	  do {
	    v = uniqueId(name);
	  } while (g.hasNode(v));

	  attrs.dummy = type;
	  g.setNode(v, attrs);
	  return v;
	}

	/*
	 * Returns a new graph with only simple edges. Handles aggregation of data
	 * associated with multi-edges.
	 */
	function simplify(g) {
	  let simplified = new Graph().setGraph(g.graph());
	  g.nodes().forEach(v => simplified.setNode(v, g.node(v)));
	  g.edges().forEach(e => {
	    let simpleLabel = simplified.edge(e.v, e.w) || { weight: 0, minlen: 1 };
	    let label = g.edge(e);
	    simplified.setEdge(e.v, e.w, {
	      weight: simpleLabel.weight + label.weight,
	      minlen: Math.max(simpleLabel.minlen, label.minlen)
	    });
	  });
	  return simplified;
	}

	function asNonCompoundGraph(g) {
	  let simplified = new Graph({ multigraph: g.isMultigraph() }).setGraph(g.graph());
	  g.nodes().forEach(v => {
	    if (!g.children(v).length) {
	      simplified.setNode(v, g.node(v));
	    }
	  });
	  g.edges().forEach(e => {
	    simplified.setEdge(e, g.edge(e));
	  });
	  return simplified;
	}

	function successorWeights(g) {
	  let weightMap = g.nodes().map(v => {
	    let sucs = {};
	    g.outEdges(v).forEach(e => {
	      sucs[e.w] = (sucs[e.w] || 0) + g.edge(e).weight;
	    });
	    return sucs;
	  });
	  return zipObject(g.nodes(), weightMap);
	}

	function predecessorWeights(g) {
	  let weightMap = g.nodes().map(v => {
	    let preds = {};
	    g.inEdges(v).forEach(e => {
	      preds[e.v] = (preds[e.v] || 0) + g.edge(e).weight;
	    });
	    return preds;
	  });
	  return zipObject(g.nodes(), weightMap);
	}

	/*
	 * Finds where a line starting at point ({x, y}) would intersect a rectangle
	 * ({x, y, width, height}) if it were pointing at the rectangle's center.
	 */
	function intersectRect(rect, point) {
	  let x = rect.x;
	  let y = rect.y;

	  // Rectangle intersection algorithm from:
	  // http://math.stackexchange.com/questions/108113/find-edge-between-two-boxes
	  let dx = point.x - x;
	  let dy = point.y - y;
	  let w = rect.width / 2;
	  let h = rect.height / 2;

	  if (!dx && !dy) {
	    throw new Error("Not possible to find intersection inside of the rectangle");
	  }

	  let sx, sy;
	  if (Math.abs(dy) * w > Math.abs(dx) * h) {
	    // Intersection is top or bottom of rect.
	    if (dy < 0) {
	      h = -h;
	    }
	    sx = h * dx / dy;
	    sy = h;
	  } else {
	    // Intersection is left or right of rect.
	    if (dx < 0) {
	      w = -w;
	    }
	    sx = w;
	    sy = w * dy / dx;
	  }

	  return { x: x + sx, y: y + sy };
	}

	/*
	 * Given a DAG with each node assigned "rank" and "order" properties, this
	 * function will produce a matrix with the ids of each node.
	 */
	function buildLayerMatrix(g) {
	  let layering = range(maxRank(g) + 1).map(() => []);
	  g.nodes().forEach(v => {
	    let node = g.node(v);
	    let rank = node.rank;
	    if (rank !== undefined) {
	      layering[rank][node.order] = v;
	    }
	  });
	  return layering;
	}

	/*
	 * Adjusts the ranks for all nodes in the graph such that all nodes v have
	 * rank(v) >= 0 and at least one node w has rank(w) = 0.
	 */
	function normalizeRanks(g) {
	  let nodeRanks = g.nodes().map(v => {
	    let rank = g.node(v).rank;
	    if (rank === undefined) {
	      return Number.MAX_VALUE;
	    }

	    return rank;
	  });
	  let min = applyWithChunking(Math.min, nodeRanks);
	  g.nodes().forEach(v => {
	    let node = g.node(v);
	    if (Object.hasOwn(node, "rank")) {
	      node.rank -= min;
	    }
	  });
	}

	function removeEmptyRanks(g) {
	  // Ranks may not start at 0, so we need to offset them
	  let nodeRanks = g.nodes().map(v => g.node(v).rank);
	  let offset = applyWithChunking(Math.min, nodeRanks);

	  let layers = [];
	  g.nodes().forEach(v => {
	    let rank = g.node(v).rank - offset;
	    if (!layers[rank]) {
	      layers[rank] = [];
	    }
	    layers[rank].push(v);
	  });

	  let delta = 0;
	  let nodeRankFactor = g.graph().nodeRankFactor;
	  Array.from(layers).forEach((vs, i) => {
	    if (vs === undefined && i % nodeRankFactor !== 0) {
	      --delta;
	    } else if (vs !== undefined && delta) {
	      vs.forEach(v => g.node(v).rank += delta);
	    }
	  });
	}

	function addBorderNode(g, prefix, rank, order) {
	  let node = {
	    width: 0,
	    height: 0
	  };
	  if (arguments.length >= 4) {
	    node.rank = rank;
	    node.order = order;
	  }
	  return addDummyNode(g, "border", node, prefix);
	}

	function splitToChunks(array, chunkSize = CHUNKING_THRESHOLD) {
	  const chunks = [];
	  for (let i = 0; i < array.length; i += chunkSize) {
	    const chunk = array.slice(i, i + chunkSize);
	    chunks.push(chunk);
	  }
	  return chunks;
	}

	const CHUNKING_THRESHOLD = 65535;

	function applyWithChunking(fn, argsArray) {
	  if(argsArray.length > CHUNKING_THRESHOLD) {
	    const chunks = splitToChunks(argsArray);
	    return fn.apply(null, chunks.map(chunk => fn.apply(null, chunk)));
	  } else {
	    return fn.apply(null, argsArray);
	  }
	}

	function maxRank(g) {
	  const nodes = g.nodes();
	  const nodeRanks = nodes.map(v => {
	    let rank = g.node(v).rank;
	    if (rank === undefined) {
	      return Number.MIN_VALUE;
	    }
	    return rank;
	  });

	  return applyWithChunking(Math.max, nodeRanks);
	}

	/*
	 * Partition a collection into two groups: `lhs` and `rhs`. If the supplied
	 * function returns true for an entry it goes into `lhs`. Otherwise it goes
	 * into `rhs.
	 */
	function partition(collection, fn) {
	  let result = { lhs: [], rhs: [] };
	  collection.forEach(value => {
	    if (fn(value)) {
	      result.lhs.push(value);
	    } else {
	      result.rhs.push(value);
	    }
	  });
	  return result;
	}

	/*
	 * Returns a new function that wraps `fn` with a timer. The wrapper logs the
	 * time it takes to execute the function.
	 */
	function time(name, fn) {
	  let start = Date.now();
	  try {
	    return fn();
	  } finally {
	    console.log(name + " time: " + (Date.now() - start) + "ms");
	  }
	}

	function notime(name, fn) {
	  return fn();
	}

	let idCounter = 0;
	function uniqueId(prefix) {
	  var id = ++idCounter;
	  return toString(prefix) + id;
	}

	function range(start, limit, step = 1) {
	  if (limit == null) {
	    limit = start;
	    start = 0;
	  }

	  let endCon = (i) => i < limit;
	  if (step < 0) {
	    endCon = (i) => limit < i;
	  }

	  const range = [];
	  for (let i = start; endCon(i); i += step) {
	    range.push(i);
	  }

	  return range;
	}

	function pick(source, keys) {
	  const dest = {};
	  for (const key of keys) {
	    if (source[key] !== undefined) {
	      dest[key] = source[key];
	    }
	  }

	  return dest;
	}

	function mapValues(obj, funcOrProp) {
	  let func = funcOrProp;
	  if (typeof funcOrProp === 'string') {
	    func = (val) => val[funcOrProp];
	  }

	  return Object.entries(obj).reduce((acc, [k, v]) => {
	    acc[k] = func(v, k);
	    return acc;
	  }, {});
	}

	function zipObject(props, values) {
	  return props.reduce((acc, key, i) => {
	    acc[key] = values[i];
	    return acc;
	  }, {});
	}
	return util$1;
}

var acyclic;
var hasRequiredAcyclic;

function requireAcyclic () {
	if (hasRequiredAcyclic) return acyclic;
	hasRequiredAcyclic = 1;

	let greedyFAS = requireGreedyFas();
	let uniqueId = requireUtil$1().uniqueId;

	acyclic = {
	  run: run,
	  undo: undo
	};

	function run(g) {
	  let fas = (g.graph().acyclicer === "greedy"
	    ? greedyFAS(g, weightFn(g))
	    : dfsFAS(g));
	  fas.forEach(e => {
	    let label = g.edge(e);
	    g.removeEdge(e);
	    label.forwardName = e.name;
	    label.reversed = true;
	    g.setEdge(e.w, e.v, label, uniqueId("rev"));
	  });

	  function weightFn(g) {
	    return e => {
	      return g.edge(e).weight;
	    };
	  }
	}

	function dfsFAS(g) {
	  let fas = [];
	  let stack = {};
	  let visited = {};

	  function dfs(v) {
	    if (Object.hasOwn(visited, v)) {
	      return;
	    }
	    visited[v] = true;
	    stack[v] = true;
	    g.outEdges(v).forEach(e => {
	      if (Object.hasOwn(stack, e.w)) {
	        fas.push(e);
	      } else {
	        dfs(e.w);
	      }
	    });
	    delete stack[v];
	  }

	  g.nodes().forEach(dfs);
	  return fas;
	}

	function undo(g) {
	  g.edges().forEach(e => {
	    let label = g.edge(e);
	    if (label.reversed) {
	      g.removeEdge(e);

	      let forwardName = label.forwardName;
	      delete label.reversed;
	      delete label.forwardName;
	      g.setEdge(e.w, e.v, label, forwardName);
	    }
	  });
	}
	return acyclic;
}

var normalize;
var hasRequiredNormalize;

function requireNormalize () {
	if (hasRequiredNormalize) return normalize;
	hasRequiredNormalize = 1;

	let util = requireUtil$1();

	normalize = {
	  run: run,
	  undo: undo
	};

	/*
	 * Breaks any long edges in the graph into short segments that span 1 layer
	 * each. This operation is undoable with the denormalize function.
	 *
	 * Pre-conditions:
	 *
	 *    1. The input graph is a DAG.
	 *    2. Each node in the graph has a "rank" property.
	 *
	 * Post-condition:
	 *
	 *    1. All edges in the graph have a length of 1.
	 *    2. Dummy nodes are added where edges have been split into segments.
	 *    3. The graph is augmented with a "dummyChains" attribute which contains
	 *       the first dummy in each chain of dummy nodes produced.
	 */
	function run(g) {
	  g.graph().dummyChains = [];
	  g.edges().forEach(edge => normalizeEdge(g, edge));
	}

	function normalizeEdge(g, e) {
	  let v = e.v;
	  let vRank = g.node(v).rank;
	  let w = e.w;
	  let wRank = g.node(w).rank;
	  let name = e.name;
	  let edgeLabel = g.edge(e);
	  let labelRank = edgeLabel.labelRank;

	  if (wRank === vRank + 1) return;

	  g.removeEdge(e);

	  let dummy, attrs, i;
	  for (i = 0, ++vRank; vRank < wRank; ++i, ++vRank) {
	    edgeLabel.points = [];
	    attrs = {
	      width: 0, height: 0,
	      edgeLabel: edgeLabel, edgeObj: e,
	      rank: vRank
	    };
	    dummy = util.addDummyNode(g, "edge", attrs, "_d");
	    if (vRank === labelRank) {
	      attrs.width = edgeLabel.width;
	      attrs.height = edgeLabel.height;
	      attrs.dummy = "edge-label";
	      attrs.labelpos = edgeLabel.labelpos;
	    }
	    g.setEdge(v, dummy, { weight: edgeLabel.weight }, name);
	    if (i === 0) {
	      g.graph().dummyChains.push(dummy);
	    }
	    v = dummy;
	  }

	  g.setEdge(v, w, { weight: edgeLabel.weight }, name);
	}

	function undo(g) {
	  g.graph().dummyChains.forEach(v => {
	    let node = g.node(v);
	    let origLabel = node.edgeLabel;
	    let w;
	    g.setEdge(node.edgeObj, origLabel);
	    while (node.dummy) {
	      w = g.successors(v)[0];
	      g.removeNode(v);
	      origLabel.points.push({ x: node.x, y: node.y });
	      if (node.dummy === "edge-label") {
	        origLabel.x = node.x;
	        origLabel.y = node.y;
	        origLabel.width = node.width;
	        origLabel.height = node.height;
	      }
	      v = w;
	      node = g.node(v);
	    }
	  });
	}
	return normalize;
}

var util;
var hasRequiredUtil;

function requireUtil () {
	if (hasRequiredUtil) return util;
	hasRequiredUtil = 1;

	const { applyWithChunking } = requireUtil$1();

	util = {
	  longestPath: longestPath,
	  slack: slack
	};

	/*
	 * Initializes ranks for the input graph using the longest path algorithm. This
	 * algorithm scales well and is fast in practice, it yields rather poor
	 * solutions. Nodes are pushed to the lowest layer possible, leaving the bottom
	 * ranks wide and leaving edges longer than necessary. However, due to its
	 * speed, this algorithm is good for getting an initial ranking that can be fed
	 * into other algorithms.
	 *
	 * This algorithm does not normalize layers because it will be used by other
	 * algorithms in most cases. If using this algorithm directly, be sure to
	 * run normalize at the end.
	 *
	 * Pre-conditions:
	 *
	 *    1. Input graph is a DAG.
	 *    2. Input graph node labels can be assigned properties.
	 *
	 * Post-conditions:
	 *
	 *    1. Each node will be assign an (unnormalized) "rank" property.
	 */
	function longestPath(g) {
	  var visited = {};

	  function dfs(v) {
	    var label = g.node(v);
	    if (Object.hasOwn(visited, v)) {
	      return label.rank;
	    }
	    visited[v] = true;

	    let outEdgesMinLens = g.outEdges(v).map(e => {
	      if (e == null) {
	        return Number.POSITIVE_INFINITY;
	      }

	      return dfs(e.w) - g.edge(e).minlen;
	    });

	    var rank = applyWithChunking(Math.min, outEdgesMinLens);

	    if (rank === Number.POSITIVE_INFINITY) {
	      rank = 0;
	    }

	    return (label.rank = rank);
	  }

	  g.sources().forEach(dfs);
	}

	/*
	 * Returns the amount of slack for the given edge. The slack is defined as the
	 * difference between the length of the edge and its minimum length.
	 */
	function slack(g, e) {
	  return g.node(e.w).rank - g.node(e.v).rank - g.edge(e).minlen;
	}
	return util;
}

var feasibleTree_1;
var hasRequiredFeasibleTree;

function requireFeasibleTree () {
	if (hasRequiredFeasibleTree) return feasibleTree_1;
	hasRequiredFeasibleTree = 1;

	var Graph = requireGraphlib().Graph;
	var slack = requireUtil().slack;

	feasibleTree_1 = feasibleTree;

	/*
	 * Constructs a spanning tree with tight edges and adjusted the input node's
	 * ranks to achieve this. A tight edge is one that is has a length that matches
	 * its "minlen" attribute.
	 *
	 * The basic structure for this function is derived from Gansner, et al., "A
	 * Technique for Drawing Directed Graphs."
	 *
	 * Pre-conditions:
	 *
	 *    1. Graph must be a DAG.
	 *    2. Graph must be connected.
	 *    3. Graph must have at least one node.
	 *    5. Graph nodes must have been previously assigned a "rank" property that
	 *       respects the "minlen" property of incident edges.
	 *    6. Graph edges must have a "minlen" property.
	 *
	 * Post-conditions:
	 *
	 *    - Graph nodes will have their rank adjusted to ensure that all edges are
	 *      tight.
	 *
	 * Returns a tree (undirected graph) that is constructed using only "tight"
	 * edges.
	 */
	function feasibleTree(g) {
	  var t = new Graph({ directed: false });

	  // Choose arbitrary node from which to start our tree
	  var start = g.nodes()[0];
	  var size = g.nodeCount();
	  t.setNode(start, {});

	  var edge, delta;
	  while (tightTree(t, g) < size) {
	    edge = findMinSlackEdge(t, g);
	    delta = t.hasNode(edge.v) ? slack(g, edge) : -slack(g, edge);
	    shiftRanks(t, g, delta);
	  }

	  return t;
	}

	/*
	 * Finds a maximal tree of tight edges and returns the number of nodes in the
	 * tree.
	 */
	function tightTree(t, g) {
	  function dfs(v) {
	    g.nodeEdges(v).forEach(e => {
	      var edgeV = e.v,
	        w = (v === edgeV) ? e.w : edgeV;
	      if (!t.hasNode(w) && !slack(g, e)) {
	        t.setNode(w, {});
	        t.setEdge(v, w, {});
	        dfs(w);
	      }
	    });
	  }

	  t.nodes().forEach(dfs);
	  return t.nodeCount();
	}

	/*
	 * Finds the edge with the smallest slack that is incident on tree and returns
	 * it.
	 */
	function findMinSlackEdge(t, g) {
	  const edges = g.edges();

	  return edges.reduce((acc, edge) => {
	    let edgeSlack = Number.POSITIVE_INFINITY;
	    if (t.hasNode(edge.v) !== t.hasNode(edge.w)) {
	      edgeSlack = slack(g, edge);
	    }

	    if (edgeSlack < acc[0]) {
	      return [edgeSlack, edge];
	    }

	    return acc;
	  }, [Number.POSITIVE_INFINITY, null])[1];
	}

	function shiftRanks(t, g, delta) {
	  t.nodes().forEach(v => g.node(v).rank += delta);
	}
	return feasibleTree_1;
}

var networkSimplex_1;
var hasRequiredNetworkSimplex;

function requireNetworkSimplex () {
	if (hasRequiredNetworkSimplex) return networkSimplex_1;
	hasRequiredNetworkSimplex = 1;

	var feasibleTree = requireFeasibleTree();
	var slack = requireUtil().slack;
	var initRank = requireUtil().longestPath;
	var preorder = requireGraphlib().alg.preorder;
	var postorder = requireGraphlib().alg.postorder;
	var simplify = requireUtil$1().simplify;

	networkSimplex_1 = networkSimplex;

	// Expose some internals for testing purposes
	networkSimplex.initLowLimValues = initLowLimValues;
	networkSimplex.initCutValues = initCutValues;
	networkSimplex.calcCutValue = calcCutValue;
	networkSimplex.leaveEdge = leaveEdge;
	networkSimplex.enterEdge = enterEdge;
	networkSimplex.exchangeEdges = exchangeEdges;

	/*
	 * The network simplex algorithm assigns ranks to each node in the input graph
	 * and iteratively improves the ranking to reduce the length of edges.
	 *
	 * Preconditions:
	 *
	 *    1. The input graph must be a DAG.
	 *    2. All nodes in the graph must have an object value.
	 *    3. All edges in the graph must have "minlen" and "weight" attributes.
	 *
	 * Postconditions:
	 *
	 *    1. All nodes in the graph will have an assigned "rank" attribute that has
	 *       been optimized by the network simplex algorithm. Ranks start at 0.
	 *
	 *
	 * A rough sketch of the algorithm is as follows:
	 *
	 *    1. Assign initial ranks to each node. We use the longest path algorithm,
	 *       which assigns ranks to the lowest position possible. In general this
	 *       leads to very wide bottom ranks and unnecessarily long edges.
	 *    2. Construct a feasible tight tree. A tight tree is one such that all
	 *       edges in the tree have no slack (difference between length of edge
	 *       and minlen for the edge). This by itself greatly improves the assigned
	 *       rankings by shorting edges.
	 *    3. Iteratively find edges that have negative cut values. Generally a
	 *       negative cut value indicates that the edge could be removed and a new
	 *       tree edge could be added to produce a more compact graph.
	 *
	 * Much of the algorithms here are derived from Gansner, et al., "A Technique
	 * for Drawing Directed Graphs." The structure of the file roughly follows the
	 * structure of the overall algorithm.
	 */
	function networkSimplex(g) {
	  g = simplify(g);
	  initRank(g);
	  var t = feasibleTree(g);
	  initLowLimValues(t);
	  initCutValues(t, g);

	  var e, f;
	  while ((e = leaveEdge(t))) {
	    f = enterEdge(t, g, e);
	    exchangeEdges(t, g, e, f);
	  }
	}

	/*
	 * Initializes cut values for all edges in the tree.
	 */
	function initCutValues(t, g) {
	  var vs = postorder(t, t.nodes());
	  vs = vs.slice(0, vs.length - 1);
	  vs.forEach(v => assignCutValue(t, g, v));
	}

	function assignCutValue(t, g, child) {
	  var childLab = t.node(child);
	  var parent = childLab.parent;
	  t.edge(child, parent).cutvalue = calcCutValue(t, g, child);
	}

	/*
	 * Given the tight tree, its graph, and a child in the graph calculate and
	 * return the cut value for the edge between the child and its parent.
	 */
	function calcCutValue(t, g, child) {
	  var childLab = t.node(child);
	  var parent = childLab.parent;
	  // True if the child is on the tail end of the edge in the directed graph
	  var childIsTail = true;
	  // The graph's view of the tree edge we're inspecting
	  var graphEdge = g.edge(child, parent);
	  // The accumulated cut value for the edge between this node and its parent
	  var cutValue = 0;

	  if (!graphEdge) {
	    childIsTail = false;
	    graphEdge = g.edge(parent, child);
	  }

	  cutValue = graphEdge.weight;

	  g.nodeEdges(child).forEach(e => {
	    var isOutEdge = e.v === child,
	      other = isOutEdge ? e.w : e.v;

	    if (other !== parent) {
	      var pointsToHead = isOutEdge === childIsTail,
	        otherWeight = g.edge(e).weight;

	      cutValue += pointsToHead ? otherWeight : -otherWeight;
	      if (isTreeEdge(t, child, other)) {
	        var otherCutValue = t.edge(child, other).cutvalue;
	        cutValue += pointsToHead ? -otherCutValue : otherCutValue;
	      }
	    }
	  });

	  return cutValue;
	}

	function initLowLimValues(tree, root) {
	  if (arguments.length < 2) {
	    root = tree.nodes()[0];
	  }
	  dfsAssignLowLim(tree, {}, 1, root);
	}

	function dfsAssignLowLim(tree, visited, nextLim, v, parent) {
	  var low = nextLim;
	  var label = tree.node(v);

	  visited[v] = true;
	  tree.neighbors(v).forEach(w => {
	    if (!Object.hasOwn(visited, w)) {
	      nextLim = dfsAssignLowLim(tree, visited, nextLim, w, v);
	    }
	  });

	  label.low = low;
	  label.lim = nextLim++;
	  if (parent) {
	    label.parent = parent;
	  } else {
	    // TODO should be able to remove this when we incrementally update low lim
	    delete label.parent;
	  }

	  return nextLim;
	}

	function leaveEdge(tree) {
	  return tree.edges().find(e => tree.edge(e).cutvalue < 0);
	}

	function enterEdge(t, g, edge) {
	  var v = edge.v;
	  var w = edge.w;

	  // For the rest of this function we assume that v is the tail and w is the
	  // head, so if we don't have this edge in the graph we should flip it to
	  // match the correct orientation.
	  if (!g.hasEdge(v, w)) {
	    v = edge.w;
	    w = edge.v;
	  }

	  var vLabel = t.node(v);
	  var wLabel = t.node(w);
	  var tailLabel = vLabel;
	  var flip = false;

	  // If the root is in the tail of the edge then we need to flip the logic that
	  // checks for the head and tail nodes in the candidates function below.
	  if (vLabel.lim > wLabel.lim) {
	    tailLabel = wLabel;
	    flip = true;
	  }

	  var candidates = g.edges().filter(edge => {
	    return flip === isDescendant(t, t.node(edge.v), tailLabel) &&
	           flip !== isDescendant(t, t.node(edge.w), tailLabel);
	  });

	  return candidates.reduce((acc, edge) => {
	    if (slack(g, edge) < slack(g, acc)) {
	      return edge;
	    }

	    return acc;
	  });
	}

	function exchangeEdges(t, g, e, f) {
	  var v = e.v;
	  var w = e.w;
	  t.removeEdge(v, w);
	  t.setEdge(f.v, f.w, {});
	  initLowLimValues(t);
	  initCutValues(t, g);
	  updateRanks(t, g);
	}

	function updateRanks(t, g) {
	  var root = t.nodes().find(v => !g.node(v).parent);
	  var vs = preorder(t, root);
	  vs = vs.slice(1);
	  vs.forEach(v => {
	    var parent = t.node(v).parent,
	      edge = g.edge(v, parent),
	      flipped = false;

	    if (!edge) {
	      edge = g.edge(parent, v);
	      flipped = true;
	    }

	    g.node(v).rank = g.node(parent).rank + (flipped ? edge.minlen : -edge.minlen);
	  });
	}

	/*
	 * Returns true if the edge is in the tree.
	 */
	function isTreeEdge(tree, u, v) {
	  return tree.hasEdge(u, v);
	}

	/*
	 * Returns true if the specified node is descendant of the root node per the
	 * assigned low and lim attributes in the tree.
	 */
	function isDescendant(tree, vLabel, rootLabel) {
	  return rootLabel.low <= vLabel.lim && vLabel.lim <= rootLabel.lim;
	}
	return networkSimplex_1;
}

var rank_1;
var hasRequiredRank;

function requireRank () {
	if (hasRequiredRank) return rank_1;
	hasRequiredRank = 1;

	var rankUtil = requireUtil();
	var longestPath = rankUtil.longestPath;
	var feasibleTree = requireFeasibleTree();
	var networkSimplex = requireNetworkSimplex();

	rank_1 = rank;

	/*
	 * Assigns a rank to each node in the input graph that respects the "minlen"
	 * constraint specified on edges between nodes.
	 *
	 * This basic structure is derived from Gansner, et al., "A Technique for
	 * Drawing Directed Graphs."
	 *
	 * Pre-conditions:
	 *
	 *    1. Graph must be a connected DAG
	 *    2. Graph nodes must be objects
	 *    3. Graph edges must have "weight" and "minlen" attributes
	 *
	 * Post-conditions:
	 *
	 *    1. Graph nodes will have a "rank" attribute based on the results of the
	 *       algorithm. Ranks can start at any index (including negative), we'll
	 *       fix them up later.
	 */
	function rank(g) {
	  switch(g.graph().ranker) {
	  case "network-simplex": networkSimplexRanker(g); break;
	  case "tight-tree": tightTreeRanker(g); break;
	  case "longest-path": longestPathRanker(g); break;
	  default: networkSimplexRanker(g);
	  }
	}

	// A fast and simple ranker, but results are far from optimal.
	var longestPathRanker = longestPath;

	function tightTreeRanker(g) {
	  longestPath(g);
	  feasibleTree(g);
	}

	function networkSimplexRanker(g) {
	  networkSimplex(g);
	}
	return rank_1;
}

var parentDummyChains_1;
var hasRequiredParentDummyChains;

function requireParentDummyChains () {
	if (hasRequiredParentDummyChains) return parentDummyChains_1;
	hasRequiredParentDummyChains = 1;
	parentDummyChains_1 = parentDummyChains;

	function parentDummyChains(g) {
	  let postorderNums = postorder(g);

	  g.graph().dummyChains.forEach(v => {
	    let node = g.node(v);
	    let edgeObj = node.edgeObj;
	    let pathData = findPath(g, postorderNums, edgeObj.v, edgeObj.w);
	    let path = pathData.path;
	    let lca = pathData.lca;
	    let pathIdx = 0;
	    let pathV = path[pathIdx];
	    let ascending = true;

	    while (v !== edgeObj.w) {
	      node = g.node(v);

	      if (ascending) {
	        while ((pathV = path[pathIdx]) !== lca &&
	               g.node(pathV).maxRank < node.rank) {
	          pathIdx++;
	        }

	        if (pathV === lca) {
	          ascending = false;
	        }
	      }

	      if (!ascending) {
	        while (pathIdx < path.length - 1 &&
	               g.node(pathV = path[pathIdx + 1]).minRank <= node.rank) {
	          pathIdx++;
	        }
	        pathV = path[pathIdx];
	      }

	      g.setParent(v, pathV);
	      v = g.successors(v)[0];
	    }
	  });
	}

	// Find a path from v to w through the lowest common ancestor (LCA). Return the
	// full path and the LCA.
	function findPath(g, postorderNums, v, w) {
	  let vPath = [];
	  let wPath = [];
	  let low = Math.min(postorderNums[v].low, postorderNums[w].low);
	  let lim = Math.max(postorderNums[v].lim, postorderNums[w].lim);
	  let parent;
	  let lca;

	  // Traverse up from v to find the LCA
	  parent = v;
	  do {
	    parent = g.parent(parent);
	    vPath.push(parent);
	  } while (parent &&
	           (postorderNums[parent].low > low || lim > postorderNums[parent].lim));
	  lca = parent;

	  // Traverse from w to LCA
	  parent = w;
	  while ((parent = g.parent(parent)) !== lca) {
	    wPath.push(parent);
	  }

	  return { path: vPath.concat(wPath.reverse()), lca: lca };
	}

	function postorder(g) {
	  let result = {};
	  let lim = 0;

	  function dfs(v) {
	    let low = lim;
	    g.children(v).forEach(dfs);
	    result[v] = { low: low, lim: lim++ };
	  }
	  g.children().forEach(dfs);

	  return result;
	}
	return parentDummyChains_1;
}

var nestingGraph;
var hasRequiredNestingGraph;

function requireNestingGraph () {
	if (hasRequiredNestingGraph) return nestingGraph;
	hasRequiredNestingGraph = 1;
	let util = requireUtil$1();

	nestingGraph = {
	  run,
	  cleanup,
	};

	/*
	 * A nesting graph creates dummy nodes for the tops and bottoms of subgraphs,
	 * adds appropriate edges to ensure that all cluster nodes are placed between
	 * these boundaries, and ensures that the graph is connected.
	 *
	 * In addition we ensure, through the use of the minlen property, that nodes
	 * and subgraph border nodes to not end up on the same rank.
	 *
	 * Preconditions:
	 *
	 *    1. Input graph is a DAG
	 *    2. Nodes in the input graph has a minlen attribute
	 *
	 * Postconditions:
	 *
	 *    1. Input graph is connected.
	 *    2. Dummy nodes are added for the tops and bottoms of subgraphs.
	 *    3. The minlen attribute for nodes is adjusted to ensure nodes do not
	 *       get placed on the same rank as subgraph border nodes.
	 *
	 * The nesting graph idea comes from Sander, "Layout of Compound Directed
	 * Graphs."
	 */
	function run(g) {
	  let root = util.addDummyNode(g, "root", {}, "_root");
	  let depths = treeDepths(g);
	  let depthsArr = Object.values(depths);
	  let height = util.applyWithChunking(Math.max, depthsArr) - 1; // Note: depths is an Object not an array
	  let nodeSep = 2 * height + 1;

	  g.graph().nestingRoot = root;

	  // Multiply minlen by nodeSep to align nodes on non-border ranks.
	  g.edges().forEach(e => g.edge(e).minlen *= nodeSep);

	  // Calculate a weight that is sufficient to keep subgraphs vertically compact
	  let weight = sumWeights(g) + 1;

	  // Create border nodes and link them up
	  g.children().forEach(child => dfs(g, root, nodeSep, weight, height, depths, child));

	  // Save the multiplier for node layers for later removal of empty border
	  // layers.
	  g.graph().nodeRankFactor = nodeSep;
	}

	function dfs(g, root, nodeSep, weight, height, depths, v) {
	  let children = g.children(v);
	  if (!children.length) {
	    if (v !== root) {
	      g.setEdge(root, v, { weight: 0, minlen: nodeSep });
	    }
	    return;
	  }

	  let top = util.addBorderNode(g, "_bt");
	  let bottom = util.addBorderNode(g, "_bb");
	  let label = g.node(v);

	  g.setParent(top, v);
	  label.borderTop = top;
	  g.setParent(bottom, v);
	  label.borderBottom = bottom;

	  children.forEach(child => {
	    dfs(g, root, nodeSep, weight, height, depths, child);

	    let childNode = g.node(child);
	    let childTop = childNode.borderTop ? childNode.borderTop : child;
	    let childBottom = childNode.borderBottom ? childNode.borderBottom : child;
	    let thisWeight = childNode.borderTop ? weight : 2 * weight;
	    let minlen = childTop !== childBottom ? 1 : height - depths[v] + 1;

	    g.setEdge(top, childTop, {
	      weight: thisWeight,
	      minlen: minlen,
	      nestingEdge: true
	    });

	    g.setEdge(childBottom, bottom, {
	      weight: thisWeight,
	      minlen: minlen,
	      nestingEdge: true
	    });
	  });

	  if (!g.parent(v)) {
	    g.setEdge(root, top, { weight: 0, minlen: height + depths[v] });
	  }
	}

	function treeDepths(g) {
	  var depths = {};
	  function dfs(v, depth) {
	    var children = g.children(v);
	    if (children && children.length) {
	      children.forEach(child => dfs(child, depth + 1));
	    }
	    depths[v] = depth;
	  }
	  g.children().forEach(v => dfs(v, 1));
	  return depths;
	}

	function sumWeights(g) {
	  return g.edges().reduce((acc, e) => acc + g.edge(e).weight, 0);
	}

	function cleanup(g) {
	  var graphLabel = g.graph();
	  g.removeNode(graphLabel.nestingRoot);
	  delete graphLabel.nestingRoot;
	  g.edges().forEach(e => {
	    var edge = g.edge(e);
	    if (edge.nestingEdge) {
	      g.removeEdge(e);
	    }
	  });
	}
	return nestingGraph;
}

var addBorderSegments_1;
var hasRequiredAddBorderSegments;

function requireAddBorderSegments () {
	if (hasRequiredAddBorderSegments) return addBorderSegments_1;
	hasRequiredAddBorderSegments = 1;
	let util = requireUtil$1();

	addBorderSegments_1 = addBorderSegments;

	function addBorderSegments(g) {
	  function dfs(v) {
	    let children = g.children(v);
	    let node = g.node(v);
	    if (children.length) {
	      children.forEach(dfs);
	    }

	    if (Object.hasOwn(node, "minRank")) {
	      node.borderLeft = [];
	      node.borderRight = [];
	      for (let rank = node.minRank, maxRank = node.maxRank + 1;
	        rank < maxRank;
	        ++rank) {
	        addBorderNode(g, "borderLeft", "_bl", v, node, rank);
	        addBorderNode(g, "borderRight", "_br", v, node, rank);
	      }
	    }
	  }

	  g.children().forEach(dfs);
	}

	function addBorderNode(g, prop, prefix, sg, sgNode, rank) {
	  let label = { width: 0, height: 0, rank: rank, borderType: prop };
	  let prev = sgNode[prop][rank - 1];
	  let curr = util.addDummyNode(g, "border", label, prefix);
	  sgNode[prop][rank] = curr;
	  g.setParent(curr, sg);
	  if (prev) {
	    g.setEdge(prev, curr, { weight: 1 });
	  }
	}
	return addBorderSegments_1;
}

var coordinateSystem;
var hasRequiredCoordinateSystem;

function requireCoordinateSystem () {
	if (hasRequiredCoordinateSystem) return coordinateSystem;
	hasRequiredCoordinateSystem = 1;

	coordinateSystem = {
	  adjust: adjust,
	  undo: undo
	};

	function adjust(g) {
	  let rankDir = g.graph().rankdir.toLowerCase();
	  if (rankDir === "lr" || rankDir === "rl") {
	    swapWidthHeight(g);
	  }
	}

	function undo(g) {
	  let rankDir = g.graph().rankdir.toLowerCase();
	  if (rankDir === "bt" || rankDir === "rl") {
	    reverseY(g);
	  }

	  if (rankDir === "lr" || rankDir === "rl") {
	    swapXY(g);
	    swapWidthHeight(g);
	  }
	}

	function swapWidthHeight(g) {
	  g.nodes().forEach(v => swapWidthHeightOne(g.node(v)));
	  g.edges().forEach(e => swapWidthHeightOne(g.edge(e)));
	}

	function swapWidthHeightOne(attrs) {
	  let w = attrs.width;
	  attrs.width = attrs.height;
	  attrs.height = w;
	}

	function reverseY(g) {
	  g.nodes().forEach(v => reverseYOne(g.node(v)));

	  g.edges().forEach(e => {
	    let edge = g.edge(e);
	    edge.points.forEach(reverseYOne);
	    if (Object.hasOwn(edge, "y")) {
	      reverseYOne(edge);
	    }
	  });
	}

	function reverseYOne(attrs) {
	  attrs.y = -attrs.y;
	}

	function swapXY(g) {
	  g.nodes().forEach(v => swapXYOne(g.node(v)));

	  g.edges().forEach(e => {
	    let edge = g.edge(e);
	    edge.points.forEach(swapXYOne);
	    if (Object.hasOwn(edge, "x")) {
	      swapXYOne(edge);
	    }
	  });
	}

	function swapXYOne(attrs) {
	  let x = attrs.x;
	  attrs.x = attrs.y;
	  attrs.y = x;
	}
	return coordinateSystem;
}

var initOrder_1;
var hasRequiredInitOrder;

function requireInitOrder () {
	if (hasRequiredInitOrder) return initOrder_1;
	hasRequiredInitOrder = 1;

	let util = requireUtil$1();

	initOrder_1 = initOrder;

	/*
	 * Assigns an initial order value for each node by performing a DFS search
	 * starting from nodes in the first rank. Nodes are assigned an order in their
	 * rank as they are first visited.
	 *
	 * This approach comes from Gansner, et al., "A Technique for Drawing Directed
	 * Graphs."
	 *
	 * Returns a layering matrix with an array per layer and each layer sorted by
	 * the order of its nodes.
	 */
	function initOrder(g) {
	  let visited = {};
	  let simpleNodes = g.nodes().filter(v => !g.children(v).length);
	  let simpleNodesRanks = simpleNodes.map(v => g.node(v).rank);
	  let maxRank = util.applyWithChunking(Math.max, simpleNodesRanks);
	  let layers = util.range(maxRank + 1).map(() => []);

	  function dfs(v) {
	    if (visited[v]) return;
	    visited[v] = true;
	    let node = g.node(v);
	    layers[node.rank].push(v);
	    g.successors(v).forEach(dfs);
	  }

	  let orderedVs = simpleNodes.sort((a, b) => g.node(a).rank - g.node(b).rank);
	  orderedVs.forEach(dfs);

	  return layers;
	}
	return initOrder_1;
}

var crossCount_1;
var hasRequiredCrossCount;

function requireCrossCount () {
	if (hasRequiredCrossCount) return crossCount_1;
	hasRequiredCrossCount = 1;

	let zipObject = requireUtil$1().zipObject;

	crossCount_1 = crossCount;

	/*
	 * A function that takes a layering (an array of layers, each with an array of
	 * ordererd nodes) and a graph and returns a weighted crossing count.
	 *
	 * Pre-conditions:
	 *
	 *    1. Input graph must be simple (not a multigraph), directed, and include
	 *       only simple edges.
	 *    2. Edges in the input graph must have assigned weights.
	 *
	 * Post-conditions:
	 *
	 *    1. The graph and layering matrix are left unchanged.
	 *
	 * This algorithm is derived from Barth, et al., "Bilayer Cross Counting."
	 */
	function crossCount(g, layering) {
	  let cc = 0;
	  for (let i = 1; i < layering.length; ++i) {
	    cc += twoLayerCrossCount(g, layering[i-1], layering[i]);
	  }
	  return cc;
	}

	function twoLayerCrossCount(g, northLayer, southLayer) {
	  // Sort all of the edges between the north and south layers by their position
	  // in the north layer and then the south. Map these edges to the position of
	  // their head in the south layer.
	  let southPos = zipObject(southLayer, southLayer.map((v, i) => i));
	  let southEntries = northLayer.flatMap(v => {
	    return g.outEdges(v).map(e => {
	      return { pos: southPos[e.w], weight: g.edge(e).weight };
	    }).sort((a, b) => a.pos - b.pos);
	  });

	  // Build the accumulator tree
	  let firstIndex = 1;
	  while (firstIndex < southLayer.length) firstIndex <<= 1;
	  let treeSize = 2 * firstIndex - 1;
	  firstIndex -= 1;
	  let tree = new Array(treeSize).fill(0);

	  // Calculate the weighted crossings
	  let cc = 0;
	  southEntries.forEach(entry => {
	    let index = entry.pos + firstIndex;
	    tree[index] += entry.weight;
	    let weightSum = 0;
	    while (index > 0) {
	      if (index % 2) {
	        weightSum += tree[index + 1];
	      }
	      index = (index - 1) >> 1;
	      tree[index] += entry.weight;
	    }
	    cc += entry.weight * weightSum;
	  });

	  return cc;
	}
	return crossCount_1;
}

var barycenter_1;
var hasRequiredBarycenter;

function requireBarycenter () {
	if (hasRequiredBarycenter) return barycenter_1;
	hasRequiredBarycenter = 1;
	barycenter_1 = barycenter;

	function barycenter(g, movable = []) {
	  return movable.map(v => {
	    let inV = g.inEdges(v);
	    if (!inV.length) {
	      return { v: v };
	    } else {
	      let result = inV.reduce((acc, e) => {
	        let edge = g.edge(e),
	          nodeU = g.node(e.v);
	        return {
	          sum: acc.sum + (edge.weight * nodeU.order),
	          weight: acc.weight + edge.weight
	        };
	      }, { sum: 0, weight: 0 });

	      return {
	        v: v,
	        barycenter: result.sum / result.weight,
	        weight: result.weight
	      };
	    }
	  });
	}
	return barycenter_1;
}

var resolveConflicts_1;
var hasRequiredResolveConflicts;

function requireResolveConflicts () {
	if (hasRequiredResolveConflicts) return resolveConflicts_1;
	hasRequiredResolveConflicts = 1;

	let util = requireUtil$1();

	resolveConflicts_1 = resolveConflicts;

	/*
	 * Given a list of entries of the form {v, barycenter, weight} and a
	 * constraint graph this function will resolve any conflicts between the
	 * constraint graph and the barycenters for the entries. If the barycenters for
	 * an entry would violate a constraint in the constraint graph then we coalesce
	 * the nodes in the conflict into a new node that respects the contraint and
	 * aggregates barycenter and weight information.
	 *
	 * This implementation is based on the description in Forster, "A Fast and
	 * Simple Hueristic for Constrained Two-Level Crossing Reduction," thought it
	 * differs in some specific details.
	 *
	 * Pre-conditions:
	 *
	 *    1. Each entry has the form {v, barycenter, weight}, or if the node has
	 *       no barycenter, then {v}.
	 *
	 * Returns:
	 *
	 *    A new list of entries of the form {vs, i, barycenter, weight}. The list
	 *    `vs` may either be a singleton or it may be an aggregation of nodes
	 *    ordered such that they do not violate constraints from the constraint
	 *    graph. The property `i` is the lowest original index of any of the
	 *    elements in `vs`.
	 */
	function resolveConflicts(entries, cg) {
	  let mappedEntries = {};
	  entries.forEach((entry, i) => {
	    let tmp = mappedEntries[entry.v] = {
	      indegree: 0,
	      "in": [],
	      out: [],
	      vs: [entry.v],
	      i: i
	    };
	    if (entry.barycenter !== undefined) {
	      tmp.barycenter = entry.barycenter;
	      tmp.weight = entry.weight;
	    }
	  });

	  cg.edges().forEach(e => {
	    let entryV = mappedEntries[e.v];
	    let entryW = mappedEntries[e.w];
	    if (entryV !== undefined && entryW !== undefined) {
	      entryW.indegree++;
	      entryV.out.push(mappedEntries[e.w]);
	    }
	  });

	  let sourceSet = Object.values(mappedEntries).filter(entry => !entry.indegree);

	  return doResolveConflicts(sourceSet);
	}

	function doResolveConflicts(sourceSet) {
	  let entries = [];

	  function handleIn(vEntry) {
	    return uEntry => {
	      if (uEntry.merged) {
	        return;
	      }
	      if (uEntry.barycenter === undefined ||
	          vEntry.barycenter === undefined ||
	          uEntry.barycenter >= vEntry.barycenter) {
	        mergeEntries(vEntry, uEntry);
	      }
	    };
	  }

	  function handleOut(vEntry) {
	    return wEntry => {
	      wEntry["in"].push(vEntry);
	      if (--wEntry.indegree === 0) {
	        sourceSet.push(wEntry);
	      }
	    };
	  }

	  while (sourceSet.length) {
	    let entry = sourceSet.pop();
	    entries.push(entry);
	    entry["in"].reverse().forEach(handleIn(entry));
	    entry.out.forEach(handleOut(entry));
	  }

	  return entries.filter(entry => !entry.merged).map(entry => {
	    return util.pick(entry, ["vs", "i", "barycenter", "weight"]);
	  });
	}

	function mergeEntries(target, source) {
	  let sum = 0;
	  let weight = 0;

	  if (target.weight) {
	    sum += target.barycenter * target.weight;
	    weight += target.weight;
	  }

	  if (source.weight) {
	    sum += source.barycenter * source.weight;
	    weight += source.weight;
	  }

	  target.vs = source.vs.concat(target.vs);
	  target.barycenter = sum / weight;
	  target.weight = weight;
	  target.i = Math.min(source.i, target.i);
	  source.merged = true;
	}
	return resolveConflicts_1;
}

var sort_1;
var hasRequiredSort;

function requireSort () {
	if (hasRequiredSort) return sort_1;
	hasRequiredSort = 1;
	let util = requireUtil$1();

	sort_1 = sort;

	function sort(entries, biasRight) {
	  let parts = util.partition(entries, entry => {
	    return Object.hasOwn(entry, "barycenter");
	  });
	  let sortable = parts.lhs,
	    unsortable = parts.rhs.sort((a, b) => b.i - a.i),
	    vs = [],
	    sum = 0,
	    weight = 0,
	    vsIndex = 0;

	  sortable.sort(compareWithBias(!!biasRight));

	  vsIndex = consumeUnsortable(vs, unsortable, vsIndex);

	  sortable.forEach(entry => {
	    vsIndex += entry.vs.length;
	    vs.push(entry.vs);
	    sum += entry.barycenter * entry.weight;
	    weight += entry.weight;
	    vsIndex = consumeUnsortable(vs, unsortable, vsIndex);
	  });

	  let result = { vs: vs.flat(true) };
	  if (weight) {
	    result.barycenter = sum / weight;
	    result.weight = weight;
	  }
	  return result;
	}

	function consumeUnsortable(vs, unsortable, index) {
	  let last;
	  while (unsortable.length && (last = unsortable[unsortable.length - 1]).i <= index) {
	    unsortable.pop();
	    vs.push(last.vs);
	    index++;
	  }
	  return index;
	}

	function compareWithBias(bias) {
	  return (entryV, entryW) => {
	    if (entryV.barycenter < entryW.barycenter) {
	      return -1;
	    } else if (entryV.barycenter > entryW.barycenter) {
	      return 1;
	    }

	    return !bias ? entryV.i - entryW.i : entryW.i - entryV.i;
	  };
	}
	return sort_1;
}

var sortSubgraph_1;
var hasRequiredSortSubgraph;

function requireSortSubgraph () {
	if (hasRequiredSortSubgraph) return sortSubgraph_1;
	hasRequiredSortSubgraph = 1;
	let barycenter = requireBarycenter();
	let resolveConflicts = requireResolveConflicts();
	let sort = requireSort();

	sortSubgraph_1 = sortSubgraph;

	function sortSubgraph(g, v, cg, biasRight) {
	  let movable = g.children(v);
	  let node = g.node(v);
	  let bl = node ? node.borderLeft : undefined;
	  let br = node ? node.borderRight: undefined;
	  let subgraphs = {};

	  if (bl) {
	    movable = movable.filter(w => w !== bl && w !== br);
	  }

	  let barycenters = barycenter(g, movable);
	  barycenters.forEach(entry => {
	    if (g.children(entry.v).length) {
	      let subgraphResult = sortSubgraph(g, entry.v, cg, biasRight);
	      subgraphs[entry.v] = subgraphResult;
	      if (Object.hasOwn(subgraphResult, "barycenter")) {
	        mergeBarycenters(entry, subgraphResult);
	      }
	    }
	  });

	  let entries = resolveConflicts(barycenters, cg);
	  expandSubgraphs(entries, subgraphs);

	  let result = sort(entries, biasRight);

	  if (bl) {
	    result.vs = [bl, result.vs, br].flat(true);
	    if (g.predecessors(bl).length) {
	      let blPred = g.node(g.predecessors(bl)[0]),
	        brPred = g.node(g.predecessors(br)[0]);
	      if (!Object.hasOwn(result, "barycenter")) {
	        result.barycenter = 0;
	        result.weight = 0;
	      }
	      result.barycenter = (result.barycenter * result.weight +
	                           blPred.order + brPred.order) / (result.weight + 2);
	      result.weight += 2;
	    }
	  }

	  return result;
	}

	function expandSubgraphs(entries, subgraphs) {
	  entries.forEach(entry => {
	    entry.vs = entry.vs.flatMap(v => {
	      if (subgraphs[v]) {
	        return subgraphs[v].vs;
	      }
	      return v;
	    });
	  });
	}

	function mergeBarycenters(target, other) {
	  if (target.barycenter !== undefined) {
	    target.barycenter = (target.barycenter * target.weight +
	                         other.barycenter * other.weight) /
	                        (target.weight + other.weight);
	    target.weight += other.weight;
	  } else {
	    target.barycenter = other.barycenter;
	    target.weight = other.weight;
	  }
	}
	return sortSubgraph_1;
}

var buildLayerGraph_1;
var hasRequiredBuildLayerGraph;

function requireBuildLayerGraph () {
	if (hasRequiredBuildLayerGraph) return buildLayerGraph_1;
	hasRequiredBuildLayerGraph = 1;
	let Graph = requireGraphlib().Graph;
	let util = requireUtil$1();

	buildLayerGraph_1 = buildLayerGraph;

	/*
	 * Constructs a graph that can be used to sort a layer of nodes. The graph will
	 * contain all base and subgraph nodes from the request layer in their original
	 * hierarchy and any edges that are incident on these nodes and are of the type
	 * requested by the "relationship" parameter.
	 *
	 * Nodes from the requested rank that do not have parents are assigned a root
	 * node in the output graph, which is set in the root graph attribute. This
	 * makes it easy to walk the hierarchy of movable nodes during ordering.
	 *
	 * Pre-conditions:
	 *
	 *    1. Input graph is a DAG
	 *    2. Base nodes in the input graph have a rank attribute
	 *    3. Subgraph nodes in the input graph has minRank and maxRank attributes
	 *    4. Edges have an assigned weight
	 *
	 * Post-conditions:
	 *
	 *    1. Output graph has all nodes in the movable rank with preserved
	 *       hierarchy.
	 *    2. Root nodes in the movable layer are made children of the node
	 *       indicated by the root attribute of the graph.
	 *    3. Non-movable nodes incident on movable nodes, selected by the
	 *       relationship parameter, are included in the graph (without hierarchy).
	 *    4. Edges incident on movable nodes, selected by the relationship
	 *       parameter, are added to the output graph.
	 *    5. The weights for copied edges are aggregated as need, since the output
	 *       graph is not a multi-graph.
	 */
	function buildLayerGraph(g, rank, relationship) {
	  let root = createRootNode(g),
	    result = new Graph({ compound: true }).setGraph({ root: root })
	      .setDefaultNodeLabel(v => g.node(v));

	  g.nodes().forEach(v => {
	    let node = g.node(v),
	      parent = g.parent(v);

	    if (node.rank === rank || node.minRank <= rank && rank <= node.maxRank) {
	      result.setNode(v);
	      result.setParent(v, parent || root);

	      // This assumes we have only short edges!
	      g[relationship](v).forEach(e => {
	        let u = e.v === v ? e.w : e.v,
	          edge = result.edge(u, v),
	          weight = edge !== undefined ? edge.weight : 0;
	        result.setEdge(u, v, { weight: g.edge(e).weight + weight });
	      });

	      if (Object.hasOwn(node, "minRank")) {
	        result.setNode(v, {
	          borderLeft: node.borderLeft[rank],
	          borderRight: node.borderRight[rank]
	        });
	      }
	    }
	  });

	  return result;
	}

	function createRootNode(g) {
	  var v;
	  while (g.hasNode((v = util.uniqueId("_root"))));
	  return v;
	}
	return buildLayerGraph_1;
}

var addSubgraphConstraints_1;
var hasRequiredAddSubgraphConstraints;

function requireAddSubgraphConstraints () {
	if (hasRequiredAddSubgraphConstraints) return addSubgraphConstraints_1;
	hasRequiredAddSubgraphConstraints = 1;
	addSubgraphConstraints_1 = addSubgraphConstraints;

	function addSubgraphConstraints(g, cg, vs) {
	  let prev = {},
	    rootPrev;

	  vs.forEach(v => {
	    let child = g.parent(v),
	      parent,
	      prevChild;
	    while (child) {
	      parent = g.parent(child);
	      if (parent) {
	        prevChild = prev[parent];
	        prev[parent] = child;
	      } else {
	        prevChild = rootPrev;
	        rootPrev = child;
	      }
	      if (prevChild && prevChild !== child) {
	        cg.setEdge(prevChild, child);
	        return;
	      }
	      child = parent;
	    }
	  });

	  /*
	  function dfs(v) {
	    var children = v ? g.children(v) : g.children();
	    if (children.length) {
	      var min = Number.POSITIVE_INFINITY,
	          subgraphs = [];
	      children.forEach(function(child) {
	        var childMin = dfs(child);
	        if (g.children(child).length) {
	          subgraphs.push({ v: child, order: childMin });
	        }
	        min = Math.min(min, childMin);
	      });
	      _.sortBy(subgraphs, "order").reduce(function(prev, curr) {
	        cg.setEdge(prev.v, curr.v);
	        return curr;
	      });
	      return min;
	    }
	    return g.node(v).order;
	  }
	  dfs(undefined);
	  */
	}
	return addSubgraphConstraints_1;
}

var order_1;
var hasRequiredOrder;

function requireOrder () {
	if (hasRequiredOrder) return order_1;
	hasRequiredOrder = 1;

	let initOrder = requireInitOrder();
	let crossCount = requireCrossCount();
	let sortSubgraph = requireSortSubgraph();
	let buildLayerGraph = requireBuildLayerGraph();
	let addSubgraphConstraints = requireAddSubgraphConstraints();
	let Graph = requireGraphlib().Graph;
	let util = requireUtil$1();

	order_1 = order;

	/*
	 * Applies heuristics to minimize edge crossings in the graph and sets the best
	 * order solution as an order attribute on each node.
	 *
	 * Pre-conditions:
	 *
	 *    1. Graph must be DAG
	 *    2. Graph nodes must be objects with a "rank" attribute
	 *    3. Graph edges must have the "weight" attribute
	 *
	 * Post-conditions:
	 *
	 *    1. Graph nodes will have an "order" attribute based on the results of the
	 *       algorithm.
	 */
	function order(g, opts) {
	  if (opts && typeof opts.customOrder === 'function') {
	    opts.customOrder(g, order);
	    return;
	  }

	  let maxRank = util.maxRank(g),
	    downLayerGraphs = buildLayerGraphs(g, util.range(1, maxRank + 1), "inEdges"),
	    upLayerGraphs = buildLayerGraphs(g, util.range(maxRank - 1, -1, -1), "outEdges");

	  let layering = initOrder(g);
	  assignOrder(g, layering);

	  if (opts && opts.disableOptimalOrderHeuristic) {
	    return;
	  }

	  let bestCC = Number.POSITIVE_INFINITY,
	    best;

	  for (let i = 0, lastBest = 0; lastBest < 4; ++i, ++lastBest) {
	    sweepLayerGraphs(i % 2 ? downLayerGraphs : upLayerGraphs, i % 4 >= 2);

	    layering = util.buildLayerMatrix(g);
	    let cc = crossCount(g, layering);
	    if (cc < bestCC) {
	      lastBest = 0;
	      best = Object.assign({}, layering);
	      bestCC = cc;
	    }
	  }

	  assignOrder(g, best);
	}

	function buildLayerGraphs(g, ranks, relationship) {
	  return ranks.map(function(rank) {
	    return buildLayerGraph(g, rank, relationship);
	  });
	}

	function sweepLayerGraphs(layerGraphs, biasRight) {
	  let cg = new Graph();
	  layerGraphs.forEach(function(lg) {
	    let root = lg.graph().root;
	    let sorted = sortSubgraph(lg, root, cg, biasRight);
	    sorted.vs.forEach((v, i) => lg.node(v).order = i);
	    addSubgraphConstraints(lg, cg, sorted.vs);
	  });
	}

	function assignOrder(g, layering) {
	  Object.values(layering).forEach(layer => layer.forEach((v, i) => g.node(v).order = i));
	}
	return order_1;
}

var bk;
var hasRequiredBk;

function requireBk () {
	if (hasRequiredBk) return bk;
	hasRequiredBk = 1;

	let Graph = requireGraphlib().Graph;
	let util = requireUtil$1();

	/*
	 * This module provides coordinate assignment based on Brandes and Köpf, "Fast
	 * and Simple Horizontal Coordinate Assignment."
	 */

	bk = {
	  positionX: positionX,
	  findType1Conflicts: findType1Conflicts,
	  findType2Conflicts: findType2Conflicts,
	  addConflict: addConflict,
	  hasConflict: hasConflict,
	  verticalAlignment: verticalAlignment,
	  horizontalCompaction: horizontalCompaction,
	  alignCoordinates: alignCoordinates,
	  findSmallestWidthAlignment: findSmallestWidthAlignment,
	  balance: balance
	};

	/*
	 * Marks all edges in the graph with a type-1 conflict with the "type1Conflict"
	 * property. A type-1 conflict is one where a non-inner segment crosses an
	 * inner segment. An inner segment is an edge with both incident nodes marked
	 * with the "dummy" property.
	 *
	 * This algorithm scans layer by layer, starting with the second, for type-1
	 * conflicts between the current layer and the previous layer. For each layer
	 * it scans the nodes from left to right until it reaches one that is incident
	 * on an inner segment. It then scans predecessors to determine if they have
	 * edges that cross that inner segment. At the end a final scan is done for all
	 * nodes on the current rank to see if they cross the last visited inner
	 * segment.
	 *
	 * This algorithm (safely) assumes that a dummy node will only be incident on a
	 * single node in the layers being scanned.
	 */
	function findType1Conflicts(g, layering) {
	  let conflicts = {};

	  function visitLayer(prevLayer, layer) {
	    let
	      // last visited node in the previous layer that is incident on an inner
	      // segment.
	      k0 = 0,
	      // Tracks the last node in this layer scanned for crossings with a type-1
	      // segment.
	      scanPos = 0,
	      prevLayerLength = prevLayer.length,
	      lastNode = layer[layer.length - 1];

	    layer.forEach((v, i) => {
	      let w = findOtherInnerSegmentNode(g, v),
	        k1 = w ? g.node(w).order : prevLayerLength;

	      if (w || v === lastNode) {
	        layer.slice(scanPos, i+1).forEach(scanNode => {
	          g.predecessors(scanNode).forEach(u => {
	            let uLabel = g.node(u),
	              uPos = uLabel.order;
	            if ((uPos < k0 || k1 < uPos) &&
	                !(uLabel.dummy && g.node(scanNode).dummy)) {
	              addConflict(conflicts, u, scanNode);
	            }
	          });
	        });
	        scanPos = i + 1;
	        k0 = k1;
	      }
	    });

	    return layer;
	  }

	  layering.length && layering.reduce(visitLayer);

	  return conflicts;
	}

	function findType2Conflicts(g, layering) {
	  let conflicts = {};

	  function scan(south, southPos, southEnd, prevNorthBorder, nextNorthBorder) {
	    let v;
	    util.range(southPos, southEnd).forEach(i => {
	      v = south[i];
	      if (g.node(v).dummy) {
	        g.predecessors(v).forEach(u => {
	          let uNode = g.node(u);
	          if (uNode.dummy &&
	              (uNode.order < prevNorthBorder || uNode.order > nextNorthBorder)) {
	            addConflict(conflicts, u, v);
	          }
	        });
	      }
	    });
	  }


	  function visitLayer(north, south) {
	    let prevNorthPos = -1,
	      nextNorthPos,
	      southPos = 0;

	    south.forEach((v, southLookahead) => {
	      if (g.node(v).dummy === "border") {
	        let predecessors = g.predecessors(v);
	        if (predecessors.length) {
	          nextNorthPos = g.node(predecessors[0]).order;
	          scan(south, southPos, southLookahead, prevNorthPos, nextNorthPos);
	          southPos = southLookahead;
	          prevNorthPos = nextNorthPos;
	        }
	      }
	      scan(south, southPos, south.length, nextNorthPos, north.length);
	    });

	    return south;
	  }

	  layering.length && layering.reduce(visitLayer);

	  return conflicts;
	}

	function findOtherInnerSegmentNode(g, v) {
	  if (g.node(v).dummy) {
	    return g.predecessors(v).find(u => g.node(u).dummy);
	  }
	}

	function addConflict(conflicts, v, w) {
	  if (v > w) {
	    let tmp = v;
	    v = w;
	    w = tmp;
	  }

	  let conflictsV = conflicts[v];
	  if (!conflictsV) {
	    conflicts[v] = conflictsV = {};
	  }
	  conflictsV[w] = true;
	}

	function hasConflict(conflicts, v, w) {
	  if (v > w) {
	    let tmp = v;
	    v = w;
	    w = tmp;
	  }
	  return !!conflicts[v] && Object.hasOwn(conflicts[v], w);
	}

	/*
	 * Try to align nodes into vertical "blocks" where possible. This algorithm
	 * attempts to align a node with one of its median neighbors. If the edge
	 * connecting a neighbor is a type-1 conflict then we ignore that possibility.
	 * If a previous node has already formed a block with a node after the node
	 * we're trying to form a block with, we also ignore that possibility - our
	 * blocks would be split in that scenario.
	 */
	function verticalAlignment(g, layering, conflicts, neighborFn) {
	  let root = {},
	    align = {},
	    pos = {};

	  // We cache the position here based on the layering because the graph and
	  // layering may be out of sync. The layering matrix is manipulated to
	  // generate different extreme alignments.
	  layering.forEach(layer => {
	    layer.forEach((v, order) => {
	      root[v] = v;
	      align[v] = v;
	      pos[v] = order;
	    });
	  });

	  layering.forEach(layer => {
	    let prevIdx = -1;
	    layer.forEach(v => {
	      let ws = neighborFn(v);
	      if (ws.length) {
	        ws = ws.sort((a, b) => pos[a] - pos[b]);
	        let mp = (ws.length - 1) / 2;
	        for (let i = Math.floor(mp), il = Math.ceil(mp); i <= il; ++i) {
	          let w = ws[i];
	          if (align[v] === v &&
	              prevIdx < pos[w] &&
	              !hasConflict(conflicts, v, w)) {
	            align[w] = v;
	            align[v] = root[v] = root[w];
	            prevIdx = pos[w];
	          }
	        }
	      }
	    });
	  });

	  return { root: root, align: align };
	}

	function horizontalCompaction(g, layering, root, align, reverseSep) {
	  // This portion of the algorithm differs from BK due to a number of problems.
	  // Instead of their algorithm we construct a new block graph and do two
	  // sweeps. The first sweep places blocks with the smallest possible
	  // coordinates. The second sweep removes unused space by moving blocks to the
	  // greatest coordinates without violating separation.
	  let xs = {},
	    blockG = buildBlockGraph(g, layering, root, reverseSep),
	    borderType = reverseSep ? "borderLeft" : "borderRight";

	  function iterate(setXsFunc, nextNodesFunc) {
	    let stack = blockG.nodes();
	    let elem = stack.pop();
	    let visited = {};
	    while (elem) {
	      if (visited[elem]) {
	        setXsFunc(elem);
	      } else {
	        visited[elem] = true;
	        stack.push(elem);
	        stack = stack.concat(nextNodesFunc(elem));
	      }

	      elem = stack.pop();
	    }
	  }

	  // First pass, assign smallest coordinates
	  function pass1(elem) {
	    xs[elem] = blockG.inEdges(elem).reduce((acc, e) => {
	      return Math.max(acc, xs[e.v] + blockG.edge(e));
	    }, 0);
	  }

	  // Second pass, assign greatest coordinates
	  function pass2(elem) {
	    let min = blockG.outEdges(elem).reduce((acc, e) => {
	      return Math.min(acc, xs[e.w] - blockG.edge(e));
	    }, Number.POSITIVE_INFINITY);

	    let node = g.node(elem);
	    if (min !== Number.POSITIVE_INFINITY && node.borderType !== borderType) {
	      xs[elem] = Math.max(xs[elem], min);
	    }
	  }

	  iterate(pass1, blockG.predecessors.bind(blockG));
	  iterate(pass2, blockG.successors.bind(blockG));

	  // Assign x coordinates to all nodes
	  Object.keys(align).forEach(v => xs[v] = xs[root[v]]);

	  return xs;
	}


	function buildBlockGraph(g, layering, root, reverseSep) {
	  let blockGraph = new Graph(),
	    graphLabel = g.graph(),
	    sepFn = sep(graphLabel.nodesep, graphLabel.edgesep, reverseSep);

	  layering.forEach(layer => {
	    let u;
	    layer.forEach(v => {
	      let vRoot = root[v];
	      blockGraph.setNode(vRoot);
	      if (u) {
	        var uRoot = root[u],
	          prevMax = blockGraph.edge(uRoot, vRoot);
	        blockGraph.setEdge(uRoot, vRoot, Math.max(sepFn(g, v, u), prevMax || 0));
	      }
	      u = v;
	    });
	  });

	  return blockGraph;
	}

	/*
	 * Returns the alignment that has the smallest width of the given alignments.
	 */
	function findSmallestWidthAlignment(g, xss) {
	  return Object.values(xss).reduce((currentMinAndXs, xs) => {
	    let max = Number.NEGATIVE_INFINITY;
	    let min = Number.POSITIVE_INFINITY;

	    Object.entries(xs).forEach(([v, x]) => {
	      let halfWidth = width(g, v) / 2;

	      max = Math.max(x + halfWidth, max);
	      min = Math.min(x - halfWidth, min);
	    });

	    const newMin = max - min;
	    if (newMin < currentMinAndXs[0]) {
	      currentMinAndXs = [newMin, xs];
	    }
	    return currentMinAndXs;
	  }, [Number.POSITIVE_INFINITY, null])[1];
	}

	/*
	 * Align the coordinates of each of the layout alignments such that
	 * left-biased alignments have their minimum coordinate at the same point as
	 * the minimum coordinate of the smallest width alignment and right-biased
	 * alignments have their maximum coordinate at the same point as the maximum
	 * coordinate of the smallest width alignment.
	 */
	function alignCoordinates(xss, alignTo) {
	  let alignToVals = Object.values(alignTo),
	    alignToMin = util.applyWithChunking(Math.min, alignToVals),
	    alignToMax = util.applyWithChunking(Math.max, alignToVals);

	  ["u", "d"].forEach(vert => {
	    ["l", "r"].forEach(horiz => {
	      let alignment = vert + horiz,
	        xs = xss[alignment];

	      if (xs === alignTo) return;

	      let xsVals = Object.values(xs);
	      let delta = alignToMin - util.applyWithChunking(Math.min, xsVals);
	      if (horiz !== "l") {
	        delta = alignToMax - util.applyWithChunking(Math.max,xsVals);
	      }

	      if (delta) {
	        xss[alignment] = util.mapValues(xs, x => x + delta);
	      }
	    });
	  });
	}

	function balance(xss, align) {
	  return util.mapValues(xss.ul, (num, v) => {
	    if (align) {
	      return xss[align.toLowerCase()][v];
	    } else {
	      let xs = Object.values(xss).map(xs => xs[v]).sort((a, b) => a - b);
	      return (xs[1] + xs[2]) / 2;
	    }
	  });
	}

	function positionX(g) {
	  let layering = util.buildLayerMatrix(g);
	  let conflicts = Object.assign(
	    findType1Conflicts(g, layering),
	    findType2Conflicts(g, layering));

	  let xss = {};
	  let adjustedLayering;
	  ["u", "d"].forEach(vert => {
	    adjustedLayering = vert === "u" ? layering : Object.values(layering).reverse();
	    ["l", "r"].forEach(horiz => {
	      if (horiz === "r") {
	        adjustedLayering = adjustedLayering.map(inner => {
	          return Object.values(inner).reverse();
	        });
	      }

	      let neighborFn = (vert === "u" ? g.predecessors : g.successors).bind(g);
	      let align = verticalAlignment(g, adjustedLayering, conflicts, neighborFn);
	      let xs = horizontalCompaction(g, adjustedLayering,
	        align.root, align.align, horiz === "r");
	      if (horiz === "r") {
	        xs = util.mapValues(xs, x => -x);
	      }
	      xss[vert + horiz] = xs;
	    });
	  });


	  let smallestWidth = findSmallestWidthAlignment(g, xss);
	  alignCoordinates(xss, smallestWidth);
	  return balance(xss, g.graph().align);
	}

	function sep(nodeSep, edgeSep, reverseSep) {
	  return (g, v, w) => {
	    let vLabel = g.node(v);
	    let wLabel = g.node(w);
	    let sum = 0;
	    let delta;

	    sum += vLabel.width / 2;
	    if (Object.hasOwn(vLabel, "labelpos")) {
	      switch (vLabel.labelpos.toLowerCase()) {
	      case "l": delta = -vLabel.width / 2; break;
	      case "r": delta = vLabel.width / 2; break;
	      }
	    }
	    if (delta) {
	      sum += reverseSep ? delta : -delta;
	    }
	    delta = 0;

	    sum += (vLabel.dummy ? edgeSep : nodeSep) / 2;
	    sum += (wLabel.dummy ? edgeSep : nodeSep) / 2;

	    sum += wLabel.width / 2;
	    if (Object.hasOwn(wLabel, "labelpos")) {
	      switch (wLabel.labelpos.toLowerCase()) {
	      case "l": delta = wLabel.width / 2; break;
	      case "r": delta = -wLabel.width / 2; break;
	      }
	    }
	    if (delta) {
	      sum += reverseSep ? delta : -delta;
	    }
	    delta = 0;

	    return sum;
	  };
	}

	function width(g, v) {
	  return g.node(v).width;
	}
	return bk;
}

var position_1;
var hasRequiredPosition;

function requirePosition () {
	if (hasRequiredPosition) return position_1;
	hasRequiredPosition = 1;

	let util = requireUtil$1();
	let positionX = requireBk().positionX;

	position_1 = position;

	function position(g) {
	  g = util.asNonCompoundGraph(g);

	  positionY(g);
	  Object.entries(positionX(g)).forEach(([v, x]) => g.node(v).x = x);
	}

	function positionY(g) {
	  let layering = util.buildLayerMatrix(g);
	  let rankSep = g.graph().ranksep;
	  let prevY = 0;
	  layering.forEach(layer => {
	    const maxHeight = layer.reduce((acc, v) => {
	      const height = g.node(v).height;
	      if (acc > height) {
	        return acc;
	      } else {
	        return height;
	      }
	    }, 0);
	    layer.forEach(v => g.node(v).y = prevY + maxHeight / 2);
	    prevY += maxHeight + rankSep;
	  });
	}
	return position_1;
}

var layout_1;
var hasRequiredLayout;

function requireLayout () {
	if (hasRequiredLayout) return layout_1;
	hasRequiredLayout = 1;

	let acyclic = requireAcyclic();
	let normalize = requireNormalize();
	let rank = requireRank();
	let normalizeRanks = requireUtil$1().normalizeRanks;
	let parentDummyChains = requireParentDummyChains();
	let removeEmptyRanks = requireUtil$1().removeEmptyRanks;
	let nestingGraph = requireNestingGraph();
	let addBorderSegments = requireAddBorderSegments();
	let coordinateSystem = requireCoordinateSystem();
	let order = requireOrder();
	let position = requirePosition();
	let util = requireUtil$1();
	let Graph = requireGraphlib().Graph;

	layout_1 = layout;

	function layout(g, opts) {
	  let time = opts && opts.debugTiming ? util.time : util.notime;
	  time("layout", () => {
	    let layoutGraph =
	      time("  buildLayoutGraph", () => buildLayoutGraph(g));
	    time("  runLayout",        () => runLayout(layoutGraph, time, opts));
	    time("  updateInputGraph", () => updateInputGraph(g, layoutGraph));
	  });
	}

	function runLayout(g, time, opts) {
	  time("    makeSpaceForEdgeLabels", () => makeSpaceForEdgeLabels(g));
	  time("    removeSelfEdges",        () => removeSelfEdges(g));
	  time("    acyclic",                () => acyclic.run(g));
	  time("    nestingGraph.run",       () => nestingGraph.run(g));
	  time("    rank",                   () => rank(util.asNonCompoundGraph(g)));
	  time("    injectEdgeLabelProxies", () => injectEdgeLabelProxies(g));
	  time("    removeEmptyRanks",       () => removeEmptyRanks(g));
	  time("    nestingGraph.cleanup",   () => nestingGraph.cleanup(g));
	  time("    normalizeRanks",         () => normalizeRanks(g));
	  time("    assignRankMinMax",       () => assignRankMinMax(g));
	  time("    removeEdgeLabelProxies", () => removeEdgeLabelProxies(g));
	  time("    normalize.run",          () => normalize.run(g));
	  time("    parentDummyChains",      () => parentDummyChains(g));
	  time("    addBorderSegments",      () => addBorderSegments(g));
	  time("    order",                  () => order(g, opts));
	  time("    insertSelfEdges",        () => insertSelfEdges(g));
	  time("    adjustCoordinateSystem", () => coordinateSystem.adjust(g));
	  time("    position",               () => position(g));
	  time("    positionSelfEdges",      () => positionSelfEdges(g));
	  time("    removeBorderNodes",      () => removeBorderNodes(g));
	  time("    normalize.undo",         () => normalize.undo(g));
	  time("    fixupEdgeLabelCoords",   () => fixupEdgeLabelCoords(g));
	  time("    undoCoordinateSystem",   () => coordinateSystem.undo(g));
	  time("    translateGraph",         () => translateGraph(g));
	  time("    assignNodeIntersects",   () => assignNodeIntersects(g));
	  time("    reversePoints",          () => reversePointsForReversedEdges(g));
	  time("    acyclic.undo",           () => acyclic.undo(g));
	}

	/*
	 * Copies final layout information from the layout graph back to the input
	 * graph. This process only copies whitelisted attributes from the layout graph
	 * to the input graph, so it serves as a good place to determine what
	 * attributes can influence layout.
	 */
	function updateInputGraph(inputGraph, layoutGraph) {
	  inputGraph.nodes().forEach(v => {
	    let inputLabel = inputGraph.node(v);
	    let layoutLabel = layoutGraph.node(v);

	    if (inputLabel) {
	      inputLabel.x = layoutLabel.x;
	      inputLabel.y = layoutLabel.y;
	      inputLabel.rank = layoutLabel.rank;

	      if (layoutGraph.children(v).length) {
	        inputLabel.width = layoutLabel.width;
	        inputLabel.height = layoutLabel.height;
	      }
	    }
	  });

	  inputGraph.edges().forEach(e => {
	    let inputLabel = inputGraph.edge(e);
	    let layoutLabel = layoutGraph.edge(e);

	    inputLabel.points = layoutLabel.points;
	    if (Object.hasOwn(layoutLabel, "x")) {
	      inputLabel.x = layoutLabel.x;
	      inputLabel.y = layoutLabel.y;
	    }
	  });

	  inputGraph.graph().width = layoutGraph.graph().width;
	  inputGraph.graph().height = layoutGraph.graph().height;
	}

	let graphNumAttrs = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"];
	let graphDefaults = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: "tb" };
	let graphAttrs = ["acyclicer", "ranker", "rankdir", "align"];
	let nodeNumAttrs = ["width", "height"];
	let nodeDefaults = { width: 0, height: 0 };
	let edgeNumAttrs = ["minlen", "weight", "width", "height", "labeloffset"];
	let edgeDefaults = {
	  minlen: 1, weight: 1, width: 0, height: 0,
	  labeloffset: 10, labelpos: "r"
	};
	let edgeAttrs = ["labelpos"];

	/*
	 * Constructs a new graph from the input graph, which can be used for layout.
	 * This process copies only whitelisted attributes from the input graph to the
	 * layout graph. Thus this function serves as a good place to determine what
	 * attributes can influence layout.
	 */
	function buildLayoutGraph(inputGraph) {
	  let g = new Graph({ multigraph: true, compound: true });
	  let graph = canonicalize(inputGraph.graph());

	  g.setGraph(Object.assign({},
	    graphDefaults,
	    selectNumberAttrs(graph, graphNumAttrs),
	    util.pick(graph, graphAttrs)));

	  inputGraph.nodes().forEach(v => {
	    let node = canonicalize(inputGraph.node(v));
	    const newNode = selectNumberAttrs(node, nodeNumAttrs);
	    Object.keys(nodeDefaults).forEach(k => {
	      if (newNode[k] === undefined) {
	        newNode[k] = nodeDefaults[k];
	      }
	    });

	    g.setNode(v, newNode);
	    g.setParent(v, inputGraph.parent(v));
	  });

	  inputGraph.edges().forEach(e => {
	    let edge = canonicalize(inputGraph.edge(e));
	    g.setEdge(e, Object.assign({},
	      edgeDefaults,
	      selectNumberAttrs(edge, edgeNumAttrs),
	      util.pick(edge, edgeAttrs)));
	  });

	  return g;
	}

	/*
	 * This idea comes from the Gansner paper: to account for edge labels in our
	 * layout we split each rank in half by doubling minlen and halving ranksep.
	 * Then we can place labels at these mid-points between nodes.
	 *
	 * We also add some minimal padding to the width to push the label for the edge
	 * away from the edge itself a bit.
	 */
	function makeSpaceForEdgeLabels(g) {
	  let graph = g.graph();
	  graph.ranksep /= 2;
	  g.edges().forEach(e => {
	    let edge = g.edge(e);
	    edge.minlen *= 2;
	    if (edge.labelpos.toLowerCase() !== "c") {
	      if (graph.rankdir === "TB" || graph.rankdir === "BT") {
	        edge.width += edge.labeloffset;
	      } else {
	        edge.height += edge.labeloffset;
	      }
	    }
	  });
	}

	/*
	 * Creates temporary dummy nodes that capture the rank in which each edge's
	 * label is going to, if it has one of non-zero width and height. We do this
	 * so that we can safely remove empty ranks while preserving balance for the
	 * label's position.
	 */
	function injectEdgeLabelProxies(g) {
	  g.edges().forEach(e => {
	    let edge = g.edge(e);
	    if (edge.width && edge.height) {
	      let v = g.node(e.v);
	      let w = g.node(e.w);
	      let label = { rank: (w.rank - v.rank) / 2 + v.rank, e: e };
	      util.addDummyNode(g, "edge-proxy", label, "_ep");
	    }
	  });
	}

	function assignRankMinMax(g) {
	  let maxRank = 0;
	  g.nodes().forEach(v => {
	    let node = g.node(v);
	    if (node.borderTop) {
	      node.minRank = g.node(node.borderTop).rank;
	      node.maxRank = g.node(node.borderBottom).rank;
	      maxRank = Math.max(maxRank, node.maxRank);
	    }
	  });
	  g.graph().maxRank = maxRank;
	}

	function removeEdgeLabelProxies(g) {
	  g.nodes().forEach(v => {
	    let node = g.node(v);
	    if (node.dummy === "edge-proxy") {
	      g.edge(node.e).labelRank = node.rank;
	      g.removeNode(v);
	    }
	  });
	}

	function translateGraph(g) {
	  let minX = Number.POSITIVE_INFINITY;
	  let maxX = 0;
	  let minY = Number.POSITIVE_INFINITY;
	  let maxY = 0;
	  let graphLabel = g.graph();
	  let marginX = graphLabel.marginx || 0;
	  let marginY = graphLabel.marginy || 0;

	  function getExtremes(attrs) {
	    let x = attrs.x;
	    let y = attrs.y;
	    let w = attrs.width;
	    let h = attrs.height;
	    minX = Math.min(minX, x - w / 2);
	    maxX = Math.max(maxX, x + w / 2);
	    minY = Math.min(minY, y - h / 2);
	    maxY = Math.max(maxY, y + h / 2);
	  }

	  g.nodes().forEach(v => getExtremes(g.node(v)));
	  g.edges().forEach(e => {
	    let edge = g.edge(e);
	    if (Object.hasOwn(edge, "x")) {
	      getExtremes(edge);
	    }
	  });

	  minX -= marginX;
	  minY -= marginY;

	  g.nodes().forEach(v => {
	    let node = g.node(v);
	    node.x -= minX;
	    node.y -= minY;
	  });

	  g.edges().forEach(e => {
	    let edge = g.edge(e);
	    edge.points.forEach(p => {
	      p.x -= minX;
	      p.y -= minY;
	    });
	    if (Object.hasOwn(edge, "x")) { edge.x -= minX; }
	    if (Object.hasOwn(edge, "y")) { edge.y -= minY; }
	  });

	  graphLabel.width = maxX - minX + marginX;
	  graphLabel.height = maxY - minY + marginY;
	}

	function assignNodeIntersects(g) {
	  g.edges().forEach(e => {
	    let edge = g.edge(e);
	    let nodeV = g.node(e.v);
	    let nodeW = g.node(e.w);
	    let p1, p2;
	    if (!edge.points) {
	      edge.points = [];
	      p1 = nodeW;
	      p2 = nodeV;
	    } else {
	      p1 = edge.points[0];
	      p2 = edge.points[edge.points.length - 1];
	    }
	    edge.points.unshift(util.intersectRect(nodeV, p1));
	    edge.points.push(util.intersectRect(nodeW, p2));
	  });
	}

	function fixupEdgeLabelCoords(g) {
	  g.edges().forEach(e => {
	    let edge = g.edge(e);
	    if (Object.hasOwn(edge, "x")) {
	      if (edge.labelpos === "l" || edge.labelpos === "r") {
	        edge.width -= edge.labeloffset;
	      }
	      switch (edge.labelpos) {
	      case "l": edge.x -= edge.width / 2 + edge.labeloffset; break;
	      case "r": edge.x += edge.width / 2 + edge.labeloffset; break;
	      }
	    }
	  });
	}

	function reversePointsForReversedEdges(g) {
	  g.edges().forEach(e => {
	    let edge = g.edge(e);
	    if (edge.reversed) {
	      edge.points.reverse();
	    }
	  });
	}

	function removeBorderNodes(g) {
	  g.nodes().forEach(v => {
	    if (g.children(v).length) {
	      let node = g.node(v);
	      let t = g.node(node.borderTop);
	      let b = g.node(node.borderBottom);
	      let l = g.node(node.borderLeft[node.borderLeft.length - 1]);
	      let r = g.node(node.borderRight[node.borderRight.length - 1]);

	      node.width = Math.abs(r.x - l.x);
	      node.height = Math.abs(b.y - t.y);
	      node.x = l.x + node.width / 2;
	      node.y = t.y + node.height / 2;
	    }
	  });

	  g.nodes().forEach(v => {
	    if (g.node(v).dummy === "border") {
	      g.removeNode(v);
	    }
	  });
	}

	function removeSelfEdges(g) {
	  g.edges().forEach(e => {
	    if (e.v === e.w) {
	      var node = g.node(e.v);
	      if (!node.selfEdges) {
	        node.selfEdges = [];
	      }
	      node.selfEdges.push({ e: e, label: g.edge(e) });
	      g.removeEdge(e);
	    }
	  });
	}

	function insertSelfEdges(g) {
	  var layers = util.buildLayerMatrix(g);
	  layers.forEach(layer => {
	    var orderShift = 0;
	    layer.forEach((v, i) => {
	      var node = g.node(v);
	      node.order = i + orderShift;
	      (node.selfEdges || []).forEach(selfEdge => {
	        util.addDummyNode(g, "selfedge", {
	          width: selfEdge.label.width,
	          height: selfEdge.label.height,
	          rank: node.rank,
	          order: i + (++orderShift),
	          e: selfEdge.e,
	          label: selfEdge.label
	        }, "_se");
	      });
	      delete node.selfEdges;
	    });
	  });
	}

	function positionSelfEdges(g) {
	  g.nodes().forEach(v => {
	    var node = g.node(v);
	    if (node.dummy === "selfedge") {
	      var selfNode = g.node(node.e.v);
	      var x = selfNode.x + selfNode.width / 2;
	      var y = selfNode.y;
	      var dx = node.x - x;
	      var dy = selfNode.height / 2;
	      g.setEdge(node.e, node.label);
	      g.removeNode(v);
	      node.label.points = [
	        { x: x + 2 * dx / 3, y: y - dy },
	        { x: x + 5 * dx / 6, y: y - dy },
	        { x: x +     dx    , y: y },
	        { x: x + 5 * dx / 6, y: y + dy },
	        { x: x + 2 * dx / 3, y: y + dy }
	      ];
	      node.label.x = node.x;
	      node.label.y = node.y;
	    }
	  });
	}

	function selectNumberAttrs(obj, attrs) {
	  return util.mapValues(util.pick(obj, attrs), Number);
	}

	function canonicalize(attrs) {
	  var newAttrs = {};
	  if (attrs) {
	    Object.entries(attrs).forEach(([k, v]) => {
	      if (typeof k === "string") {
	        k = k.toLowerCase();
	      }

	      newAttrs[k] = v;
	    });
	  }
	  return newAttrs;
	}
	return layout_1;
}

var debug;
var hasRequiredDebug;

function requireDebug () {
	if (hasRequiredDebug) return debug;
	hasRequiredDebug = 1;
	let util = requireUtil$1();
	let Graph = requireGraphlib().Graph;

	debug = {
	  debugOrdering: debugOrdering
	};

	/* istanbul ignore next */
	function debugOrdering(g) {
	  let layerMatrix = util.buildLayerMatrix(g);

	  let h = new Graph({ compound: true, multigraph: true }).setGraph({});

	  g.nodes().forEach(v => {
	    h.setNode(v, { label: v });
	    h.setParent(v, "layer" + g.node(v).rank);
	  });

	  g.edges().forEach(e => h.setEdge(e.v, e.w, {}, e.name));

	  layerMatrix.forEach((layer, i) => {
	    let layerV = "layer" + i;
	    h.setNode(layerV, { rank: "same" });
	    layer.reduce((u, v) => {
	      h.setEdge(u, v, { style: "invis" });
	      return v;
	    });
	  });

	  return h;
	}
	return debug;
}

var version;
var hasRequiredVersion;

function requireVersion () {
	if (hasRequiredVersion) return version;
	hasRequiredVersion = 1;
	version = "1.1.4";
	return version;
}

/*
Copyright (c) 2012-2014 Chris Pettitt

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var dagre;
var hasRequiredDagre;

function requireDagre () {
	if (hasRequiredDagre) return dagre;
	hasRequiredDagre = 1;
	dagre = {
	  graphlib: requireGraphlib(),

	  layout: requireLayout(),
	  debug: requireDebug(),
	  util: {
	    time: requireUtil$1().time,
	    notime: requireUtil$1().notime
	  },
	  version: requireVersion()
	};
	return dagre;
}

requireDagre();

const empty = [];
function snapshot(value, skip_warning = false) {
  return clone(value, /* @__PURE__ */ new Map(), "", empty);
}
function clone(value, cloned, path2, paths, original = null) {
  if (typeof value === "object" && value !== null) {
    var unwrapped = cloned.get(value);
    if (unwrapped !== void 0) return unwrapped;
    if (value instanceof Map) return (
      /** @type {Snapshot<T>} */
      new Map(value)
    );
    if (value instanceof Set) return (
      /** @type {Snapshot<T>} */
      new Set(value)
    );
    if (is_array(value)) {
      var copy = (
        /** @type {Snapshot<any>} */
        Array(value.length)
      );
      cloned.set(value, copy);
      if (original !== null) {
        cloned.set(original, copy);
      }
      for (var i = 0; i < value.length; i += 1) {
        var element = value[i];
        if (i in value) {
          copy[i] = clone(element, cloned, path2, paths);
        }
      }
      return copy;
    }
    if (get_prototype_of(value) === object_prototype) {
      copy = {};
      cloned.set(value, copy);
      if (original !== null) {
        cloned.set(original, copy);
      }
      for (var key in value) {
        copy[key] = clone(value[key], cloned, path2, paths);
      }
      return copy;
    }
    if (value instanceof Date) {
      return (
        /** @type {Snapshot<T>} */
        structuredClone(value)
      );
    }
    if (typeof /** @type {T & { toJSON?: any } } */
    value.toJSON === "function") {
      return clone(
        /** @type {T & { toJSON(): any } } */
        value.toJSON(),
        cloned,
        path2,
        paths,
        // Associate the instance with the toJSON clone
        value
      );
    }
  }
  if (value instanceof EventTarget) {
    return (
      /** @type {Snapshot<T>} */
      value
    );
  }
  try {
    return (
      /** @type {Snapshot<T>} */
      structuredClone(value)
    );
  } catch (e) {
    return (
      /** @type {Snapshot<T>} */
      value
    );
  }
}
const now = () => Date.now();
const raf = {
  // don't access requestAnimationFrame eagerly outside method
  // this allows basic testing of user code without JSDOM
  // bunder will eval and remove ternary when the user's app is built
  tick: (
    /** @param {any} _ */
    (_) => noop$3()
  ),
  now: () => now(),
  tasks: /* @__PURE__ */ new Set()
};
function loop(callback) {
  let task;
  if (raf.tasks.size === 0) ;
  return {
    promise: new Promise((fulfill) => {
      raf.tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      raf.tasks.delete(task);
    }
  };
}
function getElemDirection(elem) {
  const style = window.getComputedStyle(elem);
  const direction = style.getPropertyValue("direction");
  return direction;
}
function getNextKey(dir = "ltr", orientation = "horizontal") {
  return {
    horizontal: dir === "rtl" ? ARROW_LEFT : ARROW_RIGHT,
    vertical: ARROW_DOWN
  }[orientation];
}
function getPrevKey(dir = "ltr", orientation = "horizontal") {
  return {
    horizontal: dir === "rtl" ? ARROW_RIGHT : ARROW_LEFT,
    vertical: ARROW_UP
  }[orientation];
}
function getDirectionalKeys(dir = "ltr", orientation = "horizontal") {
  if (!["ltr", "rtl"].includes(dir))
    dir = "ltr";
  if (!["horizontal", "vertical"].includes(orientation))
    orientation = "horizontal";
  return {
    nextKey: getNextKey(dir, orientation),
    prevKey: getPrevKey(dir, orientation)
  };
}
class RovingFocusGroup {
  #opts;
  #currentTabStopId = box(null);
  constructor(opts) {
    this.#opts = opts;
  }
  getCandidateNodes() {
    return [];
  }
  focusFirstCandidate() {
    const items = this.getCandidateNodes();
    if (!items.length)
      return;
    items[0]?.focus();
  }
  handleKeydown(node, e, both = false) {
    const rootNode = this.#opts.rootNode.current;
    if (!rootNode || !node)
      return;
    const items = this.getCandidateNodes();
    if (!items.length)
      return;
    const currentIndex = items.indexOf(node);
    const dir = getElemDirection(rootNode);
    const { nextKey, prevKey } = getDirectionalKeys(dir, this.#opts.orientation.current);
    const loop2 = this.#opts.loop.current;
    const keyToIndex = {
      [nextKey]: currentIndex + 1,
      [prevKey]: currentIndex - 1,
      [HOME]: 0,
      [END]: items.length - 1
    };
    if (both) {
      const altNextKey = nextKey === ARROW_DOWN ? ARROW_RIGHT : ARROW_DOWN;
      const altPrevKey = prevKey === ARROW_UP ? ARROW_LEFT : ARROW_UP;
      keyToIndex[altNextKey] = currentIndex + 1;
      keyToIndex[altPrevKey] = currentIndex - 1;
    }
    let itemIndex = keyToIndex[e.key];
    if (itemIndex === void 0)
      return;
    e.preventDefault();
    if (itemIndex < 0 && loop2) {
      itemIndex = items.length - 1;
    } else if (itemIndex === items.length && loop2) {
      itemIndex = 0;
    }
    const itemToFocus = items[itemIndex];
    if (!itemToFocus)
      return;
    itemToFocus.focus();
    this.#currentTabStopId.current = itemToFocus.id;
    this.#opts.onCandidateFocus?.(itemToFocus);
    return itemToFocus;
  }
  getTabIndex(node) {
    const items = this.getCandidateNodes();
    const anyActive = this.#currentTabStopId.current !== null;
    if (node && !anyActive && items[0] === node) {
      this.#currentTabStopId.current = node.id;
      return 0;
    } else if (node?.id === this.#currentTabStopId.current) {
      return 0;
    }
    return -1;
  }
  setCurrentTabStopId(id) {
    this.#currentTabStopId.current = id;
  }
}
const collapsibleAttrs = createBitsAttrs({
  component: "collapsible",
  parts: ["root", "content", "trigger"]
});
const CollapsibleRootContext = new Context$1("Collapsible.Root");
class CollapsibleRootState {
  static create(opts) {
    return CollapsibleRootContext.set(new CollapsibleRootState(opts));
  }
  opts;
  attachment;
  contentNode = null;
  contentId = void 0;
  constructor(opts) {
    this.opts = opts;
    this.toggleOpen = this.toggleOpen.bind(this);
    this.attachment = attachRef(this.opts.ref);
    new OpenChangeComplete({
      ref: box.with(() => this.contentNode),
      open: this.opts.open,
      onComplete: () => {
        this.opts.onOpenChangeComplete.current(this.opts.open.current);
      }
    });
  }
  toggleOpen() {
    this.opts.open.current = !this.opts.open.current;
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    "data-state": getDataOpenClosed(this.opts.open.current),
    "data-disabled": getDataDisabled(this.opts.disabled.current),
    [collapsibleAttrs.root]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class CollapsibleContentState {
  static create(opts) {
    return new CollapsibleContentState(opts, CollapsibleRootContext.get());
  }
  opts;
  root;
  attachment;
  #present = derived(() => this.opts.forceMount.current || this.root.opts.open.current);
  get present() {
    return this.#present();
  }
  set present($$value) {
    return this.#present($$value);
  }
  #originalStyles;
  #isMountAnimationPrevented = false;
  #width = 0;
  #height = 0;
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.#isMountAnimationPrevented = root.opts.open.current;
    this.root.contentId = this.opts.id.current;
    this.attachment = attachRef(this.opts.ref, (v) => this.root.contentNode = v);
    watch$1.pre(() => this.opts.id.current, (id) => {
      this.root.contentId = id;
    });
    watch$1(
      [
        () => this.opts.ref.current,
        () => this.present
      ],
      ([node]) => {
        if (!node) return;
        afterTick(() => {
          if (!this.opts.ref.current) return;
          this.#originalStyles = this.#originalStyles || {
            transitionDuration: node.style.transitionDuration,
            animationName: node.style.animationName
          };
          node.style.transitionDuration = "0s";
          node.style.animationName = "none";
          const rect = node.getBoundingClientRect();
          this.#height = rect.height;
          this.#width = rect.width;
          if (!this.#isMountAnimationPrevented) {
            const { animationName, transitionDuration } = this.#originalStyles;
            node.style.transitionDuration = transitionDuration;
            node.style.animationName = animationName;
          }
        });
      }
    );
  }
  #snippetProps = derived(() => ({ open: this.root.opts.open.current }));
  get snippetProps() {
    return this.#snippetProps();
  }
  set snippetProps($$value) {
    return this.#snippetProps($$value);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    style: {
      "--bits-collapsible-content-height": this.#height ? `${this.#height}px` : void 0,
      "--bits-collapsible-content-width": this.#width ? `${this.#width}px` : void 0
    },
    "data-state": getDataOpenClosed(this.root.opts.open.current),
    "data-disabled": getDataDisabled(this.root.opts.disabled.current),
    [collapsibleAttrs.content]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class CollapsibleTriggerState {
  static create(opts) {
    return new CollapsibleTriggerState(opts, CollapsibleRootContext.get());
  }
  opts;
  root;
  attachment;
  #isDisabled = derived(() => this.opts.disabled.current || this.root.opts.disabled.current);
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(this.opts.ref);
    this.onclick = this.onclick.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
  }
  onclick(e) {
    if (this.#isDisabled()) return;
    if (e.button !== 0) return e.preventDefault();
    this.root.toggleOpen();
  }
  onkeydown(e) {
    if (this.#isDisabled()) return;
    if (e.key === SPACE || e.key === ENTER) {
      e.preventDefault();
      this.root.toggleOpen();
    }
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    type: "button",
    disabled: this.#isDisabled(),
    "aria-controls": this.root.contentId,
    "aria-expanded": getAriaExpanded(this.root.opts.open.current),
    "data-state": getDataOpenClosed(this.root.opts.open.current),
    "data-disabled": getDataDisabled(this.#isDisabled()),
    [collapsibleAttrs.trigger]: "",
    //
    onclick: this.onclick,
    onkeydown: this.onkeydown,
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
function Collapsible$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    id = createId$1(uid),
    ref = null,
    open = false,
    disabled = false,
    onOpenChange = noop$2,
    onOpenChangeComplete = noop$2,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const rootState = CollapsibleRootState.create({
    open: box.with(() => open, (v) => {
      open = v;
      onOpenChange(v);
    }),
    disabled: box.with(() => disabled),
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    onOpenChangeComplete: box.with(() => onOpenChangeComplete)
  });
  const mergedProps = mergeProps(restProps, rootState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps }, null)}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref, open });
  pop();
}
function Collapsible_content$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    child,
    ref = null,
    forceMount = false,
    children,
    id = createId$1(uid),
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const contentState = CollapsibleContentState.create({
    id: box.with(() => id),
    forceMount: box.with(() => forceMount),
    ref: box.with(() => ref, (v) => ref = v)
  });
  {
    let presence = function($$payload2, { present }) {
      const mergedProps = mergeProps(restProps, contentState.props, { hidden: forceMount ? void 0 : !present });
      if (child) {
        $$payload2.out += "<!--[-->";
        child($$payload2, {
          ...contentState.snippetProps,
          props: mergedProps
        });
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<div${spread_attributes({ ...mergedProps }, null)}>`;
        children?.($$payload2);
        $$payload2.out += `<!----></div>`;
      }
      $$payload2.out += `<!--]-->`;
    };
    Presence_layer($$payload, {
      forceMount: true,
      open: contentState.present,
      ref: contentState.opts.ref,
      presence
    });
  }
  bind_props($$props, { ref });
  pop();
}
function Collapsible_trigger$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    ref = null,
    id = createId$1(uid),
    disabled = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const triggerState = CollapsibleTriggerState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v),
    disabled: box.with(() => disabled)
  });
  const mergedProps = mergeProps(restProps, triggerState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes({ ...mergedProps }, null)}>`;
    children?.($$payload);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
const tabsAttrs = createBitsAttrs({
  component: "tabs",
  parts: ["root", "list", "trigger", "content"]
});
const TabsRootContext = new Context$1("Tabs.Root");
class TabsRootState {
  static create(opts) {
    return TabsRootContext.set(new TabsRootState(opts));
  }
  opts;
  attachment;
  rovingFocusGroup;
  triggerIds = [];
  // holds the trigger ID for each value to associate it with the content
  valueToTriggerId = new SvelteMap();
  // holds the content ID for each value to associate it with the trigger
  valueToContentId = new SvelteMap();
  constructor(opts) {
    this.opts = opts;
    this.attachment = attachRef(opts.ref);
    this.rovingFocusGroup = new RovingFocusGroup({
      candidateAttr: tabsAttrs.trigger,
      rootNode: this.opts.ref,
      loop: this.opts.loop,
      orientation: this.opts.orientation
    });
  }
  registerTrigger(id, value) {
    this.triggerIds.push(id);
    this.valueToTriggerId.set(value, id);
    return () => {
      this.triggerIds = this.triggerIds.filter((triggerId) => triggerId !== id);
      this.valueToTriggerId.delete(value);
    };
  }
  registerContent(id, value) {
    this.valueToContentId.set(value, id);
    return () => {
      this.valueToContentId.delete(value);
    };
  }
  setValue(v) {
    this.opts.value.current = v;
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    "data-orientation": getDataOrientation(this.opts.orientation.current),
    [tabsAttrs.root]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class TabsListState {
  static create(opts) {
    return new TabsListState(opts, TabsRootContext.get());
  }
  opts;
  root;
  attachment;
  #isDisabled = derived(() => this.root.opts.disabled.current);
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(opts.ref);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: "tablist",
    "aria-orientation": getAriaOrientation(this.root.opts.orientation.current),
    "data-orientation": getDataOrientation(this.root.opts.orientation.current),
    [tabsAttrs.list]: "",
    "data-disabled": getDataDisabled(this.#isDisabled()),
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class TabsTriggerState {
  static create(opts) {
    return new TabsTriggerState(opts, TabsRootContext.get());
  }
  opts;
  root;
  attachment;
  #tabIndex = 0;
  #isActive = derived(() => this.root.opts.value.current === this.opts.value.current);
  #isDisabled = derived(() => this.opts.disabled.current || this.root.opts.disabled.current);
  #ariaControls = derived(() => this.root.valueToContentId.get(this.opts.value.current));
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(opts.ref);
    watch$1(
      [
        () => this.opts.id.current,
        () => this.opts.value.current
      ],
      ([id, value]) => {
        return this.root.registerTrigger(id, value);
      }
    );
    this.onfocus = this.onfocus.bind(this);
    this.onclick = this.onclick.bind(this);
    this.onkeydown = this.onkeydown.bind(this);
  }
  #activate() {
    if (this.root.opts.value.current === this.opts.value.current) return;
    this.root.setValue(this.opts.value.current);
  }
  onfocus(_) {
    if (this.root.opts.activationMode.current !== "automatic" || this.#isDisabled()) return;
    this.#activate();
  }
  onclick(_) {
    if (this.#isDisabled()) return;
    this.#activate();
  }
  onkeydown(e) {
    if (this.#isDisabled()) return;
    if (e.key === SPACE || e.key === ENTER) {
      e.preventDefault();
      this.#activate();
      return;
    }
    this.root.rovingFocusGroup.handleKeydown(this.opts.ref.current, e);
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: "tab",
    "data-state": getTabDataState(this.#isActive()),
    "data-value": this.opts.value.current,
    "data-orientation": getDataOrientation(this.root.opts.orientation.current),
    "data-disabled": getDataDisabled(this.#isDisabled()),
    "aria-selected": getAriaSelected(this.#isActive()),
    "aria-controls": this.#ariaControls(),
    [tabsAttrs.trigger]: "",
    disabled: getDisabled(this.#isDisabled()),
    tabindex: this.#tabIndex,
    //
    onclick: this.onclick,
    onfocus: this.onfocus,
    onkeydown: this.onkeydown,
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
class TabsContentState {
  static create(opts) {
    return new TabsContentState(opts, TabsRootContext.get());
  }
  opts;
  root;
  attachment;
  #isActive = derived(() => this.root.opts.value.current === this.opts.value.current);
  #ariaLabelledBy = derived(() => this.root.valueToTriggerId.get(this.opts.value.current));
  constructor(opts, root) {
    this.opts = opts;
    this.root = root;
    this.attachment = attachRef(opts.ref);
    watch$1(
      [
        () => this.opts.id.current,
        () => this.opts.value.current
      ],
      ([id, value]) => {
        return this.root.registerContent(id, value);
      }
    );
  }
  #props = derived(() => ({
    id: this.opts.id.current,
    role: "tabpanel",
    hidden: getHidden(!this.#isActive()),
    tabindex: 0,
    "data-value": this.opts.value.current,
    "data-state": getTabDataState(this.#isActive()),
    "aria-labelledby": this.#ariaLabelledBy(),
    "data-orientation": getDataOrientation(this.root.opts.orientation.current),
    [tabsAttrs.content]: "",
    ...this.attachment
  }));
  get props() {
    return this.#props();
  }
  set props($$value) {
    return this.#props($$value);
  }
}
function getTabDataState(condition) {
  return condition ? "active" : "inactive";
}
function Tabs$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    id = createId$1(uid),
    ref = null,
    value = "",
    onValueChange = noop$2,
    orientation = "horizontal",
    loop: loop2 = true,
    activationMode = "automatic",
    disabled = false,
    children,
    child,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const rootState = TabsRootState.create({
    id: box.with(() => id),
    value: box.with(() => value, (v) => {
      value = v;
      onValueChange(v);
    }),
    orientation: box.with(() => orientation),
    loop: box.with(() => loop2),
    activationMode: box.with(() => activationMode),
    disabled: box.with(() => disabled),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, rootState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps }, null)}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref, value });
  pop();
}
function Tabs_content$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    children,
    child,
    id = createId$1(uid),
    ref = null,
    value,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const contentState = TabsContentState.create({
    value: box.with(() => value),
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, contentState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps }, null)}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Tabs_list$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    child,
    children,
    id = createId$1(uid),
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const listState = TabsListState.create({
    id: box.with(() => id),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, listState.props);
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes({ ...mergedProps }, null)}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Tabs_trigger$1($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    child,
    children,
    disabled = false,
    id = createId$1(uid),
    type = "button",
    value,
    ref = null,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const triggerState = TabsTriggerState.create({
    id: box.with(() => id),
    disabled: box.with(() => disabled ?? false),
    value: box.with(() => value),
    ref: box.with(() => ref, (v) => ref = v)
  });
  const mergedProps = mergeProps(restProps, triggerState.props, { type });
  if (child) {
    $$payload.out += "<!--[-->";
    child($$payload, { props: mergedProps });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<button${spread_attributes({ ...mergedProps }, null)}>`;
    children?.($$payload);
    $$payload.out += `<!----></button>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref });
  pop();
}
function Calendar_fold($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    ["path", { "d": "M8 2v4" }],
    ["path", { "d": "M16 2v4" }],
    [
      "path",
      {
        "d": "M21 17V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11Z"
      }
    ],
    ["path", { "d": "M3 10h18" }],
    ["path", { "d": "M15 22v-4a2 2 0 0 1 2-2h4" }]
  ];
  Icon($$payload, spread_props([
    { name: "calendar-fold" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Speech($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "path",
      {
        "d": "M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20"
      }
    ],
    [
      "path",
      { "d": "M19.8 17.8a7.5 7.5 0 0 0 .003-10.603" }
    ],
    [
      "path",
      { "d": "M17 15a3.5 3.5 0 0 0-.025-4.975" }
    ]
  ];
  Icon($$payload, spread_props([
    { name: "speech" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Trending_down($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "polyline",
      { "points": "22 17 13.5 8.5 8.5 13.5 2 7" }
    ],
    ["polyline", { "points": "16 17 22 17 22 11" }]
  ];
  Icon($$payload, spread_props([
    { name: "trending-down" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Trending_up($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const iconNode = [
    [
      "polyline",
      { "points": "22 7 13.5 15.5 8.5 10.5 2 17" }
    ],
    ["polyline", { "points": "16 7 22 7 22 13" }]
  ];
  Icon($$payload, spread_props([
    { name: "trending-up" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2) => {
        $$payload2.out += `<!---->`;
        slot($$payload2, $$props, "default", {});
        $$payload2.out += `<!---->`;
      },
      $$slots: { default: true }
    }
  ]));
}
function Collapsible($$payload, $$props) {
  push();
  let {
    ref = null,
    open = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Collapsible$1($$payload2, spread_props([
      { "data-slot": "collapsible" },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        },
        get open() {
          return open;
        },
        set open($$value) {
          open = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref, open });
  pop();
}
function Collapsible_trigger($$payload, $$props) {
  push();
  let { ref = null, $$slots, $$events, ...restProps } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Collapsible_trigger$1($$payload2, spread_props([
      { "data-slot": "collapsible-trigger" },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Collapsible_content($$payload, $$props) {
  push();
  let { ref = null, $$slots, $$events, ...restProps } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Collapsible_content$1($$payload2, spread_props([
      { "data-slot": "collapsible-content" },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Card_action($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes(
    {
      "data-slot": "card-action",
      class: clsx$1(cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)),
      ...restProps
    },
    null
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
const THEMES = { light: "", dark: ".dark" };
function getPayloadConfigFromPayload(config, payload, key) {
  if (typeof payload !== "object" || payload === null) return void 0;
  const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : void 0;
  let configLabelKey = key;
  if (payload.key === key) {
    configLabelKey = payload.key;
  } else if (payload.name === key) {
    configLabelKey = payload.name;
  } else if (key in payload && typeof payload[key] === "string") {
    configLabelKey = payload[key];
  } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") {
    configLabelKey = payloadPayload[key];
  }
  return configLabelKey in config ? config[configLabelKey] : config[key];
}
const chartContextKey = Symbol("chart-context");
function setChartContext$1(value) {
  return setContext(chartContextKey, value);
}
function useChart() {
  return getContext(chartContextKey);
}
function Chart_style($$payload, $$props) {
  push();
  let { id, config } = $$props;
  const colorConfig = config ? Object.entries(config).filter(([, config2]) => config2.theme || config2.color) : null;
  const themeContents = (() => {
    if (!colorConfig || !colorConfig.length) return;
    const themeContents2 = [];
    for (let [_theme, prefix] of Object.entries(THEMES)) {
      let content = `${prefix} [data-chart=${id}] {
`;
      const color = colorConfig.map(([key, itemConfig]) => {
        const theme = _theme;
        const color2 = itemConfig.theme?.[theme] || itemConfig.color;
        return color2 ? `	--color-${key}: ${color2};` : null;
      });
      content += color.join("\n") + "\n}";
      themeContents2.push(content);
    }
    return themeContents2.join("\n");
  })();
  if (themeContents) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    {
      $$payload.out += `${html(`<style>${themeContents}</style>`)}`;
    }
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function Chart_container($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    ref = null,
    id = uid,
    class: className,
    children,
    config,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const chartId = `chart-${id || uid.replace(/:/g, "")}`;
  setChartContext$1({
    get config() {
      return config;
    }
  });
  $$payload.out += `<div${spread_attributes(
    {
      "data-chart": chartId,
      "data-slot": "chart",
      class: clsx$1(cn(
        "flex aspect-video justify-center overflow-visible text-xs",
        // Overrides
        //
        // Stroke around dots/marks when hovering
        "[&_.stroke-white]:stroke-transparent",
        // override the default stroke color of lines
        "[&_.lc-line]:stroke-border/50",
        // by default, layerchart shows a line intersecting the point when hovering, this hides that
        "[&_.lc-highlight-line]:stroke-0",
        // by default, when you hover a point on a stacked series chart, it will drop the opacity
        // of the other series, this overrides that
        "[&_.lc-area-path]:opacity-100 [&_.lc-highlight-line]:opacity-100 [&_.lc-highlight-point]:opacity-100 [&_.lc-spline-path]:opacity-100 [&_.lc-text-svg]:overflow-visible [&_.lc-text]:text-xs",
        // We don't want the little tick lines between the axis labels and the chart, so we remove
        // the stroke. The alternative is to manually disable `tickMarks` on the x/y axis of every
        // chart.
        "[&_.lc-axis-tick]:stroke-0",
        // We don't want to display the rule on the x/y axis, as there is already going to be
        // a grid line there and rule ends up overlapping the marks because it is rendered after
        // the marks
        "[&_.lc-rule-x-line:not(.lc-grid-x-rule)]:stroke-0 [&_.lc-rule-y-line:not(.lc-grid-y-rule)]:stroke-0",
        "[&_.lc-grid-x-radial-line]:stroke-border [&_.lc-grid-x-radial-circle]:stroke-border",
        "[&_.lc-grid-y-radial-line]:stroke-border [&_.lc-grid-y-radial-circle]:stroke-border",
        // Legend adjustments
        "[&_.lc-legend-swatch-button]:items-center [&_.lc-legend-swatch-button]:gap-1.5",
        "[&_.lc-legend-swatch-group]:items-center [&_.lc-legend-swatch-group]:gap-4",
        "[&_.lc-legend-swatch]:size-2.5 [&_.lc-legend-swatch]:rounded-[2px]",
        // Labels
        "[&_.lc-labels-text:not([fill])]:fill-foreground [&_text]:stroke-transparent",
        // Tick labels on th x/y axes
        "[&_.lc-axis-tick-label]:fill-muted-foreground [&_.lc-axis-tick-label]:font-normal",
        "[&_.lc-tooltip-rects-g]:fill-transparent",
        "[&_.lc-layout-svg-g]:fill-transparent",
        "[&_.lc-root-container]:w-full",
        className
      )),
      ...restProps
    },
    null
  )}>`;
  Chart_style($$payload, { id: chartId, config });
  $$payload.out += `<!----> `;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref });
  pop();
}
class MediaQueryPresets {
  width(width) {
    return new MediaQuery(`(min-width: ${width}px)`);
  }
  height(height) {
    return new MediaQuery(`(min-height: ${height}px)`);
  }
  // Matches tailwind defaults (https://tailwindcss.com/docs/responsive-design)
  smScreen = this.width(640);
  mdScreen = this.width(768);
  lgScreen = this.width(1024);
  xlScreen = this.width(1280);
  xxlScreen = this.width(1536);
  screen = new MediaQuery("screen and (min-width: 0)");
  // workaround for https://github.com/sveltejs/svelte/issues/15930
  print = new MediaQuery("print and (min-width: 0)");
  // workaround for https://github.com/sveltejs/svelte/issues/15930
  dark = new MediaQuery("(prefers-color-scheme: dark)");
  light = new MediaQuery("(prefers-color-scheme: light)");
  motion = new MediaQuery("(prefers-reduced-motion: no-preference)");
  motionReduce = new MediaQuery("(prefers-reduced-motion: reduce)");
  landscape = new MediaQuery("(orientation: landscape)");
  portrait = new MediaQuery("(orientation: portrait)");
}
class UniqueState {
  #initial;
  current;
  constructor(initial) {
    this.#initial = initial ?? [];
    this.current = new SvelteSet(initial ?? []);
  }
  /** Clear all values */
  clear() {
    this.current.clear();
  }
  /** Reset to initial values */
  reset() {
    this.clear();
    this.addEach(this.#initial);
  }
  /** Add a value */
  add(value) {
    this.current.add(value);
  }
  /** Add multiple values */
  addEach(values) {
    for (const value of values) {
      this.current.add(value);
    }
  }
  /** Remove a value */
  delete(value) {
    this.current.delete(value);
  }
  /** Toggle a value */
  toggle(value) {
    if (this.current.has(value)) {
      this.current.delete(value);
    } else {
      this.current.add(value);
    }
  }
}
class SelectionState {
  #initial;
  #selected;
  all;
  single;
  max;
  constructor(options = {}) {
    this.#initial = options.initial ?? [];
    this.#selected = new UniqueState(this.#initial);
    this.all = options.all ?? [];
    this.single = options.single ?? false;
    this.max = options.max;
  }
  get current() {
    return this.single ? Array.from(this.#selected.current)[0] ?? null : Array.from(this.#selected.current);
  }
  set current(values) {
    if (Array.isArray(values)) {
      if (this.max == null || values.length < this.max) {
        this.#selected.clear();
        this.#selected.addEach(values);
      } else {
        throw new Error(`Too many values selected.  Current: ${values.length}, max: ${this.max}`);
      }
    } else if (values != null) {
      this.#selected.clear();
      this.#selected.add(values);
    } else {
      this.#selected.clear();
    }
  }
  /** Check if a value is selected */
  isSelected(value) {
    return this.#selected.current.has(value);
  }
  /** Check if the selection is empty */
  isEmpty() {
    return this.#selected.current.size === 0;
  }
  /** Check if all values in `all` are selected */
  isAllSelected() {
    return this.all.every((v) => this.#selected.current.has(v));
  }
  /** Check if any values in `all` are selected */
  isAnySelected() {
    return this.all.some((v) => this.#selected.current.has(v));
  }
  /** Check if the selection is at the maximum */
  isMaxSelected() {
    return this.max != null ? this.#selected.current.size >= this.max : false;
  }
  /** Check if a value is disabled (max reached) */
  isDisabled(value) {
    return !this.isSelected(value) && this.isMaxSelected();
  }
  /** Clear all selected values */
  clear() {
    this.#selected.clear();
  }
  /** Reset to initial values */
  reset() {
    this.#selected.reset();
  }
  /** Toggle a value */
  toggle(value) {
    if (this.#selected.current.has(value)) {
      const prevSelected = [...this.#selected.current];
      this.#selected.clear();
      this.#selected.addEach(prevSelected.filter((v) => v != value));
    } else if (this.single) {
      this.#selected.clear();
      this.#selected.add(value);
    } else {
      if (this.max == null || this.#selected.current.size < this.max) {
        return this.#selected.add(value);
      }
    }
  }
  /** Toggle all values */
  toggleAll() {
    let values;
    if (this.isAllSelected()) {
      values = [...this.#selected.current].filter((v) => !this.all.includes(v));
    } else {
      values = [...this.#selected.current, ...this.all];
    }
    this.#selected.clear();
    this.#selected.addEach(values);
  }
}
function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}
function radiansToDegrees(radians) {
  return radians * (180 / Math.PI);
}
function cartesianToPolar(x, y) {
  let radians = Math.atan2(y, x);
  radians += Math.PI / 2;
  if (radians < 0) {
    radians += 2 * Math.PI;
  }
  return {
    radius: Math.sqrt(x ** 2 + y ** 2),
    radians
  };
}
function accessor(prop) {
  if (Array.isArray(prop)) {
    return (d) => prop.map((p) => accessor(p)(d));
  } else if (typeof prop === "function") {
    return prop;
  } else if (typeof prop === "string" || typeof prop === "number") {
    return (d) => get(d, prop);
  } else {
    return (d) => d;
  }
}
function chartDataArray(data) {
  if (data == null) {
    return [];
  } else if (Array.isArray(data)) {
    return data;
  } else if ("nodes" in data) {
    return data.nodes;
  } else if ("descendants" in data) {
    return data.descendants();
  }
  return [];
}
function defaultChartPadding(axis = true, legend = false) {
  if (axis === false) {
    return void 0;
  } else {
    return {
      top: axis === true || axis === "y" ? 4 : 0,
      left: axis === true || axis === "y" ? 20 : 0,
      bottom: (axis === true || axis === "x" ? 20 : 0) + (legend === true ? 32 : 0),
      right: axis === true || axis === "x" ? 4 : 0
    };
  }
}
function findRelatedData(data, original, accessor2) {
  return data.find((d) => {
    return accessor2(d)?.valueOf() === accessor2(original)?.valueOf();
  });
}
const MEASUREMENT_ELEMENT_ID = "__text_measurement_id";
function _getStringWidth(str, style) {
  try {
    let textEl = document.getElementById(MEASUREMENT_ELEMENT_ID);
    if (!textEl) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.style.width = "0";
      svg.style.height = "0";
      svg.style.position = "absolute";
      svg.style.top = "-100%";
      svg.style.left = "-100%";
      textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
      textEl.setAttribute("id", MEASUREMENT_ELEMENT_ID);
      svg.appendChild(textEl);
      document.body.appendChild(svg);
    }
    Object.assign(textEl.style, style);
    textEl.textContent = str;
    return textEl.getComputedTextLength();
  } catch (e) {
    return null;
  }
}
const getStringWidth = memoize(_getStringWidth, {
  cacheKey: ([str, style]) => `${str}_${JSON.stringify(style)}`
});
function toTitleCase(str) {
  return str.replace(/^\w/, (d) => d.toUpperCase());
}
const DEFAULT_ELLIPSIS = "…";
function truncateText(text, { position = "end", ellipsis = DEFAULT_ELLIPSIS, maxWidth, style, maxChars }) {
  if (!text)
    return "";
  if (maxWidth === void 0 && maxChars === void 0)
    return text;
  let workingText = text;
  if (maxChars !== void 0 && text.length > maxChars) {
    if (position === "start") {
      workingText = ellipsis + text.slice(-maxChars);
    } else if (position === "middle") {
      const half = Math.floor(maxChars / 2);
      workingText = text.slice(0, half) + ellipsis + text.slice(-half);
    } else {
      workingText = text.slice(0, maxChars) + ellipsis;
    }
  }
  if (maxWidth !== void 0) {
    const fullWidth = getStringWidth(workingText, style);
    if (fullWidth === null || fullWidth <= maxWidth)
      return workingText;
    const ellipsisWidth = getStringWidth(ellipsis, style) ?? 0;
    let availableWidth = maxWidth - ellipsisWidth;
    if (position === "start") {
      let truncated = workingText.slice(ellipsis.length);
      let truncatedWidth = getStringWidth(truncated, style);
      while (truncatedWidth !== null && truncatedWidth > availableWidth && truncated.length > 0) {
        truncated = truncated.slice(1);
        truncatedWidth = getStringWidth(truncated, style);
      }
      return ellipsis + truncated;
    } else if (position === "middle") {
      const halfWidth = availableWidth / 2;
      let left = "";
      let right = "";
      let bestLeft = "";
      let bestRight = "";
      for (let i = 0, j = workingText.length - 1; i < workingText.length && j >= 0; i++, j--) {
        const leftTest = workingText.slice(0, i + 1);
        const rightTest = workingText.slice(j);
        const leftWidth = getStringWidth(leftTest, style);
        const rightWidth = getStringWidth(rightTest, style);
        if (leftWidth !== null && leftWidth <= halfWidth)
          left = leftTest;
        if (rightWidth !== null && rightWidth <= halfWidth)
          right = rightTest;
        const combinedWidth = getStringWidth(left + ellipsis + right, style);
        if (combinedWidth !== null && combinedWidth <= maxWidth) {
          bestLeft = left;
          bestRight = right;
        } else {
          break;
        }
      }
      return bestLeft + ellipsis + bestRight;
    } else {
      let truncated = workingText.slice(0, -ellipsis.length);
      let truncatedWidth = getStringWidth(truncated + ellipsis, style);
      while (truncatedWidth !== null && truncatedWidth > maxWidth && truncated.length > 0) {
        truncated = truncated.slice(0, -1);
        truncatedWidth = getStringWidth(truncated + ellipsis, style);
      }
      return truncated + ellipsis;
    }
  }
  return workingText;
}
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length)
    return false;
  return arr1.every((k) => {
    return arr2.includes(k);
  });
}
function calcDomain(s, extents, domain) {
  return extents ? partialDomain(extents[s], domain) : domain;
}
function partialDomain(domain = [], directive) {
  if (Array.isArray(directive) === true) {
    return directive.map((d, i) => {
      if (d === null) {
        return domain[i];
      }
      return d;
    });
  }
  return domain;
}
function createChartScale(axis, { domain, scale, padding, nice, reverse, width, height, range: range2, percentRange }) {
  const defaultRange = getDefaultRange(axis, width, height, reverse, range2, percentRange);
  const trueScale = scale.copy();
  trueScale.domain(domain);
  if (!trueScale.interpolator || typeof trueScale.interpolator === "function" && trueScale.interpolator().name.startsWith("identity")) {
    trueScale.range(defaultRange);
  }
  if (padding) {
    trueScale.domain(padScale(trueScale, padding));
  }
  if (nice === true || typeof nice === "number") {
    if (typeof trueScale.nice === "function") {
      trueScale.nice(typeof nice === "number" ? nice : void 0);
    } else {
      console.error(`[Layer Chart] You set \`${axis}Nice: true\` but the ${axis}Scale does not have a \`.nice\` method. Ignoring...`);
    }
  }
  return trueScale;
}
const unpaddable = ["scaleThreshold", "scaleQuantile", "scaleQuantize", "scaleSequentialQuantile"];
function padScale(scale, padding) {
  if (typeof scale.range !== "function") {
    throw new Error("Scale method `range` must be a function");
  }
  if (typeof scale.domain !== "function") {
    throw new Error("Scale method `domain` must be a function");
  }
  if (!Array.isArray(padding) || unpaddable.includes(findScaleName(scale))) {
    return scale.domain();
  }
  if (isOrdinalDomain(scale) === true)
    return scale.domain();
  const { lift, ground } = getPadFunctions(scale);
  const d0 = scale.domain()[0];
  const isTime = Object.prototype.toString.call(d0) === "[object Date]";
  const [d1, d2] = scale.domain().map((d) => {
    return isTime ? lift(d.getTime()) : lift(d);
  });
  const [r1, r2] = scale.range();
  const paddingLeft = padding[0] || 0;
  const paddingRight = padding[1] || 0;
  const step = (d2 - d1) / (Math.abs(r2 - r1) - paddingLeft - paddingRight);
  return [d1 - paddingLeft * step, paddingRight * step + d2].map((d) => {
    return isTime ? ground(new Date(d).getTime()) : ground(d);
  });
}
function f(name, modifier = "") {
  return `scale${toTitleCase(modifier)}${toTitleCase(name)}`;
}
function findScaleName(scale) {
  if (typeof scale.bandwidth === "function") {
    if (typeof scale.paddingInner === "function") {
      return f("band");
    }
    return f("point");
  }
  if (arraysEqual(Object.keys(scale), ["domain", "range", "unknown", "copy"])) {
    return f("ordinal");
  }
  let modifier = "";
  if (scale.interpolator) {
    if (scale.domain().length === 3) {
      modifier = "diverging";
    } else {
      modifier = "sequential";
    }
  }
  if (scale.quantiles) {
    return f("quantile", modifier);
  }
  if (scale.thresholds) {
    return f("quantize", modifier);
  }
  if (scale.constant) {
    return f("symlog", modifier);
  }
  if (scale.base) {
    return f("log", modifier);
  }
  if (scale.exponent) {
    if (scale.exponent() === 0.5) {
      return f("sqrt", modifier);
    }
    return f("pow", modifier);
  }
  if (arraysEqual(Object.keys(scale), ["domain", "range", "invertExtent", "unknown", "copy"])) {
    return f("threshold");
  }
  if (arraysEqual(Object.keys(scale), [
    "invert",
    "range",
    "domain",
    "unknown",
    "copy",
    "ticks",
    "tickFormat",
    "nice"
  ])) {
    return f("identity");
  }
  if (arraysEqual(Object.keys(scale), [
    "invert",
    "domain",
    "range",
    "rangeRound",
    "round",
    "clamp",
    "unknown",
    "copy",
    "ticks",
    "tickFormat",
    "nice"
  ])) {
    return f("radial");
  }
  if (modifier) {
    return f(modifier);
  }
  if (scale.domain()[0] instanceof Date) {
    const d = /* @__PURE__ */ new Date();
    let s = "";
    d.getDay = () => s = "time";
    d.getUTCDay = () => s = "utc";
    scale.tickFormat(0, "%a")(d);
    return f(s);
  }
  return f("linear");
}
function isOrdinalDomain(scale) {
  if (typeof scale.bandwidth === "function")
    return true;
  if (arraysEqual(Object.keys(scale), ["domain", "range", "unknown", "copy"])) {
    return true;
  }
  return false;
}
function calcScaleExtents(flatData, getters, activeScales) {
  const scaleGroups = Object.entries(activeScales).reduce((groups, [key, scaleInfo]) => {
    const domainType = isOrdinalDomain(scaleInfo.scale) === true ? "ordinal" : "other";
    if (!groups[domainType]) {
      groups[domainType] = {};
    }
    groups[domainType][key] = getters[key];
    return groups;
  }, { ordinal: false, other: false });
  let extents = {};
  if (scaleGroups.ordinal) {
    const sortOptions = Object.fromEntries(Object.entries(activeScales).map(([key, scaleInfo]) => [key, scaleInfo.sort]));
    extents = calcUniques(flatData, scaleGroups.ordinal, sortOptions);
  }
  if (scaleGroups.other) {
    const otherExtents = calcExtents(flatData, scaleGroups.other);
    extents = { ...extents, ...otherExtents };
  }
  return extents;
}
function calcUniques(data, fields, sortOptions = {}) {
  if (!Array.isArray(data)) {
    throw new TypeError(`The first argument of calcUniques() must be an array. You passed in a ${typeof data}. If you got this error using the <Chart> component, consider passing a flat array to the \`flatData\` prop`);
  }
  if (Array.isArray(fields) || fields === void 0 || fields === null) {
    throw new TypeError("The second argument of calcUniques() must be an object with field names as keys and accessor functions as values.");
  }
  const uniques = {};
  const keys = Object.keys(fields);
  for (const key of keys) {
    const set2 = new InternSet();
    const accessor2 = fields[key];
    if (!accessor2)
      continue;
    for (const item of data) {
      const value = accessor2(item);
      if (Array.isArray(value)) {
        for (const val of value) {
          set2.add(val);
        }
      } else {
        set2.add(value);
      }
    }
    const results = Array.from(set2);
    if (sortOptions.sort === true || sortOptions[key] === true) {
      results.sort((a, b) => {
        if (typeof a === "number" && typeof b === "number") {
          return a - b;
        }
        return String(a).localeCompare(String(b));
      });
    }
    uniques[key] = results;
  }
  return uniques;
}
function calcBaseRange(s, width, height, reverse, percentRange) {
  let min2;
  let max2;
  if (percentRange === true) {
    min2 = 0;
    max2 = 100;
  } else {
    min2 = s === "r" ? 1 : 0;
    max2 = s === "y" ? height : s === "r" ? 25 : width;
  }
  return reverse === true ? [max2, min2] : [min2, max2];
}
function getDefaultRange(s, width, height, reverse, range2, percentRange = false) {
  return !range2 ? calcBaseRange(s, width, height, reverse, percentRange) : typeof range2 === "function" ? range2({ width, height }) : range2;
}
function identity(d) {
  return d;
}
function findScaleType(scale) {
  if (scale.constant) {
    return "symlog";
  }
  if (scale.base) {
    return "log";
  }
  if (typeof scale.exponent === "function") {
    const expValue = scale.exponent();
    if (expValue === 0.5) {
      return "sqrt";
    }
    return "pow";
  }
  return "other";
}
function log(sign) {
  return (x) => Math.log(sign * x);
}
function exp(sign) {
  return (x) => sign * Math.exp(x);
}
function symlog(c) {
  return (x) => Math.sign(x) * Math.log1p(Math.abs(x / c));
}
function symexp(c) {
  return (x) => Math.sign(x) * Math.expm1(Math.abs(x)) * c;
}
function pow(exponent) {
  return function powFn(x) {
    return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
  };
}
function getPadFunctions(scale) {
  const scaleType = findScaleType(scale);
  switch (scaleType) {
    case "log": {
      const domain = scale.domain();
      const sign = Math.sign(domain[0]);
      return { lift: log(sign), ground: exp(sign), scaleType };
    }
    case "pow": {
      const exponent = 1;
      return {
        lift: pow(exponent),
        ground: pow(1 / exponent),
        scaleType
      };
    }
    case "sqrt": {
      const exponent = 0.5;
      return {
        lift: pow(exponent),
        ground: pow(1 / exponent),
        scaleType
      };
    }
    case "symlog": {
      const constant = 1;
      return {
        lift: symlog(constant),
        ground: symexp(constant),
        scaleType
      };
    }
    default:
      return {
        lift: identity,
        ground: identity,
        scaleType
      };
  }
}
function createGetter(accessor2, scale) {
  return (d) => {
    const val = accessor2(d);
    if (!scale)
      return void 0;
    if (Array.isArray(val)) {
      return val.map((v) => scale(v));
    }
    return scale(val);
  };
}
function calcExtents(data, fields) {
  if (!Array.isArray(data)) {
    throw new TypeError(`The first argument of calcExtents() must be an array. You passed in a ${typeof data}. If you got this error using the <Chart> component, consider passing a flat array to the \`flatData\` prop.`);
  }
  if (Array.isArray(fields) || fields === void 0 || fields === null) {
    throw new TypeError("The second argument of calcExtents() must be an object with field names as keys as accessor functions as values.");
  }
  const extents = {};
  const keys = Object.keys(fields);
  const kl = keys.length;
  let i;
  let j;
  let k;
  let s;
  let min2;
  let max2;
  let acc;
  let val;
  const dl = data.length;
  for (i = 0; i < kl; i += 1) {
    s = keys[i];
    acc = fields[s];
    min2 = null;
    max2 = null;
    if (!acc)
      continue;
    for (j = 0; j < dl; j += 1) {
      val = acc(data[j]);
      if (Array.isArray(val)) {
        const vl = val.length;
        for (k = 0; k < vl; k += 1) {
          if (val[k] !== void 0 && val[k] !== null && (typeof val[k] === "string" || Number.isNaN(val[k]) === false)) {
            if (min2 === null || val[k] < min2) {
              min2 = val[k];
            }
            if (max2 === null || val[k] > max2) {
              max2 = val[k];
            }
          }
        }
      } else if (val !== void 0 && val !== null && (typeof val === "string" || Number.isNaN(val) === false)) {
        if (min2 === null || val < min2) {
          min2 = val;
        }
        if (max2 === null || val > max2) {
          max2 = val;
        }
      }
    }
    extents[s] = [min2, max2];
  }
  return extents;
}
function raise(node) {
  if (node.nextSibling) {
    node.parentNode?.appendChild(node);
  }
}
const indent = "    ";
function printObject(obj) {
  Object.entries(obj).forEach(([key, value]) => {
    console.log(`${indent}${key}:`, value);
  });
}
function getRgb(clr) {
  const { r, g, b, opacity: o } = rgb$1(clr);
  if (![r, g, b].every((c) => c >= 0 && c <= 255)) {
    return false;
  }
  return { r, g, b, o };
}
function printValues(scale, method, extraSpace = "") {
  const values = scale[method]();
  const colorValues = colorizeArray(values);
  if (colorValues) {
    printColorArray(colorValues, method, values);
  } else {
    console.log(`${indent}${indent}${toTitleCase(method)}:${extraSpace}`, values);
  }
}
function printColorArray(colorValues, method, values) {
  console.log(`${indent}${indent}${toTitleCase(method)}:    %cArray%c(${values.length}) ` + colorValues[0] + "%c ]", "color: #1377e4", "color: #737373", "color: #1478e4", ...colorValues[1], "color: #1478e4");
}
function colorizeArray(arr) {
  const colors = [];
  const a = arr.map((d, i) => {
    const rgbo = getRgb(d);
    if (rgbo !== false) {
      colors.push(rgbo);
      const space = i === arr.length - 1 ? " " : "";
      return `%c ${d}${space}`;
    }
    return d;
  });
  if (colors.length) {
    return [
      `%c[ ${a.join(", ")}`,
      colors.map((d) => `background-color: rgba(${d.r}, ${d.g}, ${d.b}, ${d.o}); color:${contrast(d)};`)
    ];
  }
  return null;
}
function printScale(s, scale, acc) {
  const scaleName = findScaleName(scale);
  console.log(`${indent}${s}:`);
  console.log(`${indent}${indent}Accessor: "${acc.toString()}"`);
  console.log(`${indent}${indent}Type: ${scaleName}`);
  printValues(scale, "domain");
  printValues(scale, "range", " ");
}
function contrast({ r, g, b }) {
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance > 0.6 ? "black" : "white";
}
function printDebug(obj) {
  console.log("/********* LayerChart Debug ************/");
  console.log("Bounding box:");
  printObject(obj.boundingBox);
  console.log("Data:");
  console.log(indent, obj.data);
  if (obj.flatData) {
    console.log("flatData:");
    console.log(indent, obj.flatData);
  }
  console.log("Scales:");
  Object.keys(obj.activeGetters).forEach((g) => {
    printScale(g, obj[`${g}Scale`], obj[g]);
  });
  console.log("/************ End LayerChart Debug ***************/\n");
}
function filterObject(obj, comparisonObj = {}) {
  return Object.fromEntries(Object.entries(obj).filter(([key, value]) => {
    return value !== void 0 && comparisonObj[key] === void 0;
  }));
}
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function tick_spring(ctx, last_value, current_value, target_value) {
  if (typeof current_value === "number" || is_date(current_value)) {
    const delta = target_value - current_value;
    const velocity = (current_value - last_value) / (ctx.dt || 1 / 60);
    const spring = ctx.opts.stiffness * delta;
    const damper = ctx.opts.damping * velocity;
    const acceleration = (spring - damper) * ctx.inv_mass;
    const d = (velocity + acceleration) * ctx.dt;
    if (Math.abs(d) < ctx.opts.precision && Math.abs(delta) < ctx.opts.precision) {
      return target_value;
    } else {
      ctx.settled = false;
      return is_date(current_value) ? new Date(current_value.getTime() + d) : current_value + d;
    }
  } else if (Array.isArray(current_value)) {
    return current_value.map(
      (_, i) => (
        // @ts-ignore
        tick_spring(ctx, last_value[i], current_value[i], target_value[i])
      )
    );
  } else if (typeof current_value === "object") {
    const next_value = {};
    for (const k in current_value) {
      next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
    }
    return next_value;
  } else {
    throw new Error(`Cannot spring ${typeof current_value} values`);
  }
}
class Spring {
  #stiffness = source(0.15);
  #damping = source(0.8);
  #precision = source(0.01);
  #current;
  #target;
  #last_value = (
    /** @type {T} */
    void 0
  );
  #last_time = 0;
  #inverse_mass = 1;
  #momentum = 0;
  /** @type {import('../internal/client/types').Task | null} */
  #task = null;
  /** @type {ReturnType<typeof deferred> | null} */
  #deferred = null;
  /**
   * @param {T} value
   * @param {SpringOpts} [options]
   */
  constructor(value, options = {}) {
    this.#current = source(value);
    this.#target = source(value);
    if (typeof options.stiffness === "number") this.#stiffness.v = clamp(options.stiffness, 0, 1);
    if (typeof options.damping === "number") this.#damping.v = clamp(options.damping, 0, 1);
    if (typeof options.precision === "number") this.#precision.v = options.precision;
  }
  /**
   * Create a spring whose value is bound to the return value of `fn`. This must be called
   * inside an effect root (for example, during component initialisation).
   *
   * ```svelte
   * <script>
   * 	import { Spring } from 'svelte/motion';
   *
   * 	let { number } = $props();
   *
   * 	const spring = Spring.of(() => number);
   * <\/script>
   * ```
   * @template U
   * @param {() => U} fn
   * @param {SpringOpts} [options]
   */
  static of(fn, options) {
    const spring = new Spring(fn(), options);
    render_effect(() => {
      spring.set(fn());
    });
    return spring;
  }
  /** @param {T} value */
  #update(value) {
    set(this.#target, value);
    this.#current.v ??= value;
    this.#last_value ??= this.#current.v;
    if (!this.#task) {
      this.#last_time = raf.now();
      var inv_mass_recovery_rate = 1e3 / (this.#momentum * 60);
      this.#task ??= loop((now2) => {
        this.#inverse_mass = Math.min(this.#inverse_mass + inv_mass_recovery_rate, 1);
        const elapsed = Math.min(now2 - this.#last_time, 1e3 / 30);
        const ctx = {
          inv_mass: this.#inverse_mass,
          opts: {
            stiffness: this.#stiffness.v,
            damping: this.#damping.v,
            precision: this.#precision.v
          },
          settled: true,
          dt: elapsed * 60 / 1e3
        };
        var next = tick_spring(ctx, this.#last_value, this.#current.v, this.#target.v);
        this.#last_value = this.#current.v;
        this.#last_time = now2;
        set(this.#current, next);
        if (ctx.settled) {
          this.#task = null;
        }
        return !ctx.settled;
      });
    }
    return this.#task.promise;
  }
  /**
   * Sets `spring.target` to `value` and returns a `Promise` that resolves if and when `spring.current` catches up to it.
   *
   * If `options.instant` is `true`, `spring.current` immediately matches `spring.target`.
   *
   * If `options.preserveMomentum` is provided, the spring will continue on its current trajectory for
   * the specified number of milliseconds. This is useful for things like 'fling' gestures.
   *
   * @param {T} value
   * @param {SpringUpdateOpts} [options]
   */
  set(value, options) {
    this.#deferred?.reject(new Error("Aborted"));
    if (options?.instant || this.#current.v === void 0) {
      this.#task?.abort();
      this.#task = null;
      set(this.#current, set(this.#target, value));
      this.#last_value = value;
      return Promise.resolve();
    }
    if (options?.preserveMomentum) {
      this.#inverse_mass = 0;
      this.#momentum = options.preserveMomentum;
    }
    var d = this.#deferred = deferred();
    d.promise.catch(noop$3);
    this.#update(value).then(() => {
      if (d !== this.#deferred) return;
      d.resolve(void 0);
    });
    return d.promise;
  }
  get current() {
    return get$1(this.#current);
  }
  get damping() {
    return get$1(this.#damping);
  }
  set damping(v) {
    set(this.#damping, clamp(v, 0, 1));
  }
  get precision() {
    return get$1(this.#precision);
  }
  set precision(v) {
    set(this.#precision, v);
  }
  get stiffness() {
    return get$1(this.#stiffness);
  }
  set stiffness(v) {
    set(this.#stiffness, clamp(v, 0, 1));
  }
  get target() {
    return get$1(this.#target);
  }
  set target(v) {
    this.set(v);
  }
}
function clamp(n, min2, max2) {
  return Math.max(min2, Math.min(max2, n));
}
function linear$1(t) {
  return t;
}
function cubicInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 0.5 * Math.pow(2 * t - 2, 3) + 1;
}
function cubicIn(t) {
  return t * t * t;
}
function get_interpolator(a, b) {
  if (a === b || a !== a) return () => a;
  const type = typeof a;
  if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
    throw new Error("Cannot interpolate values of different type");
  }
  if (Array.isArray(a)) {
    const arr = (
      /** @type {Array<any>} */
      b.map((bi, i) => {
        return get_interpolator(
          /** @type {Array<any>} */
          a[i],
          bi
        );
      })
    );
    return (t) => arr.map((fn) => fn(t));
  }
  if (type === "object") {
    if (!a || !b) {
      throw new Error("Object cannot be null");
    }
    if (is_date(a) && is_date(b)) {
      const an = a.getTime();
      const bn = b.getTime();
      const delta = bn - an;
      return (t) => new Date(an + t * delta);
    }
    const keys = Object.keys(b);
    const interpolators = {};
    keys.forEach((key) => {
      interpolators[key] = get_interpolator(a[key], b[key]);
    });
    return (t) => {
      const result = {};
      keys.forEach((key) => {
        result[key] = interpolators[key](t);
      });
      return result;
    };
  }
  if (type === "number") {
    const delta = (
      /** @type {number} */
      b - /** @type {number} */
      a
    );
    return (t) => a + t * delta;
  }
  return () => b;
}
class Tween {
  #current;
  #target;
  /** @type {TweenedOptions<T>} */
  #defaults;
  /** @type {import('../internal/client/types').Task | null} */
  #task = null;
  /**
   * @param {T} value
   * @param {TweenedOptions<T>} options
   */
  constructor(value, options = {}) {
    this.#current = source(value);
    this.#target = source(value);
    this.#defaults = options;
  }
  /**
   * Create a tween whose value is bound to the return value of `fn`. This must be called
   * inside an effect root (for example, during component initialisation).
   *
   * ```svelte
   * <script>
   * 	import { Tween } from 'svelte/motion';
   *
   * 	let { number } = $props();
   *
   * 	const tween = Tween.of(() => number);
   * <\/script>
   * ```
   * @template U
   * @param {() => U} fn
   * @param {TweenedOptions<U>} [options]
   */
  static of(fn, options) {
    const tween = new Tween(fn(), options);
    render_effect(() => {
      tween.set(fn());
    });
    return tween;
  }
  /**
   * Sets `tween.target` to `value` and returns a `Promise` that resolves if and when `tween.current` catches up to it.
   *
   * If `options` are provided, they will override the tween's defaults.
   * @param {T} value
   * @param {TweenedOptions<T>} [options]
   * @returns
   */
  set(value, options) {
    set(this.#target, value);
    let {
      delay = 0,
      duration = 400,
      easing = linear$1,
      interpolate: interpolate2 = get_interpolator
    } = { ...this.#defaults, ...options };
    if (duration === 0) {
      this.#task?.abort();
      set(this.#current, value);
      return Promise.resolve();
    }
    const start = raf.now() + delay;
    let fn;
    let started = false;
    let previous_task = this.#task;
    this.#task = loop((now2) => {
      if (now2 < start) {
        return true;
      }
      if (!started) {
        started = true;
        const prev = this.#current.v;
        fn = interpolate2(prev, value);
        if (typeof duration === "function") {
          duration = duration(prev, value);
        }
        previous_task?.abort();
      }
      const elapsed = now2 - start;
      if (elapsed > /** @type {number} */
      duration) {
        set(this.#current, value);
        return false;
      }
      set(this.#current, fn(easing(elapsed / /** @type {number} */
      duration)));
      return true;
    });
    return this.#task.promise;
  }
  get current() {
    return get$1(this.#current);
  }
  get target() {
    return get$1(this.#target);
  }
  set target(v) {
    this.set(v);
  }
}
class MotionSpring extends Spring {
  type = "spring";
  constructor(value, options) {
    super(value, options);
  }
}
class MotionTween extends Tween {
  type = "tween";
  constructor(value, options) {
    super(value, options);
  }
}
class MotionNone {
  type = "none";
  #current = null;
  #target = null;
  constructor(value, _options = {}) {
    this.#current = value;
    this.#target = value;
  }
  /**
   * Updates the value immediately and returns a resolved promise
   * to maintain API compatibility with animated motion classes
   */
  set(value, _options = {}) {
    this.#current = value;
    this.#target = value;
    return Promise.resolve();
  }
  get current() {
    return this.#current;
  }
  get target() {
    return this.#target;
  }
  set target(v) {
    this.set(v);
  }
}
function setupTracking(motion, getValue, options) {
  if (options.controlled) return;
}
function createMotion(initialValue, getValue, motionProp, options = {}) {
  const motion = parseMotionProp(motionProp);
  const motionState = motion.type === "spring" ? new MotionSpring(initialValue, motion.options) : motion.type === "tween" ? new MotionTween(initialValue, motion.options) : new MotionNone(initialValue);
  setupTracking(motionState, getValue, options);
  return motionState;
}
function createControlledMotion(initialValue, motionProp) {
  return createMotion(initialValue, () => initialValue, motionProp, { controlled: true });
}
function createMotionTracker() {
  let latestIndex = 0;
  let current = false;
  function handle(promise) {
    latestIndex += 1;
    if (!promise) {
      current = false;
      return;
    }
    let currIndex = latestIndex;
    current = true;
    promise.then(() => {
      if (currIndex === latestIndex) {
        current = false;
      }
    }).catch(() => {
    });
  }
  return {
    handle,
    get current() {
      return current;
    }
  };
}
function extractTweenConfig(prop) {
  const resolved = parseMotionProp(prop);
  if (resolved.type === "tween") return resolved;
}
function parseMotionProp(config, accessor2) {
  if (typeof config === "object" && "type" in config && "options" in config) {
    if (typeof config.options === "object") return config;
    return { type: config.type, options: {} };
  }
  if (config === void 0) return { type: "none", options: {} };
  if (typeof config === "string") {
    if (config === "spring") {
      return { type: "spring", options: {} };
    } else if (config === "tween") {
      return { type: "tween", options: {} };
    }
    return { type: "none", options: {} };
  }
  if (typeof config === "object" && "type" in config) {
    if (config.type === "spring") {
      const { type, ...options } = config;
      return { type: "spring", options };
    } else if (config.type === "tween") {
      const { type, ...options } = config;
      return { type: "tween", options };
    } else {
      return { type: "none", options: {} };
    }
  }
  if (accessor2) {
    const propConfig = config[accessor2];
    if (propConfig !== void 0) {
      return parseMotionProp(propConfig);
    }
  }
  return { type: "none", options: {} };
}
function isAnyScale(scale) {
  return typeof scale === "function" && typeof scale.range === "function";
}
function isScaleBand(scale) {
  return typeof scale.bandwidth === "function";
}
function isScaleTime(scale) {
  const domain = scale.domain();
  return domain[0] instanceof Date || domain[1] instanceof Date;
}
function getRange(scale) {
  if (isAnyScale(scale)) {
    return scale.range();
  }
  console.error("[LayerChart] Your scale doesn't have a `.range` method?");
  return [];
}
function scaleBandInvert(scale) {
  const domain = scale.domain();
  const eachBand = scale.step();
  const paddingOuter = eachBand * (scale.paddingOuter?.() ?? scale.padding());
  return function(value) {
    const index = Math.floor((value - paddingOuter / 2) / eachBand);
    return domain[Math.max(0, Math.min(index, domain.length - 1))];
  };
}
function scaleInvert(scale, value) {
  if (isScaleBand(scale)) {
    return scaleBandInvert(scale)(value);
  } else {
    return scale.invert?.(value);
  }
}
function createScale(scale, domain, range2, context) {
  const scaleCopy = scale.copy();
  if (domain) {
    scaleCopy.domain(domain);
  }
  if (typeof range2 === "function") {
    scaleCopy.range(range2(context));
  } else {
    scaleCopy.range(range2);
  }
  return scaleCopy;
}
function canBeZero(val) {
  if (val === 0) return true;
  return val;
}
function makeAccessor(acc) {
  if (!canBeZero(acc)) return null;
  if (Array.isArray(acc)) {
    return (d) => acc.map((k) => {
      return typeof k !== "function" ? d[k] : k(d);
    });
  } else if (typeof acc !== "function") {
    return (d) => d[acc];
  }
  return acc;
}
const defaultWindow = void 0;
function getActiveElement(document2) {
  let activeElement = document2.activeElement;
  while (activeElement?.shadowRoot) {
    const node = activeElement.shadowRoot.activeElement;
    if (node === activeElement)
      break;
    else
      activeElement = node;
  }
  return activeElement;
}
class ActiveElement {
  #document;
  #subscribe;
  constructor(options = {}) {
    const {
      window: window2 = defaultWindow,
      document: document2 = window2?.document
    } = options;
    if (window2 === void 0) return;
    this.#document = document2;
    this.#subscribe = createSubscriber();
  }
  get current() {
    this.#subscribe?.();
    if (!this.#document) return null;
    return getActiveElement(this.#document);
  }
}
new ActiveElement();
function isFunction(value) {
  return typeof value === "function";
}
function extract(value, defaultValue) {
  if (isFunction(value)) {
    const getter = value;
    const gotten = getter();
    if (gotten === void 0) return defaultValue;
    return gotten;
  }
  if (value === void 0) return defaultValue;
  return value;
}
class Context {
  #name;
  #key;
  /**
   * @param name The name of the context.
   * This is used for generating the context key and error messages.
   */
  constructor(name) {
    this.#name = name;
    this.#key = Symbol(name);
  }
  /**
   * The key used to get and set the context.
   *
   * It is not recommended to use this value directly.
   * Instead, use the methods provided by this class.
   */
  get key() {
    return this.#key;
  }
  /**
   * Checks whether this has been set in the context of a parent component.
   *
   * Must be called during component initialisation.
   */
  exists() {
    return hasContext(this.#key);
  }
  /**
   * Retrieves the context that belongs to the closest parent component.
   *
   * Must be called during component initialisation.
   *
   * @throws An error if the context does not exist.
   */
  get() {
    const context = getContext(this.#key);
    if (context === void 0) {
      throw new Error(`Context "${this.#name}" not found`);
    }
    return context;
  }
  /**
   * Retrieves the context that belongs to the closest parent component,
   * or the given fallback value if the context does not exist.
   *
   * Must be called during component initialisation.
   */
  getOr(fallback) {
    const context = getContext(this.#key);
    if (context === void 0) {
      return fallback;
    }
    return context;
  }
  /**
   * Associates the given value with the current component and returns it.
   *
   * Must be called during component initialisation.
   */
  set(context) {
    return setContext(this.#key, context);
  }
}
function useDebounce(callback, wait) {
  let context = null;
  const wait$ = extract(wait, 250);
  function debounced(...args) {
    if (context) {
      if (context.timeout) {
        clearTimeout(context.timeout);
      }
    } else {
      let resolve;
      let reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      context = {
        timeout: null,
        runner: null,
        promise,
        resolve,
        reject
      };
    }
    context.runner = async () => {
      if (!context) return;
      const ctx = context;
      context = null;
      try {
        ctx.resolve(await callback.apply(this, args));
      } catch (error) {
        ctx.reject(error);
      }
    };
    context.timeout = setTimeout(context.runner, wait$);
    return context.promise;
  }
  debounced.cancel = async () => {
    if (!context || context.timeout === null) {
      await new Promise((resolve) => setTimeout(resolve, 0));
      if (!context || context.timeout === null) return;
    }
    clearTimeout(context.timeout);
    context.reject("Cancelled");
    context = null;
  };
  debounced.runScheduledNow = async () => {
    if (!context || !context.timeout) {
      await new Promise((resolve) => setTimeout(resolve, 0));
      if (!context || !context.timeout) return;
    }
    clearTimeout(context.timeout);
    context.timeout = null;
    await context.runner?.();
  };
  Object.defineProperty(debounced, "pending", {
    enumerable: true,
    get() {
      return !!context?.timeout;
    }
  });
  return debounced;
}
function runWatcher(sources, flush, effect, options = {}) {
  const { lazy = false } = options;
}
function watch(sources, effect, options) {
  runWatcher(sources, "post", effect, options);
}
function watchPre(sources, effect, options) {
  runWatcher(sources, "pre", effect, options);
}
watch.pre = watchPre;
function useMutationObserver(target, callback, options = {}) {
  const { window: window2 = defaultWindow } = options;
  let observer;
  (() => {
    const value = extract(target);
    return new Set(value ? Array.isArray(value) ? value : [value] : []);
  })();
  const stop = () => {
  };
  return {
    stop,
    takeRecords() {
      return observer?.takeRecords();
    }
  };
}
function layerClass(layerName) {
  return `lc-${layerName}`;
}
function isObjectWithClass(val) {
  return typeof val === "object" && val !== null && typeof val !== "function";
}
function extractLayerProps(props, layerName, extraClasses) {
  const className = layerClass(layerName);
  if (isObjectWithClass(props)) {
    return {
      ...props,
      class: cls(className, props.class ?? "", extraClasses)
    };
  }
  return {
    class: cls(className, extraClasses)
  };
}
const DEFAULT_TRANSLATE = { x: 0, y: 0 };
const DEFAULT_SCALE = 1;
const _TransformContext = new Context("TransformContext");
function createDefaultTransformContext() {
  let defaultTranslate = DEFAULT_TRANSLATE;
  let defaultScale = DEFAULT_SCALE;
  const defaultContext = {
    mode: "none",
    get scale() {
      return defaultScale;
    },
    setScale: (value) => {
      defaultScale = value;
    },
    get translate() {
      return defaultTranslate;
    },
    setTranslate: (value) => {
      defaultTranslate = value;
    },
    moving: false,
    dragging: false,
    scrollMode: "none",
    setScrollMode: () => {
    },
    reset: () => {
    },
    zoomIn: () => {
    },
    zoomOut: () => {
    },
    translateCenter: () => {
    },
    zoomTo: () => {
    }
  };
  return defaultContext;
}
function getTransformContext() {
  return _TransformContext.getOr(createDefaultTransformContext());
}
function setTransformContext(transform) {
  return _TransformContext.set(transform);
}
function TransformContext($$payload, $$props) {
  push();
  let {
    mode = "none",
    motion,
    processTranslate = (x, y, deltaX, deltaY) => ({ x: x + deltaX, y: y + deltaY }),
    disablePointer = false,
    initialScrollMode = "none",
    clickDistance = 10,
    ondragend = () => {
    },
    ondragstart = () => {
    },
    onTransform = () => {
    },
    initialTranslate,
    initialScale,
    onwheel = () => {
    },
    onpointerdown = () => {
    },
    onpointermove = () => {
    },
    ontouchmove = () => {
    },
    onpointerup = () => {
    },
    ondblclick = () => {
    },
    onclickcapture = () => {
    },
    ref: refProp = void 0,
    children,
    class: className,
    transformContext = void 0,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  transformContext = {
    get mode() {
      return mode;
    },
    get scale() {
      return scale.current;
    },
    setScale,
    get translate() {
      return translate.current;
    },
    setTranslate,
    get dragging() {
      return dragging;
    },
    get moving() {
      return moving;
    },
    reset,
    zoomIn,
    zoomOut,
    translateCenter,
    zoomTo,
    get scrollMode() {
      return scrollMode;
    },
    setScrollMode
  };
  const ctx = getChartContext();
  let dragging = false;
  let scrollMode = initialScrollMode;
  const resolvedMotion = parseMotionProp(motion);
  const translate = createControlledMotion(initialTranslate ?? DEFAULT_TRANSLATE, resolvedMotion);
  const scale = createControlledMotion(initialScale ?? DEFAULT_SCALE, resolvedMotion);
  function setScrollMode(mode2) {
    scrollMode = mode2;
  }
  function reset() {
    translate.target = initialTranslate ?? DEFAULT_TRANSLATE;
    scale.target = initialScale ?? DEFAULT_SCALE;
  }
  function zoomIn() {
    scaleTo(1.25, {
      x: (ctx.width + ctx.padding.left) / 2,
      y: (ctx.height + ctx.padding.top) / 2
    });
  }
  function zoomOut() {
    scaleTo(0.8, {
      x: (ctx.width + ctx.padding.left) / 2,
      y: (ctx.height + ctx.padding.top) / 2
    });
  }
  function translateCenter() {
    translate.target = { x: 0, y: 0 };
  }
  function zoomTo(center, rect) {
    const newScale = rect ? ctx.width < ctx.height ? ctx.width / rect.width : ctx.height / rect.height : 1;
    translate.target = {
      x: ctx.width / 2 - center.x * newScale,
      y: ctx.height / 2 - center.y * newScale
    };
    if (rect) {
      scale.target = newScale;
    }
  }
  function scaleTo(value, point, options = void 0) {
    const currentScale = scale.current;
    const newScale = scale.current * value;
    setScale(newScale, options);
    const invertTransformPoint = {
      x: (point.x - ctx.padding.left - translate.current.x) / currentScale,
      y: (point.y - ctx.padding.top - translate.current.y) / currentScale
    };
    const newTranslate = {
      x: point.x - ctx.padding.left - invertTransformPoint.x * newScale,
      y: point.y - ctx.padding.top - invertTransformPoint.y * newScale
    };
    setTranslate(newTranslate, options);
  }
  const translating = createMotionTracker();
  const scaling = createMotionTracker();
  const moving = dragging || translating.current || scaling.current;
  function setTranslate(point, options) {
    translating.handle(translate.set(point, options));
  }
  function setScale(value, options) {
    scaling.handle(scale.set(value, options));
  }
  watch([() => scale.current, () => translate.current], () => {
    onTransform({
      scale: scale.current,
      translate: translate.current
    });
  });
  setTransformContext(transformContext);
  $$payload.out += `<div${spread_attributes(
    {
      class: clsx$1(cls(layerClass("transform-context"), "h-full", className)),
      ...restProps
    },
    null
  )}>`;
  children?.($$payload, { transformContext });
  $$payload.out += `<!----></div>`;
  bind_props($$props, {
    ref: refProp,
    transformContext,
    setScrollMode,
    reset,
    zoomIn,
    zoomOut,
    translateCenter,
    zoomTo,
    setTranslate,
    setScale
  });
  pop();
}
const _GeoContext = new Context("GeoContext");
function getGeoContext() {
  return _GeoContext.getOr({ projection: void 0 });
}
function setGeoContext(geo) {
  return _GeoContext.set(geo);
}
function GeoContext($$payload, $$props) {
  push();
  let {
    projection: projectionProp,
    fitGeojson,
    fixedAspectRatio,
    clipAngle,
    clipExtent,
    rotate,
    scale,
    translate,
    center,
    applyTransform = [],
    reflectX,
    reflectY,
    geoContext: geoContextProp = void 0,
    children
  } = $$props;
  const ctx = getChartContext();
  getTransformContext();
  let projection = void 0;
  const geoContext = {
    get projection() {
      return projection;
    },
    set projection(v) {
      projection = v;
    }
  };
  geoContextProp = geoContext;
  setGeoContext(geoContext);
  fixedAspectRatio ? [100, 100 / fixedAspectRatio] : [ctx.width, ctx.height];
  children($$payload, { geoContext });
  $$payload.out += `<!---->`;
  bind_props($$props, { geoContext: geoContextProp });
  pop();
}
function Svg($$payload, $$props) {
  push();
  let {
    ref: refProp = void 0,
    innerRef: innerRefProp = void 0,
    zIndex = 0,
    pointerEvents,
    viewBox,
    ignoreTransform = false,
    center = false,
    class: className,
    title,
    defs,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let ref = void 0;
  const ctx = getChartContext();
  const transformCtx = getTransformContext();
  const transform = (() => {
    if (transformCtx.mode === "canvas" && !ignoreTransform) {
      return `translate(${transformCtx.translate.x},${transformCtx.translate.y}) scale(${transformCtx.scale})`;
    } else if (center) {
      return `translate(${center === "x" || center === true ? ctx.width / 2 : 0}, ${center === "y" || center === true ? ctx.height / 2 : 0})`;
    }
  })();
  setRenderContext("svg");
  $$payload.out += `<svg${spread_attributes(
    {
      viewBox,
      width: ctx.containerWidth,
      height: ctx.containerHeight,
      class: clsx$1(cls(layerClass("layout-svg"), "absolute top-0 left-0 overflow-visible", pointerEvents === false && "pointer-events-none", className)),
      role: "figure",
      ...restProps
    },
    null,
    void 0,
    { "z-index": zIndex },
    3
  )}>`;
  if (typeof title === "function") {
    $$payload.out += "<!--[-->";
    title($$payload);
    $$payload.out += `<!---->`;
  } else if (title) {
    $$payload.out += "<!--[1-->";
    $$payload.out += `<title${attr_class(clsx$1(layerClass("layout-svg-title")))}>${escape_html(title)}</title>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--><defs>`;
  defs?.($$payload);
  $$payload.out += `<!----></defs><g${attr_class(clsx$1(layerClass("layout-svg-g")))}${attr("transform", `translate(${stringify(ctx.padding.left)}, ${stringify(ctx.padding.top)})`)}>`;
  if (transform) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<g${attr("transform", transform)}${attr_class(clsx$1(layerClass("layout-svg-g-transform")))}>`;
    children?.($$payload, { ref });
    $$payload.out += `<!----></g>`;
  } else {
    $$payload.out += "<!--[!-->";
    children?.($$payload, { ref });
    $$payload.out += `<!---->`;
  }
  $$payload.out += `<!--]--></g></svg>`;
  bind_props($$props, { ref: refProp, innerRef: innerRefProp });
  pop();
}
function createId(prefix, uid) {
  return `${prefix}-${uid}`;
}
function ClipPath($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    id = createId("clipPath-", uid),
    useId,
    disabled = false,
    children,
    clip,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const url = `url(#${id})`;
  const renderContext = getRenderContext();
  if (renderContext === "svg") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<defs><clipPath${spread_attributes({ id, ...restProps }, null, void 0, void 0, 3)}>`;
    clip?.($$payload, { id });
    $$payload.out += `<!---->`;
    if (useId) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<use${attr("href", `#${stringify(useId)}`)}></use>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></clipPath></defs>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  if (children) {
    $$payload.out += "<!--[-->";
    if (disabled || renderContext !== "svg") {
      $$payload.out += "<!--[-->";
      children($$payload, { id, url, useId });
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `<g${attr_class(clsx$1(layerClass("clip-path-g")))}${attr_style("", { "clip-path": url })}>`;
      children($$payload, { id, url, useId });
      $$payload.out += `<!----></g>`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
const DEFAULT_FILL = "rgb(0, 0, 0)";
const CANVAS_STYLES_ELEMENT_ID = "__layerchart_canvas_styles_id";
const supportedStyles = [
  "fill",
  "fillOpacity",
  "stroke",
  "strokeWidth",
  "opacity",
  "fontWeight",
  "fontSize",
  "fontFamily",
  "textAnchor",
  "textAlign",
  "paintOrder"
];
function _getComputedStyles(canvas, { styles, classes } = {}) {
  try {
    let svg = document.getElementById(CANVAS_STYLES_ELEMENT_ID);
    if (!svg) {
      svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("id", CANVAS_STYLES_ELEMENT_ID);
      svg.style.display = "none";
      canvas.after(svg);
    }
    svg = svg;
    svg.removeAttribute("style");
    svg.removeAttribute("class");
    if (styles) {
      Object.assign(svg.style, styles);
    }
    svg.style.display = "none";
    if (classes) {
      svg.setAttribute("class", cls(classes).split(" ").filter((s) => !s.startsWith("transition-")).join(" "));
    }
    const computedStyles = supportedStyles.reduce((acc, style) => {
      acc[style] = window.getComputedStyle(svg)[style];
      return acc;
    }, {});
    return computedStyles;
  } catch (e) {
    console.error("Unable to get computed styles", e);
    return {};
  }
}
function getComputedStylesKey(canvas, { styles, classes } = {}) {
  return JSON.stringify({ canvasId: canvas.id, styles, classes });
}
const getComputedStyles = memoize(_getComputedStyles, {
  cacheKey: ([canvas, styleOptions]) => {
    return getComputedStylesKey(canvas, styleOptions);
  }
});
function render(ctx, render2, styleOptions = {}, { applyText } = {}) {
  let resolvedStyles;
  if (styleOptions.classes == null && !Object.values(styleOptions.styles ?? {}).some((v) => typeof v === "string" && v.includes("var("))) {
    resolvedStyles = styleOptions.styles ?? {};
  } else {
    const { constantStyles, variableStyles } = Object.entries(styleOptions.styles ?? {}).reduce((acc, [key, value]) => {
      if (typeof value === "number" || typeof value === "string" && !value.includes("var(")) {
        acc.constantStyles[key] = value;
      } else if (typeof value === "string" && value.includes("var(")) {
        acc.variableStyles[key] = value;
      }
      return acc;
    }, { constantStyles: {}, variableStyles: {} });
    const computedStyles = getComputedStyles(ctx.canvas, {
      styles: variableStyles,
      classes: styleOptions.classes
    });
    resolvedStyles = { ...computedStyles, ...constantStyles };
  }
  const paintOrder = resolvedStyles?.paintOrder === "stroke" ? ["stroke", "fill"] : ["fill", "stroke"];
  if (resolvedStyles?.opacity) {
    ctx.globalAlpha = Number(resolvedStyles?.opacity);
  }
  if (applyText) {
    ctx.font = `${resolvedStyles.fontWeight} ${resolvedStyles.fontSize} ${resolvedStyles.fontFamily}`;
    if (resolvedStyles.textAnchor === "middle") {
      ctx.textAlign = "center";
    } else if (resolvedStyles.textAnchor === "end") {
      ctx.textAlign = "right";
    } else {
      ctx.textAlign = resolvedStyles.textAlign;
    }
  }
  if (resolvedStyles.strokeDasharray?.includes(",")) {
    const dashArray = resolvedStyles.strokeDasharray.split(",").map((s) => Number(s.replace("px", "")));
    ctx.setLineDash(dashArray);
  }
  for (const attr2 of paintOrder) {
    if (attr2 === "fill") {
      const fill = styleOptions.styles?.fill && (styleOptions.styles?.fill instanceof CanvasGradient || styleOptions.styles?.fill instanceof CanvasPattern || !styleOptions.styles?.fill?.includes("var")) ? styleOptions.styles.fill : resolvedStyles?.fill;
      if (fill && !["none", DEFAULT_FILL].includes(fill)) {
        const currentGlobalAlpha = ctx.globalAlpha;
        const fillOpacity = Number(resolvedStyles?.fillOpacity);
        const opacity = Number(resolvedStyles?.opacity);
        ctx.globalAlpha = fillOpacity * opacity;
        ctx.fillStyle = fill;
        render2.fill(ctx);
        ctx.globalAlpha = currentGlobalAlpha;
      }
    } else if (attr2 === "stroke") {
      const stroke = styleOptions.styles?.stroke && (styleOptions.styles?.stroke instanceof CanvasGradient || !styleOptions.styles?.stroke?.includes("var")) ? styleOptions.styles?.stroke : resolvedStyles?.stroke;
      if (stroke && !["none"].includes(stroke)) {
        ctx.lineWidth = typeof resolvedStyles?.strokeWidth === "string" ? Number(resolvedStyles?.strokeWidth?.replace("px", "")) : resolvedStyles?.strokeWidth ?? 1;
        ctx.strokeStyle = stroke;
        render2.stroke(ctx);
      }
    }
  }
}
function renderPathData(ctx, pathData, styleOptions = {}) {
  const path2 = new Path2D(pathData ?? "");
  render(ctx, {
    fill: (ctx2) => ctx2.fill(path2),
    stroke: (ctx2) => ctx2.stroke(path2)
  }, styleOptions);
}
function renderCircle(ctx, coords, styleOptions = {}) {
  ctx.beginPath();
  ctx.arc(coords.cx, coords.cy, coords.r, 0, 2 * Math.PI);
  render(ctx, {
    fill: (ctx2) => {
      ctx2.fill();
    },
    stroke: (ctx2) => {
      ctx2.stroke();
    }
  }, styleOptions);
  ctx.closePath();
}
function _createLinearGradient(ctx, x0, y0, x1, y1, stops) {
  const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
  for (const { offset, color } of stops) {
    gradient.addColorStop(offset, color);
  }
  return gradient;
}
memoize(_createLinearGradient, {
  cacheKey: (args) => JSON.stringify(args.slice(1))
  // Ignore `ctx` argument
});
function _createPattern(ctx, width, height, shapes, background) {
  const patternCanvas = document.createElement("canvas");
  const patternCtx = patternCanvas.getContext("2d");
  ctx.canvas.after(patternCanvas);
  patternCanvas.width = width;
  patternCanvas.height = height;
  if (background) {
    patternCtx.fillStyle = background;
    patternCtx.fillRect(0, 0, width, height);
  }
  for (const shape of shapes) {
    patternCtx.save();
    if (shape.type === "circle") {
      renderCircle(patternCtx, { cx: shape.cx, cy: shape.cy, r: shape.r }, { styles: { fill: shape.fill, opacity: shape.opacity } });
    } else if (shape.type === "line") {
      renderPathData(patternCtx, shape.path, {
        styles: { stroke: shape.stroke, strokeWidth: shape.strokeWidth, opacity: shape.opacity }
      });
    }
    patternCtx.restore();
  }
  const pattern = ctx.createPattern(patternCanvas, "repeat");
  ctx.canvas.parentElement?.removeChild(patternCanvas);
  return pattern;
}
memoize(_createPattern, {
  cacheKey: (args) => JSON.stringify(args.slice(1))
  // Ignore `ctx` argument
});
const CanvasContext = new Context("CanvasContext");
const defaultCanvasContext = {
  register: (_) => {
    return () => {
    };
  },
  invalidate: () => {
  }
};
function getCanvasContext() {
  return CanvasContext.getOr(defaultCanvasContext);
}
function setCanvasContext(context) {
  return CanvasContext.set(context);
}
function registerCanvasComponent(component) {
  getCanvasContext();
}
function Canvas($$payload, $$props) {
  push();
  let {
    ref: refProp = void 0,
    canvasContext: canvasContextProp = void 0,
    willReadFrequently = false,
    debug = false,
    zIndex = 0,
    pointerEvents = true,
    fallback,
    center = false,
    ignoreTransform = false,
    disableHitCanvas = false,
    class: className,
    children,
    onclick,
    ondblclick,
    onpointerenter,
    onpointermove,
    onpointerleave: onpointerleave2,
    onpointerdown,
    ontouchmove,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let ref = void 0;
  let context = void 0;
  getChartContext();
  getTransformContext();
  let components = /* @__PURE__ */ new Map();
  let pendingInvalidation = false;
  const { dark } = new MediaQueryPresets();
  watch(() => dark.current, () => {
    canvasContext.invalidate();
  });
  useMutationObserver(() => document.documentElement, () => canvasContext.invalidate(), {});
  function update() {
    return;
  }
  function createCanvasContext() {
    function register(component) {
      const key = Symbol();
      components.set(key, component);
      invalidate();
      return () => {
        components.delete(key);
        invalidate();
      };
    }
    function invalidate() {
      if (pendingInvalidation) return;
      pendingInvalidation = true;
      requestAnimationFrame(update);
    }
    return { register, invalidate };
  }
  const canvasContext = createCanvasContext();
  setCanvasContext(canvasContext);
  setRenderContext("canvas");
  $$payload.out += `<canvas${spread_attributes(
    {
      class: clsx$1(cls(layerClass("layout-canvas"), "absolute top-0 left-0 w-full h-full", pointerEvents === false && "pointer-events-none", className)),
      ...restProps
    },
    null,
    void 0,
    { "z-index": zIndex }
  )}>`;
  if (fallback) {
    $$payload.out += "<!--[-->";
    if (typeof fallback === "function") {
      $$payload.out += "<!--[-->";
      fallback($$payload);
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      $$payload.out += `${escape_html(fallback)}`;
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></canvas> <canvas${attr_class(clsx$1(cls(
    layerClass("hit-canvas"),
    "layerchart-hitcanvas",
    "absolute top-0 left-0 w-full h-full",
    "pointer-events-none",
    // events all handled by main canvas
    // '[image-rendering:pixelated]', // https://developer.mozilla.org/en-US/docs/Web/CSS/image-rendering
    "border border-danger",
    !debug && "opacity-0"
  )))}></canvas> `;
  children?.($$payload, { ref, canvasContext: context });
  $$payload.out += `<!---->`;
  bind_props($$props, {
    ref: refProp,
    canvasContext: canvasContextProp
  });
  pop();
}
function createKey(getValue) {
  const value = getValue();
  const key = value && typeof value === "object" ? objectId(value) : value;
  return {
    get current() {
      return key;
    }
  };
}
function Rect($$payload, $$props) {
  push();
  let {
    height,
    width,
    x = 0,
    y = 0,
    initialX = x,
    initialY = y,
    fill,
    fillOpacity,
    stroke,
    initialHeight = height,
    initialWidth = width,
    strokeWidth,
    opacity,
    ref: refProp = void 0,
    motion,
    class: className,
    onclick,
    ondblclick,
    onpointerenter,
    onpointermove,
    onpointerleave: onpointerleave2,
    onpointerover,
    onpointerout,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const motionX = createMotion(initialX, () => x, parseMotionProp(motion, "x"));
  const motionY = createMotion(initialY, () => y, parseMotionProp(motion, "y"));
  const motionWidth = createMotion(initialWidth, () => width, parseMotionProp(motion, "width"));
  const motionHeight = createMotion(initialHeight, () => height, parseMotionProp(motion, "height"));
  const renderCtx = getRenderContext();
  createKey(() => fill);
  createKey(() => stroke);
  if (renderCtx === "canvas") {
    registerCanvasComponent();
  }
  if (renderCtx === "svg") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<rect${spread_attributes(
      {
        x: motionX.current,
        y: motionY.current,
        width: motionWidth.current,
        height: motionHeight.current,
        fill,
        "fill-opacity": fillOpacity,
        stroke,
        "stroke-width": strokeWidth,
        opacity,
        class: clsx$1(cls(layerClass("rect"), fill == null && "fill-surface-content", className)),
        ...restProps
      },
      null,
      void 0,
      void 0,
      3
    )}></rect>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref: refProp });
  pop();
}
function RectClipPath($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    id = createId("clipPath-", uid),
    x = 0,
    y = 0,
    disabled = false,
    children: childrenProp,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  {
    let clip = function($$payload2) {
      Rect($$payload2, spread_props([
        { x, y },
        extractLayerProps(restProps, "clip-path-rect")
      ]));
    }, children = function($$payload2, { url }) {
      childrenProp?.($$payload2, { id, url });
      $$payload2.out += `<!---->`;
    };
    ClipPath($$payload, {
      id,
      disabled,
      clip,
      children,
      $$slots: { clip: true, default: true }
    });
  }
  pop();
}
function ChartClipPath($$payload, $$props) {
  push();
  let {
    full = false,
    disabled = false,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const ctx = getChartContext();
  RectClipPath($$payload, spread_props([
    {
      x: full && ctx.padding.left ? -ctx.padding.left : 0,
      y: full && ctx.padding.top ? -ctx.padding.top : 0,
      disabled,
      height: ctx.height + (full ? (ctx.padding?.top ?? 0) + (ctx.padding?.bottom ?? 0) : 0),
      width: ctx.width + (full ? (ctx.padding?.left ?? 0) + (ctx.padding?.right ?? 0) : 0)
    },
    extractLayerProps(restProps, "chart-clip-path")
  ]));
  pop();
}
function geoCurvePath(projection, curve, context) {
  const pathContext = path();
  const geoPath$1 = geoPath(projection, curveContext(curve(pathContext)));
  const fn = (object) => {
    geoPath$1(object);
    return pathContext + "";
  };
  Object.setPrototypeOf(fn, geoPath$1);
  return fn;
}
function curveContext(curve) {
  return {
    beginPath() {
    },
    moveTo(x, y) {
      curve.lineStart();
      curve.point(x, y);
    },
    arc(x, y, radius, startAngle, endAngle, anticlockwise) {
    },
    lineTo(x, y) {
      curve.point(x, y);
    },
    closePath() {
      curve.lineEnd();
    }
  };
}
function geoFitObjectTransform(projection, size, object) {
  const newProjection = projection.fitSize(size, object);
  const translate = newProjection.translate();
  return { translate: { x: translate[0], y: translate[1] }, scale: newProjection.scale() };
}
function GeoPath($$payload, $$props) {
  push();
  let {
    fill,
    stroke,
    strokeWidth,
    opacity,
    geoTransform: geoTransform$1,
    geojson,
    tooltipContext,
    curve = curveLinearClosed,
    onclick,
    class: className,
    ref: refProp = void 0,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const geo = getGeoContext();
  const projection = geoTransform$1 && geo.projection ? geoTransform(geoTransform$1(geo.projection)) : geo.projection;
  const geoPath$1 = (() => {
    if (!projection) return;
    if (curve === curveLinearClosed) {
      return geoPath(projection);
    }
    return geoCurvePath(projection, curve);
  })();
  const renderCtx = getRenderContext();
  createKey(() => fill);
  createKey(() => stroke);
  const _onPointerEnter = (e) => {
    restProps.onpointerenter?.(e);
    tooltipContext?.show(e, geojson);
  };
  const _onPointerMove = (e) => {
    restProps.onpointermove?.(e);
    tooltipContext?.show(e, geojson);
  };
  const _onPointerLeave = (e) => {
    restProps.onpointerleave?.(e);
    tooltipContext?.hide();
  };
  if (renderCtx === "canvas") {
    registerCanvasComponent({
      events: {
        pointerenter: restProps.onpointerenter || tooltipContext ? _onPointerEnter : void 0,
        pointermove: restProps.onpointermove || tooltipContext ? _onPointerMove : void 0,
        pointerleave: restProps.onpointerleave || tooltipContext ? _onPointerLeave : void 0,
        pointerdown: restProps.onpointerdown,
        touchmove: restProps.ontouchmove
      }
    });
  }
  if (children) {
    $$payload.out += "<!--[-->";
    children($$payload, { geoPath: geoPath$1 });
    $$payload.out += `<!---->`;
  } else if (renderCtx === "svg") {
    $$payload.out += "<!--[1-->";
    $$payload.out += `<path${spread_attributes(
      {
        ...restProps,
        d: geojson ? geoPath$1?.(geojson) : "",
        fill,
        stroke,
        "stroke-width": strokeWidth,
        opacity,
        class: clsx$1(cls(layerClass("geo-path"), fill == null && "fill-transparent", className))
      },
      null,
      void 0,
      void 0,
      3
    )}></path>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref: refProp });
  pop();
}
const linear = (x) => x;
function fade(node, { delay = 0, duration = 400, easing = linear } = {}) {
  const o = +getComputedStyle(node).opacity;
  return {
    delay,
    duration,
    easing,
    css: (t) => `opacity: ${t * o}`
  };
}
function Group($$payload, $$props) {
  push();
  const ctx = getChartContext();
  let {
    x,
    initialX: initialXProp,
    y,
    initialY: initialYProp,
    center = false,
    preventTouchMove = false,
    opacity = void 0,
    motion,
    transitionIn: transitionInProp,
    transitionInParams: transitionInParamsProp,
    class: className,
    children,
    ref: refProp = void 0,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const initialX = initialXProp ?? x;
  const initialY = initialYProp ?? y;
  const trueX = x ?? (center === "x" || center === true ? ctx.width / 2 : 0);
  const trueY = y ?? (center === "y" || center === true ? ctx.height / 2 : 0);
  const motionX = createMotion(initialX, () => trueX, motion);
  const motionY = createMotion(initialY, () => trueY, motion);
  transitionInProp ? transitionInProp : extractTweenConfig(motion)?.options ? fade : () => {
  };
  const transform = (() => {
    if (center || x != null || y != null) {
      return `translate(${motionX.current}px, ${motionY.current}px)`;
    }
  })();
  const renderCtx = getRenderContext();
  if (renderCtx === "canvas") {
    registerCanvasComponent({
      events: {
        click: restProps.onclick,
        dblclick: restProps.ondblclick,
        pointerenter: restProps.onpointerenter,
        pointermove: restProps.onpointermove,
        pointerleave: restProps.onpointerleave,
        pointerdown: restProps.onpointerdown
      }
    });
  }
  if (renderCtx === "canvas") {
    $$payload.out += "<!--[-->";
    children?.($$payload);
    $$payload.out += `<!---->`;
  } else if (renderCtx === "svg") {
    $$payload.out += "<!--[1-->";
    $$payload.out += `<g${spread_attributes(
      {
        class: clsx$1(cls(layerClass("group-g"), className)),
        opacity,
        ...restProps
      },
      null,
      void 0,
      { transform },
      3
    )}>`;
    children?.($$payload);
    $$payload.out += `<!----></g>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${spread_attributes(
      {
        ...restProps,
        class: clsx$1(cls(layerClass("group-div"), "absolute", className))
      },
      null,
      void 0,
      { transform, opacity }
    )}>`;
    children?.($$payload);
    $$payload.out += `<!----></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref: refProp });
  pop();
}
function flattenPathData(pathData, yOverride = 0) {
  let result = pathData;
  result = result.replace(/([MLTQCSAZ])(-?\d*\.?\d+),(-?\d*\.?\d+)/g, (match, command, x, y) => {
    return `${command}${x},${yOverride}`;
  });
  result = result.replace(/([v])(-?\d*\.?\d+)/g, (match, command, l) => {
    return `${command}${0}`;
  });
  return result;
}
function Marker($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    type,
    id = createId("marker-", uid),
    size = 10,
    markerWidth = size,
    markerHeight = size,
    markerUnits = "userSpaceOnUse",
    orient = "auto-start-reverse",
    refX = ["arrow", "triangle"].includes(type ?? "") ? 9 : 5,
    refY = 5,
    viewBox = "0 0 10 10",
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<defs><marker${spread_attributes(
    {
      id,
      markerWidth,
      markerHeight,
      markerUnits,
      orient,
      refX,
      refY,
      viewBox,
      ...restProps,
      class: clsx$1(cls(
        layerClass("marker"),
        "overflow-visible",
        // stroke
        restProps.stroke == null && (["arrow", "circle-stroke", "line"].includes(type ?? "") ? "stroke-[context-stroke]" : type === "circle" ? "stroke-surface-100" : "stroke-none"),
        // extra stroke attrs
        "[stroke-linecap:round] [stroke-linejoin:round]",
        //fill
        restProps.fill == null && (["triangle", "dot", "circle"].includes(type ?? "") ? "fill-[context-stroke]" : type === "circle-stroke" ? "fill-surface-100" : "fill-none"),
        className
      ))
    },
    null,
    void 0,
    void 0,
    3
  )}>`;
  if (children) {
    $$payload.out += "<!--[-->";
    children($$payload);
    $$payload.out += `<!---->`;
  } else if (type === "triangle") {
    $$payload.out += "<!--[1-->";
    $$payload.out += `<path d="M 0 0 L 10 5 L 0 10 z"${attr_class(clsx$1(layerClass("marker-triangle")))}></path>`;
  } else if (type === "arrow") {
    $$payload.out += "<!--[2-->";
    $$payload.out += `<polyline points="0 0, 10 5, 0 10"${attr_class(clsx$1(layerClass("marker-arrow")))}></polyline>`;
  } else if (type === "circle" || type === "circle-stroke" || type === "dot") {
    $$payload.out += "<!--[3-->";
    $$payload.out += `<circle${attr("cx", 5)}${attr("cy", 5)}${attr("r", 5)}${attr_class(clsx$1(layerClass("marker-circle")))}></circle>`;
  } else if (type === "line") {
    $$payload.out += "<!--[4-->";
    $$payload.out += `<polyline points="5 0, 5 10"${attr_class(clsx$1(layerClass("marker-line")))}></polyline>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></marker></defs>`;
  pop();
}
function MarkerWrapper($$payload, $$props) {
  let { id, marker } = $$props;
  if (typeof marker === "function") {
    $$payload.out += "<!--[-->";
    marker($$payload, { id });
    $$payload.out += `<!---->`;
  } else if (marker) {
    $$payload.out += "<!--[1-->";
    Marker($$payload, spread_props([
      {
        id,
        type: typeof marker === "string" ? marker : void 0
      },
      typeof marker === "object" ? marker : null
    ]));
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
}
function Spline($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  const ctx = getChartContext();
  let {
    data,
    pathData,
    x,
    y,
    motion,
    draw,
    curve,
    defined,
    fill,
    stroke,
    strokeWidth,
    fillOpacity,
    class: className,
    marker,
    markerStart: markerStartProp,
    markerMid: markerMidProp,
    markerEnd: markerEndProp,
    startContent,
    endContent,
    opacity,
    pathRef: pathRefProp = void 0,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let pathRef = void 0;
  const markerStart = markerStartProp ?? marker;
  const markerMid = markerMidProp ?? marker;
  const markerEnd = markerEndProp ?? marker;
  const markerStartId = markerStart ? createId("marker-start", uid) : "";
  const markerMidId = markerMid ? createId("marker-mid", uid) : "";
  const markerEndId = markerEnd ? createId("marker-end", uid) : "";
  function getScaleValue(data2, scale, accessor2) {
    let value = accessor2(data2);
    if (Array.isArray(value)) {
      value = max$2(value);
    }
    if (scale.domain().length) {
      return scale(value);
    } else {
      return value;
    }
  }
  const xAccessor = x ? accessor(x) : ctx.x;
  const yAccessor = y ? accessor(y) : ctx.y;
  const xOffset = isScaleBand(ctx.xScale) ? ctx.xScale.bandwidth() / 2 : 0;
  const yOffset = isScaleBand(ctx.yScale) ? ctx.yScale.bandwidth() / 2 : 0;
  const extractedTween = extractTweenConfig(motion);
  const tweenedOptions = extractedTween ? {
    type: extractedTween.type,
    options: {
      interpolate: interpolatePath,
      ...extractedTween.options
    }
  } : void 0;
  function defaultPathData() {
    if (!tweenedOptions) {
      return "";
    } else if (pathData) {
      return flattenPathData(pathData, Math.min(ctx.yScale(0) ?? ctx.yRange[0], ctx.yRange[0]));
    } else if (ctx.config.x) {
      const path2 = ctx.radial ? lineRadial$1().angle((d2) => ctx.xScale(xAccessor(d2)) + 0).radius((d2) => Math.min(ctx.yScale(0), ctx.yRange[0])) : line().x((d2) => ctx.xScale(xAccessor(d2)) + xOffset).y((d2) => Math.min(ctx.yScale(0), ctx.yRange[0]));
      path2.defined(defined ?? ((d2) => xAccessor(d2) != null && yAccessor(d2) != null));
      if (curve) path2.curve(curve);
      return path2(data ?? ctx.data);
    }
  }
  const d = (() => {
    const path2 = ctx.radial ? lineRadial$1().angle((d2) => getScaleValue(d2, ctx.xScale, xAccessor) + 0).radius((d2) => getScaleValue(d2, ctx.yScale, yAccessor) + yOffset) : line().x((d2) => getScaleValue(d2, ctx.xScale, xAccessor) + xOffset).y((d2) => getScaleValue(d2, ctx.yScale, yAccessor) + yOffset);
    path2.defined(defined ?? ((d2) => xAccessor(d2) != null && yAccessor(d2) != null));
    if (curve) path2.curve(curve);
    return pathData ?? path2(data ?? ctx.data) ?? "";
  })();
  const tweenedState = createMotion(defaultPathData(), () => d, tweenedOptions);
  const renderCtx = getRenderContext();
  createKey(() => fill);
  createKey(() => stroke);
  if (renderCtx === "canvas") {
    registerCanvasComponent({
      events: {
        click: restProps.onclick,
        pointerenter: restProps.onpointerenter,
        pointermove: restProps.onpointermove,
        pointerleave: restProps.onpointerleave,
        pointerdown: restProps.onpointerdown,
        pointerover: restProps.onpointerover,
        pointerout: restProps.onpointerout,
        touchmove: restProps.ontouchmove
      }
    });
  }
  const endPointDuration = (() => {
    if (typeof draw === "object" && draw.duration !== void 0 && typeof draw.duration !== "function") {
      return draw.duration;
    }
    return 800;
  })();
  const endPoint = createControlledMotion(void 0, draw ? {
    type: "tween",
    duration: () => endPointDuration,
    easing: typeof draw === "object" && draw.easing ? draw.easing : cubicInOut,
    interpolate() {
      return (t) => {
        const totalLength = 0;
        const point = pathRef?.getPointAtLength(totalLength * t);
        return point;
      };
    }
  } : { type: "none" });
  if (renderCtx === "svg") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    {
      $$payload.out += `<path${spread_attributes(
        {
          d: tweenedState.current,
          ...restProps,
          class: clsx$1(cls(layerClass("spline-path"), !fill && "fill-none", !stroke && "stroke-surface-content", className)),
          fill,
          "fill-opacity": fillOpacity,
          stroke,
          "stroke-width": strokeWidth,
          opacity,
          "marker-start": markerStartId ? `url(#${markerStartId})` : void 0,
          "marker-mid": markerMidId ? `url(#${markerMidId})` : void 0,
          "marker-end": markerEndId ? `url(#${markerEndId})` : void 0
        },
        null,
        void 0,
        void 0,
        3
      )}></path>`;
      MarkerWrapper($$payload, { id: markerStartId, marker: markerStart });
      $$payload.out += `<!---->`;
      MarkerWrapper($$payload, { id: markerMidId, marker: markerMid });
      $$payload.out += `<!---->`;
      MarkerWrapper($$payload, { id: markerEndId, marker: markerEnd });
      $$payload.out += `<!---->`;
      {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
      if (endContent && endPoint.current) {
        $$payload.out += "<!--[-->";
        Group($$payload, {
          x: endPoint.current.x,
          y: endPoint.current.y,
          class: layerClass("spline-g-end"),
          children: ($$payload2) => {
            endContent($$payload2, {
              point: endPoint.current,
              value: {
                x: ctx.xScale?.invert?.(endPoint.current.x),
                y: ctx.yScale?.invert?.(endPoint.current.y)
              }
            });
            $$payload2.out += `<!---->`;
          },
          $$slots: { default: true }
        });
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { pathRef: pathRefProp });
  pop();
}
function Circle($$payload, $$props) {
  push();
  let {
    cx = 0,
    initialCx: initialCxProp,
    cy = 0,
    initialCy: initialCyProp,
    r = 1,
    initialR: initialRProp,
    motion,
    fill,
    fillOpacity,
    stroke,
    strokeWidth,
    opacity,
    class: className,
    ref: refProp = void 0,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const initialCx = initialCxProp ?? cx;
  const initialCy = initialCyProp ?? cy;
  const initialR = initialRProp ?? r;
  const renderCtx = getRenderContext();
  const motionCx = createMotion(initialCx, () => cx, motion);
  const motionCy = createMotion(initialCy, () => cy, motion);
  const motionR = createMotion(initialR, () => r, motion);
  createKey(() => fill);
  createKey(() => stroke);
  if (renderCtx === "canvas") {
    registerCanvasComponent({
      events: {
        click: restProps.onclick,
        pointerdown: restProps.onpointerdown,
        pointerenter: restProps.onpointerenter,
        pointermove: restProps.onpointermove,
        pointerleave: restProps.onpointerleave
      }
    });
  }
  if (renderCtx === "svg") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<circle${spread_attributes(
      {
        cx: motionCx.current,
        cy: motionCy.current,
        r: motionR.current,
        fill,
        "fill-opacity": fillOpacity,
        stroke,
        "stroke-width": strokeWidth,
        opacity,
        class: clsx$1(cls(layerClass("circle"), fill == null && "fill-surface-content", className)),
        ...restProps
      },
      null,
      void 0,
      void 0,
      3
    )}></circle>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref: refProp });
  pop();
}
function CircleClipPath($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    id = createId("clipPath-", uid),
    cx = 0,
    cy = 0,
    r,
    motion,
    disabled = false,
    ref: refProp = void 0,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let ref = void 0;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    {
      let clip = function($$payload3) {
        Circle($$payload3, spread_props([
          { cx, cy, r, motion },
          extractLayerProps(restProps, "clip-path-circle"),
          {
            get ref() {
              return ref;
            },
            set ref($$value) {
              ref = $$value;
              $$settled = false;
            }
          }
        ]));
      };
      ClipPath($$payload2, {
        id,
        disabled,
        children,
        clip,
        $$slots: { clip: true }
      });
    }
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref: refProp });
  pop();
}
function Voronoi($$payload, $$props) {
  push();
  let {
    data,
    r,
    classes = {},
    onclick,
    onpointerenter,
    onpointerdown,
    onpointermove,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const ctx = getChartContext();
  const geo = getGeoContext();
  const points = (data ?? ctx.flatData).map((d) => {
    const xValue = geo.projection ? ctx.x(d) : ctx.xGet(d);
    const yValue = geo.projection ? ctx.y(d) : ctx.yGet(d);
    const x = Array.isArray(xValue) ? min$2(xValue) : xValue;
    const y = Array.isArray(yValue) ? min$2(yValue) : yValue;
    let point;
    if (ctx.radial) {
      const radialPoint = pointRadial(x, y);
      point = [
        radialPoint[0] + ctx.width / 2,
        radialPoint[1] + ctx.height / 2
      ];
    } else {
      point = [x, y];
    }
    point.data = d;
    return point;
  });
  const boundWidth = Math.max(ctx.width, 0);
  const boundHeight = Math.max(ctx.height, 0);
  const disableClip = r === 0 || r == null || r === Infinity;
  Group($$payload, spread_props([
    restProps,
    {
      class: cls(layerClass("voronoi-g"), classes.root, className),
      children: ($$payload2) => {
        if (geo.projection) {
          $$payload2.out += "<!--[-->";
          const polygons = geoVoronoi().polygons(points);
          const each_array = ensure_array_like(polygons.features);
          $$payload2.out += `<!--[-->`;
          for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
            let feature = each_array[$$index];
            const point = r ? geo.projection?.(feature.properties.sitecoordinates) : null;
            CircleClipPath($$payload2, {
              cx: point?.[0],
              cy: point?.[1],
              r: r ?? 0,
              disabled: point == null || disableClip,
              children: ($$payload3) => {
                GeoPath($$payload3, {
                  geojson: feature,
                  class: cls(layerClass("voronoi-geo-path"), "fill-transparent stroke-transparent", classes.path),
                  onclick: (e) => onclick?.(e, { data: feature.properties.site.data, feature }),
                  onpointerenter: (e) => onpointerenter?.(e, { data: feature.properties.site.data, feature }),
                  onpointermove: (e) => onpointermove?.(e, { data: feature.properties.site.data, feature }),
                  onpointerdown: (e) => onpointerdown?.(e, { data: feature.properties.site.data, feature }),
                  onpointerleave,
                  ontouchmove: (e) => {
                    e.preventDefault();
                  }
                });
              },
              $$slots: { default: true }
            });
          }
          $$payload2.out += `<!--]-->`;
        } else {
          $$payload2.out += "<!--[!-->";
          const voronoi = Delaunay.from(points).voronoi([0, 0, boundWidth, boundHeight]);
          const each_array_1 = ensure_array_like(points);
          $$payload2.out += `<!--[-->`;
          for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
            let point = each_array_1[i];
            const pathData = voronoi.renderCell(i);
            if (pathData) {
              $$payload2.out += "<!--[-->";
              CircleClipPath($$payload2, {
                cx: point[0],
                cy: point[1],
                r: r ?? 0,
                disabled: disableClip,
                children: ($$payload3) => {
                  Spline($$payload3, {
                    pathData,
                    class: cls(layerClass("voronoi-path"), "fill-transparent stroke-transparent", classes.path),
                    onclick: (e) => onclick?.(e, { data: point.data, point }),
                    onpointerenter: (e) => onpointerenter?.(e, { data: point.data, point }),
                    onpointermove: (e) => onpointermove?.(e, { data: point.data, point }),
                    onpointerleave,
                    onpointerdown: (e) => onpointerdown?.(e, { data: point.data, point }),
                    ontouchmove: (e) => {
                      e.preventDefault();
                    }
                  });
                },
                $$slots: { default: true }
              });
            } else {
              $$payload2.out += "<!--[!-->";
            }
            $$payload2.out += `<!--]-->`;
          }
          $$payload2.out += `<!--]-->`;
        }
        $$payload2.out += `<!--]-->`;
      },
      $$slots: { default: true }
    }
  ]));
  pop();
}
function quadtreeRects(quadtree2, showLeaves = true) {
  const rects = [];
  quadtree2.visit((node, x0, y0, x1, y1) => {
    if (showLeaves || Array.isArray(node)) {
      rects.push({ x: x0, y: y0, width: x1 - x0, height: y1 - y0 });
    }
  });
  return rects;
}
function asAny(x) {
  return x;
}
function handleBarTooltipPayload({ ctx, data, metaCtx }) {
  const seriesItems = metaCtx.stackSeries ? [...metaCtx.visibleSeries].reverse() : metaCtx.visibleSeries;
  const payload = seriesItems.map((s) => {
    const seriesTooltipData = s.data ? findRelatedData(s.data, data, ctx.x) : data;
    const valueAccessor = accessor(s.value ?? (s.data ? ctx.y : s.key));
    const label = metaCtx.orientation === "vertical" ? ctx.x(data) : ctx.y(data);
    const name = s.label ?? (s.key !== "default" ? s.key : "value");
    const value = seriesTooltipData ? valueAccessor(seriesTooltipData) : void 0;
    const color = s.color ?? ctx.cScale?.(ctx.c(data));
    return {
      ...s.data,
      chartType: "bar",
      color,
      label,
      name,
      value,
      valueAccessor,
      key: s.key,
      payload: data,
      rawSeriesData: s,
      formatter: format$1
    };
  });
  return payload;
}
function handleAreaTooltipPayload({ ctx, data, metaCtx }) {
  const seriesItems = metaCtx.stackSeries ? [...metaCtx.visibleSeries].reverse() : metaCtx.visibleSeries;
  const payload = seriesItems.map((s) => {
    const seriesTooltipData = s.data ? findRelatedData(s.data, data, ctx.x) : data;
    const valueAccessor = accessor(s.value ?? (s.data ? asAny(ctx.y) : s.key));
    const label = ctx.x(data);
    const name = s.label ?? (s.key !== "default" ? s.key : "value");
    const value = seriesTooltipData ? valueAccessor(seriesTooltipData) : void 0;
    const color = s.color ?? ctx.cScale?.(ctx.c(data));
    return {
      ...s.data,
      chartType: "area",
      color,
      label,
      name,
      value,
      valueAccessor,
      key: s.key,
      payload: data,
      rawSeriesData: s,
      formatter: format$1
    };
  });
  return payload;
}
function handleLineTooltipPayload({ ctx, data, metaCtx }) {
  return metaCtx.visibleSeries.map((s) => {
    const seriesTooltipData = s.data ? findRelatedData(s.data, data, ctx.x) : data;
    const label = ctx.x(data);
    const valueAccessor = accessor(s.value ?? (s.data ? asAny(ctx.y) : s.key));
    const name = s.label ?? (s.key !== "default" ? s.key : "value");
    const value = seriesTooltipData ? valueAccessor(seriesTooltipData) : void 0;
    const color = s.color ?? ctx.cScale?.(ctx.c(data));
    return {
      ...s.data,
      chartType: "line",
      color,
      label,
      name,
      value,
      valueAccessor,
      key: s.key,
      payload: data,
      rawSeriesData: s,
      formatter: format$1
    };
  });
}
function handlePieOrArcTooltipPayload({ ctx, data, metaCtx }) {
  const keyAccessor = accessor(metaCtx.key);
  const labelAccessor = accessor(metaCtx.label);
  const valueAccessor = accessor(metaCtx.value);
  const colorAccessor = accessor(metaCtx.color);
  return [
    {
      key: keyAccessor(data),
      label: labelAccessor(data) || keyAccessor(data),
      value: valueAccessor(data),
      color: colorAccessor(data) ?? ctx.cScale?.(ctx.c(data)),
      payload: data,
      chartType: "pie",
      labelAccessor,
      keyAccessor,
      valueAccessor,
      colorAccessor
    }
  ];
}
function handleScatterTooltipPayload({ ctx, data, metaCtx }) {
  return [{ payload: data, key: "" }];
}
const _TooltipMetaContext = new Context("TooltipMetaContext");
function getTooltipMetaContext() {
  return _TooltipMetaContext.getOr(null);
}
function setTooltipMetaContext(v) {
  return _TooltipMetaContext.set(v);
}
function getTooltipPayload({ ctx, tooltipData, metaCtx }) {
  if (!metaCtx)
    return [{ payload: tooltipData, key: "" }];
  switch (metaCtx.type) {
    case "bar":
      return handleBarTooltipPayload({ ctx, data: tooltipData, metaCtx });
    case "area":
      return handleAreaTooltipPayload({ ctx, data: tooltipData, metaCtx });
    case "line":
      return handleLineTooltipPayload({ ctx, data: tooltipData, metaCtx });
    case "pie":
    case "arc":
      return handlePieOrArcTooltipPayload({ ctx, data: tooltipData, metaCtx });
    case "scatter":
      return handleScatterTooltipPayload({ ctx, data: tooltipData, metaCtx });
  }
}
const _TooltipContext = new Context("TooltipContext");
function getTooltipContext() {
  return _TooltipContext.get();
}
function setTooltipContext(tooltip) {
  return _TooltipContext.set(tooltip);
}
function TooltipContext($$payload, $$props) {
  push();
  const ctx = getChartContext();
  const geoCtx = getGeoContext();
  let {
    ref: refProp = void 0,
    debug = false,
    findTooltipData = "closest",
    hideDelay = 0,
    locked = false,
    mode = "manual",
    onclick = () => {
    },
    radius = Infinity,
    raiseTarget = false,
    tooltipContext: tooltipContextProp = void 0,
    children
  } = $$props;
  let x = 0;
  let y = 0;
  let data = null;
  let payload = [];
  let isHoveringTooltipArea = false;
  let isHoveringTooltipContent = false;
  const metaCtx = getTooltipMetaContext();
  const tooltipContext = {
    get x() {
      return x;
    },
    get y() {
      return y;
    },
    get data() {
      return data;
    },
    get payload() {
      return payload;
    },
    show: showTooltip,
    hide: hideTooltip,
    get mode() {
      return mode;
    },
    get isHoveringTooltipArea() {
      return isHoveringTooltipArea;
    },
    get isHoveringTooltipContent() {
      return isHoveringTooltipContent;
    },
    set isHoveringTooltipContent(value) {
      isHoveringTooltipContent = value;
    }
  };
  tooltipContextProp = tooltipContext;
  setTooltipContext(tooltipContext);
  let hideTimeoutId;
  const bisectX = bisector((d) => {
    const value = ctx.x(d);
    if (Array.isArray(value)) {
      return value[0];
    } else {
      return value;
    }
  }).left;
  const bisectY = bisector((d) => {
    const value = ctx.y(d);
    if (Array.isArray(value)) {
      return value[0];
    } else {
      return value;
    }
  }).left;
  function findData(previousValue, currentValue, valueAtPoint, accessor2) {
    switch (findTooltipData) {
      case "closest":
        if (currentValue === void 0) {
          return previousValue;
        } else if (previousValue === void 0) {
          return currentValue;
        } else {
          return Number(valueAtPoint) - Number(accessor2(previousValue)) > Number(accessor2(currentValue)) - Number(valueAtPoint) ? currentValue : previousValue;
        }
      case "left":
        return previousValue;
      case "right":
      default:
        return currentValue;
    }
  }
  function showTooltip(e, tooltipData) {
    if (hideTimeoutId) {
      clearTimeout(hideTimeoutId);
    }
    if (locked) {
      return;
    }
    const containerNode = e.target.closest(".lc-root-container");
    const point = localPoint(e, containerNode);
    if (tooltipData == null) {
      switch (mode) {
        case "bisect-x": {
          let xValueAtPoint;
          if (ctx.radial) {
            const { radians } = cartesianToPolar(point.x - ctx.width / 2, point.y - ctx.height / 2);
            xValueAtPoint = scaleInvert(ctx.xScale, radians);
          } else {
            xValueAtPoint = scaleInvert(ctx.xScale, point.x - ctx.padding.left);
          }
          const index = bisectX(ctx.flatData, xValueAtPoint, 1);
          const previousValue = ctx.flatData[index - 1];
          const currentValue = ctx.flatData[index];
          tooltipData = findData(previousValue, currentValue, xValueAtPoint, ctx.x);
          break;
        }
        case "bisect-y": {
          const yValueAtPoint = scaleInvert(ctx.yScale, point.y - ctx.padding.top);
          const index = bisectY(ctx.flatData, yValueAtPoint, 1);
          const previousValue = ctx.flatData[index - 1];
          const currentValue = ctx.flatData[index];
          tooltipData = findData(previousValue, currentValue, yValueAtPoint, ctx.y);
          break;
        }
        case "bisect-band": {
          const xValueAtPoint = scaleInvert(ctx.xScale, point.x);
          const yValueAtPoint = scaleInvert(ctx.yScale, point.y);
          if (isScaleBand(ctx.xScale)) {
            const bandData = ctx.flatData.filter((d) => ctx.x(d) === xValueAtPoint).sort(sortFunc(ctx.y));
            const index = bisectY(bandData, yValueAtPoint, 1);
            const previousValue = bandData[index - 1];
            const currentValue = bandData[index];
            tooltipData = findData(previousValue, currentValue, yValueAtPoint, ctx.y);
          } else if (isScaleBand(ctx.yScale)) {
            const bandData = ctx.flatData.filter((d) => ctx.y(d) === yValueAtPoint).sort(sortFunc(ctx.x));
            const index = bisectX(bandData, xValueAtPoint, 1);
            const previousValue = bandData[index - 1];
            const currentValue = bandData[index];
            tooltipData = findData(previousValue, currentValue, xValueAtPoint, ctx.x);
          } else ;
          break;
        }
        case "quadtree": {
          tooltipData = quadtree$1?.find(point.x - ctx.padding.left, point.y - ctx.padding.top, radius);
          break;
        }
      }
    }
    if (tooltipData) {
      if (raiseTarget) {
        raise(e.target);
      }
      const payloadData = getTooltipPayload({ ctx, tooltipData, metaCtx });
      x = point.x;
      y = point.y;
      data = tooltipData;
      payload = payloadData;
    } else {
      hideTooltip();
    }
  }
  function hideTooltip() {
    if (locked) {
      return;
    }
    isHoveringTooltipArea = false;
    hideTimeoutId = setTimeout(
      () => {
        if (!isHoveringTooltipArea && !isHoveringTooltipContent) {
          data = null;
          payload = [];
        }
      },
      hideDelay
    );
  }
  const quadtree$1 = (() => {
    if (mode === "quadtree") {
      return quadtree().x((d) => {
        if (geoCtx.projection) {
          const lat = ctx.x(d);
          const long = ctx.y(d);
          const geoValue = geoCtx.projection([lat, long]) ?? [0, 0];
          return geoValue[0];
        }
        const value = ctx.xGet(d);
        if (Array.isArray(value)) {
          return min$2(value);
        } else {
          return value;
        }
      }).y((d) => {
        if (geoCtx.projection) {
          const lat = ctx.x(d);
          const long = ctx.y(d);
          const geoValue = geoCtx.projection([lat, long]) ?? [0, 0];
          return geoValue[1];
        }
        const value = ctx.yGet(d);
        if (Array.isArray(value)) {
          return min$2(value);
        } else {
          return value;
        }
      }).addAll(ctx.flatData);
    }
  })();
  const rects = (() => {
    if (mode === "bounds" || mode === "band") {
      return ctx.flatData.map((d) => {
        const xValue = ctx.xGet(d);
        const yValue = ctx.yGet(d);
        const x2 = Array.isArray(xValue) ? xValue[0] : xValue;
        const y2 = Array.isArray(yValue) ? yValue[0] : yValue;
        const xOffset = isScaleBand(ctx.xScale) ? ctx.xScale.padding() * ctx.xScale.step() / 2 : 0;
        const yOffset = isScaleBand(ctx.yScale) ? ctx.yScale.padding() * ctx.yScale.step() / 2 : 0;
        const fullWidth = max$2(ctx.xRange) - min$2(ctx.xRange);
        const fullHeight = max$2(ctx.yRange) - min$2(ctx.yRange);
        if (mode === "band") {
          return {
            x: isScaleBand(ctx.xScale) ? x2 - xOffset : min$2(ctx.xRange),
            y: isScaleBand(ctx.yScale) ? y2 - yOffset : min$2(ctx.yRange),
            width: isScaleBand(ctx.xScale) ? ctx.xScale.step() : fullWidth,
            height: isScaleBand(ctx.yScale) ? ctx.yScale.step() : fullHeight,
            data: d
          };
        } else if (mode === "bounds") {
          return {
            x: isScaleBand(ctx.xScale) || Array.isArray(xValue) ? x2 - xOffset : min$2(ctx.xRange),
            // y: isScaleBand($yScale) || Array.isArray(yValue) ? y - yOffset : min($yRange),
            y: y2 - yOffset,
            width: Array.isArray(xValue) ? xValue[1] - xValue[0] : isScaleBand(ctx.xScale) ? ctx.xScale.step() : min$2(ctx.xRange) + x2,
            height: Array.isArray(yValue) ? yValue[1] - yValue[0] : isScaleBand(ctx.yScale) ? ctx.yScale.step() : max$2(ctx.yRange) - y2,
            data: d
          };
        }
      }).filter((x2) => x2 !== void 0).sort(sortFunc("x"));
    }
    return [];
  })();
  const triggerPointerEvents = [
    "bisect-x",
    "bisect-y",
    "bisect-band",
    "quadtree"
  ].includes(mode);
  $$payload.out += `<div${attr_class(clsx$1(cls(layerClass("tooltip-context"), "absolute touch-none", debug && triggerPointerEvents && "bg-danger/10 outline outline-danger")))}${attr_style("", {
    top: `${stringify(ctx.padding.top)}px`,
    left: `${stringify(ctx.padding.left)}px`,
    width: `${stringify(ctx.width)}px`,
    height: `${stringify(ctx.height)}px`
  })}><div${attr_class(clsx$1(cls(layerClass("tooltip-context-container"), "absolute")))}${attr_style("", {
    top: `-${stringify(ctx.padding.top ?? 0)}px`,
    left: `-${stringify(ctx.padding.left ?? 0)}px`,
    width: `${stringify(ctx.containerWidth)}px`,
    height: `${stringify(ctx.containerHeight)}px`
  })}>`;
  children?.($$payload, { tooltipContext });
  $$payload.out += `<!----> `;
  if (mode === "voronoi") {
    $$payload.out += "<!--[-->";
    Svg($$payload, {
      children: ($$payload2) => {
        Voronoi($$payload2, {
          r: radius,
          onpointerenter: (e, { data: data2 }) => {
            showTooltip(e, data2);
          },
          onpointermove: (e, { data: data2 }) => {
            showTooltip(e, data2);
          },
          onpointerleave: () => hideTooltip(),
          onpointerdown: (e) => {
            if (e.target?.hasPointerCapture(e.pointerId)) {
              e.target.releasePointerCapture(e.pointerId);
            }
          },
          onclick: (e, { data: data2 }) => {
            onclick(e, { data: data2 });
          },
          classes: {
            path: cls(debug && "fill-danger/10 stroke-danger")
          }
        });
      },
      $$slots: { default: true }
    });
  } else if (mode === "bounds" || mode === "band") {
    $$payload.out += "<!--[1-->";
    Svg($$payload, {
      center: ctx.radial,
      children: ($$payload2) => {
        const each_array = ensure_array_like(rects);
        $$payload2.out += `<g${attr_class(clsx$1(layerClass("tooltip-rects-g")))}><!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let rect = each_array[$$index];
          if (ctx.radial) {
            $$payload2.out += "<!--[-->";
            Arc($$payload2, {
              innerRadius: rect.y,
              outerRadius: rect.y + rect.height,
              startAngle: rect.x,
              endAngle: rect.x + rect.width,
              class: cls(layerClass("tooltip-rect"), debug ? "fill-danger/10 stroke-danger" : "fill-transparent"),
              onpointerenter: (e) => showTooltip(e, rect?.data),
              onpointermove: (e) => showTooltip(e, rect?.data),
              onpointerleave: () => hideTooltip(),
              onpointerdown: (e) => {
                const target = e.target;
                if (target?.hasPointerCapture(e.pointerId)) {
                  target.releasePointerCapture(e.pointerId);
                }
              },
              onclick: (e) => {
                onclick(e, { data: rect?.data });
              }
            });
          } else {
            $$payload2.out += "<!--[!-->";
            $$payload2.out += `<rect${attr("x", rect?.x)}${attr("y", rect?.y)}${attr("width", rect?.width)}${attr("height", rect?.height)}${attr_class(clsx$1(cls(layerClass("tooltip-rect"), debug ? "fill-danger/10 stroke-danger" : "fill-transparent")))}></rect>`;
          }
          $$payload2.out += `<!--]-->`;
        }
        $$payload2.out += `<!--]--></g>`;
      },
      $$slots: { default: true }
    });
  } else if (mode === "quadtree" && debug) {
    $$payload.out += "<!--[2-->";
    Svg($$payload, {
      pointerEvents: false,
      children: ($$payload2) => {
        ChartClipPath($$payload2, {
          children: ($$payload3) => {
            $$payload3.out += `<g${attr_class(clsx$1(layerClass("tooltip-quadtree-g")))}>`;
            if (quadtree$1) {
              $$payload3.out += "<!--[-->";
              const each_array_1 = ensure_array_like(quadtreeRects(quadtree$1, false));
              $$payload3.out += `<!--[-->`;
              for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                let rect = each_array_1[$$index_1];
                $$payload3.out += `<rect${attr("x", rect.x)}${attr("y", rect.y)}${attr("width", rect.width)}${attr("height", rect.height)}${attr_class(clsx$1(cls(layerClass("tooltip-quadtree-rect"), debug ? "fill-danger/10 stroke-danger" : "fill-transparent")))}></rect>`;
              }
              $$payload3.out += `<!--]-->`;
            } else {
              $$payload3.out += "<!--[!-->";
            }
            $$payload3.out += `<!--]--></g>`;
          },
          $$slots: { default: true }
        });
      },
      $$slots: { default: true }
    });
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div>`;
  bind_props($$props, {
    ref: refProp,
    tooltipContext: tooltipContextProp
  });
  pop();
}
const _BrushContext = new Context("BrushContext");
function setBrushContext(brush) {
  return _BrushContext.set(brush);
}
function BrushContext($$payload, $$props) {
  push();
  const ctx = getChartContext();
  let {
    brushContext: brushContextProp = void 0,
    axis = "x",
    handleSize = 5,
    resetOnEnd = false,
    ignoreResetClick = false,
    xDomain,
    yDomain,
    mode = "integrated",
    disabled = false,
    range: range2 = {},
    handle = {},
    classes = {},
    onBrushEnd = () => {
    },
    onBrushStart = () => {
    },
    onChange = () => {
    },
    onReset = () => {
    },
    children
  } = $$props;
  if (xDomain === void 0) {
    xDomain = ctx.xScale.domain();
  }
  if (yDomain === void 0) {
    yDomain = ctx.yScale.domain();
  }
  ctx.config.xDomain;
  ctx.config.yDomain;
  const xDomainMinMax = extent(ctx.xScale.domain());
  xDomainMinMax[0];
  xDomainMinMax[1];
  const yDomainMinMax = extent(ctx.yScale.domain());
  yDomainMinMax[0];
  yDomainMinMax[1];
  const top = ctx.yScale(yDomain?.[1]);
  const bottom = ctx.yScale(yDomain?.[0]);
  const left = ctx.xScale(xDomain?.[0]);
  const right = ctx.xScale(xDomain?.[1]);
  const _range = {
    x: axis === "both" || axis === "x" ? left : 0,
    y: axis === "both" || axis === "y" ? top : 0,
    width: axis === "both" || axis === "x" ? right - left : ctx.width,
    height: axis === "both" || axis === "y" ? bottom - top : ctx.height
  };
  let isActive = false;
  const brushContext = {
    get xDomain() {
      return xDomain;
    },
    set xDomain(v) {
      xDomain = v;
    },
    get yDomain() {
      return yDomain;
    },
    set yDomain(v) {
      yDomain = v;
    },
    get isActive() {
      return isActive;
    },
    set isActive(v) {
      isActive = v;
    },
    get range() {
      return _range;
    },
    get handleSize() {
      return handleSize;
    }
  };
  brushContextProp = brushContext;
  setBrushContext(brushContext);
  if (disabled) {
    $$payload.out += "<!--[-->";
    children?.($$payload, { brushContext });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    const handleClass = layerClass("brush-handle");
    $$payload.out += `<div${attr_class(clsx$1(cls(layerClass("brush-context"), "absolute touch-none")))}${attr_style("", {
      top: `${stringify(ctx.padding.top)}px`,
      left: `${stringify(ctx.padding.left)}px`,
      width: `${stringify(ctx.width)}px`,
      height: `${stringify(ctx.height)}px`
    })}><div${attr_class(clsx$1(cls(layerClass("brush-container"), "absolute")))}${attr_style("", {
      top: `-${stringify(ctx.padding.top ?? 0)}px`,
      left: `-${stringify(ctx.padding.left ?? 0)}px`,
      width: `${stringify(ctx.containerWidth)}px`,
      height: `${stringify(ctx.containerHeight)}px`
    })}>`;
    children?.($$payload, { brushContext });
    $$payload.out += `<!----></div> `;
    if (brushContext.isActive) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div${spread_attributes(
        {
          ...range2,
          class: clsx$1(cls(layerClass("brush-range"), "absolute bg-surface-content/10 cursor-move select-none", "z-10", classes.range, range2?.class))
        },
        null,
        void 0,
        {
          left: `${stringify(_range.x)}px`,
          top: `${stringify(_range.y)}px`,
          width: `${stringify(_range.width)}px`,
          height: `${stringify(_range.height)}px`
        }
      )}></div> `;
      if (axis === "both" || axis === "y") {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div${spread_attributes(
          {
            ...handle,
            "data-position": "top",
            class: clsx$1(cls(handleClass, "cursor-ns-resize select-none", "range absolute", "z-10", classes.handle, handle?.class))
          },
          null,
          void 0,
          {
            left: `${stringify(_range.x)}px`,
            top: `${stringify(_range.y)}px`,
            width: `${stringify(_range.width)}px`,
            height: `${stringify(handleSize)}px`
          }
        )}></div> <div${spread_attributes(
          {
            ...handle,
            "data-position": "bottom",
            class: clsx$1(cls(handleClass, "handle bottom", "cursor-ns-resize select-none", "range absolute", "z-10", classes.handle, handle?.class))
          },
          null,
          void 0,
          {
            left: `${stringify(_range.x)}px`,
            top: `${stringify(bottom - handleSize)}px`,
            width: `${stringify(_range.width)}px`,
            height: `${stringify(handleSize)}px`
          }
        )}></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--> `;
      if (axis === "both" || axis === "x") {
        $$payload.out += "<!--[-->";
        $$payload.out += `<div${spread_attributes(
          {
            ...handle,
            "data-position": "left",
            class: clsx$1(cls(handleClass, "cursor-ew-resize select-none", "range absolute", "z-10", classes.handle, handle?.class))
          },
          null,
          void 0,
          {
            left: `${stringify(_range.x)}px`,
            top: `${stringify(_range.y)}px`,
            width: `${stringify(handleSize)}px`,
            height: `${stringify(_range.height)}px`
          }
        )}></div> <div${spread_attributes(
          {
            ...handle,
            "data-position": "right",
            class: clsx$1(cls(handleClass, "cursor-ew-resize select-none", "range absolute", "z-10", classes.handle, handle?.class))
          },
          null,
          void 0,
          {
            left: `${stringify(right - handleSize + 1)}px`,
            top: `${stringify(_range.y)}px`,
            width: `${stringify(handleSize)}px`,
            height: `${stringify(_range.height)}px`
          }
        )}></div>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { brushContext: brushContextProp });
  pop();
}
const defaultPadding = { top: 0, right: 0, bottom: 0, left: 0 };
const _ChartContext = new Context("ChartContext");
function getChartContext() {
  return _ChartContext.getOr({});
}
function setChartContext(context) {
  return _ChartContext.set(context);
}
const _RenderContext = new Context("RenderContext");
function getRenderContext() {
  return _RenderContext.get();
}
function setRenderContext(context) {
  return _RenderContext.set(context);
}
function Chart($$payload, $$props) {
  push();
  let {
    ssr = false,
    pointerEvents = true,
    position = "relative",
    percentRange = false,
    ref: refProp = void 0,
    x: xProp,
    y: yProp,
    z: zProp,
    r: rProp,
    data = [],
    xDomain: xDomainProp,
    yDomain: yDomainProp,
    zDomain: zDomainProp,
    rDomain: rDomainProp,
    xNice = false,
    yNice = false,
    zNice = false,
    rNice = false,
    xPadding,
    yPadding,
    zPadding,
    rPadding,
    // @ts-expect-error shh
    xScale: xScaleProp = linear$2(),
    // @ts-expect-error shh
    yScale: yScaleProp = linear$2(),
    zScale: zScaleProp = linear$2(),
    rScale: rScaleProp = sqrt$3(),
    flatData: flatDataProp,
    padding: paddingProp = {},
    verbose = true,
    debug = false,
    extents: extentsProp = {},
    xDomainSort = false,
    yDomainSort = false,
    zDomainSort = false,
    rDomainSort = false,
    xReverse = false,
    zReverse = false,
    rReverse = false,
    yRange: _yRangeProp,
    zRange: zRangeProp,
    rRange: rRangeProp,
    xBaseline = null,
    yBaseline = null,
    meta = {},
    children: _children,
    radial = false,
    xRange: _xRangeProp,
    x1: x1Prop,
    x1Domain: x1DomainProp,
    x1Range: x1RangeProp,
    x1Scale: x1ScaleProp,
    y1: y1Prop,
    y1Domain: y1DomainProp,
    y1Range: y1RangeProp,
    y1Scale: y1ScaleProp,
    c: cProp,
    cScale: cScaleProp,
    cDomain: cDomainProp,
    cRange: cRangeProp,
    onResize,
    geo,
    context: contextProp = void 0,
    tooltip,
    transform,
    onTransform,
    ondragend,
    ondragstart,
    brush
  } = $$props;
  let ref = void 0;
  const xRangeProp = _xRangeProp ? _xRangeProp : radial ? [0, 2 * Math.PI] : void 0;
  let containerWidth = 100;
  let containerHeight = 100;
  useDebounce(printDebug, 200);
  const _xDomain = (() => {
    if (xDomainProp !== void 0) return xDomainProp;
    if (xBaseline != null && Array.isArray(data)) {
      const xValues = data.flatMap(accessor(xProp));
      return [
        min$2([xBaseline, ...xValues]),
        max$2([xBaseline, ...xValues])
      ];
    }
  })();
  const _yDomain = (() => {
    if (yDomainProp !== void 0) return yDomainProp;
    if (yBaseline != null && Array.isArray(data)) {
      const yValues = data.flatMap(accessor(yProp));
      return [
        min$2([yBaseline, ...yValues]),
        max$2([yBaseline, ...yValues])
      ];
    }
  })();
  const yRangeProp = _yRangeProp ?? (radial ? ({ height: height2 }) => [0, height2 / 2] : void 0);
  const yReverse = yScaleProp ? !isScaleBand(yScaleProp) : true;
  const x = makeAccessor(xProp);
  const y = makeAccessor(yProp);
  const z = makeAccessor(zProp);
  const r = makeAccessor(rProp);
  const c = accessor(cProp);
  const x1 = accessor(x1Prop);
  const y1 = accessor(y1Prop);
  const flatData = flatDataProp ?? data;
  const filteredExtents = filterObject(snapshot(extentsProp));
  const activeGetters = { x, y, z, r };
  const padding = (() => {
    if (typeof paddingProp === "number") {
      return {
        ...defaultPadding,
        top: paddingProp,
        right: paddingProp,
        bottom: paddingProp,
        left: paddingProp
      };
    }
    return { ...defaultPadding, ...paddingProp };
  })();
  const box2 = (() => {
    const top = padding.top;
    const right = containerWidth - padding.right;
    const bottom = containerHeight - padding.bottom;
    const left = padding.left;
    const width2 = right - left;
    const height2 = bottom - top;
    return { top, left, bottom, right, width: width2, height: height2 };
  })();
  const width = box2.width;
  const height = box2.height;
  const extents = (() => {
    const scaleLookup = {
      x: { scale: xScaleProp, sort: xDomainSort },
      y: { scale: yScaleProp, sort: yDomainSort },
      z: { scale: zScaleProp, sort: zDomainSort },
      r: { scale: rScaleProp, sort: rDomainSort }
    };
    const getters = filterObject(activeGetters, filteredExtents);
    const activeScales = Object.fromEntries(Object.keys(getters).map((k) => [k, scaleLookup[k]]));
    if (Object.keys(getters).length > 0) {
      const calculatedExtents = calcScaleExtents(flatData, getters, activeScales);
      return { ...calculatedExtents, ...filteredExtents };
    } else {
      return {};
    }
  })();
  const xDomain = calcDomain("x", extents, _xDomain);
  const yDomain = calcDomain("y", extents, _yDomain);
  const zDomain = calcDomain("z", extents, zDomainProp);
  const rDomain = calcDomain("r", extents, rDomainProp);
  const x1Domain = x1DomainProp ?? extent(chartDataArray(data), x1);
  const y1Domain = y1DomainProp ?? extent(chartDataArray(data), y1);
  const cDomain = cDomainProp ?? unique(chartDataArray(data).map(c));
  const snappedPadding = snapshot(xPadding);
  snapshot(extents);
  const xScale = createChartScale("x", {
    scale: xScaleProp,
    domain: xDomain,
    padding: snappedPadding,
    nice: xNice,
    reverse: xReverse,
    percentRange,
    range: xRangeProp,
    height,
    width
  });
  const xGet = createGetter(x, xScale);
  const yScale = createChartScale("y", {
    scale: yScaleProp,
    domain: yDomain,
    padding: yPadding,
    nice: yNice,
    reverse: yReverse,
    percentRange,
    range: yRangeProp,
    height,
    width
  });
  const yGet = createGetter(y, yScale);
  const zScale = createChartScale("z", {
    scale: zScaleProp,
    domain: zDomain,
    padding: zPadding,
    nice: zNice,
    reverse: zReverse,
    percentRange,
    range: zRangeProp,
    height,
    width
  });
  const zGet = createGetter(z, zScale);
  const rScale = createChartScale("r", {
    scale: rScaleProp,
    domain: rDomain,
    padding: rPadding,
    nice: rNice,
    reverse: rReverse,
    percentRange,
    range: rRangeProp,
    height,
    width
  });
  const rGet = createGetter(r, rScale);
  const x1Scale = x1ScaleProp && x1RangeProp ? createScale(x1ScaleProp, x1Domain, x1RangeProp, { xScale, width, height }) : null;
  const x1Get = createGetter(x1, x1Scale);
  const y1Scale = y1ScaleProp && y1RangeProp ? createScale(y1ScaleProp, y1Domain, y1RangeProp, { yScale, width, height }) : null;
  const y1Get = createGetter(y1, y1Scale);
  const cScale = cRangeProp ? createScale(cScaleProp ?? ordinal(), cDomain, cRangeProp, { width, height }) : null;
  const cGet = (d) => cScale?.(c(d));
  const xDomainPossiblyNice = xScale.domain();
  const yDomainPossiblyNice = yScale.domain();
  const zDomainPossiblyNice = zScale.domain();
  const rDomainPossiblyNice = rScale.domain();
  const xRange = getRange(xScale);
  const yRange = getRange(yScale);
  const zRange = getRange(zScale);
  const rRange = getRange(rScale);
  const aspectRatio = width / height;
  const config = {
    x: xProp,
    y: yProp,
    z: zProp,
    r: rProp,
    c: cProp,
    x1: x1Prop,
    y1: y1Prop,
    xDomain: _xDomain,
    yDomain: _yDomain,
    zDomain: zDomainProp,
    rDomain: rDomainProp,
    x1Domain: x1DomainProp,
    y1Domain: y1DomainProp,
    cDomain: cDomainProp,
    xRange: _xRangeProp,
    yRange: _yRangeProp,
    zRange: zRangeProp,
    rRange: rRangeProp,
    cRange: cRangeProp,
    x1Range: x1RangeProp,
    y1Range: y1RangeProp
  };
  let geoContext = null;
  let transformContext = null;
  let tooltipContext = null;
  let brushContext = null;
  const context = {
    get activeGetters() {
      return activeGetters;
    },
    get config() {
      return config;
    },
    get width() {
      return width;
    },
    get height() {
      return height;
    },
    get percentRange() {
      return percentRange;
    },
    get aspectRatio() {
      return aspectRatio;
    },
    get containerWidth() {
      return containerWidth;
    },
    get containerHeight() {
      return containerHeight;
    },
    get x() {
      return x;
    },
    get y() {
      return y;
    },
    get z() {
      return z;
    },
    get r() {
      return r;
    },
    get c() {
      return c;
    },
    get x1() {
      return x1;
    },
    get y1() {
      return y1;
    },
    get data() {
      return data;
    },
    get xNice() {
      return xNice;
    },
    get yNice() {
      return yNice;
    },
    get zNice() {
      return zNice;
    },
    get rNice() {
      return rNice;
    },
    get xDomainSort() {
      return xDomainSort;
    },
    get yDomainSort() {
      return yDomainSort;
    },
    get zDomainSort() {
      return zDomainSort;
    },
    get rDomainSort() {
      return rDomainSort;
    },
    get xReverse() {
      return xReverse;
    },
    get yReverse() {
      return yReverse;
    },
    get zReverse() {
      return zReverse;
    },
    get rReverse() {
      return rReverse;
    },
    get xPadding() {
      return xPadding;
    },
    get yPadding() {
      return yPadding;
    },
    get zPadding() {
      return zPadding;
    },
    get rPadding() {
      return rPadding;
    },
    get padding() {
      return padding;
    },
    get flatData() {
      return flatData;
    },
    get extents() {
      return extents;
    },
    get xDomain() {
      return xDomainPossiblyNice;
    },
    get yDomain() {
      return yDomainPossiblyNice;
    },
    get zDomain() {
      return zDomainPossiblyNice;
    },
    get rDomain() {
      return rDomainPossiblyNice;
    },
    get cDomain() {
      return cDomain;
    },
    get x1Domain() {
      return x1Domain;
    },
    get y1Domain() {
      return y1Domain;
    },
    get xRange() {
      return xRange;
    },
    get yRange() {
      return yRange;
    },
    get zRange() {
      return zRange;
    },
    get rRange() {
      return rRange;
    },
    get cRange() {
      return cRangeProp;
    },
    get x1Range() {
      return x1RangeProp;
    },
    get y1Range() {
      return y1RangeProp;
    },
    get meta() {
      return meta;
    },
    set meta(v) {
      meta = v;
    },
    get xScale() {
      return xScale;
    },
    get yScale() {
      return yScale;
    },
    get zScale() {
      return zScale;
    },
    get rScale() {
      return rScale;
    },
    get yGet() {
      return yGet;
    },
    get xGet() {
      return xGet;
    },
    get zGet() {
      return zGet;
    },
    get rGet() {
      return rGet;
    },
    get cGet() {
      return cGet;
    },
    get x1Get() {
      return x1Get;
    },
    get y1Get() {
      return y1Get;
    },
    get cScale() {
      return cScale;
    },
    get x1Scale() {
      return x1Scale;
    },
    get y1Scale() {
      return y1Scale;
    },
    get radial() {
      return radial;
    },
    get containerRef() {
      return ref;
    },
    get geo() {
      return geoContext;
    },
    get transform() {
      return transformContext;
    },
    get tooltip() {
      return tooltipContext;
    },
    get brush() {
      return brushContext;
    }
  };
  contextProp = context;
  setChartContext(context);
  const initialTransform = geo?.applyTransform?.includes("translate") && geo?.fitGeojson && geo?.projection ? geoFitObjectTransform(geo.projection(), [width, height], geo.fitGeojson) : void 0;
  const processTranslate = (() => {
    if (!geo) return void 0;
    return (x2, y2, deltaX, deltaY) => {
      if (geo.applyTransform?.includes("rotate") && geoContext?.projection) {
        const projectionScale = geoContext.projection.scale() ?? 0;
        const sensitivity = 75;
        return {
          x: x2 + deltaX * (sensitivity / projectionScale),
          y: y2 + deltaY * (sensitivity / projectionScale) * -1
        };
      } else {
        return { x: x2 + deltaX, y: y2 + deltaY };
      }
    };
  })();
  const brushProps = typeof brush === "object" ? brush : { disabled: !brush };
  const tooltipProps = typeof tooltip === "object" ? tooltip : {};
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (ssr === true || typeof window !== "undefined") {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div${attr_class(clsx$1(layerClass("root-container")), "svelte-1j8sovf")}${attr_style("", {
        position,
        top: position === "absolute" ? "0" : null,
        right: position === "absolute" ? "0" : null,
        bottom: position === "absolute" ? "0" : null,
        left: position === "absolute" ? "0" : null,
        "pointer-events": pointerEvents === false ? "none" : null
      })}><!---->`;
      {
        TransformContext($$payload2, spread_props([
          {
            mode: transform?.mode ?? geo?.applyTransform?.length ? "manual" : "none",
            initialTranslate: initialTransform?.translate,
            initialScale: initialTransform?.scale,
            processTranslate
          },
          transform,
          {
            ondragstart,
            onTransform,
            ondragend,
            get transformContext() {
              return transformContext;
            },
            set transformContext($$value) {
              transformContext = $$value;
              $$settled = false;
            },
            children: ($$payload3) => {
              GeoContext($$payload3, spread_props([
                geo,
                {
                  get geoContext() {
                    return geoContext;
                  },
                  set geoContext($$value) {
                    geoContext = $$value;
                    $$settled = false;
                  },
                  children: ($$payload4) => {
                    BrushContext($$payload4, spread_props([
                      brushProps,
                      {
                        get brushContext() {
                          return brushContext;
                        },
                        set brushContext($$value) {
                          brushContext = $$value;
                          $$settled = false;
                        },
                        children: ($$payload5) => {
                          TooltipContext($$payload5, spread_props([
                            tooltipProps,
                            {
                              get tooltipContext() {
                                return tooltipContext;
                              },
                              set tooltipContext($$value) {
                                tooltipContext = $$value;
                                $$settled = false;
                              },
                              children: ($$payload6) => {
                                _children?.($$payload6, { context });
                                $$payload6.out += `<!---->`;
                              },
                              $$slots: { default: true }
                            }
                          ]));
                        },
                        $$slots: { default: true }
                      }
                    ]));
                  },
                  $$slots: { default: true }
                }
              ]));
            },
            $$slots: { default: true }
          }
        ]));
      }
      $$payload2.out += `<!----></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]-->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref: refProp, context: contextProp });
  pop();
}
function extractOutsideArc(arcPath) {
  const matches = arcPath.match(/(^.+?)(L|Z)/);
  if (!matches || !matches[1]) return arcPath;
  return matches[1];
}
function normalizeAngle(angle) {
  return (angle % 360 + 360) % 360;
}
function getArcPathMiddle(props) {
  const centerRadius = (props.innerRadius() + props.outerRadius()) / 2;
  const cornerAngleOffset = (() => {
    if (props.cornerRadius() <= 0 || centerRadius <= 0) return 0;
    const effectiveCornerRadius = Math.min(props.cornerRadius(), centerRadius);
    return effectiveCornerRadius * 0.5 / centerRadius;
  })();
  const effectiveStartAngle = (() => {
    if (props.invertCorner()) {
      return props.startAngle() - cornerAngleOffset;
    }
    return props.startAngle() + cornerAngleOffset;
  })();
  const effectiveEndAngle = (() => {
    if (props.invertCorner()) {
      return props.endAngle() + cornerAngleOffset;
    }
    return props.endAngle() - cornerAngleOffset;
  })();
  const path2 = extractOutsideArc(arc().outerRadius(centerRadius).innerRadius(centerRadius - 0.5).startAngle(effectiveStartAngle).endAngle(effectiveEndAngle)() ?? "");
  return {
    get current() {
      return path2;
    }
  };
}
function getArcPathInner(props) {
  const cornerAngleOffset = (() => {
    if (props.cornerRadius() <= 0 || props.innerRadius() <= 0) return 0;
    if (props.cornerRadius() >= props.innerRadius()) return Math.PI / 4;
    return props.cornerRadius() * 0.5 / props.innerRadius();
  })();
  const effectiveStartAngle = (() => {
    if (props.invertCorner()) {
      return props.startAngle() - cornerAngleOffset;
    }
    return props.startAngle() + cornerAngleOffset;
  })();
  const effectiveEndAngle = (() => {
    if (props.invertCorner()) {
      return props.endAngle() + cornerAngleOffset;
    }
    return props.endAngle() - cornerAngleOffset;
  })();
  const path2 = extractOutsideArc(arc().innerRadius(props.innerRadius()).outerRadius(props.innerRadius() + 0.5).startAngle(effectiveStartAngle).endAngle(effectiveEndAngle)() ?? "");
  return {
    get current() {
      return path2;
    }
  };
}
function getArcPathOuter(props) {
  const cornerAngleOffset = (() => {
    if (props.cornerRadius() <= 0 || props.outerRadius() <= 0) return 0;
    return props.cornerRadius() * 0.5 / props.outerRadius();
  })();
  const effectiveStartAngle = (() => {
    if (props.invertCorner()) {
      return props.startAngle() - cornerAngleOffset;
    }
    return props.startAngle() + cornerAngleOffset;
  })();
  const effectiveEndAngle = (() => {
    if (props.invertCorner()) {
      return props.endAngle() + cornerAngleOffset;
    }
    return props.endAngle() - cornerAngleOffset;
  })();
  const path2 = extractOutsideArc(arc().innerRadius(props.outerRadius() - 0.5).outerRadius(props.outerRadius()).startAngle(effectiveStartAngle).endAngle(effectiveEndAngle)() ?? "");
  return {
    get current() {
      return path2;
    }
  };
}
function pointOnCircle(radius, angle) {
  const adjustedAngle = angle - Math.PI / 2;
  return [
    radius * Math.cos(adjustedAngle),
    radius * Math.sin(adjustedAngle)
  ];
}
function createArcTextProps(props, opts = {}, position) {
  const effectiveStartAngleRadians = (() => {
    const start = props.startAngle();
    const end = props.endAngle();
    const offset = opts.startOffset;
    if (offset) {
      try {
        const percentage = parseFloat(offset.slice(0, -1)) / 100;
        if (!isNaN(percentage) && percentage >= 0 && percentage <= 1) {
          const span = end - start;
          return start + span * percentage;
        } else {
          console.warn("Invalid percentage for startOffset:", offset);
        }
      } catch (e) {
        console.warn("Could not parse startOffset percentage:", offset, e);
      }
    }
    return start;
  })();
  const effectiveStartDegrees = radiansToDegrees(effectiveStartAngleRadians);
  const normalizedStartDegrees = normalizeAngle(effectiveStartDegrees);
  const startDegrees = radiansToDegrees(props.startAngle());
  const endDegrees = radiansToDegrees(props.endAngle());
  const isClockwise = startDegrees < endDegrees;
  const isTopCw = isClockwise && (normalizedStartDegrees >= 270 || normalizedStartDegrees <= 90);
  const isTopCcw = !isClockwise && (normalizedStartDegrees > 270 || normalizedStartDegrees <= 90);
  const isBottomCw = isClockwise && normalizedStartDegrees < 270 && normalizedStartDegrees >= 90;
  const isBottomCcw = !isClockwise && normalizedStartDegrees <= 270 && normalizedStartDegrees > 90;
  const reverseText = isTopCcw || isBottomCw;
  const pathGenProps = {
    ...props,
    startAngle: () => reverseText ? props.endAngle() : props.startAngle(),
    endAngle: () => reverseText ? props.startAngle() : props.endAngle(),
    invertCorner: () => isBottomCw || isBottomCcw
  };
  const innerPath = getArcPathInner(pathGenProps);
  const middlePath = getArcPathMiddle(pathGenProps);
  const outerPath = getArcPathOuter(pathGenProps);
  const innerDominantBaseline = (() => {
    if (isBottomCw || isBottomCcw) return "auto";
    if (isTopCw || isTopCcw) return "hanging";
    return "auto";
  })();
  const outerDominantBaseline = (() => {
    if (isBottomCw || isBottomCcw) return "hanging";
    return void 0;
  })();
  const sharedProps = (() => {
    if (reverseText) {
      return {
        startOffset: opts.startOffset ?? "100%",
        textAnchor: "end"
      };
    }
    return { startOffset: opts.startOffset ?? void 0 };
  })();
  const radialPositionProps = (() => {
    if (position !== "outer-radial") return {};
    const midAngle = (props.startAngle() + props.endAngle()) / 2;
    const basePadding = opts.radialOffset ?? opts.outerPadding ?? 23;
    const midAngleDegrees = normalizeAngle(radiansToDegrees(midAngle));
    let textAnchor = "middle";
    let effectivePadding = basePadding;
    const isBottomZone = midAngleDegrees > 45 && midAngleDegrees < 135;
    const isTopZone = midAngleDegrees > 225 && midAngleDegrees < 315;
    const isRightZone = midAngleDegrees <= 45 || midAngleDegrees >= 315;
    const isLeftZone = midAngleDegrees >= 135 && midAngleDegrees <= 225;
    const positionRadius = props.outerRadius() + effectivePadding;
    const [x, y] = pointOnCircle(positionRadius, midAngle);
    if (isRightZone) {
      textAnchor = "start";
      if (midAngleDegrees > 350 || midAngleDegrees < 10) textAnchor = "start";
    } else if (isLeftZone) {
      textAnchor = "end";
      if (midAngleDegrees > 170 && midAngleDegrees < 190) textAnchor = "end";
    } else if (isBottomZone) {
      textAnchor = "middle";
    } else if (isTopZone) {
      textAnchor = "middle";
    }
    return {
      x,
      y,
      textAnchor,
      dominantBaseline: "middle"
    };
  })();
  const current = (() => {
    if (position === "inner") {
      return {
        path: innerPath.current,
        ...sharedProps,
        dominantBaseline: innerDominantBaseline
      };
    } else if (position === "outer") {
      return {
        path: outerPath.current,
        ...sharedProps,
        dominantBaseline: outerDominantBaseline
      };
    } else if (position === "middle") {
      return {
        path: middlePath.current,
        ...sharedProps,
        dominantBaseline: "middle"
      };
    } else if (position === "centroid") {
      const centroid = props.centroid();
      return {
        x: centroid[0],
        y: centroid[1],
        textAnchor: "middle",
        verticalAnchor: "middle"
      };
    } else {
      return radialPositionProps;
    }
  })();
  return {
    get current() {
      return current;
    }
  };
}
function Arc($$payload, $$props) {
  push();
  let {
    ref: refProp = void 0,
    trackRef: trackRefProp = void 0,
    motion,
    value = 0,
    initialValue = 0,
    domain = [0, 100],
    range: range2 = [0, 360],
    // degrees
    startAngle: startAngleProp,
    endAngle: endAngleProp,
    innerRadius: innerRadiusProp,
    outerRadius: outerRadiusProp,
    cornerRadius = 0,
    padAngle = 0,
    trackStartAngle: trackStartAngleProp,
    trackEndAngle: trackEndAngleProp,
    trackInnerRadius: trackInnerRadiusProp,
    trackOuterRadius: trackOuterRadiusProp,
    trackCornerRadius: trackCornerRadiusProp,
    trackPadAngle: trackPadAngleProp,
    fill,
    fillOpacity,
    stroke = "none",
    strokeWidth,
    opacity,
    data,
    offset = 0,
    onpointerenter = () => {
    },
    onpointermove = () => {
    },
    onpointerleave: onpointerleave2 = () => {
    },
    ontouchmove = () => {
    },
    tooltipContext,
    track = false,
    children,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let ref = void 0;
  let trackRef = void 0;
  const ctx = getChartContext();
  const endAngle = endAngleProp ?? degreesToRadians(ctx.config.xRange ? max$2(ctx.xRange) : max$2(range2));
  const motionEndAngle = createMotion(initialValue, () => value, motion);
  const scale = linear$2().domain(domain).range(range2);
  function getOuterRadius(outerRadius2, chartRadius) {
    if (!outerRadius2) {
      return chartRadius;
    } else if (outerRadius2 > 1) {
      return outerRadius2;
    } else if (outerRadius2 > 0) {
      return chartRadius * outerRadius2;
    } else if (outerRadius2 < 0) {
      return chartRadius + outerRadius2;
    } else {
      return outerRadius2;
    }
  }
  const outerRadius = getOuterRadius(outerRadiusProp, (Math.min(ctx.xRange[1], ctx.yRange[0]) ?? 0) / 2);
  const trackOuterRadius = trackOuterRadiusProp ? getOuterRadius(trackOuterRadiusProp, (Math.min(ctx.xRange[1], ctx.yRange[0]) ?? 0) / 2) : outerRadius;
  function getInnerRadius(innerRadius2, outerRadius2) {
    if (innerRadius2 == null) {
      return Math.min(...ctx.yRange);
    } else if (innerRadius2 > 1) {
      return innerRadius2;
    } else if (innerRadius2 > 0) {
      return outerRadius2 * innerRadius2;
    } else if (innerRadius2 < 0) {
      return outerRadius2 + innerRadius2;
    } else {
      return innerRadius2;
    }
  }
  const innerRadius = getInnerRadius(innerRadiusProp, outerRadius);
  const trackInnerRadius = trackInnerRadiusProp ? getInnerRadius(trackInnerRadiusProp, trackOuterRadius) : innerRadius;
  const startAngle = startAngleProp ?? degreesToRadians(range2[0]);
  const trackStartAngle = trackStartAngleProp ?? startAngleProp ?? degreesToRadians(range2[0]);
  const trackEndAngle = trackEndAngleProp ?? endAngleProp ?? degreesToRadians(range2[1]);
  const trackCornerRadius = trackCornerRadiusProp ?? cornerRadius;
  const trackPadAngle = trackPadAngleProp ?? padAngle;
  const arcEndAngle = endAngleProp ?? degreesToRadians(scale(motionEndAngle.current));
  const arc$1 = arc().innerRadius(innerRadius).outerRadius(outerRadius).startAngle(startAngle).endAngle(arcEndAngle).cornerRadius(cornerRadius).padAngle(padAngle);
  const trackArc = arc().innerRadius(trackInnerRadius).outerRadius(trackOuterRadius).startAngle(trackStartAngle).endAngle(trackEndAngle).cornerRadius(trackCornerRadius).padAngle(trackPadAngle);
  const angle = ((startAngle ?? 0) + (endAngle ?? 0)) / 2;
  const xOffset = Math.sin(angle) * offset;
  const yOffset = -Math.cos(angle) * offset;
  const trackArcCentroid = (() => {
    const centroid = trackArc.centroid();
    return [centroid[0] + xOffset, centroid[1] + yOffset];
  })();
  const boundingBox = trackRef ? trackRef.getBBox() : {};
  const onPointerEnter = (e) => {
    onpointerenter?.(e);
    tooltipContext?.show(e, data);
  };
  const onPointerMove = (e) => {
    onpointermove?.(e);
    tooltipContext?.show(e, data);
  };
  const onPointerLeave = (e) => {
    onpointerleave2?.(e);
    tooltipContext?.hide();
  };
  function getTrackTextProps(position, opts = {}) {
    return createArcTextProps(
      {
        startAngle: () => trackStartAngle,
        endAngle: () => trackEndAngle,
        outerRadius: () => trackOuterRadius + (opts.outerPadding ? opts.outerPadding : 0),
        innerRadius: () => trackInnerRadius,
        cornerRadius: () => trackCornerRadius,
        centroid: () => trackArcCentroid
      },
      opts,
      position
    ).current;
  }
  function getArcTextProps(position, opts = {}) {
    return createArcTextProps(
      {
        startAngle: () => startAngle,
        endAngle: () => arcEndAngle,
        outerRadius: () => outerRadius + (opts.outerPadding ? opts.outerPadding : 0),
        innerRadius: () => innerRadius,
        cornerRadius: () => cornerRadius,
        centroid: () => trackArcCentroid
      },
      opts,
      position
    ).current;
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    if (track) {
      $$payload2.out += "<!--[-->";
      Spline($$payload2, spread_props([
        { pathData: trackArc(), stroke: "none" },
        extractLayerProps(track, "arc-track"),
        {
          get pathRef() {
            return trackRef;
          },
          set pathRef($$value) {
            trackRef = $$value;
            $$settled = false;
          }
        }
      ]));
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]--> `;
    Spline($$payload2, spread_props([
      {
        pathData: arc$1(),
        transform: `translate(${stringify(xOffset)}, ${stringify(yOffset)})`,
        fill,
        fillOpacity,
        stroke,
        "stroke-width": strokeWidth,
        opacity
      },
      restProps,
      {
        class: cls(layerClass("arc-line"), className),
        onpointerenter: onPointerEnter,
        onpointermove: onPointerMove,
        onpointerleave: onPointerLeave,
        ontouchmove: (e) => {
          ontouchmove?.(e);
          if (!tooltipContext) return;
          e.preventDefault();
        },
        get pathRef() {
          return ref;
        },
        set pathRef($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!----> `;
    children?.($$payload2, {
      centroid: trackArcCentroid,
      boundingBox,
      value: motionEndAngle.current,
      getTrackTextProps,
      getArcTextProps
    });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref: refProp, trackRef: trackRefProp });
  pop();
}
function Html($$payload, $$props) {
  push();
  let {
    ref: refProp = void 0,
    zIndex = 0,
    pointerEvents = true,
    role,
    "aria-label": label,
    "aria-labelledby": labelledBy,
    "aria-describedby": describedBy,
    center = false,
    ignoreTransform = false,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let ref = void 0;
  const roleVal = role || (label || labelledBy || describedBy ? "figure" : void 0);
  const ctx = getChartContext();
  const transformCtx = getTransformContext();
  const transform = (() => {
    if (transformCtx.mode === "canvas" && !ignoreTransform) {
      return `translate(${transformCtx.translate.x}px,${transformCtx.translate.y}px) scale(${transformCtx.scale})`;
    } else if (center) {
      return `translate(${center === "x" || center === true ? ctx.width / 2 : 0}px, ${center === "y" || center === true ? ctx.height / 2 : 0}px)`;
    }
  })();
  setRenderContext("html");
  $$payload.out += `<div${spread_attributes(
    {
      class: clsx$1(cls(layerClass("layout-html"), "absolute top-0 left-0", pointerEvents === false && "pointer-events-none", className)),
      role: roleVal,
      "aria-label": label,
      "aria-labelledby": labelledBy,
      "aria-describedby": describedBy,
      ...restProps
    },
    null,
    void 0,
    {
      transform,
      "transform-origin": "top left",
      "z-index": zIndex,
      "pointer-events": pointerEvents === false ? "none" : null,
      top: `${stringify(ctx.padding.top)}px`,
      bottom: `${stringify(ctx.padding.bottom)}px`,
      left: `${stringify(ctx.padding.left)}px`,
      right: `${stringify(ctx.padding.right)}px`
    }
  )}>`;
  children?.($$payload, { ref });
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref: refProp });
  pop();
}
function Layer($$payload, $$props) {
  let {
    type,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  if (type === "canvas") {
    $$payload.out += "<!--[-->";
    Canvas($$payload, spread_props([
      restProps,
      {
        children: ($$payload2) => {
          children?.($$payload2);
          $$payload2.out += `<!---->`;
        },
        $$slots: { default: true }
      }
    ]));
  } else if (type === "svg") {
    $$payload.out += "<!--[1-->";
    Svg($$payload, spread_props([
      restProps,
      {
        children: ($$payload2) => {
          children?.($$payload2);
          $$payload2.out += `<!---->`;
        },
        $$slots: { default: true }
      }
    ]));
  } else if (type === "html") {
    $$payload.out += "<!--[2-->";
    Html($$payload, spread_props([
      restProps,
      {
        children: ($$payload2) => {
          children?.($$payload2);
          $$payload2.out += `<!---->`;
        },
        $$slots: { default: true }
      }
    ]));
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
}
function ColorRamp($$payload, $$props) {
  push();
  let {
    interpolator,
    steps = 10,
    height = "20px",
    width = "100%",
    ref: refProp = void 0,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let href = "";
  $$payload.out += `<image${spread_attributes(
    {
      href,
      preserveAspectRatio: "none",
      height,
      width,
      ...extractLayerProps(restProps, "color-ramp")
    },
    null,
    void 0,
    void 0,
    3
  )}></image>`;
  bind_props($$props, { ref: refProp });
  pop();
}
function Legend($$payload, $$props) {
  push();
  let {
    scale: scaleProp,
    title = "",
    width = 320,
    height = 10,
    ticks = width / 64,
    tickFormat: tickFormatProp,
    tickValues: tickValuesProp,
    tickFontSize = 10,
    tickLength: tickLengthProp = 4,
    placement,
    orientation = "horizontal",
    onclick,
    onpointerenter,
    onpointerleave: onpointerleave2,
    variant = "ramp",
    classes = {},
    ref: refProp = void 0,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const ctx = getChartContext();
  const scale = scaleProp ?? ctx.cScale;
  const scaleConfig = (() => {
    if (!scale) {
      return {
        xScale: void 0,
        interpolator: void 0,
        swatches: void 0,
        tickLabelOffset: 0,
        tickLine: true,
        tickLength: tickLengthProp,
        tickFormat: tickFormatProp,
        tickValues: tickValuesProp
      };
    } else if (scale.interpolate) {
      const n = Math.min(scale.domain().length, scale.range().length);
      const xScale = scale.copy().rangeRound?.(quantize(interpolate(0, width), n));
      const interpolator = scale.copy().domain(quantize(interpolate(0, 1), n));
      const _tickFormat = tickFormatProp ?? xScale?.tickFormat?.();
      return {
        xScale,
        interpolator,
        tickFormat: _tickFormat,
        tickLabelOffset: 0,
        tickLine: true,
        tickValues: tickValuesProp,
        tickLength: tickLengthProp,
        swatches: void 0
      };
    } else if (scale.interpolator) {
      const xScale = Object.assign(scale.copy().interpolator(interpolateRound(0, width)), {
        range() {
          return [0, width];
        }
      });
      const interpolator = scale.interpolator();
      let tickValues = tickValuesProp;
      if (!xScale.ticks) {
        if (tickValues === void 0) {
          const n = Math.round(ticks + 1);
          tickValues = range$1(n).map((i) => quantile(scale.domain(), i / (n - 1)));
        }
      }
      const tickFormat = tickFormatProp ?? xScale.tickFormat?.();
      return {
        interpolator,
        tickValues,
        tickFormat,
        swatches: void 0,
        tickLabelOffset: 0,
        tickLine: true,
        tickLength: tickLengthProp,
        xScale
      };
    } else if (scale.invertExtent) {
      const thresholds = scale.thresholds ? scale.thresholds() : scale.quantiles ? scale.quantiles() : scale.domain();
      const xScale = linear$2().domain([-1, scale.range().length - 1]).rangeRound([0, width]);
      const swatches = scale.range().map((d, i) => {
        return {
          x: xScale(i - 1),
          y: 0,
          width: xScale(i) - xScale(i - 1),
          height,
          fill: d
        };
      });
      const tickValues = range$1(thresholds.length);
      const tickFormat = (i) => {
        const value = thresholds[i];
        return tickFormatProp ? format$1(value, tickFormatProp) : value;
      };
      return {
        xScale,
        swatches,
        tickValues,
        tickFormat,
        tickLabelOffset: 0,
        tickLine: true,
        tickLength: tickLengthProp,
        interpolator: void 0
      };
    } else {
      const xScale = band().domain(scale.domain()).rangeRound([0, width]);
      const swatches = scale.domain().map((d) => {
        return {
          x: xScale(d),
          y: 0,
          width: Math.max(0, xScale.bandwidth() - 1),
          height,
          fill: scale(d)
        };
      });
      const tickValues = scale.domain();
      const tickLabelOffset = xScale.bandwidth() / 2;
      const tickLine = false;
      const tickLength = 0;
      return {
        xScale,
        tickFormat: tickFormatProp,
        tickLabelOffset,
        tickLine,
        tickLength,
        tickValues,
        swatches,
        interpolator: void 0
      };
    }
  })();
  $$payload.out += `<div${spread_attributes(
    {
      ...restProps,
      "data-placement": placement,
      class: clsx$1(cls(
        layerClass("legend-container"),
        "inline-block",
        "z-1",
        // stack above tooltip context layers (band rects, voronoi, ...)
        placement && [
          "absolute",
          {
            "top-left": "top-0 left-0",
            top: "top-0 left-1/2 -translate-x-1/2",
            "top-right": "top-0 right-0",
            left: "top-1/2 left-0 -translate-y-1/2",
            center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            right: "top-1/2 right-0 -translate-y-1/2",
            "bottom-left": "bottom-0 left-0",
            bottom: "bottom-0 left-1/2 -translate-x-1/2",
            "bottom-right": "bottom-0 right-0"
          }[placement]
        ],
        className,
        classes.root
      ))
    },
    null
  )}><div${attr_class(clsx$1(cls(layerClass("legend-title"), "text-[10px] font-semibold", classes.title)))}>${escape_html(title)}</div> `;
  if (children) {
    $$payload.out += "<!--[-->";
    children($$payload, {
      values: scaleConfig.tickValues ?? scaleConfig.xScale?.ticks?.(ticks) ?? [],
      scale
    });
    $$payload.out += `<!---->`;
  } else if (variant === "ramp") {
    $$payload.out += "<!--[1-->";
    const each_array_1 = ensure_array_like(tickValuesProp ?? scaleConfig.xScale?.ticks?.(ticks) ?? []);
    $$payload.out += `<svg${attr("width", width)}${attr("height", height + tickLengthProp + tickFontSize)}${attr("viewBox", `0 0 ${stringify(width)} ${stringify(height + tickLengthProp + tickFontSize)}`)}${attr_class(clsx$1(cls(layerClass("legend-ramp-svg"), "overflow-visible")))}><g${attr_class(clsx$1(layerClass("legend-ramp-g")))}>`;
    if (scaleConfig.interpolator) {
      $$payload.out += "<!--[-->";
      ColorRamp($$payload, {
        width,
        height,
        interpolator: scaleConfig.interpolator,
        class: layerClass("legend-color-ramp")
      });
    } else if (scaleConfig.swatches) {
      $$payload.out += "<!--[1-->";
      const each_array = ensure_array_like(scaleConfig.swatches);
      $$payload.out += `<!--[-->`;
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let swatch = each_array[i];
        $$payload.out += `<rect${spread_attributes(
          {
            ...extractLayerProps(swatch, "legend-swatch")
          },
          null,
          void 0,
          void 0,
          3
        )}></rect>`;
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></g><g${attr_class(clsx$1(layerClass("legend-tick-group")))}><!--[-->`;
    for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
      let tick = each_array_1[i];
      $$payload.out += `<text text-anchor="middle"${attr("x", scaleConfig.xScale?.(tick) + scaleConfig.tickLabelOffset)}${attr("y", height + tickLengthProp + tickFontSize)}${attr_class(clsx$1(cls(layerClass("legend-tick-text"), "text-[10px] fill-surface-content", classes.label)))}${attr_style("", { "font-size": tickFontSize })}>${escape_html(tickFormatProp ? format$1(tick, asAny(tickFormatProp)) : tick)}</text>`;
      if (scaleConfig.tickLine) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<line${attr("x1", scaleConfig.xScale?.(tick))}${attr("y1", 0)}${attr("x2", scaleConfig.xScale?.(tick))}${attr("y2", height + tickLengthProp)}${attr_class(clsx$1(cls(layerClass("legend-tick-line"), "stroke-surface-content", classes.tick)))}></line>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]--></g></svg>`;
  } else if (variant === "swatches") {
    $$payload.out += "<!--[2-->";
    const each_array_2 = ensure_array_like(scaleConfig.tickValues ?? scaleConfig.xScale?.ticks?.(ticks) ?? []);
    $$payload.out += `<div${attr_class(clsx$1(cls(layerClass("legend-swatch-group"), "flex gap-x-4 gap-y-1", orientation === "vertical" && "flex-col", classes.swatches)))}><!--[-->`;
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let tick = each_array_2[$$index_2];
      const color = scale?.(tick) ?? "";
      const item = { value: tick, color };
      $$payload.out += `<button${attr_class(clsx$1(cls(layerClass("legend-swatch-button"), "flex gap-1", !onclick && "cursor-auto", classes.item?.(item))))}><div${attr_class(clsx$1(cls(layerClass("legend-swatch"), "h-4 w-4 rounded-full", classes.swatch)))}${attr_style("", { "background-color": color })}></div> <div${attr_class(clsx$1(cls(layerClass("legend-swatch-label"), "text-xs text-surface-content whitespace-nowrap", classes.label)))}>${escape_html(tickFormatProp ? format$1(tick, asAny(tickFormatProp)) : tick)}</div></button>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { ref: refProp });
  pop();
}
function TooltipHeader($$payload, $$props) {
  push();
  let {
    ref: refProp = void 0,
    colorRef: colorRefProp = void 0,
    value,
    format: format$1$1,
    color,
    classes = { root: "", color: "" },
    props = { root: {}, color: {} },
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes(
    {
      class: clsx$1(cls(layerClass("tooltip-header"), "font-semibold whitespace-nowrap border-b mb-1 pb-1 flex items-center gap-2", classes.root, props.root?.class, className)),
      ...restProps
    },
    null
  )}>`;
  if (color) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${attr_class(clsx$1(cls(layerClass("tooltip-header-color"), "color", "inline-block size-2 rounded-full bg-[var(--color)]", classes.color)))}${attr_style("", { "--color": color })}></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (children) {
    $$payload.out += "<!--[-->";
    children?.($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `${escape_html(format$1$1 ? format$1(value, asAny(format$1$1)) : value)}`;
  }
  $$payload.out += `<!--]--></div>`;
  bind_props($$props, { ref: refProp, colorRef: colorRefProp });
  pop();
}
function TooltipItem($$payload, $$props) {
  push();
  let {
    ref: refProp = void 0,
    labelRef: labelRefProp = void 0,
    valueRef: valueRefProp = void 0,
    colorRef: colorRefProp = void 0,
    label,
    value,
    format: format$1$1,
    valueAlign = "left",
    color,
    classes = { root: "", label: "", value: "", color: "" },
    props = { root: {}, label: {}, value: {}, color: {} },
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes(
    {
      ...props.root,
      class: clsx$1(cls(layerClass("tooltip-item-root"), "contents", classes.root, className, props.root?.class)),
      ...restProps
    },
    null
  )}><div${spread_attributes(
    {
      ...props.label,
      class: clsx$1(cls(layerClass("tooltip-item-label"), "label", "flex items-center gap-2 whitespace-nowrap", classes.label, props.label?.class))
    },
    null
  )}>`;
  if (color) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${spread_attributes(
      {
        ...props.color,
        class: clsx$1(cls(layerClass("tooltip-item-color"), "color", "inline-block size-2 rounded-full bg-[var(--color)]", classes.color, props.color?.class))
      },
      null,
      void 0,
      { "--color": color }
    )}></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (typeof label === "function") {
    $$payload.out += "<!--[-->";
    label($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `${escape_html(label)}`;
  }
  $$payload.out += `<!--]--></div> <div${spread_attributes(
    {
      ...props.value,
      class: clsx$1(cls(
        layerClass("tooltip-item-value"),
        "value",
        "tabular-nums",
        {
          "text-right": valueAlign === "right",
          "text-center": valueAlign === "center"
        },
        classes.value,
        props.value?.class
      ))
    },
    null
  )}>`;
  if (children) {
    $$payload.out += "<!--[-->";
    children($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `${escape_html(format$1$1 ? format$1(value, asAny(format$1$1)) : value)}`;
  }
  $$payload.out += `<!--]--></div></div>`;
  bind_props($$props, {
    ref: refProp,
    labelRef: labelRefProp,
    valueRef: valueRefProp,
    colorRef: colorRefProp
  });
  pop();
}
function TooltipList($$payload, $$props) {
  push();
  let {
    ref: refProp = void 0,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes(
    {
      class: clsx$1(cls(layerClass("tooltip-list"), "grid grid-cols-[1fr_auto] gap-x-2 gap-y-1 items-start", className)),
      ...restProps
    },
    null
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref: refProp });
  pop();
}
function TooltipSeparator($$payload, $$props) {
  push();
  let {
    ref: refProp = void 0,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  $$payload.out += `<div${spread_attributes(
    {
      class: clsx$1(cls(layerClass("tooltip-separator"), "rounded-sm bg-surface-content/20 my-1 col-span-full h-px", className)),
      ...restProps
    },
    null
  )}>`;
  children?.($$payload);
  $$payload.out += `<!----></div>`;
  bind_props($$props, { ref: refProp });
  pop();
}
function Tooltip($$payload, $$props) {
  push();
  let {
    anchor = "top-left",
    classes = {},
    contained = "container",
    motion = "spring",
    pointerEvents = false,
    variant = "default",
    x = "pointer",
    xOffset = x === "pointer" ? 10 : 0,
    y = "pointer",
    yOffset = y === "pointer" ? 10 : 0,
    children,
    rootRef: rootRefProp = void 0,
    props = { root: {}, container: {}, content: {} },
    class: className
  } = $$props;
  const ctx = getChartContext();
  const tooltipCtx = getTooltipContext();
  let tooltipWidth = 0;
  let tooltipHeight = 0;
  function alignValue(value, align, additionalOffset, tooltipSize) {
    const alignOffset = align === "center" ? tooltipSize / 2 : align === "end" ? tooltipSize : 0;
    return value + (align === "end" ? -additionalOffset : additionalOffset) - alignOffset;
  }
  const positions = (() => {
    if (!tooltipCtx.data) {
      const tooltipX = run(() => tooltipCtx.x);
      const tooltipY = run(() => tooltipCtx.y);
      return { x: tooltipX, y: tooltipY };
    }
    const xBandOffset = isScaleBand(ctx.xScale) ? ctx.xScale.step() / 2 - ctx.xScale.padding() * ctx.xScale.step() / 2 : 0;
    const xValue = typeof x === "number" ? x : x === "data" ? ctx.xGet(tooltipCtx.data) + ctx.padding.left + xBandOffset : tooltipCtx.x;
    let xAlign = "start";
    switch (anchor) {
      case "top-left":
      case "left":
      case "bottom-left":
        xAlign = "start";
        break;
      case "top":
      case "center":
      case "bottom":
        xAlign = "center";
        break;
      case "top-right":
      case "right":
      case "bottom-right":
        xAlign = "end";
        break;
    }
    const yBandOffset = isScaleBand(ctx.yScale) ? ctx.yScale.step() / 2 - ctx.yScale.padding() * ctx.yScale.step() / 2 : 0;
    const yValue = typeof y === "number" ? y : y === "data" ? ctx.yGet(tooltipCtx.data) + ctx.padding.top + yBandOffset : tooltipCtx.y;
    let yAlign = "start";
    switch (anchor) {
      case "top-left":
      case "top":
      case "top-right":
        yAlign = "start";
        break;
      case "left":
      case "center":
      case "right":
        yAlign = "center";
        break;
      case "bottom-left":
      case "bottom":
      case "bottom-right":
        yAlign = "end";
        break;
    }
    const rect = {
      top: alignValue(yValue, yAlign, yOffset, tooltipHeight),
      left: alignValue(xValue, xAlign, xOffset, tooltipWidth),
      // set below
      bottom: 0,
      right: 0
    };
    rect.bottom = rect.top + tooltipHeight;
    rect.right = rect.left + tooltipWidth;
    if (contained === "container") {
      if (typeof x !== "number") {
        if ((xAlign === "start" || xAlign === "center") && rect.right > ctx.containerWidth) {
          rect.left = alignValue(xValue, "end", xOffset, tooltipWidth);
        }
        if ((xAlign === "end" || xAlign === "center") && rect.left < ctx.padding.left) {
          rect.left = alignValue(xValue, "start", xOffset, tooltipWidth);
        }
      }
      rect.right = rect.left + tooltipWidth;
      if (typeof y !== "number") {
        if ((yAlign === "start" || yAlign === "center") && rect.bottom > ctx.containerHeight) {
          rect.top = alignValue(yValue, "end", yOffset, tooltipHeight);
        }
        if ((yAlign === "end" || yAlign === "center") && rect.top < ctx.padding.top) {
          rect.top = alignValue(yValue, "start", yOffset, tooltipHeight);
        }
      }
      rect.bottom = rect.top + tooltipHeight;
    }
    return { x: rect.left, y: rect.top };
  })();
  const motionX = createMotion(tooltipCtx.x, () => positions.x, motion);
  const motionY = createMotion(tooltipCtx.y, () => positions.y, motion);
  if (tooltipCtx.data) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div${spread_attributes(
      {
        ...props.root,
        class: clsx$1(cls("root", layerClass("tooltip-root"), classes.root, props.root?.class))
      },
      "svelte-1fmt6",
      { "pointer-events-none": !pointerEvents },
      {
        top: `${stringify(motionY.current)}px`,
        left: `${stringify(motionX.current)}px`
      }
    )}><div${spread_attributes(
      {
        ...props.container,
        class: clsx$1(cls(
          layerClass("tooltip-container"),
          variant !== "none" && [
            "text-sm py-1 px-2 h-full rounded-sm elevation-1"
          ],
          {
            default: [
              "bg-surface-100/90 dark:bg-surface-300/90 backdrop-filter backdrop-blur-[2px] text-surface-content",
              "[&_.label]:text-surface-content/75"
            ],
            invert: [
              "bg-surface-content/90 backdrop-filter backdrop-blur-[2px] text-surface-100 border border-surface-content",
              "[&_.label]:text-surface-100/50"
            ],
            none: ""
          }[variant],
          classes.container,
          props.container?.class,
          className
        ))
      },
      "svelte-1fmt6"
    )}>`;
    if (children) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div${spread_attributes(
        {
          ...props.content,
          class: clsx$1(cls(layerClass("tooltip-content"), classes.content))
        },
        "svelte-1fmt6"
      )}>`;
      children($$payload, {
        data: tooltipCtx.data,
        payload: tooltipCtx.payload
      });
      $$payload.out += `<!----></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { rootRef: rootRefProp });
  pop();
}
class HighlightKey {
  current = null;
  set = (seriesKey) => {
    this.current = seriesKey;
  };
}
class SeriesState {
  #series = [];
  selectedSeries = new SelectionState();
  selectedKeys = new SelectionState();
  highlightKey = new HighlightKey();
  constructor(getSeries) {
    this.#series = getSeries();
  }
  get series() {
    return this.#series;
  }
  get isDefaultSeries() {
    return this.#series.length === 1 && this.#series[0].key === "default";
  }
  get allSeriesData() {
    return this.#series.flatMap((s) => s.data?.map((d) => ({ seriesKey: s.key, ...d }))).filter((d) => d);
  }
  get visibleSeries() {
    return this.#series.filter((s) => this.selectedSeries.isEmpty() || this.selectedSeries.isSelected(s.key));
  }
}
function createLegendProps(opts) {
  return {
    scale: opts.seriesState.isDefaultSeries ? void 0 : ordinal(opts.seriesState.series.map((s) => s.key), opts.seriesState.series.map((s) => s.color)),
    tickFormat: (key) => opts.seriesState.series.find((s) => s.key === key)?.label ?? key,
    placement: "bottom",
    variant: "swatches",
    onclick: (_, item) => opts.seriesState.selectedSeries.toggle(item.value),
    onpointerenter: (_, item) => opts.seriesState.highlightKey.current = item.value,
    onpointerleave: () => opts.seriesState.highlightKey.current = null,
    ...opts.props,
    classes: {
      item: (item) => opts.seriesState.visibleSeries.length && !opts.seriesState.visibleSeries.some((s) => s.key === item.value) ? "opacity-50" : "",
      ...opts.props?.classes
    }
  };
}
function Line($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    x1,
    initialX1 = x1,
    y1,
    initialY1 = y1,
    x2,
    initialX2 = x2,
    y2,
    initialY2 = y2,
    class: className,
    strokeWidth,
    opacity,
    fill,
    stroke,
    marker,
    markerEnd,
    markerStart,
    markerMid,
    motion,
    fillOpacity,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const markerStartId = markerStart || marker ? createId("marker-start", uid) : "";
  const markerMidId = markerMid || marker ? createId("marker-mid", uid) : "";
  const markerEndId = markerEnd || marker ? createId("marker-end", uid) : "";
  const motionX1 = createMotion(initialX1, () => x1, motion);
  const motionY1 = createMotion(initialY1, () => y1, motion);
  const motionX2 = createMotion(initialX2, () => x2, motion);
  const motionY2 = createMotion(initialY2, () => y2, motion);
  const renderCtx = getRenderContext();
  createKey(() => fill);
  createKey(() => stroke);
  if (renderCtx === "canvas") {
    registerCanvasComponent({
      events: {
        click: restProps.onclick,
        pointerenter: restProps.onpointerenter,
        pointermove: restProps.onpointermove,
        pointerleave: restProps.onpointerleave
      }
    });
  }
  if (renderCtx === "svg") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<line${spread_attributes(
      {
        x1: motionX1.current,
        y1: motionY1.current,
        x2: motionX2.current,
        y2: motionY2.current,
        fill,
        stroke,
        "fill-opacity": fillOpacity,
        "stroke-width": strokeWidth,
        opacity,
        "marker-start": markerStartId ? `url(#${markerStartId})` : void 0,
        "marker-mid": markerMidId ? `url(#${markerMidId})` : void 0,
        "marker-end": markerEndId ? `url(#${markerEndId})` : void 0,
        class: clsx$1(cls(layerClass("line"), stroke === void 0 && "stroke-surface-content", className)),
        ...restProps
      },
      null,
      void 0,
      void 0,
      3
    )}></line>`;
    MarkerWrapper($$payload, {
      id: markerStartId,
      marker: markerStart ?? marker
    });
    $$payload.out += `<!---->`;
    MarkerWrapper($$payload, { id: markerMidId, marker: markerMid ?? marker });
    $$payload.out += `<!---->`;
    MarkerWrapper($$payload, { id: markerEndId, marker: markerEnd ?? marker });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function Rule($$payload, $$props) {
  push();
  let {
    x = false,
    xOffset = 0,
    y = false,
    yOffset = 0,
    class: className,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const ctx = getChartContext();
  const xRangeMinMax = extent(ctx.xRange);
  const yRangeMinMax = extent(ctx.yRange);
  function showRule(value, axis) {
    switch (typeof value) {
      case "boolean":
        return value;
      case "string":
        return true;
      default:
        if (axis === "x") {
          return ctx.xScale(value) >= xRangeMinMax[0] && ctx.xScale(value) <= xRangeMinMax[1];
        } else {
          return ctx.yScale(value) >= yRangeMinMax[0] && ctx.yScale(value) <= yRangeMinMax[1];
        }
    }
  }
  Group($$payload, {
    class: layerClass("rule-g"),
    children: ($$payload2) => {
      if (showRule(x, "x")) {
        $$payload2.out += "<!--[-->";
        const xCoord = x === true || x === "left" ? xRangeMinMax[0] : x === "right" ? xRangeMinMax[1] : ctx.xScale(x) + xOffset;
        if (ctx.radial) {
          $$payload2.out += "<!--[-->";
          const [x1, y1] = pointRadial(xCoord, Number(yRangeMinMax[0]));
          const [x2, y2] = pointRadial(xCoord, Number(yRangeMinMax[1]));
          Line($$payload2, spread_props([
            restProps,
            {
              x1,
              y1,
              x2,
              y2,
              class: cls(layerClass("rule-x-radial-line"), "stroke-surface-content/10", className)
            }
          ]));
        } else {
          $$payload2.out += "<!--[!-->";
          Line($$payload2, spread_props([
            restProps,
            {
              x1: xCoord,
              x2: xCoord,
              y1: ctx.yRange[0] || 0,
              y2: ctx.yRange[1] || 0,
              class: cls(layerClass("rule-x-line"), "stroke-surface-content/50", className)
            }
          ]));
        }
        $$payload2.out += `<!--]-->`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> `;
      if (showRule(y, "y")) {
        $$payload2.out += "<!--[-->";
        if (ctx.radial) {
          $$payload2.out += "<!--[-->";
          Circle($$payload2, {
            r: y === true || y === "bottom" ? yRangeMinMax[1] : y === "top" ? yRangeMinMax[0] : ctx.yScale(y) + yOffset,
            class: cls(layerClass("rule-y-radial-circle"), "fill-none stroke-surface-content/50", className)
          });
        } else {
          $$payload2.out += "<!--[!-->";
          Line($$payload2, spread_props([
            restProps,
            {
              x1: ctx.xRange[0] || 0,
              x2: ctx.xRange[1] || 0,
              y1: y === true || y === "bottom" ? yRangeMinMax[1] : y === "top" ? yRangeMinMax[0] : ctx.yScale(y) + yOffset,
              y2: y === true || y === "bottom" ? yRangeMinMax[1] : y === "top" ? yRangeMinMax[0] : ctx.yScale(y) + yOffset,
              class: cls(layerClass("rule-y-line"), "stroke-surface-content/50", className)
            }
          ]));
        }
        $$payload2.out += `<!--]-->`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]-->`;
    },
    $$slots: { default: true }
  });
  pop();
}
function getPathLength(pathRef) {
  return 0;
}
function Text($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    value,
    x = 0,
    initialX = x,
    y = 0,
    initialY = y,
    dx = 0,
    dy = 0,
    lineHeight = "1em",
    capHeight = "0.71em",
    width,
    scaleToFit = false,
    textAnchor = "start",
    verticalAnchor = "end",
    dominantBaseline = "auto",
    rotate,
    opacity = 1,
    strokeWidth = 0,
    stroke,
    fill,
    fillOpacity,
    motion,
    svgRef: svgRefProp = void 0,
    ref: refProp = void 0,
    class: className,
    svgProps = {},
    truncate = false,
    path: path2,
    pathId = createId("text-path", uid),
    startOffset = "0%",
    transform: transformProp,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const renderCtx = getRenderContext();
  let style = void 0;
  const resolvedWidth = path2 ? getPathLength() : width;
  const defaultTruncateOptions = {
    maxChars: void 0,
    position: "end",
    maxWidth: resolvedWidth
  };
  const truncateConfig = (() => {
    if (typeof truncate === "boolean") {
      if (truncate) return defaultTruncateOptions;
      return false;
    }
    return { ...defaultTruncateOptions, ...truncate };
  })();
  const rawText = value != null ? value.toString().replace(/\\n/g, "\n") : "";
  const textValue = (() => {
    if (!truncateConfig) return rawText;
    return truncateText(rawText, truncateConfig);
  })();
  const spaceWidth = getStringWidth(" ", style) || 0;
  const wordsByLines = (() => {
    const lines = textValue.split("\n");
    return lines.flatMap((line2) => {
      const words = line2.split(/(?:(?!\u00A0+)\s+)/);
      if (width == null) {
        return [{ words }];
      } else {
        return words.reduce(
          (result, item) => {
            const currentLine = result[result.length - 1];
            const itemWidth = getStringWidth(item, style) || 0;
            if (currentLine && (width == null || scaleToFit || (currentLine.width || 0) + itemWidth + spaceWidth < width)) {
              currentLine.words.push(item);
              currentLine.width = currentLine.width || 0;
              currentLine.width += itemWidth + spaceWidth;
            } else {
              const newLine = { words: [item], width: itemWidth };
              result.push(newLine);
            }
            return result;
          },
          []
        );
      }
    });
  })();
  const lineCount = wordsByLines.length;
  function getPixelValue(cssValue) {
    if (typeof cssValue === "number") return cssValue;
    const result = cssValue.match(/([\d.]+)(\D+)/);
    const number = Number(result?.[1]);
    switch (result?.[2]) {
      case "px":
        return number;
      case "em":
      case "rem":
        return number * 16;
      default:
        return 0;
    }
  }
  const startDy = (() => {
    if (verticalAnchor === "start") {
      return getPixelValue(capHeight);
    } else if (verticalAnchor === "middle") {
      return (lineCount - 1) / 2 * -getPixelValue(lineHeight) + getPixelValue(capHeight) / 2;
    } else {
      return (lineCount - 1) * -getPixelValue(lineHeight);
    }
  })();
  (() => {
    if (verticalAnchor === "start") {
      return getPixelValue(capHeight);
    } else if (verticalAnchor === "middle") {
      return 0 / 2 * -getPixelValue(lineHeight) + getPixelValue(capHeight) / 2;
    } else {
      return 0 * -getPixelValue(lineHeight);
    }
  })();
  const scaleTransform = (() => {
    if (scaleToFit && lineCount > 0 && typeof x == "number" && typeof y == "number" && typeof width == "number") {
      const lineWidth = wordsByLines[0].width || 1;
      const sx = width / lineWidth;
      const sy = sx;
      const originX = x - sx * x;
      const originY = y - sy * y;
      return `matrix(${sx}, 0, 0, ${sy}, ${originX}, ${originY})`;
    } else {
      return "";
    }
  })();
  const rotateTransform = rotate ? `rotate(${rotate}, ${x}, ${y})` : "";
  const transform = transformProp ?? `${scaleTransform} ${rotateTransform}`;
  function isValidXOrY(xOrY) {
    return (
      // number that is not NaN or Infinity
      typeof xOrY === "number" && Number.isFinite(xOrY) || // for percentage
      typeof xOrY === "string"
    );
  }
  const motionX = createMotion(initialX, () => x, motion);
  const motionY = createMotion(initialY, () => y, motion);
  createKey(() => fill);
  createKey(() => stroke);
  if (renderCtx === "canvas") {
    registerCanvasComponent();
  }
  if (renderCtx === "svg") {
    $$payload.out += "<!--[-->";
    $$payload.out += `<svg${spread_attributes(
      {
        x: dx,
        y: dy,
        ...svgProps,
        class: clsx$1(cls(layerClass("text-svg"), "overflow-visible [paint-order:stroke]", svgProps?.class))
      },
      null,
      void 0,
      void 0,
      3
    )}>`;
    if (path2) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<defs><!---->`;
      {
        $$payload.out += `<path${attr("id", pathId)}${attr("d", path2)}></path>`;
      }
      $$payload.out += `<!----></defs><text${spread_attributes(
        {
          dy,
          ...restProps,
          fill,
          "fill-opacity": fillOpacity,
          stroke,
          "stroke-width": strokeWidth,
          opacity,
          transform: transformProp,
          class: clsx$1(cls(layerClass("text"), fill === void 0 && "fill-surface-content", className))
        },
        null,
        void 0,
        void 0,
        3
      )}><textPath${attr_style(`text-anchor: ${stringify(textAnchor)};`)}${attr("dominant-baseline", dominantBaseline)}${attr("href", `#${stringify(pathId)}`)}${attr("startOffset", startOffset)}${attr_class(clsx$1(cls(layerClass("text-path"))))}>${escape_html(wordsByLines.map((line2) => line2.words.join(" ")).join())}</textPath></text>`;
    } else if (isValidXOrY(x) && isValidXOrY(y)) {
      $$payload.out += "<!--[1-->";
      const each_array = ensure_array_like(wordsByLines);
      $$payload.out += `<text${spread_attributes(
        {
          x: motionX.current,
          y: motionY.current,
          transform,
          "text-anchor": textAnchor,
          "dominant-baseline": dominantBaseline,
          ...restProps,
          fill,
          "fill-opacity": fillOpacity,
          stroke,
          "stroke-width": strokeWidth,
          opacity,
          class: clsx$1(cls(layerClass("text"), fill === void 0 && "fill-surface-content", className))
        },
        null,
        void 0,
        void 0,
        3
      )}><!--[-->`;
      for (let index = 0, $$length = each_array.length; index < $$length; index++) {
        let line2 = each_array[index];
        $$payload.out += `<tspan${attr("x", motionX.current)}${attr("dy", index === 0 ? startDy : lineHeight)}${attr_class(clsx$1(layerClass("text-tspan")))}>${escape_html(line2.words.join(" "))}</tspan>`;
      }
      $$payload.out += `<!--]--></text>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></svg>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { svgRef: svgRefProp, ref: refProp });
  pop();
}
function getDurationFormat(duration, multiline = false) {
  return function(date, i) {
    if (+duration >= +new Duration({ duration: { years: 1 } })) {
      return format$1(date, "year");
    } else if (+duration >= +new Duration({ duration: { days: 28 } })) {
      const isFirst = i === 0 || +timeYear.floor(date) === +date;
      if (multiline) {
        return format$1(date, "month", { variant: "short" }) + (isFirst ? `
${format$1(date, "year")}` : "");
      } else {
        return format$1(date, "month", { variant: "short" }) + (isFirst ? ` '${format$1(date, "year", { variant: "short" })}` : "");
      }
    } else if (+duration >= +new Duration({ duration: { days: 1 } })) {
      const isFirst = i === 0 || date.getDate() <= duration.days;
      if (multiline) {
        return format$1(date, "custom", { custom: DateToken.DayOfMonth_numeric }) + (isFirst ? `
${format$1(date, "month", { variant: "short" })}` : "");
      } else {
        return format$1(date, "day", { variant: "short" });
      }
    } else if (+duration >= +new Duration({ duration: { hours: 1 } })) {
      const isFirst = i === 0 || +timeDay.floor(date) === +date;
      if (multiline) {
        return format$1(date, "custom", { custom: DateToken.Hour_numeric }) + (isFirst ? `
${format$1(date, "day", { variant: "short" })}` : "");
      } else {
        return isFirst ? format$1(date, "day", { variant: "short" }) : format$1(date, "custom", { custom: DateToken.Hour_numeric });
      }
    } else if (+duration >= +new Duration({ duration: { minutes: 1 } })) {
      const isFirst = i === 0 || +timeDay.floor(date) === +date;
      if (multiline) {
        return format$1(date, "time", { variant: "short" }) + (isFirst ? `
${format$1(date, "day", { variant: "short" })}` : "");
      } else {
        return format$1(date, "time", { variant: "short" });
      }
    } else if (+duration >= +new Duration({ duration: { seconds: 1 } })) {
      const isFirst = i === 0 || +timeDay.floor(date) === +date;
      return format$1(date, "time") + (multiline && isFirst ? `
${format$1(date, "day", { variant: "short" })}` : "");
    } else if (+duration >= +new Duration({ duration: { milliseconds: 1 } })) {
      const isFirst = i === 0 || +timeDay.floor(date) === +date;
      return format$1(date, "custom", {
        custom: [
          DateToken.Hour_2Digit,
          DateToken.Minute_2Digit,
          DateToken.Second_2Digit,
          DateToken.MiliSecond_3,
          DateToken.Hour_woAMPM
        ]
      }) + (multiline && isFirst ? `
${format$1(date, "day", { variant: "short" })}` : "");
    } else {
      return date.toString();
    }
  };
}
function resolveTickVals(scale, ticks, count) {
  if (Array.isArray(ticks))
    return ticks;
  if (typeof ticks === "function")
    return ticks(scale) ?? [];
  if (isLiteralObject(ticks) && "interval" in ticks) {
    if (ticks.interval === null || !("ticks" in scale) || typeof scale.ticks !== "function") {
      return [];
    }
    return scale.ticks(ticks.interval);
  }
  if (isScaleBand(scale)) {
    return ticks && typeof ticks === "number" ? scale.domain().filter((_, i) => i % ticks === 0) : scale.domain();
  }
  if (scale.ticks && typeof scale.ticks === "function") {
    return scale.ticks(count ?? (typeof ticks === "number" ? ticks : void 0));
  }
  return [];
}
function resolveTickFormat(scale, ticks, count, formatType, multiline = false) {
  if (formatType) {
    return (tick) => format$1(tick, formatType);
  }
  if (isScaleTime(scale) && count) {
    if (isLiteralObject(ticks) && "interval" in ticks && ticks.interval != null) {
      const start = ticks.interval.floor(/* @__PURE__ */ new Date());
      const end = ticks.interval.ceil(/* @__PURE__ */ new Date());
      return getDurationFormat(new Duration({ start, end }), multiline);
    } else {
      const [start, end] = timeTicks(scale.domain()[0], scale.domain()[1], count);
      return getDurationFormat(new Duration({ start, end }), multiline);
    }
  }
  if (scale.tickFormat) {
    return scale.tickFormat(count);
  }
  return (tick) => `${tick}`;
}
function Axis($$payload, $$props) {
  push();
  let {
    placement,
    label = "",
    labelPlacement = "middle",
    labelProps,
    rule = false,
    grid = false,
    ticks,
    tickSpacing = ["top", "bottom", "angle"].includes(placement) ? 80 : ["left", "right", "radius"].includes(placement) ? 50 : void 0,
    tickMultiline = false,
    tickLength = 4,
    tickMarks = true,
    format: format2,
    tickLabelProps,
    motion,
    transitionIn,
    transitionInParams,
    scale: scaleProp,
    classes = {},
    class: className,
    tickLabel,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const ctx = getChartContext();
  const orientation = placement === "angle" ? "angle" : placement === "radius" ? "radius" : ["top", "bottom"].includes(placement) ? "horizontal" : "vertical";
  const scale = scaleProp ?? (["horizontal", "angle"].includes(orientation) ? ctx.xScale : ctx.yScale);
  const xRangeMinMax = extent(ctx.xRange);
  const yRangeMinMax = extent(ctx.yRange);
  const ctxSize = orientation === "vertical" ? ctx.height : orientation === "horizontal" ? ctx.width : orientation === "radius" ? ctx.height / 2 : orientation === "angle" ? ctx.width : null;
  const tickCount = typeof ticks === "number" ? ticks : tickSpacing && ctxSize ? Math.round(ctxSize / tickSpacing) : void 0;
  const tickVals = resolveTickVals(scale, ticks, tickCount);
  const tickFormat = resolveTickFormat(scale, ticks, tickCount, format2, tickMultiline);
  function getCoords(tick) {
    switch (placement) {
      case "top":
        return {
          x: scale(tick) + (isScaleBand(scale) ? scale.bandwidth() / 2 : 0),
          y: yRangeMinMax[0]
        };
      case "bottom":
        return {
          x: scale(tick) + (isScaleBand(scale) ? scale.bandwidth() / 2 : 0),
          y: yRangeMinMax[1]
        };
      case "left":
        return {
          x: xRangeMinMax[0],
          y: scale(tick) + (isScaleBand(scale) ? scale.bandwidth() / 2 : 0)
        };
      case "right":
        return {
          x: xRangeMinMax[1],
          y: scale(tick) + (isScaleBand(scale) ? scale.bandwidth() / 2 : 0)
        };
      case "angle":
        return { x: scale(tick), y: yRangeMinMax[1] };
      case "radius":
        return {
          x: xRangeMinMax[0],
          y: scale(tick) + (isScaleBand(scale) ? scale.bandwidth() / 2 : 0)
        };
    }
  }
  function getDefaultTickLabelProps(tick) {
    switch (placement) {
      case "top":
        return {
          textAnchor: "middle",
          verticalAnchor: "end",
          dy: -tickLength - 2
          // manually adjusted until Text supports custom styles
        };
      case "bottom":
        return {
          textAnchor: "middle",
          verticalAnchor: "start",
          dy: tickLength
          // manually adjusted until Text supports custom styles
        };
      case "left":
        return {
          textAnchor: "end",
          verticalAnchor: "middle",
          dx: -tickLength,
          dy: -2
          // manually adjusted until Text supports custom styles
        };
      case "right":
        return {
          textAnchor: "start",
          verticalAnchor: "middle",
          dx: tickLength,
          dy: -2
          // manually adjusted until Text supports custom styles
        };
      case "angle":
        const xValue = scale(tick);
        return {
          textAnchor: xValue === 0 || Math.abs(xValue - Math.PI) < 0.01 || // ~180deg
          Math.abs(xValue - Math.PI * 2) < 0.01 ? (
            // ~360deg
            "middle"
          ) : xValue > Math.PI ? "end" : "start",
          // angle in radians
          // ~360deg
          verticalAnchor: "middle",
          dx: Math.sin(xValue) * (tickLength + 2),
          dy: -Math.cos(xValue) * (tickLength + 4)
          // manually adjusted until Text supports custom styles
        };
      case "radius":
        return {
          textAnchor: "middle",
          verticalAnchor: "middle",
          dx: 2,
          dy: -2
          // manually adjusted until Text supports custom styles
        };
    }
  }
  const resolvedLabelX = (() => {
    if (placement === "left" || orientation === "horizontal" && labelPlacement === "start") {
      return -ctx.padding.left;
    } else if (placement === "right" || orientation === "horizontal" && labelPlacement === "end") {
      return ctx.width + ctx.padding.right;
    }
    return ctx.width / 2;
  })();
  const resolvedLabelY = (() => {
    if (placement === "top" || orientation === "vertical" && labelPlacement === "start") {
      return -ctx.padding.top;
    } else if (orientation === "vertical" && labelPlacement === "middle") {
      return ctx.height / 2;
    } else if (placement === "bottom" || labelPlacement === "end") {
      return ctx.height + ctx.padding.bottom;
    }
    return "0";
  })();
  const resolvedLabelTextAnchor = (() => {
    if (labelPlacement === "middle") {
      return "middle";
    } else if (placement === "right" || orientation === "horizontal" && labelPlacement === "end") {
      return "end";
    }
    return "start";
  })();
  const resolvedLabelVerticalAnchor = (() => {
    if (placement === "top" || orientation === "vertical" && labelPlacement === "start" || placement === "left" && labelPlacement === "middle") {
      return "start";
    }
    return "end";
  })();
  const resolvedLabelProps = {
    value: typeof label === "function" ? "" : void 0,
    x: resolvedLabelX,
    y: resolvedLabelY,
    textAnchor: resolvedLabelTextAnchor,
    verticalAnchor: resolvedLabelVerticalAnchor,
    rotate: orientation === "vertical" && labelPlacement === "middle" ? -90 : 0,
    capHeight: ".5rem",
    // text-[10px]
    ...labelProps,
    class: cls(layerClass("axis-label"), "text-[10px] stroke-surface-100 [stroke-width:2px] font-light", classes.label, labelProps?.class)
  };
  Group($$payload, spread_props([
    restProps,
    {
      "data-placement": placement,
      class: cls(layerClass("axis"), `placement-${placement}`, classes.root, className),
      children: ($$payload2) => {
        const each_array = ensure_array_like(tickVals);
        if (rule !== false) {
          $$payload2.out += "<!--[-->";
          const ruleProps = extractLayerProps(rule, "axis-rule");
          Rule($$payload2, spread_props([
            {
              x: placement === "left" || placement === "right" ? placement : placement === "angle",
              y: placement === "top" || placement === "bottom" ? placement : placement === "radius",
              motion
            },
            ruleProps,
            {
              class: cls("stroke-surface-content/50", classes.rule, ruleProps?.class)
            }
          ]));
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--> `;
        if (typeof label === "function") {
          $$payload2.out += "<!--[-->";
          label($$payload2, { props: resolvedLabelProps });
          $$payload2.out += `<!---->`;
        } else if (label) {
          $$payload2.out += "<!--[1-->";
          Text($$payload2, spread_props([resolvedLabelProps]));
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--> <!--[-->`;
        for (let index = 0, $$length = each_array.length; index < $$length; index++) {
          let tick = each_array[index];
          const tickCoords = getCoords(tick);
          const [radialTickCoordsX, radialTickCoordsY] = pointRadial(tickCoords.x, tickCoords.y);
          const [radialTickMarkCoordsX, radialTickMarkCoordsY] = pointRadial(tickCoords.x, tickCoords.y + tickLength);
          const resolvedTickLabelProps = {
            x: orientation === "angle" ? radialTickCoordsX : tickCoords.x,
            y: orientation === "angle" ? radialTickCoordsY : tickCoords.y,
            value: tickFormat(tick, index),
            ...getDefaultTickLabelProps(tick),
            motion,
            ...tickLabelProps,
            class: cls(layerClass("axis-tick-label"), "text-[10px] stroke-surface-100 [stroke-width:2px] font-light", classes.tickLabel, tickLabelProps?.class)
          };
          Group($$payload2, {
            transitionIn,
            transitionInParams,
            class: layerClass("axis-tick-group"),
            children: ($$payload3) => {
              if (grid !== false) {
                $$payload3.out += "<!--[-->";
                const ruleProps = extractLayerProps(grid, "axis-grid");
                Rule($$payload3, spread_props([
                  {
                    x: orientation === "horizontal" || orientation === "angle" ? tick : false,
                    y: orientation === "vertical" || orientation === "radius" ? tick : false,
                    motion
                  },
                  ruleProps,
                  {
                    class: cls("stroke-surface-content/10", classes.rule, ruleProps?.class)
                  }
                ]));
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]--> `;
              if (tickMarks) {
                $$payload3.out += "<!--[-->";
                const tickClasses = cls(layerClass("axis-tick"), "stroke-surface-content/50", classes.tick);
                if (orientation === "horizontal") {
                  $$payload3.out += "<!--[-->";
                  Line($$payload3, {
                    x1: tickCoords.x,
                    y1: tickCoords.y,
                    x2: tickCoords.x,
                    y2: tickCoords.y + (placement === "top" ? -tickLength : tickLength),
                    motion,
                    class: tickClasses
                  });
                } else if (orientation === "vertical") {
                  $$payload3.out += "<!--[1-->";
                  Line($$payload3, {
                    x1: tickCoords.x,
                    y1: tickCoords.y,
                    x2: tickCoords.x + (placement === "left" ? -tickLength : tickLength),
                    y2: tickCoords.y,
                    motion,
                    class: tickClasses
                  });
                } else if (orientation === "angle") {
                  $$payload3.out += "<!--[2-->";
                  Line($$payload3, {
                    x1: radialTickCoordsX,
                    y1: radialTickCoordsY,
                    x2: radialTickMarkCoordsX,
                    y2: radialTickMarkCoordsY,
                    motion,
                    class: tickClasses
                  });
                } else {
                  $$payload3.out += "<!--[!-->";
                }
                $$payload3.out += `<!--]-->`;
              } else {
                $$payload3.out += "<!--[!-->";
              }
              $$payload3.out += `<!--]--> `;
              if (tickLabel) {
                $$payload3.out += "<!--[-->";
                tickLabel($$payload3, { props: resolvedTickLabelProps, index });
                $$payload3.out += `<!---->`;
              } else {
                $$payload3.out += "<!--[!-->";
                Text($$payload3, spread_props([resolvedTickLabelProps]));
              }
              $$payload3.out += `<!--]-->`;
            },
            $$slots: { default: true }
          });
        }
        $$payload2.out += `<!--]-->`;
      },
      $$slots: { default: true }
    }
  ]));
  pop();
}
function Grid($$payload, $$props) {
  push();
  const ctx = getChartContext();
  let {
    x = false,
    y = false,
    xTicks,
    yTicks: yTicksProp,
    bandAlign = "center",
    radialY = "circle",
    motion,
    transitionIn: transitionInProp,
    transitionInParams = { easing: cubicIn },
    classes = {},
    class: className,
    ref: refProp = void 0,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let ref = void 0;
  const yTicks = yTicksProp ?? (!isScaleBand(ctx.yScale) ? 4 : void 0);
  const tweenConfig = extractTweenConfig(motion);
  const transitionIn = transitionInProp ?? tweenConfig?.options ? fade : () => ({});
  const xTickVals = resolveTickVals(ctx.xScale, xTicks);
  const yTickVals = resolveTickVals(ctx.yScale, yTicks);
  const xBandOffset = isScaleBand(ctx.xScale) ? bandAlign === "between" ? -(ctx.xScale.padding() * ctx.xScale.step()) / 2 : ctx.xScale.step() / 2 - ctx.xScale.padding() * ctx.xScale.step() / 2 : 0;
  const yBandOffset = isScaleBand(ctx.yScale) ? bandAlign === "between" ? -(ctx.yScale.padding() * ctx.yScale.step()) / 2 : ctx.yScale.step() / 2 - ctx.yScale.padding() * ctx.yScale.step() / 2 : 0;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    Group($$payload2, spread_props([
      {
        class: cls(layerClass("grid"), classes.root, className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        },
        children: ($$payload3) => {
          if (x) {
            $$payload3.out += "<!--[-->";
            const splineProps = extractLayerProps(x, "grid-x-line");
            Group($$payload3, {
              transitionIn,
              transitionInParams,
              class: layerClass("grid-x"),
              children: ($$payload4) => {
                const each_array = ensure_array_like(xTickVals);
                $$payload4.out += `<!--[-->`;
                for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                  let x2 = each_array[$$index];
                  if (ctx.radial) {
                    $$payload4.out += "<!--[-->";
                    const [x1, y1] = pointRadial(ctx.xScale(x2), ctx.yRange[0]);
                    const [x22, y2] = pointRadial(ctx.xScale(x2), ctx.yRange[1]);
                    Line($$payload4, spread_props([
                      { x1, y1, x2: x22, y2, motion: tweenConfig },
                      splineProps,
                      {
                        class: cls(layerClass("grid-x-radial-line"), "stroke-surface-content/10", classes.line, splineProps?.class)
                      }
                    ]));
                  } else {
                    $$payload4.out += "<!--[!-->";
                    Rule($$payload4, spread_props([
                      { x: x2, xOffset: xBandOffset, motion },
                      splineProps,
                      {
                        class: cls(layerClass("grid-x-rule"), "stroke-surface-content/10", classes.line, splineProps?.class)
                      }
                    ]));
                  }
                  $$payload4.out += `<!--]-->`;
                }
                $$payload4.out += `<!--]--> `;
                if (isScaleBand(ctx.xScale) && bandAlign === "between" && !ctx.radial && xTickVals.length) {
                  $$payload4.out += "<!--[-->";
                  Rule($$payload4, spread_props([
                    {
                      x: xTickVals[xTickVals.length - 1],
                      xOffset: ctx.xScale.step() + xBandOffset,
                      motion
                    },
                    splineProps,
                    {
                      class: cls(layerClass("grid-x-end-rule"), "stroke-surface-content/10", classes.line, splineProps?.class)
                    }
                  ]));
                } else {
                  $$payload4.out += "<!--[!-->";
                }
                $$payload4.out += `<!--]-->`;
              },
              $$slots: { default: true }
            });
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--> `;
          if (y) {
            $$payload3.out += "<!--[-->";
            const splineProps = extractLayerProps(y, "grid-y-line");
            Group($$payload3, {
              transitionIn,
              transitionInParams,
              class: layerClass("grid-y"),
              children: ($$payload4) => {
                const each_array_1 = ensure_array_like(yTickVals);
                $$payload4.out += `<!--[-->`;
                for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                  let y2 = each_array_1[$$index_1];
                  if (ctx.radial) {
                    $$payload4.out += "<!--[-->";
                    if (radialY === "circle") {
                      $$payload4.out += "<!--[-->";
                      Circle($$payload4, spread_props([
                        { r: ctx.yScale(y2) + yBandOffset, motion },
                        splineProps,
                        {
                          class: cls(layerClass("grid-y-radial-circle"), "fill-none stroke-surface-content/10", classes.line, splineProps?.class)
                        }
                      ]));
                    } else {
                      $$payload4.out += "<!--[!-->";
                      Spline($$payload4, spread_props([
                        {
                          data: xTickVals.map((x2) => ({ x: x2, y: y2 })),
                          x: "x",
                          y: "y",
                          motion: tweenConfig,
                          curve: curveLinearClosed
                        },
                        splineProps,
                        {
                          class: cls(layerClass("grid-y-radial-line"), "stroke-surface-content/10", classes.line, splineProps?.class)
                        }
                      ]));
                    }
                    $$payload4.out += `<!--]-->`;
                  } else {
                    $$payload4.out += "<!--[!-->";
                    Rule($$payload4, spread_props([
                      { y: y2, yOffset: yBandOffset, motion },
                      splineProps,
                      {
                        class: cls(layerClass("grid-y-rule"), "stroke-surface-content/10", classes.line, splineProps?.class)
                      }
                    ]));
                  }
                  $$payload4.out += `<!--]-->`;
                }
                $$payload4.out += `<!--]--> `;
                if (isScaleBand(ctx.yScale) && bandAlign === "between" && yTickVals.length) {
                  $$payload4.out += "<!--[-->";
                  if (ctx.radial) {
                    $$payload4.out += "<!--[-->";
                    Circle($$payload4, spread_props([
                      {
                        r: ctx.yScale(yTickVals[yTickVals.length - 1]) + ctx.yScale.step() + yBandOffset,
                        motion
                      },
                      splineProps,
                      {
                        class: cls(layerClass("grid-y-radial-circle"), "fill-none stroke-surface-content/10", classes.line, splineProps?.class)
                      }
                    ]));
                  } else {
                    $$payload4.out += "<!--[!-->";
                    Rule($$payload4, spread_props([
                      {
                        y: yTickVals[yTickVals.length - 1],
                        yOffset: ctx.yScale.step() + yBandOffset,
                        motion
                      },
                      splineProps,
                      {
                        class: cls(layerClass("grid-y-end-rule"), "stroke-surface-content/10", classes.line, splineProps?.class)
                      }
                    ]));
                  }
                  $$payload4.out += `<!--]-->`;
                } else {
                  $$payload4.out += "<!--[!-->";
                }
                $$payload4.out += `<!--]-->`;
              },
              $$slots: { default: true }
            });
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]-->`;
        },
        $$slots: { default: true }
      }
    ]));
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref: refProp });
  pop();
}
function resolveInsets(insets) {
  const all = insets?.all ?? 0;
  const x = insets?.x ?? all;
  const y = insets?.y ?? all;
  const left = insets?.left ?? x;
  const right = insets?.right ?? x;
  const top = insets?.top ?? y;
  const bottom = insets?.bottom ?? y;
  return { left, right, bottom, top };
}
function createDimensionGetter(ctx, getOptions) {
  const options = getOptions?.();
  return (item) => {
    const insets = resolveInsets(options?.insets);
    const xDomainMinMax = ctx.xScale.domain();
    const yDomainMinMax = ctx.yScale.domain();
    const _x = accessor(options?.x ?? ctx.x);
    const _y = accessor(options?.y ?? ctx.y);
    const _x1 = accessor(options?.x1 ?? ctx.x1);
    const _y1 = accessor(options?.y1 ?? ctx.y1);
    if (isScaleBand(ctx.yScale)) {
      const y = firstValue(ctx.yScale(_y(item)) ?? 0) + (ctx.y1Scale ? ctx.y1Scale(_y1(item)) : 0) + insets.top;
      const height = Math.max(0, ctx.yScale.bandwidth ? (ctx.y1Scale ? ctx.y1Scale.bandwidth?.() ?? 0 : ctx.yScale.bandwidth()) - insets.bottom - insets.top : 0);
      const xValue = _x(item);
      let left = 0;
      let right = 0;
      if (Array.isArray(xValue)) {
        left = min$2(xValue);
        right = max$2(xValue);
      } else if (xValue == null) {
        left = 0;
        right = 0;
      } else if (xValue > 0) {
        left = max$2([0, xDomainMinMax[0]]);
        right = xValue;
      } else {
        left = xValue;
        right = min$2([0, xDomainMinMax[1]]);
      }
      const x = ctx.xScale(left) + insets.left;
      const width = Math.max(0, ctx.xScale(right) - ctx.xScale(left) - insets.left - insets.right);
      return { x, y, width, height };
    } else {
      const x = firstValue(ctx.xScale(_x(item))) + (ctx.x1Scale ? ctx.x1Scale(_x1(item)) : 0) + insets.left;
      const width = Math.max(0, ctx.xScale.bandwidth ? (ctx.x1Scale ? ctx.x1Scale.bandwidth?.() ?? 0 : ctx.xScale.bandwidth()) - insets.left - insets.right : 0);
      const yValue = _y(item);
      let top = 0;
      let bottom = 0;
      if (Array.isArray(yValue)) {
        top = max$2(yValue);
        bottom = min$2(yValue);
      } else if (yValue == null) {
        top = 0;
        bottom = 0;
      } else if (yValue > 0) {
        top = yValue;
        bottom = max$2([0, yDomainMinMax[0]]);
      } else {
        top = min$2([0, yDomainMinMax[1]]);
        bottom = yValue;
      }
      const y = ctx.yScale(top) + insets.top;
      const height = ctx.yScale(bottom) - ctx.yScale(top) - insets.bottom - insets.top;
      return { x, y, width, height };
    }
  };
}
function firstValue(value) {
  return Array.isArray(value) ? value[0] : value;
}
function Bar($$payload, $$props) {
  push();
  const ctx = getChartContext();
  let {
    data,
    x = ctx.x,
    y = ctx.y,
    x1,
    y1,
    fill,
    fillOpacity,
    stroke: strokeProp = "black",
    strokeWidth = 0,
    opacity,
    radius = 0,
    rounded: roundedProp = "all",
    motion,
    insets,
    initialX,
    initialY,
    initialHeight,
    initialWidth,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const stroke = strokeProp === null || strokeProp === void 0 ? "black" : strokeProp;
  const getDimensions = createDimensionGetter(ctx, () => ({ x, y, x1, y1, insets }));
  const dimensions = getDimensions(data) ?? { x: 0, y: 0, width: 0, height: 0 };
  const isVertical = isScaleBand(ctx.xScale);
  const valueAccessor = accessor(isVertical ? y : x);
  const value = valueAccessor(data);
  const resolvedValue = Array.isArray(value) ? greatestAbs(value) : value;
  const rounded = roundedProp === "edge" ? isVertical ? resolvedValue >= 0 ? "top" : "bottom" : resolvedValue >= 0 ? "right" : "left" : roundedProp;
  const topLeft = ["all", "top", "left", "top-left"].includes(rounded);
  const topRight = ["all", "top", "right", "top-right"].includes(rounded);
  const bottomLeft = ["all", "bottom", "left", "bottom-left"].includes(rounded);
  const bottomRight = ["all", "bottom", "right", "bottom-right"].includes(rounded);
  const width = dimensions.width;
  const height = dimensions.height;
  const diameter = 2 * radius;
  const pathData = `M${dimensions.x + radius},${dimensions.y} h${width - diameter}
      ${topRight ? `a${radius},${radius} 0 0 1 ${radius},${radius}` : `h${radius}v${radius}`}
      v${height - diameter}
      ${bottomRight ? `a${radius},${radius} 0 0 1 ${-radius},${radius}` : `v${radius}h${-radius}`}
      h${diameter - width}
      ${bottomLeft ? `a${radius},${radius} 0 0 1 ${-radius},${-radius}` : `h${-radius}v${-radius}`}
      v${diameter - height}
      ${topLeft ? `a${radius},${radius} 0 0 1 ${radius},${-radius}` : `v${-radius}h${radius}`}
      z`.split("\n").join("");
  if (ctx.radial) {
    $$payload.out += "<!--[-->";
    Arc($$payload, spread_props([
      {
        innerRadius: dimensions.y,
        outerRadius: dimensions.y + dimensions.height,
        startAngle: dimensions.x,
        endAngle: dimensions.x + dimensions.width,
        fill,
        fillOpacity,
        stroke,
        strokeWidth,
        opacity,
        cornerRadius: radius
      },
      extractLayerProps(restProps, "bar")
    ]));
  } else if (rounded === "all" || rounded === "none" || radius === 0) {
    $$payload.out += "<!--[1-->";
    Rect($$payload, spread_props([
      {
        fill,
        fillOpacity,
        stroke,
        strokeWidth,
        opacity,
        rx: rounded === "none" ? 0 : radius,
        motion,
        initialX,
        initialY,
        initialHeight,
        initialWidth
      },
      dimensions,
      extractLayerProps(restProps, "bar")
    ]));
  } else {
    $$payload.out += "<!--[!-->";
    const tweenMotion = extractTweenConfig(motion);
    Spline($$payload, spread_props([
      {
        pathData,
        fill,
        fillOpacity,
        stroke,
        strokeWidth,
        opacity,
        motion: tweenMotion
      },
      extractLayerProps(restProps, "bar")
    ]));
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function Highlight($$payload, $$props) {
  push();
  const ctx = getChartContext();
  const tooltipCtx = getTooltipContext();
  let {
    data,
    x: xProp = ctx.x,
    y: yProp = ctx.y,
    axis: axisProp,
    points = false,
    lines: linesProp = false,
    area = false,
    bar = false,
    motion = "spring",
    onAreaClick,
    onBarClick,
    onPointClick,
    onPointEnter,
    onPointLeave
  } = $$props;
  const x = accessor(xProp);
  const y = accessor(yProp);
  const highlightData = data ?? tooltipCtx.data;
  const xValue = x(highlightData);
  const xCoord = Array.isArray(xValue) ? xValue.map((v) => ctx.xScale(v)) : ctx.xScale(xValue);
  const xOffset = isScaleBand(ctx.xScale) && !ctx.radial ? ctx.xScale.bandwidth() / 2 : 0;
  const yValue = y(highlightData);
  const yCoord = Array.isArray(yValue) ? yValue.map((v) => ctx.yScale(v)) : ctx.yScale(yValue);
  const yOffset = isScaleBand(ctx.yScale) && !ctx.radial ? ctx.yScale.bandwidth() / 2 : 0;
  const axis = axisProp == null ? isScaleBand(ctx.yScale) ? "y" : "x" : axisProp;
  const _lines = (() => {
    let tmpLines = [];
    if (!highlightData) return tmpLines;
    if (axis === "x" || axis === "both") {
      if (Array.isArray(xCoord)) {
        tmpLines = [
          ...tmpLines,
          ...xCoord.filter(notNull).map((xItem, i) => ({
            x1: xItem + xOffset,
            y1: min$2(ctx.yRange),
            x2: xItem + xOffset,
            y2: max$2(ctx.yRange)
          }))
        ];
      } else if (xCoord) {
        tmpLines = [
          ...tmpLines,
          {
            x1: xCoord + xOffset,
            y1: min$2(ctx.yRange),
            x2: xCoord + xOffset,
            y2: max$2(ctx.yRange)
          }
        ];
      }
    }
    if (axis === "y" || axis === "both") {
      if (Array.isArray(yCoord)) {
        tmpLines = [
          ...tmpLines,
          ...yCoord.filter(notNull).map((yItem, i) => ({
            x1: min$2(ctx.xRange),
            y1: yItem + yOffset,
            x2: max$2(ctx.xRange),
            y2: yItem + yOffset
          }))
        ];
      } else if (yCoord) {
        tmpLines = [
          ...tmpLines,
          {
            x1: min$2(ctx.xRange),
            y1: yCoord + yOffset,
            x2: max$2(ctx.xRange),
            y2: yCoord + yOffset
          }
        ];
      }
    }
    if (ctx.radial) {
      tmpLines = tmpLines.map((l) => {
        const [x1, y1] = pointRadial(l.x1, l.y1);
        const [x2, y2] = pointRadial(l.x2, l.y2);
        return { ...l, x1, y1, x2, y2 };
      });
    }
    return tmpLines;
  })();
  const _area = (() => {
    const tmpArea = { x: 0, y: 0, width: 0, height: 0 };
    if (!highlightData) return tmpArea;
    if (axis === "x" || axis === "both") {
      if (Array.isArray(xCoord)) {
        tmpArea.width = max$2(xCoord) - min$2(xCoord);
      } else if (isScaleBand(ctx.xScale)) {
        tmpArea.width = ctx.xScale.step();
      } else {
        const index = ctx.flatData.findIndex((d) => Number(x(d)) === Number(x(highlightData)));
        const isLastPoint = index + 1 === ctx.flatData.length;
        const nextDataPoint = isLastPoint ? max$2(ctx.xDomain) : x(ctx.flatData[index + 1]);
        tmpArea.width = (ctx.xScale(nextDataPoint) ?? 0) - (xCoord ?? 0);
      }
      tmpArea.x = (Array.isArray(xCoord) ? min$2(xCoord) : xCoord) - (isScaleBand(ctx.xScale) ? ctx.xScale.padding() * ctx.xScale.step() / 2 : 0);
      if (axis === "x") {
        tmpArea.y = min$2(ctx.yRange);
        tmpArea.height = max$2(ctx.yRange) - min$2(ctx.yRange);
      }
    }
    if (axis === "y" || axis === "both") {
      if (Array.isArray(yCoord)) {
        tmpArea.height = max$2(yCoord) - min$2(yCoord);
      } else if (isScaleBand(ctx.yScale)) {
        tmpArea.height = ctx.yScale.step();
      } else {
        const index = ctx.flatData.findIndex((d) => Number(x(d)) === Number(x(highlightData)));
        const isLastPoint = index + 1 === ctx.flatData.length;
        const nextDataPoint = isLastPoint ? max$2(ctx.yDomain) : x(ctx.flatData[index + 1]);
        tmpArea.height = (ctx.yScale(nextDataPoint) ?? 0) - (yCoord ?? 0);
      }
      tmpArea.y = (Array.isArray(yCoord) ? min$2(yCoord) : yCoord) - (isScaleBand(ctx.yScale) ? ctx.yScale.padding() * ctx.yScale.step() / 2 : 0);
      if (axis === "y") {
        tmpArea.width = max$2(ctx.xRange);
      }
    }
    return tmpArea;
  })();
  const _points = (() => {
    let tmpPoints = [];
    if (!highlightData) return tmpPoints;
    if (Array.isArray(xCoord)) {
      if (Array.isArray(highlightData)) {
        const highlightSeriesPoint = highlightData;
        if (Array.isArray(ctx.data)) {
          const seriesPointsData = ctx.data.map((series) => {
            return {
              series,
              point: series.find((d) => y(d) === y(highlightSeriesPoint))
            };
          }).filter((d) => d.point);
          tmpPoints = seriesPointsData.map((seriesPoint, i) => {
            return {
              x: ctx.xScale(seriesPoint.point[1]) + xOffset,
              y: yCoord + yOffset,
              fill: ctx.config.c ? ctx.cGet(seriesPoint.series) : null,
              data: { x: seriesPoint.point[1], y: yValue }
            };
          });
        }
      } else {
        tmpPoints = xCoord.filter(notNull).map((xItem, i) => {
          const _key = ctx.config.x?.[i];
          return {
            x: xItem + xOffset,
            y: yCoord + yOffset,
            // TODO: is there a better way to expose the series key/value?
            fill: ctx.config.c ? ctx.cGet({ ...highlightData, $key: _key }) : null,
            data: {
              x: xValue,
              // TODO: use highlightData[$key]?
              y: yValue
            }
          };
        });
      }
    } else if (Array.isArray(yCoord)) {
      if (Array.isArray(highlightData)) {
        const highlightSeriesPoint = highlightData;
        if (Array.isArray(ctx.data)) {
          const seriesPointsData = ctx.data.map((series) => {
            return {
              series,
              point: series.find((d) => x(d) === x(highlightSeriesPoint))
            };
          }).filter((d) => d.point);
          tmpPoints = seriesPointsData.map((seriesPoint, i) => ({
            x: xCoord + xOffset,
            y: ctx.yScale(seriesPoint.point[1]) + yOffset,
            fill: ctx.config.c ? ctx.cGet(seriesPoint.series) : null,
            data: { x: xValue, y: seriesPoint.point[1] }
          }));
        }
      } else {
        tmpPoints = yCoord.filter(notNull).map((yItem, i) => {
          const _key = ctx.config.y[i];
          return {
            x: xCoord + xOffset,
            y: yItem + yOffset,
            // TODO: is there a better way to expose the series key/value?
            fill: ctx.config.c ? ctx.cGet({ ...highlightData, $key: _key }) : null,
            data: {
              x: xValue,
              y: yValue
              // TODO: use highlightData[$key] ?
            }
          };
        });
      }
    } else if (xCoord != null && yCoord != null) {
      tmpPoints = [
        {
          x: xCoord + xOffset,
          y: yCoord + yOffset,
          fill: ctx.config.c ? ctx.cGet(highlightData) : null,
          data: { x: xValue, y: yValue }
        }
      ];
    } else {
      tmpPoints = [];
    }
    if (ctx.radial) {
      tmpPoints = tmpPoints.map((p) => {
        const [x2, y2] = pointRadial(p.x, p.y);
        return { ...p, x: x2, y: y2 };
      });
    }
    return tmpPoints;
  })();
  const areaProps = extractLayerProps(area, "highlight-area");
  const barProps = extractLayerProps(bar, "highlight-bar");
  const linesProps = extractLayerProps(linesProp, "highlight-line");
  const pointsProps = extractLayerProps(points, "highlight-point");
  if (highlightData) {
    $$payload.out += "<!--[-->";
    if (area) {
      $$payload.out += "<!--[-->";
      if (typeof area === "function") {
        $$payload.out += "<!--[-->";
        area($$payload, { area: _area });
        $$payload.out += `<!---->`;
      } else if (ctx.radial) {
        $$payload.out += "<!--[1-->";
        Arc($$payload, {
          motion: motion === "spring" ? "spring" : void 0,
          startAngle: _area.x,
          endAngle: _area.x + _area.width,
          innerRadius: _area.y,
          outerRadius: _area.y + _area.height,
          class: cls(!areaProps.fill && "fill-surface-content/5", areaProps.class),
          onclick: onAreaClick && ((e) => onAreaClick(e, { data: highlightData }))
        });
      } else {
        $$payload.out += "<!--[!-->";
        Rect($$payload, spread_props([
          {
            motion: motion === "spring" ? "spring" : void 0
          },
          _area,
          areaProps,
          {
            class: cls(!areaProps.fill && "fill-surface-content/5", areaProps.class),
            onclick: onAreaClick && ((e) => onAreaClick(e, { data: highlightData }))
          }
        ]));
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (bar) {
      $$payload.out += "<!--[-->";
      if (typeof bar === "function") {
        $$payload.out += "<!--[-->";
        bar($$payload);
        $$payload.out += `<!---->`;
      } else {
        $$payload.out += "<!--[!-->";
        Bar($$payload, spread_props([
          {
            motion: motion === "spring" ? "spring" : void 0,
            data: highlightData
          },
          barProps,
          {
            class: cls(!barProps.fill && "fill-primary", barProps.class),
            onclick: onBarClick && ((e) => onBarClick(e, { data: highlightData }))
          }
        ]));
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (linesProp) {
      $$payload.out += "<!--[-->";
      if (typeof linesProp === "function") {
        $$payload.out += "<!--[-->";
        linesProp($$payload, { lines: _lines });
        $$payload.out += `<!---->`;
      } else {
        $$payload.out += "<!--[!-->";
        const each_array = ensure_array_like(_lines);
        $$payload.out += `<!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let line2 = each_array[$$index];
          Line($$payload, spread_props([
            {
              motion: motion === "spring" ? "spring" : void 0,
              x1: line2.x1,
              y1: line2.y1,
              x2: line2.x2,
              y2: line2.y2
            },
            linesProps,
            {
              class: cls("stroke-surface-content/20 stroke-2 [stroke-dasharray:2,2] pointer-events-none", linesProps.class)
            }
          ]));
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> `;
    if (points) {
      $$payload.out += "<!--[-->";
      if (typeof points === "function") {
        $$payload.out += "<!--[-->";
        points($$payload, { points: _points });
        $$payload.out += `<!---->`;
      } else {
        $$payload.out += "<!--[!-->";
        const each_array_1 = ensure_array_like(_points);
        $$payload.out += `<!--[-->`;
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let point = each_array_1[$$index_1];
          Circle($$payload, spread_props([
            {
              motion: motion === "spring" ? "spring" : void 0,
              cx: point.x,
              cy: point.y,
              fill: point.fill,
              r: 4,
              strokeWidth: 6
            },
            pointsProps,
            {
              class: cls("stroke-white [paint-order:stroke] drop-shadow-sm", !point.fill && (typeof points === "boolean" || !points.fill) && "fill-primary", pointsProps.class),
              onpointerdown: onPointClick && ((e) => {
                e.stopPropagation();
              }),
              onclick: onPointClick && ((e) => onPointClick(e, { point, data: highlightData })),
              onpointerenter: onPointEnter && ((e) => {
                if (onPointClick) {
                  asAny(e.target).style.cursor = "pointer";
                }
                onPointEnter(e, { point, data: highlightData });
              }),
              onpointerleave: onPointLeave && ((e) => {
                if (onPointClick) {
                  asAny(e.target).style.cursor = "default";
                }
                onPointLeave(e, { point, data: highlightData });
              })
            }
          ]));
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function isSamePoint(p1, p2) {
  return Math.abs(p1.x - p2.x) < 1e-6 && Math.abs(p1.y - p2.y) < 1e-6;
}
function createDirectPath(source2, target) {
  if (isSamePoint(source2, target))
    return "";
  return `M ${source2.x} ${source2.y} L ${target.x} ${target.y}`;
}
function isNearZero(value) {
  return Math.abs(value) < 1e-6;
}
function createSquarePath({ source: source2, target, sweep }) {
  if (sweep === "horizontal-vertical") {
    return `M ${source2.x} ${source2.y} L ${target.x} ${source2.y} L ${target.x} ${target.y}`;
  } else {
    return `M ${source2.x} ${source2.y} L ${source2.x} ${target.y} L ${target.x} ${target.y}`;
  }
}
function createBeveledPath(opts) {
  const { radius, dx, dy, source: source2, target, sweep } = opts;
  const effectiveRadius = Math.max(0, Math.min(radius, Math.abs(dx), Math.abs(dy)));
  if (isNearZero(effectiveRadius)) {
    return createSquarePath(opts);
  }
  const signX = Math.sign(dx);
  const signY = Math.sign(dy);
  if (sweep === "horizontal-vertical") {
    const pBeforeCorner = { x: target.x - effectiveRadius * signX, y: source2.y };
    const pAfterCorner = { x: target.x, y: source2.y + effectiveRadius * signY };
    return `M ${source2.x} ${source2.y} L ${pBeforeCorner.x} ${pBeforeCorner.y} L ${pAfterCorner.x} ${pAfterCorner.y} L ${target.x} ${target.y}`;
  } else {
    const pBeforeCorner = { x: source2.x, y: target.y - effectiveRadius * signY };
    const pAfterCorner = { x: source2.x + effectiveRadius * signX, y: target.y };
    return `M ${source2.x} ${source2.y} L ${pBeforeCorner.x} ${pBeforeCorner.y} L ${pAfterCorner.x} ${pAfterCorner.y} L ${target.x} ${target.y}`;
  }
}
function createRoundedPath(opts) {
  const { radius, dx, dy, source: source2, target, sweep } = opts;
  const effectiveRadius = Math.max(0, Math.min(radius, Math.abs(dx), Math.abs(dy)));
  if (isNearZero(effectiveRadius)) {
    return createSquarePath(opts);
  }
  const signX = Math.sign(dx);
  const signY = Math.sign(dy);
  if (sweep === "horizontal-vertical") {
    const pBeforeCorner = { x: target.x - effectiveRadius * signX, y: source2.y };
    const pAfterCorner = { x: target.x, y: source2.y + effectiveRadius * signY };
    const sweepFlag = signX * signY > 0 ? 1 : 0;
    return `M ${source2.x} ${source2.y} L ${pBeforeCorner.x} ${pBeforeCorner.y} A ${effectiveRadius} ${effectiveRadius} 0 0 ${sweepFlag} ${pAfterCorner.x} ${pAfterCorner.y} L ${target.x} ${target.y}`;
  } else {
    const pBeforeCorner = { x: source2.x, y: target.y - effectiveRadius * signY };
    const pAfterCorner = { x: source2.x + effectiveRadius * signX, y: target.y };
    const sweepFlag = signX * signY > 0 ? 0 : 1;
    return `M ${source2.x} ${source2.y} L ${pBeforeCorner.x} ${pBeforeCorner.y} A ${effectiveRadius} ${effectiveRadius} 0 0 ${sweepFlag} ${pAfterCorner.x} ${pAfterCorner.y} L ${target.x} ${target.y}`;
  }
}
const pathStrategies = {
  square: createSquarePath,
  beveled: createBeveledPath,
  rounded: createRoundedPath
};
function getConnectorPresetPath(opts) {
  const { source: source2, target, type } = opts;
  if (isSamePoint(source2, target))
    return "";
  const dx = target.x - source2.x;
  const dy = target.y - source2.y;
  if (type === "straight" || isNearZero(dx) || isNearZero(dy)) {
    return createDirectPath(source2, target);
  }
  return (pathStrategies[type] || pathStrategies.square)({ ...opts, dx, dy });
}
const FALLBACK_PATH = "M0,0L0,0";
function getConnectorD3Path({ source: source2, target, sweep, curve }) {
  const dx = target.x - source2.x;
  const dy = target.y - source2.y;
  const line$1 = line().curve(curve);
  let points = [];
  const isAligned = isNearZero(dx) || isNearZero(dy);
  if (sweep === "none" || isAligned) {
    points = [
      [source2.x, source2.y],
      [target.x, target.y]
    ];
  } else if (sweep === "horizontal-vertical") {
    points = [
      [source2.x, source2.y],
      [target.x, source2.y],
      [target.x, target.y]
    ];
  } else if (sweep === "vertical-horizontal") {
    points = [
      [source2.x, source2.y],
      [source2.x, target.y],
      [target.x, target.y]
    ];
  }
  if (points.length === 2 && isNearZero(dx) && isNearZero(dx))
    return FALLBACK_PATH;
  const d = line$1(points);
  if (!d || d.includes("NaN"))
    return FALLBACK_PATH;
  return d;
}
function Connector($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    source: source2 = { x: 0, y: 0 },
    target = { x: 100, y: 100 },
    sweep: sweepProp,
    type = "rounded",
    radius = 20,
    curve = curveLinear,
    pathRef = void 0,
    pathData: pathDataProp,
    marker,
    markerStart,
    markerMid,
    markerEnd,
    motion,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const sweep = (() => {
    if (sweepProp) return sweepProp;
    if (type === "d3") return "none";
    return "horizontal-vertical";
  })();
  const markerStartId = markerStart || marker ? createId("marker-start", uid) : "";
  const markerMidId = markerMid || marker ? createId("marker-mid", uid) : "";
  const markerEndId = markerEnd || marker ? createId("marker-end", uid) : "";
  const extractedTween = extractTweenConfig(motion);
  const tweenOptions = extractedTween ? {
    type: extractedTween.type,
    options: {
      interpolate: interpolatePath,
      ...extractedTween.options
    }
  } : void 0;
  const pathData = (() => {
    if (pathDataProp) return pathDataProp;
    if (type === "d3") {
      return getConnectorD3Path({ source: source2, target, sweep, curve });
    } else {
      return getConnectorPresetPath({ source: source2, target, sweep, type, radius });
    }
  })();
  const motionPath = createMotion("", () => pathData, tweenOptions ? tweenOptions : { type: "none" });
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    Spline($$payload2, spread_props([
      {
        pathData: motionPath.current,
        "marker-start": markerStartId ? `url(#${markerStartId})` : void 0,
        "marker-mid": markerMidId ? `url(#${markerMidId})` : void 0,
        "marker-end": markerEndId ? `url(#${markerEndId})` : void 0
      },
      extractLayerProps(restProps, "connector"),
      restProps,
      {
        get pathRef() {
          return pathRef;
        },
        set pathRef($$value) {
          pathRef = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!----> `;
    MarkerWrapper($$payload2, { id: markerStartId, marker: markerStart });
    $$payload2.out += `<!----> `;
    MarkerWrapper($$payload2, { id: markerMidId, marker: markerMid });
    $$payload2.out += `<!----> `;
    MarkerWrapper($$payload2, { id: markerEndId, marker: markerEnd });
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { pathRef });
  pop();
}
const FALLBACK_COORDS = { x: 0, y: 0 };
function Link($$payload, $$props) {
  push();
  let {
    data,
    sankey = false,
    source: sourceProp,
    target: targetProp,
    orientation: orientationProp,
    x: xProp,
    y: yProp,
    curve: curveProp,
    explicitCoords,
    type = "d3",
    sweep = "none",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const sourceAccessor = (() => {
    if (sourceProp) return sourceProp;
    if (sankey) return (d) => ({ node: d.source, y: d.y0, isSource: true });
    return (d) => d.source;
  })();
  const targetAccessor = (() => {
    if (targetProp) return targetProp;
    if (sankey) return (d) => ({ node: d.target, y: d.y1, isSource: false });
    return (d) => d.target;
  })();
  const orientation = (() => {
    if (orientationProp) return orientationProp;
    if (sankey) return "horizontal";
    return "vertical";
  })();
  const curve = (() => {
    if (curveProp) return curveProp;
    if (orientation === "horizontal") return bumpX;
    return bumpY;
  })();
  const xAccessor = (() => {
    if (xProp) return xProp;
    if (sankey) return (d) => d.isSource ? d.node.x1 : d.node.x0;
    return (d) => orientation === "horizontal" ? d.y : d.x;
  })();
  const yAccessor = (() => {
    if (yProp) return yProp;
    if (sankey) return (d) => d.y;
    return (d) => orientation === "horizontal" ? d.x : d.y;
  })();
  const sourceCoords = (() => {
    if (explicitCoords) return { x: explicitCoords.x1, y: explicitCoords.y1 };
    if (!data) return FALLBACK_COORDS;
    try {
      const sourceData = sourceAccessor(data);
      if (sourceData == null) return FALLBACK_COORDS;
      const xVal = xAccessor(sourceData);
      const yVal = yAccessor(sourceData);
      return {
        x: Number.isFinite(xVal) ? xVal : 0,
        y: Number.isFinite(yVal) ? yVal : 0
      };
    } catch (e) {
      console.error("Error accessing source coordinates:", e, "Data:", data);
      return FALLBACK_COORDS;
    }
  })();
  const targetCoords = (() => {
    if (explicitCoords) return { x: explicitCoords.x2, y: explicitCoords.y2 };
    if (!data) return FALLBACK_COORDS;
    try {
      const targetData = targetAccessor(data);
      if (targetData == null) return FALLBACK_COORDS;
      const xVal = xAccessor(targetData);
      const yVal = yAccessor(targetData);
      return {
        x: Number.isFinite(xVal) ? xVal : 0,
        y: Number.isFinite(yVal) ? yVal : 0
      };
    } catch (e) {
      console.error("Error accessing target coordinates:", e, "Data:", data);
      return FALLBACK_COORDS;
    }
  })();
  Connector($$payload, spread_props([
    {
      source: sourceCoords,
      target: targetCoords,
      type,
      curve,
      sweep
    },
    extractLayerProps(restProps, "link")
  ]));
  pop();
}
function Points($$payload, $$props) {
  push();
  const ctx = getChartContext();
  let {
    data,
    x,
    y,
    r = 5,
    offsetX,
    offsetY,
    links = false,
    fill,
    fillOpacity,
    stroke,
    strokeWidth,
    opacity,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  function getOffset(value, offset, scale) {
    if (typeof offset === "function") {
      return offset(value, ctx);
    } else if (offset != null) {
      return offset;
    } else if (isScaleBand(scale) && !ctx.radial) {
      return scale.bandwidth() / 2;
    } else {
      return 0;
    }
  }
  const xAccessor = x ? accessor(x) : ctx.x;
  const yAccessor = y ? accessor(y) : ctx.y;
  const pointsData = data ?? ctx.data;
  const getPointObject = (xVal, yVal, d) => {
    const scaledX = ctx.xScale(xVal);
    const scaledY = ctx.yScale(yVal);
    return {
      x: scaledX + getOffset(scaledX, offsetX, ctx.xScale),
      y: scaledY + getOffset(scaledY, offsetY, ctx.yScale),
      r: ctx.config.r ? ctx.rGet(d) : r,
      xValue: xVal,
      yValue: yVal,
      data: d
    };
  };
  const points = pointsData.flatMap((d) => {
    const xValue = xAccessor(d);
    const yValue = yAccessor(d);
    if (Array.isArray(xValue)) {
      return xValue.filter(Boolean).map((xVal) => getPointObject(xVal, yValue, d));
    } else if (Array.isArray(yValue)) {
      return yValue.filter(Boolean).map((yVal) => getPointObject(xValue, yVal, d));
    } else if (xValue != null && yValue != null) {
      return getPointObject(xValue, yValue, d);
    }
    return [];
  });
  const _links = pointsData.flatMap((d) => {
    const xValue = xAccessor(d);
    const yValue = yAccessor(d);
    if (Array.isArray(xValue)) {
      const [xMin, xMax] = extent(ctx.xGet(d));
      const y2 = ctx.yGet(d) + getOffset(ctx.yGet(d), offsetY, ctx.yScale);
      return {
        source: {
          x: xMin + getOffset(xMin, offsetX, ctx.xScale) + (ctx.config.r ? ctx.rGet(d) : r),
          y: y2
        },
        target: {
          x: xMax + getOffset(xMax, offsetX, ctx.xScale) - (ctx.config.r ? ctx.rGet(d) : r),
          y: y2
        },
        data: d
      };
    } else if (Array.isArray(yValue)) {
      const x2 = ctx.xGet(d) + getOffset(ctx.xGet(d), offsetX, ctx.xScale);
      const [yMin, yMax] = extent(ctx.yGet(d));
      return {
        source: {
          x: x2,
          y: yMin + getOffset(yMin, offsetY, ctx.yScale)
        },
        target: {
          x: x2,
          y: yMax + getOffset(yMax, offsetY, ctx.yScale)
        },
        data: d
      };
    }
  });
  if (children) {
    $$payload.out += "<!--[-->";
    children($$payload, { points });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    const each_array_1 = ensure_array_like(points);
    if (links) {
      $$payload.out += "<!--[-->";
      const each_array = ensure_array_like(_links);
      $$payload.out += `<!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let link = each_array[$$index];
        Link($$payload, spread_props([
          {
            data: link,
            stroke: fill ?? (ctx.config.c ? ctx.cGet(link.data) : null)
          },
          extractLayerProps(links, "points-link")
        ]));
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--> <!--[-->`;
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let point = each_array_1[$$index_1];
      const radialPoint = pointRadial(point.x, point.y);
      Circle($$payload, spread_props([
        {
          cx: ctx.radial ? radialPoint[0] : point.x,
          cy: ctx.radial ? radialPoint[1] : point.y,
          r: point.r,
          fill: fill ?? (ctx.config.c ? ctx.cGet(point.data) : null),
          fillOpacity,
          stroke,
          strokeWidth,
          opacity
        },
        extractLayerProps(restProps, "point")
      ]));
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function Labels($$payload, $$props) {
  push();
  const ctx = getChartContext();
  let {
    data,
    value,
    x,
    y,
    placement = "outside",
    offset = placement === "center" ? 0 : 4,
    format: format$1$1,
    key = (_, i) => i,
    children: childrenProp,
    class: className,
    fill,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  function getTextProps(point) {
    const pointValue = isScaleBand(ctx.yScale) ? point.xValue : point.yValue;
    const fillValue = typeof fill === "function" ? accessor(fill)(point.data) : fill;
    const displayValue = value ? accessor(value)(point.data) : isScaleBand(ctx.yScale) ? point.xValue : point.yValue;
    const formattedValue = format$1(
      displayValue,
      // @ts-expect-error - improve types
      format$1$1 ?? (value ? void 0 : isScaleBand(ctx.yScale) ? ctx.xScale.tickFormat?.() : ctx.yScale.tickFormat?.())
    );
    if (isScaleBand(ctx.yScale)) {
      if (pointValue < 0) {
        return {
          value: formattedValue,
          fill: fillValue,
          x: point.x + (placement === "outside" ? -offset : offset),
          y: point.y,
          textAnchor: placement === "outside" ? "end" : "start",
          verticalAnchor: "middle",
          capHeight: ".6rem"
        };
      } else {
        return {
          value: formattedValue,
          fill: fillValue,
          x: point.x + (placement === "outside" ? offset : -offset),
          y: point.y,
          textAnchor: placement === "outside" ? "start" : "end",
          verticalAnchor: "middle",
          capHeight: ".6rem"
        };
      }
    } else {
      if (pointValue < 0) {
        return {
          value: formattedValue,
          fill: fillValue,
          x: point.x,
          y: point.y + (placement === "outside" ? offset : -offset),
          capHeight: ".6rem",
          textAnchor: "middle",
          verticalAnchor: placement === "center" ? "middle" : placement === "outside" ? "start" : "end"
        };
      } else {
        return {
          value: formattedValue,
          fill: fillValue,
          x: point.x,
          y: point.y + (placement === "outside" ? -offset : offset),
          capHeight: ".6rem",
          textAnchor: "middle",
          verticalAnchor: placement === "center" ? "middle" : placement === "outside" ? "end" : "start"
        };
      }
    }
  }
  Group($$payload, {
    class: layerClass("labels-g"),
    children: ($$payload2) => {
      {
        let children = function($$payload3, { points }) {
          const each_array = ensure_array_like(points);
          $$payload3.out += `<!--[-->`;
          for (let i = 0, $$length = each_array.length; i < $$length; i++) {
            let point = each_array[i];
            const textProps = extractLayerProps(getTextProps(point), "labels-text");
            if (childrenProp) {
              $$payload3.out += "<!--[-->";
              childrenProp($$payload3, { data: point, textProps });
              $$payload3.out += `<!---->`;
            } else {
              $$payload3.out += "<!--[!-->";
              Text($$payload3, spread_props([
                textProps,
                restProps,
                {
                  class: cls("text-xs", placement === "inside" ? "fill-surface-300 stroke-surface-content" : "fill-surface-content stroke-surface-100", textProps.class, className)
                }
              ]));
            }
            $$payload3.out += `<!--]-->`;
          }
          $$payload3.out += `<!--]-->`;
        };
        Points($$payload2, {
          data,
          x,
          y,
          children,
          $$slots: { default: true }
        });
      }
    },
    $$slots: { default: true }
  });
  pop();
}
function DefaultTooltip($$payload, $$props) {
  push();
  let {
    tooltipProps,
    seriesState,
    canHaveTotal = false
  } = $$props;
  const context = getChartContext();
  $$payload.out += `<!---->`;
  {
    let children = function($$payload2, { data, payload }) {
      $$payload2.out += `<!---->`;
      TooltipHeader($$payload2, spread_props([
        { value: payload[0].label, format: format$1 },
        tooltipProps?.header
      ]));
      $$payload2.out += `<!----> <!---->`;
      TooltipList($$payload2, spread_props([
        tooltipProps?.list,
        {
          children: ($$payload3) => {
            const each_array = ensure_array_like(payload);
            $$payload3.out += `<!--[-->`;
            for (let i = 0, $$length = each_array.length; i < $$length; i++) {
              let p = each_array[i];
              $$payload3.out += `<!---->`;
              TooltipItem($$payload3, spread_props([
                {
                  label: p.name,
                  value: p.value,
                  color: p.color,
                  format: format$1,
                  valueAlign: "right",
                  onpointerenter: () => seriesState.highlightKey.current = p.key,
                  onpointerleave: () => seriesState.highlightKey.current = null
                },
                tooltipProps?.item
              ]));
              $$payload3.out += `<!---->`;
            }
            $$payload3.out += `<!--]--> `;
            if (canHaveTotal && payload.length > 1 && !tooltipProps?.hideTotal) {
              $$payload3.out += "<!--[-->";
              $$payload3.out += `<!---->`;
              TooltipSeparator($$payload3, spread_props([
                tooltipProps?.separator,
                { children: void 0 }
              ]));
              $$payload3.out += `<!----> <!---->`;
              TooltipItem($$payload3, spread_props([
                {
                  label: "total",
                  value: sum$1(seriesState.visibleSeries, (s) => {
                    const seriesTooltipData = s.data ? findRelatedData(s.data, data, context.x) : data;
                    const valueAccessor = accessor(s.value ?? (s.data ? context.y : s.key));
                    return valueAccessor(seriesTooltipData);
                  }),
                  format: "integer",
                  valueAlign: "right"
                },
                tooltipProps?.item
              ]));
              $$payload3.out += `<!---->`;
            } else {
              $$payload3.out += "<!--[!-->";
            }
            $$payload3.out += `<!--]-->`;
          },
          $$slots: { default: true }
        }
      ]));
      $$payload2.out += `<!---->`;
    };
    Tooltip($$payload, spread_props([
      { context },
      tooltipProps?.root,
      { children, $$slots: { default: true } }
    ]));
  }
  $$payload.out += `<!---->`;
  pop();
}
function AnnotationLine($$payload, $$props) {
  push();
  const {
    x,
    y,
    label,
    labelPlacement = "top-right",
    labelXOffset = 0,
    labelYOffset = 0,
    props
  } = $$props;
  const ctx = getChartContext();
  const isVertical = x != null;
  const line2 = {
    x1: x ? ctx.xScale(x) : ctx.xRange[0],
    y1: y && !x ? ctx.yScale(y) : ctx.yRange[0],
    x2: x ? ctx.xScale(x) : ctx.xRange[1],
    y2: y ? ctx.yScale(y) : ctx.yRange[1]
  };
  const labelProps = isVertical ? {
    x: line2.x1 + (labelPlacement.includes("left") ? -labelXOffset : labelXOffset),
    y: (labelPlacement.includes("top") ? line2.y2 : labelPlacement.includes("bottom") ? line2.y1 : (line2.y1 - line2.y2) / 2) + (["top", "bottom-left", "bottom-right"].includes(labelPlacement) ? -labelYOffset : labelYOffset),
    dy: -2,
    // adjust for smaller font size
    textAnchor: labelPlacement.includes("left") ? "end" : labelPlacement.includes("right") ? "start" : "middle",
    verticalAnchor: labelPlacement === "top" ? "end" : labelPlacement === "bottom" ? "start" : labelPlacement.includes("top") ? "start" : labelPlacement.includes("bottom") ? "end" : "middle"
    // place above line// place below line
  } : {
    x: (labelPlacement.includes("left") ? line2.x1 : labelPlacement.includes("right") ? line2.x2 : (line2.x2 - line2.x1) / 2) + (["left", "top-right", "bottom-right"].includes(labelPlacement) ? -labelXOffset : labelXOffset),
    y: line2.y1 + (labelPlacement.includes("top") ? -labelYOffset : labelYOffset),
    dy: -2,
    // adjust for smaller font size
    textAnchor: labelPlacement === "left" ? "end" : labelPlacement === "right" ? "start" : labelPlacement.includes("left") ? "start" : labelPlacement.includes("right") ? "end" : "middle",
    // place beside line
    // place beside line
    verticalAnchor: labelPlacement.includes("top") ? "end" : labelPlacement.includes("bottom") ? "start" : "middle"
  };
  Line($$payload, spread_props([
    {
      x1: line2.x1,
      y1: line2.y1,
      x2: line2.x2,
      y2: line2.y2
    },
    props?.line,
    {
      class: cls("stroke-surface-content", props?.line?.class)
    }
  ]));
  $$payload.out += `<!----> `;
  if (label) {
    $$payload.out += "<!--[-->";
    Text($$payload, spread_props([
      { value: label },
      labelProps,
      props?.label,
      {
        class: cls("text-xs pointer-events-none", props?.label?.class)
      }
    ]));
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function AnnotationPoint($$payload, $$props) {
  push();
  const {
    x,
    y,
    r = 4,
    label,
    labelPlacement = "center",
    labelXOffset = 0,
    labelYOffset = 0,
    details,
    props
  } = $$props;
  const ctx = getChartContext();
  const point = {
    x: x ? ctx.xScale(x) + (isScaleBand(ctx.xScale) ? ctx.xScale.bandwidth() / 2 : 0) : 0,
    y: y ? ctx.yScale(y) + (isScaleBand(ctx.yScale) ? ctx.yScale.bandwidth() / 2 : 0) : ctx.height
  };
  const labelProps = {
    x: point.x + ((["top", "center", "bottom"].includes(labelPlacement) ? 0 : r) + labelXOffset) * (labelPlacement.includes("left") ? -1 : 1),
    y: point.y + ((["left", "center", "right"].includes(labelPlacement) ? 0 : r) + labelYOffset) * (labelPlacement.includes("top") ? -1 : 1),
    dy: -2,
    // adjust for smaler font size
    textAnchor: labelPlacement.includes("left") ? "end" : labelPlacement.includes("right") ? "start" : "middle",
    verticalAnchor: labelPlacement.includes("top") ? "end" : labelPlacement.includes("bottom") ? "start" : "middle"
  };
  Circle($$payload, spread_props([
    {
      cx: point.x,
      cy: point.y,
      r,
      onpointermove: (e) => {
        if (details) {
          e.stopPropagation();
          ctx.tooltip.show(e, { annotation: { label, details } });
        }
      },
      onpointerleave: () => {
        if (details) {
          ctx.tooltip.hide();
        }
      }
    },
    props?.circle,
    {
      class: cls("stroke-surface-100", props?.circle?.class)
    }
  ]));
  $$payload.out += `<!----> `;
  if (label) {
    $$payload.out += "<!--[-->";
    Text($$payload, spread_props([
      { value: label },
      labelProps,
      props?.label,
      {
        class: cls("text-xs pointer-events-none", props?.label?.class)
      }
    ]));
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function LinearGradient($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    id = createId("linearGradient-", uid),
    stops = [
      "var(--tw-gradient-from)",
      "var(--tw-gradient-to)"
    ],
    vertical = false,
    x1 = "0%",
    y1 = "0%",
    x2 = vertical ? "0%" : "100%",
    y2 = vertical ? "100%" : "0%",
    rotate,
    units = "objectBoundingBox",
    ref: refProp = void 0,
    class: className,
    stopsContent,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  getChartContext();
  const renderCtx = getRenderContext();
  let canvasGradient = void 0;
  if (renderCtx === "canvas") {
    registerCanvasComponent();
  }
  if (renderCtx === "canvas") {
    $$payload.out += "<!--[-->";
    children?.($$payload, { id, gradient: asAny(canvasGradient) });
    $$payload.out += `<!---->`;
  } else if (renderCtx === "svg") {
    $$payload.out += "<!--[1-->";
    $$payload.out += `<defs><linearGradient${spread_attributes(
      {
        id,
        x1,
        y1,
        x2,
        y2,
        gradientTransform: rotate ? `rotate(${rotate})` : "",
        gradientUnits: units,
        ...extractLayerProps(restProps, "linear-gradient")
      },
      null,
      void 0,
      void 0,
      3
    )}>`;
    if (stopsContent) {
      $$payload.out += "<!--[-->";
      stopsContent?.($$payload);
      $$payload.out += `<!---->`;
    } else if (stops) {
      $$payload.out += "<!--[1-->";
      const each_array = ensure_array_like(stops);
      $$payload.out += `<!--[-->`;
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let stop = each_array[i];
        if (Array.isArray(stop)) {
          $$payload.out += "<!--[-->";
          $$payload.out += `<stop${attr("offset", stop[0])}${attr("stop-color", stop[1])}${attr_class(clsx$1(cls(layerClass("linear-gradient-stop"), className)))}></stop>`;
        } else {
          $$payload.out += "<!--[!-->";
          $$payload.out += `<stop${attr("offset", `${stringify(i * (100 / (stops.length - 1)))}%`)}${attr("stop-color", stop)}${attr_class(clsx$1(cls(layerClass("linear-gradient-stop"), className)))}></stop>`;
        }
        $$payload.out += `<!--]-->`;
      }
      $$payload.out += `<!--]-->`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></linearGradient></defs>`;
    children?.($$payload, { id, gradient: `url(#${id})` });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { ref: refProp });
  pop();
}
function Pattern($$payload, $$props) {
  push();
  const uid = props_id($$payload);
  let {
    id = createId("pattern-", uid),
    size = 4,
    width = size,
    height = size,
    lines: linesProp,
    circles: circlesProp,
    background,
    patternContent,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const renderCtx = getRenderContext();
  let canvasPattern = null;
  let shapes = [];
  if (linesProp) {
    const lineDefs = Array.isArray(linesProp) ? linesProp : linesProp === true ? [{}] : [linesProp];
    for (const line2 of lineDefs) {
      const stroke = line2.color ?? "var(--color-surface-content)";
      const strokeWidth = line2.width ?? 1;
      const opacity = line2.opacity ?? 1;
      let rotate = Math.round(line2.rotate ?? 0) % 360;
      if (rotate > 180) rotate = rotate - 360;
      else if (rotate > 90) rotate = rotate - 180;
      else if (rotate < -180) rotate = rotate + 360;
      else if (rotate < -90) rotate = rotate + 180;
      let path2 = "";
      if (rotate === 0) {
        path2 = `
        M 0 0 L ${width} 0
        M 0 ${height} L ${width} ${height}
    `;
      } else if (rotate === 90) {
        path2 = `
        M 0 0 L 0 ${height}
        M ${width} 0 L ${width} ${height}
    `;
      } else {
        if (rotate > 0) {
          path2 = `
          M 0 ${-height} L ${width * 2} ${height}
          M ${-width} ${-height} L ${width} ${height}
          M ${-width} 0 L ${width} ${height * 2}
      `;
        } else {
          path2 = `
          M ${-width} ${height} L ${width} ${-height}
          M ${-width} ${height * 2} L ${width * 2} ${-height}
          M 0 ${height * 2} L ${width * 2} 0
      `;
        }
      }
      shapes.push({
        type: "line",
        path: path2,
        stroke,
        strokeWidth,
        opacity
      });
    }
  }
  if (circlesProp) {
    const circleDefs = Array.isArray(circlesProp) ? circlesProp : circlesProp === true ? [{}] : [circlesProp];
    for (const circle of circleDefs) {
      if (circle.stagger) {
        shapes.push(
          {
            type: "circle",
            cx: size / 4,
            cy: size / 4,
            r: circle.radius ?? 1,
            fill: circle.color ?? "var(--color-surface-content)",
            opacity: circle.opacity ?? 1
          },
          {
            type: "circle",
            cx: size * 3 / 4,
            cy: size * 3 / 4,
            r: circle.radius ?? 1,
            fill: circle.color ?? "var(--color-surface-content)",
            opacity: circle.opacity ?? 1
          }
        );
      } else {
        shapes.push({
          type: "circle",
          cx: size / 2,
          cy: size / 2,
          r: circle.radius ?? 1,
          fill: circle.color ?? "var(--color-surface-content)",
          opacity: circle.opacity ?? 1
        });
      }
    }
  }
  if (renderCtx === "canvas") {
    registerCanvasComponent();
  }
  if (renderCtx === "canvas") {
    $$payload.out += "<!--[-->";
    children?.($$payload, { id, pattern: asAny(canvasPattern) });
    $$payload.out += `<!---->`;
  } else if (renderCtx === "svg") {
    $$payload.out += "<!--[1-->";
    $$payload.out += `<defs><pattern${spread_attributes(
      {
        id,
        width,
        height,
        patternUnits: "userSpaceOnUse",
        ...extractLayerProps(restProps, "pattern")
      },
      null,
      void 0,
      void 0,
      3
    )}>`;
    if (patternContent) {
      $$payload.out += "<!--[-->";
      patternContent?.($$payload);
      $$payload.out += `<!---->`;
    } else {
      $$payload.out += "<!--[!-->";
      const each_array = ensure_array_like(shapes.filter((shape) => shape.type === "line"));
      const each_array_1 = ensure_array_like(shapes.filter((shape) => shape.type === "circle"));
      if (background) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<rect${attr("width", width)}${attr("height", height)}${attr("fill", background)}></rect>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--><!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let line2 = each_array[$$index];
        $$payload.out += `<path${attr("d", line2.path)}${attr("stroke", line2.stroke)}${attr("stroke-width", line2.strokeWidth)} fill="none"${attr("opacity", line2.opacity)}></path>`;
      }
      $$payload.out += `<!--]--><!--[-->`;
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let circle = each_array_1[$$index_1];
        $$payload.out += `<circle${attr("cx", circle.cx)}${attr("cy", circle.cy)}${attr("r", circle.r)}${attr("fill", circle.fill)}${attr("opacity", circle.opacity)}></circle>`;
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!--]--></pattern></defs>`;
    children?.($$payload, { id, pattern: `url(#${id})` });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function AnnotationRange($$payload, $$props) {
  push();
  const {
    x,
    y,
    fill,
    class: className,
    gradient,
    pattern,
    label,
    labelPlacement = "center",
    labelXOffset = 0,
    labelYOffset = 0,
    props
  } = $$props;
  const ctx = getChartContext();
  const rect = {
    x: x ? ctx.xScale(x[0] ?? ctx.xDomain[0]) - (isScaleBand(ctx.xScale) ? ctx.xScale.padding() * ctx.xScale.step() / 2 : 0) : ctx.xRange[0],
    y: y ? ctx.yScale(y[1] ?? ctx.yDomain[1]) : ctx.yRange[1],
    width: x ? ctx.xScale(x[1] ?? ctx.xDomain[1]) - ctx.xScale(x[0] ?? ctx.xDomain[0]) + (isScaleBand(ctx.xScale) ? ctx.xScale.step() : 0) : ctx.width,
    height: y ? ctx.yScale(y[0] ?? ctx.yDomain[0]) - ctx.yScale(y[1] ?? ctx.yDomain[1]) : ctx.height
  };
  const labelProps = {
    x: ((labelPlacement.includes("left") ? rect.x : labelPlacement.includes("right") ? (rect.x ?? 0) + rect.width : (rect.x ?? 0) + rect.width / 2) ?? 0) + (labelPlacement.includes("right") ? -labelXOffset : labelXOffset),
    y: ((labelPlacement.includes("top") ? rect.y : labelPlacement.includes("bottom") ? (rect.y ?? 0) + rect.height : (rect.y ?? 0) + rect.height / 2) ?? 0) + (labelPlacement.includes("bottom") ? -labelYOffset : labelYOffset),
    dy: -2,
    // adjust for smaler font size
    textAnchor: labelPlacement.includes("left") ? "start" : labelPlacement.includes("right") ? "end" : "middle",
    verticalAnchor: labelPlacement.includes("top") ? "start" : labelPlacement.includes("bottom") ? "end" : "middle"
  };
  if (fill || className) {
    $$payload.out += "<!--[-->";
    Rect($$payload, spread_props([
      rect,
      props?.rect,
      {
        fill,
        class: cls(props?.rect?.class, className)
      }
    ]));
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (gradient) {
    $$payload.out += "<!--[-->";
    {
      let children = function($$payload2, { gradient: gradient2 }) {
        Rect($$payload2, spread_props([rect, props?.rect, { fill: gradient2 }]));
      };
      LinearGradient($$payload, spread_props([
        gradient,
        { children, $$slots: { default: true } }
      ]));
    }
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (pattern) {
    $$payload.out += "<!--[-->";
    {
      let children = function($$payload2, { pattern: pattern2 }) {
        Rect($$payload2, spread_props([rect, props?.rect, { fill: pattern2 }]));
      };
      Pattern($$payload, spread_props([
        pattern,
        { children, $$slots: { default: true } }
      ]));
    }
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> `;
  if (label) {
    $$payload.out += "<!--[-->";
    Text($$payload, spread_props([
      { value: label },
      labelProps,
      props?.label,
      {
        class: cls("text-xs pointer-events-none", props?.label?.class)
      }
    ]));
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function ChartAnnotations($$payload, $$props) {
  push();
  let {
    annotations,
    layer,
    highlightKey,
    visibleSeries
  } = $$props;
  let visibleAnnotations = annotations.filter((a) => (a.layer === layer || a.layer == null && layer === "above") && (highlightKey == null || a.seriesKey == null || a.seriesKey === highlightKey) && visibleSeries.some((s) => a.seriesKey == null || a.seriesKey === s.key));
  const each_array = ensure_array_like(visibleAnnotations);
  $$payload.out += `<!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let annotation = each_array[$$index];
    if (annotation.type === "point") {
      $$payload.out += "<!--[-->";
      AnnotationPoint($$payload, spread_props([annotation]));
    } else if (annotation.type === "line") {
      $$payload.out += "<!--[1-->";
      AnnotationLine($$payload, spread_props([annotation]));
    } else if (annotation.type === "range") {
      $$payload.out += "<!--[2-->";
      AnnotationRange($$payload, spread_props([annotation]));
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function Bars($$payload, $$props) {
  push();
  let {
    fill,
    key = (_, i) => i,
    data: dataProp,
    onBarClick = () => {
    },
    children,
    radius = 0,
    strokeWidth = 0,
    stroke = "black",
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const ctx = getChartContext();
  const data = chartDataArray(dataProp ?? ctx.data);
  Group($$payload, {
    class: layerClass("bars"),
    children: ($$payload2) => {
      if (children) {
        $$payload2.out += "<!--[-->";
        children($$payload2);
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
        const each_array = ensure_array_like(data);
        $$payload2.out += `<!--[-->`;
        for (let i = 0, $$length = each_array.length; i < $$length; i++) {
          let d = each_array[i];
          Bar($$payload2, spread_props([
            {
              data: d,
              radius,
              strokeWidth,
              stroke,
              fill: fill ?? (ctx.config.c ? ctx.cGet(d) : null),
              onclick: (e) => onBarClick(e, { data: d })
            },
            extractLayerProps(restProps, "bars-bar")
          ]));
        }
        $$payload2.out += `<!--]-->`;
      }
      $$payload2.out += `<!--]-->`;
    },
    $$slots: { default: true }
  });
  pop();
}
function BarChart($$payload, $$props) {
  push();
  let {
    data = [],
    x: xProp,
    y: yProp,
    xDomain,
    radial = false,
    orientation = "vertical",
    series: seriesProp,
    seriesLayout = "overlap",
    axis = true,
    brush = false,
    grid = true,
    labels = false,
    legend = false,
    points = false,
    rule = true,
    onTooltipClick = () => {
    },
    onBarClick = () => {
    },
    props = {},
    renderContext = "svg",
    profile = false,
    debug = false,
    xScale: xScaleProp,
    yScale: yScaleProp,
    bandPadding = radial ? 0 : 0.4,
    groupPadding = 0,
    stackPadding = 0,
    tooltip = true,
    children: childrenProp,
    aboveContext,
    belowContext,
    belowMarks,
    aboveMarks,
    marks,
    highlight = true,
    annotations = [],
    context = void 0,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const series = seriesProp === void 0 ? [
    {
      key: "default",
      label: orientation === "vertical" ? typeof yProp === "string" ? yProp : "value" : typeof xProp === "string" ? xProp : "value",
      value: orientation === "vertical" ? yProp : xProp
    }
  ] : seriesProp;
  const seriesState = new SeriesState(() => series);
  const isVertical = orientation === "vertical";
  const isStackSeries = seriesLayout.startsWith("stack");
  const isGroupSeries = seriesLayout === "group";
  const chartData = (() => {
    let _chartData = seriesState.allSeriesData.length ? seriesState.allSeriesData : chartDataArray(data);
    if (isStackSeries) {
      const seriesKeys = seriesState.visibleSeries.map((s) => s.key);
      const offset = seriesLayout === "stackExpand" ? stackOffsetExpand : seriesLayout === "stackDiverging" ? stackOffsetDiverging : stackOffsetNone;
      const stackData = stack().keys(seriesKeys).value((d, key) => {
        const s = series.find((d2) => d2.key === key);
        return accessor(s.value ?? s.key)(d);
      }).offset(offset)(chartDataArray(data));
      _chartData = _chartData.map((d, i) => {
        return {
          ...d,
          stackData: stackData.map((sd) => sd[i])
        };
      });
    }
    return _chartData;
  })();
  const xScale = xScaleProp ?? (isVertical ? band().padding(bandPadding) : accessor(xProp)(chartData[0]) instanceof Date ? time() : linear$2());
  const xBaseline = isVertical || isScaleTime(xScale) ? void 0 : 0;
  const yScale = yScaleProp ?? (isVertical ? accessor(yProp)(chartData[0]) instanceof Date ? time() : linear$2() : band().padding(bandPadding));
  const yBaseline = isVertical || isScaleTime(yScale) ? 0 : void 0;
  const x1Scale = isGroupSeries && isVertical ? band().padding(groupPadding) : void 0;
  const x1Domain = isGroupSeries && isVertical ? seriesState.visibleSeries.map((s) => s.key) : void 0;
  const x1Range = isGroupSeries && isVertical ? (
    // TODO: can we do something better here where we don't need to cast this
    // feels fragile!
    ({ xScale: xScale2 }) => [0, xScale2.bandwidth()]
  ) : void 0;
  const y1Scale = isGroupSeries && !isVertical ? band().padding(groupPadding) : void 0;
  const y1Domain = isGroupSeries && !isVertical ? seriesState.visibleSeries.map((s) => s.key) : void 0;
  const y1Range = isGroupSeries && !isVertical ? (
    // TODO: can we do something better here where we don't need to cast this
    // feels fragile!
    ({ yScale: yScale2 }) => [0, yScale2.bandwidth()]
  ) : void 0;
  function isStackData(d) {
    return d && typeof d === "object" && "stackData" in d;
  }
  function getBarsProps(s, i) {
    const isFirst = i == 0;
    const isLast = i == seriesState.visibleSeries.length - 1;
    const isStackLayout = seriesLayout.startsWith("stack");
    let stackInsets = void 0;
    if (isStackLayout) {
      const stackInset = stackPadding / 2;
      if (isVertical) {
        stackInsets = {
          bottom: isFirst ? void 0 : stackInset,
          top: isLast ? void 0 : stackInset
        };
      } else {
        stackInsets = {
          left: isFirst ? void 0 : stackInset,
          right: isLast ? void 0 : stackInset
        };
      }
    }
    const valueAccessor = isStackSeries ? (d) => d.stackData[i] : s.value ?? (s.data ? void 0 : s.key);
    return {
      data: s.data,
      x: !isVertical ? valueAccessor : void 0,
      y: isVertical ? valueAccessor : void 0,
      x1: isVertical && isGroupSeries ? (d) => s.value ?? s.key : void 0,
      y1: !isVertical && isGroupSeries ? (d) => s.value ?? s.key : void 0,
      rounded: isStackLayout && i !== seriesState.visibleSeries.length - 1 ? "none" : Array.isArray(xProp) || Array.isArray(yProp) ? "all" : "edge",
      radius: 4,
      strokeWidth: 1,
      insets: stackInsets,
      fill: s.color,
      onBarClick: (e, detail) => onBarClick(e, { ...detail, series: s }),
      ...props.bars,
      ...s.props,
      class: cls("transition-opacity", seriesState.highlightKey.current && seriesState.highlightKey.current !== s.key && "opacity-10", props.bars?.class, s.props?.class)
    };
  }
  function getLabelsProps(s, i) {
    return {
      // TODO: Improve placement when using `seriesLayout="group"`
      // data: s.data,
      // y: s.value ?? (s.data ? undefined : s.key),
      ...props.labels,
      ...typeof labels === "object" ? labels : null,
      class: cls("stroke-surface-200 transition-opacity", seriesState.highlightKey.current && seriesState.highlightKey.current !== s.key && "opacity-10", props.labels?.class, typeof labels === "object" && labels.class)
    };
  }
  const brushProps = {
    ...typeof brush === "object" ? brush : null,
    ...props.brush
  };
  function getLegendProps() {
    return createLegendProps({
      seriesState,
      props: {
        ...props.legend,
        ...typeof legend === "object" ? legend : null
      }
    });
  }
  function getGridProps() {
    return {
      x: !isVertical || radial,
      y: isVertical || radial,
      ...typeof grid === "object" ? grid : null,
      ...props.grid
    };
  }
  function getHighlightProps() {
    return { area: true, ...props.highlight };
  }
  function getAxisProps(axisDirection) {
    if (axisDirection === "y") {
      return {
        placement: radial ? "radius" : "left",
        format: isVertical && seriesLayout === "stackExpand" ? "percentRound" : void 0,
        ...typeof axis === "object" ? axis : null,
        ...props.yAxis
      };
    }
    return {
      placement: radial ? "angle" : "bottom",
      format: !isVertical && seriesLayout === "stackExpand" ? "percentRound" : void 0,
      ...typeof axis === "object" ? axis : null,
      ...props.xAxis
    };
  }
  function getRuleProps() {
    return {
      x: isVertical ? false : 0,
      y: isVertical ? 0 : false,
      ...typeof rule === "object" ? rule : null,
      ...props.rule
    };
  }
  if (profile) {
    console.time("BarChart render");
  }
  setTooltipMetaContext({
    type: "bar",
    get orientation() {
      return orientation;
    },
    get stackSeries() {
      return isStackSeries;
    },
    get visibleSeries() {
      return seriesState.visibleSeries;
    }
  });
  function resolveAccessor(acc) {
    if (acc) return acc;
    if (isStackSeries) {
      return (d) => isStackData(d) ? seriesState.visibleSeries.flatMap((s, i) => d.stackData[i]) : void 0;
    }
    return seriesState.visibleSeries.map((s) => s.value ?? s.key);
  }
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    {
      let children = function($$payload3, { context: context2 }) {
        const snippetProps = {
          context: context2,
          series,
          visibleSeries: seriesState.visibleSeries,
          getBarsProps,
          getLabelsProps,
          getLegendProps,
          getGridProps,
          getHighlightProps,
          getAxisProps,
          getRuleProps,
          highlightKey: seriesState.highlightKey.current,
          setHighlightKey: seriesState.highlightKey.set
        };
        if (childrenProp) {
          $$payload3.out += "<!--[-->";
          childrenProp($$payload3, snippetProps);
          $$payload3.out += `<!---->`;
        } else {
          $$payload3.out += "<!--[!-->";
          belowContext?.($$payload3, snippetProps);
          $$payload3.out += `<!----> `;
          Layer($$payload3, spread_props([
            { type: renderContext },
            asAny(renderContext === "canvas" ? props.canvas : props.svg),
            {
              center: radial,
              debug,
              children: ($$payload4) => {
                if (typeof grid === "function") {
                  $$payload4.out += "<!--[-->";
                  grid($$payload4, snippetProps);
                  $$payload4.out += `<!---->`;
                } else if (grid) {
                  $$payload4.out += "<!--[1-->";
                  Grid($$payload4, spread_props([getGridProps()]));
                } else {
                  $$payload4.out += "<!--[!-->";
                }
                $$payload4.out += `<!--]--> `;
                ChartClipPath($$payload4, {
                  disabled: !brush,
                  children: ($$payload5) => {
                    ChartAnnotations($$payload5, {
                      annotations,
                      layer: "below",
                      highlightKey: seriesState.highlightKey.current,
                      visibleSeries: seriesState.visibleSeries
                    });
                    $$payload5.out += `<!----> `;
                    belowMarks?.($$payload5, snippetProps);
                    $$payload5.out += `<!----> `;
                    if (typeof marks === "function") {
                      $$payload5.out += "<!--[-->";
                      marks($$payload5, snippetProps);
                      $$payload5.out += `<!---->`;
                    } else {
                      $$payload5.out += "<!--[!-->";
                      const each_array = ensure_array_like(seriesState.visibleSeries);
                      $$payload5.out += `<!--[-->`;
                      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
                        let s = each_array[i];
                        Bars($$payload5, spread_props([getBarsProps(s, i)]));
                      }
                      $$payload5.out += `<!--]-->`;
                    }
                    $$payload5.out += `<!--]-->`;
                  },
                  $$slots: { default: true }
                });
                $$payload4.out += `<!----> `;
                aboveMarks?.($$payload4, snippetProps);
                $$payload4.out += `<!----> `;
                if (typeof axis === "function") {
                  $$payload4.out += "<!--[-->";
                  axis($$payload4, snippetProps);
                  $$payload4.out += `<!----> `;
                  if (typeof rule === "function") {
                    $$payload4.out += "<!--[-->";
                    rule($$payload4, snippetProps);
                    $$payload4.out += `<!---->`;
                  } else if (rule) {
                    $$payload4.out += "<!--[1-->";
                    Rule($$payload4, spread_props([getRuleProps()]));
                  } else {
                    $$payload4.out += "<!--[!-->";
                  }
                  $$payload4.out += `<!--]-->`;
                } else if (axis) {
                  $$payload4.out += "<!--[1-->";
                  if (axis !== "x") {
                    $$payload4.out += "<!--[-->";
                    Axis($$payload4, spread_props([getAxisProps("y")]));
                  } else {
                    $$payload4.out += "<!--[!-->";
                  }
                  $$payload4.out += `<!--]--> `;
                  if (axis !== "y") {
                    $$payload4.out += "<!--[-->";
                    Axis($$payload4, spread_props([getAxisProps("x")]));
                  } else {
                    $$payload4.out += "<!--[!-->";
                  }
                  $$payload4.out += `<!--]--> `;
                  if (typeof rule === "function") {
                    $$payload4.out += "<!--[-->";
                    rule($$payload4, snippetProps);
                    $$payload4.out += `<!---->`;
                  } else if (rule) {
                    $$payload4.out += "<!--[1-->";
                    Rule($$payload4, spread_props([getRuleProps()]));
                  } else {
                    $$payload4.out += "<!--[!-->";
                  }
                  $$payload4.out += `<!--]-->`;
                } else {
                  $$payload4.out += "<!--[!-->";
                }
                $$payload4.out += `<!--]--> `;
                ChartClipPath($$payload4, {
                  disabled: !brush,
                  full: true,
                  children: ($$payload5) => {
                    if (typeof highlight === "function") {
                      $$payload5.out += "<!--[-->";
                      highlight($$payload5, snippetProps);
                      $$payload5.out += `<!---->`;
                    } else if (highlight) {
                      $$payload5.out += "<!--[1-->";
                      Highlight($$payload5, spread_props([getHighlightProps()]));
                    } else {
                      $$payload5.out += "<!--[!-->";
                    }
                    $$payload5.out += `<!--]--> `;
                    if (typeof labels === "function") {
                      $$payload5.out += "<!--[-->";
                      labels($$payload5, snippetProps);
                      $$payload5.out += `<!---->`;
                    } else if (labels) {
                      $$payload5.out += "<!--[1-->";
                      const each_array_1 = ensure_array_like(seriesState.visibleSeries);
                      $$payload5.out += `<!--[-->`;
                      for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
                        let s = each_array_1[i];
                        Labels($$payload5, spread_props([getLabelsProps(s)]));
                      }
                      $$payload5.out += `<!--]-->`;
                    } else {
                      $$payload5.out += "<!--[!-->";
                    }
                    $$payload5.out += `<!--]--> `;
                    ChartAnnotations($$payload5, {
                      annotations,
                      layer: "above",
                      highlightKey: seriesState.highlightKey.current,
                      visibleSeries: seriesState.visibleSeries
                    });
                    $$payload5.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload4.out += `<!---->`;
              },
              $$slots: { default: true }
            }
          ]));
          $$payload3.out += `<!----> `;
          aboveContext?.($$payload3, snippetProps);
          $$payload3.out += `<!----> `;
          if (typeof legend === "function") {
            $$payload3.out += "<!--[-->";
            legend($$payload3, snippetProps);
            $$payload3.out += `<!---->`;
          } else if (legend) {
            $$payload3.out += "<!--[1-->";
            Legend($$payload3, spread_props([getLegendProps()]));
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--> `;
          if (typeof tooltip === "function") {
            $$payload3.out += "<!--[-->";
            tooltip($$payload3, snippetProps);
            $$payload3.out += `<!---->`;
          } else if (tooltip) {
            $$payload3.out += "<!--[1-->";
            DefaultTooltip($$payload3, {
              tooltipProps: props.tooltip,
              canHaveTotal: isStackSeries || isGroupSeries,
              seriesState
            });
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]-->`;
        }
        $$payload3.out += `<!--]-->`;
      };
      Chart($$payload2, spread_props([
        {
          data: chartData,
          x: resolveAccessor(xProp),
          xDomain,
          xScale,
          xBaseline,
          xNice: orientation === "horizontal",
          x1Scale,
          x1Domain,
          x1Range,
          y: resolveAccessor(yProp),
          yScale,
          yBaseline,
          yNice: orientation === "vertical",
          y1Scale,
          y1Domain,
          y1Range,
          c: isVertical ? yProp : xProp,
          cRange: ["var(--color-primary)"],
          radial,
          padding: radial ? void 0 : defaultChartPadding(axis, legend)
        },
        restProps,
        {
          tooltip: tooltip === false ? false : {
            mode: "band",
            onclick: onTooltipClick,
            debug,
            ...props.tooltip?.context
          },
          brush: brush && (brush === true || brush.mode == void 0 || brush.mode === "integrated") ? {
            axis: "x",
            resetOnEnd: true,
            xDomain,
            ...brushProps,
            onBrushEnd: (e) => {
              xDomain = e.xDomain;
              brushProps.onBrushEnd?.(e);
            }
          } : false,
          get context() {
            return context;
          },
          set context($$value) {
            context = $$value;
            $$settled = false;
          },
          children,
          $$slots: { default: true }
        }
      ]));
    }
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { context });
  pop();
}
function LineChart($$payload, $$props) {
  push();
  let {
    data = [],
    x: xProp,
    y: yProp,
    xDomain,
    radial = false,
    series: seriesProp,
    seriesLayout = "overlap",
    axis = true,
    brush = false,
    grid = true,
    labels = false,
    legend = false,
    points = false,
    rule = true,
    onTooltipClick = () => {
    },
    onPointClick,
    props = {},
    renderContext = "svg",
    profile = false,
    debug = false,
    xScale: xScaleProp,
    tooltip = true,
    children: childrenProp,
    aboveContext,
    belowContext,
    belowMarks,
    aboveMarks,
    marks,
    spline,
    highlight = true,
    annotations = [],
    context = void 0,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const series = seriesProp === void 0 ? [
    {
      key: "default",
      label: typeof yProp === "string" ? yProp : "value",
      value: yProp,
      color: "var(--color-primary)"
    }
  ] : seriesProp;
  const seriesState = new SeriesState(() => series);
  const chartData = seriesState.allSeriesData.length ? seriesState.allSeriesData : chartDataArray(data);
  const xScale = xScaleProp ?? (accessor(xProp)(chartData[0]) instanceof Date ? time() : linear$2());
  function getSplineProps(s, i) {
    const splineProps = {
      data: s.data,
      y: s.value ?? (s.data ? void 0 : s.key),
      stroke: s.color,
      ...props.spline,
      ...s.props,
      class: cls(
        layerClass("line-chart-line"),
        "transition-opacity",
        // Checking `visibleSeries.length > 1` fixes re-animated tweened areas on hover
        seriesState.visibleSeries.length > 1 && seriesState.highlightKey.current && seriesState.highlightKey.current !== s.key && "opacity-10",
        props.spline?.class,
        s.props?.class
      )
    };
    return splineProps;
  }
  function getPointsProps(s, i) {
    const pointsProps = {
      data: s.data,
      y: s.value ?? (s.data ? void 0 : s.key),
      fill: s.color,
      ...props.points,
      ...typeof points === "object" ? points : null,
      class: cls("stroke-surface-200 transition-opacity", seriesState.highlightKey.current && seriesState.highlightKey.current !== s.key && "opacity-10", props.points?.class, typeof points === "object" && points.class)
    };
    return pointsProps;
  }
  function getLabelsProps(s, i) {
    const labelsProps = {
      data: s.data,
      y: s.value ?? (s.data ? void 0 : s.key),
      ...props.labels,
      ...typeof labels === "object" ? labels : null,
      class: cls("stroke-surface-200 transition-opacity", seriesState.highlightKey.current && seriesState.highlightKey.current !== s.key && "opacity-10", props.labels?.class, typeof labels === "object" && labels.class)
    };
    return labelsProps;
  }
  const highlightPointsProps = typeof props.highlight?.points === "object" ? props.highlight.points : null;
  function getHighlightProps(s, i) {
    if (!context || !context.tooltip.data) return {};
    const seriesTooltipData = s.data && context.tooltip.data ? findRelatedData(s.data, context.tooltip.data, context.x) : null;
    return {
      data: seriesTooltipData,
      y: s.value ?? (s.data ? void 0 : s.key),
      lines: i === 0,
      onPointClick: onPointClick ? (e, detail) => onPointClick(e, { ...detail, series: s }) : void 0,
      onPointEnter: () => seriesState.highlightKey.current = s.key,
      onPointLeave: () => seriesState.highlightKey.current = null,
      ...props.highlight,
      points: props.highlight?.points == false ? false : {
        ...highlightPointsProps,
        fill: s.color,
        class: cls("transition-opacity", seriesState.highlightKey.current && seriesState.highlightKey.current !== s.key && "opacity-10", highlightPointsProps?.class)
      }
    };
  }
  function getLegendProps() {
    return createLegendProps({
      seriesState,
      props: {
        ...props.legend,
        ...typeof legend === "object" ? legend : null
      }
    });
  }
  function getGridProps() {
    return {
      x: radial,
      y: true,
      ...typeof grid === "object" ? grid : null,
      ...props.grid
    };
  }
  function getAxisProps(axisDirection) {
    if (axisDirection === "y") {
      return {
        placement: radial ? "radius" : "left",
        ...typeof axis === "object" ? axis : null,
        ...props.yAxis
      };
    }
    return {
      placement: radial ? "angle" : "bottom",
      ...typeof axis === "object" ? axis : null,
      ...props.xAxis
    };
  }
  function getRuleProps() {
    return {
      x: 0,
      y: 0,
      ...typeof rule === "object" ? rule : null,
      ...props.rule
    };
  }
  const brushProps = {
    ...typeof brush === "object" ? brush : null,
    ...props.brush
  };
  if (profile) {
    console.time("LineChart render");
  }
  setTooltipMetaContext({
    type: "line",
    get visibleSeries() {
      return seriesState.visibleSeries;
    }
  });
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    {
      let children = function($$payload3, { context: context2 }) {
        const snippetProps = {
          context: context2,
          series,
          visibleSeries: seriesState.visibleSeries,
          getLabelsProps,
          getPointsProps,
          getSplineProps,
          getHighlightProps,
          getLegendProps,
          getGridProps,
          getAxisProps,
          getRuleProps,
          highlightKey: seriesState.highlightKey.current,
          setHighlightKey: seriesState.highlightKey.set
        };
        if (childrenProp) {
          $$payload3.out += "<!--[-->";
          childrenProp($$payload3, snippetProps);
          $$payload3.out += `<!---->`;
        } else {
          $$payload3.out += "<!--[!-->";
          belowContext?.($$payload3, snippetProps);
          $$payload3.out += `<!----> `;
          Layer($$payload3, spread_props([
            { type: renderContext },
            asAny(renderContext === "canvas" ? props.canvas : props.svg),
            {
              center: radial,
              debug,
              children: ($$payload4) => {
                if (typeof grid === "function") {
                  $$payload4.out += "<!--[-->";
                  grid($$payload4, snippetProps);
                  $$payload4.out += `<!---->`;
                } else if (grid) {
                  $$payload4.out += "<!--[1-->";
                  Grid($$payload4, spread_props([getGridProps()]));
                } else {
                  $$payload4.out += "<!--[!-->";
                }
                $$payload4.out += `<!--]--> `;
                ChartClipPath($$payload4, {
                  disabled: !brush,
                  children: ($$payload5) => {
                    ChartAnnotations($$payload5, {
                      annotations,
                      layer: "below",
                      highlightKey: seriesState.highlightKey.current,
                      visibleSeries: seriesState.visibleSeries
                    });
                    $$payload5.out += `<!----> `;
                    belowMarks?.($$payload5, snippetProps);
                    $$payload5.out += `<!----> `;
                    if (marks) {
                      $$payload5.out += "<!--[-->";
                      marks($$payload5, snippetProps);
                      $$payload5.out += `<!---->`;
                    } else {
                      $$payload5.out += "<!--[!-->";
                      const each_array = ensure_array_like(seriesState.visibleSeries);
                      $$payload5.out += `<!--[-->`;
                      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
                        let s = each_array[i];
                        if (typeof spline === "function") {
                          $$payload5.out += "<!--[-->";
                          spline($$payload5, {
                            ...snippetProps,
                            props: getSplineProps(s),
                            seriesIndex: i
                          });
                          $$payload5.out += `<!---->`;
                        } else {
                          $$payload5.out += "<!--[!-->";
                          Spline($$payload5, spread_props([getSplineProps(s)]));
                        }
                        $$payload5.out += `<!--]-->`;
                      }
                      $$payload5.out += `<!--]-->`;
                    }
                    $$payload5.out += `<!--]--> `;
                    aboveMarks?.($$payload5, snippetProps);
                    $$payload5.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload4.out += `<!----> `;
                if (typeof axis === "function") {
                  $$payload4.out += "<!--[-->";
                  axis($$payload4, snippetProps);
                  $$payload4.out += `<!----> `;
                  if (typeof rule === "function") {
                    $$payload4.out += "<!--[-->";
                    rule($$payload4, snippetProps);
                    $$payload4.out += `<!---->`;
                  } else if (rule) {
                    $$payload4.out += "<!--[1-->";
                    Rule($$payload4, spread_props([getRuleProps()]));
                  } else {
                    $$payload4.out += "<!--[!-->";
                  }
                  $$payload4.out += `<!--]-->`;
                } else if (axis) {
                  $$payload4.out += "<!--[1-->";
                  if (axis !== "x") {
                    $$payload4.out += "<!--[-->";
                    Axis($$payload4, spread_props([getAxisProps("y")]));
                  } else {
                    $$payload4.out += "<!--[!-->";
                  }
                  $$payload4.out += `<!--]--> `;
                  if (axis !== "y") {
                    $$payload4.out += "<!--[-->";
                    Axis($$payload4, spread_props([getAxisProps("x")]));
                  } else {
                    $$payload4.out += "<!--[!-->";
                  }
                  $$payload4.out += `<!--]--> `;
                  if (typeof rule === "function") {
                    $$payload4.out += "<!--[-->";
                    rule($$payload4, snippetProps);
                    $$payload4.out += `<!---->`;
                  } else if (rule) {
                    $$payload4.out += "<!--[1-->";
                    Rule($$payload4, spread_props([getRuleProps()]));
                  } else {
                    $$payload4.out += "<!--[!-->";
                  }
                  $$payload4.out += `<!--]-->`;
                } else {
                  $$payload4.out += "<!--[!-->";
                }
                $$payload4.out += `<!--]--> `;
                ChartClipPath($$payload4, {
                  disabled: !brush,
                  full: true,
                  children: ($$payload5) => {
                    if (typeof points === "function") {
                      $$payload5.out += "<!--[-->";
                      points($$payload5, snippetProps);
                      $$payload5.out += `<!---->`;
                    } else if (points) {
                      $$payload5.out += "<!--[1-->";
                      const each_array_1 = ensure_array_like(seriesState.visibleSeries);
                      $$payload5.out += `<!--[-->`;
                      for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
                        let s = each_array_1[i];
                        Points($$payload5, spread_props([getPointsProps(s)]));
                      }
                      $$payload5.out += `<!--]-->`;
                    } else {
                      $$payload5.out += "<!--[!-->";
                    }
                    $$payload5.out += `<!--]--> `;
                    if (typeof labels === "function") {
                      $$payload5.out += "<!--[-->";
                      labels($$payload5, snippetProps);
                      $$payload5.out += `<!---->`;
                    } else if (labels) {
                      $$payload5.out += "<!--[1-->";
                      const each_array_2 = ensure_array_like(seriesState.visibleSeries);
                      $$payload5.out += `<!--[-->`;
                      for (let i = 0, $$length = each_array_2.length; i < $$length; i++) {
                        let s = each_array_2[i];
                        Labels($$payload5, spread_props([getLabelsProps(s)]));
                      }
                      $$payload5.out += `<!--]-->`;
                    } else {
                      $$payload5.out += "<!--[!-->";
                    }
                    $$payload5.out += `<!--]--> `;
                    if (typeof highlight === "function") {
                      $$payload5.out += "<!--[-->";
                      highlight($$payload5, snippetProps);
                      $$payload5.out += `<!---->`;
                    } else if (highlight) {
                      $$payload5.out += "<!--[1-->";
                      const each_array_3 = ensure_array_like(seriesState.visibleSeries);
                      $$payload5.out += `<!--[-->`;
                      for (let i = 0, $$length = each_array_3.length; i < $$length; i++) {
                        let s = each_array_3[i];
                        Highlight($$payload5, spread_props([getHighlightProps(s, i)]));
                      }
                      $$payload5.out += `<!--]-->`;
                    } else {
                      $$payload5.out += "<!--[!-->";
                    }
                    $$payload5.out += `<!--]--> `;
                    ChartAnnotations($$payload5, {
                      annotations,
                      layer: "above",
                      highlightKey: seriesState.highlightKey.current,
                      visibleSeries: seriesState.visibleSeries
                    });
                    $$payload5.out += `<!---->`;
                  },
                  $$slots: { default: true }
                });
                $$payload4.out += `<!---->`;
              },
              $$slots: { default: true }
            }
          ]));
          $$payload3.out += `<!----> `;
          aboveContext?.($$payload3, snippetProps);
          $$payload3.out += `<!----> `;
          if (typeof legend === "function") {
            $$payload3.out += "<!--[-->";
            legend($$payload3, snippetProps);
            $$payload3.out += `<!---->`;
          } else if (legend) {
            $$payload3.out += "<!--[1-->";
            Legend($$payload3, spread_props([getLegendProps()]));
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--> `;
          if (typeof tooltip === "function") {
            $$payload3.out += "<!--[-->";
            tooltip($$payload3, snippetProps);
            $$payload3.out += `<!---->`;
          } else if (tooltip) {
            $$payload3.out += "<!--[1-->";
            DefaultTooltip($$payload3, {
              tooltipProps: props.tooltip,
              seriesState,
              canHaveTotal: true
            });
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]-->`;
        }
        $$payload3.out += `<!--]-->`;
      };
      Chart($$payload2, spread_props([
        {
          data: chartData,
          x: xProp,
          xDomain,
          xScale,
          y: yProp ?? series.map((s) => s.value ?? s.key),
          yBaseline: 0,
          yNice: true,
          radial,
          padding: radial ? void 0 : defaultChartPadding(axis, legend)
        },
        restProps,
        {
          tooltip: tooltip === false ? false : {
            mode: "bisect-x",
            onclick: onTooltipClick,
            debug,
            ...props.tooltip?.context
          },
          brush: brush && (brush === true || brush.mode == void 0 || brush.mode === "integrated") ? {
            axis: "x",
            resetOnEnd: true,
            xDomain,
            ...brushProps,
            onBrushEnd: (e) => {
              xDomain = e.xDomain;
              brushProps.onBrushEnd?.(e);
            }
          } : false,
          get context() {
            return context;
          },
          set context($$value) {
            context = $$value;
            $$settled = false;
          },
          children,
          $$slots: { default: true }
        }
      ]));
    }
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { context });
  pop();
}
function Pie($$payload, $$props) {
  push();
  let {
    data,
    range: range2 = [0, 360],
    startAngle: startAngleProp,
    endAngle: endAngleProp,
    innerRadius,
    outerRadius,
    cornerRadius = 0,
    padAngle = 0,
    motion,
    offset = 0,
    tooltipContext,
    sort,
    children
  } = $$props;
  const ctx = getChartContext();
  const endAngle = endAngleProp ?? degreesToRadians(ctx.config.xRange ? max$2(ctx.xRange) : max$2(range2));
  const motionEndAngle = createMotion(0, () => endAngle, motion);
  const pie$1 = (() => {
    let _pie = pie().startAngle(startAngleProp ?? degreesToRadians(ctx.config.xRange ? min$2(ctx.xRange) : min$2(range2))).endAngle(motionEndAngle.current).padAngle(padAngle).value(ctx.x);
    if (sort === null) {
      _pie = _pie.sort(null);
    } else if (sort) {
      _pie = _pie.sort(sort);
    }
    return _pie;
  })();
  const arcs = pie$1(data ?? (Array.isArray(ctx.data) ? ctx.data : []));
  if (children) {
    $$payload.out += "<!--[-->";
    children($$payload, { arcs });
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
    const each_array = ensure_array_like(arcs);
    $$payload.out += `<!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let arc2 = each_array[$$index];
      Arc($$payload, {
        class: layerClass("pie-arc"),
        startAngle: arc2.startAngle,
        endAngle: arc2.endAngle,
        padAngle: arc2.padAngle,
        innerRadius,
        outerRadius,
        cornerRadius,
        offset,
        fill: ctx.config.c ? ctx.cScale?.(ctx.c(arc2.data)) : null,
        data: arc2.data,
        tooltipContext
      });
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]-->`;
  pop();
}
function PieChart($$payload, $$props) {
  push();
  let {
    data = [],
    key = "key",
    label = "label",
    value = "value",
    range: range2 = [0, 360],
    c = key,
    innerRadius,
    outerRadius,
    cornerRadius = 0,
    padAngle = 0,
    placement = "center",
    maxValue,
    center = placement === "center",
    series: seriesProp,
    legend = false,
    onArcClick = () => {
    },
    // TODO: Not usable with manual tooltip / arc path.  Use `onArcClick`?
    /** Event dispatched with current tooltip data */
    onTooltipClick = () => {
    },
    props = {},
    renderContext = "svg",
    profile = false,
    debug = false,
    tooltip = true,
    children: childrenProp,
    aboveContext,
    belowContext,
    belowMarks,
    aboveMarks,
    marks,
    pie: pie2,
    arc: arc2,
    context = void 0,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const series = seriesProp === void 0 ? [{ key: "default", value }] : seriesProp;
  const keyAccessor = accessor(key);
  const labelAccessor = accessor(label);
  const valueAccessor = accessor(value);
  const cAccessor = accessor(c);
  const allSeriesData = series.flatMap((s) => s.data?.map((d) => ({ seriesKey: s.key, ...d }))).filter((d) => d);
  const chartData = allSeriesData.length ? allSeriesData : chartDataArray(data);
  const seriesColors = series.map((s) => s.color).filter((d) => d != null);
  const highlightKey = new HighlightKey();
  const selectedKeys = new SelectionState();
  const selectedSeries = new SelectionState();
  const visibleData = chartData.filter((d) => {
    const dataKey = keyAccessor(d);
    return selectedKeys.isEmpty() || selectedKeys.isSelected(dataKey);
  });
  const visibleSeries = series.filter((s) => selectedSeries.isEmpty() || selectedSeries.isSelected(s.key));
  function getLegendProps() {
    return {
      tickFormat: (tick) => {
        const item = chartData.find((d) => keyAccessor(d) === tick);
        return item ? labelAccessor(item) ?? tick : tick;
      },
      placement: "bottom",
      variant: "swatches",
      onclick: (e, item) => {
        selectedKeys.toggle(item.value);
      },
      onpointerenter: (e, item) => highlightKey.current = item.value,
      onpointerleave: (e) => highlightKey.current = null,
      ...props.legend,
      ...typeof legend === "object" ? legend : null,
      classes: {
        item: (item) => visibleData.length && !visibleData.some((d) => keyAccessor(d) === item.value) ? "opacity-50" : "",
        ...props.legend?.classes,
        ...typeof legend === "object" ? legend.classes : null
      }
    };
  }
  function getGroupProps() {
    if (!context) return {};
    return {
      x: placement === "left" ? context.height / 2 : placement === "right" ? context.width - context.height / 2 : void 0,
      center: ["left", "right"].includes(placement) ? "y" : void 0,
      ...props.group
    };
  }
  function getPieProps(s, i) {
    return {
      data: s.data,
      range: range2,
      innerRadius,
      outerRadius,
      cornerRadius,
      padAngle,
      ...props.pie
    };
  }
  function getArcProps(s, seriesIndex, arc3, arcIndex) {
    if (!context) return {};
    const arcDataProps = "props" in arc3.data && typeof arc3.data.props === "object" ? arc3.data.props : {};
    return {
      startAngle: arc3.startAngle,
      endAngle: arc3.endAngle,
      outerRadius: visibleSeries.length > 1 ? seriesIndex * (outerRadius ?? 0) : outerRadius,
      innerRadius,
      cornerRadius,
      padAngle,
      fill: context.cScale?.(context.c(arc3.data)),
      data: arc3.data,
      tooltipContext: context.tooltip,
      onclick: (e) => {
        onArcClick(e, { data: arc3.data, series: s });
        onTooltipClick(e, { data: arc3.data });
      },
      class: cls("transition-opacity", highlightKey.current && highlightKey.current !== keyAccessor(arc3.data) && "opacity-50"),
      ...props.arc,
      ...s.props,
      ...arcDataProps
    };
  }
  if (profile) {
    console.time("PieChart render");
  }
  setTooltipMetaContext({
    type: "pie",
    get color() {
      return c;
    },
    get value() {
      return value;
    },
    get label() {
      return label;
    },
    get key() {
      return key;
    },
    get visibleSeries() {
      return visibleSeries;
    }
  });
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    {
      let children = function($$payload3, { context: context2 }) {
        const snippetProps = {
          label: labelAccessor,
          key: keyAccessor,
          value: valueAccessor,
          color: cAccessor,
          context: context2,
          series,
          visibleSeries,
          visibleData,
          highlightKey: highlightKey.current,
          setHighlightKey: highlightKey.set,
          getLegendProps,
          getGroupProps
        };
        if (childrenProp) {
          $$payload3.out += "<!--[-->";
          childrenProp($$payload3, snippetProps);
          $$payload3.out += `<!---->`;
        } else {
          $$payload3.out += "<!--[!-->";
          belowContext?.($$payload3, snippetProps);
          $$payload3.out += `<!----> `;
          Layer($$payload3, spread_props([
            { type: renderContext },
            asAny(renderContext === "canvas" ? props.canvas : props.svg),
            {
              center,
              debug,
              children: ($$payload4) => {
                belowMarks?.($$payload4, snippetProps);
                $$payload4.out += `<!----> `;
                if (typeof marks === "function") {
                  $$payload4.out += "<!--[-->";
                  marks($$payload4, snippetProps);
                  $$payload4.out += `<!---->`;
                } else {
                  $$payload4.out += "<!--[!-->";
                  Group($$payload4, spread_props([
                    getGroupProps(),
                    {
                      children: ($$payload5) => {
                        const each_array = ensure_array_like(visibleSeries);
                        $$payload5.out += `<!--[-->`;
                        for (let seriesIdx = 0, $$length = each_array.length; seriesIdx < $$length; seriesIdx++) {
                          let s = each_array[seriesIdx];
                          if (typeof pie2 === "function") {
                            $$payload5.out += "<!--[-->";
                            pie2($$payload5, {
                              ...snippetProps,
                              props: getPieProps(s),
                              index: seriesIdx
                            });
                            $$payload5.out += `<!---->`;
                          } else {
                            $$payload5.out += "<!--[!-->";
                            {
                              let children2 = function($$payload6, { arcs }) {
                                const each_array_1 = ensure_array_like(arcs);
                                $$payload6.out += `<!--[-->`;
                                for (let arcIdx = 0, $$length2 = each_array_1.length; arcIdx < $$length2; arcIdx++) {
                                  let arcData = each_array_1[arcIdx];
                                  const arcProps = getArcProps(s, seriesIdx, arcData);
                                  if (typeof arc2 === "function") {
                                    $$payload6.out += "<!--[-->";
                                    arc2($$payload6, {
                                      ...snippetProps,
                                      props: arcProps,
                                      index: arcIdx,
                                      seriesIndex: seriesIdx
                                    });
                                    $$payload6.out += `<!---->`;
                                  } else {
                                    $$payload6.out += "<!--[!-->";
                                    Arc($$payload6, spread_props([arcProps]));
                                  }
                                  $$payload6.out += `<!--]-->`;
                                }
                                $$payload6.out += `<!--]-->`;
                              };
                              Pie($$payload5, spread_props([
                                getPieProps(s),
                                { children: children2, $$slots: { default: true } }
                              ]));
                            }
                          }
                          $$payload5.out += `<!--]-->`;
                        }
                        $$payload5.out += `<!--]-->`;
                      },
                      $$slots: { default: true }
                    }
                  ]));
                }
                $$payload4.out += `<!--]--> `;
                aboveMarks?.($$payload4, snippetProps);
                $$payload4.out += `<!---->`;
              },
              $$slots: { default: true }
            }
          ]));
          $$payload3.out += `<!----> `;
          aboveContext?.($$payload3, snippetProps);
          $$payload3.out += `<!----> `;
          if (typeof legend === "function") {
            $$payload3.out += "<!--[-->";
            legend($$payload3, snippetProps);
            $$payload3.out += `<!---->`;
          } else if (legend) {
            $$payload3.out += "<!--[1-->";
            Legend($$payload3, spread_props([getLegendProps()]));
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]--> `;
          if (typeof tooltip === "function") {
            $$payload3.out += "<!--[-->";
            tooltip($$payload3, snippetProps);
            $$payload3.out += `<!---->`;
          } else if (tooltip) {
            $$payload3.out += "<!--[1-->";
            $$payload3.out += `<!---->`;
            {
              let children2 = function($$payload4, { data: data2 }) {
                $$payload4.out += `<!---->`;
                TooltipList($$payload4, spread_props([
                  props.tooltip?.list,
                  {
                    children: ($$payload5) => {
                      $$payload5.out += `<!---->`;
                      TooltipItem($$payload5, spread_props([
                        {
                          label: labelAccessor(data2) || keyAccessor(data2),
                          value: valueAccessor(data2),
                          color: context2.cScale?.(context2.c(data2)),
                          format: format$1,
                          onpointerenter: () => highlightKey.current = keyAccessor(data2),
                          onpointerleave: () => highlightKey.current = null
                        },
                        props.tooltip?.item
                      ]));
                      $$payload5.out += `<!---->`;
                    },
                    $$slots: { default: true }
                  }
                ]));
                $$payload4.out += `<!---->`;
              };
              Tooltip($$payload3, spread_props([
                { context: context2 },
                props.tooltip?.root,
                { children: children2, $$slots: { default: true } }
              ]));
            }
            $$payload3.out += `<!---->`;
          } else {
            $$payload3.out += "<!--[!-->";
          }
          $$payload3.out += `<!--]-->`;
        }
        $$payload3.out += `<!--]-->`;
      };
      Chart($$payload2, spread_props([
        {
          data: visibleData,
          x: value,
          y: key,
          c: key,
          cDomain: chartData.map(keyAccessor),
          cRange: seriesColors.length ? seriesColors : c !== key ? chartData.map((d) => cAccessor(d)) : [
            "var(--color-primary)",
            "var(--color-secondary)",
            "var(--color-info)",
            "var(--color-success)",
            "var(--color-warning)",
            "var(--color-danger)"
          ],
          padding: { bottom: legend === true ? 32 : 0 }
        },
        restProps,
        {
          tooltip: tooltip === false ? false : props.tooltip?.context,
          get context() {
            return context;
          },
          set context($$value) {
            context = $$value;
            $$settled = false;
          },
          children,
          $$slots: { default: true }
        }
      ]));
    }
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { context });
  pop();
}
function Chart_tooltip($$payload, $$props) {
  push();
  function defaultFormatter(value, _payload) {
    return `${value}`;
  }
  let {
    ref = null,
    class: className,
    hideLabel = false,
    indicator = "dot",
    hideIndicator = false,
    labelKey,
    label,
    labelFormatter = defaultFormatter,
    labelClassName,
    formatter,
    nameKey,
    color,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  const chart = useChart();
  const tooltipCtx = getTooltipContext();
  const formattedLabel = (() => {
    if (hideLabel || !tooltipCtx.payload?.length) return null;
    const [item] = tooltipCtx.payload;
    const key = labelKey || item?.label || item?.name || "value";
    const itemConfig = getPayloadConfigFromPayload(chart.config, item, key);
    const value = !labelKey && typeof label === "string" ? chart.config[label]?.label || label : itemConfig?.label ?? item.label;
    if (!value) return null;
    if (!labelFormatter) return value;
    return labelFormatter(value, tooltipCtx.payload);
  })();
  const nestLabel = tooltipCtx.payload.length === 1 && indicator !== "dot";
  function TooltipLabel($$payload2) {
    if (formattedLabel) {
      $$payload2.out += "<!--[-->";
      $$payload2.out += `<div${attr_class(clsx$1(cn("font-medium", labelClassName)))}>`;
      if (typeof formattedLabel === "function") {
        $$payload2.out += "<!--[-->";
        formattedLabel($$payload2);
        $$payload2.out += `<!---->`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `${escape_html(formattedLabel)}`;
      }
      $$payload2.out += `<!--]--></div>`;
    } else {
      $$payload2.out += "<!--[!-->";
    }
    $$payload2.out += `<!--]-->`;
  }
  $$payload.out += `<!---->`;
  Tooltip($$payload, {
    variant: "none",
    children: ($$payload2) => {
      const each_array = ensure_array_like(tooltipCtx.payload);
      $$payload2.out += `<div${spread_attributes(
        {
          class: clsx$1(cn("border-border/50 bg-background grid min-w-[9rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl", className)),
          ...restProps
        },
        null
      )}>`;
      if (!nestLabel) {
        $$payload2.out += "<!--[-->";
        TooltipLabel($$payload2);
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> <div class="grid gap-1.5"><!--[-->`;
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let item = each_array[i];
        const key = `${nameKey || item.key || item.name || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(chart.config, item, key);
        const indicatorColor = color || item.payload?.color || item.color;
        $$payload2.out += `<div${attr_class(clsx$1(cn("[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:size-2.5", indicator === "dot" && "items-center")))}>`;
        if (formatter && item.value !== void 0 && item.name) {
          $$payload2.out += "<!--[-->";
          formatter($$payload2, {
            value: item.value,
            name: item.name,
            item,
            index: i,
            payload: tooltipCtx.payload
          });
          $$payload2.out += `<!---->`;
        } else {
          $$payload2.out += "<!--[!-->";
          if (itemConfig?.icon) {
            $$payload2.out += "<!--[-->";
            $$payload2.out += `<!---->`;
            itemConfig.icon($$payload2, {});
            $$payload2.out += `<!---->`;
          } else if (!hideIndicator) {
            $$payload2.out += "<!--[1-->";
            $$payload2.out += `<div${attr_style(`--color-bg: ${stringify(indicatorColor)}; --color-border: ${stringify(indicatorColor)};`)}${attr_class(clsx$1(cn("border-(--color-border) bg-(--color-bg) shrink-0 rounded-[2px]", {
              "size-2.5": indicator === "dot",
              "h-full w-1": indicator === "line",
              "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
              "my-0.5": nestLabel && indicator === "dashed"
            })))}></div>`;
          } else {
            $$payload2.out += "<!--[!-->";
          }
          $$payload2.out += `<!--]--> <div${attr_class(clsx$1(cn("flex flex-1 shrink-0 justify-between leading-none", nestLabel ? "items-end" : "items-center")))}><div class="grid gap-1.5">`;
          if (nestLabel) {
            $$payload2.out += "<!--[-->";
            TooltipLabel($$payload2);
          } else {
            $$payload2.out += "<!--[!-->";
          }
          $$payload2.out += `<!--]--> <span class="text-muted-foreground">${escape_html(itemConfig?.label || item.name)}</span></div> `;
          if (item.value) {
            $$payload2.out += "<!--[-->";
            $$payload2.out += `<span class="text-foreground font-mono font-medium tabular-nums">${escape_html(item.value.toLocaleString())}</span>`;
          } else {
            $$payload2.out += "<!--[!-->";
          }
          $$payload2.out += `<!--]--></div>`;
        }
        $$payload2.out += `<!--]--></div>`;
      }
      $$payload2.out += `<!--]--></div></div>`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!---->`;
  bind_props($$props, { ref });
  pop();
}
ce({
  base: "hover:bg-muted hover:text-muted-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  variants: {
    variant: {
      default: "bg-transparent",
      outline: "border-input shadow-xs hover:bg-accent hover:text-accent-foreground border bg-transparent"
    },
    size: {
      default: "h-9 min-w-9 px-2",
      sm: "h-8 min-w-8 px-1.5",
      lg: "h-10 min-w-10 px-2.5"
    }
  },
  defaultVariants: { variant: "default", size: "default" }
});
function Tabs($$payload, $$props) {
  push();
  let {
    ref = null,
    value = "",
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Tabs$1($$payload2, spread_props([
      {
        "data-slot": "tabs",
        class: cn("flex flex-col gap-2", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        },
        get value() {
          return value;
        },
        set value($$value) {
          value = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref, value });
  pop();
}
function Tabs_content($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Tabs_content$1($$payload2, spread_props([
      {
        "data-slot": "tabs-content",
        class: cn("flex-1 outline-none", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Tabs_list($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Tabs_list$1($$payload2, spread_props([
      {
        "data-slot": "tabs-list",
        class: cn("bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function Tabs_trigger($$payload, $$props) {
  push();
  let {
    ref = null,
    class: className,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    $$payload2.out += `<!---->`;
    Tabs_trigger$1($$payload2, spread_props([
      {
        "data-slot": "tabs-trigger",
        class: cn("data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-transparent px-2 py-1 text-sm font-medium transition-[color,box-shadow] focus-visible:outline-1 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", className)
      },
      restProps,
      {
        get ref() {
          return ref;
        },
        set ref($$value) {
          ref = $$value;
          $$settled = false;
        }
      }
    ]));
    $$payload2.out += `<!---->`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { ref });
  pop();
}
function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  function formatCurrency(value) {
    if (value === null || value === void 0) {
      return "₱0.00";
    }
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }
  const chartConfig = {
    total: { label: "Total", color: "var(--chart-1)" },
    countRemaining: { color: "var(--secondary)" },
    count: { label: "Count", color: "var(--chart-2)" },
    month: { label: "Month" },
    quantity: { label: "Quantity", color: "var(--chart-3)" },
    cost: { label: "Cost", color: "var(--chart-4)" },
    value: {
      // Generic value for pie charts
      label: "Value",
      color: "var(--chart-5)"
    },
    // Specific colors for operator types and booking statuses
    pond: {
      label: "Pond Operators",
      color: "var(--chart-1)"
    },
    cage: {
      label: "Cage Operators",
      color: "var(--chart-2)"
    },
    org: {
      label: "Organizations",
      color: "var(--chart-3)"
    },
    pending: { label: "Pending", color: "var(--chart-4)" },
    confirmed: { label: "Confirmed", color: "var(--chart-1)" },
    completed: { label: "Completed", color: "var(--chart-2)" },
    cancelled: {
      label: "Cancelled",
      color: "var(--destructive)"
    },
    no_show: { label: "No Show", color: "var(--chart-5)" },
    expired: { label: "Expired", color: "var(--chart-3)" },
    // Feed stages
    "Fry Booster": { label: "Fry Booster", color: "var(--chart-3)" },
    "Pre Starter": { label: "Pre Starter", color: "var(--chart-4)" },
    "Finisher": { label: "Finisher", color: "var(--chart-5)" },
    countYAxis: {
      // Using a distinct key for Y-axis config to avoid confusion with 'count' series
      label: "Count"
      // Ensure Y-axis starts from 0, auto-scales max
    }
  };
  [
    { key: "count", color: chartConfig.count.color }
  ];
  let clientsByOperatorTypeChartData = () => {
    return data.charts.clientsByOperatorType.map((d) => ({
      id: d.operator_type,
      // Unique ID for each slice
      value: d.count,
      label: chartConfig[d.operator_type]?.label || d.operator_type,
      fill: chartConfig[d.operator_type]?.color || "var(--chart-5)"
    }));
  };
  let feedConsumptionByStageChartData = () => {
    return data.charts.feedConsumptionByStage.map((d) => ({
      key: d.feed_stage,
      maxValue: d.total_kg,
      value: d.current_kg,
      fill: chartConfig[d.feed_stage]?.color || "var(--chart-5)"
    }));
  };
  let topHardwareItemsChartData = () => {
    return data.charts.topHardwareItems.map((d) => ({
      item_name: d.item_name,
      total_cost: d.total_cost,
      fill: chartConfig.total.color
    }));
  };
  let bookingsStatusChartData = () => {
    return data.charts.bookingsStatus.map((d) => ({
      id: d.status,
      // Unique ID for each slice
      value: d.count,
      label: chartConfig[d.status]?.label || d.status,
      fill: chartConfig[d.status]?.color || "var(--chart-5)"
    }));
  };
  $$payload.out += `<div class="space-y-3 p-4 md:p-6"><h1 class="font-bold text-2xl">Dashboard</h1> <p class="text-muted-foreground">View summaries and graphs of all data across the inventory system</p> <!---->`;
  Tabs($$payload, {
    value: "summary",
    class: "space-y-6",
    children: ($$payload2) => {
      $$payload2.out += `<!---->`;
      Tabs_list($$payload2, {
        children: ($$payload3) => {
          $$payload3.out += `<!---->`;
          Tabs_trigger($$payload3, {
            value: "summary",
            children: ($$payload4) => {
              $$payload4.out += `<!---->Summary`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> <!---->`;
          Tabs_trigger($$payload3, {
            value: "graphs",
            children: ($$payload4) => {
              $$payload4.out += `<!---->Graphs`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Tabs_content($$payload2, {
        class: "transition-opacity duration-300 ease-out",
        value: "summary",
        children: ($$payload3) => {
          $$payload3.out += `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">`;
          Card($$payload3, {
            class: "col-span-1",
            children: ($$payload4) => {
              Card_header($$payload4, {
                children: ($$payload5) => {
                  Card_description($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->Total Clients`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Card_title($$payload5, {
                    class: "@[250px]/card:text-3xl text-2xl font-semibold tabular-nums",
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->${escape_html(data.keyMetrics.totalClients)}`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Card_action($$payload5, {
                    children: ($$payload6) => {
                      Users($$payload6, { class: "h-4 w-4 text-muted-foreground" });
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> `;
              Card_footer($$payload4, {
                class: "flex-col items-start gap-1.5 text-sm",
                children: ($$payload5) => {
                  $$payload5.out += `<div class="line-clamp-1 flex gap-2 font-medium">${escape_html(data.keyMetrics.newClientsLastMonth)} new this month `;
                  if (data.keyMetrics.newClientsLastMonth > 0) {
                    $$payload5.out += "<!--[-->";
                    Trending_up($$payload5, { class: "size-4 text-green-500" });
                  } else {
                    $$payload5.out += "<!--[!-->";
                    Trending_down($$payload5, { class: "size-4 text-red-500" });
                  }
                  $$payload5.out += `<!--]--></div> <div class="text-muted-foreground">${escape_html(data.keyMetrics.inactiveClients)} operators are inactive</div>`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!---->`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          Card($$payload3, {
            class: "col-span-1",
            children: ($$payload4) => {
              Card_header($$payload4, {
                children: ($$payload5) => {
                  Card_description($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->Total Ponds`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Card_title($$payload5, {
                    class: "@[250px]/card:text-3xl text-2xl font-semibold tabular-nums",
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->${escape_html(data.keyMetrics.totalPonds)}`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Card_action($$payload5, {
                    children: ($$payload6) => {
                      Fish($$payload6, { class: "h-4 w-4 text-muted-foreground" });
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> `;
              Card_footer($$payload4, {
                class: "flex-col items-start gap-1.5 text-sm",
                children: ($$payload5) => {
                  $$payload5.out += `<div class="line-clamp-1 flex gap-2 font-medium">${escape_html(data.keyMetrics.activePonds)} active pond(s) `;
                  if (data.keyMetrics.newClientsLastMonth > 0) {
                    $$payload5.out += "<!--[-->";
                    Trending_up($$payload5, { class: "size-4 text-green-500" });
                  } else {
                    $$payload5.out += "<!--[!-->";
                    Trending_down($$payload5, { class: "size-4 text-red-500" });
                  }
                  $$payload5.out += `<!--]--></div> <div class="text-muted-foreground">${escape_html(data.keyMetrics.inactivePonds)} inactive ponds</div>`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!---->`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          Card($$payload3, {
            class: "col-span-1",
            children: ($$payload4) => {
              Card_header($$payload4, {
                children: ($$payload5) => {
                  Card_description($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->Total Employees`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Card_title($$payload5, {
                    class: "@[250px]/card:text-3xl text-2xl font-semibold tabular-nums",
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->${escape_html(data.keyMetrics.totalEmployees)}`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Card_action($$payload5, {
                    children: ($$payload6) => {
                      Briefcase($$payload6, { class: "h-4 w-4 text-muted-foreground" });
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> `;
              Card_footer($$payload4, {
                class: "flex-col items-start gap-1.5 text-sm",
                children: ($$payload5) => {
                  $$payload5.out += `<div class="line-clamp-1 flex gap-2 font-medium">${escape_html(data.keyMetrics.newEmployeesThisQuarter)} hired this quarter `;
                  if (data.keyMetrics.newEmployeesThisQuarter > 0) {
                    $$payload5.out += "<!--[-->";
                    Trending_up($$payload5, { class: "size-4 text-green-500" });
                  } else {
                    $$payload5.out += "<!--[!-->";
                    Trending_down($$payload5, { class: "size-4 text-red-500" });
                  }
                  $$payload5.out += `<!--]--></div> <div class="text-muted-foreground">${escape_html(data.keyMetrics.birthdaysThisMonth.birthday)}</div>`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!---->`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          Card($$payload3, {
            class: "col-span-1",
            children: ($$payload4) => {
              Card_header($$payload4, {
                children: ($$payload5) => {
                  Card_description($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->Total Stockings`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Card_title($$payload5, {
                    class: "@[250px]/card:text-3xl text-2xl font-semibold tabular-nums",
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->${escape_html(data.keyMetrics.totalStockingEvents)}`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Card_action($$payload5, {
                    children: ($$payload6) => {
                      Clipboard_list($$payload6, { class: "h-4 w-4 text-muted-foreground" });
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> `;
              Card_footer($$payload4, {
                class: "flex-col items-start gap-1.5 text-sm",
                children: ($$payload5) => {
                  $$payload5.out += `<div class="line-clamp-1 flex gap-2 font-medium">${escape_html(data.keyMetrics.lastStockingDate)} last stocking date `;
                  Info($$payload5, { class: "size-4 text-blue-500" });
                  $$payload5.out += `<!----></div> <div class="text-muted-foreground">${escape_html(data.keyMetrics.stockedPondsThisMonth)} ponds stocked this month</div>`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!---->`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----></div> `;
          Separator($$payload3, { class: "my-6" });
          $$payload3.out += `<!----> <div class="grid grid-cols-1 lg:grid-cols-2 gap-4"><!---->`;
          Collapsible($$payload3, {
            open: true,
            children: ($$payload4) => {
              Card($$payload4, {
                class: "col-span-1 lg:col-span-1 h-fit",
                children: ($$payload5) => {
                  Card_header($$payload5, {
                    children: ($$payload6) => {
                      Card_title($$payload6, {
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->Financial Overview`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!----> `;
                      Card_description($$payload6, {
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->Sales and cost summaries from the operators' sales`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!----> `;
                      Card_action($$payload6, {
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->`;
                          Collapsible_trigger($$payload7, {
                            class: buttonVariants({
                              variant: "ghost",
                              size: "sm",
                              class: "w-9 p-0"
                            }),
                            children: ($$payload8) => {
                              Chevrons_up_down($$payload8, {});
                              $$payload8.out += `<!----> <span class="sr-only">Toggle</span>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!---->`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!---->`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> <!---->`;
                  Collapsible_content($$payload5, {
                    class: "\r\n                                overflow-hidden\r\n                                transition-all\r\n                                duration-500 ease-linear\r\n                                data-[state=closed]:animate-collapsible-up\r\n                                data-[state=open]:animate-collapsible-down",
                    children: ($$payload6) => {
                      Card_content($$payload6, {
                        class: "grid grid-cols-1 md:grid-cols-2 gap-4",
                        children: ($$payload7) => {
                          $$payload7.out += `<div class="flex items-center gap-3 rounded-md border p-4">`;
                          Dollar_sign($$payload7, { class: "h-6 w-6 text-green-500" });
                          $$payload7.out += `<!----> <div><p class="text-sm text-muted-foreground">Total Estimated Sales</p> <p class="text-lg font-semibold tracking-wide">${escape_html(formatCurrency(data.financialSummary.totalEstimatedSales))}</p></div></div> <div class="flex items-center gap-3 rounded-md border p-4">`;
                          Trending_up($$payload7, { class: "h-6 w-6 text-blue-500" });
                          $$payload7.out += `<!----> <div><p class="text-sm text-muted-foreground">Total Projected Amount</p> <p class="text-lg font-semibold">${escape_html(formatCurrency(data.financialSummary.totalProjectedAmount))}</p></div></div> <div class="flex items-center gap-3 rounded-md border p-4">`;
                          Wheat($$payload7, { class: "h-6 w-6 text-yellow-600" });
                          $$payload7.out += `<!----> <div><p class="text-sm text-muted-foreground">Total Feeds Used</p> <p class="text-lg font-semibold">${escape_html(data.financialSummary.totalFeedsUsedKg)} kg</p></div></div> <div class="flex items-center gap-3 rounded-md border p-4">`;
                          Dollar_sign($$payload7, { class: "h-6 w-6 text-red-500" });
                          $$payload7.out += `<!----> <div><p class="text-sm text-muted-foreground">Total Feed Cost</p> <p class="text-lg font-semibold">${escape_html(formatCurrency(data.financialSummary.totalFeedCost))}</p></div></div>`;
                        },
                        $$slots: { default: true }
                      });
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> <!---->`;
          Collapsible($$payload3, {
            open: true,
            children: ($$payload4) => {
              Card($$payload4, {
                class: "col-span-1 lg:col-span-1 h-fit",
                children: ($$payload5) => {
                  Card_header($$payload5, {
                    children: ($$payload6) => {
                      Card_title($$payload6, {
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->Upcoming Bookings`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!----> `;
                      Card_description($$payload6, {
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->View the next upcoming bookings`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!----> `;
                      Card_action($$payload6, {
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->`;
                          Collapsible_trigger($$payload7, {
                            class: buttonVariants({
                              variant: "ghost",
                              size: "sm",
                              class: "w-9 p-0"
                            }),
                            children: ($$payload8) => {
                              Chevrons_up_down($$payload8, {});
                              $$payload8.out += `<!----> <span class="sr-only">Toggle</span>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!---->`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!---->`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> <!---->`;
                  Collapsible_content($$payload5, {
                    class: "\r\n                                overflow-hidden\r\n                                transition-all\r\n                                duration-500 ease-linear\r\n                                data-[state=closed]:animate-collapsible-up\r\n                                data-[state=open]:animate-collapsible-down",
                    children: ($$payload6) => {
                      if (data.recentStocking.length > 0) {
                        $$payload6.out += "<!--[-->";
                        const each_array = ensure_array_like(data.upcomingBookings);
                        $$payload6.out += `<ul class="space-y-3"><!--[-->`;
                        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                          let activity = each_array[$$index];
                          $$payload6.out += `<li class="flex items-center justify-between ml-3 mr-3 gap-3 p-3 border rounded-md"><div>`;
                          Badge($$payload6, {
                            variant: "outline",
                            children: ($$payload7) => {
                              if (activity.purpose == "consultation") {
                                $$payload7.out += "<!--[-->";
                                Speech($$payload7, {});
                                $$payload7.out += `<!----> Consultation`;
                              } else {
                                $$payload7.out += "<!--[!-->";
                                Calendar_fold($$payload7, {});
                                $$payload7.out += `<!----> Reservation`;
                              }
                              $$payload7.out += `<!--]-->`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload6.out += `<!----> <p class="font-medium pr-5 pl-5 text-clip">${escape_html(activity.date)}</p> <p class="text-sm text-muted-foreground pr-5 pl-5">Client: ${escape_html(activity.client_name)}</p></div> <p class="font-medium pr-5">${escape_html(activity.time)}</p></li>`;
                        }
                        $$payload6.out += `<!--]--></ul>`;
                      } else {
                        $$payload6.out += "<!--[!-->";
                        $$payload6.out += `<p class="text-center text-muted-foreground">No upcoming bookings.</p>`;
                      }
                      $$payload6.out += `<!--]-->`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----></div> `;
          Separator($$payload3, { class: "my-6" });
          $$payload3.out += `<!----> <div class="grid grid-cols-1 lg:grid-cols-2 gap-4"><!---->`;
          Collapsible($$payload3, {
            children: ($$payload4) => {
              Card($$payload4, {
                class: "lg:col-span-1 h-fit",
                children: ($$payload5) => {
                  Card_header($$payload5, {
                    children: ($$payload6) => {
                      Card_title($$payload6, {
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->Recent Stocking Events`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!----> `;
                      Card_description($$payload6, {
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->Last 5 recorded stocking operations.`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!----> `;
                      Card_action($$payload6, {
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->`;
                          Collapsible_trigger($$payload7, {
                            class: buttonVariants({
                              variant: "ghost",
                              size: "sm",
                              class: "w-9 p-0"
                            }),
                            children: ($$payload8) => {
                              Chevrons_up_down($$payload8, {});
                              $$payload8.out += `<!----> <span class="sr-only">Toggle</span>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!---->`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!---->`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Card_content($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->`;
                      Collapsible_content($$payload6, {
                        class: "\r\n                                 overflow-hidden\r\n                                transition-all\r\n                                duration-500 ease-linear\r\n                                data-[state=closed]:animate-collapsible-up\r\n                                data-[state=open]:animate-collapsible-down",
                        children: ($$payload7) => {
                          if (data.recentStocking.length > 0) {
                            $$payload7.out += "<!--[-->";
                            const each_array_1 = ensure_array_like(data.recentStocking);
                            $$payload7.out += `<ul class="space-y-3"><!--[-->`;
                            for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
                              let event = each_array_1[$$index_1];
                              $$payload7.out += `<li class="flex items-center justify-between rounded-md border p-3"><div><p class="font-medium">${escape_html(event.species_name)}</p> <p class="text-sm text-muted-foreground">Client: ${escape_html(event.client_name)}</p> <p class="text-xs text-muted-foreground">${escape_html(event.stocking_date)}</p></div> `;
                              Badge($$payload7, {
                                variant: "outline",
                                children: ($$payload8) => {
                                  Fish($$payload8, {});
                                  $$payload8.out += `<!----> ${escape_html(event.fingerlings_stocked_count_ma)}`;
                                },
                                $$slots: { default: true }
                              });
                              $$payload7.out += `<!----></li>`;
                            }
                            $$payload7.out += `<!--]--></ul>`;
                          } else {
                            $$payload7.out += "<!--[!-->";
                            $$payload7.out += `<p class="text-center text-muted-foreground">No recent stocking events.</p>`;
                          }
                          $$payload7.out += `<!--]-->`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!---->`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> <!---->`;
          Collapsible($$payload3, {
            children: ($$payload4) => {
              Card($$payload4, {
                class: "col-span-1 lg:col-span-1 h-fit",
                children: ($$payload5) => {
                  Card_header($$payload5, {
                    children: ($$payload6) => {
                      Card_title($$payload6, {
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->Recent System Activity`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!----> `;
                      Card_description($$payload6, {
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->Latest actions performed across the system.`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!----> `;
                      Card_action($$payload6, {
                        children: ($$payload7) => {
                          $$payload7.out += `<!---->`;
                          Collapsible_trigger($$payload7, {
                            class: buttonVariants({
                              variant: "ghost",
                              size: "sm",
                              class: "w-9 p-0"
                            }),
                            children: ($$payload8) => {
                              Chevrons_up_down($$payload8, {});
                              $$payload8.out += `<!----> <span class="sr-only">Toggle</span>`;
                            },
                            $$slots: { default: true }
                          });
                          $$payload7.out += `<!---->`;
                        },
                        $$slots: { default: true }
                      });
                      $$payload6.out += `<!---->`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Card_content($$payload5, {
                    children: ($$payload6) => {
                      if (data.recentActivities.length > 0) {
                        $$payload6.out += "<!--[-->";
                        $$payload6.out += `<!---->`;
                        Collapsible_content($$payload6, {
                          class: "\r\n                                 overflow-hidden\r\n                                transition-all\r\n                                duration-500 ease-linear\r\n                                data-[state=closed]:animate-collapsible-up\r\n                                data-[state=open]:animate-collapsible-down",
                          children: ($$payload7) => {
                            const each_array_2 = ensure_array_like(data.recentActivities);
                            $$payload7.out += `<ul class="space-y-3"><!--[-->`;
                            for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
                              let activity = each_array_2[$$index_2];
                              $$payload7.out += `<li class="flex items-center gap-3 p-3 border rounded-md"><div>`;
                              Badge($$payload7, {
                                variant: "outline",
                                children: ($$payload8) => {
                                  if (activity.action_type === "created") {
                                    $$payload8.out += "<!--[-->";
                                    Plus($$payload8, { class: "h-5 w-5 text-green-500" });
                                    $$payload8.out += `<!----> Created`;
                                  } else if (activity.action_type === "updated") {
                                    $$payload8.out += "<!--[1-->";
                                    Pencil($$payload8, { class: "h-5 w-5 text-blue-500" });
                                    $$payload8.out += `<!----> Updated`;
                                  } else if (activity.action_type === "deleted") {
                                    $$payload8.out += "<!--[2-->";
                                    Trash_2($$payload8, { class: "h-5 w-5 text-red-500" });
                                    $$payload8.out += `<!----> Deleted`;
                                  } else {
                                    $$payload8.out += "<!--[!-->";
                                    Clipboard_list($$payload8, { class: "h-5 w-5 text-muted-foreground" });
                                  }
                                  $$payload8.out += `<!--]-->`;
                                },
                                $$slots: { default: true }
                              });
                              $$payload7.out += `<!----> <p class="font-medium pr-5 pl-5 text-clip">${escape_html(activity.description)}</p> <p class="text-sm text-muted-foreground pr-5 pl-5">${escape_html(activity.timestamp)} `;
                              if (activity.performed_by_user) {
                                $$payload7.out += "<!--[-->";
                                $$payload7.out += `by ${escape_html(activity.performed_by_user)}`;
                              } else {
                                $$payload7.out += "<!--[!-->";
                              }
                              $$payload7.out += `<!--]--></p></div></li>`;
                            }
                            $$payload7.out += `<!--]--></ul>`;
                          },
                          $$slots: { default: true }
                        });
                        $$payload6.out += `<!---->`;
                      } else {
                        $$payload6.out += "<!--[!-->";
                        $$payload6.out += `<p class="text-center text-muted-foreground">No recent activities to display.</p>`;
                      }
                      $$payload6.out += `<!--]-->`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                },
                $$slots: { default: true }
              });
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----></div>`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <!---->`;
      Tabs_content($$payload2, {
        class: "transition-opacity duration-300 ease-out",
        value: "graphs",
        children: ($$payload3) => {
          $$payload3.out += `<div class="grid grid-cols-1 lg:grid-cols-3 gap-4"><div class="grid grid-cols-1 gap-4 lg:col-span-1">`;
          Card($$payload3, {
            class: "h-full",
            children: ($$payload4) => {
              Card_header($$payload4, {
                children: ($$payload5) => {
                  Card_title($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->Clients by Operator Type`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Card_description($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->Distribution of clients based on their operation type.`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> `;
              Card_content($$payload4, {
                class: "h-full flex items-center justify-center",
                children: ($$payload5) => {
                  if (clientsByOperatorTypeChartData().length > 0) {
                    $$payload5.out += "<!--[-->";
                    Chart_container($$payload5, {
                      config: chartConfig,
                      class: "min-h-[200px] h-full w-full",
                      children: ($$payload6) => {
                        {
                          let tooltip = function($$payload7) {
                            Chart_tooltip($$payload7, { label: "Operator Type" });
                          };
                          PieChart($$payload6, {
                            data: clientsByOperatorTypeChartData(),
                            key: "id",
                            value: "value",
                            innerRadius: -33,
                            cornerRadius: 5,
                            padAngle: 0.02,
                            cRange: [
                              chartConfig.cage.color,
                              chartConfig.org.color,
                              chartConfig.pond.color
                            ],
                            label: "label",
                            outerRadius: 100,
                            legend: { placement: "left", orientation: "vertical" },
                            tooltip,
                            $$slots: { tooltip: true }
                          });
                        }
                      },
                      $$slots: { default: true }
                    });
                  } else {
                    $$payload5.out += "<!--[!-->";
                    $$payload5.out += `<p class="text-muted-foreground">No data to display for client types.</p>`;
                  }
                  $$payload5.out += `<!--]-->`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!---->`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          Card($$payload3, {
            class: "h-full",
            children: ($$payload4) => {
              Card_header($$payload4, {
                children: ($$payload5) => {
                  Card_title($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->Bookings Status Distribution`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Card_description($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->Current status of all client bookings.`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> `;
              Card_content($$payload4, {
                class: "h-full flex items-center justify-center",
                children: ($$payload5) => {
                  if (bookingsStatusChartData().length > 0) {
                    $$payload5.out += "<!--[-->";
                    Chart_container($$payload5, {
                      config: chartConfig,
                      class: "min-h-[200px] w-full h-full",
                      children: ($$payload6) => {
                        {
                          let tooltip = function($$payload7) {
                            Chart_tooltip($$payload7, { label: "Status" });
                          };
                          PieChart($$payload6, {
                            data: bookingsStatusChartData(),
                            key: "id",
                            value: "value",
                            label: "label",
                            innerRadius: -33,
                            cornerRadius: 5,
                            padAngle: 0.02,
                            cRange: [
                              chartConfig.pending.color,
                              chartConfig.confirmed.color,
                              chartConfig.completed.color,
                              chartConfig.cancelled.color,
                              chartConfig.no_show.color,
                              chartConfig.expired.color
                            ],
                            outerRadius: 100,
                            legend: { placement: "right", orientation: "vertical" },
                            tooltip,
                            $$slots: { tooltip: true }
                          });
                        }
                      },
                      $$slots: { default: true }
                    });
                  } else {
                    $$payload5.out += "<!--[!-->";
                    $$payload5.out += `<p class="text-muted-foreground">No data to display for booking statuses.</p>`;
                  }
                  $$payload5.out += `<!--]-->`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!---->`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----></div>  `;
          Card($$payload3, {
            class: "lg:col-span-2 h-full",
            children: ($$payload4) => {
              Card_header($$payload4, {
                children: ($$payload5) => {
                  Card_title($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->Monthly Stocking Trends`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Card_description($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->Number of stocking events over the last 12 months.`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> `;
              Card_content($$payload4, {
                class: "h-full flex items-center justify-center",
                children: ($$payload5) => {
                  if (data.charts.monthlyStockingChartData.length > 0) {
                    $$payload5.out += "<!--[-->";
                    Chart_container($$payload5, {
                      config: chartConfig,
                      class: "min-h-[200px] h-full w-full",
                      children: ($$payload6) => {
                        {
                          let tooltip = function($$payload7) {
                            Chart_tooltip($$payload7, {});
                          };
                          LineChart($$payload6, {
                            data: data.charts.monthlyStockingChartData,
                            x: "month",
                            y: "count",
                            points: true,
                            xScale: band(),
                            props: { spline: { curve: curveCatmullRom } },
                            series: [
                              { key: "count", color: chartConfig.total.color }
                            ],
                            tooltip,
                            $$slots: { tooltip: true }
                          });
                        }
                      },
                      $$slots: { default: true }
                    });
                  } else {
                    $$payload5.out += "<!--[!-->";
                    $$payload5.out += `<p class="text-muted-foreground">No data to display for monthly stocking.</p>`;
                  }
                  $$payload5.out += `<!--]-->`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!---->`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----></div> `;
          Separator($$payload3, { class: "my-6" });
          $$payload3.out += `<!----> <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">`;
          Card($$payload3, {
            class: "lg:col-span-1",
            children: ($$payload4) => {
              Card_header($$payload4, {
                children: ($$payload5) => {
                  Card_title($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->Current Feed Stocks`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Card_description($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->Displays the total quantity of a feed stage and its current stocks (kg)`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> `;
              Card_content($$payload4, {
                class: "h-80%",
                children: ($$payload5) => {
                  if (feedConsumptionByStageChartData().length > 0) {
                    $$payload5.out += "<!--[-->";
                    Chart_container($$payload5, {
                      config: chartConfig,
                      class: "min-h-[200px] h-100% w-100% rounded resize overflow-auto p-4 flex col",
                      children: ($$payload6) => {
                        {
                          let tooltip = function($$payload7) {
                            Chart_tooltip($$payload7, {
                              labelKey: "key",
                              nameKey: "key",
                              indicator: "dot"
                            });
                          };
                          BarChart($$payload6, {
                            data: feedConsumptionByStageChartData(),
                            x: "key",
                            series: [
                              {
                                key: "maxValue",
                                color: chartConfig.quantity.color
                              },
                              {
                                key: "value",
                                color: chartConfig.countRemaining.color,
                                props: { insets: { x: 8 } }
                              }
                            ],
                            tooltip,
                            $$slots: { tooltip: true }
                          });
                        }
                      },
                      $$slots: { default: true }
                    });
                  } else {
                    $$payload5.out += "<!--[!-->";
                    $$payload5.out += `<p class="text-muted-foreground">No data to display for feed consumption.</p>`;
                  }
                  $$payload5.out += `<!--]-->`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> `;
              Card_footer($$payload4, {
                children: ($$payload5) => {
                  $$payload5.out += `<small class="text-muted-foreground text-center">maxValue is the total feeds quantity</small>`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!---->`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----> `;
          Card($$payload3, {
            class: "lg:col-span-1",
            children: ($$payload4) => {
              Card_header($$payload4, {
                children: ($$payload5) => {
                  Card_title($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->Top 5 Most Expensive Hardware Items`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!----> `;
                  Card_description($$payload5, {
                    children: ($$payload6) => {
                      $$payload6.out += `<!---->Items with the highest total cost in inventory.`;
                    },
                    $$slots: { default: true }
                  });
                  $$payload5.out += `<!---->`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!----> `;
              Card_content($$payload4, {
                class: "h-80%",
                children: ($$payload5) => {
                  if (topHardwareItemsChartData().length > 0) {
                    $$payload5.out += "<!--[-->";
                    Chart_container($$payload5, {
                      config: chartConfig,
                      class: "min-h-[200px] w-full p-2",
                      children: ($$payload6) => {
                        {
                          let tooltip = function($$payload7) {
                            Chart_tooltip($$payload7, {
                              label: "Total Cost",
                              nameKey: "item_name",
                              indicator: "dot"
                            });
                          };
                          BarChart($$payload6, {
                            data: topHardwareItemsChartData(),
                            x: "item_name",
                            y: "total_cost",
                            cRange: [
                              chartConfig.pending.color,
                              // pending
                              chartConfig.confirmed.color,
                              // confirmed
                              chartConfig.completed.color,
                              // completed
                              chartConfig.cancelled.color,
                              // cancelled
                              chartConfig.no_show.color
                              // no_show
                            ],
                            tooltip,
                            $$slots: { tooltip: true }
                          });
                        }
                      },
                      $$slots: { default: true }
                    });
                  } else {
                    $$payload5.out += "<!--[!-->";
                    $$payload5.out += `<p class="text-muted-foreground">No data to display for top hardware items.</p>`;
                  }
                  $$payload5.out += `<!--]-->`;
                },
                $$slots: { default: true }
              });
              $$payload4.out += `<!---->`;
            },
            $$slots: { default: true }
          });
          $$payload3.out += `<!----></div> `;
          Separator($$payload3, { class: "my-6" });
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!---->`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-B-RPZ86u.js.map
