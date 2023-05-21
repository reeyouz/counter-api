import { CounterModel } from "..";
import { Database } from "database/connection";
import { CounterQueryBuilder } from "../counter-query-builder";

export async function save_counter(
    this: CounterModel
): AsyncDatabaseResponse<CounterModel> {

    try {

        const sql_query = CounterQueryBuilder.build_insert_query(
            this.name.value,
            this.end_date.value,
            '*',
        );

        const response = await Database.client.query(sql_query);

        if (response.rowCount === 1) {

            return {
                is_error: false,
                data: new CounterModel(response.rows[0]),
            }

        }

        return {
            is_error: true,
            error: new Error(
                `Expected 1 row to be returned. Got ${response.rowCount} rows.`,
            ),
        };

    } catch (error: any) {

        return {
            is_error: true,
            error,
        };

    }

};
