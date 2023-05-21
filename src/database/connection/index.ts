import { Client } from 'pg';

export class Database {

    private static _client: Client | undefined = undefined;

    private static retry_count = 0;

    private static RETRY_INTERVAL_IN_MILLISECONDS = 2000;

    private static MAX_RETRY_COUNT = 10;

    public static get client(): Client {

        return Database._client!;

    }

    private constructor() {}

    public static async connect(
        database_url: string = process.env.DATABASE_URL!
    ) {

        try {

            Database._client = new Client(database_url);

            Database._client.on('error', Database.on_client_error);

            await Database._client.connect();

            Database.reset_retry_count();

            console.log(`Connected to database`);

        } catch (error: any) {
            
            await Database.on_client_error(error);

            throw error;

        }

    }

    public static async disconnect() {

        await this.safe_end_client();

        console.log('Disconnected from database.');

        Database.reset_retry_count();

    }

    private static async on_client_error(error: Error) {

        if (error) {

            console.error(
                `Postgres database connection error-ed.`,
                error.message,
                `Retrying in ${Database.RETRY_INTERVAL_IN_MILLISECONDS / 1000} seconds.`,
                stack_trace_only(error),
            );

            await this.safe_end_client();

            if (Database.retry_count >= Database.MAX_RETRY_COUNT) {

                throw error;

            }

            Database.retry_count += 1;

            setTimeout(Database.connect, Database.RETRY_INTERVAL_IN_MILLISECONDS);

        }

    }

    private static async safe_end_client() {

        if (Database._client !== undefined) {

            await Database._client.end().catch((error) => {

                console.error(
                    `Error ending database client connection.`,
                    error.message,
                    stack_trace_only(error),
                );

            });

        }

    }

    private static reset_retry_count() {

        Database.retry_count = 0;

    }

}

function stack_trace_only(error: Error) {

    if (error.stack && typeof error.stack === 'string') {

        return error.stack.slice(
            error.stack.indexOf('\n') + 1,
        );

    }

    return '';

}
