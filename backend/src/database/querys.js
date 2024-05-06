export const queries = {
	//articulos
    getAllProducts: 'select * from ARTICULOS with(nolock)',
    getArticuloId: 'select * from ARTICULOS with(nolock) where codarticulo = @id',
	getStockArticuloID: 'select stock from STOCKS with(nolock) where codarticulo = @id' ,
	getArticulosFromSeccion: 'select articulos.CODARTICULO, articulos.DESCRIPCION, articulos.UNIDADMEDIDA, articulos.CODDEPARTAMENTO, articulos.DEP_PADRE, ARTICULOS.IMAGEN from ARTICULOS with(nolock) inner join stocks with(nolock) on STOCK > 0 and STOCKS.CODARTICULO = articulos.CODARTICULO where articulos.CODDEPARTAMENTO = @id',
	//getArticulosFromCategoria: ' select distinct(articulos.CODARTICULO), articulos.DESCRIPCION, articulos.UNIDADMEDIDA, articulos.DPTO, articulos.VERSION, articulos.seccion  from SUPERAMANO1..articulos with(nolock) inner join stocks with(nolock) on CODALMACEN = \'A3\' and STOCK > 0 where articulos.VISIBLEWEB = \'T\' and articulos.DPTO = @id',
	//getArticulosFromSeccionCategoria: 'SELECT DISTINCT articulos.CODARTICULO, articulos.DESCRIPCION, articulos.UNIDADMEDIDA, articulos.DPTO, articulos.VERSION, SECCIONES.DESCRIPCION FROM SUPERAMANO1..articulos WITH (NOLOCK) INNER JOIN secciones WITH (NOLOCK) ON secciones.NUMSECCION = ARTICULOS.SECCION AND articulos.dpto = secciones.NUMDPTO INNER JOIN stocks WITH (NOLOCK) ON CODALMACEN = \'A3\' AND STOCK > 0 WHERE articulos.VISIBLEWEB = \'T\' AND articulos.seccion = @seccionId AND articulos.DPTO = @categoriaId ORDER BY articulos.CODARTICULO OFFSET @startIndex ROWS FETCH NEXT @pageSize ROWS ONLY;'	, 
	



	//clientes
	getAllClientes: 'select CODCLIENTE, NOMBRECLIENTE, CIF, DIRECCION, CODPOSTAL, POBLACION, PROVINCIA, TELEFONO, EMAIL from CLIENTES with(nolock)',
	getClienteId: 'select CODCLIENTE, NOMBRECLIENTE, CIF, DIRECCION, CODPOSTAL, POBLACION, PROVINCIA, TELEFONO, EMAIL from CLIENTES with(nolock) where codcliente = @id',
	spClientes: 'PR_CLIENTES_INSERT',

	addCliente: 'insert into clientes(CODCLIENTE, NOMBRECLIENTE, CIF, DIRECCION, CODPOSTAL, POBLACION, PROVINCIA, TELEFONO, EMAIL, PASS, FECHAALTA) values(@CODCLIENTE, @NOMBRECLIENTE, @CIF, @DIRECCION1, @CODPOSTAL, @POBLACION, @PROVINCIA, @TELEFONO, @EMAIL, @PASS, GETUTCDATE())',
	getLastIdCLiente: 'select top 1 CODCLIENTE from clientes order by 1 desc',
	getClienteLogin: 'select codcliente, nombrecliente, pass from clientes where EMAIL = @EMAIL',
	updateCliente: 'ActualizarCliente',//'UPDATE CLIENTES WITH(UPDLOCK) SET NOMBRECLIENTE = @NOMBRECLIENTE, DIRECCION = @DIRECCION, TELEFONO = @TELEFONO WHERE CODCLIENTE = @CODCLIENTE',


	//Despartamentos(categorias)
	getSeccionesFromCategoriaID: 'select CODDEPARTAMENTO, DESCRIPCION from DEPARTAMENTO with(nolock) where DEP_PADRE = @id',
	
	

	listaSeccionesConCategoria: '1, 2, 6, 8, 9, 10, 11, 20, 21, 22, 23, 24, 25, 26, 27, 28',
	
}


