const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/users.model");
const { isValidEmail, isValidPassword } = require("../utils/validations");

const registerStrategy = new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                const error = new Error("Lo sentimos, ese email se encuentra en uso");
                error.status = 400;
                return done(error);
            }

            const existingUserName = await User.findOne({ userName: req.body.userName });
            if (existingUserName) {
            }

            if (!isValidEmail(email)) {
                const error = new Error("Ese email no es válido");
                error.status = 400;
                return done(error);
            }

            if (!isValidPassword(password)) {
                const error = new Error("La contraseña debe contener 8 carácteres, 1 mayúscula y 1 minúscula");
                error.status = 400;
                return done(error);
            };

            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltRounds);

            const newUser = new User({
                userName: req.body.userName,
                email: email,
                password: passwordHash

            })

            const user = await newUser.save();
            user.password = null;
            done(null, user);

        } catch (error) {
            return done(error);
        }
    }
);

module.exports = registerStrategy;
