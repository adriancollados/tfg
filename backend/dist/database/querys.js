"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queries = void 0;
var queries = {
  //articulos
  getAllProducts: 'SELECT A.CODARTICULO,a.DESCRIPCION,a.UNIDADMEDIDA,a.CODDEPARTAMENTO,a.DEP_PADRE, P.PVPNETO FROM ARTICULOS A INNER JOIN (SELECT CODARTICULO, PVPNETO FROM (SELECT CODARTICULO, PVPNETO, ROW_NUMBER() OVER (PARTITION BY CODARTICULO ORDER BY FECHAMODIFICACION DESC) AS rn FROM PRECIOARTICULO ) AS ranked WHERE rn = 1) P ON A.CODARTICULO = P.CODARTICULO;',
  //getAllProducts: 'SELECT TOP 4 A.CODARTICULO,a.DESCRIPCION,a.UNIDADMEDIDA,a.CODDEPARTAMENTO,a.DEP_PADRE,IMAGEN, P.PVPNETO FROM ARTICULOS A INNER JOIN (SELECT CODARTICULO, PVPNETO FROM (SELECT CODARTICULO, PVPNETO, ROW_NUMBER() OVER (PARTITION BY CODARTICULO ORDER BY FECHAMODIFICACION DESC) AS rn FROM PRECIOARTICULO ) AS ranked WHERE rn = 1) P ON A.CODARTICULO = P.CODARTICULO where imagen is not null',
  getArticuloId: 'select * from ARTICULOS with(nolock) where codarticulo = @id',
  getStockArticuloID: 'select stock from STOCKS with(nolock) where codarticulo = @id',
  getArticulosFromSeccion: 'select articulos.CODARTICULO, articulos.DESCRIPCION, articulos.UNIDADMEDIDA, articulos.CODDEPARTAMENTO, articulos.DEP_PADRE, ARTICULOS.IMAGEN from ARTICULOS with(nolock) inner join stocks with(nolock) on STOCK > 0 and STOCKS.CODARTICULO = articulos.CODARTICULO where articulos.CODDEPARTAMENTO = @id',
  //getArticulosFromCategoria: ' select distinct(articulos.CODARTICULO), articulos.DESCRIPCION, articulos.UNIDADMEDIDA, articulos.DPTO, articulos.VERSION, articulos.seccion  from SUPERAMANO1..articulos with(nolock) inner join stocks with(nolock) on CODALMACEN = \'A3\' and STOCK > 0 where articulos.VISIBLEWEB = \'T\' and articulos.DPTO = @id',
  //getArticulosFromSeccionCategoria: 'SELECT DISTINCT articulos.CODARTICULO, articulos.DESCRIPCION, articulos.UNIDADMEDIDA, articulos.DPTO, articulos.VERSION, SECCIONES.DESCRIPCION FROM SUPERAMANO1..articulos WITH (NOLOCK) INNER JOIN secciones WITH (NOLOCK) ON secciones.NUMSECCION = ARTICULOS.SECCION AND articulos.dpto = secciones.NUMDPTO INNER JOIN stocks WITH (NOLOCK) ON CODALMACEN = \'A3\' AND STOCK > 0 WHERE articulos.VISIBLEWEB = \'T\' AND articulos.seccion = @seccionId AND articulos.DPTO = @categoriaId ORDER BY articulos.CODARTICULO OFFSET @startIndex ROWS FETCH NEXT @pageSize ROWS ONLY;'	, 

  //clientes
  getAllClientes: 'select CODCLIENTE, NOMBRECLIENTE, CIF, DIRECCION, CODPOSTAL, POBLACION, PROVINCIA, TELEFONO, EMAIL from CLIENTES with(nolock)',
  getClienteId: 'select CODCLIENTE, NOMBRECLIENTE, CIF, DIRECCION, CODPOSTAL, POBLACION, PROVINCIA, TELEFONO, EMAIL, PUNTOSCLIENTE from CLIENTES with(nolock) where codcliente = @id',
  spClientes: 'PR_CLIENTES_INSERT',
  addCliente: 'insert into clientes(CODCLIENTE, NOMBRECLIENTE, CIF, DIRECCION, CODPOSTAL, POBLACION, PROVINCIA, TELEFONO, EMAIL, PASS, FECHAALTA) values(@CODCLIENTE, @NOMBRECLIENTE, @CIF, @DIRECCION1, @CODPOSTAL, @POBLACION, @PROVINCIA, @TELEFONO, @EMAIL, @PASS, GETUTCDATE())',
  getLastIdCLiente: 'select top 1 CODCLIENTE from clientes order by 1 desc',
  getClienteLogin: 'select codcliente, nombrecliente, pass, fechabaja from clientes where EMAIL = @EMAIL',
  updateCliente: 'ActualizarCliente',
  //'UPDATE CLIENTES WITH(UPDLOCK) SET NOMBRECLIENTE = @NOMBRECLIENTE, DIRECCION = @DIRECCION, TELEFONO = @TELEFONO WHERE CODCLIENTE = @CODCLIENTE',
  getPedidosCliente: 'SELECT CODPEDIDO, FECHAPEDIDO, PVPTOTAL, STATUS_PEDIDO FROM PEDIDOS WITH(NOLOCK) WHERE CODCLIENTE = @CODCLIENTE',
  getPedidoDetails: 'SELECT DESCRIPCION, CANTIDAD, PVP, COMENTARIO FROM LINPED WITH(NOLOCK) WHERE CODPEDIDO = @CODPEDIDO',
  getPostalCodes: 'SELECT * FROM LOCALIDADES WITH(NOLOCK)',
  sp_GetArticulosFav: 'OBTENER_ARTICULOS_FAVS',
  sp_InserArticulosFavs: 'AÑADIR_ARTICULOS_FAVS',
  sp_makePayment: 'RealizarPedido',
  sp_insertLinpeds: 'InsertLinped',
  //Despartamentos(categorias)
  getSeccionesFromCategoriaID: 'select CODDEPARTAMENTO, DESCRIPCION from DEPARTAMENTO with(nolock) where DEP_PADRE = @id',
  getAllCategorias: 'select CODDEPARTAMENTO, DESCRIPCION, DEP_PADRE from DEPARTAMENTO with(nolock)',
  updatePedidoKO: 'update PEDIDOS with(updlock) set STATUS_PEDIDO = -1 where CODPEDIDO = @id',
  updatePedidoOK: 'update PEDIDOS with(updlock) set STATUS_PEDIDO = 1 where CODPEDIDO = @id',
  listaSeccionesConCategoria: '1, 2, 6, 8, 9, 10, 11, 20, 21, 22, 23, 24, 25, 26, 27, 28'
};
exports.queries = queries;