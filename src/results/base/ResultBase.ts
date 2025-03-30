import type {IResultBase} from "./IResultBase";
import type {ResultType, ResultTypeName} from "./ResultType";

/**
 * Base result object class, any result object should extends this class.
 * @template {ResultTypeName} TType
 * @implements {IResultBase<ResultType[TType]>}
 */
export abstract class ResultBase<TType extends ResultTypeName> implements IResultBase<ResultType[TType]> {
    /**
     * Base result object class constructor.
     * @param {ResultType[TType]} type
     * @protected
     */
    protected constructor(
        /**
         * Result object's type.
         */
        public readonly type: ResultType[TType],
    ) {
    }
}
