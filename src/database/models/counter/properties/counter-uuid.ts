import { ErrorBuilder, StringProperty } from "database/shared";

export class CounterUUID extends StringProperty {

    constructor(value: any) {
        
        super(value, 'counter_uuid');

    }

    validate() {
        
        const error_builder = new ErrorBuilder(this.property_name);

        if (this.is_not_a_valid_uuid) {

            error_builder.route_parameter_is_not_a_valid_uuid();

        }

        return error_builder;
        
    }

}
