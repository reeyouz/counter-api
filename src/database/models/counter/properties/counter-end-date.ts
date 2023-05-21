import { DateProperty, ErrorBuilder } from "database/shared";

export class CounterEndDate extends DateProperty {

    constructor(value: any) {
        super(value, 'end_date');
    }

    public validate() {
        
        const error_builder = new ErrorBuilder(this.property_name);

        if (this.is_nullish) {

            error_builder.property_is_required();

        }

        if (this.is_not_a_valid_date) {

            error_builder.property_is_not_a_valid_date();

        } else if (this.date_is_before(new Date())) {

            error_builder.property_cannot_have_a_past_value();

        }

        return error_builder;

    }

}