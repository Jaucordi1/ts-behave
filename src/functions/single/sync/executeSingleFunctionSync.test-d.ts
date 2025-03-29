import {expectType, expectError} from 'tsd';
import type {SyncFunctionResult} from "../types";
import {executeSingleFunctionSync} from "./executeSingleFunctionSync";

// ✅ Vérifie que la sortie a bien le bon type
function validSyncFunc(): "Hello" {
    return "Hello" as const;
}
expectType<SyncFunctionResult<() => "Hello", Error>>(executeSingleFunctionSync(validSyncFunc));

// ❌ Vérifie que passer une fonction async est interdit
async function invalidAsyncFunc(): Promise<"Hello"> {
    await new Promise(resolve => setTimeout(resolve, 1));
    return "Hello" as const;
}
// @ts-expect-error - Wrong Assignment
expectError(executeSingleFunctionSync(invalidAsyncFunc));
