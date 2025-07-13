import assert from "node:assert";

// Minimal Vue-like reactivity system
function reactive(obj) {
  const deps = new Map();

  const getDep = (key) => {
    if (!deps.has(key)) deps.set(key, new Set());
    return deps.get(key);
  };

  const handler = {
    get(target, key) {
      if (activeEffect) {
        getDep(key).add(activeEffect);
      }
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      getDep(key).forEach((fn) => fn());
      return true;
    },
  };

  return new Proxy(obj, handler);
}

let activeEffect = null;
function effect(fn) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}

// Benchmark
const state = reactive({ count: 0 });
let dummy = 0;
effect(() => {
  dummy = state.count * 2;
});

console.time("Vue-like");
for (let i = 0; i <= 100_000_000; i++) {
  state.count = i;
}
console.timeEnd("Vue-like");

assert.strictEqual(dummy, 200_000_000); // To ensure the effect runs
