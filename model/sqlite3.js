const { sqlite3Conf } = require('../conf/dbConf');

const sqlite3 = require('knex')(sqlite3Conf);

// create auth table
(async () => {
    const exists = await sqlite3.schema.hasTable('auth');
    if (!exists) sqlite3.schema.createTable(
        'auth',
        table => {
            table.text('email').primary();
            table.text('password');
        }
    )
})();

const auth = sqlite3('auth');

module.exports = {
    sqlite3,
    auth
};