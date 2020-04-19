---
path: '/blog/async-filter-array-typescript'
date: '2020-04-19'
title: 'How to asynchronously filter an array in TypeScript'
description: 'Use async/await in Array.prototype.filter!'
---

> This post expects basic knowledge of `map` and `filter` functions on `Array.prototype` in JavaScript/TypeScript.

I recently added a new feature to our codebase at work which changed a functions signature from synchronous to asynchronous.

```diff
- (input: string): boolean
+ (input: string): Promise<boolean>
```

This particular function was used as a callback in a lot of calls to `Array.prototype.filter`, meaning I had to come up with a helper function to easily refactor this across dozens of files.

### Helper Functions

```typescript
export function mapAsync<T1, T2>(
  array: T1[],
  callback: (value: T1, index: number, array: T1[]) => Promise<T2>,
): Promise<T2[]> {
  return Promise.all(array.map(callback));
}

export async function filterAsync<T>(
  array: T[],
  callback: (value: T, index: number, array: T[]) => Promise<boolean>,
): Promise<T[]> {
  const filterMap = await mapAsync(array, callback);
  return array.filter((_, index) => filterMap[index]);
}
```

### Usage

```typescript
// Your async function. In this example we just delay execution
// for a number of milliseconds before resolving.
function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const result = await filterAsync(array, async num => {
  await wait(1000);
  return num % 2 === 0;
});

// `result` is [ 0, 2, 4, 6, 8 ] after ~1000ms
```

That's a lot more readable when you consider the alternative is something like this.

```typescript
const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const filterMap = await Promise.all(
  array.map(async num => {
    await wait(1000);
    return num % 2 === 0;
  }),
);
const result = array.filter((_, index) => filterMap[index]);
```

Not only does it take more time to understand what's going on, it also adds the variable `filterMap` to your current scope. This could be circumvented by wrapping it in a code block, but that would add even more visual clutter.

Hope this helped! 🤓
