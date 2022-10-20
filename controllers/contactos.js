const path = require("path");
const Contacto = require("../models/contactos");

exports.index = function (req, res) {
  res.sendFile(path.resolve("views/contactos.html"));
};

exports.create = async (req, res) => {
  const body = req.body;

  console.log(body);

  if (body._id) {
    delete body._id;
    await Contacto.findByIdAndUpdate(
      _id,
      {
        body,
      },
      { new: true }
    );
    res.redirect("/contactos/getcontactos");
  } else {
    delete body._id;
    const newContacto = new Contacto(body);

    newContacto.save(function (err) {
      if (err) {
        res.status(400).json({
          message: err,
          ok: false,
        });
      } else {
        res.json({
          ok: true,
          data: "OK",
        });
      }
    });
  }
};

exports.deleteContacto = async (req, res) => {
  const { id } = req.params;
  //var mongoose = require('mongoose');
  //var objectId = mongoose.Types.ObjectId(id);
  console.log("Entre al delete");
  console.log("ID: " + id);
  //const { ObjectId } = require('mongodb');
  //const objectId = ObjectId(id);
  //var objectId = Number(id);
  const contacto = await Contacto.findByIdAndRemove(id);
  console.log("Sali del delete");
  res.redirect("/contactos/getcontactos");
  //window.location.reload()
  //location.reload(true);
};

exports.list = function (req, res) {
  Contacto.find({}).exec(function (err, contactos) {
    if (err) {
      return res.send(500, err);
    }

    let renderContacts = contactos.map((contacto) => {
      return {
        _id: contacto._id,
        nombre: contacto.nombre,
        apellido: contacto.apellido,
        email: contacto.email,
        telefono: contacto.telefono,
        direccion: contacto.direccion,
        imagen: contacto.imagen.split("?")[0],
      };
    });

    res.render("getcontacto", {
      contactos: renderContacts,
    });
  });
};

//export { create, deleteContacto }
