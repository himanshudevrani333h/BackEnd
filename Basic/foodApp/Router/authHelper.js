
const jwt = require("jsonwebtoken");
const {JWT_KEY} = require("../auth")
function protectRoute(req,res,next){
    try{
        if(req.cookies.login){
            let isVALID = jwt.verify(req.cookies.login,JWT_KEY);
            if(isVALID){
                next();
            }
            else{
                res.json({
                    message:"not authorized"
                });
            }
        }
        else{
            res.json({
                message:"operation not allowed"
            });
        }
    }
    catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

module.exports=protectRoute;