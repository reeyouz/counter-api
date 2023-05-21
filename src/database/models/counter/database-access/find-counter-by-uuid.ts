import { CounterModel } from "..";
import { Database } from "database/connection";
import { CounterQueryBuilder } from "../counter-query-builder";

export async function find_counter_by_uuid(
    counter_uuid: string
): AsyncDatabaseResponse<CounterModel> {

    try {
        
        const sql_query = CounterQueryBuilder.build_find_by_uuid_query(
            counter_uuid,
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
            error: new Error('Expected 1 row. Got none'),
        };

    } catch (error: any) {
        
        return {
            is_error: true,
            error,
        };

    }

};
