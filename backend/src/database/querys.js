export const queries = {
    getAllProducts: 'select top 1000 CODARTICULO, DESCRIPCION, UNIDADMEDIDA, DPTO, VERSION  from SUPERAMANO1..articulos with(nolock) where VISIBLEWEB = \'T\'',
    getArticuloId: 'select * from articulos with(nolock) where codarticulo = @id'
}


