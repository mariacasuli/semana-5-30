const router = require('express').Router();
const models = require('../../models');
const usuarioController = require('../../controllers/UsuarioController.js');
const bcrypt = require('bcryptjs');
const auth = require('../../middlewares/auth');

router.get('/list', auth.verifyAdmin, usuarioController.list);

router.post('/add', auth.verifyAdmin, usuarioController.add)
router.put('/update', auth.verifyAdmin, usuarioController.update)
router.put('/activate', auth.verifyAdmin, usuarioController.activate)
router.put('/deactivate', auth.verifyAdmin, usuarioController.deactivate)

router.post('/signup', async(req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password)
    const user = await models.user.create(req.body);
    res.status(200).json(usuario); 
})
 
router.post('/login', usuarioController.login);

module.exports = router;