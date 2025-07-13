import assert from "node:assert";

// Minimal Solid-like reactivity system
function createSignal(initial) {
  let value = initial;
  const subscribers = new Set();

  const read = () => {
    if (activeEffect) subscribers.add(activeEffect);
    return value;
  };

  const write = (newVal) => {
    value = newVal;
    subscribers.forEach((fn) => fn());
  };

  return [read, write];
}

let activeEffect = null;
function effect(fn) {
  activeEffect = fn;
  fn();
  activeEffect = null;
}

// Benchmark
const [count, setCount] = createSignal(0);
let dummy = 0;
effect(() => {
  dummy = count() * 2;
});

console.time("Solid-like");
for (let i = 0; i <= 100_000_000; i++) {
  setCount(i);
}
console.timeEnd("Solid-like");

assert.strictEqual(dummy, 200_000_000); // To ensure the effect runs
