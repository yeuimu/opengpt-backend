const sqlite3Conf = {
    client: 'sqlite3',
    connection: {
        filename: 'db/opengpt.db'
    },
    useNullAsDefault: true
}

const mongodbConf = {
    url: 'mongodb://localhost:27017',
    dbName: 'opengpt'
}

const redisConf = {
    url: 'redis://localhost:6379'
}

module.exports = {
    sqlite3Conf,
    mongodbConf,
    redisConf
}