const optionsSql = {
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        password: "",
        database: "coder_desafio_07"
    }
}

const optionsSqlite = {
    client: "sqlite3",
    connection: {
        filename: "./db/messages.sqlite"
    },
    useNullAsDefault: true
}

module.exports = {optionsSql, optionsSqlite}