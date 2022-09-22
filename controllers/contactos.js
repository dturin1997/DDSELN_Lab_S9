const path = require('path');
const Contacto = require('../models/contactos');

exports.index = function (req, res) {
    res.sendFile(path.resolve('views/contactos.html'));
};

const create = async (req, res) => {
        const { nombre, apellido, email, telefono, direccion, _id } = req.body;

        

        console.log("new Contacto "+newContacto);
        console.log(req.body);
        console.log(_id);

        if (req.body._id) {
                console.log("ID: "+ req.body._id);
                await Contacto.findByIdAndUpdate(_id, {
                        nombre: nombre,
                        apellido: apellido,
                        email: email,
                        telefono: telefono,
                        direccion: direccion,    
                }, { new: true });
                res.redirect('/contactos/getcontactos');
        } else {
        
        var newContacto = new Contacto({
                nombre,
                apellido,
                email,
                telefono,
                direccion,
        });
        
        newContacto.save(function (err) {
                if(err) {
                res.status(400).send('Unable to save contactos database');
            } else {
                res.redirect('/contactos/getcontactos');
            }
      });
    }
    
};

const deleteContacto = async (req, res) => {
        const { id } = req.params;
        //var mongoose = require('mongoose');
        //var objectId = mongoose.Types.ObjectId(id);
        console.log("Entre al delete")
        console.log("ID: "+ id)
        //const { ObjectId } = require('mongodb');
        //const objectId = ObjectId(id);
        //var objectId = Number(id);
        await Contacto.findByIdAndRemove(id);
        //res.redirect('/contactos/getcontactos');
        //window.location.reload()
        //location.reload(true);
    }

exports.list = function (req, res) {
        Contacto.find({}).exec(function (err, contactos) {
                if (err) {
                        return res.send(500, err);
                }
                res.render('getcontacto', {
                        contactos: contactos
             });
        });
};

export { create, deleteContacto }
