const express =require ('express');
const router = express.Router();

const { signup, signin, signout, } = require('../controllers/auth');
const {userSignupValidator} = require('../validators/index')




router.post('/signup',userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

// router.get("/hello", requireSignin, (req,res) => {
//         res.send("hello there");
// })  //this was done to test an unauthorised accesss to the webpage

module.exports = router;