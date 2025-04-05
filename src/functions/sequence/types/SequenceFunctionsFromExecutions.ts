import type {ExtractFunctions} from "../../multiple";
import type {SequenceFunctionsFromResults} from "./SequenceFunctionsFromResults";
import type {SequenceFunctionsResults} from "./SequenceFunctionsResults";

export type SequenceFunctionsFromExecutions<
    T extends any[],
    TError,
> = SequenceFunctionsFromResults<
    SequenceFunctionsResults<
        ExtractFunctions<T>,
        TError
    >
>;
