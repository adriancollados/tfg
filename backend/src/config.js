import { config } from "dotenv"
config();


export default{
    port: process.env.PORT,
    dbUser: process.env.USER || '',
    dbPassword: process.env.PASSWORD || '',
    dbserver: process.env.SERVER || '',
    dbDatabase: process.env.DATABASE || '',
    ivKey: process.env.IVKey

}