const passport = require('passport')
const { Router } = require('express');
const controller = require('../controller/controller')

const router = Router();

 
// Rutas auth

// Auth with google
// @route GET/auth/google
//router.get('/', controller.getIndex);
router.get('/google',passport.authenticate('google',{scope: ['profile']}))



//@desc Dashboard 
//route GET/dashboard
router.get('/google/callback',passport.authenticate('google',{failureRedirect: '/'}),
(req,res) =>{
    res.redirect('admin/dashboard')
}
)


module.exports = router;

