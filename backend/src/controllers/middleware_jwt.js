const jwt = require('jsonwebtoken')

process.SECRET_KEY = 'secret';

exports.auth = function (req, res, next){
    const token= req.header('Authorization');
    if(!token){
        res.status(401).json({msg: 'token does not exist'})
    };
    try{
        const decoded= jwt.verify(token, process.SECRET_KEY);
        req.user= decoded;
        next();    
    } catch(event){
        res.status(400).json({msg: 'token is not valid'});
    }
}
