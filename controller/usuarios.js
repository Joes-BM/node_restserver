const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const { validationResult } = require("express-validator");

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query =  { estado:true };
//! 1 COLECCION DE PROMESAS
  const [total, usuarios] = await Promise.all([
    await Usuario.countDocuments(query),
    await Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
  ])
  // ! 2 AWAIT 
  // const usuarios = await Usuario.find()
  //   .skip(Number(desde))
  //   .limit(Number(limite))
  // const total = await Usuario.countDocuments()

  res.json({
    total,
    usuarios,
  })

  //const { apikey, nombre = "no name", page = 1, limit } = req.query;
  // res.json({
  //   msg: "Get API - desde el Controlador",
  //   apikey,
  //   nombre,
  //   limit,
  //   page,
  // });
};
const usuariosPost = async (req, res) => {
  const { nombre, password, role, correo } = req.body;
  const usuario = new Usuario({ nombre, password, role, correo });

  //validar correo existente

  // const existeEmail = await Usuario.findOne({correo});
  // if (existeEmail){
  //   return res.status(400).json({
  //     msg:'Ese correo ya esta registrado'
  //   })
  // }
  // encriptar pass
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);
  //grabar en bd
  await usuario.save();

  res.json({
    msg: "Post API - desde el Controladores",
    usuario,
  });
};

const usuariosPut = async (req = request, res) => {
  const { id } = req.params;
  const { _id,password, google, correo, ...resto } = req.body;
  //TODO validad contra la base de datos
  if (password) {
    // encriptar pass
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }
  const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true});

  res.json({
    msg: "Put API - desde el Controlador",
    usuario,
  });
};
const usuariosPatch = (req, res) => {
  res.json({
    msg: "Patch API - desde el Controlador",
  });
};
const usuariosDelete = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findByIdAndUpdate(id, { estado:false })
  res.json(usuario);
};
module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
