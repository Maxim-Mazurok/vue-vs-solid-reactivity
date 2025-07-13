import { effect, ref } from "@vue/reactivity";
import { iterations } from "./const";

const value = ref(0);
let dummy = 0;

effect(() => {
  dummy = value.value * 2;
});

console.time("Vue");
for (let i = 0; i < iterations; i++) {
  value.value = i;
}
console.timeEnd("Vue");
