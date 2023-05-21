import express from 'express';
import { AddressInfo, Server } from 'net';
import { Database } from 'database/connection';

export class AppServer {

    private app = express();

    private server!: Server;

    private static DEFAULT_PORT = 0;

    private static PORT = AppServer.assign_port();

    constructor() {}

    public start = async () => {

        new Promise((resolve, reject) => {

            Database.connect()
                .then(() => {

                    this.server = this.app.listen(
                        AppServer.PORT,
                        () => {

                            console.log(
                                `Server is listening on PORT ${(this.server.address() as AddressInfo).port}`
                            );

                            resolve(this.app);

                        },
                    );

                })
                .catch((error) => {

                    reject(error);

                });

        });

    };

    public stop = async () => {

        return new Promise((resolve, reject) => {

            Database.disconnect()
                .then(() => {

                    if (this.server !== undefined) {

                        console.log(`Shutting down server`);

                        this.server.close();

                        resolve(true);

                    }

                });

        });

    };

    private static assign_port(): number {

        const { PORT } = process.env;

        if (PORT !== undefined && !isNaN(Number(PORT))) {

            return Number(PORT);

        }

        return AppServer.DEFAULT_PORT;

    };

}
