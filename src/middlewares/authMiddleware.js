module.exports = function(req, res, next) {

    if(req.session.user){
        res.locals.user = req.session.user;
    } else if(req.cookies.usuario){
        req.session.user = req.cookies.usuario;
        res.locals.user = req.cookies.usuario;
    }
    next();
    
}