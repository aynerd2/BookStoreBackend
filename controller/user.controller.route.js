const Usermod = require('../models/UserModel.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const signin = async (req, res)=>{
    
try {
      const {email, password} = req.body
      const user = await Usermod.findOne({email: email})
      if(!user){

            return res.status(401).json({message: "Invalide email or password"})
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch){
            
            return res.status(401).json({message: "Invalide email or password"})
      }

      const payload = {userId: user._id}
      const token = jwt.sign(payload, process.env.APP_SECRETE_KEY, {expiresIn: '1h'})
      
      res.json({
            message: "Successful login",
            token: token
      })
} catch (error) {

      res.status(500).json({message: error.message})
      
}


}


const signup = async (req, res) =>{

      try {
            if (!req.body.firstname ||
                  !req.body.lastname ||
                  !req.body.email ||
                  !req.body.password
            ){
            
                 return res.status(400).send({
                        message: "Send all required fields: firstname, lastname, email and password"
                  })
            }

            const {firstname, lastname, email, password} = req.body
            const salt = await bcrypt.genSalt(10);
            const harshedpassword = await bcrypt.hash(password, salt);
            const user = new Usermod({
                  firstname,
                  lastname,
                  email,
                  password: harshedpassword
            });

            const userRegdata = await user.save();
            res.status(200).json(userRegdata);

      } catch (error) {

            if (error.code === 11000 && error.keyValue.email){
                  res.status(409).json({message: "Email already exists! "})
            }

            res.status(500).json({message: "Server Error!"})
            
      }
     
}


const verifyJWT = (req, res, next) => {
      
      const token = req.headers.authorization?.split(' ')[1]; 
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized User' });
      }
    
      try {
        const decoded = jwt.verify(token, process.env.APP_SECRETE_KEY); 
        req.user = { id: decoded.userId }; 
        next();
      } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
      }
};





module.exports = {
      signin,
      signup,
      verifyJWT
}