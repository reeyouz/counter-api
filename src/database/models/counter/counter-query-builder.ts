import { BaseQueryBuilder, TSQL_QUERY_TEMPLATE } from "database/shared";

export class CounterQueryBuilder extends BaseQueryBuilder {

    private constructor(sql_query_template: TSQL_QUERY_TEMPLATE) {

        super('public', 'counter', sql_query_template);

    }

    public static build_insert_query(
        name: string, 
        end_date: string,
        returning_columns: string | [string, ...Array<string>],
    ) {

        return new CounterQueryBuilder("INSERT")
            .replace_insert_columns('name', 'end_date')
            .replace_var_char('$name', name)
            .replace_timestamp('$end_date', end_date)
            .replace_return_columns(returning_columns)
            .end();

    }

    public static build_find_by_uuid_query(
        counter_uuid: string,
    ) {

        return new CounterQueryBuilder("FIND_BY_UUID")
            .replace_select_columns(['name', 'end_date'])
            .replace_uuid(counter_uuid)
            .end();

    }

    public static build_delete_by_uuid_query(
        counter_uuid: string,
        returning_columns: string | [string, ...Array<string>],
    ) {

        return new CounterQueryBuilder("DELETE_BY_UUID")
            .replace_uuid(counter_uuid)
            .replace_return_columns(returning_columns)
            .end();

    }

}