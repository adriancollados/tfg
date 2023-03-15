export const queries = {
	//articulos
    getAllProducts: 'select distinct(articulos.CODARTICULO), articulos.DESCRIPCION, articulos.UNIDADMEDIDA, articulos.DPTO, articulos.VERSION, articulos.seccion  from SUPERAMANO1..articulos with(nolock) inner join SUPERAMANO1..stocks with(nolock) on CODALMACEN = \'A3\' and STOCK > 0 where VISIBLEWEB = \'T\'',
    getArticuloId: 'select * from SUPERAMANO1..articulos with(nolock) where codarticulo = @id',
	getStockArticuloID: 'select stock * from SUPERAMANO1..stocks with(nolock) where codarticulo = @id and codalmacen = \'A3\'' ,
	getArticulosFromSeccion: 'select distinct(articulos.CODARTICULO), articulos.DESCRIPCION, articulos.UNIDADMEDIDA, articulos.DPTO, articulos.VERSION, articulos.seccion  from SUPERAMANO1..articulos with(nolock)inner join stocks with(nolock) on CODALMACEN = \'A3\' and STOCK > 0 where articulos.VISIBLEWEB = \'T\' and articulos.seccion = @id',
	getArticulosFromCategoria: ' select distinct(articulos.CODARTICULO), articulos.DESCRIPCION, articulos.UNIDADMEDIDA, articulos.DPTO, articulos.VERSION, articulos.seccion  from SUPERAMANO1..articulos with(nolock) inner join stocks with(nolock) on CODALMACEN = \'A3\' and STOCK > 0 where articulos.VISIBLEWEB = \'T\' and articulos.DPTO = @id',
	



	//clientes
	getAllClientes: 'select CODCLIENTE, NOMBRECLIENTE, CIF, DIRECCION1, CODPOSTAL, POBLACION, PROVINCIA, TELEFONO1, E_MAIL, NIF20 from SUPERAMANO1..CLIENTES with(nolock)',
	getClienteId: 'select CODCLIENTE, NOMBRECLIENTE, CIF, DIRECCION1, CODPOSTAL, POBLACION, PROVINCIA, TELEFONO1, E_MAIL, NIF20 from SUPERAMANO1..CLIENTES with(nolock) where codcliente = @id',
	spClientes: 'PR_CLIENTES_INSERT',

	addCliente: 'insert into clientes(CODCLIENTE, NOMBRECLIENTE, CIF, DIRECCION1, CODPOSTAL, POBLACION, PROVINCIA, PAIS, TELEFONO1, E_MAIL, USUARIO, PASS, NUMTARJETA, TARCADUCIDAD, CVC)  values(@CODCLIENTE, @NOMBRECLIENTE, @CIF, @DIRECCION1, @CODPOSTAL, @POBLACION, @PROVINCIA, @PAIS, @TELEFONO1, @E_MAIL, @USUARIO, @PASS, @NUMTARJETA, @TARCADUCIDAD, @CVC)',
	getLastIdCLiente: 'select top 1 CODCLIENTE from clientes order by 1 desc',
	getClienteLogin: 'select codcliente, nombrecliente, pass from clientes where E_MAIL = @E_MAIL',


	//secciones
	getSeccionesFromCategoriaID: ' select NUMSECCION, DESCRIPCION, version from SUPERAMANO1..secciones with(nolock) where NUMDPTO = @id and VISIBLEWEB = \'T\'',
	
	


	
	//Despartamentos(categorias)
	getAllCategorias: ' select * from SUPERAMANO1..DEPARTAMENTO with(nolock) where VISIBLEWEB = \'T\'',
	getCategoriaId: ' select * from SUPERAMANO1..DEPARTAMENTO with(nolock) where numdpto = @id',
}


