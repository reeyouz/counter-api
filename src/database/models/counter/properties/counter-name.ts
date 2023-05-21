import { ErrorBuilder, StringProperty } from "database/shared";

export class CounterName extends StringProperty {

    private static MIN_LENGTH = 5;
    private static MAX_LENGTH = 255;
    private static REGEX = /^[\w- ]+$/;

    constructor(value: any) {
        super(value, 'name');
    }

    public validate() {

        const error_builder = new ErrorBuilder(this.property_name);

        if (this.is_nullish) {

            error_builder.property_is_required();

        } else if (this.is_not_a_string) {

            error_builder.property_should_be_of_type_string();

        }

        if (error_builder.has_errors) {

            return error_builder;

        }

        if (this.is_smaller_than(CounterName.MIN_LENGTH)) {

            error_builder.property_length_is_smaller_than(CounterName.MIN_LENGTH);

        }

        if (this.is_greater_than(CounterName.MAX_LENGTH)) {

            error_builder.property_length_is_greater_than(CounterName.MAX_LENGTH);

        }

        if (this.does_not_match(CounterName.REGEX)) {

            error_builder.property_pattern_does_not_match(CounterName.REGEX);

        }

        return error_builder;

    }

}