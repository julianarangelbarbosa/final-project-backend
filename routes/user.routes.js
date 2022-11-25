const express = require("express");
const router = express.Router();
const User = require('../models/User.model');

// GET /profile
router.get('/profile', async (req, res,next) => {
  try {
    const userId = req.session.currentUser._id;
    const user = await User.findById(userId)

    //res.render('profile', {user}); // dúvida
    res.status(200).json(user);
  } catch (error) {
    
  }

});

//See edit profile form
router.get("/edit-profile/:username", async (req, res) => {

    try {
      const {username} = req.params
      const userUpdate = await User.findOne({username: username})
      console.log(userUpdate)
      //res.render("edit-profile", {userUpdate, username}); // dúvida
      res.status(200).json(username);
    } catch (error) { 
      console.log(error)
    }});
  
  //Receives edit profile form 
  router.post('/edit-profile/:username', async (req, res, next) => {
    try {
      const { username } = req.params; 
      const { email} = req.body;
         
      const userUpdateAgain = await User.findOneAndUpdate({username: username}, {email});
      // res.redirect('/profile');  // dúvida
      res.status(200).json(username);
      
    } catch (error){
        console.log(error)
        next(error);
      }
    })
   
module.exports = router;