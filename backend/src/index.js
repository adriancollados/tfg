import app from "./app";
import "./database"
import fs from "fs";
import https from "https";
import path from "path";

// Obtener rutas absolutas para los certificados
const certPath = path.resolve(__dirname, '../local.crt');
const keyPath = path.resolve(__dirname, '../local.key');
// Cargar el certificado y la clave privada
const options = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
  };

/*https.createServer(options, app).listen(app.get('port'), () => {
    console.log(`Servidor HTTPS escuchando en el puerto ${app.get('port')} `);
  });*/


app.listen(app.get('port'));
console.log(`Servidor HTTP escuchando en el puerto ${app.get('port')} `);