
var h;
h || (h = typeof Module !== 'undefined' ? Module : {});
var aa = Object.assign({}, h), ca = [], da = "./this.program", ea = (a, b) => {
  throw b;
}, fa = "object" == typeof window, ha = "function" == typeof importScripts, k = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node, ia = !fa && !k && !ha;
if (h.ENVIRONMENT) {
  throw Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)");
}
var l = "", ka, la, ma;
function na(a) {
  if (!(a instanceof oa)) {
    var b = a;
    a && "object" == typeof a && a.stack && (b = [a, a.stack]);
    n("exiting due to exception: " + b);
  }
}
if (k) {
  if ("undefined" == typeof process || !process.release || "node" !== process.release.name) {
    throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  }
  var fs = require("fs"), pa = require("path");
  l = ha ? pa.dirname(l) + "/" : __dirname + "/";
  ka = (a, b) => {
    a = qa(a) ? new URL(a) : pa.normalize(a);
    return fs.readFileSync(a, b ? void 0 : "utf8");
  };
  ma = a => {
    a = ka(a, !0);
    a.buffer || (a = new Uint8Array(a));
    assert(a.buffer);
    return a;
  };
  la = (a, b, c) => {
    a = qa(a) ? new URL(a) : pa.normalize(a);
    fs.readFile(a, function(d, e) {
      d ? c(d) : b(e.buffer);
    });
  };
  1 < process.argv.length && (da = process.argv[1].replace(/\\/g, "/"));
  ca = process.argv.slice(2);
  "undefined" != typeof module && (module.exports = h);
  process.on("uncaughtException", function(a) {
    if (!(a instanceof oa)) {
      throw a;
    }
  });
  process.on("unhandledRejection", function(a) {
    throw a;
  });
  ea = (a, b) => {
    if (noExitRuntime) {
      throw process.exitCode = a, b;
    }
    na(b);
    process.exit(a);
  };
  h.inspect = function() {
    return "[Emscripten Module object]";
  };
} else if (ia) {
  if ("object" == typeof process && "function" === typeof require || "object" == typeof window || "function" == typeof importScripts) {
    throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  }
  "undefined" != typeof read && (ka = function(a) {
    return read(a);
  });
  ma = function(a) {
    if ("function" == typeof readbuffer) {
      return new Uint8Array(readbuffer(a));
    }
    a = read(a, "binary");
    assert("object" == typeof a);
    return a;
  };
  la = function(a, b) {
    setTimeout(() => b(ma(a)), 0);
  };
  "undefined" != typeof scriptArgs ? ca = scriptArgs : "undefined" != typeof arguments && (ca = arguments);
  "function" == typeof quit && (ea = (a, b) => {
    na(b);
    quit(a);
  });
  "undefined" != typeof print && ("undefined" == typeof console && (console = {}), console.log = print, console.warn = console.error = "undefined" != typeof printErr ? printErr : print);
} else if (fa || ha) {
  ha ? l = self.location.href : "undefined" != typeof document && document.currentScript && (l = document.currentScript.src);
  l = 0 !== l.indexOf("blob:") ? l.substr(0, l.replace(/[?#].*/, "").lastIndexOf("/") + 1) : "";
  if ("object" != typeof window && "function" != typeof importScripts) {
    throw Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
  }
  ka = a => {
    var b = new XMLHttpRequest();
    b.open("GET", a, !1);
    b.send(null);
    return b.responseText;
  };
  ha && (ma = a => {
    var b = new XMLHttpRequest();
    b.open("GET", a, !1);
    b.responseType = "arraybuffer";
    b.send(null);
    return new Uint8Array(b.response);
  });
  la = (a, b, c) => {
    var d = new XMLHttpRequest();
    d.open("GET", a, !0);
    d.responseType = "arraybuffer";
    d.onload = () => {
      200 == d.status || 0 == d.status && d.response ? b(d.response) : c();
    };
    d.onerror = c;
    d.send(null);
  };
} else {
  throw Error("environment detection error");
}
var ra = h.print || console.log.bind(console), n = h.printErr || console.warn.bind(console);
Object.assign(h, aa);
aa = null;
Object.getOwnPropertyDescriptor(h, "fetchSettings") && q("`Module.fetchSettings` was supplied but `fetchSettings` not included in INCOMING_MODULE_JS_API");
h.arguments && (ca = h.arguments);
v("arguments", "arguments_");
h.thisProgram && (da = h.thisProgram);
v("thisProgram", "thisProgram");
h.quit && (ea = h.quit);
v("quit", "quit_");
assert("undefined" == typeof h.memoryInitializerPrefixURL, "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");
assert("undefined" == typeof h.pthreadMainPrefixURL, "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");
assert("undefined" == typeof h.cdInitializerPrefixURL, "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");
assert("undefined" == typeof h.filePackagePrefixURL, "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
assert("undefined" == typeof h.read, "Module.read option was removed (modify read_ in JS)");
assert("undefined" == typeof h.readAsync, "Module.readAsync option was removed (modify readAsync in JS)");
assert("undefined" == typeof h.readBinary, "Module.readBinary option was removed (modify readBinary in JS)");
assert("undefined" == typeof h.setWindowTitle, "Module.setWindowTitle option was removed (modify setWindowTitle in JS)");
assert("undefined" == typeof h.TOTAL_MEMORY, "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY");
v("read", "read_");
v("readAsync", "readAsync");
v("readBinary", "readBinary");
v("setWindowTitle", "setWindowTitle");
assert(!ia, "shell environment detected but not enabled at build time.  Add 'shell' to `-sENVIRONMENT` to enable.");
function v(a, b) {
  Object.getOwnPropertyDescriptor(h, a) || Object.defineProperty(h, a, {configurable:!0, get:function() {
    q("Module." + a + " has been replaced with plain " + b + " (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)");
  }});
}
function sa(a) {
  return "FS_createPath" === a || "FS_createDataFile" === a || "FS_createPreloadedFile" === a || "FS_unlink" === a || "addRunDependency" === a || "FS_createLazyFile" === a || "FS_createDevice" === a || "removeRunDependency" === a;
}
var ta;
h.wasmBinary && (ta = h.wasmBinary);
v("wasmBinary", "wasmBinary");
var noExitRuntime = h.noExitRuntime || !0;
v("noExitRuntime", "noExitRuntime");
"object" != typeof WebAssembly && q("no native wasm support detected");
var ua, va = !1;
function assert(a, b) {
  a || q("Assertion failed" + (b ? ": " + b : ""));
}
var wa = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;
function xa(a, b, c) {
  var d = b + c;
  for (c = b; a[c] && !(c >= d);) {
    ++c;
  }
  if (16 < c - b && a.buffer && wa) {
    return wa.decode(a.subarray(b, c));
  }
  for (d = ""; b < c;) {
    var e = a[b++];
    if (e & 128) {
      var f = a[b++] & 63;
      if (192 == (e & 224)) {
        d += String.fromCharCode((e & 31) << 6 | f);
      } else {
        var g = a[b++] & 63;
        224 == (e & 240) ? e = (e & 15) << 12 | f << 6 | g : (240 != (e & 248) && ya("Invalid UTF-8 leading byte " + za(e) + " encountered when deserializing a UTF-8 string in wasm memory to a JS string!"), e = (e & 7) << 18 | f << 12 | g << 6 | a[b++] & 63);
        65536 > e ? d += String.fromCharCode(e) : (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023));
      }
    } else {
      d += String.fromCharCode(e);
    }
  }
  return d;
}
function w(a, b) {
  return a ? xa(x, a, b) : "";
}
function Aa(a, b, c, d) {
  if (!(0 < d)) {
    return 0;
  }
  var e = c;
  d = c + d - 1;
  for (var f = 0; f < a.length; ++f) {
    var g = a.charCodeAt(f);
    if (55296 <= g && 57343 >= g) {
      var m = a.charCodeAt(++f);
      g = 65536 + ((g & 1023) << 10) | m & 1023;
    }
    if (127 >= g) {
      if (c >= d) {
        break;
      }
      b[c++] = g;
    } else {
      if (2047 >= g) {
        if (c + 1 >= d) {
          break;
        }
        b[c++] = 192 | g >> 6;
      } else {
        if (65535 >= g) {
          if (c + 2 >= d) {
            break;
          }
          b[c++] = 224 | g >> 12;
        } else {
          if (c + 3 >= d) {
            break;
          }
          1114111 < g && ya("Invalid Unicode code point " + za(g) + " encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).");
          b[c++] = 240 | g >> 18;
          b[c++] = 128 | g >> 12 & 63;
        }
        b[c++] = 128 | g >> 6 & 63;
      }
      b[c++] = 128 | g & 63;
    }
  }
  b[c] = 0;
  return c - e;
}
function y(a, b, c) {
  assert("number" == typeof c, "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
  return Aa(a, x, b, c);
}
function Ba(a) {
  for (var b = 0, c = 0; c < a.length; ++c) {
    var d = a.charCodeAt(c);
    127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
  }
  return b;
}
var Ca, z, x, Da, Ea, A, B, C, D;
function Ha() {
  var a = ua.buffer;
  Ca = a;
  h.HEAP8 = z = new Int8Array(a);
  h.HEAP16 = Da = new Int16Array(a);
  h.HEAP32 = A = new Int32Array(a);
  h.HEAPU8 = x = new Uint8Array(a);
  h.HEAPU16 = Ea = new Uint16Array(a);
  h.HEAPU32 = B = new Uint32Array(a);
  h.HEAPF32 = C = new Float32Array(a);
  h.HEAPF64 = D = new Float64Array(a);
}
h.STACK_SIZE && assert(65536 === h.STACK_SIZE, "the stack size can no longer be determined at runtime");
var Ia = h.INITIAL_MEMORY || 16777216;
v("INITIAL_MEMORY", "INITIAL_MEMORY");
assert(65536 <= Ia, "INITIAL_MEMORY should be larger than STACK_SIZE, was " + Ia + "! (STACK_SIZE=65536)");
assert("undefined" != typeof Int32Array && "undefined" !== typeof Float64Array && void 0 != Int32Array.prototype.subarray && void 0 != Int32Array.prototype.set, "JS engine does not provide full typed array support");
assert(!h.wasmMemory, "Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally");
assert(16777216 == Ia, "Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically");
var Ja;
function Ka() {
  var a = La();
  assert(0 == (a & 3));
  0 == a && (a += 4);
  B[a >> 2] = 34821223;
  B[a + 4 >> 2] = 2310721022;
  B[0] = 1668509029;
}
function Ma() {
  if (!va) {
    var a = La();
    0 == a && (a += 4);
    var b = B[a >> 2], c = B[a + 4 >> 2];
    34821223 == b && 2310721022 == c || q("Stack overflow! Stack cookie has been overwritten at " + za(a) + ", expected hex dwords 0x89BACDFE and 0x2135467, but received " + za(c) + " " + za(b));
    1668509029 !== B[0] && q("Runtime error: The application has corrupted its heap memory area (address zero)!");
  }
}
var Na = new Int16Array(1), Oa = new Int8Array(Na.buffer);
Na[0] = 25459;
if (115 !== Oa[0] || 99 !== Oa[1]) {
  throw "Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)";
}
var Pa = [], Qa = [], Ra = [], Sa = [], Ta = [], Ua = !1;
function Va() {
  var a = h.preRun.shift();
  Pa.unshift(a);
}
assert(Math.imul, "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
assert(Math.fround, "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
assert(Math.clz32, "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
assert(Math.trunc, "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
var E = 0, F = null, Wa = null, Xa = {};
function Ya() {
  E++;
  h.monitorRunDependencies && h.monitorRunDependencies(E);
  assert(!Xa["wasm-instantiate"]);
  Xa["wasm-instantiate"] = 1;
  null === F && "undefined" != typeof setInterval && (F = setInterval(function() {
    if (va) {
      clearInterval(F), F = null;
    } else {
      var a = !1, b;
      for (b in Xa) {
        a || (a = !0, n("still waiting on run dependencies:")), n("dependency: " + b);
      }
      a && n("(end of list)");
    }
  }, 10000));
}
function q(a) {
  if (h.onAbort) {
    h.onAbort(a);
  }
  a = "Aborted(" + a + ")";
  n(a);
  va = !0;
  throw new WebAssembly.RuntimeError(a);
}
function Za() {
  return G.startsWith("data:application/octet-stream;base64,");
}
function qa(a) {
  return a.startsWith("file://");
}
function H(a) {
  return function() {
    var b = h.asm;
    assert(Ua, "native function `" + a + "` called before runtime initialization");
    b[a] || assert(b[a], "exported native function `" + a + "` not found");
    return b[a].apply(null, arguments);
  };
}
var G;
G = "index.wasmgz";
if (!Za()) {
  var $a = G;
  G = h.locateFile ? h.locateFile($a, l) : l + $a;
}
function ab() {
  var a = G;
  try {
    if (a == G && ta) {
      return new Uint8Array(ta);
    }
    if (ma) {
      return ma(a);
    }
    throw "both async and sync fetching of the wasm failed";
  } catch (b) {
    q(b);
  }
}
function bb() {
  if (!ta && (fa || ha)) {
    if ("function" == typeof fetch && !qa(G)) {
      return fetch(G, {credentials:"same-origin"}).then(function(a) {
        if (!a.ok) {
          throw "failed to load wasm binary file at '" + G + "'";
        }
        return a.arrayBuffer();
      }).catch(function() {
        return ab();
      });
    }
    if (la) {
      return new Promise(function(a, b) {
        la(G, function(c) {
          a(new Uint8Array(c));
        }, b);
      });
    }
  }
  return Promise.resolve().then(function() {
    return ab();
  });
}
var cb, db;
function oa(a) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + a + ")";
  this.status = a;
}
function eb(a) {
  for (; 0 < a.length;) {
    a.shift()(h);
  }
}
function za(a) {
  return "0x" + a.toString(16).padStart(8, "0");
}
function ya(a) {
  fb || (fb = {});
  fb[a] || (fb[a] = 1, k && (a = "warning: " + a), n(a));
}
var fb;
function gb(a) {
  this.o = a - 24;
  this.Wa = function(b) {
    B[this.o + 4 >> 2] = b;
  };
  this.Qa = function(b) {
    B[this.o + 8 >> 2] = b;
  };
  this.Ra = function() {
    A[this.o >> 2] = 0;
  };
  this.V = function() {
    z[this.o + 12 >> 0] = 0;
  };
  this.Sa = function() {
    z[this.o + 13 >> 0] = 0;
  };
  this.m = function(b, c) {
    this.U();
    this.Wa(b);
    this.Qa(c);
    this.Ra();
    this.V();
    this.Sa();
  };
  this.U = function() {
    B[this.o + 16 >> 2] = 0;
  };
}
var hb = 0, ib = (a, b) => {
  for (var c = 0, d = a.length - 1; 0 <= d; d--) {
    var e = a[d];
    "." === e ? a.splice(d, 1) : ".." === e ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--);
  }
  if (b) {
    for (; c; c--) {
      a.unshift("..");
    }
  }
  return a;
}, jb = a => {
  var b = "/" === a.charAt(0), c = "/" === a.substr(-1);
  (a = ib(a.split("/").filter(d => !!d), !b).join("/")) || b || (a = ".");
  a && c && (a += "/");
  return (b ? "/" : "") + a;
}, kb = a => {
  var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
  a = b[0];
  b = b[1];
  if (!a && !b) {
    return ".";
  }
  b && (b = b.substr(0, b.length - 1));
  return a + b;
}, lb = a => {
  if ("/" === a) {
    return "/";
  }
  a = jb(a);
  a = a.replace(/\/$/, "");
  var b = a.lastIndexOf("/");
  return -1 === b ? a : a.substr(b + 1);
};
function mb() {
  if ("object" == typeof crypto && "function" == typeof crypto.getRandomValues) {
    var a = new Uint8Array(1);
    return () => {
      crypto.getRandomValues(a);
      return a[0];
    };
  }
  if (k) {
    try {
      var b = require("crypto");
      return () => b.randomBytes(1)[0];
    } catch (c) {
    }
  }
  return () => q("no cryptographic support found for randomDevice. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: function(array) { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };");
}
function nb() {
  for (var a = "", b = !1, c = arguments.length - 1; -1 <= c && !b; c--) {
    b = 0 <= c ? arguments[c] : "/";
    if ("string" != typeof b) {
      throw new TypeError("Arguments to path.resolve must be strings");
    }
    if (!b) {
      return "";
    }
    a = b + "/" + a;
    b = "/" === b.charAt(0);
  }
  a = ib(a.split("/").filter(d => !!d), !b).join("/");
  return (b ? "/" : "") + a || ".";
}
var ob = [];
function pb(a, b) {
  ob[a] = {input:[], output:[], J:b};
  qb(a, rb);
}
var rb = {open:function(a) {
  var b = ob[a.node.rdev];
  if (!b) {
    throw new I(43);
  }
  a.tty = b;
  a.seekable = !1;
}, close:function(a) {
  a.tty.J.fsync(a.tty);
}, fsync:function(a) {
  a.tty.J.fsync(a.tty);
}, read:function(a, b, c, d) {
  if (!a.tty || !a.tty.J.qa) {
    throw new I(60);
  }
  for (var e = 0, f = 0; f < d; f++) {
    try {
      var g = a.tty.J.qa(a.tty);
    } catch (m) {
      throw new I(29);
    }
    if (void 0 === g && 0 === e) {
      throw new I(6);
    }
    if (null === g || void 0 === g) {
      break;
    }
    e++;
    b[c + f] = g;
  }
  e && (a.node.timestamp = Date.now());
  return e;
}, write:function(a, b, c, d) {
  if (!a.tty || !a.tty.J.ea) {
    throw new I(60);
  }
  try {
    for (var e = 0; e < d; e++) {
      a.tty.J.ea(a.tty, b[c + e]);
    }
  } catch (f) {
    throw new I(29);
  }
  d && (a.node.timestamp = Date.now());
  return e;
}}, sb = {qa:function(a) {
  if (!a.input.length) {
    var b = null;
    if (k) {
      var c = Buffer.alloc(256), d = 0;
      try {
        d = fs.readSync(process.stdin.fd, c, 0, 256, -1);
      } catch (e) {
        if (e.toString().includes("EOF")) {
          d = 0;
        } else {
          throw e;
        }
      }
      0 < d ? b = c.slice(0, d).toString("utf-8") : b = null;
    } else {
      "undefined" != typeof window && "function" == typeof window.prompt ? (b = window.prompt("Input: "), null !== b && (b += "\n")) : "function" == typeof readline && (b = readline(), null !== b && (b += "\n"));
    }
    if (!b) {
      return null;
    }
    c = Array(Ba(b) + 1);
    b = Aa(b, c, 0, c.length);
    c.length = b;
    a.input = c;
  }
  return a.input.shift();
}, ea:function(a, b) {
  null === b || 10 === b ? (ra(xa(a.output, 0)), a.output = []) : 0 != b && a.output.push(b);
}, fsync:function(a) {
  a.output && 0 < a.output.length && (ra(xa(a.output, 0)), a.output = []);
}}, tb = {ea:function(a, b) {
  null === b || 10 === b ? (n(xa(a.output, 0)), a.output = []) : 0 != b && a.output.push(b);
}, fsync:function(a) {
  a.output && 0 < a.output.length && (n(xa(a.output, 0)), a.output = []);
}}, J = {s:null, C:function() {
  return J.createNode(null, "/", 16895, 0);
}, createNode:function(a, b, c, d) {
  if (24576 === (c & 61440) || 4096 === (c & 61440)) {
    throw new I(63);
  }
  J.s || (J.s = {dir:{node:{F:J.h.F, u:J.h.u, lookup:J.h.lookup, Z:J.h.Z, rename:J.h.rename, unlink:J.h.unlink, rmdir:J.h.rmdir, readdir:J.h.readdir, symlink:J.h.symlink}, stream:{G:J.i.G}}, file:{node:{F:J.h.F, u:J.h.u}, stream:{G:J.i.G, read:J.i.read, write:J.i.write, ja:J.i.ja, ta:J.i.ta, va:J.i.va}}, link:{node:{F:J.h.F, u:J.h.u, readlink:J.h.readlink}, stream:{}}, ka:{node:{F:J.h.F, u:J.h.u}, stream:ub}});
  c = vb(a, b, c, d);
  16384 === (c.mode & 61440) ? (c.h = J.s.dir.node, c.i = J.s.dir.stream, c.g = {}) : 32768 === (c.mode & 61440) ? (c.h = J.s.file.node, c.i = J.s.file.stream, c.j = 0, c.g = null) : 40960 === (c.mode & 61440) ? (c.h = J.s.link.node, c.i = J.s.link.stream) : 8192 === (c.mode & 61440) && (c.h = J.s.ka.node, c.i = J.s.ka.stream);
  c.timestamp = Date.now();
  a && (a.g[b] = c, a.timestamp = c.timestamp);
  return c;
}, ib:function(a) {
  return a.g ? a.g.subarray ? a.g.subarray(0, a.j) : new Uint8Array(a.g) : new Uint8Array(0);
}, oa:function(a, b) {
  var c = a.g ? a.g.length : 0;
  c >= b || (b = Math.max(b, c * (1048576 > c ? 2.0 : 1.125) >>> 0), 0 != c && (b = Math.max(b, 256)), c = a.g, a.g = new Uint8Array(b), 0 < a.j && a.g.set(c.subarray(0, a.j), 0));
}, $a:function(a, b) {
  if (a.j != b) {
    if (0 == b) {
      a.g = null, a.j = 0;
    } else {
      var c = a.g;
      a.g = new Uint8Array(b);
      c && a.g.set(c.subarray(0, Math.min(b, a.j)));
      a.j = b;
    }
  }
}, h:{F:function(a) {
  var b = {};
  b.dev = 8192 === (a.mode & 61440) ? a.id : 1;
  b.ino = a.id;
  b.mode = a.mode;
  b.nlink = 1;
  b.uid = 0;
  b.gid = 0;
  b.rdev = a.rdev;
  16384 === (a.mode & 61440) ? b.size = 4096 : 32768 === (a.mode & 61440) ? b.size = a.j : 40960 === (a.mode & 61440) ? b.size = a.link.length : b.size = 0;
  b.atime = new Date(a.timestamp);
  b.mtime = new Date(a.timestamp);
  b.ctime = new Date(a.timestamp);
  b.Ja = 4096;
  b.blocks = Math.ceil(b.size / b.Ja);
  return b;
}, u:function(a, b) {
  void 0 !== b.mode && (a.mode = b.mode);
  void 0 !== b.timestamp && (a.timestamp = b.timestamp);
  void 0 !== b.size && J.$a(a, b.size);
}, lookup:function() {
  throw wb[44];
}, Z:function(a, b, c, d) {
  return J.createNode(a, b, c, d);
}, rename:function(a, b, c) {
  if (16384 === (a.mode & 61440)) {
    try {
      var d = xb(b, c);
    } catch (f) {
    }
    if (d) {
      for (var e in d.g) {
        throw new I(55);
      }
    }
  }
  delete a.parent.g[a.name];
  a.parent.timestamp = Date.now();
  a.name = c;
  b.g[c] = a;
  b.timestamp = a.parent.timestamp;
  a.parent = b;
}, unlink:function(a, b) {
  delete a.g[b];
  a.timestamp = Date.now();
}, rmdir:function(a, b) {
  var c = xb(a, b), d;
  for (d in c.g) {
    throw new I(55);
  }
  delete a.g[b];
  a.timestamp = Date.now();
}, readdir:function(a) {
  var b = [".", ".."], c;
  for (c in a.g) {
    a.g.hasOwnProperty(c) && b.push(c);
  }
  return b;
}, symlink:function(a, b, c) {
  a = J.createNode(a, b, 41471, 0);
  a.link = c;
  return a;
}, readlink:function(a) {
  if (40960 !== (a.mode & 61440)) {
    throw new I(28);
  }
  return a.link;
}}, i:{read:function(a, b, c, d, e) {
  var f = a.node.g;
  if (e >= a.node.j) {
    return 0;
  }
  a = Math.min(a.node.j - e, d);
  assert(0 <= a);
  if (8 < a && f.subarray) {
    b.set(f.subarray(e, e + a), c);
  } else {
    for (d = 0; d < a; d++) {
      b[c + d] = f[e + d];
    }
  }
  return a;
}, write:function(a, b, c, d, e, f) {
  assert(!(b instanceof ArrayBuffer));
  b.buffer === z.buffer && (f = !1);
  if (!d) {
    return 0;
  }
  a = a.node;
  a.timestamp = Date.now();
  if (b.subarray && (!a.g || a.g.subarray)) {
    if (f) {
      return assert(0 === e, "canOwn must imply no weird position inside the file"), a.g = b.subarray(c, c + d), a.j = d;
    }
    if (0 === a.j && 0 === e) {
      return a.g = b.slice(c, c + d), a.j = d;
    }
    if (e + d <= a.j) {
      return a.g.set(b.subarray(c, c + d), e), d;
    }
  }
  J.oa(a, e + d);
  if (a.g.subarray && b.subarray) {
    a.g.set(b.subarray(c, c + d), e);
  } else {
    for (f = 0; f < d; f++) {
      a.g[e + f] = b[c + f];
    }
  }
  a.j = Math.max(a.j, e + d);
  return d;
}, G:function(a, b, c) {
  1 === c ? b += a.position : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.j);
  if (0 > b) {
    throw new I(28);
  }
  return b;
}, ja:function(a, b, c) {
  J.oa(a.node, b + c);
  a.node.j = Math.max(a.node.j, b + c);
}, ta:function(a, b, c, d, e) {
  if (32768 !== (a.node.mode & 61440)) {
    throw new I(43);
  }
  a = a.node.g;
  if (e & 2 || a.buffer !== Ca) {
    if (0 < c || c + b < a.length) {
      a.subarray ? a = a.subarray(c, c + b) : a = Array.prototype.slice.call(a, c, c + b);
    }
    c = !0;
    q("internal error: mmapAlloc called but `emscripten_builtin_memalign` native symbol not exported");
    b = void 0;
    if (!b) {
      throw new I(48);
    }
    z.set(a, b);
  } else {
    c = !1, b = a.byteOffset;
  }
  return {o:b, eb:c};
}, va:function(a, b, c, d) {
  J.i.write(a, b, 0, d, c, !1);
  return 0;
}}}, yb = {0:"Success", 1:"Arg list too long", 2:"Permission denied", 3:"Address already in use", 4:"Address not available", 5:"Address family not supported by protocol family", 6:"No more processes", 7:"Socket already connected", 8:"Bad file number", 9:"Trying to read unreadable message", 10:"Mount device busy", 11:"Operation canceled", 12:"No children", 13:"Connection aborted", 14:"Connection refused", 15:"Connection reset by peer", 16:"File locking deadlock error", 17:"Destination address required", 
18:"Math arg out of domain of func", 19:"Quota exceeded", 20:"File exists", 21:"Bad address", 22:"File too large", 23:"Host is unreachable", 24:"Identifier removed", 25:"Illegal byte sequence", 26:"Connection already in progress", 27:"Interrupted system call", 28:"Invalid argument", 29:"I/O error", 30:"Socket is already connected", 31:"Is a directory", 32:"Too many symbolic links", 33:"Too many open files", 34:"Too many links", 35:"Message too long", 36:"Multihop attempted", 37:"File or path name too long", 
38:"Network interface is not configured", 39:"Connection reset by network", 40:"Network is unreachable", 41:"Too many open files in system", 42:"No buffer space available", 43:"No such device", 44:"No such file or directory", 45:"Exec format error", 46:"No record locks available", 47:"The link has been severed", 48:"Not enough core", 49:"No message of desired type", 50:"Protocol not available", 51:"No space left on device", 52:"Function not implemented", 53:"Socket is not connected", 54:"Not a directory", 
55:"Directory not empty", 56:"State not recoverable", 57:"Socket operation on non-socket", 59:"Not a typewriter", 60:"No such device or address", 61:"Value too large for defined data type", 62:"Previous owner died", 63:"Not super-user", 64:"Broken pipe", 65:"Protocol error", 66:"Unknown protocol", 67:"Protocol wrong type for socket", 68:"Math result not representable", 69:"Read only file system", 70:"Illegal seek", 71:"No such process", 72:"Stale file handle", 73:"Connection timed out", 74:"Text file busy", 
75:"Cross-device link", 100:"Device not a stream", 101:"Bad font file fmt", 102:"Invalid slot", 103:"Invalid request code", 104:"No anode", 105:"Block device required", 106:"Channel number out of range", 107:"Level 3 halted", 108:"Level 3 reset", 109:"Link number out of range", 110:"Protocol driver not attached", 111:"No CSI structure available", 112:"Level 2 halted", 113:"Invalid exchange", 114:"Invalid request descriptor", 115:"Exchange full", 116:"No data (for no delay io)", 117:"Timer expired", 
118:"Out of streams resources", 119:"Machine is not on the network", 120:"Package not installed", 121:"The object is remote", 122:"Advertise error", 123:"Srmount error", 124:"Communication error on send", 125:"Cross mount point (not really error)", 126:"Given log. name not unique", 127:"f.d. invalid for this operation", 128:"Remote address changed", 129:"Can   access a needed shared lib", 130:"Accessing a corrupted shared lib", 131:".lib section in a.out corrupted", 132:"Attempting to link in too many libs", 
133:"Attempting to exec a shared library", 135:"Streams pipe error", 136:"Too many users", 137:"Socket type not supported", 138:"Not supported", 139:"Protocol family not supported", 140:"Can't send after socket shutdown", 141:"Too many references", 142:"Host is down", 148:"No medium (in tape drive)", 156:"Level 2 not synchronized"}, zb = {};
function Ab(a) {
  var b = Bb();
  a();
  Cb(b);
}
function Db(a) {
  return a.replace(/\b_Z[\w\d_]+/g, function(b) {
    ya("warning: build with -sDEMANGLE_SUPPORT to link in libcxxabi demangling");
    return b === b ? b : b + " [" + b + "]";
  });
}
var Eb = null, Fb = {}, Gb = [], Hb = 1, Ib = null, Jb = !0, I = null, wb = {}, K = (a, b = {}) => {
  a = nb(a);
  if (!a) {
    return {path:"", node:null};
  }
  b = Object.assign({pa:!0, fa:0}, b);
  if (8 < b.fa) {
    throw new I(32);
  }
  a = a.split("/").filter(g => !!g);
  for (var c = Eb, d = "/", e = 0; e < a.length; e++) {
    var f = e === a.length - 1;
    if (f && b.parent) {
      break;
    }
    c = xb(c, a[e]);
    d = jb(d + "/" + a[e]);
    c.$ && (!f || f && b.pa) && (c = c.$.root);
    if (!f || b.T) {
      for (f = 0; 40960 === (c.mode & 61440);) {
        if (c = Kb(d), d = nb(kb(d), c), c = K(d, {fa:b.fa + 1}).node, 40 < f++) {
          throw new I(32);
        }
      }
    }
  }
  return {path:d, node:c};
}, Lb = a => {
  for (var b;;) {
    if (a === a.parent) {
      return a = a.C.ua, b ? "/" !== a[a.length - 1] ? a + "/" + b : a + b : a;
    }
    b = b ? a.name + "/" + b : a.name;
    a = a.parent;
  }
}, Mb = (a, b) => {
  for (var c = 0, d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d) | 0;
  }
  return (a + c >>> 0) % Ib.length;
}, xb = (a, b) => {
  var c;
  if (c = (c = Nb(a, "x")) ? c : a.h.lookup ? 0 : 2) {
    throw new I(c, a);
  }
  for (c = Ib[Mb(a.id, b)]; c; c = c.Va) {
    var d = c.name;
    if (c.parent.id === a.id && d === b) {
      return c;
    }
  }
  return a.h.lookup(a, b);
}, vb = (a, b, c, d) => {
  assert("object" == typeof a);
  a = new Ob(a, b, c, d);
  b = Mb(a.parent.id, a.name);
  a.Va = Ib[b];
  return Ib[b] = a;
}, Pb = {r:0, "r+":2, w:577, "w+":578, a:1089, "a+":1090}, Qb = a => {
  var b = ["r", "w", "rw"][a & 3];
  a & 512 && (b += "w");
  return b;
}, Nb = (a, b) => {
  if (Jb) {
    return 0;
  }
  if (!b.includes("r") || a.mode & 292) {
    if (b.includes("w") && !(a.mode & 146) || b.includes("x") && !(a.mode & 73)) {
      return 2;
    }
  } else {
    return 2;
  }
  return 0;
}, Rb = (a, b) => {
  try {
    return xb(a, b), 20;
  } catch (c) {
  }
  return Nb(a, "wx");
}, Sb = (a = 0) => {
  for (; 4096 >= a; a++) {
    if (!Gb[a]) {
      return a;
    }
  }
  throw new I(33);
}, Ub = (a, b) => {
  Tb || (Tb = function() {
    this.m = {};
  }, Tb.prototype = {}, Object.defineProperties(Tb.prototype, {object:{get:function() {
    return this.node;
  }, set:function(c) {
    this.node = c;
  }}, flags:{get:function() {
    return this.m.flags;
  }, set:function(c) {
    this.m.flags = c;
  },}, position:{get:function() {
    return this.m.position;
  }, set:function(c) {
    this.m.position = c;
  },},}));
  a = Object.assign(new Tb(), a);
  b = Sb(b);
  a.fd = b;
  return Gb[b] = a;
}, ub = {open:a => {
  a.i = Fb[a.node.rdev].i;
  a.i.open && a.i.open(a);
}, G:() => {
  throw new I(70);
}}, qb = (a, b) => {
  Fb[a] = {i:b};
}, Vb = (a, b) => {
  if ("string" == typeof a) {
    throw a;
  }
  var c = "/" === b, d = !b;
  if (c && Eb) {
    throw new I(10);
  }
  if (!c && !d) {
    var e = K(b, {pa:!1});
    b = e.path;
    e = e.node;
    if (e.$) {
      throw new I(10);
    }
    if (16384 !== (e.mode & 61440)) {
      throw new I(54);
    }
  }
  b = {type:a, nb:{}, ua:b, Ua:[]};
  a = a.C(b);
  a.C = b;
  b.root = a;
  c ? Eb = a : e && (e.$ = b, e.C && e.C.Ua.push(b));
}, L = (a, b, c) => {
  var d = K(a, {parent:!0}).node;
  a = lb(a);
  if (!a || "." === a || ".." === a) {
    throw new I(28);
  }
  var e = Rb(d, a);
  if (e) {
    throw new I(e);
  }
  if (!d.h.Z) {
    throw new I(63);
  }
  return d.h.Z(d, a, b, c);
}, Wb = (a, b, c) => {
  "undefined" == typeof c && (c = b, b = 438);
  L(a, b | 8192, c);
}, Xb = (a, b) => {
  if (!nb(a)) {
    throw new I(44);
  }
  var c = K(b, {parent:!0}).node;
  if (!c) {
    throw new I(44);
  }
  b = lb(b);
  var d = Rb(c, b);
  if (d) {
    throw new I(d);
  }
  if (!c.h.symlink) {
    throw new I(63);
  }
  c.h.symlink(c, b, a);
}, Kb = a => {
  a = K(a).node;
  if (!a) {
    throw new I(44);
  }
  if (!a.h.readlink) {
    throw new I(28);
  }
  return nb(Lb(a.parent), a.h.readlink(a));
}, Zb = (a, b, c) => {
  if ("" === a) {
    throw new I(44);
  }
  if ("string" == typeof b) {
    var d = Pb[b];
    if ("undefined" == typeof d) {
      throw Error("Unknown file open mode: " + b);
    }
    b = d;
  }
  c = b & 64 ? ("undefined" == typeof c ? 438 : c) & 4095 | 32768 : 0;
  if ("object" == typeof a) {
    var e = a;
  } else {
    a = jb(a);
    try {
      e = K(a, {T:!(b & 131072)}).node;
    } catch (f) {
    }
  }
  d = !1;
  if (b & 64) {
    if (e) {
      if (b & 128) {
        throw new I(20);
      }
    } else {
      e = L(a, c, 0), d = !0;
    }
  }
  if (!e) {
    throw new I(44);
  }
  8192 === (e.mode & 61440) && (b &= -513);
  if (b & 65536 && 16384 !== (e.mode & 61440)) {
    throw new I(54);
  }
  if (!d && (c = e ? 40960 === (e.mode & 61440) ? 32 : 16384 === (e.mode & 61440) && ("r" !== Qb(b) || b & 512) ? 31 : Nb(e, Qb(b)) : 44)) {
    throw new I(c);
  }
  if (b & 512 && !d) {
    c = e;
    c = "string" == typeof c ? K(c, {T:!0}).node : c;
    if (!c.h.u) {
      throw new I(63);
    }
    if (16384 === (c.mode & 61440)) {
      throw new I(31);
    }
    if (32768 !== (c.mode & 61440)) {
      throw new I(28);
    }
    if (d = Nb(c, "w")) {
      throw new I(d);
    }
    c.h.u(c, {size:0, timestamp:Date.now()});
  }
  b &= -131713;
  e = Ub({node:e, path:Lb(e), flags:b, seekable:!0, position:0, i:e.i, bb:[], error:!1});
  e.i.open && e.i.open(e);
  !h.logReadFiles || b & 1 || (Yb || (Yb = {}), a in Yb || (Yb[a] = 1));
  return e;
}, $b = (a, b, c) => {
  if (null === a.fd) {
    throw new I(8);
  }
  if (!a.seekable || !a.i.G) {
    throw new I(70);
  }
  if (0 != c && 1 != c && 2 != c) {
    throw new I(28);
  }
  a.position = a.i.G(a, b, c);
  a.bb = [];
}, ac = () => {
  I || (I = function(a, b) {
    this.node = b;
    this.ab = function(c) {
      this.D = c;
      for (var d in zb) {
        if (zb[d] === c) {
          this.code = d;
          break;
        }
      }
    };
    this.ab(a);
    this.message = yb[a];
    this.stack && (Object.defineProperty(this, "stack", {value:Error().stack, writable:!0}), this.stack = Db(this.stack));
  }, I.prototype = Error(), I.prototype.constructor = I, [44].forEach(a => {
    wb[a] = new I(a);
    wb[a].stack = "<generic error, no stack>";
  }));
}, bc, cc = (a, b) => {
  var c = 0;
  a && (c |= 365);
  b && (c |= 146);
  return c;
}, ec = (a, b, c) => {
  a = jb("/dev/" + a);
  var d = cc(!!b, !!c);
  dc || (dc = 64);
  var e = dc++ << 8 | 0;
  qb(e, {open:f => {
    f.seekable = !1;
  }, close:() => {
    c && c.buffer && c.buffer.length && c(10);
  }, read:(f, g, m, p) => {
    for (var r = 0, u = 0; u < p; u++) {
      try {
        var t = b();
      } catch (Q) {
        throw new I(29);
      }
      if (void 0 === t && 0 === r) {
        throw new I(6);
      }
      if (null === t || void 0 === t) {
        break;
      }
      r++;
      g[m + u] = t;
    }
    r && (f.node.timestamp = Date.now());
    return r;
  }, write:(f, g, m, p) => {
    for (var r = 0; r < p; r++) {
      try {
        c(g[m + r]);
      } catch (u) {
        throw new I(29);
      }
    }
    p && (f.node.timestamp = Date.now());
    return r;
  }});
  Wb(a, d, e);
}, dc, M = {}, Tb, Yb, fc = void 0;
function gc() {
  assert(void 0 != fc);
  fc += 4;
  return A[fc - 4 >> 2];
}
function hc(a) {
  a = Gb[a];
  if (!a) {
    throw new I(8);
  }
  return a;
}
var ic = 0;
function jc() {
  for (var a = N.length - 1; 0 <= a; --a) {
    kc(a);
  }
  N = [];
  lc = [];
}
var lc = [];
function mc() {
  if (ic && nc.S) {
    for (var a = 0; a < lc.length; ++a) {
      var b = lc[a];
      lc.splice(a, 1);
      --a;
      b.rb.apply(null, b.fb);
    }
  }
}
var N = [];
function kc(a) {
  var b = N[a];
  b.target.removeEventListener(b.l, b.La, b.v);
  N.splice(a, 1);
}
function O(a) {
  function b(d) {
    ++ic;
    nc = a;
    mc();
    a.B(d);
    mc();
    --ic;
  }
  if (a.A) {
    a.La = b, a.target.addEventListener(a.l, b, a.v), N.push(a), oc || (Sa.push(jc), oc = !0);
  } else {
    for (var c = 0; c < N.length; ++c) {
      N[c].target == a.target && N[c].l == a.l && kc(c--);
    }
  }
}
function pc(a) {
  return a ? a == window ? "#window" : a == screen ? "#screen" : a && a.nodeName ? a.nodeName : "" : "";
}
var oc, nc, qc, rc, sc, tc, uc, vc, wc, xc = [0, "undefined" != typeof document ? document : 0, "undefined" != typeof window ? window : 0];
function P(a) {
  a = 2 < a ? w(a) : a;
  return xc[a] || ("undefined" != typeof document ? document.querySelector(a) : void 0);
}
function yc(a) {
  return 0 > xc.indexOf(a) ? a.getBoundingClientRect() : {left:0, top:0};
}
var zc;
zc = k ? () => {
  var a = process.hrtime();
  return 1e3 * a[0] + a[1] / 1e6;
} : () => performance.now();
var Ac = [];
function R(a) {
  var b = Ac[a];
  b || (a >= Ac.length && (Ac.length = a + 1), Ac[a] = b = Ja.get(a));
  assert(Ja.get(a) == b, "JavaScript-side Wasm function table mirror is out of date!");
  return b;
}
function Bc(a, b, c, d, e, f) {
  qc || (qc = S(256));
  a = {target:P(a), l:f, A:d, B:function(g) {
    g = g || event;
    var m = g.target.id ? g.target.id : "", p = qc;
    y(pc(g.target), p + 0, 128);
    y(m, p + 128, 128);
    R(d)(e, p, b) && g.preventDefault();
  }, v:c};
  O(a);
}
function Cc(a, b, c, d, e, f) {
  rc || (rc = S(176));
  a = {target:P(a), S:!0, l:f, A:d, B:function(g) {
    assert(g);
    var m = rc;
    D[m >> 3] = g.timeStamp;
    var p = m >> 2;
    A[p + 2] = g.location;
    A[p + 3] = g.ctrlKey;
    A[p + 4] = g.shiftKey;
    A[p + 5] = g.altKey;
    A[p + 6] = g.metaKey;
    A[p + 7] = g.repeat;
    A[p + 8] = g.charCode;
    A[p + 9] = g.keyCode;
    A[p + 10] = g.which;
    y(g.key || "", m + 44, 32);
    y(g.code || "", m + 76, 32);
    y(g.char || "", m + 108, 32);
    y(g.locale || "", m + 140, 32);
    R(d)(e, m, b) && g.preventDefault();
  }, v:c};
  O(a);
}
function Dc(a, b, c) {
  assert(0 == a % 4);
  D[a >> 3] = b.timeStamp;
  a >>= 2;
  A[a + 2] = b.screenX;
  A[a + 3] = b.screenY;
  A[a + 4] = b.clientX;
  A[a + 5] = b.clientY;
  A[a + 6] = b.ctrlKey;
  A[a + 7] = b.shiftKey;
  A[a + 8] = b.altKey;
  A[a + 9] = b.metaKey;
  Da[2 * a + 20] = b.button;
  Da[2 * a + 21] = b.buttons;
  A[a + 11] = b.movementX;
  A[a + 12] = b.movementY;
  c = yc(c);
  A[a + 13] = b.clientX - c.left;
  A[a + 14] = b.clientY - c.top;
}
function Ec(a, b, c, d, e, f) {
  sc || (sc = S(72));
  a = P(a);
  O({target:a, S:"mousemove" != f && "mouseenter" != f && "mouseleave" != f, l:f, A:d, B:function(g) {
    g = g || event;
    Dc(sc, g, a);
    R(d)(e, sc, b) && g.preventDefault();
  }, v:c});
}
function Fc(a, b, c, d, e) {
  tc || (tc = S(260));
  O({target:a, l:e, A:d, B:function(f) {
    f = f || event;
    var g = tc, m = document.pointerLockElement || document.m || document.V || document.U;
    A[g >> 2] = !!m;
    var p = m && m.id ? m.id : "";
    y(pc(m), g + 4, 128);
    y(p, g + 132, 128);
    R(d)(20, g, b) && f.preventDefault();
  }, v:c});
}
function Gc(a, b, c, d, e) {
  O({target:a, l:e, A:d, B:function(f) {
    f = f || event;
    R(d)(38, 0, b) && f.preventDefault();
  }, v:c});
}
function Hc(a, b, c, d) {
  uc || (uc = S(36));
  a = P(a);
  O({target:a, l:"resize", A:d, B:function(e) {
    e = e || event;
    if (e.target == a) {
      var f = document.body;
      if (f) {
        var g = uc;
        A[g >> 2] = e.detail;
        A[g + 4 >> 2] = f.clientWidth;
        A[g + 8 >> 2] = f.clientHeight;
        A[g + 12 >> 2] = innerWidth;
        A[g + 16 >> 2] = innerHeight;
        A[g + 20 >> 2] = outerWidth;
        A[g + 24 >> 2] = outerHeight;
        A[g + 28 >> 2] = pageXOffset;
        A[g + 32 >> 2] = pageYOffset;
        R(d)(10, g, b) && e.preventDefault();
      }
    }
  }, v:c});
}
function Ic(a, b, c, d, e, f) {
  vc || (vc = S(1696));
  a = P(a);
  O({target:a, S:"touchstart" == f || "touchend" == f, l:f, A:d, B:function(g) {
    assert(g);
    for (var m, p = {}, r = g.touches, u = 0; u < r.length; ++u) {
      m = r[u], m.ra = m.xa = 0, p[m.identifier] = m;
    }
    for (u = 0; u < g.changedTouches.length; ++u) {
      m = g.changedTouches[u], m.ra = 1, p[m.identifier] = m;
    }
    for (u = 0; u < g.targetTouches.length; ++u) {
      p[g.targetTouches[u].identifier].xa = 1;
    }
    r = vc;
    D[r >> 3] = g.timeStamp;
    var t = r >> 2;
    A[t + 3] = g.ctrlKey;
    A[t + 4] = g.shiftKey;
    A[t + 5] = g.altKey;
    A[t + 6] = g.metaKey;
    t += 7;
    var Q = yc(a), W = 0;
    for (u in p) {
      if (m = p[u], A[t] = m.identifier, A[t + 1] = m.screenX, A[t + 2] = m.screenY, A[t + 3] = m.clientX, A[t + 4] = m.clientY, A[t + 5] = m.pageX, A[t + 6] = m.pageY, A[t + 7] = m.ra, A[t + 8] = m.xa, A[t + 9] = m.clientX - Q.left, A[t + 10] = m.clientY - Q.top, t += 13, 31 < ++W) {
        break;
      }
    }
    A[r + 8 >> 2] = W;
    R(d)(e, r, b) && g.preventDefault();
  }, v:c});
}
function Jc(a, b, c, d, e, f) {
  a = {target:P(a), l:f, A:d, B:function(g) {
    g = g || event;
    R(d)(e, 0, b) && g.preventDefault();
  }, v:c};
  O(a);
}
function Kc(a, b, c, d) {
  wc || (wc = S(104));
  O({target:a, S:!0, l:"wheel", A:d, B:function(e) {
    e = e || event;
    var f = wc;
    Dc(f, e, a);
    D[f + 72 >> 3] = e.deltaX;
    D[f + 80 >> 3] = e.deltaY;
    D[f + 88 >> 3] = e.deltaZ;
    A[f + 96 >> 2] = e.deltaMode;
    R(d)(9, f, b) && e.preventDefault();
  }, v:c});
}
function Lc(a) {
  a.hb = a.getExtension("WEBGL_draw_instanced_base_vertex_base_instance");
}
function Mc(a) {
  a.kb = a.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance");
}
function Nc(a) {
  a.mb = a.getExtension("WEBGL_multi_draw");
}
var Oc = 1, Pc = [], T = [], Qc = [], Rc = [], Sc = [], U = [], Tc = [], Uc = [], Vc = [1, 1, 2, 2, 4, 4, 4, 2, 3, 4, 8], Wc = {}, Xc = {};
function V(a) {
  Yc || (Yc = a);
}
function Zc(a) {
  for (var b = Oc++, c = a.length; c < b; c++) {
    a[c] = null;
  }
  return b;
}
function $c(a) {
  return 32 - Math.clz32(0 === a ? 0 : a - 1);
}
function ad(a) {
  bd = !1;
  for (var b = 0; b < X.sa; ++b) {
    var c = X.L[b];
    if (c.ba && c.enabled) {
      bd = !0;
      var d = c.ga;
      d = 0 < d ? a * d : c.size * Vc[c.type - 5120] * a;
      var e = $c(d);
      var f = X.aa[e], g = X.O[e];
      X.O[e] = X.O[e] + 1 & 63;
      var m = f[g];
      m ? e = m : (m = Y.getParameter(34964), f[g] = Y.createBuffer(), Y.bindBuffer(34962, f[g]), Y.bufferData(34962, 1 << e, 35048), Y.bindBuffer(34962, m), e = f[g]);
      Y.bindBuffer(34962, e);
      Y.bufferSubData(34962, 0, x.subarray(c.o, c.o + d));
      c.Ia.call(Y, b, c.size, c.type, c.wa, c.ga, 0);
    }
  }
}
function cd(a, b) {
  a.m || (a.m = a.getContext, a.getContext = function(d, e) {
    e = a.m(d, e);
    return "webgl" == d == e instanceof WebGLRenderingContext ? e : null;
  });
  var c = a.getContext("webgl2", b);
  return c ? dd(c, b) : 0;
}
function dd(a, b) {
  var c = Zc(Uc), d = {jb:c, attributes:b, version:b.Ta, R:a};
  a.canvas && (a.canvas.cb = d);
  Uc[c] = d;
  ("undefined" == typeof b.na || b.na) && ed(d);
  d.sa = d.R.getParameter(34921);
  d.L = [];
  for (a = 0; a < d.sa; a++) {
    d.L[a] = {enabled:!1, ba:!1, size:0, type:0, wa:0, ga:0, o:0, Ia:null};
  }
  a = $c(2097152);
  d.O = [];
  d.Fa = [];
  d.O.length = d.Fa.length = a + 1;
  d.aa = [];
  d.ha = [];
  d.aa.length = d.ha.length = a + 1;
  d.K = [];
  d.K.length = a + 1;
  for (b = 0; b <= a; ++b) {
    d.K[b] = null;
    d.O[b] = d.Fa[b] = 0;
    d.aa[b] = [];
    d.ha[b] = [];
    var e = d.aa[b], f = d.ha[b];
    e.length = f.length = 64;
    for (var g = 0; 64 > g; ++g) {
      e[g] = f[g] = null;
    }
  }
  return c;
}
function ed(a) {
  a || (a = X);
  if (!a.Na) {
    a.Na = !0;
    var b = a.R;
    Lc(b);
    Mc(b);
    2 <= a.version && (b.ma = b.getExtension("EXT_disjoint_timer_query_webgl2"));
    if (2 > a.version || !b.ma) {
      b.ma = b.getExtension("EXT_disjoint_timer_query");
    }
    Nc(b);
    (b.getSupportedExtensions() || []).forEach(function(c) {
      c.includes("lose_context") || c.includes("debug") || b.getExtension(c);
    });
  }
}
var Yc, X, bd, fd = ["default", "low-power", "high-performance"];
function gd(a, b, c, d) {
  for (var e = 0; e < a; e++) {
    var f = Y[c](), g = f && Zc(d);
    f ? (f.name = g, d[g] = f) : V(1282);
    A[b + 4 * e >> 2] = g;
  }
}
function hd(a, b) {
  if (b) {
    var c = void 0;
    switch(a) {
      case 36346:
        c = 1;
        break;
      case 36344:
        return;
      case 34814:
      case 36345:
        c = 0;
        break;
      case 34466:
        var d = Y.getParameter(34467);
        c = d ? d.length : 0;
        break;
      case 33309:
        if (2 > X.version) {
          V(1282);
          return;
        }
        c = 2 * (Y.getSupportedExtensions() || []).length;
        break;
      case 33307:
      case 33308:
        if (2 > X.version) {
          V(1280);
          return;
        }
        c = 33307 == a ? 3 : 0;
    }
    if (void 0 === c) {
      switch(d = Y.getParameter(a), typeof d) {
        case "number":
          c = d;
          break;
        case "boolean":
          c = d ? 1 : 0;
          break;
        case "string":
          V(1280);
          return;
        case "object":
          if (null === d) {
            switch(a) {
              case 34964:
              case 35725:
              case 34965:
              case 36006:
              case 36007:
              case 32873:
              case 34229:
              case 36662:
              case 36663:
              case 35053:
              case 35055:
              case 36010:
              case 35097:
              case 35869:
              case 32874:
              case 36389:
              case 35983:
              case 35368:
              case 34068:
                c = 0;
                break;
              default:
                V(1280);
                return;
            }
          } else {
            if (d instanceof Float32Array || d instanceof Uint32Array || d instanceof Int32Array || d instanceof Array) {
              for (a = 0; a < d.length; ++a) {
                A[b + 4 * a >> 2] = d[a];
              }
              return;
            }
            try {
              c = d.name | 0;
            } catch (e) {
              V(1280);
              n("GL_INVALID_ENUM in glGet0v: Unknown object returned from WebGL getParameter(" + a + ")! (error: " + e + ")");
              return;
            }
          }
          break;
        default:
          V(1280);
          n("GL_INVALID_ENUM in glGet0v: Native code calling glGet0v(" + a + ") and it returns " + d + " of type " + typeof d + "!");
          return;
      }
    }
    A[b >> 2] = c;
  } else {
    V(1281);
  }
}
function jd(a) {
  var b = Ba(a) + 1, c = S(b);
  y(a, c, b);
  return c;
}
function kd(a) {
  return "]" == a.slice(-1) && a.lastIndexOf("[");
}
function ld(a) {
  a -= 5120;
  return 0 == a ? z : 1 == a ? x : 2 == a ? Da : 4 == a ? A : 6 == a ? C : 5 == a || 28922 == a || 28520 == a || 30779 == a || 30782 == a ? B : Ea;
}
function Z(a) {
  var b = Y.Ka;
  if (b) {
    var c = b.P[a];
    "number" == typeof c && (b.P[a] = c = Y.getUniformLocation(b, b.Ga[a] + (0 < c ? "[" + c + "]" : "")));
    return c;
  }
  V(1282);
}
function md(a) {
  nd();
  if (!noExitRuntime) {
    if (h.onExit) {
      h.onExit(a);
    }
    va = !0;
  }
  ea(a, new oa(a));
}
function od(a) {
  a instanceof oa || "unwind" == a || (Ma(), a instanceof WebAssembly.RuntimeError && 0 >= pd() && n("Stack overflow detected.  You can try increasing -sSTACK_SIZE (currently set to 65536)"), ea(1, a));
}
function qd(a) {
  var b = Ba(a) + 1, c = rd(b);
  Aa(a, z, c, b);
  return c;
}
function Ob(a, b, c, d) {
  a || (a = this);
  this.parent = a;
  this.C = a.C;
  this.$ = null;
  this.id = Hb++;
  this.name = b;
  this.mode = c;
  this.h = {};
  this.i = {};
  this.rdev = d;
}
Object.defineProperties(Ob.prototype, {read:{get:function() {
  return 365 === (this.mode & 365);
}, set:function(a) {
  a ? this.mode |= 365 : this.mode &= -366;
}}, write:{get:function() {
  return 146 === (this.mode & 146);
}, set:function(a) {
  a ? this.mode |= 146 : this.mode &= -147;
}}});
ac();
Ib = Array(4096);
Vb(J, "/");
L("/tmp", 16895, 0);
L("/home", 16895, 0);
L("/home/web_user", 16895, 0);
(() => {
  L("/dev", 16895, 0);
  qb(259, {read:() => 0, write:(b, c, d, e) => e,});
  Wb("/dev/null", 259);
  pb(1280, sb);
  pb(1536, tb);
  Wb("/dev/tty", 1280);
  Wb("/dev/tty1", 1536);
  var a = mb();
  ec("random", a);
  ec("urandom", a);
  L("/dev/shm", 16895, 0);
  L("/dev/shm/tmp", 16895, 0);
})();
(() => {
  L("/proc", 16895, 0);
  var a = L("/proc/self", 16895, 0);
  L("/proc/self/fd", 16895, 0);
  Vb({C:() => {
    var b = vb(a, "fd", 16895, 73);
    b.h = {lookup:(c, d) => {
      var e = Gb[+d];
      if (!e) {
        throw new I(8);
      }
      c = {parent:null, C:{ua:"fake"}, h:{readlink:() => e.path},};
      return c.parent = c;
    }};
    return b;
  }}, "/proc/self/fd");
})();
zb = {EPERM:63, ENOENT:44, ESRCH:71, EINTR:27, EIO:29, ENXIO:60, E2BIG:1, ENOEXEC:45, EBADF:8, ECHILD:12, EAGAIN:6, EWOULDBLOCK:6, ENOMEM:48, EACCES:2, EFAULT:21, ENOTBLK:105, EBUSY:10, EEXIST:20, EXDEV:75, ENODEV:43, ENOTDIR:54, EISDIR:31, EINVAL:28, ENFILE:41, EMFILE:33, ENOTTY:59, ETXTBSY:74, EFBIG:22, ENOSPC:51, ESPIPE:70, EROFS:69, EMLINK:34, EPIPE:64, EDOM:18, ERANGE:68, ENOMSG:49, EIDRM:24, ECHRNG:106, EL2NSYNC:156, EL3HLT:107, EL3RST:108, ELNRNG:109, EUNATCH:110, ENOCSI:111, EL2HLT:112, EDEADLK:16, 
ENOLCK:46, EBADE:113, EBADR:114, EXFULL:115, ENOANO:104, EBADRQC:103, EBADSLT:102, EDEADLOCK:16, EBFONT:101, ENOSTR:100, ENODATA:116, ETIME:117, ENOSR:118, ENONET:119, ENOPKG:120, EREMOTE:121, ENOLINK:47, EADV:122, ESRMNT:123, ECOMM:124, EPROTO:65, EMULTIHOP:36, EDOTDOT:125, EBADMSG:9, ENOTUNIQ:126, EBADFD:127, EREMCHG:128, ELIBACC:129, ELIBBAD:130, ELIBSCN:131, ELIBMAX:132, ELIBEXEC:133, ENOSYS:52, ENOTEMPTY:55, ENAMETOOLONG:37, ELOOP:32, EOPNOTSUPP:138, EPFNOSUPPORT:139, ECONNRESET:15, ENOBUFS:42, 
EAFNOSUPPORT:5, EPROTOTYPE:67, ENOTSOCK:57, ENOPROTOOPT:50, ESHUTDOWN:140, ECONNREFUSED:14, EADDRINUSE:3, ECONNABORTED:13, ENETUNREACH:40, ENETDOWN:38, ETIMEDOUT:73, EHOSTDOWN:142, EHOSTUNREACH:23, EINPROGRESS:26, EALREADY:7, EDESTADDRREQ:17, EMSGSIZE:35, EPROTONOSUPPORT:66, ESOCKTNOSUPPORT:137, EADDRNOTAVAIL:4, ENETRESET:39, EISCONN:30, ENOTCONN:53, ETOOMANYREFS:141, EUSERS:136, EDQUOT:19, ESTALE:72, ENOTSUP:138, ENOMEDIUM:148, EILSEQ:25, EOVERFLOW:61, ECANCELED:11, ENOTRECOVERABLE:56, EOWNERDEAD:62, 
ESTRPIPE:135,};
var Y, Ad = {__assert_fail:function(a, b, c, d) {
  q("Assertion failed: " + w(a) + ", at: " + [b ? w(b) : "unknown filename", c, d ? w(d) : "unknown function"]);
}, __cxa_throw:function(a, b, c) {
  (new gb(a)).m(b, c);
  hb++;
  throw a + " - Exception catching is disabled, this exception cannot be caught. Compile with -sNO_DISABLE_EXCEPTION_CATCHING or -sEXCEPTION_CATCHING_ALLOWED=[..] to catch.";
}, __syscall_fcntl64:function(a, b, c) {
  fc = c;
  try {
    var d = hc(a);
    switch(b) {
      case 0:
        var e = gc();
        return 0 > e ? -28 : Ub(d, e).fd;
      case 1:
      case 2:
        return 0;
      case 3:
        return d.flags;
      case 4:
        return e = gc(), d.flags |= e, 0;
      case 5:
        return e = gc(), Da[e + 0 >> 1] = 2, 0;
      case 6:
      case 7:
        return 0;
      case 16:
      case 8:
        return -28;
      case 9:
        return A[sd() >> 2] = 28, -1;
      default:
        return -28;
    }
  } catch (f) {
    if ("undefined" == typeof M || !(f instanceof I)) {
      throw f;
    }
    return -f.D;
  }
}, __syscall_ioctl:function(a, b, c) {
  fc = c;
  try {
    var d = hc(a);
    switch(b) {
      case 21509:
      case 21505:
        return d.tty ? 0 : -59;
      case 21510:
      case 21511:
      case 21512:
      case 21506:
      case 21507:
      case 21508:
        return d.tty ? 0 : -59;
      case 21519:
        if (!d.tty) {
          return -59;
        }
        var e = gc();
        return A[e >> 2] = 0;
      case 21520:
        return d.tty ? -28 : -59;
      case 21531:
        a = e = gc();
        if (!d.i.Oa) {
          throw new I(59);
        }
        return d.i.Oa(d, b, a);
      case 21523:
        return d.tty ? 0 : -59;
      case 21524:
        return d.tty ? 0 : -59;
      default:
        return -28;
    }
  } catch (f) {
    if ("undefined" == typeof M || !(f instanceof I)) {
      throw f;
    }
    return -f.D;
  }
}, __syscall_openat:function(a, b, c, d) {
  fc = d;
  try {
    b = w(b);
    var e = b;
    if ("/" === e.charAt(0)) {
      b = e;
    } else {
      var f = -100 === a ? "/" : hc(a).path;
      if (0 == e.length) {
        throw new I(44);
      }
      b = jb(f + "/" + e);
    }
    var g = d ? gc() : 0;
    return Zb(b, c, g).fd;
  } catch (m) {
    if ("undefined" == typeof M || !(m instanceof I)) {
      throw m;
    }
    return -m.D;
  }
}, abort:function() {
  q("native code called abort()");
}, emscripten_get_device_pixel_ratio:function() {
  return "number" == typeof devicePixelRatio && devicePixelRatio || 1.0;
}, emscripten_get_element_css_size:function(a, b, c) {
  a = P(a);
  if (!a) {
    return -4;
  }
  a = yc(a);
  D[b >> 3] = a.width;
  D[c >> 3] = a.height;
  return 0;
}, emscripten_get_now:zc, emscripten_memcpy_big:function(a, b, c) {
  x.copyWithin(a, b, b + c);
}, emscripten_request_animation_frame_loop:function(a, b) {
  function c(d) {
    R(a)(d, b) && requestAnimationFrame(c);
  }
  return requestAnimationFrame(c);
}, emscripten_resize_heap:function(a) {
  var b = x.length;
  a >>>= 0;
  assert(a > b);
  if (2147483648 < a) {
    return n("Cannot enlarge memory, asked to go up to " + a + " bytes, but the limit is 2147483648 bytes!"), !1;
  }
  for (var c = 1; 4 >= c; c *= 2) {
    var d = b * (1 + 0.2 / c);
    d = Math.min(d, a + 100663296);
    var e = Math;
    d = Math.max(a, d);
    e = e.min.call(e, 2147483648, d + (65536 - d % 65536) % 65536);
    a: {
      d = e;
      try {
        ua.grow(d - Ca.byteLength + 65535 >>> 16);
        Ha();
        var f = 1;
        break a;
      } catch (g) {
        n("emscripten_realloc_buffer: Attempted to grow heap from " + Ca.byteLength + " bytes to " + d + " bytes, but got error: " + g);
      }
      f = void 0;
    }
    if (f) {
      return !0;
    }
  }
  n("Failed to grow the heap from " + b + " bytes to " + e + " bytes, not enough memory!");
  return !1;
}, emscripten_set_blur_callback_on_thread:function(a, b, c, d) {
  Bc(a, b, c, d, 12, "blur");
  return 0;
}, emscripten_set_canvas_element_size:function(a, b, c) {
  a = P(a);
  if (!a) {
    return -4;
  }
  a.width = b;
  a.height = c;
  return 0;
}, emscripten_set_focus_callback_on_thread:function(a, b, c, d) {
  Bc(a, b, c, d, 13, "focus");
  return 0;
}, emscripten_set_keydown_callback_on_thread:function(a, b, c, d) {
  Cc(a, b, c, d, 2, "keydown");
  return 0;
}, emscripten_set_keypress_callback_on_thread:function(a, b, c, d) {
  Cc(a, b, c, d, 1, "keypress");
  return 0;
}, emscripten_set_keyup_callback_on_thread:function(a, b, c, d) {
  Cc(a, b, c, d, 3, "keyup");
  return 0;
}, emscripten_set_mousedown_callback_on_thread:function(a, b, c, d) {
  Ec(a, b, c, d, 5, "mousedown");
  return 0;
}, emscripten_set_mouseenter_callback_on_thread:function(a, b, c, d) {
  Ec(a, b, c, d, 33, "mouseenter");
  return 0;
}, emscripten_set_mouseleave_callback_on_thread:function(a, b, c, d) {
  Ec(a, b, c, d, 34, "mouseleave");
  return 0;
}, emscripten_set_mousemove_callback_on_thread:function(a, b, c, d) {
  Ec(a, b, c, d, 8, "mousemove");
  return 0;
}, emscripten_set_mouseup_callback_on_thread:function(a, b, c, d) {
  Ec(a, b, c, d, 6, "mouseup");
  return 0;
}, emscripten_set_pointerlockchange_callback_on_thread:function(a, b, c, d) {
  if (!document || !document.body || !(document.body.requestPointerLock || document.body.m || document.body.V || document.body.U)) {
    return -1;
  }
  a = P(a);
  if (!a) {
    return -4;
  }
  Fc(a, b, c, d, "pointerlockchange");
  Fc(a, b, c, d, "mozpointerlockchange");
  Fc(a, b, c, d, "webkitpointerlockchange");
  Fc(a, b, c, d, "mspointerlockchange");
  return 0;
}, emscripten_set_pointerlockerror_callback_on_thread:function(a, b, c, d) {
  if (!document || !(document.body.requestPointerLock || document.body.m || document.body.V || document.body.U)) {
    return -1;
  }
  a = P(a);
  if (!a) {
    return -4;
  }
  Gc(a, b, c, d, "pointerlockerror");
  Gc(a, b, c, d, "mozpointerlockerror");
  Gc(a, b, c, d, "webkitpointerlockerror");
  Gc(a, b, c, d, "mspointerlockerror");
  return 0;
}, emscripten_set_resize_callback_on_thread:function(a, b, c, d) {
  Hc(a, b, c, d);
  return 0;
}, emscripten_set_touchcancel_callback_on_thread:function(a, b, c, d) {
  Ic(a, b, c, d, 25, "touchcancel");
  return 0;
}, emscripten_set_touchend_callback_on_thread:function(a, b, c, d) {
  Ic(a, b, c, d, 23, "touchend");
  return 0;
}, emscripten_set_touchmove_callback_on_thread:function(a, b, c, d) {
  Ic(a, b, c, d, 24, "touchmove");
  return 0;
}, emscripten_set_touchstart_callback_on_thread:function(a, b, c, d) {
  Ic(a, b, c, d, 22, "touchstart");
  return 0;
}, emscripten_set_webglcontextlost_callback_on_thread:function(a, b, c, d) {
  Jc(a, b, c, d, 31, "webglcontextlost");
  return 0;
}, emscripten_set_webglcontextrestored_callback_on_thread:function(a, b, c, d) {
  Jc(a, b, c, d, 32, "webglcontextrestored");
  return 0;
}, emscripten_set_wheel_callback_on_thread:function(a, b, c, d) {
  a = P(a);
  return "undefined" != typeof a.onwheel ? (Kc(a, b, c, d), 0) : -1;
}, emscripten_webgl_create_context:function(a, b) {
  assert(b);
  b >>= 2;
  b = {alpha:!!A[b], depth:!!A[b + 1], stencil:!!A[b + 2], antialias:!!A[b + 3], premultipliedAlpha:!!A[b + 4], preserveDrawingBuffer:!!A[b + 5], powerPreference:fd[A[b + 6]], failIfMajorPerformanceCaveat:!!A[b + 7], Ta:A[b + 8], lb:A[b + 9], na:A[b + 10], Ma:A[b + 11], ob:A[b + 12], pb:A[b + 13]};
  a = P(a);
  return !a || b.Ma ? 0 : cd(a, b);
}, emscripten_webgl_enable_extension:function(a, b) {
  a = Uc[a];
  b = w(b);
  b.startsWith("GL_") && (b = b.substr(3));
  "WEBGL_draw_instanced_base_vertex_base_instance" == b && Lc(Y);
  "WEBGL_multi_draw_instanced_base_vertex_base_instance" == b && Mc(Y);
  "WEBGL_multi_draw" == b && Nc(Y);
  return !!a.R.getExtension(b);
}, emscripten_webgl_init_context_attributes:function(a) {
  assert(a);
  a >>= 2;
  for (var b = 0; 14 > b; ++b) {
    A[a + b] = 0;
  }
  A[a] = A[a + 1] = A[a + 3] = A[a + 4] = A[a + 8] = A[a + 10] = 1;
}, emscripten_webgl_make_context_current:function(a) {
  X = Uc[a];
  h.gb = Y = X && X.R;
  return !a || Y ? 0 : -5;
}, fd_close:function(a) {
  try {
    var b = hc(a);
    if (null === b.fd) {
      throw new I(8);
    }
    b.da && (b.da = null);
    try {
      b.i.close && b.i.close(b);
    } catch (c) {
      throw c;
    } finally {
      Gb[b.fd] = null;
    }
    b.fd = null;
    return 0;
  } catch (c) {
    if ("undefined" == typeof M || !(c instanceof I)) {
      throw c;
    }
    return c.D;
  }
}, fd_read:function(a, b, c, d) {
  try {
    a: {
      var e = hc(a);
      a = b;
      for (var f = b = 0; f < c; f++) {
        var g = B[a >> 2], m = B[a + 4 >> 2];
        a += 8;
        var p = e, r = g, u = m, t = void 0, Q = z;
        if (0 > u || 0 > t) {
          throw new I(28);
        }
        if (null === p.fd) {
          throw new I(8);
        }
        if (1 === (p.flags & 2097155)) {
          throw new I(8);
        }
        if (16384 === (p.node.mode & 61440)) {
          throw new I(31);
        }
        if (!p.i.read) {
          throw new I(28);
        }
        var W = "undefined" != typeof t;
        if (!W) {
          t = p.position;
        } else if (!p.seekable) {
          throw new I(70);
        }
        var Fa = p.i.read(p, Q, r, u, t);
        W || (p.position += Fa);
        var ja = Fa;
        if (0 > ja) {
          var Ga = -1;
          break a;
        }
        b += ja;
        if (ja < m) {
          break;
        }
      }
      Ga = b;
    }
    B[d >> 2] = Ga;
    return 0;
  } catch (ba) {
    if ("undefined" == typeof M || !(ba instanceof I)) {
      throw ba;
    }
    return ba.D;
  }
}, fd_seek:function(a, b, c, d, e) {
  try {
    assert(b == b >>> 0 || b == (b | 0));
    assert(c === (c | 0));
    var f = c + 2097152 >>> 0 < 4194305 - !!b ? (b >>> 0) + 4294967296 * c : NaN;
    if (isNaN(f)) {
      return 61;
    }
    var g = hc(a);
    $b(g, f, d);
    db = [g.position >>> 0, (cb = g.position, 1.0 <= +Math.abs(cb) ? 0.0 < cb ? (Math.min(+Math.floor(cb / 4294967296.0), 4294967295.0) | 0) >>> 0 : ~~+Math.ceil((cb - +(~~cb >>> 0)) / 4294967296.0) >>> 0 : 0)];
    A[e >> 2] = db[0];
    A[e + 4 >> 2] = db[1];
    g.da && 0 === f && 0 === d && (g.da = null);
    return 0;
  } catch (m) {
    if ("undefined" == typeof M || !(m instanceof I)) {
      throw m;
    }
    return m.D;
  }
}, fd_write:function(a, b, c, d) {
  try {
    a: {
      var e = hc(a);
      a = b;
      for (var f = b = 0; f < c; f++) {
        var g = B[a >> 2], m = B[a + 4 >> 2];
        a += 8;
        var p = e, r = g, u = m, t = void 0, Q = z;
        if (0 > u || 0 > t) {
          throw new I(28);
        }
        if (null === p.fd) {
          throw new I(8);
        }
        if (0 === (p.flags & 2097155)) {
          throw new I(8);
        }
        if (16384 === (p.node.mode & 61440)) {
          throw new I(31);
        }
        if (!p.i.write) {
          throw new I(28);
        }
        p.seekable && p.flags & 1024 && $b(p, 0, 2);
        var W = "undefined" != typeof t;
        if (!W) {
          t = p.position;
        } else if (!p.seekable) {
          throw new I(70);
        }
        var Fa = p.i.write(p, Q, r, u, t, void 0);
        W || (p.position += Fa);
        var ja = Fa;
        if (0 > ja) {
          var Ga = -1;
          break a;
        }
        b += ja;
      }
      Ga = b;
    }
    B[d >> 2] = Ga;
    return 0;
  } catch (ba) {
    if ("undefined" == typeof M || !(ba instanceof I)) {
      throw ba;
    }
    return ba.D;
  }
}, glActiveTexture:function(a) {
  Y.activeTexture(a);
}, glAttachShader:function(a, b) {
  Y.attachShader(T[a], U[b]);
}, glBindBuffer:function(a, b) {
  34962 == a ? Y.M = b : 34963 == a && (Y.N = b);
  35051 == a ? Y.la = b : 35052 == a && (Y.I = b);
  Y.bindBuffer(a, Pc[b]);
}, glBindFramebuffer:function(a, b) {
  Y.bindFramebuffer(a, Qc[b]);
}, glBindRenderbuffer:function(a, b) {
  Y.bindRenderbuffer(a, Rc[b]);
}, glBindTexture:function(a, b) {
  Y.bindTexture(a, Sc[b]);
}, glBindVertexArray:function(a) {
  Y.bindVertexArray(Tc[a]);
  a = Y.getParameter(34965);
  Y.N = a ? a.name | 0 : 0;
}, glBlendColor:function(a, b, c, d) {
  Y.blendColor(a, b, c, d);
}, glBlendEquationSeparate:function(a, b) {
  Y.blendEquationSeparate(a, b);
}, glBlendFuncSeparate:function(a, b, c, d) {
  Y.blendFuncSeparate(a, b, c, d);
}, glBlitFramebuffer:function(a, b, c, d, e, f, g, m, p, r) {
  Y.blitFramebuffer(a, b, c, d, e, f, g, m, p, r);
}, glBufferData:function(a, b, c, d) {
  c && b ? Y.bufferData(a, x, d, c, b) : Y.bufferData(a, b, d);
}, glBufferSubData:function(a, b, c, d) {
  c && Y.bufferSubData(a, b, x, d, c);
}, glClear:function(a) {
  Y.clear(a);
}, glClearBufferfi:function(a, b, c, d) {
  Y.clearBufferfi(a, b, c, d);
}, glClearBufferfv:function(a, b, c) {
  Y.clearBufferfv(a, b, C, c >> 2);
}, glClearBufferiv:function(a, b, c) {
  Y.clearBufferiv(a, b, A, c >> 2);
}, glClearColor:function(a, b, c, d) {
  Y.clearColor(a, b, c, d);
}, glClearDepthf:function(a) {
  Y.clearDepth(a);
}, glClearStencil:function(a) {
  Y.clearStencil(a);
}, glColorMask:function(a, b, c, d) {
  Y.colorMask(!!a, !!b, !!c, !!d);
}, glCompileShader:function(a) {
  Y.compileShader(U[a]);
}, glCompressedTexImage2D:function(a, b, c, d, e, f, g, m) {
  Y.I || !g ? Y.compressedTexImage2D(a, b, c, d, e, f, g, m) : Y.compressedTexImage2D(a, b, c, d, e, f, x, m, g);
}, glCompressedTexImage3D:function(a, b, c, d, e, f, g, m, p) {
  Y.I ? Y.compressedTexImage3D(a, b, c, d, e, f, g, m, p) : Y.compressedTexImage3D(a, b, c, d, e, f, g, x, p, m);
}, glCreateProgram:function() {
  var a = Zc(T), b = Y.createProgram();
  b.name = a;
  b.Y = b.W = b.X = 0;
  b.ia = 1;
  T[a] = b;
  return a;
}, glCreateShader:function(a) {
  var b = Zc(U);
  U[b] = Y.createShader(a);
  return b;
}, glCullFace:function(a) {
  Y.cullFace(a);
}, glDeleteBuffers:function(a, b) {
  for (var c = 0; c < a; c++) {
    var d = A[b + 4 * c >> 2], e = Pc[d];
    e && (Y.deleteBuffer(e), e.name = 0, Pc[d] = null, d == Y.M && (Y.M = 0), d == Y.N && (Y.N = 0), d == Y.la && (Y.la = 0), d == Y.I && (Y.I = 0));
  }
}, glDeleteFramebuffers:function(a, b) {
  for (var c = 0; c < a; ++c) {
    var d = A[b + 4 * c >> 2], e = Qc[d];
    e && (Y.deleteFramebuffer(e), e.name = 0, Qc[d] = null);
  }
}, glDeleteProgram:function(a) {
  if (a) {
    var b = T[a];
    b ? (Y.deleteProgram(b), b.name = 0, T[a] = null) : V(1281);
  }
}, glDeleteRenderbuffers:function(a, b) {
  for (var c = 0; c < a; c++) {
    var d = A[b + 4 * c >> 2], e = Rc[d];
    e && (Y.deleteRenderbuffer(e), e.name = 0, Rc[d] = null);
  }
}, glDeleteShader:function(a) {
  if (a) {
    var b = U[a];
    b ? (Y.deleteShader(b), U[a] = null) : V(1281);
  }
}, glDeleteTextures:function(a, b) {
  for (var c = 0; c < a; c++) {
    var d = A[b + 4 * c >> 2], e = Sc[d];
    e && (Y.deleteTexture(e), e.name = 0, Sc[d] = null);
  }
}, glDeleteVertexArrays:function(a, b) {
  for (var c = 0; c < a; c++) {
    var d = A[b + 4 * c >> 2];
    Y.deleteVertexArray(Tc[d]);
    Tc[d] = null;
  }
}, glDepthFunc:function(a) {
  Y.depthFunc(a);
}, glDepthMask:function(a) {
  Y.depthMask(!!a);
}, glDisable:function(a) {
  Y.disable(a);
}, glDisableVertexAttribArray:function(a) {
  X.L[a].enabled = !1;
  Y.disableVertexAttribArray(a);
}, glDrawArrays:function(a, b, c) {
  ad(b + c);
  Y.drawArrays(a, b, c);
  bd && Y.bindBuffer(34962, Pc[Y.M]);
}, glDrawArraysInstanced:function(a, b, c, d) {
  Y.drawArraysInstanced(a, b, c, d);
}, glDrawElements:function(a, b, c, d) {
  if (!Y.N) {
    var e = 1 * Vc[c - 5120] * b;
    var f = $c(e);
    var g = X.K[f];
    g ? f = g : (g = Y.getParameter(34965), X.K[f] = Y.createBuffer(), Y.bindBuffer(34963, X.K[f]), Y.bufferData(34963, 1 << f, 35048), Y.bindBuffer(34963, g), f = X.K[f]);
    Y.bindBuffer(34963, f);
    Y.bufferSubData(34963, 0, x.subarray(d, d + e));
    d = 0;
  }
  ad(b);
  Y.drawElements(a, b, c, d);
  bd && Y.bindBuffer(34962, Pc[Y.M]);
  Y.N || Y.bindBuffer(34963, null);
}, glDrawElementsInstanced:function(a, b, c, d, e) {
  Y.drawElementsInstanced(a, b, c, d, e);
}, glEnable:function(a) {
  Y.enable(a);
}, glEnableVertexAttribArray:function(a) {
  X.L[a].enabled = !0;
  Y.enableVertexAttribArray(a);
}, glFrontFace:function(a) {
  Y.frontFace(a);
}, glGenBuffers:function(a, b) {
  gd(a, b, "createBuffer", Pc);
}, glGenRenderbuffers:function(a, b) {
  gd(a, b, "createRenderbuffer", Rc);
}, glGenTextures:function(a, b) {
  gd(a, b, "createTexture", Sc);
}, glGenVertexArrays:function(a, b) {
  gd(a, b, "createVertexArray", Tc);
}, glGetAttribLocation:function(a, b) {
  return Y.getAttribLocation(T[a], w(b));
}, glGetError:function() {
  var a = Y.getError() || Yc;
  Yc = 0;
  return a;
}, glGetIntegerv:function(a, b) {
  hd(a, b);
}, glGetProgramInfoLog:function(a, b, c, d) {
  a = Y.getProgramInfoLog(T[a]);
  null === a && (a = "(unknown error)");
  b = 0 < b && d ? y(a, d, b) : 0;
  c && (A[c >> 2] = b);
}, glGetProgramiv:function(a, b, c) {
  if (c) {
    if (a >= Oc) {
      V(1281);
    } else {
      if (a = T[a], 35716 == b) {
        a = Y.getProgramInfoLog(a), null === a && (a = "(unknown error)"), A[c >> 2] = a.length + 1;
      } else if (35719 == b) {
        if (!a.Y) {
          for (b = 0; b < Y.getProgramParameter(a, 35718); ++b) {
            a.Y = Math.max(a.Y, Y.getActiveUniform(a, b).name.length + 1);
          }
        }
        A[c >> 2] = a.Y;
      } else if (35722 == b) {
        if (!a.W) {
          for (b = 0; b < Y.getProgramParameter(a, 35721); ++b) {
            a.W = Math.max(a.W, Y.getActiveAttrib(a, b).name.length + 1);
          }
        }
        A[c >> 2] = a.W;
      } else if (35381 == b) {
        if (!a.X) {
          for (b = 0; b < Y.getProgramParameter(a, 35382); ++b) {
            a.X = Math.max(a.X, Y.getActiveUniformBlockName(a, b).length + 1);
          }
        }
        A[c >> 2] = a.X;
      } else {
        A[c >> 2] = Y.getProgramParameter(a, b);
      }
    }
  } else {
    V(1281);
  }
}, glGetShaderInfoLog:function(a, b, c, d) {
  a = Y.getShaderInfoLog(U[a]);
  null === a && (a = "(unknown error)");
  b = 0 < b && d ? y(a, d, b) : 0;
  c && (A[c >> 2] = b);
}, glGetShaderiv:function(a, b, c) {
  c ? 35716 == b ? (a = Y.getShaderInfoLog(U[a]), null === a && (a = "(unknown error)"), A[c >> 2] = a ? a.length + 1 : 0) : 35720 == b ? (a = Y.getShaderSource(U[a]), A[c >> 2] = a ? a.length + 1 : 0) : A[c >> 2] = Y.getShaderParameter(U[a], b) : V(1281);
}, glGetString:function(a) {
  var b = Wc[a];
  if (!b) {
    switch(a) {
      case 7939:
        b = Y.getSupportedExtensions() || [];
        b = b.concat(b.map(function(d) {
          return "GL_" + d;
        }));
        b = jd(b.join(" "));
        break;
      case 7936:
      case 7937:
      case 37445:
      case 37446:
        (b = Y.getParameter(a)) || V(1280);
        b = b && jd(b);
        break;
      case 7938:
        b = jd("OpenGL ES 3.0 (" + Y.getParameter(7938) + ")");
        break;
      case 35724:
        b = Y.getParameter(35724);
        var c = b.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
        null !== c && (3 == c[1].length && (c[1] += "0"), b = "OpenGL ES GLSL ES " + c[1] + " (" + b + ")");
        b = jd(b);
        break;
      default:
        V(1280);
    }
    Wc[a] = b;
  }
  return b;
}, glGetStringi:function(a, b) {
  if (2 > X.version) {
    return V(1282), 0;
  }
  var c = Xc[a];
  if (c) {
    return 0 > b || b >= c.length ? (V(1281), 0) : c[b];
  }
  switch(a) {
    case 7939:
      return c = Y.getSupportedExtensions() || [], c = c.concat(c.map(function(d) {
        return "GL_" + d;
      })), c = c.map(function(d) {
        return jd(d);
      }), c = Xc[a] = c, 0 > b || b >= c.length ? (V(1281), 0) : c[b];
    default:
      return V(1280), 0;
  }
}, glGetUniformLocation:function(a, b) {
  b = w(b);
  if (a = T[a]) {
    var c = a, d = c.P, e = c.Ha, f;
    if (!d) {
      for (c.P = d = {}, c.Ga = {}, f = 0; f < Y.getProgramParameter(c, 35718); ++f) {
        var g = Y.getActiveUniform(c, f);
        var m = g.name;
        g = g.size;
        var p = kd(m);
        p = 0 < p ? m.slice(0, p) : m;
        var r = c.ia;
        c.ia += g;
        e[p] = [g, r];
        for (m = 0; m < g; ++m) {
          d[r] = m, c.Ga[r++] = p;
        }
      }
    }
    c = a.P;
    d = 0;
    e = b;
    f = kd(b);
    0 < f && (d = parseInt(b.slice(f + 1)) >>> 0, e = b.slice(0, f));
    if ((e = a.Ha[e]) && d < e[0] && (d += e[1], c[d] = c[d] || Y.getUniformLocation(a, b))) {
      return d;
    }
  } else {
    V(1281);
  }
  return -1;
}, glLinkProgram:function(a) {
  a = T[a];
  Y.linkProgram(a);
  a.P = 0;
  a.Ha = {};
}, glPolygonOffset:function(a, b) {
  Y.polygonOffset(a, b);
}, glReadBuffer:function(a) {
  Y.readBuffer(a);
}, glRenderbufferStorage:function(a, b, c, d) {
  Y.renderbufferStorage(a, b, c, d);
}, glRenderbufferStorageMultisample:function(a, b, c, d, e) {
  Y.renderbufferStorageMultisample(a, b, c, d, e);
}, glScissor:function(a, b, c, d) {
  Y.scissor(a, b, c, d);
}, glShaderSource:function(a, b, c, d) {
  for (var e = "", f = 0; f < b; ++f) {
    var g = d ? A[d + 4 * f >> 2] : -1;
    e += w(A[c + 4 * f >> 2], 0 > g ? void 0 : g);
  }
  Y.shaderSource(U[a], e);
}, glStencilFunc:function(a, b, c) {
  Y.stencilFunc(a, b, c);
}, glStencilFuncSeparate:function(a, b, c, d) {
  Y.stencilFuncSeparate(a, b, c, d);
}, glStencilMask:function(a) {
  Y.stencilMask(a);
}, glStencilOp:function(a, b, c) {
  Y.stencilOp(a, b, c);
}, glStencilOpSeparate:function(a, b, c, d) {
  Y.stencilOpSeparate(a, b, c, d);
}, glTexImage2D:function(a, b, c, d, e, f, g, m, p) {
  if (Y.I) {
    Y.texImage2D(a, b, c, d, e, f, g, m, p);
  } else if (p) {
    var r = ld(m);
    Y.texImage2D(a, b, c, d, e, f, g, m, r, p >> 31 - Math.clz32(r.BYTES_PER_ELEMENT));
  } else {
    Y.texImage2D(a, b, c, d, e, f, g, m, null);
  }
}, glTexImage3D:function(a, b, c, d, e, f, g, m, p, r) {
  if (Y.I) {
    Y.texImage3D(a, b, c, d, e, f, g, m, p, r);
  } else if (r) {
    var u = ld(p);
    Y.texImage3D(a, b, c, d, e, f, g, m, p, u, r >> 31 - Math.clz32(u.BYTES_PER_ELEMENT));
  } else {
    Y.texImage3D(a, b, c, d, e, f, g, m, p, null);
  }
}, glTexParameterf:function(a, b, c) {
  Y.texParameterf(a, b, c);
}, glTexParameteri:function(a, b, c) {
  Y.texParameteri(a, b, c);
}, glUniform1fv:function(a, b, c) {
  b && Y.uniform1fv(Z(a), C, c >> 2, b);
}, glUniform1i:function(a, b) {
  Y.uniform1i(Z(a), b);
}, glUniform1iv:function(a, b, c) {
  b && Y.uniform1iv(Z(a), A, c >> 2, b);
}, glUniform2fv:function(a, b, c) {
  b && Y.uniform2fv(Z(a), C, c >> 2, 2 * b);
}, glUniform2iv:function(a, b, c) {
  b && Y.uniform2iv(Z(a), A, c >> 2, 2 * b);
}, glUniform3fv:function(a, b, c) {
  b && Y.uniform3fv(Z(a), C, c >> 2, 3 * b);
}, glUniform3iv:function(a, b, c) {
  b && Y.uniform3iv(Z(a), A, c >> 2, 3 * b);
}, glUniform4fv:function(a, b, c) {
  b && Y.uniform4fv(Z(a), C, c >> 2, 4 * b);
}, glUniform4iv:function(a, b, c) {
  b && Y.uniform4iv(Z(a), A, c >> 2, 4 * b);
}, glUniformMatrix4fv:function(a, b, c, d) {
  b && Y.uniformMatrix4fv(Z(a), !!c, C, d >> 2, 16 * b);
}, glUseProgram:function(a) {
  a = T[a];
  Y.useProgram(a);
  Y.Ka = a;
}, glVertexAttribDivisor:function(a, b) {
  Y.vertexAttribDivisor(a, b);
}, glVertexAttribPointer:function(a, b, c, d, e, f) {
  var g = X.L[a];
  Y.M ? (g.ba = !1, Y.vertexAttribPointer(a, b, c, !!d, e, f)) : (g.size = b, g.type = c, g.wa = d, g.ga = e, g.o = f, g.ba = !0, g.Ia = function(m, p, r, u, t, Q) {
    this.vertexAttribPointer(m, p, r, u, t, Q);
  });
}, glViewport:function(a, b, c, d) {
  Y.viewport(a, b, c, d);
}, sapp_js_add_beforeunload_listener:function() {
  h.ya = a => {
    0 != td() && (a.preventDefault(), a.returnValue = " ");
  };
  window.addEventListener("beforeunload", h.ya);
}, sapp_js_add_clipboard_listener:function() {
  h.Ea = a => {
    const b = a.clipboardData.getData("text");
    Ab(() => {
      const c = qd(b);
      ud(c);
    });
  };
  window.addEventListener("paste", h.Ea);
}, sapp_js_add_dragndrop_listeners:function(a) {
  h.qb = [];
  a = w(a);
  a = document.getElementById(a);
  h.za = b => {
    b.stopPropagation();
    b.preventDefault();
  };
  h.Aa = b => {
    b.stopPropagation();
    b.preventDefault();
  };
  h.Ba = b => {
    b.stopPropagation();
    b.preventDefault();
  };
  h.Ca = b => {
    b.stopPropagation();
    b.preventDefault();
    const c = b.dataTransfer.files;
    h.Da = c;
    vd(c.length);
    for (let d = 0; d < c.length; d++) {
      Ab(() => {
        const e = qd(c[d].name);
        wd(d, e);
      });
    }
    xd(b.clientX, b.clientY);
  };
  a.addEventListener("dragenter", h.za, !1);
  a.addEventListener("dragleave", h.Aa, !1);
  a.addEventListener("dragover", h.Ba, !1);
  a.addEventListener("drop", h.Ca, !1);
}, sapp_js_clear_favicon:function() {
  const a = document.getElementById("sokol-app-favicon");
  a && document.head.removeChild(a);
}, sapp_js_create_textfield:function() {
  const a = document.createElement("input");
  a.type = "text";
  a.id = "_sokol_app_input_element";
  a.autocapitalize = "none";
  a.addEventListener("focusout", function() {
    yd();
  });
  document.body.append(a);
}, sapp_js_dropped_file_size:function(a) {
  const b = h.Da;
  return 0 > a || a >= b.length ? 0 : b[a].size;
}, sapp_js_exit_pointerlock:function() {
  document.exitPointerLock && document.exitPointerLock();
}, sapp_js_fetch_dropped_file:function(a, b, c, d, e) {
  const f = new FileReader();
  f.onload = g => {
    g = g.target.result;
    g.byteLength > d ? zd(a, 0, 1, b, 0, c, d, e) : (x.set(new Uint8Array(g), c), zd(a, 1, 0, b, g.byteLength, c, d, e));
  };
  f.onerror = () => {
    zd(a, 0, 2, b, 0, c, d, e);
  };
  f.readAsArrayBuffer(h.Da[a]);
}, sapp_js_focus_textfield:function() {
  document.getElementById("_sokol_app_input_element").focus();
}, sapp_js_init:function(a) {
  a = w(a);
  h.H = document.getElementById(a);
  h.H || console.log("sokol_app.h: invalid target:" + a);
  h.H.requestPointerLock || console.log("sokol_app.h: target doesn't support requestPointerLock:" + a);
}, sapp_js_remove_beforeunload_listener:function() {
  window.removeEventListener("beforeunload", h.ya);
}, sapp_js_remove_clipboard_listener:function() {
  window.removeEventListener("paste", h.Ea);
}, sapp_js_remove_dragndrop_listeners:function(a) {
  a = w(a);
  a = document.getElementById(a);
  a.removeEventListener("dragenter", h.za);
  a.removeEventListener("dragleave", h.Aa);
  a.removeEventListener("dragover", h.Ba);
  a.removeEventListener("drop", h.Ca);
}, sapp_js_request_pointerlock:function() {
  h.H && h.H.requestPointerLock && h.H.requestPointerLock();
}, sapp_js_set_cursor:function(a, b) {
  if (h.H) {
    if (0 === b) {
      a = "none";
    } else {
      switch(a) {
        case 0:
          a = "auto";
          break;
        case 1:
          a = "default";
          break;
        case 2:
          a = "text";
          break;
        case 3:
          a = "crosshair";
          break;
        case 4:
          a = "pointer";
          break;
        case 5:
          a = "ew-resize";
          break;
        case 6:
          a = "ns-resize";
          break;
        case 7:
          a = "nwse-resize";
          break;
        case 8:
          a = "nesw-resize";
          break;
        case 9:
          a = "all-scroll";
          break;
        case 10:
          a = "not-allowed";
          break;
        default:
          a = "auto";
      }
    }
    h.H.style.cursor = a;
  }
}, sapp_js_set_favicon:function(a, b, c) {
  const d = document.createElement("canvas");
  d.width = a;
  d.height = b;
  const e = d.getContext("2d"), f = e.createImageData(a, b);
  f.data.set(x.subarray(c, c + a * b * 4));
  e.putImageData(f, 0, 0);
  a = document.createElement("link");
  a.id = "sokol-app-favicon";
  a.rel = "shortcut icon";
  a.href = d.toDataURL();
  document.head.appendChild(a);
}, sapp_js_unfocus_textfield:function() {
  document.getElementById("_sokol_app_input_element").blur();
}, sapp_js_write_clipboard:function(a) {
  a = w(a);
  const b = document.createElement("textarea");
  b.setAttribute("autocomplete", "off");
  b.setAttribute("autocorrect", "off");
  b.setAttribute("autocapitalize", "off");
  b.setAttribute("spellcheck", "false");
  b.style.left = "-100px";
  b.style.top = "-100px";
  b.style.height = 1;
  b.style.width = 1;
  b.value = a;
  document.body.appendChild(b);
  b.select();
  document.execCommand("copy");
  document.body.removeChild(b);
}, simgui_js_is_osx:function() {
  return navigator.userAgent.includes("Macintosh") ? 1 : 0;
}};
(function() {
  function a(f) {
    h.asm = f.exports;
    ua = h.asm.memory;
    assert(ua, "memory not found in wasm exports");
    Ha();
    Ja = h.asm.__indirect_function_table;
    assert(Ja, "table not found in wasm exports");
    Qa.unshift(h.asm.__wasm_call_ctors);
    E--;
    h.monitorRunDependencies && h.monitorRunDependencies(E);
    assert(Xa["wasm-instantiate"]);
    delete Xa["wasm-instantiate"];
    0 == E && (null !== F && (clearInterval(F), F = null), Wa && (f = Wa, Wa = null, f()));
  }
  function b(f) {
    assert(h === e, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
    e = null;
    a(f.instance);
  }
  function c(f) {
    return bb().then(function(g) {
      return WebAssembly.instantiate(g, d);
    }).then(function(g) {
      return g;
    }).then(f, function(g) {
      n("failed to asynchronously prepare wasm: " + g);
      qa(G) && n("warning: Loading from a file URI (" + G + ") is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing");
      q(g);
    });
  }
  var d = {env:Ad, wasi_snapshot_preview1:Ad,};
  Ya();
  var e = h;
  if (h.instantiateWasm) {
    try {
      return h.instantiateWasm(d, a);
    } catch (f) {
      return n("Module.instantiateWasm callback failed with error: " + f), !1;
    }
  }
  (function() {
    return ta || "function" != typeof WebAssembly.instantiateStreaming || Za() || qa(G) || k || "function" != typeof fetch ? c(b) : fetch(G, {credentials:"same-origin"}).then(function(f) {
      return WebAssembly.instantiateStreaming(f, d).then(b, function(g) {
        n("wasm streaming compile failed: " + g);
        n("falling back to ArrayBuffer instantiation");
        return c(b);
      });
    });
  })();
  return {};
})();
h.___wasm_call_ctors = H("__wasm_call_ctors");
h._main = H("__main_argc_argv");
var yd = h.__sapp_emsc_notify_keyboard_hidden = H("_sapp_emsc_notify_keyboard_hidden"), ud = h.__sapp_emsc_onpaste = H("_sapp_emsc_onpaste"), td = h.__sapp_html5_get_ask_leave_site = H("_sapp_html5_get_ask_leave_site"), vd = h.__sapp_emsc_begin_drop = H("_sapp_emsc_begin_drop"), wd = h.__sapp_emsc_drop = H("_sapp_emsc_drop"), xd = h.__sapp_emsc_end_drop = H("_sapp_emsc_end_drop"), zd = h.__sapp_emsc_invoke_fetch_cb = H("_sapp_emsc_invoke_fetch_cb");
h._free = H("free");
var Bd = h._fflush = H("fflush"), S = h._malloc = H("malloc"), sd = h.___errno_location = H("__errno_location"), Cd = h._emscripten_stack_init = function() {
  return (Cd = h._emscripten_stack_init = h.asm.emscripten_stack_init).apply(null, arguments);
};
h._emscripten_stack_get_free = function() {
  return (h._emscripten_stack_get_free = h.asm.emscripten_stack_get_free).apply(null, arguments);
};
h._emscripten_stack_get_base = function() {
  return (h._emscripten_stack_get_base = h.asm.emscripten_stack_get_base).apply(null, arguments);
};
var La = h._emscripten_stack_get_end = function() {
  return (La = h._emscripten_stack_get_end = h.asm.emscripten_stack_get_end).apply(null, arguments);
}, Bb = h.stackSave = H("stackSave"), Cb = h.stackRestore = H("stackRestore"), rd = h.stackAlloc = H("stackAlloc"), pd = h._emscripten_stack_get_current = function() {
  return (pd = h._emscripten_stack_get_current = h.asm.emscripten_stack_get_current).apply(null, arguments);
};
h.___cxa_is_pointer_type = H("__cxa_is_pointer_type");
h.dynCall_jiji = H("dynCall_jiji");
h.___start_em_js = 225728;
h.___stop_em_js = 231656;
"run UTF8ArrayToString UTF8ToString stringToUTF8Array stringToUTF8 lengthBytesUTF8 addOnPreRun addOnInit addOnPreMain addOnExit addOnPostRun addRunDependency removeRunDependency FS_createFolder FS_createPath FS_createDataFile FS_createPreloadedFile FS_createLazyFile FS_createLink FS_createDevice FS_unlink getLEB getFunctionTables alignFunctionTables registerFunctions prettyPrint getCompilerSetting out err callMain abort keepRuntimeAlive wasmMemory stackAlloc stackSave stackRestore getTempRet0 setTempRet0 writeStackCookie checkStackCookie ptrToString zeroMemory stringToNewUTF8 exitJS getHeapMax emscripten_realloc_buffer ENV ERRNO_CODES ERRNO_MESSAGES setErrNo inetPton4 inetNtop4 inetPton6 inetNtop6 readSockaddr writeSockaddr DNS getHostByName Protocols Sockets getRandomDevice warnOnce traverseStack UNWIND_CACHE convertPCtoSourceLocation readEmAsmArgsArray readEmAsmArgs runEmAsmFunction runMainThreadEmAsm jstoi_q jstoi_s getExecutableName listenOnce autoResumeAudioContext dynCallLegacy getDynCaller dynCall handleException runtimeKeepalivePush runtimeKeepalivePop callUserCallback maybeExit safeSetTimeout asmjsMangle asyncLoad alignMemory mmapAlloc writeI53ToI64 writeI53ToI64Clamped writeI53ToI64Signaling writeI53ToU64Clamped writeI53ToU64Signaling readI53FromI64 readI53FromU64 convertI32PairToI53 convertI32PairToI53Checked convertU32PairToI53 getCFunc ccall cwrap uleb128Encode sigToWasmTypes generateFuncType convertJsFunctionToWasm freeTableIndexes functionsInTableMap getEmptyTableSlot updateTableMap addFunction removeFunction reallyNegative unSign strLen reSign formatString setValue getValue PATH PATH_FS intArrayFromString intArrayToString AsciiToString stringToAscii UTF16Decoder UTF16ToString stringToUTF16 lengthBytesUTF16 UTF32ToString stringToUTF32 lengthBytesUTF32 allocateUTF8 allocateUTF8OnStack writeStringToMemory writeArrayToMemory writeAsciiToMemory SYSCALLS getSocketFromFD getSocketAddress JSEvents registerKeyEventCallback specialHTMLTargets maybeCStringToJsString findEventTarget findCanvasEventTarget getBoundingClientRect fillMouseEventData registerMouseEventCallback registerWheelEventCallback registerUiEventCallback registerFocusEventCallback fillDeviceOrientationEventData registerDeviceOrientationEventCallback fillDeviceMotionEventData registerDeviceMotionEventCallback screenOrientation fillOrientationChangeEventData registerOrientationChangeEventCallback fillFullscreenChangeEventData registerFullscreenChangeEventCallback JSEvents_requestFullscreen JSEvents_resizeCanvasForFullscreen registerRestoreOldStyle hideEverythingExceptGivenElement restoreHiddenElements setLetterbox currentFullscreenStrategy restoreOldWindowedStyle softFullscreenResizeWebGLRenderTarget doRequestFullscreen fillPointerlockChangeEventData registerPointerlockChangeEventCallback registerPointerlockErrorEventCallback requestPointerLock fillVisibilityChangeEventData registerVisibilityChangeEventCallback registerTouchEventCallback fillGamepadEventData registerGamepadEventCallback registerBeforeUnloadEventCallback fillBatteryEventData battery registerBatteryEventCallback setCanvasElementSize getCanvasElementSize demangle demangleAll jsStackTrace stackTrace ExitStatus getEnvStrings checkWasiClock doReadv doWritev dlopenMissingError createDyncallWrapper setImmediateWrapped clearImmediateWrapped polyfillSetImmediate uncaughtExceptionCount exceptionLast exceptionCaught ExceptionInfo exception_addRef exception_decRef Browser setMainLoop wget FS MEMFS TTY PIPEFS SOCKFS _setNetworkCallback tempFixedLengthArray miniTempWebGLFloatBuffers heapObjectForWebGLType heapAccessShiftForWebGLHeap GL emscriptenWebGLGet computeUnpackAlignedImageSize emscriptenWebGLGetTexPixelData emscriptenWebGLGetUniform webglGetUniformLocation webglPrepareUniformLocationsBeforeFirstUse webglGetLeftBracePos emscriptenWebGLGetVertexAttrib emscriptenWebGLGetBufferBinding emscriptenWebGLValidateMapBufferTarget writeGLArray AL SDL_unicode SDL_ttfContext SDL_audio SDL SDL_gfx GLUT EGL GLFW_Window GLFW GLEW IDBStore runAndAbortIfError emscriptenWebGLGetIndexed ALLOC_NORMAL ALLOC_STACK allocate Fetch fetchDeleteCachedData fetchLoadCachedData fetchCacheData fetchXHR".split(" ").forEach(function(a) {
  Object.getOwnPropertyDescriptor(h, a) || Object.defineProperty(h, a, {configurable:!0, get:function() {
    var b = "'" + a + "' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)";
    sa(a) && (b += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you");
    q(b);
  }});
});
"inetPton4 inetNtop4 inetPton6 inetNtop6 readSockaddr writeSockaddr getHostByName traverseStack convertPCtoSourceLocation readEmAsmArgs runEmAsmFunction runMainThreadEmAsm jstoi_s getExecutableName listenOnce autoResumeAudioContext dynCallLegacy getDynCaller dynCall runtimeKeepalivePush runtimeKeepalivePop callUserCallback maybeExit safeSetTimeout asmjsMangle writeI53ToI64Clamped writeI53ToI64Signaling writeI53ToU64Clamped writeI53ToU64Signaling convertI32PairToI53 convertU32PairToI53 getCFunc ccall cwrap uleb128Encode sigToWasmTypes generateFuncType convertJsFunctionToWasm getEmptyTableSlot updateTableMap addFunction removeFunction reallyNegative unSign strLen reSign formatString intArrayToString AsciiToString stringToAscii UTF16ToString stringToUTF16 lengthBytesUTF16 UTF32ToString stringToUTF32 lengthBytesUTF32 allocateUTF8 writeStringToMemory writeArrayToMemory writeAsciiToMemory getSocketFromFD getSocketAddress fillDeviceOrientationEventData registerDeviceOrientationEventCallback fillDeviceMotionEventData registerDeviceMotionEventCallback screenOrientation fillOrientationChangeEventData registerOrientationChangeEventCallback fillFullscreenChangeEventData registerFullscreenChangeEventCallback JSEvents_requestFullscreen JSEvents_resizeCanvasForFullscreen registerRestoreOldStyle hideEverythingExceptGivenElement restoreHiddenElements setLetterbox softFullscreenResizeWebGLRenderTarget doRequestFullscreen requestPointerLock fillVisibilityChangeEventData registerVisibilityChangeEventCallback fillGamepadEventData registerGamepadEventCallback registerBeforeUnloadEventCallback fillBatteryEventData battery registerBatteryEventCallback setCanvasElementSize getCanvasElementSize jsStackTrace stackTrace getEnvStrings checkWasiClock createDyncallWrapper setImmediateWrapped clearImmediateWrapped polyfillSetImmediate exception_addRef exception_decRef setMainLoop _setNetworkCallback emscriptenWebGLGetUniform emscriptenWebGLGetVertexAttrib emscriptenWebGLGetBufferBinding emscriptenWebGLValidateMapBufferTarget writeGLArray SDL_unicode SDL_ttfContext SDL_audio GLFW_Window runAndAbortIfError emscriptenWebGLGetIndexed ALLOC_NORMAL ALLOC_STACK allocate fetchDeleteCachedData fetchLoadCachedData fetchCacheData fetchXHR".split(" ").forEach(function(a) {
  "undefined" === typeof globalThis || Object.getOwnPropertyDescriptor(globalThis, a) || Object.defineProperty(globalThis, a, {configurable:!0, get:function() {
    var b = "`" + a + "` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line", c = a;
    c.startsWith("_") || (c = "$" + a);
    b += " (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE=" + c + ")";
    sa(a) && (b += ". Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you");
    ya(b);
  }});
});
var Dd;
Wa = function Ed() {
  Dd || Fd();
  Dd || (Wa = Ed);
};
function Gd(a) {
  assert(0 == E, 'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])');
  assert(0 == Pa.length, "cannot call main when preRun functions remain to be called");
  var b = h._main;
  a = a || [];
  a.unshift(da);
  var c = a.length, d = rd(4 * (c + 1)), e = d >> 2;
  a.forEach(g => {
    A[e++] = qd(g);
  });
  A[e] = 0;
  try {
    var f = b(c, d);
    md(f);
  } catch (g) {
    od(g);
  }
}
function Fd() {
  function a() {
    if (!Dd && (Dd = !0, h.calledRun = !0, !va)) {
      assert(!Ua);
      Ua = !0;
      Ma();
      if (!h.noFSInit && !bc) {
        assert(!bc, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
        bc = !0;
        ac();
        h.stdin = h.stdin;
        h.stdout = h.stdout;
        h.stderr = h.stderr;
        h.stdin ? ec("stdin", h.stdin) : Xb("/dev/tty", "/dev/stdin");
        h.stdout ? ec("stdout", null, h.stdout) : Xb("/dev/tty", "/dev/stdout");
        h.stderr ? ec("stderr", null, h.stderr) : Xb("/dev/tty1", "/dev/stderr");
        var c = Zb("/dev/stdin", 0), d = Zb("/dev/stdout", 1), e = Zb("/dev/stderr", 1);
        assert(0 === c.fd, "invalid handle for stdin (" + c.fd + ")");
        assert(1 === d.fd, "invalid handle for stdout (" + d.fd + ")");
        assert(2 === e.fd, "invalid handle for stderr (" + e.fd + ")");
      }
      Jb = !1;
      eb(Qa);
      Ma();
      eb(Ra);
      if (h.onRuntimeInitialized) {
        h.onRuntimeInitialized();
      }
      Hd && Gd(b);
      Ma();
      if (h.postRun) {
        for ("function" == typeof h.postRun && (h.postRun = [h.postRun]); h.postRun.length;) {
          c = h.postRun.shift(), Ta.unshift(c);
        }
      }
      eb(Ta);
    }
  }
  var b = b || ca;
  if (!(0 < E)) {
    Cd();
    Ka();
    if (h.preRun) {
      for ("function" == typeof h.preRun && (h.preRun = [h.preRun]); h.preRun.length;) {
        Va();
      }
    }
    eb(Pa);
    0 < E || (h.setStatus ? (h.setStatus("Running..."), setTimeout(function() {
      setTimeout(function() {
        h.setStatus("");
      }, 1);
      a();
    }, 1)) : a(), Ma());
  }
}
function nd() {
  var a = ra, b = n, c = !1;
  ra = n = () => {
    c = !0;
  };
  try {
    Bd(0), ["stdout", "stderr"].forEach(function(d) {
      d = "/dev/" + d;
      try {
        var e = K(d, {T:!0});
        d = e.path;
      } catch (g) {
      }
      var f = {Pa:!1, exists:!1, error:0, name:null, path:null, object:null, Xa:!1, Za:null, Ya:null};
      try {
        e = K(d, {parent:!0}), f.Xa = !0, f.Za = e.path, f.Ya = e.node, f.name = lb(d), e = K(d, {T:!0}), f.exists = !0, f.path = e.path, f.object = e.node, f.name = e.node.name, f.Pa = "/" === e.path;
      } catch (g) {
        f.error = g.D;
      }
      f && (e = ob[f.object.rdev]) && e.output && e.output.length && (c = !0);
    });
  } catch (d) {
  }
  ra = a;
  n = b;
  c && ya("stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the FAQ), or make sure to emit a newline when you printf etc.");
}
if (h.preInit) {
  for ("function" == typeof h.preInit && (h.preInit = [h.preInit]); 0 < h.preInit.length;) {
    h.preInit.pop()();
  }
}
var Hd = !0;
h.noInitialRun && (Hd = !1);
Fd();

