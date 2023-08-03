const {Router} = require('express');
const {check} = require('express-validator');
const { validateDocuments } = require('../middlewares/validate.documents.js');
const { validateJWT } = require('../middlewares/validate.jwt.js');
const { isAdminRole } = require('../middlewares/validate.role.js');
const { isValidRole, userExistsById } = require('../helpers/db.validators.js');
const {getCheese,
       postCheese,
       deleteCheese,
       putCheese,
       patchCheese

} = require('../controllers/Cheese.controller.js')

const router = Router();

router.get("/",getCheese)

router.post('/', [ 
    validateJWT, 
     check('nombre','El nombre es obligatorio').not().isEmpty(),
     validateDocuments
 ], postCheese );

 router.delete("/:id",[
    validateJWT,
    isAdminRole,
    check('id','No es un ID valid').isMongoId(),
    check('id').custom(userExistsById),
    validateDocuments
],deleteCheese)


router.put("/:id",[
    check('id','Noes un ObjectID MongoDB valido').isMongoId(),
    check('id').custom(userExistsById),
    check('rol').custom(isValidRole),
    validateDocuments
],putCheese)


module.exports = router;