const Role = require('../models/role')
const Usuario = require ('../models/usuario');

const esRoleValido = async(role='')=>{
    const existeRole = await Role.findOne({role});
    if(!existeRole){
        throw new Error(` El Rol ${role} no esta registrado en la DB`);            
    }
}
const emailExiste = async (correo='')=>{
    // de un error si el correo ya esta registrado

    const existeEmail = await Usuario.findOne({correo});
      if (existeEmail){
        throw new Error(` El Correo: ${correo}, ya esta registrado en la DB`);            
        }   
}
const existeUsuarioPorId = async (id)=>{
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario){
        throw new Error(` El Id: ${id}, No existe`);            
    }   
}
module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}