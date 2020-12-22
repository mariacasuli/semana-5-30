const routerx = require('express-promise-router');
const categoriaController = require('../../controllers/CategoriaController');
const auth = require('../../middlewares/auth');

const router = routerx();


router.get('/list', auth.verifyUsuario, categoriaController.list);
router.post('/add', auth.verifyAdmin, categoriaController.add)
router.put('/update', auth.verifyAdmin, categoriaController.update)
router.put('/activate', auth.verifyAdmin, categoriaController.activate)
router.put('/deactivate', auth.verifyAdmin, categoriaController.deactivate)

module.exports = router;