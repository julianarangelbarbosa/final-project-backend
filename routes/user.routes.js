const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// GET Método para visualização do cadastro do usuário e lista de bancos e ações com comentários
router.get("/profile/:id", isAuthenticated, async (req, res) => {
  try {
    /* const userId = req.payload._id */
    const { _id } = req.payload;
    const user = await User.findById(_id)
      .populate("comments")
      .populate({
        path: "comments",
        populate: { path: "bankStockId", model: "BankStock" },
      });
    //res.render('profile', {user}); // dúvida
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

// GET Método para edição do cadastro do usuário e lista de bancos e ações com comentários
router.put("/profile/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    const userUpdate = await User.findByIdAndUpdate(
      id,
      { email },
      { new: true }
    );
    console.log(userUpdate);
    //res.render("edit-profile", {userUpdate, username}); // dúvida
    res.status(200).json(userUpdate);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/profile/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndRemove(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
