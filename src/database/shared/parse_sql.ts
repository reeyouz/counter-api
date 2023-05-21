import fs from 'fs';
import path from 'path';

const FOLDER_NAME = 'sql';

export const SQL_QUERY_TEMPLATE = {
    INSERT: parse_sql('insert.sql'),
    FIND_BY_UUID: parse_sql('find_by_uuid.sql'),
    DELETE_BY_UUID: parse_sql('delete_by_uuid.sql'),
}

export type TSQL_QUERY_TEMPLATE = keyof typeof SQL_QUERY_TEMPLATE;

export const SQL_QUERY_TEMPLATE_CONSTS = {
    __uuid__           : '__uuid__',
    __table__          : '__table__',
    __schema__         : '__schema__',
    __values__         : '__values__',
    __insert_columns__ : '__insert_columns__',
    __return_columns__ : '__return_columns__',
    __select_columns__ : '__select_columns__',
};

function parse_sql(file_name: string) {

    return fs.readFileSync(
        path.resolve(
            __dirname,
            FOLDER_NAME,
            file_name,
        ),
        'utf-8'
    );

}