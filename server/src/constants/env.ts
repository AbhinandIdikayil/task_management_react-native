import { config } from "dotenv"
config();


export const ENV = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET as string,
    MONGO_URI: process.env.MONGO_URI as string,
    CLIENT: process.env.CLIENT as string
}