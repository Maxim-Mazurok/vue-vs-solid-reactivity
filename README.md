# Vue VS Solid Reactivity

Comparing VueJS and SolidJS reactivity systems in NodeJS (for backend)

**Conclusion**: SolidJS approach is significantly faster (~30x) than VueJS approach, mostly due to the Proxy overhead in VueJS. However, VueJS offers a more user-friendly way to track deep changes in objects with less boilerplate. Also, C++ implementation of Solid-like reactivity system is just 1.5x faster than the original SolidJS package in NodeJS.

---

## Vue VS Solid

**Method**: many assignments to a value that is a dependency of another effect, using official Vue and Solid packages

**Results** (100 million iterations):

- Vue: 3.592s
- Solid: 132.212ms

**Conclusion**: Solid is ~30x faster than Vue

**To run**: `npm i && npm start`

## Vue approach VS Solid approach

**Method**: many assignments to a value that is a dependency of another effect, using self-implemented Vue-like and Solid-like reactivity systems

**Results** (100 million iterations):

- Vue-like: 4.639s
- Solid-like: 1.154s

**Conclusion**: Solid-like approach is ~4x faster than Vue-like approach.

**To run**: `npm i && npm run start-like`

## Proxy overhead VS direct access

**Method**: many read/write operations to a transparent Proxy object vs direct access to a value

**Results** (100 million iterations):

- Plain write: 54.883ms
- Plain read: 46.633ms
- Proxy write: 1.496s
- Proxy read: 1.792s

**Conclusion**: Proxy overhead is significant, for both read and write operations. Direct access is ~27x faster than Proxy write and ~38x faster than Proxy read, which explains the performance difference between Vue and Solid reactivity systems.

**To run**: `npm i && npm run start-proxy`

## Solid like reactivity system in C++

**Method**: many assignments to a value that is a dependency of another effect, using self-implemented Solid-like reactivity system in C++

**Results** (100 million iterations):

Solid-like (C++): 0.091244s

**Conclusion**: Solid-like approach in C++ is ~12x faster than Solid-like approach in JavaScript, and ~1.5x faster than the original SolidJS package in NodeJS.

**To run**:

1. `sudo apt install clang -y` (Ubuntu)
1. `bash solid-like.sh`

---

**Disclaimer**: Most of the code was written by ChatGPT 4o, under my supervision.
