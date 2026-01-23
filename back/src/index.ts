import app from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import {AppDataSource} from "./config/data-source";

AppDataSource.initialize()
    .then(() => {
        console.log("BD conectada correctamente");
        app.listen(PORT,()=>{
            console.log(`estamos escuchando en PORT ${PORT}`)
            
        });
    }).catch((err) => {
        console.error("Error during Data Source initialization", err);
    });
    
