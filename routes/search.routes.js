const { Router } = require('express');
//3. paso destructuramos search
const { search } = require('../controllers/search.controllers.js');

const router = Router();

//4.solamente vamos a utilizar get, solo pretendo obtener datos.
//en endpoint va primero 
router.get('/:coleccion/:criterio', search )




module.exports = router;