let userMiddleware = {
    registered: function(req, res, next) {
        if(req.session.user){
            next();
        } else {
            res.redirect('/')
        }
    },
    guest: function(req, res, next) {
        if(!req.session.user){
            next();
        } else {
            res.redirect('/')
        }
    }
}

module.exports = userMiddleware;