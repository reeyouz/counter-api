export class ErrorBuilder {

    private messages: string[] = [];

    public get errors() {
        
        return this.messages;

    }

    public get has_errors() {

        return this.messages.length > 0;

    }

    constructor(public property: string) {}

    public property_is_required() {

        this.messages.push(`Property '${this.property}' is required.`);

    }

    public property_should_be_of_type_string() {

        this.messages.push(`Property '${this.property}' should be of type 'string'.`);

    }

    public property_length_is_smaller_than(min_length: number) {

        this.messages.push(`Property '${this.property}' should have at least ${min_length} characters.`);

    }

    public property_length_is_greater_than(max_length: number) {

        this.messages.push(`Property '${this.property}' cannot have more than ${max_length} characters.`);

    }

    public property_pattern_does_not_match(regex: RegExp) {

        this.messages.push(`Property '${this.property}' should have value matching the regex ${regex}.`);

    }

    public property_is_not_a_valid_date() {

        this.messages.push(`Property '${this.property}' is not a valid ISO date.`);

    }

    public property_cannot_have_a_past_value() {

        this.messages.push(`Property '${this.property}' cannot have a past value.`);

    }

    public route_parameter_is_not_a_valid_uuid() {

        this.messages.push(`Router parameter is not a valid uuid.`);

    }

    public build(): IPropertyValidationError {

        return {
            property_name: this.property,
            errors: this.messages,
        };

    }

}
