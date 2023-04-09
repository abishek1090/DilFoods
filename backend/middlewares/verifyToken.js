const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    if(!req.headers.authorization) return res.status(403).json({msg: "Not authorized. No token"})
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        const token = req.headers.authorization.split(' ')[1]    
        jwt.verify(token, '641958e3f2d9d7a30e2608fe', (err, data) => {
            if(err) return res.status(403).json({msg: "Wrong or expired token."})
            else {
                req.user = data
                next()
            }
        })
    }
}


module.exports = {
    verifyToken
}