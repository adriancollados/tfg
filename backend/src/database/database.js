import sql from "mssql"
import config from "../config"

const dbSettings = ({
    user: config.dbUser,
    password:  config.dbPassword,
    server: config.dbserver, 
    database: config.dbDatabase, 
    options: {
        encrypt: true,
        trustServerCertificate: true,
    }
})

async function getConnection(){
    try{
        const pool = await sql.connect(dbSettings);
        console.log("Connection successfully established");
        return pool;
    }catch(e){
        console.error(e);
        return null;
    }
}

module.exports = { sql, getConnection };