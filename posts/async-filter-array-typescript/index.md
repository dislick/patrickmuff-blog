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
function mapAsync<T1, T2>(
  array: T1[],
  callback: (value: T1, index: number, array: T1[]) => Promise<T2>,
): Promise<T2[]> {
  return Promise.all(array.map(callback));
}

async function filterAsync<T>(
  array: T[],
  callback: (value: T, index: number, array: T[]) => Promise<boolean>,
): Promise<T[]> {
  const filterMap = await mapAsync(array, callback);
  return array.filter((_, index) => filterMap[index]);
}
```

### Usage

```typescript
async function getAge(personId: number) {
  const response = await fetch('/api/person/' + personId);
  return (await response.json()).age;
}

const people = [
  { id: 1, name: 'Emma' },
  { id: 2, name: 'Sophia' },
  { id: 3, name: 'Michael' },
];

const result = await filterAsync(people, async person => {
  return (await getAge(person.id)) >= 21;
});

// `result` now contains only people over the age of 21
```

That's a lot more readable when you consider the alternative is something like this:

```typescript
const people = [
  { id: 1, name: 'Emma' },
  { id: 2, name: 'Sophia' },
  { id: 3, name: 'Michael' },
];

const filterMap = await Promise.all(
  people.map(async person => {
    return (await getAge(person.id)) >= 21;
  }),
);
const result = people.filter((_, index) => filterMap[index]);
```

Not only does it take more time to understand what's going on, it also adds the variable `filterMap` to your current scope. This could be circumvented by wrapping it in a code block, but that would add even more visual clutter.

Hope this helped! 🤓
