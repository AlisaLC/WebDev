const { Client } = require('pg')
const { MongoClient } = require("mongodb");


module.exports.PostgresRequester = function(user, database, password, host='localhost', ssl=false) {
    return async (func)=>{
        const client = new Client({
            user,
            database,
            port: 5432,
            host,
            password,
            ssl
        })
        try {
            await client.connect()
            return await func(client)    
        } finally {
            await client.end()
        }
    }
}

// module.exports.MongoRequester = function(host) {
//     return async (func)=>{
//         const port = 27017
//         const uri = `${host}:${port}/SampleDB?retryWrites=true&writeConcern=majority`;
//         const client = new MongoClient(uri);
//         try {
//             await client.connect();
//             return await func(client)
//         } finally {
//             await client.close();
//         }
//     }
// }