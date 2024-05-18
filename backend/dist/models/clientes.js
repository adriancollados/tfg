"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _bcrypt = require("bcrypt");
var _base64Js = require("base64-js");
var crypto = require('crypto');
var Cliente = /*#__PURE__*/(0, _createClass2["default"])(function Cliente(CODCLIENTE, CODCONTABLE, NOMBRECLIENTE, NOMBRECOMERCIAL, CIF, ALIAS, DIRECCION1, CODPOSTAL, POBLACION, PROVINCIA, PAIS, PERSONACONTACTO, TELEFONO1, TELEFONO2, FAX, FAXPEDIDOS, TELEX, E_MAIL, CODCLISUYO, NUMCUENTA, CODBANCO, NUMSUCURSAL, DIGCONTROLBANCO, CODPOSTALBANCO, CODSWIFT, NOMBREBANCO, DIRECCIONBANCO, POBLACIONBANCO, ENVIOPOR, ENVIODIRECION, ENVIOCODPOSTAL, ENVIOPOBLACION, ENVIOPROVINCIA, ENVIOPAIS, CANTPORTESPAG, TIPOPORTES, NUMDIASENTREGA, RIESGOCONCEDIDO, TIPO, RECARGO, ZONA, CODVENDEDOR, DIAPAGO1, DIAPAGO2, OBSERVACIONES, FACTURARSINIMPUESTOS, APDOCORREOS, DTOCOMERCIAL, FECHAMODIFICADO, REGIMFACT, CODMONEDA, DIRECCION2, COMPRADOREDI, RECEPTOREDI, CLIENTEEDI, PAGADOREDI, TIPODOC, NUMTARJETA, FECHANACIMIENTO, SEXO, NIF20, DESCATALOGADO, TRANSPORTE, MESVACACIONES, GRUPOIMPRESION, NUMCOPIASFACTURA, TIPOCLIENTE, CONDENTREGAEDI, CONDENTREGA, CODIDIOMA, SERIE, ALMACEN, LOCAL_REMOTA, EMPRESA, CODENTREGA, PROCEDENCIA, CODIGOPROCEDENCIA, IDSUCURSAL, CODVISIBLE, CODPAIS, FACTURARCONIMPUESTO, USUARIO, PASS, FOTOCLIENTE, CARGOSFIJOSA, TIPOTARJETA, TARCADUCIDAD, CVC, CODCONTABLEDMN, MOBIL, NOCALCULARCARGO1ARTIC, NOCALCULARCARGO2ARTIC, ESCLIENTEDELGRUPO, TIPORESERVA, CAMPOSLIBRESTOTALIZAR, CODIGOIBAN, SECUENCIAADEUDO, SUBNORMA, ORDENADEUDO, FECHAFIRMAORDENADEUDO, BLOQUEADO, TIPODOCIDENT, PERSONAJURIDICA, TIPORET, REGIMRET, MAXIMOVENTA_APLICAR, MAXIMOVENTA_IMPORTE, MAXIMOVENTA_CODMONEDA, TIPOOPERACION, PASSWORDCOMMERCE, TIPOUSUARIO) {
  (0, _classCallCheck2["default"])(this, Cliente);
  this.CODCLIENTE = CODCLIENTE;
  this.CODCONTABLE = CODCONTABLE;
  this.NOMBRECLIENTE = NOMBRECLIENTE;
  this.NOMBRECOMERCIAL = NOMBRECOMERCIAL;
  this.CIF = CIF;
  this.ALIAS = ALIAS;
  this.DIRECCION1 = DIRECCION1;
  this.CODPOSTAL = CODPOSTAL;
  this.POBLACION = POBLACION;
  this.PROVINCIA = PROVINCIA;
  this.PAIS = PAIS;
  this.PERSONACONTACTO = PERSONACONTACTO;
  this.TELEFONO1 = TELEFONO1;
  this.TELEFONO2 = TELEFONO2;
  this.FAX = FAX;
  this.FAXPEDIDOS = FAXPEDIDOS;
  this.TELEX = TELEX;
  this.E_MAIL = E_MAIL;
  this.CODCLISUYO = CODCLISUYO;
  this.NUMCUENTA = NUMCUENTA;
  this.CODBANCO = CODBANCO;
  this.NUMSUCURSAL = NUMSUCURSAL;
  this.DIGCONTROLBANCO = DIGCONTROLBANCO;
  this.CODPOSTALBANCO = CODPOSTALBANCO;
  this.CODSWIFT = CODSWIFT;
  this.NOMBREBANCO = NOMBREBANCO;
  this.DIRECCIONBANCO = DIRECCIONBANCO;
  this.POBLACIONBANCO = POBLACIONBANCO;
  this.ENVIOPOR = ENVIOPOR;
  this.ENVIODIRECION = ENVIODIRECION;
  this.ENVIOCODPOSTAL = ENVIOCODPOSTAL;
  this.ENVIOPOBLACION = ENVIOPOBLACION;
  this.ENVIOPROVINCIA = ENVIOPROVINCIA;
  this.ENVIOPAIS = ENVIOPAIS;
  this.CANTPORTESPAG = CANTPORTESPAG;
  this.TIPOPORTES = TIPOPORTES;
  this.NUMDIASENTREGA = NUMDIASENTREGA;
  this.RIESGOCONCEDIDO = RIESGOCONCEDIDO;
  this.TIPO = TIPO;
  this.RECARGO = RECARGO;
  this.ZONA = ZONA;
  this.CODVENDEDOR = CODVENDEDOR;
  this.DIAPAGO1 = DIAPAGO1;
  this.DIAPAGO2 = DIAPAGO2;
  this.OBSERVACIONES = OBSERVACIONES;
  this.FACTURARSINIMPUESTOS = FACTURARSINIMPUESTOS;
  this.APDOCORREOS = APDOCORREOS;
  this.DTOCOMERCIAL = DTOCOMERCIAL;
  this.FECHAMODIFICADO = FECHAMODIFICADO;
  this.REGIMFACT = REGIMFACT;
  this.CODMONEDA = CODMONEDA;
  this.DIRECCION2 = DIRECCION2;
  this.COMPRADOREDI = COMPRADOREDI;
  this.RECEPTOREDI = RECEPTOREDI;
  this.CLIENTEEDI = CLIENTEEDI;
  this.PAGADOREDI = PAGADOREDI;
  this.TIPODOC = TIPODOC;
  this.NUMTARJETA = NUMTARJETA;
  this.FECHANACIMIENTO = FECHANACIMIENTO;
  this.SEXO = SEXO;
  this.NIF20 = NIF20;
  this.DESCATALOGADO = DESCATALOGADO;
  this.TRANSPORTE = TRANSPORTE;
  this.MESVACACIONES = MESVACACIONES;
  this.GRUPOIMPRESION = GRUPOIMPRESION;
  this.NUMCOPIASFACTURA = NUMCOPIASFACTURA;
  this.TIPOCLIENTE = TIPOCLIENTE;
  this.CONDENTREGAEDI = CONDENTREGAEDI;
  this.CONDENTREGA = CONDENTREGA;
  this.CODIDIOMA = CODIDIOMA;
  this.SERIE = SERIE;
  this.ALMACEN = ALMACEN;
  this.LOCAL_REMOTA = LOCAL_REMOTA;
  this.EMPRESA = EMPRESA;
  this.CODENTREGA = CODENTREGA;
  this.PROCEDENCIA = PROCEDENCIA;
  this.CODIGOPROCEDENCIA = CODIGOPROCEDENCIA;
  this.IDSUCURSAL = IDSUCURSAL;
  this.CODVISIBLE = CODVISIBLE;
  this.CODPAIS = CODPAIS;
  this.FACTURARCONIMPUESTO = FACTURARCONIMPUESTO;
  this.USUARIO = USUARIO;
  this.PASS = PASS;
  this.FOTOCLIENTE = FOTOCLIENTE;
  this.CARGOSFIJOSA = CARGOSFIJOSA;
  this.TIPOTARJETA = TIPOTARJETA;
  this.TARCADUCIDAD = TARCADUCIDAD;
  this.CVC = CVC;
  this.CODCONTABLEDMN = CODCONTABLEDMN;
  this.MOBIL = MOBIL;
  this.NOCALCULARCARGO1ARTIC = NOCALCULARCARGO1ARTIC;
  this.NOCALCULARCARGO2ARTIC = NOCALCULARCARGO2ARTIC;
  this.ESCLIENTEDELGRUPO = ESCLIENTEDELGRUPO;
  this.TIPORESERVA = TIPORESERVA;
  this.CAMPOSLIBRESTOTALIZAR = CAMPOSLIBRESTOTALIZAR;
  this.CODIGOIBAN = CODIGOIBAN;
  this.SECUENCIAADEUDO = SECUENCIAADEUDO;
  this.SUBNORMA = SUBNORMA;
  this.ORDENADEUDO = ORDENADEUDO;
  this.FECHAFIRMAORDENADEUDO = FECHAFIRMAORDENADEUDO;
  this.BLOQUEADO = BLOQUEADO;
  this.TIPODOCIDENT = TIPODOCIDENT;
  this.PERSONAJURIDICA = PERSONAJURIDICA;
  this.TIPORET = TIPORET;
  this.REGIMRET = REGIMRET;
  this.MAXIMOVENTA_APLICAR = MAXIMOVENTA_APLICAR;
  this.MAXIMOVENTA_IMPORTE = MAXIMOVENTA_IMPORTE;
  this.MAXIMOVENTA_CODMONEDA = MAXIMOVENTA_CODMONEDA;
  this.TIPOOPERACION = TIPOOPERACION;
  this.PASSWORDCOMMERCE = PASSWORDCOMMERCE;
  this.TIPOUSUARIO = TIPOUSUARIO;
});
Cliente.isValidPassword = function (password, pass) {
  return (0, _bcrypt.compare)(password, pass);
};
Cliente.genCreditCardHash = function (creditCard) {
  var salt = process.env.CC_SALT || "$2b$10$Qcdj3xcmao1tBJKVUFVwju";
  return (0, _bcrypt.hashSync)(creditCard.toString(), salt);
};
Cliente.maskCardNumber = function (cardNumber) {
  var maskedStart = cardNumber.slice(0, 6); // Obtiene los primeros 6 dígitos de la tarjeta
  var maskedEnd = cardNumber.slice(-4); // Obtiene los últimos 4 dígitos de la tarjeta
  var maskLength = cardNumber.length - maskedStart.length - maskedEnd.length; // Calcula la longitud de la máscara
  var mask = '*'.repeat(maskLength); // Crea una cadena de asteriscos con la longitud de la máscara
  var maskedCard = "".concat(maskedStart).concat(mask).concat(maskedEnd); // Combina las partes enmascaradas y no enmascaradas de la tarjeta
  console.log("Mask: " + maskedCard);
  return maskedCard;
};
Cliente.encrypt = function (cadena, key) {
  var algorithm = 'aes-256-cbc'; // Algoritmo de cifrado AES-256-CBC
  var keyHash = crypto.createHash('sha256').update(key, 'utf8').digest('base64').substr(0, 32); // Hash de la clave
  var iv = crypto.randomBytes(16); // Vector de inicialización aleatorio
  var cipher = crypto.createCipheriv(algorithm, keyHash, iv); // Cifrador AES
  var encrypted = cipher.update(cadena, 'utf8', 'base64'); // Cifra el número de tarjeta
  encrypted += cipher["final"]('base64'); // Finaliza el cifrado
  var encryptedCadena = "".concat(iv.toString('hex'), ":").concat(encrypted); // Concatena el vector de inicialización y el número de tarjeta cifrado
  return encryptedCadena;
};
Cliente.decrypt = function (cadena, key) {
  var algorithm = 'aes-256-cbc'; // Algoritmo de cifrado AES-256-CBC
  var keyHash = crypto.createHash('sha256').update(key, 'utf8').digest('base64').substr(0, 32); // Hash de la clave
  var _cadena$split = cadena.split(':'),
    _cadena$split2 = (0, _slicedToArray2["default"])(_cadena$split, 2),
    ivHex = _cadena$split2[0],
    encrypted = _cadena$split2[1]; // Separa el vector de inicialización y el número de tarjeta cifrado
  var iv = Buffer.from(ivHex, 'hex'); // Convierte el vector de inicialización a buffer
  var decipher = crypto.createDecipheriv(algorithm, keyHash, iv); // Descifrador AES
  var decrypted = decipher.update(encrypted, 'base64', 'utf8'); // Descifra el número de tarjeta
  decrypted += decipher["final"]('utf8'); // Finaliza el descifrado
  return decrypted;
};
function isBase64(str) {
  if (typeof str !== 'string') {
    return false;
  }
  var base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
  return base64Regex.test(str);
}
Cliente.decodeBase64Credentials = function (credentials) {
  console.log('decoding base64 credentials');
  if (!isBase64(credentials)) {
    console.log('Invalid credentials format');
  } else {
    try {
      var decodedCredentials = atob(credentials);
      console.log(decodedCredentials);
      // Convertir la cadena decodificada a un objeto JavaScript
      var credentialsObject = JSON.parse(decodedCredentials);
      console.log(credentialsObject);
      // Extraer valores del objeto
      var email = credentialsObject.email;
      var pass = credentialsObject.pass;
      return [email, pass];
    } catch (error) {
      console.error('Error decoding base64 credentials:', error);
      return null;
    }
  }
};
module.exports = Cliente;