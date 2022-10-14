const jwt = require("jsonwebtoken")

const auth = async function(req,res,next) {
    try {
        let token1 = req.headers['authorization']
        if(!token1) {
            return res.status(401).send({status: false, message: "Authentication token is required"})
        } else{ 
            let token2 = token1.split(' ')
            let token = token2[1]
            
            let decodedToken = jwt.verify(token,"tailWebs")
            if(decodedToken) {
                req.decodedToken = decodedToken
                next()
            }
            else{
                return res.status(400).send({status: false, message: "Token is not valid"})
            }
        }
    }
    catch (err) {
        console.log(err)
        res.status(401).send({ message: "Error", error: err.message })
    }
}

module.exports.auth = auth