import { BaseProperty } from "./base-property";

export abstract class DateProperty extends BaseProperty {

    constructor(value: any, property_name: string) {
        super(value, property_name);
    }

    protected get is_not_a_valid_date() {

        return isNaN(new Date(this.value).getTime());

    }

    protected date_is_before(date: Date) {

        return new Date(this.value).getTime() < date.getTime();

    }

}
