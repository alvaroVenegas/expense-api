const User = require("../models/users.model");
const passport = require("passport");
const bcrypt = require("bcrypt");

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        console.log(users)
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const postUsers = async (req, res, next) => {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
        const error = "Completa todos los campos"
        console.log(error);
        return res.status(400).json(error);
    }
    const done = (error, user) => {
        if (error) {
            return next(error);
        }
        req.logIn(user, (error) => {
            if (error) return next(error);
            //return res.redirect("/");
            return res.status(201).json(user);
        });
    };
    passport.authenticate("register", done)(req);
    /* return res.status(201).json(user); */
};

const postLogin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        const error = "Completa todos los campos"
        return next(error);
    }
    const done = (error, user) => {
        if (error) return next(error);
        req.logIn(user, (error) => {
            if (error) {
                return next(error);
            };
            return res.status(200).json(user)
        });
        //return res.status(200).json(user);
    };
    passport.authenticate("login", done)(req);
}

const logOut = (req, res, next) => {
    if (req.user) {
        req.logout();

        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            return res.status(200).json('Hasta pronto!!');
            //return res.redirect('/');
        });
    } else {
        return res.status(400).json('No había usuario logueado');
    }
}

const checkSession = (req, res, next) => {
    if (req.user) {
        let userRegister = req.user
        userRegister.password = null
        return res.status(200).json(userRegister);
    } else {
        return res.status(401).json({ message: 'No user found' });
    }
}

module.exports = {
    getUsers,
    postUsers,
    postLogin,
    logOut,
    checkSession
}