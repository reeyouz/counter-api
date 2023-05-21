import fs from 'fs';
import { DataTypeParser } from './data-type-parser';

export class CustomQueryBuilder extends DataTypeParser {

    private constructor(path_to_sql_file: string) {

        super(fs.readFileSync(path_to_sql_file, 'utf-8'));

    }

    public static build(path_to_sql_file: string) {

        return new CustomQueryBuilder(path_to_sql_file);

    }

}
