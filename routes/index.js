const routerx = require('express-promise-router');
const userRouter = require('./api/usuario');
const categoriaRouter = require('./api/categoria');
const articuloRouter = require('./api/articulo');



const router = routerx();

router.use('/usuario', userRouter);
router.use('/categoria', categoriaRouter);
router.use('/articulo', articuloRouter);

module.exports = router;