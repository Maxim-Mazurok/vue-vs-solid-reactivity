const iterations = 100_000_000;

// Plain object
const plain = { value: 0 };
console.time("Plain write");
for (let i = 0; i < iterations; i++) {
  plain.value = i;
}
console.timeEnd("Plain write");

console.time("Plain read");
let dummy = 0;
for (let i = 0; i < iterations; i++) {
  dummy += plain.value;
}
console.timeEnd("Plain read");

// Proxy object
const proxy = new Proxy(
  { value: 0 },
  {
    get(target, key) {
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      return true;
    },
  }
);

console.time("Proxy write");
for (let i = 0; i < iterations; i++) {
  proxy.value = i;
}
console.timeEnd("Proxy write");

console.time("Proxy read");
dummy = 0;
for (let i = 0; i < iterations; i++) {
  dummy += proxy.value;
}
console.timeEnd("Proxy read");
