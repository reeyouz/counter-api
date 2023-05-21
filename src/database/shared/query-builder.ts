import { DataTypeParser } from "./data-type-parser";
import {
    SQL_QUERY_TEMPLATE,
    TSQL_QUERY_TEMPLATE,
    SQL_QUERY_TEMPLATE_CONSTS,
} from "./parse_sql";

export abstract class BaseQueryBuilder extends DataTypeParser {

    constructor(
        schema: string,
        table: string,
        sql_query_template_key: TSQL_QUERY_TEMPLATE,
    ) {

        super(SQL_QUERY_TEMPLATE[sql_query_template_key]);

        this.replace_schema_and_table(schema, table);

    }

    private replace_schema_and_table(schema: string, table: string) {

        this.query = this.query
            .replace(SQL_QUERY_TEMPLATE_CONSTS.__schema__, schema)
            .replace(SQL_QUERY_TEMPLATE_CONSTS.__table__, table);

    }

    protected replace_select_columns(columns: string | [string, ...Array<string>] = '*') {

        const select_columns = Array.isArray(columns)
            ? [...new Set(columns)].join(', ')
            : columns;

        this.query = this.query.replace(
            SQL_QUERY_TEMPLATE_CONSTS.__select_columns__,
            select_columns,
        );

        return this;

    }

    protected replace_insert_columns(...columns: [string, ...Array<string>]) {

        const column_set = new Set(columns);

        const unique_columns = [...column_set];

        this.query = this.query
            .replace(
                SQL_QUERY_TEMPLATE_CONSTS.__insert_columns__,
                unique_columns.join(', '),
            )
            .replace(
                SQL_QUERY_TEMPLATE_CONSTS.__values__,
                unique_columns
                    .map((col) => `$${col}`)
                    .join(', '),
            );

        return this;

    }

    protected replace_return_columns(columns: string | [string, ...Array<string>] = '*') {

        const return_columns = Array.isArray(columns)
            ? [...new Set(columns)].join(', ')
            : columns;

        this.query = this.query.replace(
            SQL_QUERY_TEMPLATE_CONSTS.__return_columns__,
            return_columns,
        );

        return this;

    }

}


