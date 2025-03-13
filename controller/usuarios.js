const { request,response } = require("express");

const usuariosGet = (req=request, res = response) => {
    const {apikey, nombre='no name', page=1, limit}= req.query;
  res.json({
    msg: "Get API - desde el Controlador",
    apikey,
    nombre,
    limit,
    page
  });
};
const usuariosPost = (req, res) => {
  const {nombre,edad}=req.body
  res.json({
    msg: "Post API - desde el Controladores",
    nombre,
    edad
  });
};

const usuariosPut = (req=request, res) => {
    const { id }= req.params
  res.json({
    msg: "Put API - desde el Controlador",
    id
  });
};
const usuariosPatch = (req, res) => {
  res.json({
    msg: "Patch API - desde el Controlador",
  });
};
const usuariosDelete = (req, res) => {
  res.json({
    msg: "Delete API - desde el Controlador",
  });
};
module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete
};
