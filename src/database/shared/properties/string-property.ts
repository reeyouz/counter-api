import isUUID from "validator/lib/isUUID";
import { BaseProperty } from "./base-property";

export abstract class StringProperty extends BaseProperty {

    constructor(value: any, property_name: string) {
        super(value, property_name);
    }

    protected get is_not_a_string() {
        return typeof this.value !== 'string';
    }

    protected is_smaller_than(length: number) {

        return this.value?.length < length;

    }

    protected is_greater_than(length: number) {

        return this.value?.length > length;

    }

    protected does_not_match(regex: RegExp) {

        return !regex.test(this.value);

    }

    protected get is_not_a_valid_uuid() {

        return !isUUID(this.value, '4');

    }

}
