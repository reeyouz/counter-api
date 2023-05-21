import { SQL_QUERY_TEMPLATE_CONSTS } from "./parse_sql";

const LOG_QUERY_TO_CONSOLE = process.env.LOG_QUERY_TO_CONSOLE
    ? process.env.LOG_QUERY_TO_CONSOLE === "true"
    : false;

export abstract class DataTypeParser {

    constructor(protected query: string) {}

    public replace_var_char(pattern: string, var_char: string) {

        this.query =  this.query.replace(
            pattern,
            `'${var_char}'`,
        );

        return this;

    }

    public replace_uuid(uuid: string) {

        this.query = this.query.replace(
            SQL_QUERY_TEMPLATE_CONSTS.__uuid__,
            `'${uuid}'`,
        );

        return this;

    }

    public replace_timestamp(pattern: string, timestamp: string) {

        this.query = this.query.replace(
            pattern,
            `'${timestamp}'::timestamp`,
        );

        return this;

    }

    public end(log_query_to_console: boolean = false) {

        if (log_query_to_console || LOG_QUERY_TO_CONSOLE) {

            console.log(this.query);

        }

        return this.query;

    }

}