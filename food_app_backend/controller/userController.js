const User = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const keys = require('../config/keys');
const storage = require('../utils/cloud_storage');

module.exports = {

    login(req, res) {

        const email = req.body.email;
        const password = req.body.password;
        console.log('Email:', email);


        User.findByEmail(email, async (err, myUser) => {

            console.log('Error: ', err);
            console.log('USUARIO ', myUser);

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Hubo un error con el inicio de sesión.",
                    error: err
                });
            }

            if (!myUser) {
                return res.status(401).json({ // CLIENTE NO AUTORIZADO (401)
                    success: false,
                    message: "Email no encontrado.",
                });
            }

            const isPasswordValid = await bcrypt.compare(password, myUser.password);

            if (isPasswordValid) {
                const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey, {});

                const data = {
                    id: myUser.id,
                    name: myUser.name,
                    lastName: myUser.lastName,
                    email: myUser.email,
                    phone: myUser.phone,
                    image: myUser.image,
                    session_token: `JWT ${token}`
                }

                return res.status(201).json({
                    success: true,
                    message: "El usuario fue autenticado.",
                    data: data 
                });

            }

            else {
                return res.status(401).json({ // PASSWORD INCORRECTO (401)
                    success: false,
                    message: "La contraseña es incorrecta.",
                });
            }


        });

    },

    register(req, res) {

        const user = req.body;
        User.create(user, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Hubo un error con el registro del usuario.",
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: "El registro se realizó correctamente.",
                data: data 
            });
        });
    },

    async registerWithImage(req, res) {

        const user = JSON.parse(req.body.user); // OBTENER DATA DEL CLIENTE

        const files = req.files;

        if (files.lenght > 0) {
            const path = `image_${Date.now()}`;
            const url = await storage(files[0], path);

            if (url != undefined && url != null) {
                user.image = url;
            }
        }

        User.create(user, (err, data) =>{

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: "Hubo un error con el registro del usuario.",
                    error: err
                });
            }

            user.id = `${data}`;
            const token = jwt.sign({id: user.id, email: user.email}, keys.secretOrKey, {});
            user.session_token = token;

            return res.status(201).json({
                success: true,
                message: "El registro se realizó correctamente.",
                data: user 
            });
        });
    },

}