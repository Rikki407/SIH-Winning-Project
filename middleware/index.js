var localStorage = require("localStorage"),
jwt_decode= require("jwt-decode"),
setAuthToken = require("../public/utils/setAuthToken");
var middlewareObj ={};

 middlewareObj.checkTokenExpiry = function(req,res,next ){
        // Check for token
if (localStorage.jwtToken) {
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    currentUser= decoded;
  
    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // Remove token from localStorage
      localStorage.removeItem('jwtToken');
      // Remove auth header for future requests
      setAuthToken(false);
      
      currentUser=null;

      res.redirect("/login");
    }

     return next();
  
}
       
    }

    

    middlewareObj.isLoggedIn =function (req,res,next){
        
        if(typeof currentUser== "undefined"){
            res.redirect('/register')
        }
        else if(currentUser.id){
            return next();
        }else{
            req.flash("error","please login first!");
            res.redirect("/login");
        }
    }

    middlewareObj.isSuper =function (req,res,next){
        
        if(!currentUser.isSuper){
            req.flash("error", "You are not authorized")
            res.redirect('back')
        }
        else{
            next();
        }
    }
 
module.exports = middlewareObj