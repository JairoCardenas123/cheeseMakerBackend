const { Router } = require('express');
const { check } = require('express-validator');
const { validateDocuments} = require('../middlewares/validate.documents.js');
const { validateJWT } = require('../middlewares/validate.jwt.js');
const { isAdminRole } = require('../middlewares/validate.role.js')
const { postCategoria,
      deleteCategorias,
      getCategorias,
      putCategorias} = require('../controllers/categoria.controllers.js');
const { userExistsById, isValidRole } = require('../helpers/db.validators.js');


const router = Router();

/**
 * localhost/api/categorias
 */

router.get("/",getCategorias);

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [ 
   validateJWT, 
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validateDocuments
], postCategoria );


router.delete("/:id",[
      validateJWT,
      isAdminRole,
      check('id','No es un ID valid').isMongoId(),
      check('id').custom(userExistsById),
      validateDocuments
],deleteCategorias)



router.put("/:id",[
      check('id','Noes un ObjectID MongoDB valido').isMongoId(),
      check('id').custom(userExistsById),
      check('rol').custom(isValidRole),
      validateDocuments
],putCategorias)






module.exports = router;