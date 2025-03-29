# TypeScript Behave

## How to install
```shell
# Via npm
npm install --save ts-behave
```

## How to use
```typescript
import {Functions, Results} from "ts-behave";

// Throwing function to execute safely
function helloWorld() {
    if (Math.random() > .5) {
        throw new Error("Uncontrollable error throw");
    } else {
        return "Hello World!";
    }
}

// Safe execution
const result = Functions.executeSync(helloWorld);

// Execution's result assertion usage (throw in case of failure result)
Results.assertsSuccess(result);
console.info(result.data); // "Hello World!"

// Execution's result conditional usage
if (Results.isSuccess(result)) {
    console.info(result.data); // "Hello World!"
} else {
    console.error(result.error); // Error
}
```