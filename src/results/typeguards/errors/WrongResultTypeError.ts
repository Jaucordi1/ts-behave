import type {IResult} from "../../IResult";

export class WrongResultTypeError<TResult extends IResult> extends Error {
    constructor(expectedType: IResult["type"], result: TResult) {
        super(
            `An execution expected a '${expectedType}' result object but faced a '${result.type}' one.`,
        );
    }
}
