const router = require("express").Router();
const categoriaController = require("../controllers/categorias-contoller");
const { isAuthenticated } = require("../utils/auth");

  router.get('/categorias', isAuthenticated ,categoriaController.getAllCategorias);
  router.get('/categorias/:id', isAuthenticated,categoriaController.getArticuloOSeccionOnCategoryId);
  router.post('/categorias', categoriaController.createCategory);
  router.put('/categorias/:id', categoriaController.updateCategory);
  router.delete('/categorias/:id', categoriaController.deleteCategory);
  
  export default router;