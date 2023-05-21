import { CounterModel } from "..";
import { Database } from "database/connection";
import { CounterQueryBuilder } from "../counter-query-builder";

export async function delete_counter_by_uuid(
    counter_uuid: string,
): AsyncDatabaseResponse<CounterModel> {

    try {
        
        const sql_query = CounterQueryBuilder.build_delete_by_uuid_query(
            counter_uuid,
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
            error: new Error('Expected 1 row to be deleted.'),
        };

    } catch (error: any) {
        
        return {
            is_error: true,
            error,
        };

    }

}