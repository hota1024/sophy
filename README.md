# Sophy - `fs` module wrapper library

## Installation

```bash
yarn add sophy
# or
npm install sophy
```

## Simple usage

```typescript
import sophy from 'sophy'

;(async () => {
  // Write a new file at current working directory.
  await sophy.write('test.txt', 'Hello world')
})()
```

## Documentation

<https://sophy.now.sh/classes/_classes_sophy_sophy_.sophy.html>
