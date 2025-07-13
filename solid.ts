import { createEffect, createRoot, createSignal } from "solid-js";
import { iterations } from "./const";

let dummy = 0;

createRoot(() => {
  const [value, setValue] = createSignal(0);
  createEffect(() => {
    dummy = value() * 2;
  });

  console.time("Solid");
  for (let i = 0; i < iterations; i++) {
    setValue(i);
  }
  console.timeEnd("Solid");
});
