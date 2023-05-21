import { ErrorBuilder } from "../error-builder";

export abstract class BaseProperty {

    constructor(public value: any, public property_name: string) {}

    protected get is_nullish() {
        return (
            this.value === undefined ||
            this.value === null
        );
    }

    abstract validate(): ErrorBuilder | Promise<ErrorBuilder>;

}
