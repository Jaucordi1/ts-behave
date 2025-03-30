import {expectType} from "tsd";
import type {AsyncFunctionResult} from "../types";
import {executeSingleFunctionAsync} from "./executeSingleFunctionAsync";

// ✅ Vérifie que la sortie a bien le bon type
async function validAsyncFunc(): Promise<"Hello"> {
    await new Promise(resolve => setTimeout(resolve, 1));
    return "Hello" as const;
}
expectType<Promise<AsyncFunctionResult<() => Promise<"Hello">, Error>>>(executeSingleFunctionAsync(validAsyncFunc));

// ❌ Vérifie que passer une fonction sync est interdit
function validSyncFunc(): "Hello" {
    return "Hello" as const;
}
expectType<Promise<AsyncFunctionResult<() => "Hello", Error>>>(executeSingleFunctionAsync(validSyncFunc));
