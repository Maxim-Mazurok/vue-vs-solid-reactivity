#include <iostream>
#include <chrono>
#include <cassert>

constexpr int iterations = 100'000'000;

using EffectFn = void(*)();

EffectFn activeEffect = nullptr;

template <typename T>
class Signal {
public:
    Signal(T initial) : value(initial), subscriber(nullptr) {}

    inline T read() {
        if (activeEffect && subscriber != activeEffect) {
            subscriber = activeEffect;
        }
        return value;
    }

    inline void write(T newVal) {
        value = newVal;
        if (subscriber) subscriber();
    }

private:
    T value;
    EffectFn subscriber;
};

int dummy = 0;
Signal<int>* gCount = nullptr;

void computeEffect() {
    dummy = gCount->read() * 2;
}

int main() {
    Signal<int> count(0);
    gCount = &count;

    activeEffect = computeEffect;
    computeEffect();
    activeEffect = nullptr;

    auto start = std::chrono::high_resolution_clock::now();
    for (int i = 0; i <= iterations; ++i) {
        count.write(i);
    }
    auto end = std::chrono::high_resolution_clock::now();

    std::chrono::duration<double> diff = end - start;
    std::cout << "Solid-like (C++): " << diff.count() << "s\n";
    std::cout << "Final dummy: " << dummy << "\n";

    assert(dummy == iterations * 2);
    return 0;
}
