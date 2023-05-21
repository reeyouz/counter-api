import { AppServer } from "./app";

const app_server = new AppServer();

app_server
    .start()
    .catch((error) => {

        console.error(
            `Error starting application.`,
            error,
        );

    });

process.on('SIGINT', async () => {

    app_server.stop()
        .catch((error) => {

            console.error(
                `Error stopping application.`,
                error,
            );

        })
        .finally(() => {

            process.exit(0);

        })

});