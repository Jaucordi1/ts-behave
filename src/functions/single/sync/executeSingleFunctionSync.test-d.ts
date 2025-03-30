import {expectType} from 'tsd';
import type {IFailureResult, ISuccessResult} from "../../../results";
import {executeSingleFunctionSync} from "./executeSingleFunctionSync";

// ✅ Vérifie que la sortie a bien le bon type
function validSyncFunc(): "Hello" {
    return "Hello" as const;
}
expectType<ISuccessResult<"Hello"> | IFailureResult<Error>>(executeSingleFunctionSync(validSyncFunc));

async function validAsyncFunc(): Promise<"Hello"> {
    return "Hello" as const;
}
expectType<Promise<ISuccessResult<"Hello"> | IFailureResult<Error>>>(executeSingleFunctionSync(validAsyncFunc));
