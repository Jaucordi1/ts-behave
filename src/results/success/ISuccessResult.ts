/**
 * Represents the '**success**' result of an execution.
 * @template {any} TOutput The execution's '**success**' output data.
 */
export interface ISuccessResult<TOutput extends any> {
    /**
     * The type of result, '**success**' in this case.
     */
    type: "success";
    /**
     * The execution's '**success**' output data.
     */
    data: TOutput;
}
