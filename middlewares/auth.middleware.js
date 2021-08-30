const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        //return res.redirect("/login");
        return res.status(500).json('No esta logueado')
    }
}

const isAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.role === "admin") {
            return next();
        } else {
            //return res.redirect("/");
            return res.status(403).json('No es admin');
        }
    } else {
        //return res.redirect("/login");
        return res.status(401).json('No esta logueado');
    }
};

module.exports = {
    isAuth,
    isAdmin
}