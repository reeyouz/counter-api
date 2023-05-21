import { CounterEndDate, CounterName } from "./properties";
import {
    save_counter,
    find_counter_by_uuid,
    delete_counter_by_uuid,
} from "./database-access";

export class CounterModel {

    public name: CounterName;
    public end_date: CounterEndDate;

    constructor(obj: any) {

        this.name = new CounterName(obj.name);
        this.end_date = new CounterEndDate(obj.end_date);

    }

    public validate() {

        let errors: IPropertyValidationError[] = [];

        const name_error_builder = this.name.validate();

        if (name_error_builder.has_errors) {
            
            errors.push(name_error_builder.build());

        }

        const end_date_error_builder = this.end_date.validate();

        if (end_date_error_builder.has_errors) {

            errors.push(end_date_error_builder.build());

        }

        return errors;

    }

    public save = save_counter.bind(this);

    public static find_by_uuid = find_counter_by_uuid;

    public static delete_by_uuid = delete_counter_by_uuid;

};
