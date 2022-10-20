const path = require("path");
const Contacto = require("../models/contactos");
import fetch from "node-fetch";

/*
const imageForm = document.querySelector("#imageForm")
const imageInput = document.querySelector("#imageInput")
*/

exports.index = function (req, res) {
  res.sendFile(path.resolve("views/contactos.html"));
};

exports.create = async (req, res) => {
  const { nombre, apellido, email, telefono, direccion, _id, img_url } =
    req.body;
  
        /* */

        const file = imageInput.files[0]

        // get secure url from our server
        const { url } = await fetch("/s3Url").then(res => res.json())
        console.log(url)

        // post the image direclty to the s3 bucket
        await fetch(url, {
        method: "PUT",
        headers: {
        "Content-Type": "multipart/form-data"
        },
        body: file
        })

        const imageUrl = url.split('?')[0]
        console.log(imageUrl)

  

        /* */
        console.log("imagen url")
        console.log(imageUrl);
        console.log("imagen url")
        console.log("new Contacto " + newContacto);
        console.log(req.body);
        console.log(_id);

  if (req.body._id) {
    console.log("ID: " + req.body._id);
    await Contacto.findByIdAndUpdate(
      _id,
      {
        nombre: nombre,
        imagen: imageUrl,
        apellido: apellido,
        email: email,
        telefono: telefono,
        direccion: direccion,
      },
      { new: true }
    );
    res.redirect("/contactos/getcontactos");
  } else {
    var newContacto = new Contacto({
      nombre,
      imagen: imageUrl,
      apellido,
      email,
      telefono,
      direccion,
    });

    newContacto.save(function (err) {
      if (err) {
        res.status(400).send("Unable to save contactos database");
      } else {
        res.redirect("/contactos/getcontactos");
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
    res.render("getcontacto", {
      contactos: contactos,
    });
  });
};

//export { create, deleteContacto }
