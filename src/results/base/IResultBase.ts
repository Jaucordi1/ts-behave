import type {ResultTypeValue} from "./ResultType";

/**
 * Represents the base of any result object.
 * @template {ResultTypeValue} TType Type of the result object.
 */
export interface IResultBase<TType extends ResultTypeValue> {
    /**
     * Type of result being held by this object.
     */
    readonly type: TType;
}
