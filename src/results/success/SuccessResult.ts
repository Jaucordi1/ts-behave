import type {ISuccessResult} from "./ISuccessResult";

/**
 * '**Success**' result object of an execution.
 * @template {any} TOutput The execution's '**success**' output data.
 * @implements {ISuccessResult<TOutput>} Constrained to the {@link ISuccessResult|'**success**' result object interface}.
 */
export class SuccessResult<TOutput> implements ISuccessResult<TOutput> {
    /**
     * The execution's '**success**' output data.
     */
    public readonly data: TOutput;

    /**
     * Type of result, '**success**' in this case.
     */
    public readonly type: "success" = "success";

    /**
     * Construct a new '**success**' result object, passing the execution's output data.
     * @param {TOutput} data The execution's '**success**' output data.
     */
    constructor(data: TOutput) {
        this.data = data;
    }
}
