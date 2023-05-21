import { exec } from "child_process";

/**
 * 
docker run --env POSTGRES_PASSWORD=password --expose 5432 --detach --name unit-testing-postgres-database postgres

docker stop unit-testing-postgres-database

docker rum unit-testing-postgres-database
 */

export async function check_if_docker_is_available() {

}

export async function spin_up_postgres_docker_image() {

    return new Promise((resolve, reject) => {

        exec(`docker`)

    });

}

export async function shut_down_and_clean_up_postgres_docker_container() {

}
