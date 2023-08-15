import { DataSource } from "typeorm"

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

export const AppDataSource = new DataSource({
    type: "mysql",
    host: DB_HOST,
    port: parseInt(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [
        __dirname + '/entity/*{.ts,.js}',
        __dirname + '/entity/viewEntity/*{.ts,.js}',
    ],
    migrations: ['src/migration/**/*.ts'],
    subscribers: [],
})
