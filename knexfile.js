require('dotenv').config();
const { configConnection, config } = require('./src/configs/db.config')

console.log(process.env.SEEDS_DIR)

module.exports = {
    client: 'mysql2',
    connection: config,
    migrations: {
        tableName: process.env.MIGRATION_DB,
        directory: process.env.MIGRATIONS_DIR
    },
    seeds: {
        directory: process.env.SEEDS_DIR
    },
    pool: {
        min: Number(process.env.DB_POOL_MIN),
        max: Number(process.env.DB_POOL_MAX)
    },
    acquireConnectionTimeout: Number(process.env.DB_TIMEOUT)
}