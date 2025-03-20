const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middleware/validar-campos");
const { esRoleValido, emailExiste, existeUsuarioPorId } = require("../helpers/db-validators");

const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require("../controller/usuarios");

const router = Router();

router.get("/", usuariosGet);
router.post("/", [
    check('nombre','El nombre es Obligatorio').not().isEmpty(),
    check('password','El PassWord es Obligatorio y debe ser mayor a 6 letras').isLength({min:6}),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    // check('role','No es un Rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom( esRoleValido ),
    validarCampos
],usuariosPost);
router.put("/:id",[
    check('id','El id no es válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('role').custom( esRoleValido ),
    validarCampos
],usuariosPut);
router.delete("/:id",[
    check('id','El id no es válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);
router.patch("/", usuariosPatch);

module.exports = router;
